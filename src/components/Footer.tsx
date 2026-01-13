import { Link } from 'react-router-dom';
import { Wrench, MapPin } from 'lucide-react';

// City pages for SEO internal linking
const CITY_PAGES = [
  { slug: 'brescia', name: 'Brescia' },
  { slug: 'milano', name: 'Milano' },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary p-2 rounded-lg">
                <Wrench className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">Idraulici Subito</span>
            </div>
            <p className="text-muted-foreground text-sm">
              La piattaforma che mette in contatto clienti e idraulici professionisti.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Link Utili</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/richiesta" className="text-muted-foreground hover:text-foreground text-sm">
                  Richiedi Preventivo
                </Link>
              </li>
              <li>
                <Link to="/per-idraulici" className="text-muted-foreground hover:text-foreground text-sm">
                  Per Idraulici
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-muted-foreground hover:text-foreground text-sm">
                  Area Idraulici
                </Link>
              </li>
            </ul>
          </div>

          {/* City pages for SEO */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Città Servite
            </h3>
            <ul className="space-y-2">
              {CITY_PAGES.map((city) => (
                <li key={city.slug}>
                  <Link 
                    to={`/idraulico-${city.slug}`} 
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    Idraulico {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legale</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/termini" className="text-muted-foreground hover:text-foreground text-sm">
                  Termini di Utilizzo
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Idraulici Subito. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
}
