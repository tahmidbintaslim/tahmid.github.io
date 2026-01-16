/**
 * Request validation and sanitization middleware
 * Protects against common web vulnerabilities
 */

import { NextRequest, NextResponse } from 'next/server';

// OWASP headers to add to all responses
export const OWASP_HEADERS = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
};

/**
 * Validate request origin to prevent CSRF
 */
export function validateRequestOrigin(request: NextRequest): boolean {
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');
    const host = request.headers.get('host');

    // If no origin header, validate referer
    if (!origin && referer) {
        try {
            const refererUrl = new URL(referer);
            return refererUrl.host === host;
        } catch {
            return false;
        }
    }

    // If origin header exists, validate it
    if (origin) {
        try {
            const originUrl = new URL(origin);
            return originUrl.host === host;
        } catch {
            return false;
        }
    }

    // Allow same-origin requests (no origin header)
    return true;
}

/**
 * Validate and sanitize request body size
 */
export function validateRequestSize(contentLength: string | null, maxSize: number = 1024 * 1024): boolean {
    if (!contentLength) return true;

    try {
        const size = parseInt(contentLength, 10);
        return size <= maxSize;
    } catch {
        return false;
    }
}

/**
 * Validate content type
 */
export function validateContentType(
    contentType: string | null,
    allowed: string[] = ['application/json']
): boolean {
    if (!contentType) return false;

    const baseType = contentType.split(';')[0].trim();
    return allowed.includes(baseType);
}

/**
 * Add OWASP security headers to response
 */
export function addSecurityHeaders(response: NextResponse): NextResponse {
    Object.entries(OWASP_HEADERS).forEach(([key, value]) => {
        response.headers.set(key, value);
    });

    return response;
}

/**
 * Check for suspicious patterns in request
 */
export function detectSuspiciousPatterns(data: unknown): boolean {
    const str = JSON.stringify(data).toLowerCase();

    // SQL injection patterns
    if (/(\b(union|select|insert|update|delete|drop|create|alter)\b|;|\-\-|\/\*|\*\/)/i.test(str)) {
        return true;
    }

    // XSS patterns
    if (/<script|javascript:|onerror=|onclick=|<iframe/i.test(str)) {
        return true;
    }

    // Path traversal
    if (/\.\.\/|\.\.\\/.test(str)) {
        return true;
    }

    return false;
}
