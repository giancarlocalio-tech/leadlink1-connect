/**
 * MidArticleCTA - CTA button/box for mid-article placement
 * 
 * Compact CTA that appears between content sections
 * with dynamic city name and problem context
 */

import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MidArticleCTAProps {
  cityName: string;
  problemContext?: string;
  variant?: 'compact' | 'full';
}

export function MidArticleCTA({ 
  cityName, 
  problemContext,
  variant = 'compact' 
}: MidArticleCTAProps) {
  // Construct URL with context
  const ctaUrl = problemContext 
    ? `/richiesta?context=${encodeURIComponent(problemContext)}`
    : '/richiesta';

  if (variant === 'compact') {
    return (
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <Phone className="h-5 w-5 text-primary shrink-0 hidden sm:block" />
          <p className="text-foreground font-medium">
            Non riesci a risolvere? <span className="text-primary">Trova un idraulico a {cityName}</span>
          </p>
        </div>
        <Link to={ctaUrl}>
          <Button className="shrink-0 w-full sm:w-auto">
            Richiedi Preventivo
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>
    );
  }

  // Full variant with more details
  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 md:p-8 text-primary-foreground">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            Trova un Idraulico a {cityName} Ora
          </h3>
          <p className="text-primary-foreground/90 max-w-md">
            Professionisti verificati pronti ad intervenire. Preventivo gratuito e senza impegno.
          </p>
        </div>
        <Link to={ctaUrl} className="shrink-0">
          <Button 
            variant="secondary" 
            size="lg"
            className="w-full md:w-auto"
          >
            <Phone className="h-5 w-5 mr-2" />
            Richiedi Intervento
          </Button>
        </Link>
      </div>
    </div>
  );
}
