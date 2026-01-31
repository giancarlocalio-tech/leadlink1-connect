/**
 * NapoliNeighborhoodsSection - Extended neighborhoods coverage
 * 
 * Shows 25+ Naples neighborhoods organized by area
 */

import { MapPin } from 'lucide-react';
import { NAPOLI_NEIGHBORHOODS, NAPOLI_NEARBY_AREAS } from '@/lib/napoliSeoContent';

export function NapoliNeighborhoodsSection() {
  // Group neighborhoods by area type
  const neighborhoodGroups = [
    { title: 'Centro e Zone Storiche', items: NAPOLI_NEIGHBORHOODS.slice(0, 5) },
    { title: 'Zone Collinari', items: NAPOLI_NEIGHBORHOODS.slice(5, 10) },
    { title: 'Lungomare e Costa', items: NAPOLI_NEIGHBORHOODS.slice(10, 15) },
    { title: 'Zone Residenziali', items: NAPOLI_NEIGHBORHOODS.slice(15, 20) },
    { title: 'Zone Est e Nord', items: NAPOLI_NEIGHBORHOODS.slice(20) }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 p-3 rounded-full">
              <MapPin className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Interveniamo in Tutti i Quartieri di Napoli
              </h2>
              <p className="text-muted-foreground mt-1">
                Copertura capillare in tutta la città e provincia
              </p>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
            I nostri idraulici professionisti operano in <strong className="text-foreground">tutta Napoli</strong> e 
            nei comuni limitrofi. Che tu abiti nel Centro Storico o in periferia, al Vomero o a Fuorigrotta, 
            riceverai assistenza rapida e professionale per qualsiasi problema idraulico.
          </p>
          
          {/* Neighborhoods by area */}
          <div className="space-y-6 mb-10">
            {neighborhoodGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="font-semibold text-lg mb-3 text-foreground">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((neighborhood, index) => (
                    <span 
                      key={index}
                      className="bg-card border border-border px-4 py-2 rounded-full text-sm font-medium hover:border-primary transition-colors"
                    >
                      {neighborhood}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Nearby areas */}
          <div className="border-t border-border pt-8">
            <h3 className="font-bold text-xl mb-4">
              Comuni della Provincia di Napoli
            </h3>
            <p className="text-muted-foreground mb-4">
              Oltre alla città di Napoli, interveniamo in tutti i comuni della provincia:
            </p>
            <div className="flex flex-wrap gap-2">
              {NAPOLI_NEARBY_AREAS.map((area, index) => (
                <span 
                  key={index}
                  className="bg-secondary/50 border border-border px-4 py-2 rounded-full text-sm font-medium"
                >
                  {area}
                </span>
              ))}
              <span className="bg-primary/10 border border-primary/30 px-4 py-2 rounded-full text-sm font-medium text-primary">
                + altri 90 comuni
              </span>
            </div>
          </div>
          
          {/* Local SEO text */}
          <div className="mt-8 p-4 bg-accent/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              👉 Trova un <strong className="text-foreground">idraulico Vomero</strong>, 
              <strong className="text-foreground"> idraulico Chiaia</strong>, 
              <strong className="text-foreground"> idraulico Posillipo</strong>, 
              <strong className="text-foreground"> idraulico Fuorigrotta</strong> o in qualsiasi altra 
              zona di Napoli con un solo click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
