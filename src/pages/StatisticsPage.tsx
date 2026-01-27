/**
 * StatisticsPage - Plumbing statistics for Italy
 * 
 * Designed to be cited by journalists, blogs, and forums.
 * Easy to reference and link to.
 */

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { PLUMBING_STATISTICS } from '@/lib/linkbaitContent';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { BarChart3, Droplets, Home, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';
import { TOP_50_CITIES } from '@/lib/seoConfig';
import { CITIES } from '@/lib/seoData';

export default function StatisticsPage() {
  const canonicalUrl = 'https://www.idraulicisubito.com/statistiche-problemi-idraulici-italia';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Statistiche Problemi Idraulici in Italia 2025',
    description: 'Dati e statistiche aggiornati sui problemi idraulici più comuni nelle case italiane: perdite, intasamenti, guasti e costi medi.',
    datePublished: '2026-01-20',
    dateModified: '2026-01-27',
    author: {
      '@type': 'Organization',
      name: 'IdrauliciSubito Research'
    },
    publisher: {
      '@type': 'Organization',
      name: 'IdrauliciSubito'
    },
    mainEntityOfPage: canonicalUrl
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.idraulicisubito.com' },
      { '@type': 'ListItem', position: 2, name: 'Statistiche Problemi Idraulici', item: canonicalUrl }
    ]
  };

  const topCities = CITIES.filter(c => TOP_50_CITIES.includes(c.slug as any)).slice(0, 10);

  return (
    <Layout>
      <Helmet>
        <title>Statistiche Problemi Idraulici Italia 2025 | Dati e Trend</title>
        <meta name="description" content="Statistiche aggiornate sui problemi idraulici in Italia: percentuale interventi urgenti, cause principali intasamenti, età media impianti e costi medi riparazioni." />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Statistiche Problemi Idraulici Italia 2025" />
        <meta property="og:description" content="Dati e statistiche sui problemi idraulici più comuni nelle case italiane." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
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
                <BreadcrumbPage>Statistiche Problemi Idraulici Italia</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BarChart3 className="h-4 w-4" />
            Dati e Ricerche
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Statistiche Problemi Idraulici in Italia
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dati aggiornati sui guasti idraulici più comuni nelle case italiane, 
            cause principali, zone più colpite e costi medi di riparazione.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Ultimo aggiornamento: Gennaio 2026
          </p>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Numeri Chiave</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLUMBING_STATISTICS.slice(0, 4).map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <h3 className="font-semibold mb-2">{stat.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                  {stat.source && (
                    <p className="text-xs text-muted-foreground mt-2 italic">
                      Fonte: {stat.source}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Statistics Table */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Tutti i Dati</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-card border rounded-lg">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 font-semibold">Indicatore</th>
                  <th className="text-left p-4 font-semibold">Valore</th>
                  <th className="text-left p-4 font-semibold hidden md:table-cell">Descrizione</th>
                  <th className="text-left p-4 font-semibold hidden lg:table-cell">Fonte</th>
                </tr>
              </thead>
              <tbody>
                {PLUMBING_STATISTICS.map((stat, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="p-4 font-medium">{stat.label}</td>
                    <td className="p-4">
                      <span className="text-lg font-bold text-primary">{stat.value}</span>
                    </td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">
                      {stat.description}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground hidden lg:table-cell italic">
                      {stat.source || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            I dati sono elaborati da IdrauliciSubito sulla base di richieste di intervento, 
            studi di settore e statistiche pubbliche ISTAT.
          </p>
        </div>
      </section>

      {/* Problems by Type */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Problemi per Tipologia</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Droplets className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg">Perdite d'Acqua</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex justify-between">
                    <span>Tubi corrosi</span>
                    <span className="font-semibold">35%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Giunti allentati</span>
                    <span className="font-semibold">28%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Guarnizioni usurate</span>
                    <span className="font-semibold">22%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Gelo invernale</span>
                    <span className="font-semibold">15%</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-destructive/10 text-destructive">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg">Intasamenti</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex justify-between">
                    <span>Salviette/carta</span>
                    <span className="font-semibold">42%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Capelli e sapone</span>
                    <span className="font-semibold">28%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Grasso e olio</span>
                    <span className="font-semibold">18%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Oggetti caduti</span>
                    <span className="font-semibold">12%</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-secondary text-secondary-foreground">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg">Caldaie</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex justify-between">
                    <span>Mancata manutenzione</span>
                    <span className="font-semibold">45%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Calcare/incrostazioni</span>
                    <span className="font-semibold">30%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Elettronica</span>
                    <span className="font-semibold">15%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Usura componenti</span>
                    <span className="font-semibold">10%</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Average Costs */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Costi Medi per Intervento</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-card border rounded-lg">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 font-semibold">Tipo Intervento</th>
                  <th className="text-left p-4 font-semibold">Costo Minimo</th>
                  <th className="text-left p-4 font-semibold">Costo Medio</th>
                  <th className="text-left p-4 font-semibold">Costo Massimo</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">Riparazione rubinetto</td>
                  <td className="p-4">30€</td>
                  <td className="p-4 font-semibold">50€</td>
                  <td className="p-4">100€</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Disostruzione WC</td>
                  <td className="p-4">60€</td>
                  <td className="p-4 font-semibold">100€</td>
                  <td className="p-4">200€</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Riparazione perdita tubo</td>
                  <td className="p-4">80€</td>
                  <td className="p-4 font-semibold">150€</td>
                  <td className="p-4">400€</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Manutenzione caldaia</td>
                  <td className="p-4">60€</td>
                  <td className="p-4 font-semibold">90€</td>
                  <td className="p-4">150€</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Pronto intervento urgente</td>
                  <td className="p-4">100€</td>
                  <td className="p-4 font-semibold">180€</td>
                  <td className="p-4">350€</td>
                </tr>
                <tr>
                  <td className="p-4">Sostituzione caldaia</td>
                  <td className="p-4">1.500€</td>
                  <td className="p-4 font-semibold">2.500€</td>
                  <td className="p-4">5.000€</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            I costi sono indicativi e possono variare in base alla zona, complessità e materiali.
          </p>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Trova un Idraulico nelle Principali Città</h2>
          <p className="text-muted-foreground mb-8">
            Servizio attivo in tutte le principali città italiane.
          </p>
          <div className="flex flex-wrap gap-3">
            {topCities.map(city => (
              <Link key={city.slug} to={`/${city.slug}`}>
                <Button variant="outline" size="sm">
                  {city.name}
                </Button>
              </Link>
            ))}
            <Link to="/guide">
              <Button variant="ghost" size="sm">
                Vedi tutte →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Soft CTA */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-bold mb-4">Hai un Problema Idraulico?</h2>
          <p className="text-muted-foreground mb-6">
            Richiedi un preventivo gratuito e senza impegno.
          </p>
          <Link to="/richiesta">
            <Button>
              Richiedi Preventivo
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
