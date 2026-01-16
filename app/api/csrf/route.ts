import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

export async function GET() {
  const token = randomBytes(32).toString('hex');
  const response = NextResponse.json({ token });

  response.cookies.set({
    name: 'csrf-token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });

  return response;
}
