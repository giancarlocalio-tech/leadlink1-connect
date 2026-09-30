import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Wrench, Mail, Lock, User, Phone, Building, Users, Clock, Shield,
  Star, Zap, X, MapPin, Check, ArrowLeft, ArrowRight, Briefcase,
  CalendarDays, Sparkles, CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { usePlumberProfile } from '@/hooks/usePlumberProfile';
import { toast } from 'sonner';
import { CityAutocomplete } from '@/components/CityAutocomplete';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import type { InterventionType, AvailabilityType } from '@/lib/types';
import { INTERVENTION_LABELS, AVAILABILITY_LABELS } from '@/lib/types';

type AuthMode = 'register' | 'login' | 'forgot-password' | 'reset-password';

// Siena palette (azzurro acqua) — applied locally via CSS vars override
const SIENA_THEME = {
  ['--primary' as any]: '199 89% 48%',
  ['--primary-foreground' as any]: '0 0% 100%',
  ['--accent' as any]: '199 89% 94%',
  ['--accent-foreground' as any]: '215 55% 20%',
  ['--ring' as any]: '199 89% 48%',
  ['--secondary' as any]: '199 70% 96%',
  ['--secondary-foreground' as any]: '215 55% 20%',
};

const PERKS = [
  { icon: Zap, label: 'Notifiche istantanee' },
  { icon: MapPin, label: 'Solo nella tua zona' },
  { icon: Shield, label: 'Paghi solo i contatti che sblocchi' },
  { icon: Star, label: 'Costruisci la tua reputazione' },
];

export default function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading: authLoading, signIn, signUp, resetPassword, updatePassword } = useAuth();
  const { profile, loading: profileLoading, createProfile } = usePlumberProfile();

  const getInitialMode = (): AuthMode => {
    const urlMode = searchParams.get('mode');
    if (urlMode === 'login') return 'login';
    if (urlMode === 'forgot-password') return 'forgot-password';
    if (urlMode === 'reset-password') return 'reset-password';
    return 'register';
  };

  const [mode, setMode] = useState<AuthMode>(getInitialMode());
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Multi-step register: 1 = account, 2 = servizi/zone
  const [step, setStep] = useState<1 | 2>(1);

  // Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Forgot/reset
  const [forgotEmail, setForgotEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Register form
  const [registerData, setRegisterData] = useState({
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

  useEffect(() => {
    if (mode === 'reset-password') return;
    if (user && !authLoading && !profileLoading) {
      const returnUrl = searchParams.get('returnUrl');
      if (returnUrl) navigate(decodeURIComponent(returnUrl));
      else navigate('/dashboard');
    }
  }, [user, profile, authLoading, profileLoading, navigate, mode, searchParams]);

  // --- Handlers ---
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return toast.error('Inserisci la tua email');
    setIsSubmitting(true);
    const { error } = await resetPassword(forgotEmail);
    setIsSubmitting(false);
    if (error) toast.error("Errore durante l'invio dell'email");
    else {
      setEmailSent(true);
      toast.success('Email inviata! Controlla la tua casella di posta');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmNewPassword) return toast.error('Compila tutti i campi');
    if (newPassword !== confirmNewPassword) return toast.error('Le password non corrispondono');
    if (newPassword.length < 12) return toast.error('La password deve essere di almeno 12 caratteri');
    if (!/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      return toast.error('La password deve includere maiuscole, minuscole e numeri');
    }
    setIsSubmitting(true);
    const { error } = await updatePassword(newPassword);
    setIsSubmitting(false);
    if (error) toast.error("Errore durante l'aggiornamento della password");
    else {
      toast.success('Password aggiornata con successo!');
      navigate('/dashboard');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return toast.error('Inserisci email e password');
    setIsSubmitting(true);
    const { error } = await signIn(loginEmail, loginPassword);
    setIsSubmitting(false);
    if (error) {
      if (error.message.includes('Invalid login credentials')) toast.error('Credenziali non valide');
      else toast.error('Errore durante il login');
    }
  };

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
    plan_type: 'basic';
  } | null>(null);

  useEffect(() => {
    const run = async () => {
      if (user && pendingProfileData && !profile) {
        const { plan_type, ...profileData } = pendingProfileData;
        const { error: profileError } = await createProfile(profileData);
        if (profileError) {
          console.error('Profile creation error:', profileError);
          toast.error('Errore durante la creazione del profilo');
          setPendingProfileData(null);
          setIsSubmitting(false);
          return;
        }
        setPendingProfileData(null);
        setIsSubmitting(false);
        toast.success('Registrazione completata! Ricarica il saldo per iniziare a sbloccare contatti.');
        navigate('/dashboard');
      }
    };
    run();
  }, [user, pendingProfileData, profile, createProfile, navigate]);

  const validateStep1 = (): boolean => {
    if (!registerData.fullName || !registerData.businessName || !registerData.email ||
        !registerData.phone || !registerData.mainCity) {
      toast.error('Compila tutti i campi obbligatori');
      return false;
    }
    if (!registerData.password || !registerData.confirmPassword) {
      toast.error('Inserisci e conferma la password');
      return false;
    }
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Le password non corrispondono');
      return false;
    }
    if (registerData.password.length < 12) {
      toast.error('La password deve essere di almeno 12 caratteri');
      return false;
    }
    if (!/[A-Z]/.test(registerData.password) || !/[a-z]/.test(registerData.password) || !/[0-9]/.test(registerData.password)) {
      toast.error('La password deve includere maiuscole, minuscole e numeri');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateStep1()) { setStep(1); return; }
    if (registerData.interventionTypes.length === 0) return toast.error('Seleziona almeno un tipo di intervento');
    if (registerData.availability.length === 0) return toast.error('Seleziona almeno una disponibilità');

    setIsSubmitting(true);
    const finalServiceAreas = serviceAreas.includes(registerData.mainCity)
      ? serviceAreas
      : [registerData.mainCity, ...serviceAreas];

    setPendingProfileData({
      full_name: registerData.fullName,
      business_name: registerData.businessName,
      email: registerData.email,
      phone: registerData.phone,
      main_city: registerData.mainCity,
      description: '',
      intervention_types: registerData.interventionTypes,
      availability: registerData.availability,
      service_areas: finalServiceAreas,
      plan_type: 'basic',
    });

    const { error: signUpError } = await signUp(registerData.email, registerData.password);
    if (signUpError) {
      setIsSubmitting(false);
      setPendingProfileData(null);
      if (signUpError.message.includes('already registered')) toast.error('Questa email è già registrata');
      else toast.error('Errore durante la registrazione');
    }
  };

  const allInterventions = useMemo(() => Object.entries(INTERVENTION_LABELS), []);
  const allAvailability = useMemo(() => Object.entries(AVAILABILITY_LABELS), []);

  if (authLoading) {
    return (
      <Layout>
        <div className="py-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Registrazione Idraulici | Idraulici Subito</title>
        <meta name="description" content="Registrati come idraulico professionista su Idraulici Subito. Ricevi richieste di lavoro nella tua zona e trova nuovi clienti." />
        <link rel="canonical" href="https://www.idraulicisubito.com/auth" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div style={SIENA_THEME} className="relative">
        {/* Soft background gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-secondary/40 via-background to-accent/30 pointer-events-none" />

        <div className="container mx-auto px-4 py-8 md:py-14">
          {/* ============ REGISTER ============ */}
          {mode === 'register' && (
            <div className="max-w-5xl mx-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                  <Sparkles className="h-4 w-4" />
                  Iscrizione gratuita · 2 minuti
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight leading-[1.05] mb-3">
                  Diventa <span className="text-primary">idraulico verificato</span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                  Ricevi richieste reali nella tua zona. Ricarica il saldo quando vuoi, paghi solo i contatti che sblocchi.
                </p>
              </div>

              {/* Perk strip */}
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8">
                {PERKS.map((p) => (
                  <div key={p.label} className="flex items-center gap-2 bg-card/80 backdrop-blur border border-border rounded-full px-3.5 py-1.5 shadow-sm">
                    <p.icon className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs md:text-sm font-medium text-foreground">{p.label}</span>
                  </div>
                ))}
              </div>

              {/* Card form */}
              <div className="max-w-2xl mx-auto bg-card border border-border rounded-3xl shadow-xl shadow-primary/5 overflow-hidden">
                {/* Stepper */}
                <div className="px-6 md:px-8 pt-6 pb-4 border-b border-border bg-gradient-to-b from-secondary/30 to-transparent">
                  <div className="flex items-center gap-3">
                    <StepDot active={step >= 1} done={step > 1} num={1} label="Account" />
                    <div className={`flex-1 h-1 rounded-full transition-all ${step > 1 ? 'bg-primary' : 'bg-border'}`} />
                    <StepDot active={step >= 2} done={false} num={2} label="Servizi" />
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  {step === 1 && (
                    <form
                      onSubmit={(e) => { e.preventDefault(); if (validateStep1()) setStep(2); }}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FieldIcon icon={User} label="Nome e Cognome *">
                          <Input value={registerData.fullName} onChange={(e) => setRegisterData(p => ({ ...p, fullName: e.target.value }))} placeholder="Mario Rossi" className="h-12 pl-10 rounded-xl" />
                        </FieldIcon>
                        <FieldIcon icon={Building} label="Nome attività *">
                          <Input value={registerData.businessName} onChange={(e) => setRegisterData(p => ({ ...p, businessName: e.target.value }))} placeholder="Idraulica Rossi" className="h-12 pl-10 rounded-xl" />
                        </FieldIcon>
                        <FieldIcon icon={Mail} label="Email *">
                          <Input type="email" value={registerData.email} onChange={(e) => setRegisterData(p => ({ ...p, email: e.target.value }))} placeholder="mario@example.com" className="h-12 pl-10 rounded-xl" />
                        </FieldIcon>
                        <FieldIcon icon={Phone} label="Telefono *">
                          <Input type="tel" value={registerData.phone} onChange={(e) => setRegisterData(p => ({ ...p, phone: e.target.value }))} placeholder="+39 333 1234567" className="h-12 pl-10 rounded-xl" />
                        </FieldIcon>
                      </div>

                      <div>
                        <Label className="mb-2 block text-sm font-semibold">Città principale di lavoro *</Label>
                        <CityAutocomplete
                          value={registerData.mainCity}
                          onChange={(city, displayValue) => {
                            setRegisterData(prev => ({ ...prev, mainCity: displayValue }));
                            if (city && !serviceAreas.includes(displayValue)) setServiceAreas(prev => [...prev, displayValue]);
                          }}
                          placeholder="Cerca la tua città..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border">
                        <FieldIcon icon={Lock} label="Password *">
                          <Input type="password" value={registerData.password} onChange={(e) => setRegisterData(p => ({ ...p, password: e.target.value }))} placeholder="Min. 12 caratteri" className="h-12 pl-10 rounded-xl" />
                        </FieldIcon>
                        <FieldIcon icon={Lock} label="Conferma password *">
                          <Input type="password" value={registerData.confirmPassword} onChange={(e) => setRegisterData(p => ({ ...p, confirmPassword: e.target.value }))} placeholder="Ripeti la password" className="h-12 pl-10 rounded-xl" />
                        </FieldIcon>
                      </div>
                      <p className="text-xs text-muted-foreground -mt-2">
                        Almeno 12 caratteri, con maiuscole, minuscole e numeri.
                      </p>

                      <Button type="submit" size="lg" className="w-full h-12 text-base font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all">
                        Continua <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>

                      <p className="text-sm text-center text-muted-foreground">
                        Hai già un account?{' '}
                        <button type="button" onClick={() => setMode('login')} className="text-primary font-semibold hover:underline">
                          Accedi
                        </button>
                      </p>
                    </form>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition"
                      >
                        <ArrowLeft className="h-4 w-4" /> Indietro
                      </button>

                      {/* Service areas */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <Label className="text-sm font-semibold">Altre città in cui lavori (opzionale)</Label>
                        </div>
                        <CityAutocomplete
                          value=""
                          onChange={(city, displayValue) => {
                            if (city && !serviceAreas.includes(displayValue)) setServiceAreas(prev => [...prev, displayValue]);
                          }}
                          placeholder="Aggiungi altre città..."
                        />
                        {serviceAreas.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {serviceAreas.map((area, i) => (
                              <Badge key={i} variant={area === registerData.mainCity ? 'default' : 'secondary'} className="flex items-center gap-1 py-1.5 px-3 rounded-full">
                                <MapPin className="h-3 w-3" />
                                {area}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setServiceAreas(prev => prev.filter((_, idx) => idx !== i));
                                    if (area === registerData.mainCity) setRegisterData(p => ({ ...p, mainCity: '' }));
                                  }}
                                  className="ml-1 hover:text-destructive"
                                ><X className="h-3 w-3" /></button>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Intervention types */}
                      <div className="pt-5 border-t border-border">
                        <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-primary" />
                            <Label className="text-sm font-semibold">Tipi di intervento *</Label>
                            {registerData.interventionTypes.length > 0 && (
                              <Badge variant="secondary" className="rounded-full">{registerData.interventionTypes.length}</Badge>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button type="button" variant="outline" size="sm" className="h-7 text-xs rounded-full"
                              onClick={() => setRegisterData(p => ({ ...p, interventionTypes: allInterventions.map(([k]) => k as InterventionType) }))}>
                              Tutti
                            </Button>
                            <Button type="button" variant="outline" size="sm" className="h-7 text-xs rounded-full"
                              onClick={() => setRegisterData(p => ({ ...p, interventionTypes: [] }))}>
                              Nessuno
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                          {allInterventions.map(([key, label]) => {
                            const checked = registerData.interventionTypes.includes(key as InterventionType);
                            return (
                              <button
                                type="button"
                                key={key}
                                onClick={() => setRegisterData(p => ({
                                  ...p,
                                  interventionTypes: checked
                                    ? p.interventionTypes.filter(t => t !== key)
                                    : [...p.interventionTypes, key as InterventionType],
                                }))}
                                className={`flex items-center gap-2 text-left px-3 py-2.5 rounded-xl border transition-all ${
                                  checked ? 'border-primary bg-primary/5 text-foreground' : 'border-border bg-background hover:border-primary/40'
                                }`}
                              >
                                <span className={`h-4 w-4 rounded-md border flex items-center justify-center flex-shrink-0 ${checked ? 'bg-primary border-primary' : 'border-border'}`}>
                                  {checked && <Check className="h-3 w-3 text-primary-foreground" />}
                                </span>
                                <span className="text-sm">{label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Availability */}
                      <div className="pt-5 border-t border-border">
                        <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-primary" />
                            <Label className="text-sm font-semibold">Quando sei disponibile? *</Label>
                          </div>
                          <div className="flex gap-2">
                            <Button type="button" variant="outline" size="sm" className="h-7 text-xs rounded-full"
                              onClick={() => setRegisterData(p => ({ ...p, availability: allAvailability.map(([k]) => k as AvailabilityType) }))}>
                              Tutti
                            </Button>
                            <Button type="button" variant="outline" size="sm" className="h-7 text-xs rounded-full"
                              onClick={() => setRegisterData(p => ({ ...p, availability: [] }))}>
                              Nessuno
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {allAvailability.map(([key, label]) => {
                            const checked = registerData.availability.includes(key as AvailabilityType);
                            return (
                              <button
                                type="button"
                                key={key}
                                onClick={() => setRegisterData(p => ({
                                  ...p,
                                  availability: checked
                                    ? p.availability.filter(t => t !== key)
                                    : [...p.availability, key as AvailabilityType],
                                }))}
                                className={`flex items-center gap-2 text-left px-3 py-2.5 rounded-xl border transition-all ${
                                  checked ? 'border-primary bg-primary/5 text-foreground' : 'border-border bg-background hover:border-primary/40'
                                }`}
                              >
                                <span className={`h-4 w-4 rounded-md border flex items-center justify-center flex-shrink-0 ${checked ? 'bg-primary border-primary' : 'border-border'}`}>
                                  {checked && <Check className="h-3 w-3 text-primary-foreground" />}
                                </span>
                                <span className="text-sm">{label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <Button
                        type="button"
                        size="lg"
                        onClick={handleRegister}
                        disabled={isSubmitting}
                        className="w-full h-12 text-base font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all"
                      >
                        {isSubmitting ? 'Creazione account...' : (
                          <>Completa registrazione <CheckCircle2 className="h-5 w-5 ml-2" /></>
                        )}
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        Cliccando su "Completa registrazione" accetti i termini di servizio e l'informativa privacy.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ============ LOGIN / FORGOT / RESET ============ */}
          {(mode === 'login' || mode === 'forgot-password' || mode === 'reset-password') && (
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <div className="bg-primary/10 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  {mode === 'login' && 'Bentornato'}
                  {mode === 'forgot-password' && 'Recupera password'}
                  {mode === 'reset-password' && 'Nuova password'}
                </h2>
                <p className="text-muted-foreground mt-2 text-sm">
                  {mode === 'login' && 'Accedi per gestire richieste e saldo'}
                  {mode === 'forgot-password' && 'Ti invieremo un link per reimpostare la password'}
                  {mode === 'reset-password' && 'Inserisci la tua nuova password'}
                </p>
              </div>

              <div className="bg-card rounded-3xl border border-border shadow-xl shadow-primary/5 p-6 md:p-8">
                {mode === 'login' && (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <FieldIcon icon={Mail} label="Email">
                      <Input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="La tua email" className="h-12 pl-10 rounded-xl" />
                    </FieldIcon>
                    <FieldIcon icon={Lock} label="Password">
                      <Input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="La tua password" className="h-12 pl-10 rounded-xl" />
                    </FieldIcon>
                    <div className="text-right">
                      <button type="button" onClick={() => setMode('forgot-password')} className="text-sm text-primary hover:underline font-medium">
                        Password dimenticata?
                      </button>
                    </div>
                    <Button type="submit" size="lg" className="w-full h-12 font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all" disabled={isSubmitting}>
                      {isSubmitting ? 'Accesso...' : 'Accedi'}
                    </Button>
                    <p className="text-sm text-center text-muted-foreground pt-2">
                      Non hai un account?{' '}
                      <button type="button" onClick={() => setMode('register')} className="text-primary font-semibold hover:underline">
                        Registrati gratis
                      </button>
                    </p>
                  </form>
                )}

                {mode === 'forgot-password' && (
                  emailSent ? (
                    <div className="text-center space-y-4">
                      <div className="bg-success/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                        <Mail className="h-8 w-8 text-success" />
                      </div>
                      <h3 className="font-semibold text-foreground">Email inviata!</h3>
                      <p className="text-sm text-muted-foreground">
                        Controlla la tua casella di posta e clicca sul link per reimpostare la password.
                      </p>
                      <Button variant="outline" onClick={() => { setMode('login'); setEmailSent(false); }} className="w-full rounded-xl">
                        Torna al login
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleForgotPassword} className="space-y-4">
                      <FieldIcon icon={Mail} label="Email">
                        <Input type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} placeholder="La tua email" className="h-12 pl-10 rounded-xl" />
                      </FieldIcon>
                      <Button type="submit" size="lg" className="w-full h-12 font-bold rounded-xl" disabled={isSubmitting}>
                        {isSubmitting ? 'Invio...' : 'Invia link di recupero'}
                      </Button>
                      <p className="text-sm text-center text-muted-foreground">
                        <button type="button" onClick={() => setMode('login')} className="text-primary hover:underline font-medium">
                          Torna al login
                        </button>
                      </p>
                    </form>
                  )
                )}

                {mode === 'reset-password' && (
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <FieldIcon icon={Lock} label="Nuova password">
                      <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Min. 12 caratteri" className="h-12 pl-10 rounded-xl" />
                    </FieldIcon>
                    <FieldIcon icon={Lock} label="Conferma password">
                      <Input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder="Ripeti la password" className="h-12 pl-10 rounded-xl" />
                    </FieldIcon>
                    <Button type="submit" size="lg" className="w-full h-12 font-bold rounded-xl" disabled={isSubmitting}>
                      {isSubmitting ? 'Aggiornamento...' : 'Aggiorna password'}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

// --- Helpers ---
function StepDot({ active, done, num, label }: { active: boolean; done: boolean; num: number; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
        done ? 'bg-primary border-primary text-primary-foreground' :
        active ? 'bg-primary/10 border-primary text-primary' :
        'bg-background border-border text-muted-foreground'
      }`}>
        {done ? <Check className="h-4 w-4" /> : num}
      </div>
      <span className={`text-sm font-medium hidden sm:inline ${active ? 'text-foreground' : 'text-muted-foreground'}`}>
        {label}
      </span>
    </div>
  );
}

function FieldIcon({ icon: Icon, label, children }: { icon: any; label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-2 block text-sm font-semibold">{label}</Label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
        {children}
      </div>
    </div>
  );
}
