import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { getServiceSupabase } from '@/lib/supabase';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';

const leadSchema = z.object({
  nome: z.string().min(2, 'Informe seu nome').max(120),
  telefone: z.string().min(8, 'Telefone inválido').max(40),
  email: z.string().email('E-mail inválido').max(160).optional().or(z.literal('')),
  cidade: z.string().max(80).optional().or(z.literal('')),
  tipo_obra: z.string().max(80).optional().or(z.literal('')),
  materiais: z.string().max(200).optional().or(z.literal('')),
  mensagem: z.string().max(2000).optional().or(z.literal('')),
  origem: z.string().max(60).optional().or(z.literal('')),
});

function blank(v: string | undefined) {
  if (v === undefined) return null;
  const t = v.trim();
  return t === '' ? null : t;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'JSON inválido' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Dados inválidos' },
      { status: 400 },
    );
  }
  const d = parsed.data;

  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from('leads')
    .insert({
      nome: d.nome.trim(),
      telefone: d.telefone.trim(),
      email: blank(d.email),
      cidade: blank(d.cidade),
      tipo_obra: blank(d.tipo_obra),
      materiais: blank(d.materiais),
      mensagem: blank(d.mensagem),
      origem: blank(d.origem) ?? 'site',
      status: 'novo',
    })
    .select('id')
    .single();

  if (error) {
    console.error('[leads:create]', error);
    return NextResponse.json({ ok: false, error: 'Não foi possível registrar agora.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: data.id }, { status: 201 });
}

export async function GET() {
  const store = await cookies();
  if (!verifySessionToken(store.get(SESSION_COOKIE)?.value)) {
    return NextResponse.json({ ok: false, error: 'Não autorizado' }, { status: 401 });
  }

  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(500);

  if (error) {
    console.error('[leads:list]', error);
    return NextResponse.json({ ok: false, error: 'Erro ao buscar leads' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, leads: data });
}
