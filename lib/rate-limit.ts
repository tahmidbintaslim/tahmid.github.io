import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

export const RATE_LIMIT_CONFIG = {
  contact: {
    maxRequests: 5,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  feedback: {
    maxRequests: 10,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  default: {
    maxRequests: 30,
    windowMs: 60 * 1000, // 1 minute
  },
};

export function getRateLimitKey(
  request: NextRequest,
  endpoint: string
): string {
  const ip = getClientIpFromHeaders(request.headers);

  return `ratelimit:${endpoint}:${ip}`;
}

export function getClientIpFromHeaders(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown';
  }

  const realIp = headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  return 'unknown';
}

export function getRateLimitKeyFromHeaders(
  headers: Headers,
  endpoint: string
): string {
  const ip = getClientIpFromHeaders(headers);
  return `ratelimit:${endpoint}:${ip}`;
}

export async function checkRateLimit(
  key: string,
  config: typeof RATE_LIMIT_CONFIG.contact = RATE_LIMIT_CONFIG.default
): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
  const now = Date.now();
  const entry = await kv.get<RateLimitEntry>(key);

  if (!entry || now > entry.resetTime) {
    const newEntry: RateLimitEntry = {
      count: 1,
      resetTime: now + config.windowMs,
    };
    await kv.set(key, newEntry, { ex: Math.ceil(config.windowMs / 1000) });
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: newEntry.resetTime,
    };
  }

  if (entry.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  entry.count++;
  await kv.set(key, entry, { ex: Math.ceil((entry.resetTime - now) / 1000) });
  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

export function rateLimitResponse(
  remaining: number,
  resetTime: number
): NextResponse {
  return NextResponse.json(
    {
      error: 'Too many requests. Please try again later.',
      retryAfter: Math.ceil((resetTime - Date.now()) / 1000),
    },
    {
      status: 429,
      headers: {
        'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': new Date(resetTime).toISOString(),
      },
    }
  );
}
