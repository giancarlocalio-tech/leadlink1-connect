import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { getArticlesByCategory, getCategoryBySlug, BLOG_CATEGORIES } from '@/lib/blogData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, ArrowRight, BookOpen, Wrench, AlertTriangle, PiggyBank, FileText } from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'guide-pratiche': <BookOpen className="h-6 w-6" />,
  'manutenzione': <Wrench className="h-6 w-6" />,
  'emergenze': <AlertTriangle className="h-6 w-6" />,
  'risparmio': <PiggyBank className="h-6 w-6" />,
  'normative': <FileText className="h-6 w-6" />
};

export default function BlogCategoryPage() {
  const { category: categorySlug } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;
  const articles = categorySlug ? getArticlesByCategory(categorySlug) : [];

  useEffect(() => {
    if (!category) {
      navigate('/blog');
    }
  }, [category, navigate]);

  if (!category) return null;

  const canonicalUrl = `https://www.idraulicisubito.com/blog/categoria/${category.slug}`;

  return (
    <Layout>
      <Helmet>
        <title>{category.name} - Blog Idraulici Subito</title>
        <meta name="description" content={`${category.description}. Articoli, guide e consigli pratici per la tua casa.`} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${category.name} - Blog Idraulici Subito`} />
        <meta property="og:description" content={category.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>

      {/* Breadcrumb */}
      <section className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-foreground">Blog</Link>
            <span>/</span>
            <span className="text-foreground">{category.name}</span>
          </nav>
        </div>
      </section>

      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Torna al Blog
            </Link>

            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {CATEGORY_ICONS[category.slug]}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {category.name}
            </h1>
            <p className="text-lg text-muted-foreground">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {articles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link key={article.slug} to={`/blog/${article.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2">
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
                            month: 'short'
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {article.readingTime} min
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-4">
                        {article.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Nessun articolo in questa categoria.
              </p>
              <Link to="/blog">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Torna al Blog
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Other Categories */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-6 text-center">Altre Categorie</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {BLOG_CATEGORIES
              .filter(c => c.slug !== category.slug)
              .map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/blog/categoria/${cat.slug}`}
                  className="group"
                >
                  <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                    <CardContent className="p-4 text-center">
                      <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {CATEGORY_ICONS[cat.slug]}
                      </div>
                      <h3 className="font-medium text-sm">{cat.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Serve un professionista?
          </h2>
          <p className="text-primary-foreground/80 mb-6">
            Richiedi un preventivo gratuito ai migliori idraulici della tua zona.
          </p>
          <WhatsAppCTA label="Contattaci su WhatsApp" size="lg" />
        </div>
      </section>
    </Layout>
  );
}
