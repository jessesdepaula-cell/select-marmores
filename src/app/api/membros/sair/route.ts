import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { MEMBER_COOKIE } from '@/lib/member-auth';

export async function POST() {
  const store = await cookies();
  store.delete(MEMBER_COOKIE);
  return NextResponse.json({ ok: true });
}
