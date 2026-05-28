import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { getServiceSupabase } from '@/lib/supabase';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';
import { MEMBER_COOKIE, verifyMemberToken } from '@/lib/member-auth';

const updateSchema = z.object({
  status: z
    .enum(['novo', 'em_contato', 'orcamento_enviado', 'convertido', 'perdido'])
    .optional(),
  notas: z.string().max(2000).nullable().optional(),
  produto_vendido: z.string().max(500).nullable().optional(),
  valor_venda: z.number().nonnegative().nullable().optional(),
});

async function requireAuth() {
  const store = await cookies();
  if (verifySessionToken(store.get(SESSION_COOKIE)?.value)) return true;
  if (verifyMemberToken(store.get(MEMBER_COOKIE)?.value)) return true;
  return false;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await requireAuth())) {
    return NextResponse.json({ ok: false, error: 'Não autorizado' }, { status: 401 });
  }
  const { id } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'JSON inválido' }, { status: 400 });
  }

  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Dados inválidos' },
      { status: 400 },
    );
  }

  const patch: Record<string, unknown> = {};
  if (parsed.data.status !== undefined) patch.status = parsed.data.status;
  if (parsed.data.notas !== undefined) patch.notas = parsed.data.notas;
  if (parsed.data.produto_vendido !== undefined) patch.produto_vendido = parsed.data.produto_vendido;
  if (parsed.data.valor_venda !== undefined) patch.valor_venda = parsed.data.valor_venda;

  // Se sair de 'convertido' para outro status, limpa os campos de venda
  if (parsed.data.status !== undefined && parsed.data.status !== 'convertido') {
    if (patch.produto_vendido === undefined) patch.produto_vendido = null;
    if (patch.valor_venda === undefined) patch.valor_venda = null;
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ ok: false, error: 'Nada para atualizar' }, { status: 400 });
  }

  const supabase = getServiceSupabase();
  const { error } = await supabase.from('leads').update(patch).eq('id', id);
  if (error) {
    console.error('[leads:update]', error);
    return NextResponse.json({ ok: false, error: 'Erro ao atualizar' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await requireAuth())) {
    return NextResponse.json({ ok: false, error: 'Não autorizado' }, { status: 401 });
  }
  const { id } = await params;
  const supabase = getServiceSupabase();
  const { error } = await supabase.from('leads').delete().eq('id', id);
  if (error) {
    console.error('[leads:delete]', error);
    return NextResponse.json({ ok: false, error: 'Erro ao excluir' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
