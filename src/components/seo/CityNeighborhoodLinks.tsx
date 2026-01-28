/**
 * CityNeighborhoodLinks - Shows links to neighborhood pages for major cities
 * 
 * Displayed on city landing pages (Milano, Roma, Napoli, Torino, Bologna)
 * Links to the specific neighborhood pages for internal linking and SEO
 */

import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { getNeighborhoodPagesForCity } from '@/lib/neighborhoodPagesData';

interface CityNeighborhoodLinksProps {
  citySlug: string;
  cityName: string;
}

export function CityNeighborhoodLinks({ citySlug, cityName }: CityNeighborhoodLinksProps) {
  const neighborhoods = getNeighborhoodPagesForCity(citySlug);
  
  // Only show if this city has neighborhood pages
  if (neighborhoods.length === 0) return null;
  
  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Idraulici per Zone e Quartieri
            </h2>
          </div>
          
          <p className="text-muted-foreground mb-8">
            I nostri idraulici operano in tutti i quartieri di {cityName}. 
            Scegli la tua zona per trovare professionisti specializzati:
          </p>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {neighborhoods.map((n) => (
              <Link
                key={`${n.citySlug}-${n.neighborhoodSlug}`}
                to={`/${n.citySlug}-${n.neighborhoodSlug}-idraulico`}
                className="group bg-card border border-border rounded-xl p-4 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      Idraulico {n.neighborhoodName}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                      Interventi rapidi in zona
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
          
          {/* Link to city service */}
          <div className="mt-8 text-center">
            <Link 
              to={`/${citySlug}-pronto-intervento`}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
            >
              Pronto Intervento {cityName}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
