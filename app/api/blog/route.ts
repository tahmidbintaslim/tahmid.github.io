import { NextResponse } from 'next/server';

import { getBlogPosts } from '@/lib/blog';

export async function GET() {
  const data = await getBlogPosts();

  return NextResponse.json(
    {
      success: true,
      ...data,
    },
    {
      headers: {
        'Cache-Control': data.fallback
          ? 'public, s-maxage=300, stale-while-revalidate=3600'
          : 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  );
}
