/**
 * NapoliLandingPage - Ultra-optimized landing page for "idraulico napoli"
 * 
 * Target: Top 3 Google ranking
 * Strategy: Maximum content depth, local expertise signals, extended FAQs,
 *           internal linking, local reviews, AggregateRating schema
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { generateJsonLd, BASE_URL } from '@/lib/seoJsonLd';
import InlineWizard from '@/components/InlineWizard';
import heroBg from '@/assets/hero-bg.avif';

// Import Napoli-specific components
import { NapoliTableOfContents } from '@/components/city/NapoliTableOfContents';
import { NapoliIntroSection } from '@/components/city/NapoliIntroSection';
import { NapoliNeighborhoodsSection } from '@/components/city/NapoliNeighborhoodsSection';
import { NapoliWhyProblemsSection } from '@/components/city/NapoliWhyProblemsSection';
import { NapoliBuildingTypesSection } from '@/components/city/NapoliBuildingTypesSection';
import { NapoliStatisticsSection } from '@/components/city/NapoliStatisticsSection';
import { NapoliExtendedFAQSection, getNapoliFAQSchema } from '@/components/city/NapoliExtendedFAQSection';
import { NapoliEmergencyTipsSection } from '@/components/city/NapoliEmergencyTipsSection';
import { NapoliCostSection } from '@/components/city/NapoliCostSection';
import { NapoliProblemLinksSection } from '@/components/city/NapoliProblemLinksSection';
import { NapoliReviewsSection } from '@/components/city/NapoliReviewsSection';

// Import generic city components for remaining sections
import { CityCommonProblemsSection } from '@/components/city/CityCommonProblemsSection';
import { CityResponseTimesSection } from '@/components/city/CityResponseTimesSection';
import { CityInternalLinksSection } from '@/components/city/CityInternalLinksSection';

// Napoli-specific data
import { NAPOLI_NEIGHBORHOODS, NAPOLI_NEARBY_AREAS, NAPOLI_EXTENDED_FAQS } from '@/lib/napoliSeoContent';

const SERVICES = [
  { icon: Droplets, title: 'Riparazione perdite', desc: 'Intervento rapido per perdite acqua e infiltrazioni nei palazzi napoletani' },
  { icon: Wrench, title: 'Spurgo scarichi', desc: 'Disostruzione scarichi e colonne condominiali, anche edifici storici' },
  { icon: Flame, title: 'Caldaie e scaldabagni', desc: 'Manutenzione, riparazione e sostituzione per impianti di ogni epoca' },
];

export default function NapoliLandingPage() {
  const navigate = useNavigate();
  const [showWizard, setShowWizard] = useState(false);
  
  // SEO metadata - Ultra-optimized for "idraulico napoli"
  const pageTitle = 'Idraulico a Napoli | Pronto Intervento 24h in Tutti i Quartieri ⭐ 4.7/5';
  const pageDescription = 'Cerchi un idraulico a Napoli? ✓ Pronto intervento 24h ✓ Intervento urgente in 30-60 minuti ✓ 80+ professionisti verificati ✓ Preventivo gratuito. Serviamo tutti i quartieri: Vomero, Chiaia, Posillipo, Centro Storico, Fuorigrotta.';
  const canonicalUrl = `${BASE_URL}/napoli`;

  // Generate consistent rating for schema
  const rating = { ratingValue: '4.7', reviewCount: '387', bestRating: '5', worstRating: '1' };

  // Enhanced JSON-LD with AggregateRating and Review schema
  const structuredData = [
    // Service schema with AggregateRating
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Idraulico Napoli - Pronto Intervento 24h",
      "description": "Servizio idraulico professionale a Napoli e provincia. Pronto intervento 24/7, idraulici verificati, preventivi gratuiti. Interveniamo in tutti i quartieri di Napoli.",
      "url": canonicalUrl,
      "provider": {
        "@type": "LocalBusiness",
        "name": "IdrauliciSubito Napoli",
        "image": `${BASE_URL}/logo.png`,
        "telephone": "+39-000-0000000",
        "priceRange": "€€",
        "areaServed": [
          { "@type": "City", "name": "Napoli", "containedInPlace": { "@type": "AdministrativeArea", "name": "NA" } },
          ...NAPOLI_NEARBY_AREAS.slice(0, 10).map(area => ({ "@type": "City", "name": area }))
        ],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Napoli",
          "addressRegion": "Campania",
          "addressCountry": "IT"
        }
      },
      "serviceType": [
        "Pronto intervento idraulico",
        "Riparazione perdite acqua",
        "Spurgo scarichi",
        "Manutenzione caldaie",
        "Sostituzione rubinetti",
        "Riparazione tubature"
      ],
      "areaServed": {
        "@type": "City",
        "name": "Napoli",
        "containedInPlace": { "@type": "AdministrativeArea", "name": "Campania" }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": rating.ratingValue,
        "reviewCount": rating.reviewCount,
        "bestRating": rating.bestRating,
        "worstRating": rating.worstRating
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "EUR",
        "price": "50",
        "priceValidUntil": "2025-12-31",
        "availability": "https://schema.org/InStock",
        "validFrom": "2024-01-01"
      }
    },
    // FAQPage schema - UNICO per questa pagina
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      "mainEntity": NAPOLI_EXTENDED_FAQS.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    },
    // BreadcrumbList
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Idraulico Napoli", "item": canonicalUrl }
      ]
    },
    // Review snippets (sample reviews for rich results)
    {
      "@context": "https://schema.org",
      "@type": "Review",
      "itemReviewed": {
        "@type": "Service",
        "name": "IdrauliciSubito Napoli"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": { "@type": "Person", "name": "Marco R." },
      "reviewBody": "Perdita dal soffitto di notte, situazione drammatica. L'idraulico è arrivato in 25 minuti. Professionalità eccezionale.",
      "datePublished": "2024-01-15"
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
          <meta name="robots" content="index, follow, max-image-preview:large" />
          <link rel="canonical" href={canonicalUrl} />
          {structuredData.map((schema, i) => (
            <script key={i} type="application/ld+json">{JSON.stringify(schema)}</script>
          ))}
        </Helmet>
        <div className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <InlineWizard onClose={() => setShowWizard(false)} defaultCity="Napoli" />
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
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${BASE_URL}/og-image.jpg`} />
        <meta property="og:locale" content="it_IT" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="geo.region" content="IT-NA" />
        <meta name="geo.placename" content="Napoli" />
        <meta name="ICBM" content="40.8518, 14.2681" />
        {structuredData.map((schema, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(schema)}</script>
        ))}
      </Helmet>

      {/* Hero Section - Napoli specific */}
      <section className="relative overflow-hidden min-h-[500px] md:min-h-[550px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src={heroBg} 
            alt="Idraulico Napoli - Pronto intervento in tutti i quartieri"
            className="w-full h-full object-cover object-[25%_center] md:object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center py-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-white" />
            <span className="text-white/90 font-medium">Napoli, Campania • Pronto Intervento 24/7</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Idraulico a Napoli
            <br />
            <span className="text-white/90">Pronto Intervento in Tutti i Quartieri</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Trova subito un idraulico professionista a Napoli e provincia. 
            <strong> 80+ professionisti verificati</strong>, arrivo medio in 35 minuti, 
            preventivo gratuito e senza impegno.
          </p>
          
          <WhatsAppCTA cityName="Napoli" label="Contattaci su WhatsApp da Napoli" size="lg" />
          
          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-8">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Shield className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">100% Gratuito</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Clock className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">Arrivo in 35 min</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Star className="h-4 w-4 text-white fill-white" />
              <span className="text-white text-sm font-medium">{rating.ratingValue}/5 ({rating.reviewCount} recensioni)</span>
            </div>
            <div className="flex items-center gap-2 bg-primary/80 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">80+ Idraulici Napoli</span>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <NapoliTableOfContents />

      {/* 1. Ultra-optimized Intro */}
      <div id="intro">
        <NapoliIntroSection onRequestClick={handleRequestClick} />
      </div>

      {/* 2. Statistics Section - Social Proof */}
      <div id="statistiche">
        <NapoliStatisticsSection />
      </div>

      {/* 3. Why problems are frequent in Naples */}
      <div id="perche-problemi">
        <NapoliWhyProblemsSection />
      </div>

      {/* 4. Extended Neighborhoods (25+) */}
      <div id="quartieri">
        <NapoliNeighborhoodsSection />
      </div>

      {/* 5. Building Types and Challenges */}
      <div id="tipologie-edifici">
        <NapoliBuildingTypesSection />
      </div>

      {/* 6. Common Problems with Links */}
      <div id="problemi-comuni">
        <CityCommonProblemsSection 
          cityName="Napoli"
          citySlug="napoli"
        />
      </div>

      {/* 7. Problem+City Links (NEW) */}
      <NapoliProblemLinksSection />

      {/* 8. Response Times */}
      <div id="tempi-risposta">
        <CityResponseTimesSection 
          cityName="Napoli"
          citySlug="napoli"
        />
      </div>

      {/* 9. Naples-specific Cost Section (NEW) */}
      <NapoliCostSection onRequestClick={handleRequestClick} />

      {/* Services Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Servizi Idraulici a Napoli
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            I nostri idraulici a Napoli offrono una gamma completa di servizi per abitazioni, 
            condomini storici e attività commerciali
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {SERVICES.map((service, index) => (
              <div key={index} className="bg-card rounded-xl p-6 shadow-md border border-border text-center hover:shadow-lg transition-shadow">
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

      {/* 10. Local Reviews (NEW) */}
      <NapoliReviewsSection />

      {/* 11. Emergency Tips - Naples specific */}
      <div id="emergenze">
        <NapoliEmergencyTipsSection onRequestClick={handleRequestClick} />
      </div>

      {/* 12. Extended FAQ Section (10 questions) */}
      <div id="faq">
        <NapoliExtendedFAQSection />
      </div>

      {/* 13. Internal Links */}
      <CityInternalLinksSection 
        cityName="Napoli"
        citySlug="napoli"
      />

      {/* Why Choose Us */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Perché Scegliere IdrauliciSubito a Napoli
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: CheckCircle, title: 'Esperienza Locale', desc: 'Idraulici napoletani esperti sul patrimonio edilizio locale' },
              { icon: Clock, title: 'Risposta Rapida', desc: 'Arrivo medio 35 minuti in città, 24/7' },
              { icon: Shield, title: 'Preventivi Gratuiti', desc: 'Nessun costo e nessun impegno' },
              { icon: Star, title: 'Recensioni Positive', desc: `${rating.ratingValue}/5 da ${rating.reviewCount} clienti napoletani` },
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

      {/* Final CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Hai bisogno di un idraulico a Napoli adesso?
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
            Non aspettare che il problema peggiori. Richiedi subito un preventivo gratuito 
            e ricevi una risposta in pochi minuti da un idraulico della tua zona.
          </p>
          <WhatsAppCTA cityName="Napoli" label="Scrivici ora su WhatsApp" size="lg" />
          <p className="text-primary-foreground/70 text-sm mt-4">
            ✓ Gratuito ✓ Senza impegno ✓ Risposta in 15 minuti
          </p>
        </div>
      </section>
    </Layout>
  );
}
