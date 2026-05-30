'use client';

import { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { QuickContactButton } from './QuickContact';

const WHATSAPP_DISPLAY = process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? '(62) 9465-0630';

const TYPES = [
  'Pias', 'Ilhas', 'Bancadas', 'Lavatórios',
  'Lareiras', 'Piscinas', 'Churrasqueiras', 'Revestimentos',
];

type State = 'idle' | 'sending' | 'sent' | 'error';

export default function LeadForm() {
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(t: string) {
    setSelected((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const fd = new FormData(f);
    const payload = {
      nome:      fd.get('nome'),
      telefone:  fd.get('telefone'),
      email:     fd.get('email'),
      cidade:    fd.get('cidade'),
      tipo_obra: selected.join(', '),
      materiais: fd.get('materiais'),
      mensagem:  fd.get('mensagem'),
      origem:    'site_orcamento',
    };

    setState('sending');
    setError(null);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? 'Falha ao enviar');
      setState('sent');
      f.reset();
      setSelected([]);
    } catch (err) {
      setState('error');
      setError(err instanceof Error ? err.message : 'Falha ao enviar');
    }
  }

  return (
    <section id="contato" className="py-24 sm:py-32 bg-[var(--ink)] text-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1fr_1.3fr] gap-14 items-start">
        <div>
          <span className="eyebrow !text-white/70">Solicitar orçamento</span>
          <h2 className="mt-5 font-serif text-3xl sm:text-5xl leading-tight">
            Conte sobre o seu projeto.
            <span className="block italic font-light" style={{ color: '#e8a4a4' }}>
              Respondemos no mesmo dia.
            </span>
          </h2>
          <p className="mt-6 text-white/75 leading-relaxed max-w-md">
            Preencha o formulário ou fale direto pelo WhatsApp. Em até 24 horas
            agendamos uma visita ao showroom ou medição em obra, conforme o
            estágio do seu projeto.
          </p>

          <div className="mt-10 space-y-3 text-sm">
            <QuickContactButton
              origem="cta_form_whatsapp"
              className="block text-left text-white hover:text-white/80"
              title="Falar agora no WhatsApp"
              subtitle="Deixe nome e telefone — abrimos a conversa em seguida."
              cta="Abrir WhatsApp"
              waMessage="Olá! Vim pelo site da Select Mármores e quero um orçamento."
            >
              <span className="text-white/60 text-xs uppercase tracking-wider block">WhatsApp</span>
              <span className="text-lg font-medium">{WHATSAPP_DISPLAY}</span>
            </QuickContactButton>
            <div>
              <span className="text-white/60 text-xs uppercase tracking-wider block">Endereço</span>
              <span>Av. Uru, Qd. 91 — Aparecida de Goiânia, GO</span>
            </div>
            <div>
              <span className="text-white/60 text-xs uppercase tracking-wider block">Horário</span>
              <span>Seg. a sex. 8h–18h · Sáb. 8h–13h</span>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="bg-white text-[var(--ink)] p-6 sm:p-10 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Nome completo *</label>
              <input required name="nome" className="field mt-2" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Telefone *</label>
              <input required name="telefone" className="field mt-2" placeholder="(00) 00000-0000" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">E-mail</label>
              <input type="email" name="email" className="field mt-2" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Cidade</label>
              <input name="cidade" className="field mt-2" />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Onde vai entrar a pedra?</label>
            <div className="mt-3 flex flex-wrap gap-2">
              {TYPES.map((t) => {
                const on = selected.includes(t);
                return (
                  <button
                    type="button"
                    key={t}
                    onClick={() => toggle(t)}
                    className={`px-4 py-2 border text-sm transition-colors ${
                      on
                        ? 'bg-[var(--red)] text-white border-[var(--red)]'
                        : 'bg-white text-[var(--ink-soft)] border-[var(--line)] hover:border-[var(--red)] hover:text-[var(--red)]'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Materiais de interesse</label>
            <input name="materiais" className="field mt-2" placeholder="Mármore, quartzito, granito..." />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Mensagem</label>
            <textarea name="mensagem" rows={4} className="field mt-2 resize-none" placeholder="Conte um pouco sobre o ambiente, prazo, referências..." />
          </div>

          {error && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2">{error}</div>
          )}

          <button
            type="submit"
            disabled={state === 'sending'}
            className="btn w-full disabled:opacity-70"
          >
            {state === 'sending' && <Loader2 size={18} className="animate-spin" />}
            {state === 'sent' && <CheckCircle2 size={18} />}
            {state === 'sent' ? 'Recebido! Em breve falamos.' : 'Enviar pedido de orçamento'}
          </button>

          <p className="text-[11px] text-[var(--muted)] text-center">
            Ao enviar, você autoriza nosso contato por telefone, e-mail ou WhatsApp.
          </p>
        </form>
      </div>
    </section>
  );
}
