import { Coins, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CreditsCardProps {
  balance: number;
  freeRequestsRemaining?: number;
  isTrial?: boolean;
  onBuyCredits?: () => void;
}

export function CreditsCard({ 
  balance, 
  freeRequestsRemaining = 0,
  isTrial = false,
  onBuyCredits 
}: CreditsCardProps) {
  // Trial users: show trial info
  if (isTrial && freeRequestsRemaining > 0) {
    return (
      <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Prova gratuita attiva
            </CardTitle>
            <Badge variant="secondary">Trial</Badge>
          </div>
          <CardDescription>
            Hai ancora <span className="font-semibold text-primary">{freeRequestsRemaining}</span>{' '}
            {freeRequestsRemaining === 1 ? 'richiesta gratuita' : 'richieste gratuite'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Dopo le richieste gratuite, potrai acquistare crediti per sbloccare altri contatti.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={onBuyCredits} variant="outline" className="w-full gap-2">
            Vedi pacchetti crediti
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Trial exhausted or non-trial users: show credits balance
  return (
    <Card className="bg-gradient-to-br from-primary/10 via-background to-primary/5 border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Coins className="h-5 w-5 text-primary" />
            I tuoi crediti
          </CardTitle>
          {balance === 0 && (
            <Badge variant="destructive">Esauriti</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-4xl font-bold">{balance}</span>
          <span className="text-muted-foreground">crediti disponibili</span>
        </div>
        
        {balance === 0 ? (
          <p className="text-sm text-muted-foreground">
            Acquista crediti per sbloccare i contatti dei clienti nella tua zona.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Usa i crediti per sbloccare i contatti. Il costo varia in base all'urgenza.
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={onBuyCredits} className="w-full gap-2" variant={balance === 0 ? 'default' : 'outline'}>
          <Coins className="h-4 w-4" />
          {balance === 0 ? 'Acquista crediti' : 'Ricarica crediti'}
        </Button>
      </CardFooter>
    </Card>
  );
}
