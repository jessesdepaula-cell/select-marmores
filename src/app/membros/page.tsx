import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import LogoutButton from './LogoutButton';
import { MEMBER_COOKIE, verifyMemberToken } from '@/lib/member-auth';

export default async function MembrosPage() {
  const store = await cookies();
  const session = verifyMemberToken(store.get(MEMBER_COOKIE)?.value);
  if (!session) redirect('/entrar?next=/membros');

  return (
    <div className="min-h-screen marble-bg p-6">
      <div className="max-w-3xl mx-auto bg-[var(--bg)] border border-[var(--line)] p-8 sm:p-12 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-serif text-lg">
            <span className="inline-block w-2.5 h-2.5 rotate-45 bg-[var(--gold)]" />
            <span>SELECT MÁRMORES</span>
          </Link>
          <LogoutButton />
        </div>

        <h1 className="mt-10 font-serif text-3xl sm:text-4xl">Área do membro</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Bem-vindo de volta, <strong className="text-[var(--ink)]">{session.email}</strong>.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <div className="border border-[var(--line)] p-6">
            <h2 className="font-serif text-lg">Seus orçamentos</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Em breve você poderá acompanhar aqui o histórico dos seus pedidos e orçamentos.
            </p>
          </div>
          <div className="border border-[var(--line)] p-6">
            <h2 className="font-serif text-lg">Catálogo exclusivo</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Espaço reservado para conteúdos e materiais exclusivos para membros.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
