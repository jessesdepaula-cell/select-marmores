import { getServiceSupabase, type Lead } from '@/lib/supabase';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(500);

  if (error) {
    return (
      <div className="min-h-screen p-10">
        <div className="max-w-xl mx-auto bg-red-50 border border-red-200 p-6 text-red-800">
          <h2 className="font-serif text-xl">Erro ao carregar leads</h2>
          <p className="mt-2 text-sm">{error.message}</p>
          <p className="mt-3 text-xs text-red-700/80">
            Verifique se você rodou o <code>supabase/schema.sql</code> e se as
            variáveis <code>NEXT_PUBLIC_SUPABASE_URL</code> e{' '}
            <code>SUPABASE_SERVICE_ROLE_KEY</code> estão configuradas.
          </p>
        </div>
      </div>
    );
  }

  return <DashboardClient initialLeads={(data ?? []) as Lead[]} />;
}
