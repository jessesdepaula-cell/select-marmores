import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getServiceSupabase } from '@/lib/supabase';
import { MEMBER_COOKIE, verifyMemberToken } from '@/lib/member-auth';

type Body = { nome?: string; email?: string; password?: string };

export async function POST(req: NextRequest) {
  const store = await cookies();
  const session = verifyMemberToken(store.get(MEMBER_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ ok: false, error: 'Não autenticado.' }, { status: 401 });
  }

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
    return NextResponse.json({ ok: false, error: 'Informe o nome.' }, { status: 400 });
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

  const supabase = getServiceSupabase();
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { nome },
  });

  if (error || !data?.user) {
    return NextResponse.json(
      { ok: false, error: error?.message ?? 'Falha ao criar usuário.' },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true, user: { id: data.user.id, email: data.user.email } });
}
