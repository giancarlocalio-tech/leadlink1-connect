/**
 * CityCostSection - Local cost table for city pages
 * 
 * H2: Quanto costa un idraulico a [Città]?
 * - Price table with 3 tiers
 * - Notes on surcharges
 * - Link to main pricing page
 */

import { Link } from 'react-router-dom';
import { Euro, Clock, AlertTriangle, Info } from 'lucide-react';

interface CityCostSectionProps {
  cityName: string;
  citySlug: string;
}

// Cost ranges by city (larger cities slightly higher)
const getCostRanges = (citySlug: string) => {
  const expensiveCities = ['milano', 'roma'];
  const mediumCities = ['firenze', 'venezia', 'bologna', 'torino'];
  
  if (expensiveCities.includes(citySlug)) {
    return {
      simple: { min: 60, max: 100 },
      medium: { min: 100, max: 200 },
      urgent: { min: 150, max: 300 }
    };
  } else if (mediumCities.includes(citySlug)) {
    return {
      simple: { min: 50, max: 90 },
      medium: { min: 90, max: 180 },
      urgent: { min: 130, max: 260 }
    };
  } else {
    return {
      simple: { min: 45, max: 80 },
      medium: { min: 80, max: 160 },
      urgent: { min: 120, max: 240 }
    };
  }
};

export function CityCostSection({ cityName, citySlug }: CityCostSectionProps) {
  const costs = getCostRanges(citySlug);

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Euro className="h-6 w-6 text-primary" />
            Quanto Costa un Idraulico a {cityName}?
          </h2>
          
          <p className="text-muted-foreground mb-8 leading-relaxed">
            I costi per un idraulico a {cityName} variano in base alla complessità dell'intervento, 
            all'urgenza e all'orario. Ecco una stima indicativa dei prezzi medi nella zona.
          </p>
          
          {/* Price table */}
          <div className="overflow-hidden rounded-xl border border-border mb-6">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-4 font-semibold">Tipo di Intervento</th>
                  <th className="text-right p-4 font-semibold">Prezzo Indicativo</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-secondary rounded-lg p-2">
                        <Euro className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Intervento Semplice</p>
                        <p className="text-sm text-muted-foreground">Riparazioni base, sostituzioni minori</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-lg font-bold">{costs.simple.min}€ – {costs.simple.max}€</span>
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-accent rounded-lg p-2">
                        <Clock className="h-4 w-4 text-accent-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">Intervento Medio</p>
                        <p className="text-sm text-muted-foreground">Riparazioni complesse, installazioni</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-lg font-bold">{costs.medium.min}€ – {costs.medium.max}€</span>
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-destructive/10 rounded-lg p-2">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      </div>
                      <div>
                        <p className="font-medium">Emergenza / Notturno / Festivo</p>
                        <p className="text-sm text-muted-foreground">Interventi urgenti fuori orario</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-lg font-bold">{costs.urgent.min}€ – {costs.urgent.max}€</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Notes */}
          <div className="bg-accent/30 border border-border rounded-xl p-5 mb-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong>Maggiorazioni possibili:</strong> interventi serali (+20-30%), 
                  notturni (+30-50%), weekend e festivi (+30-50%).
                </p>
                <p>
                  <strong>Preventivo gratuito:</strong> richiedi sempre un preventivo prima 
                  dell'intervento per conoscere il costo esatto.
                </p>
              </div>
            </div>
          </div>
          
          {/* Link to pricing page */}
          <div className="text-center">
            <Link 
              to="/costi-idraulico"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              Vedi tutti i costi idraulico per tipologia di intervento →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
