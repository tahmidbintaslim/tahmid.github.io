import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { checkContactRateLimit, getClientIP } from '@/lib/rate-limit-production';
import { ValidationError, ServerError, logError } from '@/lib/errors';
import {
  validateRequestOrigin,
  validateRequestSize,
  validateContentType,
  addSecurityHeaders,
  detectSuspiciousPatterns,
} from '@/lib/request-validation';

// Configuration
const CONTACT_CONFIG = {
  rateLimit: {
    requests: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
};

// Sanitize HTML entities to prevent XSS
function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// Validate environment variables
function validateConfig(): void {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new ServerError('SMTP configuration is incomplete');
  }
}

// Validate and sanitize input
function validateInput(data: Record<string, unknown>): {
  valid: boolean;
  error?: string;
  data?: { name: string; email: string; subject: string; message: string };
} {
  const { name, email, subject, message } = data;

  // Type checks
  if (typeof name !== 'string' || typeof email !== 'string' || typeof subject !== 'string' || typeof message !== 'string') {
    return { valid: false, error: 'Invalid input types' };
  }

  // Name validation: 2-100 chars, no excessive special chars
  const nameTrimmed = name.trim();
  if (nameTrimmed.length < 2 || nameTrimmed.length > 100) {
    return { valid: false, error: 'Name must be between 2 and 100 characters' };
  }
  if (!/^[a-zA-Z\s\-']+$/.test(nameTrimmed)) {
    return { valid: false, error: 'Name contains invalid characters' };
  }

  // Email validation: RFC 5322 simplified
  const emailTrimmed = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailTrimmed) || emailTrimmed.length > 254) {
    return { valid: false, error: 'Invalid email address' };
  }

  // Subject validation: 3-200 chars
  const subjectTrimmed = subject.trim();
  if (subjectTrimmed.length < 3 || subjectTrimmed.length > 200) {
    return { valid: false, error: 'Subject must be between 3 and 200 characters' };
  }

  // Message validation: 10-5000 chars
  const messageTrimmed = message.trim();
  if (messageTrimmed.length < 10 || messageTrimmed.length > 5000) {
    return { valid: false, error: 'Message must be between 10 and 5000 characters' };
  }

  return {
    valid: true,
    data: {
      name: nameTrimmed,
      email: emailTrimmed,
      subject: subjectTrimmed,
      message: messageTrimmed,
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    // Validate configuration first
    try {
      validateConfig();
    } catch (error) {
      logError(error, 'Config validation');
      const response = NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
      return addSecurityHeaders(response);
    }

    // Validate request origin (CSRF protection)
    if (!validateRequestOrigin(request)) {
      const response = NextResponse.json(
        { error: 'Invalid request origin' },
        { status: 403 }
      );
      return addSecurityHeaders(response);
    }

    // Validate content type
    if (!validateContentType(request.headers.get('content-type'))) {
      const response = NextResponse.json(
        { error: 'Invalid content type' },
        { status: 415 }
      );
      return addSecurityHeaders(response);
    }

    // Validate request size (max 1MB)
    if (!validateRequestSize(request.headers.get('content-length'), 1024 * 1024)) {
      const response = NextResponse.json(
        { error: 'Request body too large' },
        { status: 413 }
      );
      return addSecurityHeaders(response);
    }

    // Rate limiting
    const clientIP = getClientIP(request.headers);
    const { allowed, remaining, reset } = await checkContactRateLimit(clientIP);

    const rateLimitHeaders = {
      'RateLimit-Limit': CONTACT_CONFIG.rateLimit.requests.toString(),
      'RateLimit-Remaining': remaining.toString(),
      'RateLimit-Reset': new Date(reset).toISOString(),
    };

    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many contact requests. Please try again later.' },
        { status: 429, headers: rateLimitHeaders }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      logError(error, 'JSON parse error');
      throw new ValidationError('Invalid request body');
    }

    // Detect suspicious patterns (SQL injection, XSS, etc.)
    if (detectSuspiciousPatterns(body)) {
      logError(new Error('Suspicious pattern detected'), 'Security check');
      const response = NextResponse.json(
        { error: 'Invalid input detected' },
        { status: 400 }
      );
      return addSecurityHeaders(response);
    }

    const validation = validateInput(body);

    if (!validation.valid) {
      const response = NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
      return addSecurityHeaders(response);
    }

    const { name, email, subject, message } = validation.data!;

    // Create transporter
    let transporter;
    try {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } catch (error) {
      logError(error, 'SMTP transporter creation');
      throw new ServerError('Email service unavailable');
    }

    // Email options
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'contact@example.com',
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">New Contact Form Submission</h2>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${sanitizeHtml(name)}</p>
            <p><strong>Email:</strong> ${sanitizeHtml(email)}</p>
            <p><strong>Subject:</strong> ${sanitizeHtml(subject)}</p>
          </div>
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Message:</h3>
            <p style="color: #4b5563; line-height: 1.6;">${sanitizeHtml(message).replace(/\n/g, '<br>')}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 8px;">
            <p style="margin: 0; color: #92400e;">
              <strong>Reply to:</strong> <a href="mailto:${sanitizeHtml(email)}" style="color: #7c3aed;">${sanitizeHtml(email)}</a>
            </p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${sanitizeHtml(name)}
Email: ${sanitizeHtml(email)}
Subject: ${sanitizeHtml(subject)}

Message:
${sanitizeHtml(message)}

Reply to: ${sanitizeHtml(email)}
      `,
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      logError(error, 'Email send error');
      throw new ServerError('Failed to send email');
    }

    const response = NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200, headers: rateLimitHeaders }
    );
    return addSecurityHeaders(response);
  } catch (error) {
    logError(error, 'Contact API error');

    if (error instanceof ValidationError) {
      const response = NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
      return addSecurityHeaders(response);
    }

    if (error instanceof ServerError) {
      const response = NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
      return addSecurityHeaders(response);
    }

    const errorResponse = NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
    return addSecurityHeaders(errorResponse);
  }
}
