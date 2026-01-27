/**
 * ApprofondimentoPage - Technical deep-dive articles designed for backlinks
 * 
 * Minimal commercial pressure, maximum informational value.
 * Includes tables, charts, and data that blogs/forums want to cite.
 */

import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { getApprofondimentoBySlug, APPROFONDIMENTI } from '@/lib/linkbaitContent';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, BookOpen, ChevronRight, ArrowRight, Home } from 'lucide-react';
import NotFound from './NotFound';

export default function ApprofondimentoPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getApprofondimentoBySlug(slug) : undefined;

  if (!article) {
    return <NotFound />;
  }

  const canonicalUrl = `https://www.idraulicisubito.com/guide/approfondimenti/${article.slug}`;

  // JSON-LD Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.h1,
    description: article.metaDescription,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Organization',
      name: 'IdrauliciSubito Editorial Team',
      url: 'https://www.idraulicisubito.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'IdrauliciSubito',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.idraulicisubito.com/logo.png'
      }
    },
    mainEntityOfPage: canonicalUrl,
    about: {
      '@type': 'Thing',
      name: article.category
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.idraulicisubito.com' },
      { '@type': 'ListItem', position: 2, name: 'Guide', item: 'https://www.idraulicisubito.com/guide' },
      { '@type': 'ListItem', position: 3, name: 'Approfondimenti', item: 'https://www.idraulicisubito.com/guide/approfondimenti' },
      { '@type': 'ListItem', position: 4, name: article.title, item: canonicalUrl }
    ]
  };

  // Table of contents from sections
  const toc = article.sections.map(s => ({ id: s.id, title: s.title }));

  return (
    <Layout>
      <Helmet>
        <title>{article.metaTitle}</title>
        <meta name="description" content={article.metaDescription} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={article.metaTitle} />
        <meta property="og:description" content={article.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={article.publishedAt} />
        <meta property="article:modified_time" content={article.updatedAt} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="flex items-center gap-1">
                    <Home className="h-4 w-4" />
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/guide">Guide</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/guide/approfondimenti">Approfondimenti</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="max-w-[200px] truncate">
                  {article.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Aggiornato: {new Date(article.updatedAt).toLocaleDateString('it-IT')}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.readingTime} min lettura
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              {article.h1}
            </h1>
            <p className="text-lg text-muted-foreground">
              {article.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[250px_1fr] gap-8 max-w-6xl">
            {/* Sidebar TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Indice
                    </h3>
                    <nav className="space-y-2">
                      {toc.map(item => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                        >
                          {item.title}
                        </a>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              </div>
            </aside>

            {/* Main Content */}
            <article className="max-w-3xl">
              {article.sections.map((section, index) => (
                <section key={section.id} id={section.id} className="mb-12 scroll-mt-24">
                  <h2 className="text-xl md:text-2xl font-bold mb-4">
                    {section.title}
                  </h2>
                  <div 
                    className="prose prose-sm md:prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-table:text-sm"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </section>
              ))}

              {/* Related Content - minimal CTA */}
              <div className="mt-12 pt-8 border-t">
                <h3 className="font-semibold mb-4">Approfondisci</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {article.relatedGuides.slice(0, 2).map(guideSlug => (
                    <Link
                      key={guideSlug}
                      to={`/guide/${guideSlug}`}
                      className="p-4 border rounded-lg hover:border-primary/50 transition-colors flex items-center justify-between"
                    >
                      <span className="text-sm">Guida: {guideSlug.replace(/-/g, ' ')}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
                
                {article.relatedPricing && (
                  <Link
                    to={`/${article.relatedPricing}`}
                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                  >
                    Vedi i costi indicativi
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                )}
              </div>

              {/* Soft CTA at bottom only */}
              <Card className="mt-12 bg-primary/5 border-primary/20">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-2">Hai un problema idraulico?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Trova un professionista disponibile nella tua zona.
                  </p>
                  <Link to="/richiesta">
                    <Button>
                      Richiedi Preventivo Gratuito
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </article>
          </div>
        </div>
      </section>

      {/* Other articles */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-6">Altri Approfondimenti</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {APPROFONDIMENTI.filter(a => a.slug !== article.slug).slice(0, 3).map(a => (
              <Link key={a.slug} to={`/guide/approfondimenti/${a.slug}`}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{a.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{a.excerpt}</p>
                    <div className="mt-3 text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {a.readingTime} min
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
