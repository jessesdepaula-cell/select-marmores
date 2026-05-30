'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Loader2, X, MessageCircle, CheckCircle2 } from 'lucide-react';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '556285323506';
const WHATSAPP_DISPLAY = process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? '(62) 8532-3506';

export type QuickContactOrigin =
  | 'cta_navbar'
  | 'cta_hero'
  | 'cta_projetos'
  | 'cta_whatsapp_float'
  | 'cta_form_whatsapp'
  | 'cta_footer'
  | 'cta_generic';

type OpenOptions = {
  origem: QuickContactOrigin;
  title?: string;
  subtitle?: string;
  cta?: string;
  waMessage?: string;
};

type Ctx = {
  open: (opts: OpenOptions) => void;
};

const QuickContactCtx = createContext<Ctx | null>(null);

export function useQuickContact(): Ctx {
  const v = useContext(QuickContactCtx);
  if (!v) throw new Error('useQuickContact precisa do QuickContactProvider');
  return v;
}

type State = 'idle' | 'sending' | 'sent' | 'error';

export function QuickContactProvider({ children }: { children: React.ReactNode }) {
  const [opts, setOpts] = useState<OpenOptions | null>(null);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState<string | null>(null);

  const open = useCallback((next: OpenOptions) => {
    setOpts(next);
    setState('idle');
    setError(null);
  }, []);

  const close = useCallback(() => {
    if (state === 'sending') return;
    setOpts(null);
    setNome('');
    setTelefone('');
    setError(null);
    setState('idle');
  }, [state]);

  useEffect(() => {
    if (!opts) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [opts, close]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!opts) return;
    if (nome.trim().length < 2) {
      setError('Informe seu nome.');
      return;
    }
    if (telefone.replace(/\D+/g, '').length < 8) {
      setError('Telefone inválido.');
      return;
    }

    setState('sending');
    setError(null);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          nome: nome.trim(),
          telefone: telefone.trim(),
          origem: opts.origem,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? 'Falha ao enviar');
      setState('sent');

      const firstName = nome.trim().split(/\s+/)[0] ?? '';
      const defaultMsg = `Olá! Sou ${firstName} e vim pelo site da Select Mármores. Gostaria de mais informações.`;
      const text = opts.waMessage ? `${opts.waMessage} — Sou ${firstName}.` : defaultMsg;
      const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
      // Pequeno atraso pra usuário ver o "enviado"
      setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer');
        close();
      }, 700);
    } catch (err) {
      setState('error');
      setError(err instanceof Error ? err.message : 'Falha ao enviar');
    }
  }

  const ctx = useMemo<Ctx>(() => ({ open }), [open]);

  return (
    <QuickContactCtx.Provider value={ctx}>
      {children}
      {opts && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full sm:max-w-md bg-white text-[var(--ink)] shadow-2xl rounded-t-2xl sm:rounded-2xl overflow-hidden animate-[slideUp_.25s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Fechar"
              className="absolute top-3 right-3 p-2 text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
              disabled={state === 'sending'}
            >
              <X size={18} />
            </button>

            <div className="px-6 pt-7 pb-5 bg-[var(--ink)] text-white">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/70">
                <span className="inline-block w-1.5 h-1.5 rotate-45 bg-[#e8a4a4]" />
                Falar com a Select
              </div>
              <h3 className="mt-3 font-serif text-2xl leading-snug">
                {opts.title ?? 'Como te chamamos no WhatsApp?'}
              </h3>
              <p className="mt-2 text-sm text-white/70">
                {opts.subtitle ?? 'Deixe nome e telefone — nosso time já abre o WhatsApp e te chama em seguida.'}
              </p>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white"
              >
                <MessageCircle size={14} /> {WHATSAPP_DISPLAY}
              </a>
            </div>

            <form onSubmit={submit} className="px-6 py-6 space-y-4">
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Nome *</label>
                <input
                  required
                  autoFocus
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="field mt-2"
                  placeholder="Seu nome"
                  disabled={state === 'sending' || state === 'sent'}
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Telefone *</label>
                <input
                  required
                  inputMode="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="field mt-2"
                  placeholder="(00) 00000-0000"
                  disabled={state === 'sending' || state === 'sent'}
                />
              </div>

              {error && (
                <div className="text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2">{error}</div>
              )}

              <button
                type="submit"
                disabled={state === 'sending' || state === 'sent'}
                className="btn w-full disabled:opacity-70"
              >
                {state === 'sending' && <Loader2 size={18} className="animate-spin" />}
                {state === 'sent' && <CheckCircle2 size={18} />}
                {state === 'sent'
                  ? 'Abrindo WhatsApp…'
                  : (opts.cta ?? 'Falar no WhatsApp')}
              </button>

              <p className="text-[11px] text-[var(--muted)] text-center">
                Ao continuar, você autoriza nosso contato por WhatsApp ou telefone.
              </p>
            </form>
          </div>

          <style jsx global>{`
            @keyframes slideUp {
              from { transform: translateY(20px); opacity: 0; }
              to   { transform: translateY(0);    opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </QuickContactCtx.Provider>
  );
}

/** Botão de atalho que abre o modal. */
export function QuickContactButton({
  children,
  className,
  origem,
  title,
  subtitle,
  cta,
  waMessage,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  origem: QuickContactOrigin;
  title?: string;
  subtitle?: string;
  cta?: string;
  waMessage?: string;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  const { open } = useQuickContact();
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => {
        onClick?.();
        open({ origem, title, subtitle, cta, waMessage });
      }}
      className={className}
    >
      {children}
    </button>
  );
}
