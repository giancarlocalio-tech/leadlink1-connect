import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCredits } from '@/hooks/useCredits';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coins, CreditCard, TrendingUp, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, Loader2, Gift, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function CreditsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const { 
    credits, 
    packages, 
    transactions, 
    unlockCosts,
    loading, 
    purchasing, 
    purchaseCredits,
    verifyPurchase,
    refreshCredits,
    refreshTransactions
  } = useCredits();
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth?returnUrl=/dashboard/crediti');
    }
  }, [user, authLoading, navigate]);

  // Handle successful payment return
  useEffect(() => {
    const success = searchParams.get('success');
    const sessionId = searchParams.get('session_id');
    const canceled = searchParams.get('canceled');

    if (success === 'true' && sessionId && !verifying) {
      setVerifying(true);
      verifyPurchase(sessionId).then(result => {
        if (result.success) {
          toast.success(`🎉 Acquisto completato! +${result.credits_added} crediti`, {
            description: `Il tuo nuovo saldo è ${result.new_balance} crediti`
          });
        } else {
          toast.error('Errore nella verifica', { description: result.error });
        }
        // Clear URL params
        navigate('/dashboard/crediti', { replace: true });
        setVerifying(false);
      });
    } else if (canceled === 'true') {
      toast.info('Acquisto annullato');
      navigate('/dashboard/crediti', { replace: true });
    }
  }, [searchParams, verifyPurchase, navigate, verifying]);

  const handlePurchase = async (packageId: string) => {
    const result = await purchaseCredits(packageId);
    if (result.url) {
      window.open(result.url, '_blank');
    } else if (result.error) {
      toast.error('Errore', { description: result.error });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'purchase':
        return <ArrowUpRight className="h-4 w-4 text-green-500" />;
      case 'unlock':
        return <ArrowDownRight className="h-4 w-4 text-orange-500" />;
      case 'refund':
        return <ArrowUpRight className="h-4 w-4 text-blue-500" />;
      case 'bonus':
        return <Gift className="h-4 w-4 text-purple-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getTransactionLabel = (type: string) => {
    switch (type) {
      case 'purchase': return 'Acquisto';
      case 'unlock': return 'Sblocco';
      case 'refund': return 'Rimborso';
      case 'bonus': return 'Bonus';
      default: return type;
    }
  };

  if (authLoading || loading || verifying) {
    return (
      <DashboardLayout title="Crediti">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="I tuoi Crediti">
      <div className="space-y-6">
        <p className="text-muted-foreground -mt-4">Gestisci i tuoi crediti per sbloccare i contatti dei clienti</p>

        {/* Balance Card */}
        <Card className="bg-gradient-to-br from-primary/10 via-background to-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Saldo attuale</p>
                <div className="flex items-center gap-3">
                  <Coins className="h-8 w-8 text-primary" />
                  <span className="text-4xl font-bold">{credits?.balance ?? 0}</span>
                  <span className="text-xl text-muted-foreground">crediti</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div>
                    <p>Totale acquistati</p>
                    <p className="text-lg font-semibold text-foreground">{credits?.total_purchased ?? 0}</p>
                  </div>
                  <div>
                    <p>Totale spesi</p>
                    <p className="text-lg font-semibold text-foreground">{credits?.total_spent ?? 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Unlock Costs Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Costo sblocco contatti
            </CardTitle>
            <CardDescription>I crediti necessari variano in base all'urgenza della richiesta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {unlockCosts.map((cost) => (
                <div key={cost.urgency} className="text-center p-3 rounded-lg bg-muted/50">
                  <Badge variant={
                    cost.urgency === 'subito' ? 'destructive' : 
                    cost.urgency === 'entro_24_ore' ? 'default' : 'secondary'
                  } className="mb-2">
                    {cost.urgency === 'subito' ? 'Subito' : 
                     cost.urgency === 'entro_24_ore' ? 'Entro 24h' : 'Prossimi giorni'}
                  </Badge>
                  <p className="text-2xl font-bold">{cost.credits_cost}</p>
                  <p className="text-xs text-muted-foreground">crediti</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Packages */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Acquista Crediti
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {packages.map((pkg, index) => (
              <Card 
                key={pkg.id} 
                className={`relative overflow-hidden transition-all hover:shadow-lg ${
                  index === 2 ? 'border-primary ring-2 ring-primary/20' : ''
                }`}
              >
                {index === 2 && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Più conveniente
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{pkg.name}</span>
                    <Badge variant="outline">{pkg.credits} crediti</Badge>
                  </CardTitle>
                  <CardDescription>
                    €{(pkg.price_per_credit).toFixed(2)} per credito
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <span className="text-4xl font-bold">€{(pkg.price_cents / 100).toFixed(0)}</span>
                  </div>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      {pkg.credits} crediti immediati
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Nessuna scadenza
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ~{Math.floor(pkg.credits / 3)} contatti (media)
                    </li>
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={index === 2 ? 'default' : 'outline'}
                    onClick={() => handlePurchase(pkg.id)}
                    disabled={purchasing}
                  >
                    {purchasing ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Acquista ora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Storico Transazioni
            </CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nessuna transazione ancora
              </p>
            ) : (
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div 
                    key={tx.id} 
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center">
                        {getTransactionIcon(tx.transaction_type)}
                      </div>
                      <div>
                        <p className="font-medium">{getTransactionLabel(tx.transaction_type)}</p>
                        <p className="text-xs text-muted-foreground">{tx.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${tx.credits > 0 ? 'text-green-600' : 'text-orange-600'}`}>
                        {tx.credits > 0 ? '+' : ''}{tx.credits} crediti
                      </p>
                      <p className="text-xs text-muted-foreground">{formatDate(tx.created_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
