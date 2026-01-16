import { NextResponse, NextRequest } from "next/server";
import { addFeedback, getRecentFeedback, getFeedbackStats } from "@/lib/edge-config";
import { checkFeedbackRateLimit, getClientIP } from "@/lib/rate-limit-production";
import {
    validateRequestOrigin,
    validateContentType,
    validateRequestSize,
    addSecurityHeaders,
    detectSuspiciousPatterns,
} from "@/lib/request-validation";
import type { FeedbackEntry } from "@/lib/edge-config";

export async function POST(request: NextRequest) {
    try {
        // Validate request origin (CSRF protection)
        if (!validateRequestOrigin(request)) {
            const response = NextResponse.json(
                { success: false, error: "Invalid request origin" },
                { status: 403 }
            );
            return addSecurityHeaders(response);
        }

        // Validate content type
        if (!validateContentType(request.headers.get('content-type'))) {
            const response = NextResponse.json(
                { success: false, error: "Invalid content type" },
                { status: 415 }
            );
            return addSecurityHeaders(response);
        }

        // Validate request size (max 1MB)
        if (!validateRequestSize(request.headers.get('content-length'), 1024 * 1024)) {
            const response = NextResponse.json(
                { success: false, error: "Request body too large" },
                { status: 413 }
            );
            return addSecurityHeaders(response);
        }

        // Rate limiting: 10 feedback submissions per 30 minutes per IP
        const clientIP = getClientIP(request.headers);
        const { allowed, remaining, reset } = await checkFeedbackRateLimit(clientIP);

        if (!allowed) {
            const response = NextResponse.json(
                { success: false, error: "Too many requests. Please try again later." },
                {
                    status: 429,
                    headers: {
                        "RateLimit-Limit": "10",
                        "RateLimit-Remaining": remaining.toString(),
                        "RateLimit-Reset": new Date(reset).toISOString(),
                    },
                }
            );
            return addSecurityHeaders(response);
        }

        const body = await request.json();
        const { type, message, email, page } = body;

        // Detect suspicious patterns
        if (detectSuspiciousPatterns(body)) {
            const response = NextResponse.json(
                { success: false, error: "Invalid input detected" },
                { status: 400 }
            );
            return addSecurityHeaders(response);
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

        // Store feedback in Vercel Edge Config
        const saved = await addFeedback(feedback);

        if (!saved) {
            console.warn("Feedback stored locally (Edge Config unavailable)");
        }

        console.log("New feedback received:", feedback);

        const successResponse = NextResponse.json(
            {
                success: true,
                message: "Thank you for your feedback!",
                id: feedback.id,
                persisted: saved,
            },
            {
                status: 200,
                headers: {
                    "RateLimit-Limit": "10",
                    "RateLimit-Remaining": Math.max(0, remaining - 1).toString(),
                    "RateLimit-Reset": new Date(reset).toISOString(),
                },
            }
        );
        return addSecurityHeaders(successResponse);
    } catch (error) {
        console.error("Feedback submission error:", error);
        const errorResponse = NextResponse.json(
            { success: false, error: "Failed to submit feedback" },
            { status: 500 }
        );
        return addSecurityHeaders(errorResponse);
    }
}

// GET endpoint to retrieve feedback (admin only - requires API key authentication)
export async function GET(request: NextRequest) {
    try {
        // Validate request origin
        if (!validateRequestOrigin(request)) {
            const response = NextResponse.json(
                { success: false, error: "Invalid request origin" },
                { status: 403 }
            );
            return addSecurityHeaders(response);
        }

        // Require API key authentication for admin access
        const apiKey = request.headers.get("x-api-key");
        if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
            const response = NextResponse.json(
                { success: false, error: "Unauthorized: Invalid or missing API key" },
                { status: 401 }
            );
            return addSecurityHeaders(response);
        }

        // Rate limit admin requests (less strict: 100 per minute)
        const clientIP = getClientIP(request.headers);
        const { allowed } = await checkFeedbackRateLimit(clientIP);
        if (!allowed) {
            const response = NextResponse.json(
                { success: false, error: "Rate limit exceeded for feedback admin access" },
                { status: 429 }
            );
            return addSecurityHeaders(response);
        }

        const recent = await getRecentFeedback(10);
        const stats = await getFeedbackStats();

        const response = NextResponse.json({
            success: true,
            count: stats.total,
            recent,
            stats,
        });
        return addSecurityHeaders(response);
    } catch (error) {
        console.error("Error retrieving feedback:", error);
        const errorResponse = NextResponse.json(
            { success: false, error: "Failed to retrieve feedback" },
            { status: 500 }
        );
        return addSecurityHeaders(errorResponse);
    }
}