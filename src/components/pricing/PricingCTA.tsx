import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, ArrowRight } from 'lucide-react';

interface PricingCTAProps {
  variant?: 'default' | 'urgent';
}

export function PricingCTA({ variant = 'default' }: PricingCTAProps) {
  if (variant === 'urgent') {
    return (
      <Card className="border-primary bg-primary/5 my-8">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-lg">Hai questo problema adesso?</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Trova un idraulico disponibile nella tua zona e richiedi un intervento.
          </p>
          <Link to="/richiesta">
            <Button size="lg">
              Trova idraulico ora
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="my-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl text-center">
      <h3 className="font-bold text-lg mb-2">
        🚨 Hai bisogno di un intervento?
      </h3>
      <p className="text-muted-foreground mb-4">
        Ricevi un preventivo gratuito da idraulici verificati della tua zona.
      </p>
      <Link to="/richiesta">
        <Button>
          Richiedi Preventivo Gratuito
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </Link>
    </div>
  );
}
