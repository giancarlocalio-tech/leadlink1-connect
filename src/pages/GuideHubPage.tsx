/**
 * GuideHubPage - Pillar page for guide categories
 * 
 * Displays comprehensive content (800-1200 words) with:
 * - Overview section
 * - Common problems
 * - When to worry
 * - Prevention tips
 * - Costs table
 * - FAQ with schema markup
 * - Links to related guides (silo structure)
 */

import { useParams, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { getHubPageBySlug } from '@/lib/hubPagesData';
import { GUIDES, GUIDE_CATEGORIES } from '@/lib/guideData';
import { PRICING_PAGES } from '@/lib/pricingPagesData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  BookOpen, 
  AlertTriangle,
  Shield,
  Wrench,
  Euro,
  HelpCircle,
  Droplets,
  Trash2,
  Flame,
  ShowerHead
} from 'lucide-react';

// Category icon mapping
const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'perdite': Droplets,
  'scarichi': Trash2,
  'caldaie': Flame,
  'sanitari': ShowerHead,
  'emergenze': AlertTriangle,
};

export default function GuideHubPage() {
  const location = useLocation();
  
  // Extract slug from pathname: /guide/perdite-acqua -> perdite-acqua
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const category = pathSegments.length >= 2 ? pathSegments[1] : undefined;
  
  const hub = category ? getHubPageBySlug(category) : undefined;
  
  // Get related guides for this category
  const categoryGuides = hub 
    ? GUIDES.filter(g => g.category === hub.categorySlug)
    : [];
  
  // Get category info
  const categoryInfo = hub 
    ? GUIDE_CATEGORIES.find(c => c.slug === hub.categorySlug)
    : undefined;
  
  // Get related pricing pages
  const relatedPricing = hub
    ? PRICING_PAGES.filter(p => hub.relatedPricingPages.includes(p.slug))
    : [];

  const CategoryIcon = hub ? (CATEGORY_ICONS[hub.categorySlug] || BookOpen) : BookOpen;

  if (!hub) {
    return (
      <Layout>
        <Helmet>
          <title>Hub Non Trovato | Idraulici Subito</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Pagina non trovata</h1>
          <Link to="/guide">
            <Button>Torna alle Guide</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const canonicalUrl = `https://www.idraulicisubito.com/guide/${hub.slug}`;

  // JSON-LD Schemas
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: hub.h1,
    description: hub.metaDescription,
    datePublished: hub.publishedAt,
    dateModified: hub.updatedAt,
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

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: hub.faqs.map(faq => ({
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
      { '@type': 'ListItem', position: 2, name: 'Guide', item: 'https://www.idraulicisubito.com/guide' },
      { '@type': 'ListItem', position: 3, name: hub.h1, item: canonicalUrl }
    ]
  };

  return (
    <Layout>
      <Helmet>
        <title>{hub.metaTitle}</title>
        <meta name="description" content={hub.metaDescription} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={hub.metaTitle} />
        <meta property="og:description" content={hub.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="article:published_time" content={hub.publishedAt} />
        <meta property="article:modified_time" content={hub.updatedAt} />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <section className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/guide" className="hover:text-foreground">Guide</Link>
            <span>/</span>
            <span className="text-foreground">{categoryInfo?.name || hub.h1}</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="py-10 md:py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link to="/guide" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="h-4 w-4" />
              Tutte le Guide
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div className="bg-primary/10 p-4 rounded-full">
                <CategoryIcon className="h-8 w-8 text-primary" />
              </div>
              <Badge variant="secondary" className="text-sm">Hub Tematico</Badge>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {hub.h1}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              {hub.intro}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/richiesta">
                <Button size="lg">
                  Richiedi Preventivo Gratuito
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <a href="#guide-correlate">
                <Button size="lg" variant="outline">
                  Vedi Guide Specifiche
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <details className="group" open>
              <summary className="cursor-pointer text-sm font-semibold flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Indice dei Contenuti
              </summary>
              <nav className="mt-4 grid sm:grid-cols-2 gap-2 text-sm">
                <a href="#panoramica" className="text-muted-foreground hover:text-primary">→ Panoramica</a>
                <a href="#problemi-comuni" className="text-muted-foreground hover:text-primary">→ Problemi Comuni</a>
                <a href="#quando-preoccuparsi" className="text-muted-foreground hover:text-primary">→ Quando Preoccuparsi</a>
                <a href="#prevenzione" className="text-muted-foreground hover:text-primary">→ Prevenzione</a>
                <a href="#costi" className="text-muted-foreground hover:text-primary">→ Costi Indicativi</a>
                <a href="#faq" className="text-muted-foreground hover:text-primary">→ Domande Frequenti</a>
                <a href="#guide-correlate" className="text-muted-foreground hover:text-primary">→ Guide Specifiche</a>
              </nav>
            </details>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* Overview Section */}
            <section id="panoramica" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Panoramica</h2>
              </div>
              <div 
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground"
                dangerouslySetInnerHTML={{ __html: hub.content.overview }}
              />
            </section>

            {/* Common Problems Section */}
            <section id="problemi-comuni" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-destructive/10 p-3 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Problemi Più Comuni</h2>
              </div>
              <div 
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground"
                dangerouslySetInnerHTML={{ __html: hub.content.commonProblems }}
              />
            </section>

            {/* CTA Box */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">Hai un problema urgente?</h3>
                  <p className="text-muted-foreground">
                    Trova un idraulico professionista nella tua zona in pochi minuti.
                  </p>
                </div>
                <Link to="/richiesta">
                  <Button size="lg">
                    Richiedi Assistenza
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* When to Worry Section */}
            <section id="quando-preoccuparsi" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-amber-500/10 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-amber-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Quando Preoccuparsi</h2>
              </div>
              <div 
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground"
                dangerouslySetInnerHTML={{ __html: hub.content.whenToWorry }}
              />
            </section>

            {/* Prevention Section */}
            <section id="prevenzione" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-500/10 p-3 rounded-full">
                  <Wrench className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Prevenzione e Manutenzione</h2>
              </div>
              <div 
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground"
                dangerouslySetInnerHTML={{ __html: hub.content.prevention }}
              />
            </section>

            {/* Costs Section */}
            <section id="costi" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-500/10 p-3 rounded-full">
                  <Euro className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Costi Indicativi</h2>
              </div>
              <div 
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-table:w-full prose-th:bg-muted prose-th:p-3 prose-td:p-3 prose-td:border prose-th:border"
                dangerouslySetInnerHTML={{ __html: hub.content.costs }}
              />
              
              {/* Link to Pricing Pages */}
              {relatedPricing.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {relatedPricing.map(pricing => (
                    <Link key={pricing.slug} to={`/${pricing.slug}`}>
                      <Button variant="outline" size="sm">
                        Vedi {pricing.h1}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            {/* FAQ Section */}
            <section id="faq" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-500/10 p-3 rounded-full">
                  <HelpCircle className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Domande Frequenti</h2>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                {hub.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left text-base md:text-lg font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Related Guides Section (Silo Links) */}
            <section id="guide-correlate" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Guide Specifiche</h2>
              </div>
              
              <p className="text-muted-foreground mb-6">
                Approfondisci con le nostre guide dettagliate per ogni problema specifico:
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryGuides.map((guide) => (
                  <Link key={guide.slug} to={`/guide/${guide.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-all hover:border-primary/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base line-clamp-2">{guide.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {guide.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {guide.readingTime} min
                          </span>
                          <span className="text-primary font-medium flex items-center gap-1">
                            Leggi
                            <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {categoryGuides.length === 0 && (
                <p className="text-muted-foreground text-center py-8">
                  Nuove guide in arrivo per questa categoria.
                </p>
              )}
            </section>

            {/* Final CTA */}
            <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Hai Bisogno di un Idraulico?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Ricevi preventivi gratuiti dai professionisti della tua zona. Confronta e scegli in totale libertà.
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

      {/* Other Hub Pages Links */}
      <section className="py-10 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-6 text-center">Esplora Altri Argomenti</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {['perdite-acqua', 'scarichi-intasati', 'caldaia-e-riscaldamento', 'problemi-sanitari', 'emergenze-idrauliche']
              .filter(slug => slug !== hub.slug)
              .map(slug => {
                const name = slug
                  .replace('-e-', ' e ')
                  .replace(/-/g, ' ')
                  .replace(/\b\w/g, c => c.toUpperCase());
                return (
                  <Link key={slug} to={`/guide/${slug}`}>
                    <Badge variant="outline" className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground cursor-pointer">
                      {name}
                    </Badge>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
