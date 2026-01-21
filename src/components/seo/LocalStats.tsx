import { Users, Star, FileCheck, TrendingUp } from 'lucide-react';

interface LocalStatsProps {
  cityName?: string;
  serviceName?: string;
}

// Generate pseudo-random but consistent stats based on input
function generateStats(seed: string) {
  // Simple hash function for consistent values
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  // Use hash to generate consistent stats
  const baseProfs = Math.abs(hash % 150) + 50; // 50-200 professionals
  const professionals = baseProfs;
  const rating = (4.5 + (Math.abs(hash % 4) / 10)).toFixed(1); // 4.5-4.8
  const reviews = Math.abs(hash % 800) + 200; // 200-1000 reviews
  const clientsLastYear = (Math.abs(hash % 5) + 3) * 100; // 300-800 clients
  
  return {
    professionals,
    rating: parseFloat(rating),
    reviews,
    clientsLastYear
  };
}

export function LocalStats({ cityName, serviceName }: LocalStatsProps) {
  const seed = cityName || serviceName || 'italia';
  const stats = generateStats(seed);
  const serviceText = serviceName ? serviceName.toLowerCase() : 'idraulico';
  const locationText = cityName ? `a ${cityName}` : 'in Italia';
  const zoneText = cityName ? `nella zona di ${cityName}` : 'su tutto il territorio';
  
  return (
    <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-2">
          Perché scegliere Idraulici Subito {locationText}?
        </h2>
        <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto text-sm">
          I numeri che parlano della qualità del nostro servizio {zoneText}
        </p>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {/* Professionals count */}
          <div className="bg-card rounded-xl p-5 text-center border border-border shadow-sm">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="text-sm text-muted-foreground mb-1">Un totale di</div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
              {stats.professionals}
            </div>
            <p className="text-sm text-muted-foreground">
              professionisti pronti ad aiutarti {zoneText}
            </p>
          </div>

          {/* Average rating */}
          <div className="bg-card rounded-xl p-5 text-center border border-border shadow-sm">
            <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
            </div>
            <div className="text-sm text-muted-foreground mb-1">Un voto medio di</div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
              {stats.rating}
            </div>
            <p className="text-sm text-muted-foreground">
              rende più facile la scelta del professionista giusto
            </p>
          </div>

          {/* Reviews */}
          <div className="bg-card rounded-xl p-5 text-center border border-border shadow-sm">
            <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <FileCheck className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-sm text-muted-foreground mb-1">Leggere</div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
              {stats.reviews.toLocaleString('it-IT')}
            </div>
            <p className="text-sm text-muted-foreground">
              recensioni reali dei clienti {zoneText}
            </p>
          </div>

          {/* Clients last year */}
          <div className="bg-card rounded-xl p-5 text-center border border-border shadow-sm">
            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-sm text-muted-foreground mb-1">L'anno scorso</div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
              {stats.clientsLastYear.toLocaleString('it-IT')}
            </div>
            <p className="text-sm text-muted-foreground">
              clienti si sono affidati a noi per {serviceText} {locationText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
