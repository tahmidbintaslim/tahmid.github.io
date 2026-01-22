import { NextResponse } from 'next/server';

import { getVisitorStats } from '@/app/actions/visitors';

export async function GET() {
  const stats = await getVisitorStats();
  return NextResponse.json({
    success: true,
    ...stats,
  });
}

export async function POST() {
  const stats = await getVisitorStats();
  return NextResponse.json({
    success: true,
    ...stats,
  });
}
