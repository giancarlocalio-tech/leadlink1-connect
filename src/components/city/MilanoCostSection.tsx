/**
 * MilanoCostSection - Milano-specific pricing section
 * 
 * Detailed pricing with local context and Service schema support
 */

import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import { Euro, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface MilanoCostSectionProps {
  onRequestClick: () => void;
}

const MILANO_COSTS = [
  { 
    service: 'Riparazione perdita acqua',
    priceRange: '70 - 140€',
    time: '30-60 min',
    notes: 'Dipende da accessibilità e tipo di tubatura'
  },
  { 
    service: 'Spurgo scarico intasato',
    priceRange: '80 - 160€',
    time: '30-90 min',
    notes: 'Il calcare milanese richiede spesso idropulitrice'
  },
  { 
    service: 'Riparazione rubinetto',
    priceRange: '55 - 100€',
    time: '20-40 min',
    notes: 'Sostituzione guarnizioni o intero rubinetto'
  },
  { 
    service: 'Manutenzione caldaia',
    priceRange: '90 - 160€',
    time: '45-90 min',
    notes: 'Include pulizia, controllo e certificazione'
  },
  { 
    service: 'Sostituzione scaldabagno',
    priceRange: '220 - 450€',
    time: '2-3 ore',
    notes: 'Incluso smaltimento vecchio apparecchio'
  },
  { 
    service: 'Intervento su colonna condominiale',
    priceRange: '180 - 400€',
    time: '1-3 ore',
    notes: 'Frequente nelle case di ringhiera'
  },
];

const SURCHARGES = [
  { label: 'Intervento serale (20-22)', surcharge: '+20%' },
  { label: 'Intervento notturno (22-8)', surcharge: '+40%' },
  { label: 'Weekend e festivi', surcharge: '+30%' },
  { label: 'Emergenza immediata', surcharge: '+50%' },
];

export function MilanoCostSection({ onRequestClick }: MilanoCostSectionProps) {
  return (
    <section id="costi" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 p-3 rounded-full">
              <Euro className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Quanto Costa un Idraulico a Milano?
              </h2>
              <p className="text-muted-foreground mt-1">
                Prezzi indicativi aggiornati 2024 - zona Milano e hinterland
              </p>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-8 text-lg">
            I costi di un idraulico a Milano variano in base al tipo di intervento, 
            alla complessità del problema e all'orario. Milano ha costi leggermente 
            superiori alla media nazionale per il costo della vita più elevato.
          </p>
          
          {/* Price Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse bg-card rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left p-4 font-semibold">Intervento</th>
                  <th className="text-center p-4 font-semibold">Prezzo</th>
                  <th className="text-center p-4 font-semibold hidden sm:table-cell">Durata</th>
                  <th className="text-left p-4 font-semibold hidden md:table-cell">Note</th>
                </tr>
              </thead>
              <tbody>
                {MILANO_COSTS.map((item, index) => (
                  <tr 
                    key={index}
                    className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors"
                  >
                    <td className="p-4 font-medium">{item.service}</td>
                    <td className="p-4 text-center">
                      <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-sm">
                        {item.priceRange}
                      </span>
                    </td>
                    <td className="p-4 text-center hidden sm:table-cell">
                      <span className="flex items-center justify-center gap-1 text-muted-foreground text-sm">
                        <Clock className="h-4 w-4" />
                        {item.time}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">
                      {item.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Surcharges */}
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <h3 className="font-bold text-lg">Maggiorazioni per Urgenza</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {SURCHARGES.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between bg-card rounded-lg px-4 py-3"
                >
                  <span className="text-sm">{item.label}</span>
                  <span className="font-bold text-destructive">{item.surcharge}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Milano-specific note */}
          <div className="bg-accent/50 border border-primary/20 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Nota sui Costi a Milano
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A Milano i costi sono leggermente superiori alla media nazionale per via del 
              <strong className="text-foreground"> costo della vita più elevato</strong>. Gli interventi nelle 
              <strong className="text-foreground"> case di ringhiera</strong> (Navigli, Isola, Ticinese) possono 
              richiedere più tempo per accessi difficili. I <strong className="text-foreground">palazzi Liberty</strong> 
              del Centro e di Brera spesso hanno impianti vincolati che richiedono attenzione particolare.
            </p>
          </div>
          
          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Vuoi sapere esattamente quanto costerà il tuo intervento?
            </p>
            <WhatsAppCTA cityName="Milano" label="Contattaci su WhatsApp" size="lg" />
            <p className="text-xs text-muted-foreground mt-2">
              Confronta i prezzi di più idraulici a Milano senza impegno
            </p>
          </div>
          
          {/* Link to pricing pages */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3">
              Approfondisci i costi per intervento:
            </p>
            <div className="flex flex-wrap gap-2">
              <Link to="/costi-idraulico" className="text-sm text-primary hover:underline">
                Costi idraulico
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/costo-manutenzione-caldaia" className="text-sm text-primary hover:underline">
                Manutenzione caldaia
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/costo-spurgo-scarichi" className="text-sm text-primary hover:underline">
                Spurgo scarichi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
