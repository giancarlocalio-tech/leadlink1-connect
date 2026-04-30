import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { getServicePageBySlug } from '@/lib/servicePageData';
import { TOP_50_CITIES } from '@/lib/seoConfig';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, CheckCircle, Clock, Phone, Euro, Lightbulb, ArrowLeft } from 'lucide-react';

export default function ServiceNationalPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServicePageBySlug(slug) : undefined;

  if (!service) {
    return (
      <Layout>
        <Helmet>
          <title>Servizio Non Trovato | Idraulici Subito</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Servizio non trovato</h1>
          <Link to="/">
            <Button>Torna alla Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const canonicalUrl = `https://www.idraulicisubito.com/servizi/${service.slug}`;

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.metaDescription,
    provider: {
      '@type': 'Organization',
      name: 'Idraulici Subito',
      url: 'https://www.idraulicisubito.com'
    },
    areaServed: {
      '@type': 'Country',
      name: 'Italia'
    },
    serviceType: 'Plumbing Service'
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.idraulicisubito.com' },
      { '@type': 'ListItem', position: 2, name: 'Servizi', item: 'https://www.idraulicisubito.com/servizi' },
      { '@type': 'ListItem', position: 3, name: service.title, item: canonicalUrl }
    ]
  };

  // Split cities for display
  const displayCities = TOP_50_CITIES.slice(0, 25);

  return (
    <Layout>
      <Helmet>
        <title>{service.metaTitle}</title>
        <meta name="description" content={service.metaDescription} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={service.metaTitle} />
        <meta property="og:description" content={service.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <section className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground">{service.title}</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">Servizio Nazionale</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {service.h1}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {service.intro}
            </p>
            <WhatsAppCTA label="Contattaci ora su WhatsApp" size="lg" />
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg">
            {service.sections.description.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-muted-foreground">{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-2">
              <CheckCircle className="h-6 w-6 text-primary" />
              Cosa Include il Servizio
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {service.sections.services.map((item, i) => (
                <Card key={i} className="bg-card">
                  <CardContent className="p-4 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* When to Call */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-2">
              <Phone className="h-6 w-6 text-primary" />
              Quando Chiamare
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {service.sections.whenToCall.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <span className="text-primary font-bold">!</span>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-2">
              <Clock className="h-6 w-6 text-primary" />
              Come Funziona
            </h2>
            <div className="space-y-4">
              {service.sections.process.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">
                    {i + 1}
                  </div>
                  <p className="pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-2">
              <Euro className="h-6 w-6 text-primary" />
              Prezzi Indicativi
            </h2>
            <Card>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-4 font-semibold">Intervento</th>
                      <th className="text-right p-4 font-semibold">Costo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.sections.pricing.map((item, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="p-4">{item.service}</td>
                        <td className="p-4 text-right font-medium text-primary">{item.range}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
            <p className="text-sm text-muted-foreground text-center mt-4">
              * I prezzi sono indicativi e possono variare in base alla complessità dell'intervento e alla zona geografica.
            </p>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-2">
              <Lightbulb className="h-6 w-6 text-primary" />
              Consigli Utili
            </h2>
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {service.sections.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cities CTA */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Trova {service.title} nella Tua Città
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Il nostro servizio è disponibile in tutta Italia. Trova un professionista qualificato nella tua zona.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {displayCities.map((citySlug) => {
                const cityName = citySlug.charAt(0).toUpperCase() + citySlug.slice(1).replace(/-/g, ' ');
                return (
                  <Link
                    key={citySlug}
                    to={`/${citySlug}`}
                    className="inline-flex items-center gap-2 bg-card hover:bg-primary/10 border border-border rounded-full px-4 py-2 text-sm transition-colors"
                  >
                    <MapPin className="h-3 w-3 text-primary" />
                    <span>{cityName}</span>
                  </Link>
                );
              })}
            </div>

            <WhatsAppCTA label="Contattaci ora su WhatsApp" size="lg" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
