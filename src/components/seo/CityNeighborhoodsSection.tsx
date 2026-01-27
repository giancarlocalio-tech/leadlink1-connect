/**
 * CityNeighborhoodsSection - Structured zones/neighborhoods section
 * 
 * Displays H2 section "Zone di {Città} dove operano gli idraulici"
 * Uses neighborhoods data to create a structured list showing coverage
 * 
 * SEO Purpose: Geographic coverage signals for local SEO
 */

import { MapPin, CheckCircle } from 'lucide-react';
import { CityData } from '@/lib/seoData';

interface CityNeighborhoodsSectionProps {
  cityData: CityData;
}

export function CityNeighborhoodsSection({ cityData }: CityNeighborhoodsSectionProps) {
  const { name, neighborhoods, nearbyAreas, province } = cityData;
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Zone di {name} Dove Operano gli Idraulici
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            La nostra rete di professionisti copre capillarmente tutti i quartieri di {name} e i comuni 
            della provincia di {province}. Ovunque tu sia, trovi un idraulico disponibile.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Neighborhoods */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Quartieri di {name}</h3>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4">
                Interveniamo in tutti i quartieri della città:
              </p>
              
              <ul className="space-y-2">
                {neighborhoods.map((neighborhood, index) => (
                  <li 
                    key={index}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-foreground">{neighborhood}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nearby Areas */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-secondary/50 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="text-lg font-bold">Comuni Limitrofi</h3>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4">
                Copriamo anche i comuni vicini:
              </p>
              
              <ul className="space-y-2">
                {nearbyAreas.slice(0, 10).map((area, index) => (
                  <li 
                    key={index}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-foreground">{area}</span>
                  </li>
                ))}
              </ul>
              
              {nearbyAreas.length > 10 && (
                <p className="text-sm text-muted-foreground mt-4">
                  ...e altri {nearbyAreas.length - 10} comuni della provincia di {province}
                </p>
              )}
            </div>
          </div>

          {/* Coverage Statement */}
          <div className="mt-8 bg-primary/5 rounded-xl p-6 text-center">
            <p className="text-foreground">
              <strong>Copertura totale:</strong> Serviamo <span className="text-primary font-bold">{neighborhoods.length} quartieri</span> di {name} 
              {' '}e <span className="text-primary font-bold">{nearbyAreas.length}+ comuni</span> della provincia di {province}.
              {' '}Pronto intervento disponibile 24/7 in tutta l'area.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
