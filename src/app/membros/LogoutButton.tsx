'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Loader2 } from 'lucide-react';

export default function LogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    setBusy(true);
    await fetch('/api/membros/sair', { method: 'POST' });
    router.replace('/');
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--ink)] disabled:opacity-60"
    >
      {busy ? <Loader2 size={16} className="animate-spin" /> : <LogOut size={16} />}
      Sair
    </button>
  );
}
