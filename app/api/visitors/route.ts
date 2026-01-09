import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// In production, use Vercel KV, Redis, or a database
// For now, we'll use a simple in-memory counter with session tracking
// This resets on server restart but provides real-time tracking

let totalVisitors = 1247; // Starting count (can be adjusted based on historical data)
let activeVisitors = 0;
const activeSessions = new Set<string>();

// Clean up stale sessions every 5 minutes
setInterval(() => {
    const now = Date.now();
    const staleThreshold = 5 * 60 * 1000; // 5 minutes

    for (const session of activeSessions) {
        const [, timestamp] = session.split("_");
        if (now - parseInt(timestamp) > staleThreshold) {
            activeSessions.delete(session);
        }
    }
    activeVisitors = activeSessions.size;
}, 60000);

export async function GET() {
    return NextResponse.json({
        success: true,
        totalVisitors,
        activeVisitors: Math.max(1, activeVisitors), // At least 1 (current user)
        lastUpdated: new Date().toISOString(),
    });
}

export async function POST(_request: Request) {
    try {
        const cookieStore = await cookies();
        let visitorId = cookieStore.get("visitor_id")?.value;
        let isNewVisitor = false;

        if (!visitorId) {
            // New visitor
            visitorId = `v_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
            isNewVisitor = true;
            totalVisitors++;
        }

        // Update active session
        const sessionKey = `${visitorId}_${Date.now()}`;

        // Remove old sessions for this visitor
        for (const session of activeSessions) {
            if (session.startsWith(visitorId.split("_").slice(0, 2).join("_"))) {
                activeSessions.delete(session);
            }
        }

        activeSessions.add(sessionKey);
        activeVisitors = activeSessions.size;

        const response = NextResponse.json({
            success: true,
            visitorId,
            isNewVisitor,
            totalVisitors,
            activeVisitors: Math.max(1, activeVisitors),
            lastUpdated: new Date().toISOString(),
        });

        // Set cookie for returning visitor tracking
        if (isNewVisitor) {
            response.cookies.set("visitor_id", visitorId, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 365 * 24 * 60 * 60, // 1 year
            });
        }

        return response;
    } catch (error) {
        console.error("Visitor tracking error:", error);
        return NextResponse.json({
            success: true,
            totalVisitors,
            activeVisitors: Math.max(1, activeVisitors),
        });
    }
}
