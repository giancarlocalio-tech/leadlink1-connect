/**
 * GuideCityLinks - CTA section with links to Top 50 cities
 * 
 * Final conversion section linking to city landing pages.
 */

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { TOP_50_CITIES } from '@/lib/seoConfig';

interface GuideCityLinksProps {
  maxCities?: number;
}

export function GuideCityLinks({ maxCities = 15 }: GuideCityLinksProps) {
  const topCities = TOP_50_CITIES.slice(0, maxCities);

  const formatCityName = (slug: string): string => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <section id="trova-idraulico" className="scroll-mt-24 py-12 bg-primary/5 -mx-4 px-4 rounded-xl">
      <div className="text-center mb-8">
        <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Trova un Idraulico per Questo Problema nella Tua Città
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Hai bisogno di un professionista? Trova un idraulico qualificato nella tua zona 
          per risolvere il problema rapidamente.
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
        {topCities.map((citySlug) => (
          <Link
            key={citySlug}
            to={`/${citySlug}`}
            className="inline-flex items-center gap-2 bg-card hover:bg-primary/10 border border-border rounded-full px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm transition-colors"
          >
            <MapPin className="h-3 w-3 text-primary" />
            <span>Idraulico {formatCityName(citySlug)}</span>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <Button asChild size="lg" className="font-semibold">
          <Link to="/consulenza">
            <Sparkles className="h-4 w-4 mr-2" />
            Prova prima la diagnosi gratis con l'Idraulico AI
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
