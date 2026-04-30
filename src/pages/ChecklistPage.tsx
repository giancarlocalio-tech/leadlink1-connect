/**
 * ChecklistPage - Maintenance checklist for plumbing systems
 * 
 * Designed to be shared on forums, blogs, and DIY communities.
 * Practical, actionable, and printable.
 */

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { MAINTENANCE_CHECKLIST, getChecklistByFrequency } from '@/lib/linkbaitContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ClipboardList, Home, Calendar, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

const FREQUENCY_CONFIG = {
  mensile: { label: 'Ogni Mese', color: 'bg-blue-100 text-blue-700', icon: '📅' },
  trimestrale: { label: 'Ogni 3 Mesi', color: 'bg-green-100 text-green-700', icon: '🗓️' },
  semestrale: { label: 'Ogni 6 Mesi', color: 'bg-yellow-100 text-yellow-700', icon: '📆' },
  annuale: { label: 'Ogni Anno', color: 'bg-purple-100 text-purple-700', icon: '🎯' }
};

const URGENCY_CONFIG = {
  alta: { label: 'Priorità Alta', color: 'destructive' as const },
  media: { label: 'Priorità Media', color: 'secondary' as const },
  bassa: { label: 'Priorità Bassa', color: 'outline' as const }
};

export default function ChecklistPage() {
  const canonicalUrl = 'https://www.idraulicisubito.com/checklist-manutenzione-impianto-idraulico';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Checklist Manutenzione Impianto Idraulico',
    description: 'Lista completa dei controlli periodici da fare al tuo impianto idraulico per prevenire guasti e risparmiare.',
    step: MAINTENANCE_CHECKLIST.map((item, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: item.title,
      text: item.description
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.idraulicisubito.com' },
      { '@type': 'ListItem', position: 2, name: 'Checklist Manutenzione', item: canonicalUrl }
    ]
  };

  const frequencies = ['mensile', 'trimestrale', 'semestrale', 'annuale'] as const;

  return (
    <Layout>
      <Helmet>
        <title>Checklist Manutenzione Impianto Idraulico | Controlli Periodici</title>
        <meta name="description" content="Lista completa dei controlli periodici per il tuo impianto idraulico: cosa verificare ogni mese, trimestre e anno per prevenire guasti costosi." />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Checklist Manutenzione Impianto Idraulico" />
        <meta property="og:description" content="Tutti i controlli da fare per mantenere efficiente il tuo impianto idraulico." />
        <meta property="og:url" content={canonicalUrl} />
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
                <BreadcrumbPage>Checklist Manutenzione</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <ClipboardList className="h-4 w-4" />
            Manutenzione Preventiva
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Checklist Manutenzione Impianto Idraulico
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tutti i controlli da fare per mantenere efficiente il tuo impianto idraulico 
            e prevenire guasti costosi. Organizzati per frequenza.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {frequencies.map(freq => {
              const items = getChecklistByFrequency(freq);
              const config = FREQUENCY_CONFIG[freq];
              return (
                <div key={freq} className="p-4">
                  <div className="text-2xl mb-1">{config.icon}</div>
                  <div className="text-2xl font-bold">{items.length}</div>
                  <div className="text-sm text-muted-foreground">{config.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Checklists by Frequency */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-12">
            {frequencies.map(frequency => {
              const items = getChecklistByFrequency(frequency);
              const config = FREQUENCY_CONFIG[frequency];
              
              return (
                <div key={frequency}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
                      {config.icon} {config.label}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {items.length} {items.length === 1 ? 'controllo' : 'controlli'}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {items.map(item => (
                      <Card key={item.id} className="hover:shadow-sm transition-shadow">
                        <CardContent className="pt-4">
                          <div className="flex items-start gap-4">
                            <div className="pt-1">
                              <Checkbox id={item.id} />
                            </div>
                            <div className="flex-1">
                              <label 
                                htmlFor={item.id}
                                className="font-semibold cursor-pointer hover:text-primary transition-colors"
                              >
                                {item.title}
                              </label>
                              <p className="text-sm text-muted-foreground mt-1">
                                {item.description}
                              </p>
                            </div>
                            <Badge variant={URGENCY_CONFIG[item.urgency].color}>
                              {item.urgency === 'alta' && <AlertCircle className="h-3 w-3 mr-1" />}
                              {URGENCY_CONFIG[item.urgency].label}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Print/Save Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Suggerimento</h3>
                    <p className="text-muted-foreground mb-4">
                      Stampa questa checklist e appendila vicino alla caldaia o sotto il lavandino. 
                      Spunta i controlli man mano che li fai per tenere traccia della manutenzione.
                    </p>
                    <Button variant="outline" onClick={() => window.print()}>
                      Stampa Checklist
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-6 text-center">Approfondisci</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link to="/guide/approfondimenti/manutenzione-impianto-idraulico-frequenza">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <Calendar className="h-6 w-6 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Guida Manutenzione</h3>
                  <p className="text-sm text-muted-foreground">
                    Approfondimento su cosa controllare e perché.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/costo-manutenzione-caldaia">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <ClipboardList className="h-6 w-6 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Costi Manutenzione Caldaia</h3>
                  <p className="text-sm text-muted-foreground">
                    Quanto costa la revisione annuale.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/guide/approfondimenti">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <AlertCircle className="h-6 w-6 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Altri Approfondimenti</h3>
                  <p className="text-sm text-muted-foreground">
                    Guide tecniche su impianti e materiali.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Soft CTA */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-bold mb-4">Hai Bisogno di Assistenza Professionale?</h2>
          <p className="text-muted-foreground mb-6">
            Se noti problemi durante i controlli, richiedi un preventivo gratuito.
          </p>
          <WhatsAppCTA label="Contattaci su WhatsApp" size="md" />
        </div>
      </section>
    </Layout>
  );
}
