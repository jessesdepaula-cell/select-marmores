'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LogOut,
  Search,
  RefreshCw,
  Trash2,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  X,
  TrendingUp,
} from 'lucide-react';
import type { Lead, LeadStatus } from '@/lib/supabase';

const STATUS_LABELS: Record<LeadStatus, string> = {
  novo: 'Novo',
  em_contato: 'Em contato',
  orcamento_enviado: 'Orçamento enviado',
  convertido: 'Convertido',
  perdido: 'Perdido',
};
const STATUS_ORDER: LeadStatus[] = ['novo', 'em_contato', 'orcamento_enviado', 'convertido', 'perdido'];

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '';

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function onlyDigits(s: string) {
  return s.replace(/\D+/g, '');
}

type DashboardClientProps = {
  initialLeads: Lead[];
  logoutEndpoint?: string;
  redirectAfterLogout?: string;
};

export default function DashboardClient({
  initialLeads,
  logoutEndpoint = '/api/auth/logout',
  redirectAfterLogout = '/login',
}: DashboardClientProps) {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [q, setQ] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | LeadStatus>('todos');
  const [selected, setSelected] = useState<Lead | null>(null);
  const [busy, setBusy] = useState(false);

  const stats = useMemo(() => {
    const t = leads.length;
    const novo = leads.filter((l) => l.status === 'novo').length;
    const conv = leads.filter((l) => l.status === 'convertido').length;
    const last7 = leads.filter((l) => {
      const d = new Date(l.created_at).getTime();
      return Date.now() - d < 7 * 24 * 3600 * 1000;
    }).length;
    return { t, novo, conv, last7 };
  }, [leads]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return leads.filter((l) => {
      if (statusFilter !== 'todos' && l.status !== statusFilter) return false;
      if (!term) return true;
      return [l.nome, l.telefone, l.email, l.cidade, l.materiais, l.mensagem, l.tipo_obra]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(term));
    });
  }, [leads, q, statusFilter]);

  async function logout() {
    await fetch(logoutEndpoint, { method: 'POST' });
    router.replace(redirectAfterLogout);
    router.refresh();
  }

  async function updateLead(id: string, patch: Partial<Lead>) {
    setBusy(true);
    const prev = leads;
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } as Lead : l)));
    if (selected?.id === id) setSelected({ ...(selected as Lead), ...patch } as Lead);
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error('fail');
    } catch {
      setLeads(prev);
      alert('Não foi possível atualizar.');
    } finally {
      setBusy(false);
    }
  }

  async function deleteLead(id: string) {
    if (!confirm('Excluir este lead? Esta ação não pode ser desfeita.')) return;
    setBusy(true);
    const prev = leads;
    setLeads((ls) => ls.filter((l) => l.id !== id));
    if (selected?.id === id) setSelected(null);
    try {
      const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('fail');
    } catch {
      setLeads(prev);
      alert('Não foi possível excluir.');
    } finally {
      setBusy(false);
    }
  }

  async function refresh() {
    setBusy(true);
    try {
      const res = await fetch('/api/leads', { cache: 'no-store' });
      const json = await res.json();
      if (json.ok) setLeads(json.leads);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg-soft)]">
      <header className="bg-[var(--ink)] text-[#f6ecd9]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-serif text-lg">
            <span className="inline-block w-2.5 h-2.5 rotate-45 bg-[var(--gold)]" />
            <span>SELECT · Painel</span>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" className="text-xs text-[#d8ccae] hover:text-white px-3">Ver site</a>
            <button onClick={logout} className="inline-flex items-center gap-1.5 text-xs bg-[#3a322a] hover:bg-[#4a4036] px-3 py-1.5 rounded">
              <LogOut size={14} /> Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-serif text-3xl">Leads</h1>
            <p className="text-sm text-[var(--muted)] mt-1">
              Acompanhe e qualifique os contatos vindos do site.
            </p>
          </div>
          <button onClick={refresh} disabled={busy} className="btn-ghost !py-2 !px-4 text-sm">
            <RefreshCw size={14} className={busy ? 'animate-spin' : ''} /> Atualizar
          </button>
        </div>

        <section className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="Total" value={stats.t} />
          <StatCard label="Novos (não contactados)" value={stats.novo} accent />
          <StatCard label="Convertidos" value={stats.conv} />
          <StatCard label="Últimos 7 dias" value={stats.last7} icon={<TrendingUp size={14} />} />
        </section>

        <section className="mt-6 bg-[var(--bg)] border border-[var(--line)]">
          <div className="p-4 border-b border-[var(--line)] flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar por nome, telefone, cidade, material..."
                className="field !pl-9"
              />
            </div>
            <div className="flex gap-1 flex-wrap">
              {(['todos', ...STATUS_ORDER] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`text-xs px-3 py-1.5 border rounded-full transition ${
                    statusFilter === s
                      ? 'bg-[var(--ink)] text-[#f6ecd9] border-[var(--ink)]'
                      : 'bg-white text-[var(--ink-soft)] border-[var(--line)] hover:border-[var(--ink)]'
                  }`}
                >
                  {s === 'todos' ? 'Todos' : STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="p-16 text-center text-[var(--muted)]">
              {leads.length === 0
                ? 'Nenhum lead recebido ainda. Compartilhe o site!'
                : 'Nenhum lead com este filtro.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[var(--bg-soft)] text-left text-xs uppercase tracking-wider text-[var(--muted)]">
                  <tr>
                    <th className="py-3 px-4">Quando</th>
                    <th className="py-3 px-4">Nome</th>
                    <th className="py-3 px-4">Telefone</th>
                    <th className="py-3 px-4">Cidade</th>
                    <th className="py-3 px-4">Obra</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((l) => (
                    <tr
                      key={l.id}
                      onClick={() => setSelected(l)}
                      className="border-t border-[var(--line)] hover:bg-[var(--bg-soft)]/60 cursor-pointer"
                    >
                      <td className="py-3 px-4 text-[var(--muted)] whitespace-nowrap">{fmtDate(l.created_at)}</td>
                      <td className="py-3 px-4 font-medium">{l.nome}</td>
                      <td className="py-3 px-4">{l.telefone}</td>
                      <td className="py-3 px-4">{l.cidade ?? '—'}</td>
                      <td className="py-3 px-4">{l.tipo_obra ?? '—'}</td>
                      <td className="py-3 px-4">
                        <span className={`badge badge-${l.status}`}>{STATUS_LABELS[l.status]}</span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <a
                          href={`https://wa.me/${WHATSAPP || onlyDigits(l.telefone)}?text=${encodeURIComponent(`Olá ${l.nome.split(' ')[0]}, aqui é da Select Mármores!`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-xs text-[#1a7a3b] hover:underline"
                        >
                          <MessageCircle size={13} /> WhatsApp
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {selected && (
        <LeadDrawer
          lead={selected}
          onClose={() => setSelected(null)}
          onUpdate={updateLead}
          onDelete={deleteLead}
          busy={busy}
        />
      )}
    </div>
  );
}

function StatCard({ label, value, accent, icon }: { label: string; value: number; accent?: boolean; icon?: React.ReactNode }) {
  return (
    <div className={`p-5 border ${accent ? 'border-[var(--gold)] bg-[#fff8eb]' : 'border-[var(--line)] bg-[var(--bg)]'}`}>
      <div className="text-xs uppercase tracking-wider text-[var(--muted)] flex items-center gap-1.5">
        {icon} {label}
      </div>
      <div className="mt-2 font-serif text-3xl">{value}</div>
    </div>
  );
}

function LeadDrawer({
  lead,
  onClose,
  onUpdate,
  onDelete,
  busy,
}: {
  lead: Lead;
  onClose: () => void;
  onUpdate: (id: string, patch: Partial<Lead>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  busy: boolean;
}) {
  const [notas, setNotas] = useState(lead.notas ?? '');

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />
      <aside className="w-full max-w-md bg-[var(--bg)] h-full overflow-y-auto shadow-2xl">
        <div className="p-5 border-b border-[var(--line)] flex items-start justify-between gap-4">
          <div>
            <span className={`badge badge-${lead.status}`}>{STATUS_LABELS[lead.status]}</span>
            <h3 className="mt-2 font-serif text-2xl">{lead.nome}</h3>
            <p className="text-xs text-[var(--muted)]">Recebido em {fmtDate(lead.created_at)}</p>
          </div>
          <button onClick={onClose} aria-label="Fechar" className="p-1 hover:bg-[var(--bg-soft)]">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-4 text-sm">
          <div className="grid grid-cols-1 gap-3">
            <Row icon={<Phone size={14} />} label="Telefone">
              <a href={`tel:${onlyDigits(lead.telefone)}`} className="hover:underline">{lead.telefone}</a>
              <a
                href={`https://wa.me/${WHATSAPP || onlyDigits(lead.telefone)}?text=${encodeURIComponent(`Olá ${lead.nome.split(' ')[0]}!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 inline-flex items-center gap-1 text-[#1a7a3b] hover:underline text-xs"
              >
                <MessageCircle size={12} /> WhatsApp
              </a>
            </Row>
            {lead.email && (
              <Row icon={<Mail size={14} />} label="E-mail">
                <a href={`mailto:${lead.email}`} className="hover:underline">{lead.email}</a>
              </Row>
            )}
            {lead.cidade && <Row icon={<MapPin size={14} />} label="Cidade">{lead.cidade}</Row>}
            <Row icon={<Calendar size={14} />} label="Origem">{lead.origem ?? '—'}</Row>
          </div>

          {(lead.tipo_obra || lead.materiais) && (
            <div className="bg-[var(--bg-soft)] border border-[var(--line)] p-4">
              {lead.tipo_obra && (
                <div className="mb-2">
                  <div className="text-[10px] uppercase tracking-wider text-[var(--muted)]">Tipo de obra</div>
                  <div className="text-sm">{lead.tipo_obra}</div>
                </div>
              )}
              {lead.materiais && (
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--muted)]">Materiais</div>
                  <div className="text-sm">{lead.materiais}</div>
                </div>
              )}
            </div>
          )}

          {lead.mensagem && (
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted)]">Mensagem</div>
              <p className="mt-1 text-sm whitespace-pre-wrap text-[var(--ink-soft)]">{lead.mensagem}</p>
            </div>
          )}

          <div>
            <label className="text-[10px] uppercase tracking-wider text-[var(--muted)]">Status do lead</label>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {STATUS_ORDER.map((s) => (
                <button
                  key={s}
                  disabled={busy || lead.status === s}
                  onClick={() => onUpdate(lead.id, { status: s })}
                  className={`text-xs px-3 py-1.5 border rounded-full ${
                    lead.status === s
                      ? `badge-${s} border-transparent font-semibold`
                      : 'bg-white text-[var(--ink-soft)] border-[var(--line)] hover:border-[var(--ink)]'
                  }`}
                >
                  {STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-wider text-[var(--muted)]">Notas internas</label>
            <textarea
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              rows={4}
              className="field mt-1 resize-none"
              placeholder="Histórico de contato, valor proposto, próximos passos..."
            />
            <button
              onClick={() => onUpdate(lead.id, { notas: notas.trim() || null })}
              disabled={busy || (notas ?? '') === (lead.notas ?? '')}
              className="btn-gold !py-2 !px-4 text-sm mt-2 disabled:opacity-60"
            >
              Salvar notas
            </button>
          </div>

          <div className="pt-4 border-t border-[var(--line)]">
            <button
              onClick={() => onDelete(lead.id)}
              disabled={busy}
              className="inline-flex items-center gap-1.5 text-xs text-red-700 hover:text-red-900"
            >
              <Trash2 size={13} /> Excluir lead
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <div className="text-[var(--gold-deep)] mt-0.5">{icon}</div>
      <div className="flex-1">
        <div className="text-[10px] uppercase tracking-wider text-[var(--muted)]">{label}</div>
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}
