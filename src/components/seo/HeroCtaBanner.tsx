/**
 * HeroCtaBanner - Above-the-fold CTA banner
 * 
 * Compact, attention-grabbing banner that appears
 * at the top of problem+city pages before main content
 */

import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroCtaBannerProps {
  cityName: string;
  problemContext?: string;
}

export function HeroCtaBanner({ cityName, problemContext }: HeroCtaBannerProps) {
  const ctaUrl = problemContext 
    ? `/richiesta?context=${encodeURIComponent(problemContext)}`
    : '/richiesta';

  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-y border-primary/20">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" />
              <span>Intervento in <strong className="text-foreground">30-60 min</strong></span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-muted-foreground">
              <Shield className="h-4 w-4 text-primary" />
              <span>Idraulici <strong className="text-foreground">verificati</strong></span>
            </div>
          </div>
          <Link to={ctaUrl}>
            <Button size="sm" className="w-full sm:w-auto">
              Trova un Idraulico a {cityName}
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
