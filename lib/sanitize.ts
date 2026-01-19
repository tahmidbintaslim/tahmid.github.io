import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize user input to prevent XSS attacks
 * Only removes HTML/script tags, preserves text content
 */
export function sanitizeInput(input: string): string {
  // Remove any HTML tags and encode special characters
  const config = {
    ALLOWED_TAGS: [] as string[], // No HTML tags allowed
    ALLOWED_ATTR: [] as string[], // No attributes allowed
    KEEP_CONTENT: true,
  };

  return DOMPurify.sanitize(input, config);
}

/**
 * Escape special characters for safe HTML output
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Validate and sanitize email
 */
export function sanitizeEmail(email: string): string {
  return sanitizeInput(email).toLowerCase().trim();
}

/**
 * Validate and sanitize name
 */
export function sanitizeName(name: string): string {
  const sanitized = sanitizeInput(name);
  // Remove any non-letter characters except spaces, hyphens, and apostrophes
  return sanitized.replace(/[^a-zA-Z\s'-]/g, '').trim();
}

/**
 * Validate and sanitize message (allow more flexibility for text)
 */
export function sanitizeMessage(message: string): string {
  const sanitized = sanitizeInput(message);
  // Normalize whitespace
  return sanitized.replace(/\s+/g, ' ').trim();
}
