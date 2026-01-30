/**
 * LocalMiniFAQ - 3-question FAQ for problem+city pages
 * 
 * Displays localized FAQ with:
 * - Cost question
 * - Response time question
 * - Urgency question
 * 
 * Returns FAQ data for JSON-LD schema
 */

import { useState } from 'react';
import { HelpCircle, ChevronDown, Euro, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface LocalMiniFAQProps {
  cityName: string;
  problemName: string;
  problemSlug: string;
}

// Cost ranges by problem type
const getCostRange = (problemSlug: string): string => {
  const costs: Record<string, string> = {
    "lavandino-intasato": "50€ - 120€",
    "wc-otturato": "60€ - 150€",
    "scaldabagno-non-scalda": "80€ - 200€",
    "caldaia-in-blocco": "70€ - 180€",
    "tubo-che-perde": "80€ - 250€",
    "doccia-non-scarica": "50€ - 120€",
    "scarico-cucina-lento": "50€ - 100€",
    "termosifone-freddo": "40€ - 100€"
  };
  return costs[problemSlug] || "60€ - 150€";
};

// Response times by city
const getResponseTime = (cityName: string): string => {
  const largeCities = ['Milano', 'Roma', 'Napoli', 'Torino', 'Bologna', 'Firenze'];
  if (largeCities.includes(cityName)) {
    return "30-60 minuti";
  }
  return "45-90 minuti";
};

// Urgency level by problem type
const getUrgencyInfo = (problemSlug: string): { level: string; explanation: string } => {
  const urgency: Record<string, { level: string; explanation: string }> = {
    "lavandino-intasato": {
      level: "Media",
      explanation: "Se l'acqua non defluisce affatto, evita di usare il lavandino per non allagare. Se scorre lentamente, puoi provare i metodi fai-da-te."
    },
    "wc-otturato": {
      level: "Alta",
      explanation: "Un WC completamente otturato è un problema urgente, soprattutto se è l'unico bagno di casa. L'acqua che risale indica un'ostruzione grave."
    },
    "scaldabagno-non-scalda": {
      level: "Media-Alta",
      explanation: "Senza acqua calda la casa diventa ingestibile. In inverno è prioritario risolvere entro poche ore."
    },
    "caldaia-in-blocco": {
      level: "Alta",
      explanation: "In inverno, una caldaia in blocco significa casa fredda e senza acqua calda. Richiede intervento rapido, specialmente con anziani o bambini."
    },
    "tubo-che-perde": {
      level: "Molto Alta",
      explanation: "Una perdita d'acqua attiva causa danni strutturali ogni minuto. Chiudi subito l'acqua e chiama un idraulico."
    },
    "doccia-non-scarica": {
      level: "Media",
      explanation: "Fastidioso ma non urgente. Evita di usare la doccia per non allagare il bagno mentre aspetti l'intervento."
    },
    "scarico-cucina-lento": {
      level: "Bassa-Media",
      explanation: "Se l'acqua scorre, anche se lentamente, puoi aspettare qualche giorno. Se si blocca del tutto, intervieni prima."
    },
    "termosifone-freddo": {
      level: "Media",
      explanation: "Un solo termosifone freddo non è urgente. Se tutti i radiatori sono freddi, potrebbe esserci un problema alla caldaia."
    }
  };
  return urgency[problemSlug] || { level: "Media", explanation: "Valuta in base alla gravità del problema." };
};

// Generate FAQ items (4 questions for schema markup)
export const generateLocalFAQItems = (
  cityName: string,
  problemName: string,
  problemSlug: string
): { question: string; answer: string }[] => {
  const costRange = getCostRange(problemSlug);
  const responseTime = getResponseTime(cityName);
  const urgencyInfo = getUrgencyInfo(problemSlug);

  return [
    {
      question: `Quanto costa risolvere ${problemName.toLowerCase()} a ${cityName}?`,
      answer: `Il costo medio per risolvere ${problemName.toLowerCase()} a ${cityName} varia tra ${costRange}, a seconda della complessità dell'intervento. Gli interventi notturni o nei weekend possono avere una maggiorazione del 20-50%. Richiedi sempre un preventivo prima dell'intervento.`
    },
    {
      question: `In quanto tempo arriva un idraulico a ${cityName}?`,
      answer: `A ${cityName}, i nostri idraulici partner arrivano mediamente in ${responseTime} per interventi urgenti. Per appuntamenti programmati, puoi scegliere il giorno e la fascia oraria più comoda. La disponibilità è attiva 7 giorni su 7.`
    },
    {
      question: `${problemName} è un problema urgente?`,
      answer: `Livello di urgenza: ${urgencyInfo.level}. ${urgencyInfo.explanation} In caso di dubbio, contatta un professionista per una valutazione.`
    },
    {
      question: `Quando devo chiamare un idraulico per ${problemName.toLowerCase()}?`,
      answer: `Chiama un idraulico a ${cityName} se: il problema persiste dopo aver provato i metodi fai-da-te, se l'acqua non defluisce affatto, se noti cattivi odori persistenti, o se il problema si ripresenta frequentemente. Un professionista può diagnosticare cause nascoste e prevenire danni maggiori.`
    }
  ];
};

export function LocalMiniFAQ({ cityName, problemName, problemSlug }: LocalMiniFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const costRange = getCostRange(problemSlug);
  const responseTime = getResponseTime(cityName);
  const urgencyInfo = getUrgencyInfo(problemSlug);

  const faqItems: FAQItem[] = [
    {
      icon: Euro,
      question: `Quanto costa risolvere ${problemName.toLowerCase()} a ${cityName}?`,
      answer: `Il costo medio per risolvere ${problemName.toLowerCase()} a ${cityName} varia tra ${costRange}, a seconda della complessità dell'intervento. Gli interventi notturni o nei weekend possono avere una maggiorazione del 20-50%. Richiedi sempre un preventivo prima dell'intervento.`
    },
    {
      icon: Clock,
      question: `In quanto tempo arriva un idraulico a ${cityName}?`,
      answer: `A ${cityName}, i nostri idraulici partner arrivano mediamente in ${responseTime} per interventi urgenti. Per appuntamenti programmati, puoi scegliere il giorno e la fascia oraria più comoda. La disponibilità è attiva 7 giorni su 7.`
    },
    {
      icon: AlertTriangle,
      question: `${problemName} è un problema urgente?`,
      answer: `Livello di urgenza: ${urgencyInfo.level}. ${urgencyInfo.explanation} In caso di dubbio, contatta un professionista per una valutazione.`
    },
    {
      icon: HelpCircle,
      question: `Quando devo chiamare un idraulico per ${problemName.toLowerCase()}?`,
      answer: `Chiama un idraulico a ${cityName} se: il problema persiste dopo aver provato i metodi fai-da-te, se l'acqua non defluisce affatto, se noti cattivi odori persistenti, o se il problema si ripresenta frequentemente. Un professionista può diagnosticare cause nascoste e prevenire danni maggiori.`
    }
  ];

  return (
    <section className="py-8">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="h-6 w-6 text-primary" />
        <h2 className="text-xl md:text-2xl font-bold text-foreground">
          Domande Frequenti: {problemName} a {cityName}
        </h2>
      </div>

      <div className="space-y-3">
        {faqItems.map((faq, index) => (
          <div 
            key={index}
            className="bg-card rounded-xl border border-border overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between gap-4 p-4 md:p-5 text-left hover:bg-muted/50 transition-colors"
              aria-expanded={openIndex === index}
            >
              <div className="flex items-center gap-3">
                <faq.icon className="h-5 w-5 text-primary shrink-0" />
                <h3 className="font-semibold text-foreground text-sm md:text-base">
                  {faq.question}
                </h3>
              </div>
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
              <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0 pl-12 md:pl-14">
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
