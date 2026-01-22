'use server';

import { feedbackSchema } from '@/lib/validation';
import { sanitizeEmail, sanitizeMessage } from '@/lib/sanitize';

export type FormState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  fieldErrors?: {
    type?: string[];
    message?: string[];
    email?: string[];
  };
};

export async function submitFeedbackForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const validation = feedbackSchema.safeParse({
      type: formData.get('type'),
      message: formData.get('message'),
      email: formData.get('email'),
      page: formData.get('page'),
    });

    if (!validation.success) {
      return {
        status: 'error',
        message: 'Validation failed',
        fieldErrors: validation.error.flatten().fieldErrors,
      };
    }

    const { type, message, email, page } = validation.data;

    // Sanitize inputs
    const sanitizedMessage = sanitizeMessage(message);
    const sanitizedEmail = email ? sanitizeEmail(email) : undefined;

    // In a real application, you would save this feedback to a database
    // or send it to an external service (e.g., email, Sentry, etc.)
    console.log('New feedback received:', {
      type,
      message: sanitizedMessage,
      email: sanitizedEmail,
      page,
      timestamp: new Date().toISOString(),
    });

    return {
      status: 'success',
      message: 'Thank you for your feedback!',
    };
  } catch (error) {
    console.error('Feedback submission error:', error);
    return {
      status: 'error',
      message: 'Failed to submit feedback. Please try again later.',
    };
  }
}
