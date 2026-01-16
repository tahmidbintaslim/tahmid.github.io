/**
 * Custom error types and utilities for better error handling
 */

export class APIError extends Error {
    constructor(
        public statusCode: number,
        message: string,
        public code?: string
    ) {
        super(message);
        this.name = 'APIError';
    }
}

export class ValidationError extends APIError {
    constructor(message: string, code: string = 'VALIDATION_ERROR') {
        super(400, message, code);
        this.name = 'ValidationError';
    }
}

export class RateLimitError extends APIError {
    constructor(
        message: string = 'Too many requests',
        public retryAfter?: number
    ) {
        super(429, message, 'RATE_LIMIT_EXCEEDED');
        this.name = 'RateLimitError';
    }
}

export class NotFoundError extends APIError {
    constructor(message: string = 'Resource not found') {
        super(404, message, 'NOT_FOUND');
        this.name = 'NotFoundError';
    }
}

export class ServerError extends APIError {
    constructor(message: string = 'Internal server error', code: string = 'INTERNAL_ERROR') {
        super(500, message, code);
        this.name = 'ServerError';
    }
}

/**
 * Safe error logging that doesn't expose sensitive information
 */
export function logError(error: unknown, context?: string): void {
    console.error(`[${context || 'Error'}]`, error instanceof Error ? error.message : String(error));

    // In production, send to error tracking service (e.g., Sentry)
    if (process.env.NODE_ENV === 'production') {
        // Example: Sentry.captureException(error);
    }
}

/**
 * Format error response for API
 */
export function formatErrorResponse(error: unknown) {
    if (error instanceof APIError) {
        return {
            error: error.message,
            code: error.code,
        };
    }

    if (error instanceof Error) {
        return {
            error: 'An unexpected error occurred',
            code: 'INTERNAL_ERROR',
        };
    }

    return {
        error: 'An unexpected error occurred',
        code: 'INTERNAL_ERROR',
    };
}
