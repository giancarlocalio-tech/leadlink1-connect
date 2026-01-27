import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { TOP_50_CITIES } from '@/lib/seoConfig';

interface CityPricingSectionProps {
  serviceType: string;
}

export function CityPricingSection({ serviceType }: CityPricingSectionProps) {
  const topCities = TOP_50_CITIES.slice(0, 15);

  const formatCityName = (slug: string): string => {
    return slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
  };

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">
              Quanto costa questo intervento nella tua città?
            </h2>
          </div>
          
          <p className="text-muted-foreground mb-6">
            I prezzi possono variare leggermente in base alla zona e ai tempi di intervento. 
            Trova un idraulico nella tua città per ricevere un preventivo personalizzato.
          </p>

          <div className="flex flex-wrap gap-2">
            {topCities.map((citySlug) => (
              <Link
                key={citySlug}
                to={`/${citySlug}`}
                className="inline-flex items-center gap-2 bg-card hover:bg-primary/10 border border-border rounded-full px-4 py-2 text-sm transition-colors"
              >
                <MapPin className="h-3 w-3 text-primary" />
                <span>Idraulico {formatCityName(citySlug)}</span>
              </Link>
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            E altre {TOP_50_CITIES.length - topCities.length}+ città in tutta Italia
          </p>
        </div>
      </div>
    </section>
  );
}
