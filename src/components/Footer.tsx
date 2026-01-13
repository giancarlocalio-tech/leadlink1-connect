import { Link } from 'react-router-dom';
import { Wrench, MapPin, Phone, Flame, Droplets } from 'lucide-react';
import { CITIES, SERVICES, KEYWORD_PAGES } from '@/lib/seoData';

// Top cities for SEO internal linking (showing 12 major cities)
const TOP_CITIES = CITIES.slice(0, 12);

// Top services for footer
const TOP_SERVICES = SERVICES.slice(0, 6);

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary p-2 rounded-lg">
                <Wrench className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">Idraulici Subito</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              La piattaforma che mette in contatto clienti e idraulici professionisti in tutta Italia.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Phone className="h-4 w-4" />
              <span>Disponibili 24/7</span>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Link Utili</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/richiesta" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Richiedi Preventivo
                </Link>
              </li>
              <li>
                <Link to="/per-idraulici" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Per Idraulici
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Area Idraulici
                </Link>
              </li>
              {/* Keyword pages for SEO */}
              {KEYWORD_PAGES.map((page) => (
                <li key={page.slug}>
                  <Link 
                    to={`/${page.slug}`} 
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {page.h1.replace('Trova un ', '').replace(' - Intervento Immediato', '')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Flame className="h-4 w-4" />
              Servizi
            </h3>
            <ul className="space-y-2">
              {TOP_SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link 
                    to={`/milano-${service.slug}`} 
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {service.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legale</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/termini" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Termini di Utilizzo
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Cities Section - SEO Internal Linking */}
        <div className="border-t border-border pt-8 mb-8">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Idraulici nelle Principali Città Italiane
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {TOP_CITIES.map((city) => (
              <Link 
                key={city.slug}
                to={`/${city.slug}`} 
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                Idraulico {city.name}
              </Link>
            ))}
          </div>
        </div>

        {/* City + Service Combinations - Extended SEO */}
        <div className="border-t border-border pt-8 mb-8">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Droplets className="h-4 w-4" />
            Servizi per Città
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {/* Show a mix of city+service combinations */}
            {TOP_CITIES.slice(0, 5).flatMap((city) => 
              SERVICES.slice(0, 2).map((service) => (
                <Link 
                  key={`${city.slug}-${service.slug}`}
                  to={`/${city.slug}-${service.slug}`} 
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  {service.shortName} {city.name}
                </Link>
              ))
            )}
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Idraulici Subito. Tutti i diritti riservati. Servizio attivo in oltre 50 città italiane.
          </p>
        </div>
      </div>
    </footer>
  );
}
