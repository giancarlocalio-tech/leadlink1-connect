/**
 * NapoliWhyProblemsSection - Why plumbing problems are frequent in Naples
 * 
 * SEO-optimized section explaining local context
 */

import { Building, Mountain, Droplets, Waves, Users } from 'lucide-react';
import { NAPOLI_PROBLEM_REASONS } from '@/lib/napoliSeoContent';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building,
  Mountain,
  Droplets,
  Waves,
  Users
};

export function NapoliWhyProblemsSection() {
  return (
    <section className="py-16 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Perché i Problemi Idraulici a Napoli Sono Così Frequenti?
          </h2>
          
          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
            Napoli presenta sfide idrauliche uniche rispetto ad altre città italiane. 
            Comprendere le cause aiuta a prevenire i problemi e intervenire più rapidamente.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {NAPOLI_PROBLEM_REASONS.map((reason, index) => {
              const Icon = iconMap[reason.icon];
              return (
                <div 
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-lg p-3 shrink-0">
                      {Icon && <Icon className="h-6 w-6 text-primary" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{reason.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-xl">
            <p className="text-foreground leading-relaxed">
              <strong className="text-primary">Lo sapevi?</strong> Napoli ha uno dei centri storici più grandi d'Europa, 
              riconosciuto Patrimonio dell'Umanità UNESCO. Molti edifici hanno oltre 200 anni e conservano 
              tubature originali che richiedono interventi specializzati da parte di idraulici con 
              esperienza specifica sul patrimonio edilizio napoletano.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
