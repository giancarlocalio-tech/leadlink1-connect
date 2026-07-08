import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, MessageSquare, CreditCard, CheckCircle2 } from 'lucide-react';

interface Stats {
  totalSessions: number;
  paidSessions: number;
  unlockedSessions: number;
  totalMessages: number;
}

export default function AdminPage() {
  const { user, loading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin(user);
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (!loading && !adminLoading && (!user || !isAdmin)) navigate('/');
  }, [user, isAdmin, loading, adminLoading, navigate]);

  useEffect(() => {
    async function load() {
      const [sessions, messages] = await Promise.all([
        supabase.from('ai_consultation_sessions').select('id, unlocked, stripe_session_id, paid_at'),
        supabase.from('ai_consultation_messages').select('id', { count: 'exact', head: true }),
      ]);
      const rows = sessions.data ?? [];
      setStats({
        totalSessions: rows.length,
        paidSessions: rows.filter((r: any) => r.stripe_session_id).length,
        unlockedSessions: rows.filter((r: any) => r.unlocked || r.paid_at).length,
        totalMessages: messages.count ?? 0,
      });
      setLoadingStats(false);
    }
    if (isAdmin) load();
  }, [isAdmin]);

  if (loading || adminLoading || !isAdmin) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Admin · Idraulico AI</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <h1 className="text-3xl font-black mb-2">Dashboard admin</h1>
        <p className="text-muted-foreground mb-8">Stato consulenze AI</p>

        {loadingStats || !stats ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={<MessageSquare className="w-5 h-5" />} label="Sessioni totali" value={stats.totalSessions} />
            <StatCard icon={<MessageSquare className="w-5 h-5" />} label="Messaggi totali" value={stats.totalMessages} />
            <StatCard icon={<CreditCard className="w-5 h-5" />} label="Checkout avviati" value={stats.paidSessions} />
            <StatCard icon={<CheckCircle2 className="w-5 h-5" />} label="Sbloccate (pagate)" value={stats.unlockedSessions} />
          </div>
        )}
      </div>
    </Layout>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          {icon} {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-black">{value.toLocaleString('it-IT')}</div>
      </CardContent>
    </Card>
  );
}
