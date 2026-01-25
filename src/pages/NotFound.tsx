import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Home, Search, MapPin, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { CITIES } from "@/lib/seoData";

const NotFound = () => {
  const location = useLocation();
  const popularCities = CITIES.slice(0, 8);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <Helmet>
        <title>Pagina non trovata | Idraulici Subito</title>
        <meta name="description" content="La pagina richiesta non è stata trovata. Torna alla home page o cerca un idraulico nella tua città." />
        <meta name="robots" content="noindex, follow" />
        <meta name="prerender-status-code" content="404" />
      </Helmet>
      
      <div className="min-h-[60vh] flex items-center justify-center py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 Icon */}
            <div className="bg-primary/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-primary" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Pagina non trovata
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              La pagina che stai cercando non esiste o è stata spostata. 
              Prova a cercare un idraulico nella tua città.
            </p>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/">
                  <Home className="mr-2 h-5 w-5" />
                  Torna alla Home
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/richiesta">
                  <Phone className="mr-2 h-5 w-5" />
                  Richiedi Preventivo
                </Link>
              </Button>
            </div>
            
            {/* Popular cities */}
            <div className="border-t border-border pt-8">
              <h3 className="text-lg font-semibold mb-4">Cerca idraulico nella tua città</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {popularCities.map((city) => (
                  <Link
                    key={city.slug}
                    to={`/${city.slug}`}
                    className="inline-flex items-center gap-1 bg-muted hover:bg-primary/10 px-4 py-2 rounded-full text-sm transition-colors"
                  >
                    <MapPin className="h-3 w-3 text-primary" />
                    {city.name}
                  </Link>
                ))}
              </div>
              <Link 
                to="/idraulico-vicino-a-me" 
                className="inline-flex items-center gap-1 text-primary hover:underline mt-4 text-sm"
              >
                Vedi tutte le città <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;