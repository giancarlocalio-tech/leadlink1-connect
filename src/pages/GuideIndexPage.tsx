import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { GUIDES, GUIDE_CATEGORIES } from '@/lib/guideData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Droplets, Trash2, Flame, ShowerHead, AlertTriangle, Wrench, ArrowRight, Clock } from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'perdite': Droplets,
  'scarichi': Trash2,
  'caldaie': Flame,
  'sanitari': ShowerHead,
  'emergenze': AlertTriangle,
  'manutenzione': Wrench
};

export default function GuideIndexPage() {
  const canonicalUrl = 'https://www.idraulicisubito.com/guide';

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.idraulicisubito.com' },
      { '@type': 'ListItem', position: 2, name: 'Guide', item: canonicalUrl }
    ]
  };

  return (
    <Layout>
      <Helmet>
        <title>Guide Problemi Idraulici | Cosa Fare in Caso di Emergenza</title>
        <meta name="description" content="Guide complete per affrontare i problemi idraulici più comuni: perdite, scarichi intasati, caldaie in blocco. Scopri cosa fare e quando chiamare un professionista." />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Guide Problemi Idraulici | Idraulici Subito" />
        <meta property="og:description" content="Guide pratiche per gestire emergenze idrauliche e problemi comuni." />
        <meta property="og:url" content={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Guide Problemi Idraulici
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Scopri come affrontare i problemi idraulici più comuni: quanto sono gravi, cosa fare subito, cosa evitare e quando chiamare un professionista.
          </p>
          <Link to="/richiesta">
            <Button size="lg">
              Hai un'Emergenza? Richiedi Assistenza
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Categorie Guide</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {GUIDE_CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.slug] || Wrench;
              const count = GUIDES.filter(g => g.category === cat.slug).length;
              return (
                <a
                  key={cat.slug}
                  href={`#${cat.slug}`}
                  className="flex flex-col items-center p-4 bg-card border rounded-xl hover:bg-primary/5 transition-colors text-center"
                >
                  <div className="bg-primary/10 p-3 rounded-full mb-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="font-medium text-sm">{cat.name}</span>
                  <span className="text-xs text-muted-foreground">{count} guide</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Guides by Category */}
      {GUIDE_CATEGORIES.map((category) => {
        const categoryGuides = GUIDES.filter(g => g.category === category.slug);
        if (categoryGuides.length === 0) return null;
        
        const Icon = CATEGORY_ICONS[category.slug] || Wrench;
        
        return (
          <section key={category.slug} id={category.slug} className="py-12 scroll-mt-24">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{category.name}</h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryGuides.map((guide) => (
                  <Link key={guide.slug} to={`/guide/${guide.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-all hover:border-primary/30">
                      <CardHeader>
                        <Badge variant="secondary" className="w-fit mb-2">{category.name}</Badge>
                        <CardTitle className="text-lg line-clamp-2">{guide.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                          {guide.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {guide.readingTime} min
                          </span>
                          <span className="text-primary font-medium flex items-center gap-1">
                            Leggi la guida
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Linkbait Resources Section */}
      <section className="py-12 border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Risorse Tecniche</h2>
          <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
            Approfondimenti tecnici, statistiche e checklist per chi vuole capire meglio il proprio impianto idraulico.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link to="/guide/approfondimenti">
              <Card className="h-full hover:shadow-md transition-shadow text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl mb-3">📚</div>
                  <h3 className="font-semibold mb-2">Approfondimenti Tecnici</h3>
                  <p className="text-sm text-muted-foreground">
                    Guide dettagliate su materiali, impianti e prevenzione.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/statistiche-problemi-idraulici-italia">
              <Card className="h-full hover:shadow-md transition-shadow text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl mb-3">📊</div>
                  <h3 className="font-semibold mb-2">Statistiche Italia</h3>
                  <p className="text-sm text-muted-foreground">
                    Dati e numeri sui problemi idraulici più comuni.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/checklist-manutenzione-impianto-idraulico">
              <Card className="h-full hover:shadow-md transition-shadow text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl mb-3">✅</div>
                  <h3 className="font-semibold mb-2">Checklist Manutenzione</h3>
                  <p className="text-sm text-muted-foreground">
                    Lista controlli periodici per prevenire guasti.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Non Trovi la Guida che Cerchi?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Contatta direttamente un idraulico professionista nella tua zona per una consulenza personalizzata.
          </p>
          <Link to="/richiesta">
            <Button size="lg">
              Richiedi Preventivo Gratuito
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
