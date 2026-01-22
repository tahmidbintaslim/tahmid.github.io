import { NextResponse, type NextRequest } from 'next/server';
import { kv } from '@vercel/kv';

const TOTAL_VISITORS_KEY = 'totalVisitors';
const ACTIVE_SESSION_PREFIX = 'session:';
const SESSION_TTL = 5 * 60; // 5 minutes in seconds

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const existingId = request.cookies.get('visitor_id')?.value;
  let visitorId = existingId;
  let isNewVisitor = false;

  if (!visitorId) {
    visitorId = `v_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    isNewVisitor = true;
  }

  if (isNewVisitor) {
    await kv.incr(TOTAL_VISITORS_KEY);
    response.cookies.set('visitor_id', visitorId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 365 * 24 * 60 * 60,
    });
  }

  await kv.set(`${ACTIVE_SESSION_PREFIX}${visitorId}`, '1', {
    ex: SESSION_TTL,
  });

  return response;
}

export const config = {
  matcher: ['/'],
};
