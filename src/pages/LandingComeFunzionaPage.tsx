import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HelpCircle, Clock, Shield, Users, Zap, ArrowRight, Phone, Mail, Building, User, Lock, Check, X, MapPin, Bell, UserCheck, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { CityAutocomplete, ItalianCity } from '@/components/CityAutocomplete';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { usePlumberProfile } from '@/hooks/usePlumberProfile';
import { trackEvent } from '@/lib/analytics';
import type { InterventionType, AvailabilityType } from '@/lib/types';
import { INTERVENTION_LABELS, AVAILABILITY_LABELS } from '@/lib/types';

const STEPS = [
  {
    icon: UserCheck,
    step: '1',
    title: 'Crea il tuo profilo',
    description: 'Registrati gratis in 3 minuti. Inserisci i tuoi dati, le zone in cui lavori e i servizi che offri.'
  },
  {
    icon: Bell,
    step: '2',
    title: 'Ricevi notifiche',
    description: 'Quando un cliente nella tua zona cerca un idraulico, ricevi una notifica immediata via email.'
  },
  {
    icon: Phone,
    step: '3',
    title: 'Contatta il cliente',
    description: 'Visualizza i dettagli della richiesta e contatta direttamente il cliente. Nessun intermediario.'
  },
  {
    icon: CreditCard,
    step: '4',
    title: 'Lavora e guadagna',
    description: 'Gestisci il lavoro come preferisci. Noi ti mettiamo in contatto, tu fai il resto.'
  }
];

const FAQ = [
  {
    question: 'Quanto costa iscriversi?',
    answer: 'La registrazione è gratuita e hai 30 giorni di prova senza impegno. Poi scegli il piano più adatto a te.'
  },
  {
    question: 'Come ricevo le richieste?',
    answer: 'Ricevi notifiche via email quando un cliente nella tua zona cerca un idraulico. Puoi rispondere quando vuoi.'
  },
  {
    question: 'Devo pagare commissioni sui lavori?',
    answer: 'No, non prendiamo commissioni. Paghi solo un abbonamento mensile fisso per ricevere contatti.'
  },
  {
    question: 'Posso annullare quando voglio?',
    answer: 'Sì, puoi annullare il tuo abbonamento in qualsiasi momento senza penali.'
  }
];

type FormStep = 'info' | 'account' | 'services';

export default function LandingComeFunzionaPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading, signUp } = useAuth();
  const { profile, loading: profileLoading, createProfile } = usePlumberProfile();
  
  const [step, setStep] = useState<FormStep>('info');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    mainCity: '',
    interventionTypes: [] as InterventionType[],
    availability: [] as AvailabilityType[],
  });

  const [serviceAreas, setServiceAreas] = useState<string[]>([]);

  const [pendingProfileData, setPendingProfileData] = useState<{
    full_name: string;
    business_name: string;
    email: string;
    phone: string;
    main_city: string;
    description: string;
    intervention_types: InterventionType[];
    availability: AvailabilityType[];
    service_areas: string[];
  } | null>(null);

  useEffect(() => {
    if (user && profile && !authLoading && !profileLoading) {
      navigate('/dashboard');
    }
  }, [user, profile, authLoading, profileLoading, navigate]);

  useEffect(() => {
    const createPendingProfile = async () => {
      if (profileLoading) return;
      
      if (user && pendingProfileData) {
        if (profile) {
          setPendingProfileData(null);
          setIsSubmitting(false);
          toast.success('Profilo esistente! Scegli il piano di abbonamento.');
          navigate('/registrazione/piano', { state: { justRegistered: true } });
          return;
        }

        const { error: profileError } = await createProfile(pendingProfileData);
        
        if (profileError) {
          console.error('Profile creation error:', profileError);
          
          if (profileError.code === '23505') {
            setPendingProfileData(null);
            setIsSubmitting(false);
            toast.success('Profilo esistente! Scegli il piano di abbonamento.');
            navigate('/registrazione/piano', { state: { justRegistered: true } });
            return;
          }
          
          toast.error('Errore durante la creazione del profilo');
          setPendingProfileData(null);
          setIsSubmitting(false);
          return;
        }

        setPendingProfileData(null);
        setIsSubmitting(false);
        
        toast.success('Profilo creato! Ora scegli il piano di abbonamento.');
        navigate('/registrazione/piano', { state: { justRegistered: true } });
      }
    };

    createPendingProfile();
  }, [user, pendingProfileData, profile, profileLoading, createProfile, navigate]);

  const handleCityChange = (city: ItalianCity | null, displayValue: string) => {
    setFormData(prev => ({ ...prev, mainCity: displayValue }));
  };

  const handleServiceAreaSelect = (city: ItalianCity | null, displayValue: string) => {
    if (city && displayValue && !serviceAreas.includes(displayValue)) {
      setServiceAreas(prev => [...prev, displayValue]);
    }
  };

  const removeServiceArea = (cityToRemove: string) => {
    setServiceAreas(prev => prev.filter(c => c !== cityToRemove));
  };

  const toggleInterventionType = (type: InterventionType) => {
    setFormData(prev => ({
      ...prev,
      interventionTypes: prev.interventionTypes.includes(type)
        ? prev.interventionTypes.filter(t => t !== type)
        : [...prev.interventionTypes, type]
    }));
  };

  const toggleAvailability = (type: AvailabilityType) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(type)
        ? prev.availability.filter(t => t !== type)
        : [...prev.availability, type]
    }));
  };

  const selectAllInterventionTypes = () => {
    setFormData(prev => ({
      ...prev,
      interventionTypes: Object.keys(INTERVENTION_LABELS) as InterventionType[]
    }));
  };

  const deselectAllInterventionTypes = () => {
    setFormData(prev => ({ ...prev, interventionTypes: [] }));
  };

  const selectAllAvailability = () => {
    setFormData(prev => ({
      ...prev,
      availability: Object.keys(AVAILABILITY_LABELS) as AvailabilityType[]
    }));
  };

  const deselectAllAvailability = () => {
    setFormData(prev => ({ ...prev, availability: [] }));
  };

  const validateStep = (currentStep: FormStep): boolean => {
    if (currentStep === 'info') {
      if (!formData.fullName || !formData.businessName || !formData.phone || !formData.mainCity) {
        toast.error('Compila tutti i campi obbligatori');
        return false;
      }
      return true;
    }
    
    if (currentStep === 'account') {
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        toast.error('Compila tutti i campi');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error('Le password non corrispondono');
        return false;
      }
      if (formData.password.length < 12) {
        toast.error('La password deve essere di almeno 12 caratteri');
        return false;
      }
      const hasUpper = /[A-Z]/.test(formData.password);
      const hasLower = /[a-z]/.test(formData.password);
      const hasNumber = /[0-9]/.test(formData.password);
      if (!(hasUpper && hasLower && hasNumber)) {
        toast.error('La password deve includere maiuscole, minuscole e numeri');
        return false;
      }
      return true;
    }
    
    if (currentStep === 'services') {
      if (formData.interventionTypes.length === 0) {
        toast.error('Seleziona almeno un tipo di intervento');
        return false;
      }
      if (formData.availability.length === 0) {
        toast.error('Seleziona almeno una disponibilità');
        return false;
      }
      return true;
    }
    
    return true;
  };

  const nextStep = () => {
    if (step === 'info' && validateStep('info')) {
      setStep('account');
    } else if (step === 'account' && validateStep('account')) {
      setStep('services');
    }
  };

  const prevStep = () => {
    if (step === 'account') setStep('info');
    if (step === 'services') setStep('account');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep('services')) return;

    setIsSubmitting(true);
    trackEvent('plumber_registration_start', { source: 'lp_come_funziona' });

    const allServiceAreas = serviceAreas.includes(formData.mainCity)
      ? serviceAreas
      : [formData.mainCity, ...serviceAreas];

    setPendingProfileData({
      full_name: formData.fullName,
      business_name: formData.businessName,
      email: formData.email,
      phone: formData.phone,
      main_city: formData.mainCity,
      description: '',
      intervention_types: formData.interventionTypes,
      availability: formData.availability,
      service_areas: allServiceAreas,
    });

    const { error: signUpError } = await signUp(formData.email, formData.password);
    
    if (signUpError) {
      setIsSubmitting(false);
      setPendingProfileData(null);
      if (signUpError.message.includes('already registered')) {
        toast.error('Questa email è già registrata. Accedi invece.');
        navigate('/login');
      } else {
        toast.error('Errore durante la registrazione');
      }
      return;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg">
                <HelpCircle className="h-6 w-6 text-primary-foreground" />
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
      <section className="relative py-12 lg:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <HelpCircle className="h-4 w-4" />
              Come funziona
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Trova nuovi clienti in
              <span className="text-primary"> 4 semplici passi</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Idraulici Subito ti mette in contatto con clienti che cercano un idraulico nella tua zona. 
              Nessuna commissione sui lavori, solo un abbonamento mensile trasparente.
            </p>

            <Button 
              size="lg" 
              className="text-lg px-8"
              onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Inizia gratis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* How it Works Steps */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((item, index) => (
              <div key={index} className="bg-card p-6 rounded-xl border border-border relative">
                <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mb-4">
                  {item.step}
                </div>
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* FAQ */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
                Domande frequenti
              </h2>
              <div className="space-y-4">
                {FAQ.map((item, index) => (
                  <div key={index} className="bg-card p-5 rounded-xl border border-border">
                    <h4 className="font-semibold text-foreground mb-2">{item.question}</h4>
                    <p className="text-sm text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Registration Form */}
            <div id="registration-form" className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-xl">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  <Zap className="h-4 w-4" />
                  30 giorni gratis
                </div>
                <h2 className="text-2xl font-bold text-foreground">Registrati ora</h2>
                <p className="text-muted-foreground mt-1">
                  {step === 'info' && 'Passo 1: Dati attività'}
                  {step === 'account' && 'Passo 2: Crea account'}
                  {step === 'services' && 'Passo 3: Servizi offerti'}
                </p>
                
                <div className="flex justify-center gap-2 mt-4">
                  {['info', 'account', 'services'].map((s, i) => (
                    <div
                      key={s}
                      className={`h-2 w-16 rounded-full transition-colors ${
                        ['info', 'account', 'services'].indexOf(step) >= i
                          ? 'bg-primary'
                          : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Step 1: Business Info */}
                {step === 'info' && (
                  <>
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
                        <Label htmlFor="businessName">Nome Attività *</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="businessName"
                            placeholder="Idraulica Rossi"
                            className="pl-10"
                            value={formData.businessName}
                            onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                          />
                        </div>
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

                    <div className="space-y-2">
                      <Label>Altre città in cui lavori (opzionale)</Label>
                      <CityAutocomplete
                        value=""
                        onChange={handleServiceAreaSelect}
                        placeholder="Aggiungi altre città..."
                      />
                      {serviceAreas.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {serviceAreas.map((city) => (
                            <Badge key={city} variant="secondary" className="gap-1">
                              {city}
                              <button
                                type="button"
                                onClick={() => removeServiceArea(city)}
                                className="ml-1 hover:text-destructive"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <Button type="button" onClick={nextStep} className="w-full" size="lg">
                      Continua
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </>
                )}

                {/* Step 2: Account */}
                {step === 'account' && (
                  <>
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
                      <Label htmlFor="password">Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Minimo 12 caratteri"
                          className="pl-10"
                          value={formData.password}
                          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Deve contenere maiuscole, minuscole e numeri
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Conferma Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Ripeti la password"
                          className="pl-10"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                        Indietro
                      </Button>
                      <Button type="button" onClick={nextStep} className="flex-1">
                        Continua
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}

                {/* Step 3: Services */}
                {step === 'services' && (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Tipi di intervento *</Label>
                        <div className="flex gap-2">
                          <Button type="button" variant="ghost" size="sm" onClick={selectAllInterventionTypes}>
                            Seleziona tutti
                          </Button>
                          <Button type="button" variant="ghost" size="sm" onClick={deselectAllInterventionTypes}>
                            Deseleziona
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                        {(Object.entries(INTERVENTION_LABELS) as [InterventionType, string][]).map(([key, label]) => (
                          <div key={key} className="flex items-center space-x-2">
                            <Checkbox
                              id={`intervention-${key}`}
                              checked={formData.interventionTypes.includes(key)}
                              onCheckedChange={() => toggleInterventionType(key)}
                            />
                            <label
                              htmlFor={`intervention-${key}`}
                              className="text-sm cursor-pointer"
                            >
                              {label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Disponibilità *</Label>
                        <div className="flex gap-2">
                          <Button type="button" variant="ghost" size="sm" onClick={selectAllAvailability}>
                            Seleziona tutti
                          </Button>
                          <Button type="button" variant="ghost" size="sm" onClick={deselectAllAvailability}>
                            Deseleziona
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {(Object.entries(AVAILABILITY_LABELS) as [AvailabilityType, string][]).map(([key, label]) => (
                          <div key={key} className="flex items-center space-x-2">
                            <Checkbox
                              id={`availability-${key}`}
                              checked={formData.availability.includes(key)}
                              onCheckedChange={() => toggleAvailability(key)}
                            />
                            <label
                              htmlFor={`availability-${key}`}
                              className="text-sm cursor-pointer"
                            >
                              {label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                        Indietro
                      </Button>
                      <Button type="submit" className="flex-1" disabled={isSubmitting}>
                        {isSubmitting ? 'Registrazione...' : 'Registrati'}
                        <Check className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}

                <p className="text-xs text-center text-muted-foreground">
                  Registrandoti accetti i{' '}
                  <Link to="/termini" className="text-primary hover:underline">Termini di Servizio</Link>
                  {' '}e la{' '}
                  <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </p>
              </form>

              <p className="text-sm text-center text-muted-foreground mt-4">
                Hai già un account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Accedi qui
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 lg:py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
            Semplice, veloce, efficace
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Inizia oggi a ricevere richieste di lavoro nella tua zona
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="text-lg px-8"
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
