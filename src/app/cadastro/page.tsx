'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Lock, Mail, User } from 'lucide-react';

export default function CadastroPage() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setInfo(null);
    try {
      const res = await fetch('/api/membros/cadastro', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ nome, email, password }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? 'Falha no cadastro');

      if (json.needsConfirmation) {
        setInfo(json.message ?? 'Verifique seu e-mail para confirmar a conta.');
        setBusy(false);
        return;
      }

      router.replace('/membros');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha no cadastro');
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 marble-bg">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-[var(--bg)] border border-[var(--line)] p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)]"
      >
        <div className="flex items-center gap-2 font-serif text-lg">
          <span className="inline-block w-2.5 h-2.5 rotate-45 bg-[var(--gold)]" />
          <span>SELECT MÁRMORES</span>
        </div>
        <h1 className="mt-6 font-serif text-2xl">Criar conta</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Cadastre-se para acessar sua área de membro.
        </p>

        <label className="block mt-6 text-xs uppercase tracking-wider text-[var(--muted)]">
          Nome
        </label>
        <div className="relative mt-1">
          <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            autoFocus
            autoComplete="name"
            className="field !pl-9"
            placeholder="Seu nome"
          />
        </div>

        <label className="block mt-4 text-xs uppercase tracking-wider text-[var(--muted)]">
          E-mail
        </label>
        <div className="relative mt-1">
          <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="field !pl-9"
            placeholder="voce@exemplo.com"
          />
        </div>

        <label className="block mt-4 text-xs uppercase tracking-wider text-[var(--muted)]">
          Senha
        </label>
        <div className="relative mt-1">
          <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            minLength={8}
            className="field !pl-9"
            placeholder="Mínimo 8 caracteres"
          />
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2">
            {error}
          </p>
        )}
        {info && (
          <p className="mt-3 text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-2">
            {info}
          </p>
        )}

        <button type="submit" disabled={busy} className="btn-gold w-full mt-6 disabled:opacity-70">
          {busy && <Loader2 size={18} className="animate-spin" />}
          {busy ? 'Criando conta...' : 'Criar conta'}
        </button>

        <p className="mt-5 text-center text-sm text-[var(--muted)]">
          Já tem conta?{' '}
          <Link href="/entrar" className="text-[var(--ink)] underline">
            Entrar
          </Link>
        </p>
        <Link href="/" className="block mt-2 text-center text-xs text-[var(--muted)] hover:text-[var(--ink)]">
          ← Voltar para o site
        </Link>
      </form>
    </div>
  );
}
