/**
 * Contatti Page - EEAT Trust Page
 * Contact information with Organization + ContactPoint schema
 */

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import { 
  Mail, 
  MessageSquare,
  Clock,
  Shield,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

const BASE_URL = 'https://www.idraulicisubito.com';

export default function ContattiPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canonicalUrl = `${BASE_URL}/contatti`;

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}#organization`,
    name: 'Idraulici Subito',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: 'Piattaforma italiana che mette in contatto clienti con idraulici professionisti.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@idraulicisubito.com',
      availableLanguage: 'Italian',
      areaServed: {
        '@type': 'Country',
        name: 'Italia'
      }
    }
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Contatti', item: canonicalUrl }
    ]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Messaggio inviato! Ti risponderemo al più presto.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Layout>
      <Helmet>
        <title>Contatti | IdrauliciSubito - Scrivici</title>
        <meta 
          name="description" 
          content="Contatta IdrauliciSubito per informazioni sul servizio, assistenza o collaborazioni. Rispondiamo a tutte le richieste entro 24-48 ore." 
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <section className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground">Contatti</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Contattaci
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Hai domande sul servizio o vuoi collaborare con noi? 
              Siamo qui per aiutarti.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              
              {/* Contact Info */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Come Contattarci</h2>
                  <p className="text-muted-foreground mb-6">
                    Per richieste di assistenza, informazioni sul servizio o proposte di 
                    collaborazione, puoi scriverci utilizzando il modulo o direttamente via email.
                  </p>
                </div>

                {/* Email Card */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <a 
                          href="mailto:info@idraulicisubito.com" 
                          className="text-primary hover:underline"
                        >
                          info@idraulicisubito.com
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">
                          Rispondiamo entro 24-48 ore lavorative
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Response Time */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-500/10 p-3 rounded-full flex-shrink-0">
                        <Clock className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Tempi di Risposta</h3>
                        <p className="text-muted-foreground">
                          Cerchiamo di rispondere a tutte le richieste entro 24-48 ore 
                          lavorative. Per urgenze idrauliche, usa il modulo di richiesta intervento.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* What We Can Help With */}
                <div className="bg-muted/30 rounded-xl p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Possiamo Aiutarti Con
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      Informazioni sul funzionamento del servizio
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      Assistenza per richieste già inviate
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      Iscrizione come professionista
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      Proposte di collaborazione
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      Segnalazioni e feedback
                    </li>
                  </ul>
                </div>

                {/* Privacy Note */}
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    I tuoi dati sono trattati nel rispetto della nostra{' '}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>. Non condividiamo le tue informazioni con terze parti.
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Invia un Messaggio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Il tuo nome"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="La tua email"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject">Oggetto *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Oggetto del messaggio"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">Messaggio *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Scrivi il tuo messaggio..."
                          rows={5}
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Invio in corso...' : 'Invia Messaggio'}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        Inviando questo modulo accetti la nostra{' '}
                        <Link to="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Hai Bisogno di un Idraulico?
            </h2>
            <p className="text-muted-foreground mb-6">
              Se hai un problema idraulico e cerchi un professionista, 
              usa il nostro servizio di richiesta intervento.
            </p>
            <WhatsAppCTA size="lg" label="Contattaci su WhatsApp" />

          </div>
        </div>
      </section>
    </Layout>
  );
}
