/**
 * CityInternalLinksSection - Strategic internal links
 * 
 * Links to:
 * - Problem+city pages
 * - General service pages
 * - How it works page
 */

import { Link } from 'react-router-dom';
import { 
  Droplets, 
  Wrench, 
  Flame, 
  ShowerHead,
  Clock, 
  FileText, 
  HelpCircle,
  Euro,
  MapPin
} from 'lucide-react';

interface CityInternalLinksSectionProps {
  cityName: string;
  citySlug: string;
}

export function CityInternalLinksSection({ cityName, citySlug }: CityInternalLinksSectionProps) {
  const problemLinks = [
    { to: `/lavandino-intasato-${citySlug}`, label: `Lavandino intasato a ${cityName}`, icon: Wrench },
    { to: `/wc-otturato-${citySlug}`, label: `WC otturato a ${cityName}`, icon: ShowerHead },
    { to: `/caldaia-in-blocco-${citySlug}`, label: `Caldaia in blocco a ${cityName}`, icon: Flame },
    { to: `/tubo-che-perde-${citySlug}`, label: `Tubo che perde a ${cityName}`, icon: Droplets },
  ];

  const serviceLinks = [
    { to: '/pronto-intervento-idraulico', label: 'Pronto Intervento 24/7', icon: Clock },
    { to: '/costi-idraulico', label: 'Listino Prezzi Idraulico', icon: Euro },
    { to: '/come-funziona', label: 'Come Funziona il Servizio', icon: HelpCircle },
    { to: '/idraulico-vicino-a-me', label: 'Idraulico Vicino a Me', icon: MapPin },
  ];

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Risorse Utili per {cityName}</h2>
          
          {/* Problem+City Links */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
              Problemi Comuni a {cityName}
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {problemLinks.map((link, index) => (
                <Link 
                  key={index}
                  to={link.to}
                  className="bg-card border border-border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all flex items-center gap-3"
                >
                  <link.icon className="h-5 w-5 text-primary shrink-0" />
                  <span className="font-medium text-sm">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Service Links */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
              Servizi e Informazioni
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {serviceLinks.map((link, index) => (
                <Link 
                  key={index}
                  to={link.to}
                  className="bg-card border border-border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all flex items-center gap-3"
                >
                  <link.icon className="h-5 w-5 text-primary shrink-0" />
                  <span className="font-medium text-sm">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
