-- Schema para o dashboard de leads do Select Mármores
-- Rode este SQL no SQL Editor do Supabase (https://app.supabase.com)

create extension if not exists "uuid-ossp";

create table if not exists public.leads (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  nome         text not null,
  telefone     text not null,
  email        text,
  cidade       text,
  tipo_obra    text,
  materiais    text,
  mensagem     text,
  origem       text default 'site',
  status       text not null default 'novo' check (status in ('novo','em_contato','orcamento_enviado','convertido','perdido')),
  notas        text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx     on public.leads (status);

-- updated_at automático
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists trg_leads_updated_at on public.leads;
create trigger trg_leads_updated_at before update on public.leads
  for each row execute function public.set_updated_at();

-- RLS: bloqueia anon; o servidor usa a service role key e ignora RLS.
alter table public.leads enable row level security;
-- Sem policies = ninguém com chave anon consegue ler/escrever direto.
-- O insert vem da API server-side com a service role key.
