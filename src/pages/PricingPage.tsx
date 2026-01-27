import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { getPricingPageBySlug } from '@/lib/pricingPagesData';
import { generateServiceWithOffer } from '@/lib/seoJsonLd';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Euro, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  HelpCircle,
  ChevronDown,
  Wrench,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

// Import new pricing components
import { CityPricingSection } from '@/components/pricing/CityPricingSection';
import { HowItWorksSection } from '@/components/pricing/HowItWorksSection';
import { WaitingCostsSection } from '@/components/pricing/WaitingCostsSection';
import { RelatedGuidesSection } from '@/components/pricing/RelatedGuidesSection';
import { PricingCTA } from '@/components/pricing/PricingCTA';

export default function PricingPage() {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? getPricingPageBySlug(slug) : undefined;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!page) {
    return (
      <Layout>
        <Helmet>
          <title>Pagina Non Trovata | Idraulici Subito</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Pagina non trovata</h1>
          <Link to="/">
            <Button>Torna alla Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const canonicalUrl = `https://www.idraulicisubito.com/${page.slug}`;

  // JSON-LD Article Schema
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.h1,
    description: page.metaDescription,
    author: {
      '@type': 'Organization',
      name: 'Idraulici Subito',
      url: 'https://www.idraulicisubito.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Idraulici Subito',
      url: 'https://www.idraulicisubito.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.idraulicisubito.com/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl
    }
  };

  // JSON-LD FAQPage Schema
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.idraulicisubito.com' },
      { '@type': 'ListItem', position: 2, name: page.title, item: canonicalUrl }
    ]
  };

  // Service schema with price range
  const serviceJsonLd = generateServiceWithOffer({
    name: page.serviceName,
    description: page.metaDescription,
    url: canonicalUrl,
    priceRange: page.priceRange
  });

  return (
    <Layout>
      <Helmet>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <section className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground truncate">{page.title}</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              <Euro className="h-3 w-3 mr-1" />
              Prezzi Aggiornati 2026
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {page.h1}
            </h1>
            <p className="text-lg text-muted-foreground">
              {page.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Main Price Table */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Wrench className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Prezzo Medio Intervento</h2>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-4 font-semibold">Tipo intervento</th>
                      <th className="text-right p-4 font-semibold">Prezzo medio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {page.mainPrices.map((row, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="p-4">{row.service}</td>
                        <td className="p-4 text-right font-semibold text-primary">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              I prezzi possono aumentare in caso di interventi complessi o difficili da raggiungere.
            </p>

            {/* CTA after price table */}
            <PricingCTA variant="urgent" />
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      {page.urgencyPrices && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-destructive/10 p-3 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <h2 className="text-2xl font-bold">Quanto Costa un Intervento Urgente?</h2>
              </div>
              
              <p className="text-muted-foreground mb-6">
                Se chiami un idraulico la sera, nel weekend o per un'emergenza, il costo può aumentare.
              </p>
              
              <Card>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-4 font-semibold">Situazione</th>
                        <th className="text-right p-4 font-semibold">Maggiorazione</th>
                      </tr>
                    </thead>
                    <tbody>
                      {page.urgencyPrices.map((row, i) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="p-4">{row.service}</td>
                          <td className="p-4 text-right font-semibold text-destructive">{row.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
              
              {page.urgencyNote && (
                <p className="mt-4 p-4 bg-destructive/10 rounded-lg text-sm">
                  <strong>💡</strong> {page.urgencyNote}
                </p>
              )}

              {/* CTA after urgency section */}
              <PricingCTA />
            </div>
          </div>
        </section>
      )}

      {/* City Pricing Section - PHASE 1 */}
      <CityPricingSection serviceType={page.serviceName} />

      {/* Waiting Costs Section - PHASE 5 */}
      <WaitingCostsSection />

      {/* Factors Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-secondary p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h2 className="text-2xl font-bold">Da Cosa Dipende il Costo Finale?</h2>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Il prezzo di un intervento idraulico dipende da:
            </p>
            
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {page.factors.map((factor, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Per questo spesso è utile chiedere un preventivo prima del lavoro.
            </p>
          </div>
        </div>
      </section>

      {/* When Price Increases */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Quando il Prezzo Aumenta</h2>
            </div>
            
            <p className="text-muted-foreground mb-6">
              I costi possono salire se:
            </p>
            
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {page.whenPriceIncreases.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <p className="text-sm text-center mt-4 p-4 bg-primary/10 rounded-lg">
              <strong>💡 Consiglio:</strong> Intervenire subito spesso fa risparmiare.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section - PHASE 7 */}
      <HowItWorksSection />

      {/* Related Guides Section - PHASE 6 */}
      <RelatedGuidesSection guides={page.relatedGuides} />

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <HelpCircle className="h-8 w-8 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-center">
                Domande Frequenti
              </h2>
            </div>

            <div className="space-y-3 mt-10">
              {page.faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-xl border border-border overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-muted/50 transition-colors"
                    aria-expanded={openFaqIndex === index}
                  >
                    <h3 className="font-semibold text-foreground pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown 
                      className={cn(
                        "h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200",
                        openFaqIndex === index && "rotate-180"
                      )}
                    />
                  </button>
                  
                  <div 
                    className={cn(
                      "overflow-hidden transition-all duration-200",
                      openFaqIndex === index ? "max-h-96" : "max-h-0"
                    )}
                  >
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA after FAQs */}
            <div className="mt-10">
              <PricingCTA variant="urgent" />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Pronto a Risolvere il Problema?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Richiedi un preventivo gratuito e ricevi risposte da idraulici verificati nella tua zona. 
              Nessun obbligo, solo professionisti affidabili.
            </p>
            <Link to="/richiesta">
              <Button size="lg">
                Richiedi Preventivo Gratuito
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
