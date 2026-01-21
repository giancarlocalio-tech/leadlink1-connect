import { Link } from 'react-router-dom';
import { SERVICES, CityData } from '@/lib/seoData';

interface RelatedServicesProps {
  cityData: CityData;
  currentServiceSlug?: string;
}

export function RelatedServices({ cityData, currentServiceSlug }: RelatedServicesProps) {
  // Get all services except current one
  const relatedServices = currentServiceSlug 
    ? SERVICES.filter(s => s.slug !== currentServiceSlug)
    : SERVICES;
  
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Servizi simili
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {relatedServices.slice(0, 12).map((service) => (
            <Link
              key={service.slug}
              to={`/${cityData.slug}-${service.slug}`}
              className="text-center py-3 px-4 bg-card border border-border rounded-lg hover:border-primary hover:shadow-md transition-all text-sm font-medium hover:text-primary"
            >
              {cityData.name} {service.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
