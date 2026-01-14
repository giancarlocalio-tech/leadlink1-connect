import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
  Bath
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { 
  getCityBySlug, 
  CityData, 
  ServiceData,
  SERVICES,
  CITIES 
} from '@/lib/seoData';
import { generateJsonLd, getCityFAQs, BASE_URL } from '@/lib/seoJsonLd';
import InlineWizard from '@/components/InlineWizard';
import heroBg from '@/assets/hero-bg.avif';

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
  const navigate = useNavigate();
  const [showWizard, setShowWizard] = useState(false);
  
  // Parse the slug to extract city and optionally service
  const slug = params.slug || '';
  let cityData: CityData | undefined;
  let serviceData: ServiceData | undefined;
  
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
  
  useEffect(() => {
    if (!cityData) {
      navigate('/');
    }
  }, [cityData, navigate]);
  
  if (!cityData) return null;

  // Generate page content based on whether it's city-only or city+service
  const serviceName = serviceData?.name || 'Idraulico';
  const serviceShortName = serviceData?.shortName || 'Idraulico';
  
  const pageTitle = serviceData 
    ? `${serviceData.name} ${cityData.name} - Professionisti Verificati | Preventivi Gratuiti`
    : `Idraulico ${cityData.name} - Pronto Intervento 24/7 | Preventivi Gratuiti`;
    
  const pageDescription = serviceData
    ? `Cerchi ${serviceData.name.toLowerCase()} a ${cityData.name}? ✓ Professionisti verificati ✓ Risposta in 15 min ✓ Preventivi gratuiti. Servizio in tutta ${cityData.name} e provincia.`
    : `Cerchi un idraulico a ${cityData.name}? ✓ Professionisti verificati ✓ Risposta in 15 min ✓ Preventivi gratuiti. Riparazioni, installazioni e emergenze idrauliche in tutta ${cityData.name} e provincia.`;
    
  const canonicalUrl = serviceData 
    ? `${BASE_URL}/${cityData.slug}-${serviceData.slug}`
    : `${BASE_URL}/${cityData.slug}`;

  const h1Text = serviceData
    ? `${serviceData.name} a ${cityData.name}`
    : `Idraulico a ${cityData.name}`;

  // Build area served array
  const areaServed = [
    { type: 'City' as const, name: cityData.name, containedIn: cityData.province },
    ...cityData.nearbyAreas.map((area) => ({ type: 'City' as const, name: area }))
  ];

  // Build breadcrumbs
  const breadcrumbs = serviceData
    ? [
        { name: cityData.name, url: `${BASE_URL}/${cityData.slug}` },
        { name: serviceData.name, url: canonicalUrl }
      ]
    : [{ name: `Idraulico ${cityData.name}`, url: canonicalUrl }];

  // Generate structured data using utility
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
          ]
    },
    getCityFAQs(serviceShortName, cityData.name),
    breadcrumbs
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
          <link rel="canonical" href={canonicalUrl} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:type" content="website" />
          <meta name="twitter:title" content={pageTitle} />
          <meta name="twitter:description" content={pageDescription} />
          <script type="application/ld+json" key="structured-data">
            {JSON.stringify(jsonLd)}
          </script>
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
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <script type="application/ld+json" key="structured-data">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

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
              ? serviceData.description
              : `I nostri idraulici a ${cityData.name} offrono una gamma completa di servizi per la tua casa o attività`
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

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Domande Frequenti - {serviceName} {cityData.name}
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">
                Quanto costa un {serviceShortName.toLowerCase()} a {cityData.name}?
              </h3>
              <p className="text-muted-foreground">
                Il costo varia in base al tipo di intervento. Su Idraulici Subito puoi richiedere preventivi gratuiti e confrontare le offerte dei professionisti della tua zona.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">
                Come trovo un {serviceShortName.toLowerCase()} affidabile a {cityData.name}?
              </h3>
              <p className="text-muted-foreground">
                Tutti i professionisti su Idraulici Subito sono verificati e recensiti dai clienti. Inserisci la tua richiesta e riceverai contatti da {serviceShortName.toLowerCase()}i qualificati di {cityData.name} e provincia.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">
                Quanto tempo ci vuole per ricevere un preventivo?
              </h3>
              <p className="text-muted-foreground">
                In media ricevi una risposta entro 15 minuti dalla tua richiesta. Per emergenze urgenti, i nostri professionisti premium rispondono ancora più velocemente.
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
