/**
 * CityNeighborhoodsSection - SEO-optimized neighborhoods section
 * 
 * H2: Interveniamo in tutti i quartieri di [Città]
 * - Paragraph explaining coverage
 * - List of 8+ real neighborhoods
 * - Badge for province coverage
 */

import { MapPin } from 'lucide-react';

interface CityNeighborhoodsSectionProps {
  cityName: string;
  citySlug: string;
  neighborhoods: string[];
  nearbyAreas: string[];
}

export function CityNeighborhoodsSection({ 
  cityName, 
  citySlug,
  neighborhoods, 
  nearbyAreas 
}: CityNeighborhoodsSectionProps) {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            Interveniamo in Tutti i Quartieri di {cityName}
          </h2>
          
          <p className="text-muted-foreground mb-6 leading-relaxed">
            I nostri idraulici professionisti operano in <strong>tutta {cityName}</strong> e nei comuni limitrofi. 
            Che tu abiti nel centro storico o in periferia, riceverai assistenza rapida e professionale 
            per qualsiasi problema idraulico.
          </p>
          
          <div className="mb-8">
            <h3 className="font-semibold text-lg mb-4">Quartieri di {cityName}</h3>
            <div className="flex flex-wrap gap-2">
              {neighborhoods.map((zone, index) => (
                <span 
                  key={index} 
                  className="bg-card border border-border px-4 py-2 rounded-full text-sm font-medium hover:border-primary transition-colors"
                >
                  {zone}
                </span>
              ))}
              <span className="bg-primary/10 border border-primary/30 px-4 py-2 rounded-full text-sm font-medium text-primary">
                + altre zone
              </span>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-4">Comuni Limitrofi Coperti</h3>
            <div className="flex flex-wrap gap-2">
              {nearbyAreas.map((area, index) => (
                <span 
                  key={index} 
                  className="bg-secondary/50 border border-border px-4 py-2 rounded-full text-sm font-medium"
                >
                  {area}
                </span>
              ))}
              <span className="bg-primary/10 border border-primary/30 px-4 py-2 rounded-full text-sm font-medium text-primary">
                + tutta la provincia
              </span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            👉 Questo ti permette di trovare un{' '}
            {neighborhoods.slice(0, 3).map((n, i) => (
              <span key={i}>
                <strong>idraulico {n}</strong>
                {i < 2 ? ', ' : ''}
              </span>
            ))}{' '}
            e in qualsiasi altra zona di {cityName}.
          </p>
        </div>
      </div>
    </section>
  );
}
