import { Link } from 'react-router-dom';
import { SERVICES, CityData } from '@/lib/seoData';

interface RelatedServicesProps {
  cityData?: CityData;
  currentServiceSlug?: string;
}

// Keywords that should link to "idraulico-vicino-a-me"
const SHOULD_LINK_TO_NEAR_ME = [
  'pronto-intervento-idraulico',
  'idraulico-urgente',
  'idraulico-24-ore',
  'disotturazione-wc',
  'caldaia-perde-acqua',
  'riparazione-scaldabagno',
];

// Related keyword pages to show based on current page
const RELATED_KEYWORD_PAGES = [
  { slug: 'idraulico-vicino-a-me', name: 'Idraulico vicino a me' },
  { slug: 'pronto-intervento-idraulico', name: 'Pronto Intervento' },
  { slug: 'idraulico-24-ore', name: 'Idraulico 24 Ore' },
  { slug: 'idraulico-urgente', name: 'Idraulico Urgente' },
  { slug: 'assistenza-caldaie', name: 'Assistenza Caldaie' },
  { slug: 'disotturazione-wc', name: 'Disotturazione WC' },
];

export function RelatedServices({ cityData, currentServiceSlug }: RelatedServicesProps) {
  // Get all services except current one
  const relatedServices = currentServiceSlug 
    ? SERVICES.filter(s => s.slug !== currentServiceSlug)
    : SERVICES;
  
  // Check if this page should show link to "idraulico vicino a me"
  const shouldShowNearMeLink = currentServiceSlug && 
    SHOULD_LINK_TO_NEAR_ME.includes(currentServiceSlug) &&
    currentServiceSlug !== 'idraulico-vicino-a-me';
  
  // Get related keyword pages (exclude current)
  const relatedKeywords = RELATED_KEYWORD_PAGES.filter(k => k.slug !== currentServiceSlug);
  
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Servizi simili
        </h2>
        
        {/* Related Keyword Pages - show link to "idraulico vicino a me" prominently */}
        {shouldShowNearMeLink && (
          <div className="max-w-3xl mx-auto mb-8 text-center">
            <Link
              to="/idraulico-vicino-a-me"
              className="inline-flex items-center gap-2 py-3 px-6 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              Cerchi un idraulico vicino a me? →
            </Link>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {relatedServices.slice(0, 12).map((service) => {
            // If cityData is provided, link to city+service page
            // Otherwise link to service keyword page if available
            const href = cityData 
              ? `/${cityData.slug}-${service.slug}`
              : `/${service.slug}`;
            
            const text = cityData 
              ? `${cityData.name} ${service.name}`
              : service.name;
            
            return (
              <Link
                key={service.slug}
                to={href}
                className="text-center py-3 px-4 bg-card border border-border rounded-lg hover:border-primary hover:shadow-md transition-all text-sm font-medium hover:text-primary"
              >
                {text}
              </Link>
            );
          })}
        </div>

        {/* Related keyword pages row */}
        {!cityData && relatedKeywords.length > 0 && (
          <div className="mt-8 max-w-4xl mx-auto">
            <p className="text-center text-sm text-muted-foreground mb-4">Altre ricerche frequenti:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {relatedKeywords.slice(0, 5).map((keyword) => (
                <Link
                  key={keyword.slug}
                  to={`/${keyword.slug}`}
                  className="text-sm py-2 px-4 bg-muted hover:bg-muted/80 rounded-full transition-colors"
                >
                  {keyword.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
