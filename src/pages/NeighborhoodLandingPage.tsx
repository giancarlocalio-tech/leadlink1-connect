/**
 * NeighborhoodLandingPage - Neighborhood-specific landing page
 * 
 * URL: /{city}-{neighborhood}-idraulico
 * Example: /milano-navigli-idraulico, /roma-trastevere-idraulico
 * 
 * Only for 5 major cities: Milano, Roma, Napoli, Torino, Bologna
 * 5-8 neighborhoods per city
 * 
 * Sections:
 * 1) Introduzione locale (characteristics)
 * 2) Problemi frequenti a {Zona}
 * 3) Tempi di intervento a {Zona}
 * 4) Quanto può costare (link to pricing)
 * 5) CTA: Trova un idraulico a {Città}
 */

import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  MapPin, 
  Clock, 
  Shield, 
  Star, 
  ArrowRight,
  Building2,
  AlertTriangle,
  CheckCircle,
  Phone,
  Euro,
  Timer,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { NeighborhoodData, getNeighborhoodPagesForCity } from '@/lib/neighborhoodPagesData';
import { BASE_URL } from '@/lib/seoJsonLd';
import InlineWizard from '@/components/InlineWizard';
import heroBg from '@/assets/hero-bg.avif';

interface NeighborhoodLandingPageProps {
  neighborhoodData: NeighborhoodData;
}

export default function NeighborhoodLandingPage({ neighborhoodData }: NeighborhoodLandingPageProps) {
  const [showWizard, setShowWizard] = useState(false);
  
  const { 
    citySlug, 
    cityName, 
    province, 
    neighborhoodSlug,
    neighborhoodName,
    description,
    characteristics,
    commonProblems,
    interventionTimes,
    relatedGuideSlug,
    relatedPricingSlug
  } = neighborhoodData;

  const pageTitle = `Idraulico ${neighborhoodName} ${cityName} – Pronto Intervento`;
  const pageDescription = `Cerchi un idraulico a ${neighborhoodName}, ${cityName}? ✓ Professionisti verificati ✓ Risposta in ${interventionTimes.urgent} ✓ Interventi urgenti. Specializzati nella zona ${neighborhoodName}.`;
  const canonicalUrl = `${BASE_URL}/${citySlug}-${neighborhoodSlug}-idraulico`;

  // Get other neighborhoods in the same city
  const otherNeighborhoods = getNeighborhoodPagesForCity(citySlug)
    .filter(n => n.neighborhoodSlug !== neighborhoodSlug);

  // JSON-LD Structured Data with areaServed
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `Idraulico ${neighborhoodName} ${cityName}`,
      "description": description,
      "url": canonicalUrl,
      "areaServed": [
        {
          "@type": "Place",
          "name": neighborhoodName,
          "containedInPlace": {
            "@type": "City",
            "name": cityName
          }
        },
        {
          "@type": "City",
          "name": cityName
        }
      ],
      "provider": {
        "@type": "Organization",
        "name": "Idraulici Subito",
        "url": BASE_URL
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": `Idraulico ${cityName}`, "item": `${BASE_URL}/${citySlug}` },
        { "@type": "ListItem", "position": 3, "name": `Idraulico ${neighborhoodName}`, "item": canonicalUrl }
      ]
    }
  ];

  if (showWizard) {
    return (
      <Layout>
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href={canonicalUrl} />
        </Helmet>
        <div className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <InlineWizard onClose={() => setShowWizard(false)} defaultCity={cityName} />
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
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      {/* Breadcrumb */}
      <nav className="bg-muted/30 py-3 border-b border-border">
        <div className="container mx-auto px-4">
          <ol className="flex items-center gap-2 text-sm flex-wrap">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li className="text-muted-foreground">/</li>
            <li>
              <Link to={`/${citySlug}`} className="text-muted-foreground hover:text-primary transition-colors">
                Idraulico {cityName}
              </Link>
            </li>
            <li className="text-muted-foreground">/</li>
            <li className="text-foreground font-medium">{neighborhoodName}</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[400px] md:min-h-[450px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src={heroBg} 
            alt={`Idraulico ${neighborhoodName} ${cityName}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center py-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-white" />
            <span className="text-white/90 font-medium">{neighborhoodName}, {cityName} ({province})</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Idraulico {neighborhoodName} ({cityName}):<br />
            <span className="text-primary-foreground/90">Interventi Rapidi nel Quartiere</span>
          </h1>
          
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          
          <WhatsAppCTA cityName={neighborhoodName} label={`Contattaci su WhatsApp da ${neighborhoodName}`} size="lg" />
          
          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Shield className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">100% Gratuito</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Clock className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">Urgenze: {interventionTimes.urgent}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Star className="h-4 w-4 text-white fill-white" />
              <span className="text-white text-sm font-medium">4.8/5 recensioni</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Introduzione Locale - Characteristics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Il Quartiere {neighborhoodName}</h2>
            </div>
            
            <p className="text-muted-foreground mb-8">
              {neighborhoodName} è una zona con caratteristiche specifiche che i nostri idraulici 
              conoscono perfettamente. Ecco cosa rende unico questo quartiere di {cityName}:
            </p>
            
            <ul className="grid md:grid-cols-2 gap-4">
              {characteristics.map((char, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-3 bg-card border border-border rounded-lg p-4"
                >
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{char}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2: Problemi Frequenti */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-destructive/10 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <h2 className="text-2xl font-bold">Problemi Idraulici Frequenti a {neighborhoodName}</h2>
            </div>
            
            <p className="text-muted-foreground mb-8">
              Ecco i problemi idraulici che i nostri professionisti risolvono più frequentemente 
              nella zona {neighborhoodName}:
            </p>
            
            <div className="space-y-3">
              {commonProblems.map((problem, index) => (
                <div 
                  key={index}
                  className="bg-card border border-border rounded-lg p-4"
                >
                  <p>{problem}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Tempi di Intervento */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-500/10 p-3 rounded-full">
                <Timer className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold">Tempi di Intervento a {neighborhoodName}</h2>
            </div>
            
            <p className="text-muted-foreground mb-8">
              Quanto tempo serve per raggiungere {neighborhoodName}? Ecco i tempi medi dei nostri idraulici:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {interventionTimes.standard}
                </div>
                <div className="text-muted-foreground font-medium">
                  Intervento Standard
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  In orario lavorativo normale
                </p>
              </div>
              
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {interventionTimes.urgent}
                </div>
                <div className="text-foreground font-medium">
                  Pronto Intervento
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Per emergenze urgenti
                </p>
              </div>
            </div>
            
            {/* Factors */}
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm font-medium mb-2">Fattori che influenzano i tempi:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {interventionTimes.factors.map((factor, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Quanto Può Costare */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-500/10 p-3 rounded-full">
                <Euro className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold">Quanto Costa un Intervento a {neighborhoodName}</h2>
            </div>
            
            <p className="text-muted-foreground mb-6">
              I costi degli interventi idraulici a {neighborhoodName} sono in linea con quelli di {cityName}. 
              Le tariffe possono variare in base alla complessità del lavoro e all'urgenza.
            </p>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="mb-4">
                Per un preventivo personalizzato gratuito, richiedi un intervento e confronta 
                le offerte dei professionisti della zona.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Link to={`/${relatedPricingSlug}`}>
                  <Button variant="outline">
                    <Euro className="h-4 w-4 mr-2" />
                    Vedi Listino Prezzi
                  </Button>
                </Link>
                <WhatsAppCTA cityName={neighborhoodName} label="Contattaci su WhatsApp" size="md" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: CTA */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Trova un Idraulico a {cityName}
          </h2>
          <p className="text-primary-foreground/90 mb-6 max-w-xl mx-auto">
            I nostri professionisti conoscono bene la zona {neighborhoodName} e possono intervenire rapidamente. 
            Confronta preventivi gratuiti e scegli in totale libertà.
          </p>
          <WhatsAppCTA cityName={neighborhoodName} label="Scrivici ora su WhatsApp" size="lg" />
        </div>
      </section>

      {/* Other Neighborhoods */}
      {otherNeighborhoods.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">
              Altre Zone di {cityName}
            </h2>
            
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {otherNeighborhoods.map((n) => (
                <Link
                  key={`${n.citySlug}-${n.neighborhoodSlug}`}
                  to={`/${n.citySlug}-${n.neighborhoodSlug}-idraulico`}
                  className="bg-muted hover:bg-primary/10 text-foreground hover:text-primary px-4 py-2 rounded-full text-sm transition-colors"
                >
                  Idraulico {n.neighborhoodName}
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link 
                to={`/${citySlug}`}
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
              >
                Vedi tutti i servizi a {cityName}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Internal Links (City + Guide + Pricing + Core Service) - Minimum 4 links */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-6 text-center">Link Utili</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                to={`/${citySlug}`}
                className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-colors text-center"
              >
                <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
                <span className="font-medium">Idraulico {cityName}</span>
              </Link>
              <Link
                to={`/guide/${relatedGuideSlug}`}
                className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-colors text-center"
              >
                <BookOpen className="h-6 w-6 text-primary mx-auto mb-2" />
                <span className="font-medium">Guida Problemi</span>
              </Link>
              <Link
                to={`/${relatedPricingSlug}`}
                className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-colors text-center"
              >
                <Euro className="h-6 w-6 text-primary mx-auto mb-2" />
                <span className="font-medium">Prezzi Idraulico</span>
              </Link>
              <Link
                to={`/${citySlug}-pronto-intervento`}
                className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-colors text-center"
              >
                <AlertTriangle className="h-6 w-6 text-primary mx-auto mb-2" />
                <span className="font-medium">Pronto Intervento</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
