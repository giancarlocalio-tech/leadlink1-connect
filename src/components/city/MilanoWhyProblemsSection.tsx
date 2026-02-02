/**
 * MilanoWhyProblemsSection - Why plumbing problems are frequent in Milano
 * 
 * SEO-optimized section explaining local context
 */

import { Building, Droplets, GitBranch, Users, Thermometer } from 'lucide-react';
import { MILANO_PROBLEM_REASONS } from '@/lib/milanoSeoContent';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building,
  Droplets,
  GitBranch,
  Users,
  Thermometer
};

export function MilanoWhyProblemsSection() {
  return (
    <section className="py-16 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Perché i Problemi Idraulici a Milano Sono Così Frequenti?
          </h2>
          
          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
            Milano presenta sfide idrauliche specifiche rispetto ad altre città italiane. 
            Comprendere le cause aiuta a prevenire i problemi e intervenire più rapidamente.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {MILANO_PROBLEM_REASONS.map((reason, index) => {
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
              <strong className="text-primary">Lo sapevi?</strong> L'acqua di Milano è tra le più calcaree d'Italia 
              (30-35°F), il che significa che senza manutenzione regolare, le tubature e gli elettrodomestici 
              si incrostano rapidamente. I nostri idraulici milanesi conoscono bene questo problema e sanno 
              come prevenirlo e risolverlo efficacemente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
