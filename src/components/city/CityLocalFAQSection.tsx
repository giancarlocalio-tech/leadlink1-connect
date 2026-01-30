/**
 * CityLocalFAQSection - 5 FAQs specific to the city
 * 
 * Generates localized FAQs with schema markup data
 * Returns both the component and FAQ data for JSON-LD
 */

import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CityLocalFAQSectionProps {
  cityName: string;
  citySlug: string;
}

// Generate city-specific FAQs
export const generateCityFAQs = (cityName: string, citySlug: string) => {
  const largeCities = ['milano', 'roma', 'napoli', 'torino'];
  const responseTime = largeCities.includes(citySlug) ? '30-60 minuti' : '45-90 minuti';
  
  // Cost ranges by city
  const expensiveCities = ['milano', 'roma'];
  const costRange = expensiveCities.includes(citySlug) ? '60€ - 200€' : '50€ - 180€';

  return [
    {
      question: `Quanto costa un idraulico a ${cityName}?`,
      answer: `Il costo di un idraulico a ${cityName} varia da ${costRange} per interventi standard. Le emergenze notturne o nei weekend hanno una maggiorazione del 30-50%. Su IdrauliciSubito ricevi preventivi gratuiti per confrontare i prezzi prima di decidere.`
    },
    {
      question: `In quanto tempo arriva un idraulico a ${cityName}?`,
      answer: `A ${cityName}, i nostri idraulici partner arrivano mediamente in ${responseTime}. Per emergenze gravi come allagamenti o perdite, i tempi si riducono a 15-30 minuti. Il servizio è attivo 7 giorni su 7, inclusi festivi.`
    },
    {
      question: `Il preventivo per un idraulico a ${cityName} è gratuito?`,
      answer: `Sì, richiedere un preventivo tramite IdrauliciSubito è completamente gratuito e senza impegno. Riceverai una risposta da un professionista della tua zona di ${cityName} in pochi minuti.`
    },
    {
      question: `Gli idraulici a ${cityName} lavorano anche di notte e nei festivi?`,
      answer: `Sì, molti idraulici a ${cityName} offrono servizio di pronto intervento 24/7, incluse notti, weekend e festivi. Questi interventi hanno una maggiorazione sul prezzo standard ma garantiscono assistenza immediata per emergenze.`
    },
    {
      question: `Come faccio a trovare un idraulico affidabile a ${cityName}?`,
      answer: `Con IdrauliciSubito trovi idraulici verificati a ${cityName}. Basta compilare il form indicando il problema e la zona. Riceverai una risposta da un professionista della tua area che potrà fornirti un preventivo dettagliato.`
    }
  ];
};

export function CityLocalFAQSection({ cityName, citySlug }: CityLocalFAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = generateCityFAQs(cityName, citySlug);

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">
              Domande Frequenti: Idraulico a {cityName}
            </h2>
          </div>
          
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-card rounded-xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-4 md:p-5 text-left hover:bg-muted/50 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="font-semibold text-foreground text-sm md:text-base pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    className={cn(
                      "h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200",
                      openIndex === index && "rotate-180"
                    )}
                  />
                </button>
                
                <div 
                  className={cn(
                    "transition-all duration-200",
                    openIndex === index ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                  )}
                >
                  <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0">
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
