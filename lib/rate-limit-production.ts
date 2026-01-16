/**
 * Upstash Redis-based Rate Limiter for Production
 * 
 * This replaces the in-memory rate limiter for distributed, persistent rate limiting
 * Suitable for multi-instance deployments and serverless environments
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis client from environment variables
const redis = Redis.fromEnv();

// Define rate limiters for different endpoints
const rateLimiters = {
    contact: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, "15 m"), // 5 requests per 15 minutes
        analytics: true,
        prefix: "ratelimit:contact",
    }),

    feedback: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, "30 m"), // 10 requests per 30 minutes
        analytics: true,
        prefix: "ratelimit:feedback",
    }),

    upload: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(20, "1 d"), // 20 requests per day
        analytics: true,
        prefix: "ratelimit:upload",
    }),

    uploadStatus: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(60, "1 m"), // 60 requests per minute
        analytics: true,
        prefix: "ratelimit:status",
    }),
};

export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
    reset: number;
    retryAfter?: number;
}

/**
 * Get client IP with proper validation for Vercel
 * Handles X-Forwarded-For header spoofing protection
 */
export function getClientIP(headers: Headers): string {
    // Try X-Forwarded-For (set by Vercel and proxies)
    const forwardedFor = headers.get("x-forwarded-for");
    if (forwardedFor) {
        // Only use the first IP (the client IP, before any proxies)
        const clientIP = forwardedFor.split(",")[0].trim();

        // Validate it's a proper IP format
        if (isValidIP(clientIP)) {
            return clientIP;
        }
    }

    // Fallback to X-Real-IP (alternative header)
    const realIP = headers.get("x-real-ip");
    if (realIP && isValidIP(realIP)) {
        return realIP;
    }

    // For local development
    if (process.env.NODE_ENV === "development") {
        return "127.0.0.1";
    }

    // Log anomaly for security monitoring
    console.warn("[Security] Unable to detect valid client IP from headers");
    return "unknown";
}

/**
 * Validate IP address format (IPv4 only for now)
 */
function isValidIP(ip: string): boolean {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipv4Regex.test(ip)) {
        return false;
    }

    // Validate each octet is 0-255
    const octets = ip.split(".");
    return octets.every(octet => {
        const num = parseInt(octet, 10);
        return num >= 0 && num <= 255;
    });
}

/**
 * Check rate limit for contact form
 */
export async function checkContactRateLimit(ip: string): Promise<RateLimitResult> {
    const result = await rateLimiters.contact.limit(`contact:${ip}`);

    return {
        allowed: result.success,
        remaining: Math.max(0, result.remaining),
        reset: Date.now() + 60000, // Approximate next window
        retryAfter: !result.success ? 60000 : undefined,
    };
}

/**
 * Check rate limit for feedback
 */
export async function checkFeedbackRateLimit(ip: string): Promise<RateLimitResult> {
    const result = await rateLimiters.feedback.limit(`feedback:${ip}`);

    return {
        allowed: result.success,
        remaining: Math.max(0, result.remaining),
        reset: Date.now() + 60000,
        retryAfter: !result.success ? 60000 : undefined,
    };
}

/**
 * Check rate limit for file uploads
 */
export async function checkUploadRateLimit(ip: string): Promise<RateLimitResult> {
    const result = await rateLimiters.upload.limit(`upload:${ip}`);

    return {
        allowed: result.success,
        remaining: Math.max(0, result.remaining),
        reset: Date.now() + 60000,
        retryAfter: !result.success ? 60000 : undefined,
    };
}

/**
 * Check rate limit for upload status endpoint
 */
export async function checkUploadStatusRateLimit(ip: string): Promise<RateLimitResult> {
    const result = await rateLimiters.uploadStatus.limit(`status:${ip}`);

    return {
        allowed: result.success,
        remaining: Math.max(0, result.remaining),
        reset: Date.now() + 60000,
        retryAfter: !result.success ? 60000 : undefined,
    };
}

/**
 * Generic rate limiter for custom limits
 */
export async function checkRateLimit(
    key: string,
    limit: number,
    windowMs: number
): Promise<RateLimitResult> {
    const limiter = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(limit, `${windowMs}ms`),
    });

    const result = await limiter.limit(key);

    return {
        allowed: result.success,
        remaining: Math.max(0, result.remaining),
        reset: Date.now() + windowMs,
        retryAfter: !result.success ? windowMs : undefined,
    };
}
