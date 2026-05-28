import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAnonSupabase } from '@/lib/supabase-auth';
import { createMemberToken, MEMBER_COOKIE, MEMBER_MAX_AGE } from '@/lib/member-auth';

type Body = { nome?: string; email?: string; password?: string };

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'JSON inválido' }, { status: 400 });
  }

  const nome = (body.nome ?? '').trim();
  const email = (body.email ?? '').trim().toLowerCase();
  const password = body.password ?? '';

  if (nome.length < 2) {
    return NextResponse.json({ ok: false, error: 'Informe seu nome.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'E-mail inválido.' }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json(
      { ok: false, error: 'A senha deve ter pelo menos 8 caracteres.' },
      { status: 400 },
    );
  }

  const supabase = getAnonSupabase();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { nome } },
  });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }

  if (!data.session || !data.user) {
    return NextResponse.json({
      ok: true,
      needsConfirmation: true,
      message: 'Cadastro realizado. Verifique seu e-mail para confirmar a conta.',
    });
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
