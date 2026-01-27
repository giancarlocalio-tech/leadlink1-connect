/**
 * GuideCTABox - Conversion-optimized CTA for guide pages
 * 
 * Variants:
 * - default: Standard CTA box
 * - urgent: Highlighted for emergency sections
 * - minimal: Inline CTA after content sections
 */

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, ArrowRight, Phone } from 'lucide-react';

interface GuideCTABoxProps {
  variant?: 'default' | 'urgent' | 'minimal';
  className?: string;
}

export function GuideCTABox({ variant = 'default', className = '' }: GuideCTABoxProps) {
  if (variant === 'urgent') {
    return (
      <Card className={`border-primary bg-primary/5 my-8 ${className}`}>
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-lg">Hai questo problema adesso?</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Trova un idraulico disponibile nella tua zona e richiedi un intervento rapido.
          </p>
          <Link to="/richiesta">
            <Button size="lg" className="w-full sm:w-auto">
              <Phone className="h-4 w-4 mr-2" />
              Trova idraulico ora
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={`my-6 p-4 bg-muted/50 rounded-lg border border-border ${className}`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            <strong className="text-foreground">Hai bisogno di un intervento?</strong> Ricevi preventivi gratuiti.
          </p>
          <Link to="/richiesta">
            <Button size="sm" variant="outline">
              Richiedi preventivo
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`my-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl text-center ${className}`}>
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
