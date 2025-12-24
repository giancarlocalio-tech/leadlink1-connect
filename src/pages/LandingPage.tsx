import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Droplets, 
  Wrench, 
  Flame, 
  ArrowRight,
  CheckCircle,
  Clock,
  Shield,
  Star,
  Phone,
  Users,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CityAutocomplete, type ItalianCity } from '@/components/CityAutocomplete';
import analytics from '@/lib/analytics';

// Simplified intervention types for landing page
const QUICK_SERVICES = [
  { id: 'perdita_acqua', label: 'Perdita d\'acqua', icon: Droplets },
  { id: 'caldaia', label: 'Caldaia', icon: Flame },
  { id: 'sturare_spurgo', label: 'Scarico intasato', icon: Wrench },
  { id: 'altro', label: 'Altro intervento', icon: Wrench },
] as const;

const TRUST_SIGNALS = [
  { icon: Clock, text: 'Risposta in 15 min', subtext: 'Media tempo di contatto' },
  { icon: Shield, text: 'Professionisti verificati', subtext: '100% controllati' },
  { icon: Star, text: '4.8/5 Rating', subtext: 'Basato su 500+ recensioni' },
];

const TESTIMONIALS = [
  {
    name: 'Marco R.',
    city: 'Milano',
    text: 'Perdita urgente alle 22:00, mi hanno ricontattato in 10 minuti. Problema risolto!',
    rating: 5,
  },
  {
    name: 'Laura B.',
    city: 'Roma',
    text: 'Finalmente un servizio affidabile. Idraulico professionale e prezzi onesti.',
    rating: 5,
  },
  {
    name: 'Giuseppe M.',
    city: 'Napoli',
    text: 'Caldaia rotta d\'inverno. Intervento rapido e risolutivo. Consigliatissimo!',
    rating: 5,
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [city, setCity] = useState('');
  const [selectedCity, setSelectedCity] = useState<ItalianCity | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // Track source from URL params (utm_source, gclid, etc.)
  const source = searchParams.get('utm_source') || searchParams.get('gclid') ? 'google_ads' : 'direct';

  useEffect(() => {
    // SEO Meta tags for landing page
    document.title = "Idraulico Urgente? Trova Professionisti in 15 Minuti | Idraulici Subito";
    
    // Track page view
    analytics.pageView('/lp/idraulico', 'Landing Page - Google Ads');
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Cerchi un idraulico urgente? Trova professionisti verificati nella tua zona. Risposta garantita in 15 minuti. Preventivo gratuito e senza impegno.');
    }
  }, []);

  const handleCityChange = (cityData: ItalianCity | null, displayValue: string) => {
    setCity(displayValue);
    setSelectedCity(cityData);
  };

  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId);
    analytics.leadFormStart(serviceId, source);
    
    // Scroll to form
    document.getElementById('request-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = () => {
    if (!selectedService || !city.trim()) return;

    analytics.ctaClick('landing_cta_submit', 'hero_form');
    
    navigate('/richiesta', {
      state: {
        interventionType: selectedService,
        answers: [],
        city: city.trim(),
        cityData: selectedCity,
        source: source,
      },
    });
  };

  const handleMainCTA = () => {
    analytics.ctaClick('landing_cta_main', 'hero');
    document.getElementById('request-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
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
          <a 
            href="tel:+39XXXXXXXXX" 
            className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            onClick={() => analytics.ctaClick('phone_header', 'header')}
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">Chiama ora</span>
          </a>
        </div>
      </header>

      {/* Hero Section - Above the fold */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Urgency Badge */}
            <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse">
              <Zap className="h-4 w-4" />
              Idraulici disponibili ora nella tua zona
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Trova un Idraulico<br />
              <span className="text-primary">in 15 Minuti</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Professionisti verificati, preventivo gratuito e senza impegno.
              <strong className="text-foreground"> Oltre 500 idraulici</strong> pronti ad aiutarti.
            </p>

            <Button 
              size="lg" 
              className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
              onClick={handleMainCTA}
            >
              Richiedi Preventivo Gratuito
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {TRUST_SIGNALS.map((signal, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <signal.icon className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">{signal.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Service Selection + Form */}
      <section id="request-form" className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Di cosa hai bisogno?
            </h2>

            {/* Service buttons */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {QUICK_SERVICES.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceClick(service.id)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                    selectedService === service.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-background hover:border-primary/50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    selectedService === service.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    <service.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-foreground">{service.label}</span>
                </button>
              ))}
            </div>

            {/* City input */}
            <div className="bg-background rounded-xl border border-border p-6 shadow-lg">
              <label className="block text-sm font-medium text-foreground mb-2">
                In quale città ti trovi?
              </label>
              <CityAutocomplete
                value={city}
                onChange={handleCityChange}
                placeholder="Es. Milano, Roma, Napoli..."
                className="mb-4"
              />
              
              <Button 
                className="w-full py-6 text-lg"
                disabled={!selectedService || !city.trim()}
                onClick={handleSubmit}
              >
                Trova Idraulico Ora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-4">
                <CheckCircle className="inline h-4 w-4 text-success mr-1" />
                Gratuito e senza impegno • Risposta in 15 min
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">
            Cosa dicono i nostri clienti
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TESTIMONIALS.map((testimonial, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground mb-4">"{testimonial.text}"</p>
                <p className="text-sm text-muted-foreground">
                  <strong>{testimonial.name}</strong> • {testimonial.city}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works - Simplified */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">Come funziona</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Descrivi il problema</h3>
              <p className="text-muted-foreground text-sm">
                Seleziona il servizio e indica la tua città
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Ricevi contatto</h3>
              <p className="text-muted-foreground text-sm">
                Un idraulico della zona ti contatta in 15 min
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Problema risolto</h3>
              <p className="text-muted-foreground text-sm">
                Concordi l'intervento e il professionista arriva
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Hai un'emergenza idraulica?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Non aspettare che il problema peggiori. Richiedi ora un preventivo gratuito.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="text-lg px-8 py-6"
            onClick={handleMainCTA}
          >
            <Users className="mr-2 h-5 w-5" />
            Trova Idraulico Ora
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
  );
}
