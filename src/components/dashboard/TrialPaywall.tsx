import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, Star, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface TrialPaywallProps {
  freeRequestsRemaining: number;
}

export function TrialPaywall({ freeRequestsRemaining }: TrialPaywallProps) {
  const navigate = useNavigate();

  if (freeRequestsRemaining > 0) {
    // Show trial progress banner instead of full paywall
    return (
      <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardContent className="py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Prova gratuita attiva</p>
                <p className="text-sm text-muted-foreground">
                  Hai ancora <span className="font-bold text-primary">{freeRequestsRemaining}</span> richieste gratuite
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/abbonamento')}>
              Vedi piani
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Full paywall when trial is exhausted
  return (
    <Card className="border-destructive/50 bg-gradient-to-br from-destructive/5 via-background to-destructive/10">
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
          <Lock className="h-8 w-8 text-destructive" />
        </div>
        <CardTitle className="text-2xl">Le tue richieste gratuite sono terminate</CardTitle>
        <CardDescription className="text-base">
          Per continuare a ricevere nuovi clienti, scegli un piano di abbonamento
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Benefits reminder */}
        <div className="grid gap-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
            <Star className="h-5 w-5 text-warning flex-shrink-0" />
            <span className="text-sm">Ricevi richieste da clienti reali nella tua zona</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
            <Shield className="h-5 w-5 text-primary flex-shrink-0" />
            <span className="text-sm">Contatti esclusivi - nessuna competizione</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
            <Zap className="h-5 w-5 text-green-500 flex-shrink-0" />
            <span className="text-sm">Notifiche immediate via email</span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-3">
          <Button 
            size="lg" 
            className="w-full text-lg"
            onClick={() => navigate('/dashboard/abbonamento')}
          >
            Scegli il tuo piano
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-xs text-muted-foreground">
            Piani a partire da €29/mese • Annulla quando vuoi
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
