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
        <meta name="robots" content="index, follow, max-image-preview:large" />
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

      {/* TABLE OF CONTENTS */}
      <section className="py-8 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <ChevronDown className="h-5 w-5 text-primary" /> Indice della pagina
          </h2>
          <nav className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {TOC.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="text-primary hover:underline">
                → {item.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* INTRO — long-form, Siena-specific */}
      <section id="intro" className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-accent/30 border-l-4 border-primary p-6 rounded-r-lg mb-6">
            <p className="text-lg leading-relaxed">
              Cerchi un <strong>idraulico a Siena</strong> per un'emergenza o una riparazione programmata? Siena è una città unica
              in Italia: un centro storico medievale tutelato dall'UNESCO dal 1995, organizzato nei tre <em>Terzi</em>
              (Città, Camollia, San Martino) e nelle 17 Contrade, circondato da quartieri residenziali e frazioni
              collinari. Ogni zona ha le sue specificità idrauliche, e serve un tecnico che le conosca.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              Con <strong>IdrauliciSubito</strong> trovi rapidamente un idraulico professionista a Siena e in tutta la
              provincia — dai vicoli pedonali del centro UNESCO ai condomini di Acquacalda, San Prospero e San
              Miniato, fino alle ville collinari di Ravacciano e Vico Alto, alle frazioni della Val d'Arbia e ai
              comuni del Chianti senese, della Val d'Orcia e delle Crete Senesi.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              Pronto intervento idraulico Siena <strong>24 ore su 24, 7 giorni su 7</strong>, anche di notte, nei
              weekend, nei festivi e nei giorni di Palio. Preventivo gratuito prima dell'intervento, tecnici
              residenti in zona, fattura regolare e nessun costo nascosto.
            </p>
          </div>
          <div className="text-center">
            <Button size="lg" onClick={handleRequestClick} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 h-auto shadow-lg">
              Ricevi preventivi gratis a Siena →
            </Button>
          </div>
        </div>
      </section>

      {/* WHY US — Google Ads conversion block */}
      <section id="perche-noi" className="py-14 bg-gradient-to-b from-primary/5 to-background">
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

      {/* CONTRADE — Siena-friendly section */}
      <section id="contrade" className="py-14 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="h-6 w-6 text-primary" />
            <span className="uppercase text-sm font-bold tracking-wide text-primary">Made in Siena</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
            Serviamo tutte le 17 Contrade di Siena
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Dai vicoli dell'<strong>Oca</strong> e della <strong>Selva</strong> alle case-torri della <strong>Torre</strong>,
            fino ai palazzi di <strong>Pantera</strong>, <strong>Tartuca</strong> e <strong>Onda</strong>:
            i nostri idraulici conoscono ogni Terzo, ogni vicolo e ogni Contrada del centro UNESCO.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
            {SIENA_CONTRADE.map((c) => (
              <div
                key={c.name}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div
                  className="h-2 w-full"
                  style={{
                    background: `linear-gradient(90deg, ${c.colors[0]} 0%, ${c.colors[0]} 33%, ${c.colors[1]} 33%, ${c.colors[1]} 66%, ${c.colors[2]} 66%, ${c.colors[2]} 100%)`,
                  }}
                  aria-hidden="true"
                />
                <div className="p-3 text-center">
                  <div className="text-2xl mb-1" aria-hidden="true">{c.symbol}</div>
                  <div className="font-bold text-sm leading-tight">{c.name}</div>
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground mt-0.5">
                    Terzo di {c.terzo}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-accent/30 border-l-4 border-primary p-5 rounded-r-lg text-sm leading-relaxed">
            <strong>Idraulici locali, non call center.</strong> I tecnici della rete IdrauliciSubito vivono e lavorano a Siena:
            sanno cosa significa intervenire in un vicolo della Chiocciola con il furgone che non passa, riparare una colonna
            di scarico in un palazzo dell'Aquila con vincoli della Soprintendenza, o gestire la pressione idrica in una
            casa-torre del Bruco. <em>Forza e Onore</em> a chi lavora bene. 🏇
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="statistiche" className="py-12 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">I numeri del nostro servizio a Siena</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {SIENA_STATS.map((stat, i) => (
              <div key={i} className="text-center bg-card border border-border rounded-xl p-6">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PROBLEMS */}
      <section id="perche-problemi" className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
            Perché a Siena i problemi idraulici sono frequenti
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            La combinazione di acqua durissima, palazzi medievali e clima collinare crea problematiche tipicamente
            senesi.
          </p>
          <div className="space-y-4">
            {SIENA_WHY_PROBLEMS.map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6 flex gap-4">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  {i === 0 ? <Droplets className="h-6 w-6 text-primary" /> :
                   i === 1 ? <Landmark className="h-6 w-6 text-primary" /> :
                   i === 2 ? <Shield className="h-6 w-6 text-primary" /> :
                   i === 3 ? <Snowflake className="h-6 w-6 text-primary" /> :
                             <AlertTriangle className="h-6 w-6 text-primary" />}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEIGHBORHOODS */}
      <section id="quartieri" className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
            Quartieri, Terzi e Contrade di Siena serviti
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Interveniamo in tutta la città e nei comuni limitrofi della provincia di Siena.
          </p>
          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" /> Zone della città
            </h3>
            <div className="flex flex-wrap gap-2">
              {SIENA_NEIGHBORHOODS.map((n) => (
                <span key={n} className="bg-primary/10 text-primary text-sm rounded-full px-3 py-1">
                  {n}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" /> Comuni della provincia
            </h3>
            <div className="flex flex-wrap gap-2">
              {SIENA_NEARBY_AREAS.map((n) => (
                <span key={n} className="bg-secondary/10 text-secondary-foreground text-sm rounded-full px-3 py-1 border border-border">
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BUILDING TYPES */}
      <section id="tipologie-edifici" className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Tipologie di edifici a Siena</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Ogni tipo di edificio senese ha sfide idrauliche specifiche: i nostri tecnici sanno come affrontarle.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {SIENA_BUILDING_TYPES.map((b, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Building2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <h3 className="font-bold text-lg">{b.type}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{b.description}</p>
                <div className="mb-3">
                  <div className="text-xs uppercase font-bold text-muted-foreground mb-2">Sfide tipiche</div>
                  <ul className="space-y-1">
                    {b.challenges.map((c) => (
                      <li key={c} className="text-sm flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-xs text-muted-foreground">
                  Zone: <span className="font-medium">{b.neighborhoods.join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMON PROBLEMS (generic component) */}
      <div id="problemi-comuni">
        <CityCommonProblemsSection cityName="Siena" citySlug="siena" />
      </div>

      {/* RESPONSE TIMES (generic component) */}
      <div id="tempi-risposta">
        <CityResponseTimesSection cityName="Siena" citySlug="siena" />
      </div>

      {/* COSTS */}
      <section id="costi" className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Quanto costa un idraulico a Siena</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Prezzi indicativi per i principali interventi a Siena e provincia. Il preventivo definitivo è sempre
            gratuito e calcolato dopo aver visto il problema.
          </p>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm md:text-base">
              <thead className="bg-primary/10">
                <tr>
                  <th className="text-left p-4 font-bold">Intervento</th>
                  <th className="text-right p-4 font-bold">Prezzo indicativo</th>
                </tr>
              </thead>
              <tbody>
                {SIENA_COSTS.map((c, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                    <td className="p-4">{c.service}</td>
                    <td className="p-4 text-right font-semibold text-primary">{c.priceRange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            I prezzi sono medie di mercato Siena 2025 e possono variare per accessibilità (vicoli del centro UNESCO,
            piani alti senza ascensore) e materiali. Il preventivo IdrauliciSubito è sempre gratuito.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Servizi idraulici a Siena</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            I nostri idraulici a Siena offrono una gamma completa di servizi per abitazioni, palazzi storici,
            condomini, B&B e attività commerciali del centro UNESCO.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {SERVICES.map((s, i) => (
              <div key={i} className="bg-card rounded-xl p-6 shadow-md border border-border text-center">
                <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <s.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="recensioni" className="py-12 bg-primary/5">
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
            {SIENA_REVIEWS.map((r, i) => (
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
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Domande frequenti — Idraulico Siena</h2>
          <p className="text-center text-muted-foreground mb-10">
            Le risposte alle domande più comuni dei nostri clienti senesi.
          </p>
          <div className="space-y-3">
            {SIENA_EXTENDED_FAQS.map((faq, i) => (
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

      {/* INTERNAL LINKS (generic component) */}
      <CityInternalLinksSection cityName="Siena" citySlug="siena" />

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
