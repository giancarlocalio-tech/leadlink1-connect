/**
 * MilanoExtendedFAQSection - 10 FAQs specific to Milano
 * 
 * Extended FAQ section for better SEO coverage
 */

import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MILANO_EXTENDED_FAQS } from '@/lib/milanoSeoContent';

export function MilanoExtendedFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <HelpCircle className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Domande Frequenti: Idraulico a Milano
              </h2>
              <p className="text-muted-foreground mt-1">
                Risposte alle domande più comuni sui servizi idraulici a Milano
              </p>
            </div>
          </div>
          
          <div className="space-y-3 mt-8">
            {MILANO_EXTENDED_FAQS.map((faq, index) => (
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
                    "transition-all duration-200",
                    openIndex === index ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
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

// Export FAQ data for JSON-LD schema
export function getMilanoFAQSchema() {
  return MILANO_EXTENDED_FAQS;
}
