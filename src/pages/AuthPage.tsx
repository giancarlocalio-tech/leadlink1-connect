import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Wrench, Mail, Lock, User, Phone, Building, Users, Clock, Shield, Star, Zap, X, MapPin, Check, ArrowLeft, Briefcase, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { usePlumberProfile } from '@/hooks/usePlumberProfile';
import { toast } from 'sonner';
import { CityAutocomplete, ItalianCity } from '@/components/CityAutocomplete';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import type { InterventionType, AvailabilityType } from '@/lib/types';
import { INTERVENTION_LABELS, AVAILABILITY_LABELS } from '@/lib/types';


type AuthMode = 'login' | 'register' | 'select-plan' | 'register-form' | 'forgot-password' | 'reset-password';
type PlanType = 'basic' | 'medium' | 'premium';

interface PlanInfo {
  id: PlanType;
  name: string;
  price: number;
  trialPrice: number;
  trialLabel?: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

const PLANS: PlanInfo[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 29.99,
    trialPrice: null,
    trialLabel: null,
    description: 'Per iniziare a ricevere clienti',
    features: [
      'Fino a 3 contatti al mese',
      'Richieste in tempo reale',
      'Notifiche email',
      'Profilo professionale'
    ]
  },
  {
    id: 'medium',
    name: 'Medium',
    price: 49.99,
    trialPrice: 9.99,
    description: 'Per professionisti in crescita',
    features: [
      '5 contatti esclusivi al mese',
      'Tutte le urgenze',
      'Priorità sulle richieste',
      'Notifiche istantanee',
      'Badge "Verificato"'
    ],
    recommended: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 99.99,
    trialPrice: 19.99,
    description: 'Per i migliori professionisti',
    features: [
      'Contatti illimitati',
      'Massima priorità',
      'Esclusività totale',
      'Supporto dedicato',
      'Statistiche avanzate',
      'Badge "Top Pro"'
    ]
  }
];

export default function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading: authLoading, signIn, signUp, resetPassword, updatePassword } = useAuth();
  const { profile, loading: profileLoading, createProfile } = usePlumberProfile();
  
  // Determine initial mode from URL
  const getInitialMode = (): AuthMode => {
    const urlMode = searchParams.get('mode');
    if (urlMode === 'login') return 'login';
    if (urlMode === 'forgot-password') return 'forgot-password';
    if (urlMode === 'reset-password') return 'reset-password';
    return 'register';
  };
  
  const [mode, setMode] = useState<AuthMode>(getInitialMode());
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Forgot password form
  const [forgotEmail, setForgotEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  
  // Reset password form
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

  
  // Selected plan for registration
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('medium');

  // Service areas (cities) for registration
  const [serviceAreas, setServiceAreas] = useState<string[]>([]);

  useEffect(() => {
    // Don't redirect if user is resetting password
    if (mode === 'reset-password') return;
    
    if (user && !authLoading && !profileLoading) {
      // Check for returnUrl parameter to redirect back to original page
      const returnUrl = searchParams.get('returnUrl');
      if (returnUrl) {
        navigate(decodeURIComponent(returnUrl));
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, profile, authLoading, profileLoading, navigate, mode, searchParams]);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      toast.error('Inserisci la tua email');
      return;
    }

    setIsSubmitting(true);
    const { error } = await resetPassword(forgotEmail);
    setIsSubmitting(false);

    if (error) {
      toast.error('Errore durante l\'invio dell\'email');
    } else {
      setEmailSent(true);
      toast.success('Email inviata! Controlla la tua casella di posta');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword || !confirmNewPassword) {
      toast.error('Compila tutti i campi');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error('Le password non corrispondono');
      return;
    }

    if (newPassword.length < 12) {
      toast.error('La password deve essere di almeno 12 caratteri');
      return;
    }

    const hasUpper = /[A-Z]/.test(newPassword);
    const hasLower = /[a-z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);

    if (!(hasUpper && hasLower && hasNumber)) {
      toast.error('La password deve includere maiuscole, minuscole e numeri');
      return;
    }

    setIsSubmitting(true);
    const { error } = await updatePassword(newPassword);
    setIsSubmitting(false);

    if (error) {
      toast.error('Errore durante l\'aggiornamento della password');
    } else {
      toast.success('Password aggiornata con successo!');
      navigate('/dashboard');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.error('Inserisci email e password');
      return;
    }

    setIsSubmitting(true);
    const { error } = await signIn(loginEmail, loginPassword);
    setIsSubmitting(false);

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        toast.error('Credenziali non valide');
      } else {
        toast.error('Errore durante il login');
      }
    }
  };

  // Store pending profile data to create after auth state updates
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
    plan_type: PlanType;
  } | null>(null);


  useEffect(() => {
    const createPendingProfile = async () => {
      if (user && pendingProfileData && !profile) {
        const { plan_type, ...profileData } = pendingProfileData;
        const { error: profileError, data: newProfile } = await createProfile(profileData);
        
        if (profileError) {
          console.error('Profile creation error:', profileError);
          toast.error('Errore durante la creazione del profilo');
          setPendingProfileData(null);
          setIsSubmitting(false);
          return;
        }

        // Welcome email is now sent automatically inside createProfile

        setPendingProfileData(null);
        setIsSubmitting(false);
        
        // Redirect to dashboard - new trial-by-value model
        toast.success('Registrazione completata! Hai 3 richieste gratuite per iniziare.');
        navigate('/dashboard');
      }
    };

    createPendingProfile();
  }, [user, pendingProfileData, profile, createProfile, navigate]);

  const handleRegister = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    
    // Validation already done in register-form step, but double check
    if (!registerData.fullName || !registerData.businessName || !registerData.email || 
        !registerData.password || !registerData.phone || !registerData.mainCity) {
      toast.error('Compila tutti i campi obbligatori');
      return;
    }

    if (serviceAreas.length === 0) {
      toast.error('Aggiungi almeno una città di lavoro');
      return;
    }

    if (registerData.interventionTypes.length === 0) {
      toast.error('Seleziona almeno un tipo di intervento');
      return;
    }

    if (registerData.availability.length === 0) {
      toast.error('Seleziona almeno una disponibilità');
      return;
    }


    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Le password non corrispondono');
      return;
    }

     if (registerData.password.length < 12) {
       toast.error('La password deve essere di almeno 12 caratteri');
       return;
     }

     const hasUpper = /[A-Z]/.test(registerData.password);
     const hasLower = /[a-z]/.test(registerData.password);
     const hasNumber = /[0-9]/.test(registerData.password);

     if (!(hasUpper && hasLower && hasNumber)) {
       toast.error('La password deve includere maiuscole, minuscole e numeri');
       return;
     }

    setIsSubmitting(true);

    // Store the profile data to be created after auth state updates
    // Ensure main_city is always included in service_areas
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
      plan_type: selectedPlan,
    });


    // Create the auth user
    const { error: signUpError } = await signUp(registerData.email, registerData.password);

    if (signUpError) {
      setIsSubmitting(false);
      setPendingProfileData(null);
      if (signUpError.message.includes('already registered')) {
        toast.error('Questa email è già registrata');
      } else {
        toast.error('Errore durante la registrazione');
      }
      return;
    }
    
    // The profile will be created by the useEffect when auth state updates
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="py-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {mode === 'register' && (
            <div className="max-w-4xl mx-auto">
              {/* Hero section for registration */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Zap className="h-4 w-4" />
                  3 richieste gratuite
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Sei un idraulico? Prova gratuitamente!
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Trova subito nuovi clienti nella tua zona. Nessun costo iniziale, nessun impegno.
                </p>
              </div>

              {/* Benefits grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                <div className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-shadow">
                  <div className="bg-primary/10 rounded-lg w-10 h-10 flex items-center justify-center mb-3">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 text-sm">Clienti qualificati</h3>
                  <p className="text-xs text-muted-foreground">
                    Ricevi solo richieste di clienti reali nella tua zona.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-shadow">
                  <div className="bg-primary/10 rounded-lg w-10 h-10 flex items-center justify-center mb-3">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 text-sm">Solo nella tua zona</h3>
                  <p className="text-xs text-muted-foreground">
                    Definisci le aree in cui lavori e ricevi richieste pertinenti.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-shadow">
                  <div className="bg-primary/10 rounded-lg w-10 h-10 flex items-center justify-center mb-3">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 text-sm">Notifiche istantanee</h3>
                  <p className="text-xs text-muted-foreground">
                    Ricevi le richieste in tempo reale e rispondi prima degli altri.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-shadow">
                  <div className="bg-primary/10 rounded-lg w-10 h-10 flex items-center justify-center mb-3">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 text-sm">Contatti esclusivi</h3>
                  <p className="text-xs text-muted-foreground">
                    Con i piani premium, sei l'unico a ricevere il contatto.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-shadow">
                  <div className="bg-primary/10 rounded-lg w-10 h-10 flex items-center justify-center mb-3">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 text-sm">Costruisci la reputazione</h3>
                  <p className="text-xs text-muted-foreground">
                    Raccogli recensioni verificate e migliora il posizionamento.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-shadow">
                  <div className="bg-primary/10 rounded-lg w-10 h-10 flex items-center justify-center mb-3">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 text-sm">Zero pensieri</h3>
                  <p className="text-xs text-muted-foreground">
                    Nessun contratto, disdici quando vuoi.
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center mb-10">
                <Button 
                  size="lg" 
                  onClick={() => setMode('register-form')}
                  className="text-lg px-8 py-6"
                >
                  Inizia la registrazione
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Hai già un account?{' '}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Accedi qui
                  </Link>
                </p>
              </div>
            </div>
          )}

          {/* Plan Selection Step - Now shown AFTER form data */}
          {mode === 'select-plan' && (
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <Button 
                  variant="ghost" 
                  onClick={() => setMode('register-form')}
                  className="mb-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Modifica dati
                </Button>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Scegli il piano più adatto a te
                </h2>
                <p className="text-muted-foreground">
                  Prezzi promozionali per il primo mese. Nessun impegno.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {PLANS.map((plan) => (
                  <Card 
                    key={plan.id}
                    className={`relative cursor-pointer transition-all hover:shadow-lg ${
                      selectedPlan === plan.id 
                        ? 'ring-2 ring-primary border-primary' 
                        : 'border-border hover:border-primary/50'
                    } ${plan.recommended ? 'md:-mt-4 md:mb-4' : ''}`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.recommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground">
                          Consigliato
                        </Badge>
                      </div>
                    )}
                    {(plan.id === 'medium' || plan.id === 'premium') && (
                      <div className="absolute -top-3 right-3">
                        <Badge className="bg-orange-500 text-white animate-pulse">
                          🔥 PROMO
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="text-center pb-2">
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-primary">
                          {plan.trialPrice === 0 ? '€0' : `€${plan.trialPrice}`}
                        </span>
                        <span className="text-muted-foreground">/mese</span>
                        <div className="text-sm text-muted-foreground mt-1">
                          {plan.trialLabel || `poi €${plan.price}/mese`}
                        </div>
                        {plan.trialLabel && (
                          <div className="text-xs text-muted-foreground">
                            poi €{plan.price}/mese
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className="w-full mt-6" 
                        variant={selectedPlan === plan.id ? 'default' : 'outline'}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPlan(plan.id);
                        }}
                      >
                        {selectedPlan === plan.id ? 'Selezionato' : 'Seleziona'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button 
                  size="lg" 
                  onClick={handleRegister}
                  disabled={isSubmitting}
                  className="px-8"
                >
                  {isSubmitting ? 'Registrazione...' : `Completa registrazione con ${PLANS.find(p => p.id === selectedPlan)?.name}`}
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  Potrai cambiare piano in qualsiasi momento
                </p>
              </div>
            </div>
          )}

          {(mode === 'login' || mode === 'register-form' || mode === 'forgot-password' || mode === 'reset-password') && (
          <div className="max-w-md mx-auto">
            {mode === 'register-form' && (
              <Button 
                variant="ghost" 
                onClick={() => setMode('register')}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Indietro
              </Button>
            )}
            <div className="text-center mb-8">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                {mode === 'login' && 'Accedi come Idraulico'}
                {mode === 'register-form' && 'Inserisci i tuoi dati'}
                {mode === 'forgot-password' && 'Recupera password'}
                {mode === 'reset-password' && 'Nuova password'}
              </h2>
              <p className="text-muted-foreground mt-2">
                {mode === 'login' && 'Accedi per visualizzare le richieste nella tua zona'}
                {mode === 'register-form' && 'Dopo potrai scegliere il piano più adatto a te'}
                {mode === 'forgot-password' && 'Ti invieremo un link per reimpostare la password'}
                {mode === 'reset-password' && 'Inserisci la tua nuova password'}
              </p>
            </div>

            <div className="bg-card rounded-lg border border-border p-6 shadow-sm">

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
                    <Button
                      variant="outline"
                      onClick={() => {
                        setMode('login');
                        setEmailSent(false);
                      }}
                      className="w-full"
                    >
                      Torna al login
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div>
                      <Label htmlFor="forgot-email" className="mb-2 block">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="forgot-email"
                          type="email"
                          placeholder="La tua email"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Invio...' : 'Invia link di recupero'}
                    </Button>

                    <p className="text-sm text-center text-muted-foreground mt-4">
                      <button
                        type="button"
                        onClick={() => setMode('login')}
                        className="text-primary hover:underline font-medium"
                      >
                        Torna al login
                      </button>
                    </p>
                  </form>
                )
              )}

              {mode === 'reset-password' && (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <Label htmlFor="new-password" className="mb-2 block">Nuova password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="Minimo 6 caratteri"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirm-new-password" className="mb-2 block">Conferma password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirm-new-password"
                        type="password"
                        placeholder="Ripeti la password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Aggiornamento...' : 'Aggiorna password'}
                  </Button>
                </form>
              )}

              {mode === 'login' && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email" className="mb-2 block">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="La tua email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="login-password" className="mb-2 block">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="La tua password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => setMode('forgot-password')}
                      className="text-sm text-primary hover:underline"
                    >
                      Password dimenticata?
                    </button>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Accesso...' : 'Accedi'}
                  </Button>

                  <p className="text-sm text-center text-muted-foreground mt-4">
                    Non hai un account?{' '}
                    <button 
                      type="button"
                      onClick={() => setMode('register')}
                      className="text-primary hover:underline font-medium"
                    >
                      Registrati qui
                    </button>
                  </p>
                </form>
              )}

              {mode === 'register-form' && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="reg-name" className="mb-2 block">Nome e Cognome</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="reg-name"
                        type="text"
                        placeholder="Mario Rossi"
                        value={registerData.fullName}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, fullName: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reg-business" className="mb-2 block">Nome Attività</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="reg-business"
                        type="text"
                        placeholder="Idraulica Rossi"
                        value={registerData.businessName}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, businessName: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reg-email" className="mb-2 block">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder="mario@example.com"
                        value={registerData.email}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reg-phone" className="mb-2 block">Telefono</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="reg-phone"
                        type="tel"
                        placeholder="+39 333 1234567"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, phone: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reg-city" className="mb-2 block">Città principale di lavoro</Label>
                    <CityAutocomplete
                      value={registerData.mainCity}
                      onChange={(city, displayValue) => {
                        setRegisterData(prev => ({ ...prev, mainCity: displayValue }));
                        if (city && !serviceAreas.includes(displayValue)) {
                          setServiceAreas(prev => [...prev, displayValue]);
                        }
                      }}
                      placeholder="Cerca la tua città principale..."
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block">Altre città in cui lavori (opzionale)</Label>
                    <CityAutocomplete
                      value=""
                      onChange={(city, displayValue) => {
                        if (city && !serviceAreas.includes(displayValue)) {
                          setServiceAreas(prev => [...prev, displayValue]);
                        }
                      }}
                      placeholder="Aggiungi altre città..."
                    />
                    {serviceAreas.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {serviceAreas.map((area, index) => (
                          <Badge 
                            key={index} 
                            variant={area === registerData.mainCity ? "default" : "secondary"}
                            className="flex items-center gap-1 py-1 px-2"
                          >
                            <MapPin className="h-3 w-3" />
                            {area}
                            <button
                              type="button"
                              onClick={() => {
                                setServiceAreas(prev => prev.filter((_, i) => i !== index));
                                if (area === registerData.mainCity) {
                                  setRegisterData(prev => ({ ...prev, mainCity: '' }));
                                }
                              }}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Intervention Types */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-primary" />
                        <Label className="font-semibold">Tipi di intervento *</Label>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 px-2"
                          onClick={() => {
                            const allTypes = Object.keys(INTERVENTION_LABELS) as InterventionType[];
                            setRegisterData(prev => ({ ...prev, interventionTypes: allTypes }));
                          }}
                        >
                          Seleziona tutto
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 px-2"
                          onClick={() => {
                            setRegisterData(prev => ({ ...prev, interventionTypes: [] }));
                          }}
                        >
                          Deseleziona tutto
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Seleziona i servizi che offri
                    </p>
                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2">
                      {Object.entries(INTERVENTION_LABELS).map(([key, label]) => (
                        <div key={key} className="flex items-center gap-2">
                          <Checkbox
                            id={`intervention-${key}`}
                            checked={registerData.interventionTypes.includes(key as InterventionType)}
                            onCheckedChange={(checked) => {
                              setRegisterData(prev => ({
                                ...prev,
                                interventionTypes: checked
                                  ? [...prev.interventionTypes, key as InterventionType]
                                  : prev.interventionTypes.filter(t => t !== key)
                              }));
                            }}
                          />
                          <Label htmlFor={`intervention-${key}`} className="text-xs font-normal cursor-pointer">
                            {label}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {registerData.interventionTypes.length > 0 && (
                      <p className="text-xs text-primary mt-2">
                        {registerData.interventionTypes.length} serviz{registerData.interventionTypes.length === 1 ? 'io' : 'i'} selezionat{registerData.interventionTypes.length === 1 ? 'o' : 'i'}
                      </p>
                    )}
                  </div>

                  {/* Availability */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        <Label className="font-semibold">Disponibilità *</Label>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 px-2"
                          onClick={() => {
                            const allAvailability = Object.keys(AVAILABILITY_LABELS) as AvailabilityType[];
                            setRegisterData(prev => ({ ...prev, availability: allAvailability }));
                          }}
                        >
                          Seleziona tutto
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 px-2"
                          onClick={() => {
                            setRegisterData(prev => ({ ...prev, availability: [] }));
                          }}
                        >
                          Deseleziona tutto
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Quando sei disponibile per lavorare?
                    </p>
                    <div className="space-y-2">
                      {Object.entries(AVAILABILITY_LABELS).map(([key, label]) => (
                        <div key={key} className="flex items-center gap-2">
                          <Checkbox
                            id={`availability-${key}`}
                            checked={registerData.availability.includes(key as AvailabilityType)}
                            onCheckedChange={(checked) => {
                              setRegisterData(prev => ({
                                ...prev,
                                availability: checked
                                  ? [...prev.availability, key as AvailabilityType]
                                  : prev.availability.filter(t => t !== key)
                              }));
                            }}
                          />
                          <Label htmlFor={`availability-${key}`} className="text-sm font-normal cursor-pointer">
                            {label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <Label htmlFor="reg-password" className="mb-2 block">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="reg-password"
                        type="password"
                        placeholder="Minimo 12 caratteri"
                        value={registerData.password}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reg-confirm" className="mb-2 block">Conferma Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="reg-confirm"
                        type="password"
                        placeholder="Ripeti la password"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>


                  <Button 
                    type="button" 
                    className="w-full" 
                    onClick={handleRegister}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Registrazione in corso...' : 'Completa registrazione'}
                  </Button>

                  <p className="text-sm text-center text-muted-foreground mt-4">
                    Hai già un account?{' '}
                    <Link to="/auth?mode=login" className="text-primary hover:underline font-medium">
                      Accedi qui
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
