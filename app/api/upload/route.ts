import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '@/lib/blob-storage';
import { checkUploadRateLimit, checkUploadStatusRateLimit, getClientIP } from '@/lib/rate-limit-production';
import { ValidationError, ServerError, logError } from '@/lib/errors';
import {
    validateRequestOrigin,
    validateRequestSize,
    addSecurityHeaders,
} from '@/lib/request-validation';

// File upload configuration
const FILE_CONFIG = {
    maxSize: 4.5 * 1024 * 1024, // 4.5 MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'],
    rateLimit: {
        requests: 20,
        windowMs: 24 * 60 * 60 * 1000, // 24 hours
    },
};

function validateFile(file: File): void {
    // Validate file size
    if (file.size > FILE_CONFIG.maxSize) {
        throw new ValidationError(
            `File size exceeds ${FILE_CONFIG.maxSize / 1024 / 1024}MB limit`
        );
    }

    // Validate file type
    if (!FILE_CONFIG.allowedTypes.includes(file.type)) {
        throw new ValidationError(
            `File type not allowed. Accepted: ${FILE_CONFIG.allowedTypes.join(', ')}`
        );
    }

    // Validate filename
    if (!file.name || file.name.length === 0) {
        throw new ValidationError('File must have a valid name');
    }
}

/**
 * POST /api/upload
 * Upload a file to Vercel Blob storage
 * 
 * Request:
 * - multipart/form-data with 'file' field
 * 
 * Response:
 * {
 *   "success": true,
 *   "url": "https://...",
 *   "filename": "..."
 * }
 */
export async function POST(request: NextRequest) {
    try {
        // Validate request origin (CSRF protection)
        if (!validateRequestOrigin(request)) {
            const response = NextResponse.json(
                { success: false, error: 'Invalid request origin' },
                { status: 403 }
            );
            return addSecurityHeaders(response);
        }

        // Validate request size (max 5MB for form data + file)
        if (!validateRequestSize(request.headers.get('content-length'), 5 * 1024 * 1024)) {
            const response = NextResponse.json(
                { success: false, error: 'Request body too large' },
                { status: 413 }
            );
            return addSecurityHeaders(response);
        }

        // Rate limiting
        const clientIP = getClientIP(request.headers);
        const { allowed, remaining, reset } = await checkUploadRateLimit(clientIP);

        const rateLimitHeaders = {
            "RateLimit-Limit": FILE_CONFIG.rateLimit.requests.toString(),
            "RateLimit-Remaining": remaining.toString(),
            "RateLimit-Reset": new Date(reset).toISOString(),
        };

        if (!allowed) {
            const response = NextResponse.json(
                { success: false, error: "Upload limit exceeded. Try again tomorrow." },
                { status: 429, headers: rateLimitHeaders }
            );
            return addSecurityHeaders(response);
        }

        // Parse form data
        let formData: FormData;
        try {
            formData = await request.formData();
        } catch (error) {
            logError(error, 'Form parsing error');
            throw new ValidationError('Invalid form data');
        }

        const file = formData.get('file') as File | null;

        if (!file) {
            const response = NextResponse.json(
                { success: false, error: 'No file provided' },
                { status: 400 }
            );
            return addSecurityHeaders(response);
        }

        // Validate file
        try {
            validateFile(file);
        } catch (error) {
            const response = NextResponse.json(
                { success: false, error: error instanceof Error ? error.message : 'File validation failed' },
                { status: 400 }
            );
            return addSecurityHeaders(response);
        }

        // Create unique filename with sanitization
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).slice(2, 9);
        const extension = file.name.split('.').pop()?.toLowerCase();

        if (!extension || extension.length > 5) {
            throw new ValidationError('Invalid file extension');
        }

        const filename = `upload-${timestamp}-${randomId}.${extension}`;

        // Upload to Vercel Blob
        let result;
        try {
            result = await uploadFile(file, filename);
        } catch (error) {
            logError(error, 'Blob upload error');
            throw new ServerError('Failed to upload file');
        }

        if (!result) {
            const response = NextResponse.json(
                { success: false, error: 'Failed to upload file. Blob storage may not be configured.' },
                { status: 500, headers: rateLimitHeaders }
            );
            return addSecurityHeaders(response);
        }

        const successResponse = NextResponse.json(
            {
                success: true,
                url: result.url,
                downloadUrl: result.downloadUrl,
                filename: file.name,
                size: file.size,
                contentType: file.type,
            },
            { status: 200, headers: rateLimitHeaders }
        );
        return addSecurityHeaders(successResponse);
    } catch (error) {
        logError(error, 'Upload API error');
        const errorResponse = NextResponse.json(
            { success: false, error: 'Failed to upload file' },
            { status: 500 }
        );
        return addSecurityHeaders(errorResponse);
    }
}

/**
 * GET /api/upload/status
 * Check if blob storage is configured
 */
export async function GET(request: NextRequest) {
    try {
        // Validate request origin
        if (!validateRequestOrigin(request)) {
            const response = NextResponse.json(
                { configured: false, message: 'Invalid request origin' },
                { status: 403 }
            );
            return addSecurityHeaders(response);
        }

        // Rate limiting for status check
        const clientIP = getClientIP(request.headers);
        const { allowed } = await checkUploadStatusRateLimit(clientIP);
        if (!allowed) {
            const response = NextResponse.json(
                { configured: false, error: 'Rate limit exceeded' },
                { status: 429 }
            );
            return addSecurityHeaders(response);
        }

        const isConfigured = !!process.env.BLOB_READ_WRITE_TOKEN;

        const successResponse = NextResponse.json({
            configured: isConfigured,
            message: isConfigured
                ? 'Blob storage is configured and ready'
                : 'Blob storage is not configured',
        });
        return addSecurityHeaders(successResponse);
    } catch (error) {
        logError(error, 'Upload status check error');
        const errorResponse = NextResponse.json(
            { configured: false, message: 'Error checking storage configuration' },
            { status: 500 }
        );
        return addSecurityHeaders(errorResponse);
    }
}
