'use client';

import { useState } from 'react';
import { Loader2, CheckCircle2, ArrowRight } from 'lucide-react';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5562946506300';
const WHATSAPP_DISPLAY = process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? '(62) 9465-0630';

type State = 'idle' | 'sending' | 'sent' | 'error';

export default function LeadForm() {
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const data = Object.fromEntries(new FormData(f).entries());

    setState('sending');
    setError(null);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? 'Falha ao enviar');
      setState('sent');
      f.reset();
    } catch (err) {
      setState('error');
      setError(err instanceof Error ? err.message : 'Falha ao enviar');
    }
  }

  return (
    <section id="contato" className="py-24 bg-[var(--ink)] text-[#f6ecd9]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1fr_1.2fr] gap-12">
        <div>
          <span className="gold-divider !text-[#d6b878]">Solicitar orçamento</span>
          <h2 className="mt-5 font-serif text-3xl sm:text-4xl leading-tight">
            Conte sobre o seu projeto.
            <span className="block italic text-[#d6b878]">A gente responde no mesmo dia.</span>
          </h2>
          <p className="mt-6 text-[#d8ccae] leading-relaxed max-w-md">
            Preencha o formulário ou fale direto pelo WhatsApp. Em até 24 horas
            agendamos uma visita ao showroom ou uma medição em obra, conforme o
            estágio do seu projeto.
          </p>

          <div className="mt-10 space-y-3 text-sm">
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Olá! Vim pelo site e quero um orçamento.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#d6b878] hover:underline"
            >
              WhatsApp: {WHATSAPP_DISPLAY}
            </a>
            <p className="text-[#d8ccae]">Atendimento de seg. a sáb., das 8h às 18h</p>
            <p className="text-[#d8ccae]">Goiânia · Aparecida de Goiânia · Anápolis · Brasília</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="bg-[#f6ecd9] text-[var(--ink)] p-6 sm:p-8 grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wider text-[var(--muted)]">Nome completo *</label>
            <input required name="nome" className="field mt-1" placeholder="Como podemos te chamar?" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-[var(--muted)]">Telefone *</label>
            <input required name="telefone" className="field mt-1" placeholder="(00) 00000-0000" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-[var(--muted)]">E-mail</label>
            <input type="email" name="email" className="field mt-1" placeholder="opcional" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-[var(--muted)]">Cidade</label>
            <input name="cidade" className="field mt-1" placeholder="Goiânia, Brasília..." />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-[var(--muted)]">Tipo de obra</label>
            <select name="tipo_obra" className="field mt-1 bg-white" defaultValue="">
              <option value="" disabled>Selecione...</option>
              <option>Residencial — cozinha</option>
              <option>Residencial — banheiro</option>
              <option>Residencial — área externa</option>
              <option>Comercial</option>
              <option>Reforma pontual</option>
              <option>Outro</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wider text-[var(--muted)]">Materiais de interesse</label>
            <input name="materiais" className="field mt-1" placeholder="Mármore, quartzito, granito..." />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-wider text-[var(--muted)]">Mensagem</label>
            <textarea name="mensagem" rows={4} className="field mt-1 resize-none" placeholder="Conte um pouco sobre o ambiente, prazo, referências..." />
          </div>

          {error && (
            <div className="sm:col-span-2 text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2">
              {error}
            </div>
          )}

          <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2">
            <p className="text-xs text-[var(--muted)]">
              Ao enviar, você concorda em receber retorno por telefone ou WhatsApp.
            </p>
            <button
              type="submit"
              disabled={state === 'sending'}
              className="btn-gold disabled:opacity-70"
            >
              {state === 'sending' && <Loader2 size={18} className="animate-spin" />}
              {state === 'sent' && <CheckCircle2 size={18} />}
              {state !== 'sending' && state !== 'sent' && <ArrowRight size={18} />}
              {state === 'sent' ? 'Recebido! Em breve falamos.' : 'Enviar pedido'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
