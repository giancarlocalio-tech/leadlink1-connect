import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  Star, 
  Users, 
  TrendingUp, 
  Shield, 
  Clock,
  Phone,
  Mail,
  MapPin,
  Wrench,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { usePlumberProfile } from '@/hooks/usePlumberProfile';

import { toast } from 'sonner';
import type { InterventionType, AvailabilityType } from '@/lib/types';
import { INTERVENTION_LABELS, AVAILABILITY_LABELS } from '@/lib/types';
import { CityAutocomplete, type ItalianCity } from '@/components/CityAutocomplete';

const INTERVENTION_TYPES: InterventionType[] = [
  'installazione_sostituzione',
  'perdita_acqua',
  'sturare_spurgo',
  'riparazione',
  'impianto_idraulico',
  'box_doccia',
  'caldaia',
  'impianto_riscaldamento',
  'termoidraulico',
  'condizionatori',
  'ristrutturazione',
  'certificazione',
  'termosifone',
  'contatore',
  'addolcitore_acqua',
  'depuratore_acqua',
  'sostituzione_rubinetto',
  'rubinetto_rotto',
  'scarico_intasato',
  'altro',
];

const AVAILABILITY_TYPES: AvailabilityType[] = [
  'giorni_feriali',
  'weekend',
  'emergenze',
];

const BENEFITS = [
  {
    icon: Users,
    title: 'Clienti Qualificati',
    description: 'Ricevi solo richieste reali da clienti che hanno bisogno dei tuoi servizi'
  },
  {
    icon: TrendingUp,
    title: 'Cresci il tuo Business',
    description: 'Aumenta il tuo fatturato ricevendo nuovi lavori ogni giorno'
  },
  {
    icon: Shield,
    title: 'Zero Rischi',
    description: 'Nessun costo fisso, paghi solo per i contatti che accetti'
  },
  {
    icon: Clock,
    title: 'Risparmia Tempo',
    description: 'Ricevi le richieste direttamente via email, senza perdere tempo a cercare clienti'
  }
];

const TESTIMONIALS = [
  {
    name: 'Marco R.',
    city: 'Milano',
    rating: 5,
    text: 'Da quando uso Idraulici Subito ho aumentato il mio fatturato del 40%. I clienti sono sempre qualificati.'
  },
  {
    name: 'Giuseppe L.',
    city: 'Roma',
    rating: 5,
    text: 'Finalmente un servizio serio. Le richieste arrivano puntuali e i clienti sanno già cosa vogliono.'
  },
  {
    name: 'Antonio M.',
    city: 'Napoli',
    rating: 5,
    text: 'Ho iniziato con il piano base e ora sono premium. I lavori non mancano mai!'
  }
];

export default function PlumberLandingPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading, signUp } = useAuth();
  const { profile, createProfile, loading: profileLoading } = usePlumberProfile();
  
  const [step, setStep] = useState<'info' | 'account' | 'services'>('info');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    phone: '',
    email: '',
    password: '',
    mainCity: '',
    interventionTypes: [] as InterventionType[],
    availability: [] as AvailabilityType[],
    privacyAccepted: false,
  });

  // Store pending profile data for creation after auth
  const [pendingProfileData, setPendingProfileData] = useState<{
    full_name: string;
    business_name: string;
    email: string;
    phone: string;
    main_city: string;
    description: string | null;
    intervention_types: InterventionType[];
    availability: AvailabilityType[];
    service_areas: string[];
  } | null>(null);

  // SEO meta tags
  useEffect(() => {
    document.title = 'Diventa Partner Idraulici Subito | Trova Nuovi Clienti';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Registrati come idraulico partner e ricevi richieste di lavoro qualificate nella tua zona. Aumenta il tuo fatturato con Idraulici Subito.');
    }
  }, []);

  // Redirect solo se non stiamo registrando e l'utente ha già un profilo
  useEffect(() => {
    if (user && profile && !authLoading && !profileLoading && !isRegistering && !pendingProfileData) {
      navigate('/dashboard');
    }
  }, [user, profile, authLoading, profileLoading, navigate, isRegistering, pendingProfileData]);

  // Create profile after successful signup
  useEffect(() => {
    const createPendingProfile = async () => {
      if (profileLoading) return;
      
      if (user && pendingProfileData) {
        // If profile already exists, go to dashboard
        if (profile) {
          setPendingProfileData(null);
          setIsSubmitting(false);
          setIsRegistering(false);
          toast.success('Bentornato!');
          navigate('/dashboard');
          return;
        }

        const { error: profileError } = await createProfile(pendingProfileData);
        
        if (profileError) {
          console.error('Profile creation error:', profileError);
          
          // Handle duplicate key error - profile already exists
          if ((profileError as any).code === '23505') {
            setPendingProfileData(null);
            setIsSubmitting(false);
            setIsRegistering(false);
            toast.success('Bentornato!');
            navigate('/dashboard');
            return;
          }
          
          toast.error('Errore durante la creazione del profilo');
          setPendingProfileData(null);
          setIsSubmitting(false);
          setIsRegistering(false);
          return;
        }

        setPendingProfileData(null);
        setIsSubmitting(false);
        setIsRegistering(false);
        
        toast.success('Registrazione completata! Hai 3 richieste gratuite per iniziare.');
        navigate('/dashboard');
      }
    };

    createPendingProfile();
  }, [user, pendingProfileData, profile, profileLoading, createProfile, navigate]);

  const toggleInterventionType = (type: InterventionType) => {
    setFormData(prev => ({
      ...prev,
      interventionTypes: prev.interventionTypes.includes(type)
        ? prev.interventionTypes.filter(t => t !== type)
        : [...prev.interventionTypes, type],
    }));
  };

  const toggleAllInterventions = () => {
    setFormData(prev => ({
      ...prev,
      interventionTypes: prev.interventionTypes.length === INTERVENTION_TYPES.length 
        ? [] 
        : [...INTERVENTION_TYPES],
    }));
  };

  const toggleAvailability = (type: AvailabilityType) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(type)
        ? prev.availability.filter(t => t !== type)
        : [...prev.availability, type],
    }));
  };

  const handleNextStep = () => {
    if (step === 'info') {
      if (!formData.fullName || !formData.businessName || !formData.phone || !formData.mainCity) {
        toast.error('Compila tutti i campi obbligatori');
        return;
      }
      setStep('account');
    } else if (step === 'account') {
      if (!formData.email || !formData.password) {
        toast.error('Inserisci email e password');
        return;
      }
      if (formData.password.length < 12) {
        toast.error('La password deve essere di almeno 12 caratteri');
        return;
      }
      const hasUpper = /[A-Z]/.test(formData.password);
      const hasLower = /[a-z]/.test(formData.password);
      const hasNumber = /[0-9]/.test(formData.password);
      if (!(hasUpper && hasLower && hasNumber)) {
        toast.error('La password deve includere maiuscole, minuscole e numeri');
        return;
      }
      setStep('services');
    }
  };

  const handleSubmit = async () => {
    if (!formData.privacyAccepted) {
      toast.error('Devi accettare la privacy policy');
      return;
    }
    
    if (formData.interventionTypes.length === 0) {
      toast.error('Seleziona almeno un tipo di intervento');
      return;
    }
    
    if (formData.availability.length === 0) {
      toast.error('Seleziona almeno una disponibilità');
      return;
    }

    setIsSubmitting(true);
    setIsRegistering(true);

    // Store profile data for creation after auth
    setPendingProfileData({
      full_name: formData.fullName,
      business_name: formData.businessName,
      email: formData.email,
      phone: formData.phone,
      main_city: formData.mainCity,
      description: null,
      intervention_types: formData.interventionTypes,
      availability: formData.availability,
      service_areas: [formData.mainCity],
    });

    const { error: signUpError } = await signUp(formData.email, formData.password);
    
    if (signUpError) {
      setIsSubmitting(false);
      setIsRegistering(false);
      setPendingProfileData(null);
      if (signUpError.message.includes('already registered')) {
        toast.error('Email già registrata. Prova ad accedere.');
        navigate('/login');
      } else {
        toast.error(signUpError.message);
      }
      return;
    }
    // Profile creation handled by useEffect
  };

  const scrollToForm = () => {
    document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="h-4 w-4 fill-current" />
                Oltre 500 idraulici già registrati
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Ricevi <span className="text-primary">nuovi clienti</span> ogni giorno
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Unisciti alla rete di idraulici professionisti più grande d'Italia. 
                Ricevi richieste qualificate direttamente via email e fai crescere il tuo business.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={scrollToForm} className="text-lg px-8">
                  Inizia Gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/auth')}>
                  Hai già un account?
                </Button>
              </div>
              
              <div className="flex items-center gap-6 mt-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center">
                      <Wrench className="h-5 w-5 text-primary" />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">+1200</span> lavori completati questo mese
                </p>
              </div>
            </div>
            
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl"></div>
                <div className="relative bg-card rounded-2xl border border-border p-8 shadow-xl">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Wrench className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Diventa Partner</h3>
                    <p className="text-muted-foreground">Registrazione gratuita in 2 minuti</p>
                  </div>
                  
                  <div className="space-y-4">
                    {['Richieste qualificate', 'Nessun costo fisso', 'Dashboard dedicata', 'Supporto 24/7'].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Perché scegliere Idraulici Subito?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              La piattaforma più semplice e conveniente per trovare nuovi clienti nella tua zona
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((benefit, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cosa dicono i nostri partner
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-warning text-warning" />
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

      {/* Registration Form */}
      <section id="registration-form" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Registrati ora
              </h2>
              <p className="text-lg text-muted-foreground">
                Inizia a ricevere nuovi clienti in pochi minuti
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-8">
              {['info', 'account', 'services'].map((s, i) => (
                <div key={s} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    step === s 
                      ? 'bg-primary text-primary-foreground' 
                      : ['info', 'account', 'services'].indexOf(step) > i 
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {i + 1}
                  </div>
                  {i < 2 && (
                    <div className={`w-12 md:w-24 h-1 mx-2 rounded ${
                      ['info', 'account', 'services'].indexOf(step) > i 
                        ? 'bg-primary' 
                        : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            <div className="bg-card rounded-xl border border-border p-6 md:p-8">
              {step === 'info' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Informazioni attività
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName" className="mb-2 block">Nome e Cognome *</Label>
                      <Input
                        id="fullName"
                        placeholder="Mario Rossi"
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessName" className="mb-2 block">Nome Attività *</Label>
                      <Input
                        id="businessName"
                        placeholder="Idraulica Rossi"
                        value={formData.businessName}
                        onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="mb-2 block">Telefono *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+39 333 1234567"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="mainCity" className="mb-2 block">Città principale *</Label>
                      <CityAutocomplete
                        value={formData.mainCity}
                        onChange={(city, displayValue) => setFormData(prev => ({ ...prev, mainCity: displayValue }))}
                        placeholder="Cerca la tua città..."
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleNextStep} className="w-full" size="lg">
                    Continua
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}

              {step === 'account' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Crea il tuo account
                  </h3>
                  
                  <div>
                    <Label htmlFor="email" className="mb-2 block">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="mario@idraulicarossi.it"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="password" className="mb-2 block">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Minimo 6 caratteri"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep('info')} className="flex-1">
                      Indietro
                    </Button>
                    <Button onClick={handleNextStep} className="flex-1">
                      Continua
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 'services' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-primary" />
                    I tuoi servizi
                  </h3>
                  
                  {/* Intervention Types */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-base">Tipi di intervento *</Label>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={toggleAllInterventions}
                      >
                        {formData.interventionTypes.length === INTERVENTION_TYPES.length 
                          ? 'Deseleziona tutti' 
                          : 'Seleziona tutti'
                        }
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {INTERVENTION_TYPES.map((type) => (
                        <div
                          key={type}
                          onClick={() => toggleInterventionType(type)}
                          className={`cursor-pointer p-3 rounded-lg border text-sm transition-colors ${
                            formData.interventionTypes.includes(type)
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border bg-card hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={formData.interventionTypes.includes(type)}
                              className="pointer-events-none"
                            />
                            <span className="truncate">{INTERVENTION_LABELS[type]}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Availability */}
                  <div>
                    <Label className="text-base mb-3 block">Disponibilità *</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {AVAILABILITY_TYPES.map((type) => (
                        <div
                          key={type}
                          onClick={() => toggleAvailability(type)}
                          className={`cursor-pointer p-3 rounded-lg border text-sm text-center transition-colors ${
                            formData.availability.includes(type)
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border bg-card hover:border-primary/50'
                          }`}
                        >
                          {AVAILABILITY_LABELS[type]}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Privacy */}
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="privacy"
                      checked={formData.privacyAccepted}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, privacyAccepted: checked as boolean }))
                      }
                    />
                    <Label htmlFor="privacy" className="font-normal text-sm text-muted-foreground">
                      Accetto la{' '}
                      <a href="/privacy" target="_blank" className="text-primary hover:underline">
                        privacy policy
                      </a>{' '}
                      e i{' '}
                      <a href="/termini" target="_blank" className="text-primary hover:underline">
                        termini di servizio
                      </a>
                    </Label>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep('account')} className="flex-1">
                      Indietro
                    </Button>
                    <Button 
                      onClick={handleSubmit} 
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? 'Registrazione...' : 'Completa Registrazione'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto a far crescere il tuo business?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Unisciti a centinaia di idraulici professionisti che hanno già scelto Idraulici Subito
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={scrollToForm}
            className="text-lg px-8"
          >
            Registrati Gratis Ora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </Layout>
  );
}
