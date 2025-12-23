import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Wrench, Mail, Lock, User, Phone, Building, MapPin, Users, Clock, Shield, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { usePlumberProfile } from '@/hooks/usePlumberProfile';
import { toast } from 'sonner';

type AuthMode = 'login' | 'register' | 'forgot-password' | 'reset-password';

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
  });

  useEffect(() => {
    // Don't redirect if user is resetting password
    if (mode === 'reset-password') return;
    
    if (user && !authLoading && !profileLoading) {
      // Redirect to dashboard regardless of profile status
      // Dashboard will handle missing profile case
      navigate('/dashboard');
    }
  }, [user, profile, authLoading, profileLoading, navigate, mode]);

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

    if (newPassword.length < 6) {
      toast.error('La password deve essere di almeno 6 caratteri');
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerData.fullName || !registerData.businessName || !registerData.email || 
        !registerData.password || !registerData.phone || !registerData.mainCity) {
      toast.error('Compila tutti i campi obbligatori');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Le password non corrispondono');
      return;
    }

    if (registerData.password.length < 6) {
      toast.error('La password deve essere di almeno 6 caratteri');
      return;
    }

    setIsSubmitting(true);

    // First create the auth user
    const { error: signUpError } = await signUp(registerData.email, registerData.password);

    if (signUpError) {
      setIsSubmitting(false);
      if (signUpError.message.includes('already registered')) {
        toast.error('Questa email è già registrata');
      } else {
        toast.error('Errore durante la registrazione');
      }
      return;
    }

    // Wait a moment for auth state to update, then create profile
    setTimeout(async () => {
      const { error: profileError } = await createProfile({
        full_name: registerData.fullName,
        business_name: registerData.businessName,
        email: registerData.email,
        phone: registerData.phone,
        main_city: registerData.mainCity,
        description: '',
        intervention_types: [],
        availability: [],
        service_areas: [registerData.mainCity],
      });

      setIsSubmitting(false);

      if (profileError) {
        console.error('Profile creation error:', profileError);
        toast.error('Errore durante la creazione del profilo');
      } else {
        toast.success('Registrazione completata!');
        navigate('/dashboard');
      }
    }, 1000);
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
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {mode === 'register' && (
            <div className="max-w-4xl mx-auto mb-12">
              {/* Hero section for registration */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Zap className="h-4 w-4" />
                  7 giorni di prova gratuita
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
            </div>
          )}

          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                {mode === 'login' && 'Accedi come Idraulico'}
                {mode === 'register' && 'Inizia la registrazione'}
                {mode === 'forgot-password' && 'Recupera password'}
                {mode === 'reset-password' && 'Nuova password'}
              </h2>
              <p className="text-muted-foreground mt-2">
                {mode === 'login' && 'Accedi per visualizzare le richieste nella tua zona'}
                {mode === 'register' && 'Crea il tuo profilo professionale in pochi minuti'}
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
                    <Link to="/auth" className="text-primary hover:underline font-medium">
                      Registrati qui
                    </Link>
                  </p>
                </form>
              )}

              {mode === 'register' && (
                <form onSubmit={handleRegister} className="space-y-4">
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
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="reg-city"
                        type="text"
                        placeholder="Milano"
                        value={registerData.mainCity}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, mainCity: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reg-password" className="mb-2 block">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="reg-password"
                        type="password"
                        placeholder="Minimo 6 caratteri"
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

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Registrazione...' : 'Registrati'}
                  </Button>

                  <p className="text-sm text-center text-muted-foreground mt-4">
                    Hai già un account?{' '}
                    <Link to="/auth?mode=login" className="text-primary hover:underline font-medium">
                      Accedi qui
                    </Link>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
