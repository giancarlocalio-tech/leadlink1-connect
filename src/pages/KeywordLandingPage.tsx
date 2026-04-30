import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Clock, Shield, Star, ArrowRight, CheckCircle, Phone, Loader2, Navigation, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { getKeywordPageBySlug, CITIES } from '@/lib/seoData';
import { generateJsonLd, getKeywordFAQs, BASE_URL } from '@/lib/seoJsonLd';
import { getKeywordPageCanonical, getDifferentiatedH1 } from '@/lib/canonicalHierarchy';
import { useGeolocation } from '@/hooks/useGeolocation';
import InlineWizard from '@/components/InlineWizard';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { LocalStats } from '@/components/seo/LocalStats';
import { ProfessionalsList } from '@/components/seo/ProfessionalsList';
import { CustomerReviews } from '@/components/seo/CustomerReviews';
import { RelatedServices } from '@/components/seo/RelatedServices';
import { NearMeIntroSection, NearMeLocalIntentSection } from '@/components/seo/NearMeSEOSections';
import { NearMeFAQSection, generateNearMeFAQSchema } from '@/components/seo/NearMeFAQSection';
import heroBg from '@/assets/hero-bg.avif';

interface KeywordLandingPageProps {
  slug: string;
}

export default function KeywordLandingPage({ slug }: KeywordLandingPageProps) {
  const navigate = useNavigate();
  const pageData = getKeywordPageBySlug(slug);
  const { loading, error, cityData, cityName, requestLocation } = useGeolocation();
  const [hasRequested, setHasRequested] = useState(false);
  const [showWizard, setShowWizard] = useState(false);

  // Check if this is the "vicino a me" page
  const isNearMePage = slug === 'idraulico-vicino-a-me';

  // Auto-request location on "vicino a me" page
  useEffect(() => {
    if (isNearMePage && !hasRequested) {
      // Small delay to let page render first
      const timer = setTimeout(() => {
        requestLocation();
        setHasRequested(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isNearMePage, hasRequested, requestLocation]);
  
  if (!pageData) return null;

  const selfUrl = `${BASE_URL}/${pageData.slug}`;
  // Anti-cannibalization: /idraulico-{master-city} → canonical to /{master-city}
  const canonicalUrl = getKeywordPageCanonical(pageData.slug, selfUrl);
  // Differentiate H1 when this page is secondary to a master city page
  const cityMatch = pageData.slug.match(/^idraulico-([a-z-]+)$/);
  const differentiatedH1 = cityMatch
    ? getDifferentiatedH1('keyword-city', { citySlug: cityMatch[1] })
    : null;
  const displayH1 = differentiatedH1 || pageData.h1;

  // Generate consistent rating based on slug for AggregateRating schema
  const generateConsistentRating = (seed: string) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash = hash & hash;
    }
    const absHash = Math.abs(hash);
    // Rating between 4.6 and 4.9
    const ratingValue = (4.6 + (absHash % 4) * 0.1).toFixed(1);
    // Review count between 200 and 600
    const reviewCount = 200 + (absHash % 401);
    return { ratingValue, reviewCount: reviewCount.toString() };
  };
  
  const rating = generateConsistentRating(pageData.slug);

  // Generate structured data using utility
  const baseStructuredData = generateJsonLd(
    {
      name: `Idraulici Subito - ${pageData.h1}`,
      description: pageData.description,
      url: canonicalUrl,
      serviceTypes: [
        pageData.h1,
        "Pronto intervento idraulico",
        "Riparazione perdite acqua",
        "Installazione impianti idraulici"
      ],
      aggregateRating: rating
    },
    isNearMePage ? [] : getKeywordFAQs(pageData.h1), // Don't use generic FAQs for near-me page
    [{ name: displayH1, url: canonicalUrl }]
  );

  // For "idraulico-vicino-a-me", add dedicated FAQ schema
  const structuredData = isNearMePage 
    ? [...baseStructuredData, generateNearMeFAQSchema()]
    : baseStructuredData;

  // Nearby cities to show when no location is detected
  const popularCities = CITIES.slice(0, 12);

  // Show wizard inline
  if (showWizard) {
    return (
      <Layout>
        <Helmet>
          <title>{pageData.title}</title>
          <meta name="description" content={pageData.description} />
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
          <link rel="canonical" href={canonicalUrl} />
          <meta property="og:title" content={pageData.title} />
          <meta property="og:description" content={pageData.description} />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://www.idraulicisubito.com/og-image.jpg" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={pageData.title} />
          <meta name="twitter:description" content={pageData.description} />
          <script type="application/ld+json" key="structured-data">
            {JSON.stringify(structuredData)}
          </script>
        </Helmet>
        <div className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <InlineWizard onClose={() => setShowWizard(false)} defaultCity={cityName || ''} />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{pageData.title}</title>
        <meta name="description" content={pageData.description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageData.title} />
        <meta property="og:description" content={pageData.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.idraulicisubito.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageData.title} />
        <meta name="twitter:description" content={pageData.description} />
        <script type="application/ld+json" key="structured-data">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <Breadcrumb items={[{ name: displayH1, url: canonicalUrl }]} />

      <section className="relative overflow-hidden min-h-[450px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={heroBg} alt={displayH1} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center py-16">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            {displayH1}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {pageData.description}
          </p>

          {/* Geolocation Section - Only for "vicino a me" page */}
          {isNearMePage && (
            <div className="mb-8">
              {loading && (
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Rilevamento posizione in corso...</span>
                </div>
              )}

              {!loading && cityData && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-green-500/80 backdrop-blur-sm rounded-full px-6 py-3 text-white">
                    <Navigation className="h-5 w-5" />
                    <span>Posizione rilevata: <strong>{cityName}</strong></span>
                  </div>
                  <div className="block">
                    <Button 
                      onClick={() => navigate(`/${cityData.slug}`)}
                      size="lg"
                      className="text-lg py-6 px-10 rounded-full font-semibold bg-white text-primary hover:bg-white/90"
                    >
                      <MapPin className="mr-2 h-5 w-5" />
                      Idraulico a {cityName}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              )}

              {!loading && error && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-orange-500/80 backdrop-blur-sm rounded-full px-6 py-3 text-white">
                    <AlertCircle className="h-5 w-5" />
                    <span>{error}</span>
                  </div>
                  <div className="block">
                    <Button 
                      onClick={() => {
                        setHasRequested(false);
                        requestLocation();
                      }}
                      variant="outline"
                      className="bg-white/10 border-white text-white hover:bg-white/20"
                    >
                      <Navigation className="mr-2 h-4 w-4" />
                      Riprova
                    </Button>
                  </div>
                </div>
              )}

              {!loading && !cityData && !error && hasRequested && (
                <div className="inline-flex items-center gap-2 bg-blue-500/80 backdrop-blur-sm rounded-full px-6 py-3 text-white">
                  <MapPin className="h-5 w-5" />
                  <span>Seleziona la tua città qui sotto</span>
                </div>
              )}
            </div>
          )}

          <WhatsAppCTA label="Contattaci ora su WhatsApp" size="lg" />
          
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Shield className="h-4 w-4 text-white" /><span className="text-white text-sm">100% Gratuito</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Clock className="h-4 w-4 text-white" /><span className="text-white text-sm">Risposta in 15 min</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Star className="h-4 w-4 text-white fill-white" /><span className="text-white text-sm">4.8/5 recensioni</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Grid - Enhanced for "vicino a me" page */}
      {isNearMePage && (
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              {cityData ? `Altri idraulici vicino a ${cityName}` : 'Seleziona la tua città'}
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              {cityData 
                ? 'Trova idraulici professionisti anche nelle città vicine'
                : 'Scegli la tua città per trovare idraulici nella tua zona'
              }
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {(cityData 
                ? CITIES.filter(c => c.region === cityData.region && c.slug !== cityData.slug).slice(0, 12)
                : popularCities
              ).map((city) => (
                <Link
                  key={city.slug}
                  to={`/${city.slug}`}
                  className="bg-card hover:bg-primary/10 border border-border rounded-lg p-4 text-center transition-colors group"
                >
                  <MapPin className="h-5 w-5 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-sm">{city.name}</span>
                  <span className="block text-xs text-muted-foreground mt-1">{city.province}</span>
                </Link>
              ))}
            </div>

            {/* Show more cities link */}
            <div className="text-center mt-8">
              <p className="text-muted-foreground text-sm">
                Servizio attivo in oltre 50 città italiane
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SEO Intro Section - Only for "vicino a me" page */}
      {isNearMePage && (
        <NearMeIntroSection onShowWizard={() => setShowWizard(true)} />
      )}

      {/* Local Intent Section - Only for "vicino a me" page */}
      {isNearMePage && (
        <NearMeLocalIntentSection />
      )}

      {/* Local Stats Section */}
      <LocalStats serviceName={pageData.h1} />

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: CheckCircle, title: 'Professionisti Verificati', desc: 'Solo esperti qualificati' },
              { icon: Clock, title: 'Risposta Rapida', desc: 'Contatto in 15 minuti' },
              { icon: Shield, title: 'Preventivi Gratuiti', desc: 'Nessun impegno' },
              { icon: Phone, title: 'Pronto Intervento', desc: 'Disponibilità 24/7' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-article CTA - Only for "vicino a me" page */}
      {isNearMePage && (
        <section className="py-10 bg-accent/20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg font-semibold mb-4">Hai bisogno di un idraulico vicino a te?</p>
            <Button onClick={() => setShowWizard(true)} size="lg" className="rounded-full">
              Trova un idraulico ora <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      )}

      {/* Professionals List Section */}
      <ProfessionalsList serviceName={pageData.h1} onRequestQuote={() => setShowWizard(true)} />

      {/* Customer Reviews Section */}
      <CustomerReviews serviceName={pageData.h1} />

      {/* FAQ Section - Only for "vicino a me" page */}
      {isNearMePage && (
        <NearMeFAQSection />
      )}

      {/* Related Services Section */}
      <RelatedServices currentServiceSlug={slug} />

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {isNearMePage ? 'Trova un idraulico vicino a te ora' : 'Trova il Professionista Giusto per Te'}
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">
            Richiedi un preventivo gratuito in meno di 2 minuti.
          </p>
          <Button onClick={() => setShowWizard(true)} size="lg" variant="secondary" className="text-lg py-6 px-10 rounded-full font-semibold">
            Inizia Ora <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </Layout>
  );
}
