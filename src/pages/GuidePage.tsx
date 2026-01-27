import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { getGuideBySlug, getRelatedGuides, GUIDE_CATEGORIES } from '@/lib/guideData';
import { TOP_50_CITIES } from '@/lib/seoConfig';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, XCircle, Phone, MapPin } from 'lucide-react';

export default function GuidePage() {
  const { slug } = useParams<{ slug: string }>();
  const guide = slug ? getGuideBySlug(slug) : undefined;
  const relatedGuides = slug ? getRelatedGuides(slug, 3) : [];
  const category = guide ? GUIDE_CATEGORIES.find(c => c.slug === guide.category) : undefined;

  if (!guide) {
    return (
      <Layout>
        <Helmet>
          <title>Guida Non Trovata | Idraulici Subito</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Guida non trovata</h1>
          <Link to="/guide">
            <Button>Torna alle Guide</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const canonicalUrl = `https://www.idraulicisubito.com/guide/${guide.slug}`;

  // JSON-LD Article Schema
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.h1,
    description: guide.metaDescription,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
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

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.idraulicisubito.com' },
      { '@type': 'ListItem', position: 2, name: 'Guide', item: 'https://www.idraulicisubito.com/guide' },
      { '@type': 'ListItem', position: 3, name: guide.h1, item: canonicalUrl }
    ]
  };

  // Top 15 cities for CTA section
  const topCities = TOP_50_CITIES.slice(0, 15);

  return (
    <Layout>
      <Helmet>
        <title>{guide.metaTitle}</title>
        <meta name="description" content={guide.metaDescription} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={guide.metaTitle} />
        <meta property="og:description" content={guide.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="article:published_time" content={guide.publishedAt} />
        <meta property="article:modified_time" content={guide.updatedAt} />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
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
            <span className="text-foreground truncate max-w-[200px]">{guide.h1}</span>
          </nav>
        </div>
      </section>

      {/* Header */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link to="/guide" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="h-4 w-4" />
              Torna alle Guide
            </Link>

            <Badge variant="secondary" className="mb-4">{category?.name}</Badge>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {guide.h1}
            </h1>

            <p className="text-lg text-muted-foreground mb-6">{guide.excerpt}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Aggiornato il {new Date(guide.updatedAt).toLocaleDateString('it-IT')}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {guide.readingTime} min di lettura
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <h2 className="font-semibold mb-4">📋 Indice della Guida</h2>
                <ul className="space-y-2">
                  <li>
                    <a href={`#${guide.sections.gravity.id}`} className="text-primary hover:underline flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      {guide.sections.gravity.title}
                    </a>
                  </li>
                  <li>
                    <a href={`#${guide.sections.immediateActions.id}`} className="text-primary hover:underline flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      {guide.sections.immediateActions.title}
                    </a>
                  </li>
                  <li>
                    <a href={`#${guide.sections.whatNotToDo.id}`} className="text-primary hover:underline flex items-center gap-2">
                      <XCircle className="h-4 w-4" />
                      {guide.sections.whatNotToDo.title}
                    </a>
                  </li>
                  <li>
                    <a href={`#${guide.sections.whenToCall.id}`} className="text-primary hover:underline flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {guide.sections.whenToCall.title}
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Article Content - Structured Sections */}
      <article className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-12">
            
            {/* Section 1: Gravity */}
            <section id={guide.sections.gravity.id} className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/20 text-primary p-3 rounded-full">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">{guide.sections.gravity.title}</h2>
              </div>
              <div 
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: guide.sections.gravity.content }}
              />
            </section>

            {/* Section 2: Immediate Actions */}
            <section id={guide.sections.immediateActions.id} className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-secondary text-secondary-foreground p-3 rounded-full">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">{guide.sections.immediateActions.title}</h2>
              </div>
              <div 
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: guide.sections.immediateActions.content }}
              />
            </section>

            {/* Section 3: What NOT to do */}
            <section id={guide.sections.whatNotToDo.id} className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-destructive/20 text-destructive p-3 rounded-full">
                  <XCircle className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">{guide.sections.whatNotToDo.title}</h2>
              </div>
              <div 
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: guide.sections.whatNotToDo.content }}
              />
            </section>

            {/* Section 4: When to Call */}
            <section id={guide.sections.whenToCall.id} className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/20 text-primary p-3 rounded-full">
                  <Phone className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">{guide.sections.whenToCall.title}</h2>
              </div>
              <div 
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: guide.sections.whenToCall.content }}
              />
            </section>

          </div>
        </div>
      </article>

      {/* CTA: Find a Plumber in Your City */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Trova un Idraulico per Questo Problema nella Tua Città
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Hai bisogno di un professionista? Trova un idraulico qualificato nella tua zona per risolvere il problema rapidamente.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {topCities.map((citySlug) => {
                const cityName = citySlug.charAt(0).toUpperCase() + citySlug.slice(1).replace(/-/g, ' ');
                return (
                  <Link
                    key={citySlug}
                    to={`/${citySlug}`}
                    className="inline-flex items-center gap-2 bg-card hover:bg-primary/10 border border-border rounded-full px-4 py-2 text-sm transition-colors"
                  >
                    <MapPin className="h-3 w-3 text-primary" />
                    <span>Idraulico {cityName}</span>
                  </Link>
                );
              })}
            </div>

            <Link to="/richiesta">
              <Button size="lg" className="w-full sm:w-auto">
                Richiedi Preventivo Gratuito
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      {relatedGuides.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">Guide Correlate</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedGuides.map((related) => (
                  <Link key={related.slug} to={`/guide/${related.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <Badge variant="outline" className="mb-3">{category?.name}</Badge>
                        <h3 className="font-semibold mb-2 line-clamp-2">{related.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{related.excerpt}</p>
                        <p className="text-xs text-muted-foreground mt-3">{related.readingTime} min</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tags */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Tag:</h3>
            <div className="flex flex-wrap gap-2">
              {guide.tags.map(tag => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
