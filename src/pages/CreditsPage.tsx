import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/hooks/useAuth';
import { useCredits } from '@/hooks/useCredits';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/card';
import { ChevronRight, Wallet, CreditCard, Receipt, Loader2, ArrowUpRight, ArrowDownRight, Gift } from 'lucide-react';
import { toast } from 'sonner';
import { formatEuroFromCents } from '@/lib/currency';

export default function CreditsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const { credits, transactions, loading, verifyPurchase } = useCredits();
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate('/auth?returnUrl=/dashboard/crediti');
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const success = searchParams.get('success');
    const sessionId = searchParams.get('session_id');
    if (success === 'true' && sessionId && !verifying) {
      setVerifying(true);
      verifyPurchase(sessionId).then((r) => {
        if (r.success) {
          toast.success(`Ricarica completata! +${formatEuroFromCents(r.amount_added_cents)}`, {
            description: `Nuovo saldo: ${formatEuroFromCents(r.new_balance_cents)}`,
          });
        } else {
          toast.error('Errore nella verifica', { description: r.error });
        }
        navigate('/dashboard/crediti', { replace: true });
        setVerifying(false);
      });
    }
  }, [searchParams, verifyPurchase, navigate, verifying]);

  if (authLoading || loading || verifying) {
    return (
      <DashboardLayout title="Il mio conto">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  const balance = formatEuroFromCents(credits?.balance_cents);

  const cards = [
    {
      to: '/dashboard/conto/ricarica',
      icon: Wallet,
      title: 'Ricarica il conto',
      subtitle: 'Ricarica il tuo saldo in modo semplice e veloce',
    },
    {
      to: '/dashboard/conto/pagamento',
      icon: CreditCard,
      title: 'Preferenze di pagamento',
      subtitle: 'Gestisci i metodi di pagamento salvati',
    },
    {
      to: '#storico',
      icon: Receipt,
      title: 'Saldo',
      subtitle: 'Controlla le transazioni e i dettagli dei pagamenti',
    },
  ];

  return (
    <DashboardLayout title="Il mio conto">
      <Helmet>
        <title>Il mio conto | Idraulici Subito</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-3xl mx-auto space-y-4">
        <div className="rounded-2xl bg-gradient-to-br from-sky-500 to-sky-600 text-white p-6 shadow-sm">
          <p className="text-sm opacity-90 mb-1">Saldo disponibile</p>
          <p className="text-4xl font-bold">{balance}</p>
        </div>

        <div className="space-y-3">
          {cards.map((c) => {
            const inner = (
              <Card className="p-5 hover:shadow-md transition-all hover:border-sky-300 cursor-pointer flex items-center gap-4 rounded-2xl">
                <div className="h-11 w-11 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                  <c.icon className="h-5 w-5 text-sky-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.subtitle}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
              </Card>
            );
            return c.to.startsWith('#') ? (
              <a key={c.title} href={c.to}>{inner}</a>
            ) : (
              <Link key={c.title} to={c.to}>{inner}</Link>
            );
          })}
        </div>

        <div id="storico" className="pt-6">
          <h2 className="text-lg font-semibold mb-3">Storico transazioni</h2>
          <Card className="rounded-2xl divide-y">
            {transactions.length === 0 ? (
              <p className="text-center text-muted-foreground py-8 text-sm">Nessuna transazione ancora</p>
            ) : (
              transactions.map((tx) => {
                const delta = tx.amount_cents_delta ?? 0;
                const isPositive = delta > 0;
                const Icon = tx.transaction_type === 'bonus' ? Gift : isPositive ? ArrowUpRight : ArrowDownRight;
                return (
                  <div key={tx.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${isPositive ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{tx.description || tx.transaction_type}</p>
                        <p className="text-xs text-muted-foreground">{new Date(tx.created_at).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                      </div>
                    </div>
                    <p className={`font-semibold text-sm shrink-0 ${isPositive ? 'text-green-600' : 'text-orange-600'}`}>
                      {isPositive ? '+' : ''}{formatEuroFromCents(delta)}
                    </p>
                  </div>
                );
              })
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
