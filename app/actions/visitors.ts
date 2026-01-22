'use server';

import { kv } from '@vercel/kv';
import { cookies } from 'next/headers';

const TOTAL_VISITORS_KEY = 'totalVisitors';
const ACTIVE_SESSION_PREFIX = 'session:';
const SESSION_TTL = 5 * 60; // 5 minutes in seconds

export type VisitorStats = {
  totalVisitors: number;
  activeVisitors: number;
  isNewVisitor: boolean;
  visitorId: string;
  lastUpdated: string;
};

export type VisitorStatsSummary = {
  totalVisitors: number;
  activeVisitors: number;
  lastUpdated: string;
};

async function getTotalVisitors(): Promise<number> {
  let total = await kv.get<number>(TOTAL_VISITORS_KEY);
  if (total === null) {
    total = 1247;
    await kv.set(TOTAL_VISITORS_KEY, total);
  }
  return total;
}

async function getActiveVisitors(): Promise<number> {
  const sessionKeys = await kv.keys(`${ACTIVE_SESSION_PREFIX}*`);
  return sessionKeys.length;
}

export async function getVisitorStats(): Promise<VisitorStatsSummary> {
  const [totalVisitors, activeVisitors] = await Promise.all([
    getTotalVisitors(),
    getActiveVisitors(),
  ]);

  return {
    totalVisitors,
    activeVisitors: Math.max(1, activeVisitors),
    lastUpdated: new Date().toISOString(),
  };
}

export async function trackVisitor(): Promise<VisitorStats> {
  const cookieStore = await cookies();
  let visitorId = cookieStore.get('visitor_id')?.value;
  let isNewVisitor = false;

  if (!visitorId) {
    visitorId = `v_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    isNewVisitor = true;
    await kv.incr(TOTAL_VISITORS_KEY);
    try {
      cookieStore.set('visitor_id', visitorId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 365 * 24 * 60 * 60,
      });
    } catch (error) {
      console.warn('Unable to set visitor cookie:', error);
    }
  }

  const sessionKey = `${ACTIVE_SESSION_PREFIX}${visitorId}`;
  await kv.set(sessionKey, '1', { ex: SESSION_TTL });

  const [totalVisitors, activeVisitors] = await Promise.all([
    getTotalVisitors(),
    getActiveVisitors(),
  ]);

  return {
    totalVisitors,
    activeVisitors: Math.max(1, activeVisitors),
    isNewVisitor,
    visitorId,
    lastUpdated: new Date().toISOString(),
  };
}
