/**
 * Simple in-memory rate limiter for API routes
 * For production, use external service like Redis or Upstash
 */

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

export function getRateLimitKey(ip: string, endpoint: string): string {
    return `${ip}:${endpoint}`;
}

export function getClientIP(headers: Headers): string {
    // Try common headers used by proxies
    const forwardedFor = headers.get('x-forwarded-for');
    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim();
    }

    const realIP = headers.get('x-real-ip');
    if (realIP) {
        return realIP;
    }

    // Fallback - not ideal but better than nothing
    return 'unknown';
}

export function checkRateLimit(
    key: string,
    limit: number = 10,
    windowMs: number = 60000 // 1 minute
): { allowed: boolean; remaining: number; reset: number } {
    const now = Date.now();
    let entry = rateLimitMap.get(key);

    // Create or reset entry if window expired
    if (!entry || now > entry.resetTime) {
        entry = {
            count: 0,
            resetTime: now + windowMs,
        };
        rateLimitMap.set(key, entry);
    }

    entry.count++;
    const allowed = entry.count <= limit;
    const remaining = Math.max(0, limit - entry.count);
    const reset = entry.resetTime;

    // Cleanup old entries every 10 requests
    if (Math.random() < 0.1) {
        for (const [k, v] of rateLimitMap.entries()) {
            if (now > v.resetTime) {
                rateLimitMap.delete(k);
            }
        }
    }

    return { allowed, remaining, reset };
}

/**
 * For production, use Upstash Redis-based rate limiting
 * Example:
 * 
 * import { Ratelimit } from "@upstash/ratelimit";
 * import { Redis } from "@upstash/redis";
 * 
 * const ratelimit = new Ratelimit({
 *   redis: Redis.fromEnv(),
 *   limiter: Ratelimit.slidingWindow(10, "1 m"),
 * });
 * 
 * const { success, limit, remaining, reset, pending } = await ratelimit.limit(key);
 */
