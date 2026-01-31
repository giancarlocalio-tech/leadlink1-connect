/**
 * NapoliStatisticsSection - Local statistics and social proof
 * 
 * Shows expertise and trust signals specific to Naples
 */

import { Clock, Users, MapPin, Star, Activity, Home } from 'lucide-react';
import { NAPOLI_STATISTICS } from '@/lib/napoliSeoContent';

export function NapoliStatisticsSection() {
  const stats = [
    {
      icon: Activity,
      value: NAPOLI_STATISTICS.interventionsPerMonth,
      label: 'Interventi al mese',
      description: 'a Napoli e provincia'
    },
    {
      icon: Clock,
      value: NAPOLI_STATISTICS.averageResponseTime,
      label: 'Tempo medio arrivo',
      description: 'in città'
    },
    {
      icon: Users,
      value: NAPOLI_STATISTICS.activeePlumbers,
      label: 'Idraulici attivi',
      description: 'nella rete'
    },
    {
      icon: Star,
      value: NAPOLI_STATISTICS.customerSatisfaction,
      label: 'Soddisfazione',
      description: 'clienti'
    },
    {
      icon: MapPin,
      value: NAPOLI_STATISTICS.coveredArea,
      label: 'Area coperta',
      description: 'territorio servito'
    },
    {
      icon: Home,
      value: NAPOLI_STATISTICS.population,
      label: 'Abitanti',
      description: 'serviti a Napoli'
    }
  ];

  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              IdrauliciSubito a Napoli in Numeri
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              La nostra presenza capillare a Napoli e provincia ci permette di garantire 
              interventi rapidi e professionali in tutta l'area metropolitana
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="font-semibold text-foreground text-sm">
                  {stat.label}
                </div>
                <div className="text-muted-foreground text-xs mt-1">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
