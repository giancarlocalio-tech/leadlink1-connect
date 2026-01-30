/**
 * ProblemCityCostSection - "Quanto costa risolvere [problema] a [città]"
 * 
 * SEO-optimized cost section for problem+city pages with:
 * - Cost ranges for simple, complex, and emergency interventions
 * - Local context about pricing in the specific city
 */

import { Euro, Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProblemCityCostSectionProps {
  cityName: string;
  citySlug: string;
  problemName: string;
  problemSlug: string;
}

// Cost data by problem type
const getCostData = (problemSlug: string) => {
  const costs: Record<string, { simple: string; complex: string; emergency: string; description: string }> = {
    "lavandino-intasato": {
      simple: "50€ - 80€",
      complex: "80€ - 150€",
      emergency: "120€ - 200€",
      description: "disostruzione semplice con ventosa o sonda"
    },
    "wc-otturato": {
      simple: "60€ - 100€",
      complex: "100€ - 200€",
      emergency: "150€ - 280€",
      description: "sturatura con sonda o idropulitrice"
    },
    "scaldabagno-non-scalda": {
      simple: "80€ - 120€",
      complex: "120€ - 250€",
      emergency: "180€ - 350€",
      description: "riparazione o sostituzione componenti"
    },
    "caldaia-in-blocco": {
      simple: "70€ - 120€",
      complex: "120€ - 220€",
      emergency: "180€ - 300€",
      description: "reset, riparazione o sostituzione parti"
    },
    "tubo-che-perde": {
      simple: "80€ - 130€",
      complex: "130€ - 300€",
      emergency: "200€ - 450€",
      description: "riparazione o sostituzione tratto di tubatura"
    },
    "doccia-non-scarica": {
      simple: "50€ - 80€",
      complex: "80€ - 150€",
      emergency: "120€ - 200€",
      description: "pulizia piletta e disostruzione tubature"
    },
    "scarico-cucina-lento": {
      simple: "50€ - 80€",
      complex: "80€ - 130€",
      emergency: "100€ - 180€",
      description: "pulizia sifone e disostruzione professionale"
    },
    "termosifone-freddo": {
      simple: "40€ - 70€",
      complex: "70€ - 150€",
      emergency: "100€ - 200€",
      description: "sfiato, pulizia o sostituzione valvole"
    }
  };
  return costs[problemSlug] || costs["lavandino-intasato"];
};

export function ProblemCityCostSection({ 
  cityName, 
  citySlug,
  problemName, 
  problemSlug 
}: ProblemCityCostSectionProps) {
  const costData = getCostData(problemSlug);

  return (
    <section className="bg-muted/30 rounded-2xl p-6 md:p-8 border border-border">
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
        <Euro className="h-6 w-6 text-primary" />
        Quanto Costa Risolvere {problemName} a {cityName}
      </h2>
      
      <p className="text-muted-foreground mb-6 leading-relaxed">
        I costi per risolvere {problemName.toLowerCase()} a {cityName} possono variare in base 
        all'urgenza, alla complessità dell'intervento e all'orario di chiamata. Ecco una stima 
        indicativa basata sugli interventi più comuni nella zona.
      </p>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        {/* Simple intervention */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
              <Euro className="h-4 w-4 text-secondary-foreground" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Intervento Semplice</span>
          </div>
          <p className="text-xl font-bold text-foreground">{costData.simple}</p>
          <p className="text-xs text-muted-foreground mt-1">{costData.description}</p>
        </div>

        {/* Complex intervention */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Clock className="h-4 w-4 text-accent-foreground" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Intervento Complesso</span>
          </div>
          <p className="text-xl font-bold text-foreground">{costData.complex}</p>
          <p className="text-xs text-muted-foreground mt-1">con ispezione video o lavoro prolungato</p>
        </div>

        {/* Emergency */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Emergenza Notturna/Festiva</span>
          </div>
          <p className="text-xl font-bold text-foreground">{costData.emergency}</p>
          <p className="text-xs text-muted-foreground mt-1">maggiorazione 30-50% in orari speciali</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        <strong>Nota:</strong> I costi a {cityName} possono variare in base all'urgenza, alla difficoltà 
        dell'intervento e alla zona di intervento. Richiedi sempre un preventivo gratuito prima 
        dell'intervento per avere un'idea precisa del costo.
      </p>

      {/* Link to main pricing page */}
      <div className="mt-4 pt-4 border-t border-border">
        <Link 
          to="/costi-idraulico"
          className="text-primary hover:underline text-sm font-medium inline-flex items-center gap-1"
        >
          Scopri tutti i costi idraulico →
        </Link>
      </div>
    </section>
  );
}
