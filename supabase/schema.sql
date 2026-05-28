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
  notas        text,
  produto_vendido text,
  valor_venda     numeric(12,2)
);

-- Migração: adiciona as colunas se já existir uma tabela antiga
alter table public.leads add column if not exists produto_vendido text;
alter table public.leads add column if not exists valor_venda     numeric(12,2);

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

-- =============================================================
-- Membros: perfil 1:1 com auth.users
-- =============================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  nome text,
  email text
);

create index if not exists profiles_email_idx on public.profiles (email);

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

-- Cria profile automaticamente quando um usuário é criado via Supabase Auth
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, nome)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'nome', ''));
  return new;
end;
$$;

drop trigger if exists trg_on_auth_user_created on auth.users;
create trigger trg_on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;

drop policy if exists profiles_self_select on public.profiles;
create policy profiles_self_select on public.profiles
  for select using (auth.uid() = id);

drop policy if exists profiles_self_update on public.profiles;
create policy profiles_self_update on public.profiles
  for update using (auth.uid() = id);
