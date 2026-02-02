/**
 * NapoliQuartierePage - Template SEO locale per quartieri di Napoli
 * 
 * Ottimizzato per: idraulico [quartiere], pronto intervento [quartiere]
 */

import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import InlineWizard from '@/components/InlineWizard';
import { getQuartiereBySlug, SERVIZI_IDRAULICI, EMERGENZE_COMUNI } from '@/lib/napoliQuartieriData';
import { Phone, Clock, MapPin, Wrench, AlertTriangle, Euro, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NapoliQuartierePage() {
  const location = useLocation();
  const slug = location.pathname.replace('/idraulico-napoli-', '');
  const quartiere = getQuartiereBySlug(slug);

  if (!quartiere) {
    return (
      <Layout>
        <Helmet>
          <meta name="prerender-status-code" content="404" />
          <meta name="robots" content="noindex" />
          <title>Pagina non trovata | IdrauliciSubito</title>
        </Helmet>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Quartiere non trovato</h1>
          <p className="text-muted-foreground mb-8">La pagina richiesta non esiste.</p>
          <Link to="/napoli" className="text-primary hover:underline">
            Torna alla pagina Idraulico Napoli
          </Link>
        </div>
      </Layout>
    );
  }

  const canonicalUrl = `https://www.idraulicisubito.com/idraulico-napoli-${quartiere.slug}`;
  const pageTitle = `Idraulico Napoli ${quartiere.nome} – Pronto Intervento 24h`;
  const metaDescription = `Cerchi un idraulico a ${quartiere.nome}, Napoli? Pronto intervento 24 ore su 24 per perdite, scarichi intasati, WC bloccati. Tecnici della zona, arrivo rapido.`;

  // JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        "name": `Idraulico Pronto Intervento ${quartiere.nome} Napoli`,
        "description": metaDescription,
        "provider": {
          "@type": "Organization",
          "name": "IdrauliciSubito",
          "url": "https://www.idraulicisubito.com"
        },
        "areaServed": {
          "@type": "Place",
          "name": `${quartiere.nome}, Napoli, Italia`,
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": quartiere.mapCoordinates.lat,
            "longitude": quartiere.mapCoordinates.lng
          }
        },
        "serviceType": "Pronto Intervento Idraulico",
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": canonicalUrl,
          "availableLanguage": "Italian"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.idraulicisubito.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Idraulico Napoli",
            "item": "https://www.idraulicisubito.com/napoli"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `Idraulico ${quartiere.nome}`,
            "item": canonicalUrl
          }
        ]
      }
    ]
  };

  return (
    <Layout>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="it_IT" />
        
        {/* Geo Tags */}
        <meta name="geo.region" content="IT-NA" />
        <meta name="geo.placename" content={`${quartiere.nome}, Napoli`} />
        <meta name="ICBM" content={`${quartiere.mapCoordinates.lat}, ${quartiere.mapCoordinates.lng}`} />
        
        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-muted-foreground">
              <li><Link to="/" className="hover:text-primary">Home</Link></li>
              <li>/</li>
              <li><Link to="/napoli" className="hover:text-primary">Idraulico Napoli</Link></li>
              <li>/</li>
              <li className="text-foreground font-medium">{quartiere.nome}</li>
            </ol>
          </nav>

          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Idraulico Napoli {quartiere.nome} – Pronto Intervento 24h
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              {quartiere.descrizione} Intervento rapido in zona, tecnici disponibili 
              24 ore su 24 per ogni emergenza idraulica a {quartiere.nome}.
            </p>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-medium">Disponibile 24/7</span>
              </div>
              <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium">{quartiere.nome}, Napoli</span>
              </div>
              <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2">
                <Phone className="h-5 w-5 text-primary" />
                <span className="font-medium">Arrivo rapido in zona</span>
              </div>
            </div>

            <Button size="lg" asChild>
              <a href="#richiesta">Richiedi Intervento Urgente</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <iframe
              title={`Mappa ${quartiere.nome} Napoli`}
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(quartiere.nome + ', Napoli, Italia')}&zoom=15`}
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Pronto Intervento */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Pronto Intervento Idraulico a Napoli {quartiere.nome}
            </h2>
            <p className="text-muted-foreground mb-6">
              Hai un'emergenza idraulica a {quartiere.nome}? I nostri tecnici sono pronti 
              a intervenire rapidamente per risolvere qualsiasi problema. Gestiamo ogni 
              giorno situazioni urgenti nella zona:
            </p>
            <ul className="grid md:grid-cols-2 gap-3 mb-8">
              {EMERGENZE_COMUNI.map((emergenza, index) => (
                <li key={index} className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{emergenza}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground">
              Non aspettare che il problema peggiori. Per emergenze idrauliche a {quartiere.nome}, 
              ogni minuto conta. <Link to="/perdita-acqua-napoli" className="text-primary hover:underline font-medium">
              Scopri cosa fare in caso di perdita d'acqua</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Servizi Disponibili */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Servizi Idraulici Disponibili a {quartiere.nome}
            </h2>
            <p className="text-muted-foreground mb-6">
              Offriamo una gamma completa di servizi idraulici per residenze, condomini 
              e attività commerciali nella zona di {quartiere.nome}:
            </p>
            <ul className="grid md:grid-cols-2 gap-3">
              {SERVIZI_IDRAULICI.map((servizio, index) => (
                <li key={index} className="flex items-center gap-3 bg-card border border-border rounded-lg p-4">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  <span>{servizio}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Problemi Comuni */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Problemi Idraulici Più Comuni a Napoli {quartiere.nome}
            </h2>
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <p className="text-muted-foreground leading-relaxed">
                {quartiere.problemiComuni}
              </p>
            </div>
            <p className="text-muted-foreground">
              Se hai uno <Link to="/scarico-intasato-napoli" className="text-primary hover:underline font-medium">
              scarico intasato a Napoli</Link>, non tentare soluzioni fai-da-te che potrebbero 
              peggiorare la situazione. Affidati a professionisti del quartiere.
            </p>
          </div>
        </div>
      </section>

      {/* Disponibilità H24 */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Idraulico Urgente 24 Ore su 24 a {quartiere.nome}
            </h2>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-card border border-border rounded-xl p-5 text-center">
                <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">24 Ore su 24</h3>
                <p className="text-sm text-muted-foreground">Disponibilità continua, anche di notte</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5 text-center">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">7 Giorni su 7</h3>
                <p className="text-sm text-muted-foreground">Weekend e giorni festivi inclusi</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5 text-center">
                <Wrench className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Festivi Compresi</h3>
                <p className="text-sm text-muted-foreground">Natale, Pasqua, Ferragosto</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              Le emergenze idrauliche non rispettano orari. Per questo i nostri tecnici 
              a {quartiere.nome} sono sempre reperibili. Che sia notte, domenica o festivo, 
              puoi contare su un intervento rapido.
            </p>
          </div>
        </div>
      </section>

      {/* Costi */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Quanto Costa un Idraulico a {quartiere.nome}?
            </h2>
            <p className="text-muted-foreground mb-6">
              Il costo di un intervento idraulico a {quartiere.nome} dipende da diversi fattori:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <Euro className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <strong>Tipo di intervento:</strong> una semplice riparazione costa meno 
                  di una sostituzione completa
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Euro className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <strong>Urgenza:</strong> gli interventi notturni o festivi hanno 
                  una maggiorazione del 30-50%
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Euro className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <strong>Orario:</strong> interventi in orario lavorativo sono 
                  generalmente più economici
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Euro className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <strong>Complessità:</strong> problemi in edifici storici o con 
                  accesso difficile richiedono più tempo
                </div>
              </li>
            </ul>
            <p className="text-muted-foreground">
              Per un preventivo preciso, descrivi il problema nel form qui sotto. 
              Riceverai una stima prima dell'intervento.
            </p>
          </div>
        </div>
      </section>

      {/* CTA + Form */}
      <section id="richiesta" className="py-12 md:py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Hai Bisogno di un Idraulico a Napoli {quartiere.nome}?
            </h2>
            <p className="text-muted-foreground">
              Compila il form per ricevere assistenza immediata. Un tecnico della zona 
              ti contatterà in pochi minuti per valutare la situazione e fornirti un 
              preventivo senza impegno.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <InlineWizard 
              onClose={() => {}}
              defaultCity="Napoli"
            />
          </div>
        </div>
      </section>

      {/* Link Interni */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Altre Pagine Utili</h3>
            <div className="flex flex-wrap gap-3">
              <Link 
                to="/napoli" 
                className="bg-card border border-border rounded-lg px-4 py-2 hover:border-primary transition-colors"
              >
                Idraulico Napoli
              </Link>
              <Link 
                to="/perdita-acqua-napoli" 
                className="bg-card border border-border rounded-lg px-4 py-2 hover:border-primary transition-colors"
              >
                Perdita Acqua Napoli
              </Link>
              <Link 
                to="/scarico-intasato-napoli" 
                className="bg-card border border-border rounded-lg px-4 py-2 hover:border-primary transition-colors"
              >
                Scarico Intasato Napoli
              </Link>
              <Link 
                to="/pronto-intervento-idraulico" 
                className="bg-card border border-border rounded-lg px-4 py-2 hover:border-primary transition-colors"
              >
                Pronto Intervento Idraulico
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
