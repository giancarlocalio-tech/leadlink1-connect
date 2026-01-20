import { Coins, ArrowRight, Sparkles, AlertTriangle, CheckCircle } from 'lucide-react';
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
  // Trial users with free requests remaining
  if (isTrial && freeRequestsRemaining > 0) {
    return (
      <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Prova gratuita attiva
            </CardTitle>
            <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/30">
              <Sparkles className="h-3 w-3 mr-1" />
              Trial
            </Badge>
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

  // Trial exhausted (user used all free requests, no credits yet)
  if (isTrial && freeRequestsRemaining <= 0 && balance === 0) {
    return (
      <Card className="border-destructive/30 bg-gradient-to-br from-destructive/5 via-background to-destructive/10">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Trial terminato
            </CardTitle>
            <Badge variant="destructive" className="gap-1">
              <AlertTriangle className="h-3 w-3" />
              Esaurito
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold text-muted-foreground">0</span>
            <span className="text-muted-foreground">crediti disponibili</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Hai usato tutte le richieste gratuite. Acquista crediti per continuare a ricevere clienti.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={onBuyCredits} className="w-full gap-2">
            <Coins className="h-4 w-4" />
            Acquista crediti ora
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Non-trial users with credits
  const hasCredits = balance > 0;
  
  return (
    <Card className={hasCredits 
      ? "bg-gradient-to-br from-success/10 via-background to-success/5 border-success/30"
      : "bg-gradient-to-br from-destructive/10 via-background to-destructive/5 border-destructive/30"
    }>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Coins className={`h-5 w-5 ${hasCredits ? 'text-success' : 'text-destructive'}`} />
            I tuoi crediti
          </CardTitle>
          {hasCredits ? (
            <Badge className="bg-success/20 text-success hover:bg-success/30 border-success/30 gap-1">
              <CheckCircle className="h-3 w-3" />
              Attivi
            </Badge>
          ) : (
            <Badge variant="destructive" className="gap-1">
              <AlertTriangle className="h-3 w-3" />
              Esauriti
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2 mb-4">
          <span className={`text-4xl font-bold ${hasCredits ? 'text-success' : 'text-muted-foreground'}`}>
            {balance}
          </span>
          <span className="text-muted-foreground">crediti disponibili</span>
        </div>
        
        {hasCredits ? (
          <p className="text-sm text-muted-foreground">
            Usa i crediti per sbloccare i contatti. Il costo varia in base all'urgenza.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Acquista crediti per sbloccare i contatti dei clienti nella tua zona.
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={onBuyCredits} className="w-full gap-2" variant={hasCredits ? 'outline' : 'default'}>
          <Coins className="h-4 w-4" />
          {hasCredits ? 'Ricarica crediti' : 'Acquista crediti'}
        </Button>
      </CardFooter>
    </Card>
  );
}