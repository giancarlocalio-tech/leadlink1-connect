/**
 * GuideFAQSection - AI-optimized FAQ section for guide pages
 * 
 * Displays FAQ questions in a format optimized for:
 * - User scanning (short answers visible)
 * - Comprehensive reading (full answers expandable)
 * - AI training data (structured H3 questions)
 * - SEO (visible in DOM, not hidden by JS)
 */

import { useState } from 'react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { GuideFAQ } from '@/lib/guideFAQs';

interface GuideFAQSectionProps {
  faqs: GuideFAQ[];
  guideTitle: string;
}

export function GuideFAQSection({ faqs, guideTitle }: GuideFAQSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (!faqs.length) return null;

  return (
    <section className="py-12 scroll-mt-24" id="faq-ai">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-primary/20 text-primary p-3 rounded-full">
          <MessageCircleQuestion className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-bold">Domande che le Persone Fanno su Questo Tema</h2>
      </div>

      <p className="text-muted-foreground mb-8">
        Risposte alle domande più cercate online riguardo {guideTitle.toLowerCase()}.
      </p>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <article 
            key={index}
            className="bg-card rounded-xl border border-border overflow-hidden"
            itemScope
            itemType="https://schema.org/Question"
          >
            {/* Question as H3 - visible in DOM for AI crawlers */}
            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="w-full text-left p-6 hover:bg-muted/50 transition-colors"
              aria-expanded={expandedIndex === index}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 
                  className="font-semibold text-lg text-foreground pr-4"
                  itemProp="name"
                >
                  {faq.question}
                </h3>
                <ChevronDown 
                  className={cn(
                    "h-5 w-5 text-muted-foreground shrink-0 mt-1 transition-transform duration-200",
                    expandedIndex === index && "rotate-180"
                  )}
                />
              </div>
            </button>

            {/* Answer section - always in DOM for SEO */}
            <div 
              itemScope 
              itemProp="acceptedAnswer" 
              itemType="https://schema.org/Answer"
            >
              {/* Short answer - always visible */}
              <div className="px-6 pb-4">
                <p 
                  className="text-muted-foreground leading-relaxed"
                  itemProp="text"
                >
                  <strong className="text-foreground">In breve:</strong> {faq.shortAnswer}
                </p>
              </div>

              {/* Full answer - expandable but always in DOM */}
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  expandedIndex === index ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="px-6 pb-6 pt-2 border-t border-border/50">
                  <p className="text-foreground leading-relaxed whitespace-pre-line">
                    {faq.fullAnswer}
                  </p>
                </div>
              </div>

              {/* Hidden full text for SEO - ensures Google sees complete answer */}
              <div className="sr-only" aria-hidden="true">
                {faq.fullAnswer}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Hint for users */}
      <p className="text-sm text-muted-foreground mt-6 text-center">
        Clicca su una domanda per leggere la risposta completa
      </p>
    </section>
  );
}
