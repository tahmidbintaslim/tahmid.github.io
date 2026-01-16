/**
 * Security Configuration and Best Practices
 * This file documents all security measures implemented in the portfolio
 */

export const SecurityConfig = {
    // Content Security Policy Headers (configured in next.config.mjs)
    csp: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imageSrc: ["'self'", "data:", "https:"],
            fontSrc: ["'self'", "data:"],
        },
    },

    // Rate Limiting Configuration
    rateLimits: {
        contact: {
            maxRequests: 5,
            windowMs: 3600000, // 1 hour
            message: 'Too many contact requests, please try again later',
        },
        feedback: {
            maxRequests: 10,
            windowMs: 3600000, // 1 hour
            message: 'Too many feedback submissions, please try again later',
        },
    },

    // CORS Configuration
    cors: {
        allowedOrigins: [
            'http://localhost:3000',
            'http://localhost:3001',
            process.env.NEXT_PUBLIC_SITE_URL || 'https://tahmid.space',
        ],
        allowedMethods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    },

    // Input Validation Rules
    validation: {
        name: {
            minLength: 2,
            maxLength: 100,
            pattern: /^[a-zA-Z\s'-]+$/,
        },
        email: {
            maxLength: 255,
            // Uses RFC 5322 simplified version (zod email validation)
        },
        subject: {
            minLength: 5,
            maxLength: 200,
            pattern: /^[a-zA-Z0-9\s\-.,!?:'()]+$/,
        },
        message: {
            minLength: 20,
            maxLength: 5000,
        },
        feedback: {
            minLength: 10,
            maxLength: 1000,
        },
    },

    // Security Headers
    headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    },

    // Environment Variables (Required)
    requiredEnvVars: [
        'CONTACT_EMAIL',
        'SMTP_HOST',
        'SMTP_PORT',
        'SMTP_USER',
        'SMTP_PASS',
    ],

    // Sanitization Rules
    sanitization: {
        stripHtmlTags: true,
        normalizeWhitespace: true,
        escapeSpecialChars: true,
    },

    // Recommendations for Production
    production: {
        enableLogging: true,
        enableMonitoring: true,
        enableAudit: true,
        useRedisForRateLimit: true,
        useDatabase: true,
        enableEncryption: true,
    },

    // Security Checklist
    checklist: {
        'Input Validation': '✓ Implemented with Zod',
        'Input Sanitization': '✓ Implemented with DOMPurify',
        'XSS Protection': '✓ HTML escaping and sanitization',
        'Rate Limiting': '✓ Implemented on contact and feedback endpoints',
        'CSRF Protection': '⚠ TODO: Implement CSRF tokens',
        'Authentication': '⚠ TODO: Implement for admin endpoints',
        'Database': '⚠ TODO: Migrate from in-memory storage',
        'Logging': '✓ Structured logging implemented',
        'HTTPS': '✓ Enforced via Vercel',
        'Security Headers': '✓ Configured in next.config.mjs',
    },
};

/**
 * Security Implementation Checklist
 * 
 * ✓ COMPLETED:
 * 1. Input validation (Zod schemas)
 * 2. Input sanitization (DOMPurify)
 * 3. Rate limiting middleware
 * 4. Structured logging
 * 5. Removed open GET endpoint (feedback)
 * 6. HTML escaping in emails
 * 7. Security headers configuration
 * 
 * ⚠ TODO (NEXT PRIORITIES):
 * 1. CSRF token implementation
 * 2. Admin authentication
 * 3. Redis caching for rate limits
 * 4. Database migration (Vercel Postgres)
 * 5. Email encryption
 * 6. IP whitelisting
 * 7. Request signing
 * 8. Audit logging
 * 9. OWASP Top 10 compliance check
 * 10. Penetration testing
 */

export default SecurityConfig;
