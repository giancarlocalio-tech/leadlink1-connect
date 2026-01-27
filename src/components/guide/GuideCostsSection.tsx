/**
 * GuideCostsSection - Pricing section for guides
 * 
 * Links to relevant pricing page and shows indicative costs.
 */

import { Link } from 'react-router-dom';
import { Euro, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CostItem {
  service: string;
  price: string;
}

interface GuideCostsSectionProps {
  costs: CostItem[];
  relatedPricingPage?: string;
  relatedPricingTitle?: string;
}

export function GuideCostsSection({ 
  costs, 
  relatedPricingPage,
  relatedPricingTitle = 'Vedi tutti i costi' 
}: GuideCostsSectionProps) {
  return (
    <section id="costi-riparazione" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-secondary text-secondary-foreground p-3 rounded-full">
          <Euro className="h-6 w-6" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold">Quanto Può Costare la Riparazione</h2>
      </div>
      
      <p className="text-muted-foreground mb-6">
        I costi variano in base alla complessità dell'intervento, alla zona geografica e all'urgenza. 
        Ecco una stima indicativa:
      </p>
      
      <Card className="mb-6">
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {costs.map((cost, index) => (
              <div 
                key={index} 
                className="flex justify-between items-center p-4 hover:bg-muted/50 transition-colors"
              >
                <span className="text-foreground font-medium">{cost.service}</span>
                <span className="text-primary font-bold">{cost.price}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-muted/50 rounded-lg p-4 mb-6">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">💡 Nota:</strong> Per interventi in emergenza 
          (sera, notte, weekend, festivi) i costi possono aumentare del 30-50%. 
          Chiedi sempre un preventivo prima dell'intervento.
        </p>
      </div>
      
      {relatedPricingPage && (
        <Link to={relatedPricingPage}>
          <Button variant="outline" className="w-full sm:w-auto">
            <ExternalLink className="h-4 w-4 mr-2" />
            {relatedPricingTitle}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      )}
    </section>
  );
}
