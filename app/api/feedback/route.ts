import { NextResponse } from "next/server";

// Store feedback in memory (in production, use a database or email service)
// Feedback is also sent to the contact email via EmailJS or similar

interface FeedbackEntry {
    id: string;
    type: "feedback" | "bug" | "feature" | "other";
    message: string;
    email?: string;
    page?: string;
    userAgent?: string;
    timestamp: string;
}

const feedbackStore: FeedbackEntry[] = [];

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, message, email, page } = body;

        if (!message || message.trim().length < 10) {
            return NextResponse.json(
                { success: false, error: "Message must be at least 10 characters" },
                { status: 400 }
            );
        }

        if (message.length > 1000) {
            return NextResponse.json(
                { success: false, error: "Message must be less than 1000 characters" },
                { status: 400 }
            );
        }

        // Validate email if provided
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { success: false, error: "Invalid email format" },
                { status: 400 }
            );
        }

        const feedback: FeedbackEntry = {
            id: `fb_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
            type: type || "feedback",
            message: message.trim(),
            email: email?.trim(),
            page,
            userAgent: request.headers.get("user-agent") || undefined,
            timestamp: new Date().toISOString(),
        };

        // Store feedback
        feedbackStore.push(feedback);

        // Keep only last 100 feedback entries in memory
        if (feedbackStore.length > 100) {
            feedbackStore.shift();
        }

        // In production, you could:
        // 1. Send email notification using EmailJS/Resend/SendGrid
        // 2. Store in database (Vercel Postgres, PlanetScale, etc.)
        // 3. Send to Discord/Slack webhook
        // 4. Create GitHub issue automatically

        console.log("New feedback received:", feedback);

        return NextResponse.json({
            success: true,
            message: "Thank you for your feedback!",
            id: feedback.id,
        });
    } catch (error) {
        console.error("Feedback submission error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to submit feedback" },
            { status: 500 }
        );
    }
}

// GET endpoint for admin (in production, add authentication)
export async function GET() {
    return NextResponse.json({
        success: true,
        count: feedbackStore.length,
        recent: feedbackStore.slice(-10).reverse(),
    });
}
