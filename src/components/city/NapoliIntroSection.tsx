/**
 * NapoliIntroSection - Ultra-optimized intro for Naples
 * 
 * Long-form SEO intro with rich local context
 */

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { NAPOLI_INTRO_CONTENT } from '@/lib/napoliSeoContent';

interface NapoliIntroSectionProps {
  onRequestClick: () => void;
}

export function NapoliIntroSection({ onRequestClick }: NapoliIntroSectionProps) {
  const content = NAPOLI_INTRO_CONTENT;

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Rich intro text */}
          <div className="prose prose-lg max-w-none mb-8">
            <div className="bg-accent/30 border-l-4 border-primary p-6 rounded-r-lg space-y-4">
              <p 
                className="text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: content.paragraph1.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>')
                }}
              />
              <p className="text-lg leading-relaxed">
                {content.paragraph2}
              </p>
              <p className="text-lg leading-relaxed">
                {content.paragraph3.split('IdrauliciSubito').map((part, i, arr) => (
                  i < arr.length - 1 ? (
                    <span key={i}>
                      {part}
                      <Link to="/" className="text-primary hover:underline font-semibold">IdrauliciSubito</Link>
                    </span>
                  ) : part
                ))}
              </p>
              <p 
                className="text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: content.paragraph4.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                }}
              />
            </div>
          </div>
          
          {/* Why choose us box */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-lg mb-4 text-primary">
              Perché scegliere IdrauliciSubito a Napoli?
            </h3>
            <ul className="space-y-3">
              {content.whyUs.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* CTA */}
          <div className="text-center">
            <Button 
              onClick={onRequestClick}
              size="lg"
              className="rounded-full text-lg py-6 px-8"
            >
              Trova un Idraulico a Napoli Ora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-muted-foreground text-sm mt-3">
              Preventivo gratuito • Risposta in 15 minuti • Senza impegno
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
