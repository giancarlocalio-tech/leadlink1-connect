/**
 * ApprofondimentiIndexPage - Index of all technical deep-dive articles
 * 
 * Designed as a linkable resource hub for external sites.
 */

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { APPROFONDIMENTI } from '@/lib/linkbaitContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Clock, BookOpen, Home } from 'lucide-react';

const CATEGORY_NAMES: Record<string, string> = {
  tubature: 'Tubature e Materiali',
  impianti: 'Impianti Idraulici',
  manutenzione: 'Manutenzione',
  prevenzione: 'Prevenzione',
  tecnologia: 'Tecnologia'
};

export default function ApprofondimentiIndexPage() {
  const canonicalUrl = 'https://www.idraulicisubito.com/guide/approfondimenti';

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.idraulicisubito.com' },
      { '@type': 'ListItem', position: 2, name: 'Guide', item: 'https://www.idraulicisubito.com/guide' },
      { '@type': 'ListItem', position: 3, name: 'Approfondimenti', item: canonicalUrl }
    ]
  };

  // Group by category
  const grouped = APPROFONDIMENTI.reduce((acc, article) => {
    if (!acc[article.category]) acc[article.category] = [];
    acc[article.category].push(article);
    return acc;
  }, {} as Record<string, typeof APPROFONDIMENTI>);

  return (
    <Layout>
      <Helmet>
        <title>Approfondimenti Tecnici Idraulici | Guide Esperte</title>
        <meta name="description" content="Guide tecniche approfondite su impianti idraulici, materiali, manutenzione e prevenzione. Risorse complete per capire il funzionamento del tuo impianto." />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Approfondimenti Tecnici Idraulici" />
        <meta property="og:description" content="Guide tecniche complete per capire e mantenere il tuo impianto idraulico." />
        <meta property="og:url" content={canonicalUrl} />
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
                <BreadcrumbPage>Approfondimenti Tecnici</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen className="h-4 w-4" />
            Risorse Tecniche
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Approfondimenti Tecnici
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Guide complete e dettagliate per capire come funziona il tuo impianto idraulico, 
            i materiali usati, e come prevenire i problemi più comuni.
          </p>
        </div>
      </section>

      {/* Articles by Category */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {Object.entries(grouped).map(([category, articles]) => (
            <div key={category} className="mb-12">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Badge variant="outline">{CATEGORY_NAMES[category] || category}</Badge>
                <span className="text-muted-foreground text-sm font-normal">
                  ({articles.length} {articles.length === 1 ? 'articolo' : 'articoli'})
                </span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map(article => (
                  <Link key={article.slug} to={`/guide/approfondimenti/${article.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-all hover:border-primary/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg line-clamp-2">
                          {article.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {article.readingTime} min lettura
                          </span>
                          <span className="text-primary font-medium">
                            Leggi →
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Link to other sections */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-bold mb-4">Altre Risorse</h2>
          <p className="text-muted-foreground mb-6">
            Esplora anche le nostre guide pratiche per affrontare problemi specifici.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/guide" className="text-primary hover:underline">
              Guide Problemi →
            </Link>
            <Link to="/statistiche-problemi-idraulici-italia" className="text-primary hover:underline">
              Statistiche Italia →
            </Link>
            <Link to="/checklist-manutenzione-impianto-idraulico" className="text-primary hover:underline">
              Checklist Manutenzione →
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
