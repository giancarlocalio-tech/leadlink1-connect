import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  ArrowRight,
  Droplet,
  Wind,
  Thermometer,
  CircleSlash,
  Home,
  Bath,
  AlertTriangle,
  Lightbulb,
  Euro,
  HelpCircle,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { 
  getCityBySlug, 
  CityData, 
  ServiceData,
  SERVICES,
  CITIES,
  getKeywordPageBySlug
} from '@/lib/seoData';
import { generateJsonLd, getCityFAQs, BASE_URL } from '@/lib/seoJsonLd';
import KeywordLandingPage from './KeywordLandingPage';
import NeighborhoodLandingPage from './NeighborhoodLandingPage';
import { getServiceRichContent, generateCityServiceContent } from '@/lib/serviceContent';
import InlineWizard from '@/components/InlineWizard';
import heroBg from '@/assets/hero-bg.avif';

// SEO Config & Rich Content
import { getIndexingDecision, isTop50City, isCoreService } from '@/lib/seoConfig';
import { getCityRichContent, getCityIntroText } from '@/lib/cityRichContent';
import { getCityLocalContent, getCityLocalFAQs } from '@/lib/cityLocalContent';
import { getNeighborhoodPage, getNeighborhoodPagesForCity } from '@/lib/neighborhoodPagesData';

// SEO Components
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { LocalStats } from '@/components/seo/LocalStats';
import { ProfessionalsList } from '@/components/seo/ProfessionalsList';
import { RelatedServices } from '@/components/seo/RelatedServices';
import { CustomerReviews } from '@/components/seo/CustomerReviews';
import { CityServicesLinks } from '@/components/seo/CityServicesLinks';
import { FAQSection } from '@/components/seo/FAQSection';
import { CityLocalProblemsSection } from '@/components/seo/CityLocalProblemsSection';
import { CityNeighborhoodsSection } from '@/components/seo/CityNeighborhoodsSection';
import { CityRecentInterventions } from '@/components/seo/CityRecentInterventions';
import { CityLocalFAQSection } from '@/components/seo/CityLocalFAQSection';

// Icon mapping
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Wrench,
  Droplets,
  Flame,
  Droplet,
  Clock,
  Bath,
  Wind,
  Thermometer,
  CircleSlash,
  Home
};

interface DynamicLandingPageProps {
  type: 'city' | 'city-service';
}

export default function DynamicLandingPage({ type }: DynamicLandingPageProps) {
  const params = useParams<{ slug: string }>();
  const [showWizard, setShowWizard] = useState(false);
  
  // Parse the slug to extract city and optionally service
  const slug = params.slug || '';
  
  // FIRST: Check if this slug is a keyword page
  const keywordPageData = getKeywordPageBySlug(slug);
  
  // SECOND: Check if this is a neighborhood page (e.g., "milano-navigli-idraulico")
  const neighborhoodData = getNeighborhoodPage(slug);
  
  let cityData: CityData | undefined;
  let serviceData: ServiceData | undefined;
  
  // Only try to match city/service if it's not a keyword page or neighborhood page
  if (!keywordPageData && !neighborhoodData) {
    // Try to match city-service format first: {city}-{service} e.g., "milano-manutenzione-caldaie"
    for (const service of SERVICES) {
      if (slug.endsWith(`-${service.slug}`)) {
        const citySlug = slug.replace(`-${service.slug}`, '');
        const foundCity = getCityBySlug(citySlug);
        if (foundCity) {
          cityData = foundCity;
          serviceData = service;
          break;
        }
      }
    }
    
    // If no service match, try city-only: e.g., "milano"
    if (!cityData) {
      cityData = getCityBySlug(slug);
    }
  }
  
  // If this is a keyword page, render KeywordLandingPage directly
  if (keywordPageData) {
    return <KeywordLandingPage slug={slug} />;
  }
  
  // If this is a neighborhood page, render NeighborhoodLandingPage
  if (neighborhoodData) {
    return <NeighborhoodLandingPage neighborhoodData={neighborhoodData} />;
  }
  
  // If no city data found, show 404 page (not redirect to homepage)
  if (!cityData) {
    return (
      <Layout>
        <Helmet>
          <title>Pagina non trovata - IdrauliciSubito</title>
          <meta name="robots" content="noindex, follow" />
          <meta name="prerender-status-code" content="404" />
        </Helmet>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center px-4">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-4">Pagina non trovata</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              La pagina che stai cercando non esiste o è stata spostata.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button asChild>
                <Link to="/">Torna alla Home</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/richiesta">Invia una Richiesta</Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Generate page content based on whether it's city-only or city+service
  const serviceName = serviceData?.name || 'Idraulico';
  const serviceShortName = serviceData?.shortName || 'Idraulico';
  
  const pageTitle = serviceData 
    ? `${serviceData.name} ${cityData.name} - Professionisti Verificati | Preventivi Gratuiti`
    : `Idraulico ${cityData.name} - Pronto Intervento 24/7 | Preventivi Gratuiti`;
    
  const pageDescription = serviceData
    ? `Cerchi ${serviceData.name.toLowerCase()} a ${cityData.name}? ✓ Professionisti verificati ✓ Risposta in 15 min ✓ Preventivi gratuiti. Servizio in tutta ${cityData.name} e provincia.`
    : `Cerchi un idraulico a ${cityData.name}? ✓ Professionisti verificati ✓ Risposta in 15 min ✓ Preventivi gratuiti. Riparazioni, installazioni e emergenze idrauliche in tutta ${cityData.name} e provincia.`;

  // SEO INDEXING DECISION
  const indexingDecision = getIndexingDecision(
    cityData.slug,
    serviceData?.slug,
    undefined
  );
  
  // Determine canonical URL based on indexing decision
  const canonicalUrl = indexingDecision.canonicalUrl || (serviceData 
    ? `${BASE_URL}/${cityData.slug}-${serviceData.slug}`
    : `${BASE_URL}/${cityData.slug}`);

  // Robots meta based on indexing decision
  const robotsMeta = indexingDecision.shouldIndex 
    ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    : "noindex, follow";

  const h1Text = serviceData
    ? `${serviceData.name} a ${cityData.name}`
    : `Idraulico a ${cityData.name}`;

  // Build area served array
  const areaServed = [
    { type: 'City' as const, name: cityData.name, containedIn: cityData.province },
    ...cityData.nearbyAreas.map((area) => ({ type: 'City' as const, name: area }))
  ];

  // Build breadcrumbs for both visual and JSON-LD
  const breadcrumbItems = serviceData
    ? [
        { name: cityData.name, url: `${BASE_URL}/${cityData.slug}` },
        { name: serviceData.name, url: `${BASE_URL}/${cityData.slug}-${serviceData.slug}` }
      ]
    : [{ name: `Idraulico ${cityData.name}`, url: `${BASE_URL}/${cityData.slug}` }];

  // Generate consistent rating based on city/service for AggregateRating schema
  // This enables Google rich snippets with stars (like ProntoPro)
  const generateConsistentRating = (seed: string) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash = hash & hash;
    }
    const absHash = Math.abs(hash);
    // Rating between 4.5 and 4.9
    const ratingValue = (4.5 + (absHash % 5) * 0.1).toFixed(1);
    // Review count between 150 and 500
    const reviewCount = 150 + (absHash % 351);
    return { ratingValue, reviewCount: reviewCount.toString() };
  };
  
  const rating = generateConsistentRating(`${cityData.slug}-${serviceData?.slug || 'idraulico'}`);

  // Get rich city content for Top 50 cities
  const cityRichContent = isTop50City(cityData.slug) ? getCityRichContent(cityData) : null;
  const cityIntroText = isTop50City(cityData.slug) ? getCityIntroText(cityData) : null;
  
  // Get advanced local content for Top 50 cities (Phase 1-3 SEO)
  const cityLocalContent = isTop50City(cityData.slug) 
    ? getCityLocalContent(cityData.slug, cityData.name, cityData.region) 
    : null;
  const cityLocalFAQs = isTop50City(cityData.slug) 
    ? getCityLocalFAQs(cityData.name, cityData.province) 
    : null;
  
  // Get neighborhood pages for this city (for internal linking)
  const neighborhoodPages = getNeighborhoodPagesForCity(cityData.slug);

  // Generate structured data using utility (only include aggregateRating for indexed pages)
  const jsonLd = generateJsonLd(
    {
      name: `Idraulici Subito - ${serviceName} ${cityData.name}`,
      description: pageDescription,
      url: canonicalUrl,
      areaServed,
      serviceTypes: serviceData
        ? [serviceData.name, ...serviceData.keywords]
        : [
            "Pronto intervento idraulico",
            "Riparazione perdite acqua",
            "Installazione impianti idraulici",
            "Manutenzione caldaie",
            "Spurgo scarichi"
          ],
      aggregateRating: indexingDecision.shouldIndex ? rating : undefined
    },
    getCityFAQs(serviceShortName, cityData.name),
    breadcrumbItems
  );

  // Services to display
  const displayServices = serviceData 
    ? [serviceData]
    : SERVICES.slice(0, 3);

  // Show wizard inline
  if (showWizard) {
    return (
      <Layout>
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <meta name="robots" content={robotsMeta} />
          <link rel="canonical" href={canonicalUrl} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://www.idraulicisubito.com/og-image.jpg" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={pageTitle} />
          <meta name="twitter:description" content={pageDescription} />
          {indexingDecision.shouldIndex && (
            <script type="application/ld+json" key="structured-data">
              {JSON.stringify(jsonLd)}
            </script>
          )}
        </Helmet>
        <div className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <InlineWizard onClose={() => setShowWizard(false)} defaultCity={cityData.name} />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content={robotsMeta} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.idraulicisubito.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        {indexingDecision.shouldIndex && (
          <script type="application/ld+json" key="structured-data">
            {JSON.stringify(jsonLd)}
          </script>
        )}
      </Helmet>

      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[450px] md:min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src={heroBg} 
            alt={`${serviceName} ${cityData.name}`}
            className="w-full h-full object-cover object-[25%_center] md:object-center"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center py-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-white" />
            <span className="text-white/90 font-medium">{cityData.name}, {cityData.region}</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {h1Text}<br />
            <span className="text-primary-foreground/90">Pronto Intervento 24/7</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {serviceData 
              ? `Trova subito un professionista per ${serviceData.name.toLowerCase()} a ${cityData.name} e provincia.`
              : `Trova subito un idraulico professionista a ${cityData.name} e provincia.`
            }
            {' '}Preventivi gratuiti e risposta in 15 minuti.
          </p>
          
          <Button 
            onClick={() => setShowWizard(true)}
            size="lg"
            className="text-lg py-6 px-10 rounded-full font-semibold shadow-xl"
          >
            Richiedi Preventivo Gratuito
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-8">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Shield className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">100% Gratuito</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Clock className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">Risposta in 15 min</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Star className="h-4 w-4 text-white fill-white" />
              <span className="text-white text-sm font-medium">4.8/5 recensioni</span>
            </div>
          </div>
        </div>
      </section>

      {/* Local Statistics Section - Like ProntoPro */}
      <LocalStats cityName={cityData.name} serviceName={serviceData?.name} />

      {/* Services Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            {serviceData 
              ? `${serviceData.name} a ${cityData.name}`
              : `Servizi Idraulici a ${cityData.name}`
            }
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            {serviceData
              ? generateCityServiceContent(cityData.name, serviceData.name, serviceData.slug)
              : `I nostri idraulici a ${cityData.name} offrono una gamma completa di servizi per la tua casa o attività. Dalle riparazioni urgenti alle installazioni programmate, trovi professionisti verificati pronti a intervenire in tutti i quartieri della città.`
            }
          </p>
          
          <div className={`grid ${serviceData ? 'md:grid-cols-1 max-w-md' : 'md:grid-cols-3 max-w-4xl'} gap-6 mx-auto`}>
            {displayServices.map((service, index) => {
              const IconComponent = ICON_MAP[service.icon] || Wrench;
              return (
                <div key={index} className="bg-card rounded-xl p-6 shadow-md border border-border text-center hover:shadow-lg transition-shadow">
                  <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </div>
              );
            })}
          </div>

          {/* Other services links (for city-service pages) */}
          {serviceData && (
            <div className="mt-12 text-center">
              <h3 className="font-semibold text-lg mb-4">Altri servizi a {cityData.name}</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {SERVICES.filter(s => s.slug !== serviceData.slug).slice(0, 5).map((service) => (
                  <Link 
                    key={service.slug}
                    to={`/${cityData.slug}-${service.slug}`}
                    className="bg-muted hover:bg-muted/80 px-4 py-2 rounded-full text-sm transition-colors"
                  >
                    {service.shortName}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* RICH CONTENT SECTION - Only for Top 50 cities (city-only pages) */}
      {cityRichContent && !serviceData && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* City Introduction */}
            {cityIntroText && (
              <div className="max-w-4xl mx-auto mb-16">
                <p className="text-lg text-muted-foreground leading-relaxed text-center">
                  {cityIntroText}
                </p>
              </div>
            )}

            {/* Common Problems Section */}
            <div className="max-w-5xl mx-auto mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 flex items-center justify-center gap-3">
                <AlertTriangle className="h-7 w-7 text-amber-500" />
                {cityRichContent.problemsSection.title}
              </h2>
              <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
                {cityRichContent.problemsSection.content}
              </p>
              
              <div className="grid md:grid-cols-1 gap-6">
                {cityRichContent.problemsSection.problems.map((problem, index) => (
                  <div key={index} className="bg-card rounded-xl p-6 border border-border shadow-sm">
                    <p className="text-muted-foreground leading-relaxed">{problem}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Neighborhoods Section */}
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 flex items-center justify-center gap-3">
                <MapPin className="h-7 w-7 text-primary" />
                {cityRichContent.neighborhoodsSection.title}
              </h2>
              <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                {cityRichContent.neighborhoodsSection.content}
              </p>
              
              <div className="flex flex-wrap justify-center gap-2">
                {cityRichContent.neighborhoodsSection.list.map((neighborhood, index) => (
                  <span 
                    key={index} 
                    className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {neighborhood}
                  </span>
                ))}
              </div>
            </div>

            {/* Response Time Section */}
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 flex items-center justify-center gap-3">
                <Clock className="h-7 w-7 text-primary" />
                {cityRichContent.responseTimeSection.title}
              </h2>
              
              <div className="bg-primary/5 rounded-2xl p-8 text-center">
                <div className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 rounded-full mb-6">
                  <Clock className="h-5 w-5" />
                  <span className="font-bold text-lg">Tempo medio: {cityRichContent.responseTimeSection.avgTime}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  {cityRichContent.responseTimeSection.content}
                </p>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 flex items-center justify-center gap-3">
                <Euro className="h-7 w-7 text-primary" />
                {cityRichContent.pricingSection.title}
              </h2>
              
              <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                <p className="text-muted-foreground leading-relaxed">
                  {cityRichContent.pricingSection.content}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Rich Content Section - Only for service pages */}
      {serviceData && (() => {
        const richContent = getServiceRichContent(serviceData.slug);
        if (!richContent) return null;
        
        return (
          <section className="py-16">
            <div className="container mx-auto px-4">
              {/* Common Problems */}
              <div className="max-w-5xl mx-auto mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 flex items-center justify-center gap-3">
                  <AlertTriangle className="h-7 w-7 text-amber-500" />
                  Problemi Comuni - {serviceData.name} a {cityData.name}
                </h2>
                <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
                  Ecco i problemi più frequenti che risolviamo per i nostri clienti a {cityData.name}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {richContent.commonProblems.map((problem, index) => (
                    <div key={index} className="bg-card rounded-xl p-6 border border-border shadow-sm">
                      <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        {problem.title}
                      </h3>
                      <p className="text-muted-foreground">{problem.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips Section */}
              <div className="max-w-4xl mx-auto mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 flex items-center justify-center gap-3">
                  <Lightbulb className="h-7 w-7 text-yellow-500" />
                  Consigli Utili
                </h2>
                <p className="text-muted-foreground text-center mb-8">
                  Suggerimenti dai nostri professionisti per prevenire problemi
                </p>
                
                <div className="bg-primary/5 rounded-2xl p-8">
                  <ul className="space-y-4">
                    {richContent.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {richContent.diyWarning && (
                  <div className="mt-6 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">Attenzione al fai-da-te</h4>
                        <p className="text-amber-700 dark:text-amber-300 text-sm">{richContent.diyWarning}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Price Range & When to Call */}
              <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                {/* Price Indication */}
                <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Euro className="h-6 w-6 text-primary" />
                    Prezzi Indicativi a {cityData.name}
                  </h3>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {richContent.priceRange.min}€ - {richContent.priceRange.max}€
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{richContent.priceRange.note}</p>
                  <p className="text-sm">
                    I prezzi sono indicativi e variano in base alla complessità dell'intervento. 
                    <strong> Richiedi un preventivo gratuito</strong> per conoscere il costo esatto.
                  </p>
                </div>

                {/* When to Call */}
                <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Phone className="h-6 w-6 text-primary" />
                    Quando Chiamare un Professionista
                  </h3>
                  <ul className="space-y-3">
                    {richContent.whenToCall.slice(0, 5).map((reason, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <ArrowRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Urgency Info */}
              <div className="max-w-3xl mx-auto mt-12 bg-primary/10 rounded-2xl p-8 text-center">
                <Clock className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Urgenza dell'Intervento</h3>
                <p className="text-muted-foreground">{richContent.urgencyInfo}</p>
              </div>
            </div>
          </section>
        );
      })()}

      {/* Coverage Areas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Zone Coperte a {cityData.name}
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            I nostri professionisti operano in tutte le zone di {cityData.name} e nei comuni limitrofi
          </p>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Quartieri di {cityData.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cityData.neighborhoods.map((area, index) => (
                  <span key={index} className="bg-muted px-3 py-1 rounded-full text-sm">
                    {area}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Comuni Vicini
              </h3>
              <div className="flex flex-wrap gap-2">
                {cityData.nearbyAreas.map((area, index) => (
                  <span key={index} className="bg-muted px-3 py-1 rounded-full text-sm">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Internal Links - Related Cities */}
          <div className="mt-12 max-w-4xl mx-auto">
            <h3 className="font-semibold text-lg mb-4 text-center">Servizi anche in altre città</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {CITIES.filter(c => c.slug !== cityData.slug && c.region === cityData.region)
                .slice(0, 6)
                .map((city) => (
                  <Link 
                    key={city.slug}
                    to={serviceData ? `/${city.slug}-${serviceData.slug}` : `/${city.slug}`}
                    className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-full text-sm transition-colors"
                  >
                    {serviceData ? `${serviceData.shortName} ${city.name}` : `Idraulico ${city.name}`}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professionals List Section - Like ProntoPro */}
      <ProfessionalsList 
        cityName={cityData.name} 
        serviceName={serviceData?.name}
        onRequestQuote={() => setShowWizard(true)}
      />

      {/* Customer Reviews Section */}
      <CustomerReviews cityName={cityData.name} />

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Domande Frequenti - {serviceName} {cityData.name}
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Dynamic FAQ based on rich content */}
            {serviceData && (() => {
              const richContent = getServiceRichContent(serviceData.slug);
              if (richContent) {
                return (
                  <>
                    <div className="bg-card rounded-lg p-6 shadow-sm">
                      <h3 className="font-semibold text-lg mb-2">
                        Quanto costa {serviceData.name.toLowerCase()} a {cityData.name}?
                      </h3>
                      <p className="text-muted-foreground">
                        I prezzi per {serviceData.name.toLowerCase()} a {cityData.name} partono da {richContent.priceRange.min}€ e possono arrivare a {richContent.priceRange.max}€ per interventi standard. {richContent.priceRange.note}. Su Idraulici Subito puoi richiedere preventivi gratuiti e confrontare le offerte.
                      </p>
                    </div>
                    
                    <div className="bg-card rounded-lg p-6 shadow-sm">
                      <h3 className="font-semibold text-lg mb-2">
                        Quali sono i problemi più comuni per {serviceData.name.toLowerCase()}?
                      </h3>
                      <p className="text-muted-foreground">
                        A {cityData.name} i problemi più frequenti sono: {richContent.commonProblems.map(p => p.title.toLowerCase()).join(', ')}. I nostri professionisti sono esperti nella risoluzione di tutti questi problemi.
                      </p>
                    </div>
                    
                    <div className="bg-card rounded-lg p-6 shadow-sm">
                      <h3 className="font-semibold text-lg mb-2">
                        Quando devo chiamare un professionista per {serviceData.name.toLowerCase()}?
                      </h3>
                      <p className="text-muted-foreground">
                        {richContent.urgencyInfo} Contattaci quando noti: {richContent.whenToCall.slice(0, 3).join(', ').toLowerCase()}.
                      </p>
                    </div>
                  </>
                );
              }
              return null;
            })()}
            
            {/* Default FAQs */}
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">
                Come trovo un {serviceShortName.toLowerCase()} affidabile a {cityData.name}?
              </h3>
              <p className="text-muted-foreground">
                Tutti i professionisti su Idraulici Subito sono verificati e recensiti dai clienti. Inserisci la tua richiesta e riceverai contatti da professionisti qualificati di {cityData.name} e provincia, con risposta media in 15 minuti.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">
                È possibile richiedere un intervento urgente a {cityData.name}?
              </h3>
              <p className="text-muted-foreground">
                Sì, i nostri professionisti offrono servizio di pronto intervento 24/7 per emergenze a {cityData.name} e in tutti i comuni limitrofi come {cityData.nearbyAreas.slice(0, 3).join(', ')}. Per urgenze, indica "Subito" come tempistica nella richiesta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Perché scegliere Idraulici Subito a {cityData.name}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: CheckCircle, title: 'Professionisti Verificati', desc: 'Solo professionisti con esperienza comprovata' },
              { icon: Clock, title: 'Risposta Rapida', desc: 'Contatto entro 15 minuti dalla richiesta' },
              { icon: Shield, title: 'Preventivi Gratuiti', desc: 'Nessun costo e nessun impegno' },
              { icon: Phone, title: 'Pronto Intervento', desc: 'Disponibilità 24/7 per emergenze' },
            ].map((item, index) => (
              <div key={index} className="text-center">
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

      {/* Related Services Grid - Like ProntoPro */}
      <RelatedServices cityData={cityData} currentServiceSlug={serviceData?.slug} />

      {/* NEW PHASE 1: Local Problems Section - Only for Top 50 cities (city-only pages) */}
      {cityLocalContent && !serviceData && (
        <CityLocalProblemsSection 
          cityName={cityData.name}
          localContent={cityLocalContent}
        />
      )}

      {/* NEW PHASE 2: Neighborhoods Section - Only for Top 50 cities (city-only pages) */}
      {isTop50City(cityData.slug) && !serviceData && (
        <CityNeighborhoodsSection cityData={cityData} />
      )}

      {/* NEW PHASE 5: Recent Interventions - Only for Top 50 cities (city-only pages) */}
      {cityLocalContent && !serviceData && (
        <CityRecentInterventions 
          cityName={cityData.name}
          localContent={cityLocalContent}
        />
      )}

      {/* Neighborhood Pages Links - H2 Section for major cities with neighborhood pages */}
      {neighborhoodPages.length > 0 && !serviceData && (
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Idraulici per Zone e Quartieri
                </h2>
              </div>
              
              <p className="text-muted-foreground mb-8">
                I nostri idraulici operano in tutti i quartieri di {cityData.name}. 
                Scegli la tua zona per trovare professionisti specializzati nella tua area:
              </p>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {neighborhoodPages.map((n) => (
                  <Link
                    key={`${n.citySlug}-${n.neighborhoodSlug}`}
                    to={`/${n.citySlug}-${n.neighborhoodSlug}-idraulico`}
                    className="group bg-card border border-border rounded-xl p-4 hover:border-primary/50 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          Idraulico {n.neighborhoodName}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Interventi rapidi in zona
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Link to core service */}
              <div className="mt-8 text-center">
                <Link 
                  to={`/${cityData.slug}-pronto-intervento`}
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
                >
                  Pronto Intervento {cityData.name}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* City Services & Nearby Cities - Internal Linking (Top 50 only) */}
      {isTop50City(cityData.slug) && (
        <CityServicesLinks cityData={cityData} />
      )}

      {/* NEW PHASE 3: Localized FAQ Section - Only for Top 50 cities (city-only pages) */}
      {cityLocalFAQs && !serviceData && (
        <CityLocalFAQSection 
          cityName={cityData.name}
          faqs={cityLocalFAQs}
        />
      )}

      {/* FAQ Section with visible HTML (complements JSON-LD schema) - for service pages */}
      {isTop50City(cityData.slug) && serviceData && (
        <FAQSection 
          cityName={cityData.name}
          serviceName={serviceData?.name}
          faqs={getCityFAQs(serviceShortName, cityData.name)}
        />
      )}

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {serviceData 
              ? `Hai bisogno di ${serviceData.name.toLowerCase()} a ${cityData.name}?`
              : `Hai bisogno di un idraulico a ${cityData.name}?`
            }
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">
            Richiedi un preventivo gratuito in meno di 2 minuti. 
            Riceverai risposte da professionisti della tua zona.
          </p>
          <Button 
            onClick={() => setShowWizard(true)}
            size="lg"
            variant="secondary"
            className="text-lg py-6 px-10 rounded-full font-semibold"
          >
            Trova Professionista a {cityData.name}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </Layout>
  );
}
