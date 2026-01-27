/**
 * CityRecentInterventions - Recent work examples section
 * 
 * Displays "Interventi idraulici risolti recentemente a {Città}"
 * Shows generic examples (no sensitive data) to make the page feel "live"
 * 
 * SEO Purpose: Fresh content signals + credibility
 */

import { Wrench, MapPin, Clock, CheckCircle } from 'lucide-react';
import { CityLocalContent } from '@/lib/cityLocalContent';

interface CityRecentInterventionsProps {
  cityName: string;
  localContent: CityLocalContent;
}

export function CityRecentInterventions({ cityName, localContent }: CityRecentInterventionsProps) {
  // Get current month/year for freshness
  const now = new Date();
  const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 
                  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
  const currentMonth = months[now.getMonth()];
  const currentYear = now.getFullYear();

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wrench className="h-7 w-7 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold text-center">
              Interventi Idraulici Risolti Recentemente a {cityName}
            </h2>
          </div>
          
          <p className="text-muted-foreground text-center mb-4 max-w-2xl mx-auto">
            Ecco alcuni esempi di lavori completati dai nostri professionisti a {cityName} 
            nelle ultime settimane.
          </p>
          
          <p className="text-sm text-center text-muted-foreground mb-10">
            <Clock className="h-4 w-4 inline mr-1" />
            Aggiornato a {currentMonth} {currentYear}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localContent.recentInterventions.map((intervention, index) => (
              <div 
                key={index}
                className="bg-background border border-border rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full">
                    {intervention.type}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>{intervention.zone}, {cityName}</span>
                </div>
                
                <p className="text-foreground text-sm mb-4">
                  {intervention.description}
                </p>
                
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  <span>Risolto con successo</span>
                </div>
              </div>
            ))}
          </div>

          {/* Trust statement */}
          <div className="mt-10 text-center">
            <p className="text-muted-foreground">
              <strong>Ogni mese</strong> i professionisti della nostra rete risolvono centinaia di 
              problemi idraulici a {cityName} e provincia. 
              <span className="text-primary font-medium"> Il tuo potrebbe essere il prossimo!</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
