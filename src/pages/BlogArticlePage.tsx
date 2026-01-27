import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { getArticleBySlug, getRelatedArticles, BLOG_CATEGORIES } from '@/lib/blogData';
import { generateJsonLd } from '@/lib/seoJsonLd';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, BookOpen } from 'lucide-react';

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = slug ? getArticleBySlug(slug) : undefined;
  const relatedArticles = slug ? getRelatedArticles(slug, 3) : [];

  useEffect(() => {
    if (!article) {
      navigate('/blog');
    }
  }, [article, navigate]);

  if (!article) return null;

  const canonicalUrl = `https://www.idraulicisubito.com/blog/${article.slug}`;
  const category = BLOG_CATEGORIES.find(c => c.slug === article.category);

  // JSON-LD per articolo blog
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.h1,
    description: article.metaDescription,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Organization',
      name: 'Idraulici Subito',
      url: 'https://idraulicisubito.com'
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
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://idraulicisubito.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://idraulicisubito.com/blog'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.h1,
        item: canonicalUrl
      }
    ]
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>{article.metaTitle}</title>
        <meta name="description" content={article.metaDescription} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={article.metaTitle} />
        <meta property="og:description" content={article.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://www.idraulicisubito.com/og-image.jpg" />
        <meta property="article:published_time" content={article.publishedAt} />
        <meta property="article:modified_time" content={article.updatedAt} />
        <meta property="article:section" content={category?.name} />
        {article.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.metaTitle} />
        <meta name="twitter:description" content={article.metaDescription} />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <section className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-foreground">Blog</Link>
            <span>/</span>
            <Link to={`/blog/categoria/${article.category}`} className="hover:text-foreground">
              {category?.name}
            </Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-[200px]">{article.h1}</span>
          </nav>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Torna al Blog
            </Link>

            <Badge variant="secondary" className="mb-4">
              {category?.name}
            </Badge>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {article.h1}
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Pubblicato il {new Date(article.publishedAt).toLocaleDateString('it-IT', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.readingTime} min di lettura
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleShare}
                className="ml-auto"
              >
                <Share2 className="h-4 w-4 mr-1" />
                Condividi
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Add TOC styling */}
            <style>{`
              .toc {
                background: hsl(var(--muted));
                border-radius: 0.5rem;
                padding: 1rem 1.5rem;
                margin-bottom: 2rem;
              }
              .toc li {
                margin: 0.5rem 0;
              }
              .toc a {
                color: hsl(var(--primary));
                text-decoration: none;
              }
              .toc a:hover {
                text-decoration: underline;
              }
              article h2[id], article h3[id] {
                scroll-margin-top: 100px;
              }
            `}</style>
            <article 
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:marker:text-primary"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Tag:</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-primary/20">
              <CardContent className="p-6 md:p-8 text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h2 className="text-xl md:text-2xl font-bold mb-3">
                  Hai bisogno di un idraulico professionista?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Se il problema richiede l'intervento di un esperto, richiedi subito un preventivo gratuito.
                </p>
                <Link to="/richiesta">
                  <Button size="lg" className="w-full sm:w-auto">
                    Richiedi Preventivo Gratuito
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Articoli Correlati</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link key={related.slug} to={`/blog/${related.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-base line-clamp-2">
                          {related.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {related.excerpt}
                        </p>
                        <p className="text-xs text-muted-foreground mt-3">
                          {related.readingTime} min di lettura
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
