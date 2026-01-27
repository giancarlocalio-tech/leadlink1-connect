/**
 * FAQSection - Visible FAQ HTML section for city pages
 * 
 * Displays 7 FAQ items in HTML for user visibility
 * (JSON-LD schema is already handled separately in seoJsonLd.ts)
 * 
 * SEO Purpose: Rich content + visible FAQ for user engagement
 */

import { HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  cityName: string;
  serviceName?: string;
  faqs: FAQItem[];
}

export function FAQSection({ cityName, serviceName, faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const title = serviceName 
    ? `Domande Frequenti - ${serviceName} a ${cityName}`
    : `Domande Frequenti - Idraulico a ${cityName}`;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="h-8 w-8 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold text-center">
              {title}
            </h2>
          </div>
          
          <p className="text-muted-foreground text-center mb-10">
            Risposte alle domande più comuni sui servizi idraulici a {cityName}
          </p>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-card rounded-xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-muted/50 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="font-semibold text-foreground pr-4">
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
                    "overflow-hidden transition-all duration-200",
                    openIndex === index ? "max-h-96" : "max-h-0"
                  )}
                >
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-muted-foreground leading-relaxed">
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