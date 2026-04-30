import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { BLOG_ARTICLES, BLOG_CATEGORIES, getLatestArticles } from '@/lib/blogData';
import { generateJsonLd } from '@/lib/seoJsonLd';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Wrench, AlertTriangle, PiggyBank, FileText, Calendar, Clock, ArrowRight } from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'guide-pratiche': <BookOpen className="h-5 w-5" />,
  'manutenzione': <Wrench className="h-5 w-5" />,
  'emergenze': <AlertTriangle className="h-5 w-5" />,
  'risparmio': <PiggyBank className="h-5 w-5" />,
  'normative': <FileText className="h-5 w-5" />
};

export default function BlogPage() {
  const latestArticles = getLatestArticles(6);
  const canonicalUrl = 'https://www.idraulicisubito.com/blog';

  const jsonLd = generateJsonLd(
    {
      name: 'Blog Idraulici Subito - Guide e Consigli Idraulici',
      description: 'Guide pratiche, consigli di manutenzione e news dal mondo dell\'idraulica. Articoli scritti da professionisti per aiutarti a gestire gli impianti di casa.',
      url: canonicalUrl,
      areaServed: [{ type: 'Country' as const, name: 'Italia' }],
    },
    [],
    [{ name: 'Blog', url: canonicalUrl }]
  );

  return (
    <Layout>
      <Helmet>
        <title>Blog Idraulici Subito - Guide e Consigli per la Casa</title>
        <meta name="description" content="Guide pratiche, consigli di manutenzione e tutorial per gestire gli impianti idraulici di casa. Articoli scritti da professionisti del settore." />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Blog Idraulici Subito - Guide e Consigli per la Casa" />
        <meta property="og:description" content="Guide pratiche, consigli di manutenzione e tutorial per gestire gli impianti idraulici di casa." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://www.idraulicisubito.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog Idraulici Subito - Guide Idrauliche" />
        <meta name="twitter:description" content="Guide pratiche e consigli per gestire gli impianti idraulici di casa." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Blog Idraulici Subito
            </h1>
            <p className="text-lg text-muted-foreground">
              Guide pratiche, consigli di manutenzione e tutorial per gestire al meglio gli impianti idraulici di casa tua.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Esplora per Categoria</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {BLOG_CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                to={`/blog/categoria/${category.slug}`}
                className="group"
              >
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {CATEGORY_ICONS[category.slug]}
                    </div>
                    <h3 className="font-semibold text-sm">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Ultimi Articoli</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <Link key={article.slug} to={`/blog/${article.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {BLOG_CATEGORIES.find(c => c.slug === article.category)?.name}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(article.publishedAt).toLocaleDateString('it-IT', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.readingTime} min
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles by Category */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Tutti gli Articoli</h2>
          {BLOG_CATEGORIES.map((category) => {
            const categoryArticles = BLOG_ARTICLES.filter(a => a.category === category.slug);
            if (categoryArticles.length === 0) return null;
            
            return (
              <div key={category.slug} className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {CATEGORY_ICONS[category.slug]}
                  </div>
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {categoryArticles.map((article) => (
                    <Link 
                      key={article.slug} 
                      to={`/blog/${article.slug}`}
                      className="flex items-center gap-3 p-4 bg-background rounded-lg border hover:border-primary/50 transition-colors group"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium group-hover:text-primary transition-colors">
                          {article.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {article.readingTime} min di lettura
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Hai bisogno di un idraulico professionista?
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
            Se il tuo problema richiede l'intervento di un esperto, richiedi un preventivo gratuito ai migliori idraulici della tua zona.
          </p>
          <WhatsAppCTA label="Contattaci ora su WhatsApp" size="lg" />
        </div>
      </section>
    </Layout>
  );
}
