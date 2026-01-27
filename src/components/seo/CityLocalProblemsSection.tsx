/**
 * CityLocalProblemsSection - Unique local problems for each city
 * 
 * Displays H2 section "Problemi idraulici più comuni a {Città}" with:
 * - Building types specific to the city
 * - Local plumbing problems
 * - Climate impact on plumbing systems
 * 
 * SEO Purpose: Unique, hyper-local content to differentiate city pages
 */

import { Building2, AlertTriangle, Thermometer } from 'lucide-react';
import { CityLocalContent } from '@/lib/cityLocalContent';

interface CityLocalProblemsSectionProps {
  cityName: string;
  localContent: CityLocalContent;
}

export function CityLocalProblemsSection({ cityName, localContent }: CityLocalProblemsSectionProps) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Main H2 Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Problemi Idraulici Più Comuni a {cityName}
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            Ogni città ha le sue caratteristiche edilizie e climatiche che influenzano gli impianti idraulici. 
            Ecco cosa incontrano più spesso i nostri professionisti a {cityName}.
          </p>

          {/* Building Types */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Tipologie di Edifici a {cityName}</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              A {cityName} troviamo una varietà di strutture abitative, ognuna con esigenze idrauliche specifiche:
            </p>
            <ul className="grid md:grid-cols-2 gap-4">
              {localContent.buildingTypes.map((type, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-3 bg-card border border-border rounded-lg p-4"
                >
                  <span className="bg-primary/10 text-primary font-bold text-sm w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-foreground">{type}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Local Problems */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-amber-500/10 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold">Problemi Frequenti nella Zona</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              I nostri idraulici a {cityName} intervengono quotidianamente su questi problemi tipici della zona:
            </p>
            <div className="space-y-3">
              {localContent.localProblems.map((problem, index) => (
                <div 
                  key={index}
                  className="bg-card border border-border rounded-lg p-4"
                >
                  <p className="text-foreground">{problem}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Climate Impact */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-500/10 p-3 rounded-full">
                <Thermometer className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold">Clima e Impatto sugli Impianti</h3>
            </div>
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-6">
              <p className="text-foreground leading-relaxed">
                {localContent.climateImpact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
