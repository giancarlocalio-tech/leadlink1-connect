import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Check, 
  Star, 
  Users, 
  TrendingUp, 
  Shield, 
  Clock,
  Wrench,
  ArrowRight,
  Phone,
  Zap,
  Euro,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CityAutocomplete, type ItalianCity } from '@/components/CityAutocomplete';
import analytics from '@/lib/analytics';

// Benefits for plumbers
const BENEFITS = [
  { icon: Target, title: 'Clienti Qualificati', desc: 'Solo richieste reali, niente perdite di tempo' },
  { icon: Euro, title: 'Zero Costi Fissi', desc: 'Paghi solo per i contatti che accetti' },
  { icon: Clock, title: 'Risparmia Tempo', desc: 'Le richieste arrivano direttamente a te' },
  { icon: TrendingUp, title: '+40% Fatturato', desc: 'Risultato medio dei nostri partner' },
];

const STATS = [
  { value: '500+', label: 'Idraulici Partner' },
  { value: '10k+', label: 'Richieste al Mese' },
  { value: '15 min', label: 'Tempo Medio Risposta' },
  { value: '4.8/5', label: 'Soddisfazione Clienti' },
];

const TESTIMONIALS = [
  {
    name: 'Marco R.',
    city: 'Milano',
    text: 'Da quando uso Idraulici Subito ho aumentato il mio fatturato del 40%. Clienti sempre qualificati.',
    rating: 5,
  },
  {
    name: 'Giuseppe L.',
    city: 'Roma', 
    text: 'Finalmente un servizio serio. Le richieste arrivano puntuali e i clienti sanno già cosa vogliono.',
    rating: 5,
  },
  {
    name: 'Antonio M.',
    city: 'Napoli',
    text: 'Ho iniziato con il piano base e ora sono premium. I lavori non mancano mai!',
    rating: 5,
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [city, setCity] = useState('');
  const [selectedCity, setSelectedCity] = useState<ItalianCity | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Track source from URL params
  const source = searchParams.get('utm_source') || (searchParams.get('gclid') ? 'google_ads' : 'direct');

  useEffect(() => {
    // Track page view
    analytics.pageView('/lp/idraulico', 'Landing Page Idraulici - Google Ads');
  }, []);

  const handleCityChange = (cityData: ItalianCity | null, displayValue: string) => {
    setCity(displayValue);
    setSelectedCity(cityData);
  };

  const scrollToForm = () => {
    analytics.ctaClick('hero_cta', 'hero');
    document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleQuickStart = () => {
    analytics.plumberRegistrationStart();
    analytics.ctaClick('quick_start', 'form');
    
    // Navigate to full registration with pre-filled data
    navigate('/per-idraulici', {
      state: {
        prefill: {
          name,
          phone,
          city,
          source,
        }
      }
    });
  };

  const handleFullRegistration = () => {
    analytics.plumberRegistrationStart();
    analytics.ctaClick('full_registration', 'hero');
    navigate('/per-idraulici');
  };

  return (
    <>
      <Helmet>
        <title>Cerchi Nuovi Clienti? Diventa Partner Idraulici Subito | +40% Fatturato</title>
        <meta name="description" content="Sei un idraulico? Ricevi richieste qualificate ogni giorno. Nessun costo fisso, paghi solo per i contatti. Registrazione gratuita in 2 minuti." />
        <link rel="canonical" href="https://idraulicisubito.com/lp/idraulico" />
        <meta property="og:title" content="Cerchi Nuovi Clienti? Diventa Partner Idraulici Subito" />
        <meta property="og:description" content="Sei un idraulico? Ricevi richieste qualificate ogni giorno. Nessun costo fisso." />
        <meta property="og:url" content="https://idraulicisubito.com/lp/idraulico" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
    <div className="min-h-screen bg-background">
      {/* Minimal Header */}
      <header className="py-4 px-4 border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Wrench className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">Idraulici Subito</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleFullRegistration}>
            Accedi
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Urgency Badge */}
            <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              Oltre 500 idraulici stanno già ricevendo nuovi clienti
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Ricevi <span className="text-primary">Nuovi Clienti</span><br />
              Ogni Giorno
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Sei un idraulico professionista? Unisciti alla rete più grande d'Italia.
              <strong className="text-foreground"> Nessun costo fisso</strong>, paghi solo per i contatti che accetti.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                onClick={scrollToForm}
              >
                Inizia Gratis Ora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6"
                onClick={() => navigate('/auth')}
              >
                Hai già un account?
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {STATS.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Registration Form */}
      <section id="registration-form" className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Registrati in 2 Minuti
              </h2>
              <p className="text-muted-foreground">
                Inizia subito a ricevere richieste nella tua zona
              </p>
            </div>

            <div className="bg-background rounded-xl border border-border p-6 shadow-lg">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nome e Cognome
                  </label>
                  <Input
                    placeholder="Es. Mario Rossi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Telefono
                  </label>
                  <Input
                    type="tel"
                    placeholder="Es. 333 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    In quale città operi?
                  </label>
                  <CityAutocomplete
                    value={city}
                    onChange={handleCityChange}
                    placeholder="Es. Milano, Roma, Napoli..."
                  />
                </div>
                
                <Button 
                  className="w-full py-6 text-lg"
                  onClick={handleQuickStart}
                >
                  Continua Registrazione
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  <Shield className="inline h-4 w-4 mr-1" />
                  Gratuito • Nessun impegno • Cancella quando vuoi
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Perché scegliere Idraulici Subito?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {BENEFITS.map((benefit, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">
            Cosa dicono i nostri partner
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TESTIMONIALS.map((testimonial, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-primary">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">Come funziona</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Registrati Gratis</h3>
              <p className="text-muted-foreground text-sm">
                Crea il tuo profilo in 2 minuti indicando la tua zona e i servizi offerti
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Ricevi Richieste</h3>
              <p className="text-muted-foreground text-sm">
                I clienti della tua zona inviano richieste e tu ricevi notifiche via email
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Contatta e Lavora</h3>
              <p className="text-muted-foreground text-sm">
                Accetta le richieste, contatta il cliente e concludi il lavoro
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Pronto a far crescere il tuo business?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Unisciti a oltre 500 idraulici che ogni giorno ricevono nuovi clienti con Idraulici Subito.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="text-lg px-8 py-6"
            onClick={scrollToForm}
          >
            <Users className="mr-2 h-5 w-5" />
            Inizia Gratis Ora
          </Button>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Idraulici Subito. Tutti i diritti riservati.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="/privacy" className="hover:text-foreground">Privacy</a>
              <a href="/termini" className="hover:text-foreground">Termini</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
