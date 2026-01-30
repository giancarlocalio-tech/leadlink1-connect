/**
 * CityEmergencySignsSection - When to call immediately
 * 
 * Box with 4+ emergency signals that require immediate professional help
 */

import { AlertTriangle, XCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CityEmergencySignsSectionProps {
  cityName: string;
  onRequestClick: () => void;
}

const EMERGENCY_SIGNS = [
  {
    title: 'Allagamento in corso',
    description: 'Acqua che fuoriesce da tubature, sanitari o elettrodomestici',
    urgency: 'Chiudi subito l\'acqua dal contatore'
  },
  {
    title: 'Acqua che risale dai sanitari',
    description: 'WC, doccia o lavandino che rigurgitano acqua sporca',
    urgency: 'Non usare altri scarichi della casa'
  },
  {
    title: 'Caldaia bloccata in inverno',
    description: 'Casa senza riscaldamento o acqua calda nei mesi freddi',
    urgency: 'Priorità per famiglie con anziani o bambini'
  },
  {
    title: 'Perdita d\'acqua continua',
    description: 'Gocciolamento o flusso che non si ferma',
    urgency: 'Ogni minuto causa danni strutturali'
  },
  {
    title: 'Odore di gas dalla caldaia',
    description: 'Puzza di gas o fumi anomali dall\'impianto',
    urgency: 'Apri le finestre e chiama subito'
  }
];

export function CityEmergencySignsSection({ cityName, onRequestClick }: CityEmergencySignsSectionProps) {
  return (
    <section className="py-12 bg-destructive/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-destructive/10 rounded-full p-3">
              <AlertTriangle className="h-7 w-7 text-destructive" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Quando Chiamare Subito un Idraulico a {cityName}</h2>
              <p className="text-muted-foreground">Segnali di emergenza che richiedono intervento immediato</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-8">
            {EMERGENCY_SIGNS.map((sign, index) => (
              <div 
                key={index}
                className="bg-card border border-destructive/20 rounded-xl p-4 flex items-start gap-4"
              >
                <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">{sign.title}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{sign.description}</p>
                  <p className="text-sm text-destructive font-medium">⚠️ {sign.urgency}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button
              onClick={onRequestClick}
              size="lg"
              className="rounded-full bg-destructive hover:bg-destructive/90"
            >
              <Phone className="mr-2 h-5 w-5" />
              Richiedi Intervento Urgente a {cityName}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
