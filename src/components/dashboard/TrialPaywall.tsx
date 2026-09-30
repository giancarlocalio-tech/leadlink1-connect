import { useNavigate } from 'react-router-dom';
import { Wallet, ArrowRight, Star, Shield, Zap, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatEuro } from '@/lib/currency';

interface LowBalancePaywallProps {
  balanceCents: number;
  /** Soglia sotto la quale mostrare il paywall pieno (default 400 = 4 €) */
  thresholdCents?: number;
}

export function TrialPaywall({ balanceCents, thresholdCents = 400 }: LowBalancePaywallProps) {
  const navigate = useNavigate();
  const isLow = balanceCents < thresholdCents;

  if (!isLow) {
    return (
      <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardContent className="py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Saldo disponibile</p>
                <p className="text-sm text-muted-foreground">
                  Hai <span className="font-bold text-primary">{formatEuro(balanceCents)}</span> sul tuo conto
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/crediti/ricarica')}>
              <Plus className="h-4 w-4 mr-1" />
              Ricarica
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-destructive/50 bg-gradient-to-br from-destructive/5 via-background to-destructive/10">
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
          <Wallet className="h-8 w-8 text-destructive" />
        </div>
        <CardTitle className="text-2xl">Saldo insufficiente</CardTitle>
        <CardDescription className="text-base">
          Hai {formatEuro(balanceCents)}. Ricarica per continuare a sbloccare i contatti dei clienti.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
            <Star className="h-5 w-5 text-warning flex-shrink-0" />
            <span className="text-sm">Ricevi richieste da clienti reali nella tua zona</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
            <Shield className="h-5 w-5 text-primary flex-shrink-0" />
            <span className="text-sm">Paghi solo i contatti che sblocchi</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
            <Zap className="h-5 w-5 text-success flex-shrink-0" />
            <span className="text-sm">Notifiche immediate via email e WhatsApp</span>
          </div>
        </div>

        <div className="text-center space-y-3">
          <Button
            size="lg"
            className="w-full text-lg"
            onClick={() => navigate('/dashboard/crediti/ricarica')}
          >
            <Plus className="mr-2 h-5 w-5" />
            Ricarica saldo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-xs text-muted-foreground">
            Ricariche da 20 €. Il saldo non scade mai.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
