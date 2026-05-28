import { createClient } from '@supabase/supabase-js';

export type LeadStatus =
  | 'novo'
  | 'em_contato'
  | 'orcamento_enviado'
  | 'convertido'
  | 'perdido';

export type Lead = {
  id: string;
  created_at: string;
  updated_at: string;
  nome: string;
  telefone: string;
  email: string | null;
  cidade: string | null;
  tipo_obra: string | null;
  materiais: string | null;
  mensagem: string | null;
  origem: string | null;
  status: LeadStatus;
  notas: string | null;
  produto_vendido: string | null;
  valor_venda: number | null;
};

export function getServiceSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      'Faltam variáveis NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY no .env.local',
    );
  }
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
