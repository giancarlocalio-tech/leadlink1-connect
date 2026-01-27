/**
 * CityLocalFAQSection - Localized FAQ for city pages
 * 
 * Displays city-specific FAQs like:
 * - "Quanto costa un idraulico a {Città}?"
 * - "In quanto tempo arriva un idraulico a {Città}?"
 * - "Fate interventi anche nei quartieri periferici?"
 * 
 * Integrates with FAQPage JSON-LD schema
 * 
 * SEO Purpose: AI-optimized local FAQs + structured data
 */

import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

interface CityLocalFAQSectionProps {
  cityName: string;
  faqs: FAQItem[];
}

export function CityLocalFAQSection({ cityName, faqs }: CityLocalFAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="h-8 w-8 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold text-center">
              Domande Frequenti su Idraulici a {cityName}
            </h2>
          </div>
          
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Risposte alle domande più comuni che riceviamo da clienti di {cityName} 
            e della provincia.
          </p>

          {/* FAQ Items - Always visible in DOM for SEO */}
          <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-card rounded-xl border border-border overflow-hidden"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-muted/50 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <h3 
                    className="font-semibold text-foreground pr-4"
                    itemProp="name"
                  >
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    className={cn(
                      "h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200",
                      openIndex === index && "rotate-180"
                    )}
                  />
                </button>
                
                {/* Answer - always in DOM, CSS controls visibility */}
                <div 
                  className={cn(
                    "transition-all duration-200",
                    openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                  )}
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div className="px-5 pb-5 pt-0">
                    <p 
                      className="text-muted-foreground leading-relaxed"
                      itemProp="text"
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
                
                {/* Hidden answer for SEO when collapsed */}
                {openIndex !== index && (
                  <div 
                    className="sr-only"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <span itemProp="text">{faq.answer}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <p className="text-muted-foreground">
              Hai altre domande? <span className="text-primary font-medium">Richiedi un preventivo gratuito</span> e 
              parla direttamente con un professionista di {cityName}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
