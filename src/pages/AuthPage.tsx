import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Wrench, Mail, Lock, User, Phone, Building, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { usePlumberProfile } from '@/hooks/usePlumberProfile';
import { toast } from 'sonner';

type AuthMode = 'login' | 'register';

export default function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading: authLoading, signIn, signUp } = useAuth();
  const { profile, loading: profileLoading, createProfile } = usePlumberProfile();
  
  // Default to 'register', use 'login' only if explicitly set in URL
  const initialMode = searchParams.get('mode') === 'login' ? 'login' : 'register';
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

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
    if (user && !authLoading && !profileLoading) {
      // Redirect to dashboard regardless of profile status
      // Dashboard will handle missing profile case
      navigate('/dashboard');
    }
  }, [user, profile, authLoading, profileLoading, navigate]);

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
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                {mode === 'login' ? 'Accedi come Idraulico' : 'Registrati come Idraulico'}
              </h1>
              <p className="text-muted-foreground mt-2">
                {mode === 'login' 
                  ? 'Accedi per visualizzare le richieste nella tua zona' 
                  : 'Crea il tuo profilo professionale'}
              </p>
            </div>

            <div className="bg-card rounded-lg border border-border p-6 shadow-sm">

              {mode === 'login' ? (
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
              ) : (
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
