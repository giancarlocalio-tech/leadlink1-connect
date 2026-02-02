/**
 * MilanoQuartierePage - Template per le pagine quartieri di Milano
 * Ottimizzato per SEO locale
 */

import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  MapPin, 
  Clock, 
  Shield, 
  Star, 
  Phone, 
  CheckCircle,
  Wrench,
  Droplets,
  Flame,
  Home,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { BASE_URL } from '@/lib/seoJsonLd';
import InlineWizard from '@/components/InlineWizard';
import { getQuartiereMilanoBySlug, MILANO_QUARTIERI } from '@/lib/milanoQuartieriData';
import heroBg from '@/assets/hero-bg.avif';

const SERVICES = [
  { icon: Droplets, title: 'Riparazione perdite', desc: 'Intervento rapido per perdite acqua e infiltrazioni' },
  { icon: Wrench, title: 'Spurgo scarichi', desc: 'Disostruzione scarichi e colonne condominiali' },
  { icon: Flame, title: 'Caldaie e scaldabagni', desc: 'Manutenzione, riparazione e sostituzione' },
];

export default function MilanoQuartierePage() {
  const location = useLocation();
  const [showWizard, setShowWizard] = useState(false);
  
  // Estrai lo slug dall'URL
  const slug = location.pathname.replace('/idraulico-milano-', '');
  const quartiere = getQuartiereMilanoBySlug(slug);
  
  // 404 se quartiere non trovato
  if (!quartiere) {
    return (
      <Layout>
        <Helmet>
          <meta name="prerender-status-code" content="404" />
          <meta name="robots" content="noindex, nofollow" />
          <title>Pagina non trovata | IdrauliciSubito</title>
        </Helmet>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Quartiere non trovato</h1>
          <p className="text-muted-foreground mb-8">
            Il quartiere richiesto non esiste o non è ancora disponibile.
          </p>
          <Button asChild>
            <Link to="/milano">Torna alla pagina Milano</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // SEO metadata
  const pageTitle = `Idraulico ${quartiere.nome} Milano | Pronto Intervento 24h ⭐ 4.8/5`;
  const pageDescription = `Cerchi un idraulico a ${quartiere.nome}, Milano? ✓ Pronto intervento 24/7 ✓ Professionisti verificati ✓ Arrivo in 30 min ✓ Preventivo gratuito. Interveniamo in tutto il quartiere ${quartiere.nome}.`;
  const canonicalUrl = `${BASE_URL}/idraulico-milano-${slug}`;

  // Rating consistente
  const rating = { ratingValue: '4.8', reviewCount: '156', bestRating: '5', worstRating: '1' };

  // Structured Data
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `Idraulico ${quartiere.nome} Milano - Pronto Intervento 24h`,
      "description": pageDescription,
      "url": canonicalUrl,
      "provider": {
        "@type": "LocalBusiness",
        "name": `IdrauliciSubito ${quartiere.nome}`,
        "image": `${BASE_URL}/logo.png`,
        "priceRange": "€€",
        "areaServed": {
          "@type": "Place",
          "name": `${quartiere.nome}, Milano`
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": rating.ratingValue,
        "reviewCount": rating.reviewCount,
        "bestRating": rating.bestRating,
        "worstRating": rating.worstRating
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Idraulico Milano", "item": `${BASE_URL}/milano` },
        { "@type": "ListItem", "position": 3, "name": `Idraulico ${quartiere.nome}`, "item": canonicalUrl }
      ]
    }
  ];

  const handleRequestClick = () => setShowWizard(true);

  // Show wizard inline
  if (showWizard) {
    return (
      <Layout>
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <link rel="canonical" href={canonicalUrl} />
        </Helmet>
        <div className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <InlineWizard onClose={() => setShowWizard(false)} defaultCity="Milano" />
          </div>
        </div>
      </Layout>
    );
  }

  // Altri quartieri per linking interno
  const altriQuartieri = MILANO_QUARTIERI
    .filter(q => q.slug !== slug)
    .slice(0, 8);

  return (
    <Layout>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="it_IT" />
        <meta name="geo.region" content="IT-MI" />
        <meta name="geo.placename" content={`${quartiere.nome}, Milano`} />
        {structuredData.map((schema, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(schema)}</script>
        ))}
      </Helmet>

      {/* Breadcrumb */}
      <section className="bg-muted/30 py-3 border-b">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary flex items-center gap-1">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/milano" className="hover:text-primary">
              Idraulico Milano
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">
              Idraulico {quartiere.nome}
            </span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[400px] md:min-h-[450px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src={heroBg} 
            alt={`Idraulico ${quartiere.nome} Milano`}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center py-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-white" />
            <span className="text-white/90 font-medium">{quartiere.nome}, Milano • Pronto Intervento 24/7</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Idraulico a {quartiere.nome}
            <br />
            <span className="text-white/90">Milano</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Trova subito un idraulico professionista a {quartiere.nome}. 
            Intervento rapido, preventivo gratuito, professionisti verificati.
          </p>
          
          <Button 
            onClick={handleRequestClick}
            size="lg"
            className="text-lg py-7 px-12 rounded-full font-semibold shadow-xl"
          >
            <Phone className="mr-2 h-5 w-5" />
            Richiedi Preventivo Gratuito
          </Button>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Shield className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">100% Gratuito</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Clock className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">Arrivo in 30 min</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Star className="h-4 w-4 text-white fill-white" />
              <span className="text-white text-sm font-medium">{rating.ratingValue}/5 ({rating.reviewCount} recensioni)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Idraulico a {quartiere.nome}: Intervento Rapido e Professionale
            </h2>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              {quartiere.descrizione}
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {quartiere.problemiComuni}
            </p>
            
            <Button onClick={handleRequestClick} size="lg" className="mb-8">
              <Phone className="mr-2 h-5 w-5" />
              Trova un Idraulico a {quartiere.nome}
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Servizi Idraulici a {quartiere.nome}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {SERVICES.map((service, index) => (
              <div key={index} className="bg-card rounded-xl p-6 shadow-md border border-border text-center">
                <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <service.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Perché Scegliere IdrauliciSubito a {quartiere.nome}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: CheckCircle, title: 'Professionisti Locali', desc: `Idraulici che conoscono ${quartiere.nome}` },
              { icon: Clock, title: 'Risposta Rapida', desc: 'Arrivo medio 30 minuti' },
              { icon: Shield, title: 'Preventivi Gratuiti', desc: 'Nessun costo e nessun impegno' },
              { icon: Star, title: 'Recensioni Positive', desc: `${rating.ratingValue}/5 da ${rating.reviewCount} clienti` },
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-card rounded-xl border border-border">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Altri Quartieri */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Altri Quartieri di Milano
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {altriQuartieri.map((q) => (
              <Link
                key={q.slug}
                to={`/idraulico-milano-${q.slug}`}
                className="px-4 py-2 bg-card rounded-full border border-border hover:border-primary hover:bg-primary/5 transition-colors text-sm font-medium"
              >
                {q.nome}
              </Link>
            ))}
            <Link
              to="/milano"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Tutti i quartieri →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Hai bisogno di un idraulico a {quartiere.nome}?
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
            Non aspettare che il problema peggiori. Richiedi subito un preventivo gratuito 
            e ricevi una risposta in pochi minuti.
          </p>
          <Button 
            onClick={handleRequestClick}
            size="lg"
            variant="secondary"
            className="text-lg py-7 px-10 rounded-full font-semibold"
          >
            <Phone className="mr-2 h-5 w-5" />
            Trova un Idraulico Ora
          </Button>
          <p className="text-primary-foreground/70 text-sm mt-4">
            ✓ Gratuito ✓ Senza impegno ✓ Risposta in 15 minuti
          </p>
        </div>
      </section>
    </Layout>
  );
}
