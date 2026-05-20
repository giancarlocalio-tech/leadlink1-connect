/**
 * SienaLandingPage - Ultra-optimized landing page for "idraulico siena"
 *
 * Target: Top 1 Google ranking (current KD: 11/100, only directories ranking)
 * Strategy: Maximum content depth (3000+ words), unique Siena angle
 *           (centro storico UNESCO, contrade, acqua del Vivo, calcare),
 *           extended FAQs with FAQPage schema, AggregateRating, internal linking.
 */

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  MapPin,
  Clock,
  Shield,
  Star,
  CheckCircle,
  Wrench,
  Droplets,
  Flame,
  Building2,
  AlertTriangle,
  Landmark,
  Snowflake,
  ChevronDown,
  Users,
  Zap,
  Heart,
} from 'lucide-react';
import { Layout } from '@/components/Layout';
import { BASE_URL } from '@/lib/seoJsonLd';
import InlineWizard from '@/components/InlineWizard';
import { Button } from '@/components/ui/button';
import sienaSkyline from '@/assets/siena-skyline.png';

// Generic city sections that already take cityName/citySlug
import { CityCommonProblemsSection } from '@/components/city/CityCommonProblemsSection';
import { CityResponseTimesSection } from '@/components/city/CityResponseTimesSection';
import { CityInternalLinksSection } from '@/components/city/CityInternalLinksSection';

// Siena-specific data
import {
  SIENA_NEIGHBORHOODS,
  SIENA_NEARBY_AREAS,
  SIENA_BUILDING_TYPES,
  SIENA_WHY_PROBLEMS,
  SIENA_EXTENDED_FAQS,
  SIENA_COSTS,
  SIENA_STATS,
  SIENA_RATING,
  SIENA_REVIEWS,
  SIENA_CONTRADE,
  SIENA_WHY_US,
} from '@/lib/sienaSeoContent';

const SERVICES = [
  { icon: Droplets, title: 'Riparazione perdite', desc: 'Localizzazione con geofoni e riparazione perdite anche occulte nei palazzi storici di Siena' },
  { icon: Wrench, title: 'Spurgo scarichi', desc: 'Disostruzione WC, lavandini e colonne condominiali con attrezzature compatte per i vicoli del centro' },
  { icon: Flame, title: 'Caldaie e calcare', desc: 'Manutenzione e lavaggio chimico dello scambiatore contro il calcare dell\'acqua del Vivo' },
];

const TOC = [
  { id: 'intro', label: 'Idraulico a Siena: panoramica' },
  { id: 'perche-noi', label: 'Perché scegliere IdrauliciSubito' },
  { id: 'contrade', label: 'Serviamo tutte le 17 Contrade' },
  { id: 'statistiche', label: 'Numeri del servizio' },
  { id: 'perche-problemi', label: 'Perché a Siena i problemi sono frequenti' },
  { id: 'quartieri', label: 'Quartieri, Terzi e Contrade serviti' },
  { id: 'tipologie-edifici', label: 'Tipologie di edifici a Siena' },
  { id: 'problemi-comuni', label: 'Problemi più comuni' },
  { id: 'tempi-risposta', label: 'Tempi di risposta' },
  { id: 'costi', label: 'Quanto costa un idraulico a Siena' },
  { id: 'recensioni', label: 'Recensioni clienti senesi' },
  { id: 'faq', label: 'Domande frequenti' },
];

export default function SienaLandingPage() {
  const [showWizard, setShowWizard] = useState(false);

  const pageTitle = 'Idraulico Siena: Ricevi Preventivi Gratis | Pronto Intervento 24h';
  const pageDescription =
    'Ricevi più preventivi gratis da idraulici verificati a Siena in 15 minuti. Centro storico, contrade UNESCO, Acquacalda, Ravacciano e provincia. 24/7, senza impegno.';
  const canonicalUrl = `${BASE_URL}/siena`;

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Idraulico Siena - Pronto Intervento 24h',
      description:
        'Servizio idraulico professionale a Siena e provincia. Pronto intervento 24/7, idraulici verificati nel centro storico UNESCO e in tutte le contrade. Preventivi gratuiti.',
      url: canonicalUrl,
      provider: {
        '@type': 'LocalBusiness',
        name: 'IdrauliciSubito Siena',
        image: `${BASE_URL}/logo.png`,
        priceRange: '€€',
        areaServed: [
          { '@type': 'City', name: 'Siena', containedInPlace: { '@type': 'AdministrativeArea', name: 'SI' } },
          ...SIENA_NEARBY_AREAS.slice(0, 10).map((area) => ({ '@type': 'City', name: area })),
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Siena',
          addressRegion: 'Toscana',
          addressCountry: 'IT',
        },
      },
      serviceType: [
        'Pronto intervento idraulico',
        'Riparazione perdite acqua',
        'Spurgo scarichi e colonne fognarie',
        'Manutenzione e lavaggio caldaie',
        'Sostituzione tubature in piombo',
        'Ricerca perdite con geofoni',
      ],
      areaServed: {
        '@type': 'City',
        name: 'Siena',
        containedInPlace: { '@type': 'AdministrativeArea', name: 'Toscana' },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: SIENA_RATING.ratingValue,
        reviewCount: SIENA_RATING.reviewCount,
        bestRating: SIENA_RATING.bestRating,
        worstRating: SIENA_RATING.worstRating,
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'EUR',
        price: '60',
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}#faq`,
      mainEntity: SIENA_EXTENDED_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Idraulico Siena', item: canonicalUrl },
      ],
    },
  ];

  const handleRequestClick = () => setShowWizard(true);

  if (showWizard) {
    return (
      <Layout>
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <meta name="robots" content="index, follow, max-image-preview:large" />
          <link rel="canonical" href={canonicalUrl} />
        </Helmet>
        <div className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <InlineWizard onClose={() => setShowWizard(false)} defaultCity="Siena" />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        style={{
          // Override design tokens locally on /siena to match the blue water-drop logo
          ['--primary' as any]: '199 89% 48%',
          ['--primary-foreground' as any]: '0 0% 100%',
          ['--accent' as any]: '199 89% 94%',
          ['--accent-foreground' as any]: '215 55% 20%',
          ['--ring' as any]: '199 89% 48%',
          ['--secondary' as any]: '199 70% 96%',
          ['--secondary-foreground' as any]: '215 55% 20%',
        }}
      >
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${BASE_URL}/og-image.jpg`} />
        <meta property="og:locale" content="it_IT" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="geo.region" content="IT-SI" />
        <meta name="geo.placename" content="Siena" />
        <meta name="ICBM" content="43.3188, 11.3308" />
        {structuredData.map((schema, i) => (
          <script key={i} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>

      {/* HERO — clean white background + Siena skyline silhouette */}
      <section className="relative overflow-hidden bg-white border-b border-border">
        {/* Decorative skyline at bottom — desaturated, very subtle */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 opacity-25 md:opacity-30 grayscale">
          <img
            src={sienaSkyline}
            alt=""
            aria-hidden="true"
            className="w-full h-auto select-none"
            loading="eager"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center pt-14 md:pt-20 pb-32 md:pb-40">
          <div className="inline-flex items-center gap-2 mb-5 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-primary text-sm font-bold">Siena, Toscana • Pronto Intervento 24/7</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-[1.05] tracking-tight">
            Ricevi più preventivi
            <br />
            <span className="text-primary">da idraulici verificati a Siena</span>
            <br />
            <span className="text-foreground">— Gratis</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Invia <strong className="text-foreground">una sola richiesta</strong>: ricevi più preventivi da idraulici della tua
            Contrada o del tuo quartiere, confronti i prezzi e scegli il migliore.{' '}
            <strong className="text-foreground">100% gratuito</strong>, senza impegno, risposta in 15 minuti.
          </p>

          <Button
            size="lg"
            onClick={handleRequestClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 h-auto shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
          >
            Ricevi preventivi gratis a Siena →
          </Button>
          <p className="text-muted-foreground text-sm mt-3">Compila in 60 secondi · Nessuna registrazione</p>

          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-8">
            <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 shadow-sm">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-foreground text-sm font-medium">100% Gratuito</span>
            </div>
            <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 shadow-sm">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-foreground text-sm font-medium">Arrivo in 35 min</span>
            </div>
            <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 shadow-sm">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-foreground text-sm font-medium">
                {SIENA_RATING.ratingValue}/5 ({SIENA_RATING.reviewCount} recensioni)
              </span>
            </div>
            <div className="flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-4 py-2 shadow-sm">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-bold">40+ Idraulici Siena</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — 3 step process */}
      <section id="come-funziona" className="py-14 bg-white border-t border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
            Come funziona — 3 passi, 60 secondi
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Niente registrazione, niente carta di credito. Solo un modo veloce per avere più preventivi di idraulici a Siena nello stesso momento.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: 'Descrivi il problema',
                desc: 'Rispondi a 4-5 domande veloci sul tipo di intervento (perdita, scaldabagno, scarico, ecc.) e sulla zona di Siena.',
                icon: Wrench,
              },
              {
                step: '2',
                title: 'Ricevi più preventivi',
                desc: 'Avvisiamo subito gli idraulici verificati della tua zona di Siena. In genere ricevi le prime risposte in 15 minuti.',
                icon: Users,
              },
              {
                step: '3',
                title: 'Scegli e risparmia',
                desc: 'Confronti i preventivi, leggi le recensioni e scegli l\'idraulico che preferisci. 100% gratuito, senza impegno.',
                icon: CheckCircle,
              },
            ].map((s) => (
              <div key={s.step} className="relative bg-card border border-border rounded-xl p-6 text-center shadow-sm">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                  {s.step}
                </div>
                <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mt-2 mb-4">
                  <s.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button size="lg" onClick={handleRequestClick} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 h-auto shadow-lg">
              Inizia ora — Ricevi preventivi gratis →
            </Button>
            <p className="text-muted-foreground text-sm mt-3">
              ✓ Compili in 60 secondi · ✓ Nessuna registrazione · ✓ 100% gratis
            </p>
          </div>
        </div>
      </section>

      {/* WHY US — Google Ads conversion block */}
      <section id="perche-noi" className="py-14 bg-white border-t border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
            Perché scegliere IdrauliciSubito invece di cercare su Google?
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Su Google chiami un idraulico alla volta, aspetti che ti richiami, e non sai mai se il prezzo è giusto.
            Con noi, in 60 secondi, ricevi <strong>più preventivi a confronto</strong> da idraulici verificati di Siena.
          </p>
          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {SIENA_WHY_US.map((w, i) => {
              const Icon = w.icon === 'compare' ? Users : w.icon === 'check' ? CheckCircle : w.icon === 'clock' ? Zap : Shield;
              return (
                <div key={i} className="bg-card border border-border rounded-xl p-6 flex gap-4 shadow-sm">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{w.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{w.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <Button size="lg" onClick={handleRequestClick} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 h-auto shadow-lg">
              Ricevi i miei preventivi gratis →
            </Button>
            <p className="text-muted-foreground text-sm mt-3">
              ✓ Più preventivi a confronto · ✓ Idraulici verificati · ✓ Risposta in 15 minuti
            </p>
          </div>
        </div>
      </section>

      {/* TRUST STRIP — quick stats */}
      <section className="py-10 bg-primary/5 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {SIENA_STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS — social proof */}
      <section id="recensioni" className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Recensioni dei clienti a Siena</h2>
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            ))}
            <span className="font-bold ml-2">
              {SIENA_RATING.ratingValue}/5 ({SIENA_RATING.reviewCount} recensioni)
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {SIENA_REVIEWS.slice(0, 4).map((r, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(r.rating)].map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="mb-3 italic">"{r.body}"</p>
                <div className="text-sm">
                  <div className="font-bold">{r.author}</div>
                  <div className="text-muted-foreground">
                    {r.zone} • {r.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button size="lg" onClick={handleRequestClick} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 h-auto shadow-lg">
              Ricevi preventivi gratis →
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ — short, conversion-focused */}
      <section id="faq" className="py-14 bg-white border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Domande frequenti</h2>
          <div className="space-y-3">
            {SIENA_EXTENDED_FAQS.slice(0, 6).map((faq, i) => (
              <details
                key={i}
                className="group bg-card border border-border rounded-xl p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer font-bold text-base md:text-lg">
                  <span>{faq.question}</span>
                  <ChevronDown className="h-5 w-5 text-primary transition-transform group-open:rotate-180 flex-shrink-0 ml-2" />
                </summary>
                <p className="mt-3 text-muted-foreground leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>


      {/* FINAL CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Pronto a ricevere i tuoi preventivi gratis?</h2>
          <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
            Compila la richiesta in 60 secondi: ti contattano più idraulici verificati della tua zona di Siena,
            confronti i preventivi e scegli senza impegno.
          </p>
          <Button size="lg" onClick={handleRequestClick} className="bg-white hover:bg-white/90 text-primary font-bold text-lg px-8 py-6 h-auto shadow-lg">
            Ricevi preventivi gratis →
          </Button>
          <p className="text-primary-foreground/70 text-sm mt-4">
            ✓ Gratuito ✓ Senza impegno ✓ Risposta in 15 minuti
          </p>
        </div>
      </section>
      </div>
    </Layout>
  );
}
