import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { feedbackSchema } from '@/lib/validation';
import { sanitizeMessage, sanitizeEmail } from '@/lib/sanitize';
import {
  getRateLimitKey,
  checkRateLimit,
  rateLimitResponse,
  RATE_LIMIT_CONFIG,
} from '@/lib/rate-limit';
import { isSameOrigin, validateCsrfToken } from '@/lib/security';

// Store feedback in memory (in production, use a database or email service)
// Feedback is also sent to the contact email via EmailJS or similar

interface FeedbackEntry {
  id: string;
  type: 'feedback' | 'bug' | 'feature' | 'other';
  message: string;
  email?: string;
  page?: string;
  userAgent?: string;
  timestamp: string;
}

const feedbackStore: FeedbackEntry[] = [];

export async function POST(request: NextRequest) {
  try {
    // CSRF Protection
    if (!validateCsrfToken(request)) {
      return NextResponse.json(
        { success: false, error: 'Invalid CSRF token' },
        { status: 403 }
      );
    }
    if (!isSameOrigin(request)) {
      return NextResponse.json(
        { success: false, error: 'Invalid request origin' },
        { status: 403 }
      );
    }

    // Check rate limit
    const key = getRateLimitKey(request, 'feedback');
    const rateLimitCheck = await checkRateLimit(
      key,
      RATE_LIMIT_CONFIG.feedback
    );

    if (!rateLimitCheck.allowed) {
      return rateLimitResponse(
        rateLimitCheck.remaining,
        rateLimitCheck.resetTime
      );
    }

    const body = await request.json();

    // Validate input with zod
    const validation = feedbackSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validation.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    const { type, message, email, page } = validation.data;

    // Sanitize inputs
    const sanitizedMessage = sanitizeMessage(message);
    const sanitizedEmail = email ? sanitizeEmail(email) : undefined;

    const feedback: FeedbackEntry = {
      id: `fb_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      type: type || 'feedback',
      message: sanitizedMessage,
      email: sanitizedEmail,
      page,
      userAgent: request.headers.get('user-agent') || undefined,
      timestamp: new Date().toISOString(),
    };

    // Store feedback
    feedbackStore.push(feedback);

    // Keep only last 100 feedback entries in memory
    if (feedbackStore.length > 100) {
      feedbackStore.shift();
    }

    console.log('New feedback received:', {
      id: feedback.id,
      type: feedback.type,
      timestamp: feedback.timestamp,
      // Don't log actual content in production
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your feedback!',
        id: feedback.id,
      },
      {
        headers: {
          'X-RateLimit-Remaining': rateLimitCheck.remaining.toString(),
        },
      }
    );
  } catch (error) {
    console.error('Feedback submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  const apiKey = authHeader?.split(' ')[1];

  if (apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    count: feedbackStore.length,
    recent: feedbackStore.slice(-10).reverse(),
  });
}
