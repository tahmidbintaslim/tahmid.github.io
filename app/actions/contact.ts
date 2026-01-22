'use server';

import nodemailer from 'nodemailer';
import { headers } from 'next/headers';
import { contactFormSchema } from '@/lib/validation';
import {
  escapeHtml,
  sanitizeEmail,
  sanitizeMessage,
  sanitizeName,
} from '@/lib/sanitize';
import { themeColors } from '@/lib/theme';
import { logger } from '@/lib/logger';
import {
  checkRateLimit,
  getRateLimitKeyFromHeaders,
  RATE_LIMIT_CONFIG,
} from '@/lib/rate-limit';

export type FormState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  errors?: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };
};

export async function submitContactForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const headerList = await headers();
    const originHeader =
      headerList.get('origin') || headerList.get('referer');
    const host = headerList.get('host');
    const proto = headerList.get('x-forwarded-proto') || 'https';

    if (originHeader) {
      try {
        const origin = new URL(originHeader).origin;
        const expectedOrigin = host ? `${proto}://${host}` : origin;
        if (origin !== expectedOrigin) {
          return {
            status: 'error',
            message: 'Invalid request origin.',
          };
        }
      } catch {
        return {
          status: 'error',
          message: 'Invalid request origin.',
        };
      }
    }

    const rateLimitKey = getRateLimitKeyFromHeaders(headerList, 'contact');
    const rateLimitCheck = await checkRateLimit(
      rateLimitKey,
      RATE_LIMIT_CONFIG.contact
    );

    if (!rateLimitCheck.allowed) {
      return {
        status: 'error',
        message: 'Too many requests. Please try again later.',
      };
    }

    const validation = contactFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    });

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      return {
        status: 'error',
        message: validation.error.flatten().formErrors.join(', '),
        errors: {
          name: fieldErrors.name?.[0],
          email: fieldErrors.email?.[0],
          subject: fieldErrors.subject?.[0],
          message: fieldErrors.message?.[0],
        },
      };
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
    const emailColors = {
      heading: themeColors.brand[500],
      panel: themeColors.neutral.gray50,
      card: themeColors.neutral.white,
      cardBorder: themeColors.neutral.gray200,
      textHeading: themeColors.neutral.gray700,
      textBody: themeColors.neutral.gray600,
      highlight: themeColors.warning[100],
      highlightText: themeColors.warning[800],
      link: themeColors.brand[500],
    };

    const mailOptions = {
      from: `"${sanitizedName}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'tahmidbintaslimrafi@gmail.com',
      replyTo: sanitizedEmail,
      subject: `Portfolio Contact: ${sanitizedSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: ${emailColors.heading};">New Contact Form Submission</h2>
          <div style="background: ${emailColors.panel}; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${escapeHtml(sanitizedName)}</p>
            <p><strong>Email:</strong> ${escapeHtml(sanitizedEmail)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(sanitizedSubject)}</p>
          </div>
          <div style="background: ${emailColors.card}; padding: 20px; border: 1px solid ${emailColors.cardBorder}; border-radius: 8px;">
            <h3 style="color: ${emailColors.textHeading}; margin-top: 0;">Message:</h3>
            <p style="color: ${emailColors.textBody}; line-height: 1.6;">${escapeHtml(
        sanitizedMessage
      ).replace(/\n/g, '<br>')}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background: ${emailColors.highlight}; border-radius: 8px;">
            <p style="margin: 0; color: ${emailColors.highlightText};">
              <strong>Reply to:</strong> <a href="mailto:${escapeHtml(
        sanitizedEmail
      )}" style="color: ${emailColors.link};">${escapeHtml(sanitizedEmail)}</a>
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

    return {
      status: 'success',
      message: 'Message sent successfully!',
    };
  } catch (error) {
    logger.error('Error sending email', error);
    return {
      status: 'error',
      message: 'Failed to send email. Please try again later.',
    };
  }
}
