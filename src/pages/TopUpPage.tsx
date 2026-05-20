import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/hooks/useAuth';
import { useCredits } from '@/hooks/useCredits';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, CreditCard, Loader2, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { formatEuroFromCents } from '@/lib/currency';

export default function TopUpPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { credits, packages, loading, purchasing, purchaseCredits } = useCredits();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) navigate('/auth?returnUrl=/dashboard/crediti/ricarica');
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!selectedId && packages.length > 0) {
      // default sul 3° pacchetto (80€) come ProntoPro
      setSelectedId(packages[Math.min(2, packages.length - 1)].id);
    }
  }, [packages, selectedId]);

  const handleProceed = async () => {
    if (!selectedId) return;
    const r = await purchaseCredits(selectedId);
    if (r.url) window.location.href = r.url;
    else toast.error('Errore', { description: r.error });
  };

  if (authLoading || loading) {
    return (
      <DashboardLayout title="Ricarica il conto">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Ricarica il conto">
      <Helmet>
        <title>Ricarica il conto | Idraulici Subito</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-3xl mx-auto pb-32">
        <Link to="/dashboard/crediti" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> Indietro
        </Link>

        <div className="rounded-2xl bg-muted/50 px-4 py-3 mb-6 text-sm">
          <span className="text-muted-foreground">Saldo: </span>
          <span className="font-bold">{formatEuroFromCents(credits?.balance_cents)}</span>
        </div>

        <h2 className="text-lg font-semibold mb-3">Importo</h2>
        <div className="space-y-3 mb-6">
          {packages.map((pkg) => {
            const selected = selectedId === pkg.id;
            return (
              <button
                key={pkg.id}
                type="button"
                onClick={() => setSelectedId(pkg.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left ${
                  selected
                    ? 'border-sky-500 bg-sky-50/40 ring-2 ring-sky-100'
                    : 'border-border bg-card hover:border-sky-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${selected ? 'border-sky-500 bg-sky-500' : 'border-muted-foreground/40'}`}>
                    {selected && <div className="h-2 w-2 rounded-full bg-white" />}
                  </div>
                  <span className="text-lg font-semibold">{pkg.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">IVA inclusa</span>
              </button>
            );
          })}
        </div>

        <h2 className="text-lg font-semibold mb-1">Metodo di pagamento</h2>
        <p className="text-sm text-muted-foreground mb-3">Pagamento sicuro tramite Stripe</p>
        <Card className="rounded-2xl border-2 border-sky-500 p-4 flex items-center gap-3 mb-3">
          <div className="h-5 w-5 rounded-full border-2 border-sky-500 bg-sky-500 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-white" />
          </div>
          <CreditCard className="h-5 w-5 text-sky-600" />
          <span className="font-medium flex-1">Carta di credito/debito</span>
        </Card>
        <Card className="rounded-2xl p-4 flex items-center gap-3 opacity-60">
          <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/40" />
          <span className="font-medium flex-1">PayPal</span>
          <span className="text-xs text-muted-foreground">In arrivo</span>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t p-4 z-40">
        <div className="max-w-3xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3 w-3" />
            <span>Pagamenti sicuri tramite Stripe</span>
          </div>
          <Button
            size="lg"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold text-base h-12 rounded-xl"
            onClick={handleProceed}
            disabled={!selectedId || purchasing}
          >
            {purchasing ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Check className="h-5 w-5 mr-2" />}
            Procedi con la carta
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
