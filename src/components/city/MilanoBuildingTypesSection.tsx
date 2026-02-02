/**
 * MilanoBuildingTypesSection - Building types and their challenges
 * 
 * Shows expertise on Milano-specific building types
 */

import { Home, Building2, Castle, Warehouse } from 'lucide-react';
import { MILANO_BUILDING_TYPES } from '@/lib/milanoSeoContent';

const buildingIcons = [Castle, Home, Building2, Warehouse];

export function MilanoBuildingTypesSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Tipi di Edifici a Milano e Problemi Idraulici Specifici
          </h2>
          
          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
            Ogni tipologia edilizia milanese presenta sfide idrauliche specifiche. 
            I nostri professionisti conoscono queste differenze e sanno come intervenire 
            in modo efficace su ogni tipo di impianto.
          </p>
          
          <div className="space-y-6">
            {MILANO_BUILDING_TYPES.map((building, index) => {
              const Icon = buildingIcons[index];
              return (
                <div 
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-lg p-4 shrink-0">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-2">{building.type}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {building.description}
                      </p>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-sm text-foreground mb-2">
                          Problemi comuni:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {building.challenges.map((challenge, i) => (
                            <span 
                              key={i}
                              className="bg-destructive/10 text-destructive text-xs px-3 py-1 rounded-full font-medium"
                            >
                              {challenge}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-sm text-foreground mb-2">
                          Zone tipiche:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {building.neighborhoods.map((neighborhood, i) => (
                            <span 
                              key={i}
                              className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium"
                            >
                              {neighborhood}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
