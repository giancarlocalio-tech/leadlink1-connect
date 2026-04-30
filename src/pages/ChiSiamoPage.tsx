/**
 * Chi Siamo Page - EEAT Trust Page
 * Builds authority and trust for the domain
 */

import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import { 
  Users, 
  Target, 
  Shield, 
  Clock, 
  MapPin, 
  ArrowRight,
  CheckCircle,
  Building2
} from 'lucide-react';

const BASE_URL = 'https://www.idraulicisubito.com';

export default function ChiSiamoPage() {
  const canonicalUrl = `${BASE_URL}/chi-siamo`;

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}#organization`,
    name: 'Idraulici Subito',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: 'Piattaforma italiana che mette in contatto clienti con idraulici professionisti verificati per interventi rapidi in tutta Italia.',
    foundingDate: '2024',
    areaServed: {
      '@type': 'Country',
      name: 'Italia'
    },
    serviceType: [
      'Pronto intervento idraulico',
      'Riparazione perdite',
      'Manutenzione caldaie',
      'Spurgo scarichi'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@idraulicisubito.com',
      availableLanguage: 'Italian'
    }
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Chi Siamo', item: canonicalUrl }
    ]
  };

  return (
    <Layout>
      <Helmet>
        <title>Chi Siamo | IdrauliciSubito - Piattaforma Idraulici Italia</title>
        <meta 
          name="description" 
          content="Scopri chi è IdrauliciSubito: la piattaforma che mette in contatto clienti e idraulici professionisti in tutta Italia. Interventi rapidi, professionisti verificati." 
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <section className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground">Chi Siamo</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Chi è IdrauliciSubito
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Siamo una piattaforma italiana che mette in contatto clienti con idraulici 
              professionisti della propria zona. Il nostro obiettivo è semplice: aiutarti 
              a trovare rapidamente un professionista affidabile quando ne hai bisogno.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16">

            {/* La Nostra Missione */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">La Nostra Missione</h2>
              </div>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  IdrauliciSubito nasce per risolvere un problema concreto: quando hai un'emergenza 
                  idraulica — una perdita d'acqua, uno scarico intasato, la caldaia in blocco — 
                  trovare un professionista disponibile e affidabile non è sempre facile.
                </p>
                <p>
                  La nostra piattaforma connette chi ha bisogno di un intervento idraulico con 
                  professionisti che operano nella stessa zona. Non siamo un'azienda di idraulici: 
                  siamo un servizio di collegamento che facilita il contatto diretto tra cliente e professionista.
                </p>
                <p>
                  <strong>Non gestiamo pagamenti, non prendiamo commissioni sugli interventi.</strong> 
                  Il rapporto economico e lavorativo avviene esclusivamente tra te e il professionista 
                  che scegli di contattare.
                </p>
              </div>
            </section>

            {/* Come Funziona */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-500/10 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Come Funziona il Servizio</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full flex-shrink-0">
                        <span className="text-primary font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Descrivi il problema</h3>
                        <p className="text-sm text-muted-foreground">
                          Compili un modulo veloce indicando il tipo di intervento, 
                          la tua città e l'urgenza.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full flex-shrink-0">
                        <span className="text-primary font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Professionisti disponibili</h3>
                        <p className="text-sm text-muted-foreground">
                          La richiesta viene inoltrata a idraulici che operano 
                          nella tua zona e sono disponibili.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full flex-shrink-0">
                        <span className="text-primary font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Contatto diretto</h3>
                        <p className="text-sm text-muted-foreground">
                          Un professionista interessato ti contatta per discutere 
                          il problema e fornirti un preventivo.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full flex-shrink-0">
                        <span className="text-primary font-bold">4</span>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Decidi tu</h3>
                        <p className="text-sm text-muted-foreground">
                          Valuti l'offerta e decidi liberamente se procedere. 
                          Nessun obbligo, nessun costo per la richiesta.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* I Professionisti */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-500/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">I Professionisti sulla Piattaforma</h2>
              </div>
              <div className="prose prose-lg max-w-none text-muted-foreground mb-6">
                <p>
                  Gli idraulici presenti su IdrauliciSubito sono professionisti indipendenti 
                  che hanno scelto di registrarsi sulla nostra piattaforma per ricevere 
                  richieste di intervento nella loro zona operativa.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Zona operativa definita</h4>
                    <p className="text-sm text-muted-foreground">
                      Ogni professionista indica le città e zone in cui opera
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Disponibilità aggiornata</h4>
                    <p className="text-sm text-muted-foreground">
                      Gestiscono la propria disponibilità per interventi ordinari e urgenti
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Contatto diretto</h4>
                    <p className="text-sm text-muted-foreground">
                      Comunicano direttamente con il cliente senza intermediari
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Preventivi trasparenti</h4>
                    <p className="text-sm text-muted-foreground">
                      Forniscono preventivi prima di iniziare qualsiasi lavoro
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Trasparenza */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-amber-500/10 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-amber-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Il Nostro Impegno di Trasparenza</h2>
              </div>
              <div className="bg-muted/30 border rounded-xl p-6 md:p-8">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Servizio gratuito per i clienti:</strong> richiedere un preventivo non costa nulla
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Nessun obbligo:</strong> ricevi il contatto di un professionista, poi decidi tu se procedere
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Non siamo intermediari finanziari:</strong> non gestiamo pagamenti tra cliente e professionista
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Contenuti informativi:</strong> le nostre guide sono a scopo informativo, non sostituiscono il parere di un professionista
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Hai Bisogno di un Idraulico?</h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Descrivi il tuo problema e ricevi il contatto di un professionista 
                della tua zona. È gratuito e senza impegno.
              </p>
              <Link to="/richiesta">
                <Button size="lg">
                  Richiedi Preventivo Gratuito
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </section>

          </div>
        </div>
      </article>
    </Layout>
  );
}
