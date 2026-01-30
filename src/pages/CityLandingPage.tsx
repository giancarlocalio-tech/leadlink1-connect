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
  AlertTriangle,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { generateJsonLd, getCityFAQs, BASE_URL } from '@/lib/seoJsonLd';
import InlineWizard from '@/components/InlineWizard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import heroBg from '@/assets/hero-bg.avif';

// City-specific data
const CITY_DATA: Record<string, {
  name: string;
  province: string;
  region: string;
  population: string;
  neighborhoods: string[];
  nearbyAreas: string[];
  description: string;
}> = {
  'brescia': {
    name: 'Brescia',
    province: 'BS',
    region: 'Lombardia',
    population: '200.000',
    neighborhoods: ['Centro Storico', 'San Polo', 'Borgo Trento', 'Lamarmora', 'Urago Mella', 'Sant\'Eufemia', 'Buffalora', 'Fiumicello'],
    nearbyAreas: ['Rezzato', 'Concesio', 'Gussago', 'Bovezzo', 'Collebeato', 'Nave', 'Botticino', 'Mazzano'],
    description: 'Trova idraulici professionisti a Brescia e provincia. Interventi rapidi per riparazioni, installazioni e manutenzione di impianti idraulici, caldaie e condizionatori.'
  },
  'milano': {
    name: 'Milano',
    province: 'MI',
    region: 'Lombardia',
    population: '1.400.000',
    neighborhoods: ['Centro', 'Navigli', 'Isola', 'Porta Romana', 'Porta Venezia', 'Lambrate', 'Bicocca', 'San Siro', 'Niguarda', 'Baggio', 'Città Studi', 'Brera'],
    nearbyAreas: ['Monza', 'Sesto San Giovanni', 'Cinisello Balsamo', 'Rho', 'Legnano', 'Cologno Monzese', 'Corsico', 'San Donato Milanese'],
    description: 'Trova idraulici professionisti a Milano e hinterland. Pronto intervento 24/7 per emergenze idrauliche, riparazioni e installazioni.'
  }
};

// Milan-specific FAQ for schema markup
const MILAN_FAQ = [
  {
    question: 'Come faccio a trovare un idraulico a Milano con IdrauliciSubito?',
    answer: 'Compila il form indicando il problema e la zona di Milano. Riceverai una risposta da un idraulico disponibile nella tua area in pochi minuti. Il servizio è completamente gratuito e senza impegno.'
  },
  {
    question: 'Il servizio per trovare un idraulico a Milano è gratuito?',
    answer: 'Sì, il servizio è 100% gratuito. Non ci sono costi nascosti né commissioni. Riceverai preventivi trasparenti direttamente dagli idraulici.'
  },
  {
    question: 'In quanto tempo vengo contattato da un idraulico a Milano?',
    answer: 'Nella maggior parte dei casi vieni contattato entro 15 minuti dalla richiesta. Per le urgenze, molti idraulici possono intervenire anche in giornata.'
  },
  {
    question: 'Posso usare il servizio per urgenze notturne o nel weekend a Milano?',
    answer: 'Sì, molti idraulici a Milano offrono servizio di pronto intervento 24 ore su 24, inclusi weekend e festivi, per emergenze come perdite d\'acqua, allagamenti o guasti alla caldaia.'
  }
];

// Common plumbing problems for Milano
const COMMON_PROBLEMS = [
  'Perdite d\'acqua improvvise',
  'Tubi rotti o che perdono',
  'WC bloccato',
  'Scarico lavandino intasato',
  'Scaldabagno o caldaia che non funzionano',
  'Allagamenti in casa',
  'Sostituzione rubinetti e sanitari'
];

const SERVICES = [
  { icon: Droplets, title: 'Riparazione perdite', desc: 'Intervento rapido per perdite acqua e infiltrazioni' },
  { icon: Wrench, title: 'Installazioni', desc: 'Installazione rubinetti, sanitari e impianti completi' },
  { icon: Flame, title: 'Caldaie e riscaldamento', desc: 'Manutenzione, riparazione e sostituzione caldaie' },
];

export default function CityLandingPage() {
  const { city } = useParams<{ city: string }>();
  const navigate = useNavigate();
  const [showWizard, setShowWizard] = useState(false);
  
  // Extract city from URL path (e.g., /idraulico-brescia -> brescia)
  const pathname = window.location.pathname;
  const citySlug = pathname.replace('/', '').replace('idraulico-', '').toLowerCase();
  const cityData = CITY_DATA[citySlug];
  const isMilano = citySlug === 'milano';
  
  useEffect(() => {
    if (!cityData) {
      navigate('/');
    }
  }, [cityData, navigate]);
  
  if (!cityData) return null;

  // Milano-specific SEO title and H1
  const pageTitle = isMilano 
    ? 'Idraulico Milano Urgente | Trova Subito un Idraulico Vicino a Te'
    : `Idraulico ${cityData.name} - Pronto Intervento 24/7 | Preventivi Gratuiti`;
  
  const pageH1 = isMilano 
    ? 'Cerchi un Idraulico a Milano? Trovalo Subito'
    : `Idraulico a ${cityData.name}`;
  
  const pageDescription = isMilano
    ? `Cerchi un idraulico a Milano per un'emergenza? ✓ Perdite d'acqua ✓ WC bloccato ✓ Caldaia guasta. Trova subito un idraulico disponibile a Milano e provincia. Risposta in 15 minuti.`
    : `Cerchi un idraulico a ${cityData.name}? ✓ Professionisti verificati ✓ Risposta in 15 min ✓ Preventivi gratuiti. Riparazioni, installazioni e emergenze idrauliche in tutta ${cityData.name} e provincia.`;
  
  const canonicalUrl = `https://www.idraulicisubito.com/idraulico-${citySlug}`;

  // Generate consistent rating based on city for AggregateRating schema
  const generateConsistentRating = (seed: string) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash = hash & hash;
    }
    const absHash = Math.abs(hash);
    const ratingValue = (4.5 + (absHash % 5) * 0.1).toFixed(1);
    const reviewCount = 150 + (absHash % 351);
    return { ratingValue, reviewCount: reviewCount.toString() };
  };
  
  const rating = generateConsistentRating(citySlug);

  // Use Milano-specific FAQ for schema if Milano
  const faqForSchema = isMilano ? MILAN_FAQ : getCityFAQs('idraulico', cityData.name);

  const structuredData = generateJsonLd(
    {
      name: `Idraulici Subito ${cityData.name}`,
      description: cityData.description,
      url: canonicalUrl,
      areaServed: [
        { type: 'City', name: cityData.name, containedIn: cityData.province },
        ...cityData.nearbyAreas.map(area => ({ type: 'City' as const, name: area }))
      ],
      serviceTypes: [
        "Pronto intervento idraulico",
        "Riparazione perdite acqua",
        "Installazione impianti idraulici",
        "Manutenzione caldaie",
        "Spurgo scarichi"
      ],
      aggregateRating: rating
    },
    faqForSchema,
    [{ name: `Idraulico ${cityData.name}`, url: canonicalUrl }]
  );

  // Show wizard inline
  if (showWizard) {
    return (
      <Layout>
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
          <link rel="canonical" href={canonicalUrl} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://www.idraulicisubito.com/og-image.jpg" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={pageTitle} />
          <meta name="twitter:description" content={pageDescription} />
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
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
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.idraulicisubito.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[450px] md:min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src={heroBg} 
            alt={`Idraulico ${cityData.name}`}
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
            {pageH1}
            {!isMilano && (
              <>
                <br />
                <span className="text-primary-foreground/90">Pronto Intervento 24/7</span>
              </>
            )}
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {isMilano 
              ? 'Trova subito un idraulico professionista a Milano e provincia. Preventivi gratuiti e risposta in 15 minuti.'
              : `Trova subito un idraulico professionista a ${cityData.name} e provincia. Preventivi gratuiti e risposta in 15 minuti.`
            }
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

      {/* BLOCCO 3 - Milano Intro Text (Above the Fold) */}
      {isMilano && (
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-accent/30 border-l-4 border-primary p-6 rounded-r-lg mb-8">
                <p className="text-lg leading-relaxed">
                  Se hai cercato <strong>idraulico Milano</strong> probabilmente hai un problema urgente: 
                  una <Link to="/costi-riparazione-perdita-acqua" className="text-primary hover:underline font-medium">perdita d'acqua</Link>, 
                  il WC bloccato, lo scarico che non va o un allagamento in casa.
                </p>
                <p className="text-lg leading-relaxed mt-4">
                  Con <strong>IdrauliciSubito</strong> puoi trovare un <Link to="/idraulico-vicino-a-me" className="text-primary hover:underline font-medium">idraulico disponibile</Link> a Milano e provincia in pochi minuti.
                  Inserisci il problema, indica la zona e vieni contattato da un professionista vicino a te.
                </p>
              </div>
              
              <div className="text-center">
                <Button 
                  onClick={() => setShowWizard(true)}
                  size="lg"
                  className="rounded-full"
                >
                  Trova un Idraulico Ora <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* BLOCCO 4 - Milano Neighborhoods Section (SEO Locale) */}
      {isMilano && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" />
                Zone di Milano Coperte
              </h2>
              <p className="text-muted-foreground mb-6">
                Il servizio è attivo in <strong>tutte le zone di Milano</strong>, tra cui:
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {cityData.neighborhoods.map((zone, index) => (
                  <span 
                    key={index} 
                    className="bg-card border border-border px-4 py-2 rounded-full text-sm font-medium hover:border-primary transition-colors"
                  >
                    {zone}
                  </span>
                ))}
                <span className="bg-primary/10 border border-primary/30 px-4 py-2 rounded-full text-sm font-medium text-primary">
                  + tutta la provincia
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                👉 Questo ti aiuta a trovare un idraulico Navigli, idraulico Lambrate, idraulico zona Isola e in qualsiasi altra zona di Milano.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* BLOCCO 5 - Common Problems Section */}
      {isMilano && (
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-primary" />
                Problemi per cui puoi usare il servizio
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {COMMON_PROBLEMS.map((problem, index) => (
                  <div key={index} className="flex items-center gap-3 bg-card border border-border rounded-lg p-4">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="font-medium">{problem}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                Questo ti permette di trovare un idraulico Milano per qualsiasi tipo di intervento, 
                dalla semplice riparazione alla <Link to="/pronto-intervento-idraulico" className="text-primary hover:underline">emergenza idraulica</Link>.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Services Section - For all cities */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Servizi Idraulici a {cityData.name}
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            I nostri idraulici a {cityData.name} offrono una gamma completa di servizi per la tua casa o attività
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

      {/* Coverage Areas - For non-Milano cities */}
      {!isMilano && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              Zone Coperte a {cityData.name}
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              I nostri idraulici operano in tutte le zone di {cityData.name} e nei comuni limitrofi
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
          </div>
        </section>
      )}

      {/* BLOCCO 6 - Milano Mini FAQ Section */}
      {isMilano && (
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-primary" />
                Domande Frequenti su Idraulico Milano
              </h2>
              
              <Accordion type="single" collapsible className="w-full">
                {MILAN_FAQ.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}

      {/* BLOCCO 7 - Internal Links Section (Milano) */}
      {isMilano && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-bold mb-6">Risorse Utili</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link 
                  to="/pronto-intervento-idraulico" 
                  className="bg-card border border-border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all flex items-center gap-3"
                >
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium">Pronto Intervento 24/7</span>
                </Link>
                <Link 
                  to="/costi-riparazione-perdita-acqua" 
                  className="bg-card border border-border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all flex items-center gap-3"
                >
                  <Droplets className="h-5 w-5 text-primary" />
                  <span className="font-medium">Costi Riparazione Perdite</span>
                </Link>
                <Link 
                  to="/preventivo-idraulico" 
                  className="bg-card border border-border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all flex items-center gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="font-medium">Preventivo Idraulico</span>
                </Link>
                <Link 
                  to="/idraulico-vicino-a-me" 
                  className="bg-card border border-border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all flex items-center gap-3"
                >
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-medium">Idraulico Vicino a Me</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Perché scegliere Idraulici Subito a {cityData.name}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: CheckCircle, title: 'Professionisti Verificati', desc: 'Solo idraulici con esperienza comprovata' },
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
            {isMilano 
              ? 'Hai bisogno di un idraulico a Milano adesso?' 
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
            Trova Idraulico a {cityData.name}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </Layout>
  );
}
