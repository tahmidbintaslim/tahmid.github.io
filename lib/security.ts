import type { NextRequest } from 'next/server';

export function isSameOrigin(request: NextRequest): boolean {
  const originHeader = request.headers.get('origin');
  const refererHeader = request.headers.get('referer');
  let origin: string | null = originHeader;

  if (!origin && refererHeader) {
    try {
      origin = new URL(refererHeader).origin;
    } catch {
      origin = null;
    }
  }

  if (!origin) {
    return true;
  }

  return origin === new URL(request.url).origin;
}

export function validateCsrfToken(request: NextRequest): boolean {
  const token = request.headers.get('X-CSRF-Token');
  const cookieToken = request.cookies.get('csrf-token')?.value;
  return Boolean(token && cookieToken && token === cookieToken);
}
