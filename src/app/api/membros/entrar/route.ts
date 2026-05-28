import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAnonSupabase } from '@/lib/supabase-auth';
import { createMemberToken, MEMBER_COOKIE, MEMBER_MAX_AGE } from '@/lib/member-auth';

type Body = { email?: string; password?: string };

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'JSON inválido' }, { status: 400 });
  }

  const email = (body.email ?? '').trim().toLowerCase();
  const password = body.password ?? '';
  if (!email || !password) {
    return NextResponse.json({ ok: false, error: 'Informe e-mail e senha.' }, { status: 400 });
  }

  const supabase = getAnonSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    return NextResponse.json(
      { ok: false, error: 'E-mail ou senha incorretos.' },
      { status: 401 },
    );
  }

  const token = createMemberToken({ userId: data.user.id, email: data.user.email ?? email });
  const store = await cookies();
  store.set(MEMBER_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MEMBER_MAX_AGE,
  });

  return NextResponse.json({ ok: true });
}
