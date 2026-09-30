import { Wallet, ArrowRight, AlertTriangle, CheckCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatEuro } from '@/lib/currency';

interface CreditsCardProps {
  /** Saldo in centesimi */
  balanceCents: number;
  onBuyCredits?: () => void;
}

export function CreditsCard({ balanceCents, onBuyCredits }: CreditsCardProps) {
  const hasBalance = balanceCents > 0;

  return (
    <Card className={hasBalance
      ? "bg-gradient-to-br from-success/10 via-background to-success/5 border-success/30"
      : "bg-gradient-to-br from-destructive/10 via-background to-destructive/5 border-destructive/30"
    }>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Wallet className={`h-5 w-5 ${hasBalance ? 'text-success' : 'text-destructive'}`} />
            Il tuo saldo
          </CardTitle>
          {hasBalance ? (
            <Badge className="bg-success/20 text-success hover:bg-success/30 border-success/30 gap-1">
              <CheckCircle className="h-3 w-3" />
              Attivo
            </Badge>
          ) : (
            <Badge variant="destructive" className="gap-1">
              <AlertTriangle className="h-3 w-3" />
              Vuoto
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2 mb-4">
          <span className={`text-4xl font-bold ${hasBalance ? 'text-success' : 'text-muted-foreground'}`}>
            {formatEuro(balanceCents)}
          </span>
          <span className="text-muted-foreground">disponibili</span>
        </div>

        <p className="text-sm text-muted-foreground">
          {hasBalance
            ? "Usa il saldo per sbloccare i contatti. Il costo varia in base all'urgenza."
            : 'Ricarica il saldo per sbloccare i contatti dei clienti nella tua zona.'}
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={onBuyCredits} className="w-full gap-2" variant={hasBalance ? 'outline' : 'default'}>
          <Plus className="h-4 w-4" />
          {hasBalance ? 'Ricarica saldo' : 'Ricarica ora'}
        </Button>
      </CardFooter>
    </Card>
  );
}
