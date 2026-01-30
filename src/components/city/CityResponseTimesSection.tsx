/**
 * CityResponseTimesSection - Local response times
 * 
 * H2: In quanto tempo arriva un idraulico a [Città]?
 * - Center vs periphery times
 * - Emergency priority explanation
 */

import { Clock, MapPin, AlertTriangle, CheckCircle } from 'lucide-react';

interface CityResponseTimesSectionProps {
  cityName: string;
  citySlug: string;
}

// Response times by city size
const getResponseTimes = (citySlug: string) => {
  const largeCities = ['milano', 'roma', 'napoli', 'torino'];
  const mediumCities = ['bologna', 'firenze', 'genova', 'palermo', 'catania', 'bari', 'venezia', 'verona'];
  
  if (largeCities.includes(citySlug)) {
    return {
      center: '20-40 minuti',
      periphery: '30-60 minuti',
      province: '45-90 minuti',
      emergency: '15-30 minuti'
    };
  } else if (mediumCities.includes(citySlug)) {
    return {
      center: '25-45 minuti',
      periphery: '35-60 minuti',
      province: '50-90 minuti',
      emergency: '20-40 minuti'
    };
  } else {
    return {
      center: '30-50 minuti',
      periphery: '40-70 minuti',
      province: '60-100 minuti',
      emergency: '25-45 minuti'
    };
  }
};

export function CityResponseTimesSection({ cityName, citySlug }: CityResponseTimesSectionProps) {
  const times = getResponseTimes(citySlug);

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Clock className="h-6 w-6 text-primary" />
            In Quanto Tempo Arriva un Idraulico a {cityName}?
          </h2>
          
          <p className="text-muted-foreground mb-8 leading-relaxed">
            I tempi di intervento a {cityName} variano in base alla zona e all'urgenza del problema. 
            I nostri idraulici partner danno priorità alle emergenze per garantirti assistenza rapida 
            quando ne hai più bisogno.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/10 rounded-lg p-2">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Centro {cityName}</h3>
              </div>
              <p className="text-2xl font-bold text-primary mb-1">{times.center}</p>
              <p className="text-sm text-muted-foreground">
                Nelle zone centrali la copertura è più capillare
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-secondary/50 rounded-lg p-2">
                  <MapPin className="h-5 w-5 text-secondary-foreground" />
                </div>
                <h3 className="font-semibold">Periferia e Provincia</h3>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">{times.periphery}</p>
              <p className="text-sm text-muted-foreground">
                Anche le zone periferiche sono regolarmente coperte
              </p>
            </div>
          </div>
          
          {/* Emergency highlight */}
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="bg-destructive/10 rounded-lg p-2 shrink-0">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Emergenze: Priorità Assoluta</h3>
                <p className="text-muted-foreground mb-3">
                  Per allagamenti, perdite gravi e situazioni urgenti, i nostri idraulici a {cityName}{' '}
                  danno priorità assoluta. Tempo medio di arrivo: <strong>{times.emergency}</strong>
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 text-sm bg-card px-3 py-1 rounded-full border">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Disponibilità 24/7
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm bg-card px-3 py-1 rounded-full border">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Weekend e festivi
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm bg-card px-3 py-1 rounded-full border">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Interventi notturni
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
