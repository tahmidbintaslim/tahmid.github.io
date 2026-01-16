import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { contactFormSchema } from '@/lib/validation';
import { sanitizeName, sanitizeEmail, sanitizeMessage, escapeHtml } from '@/lib/sanitize';
import { getRateLimitKey, checkRateLimit, rateLimitResponse, RATE_LIMIT_CONFIG } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';
import { isSameOrigin, validateCsrfToken } from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    // CSRF Protection
    if (!validateCsrfToken(request)) {
      return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
    }
    if (!isSameOrigin(request)) {
      return NextResponse.json({ error: 'Invalid request origin' }, { status: 403 });
    }

    // Check rate limit
    const key = getRateLimitKey(request, 'contact');
    const rateLimitCheck = await checkRateLimit(key, RATE_LIMIT_CONFIG.contact);

    if (!rateLimitCheck.allowed) {
      return rateLimitResponse(rateLimitCheck.remaining, rateLimitCheck.resetTime);
    }

    const body = await request.json();

    // Validate input with zod
    const validation = contactFormSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validation.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message
          }))
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validation.data;

    // Sanitize inputs
    const sanitizedName = sanitizeName(name);
    const sanitizedEmail = sanitizeEmail(email);
    const sanitizedMessage = sanitizeMessage(message);
    const sanitizedSubject = escapeHtml(subject);

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email options with sanitized content
    const mailOptions = {
      from: `"${sanitizedName}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'tahmidbintaslimrafi@gmail.com',
      replyTo: sanitizedEmail,
      subject: `Portfolio Contact: ${sanitizedSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">New Contact Form Submission</h2>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${escapeHtml(sanitizedName)}</p>
            <p><strong>Email:</strong> ${escapeHtml(sanitizedEmail)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(sanitizedSubject)}</p>
          </div>
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Message:</h3>
            <p style="color: #4b5563; line-height: 1.6;">${escapeHtml(sanitizedMessage).replace(/\n/g, '<br>')}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 8px;">
            <p style="margin: 0; color: #92400e;">
              <strong>Reply to:</strong> <a href="mailto:${escapeHtml(sanitizedEmail)}" style="color: #7c3aed;">${escapeHtml(sanitizedEmail)}</a>
            </p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${sanitizedName}
Email: ${sanitizedEmail}
Subject: ${sanitizedSubject}

Message:
${sanitizedMessage}

Reply to: ${sanitizedEmail}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      {
        status: 200,
        headers: {
          'X-RateLimit-Remaining': rateLimitCheck.remaining.toString(),
        },
      }
    );
  } catch (error) {
    logger.error('Error sending email', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
