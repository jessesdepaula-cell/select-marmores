# Select Mármores

Site institucional + dashboard de leads para a marmoraria Select Mármores.

Construído com **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Supabase**.
Pronto para deploy na Vercel.

## ✨ O que tem aqui

- **Landing institucional** (`/`) — hero, sobre, materiais, projetos, processo, formulário de orçamento e WhatsApp flutuante.
- **API de leads** (`POST /api/leads`) — valida e grava no Supabase.
- **Login interno** (`/login`) — senha única protegida por cookie HMAC assinado.
- **Dashboard de leads** (`/dashboard`) — listagem com busca, filtro por status, detalhes, alteração de status, notas internas, exclusão e atalho de WhatsApp por lead.
- **Proxy** (`src/proxy.ts`) — protege `/dashboard/*` redirecionando para o login quando não autenticado.

## 🛠 Setup local

### 1. Instalar dependências

```bash
npm install
```

### 2. Criar projeto Supabase

1. Acesse https://app.supabase.com e crie um novo projeto.
2. Vá em **SQL Editor → New query** e rode o conteúdo de [`supabase/schema.sql`](supabase/schema.sql).
3. Em **Project Settings → API**, copie:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY` *(secret — nunca exponha)*

### 3. Variáveis de ambiente

Copie o exemplo e preencha:

```bash
cp .env.local.example .env.local
```

| Variável | O que é |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave pública anon (mantida para referência) |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave service role — usada pelo backend para inserir/listar leads |
| `DASHBOARD_PASSWORD` | Senha de acesso ao `/dashboard` |
| `SESSION_SECRET` | String aleatória de 32+ chars para assinar o cookie. Gere com `openssl rand -hex 32` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número do WhatsApp **só com dígitos**, com DDI (ex.: `556294650630`) |
| `NEXT_PUBLIC_WHATSAPP_DISPLAY` | Como o número aparece no site (ex.: `(62) 9465-0630`) |

### 4. Rodar

```bash
npm run dev
```

Abra http://localhost:3000. Login em `/login`, dashboard em `/dashboard`.

## ☁️ Deploy na Vercel

1. **Push para o GitHub** — este repositório já está configurado.
2. Em https://vercel.com/new, importe o repositório `select-marmores`.
3. Em **Environment Variables**, adicione todas as variáveis listadas acima. Marque `SUPABASE_SERVICE_ROLE_KEY` e `SESSION_SECRET` como **Sensitive**.
4. Clique em **Deploy** — a Vercel detecta Next.js automaticamente.
5. Configure seu domínio em **Settings → Domains** depois do primeiro deploy.

## 🔐 Como funciona a autenticação do dashboard

- O usuário envia a senha em `POST /api/auth/login`.
- O servidor compara com `DASHBOARD_PASSWORD`; em caso de match, grava um cookie `sm_session` HttpOnly assinado com HMAC-SHA256 usando `SESSION_SECRET`.
- O `src/proxy.ts` lê o cookie em cada request a `/dashboard/*` e redireciona para `/login?next=...` quando inválido ou expirado.
- Sessões valem 12 horas (ajuste em `src/lib/auth.ts`).

## 🗃 Modelo de dados

Tabela `public.leads`:

| coluna | tipo | obs |
|---|---|---|
| id | uuid | PK |
| created_at / updated_at | timestamptz | auto |
| nome | text | obrigatório |
| telefone | text | obrigatório |
| email, cidade, tipo_obra, materiais, mensagem | text | opcionais |
| origem | text | default `site` |
| status | text | `novo`, `em_contato`, `orcamento_enviado`, `convertido`, `perdido` |
| notas | text | anotações internas |

A tabela tem **RLS habilitado sem policies** — apenas a service role key (servidor) lê/escreve. A chave anon não tem acesso.

## 📂 Estrutura

```
src/
├── app/
│   ├── api/
│   │   ├── auth/{login,logout}/route.ts
│   │   └── leads/route.ts, leads/[id]/route.ts
│   ├── dashboard/{page.tsx, DashboardClient.tsx}
│   ├── login/page.tsx
│   ├── layout.tsx, page.tsx, globals.css
├── components/   (Navbar, Hero, About, Materials, Projects, Process,
│                  LeadForm, Footer, WhatsAppFloat)
├── lib/{supabase.ts, auth.ts}
└── proxy.ts      (auth middleware do Next 16)
supabase/schema.sql
```

## 📞 Contato configurado

WhatsApp: **(62) 9465-0630**
