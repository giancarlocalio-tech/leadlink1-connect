import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Clock, Shield, Users, Zap, CheckCircle, ArrowRight, Phone, Mail, Building, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CityAutocomplete, ItalianCity } from '@/components/CityAutocomplete';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { usePlumberProfile } from '@/hooks/usePlumberProfile';
import { trackEvent } from '@/lib/analytics';

const BENEFITS = [
  {
    icon: MapPin,
    title: 'Solo la tua zona',
    description: 'Ricevi richieste esclusivamente dalle aree in cui operi'
  },
  {
    icon: Clock,
    title: 'Notifiche immediate',
    description: 'Ricevi avvisi in tempo reale quando arrivano nuovi lavori'
  },
  {
    icon: Users,
    title: 'Clienti reali',
    description: 'Contatti verificati di persone che hanno bisogno di te ora'
  },
  {
    icon: Shield,
    title: 'Zero rischi',
    description: '30 giorni di prova gratuita, nessun vincolo'
  }
];

const STATS = [
  { value: '500+', label: 'Richieste al mese' },
  { value: '85%', label: 'Tasso di risposta' },
  { value: '4.8/5', label: 'Valutazione media' }
];

export default function LandingLavoriZonaPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { createProfile } = usePlumberProfile();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    mainCity: ''
  });

  const handleCityChange = (city: ItalianCity | null, displayValue: string) => {
    setFormData(prev => ({
      ...prev,
      mainCity: displayValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone || !formData.mainCity) {
      toast.error('Compila tutti i campi obbligatori');
      return;
    }

    setIsSubmitting(true);
    trackEvent('plumber_registration_start', { source: 'lp_lavori_zona' });

    // Generate a temporary password
    const tempPassword = Math.random().toString(36).slice(-12) + 'A1!';
    
    const { error: signUpError } = await signUp(formData.email, tempPassword);
    
    if (signUpError) {
      setIsSubmitting(false);
      if (signUpError.message.includes('already registered')) {
        toast.error('Email già registrata. Accedi invece.');
        navigate('/login');
      } else {
        toast.error('Errore durante la registrazione');
      }
      return;
    }

    // Store data for profile creation after email verification
    localStorage.setItem('pendingPlumberProfile', JSON.stringify({
      ...formData,
      businessName: formData.businessName || formData.fullName
    }));

    setIsSubmitting(false);
    toast.success('Registrazione completata! Controlla la tua email.');
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg">
                <MapPin className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Idraulici Subito</span>
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="sm">Accedi</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <MapPin className="h-4 w-4" />
                Lavori nella tua zona
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Trova clienti
                <span className="text-primary block">vicino a te</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                Ricevi richieste di lavoro nella tua zona. Nessuno spostamento inutile, 
                solo clienti che hanno bisogno di un idraulico <strong>adesso</strong>.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {STATS.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="lg:hidden">
                <Button 
                  size="lg" 
                  className="w-full text-lg py-6"
                  onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Inizia gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Registration Form */}
            <div id="registration-form" className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-xl">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  <Zap className="h-4 w-4" />
                  30 giorni gratis
                </div>
                <h2 className="text-2xl font-bold text-foreground">Registrati in 2 minuti</h2>
                <p className="text-muted-foreground mt-1">Inizia a ricevere lavori oggi stesso</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nome e Cognome *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        placeholder="Mario Rossi"
                        className="pl-10"
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessName">Nome Attività</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="businessName"
                        placeholder="Idraulica Rossi (opzionale)"
                        className="pl-10"
                        value={formData.businessName}
                        onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="mario@email.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefono *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+39 333 1234567"
                      className="pl-10"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Città principale di lavoro *</Label>
                  <CityAutocomplete
                    value={formData.mainCity}
                    onChange={handleCityChange}
                    placeholder="Cerca la tua città..."
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full text-lg py-6" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Registrazione...' : 'Inizia la prova gratuita'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Registrandoti accetti i{' '}
                  <Link to="/termini" className="text-primary hover:underline">Termini di Servizio</Link>
                  {' '}e la{' '}
                  <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Perché scegliere Idraulici Subito?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              La piattaforma pensata per farti lavorare di più, spostarti di meno
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((benefit, index) => (
              <div 
                key={index}
                className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Come funziona
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '1', title: 'Registrati gratis', desc: 'Crea il tuo profilo in 2 minuti' },
              { step: '2', title: 'Ricevi richieste', desc: 'Notifiche per lavori nella tua zona' },
              { step: '3', title: 'Contatta i clienti', desc: 'Scegli quali lavori accettare' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Pronto a trovare nuovi clienti?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Unisciti a centinaia di idraulici che già usano Idraulici Subito per far crescere la loro attività
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="text-lg px-8 py-6"
            onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Inizia la prova gratuita
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded">
                <MapPin className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Idraulici Subito</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
              <Link to="/termini" className="hover:text-foreground">Termini</Link>
              <Link to="/" className="hover:text-foreground">Home</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Idraulici Subito. Tutti i diritti riservati.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
