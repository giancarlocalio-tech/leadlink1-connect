/**
 * CityServicesLinks - Internal linking component for city pages
 * 
 * Displays:
 * 1. Links to 5 CORE_SERVICES for the current city
 * 2. Links to nearby cities (from nearbyAreas)
 * 3. Links to relevant blog articles
 * 
 * SEO Purpose: Strong internal linking structure
 */

import { Link } from 'react-router-dom';
import { Wrench, Flame, Trash2, Droplets, ShowerHead, MapPin, ArrowRight, BookOpen } from 'lucide-react';
import { CityData, CITIES } from '@/lib/seoData';
import { CORE_SERVICES } from '@/lib/seoConfig';
import { getArticlesForCityPage } from '@/lib/blogData';
import { getGuidesForCityPage } from '@/lib/guideData';

interface CityServicesLinksProps {
  cityData: CityData;
}

// Map service slugs to icons and display names
const SERVICE_CONFIG: Record<string, { icon: React.ComponentType<{ className?: string }>; name: string; description: string }> = {
  'pronto-intervento': {
    icon: Wrench,
    name: 'Pronto Intervento',
    description: 'Emergenze 24/7'
  },
  'manutenzione-caldaie': {
    icon: Flame,
    name: 'Manutenzione Caldaie',
    description: 'Controlli e riparazioni'
  },
  'spurgo-scarichi': {
    icon: Trash2,
    name: 'Spurgo Scarichi',
    description: 'Disostruzione professionale'
  },
  'riparazione-perdite': {
    icon: Droplets,
    name: 'Riparazione Perdite',
    description: 'Interventi rapidi'
  },
  'installazione-sanitari': {
    icon: ShowerHead,
    name: 'Installazione Sanitari',
    description: 'WC, lavabi, docce'
  }
};

export function CityServicesLinks({ cityData }: CityServicesLinksProps) {
  // Find nearby cities that exist as landing pages
  const nearbyCitiesWithPages = cityData.nearbyAreas
    .map(areaName => {
      // Try to find by name (case-insensitive match)
      return CITIES.find(c => 
        c.name.toLowerCase() === areaName.toLowerCase() ||
        c.slug === areaName.toLowerCase().replace(/\s+/g, '-')
      );
    })
    .filter((city): city is CityData => city !== undefined)
    .slice(0, 8);

  // Get relevant blog articles
  const blogArticles = getArticlesForCityPage();

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          
          {/* Block A: Core Services for this city */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              Servizi Idraulici Disponibili a {cityData.name}
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              Trova professionisti specializzati per ogni tipo di intervento idraulico a {cityData.name} e provincia di {cityData.province}
            </p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CORE_SERVICES.map((serviceSlug) => {
                const config = SERVICE_CONFIG[serviceSlug];
                if (!config) return null;
                
                const Icon = config.icon;
                return (
                  <Link
                    key={serviceSlug}
                    to={`/${cityData.slug}-${serviceSlug}`}
                    className="flex items-start gap-4 bg-card hover:bg-primary/5 border border-border rounded-xl p-5 transition-colors group"
                  >
                    <div className="bg-primary/10 rounded-lg p-3 shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {config.name} {cityData.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {config.description}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary shrink-0 mt-1" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Block C: Blog Articles / Guides */}
          {blogArticles.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl md:text-2xl font-bold text-center mb-4">
                Guide Utili per Problemi Idraulici a {cityData.name}
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                Articoli e consigli pratici per affrontare le emergenze idrauliche più comuni
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {blogArticles.slice(0, 4).map((article) => (
                  <Link
                    key={article.slug}
                    to={`/blog/${article.slug}`}
                    className="flex items-start gap-4 bg-card hover:bg-primary/5 border border-border rounded-xl p-5 transition-colors group"
                  >
                    <div className="bg-secondary/50 rounded-lg p-3 shrink-0">
                      <BookOpen className="h-5 w-5 text-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                        {article.readingTime} min di lettura
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary shrink-0 mt-1" />
                  </Link>
                ))}
              </div>
              
              <div className="text-center mt-6">
                <Link 
                  to="/blog" 
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
                >
                  Vedi tutte le guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
          
          {/* Block B: Nearby Cities */}
          {nearbyCitiesWithPages.length > 0 && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-center mb-4">
                Idraulici Anche nelle Zone Vicine a {cityData.name}
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                I nostri professionisti operano anche nei comuni limitrofi della provincia di {cityData.province}
              </p>
              
              <div className="flex flex-wrap justify-center gap-3">
                {nearbyCitiesWithPages.map((city) => (
                  <Link
                    key={city.slug}
                    to={`/${city.slug}`}
                    className="inline-flex items-center gap-2 bg-card hover:bg-primary/10 border border-border rounded-full px-5 py-2.5 transition-colors group"
                  >
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm font-medium text-foreground group-hover:text-primary">
                      Idraulico {city.name}
                    </span>
                  </Link>
                ))}
              </div>
              
              {/* Additional nearby areas without dedicated pages */}
              {cityData.nearbyAreas.length > nearbyCitiesWithPages.length && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Operiamo anche a: {cityData.nearbyAreas
                      .filter(area => !nearbyCitiesWithPages.some(c => c.name.toLowerCase() === area.toLowerCase()))
                      .slice(0, 10)
                      .join(', ')}
                    {cityData.nearbyAreas.length > 10 && ' e altre zone limitrofe'}
                  </p>
                </div>
              )}
            </div>
          )}
          
        </div>
      </div>
    </section>
  );
}