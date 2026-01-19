import { kv } from '@vercel/kv';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const TOTAL_VISITORS_KEY = 'totalVisitors';
const ACTIVE_SESSION_PREFIX = 'session:';
const SESSION_TTL = 5 * 60; // 5 minutes in seconds

async function getTotalVisitors(): Promise<number> {
  let total = await kv.get<number>(TOTAL_VISITORS_KEY);
  if (total === null) {
    // Initialize if not set
    total = 1247; // Starting count
    await kv.set(TOTAL_VISITORS_KEY, total);
  }
  return total;
}

async function getActiveVisitors(): Promise<number> {
  const sessionKeys = await kv.keys(`${ACTIVE_SESSION_PREFIX}*`);
  return sessionKeys.length;
}

export async function GET() {
  const [totalVisitors, activeVisitors] = await Promise.all([
    getTotalVisitors(),
    getActiveVisitors(),
  ]);

  return NextResponse.json({
    success: true,
    totalVisitors,
    activeVisitors: Math.max(1, activeVisitors),
    lastUpdated: new Date().toISOString(),
  });
}

export async function POST(_request: Request) {
  try {
    const cookieStore = await cookies();
    let visitorId = cookieStore.get('visitor_id')?.value;
    let isNewVisitor = false;

    if (!visitorId) {
      visitorId = `v_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
      isNewVisitor = true;
      await kv.incr(TOTAL_VISITORS_KEY);
    }

    const sessionKey = `${ACTIVE_SESSION_PREFIX}${visitorId}`;
    await kv.set(sessionKey, '1', { ex: SESSION_TTL });

    const [totalVisitors, activeVisitors] = await Promise.all([
      getTotalVisitors(),
      getActiveVisitors(),
    ]);

    const response = NextResponse.json({
      success: true,
      visitorId,
      isNewVisitor,
      totalVisitors,
      activeVisitors: Math.max(1, activeVisitors),
      lastUpdated: new Date().toISOString(),
    });

    if (isNewVisitor) {
      response.cookies.set('visitor_id', visitorId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 365 * 24 * 60 * 60, // 1 year
      });
    }

    return response;
  } catch (error) {
    console.error('Visitor tracking error:', error);
    const totalVisitors = await getTotalVisitors();
    const activeVisitors = await getActiveVisitors();
    return NextResponse.json({
      success: true,
      totalVisitors,
      activeVisitors: Math.max(1, activeVisitors),
    });
  }
}
