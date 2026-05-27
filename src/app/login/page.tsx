'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, Lock } from 'lucide-react';

function LoginInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get('next') ?? '/dashboard';

  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? 'Falha no login');
      router.replace(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha no login');
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
        <h1 className="mt-6 font-serif text-2xl">Área interna</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Entre para acessar o painel de leads.
        </p>

        <label className="block mt-6 text-xs uppercase tracking-wider text-[var(--muted)]">
          Senha
        </label>
        <div className="relative mt-1">
          <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            className="field !pl-9"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2">
            {error}
          </p>
        )}

        <button type="submit" disabled={busy} className="btn-gold w-full mt-6 disabled:opacity-70">
          {busy && <Loader2 size={18} className="animate-spin" />}
          {busy ? 'Entrando...' : 'Entrar'}
        </button>

        <a href="/" className="block mt-4 text-center text-xs text-[var(--muted)] hover:text-[var(--ink)]">
          ← Voltar para o site
        </a>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
