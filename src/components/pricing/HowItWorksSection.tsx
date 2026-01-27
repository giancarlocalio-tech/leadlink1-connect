import { MessageSquare, Phone, FileCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  {
    icon: MessageSquare,
    number: '1',
    title: 'Invia la richiesta',
    description: 'Descrivi il problema in pochi secondi. È gratuito e senza impegno.'
  },
  {
    icon: Phone,
    number: '2',
    title: 'Vieni contattato',
    description: 'Un idraulico verificato della tua zona ti contatterà rapidamente.'
  },
  {
    icon: FileCheck,
    number: '3',
    title: 'Ricevi il preventivo',
    description: 'Confronta l\'offerta e decidi se procedere. Nessun obbligo.'
  }
];

export function HowItWorksSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            Come Funziona il Servizio
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <Card key={step.number} className="relative overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="absolute top-2 right-3 text-4xl font-bold text-primary/10">
                    {step.number}
                  </div>
                  <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
