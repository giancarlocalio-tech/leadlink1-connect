import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Euro, ArrowRight } from 'lucide-react';

interface PricingPage {
  slug: string;
  h1: string;
}

interface HubCostsSummaryProps {
  htmlContent: string;
  costsSummary: string;
  relatedPricing: PricingPage[];
}

export function HubCostsSummary({ htmlContent, costsSummary, relatedPricing }: HubCostsSummaryProps) {
  return (
    <section id="costi" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-500/10 p-3 rounded-full">
          <Euro className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">Quanto Può Costare Risolvere Questi Problemi</h2>
      </div>

      {/* FASE 3: Cost summary paragraph */}
      <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
        <p className="text-muted-foreground">
          <strong className="text-foreground">In sintesi:</strong> {costsSummary}
        </p>
      </div>

      {/* Detailed costs table */}
      <div 
        className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-table:w-full prose-th:bg-muted prose-th:p-3 prose-td:p-3 prose-td:border prose-th:border"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      
      {/* Link to Pricing Pages */}
      {relatedPricing.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {relatedPricing.map(pricing => (
            <Link key={pricing.slug} to={`/${pricing.slug}`}>
              <Button variant="outline" size="sm">
                Vedi {pricing.h1}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
