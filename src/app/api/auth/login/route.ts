import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from '@/lib/auth';

export async function POST(req: NextRequest) {
  let body: { password?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'JSON inválido' }, { status: 400 });
  }

  const expected = process.env.DASHBOARD_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: 'DASHBOARD_PASSWORD não configurada no servidor' },
      { status: 500 },
    );
  }

  if (!body.password || body.password !== expected) {
    return NextResponse.json({ ok: false, error: 'Senha incorreta' }, { status: 401 });
  }

  const token = createSessionToken();
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });

  return NextResponse.json({ ok: true });
}
