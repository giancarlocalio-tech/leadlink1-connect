/**
 * NapoliEmergencyTipsSection - Emergency tips specific to Naples
 * 
 * Practical advice for common Naples-specific situations
 */

import { AlertTriangle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NAPOLI_EMERGENCY_TIPS } from '@/lib/napoliSeoContent';

interface NapoliEmergencyTipsSectionProps {
  onRequestClick: () => void;
}

export function NapoliEmergencyTipsSection({ onRequestClick }: NapoliEmergencyTipsSectionProps) {
  return (
    <section className="py-16 bg-destructive/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-destructive/10 rounded-full p-3">
              <AlertTriangle className="h-7 w-7 text-destructive" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Emergenze Idrauliche a Napoli: Cosa Fare
              </h2>
              <p className="text-muted-foreground mt-1">
                Consigli pratici specifici per la realtà napoletana
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {NAPOLI_EMERGENCY_TIPS.map((tip, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex items-start gap-3 mb-3">
                  <Lightbulb className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <h3 className="font-bold text-lg">{tip.situation}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed pl-8">
                  {tip.tip}
                </p>
              </div>
            ))}
          </div>
          
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 text-center">
            <h3 className="font-bold text-xl mb-3">
              Hai un'emergenza idraulica a Napoli adesso?
            </h3>
            <p className="text-muted-foreground mb-4">
              Non aspettare: ogni minuto può causare danni maggiori. 
              Richiedi subito l'intervento di un idraulico nella tua zona.
            </p>
            <Button 
              onClick={onRequestClick}
              size="lg"
              className="bg-destructive hover:bg-destructive/90"
            >
              <AlertTriangle className="mr-2 h-5 w-5" />
              Richiedi Intervento Urgente
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
