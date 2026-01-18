import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Wrench, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading: authLoading, signIn, resetPassword, updatePassword } = useAuth();
  
  const [mode, setMode] = useState<'login' | 'forgot-password' | 'reset-password'>('login');
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

  useEffect(() => {
    // Check URL for reset-password mode
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'reset-password') {
      setMode('reset-password');
    }
  }, []);

  useEffect(() => {
    if (mode === 'reset-password') return;
    
    if (user && !authLoading) {
      // Check for returnUrl parameter to redirect back to original page
      const returnUrl = searchParams.get('returnUrl');
      if (returnUrl) {
        navigate(decodeURIComponent(returnUrl));
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, authLoading, navigate, mode, searchParams]);

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
      toast.error('Compila tutti i campi');
      return;
    }

    setIsSubmitting(true);
    const { error } = await signIn(loginEmail, loginPassword);
    setIsSubmitting(false);

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        toast.error('Email o password non corretti');
      } else if (error.message.includes('Email not confirmed')) {
        toast.error('Verifica la tua email prima di accedere');
      } else {
        toast.error('Errore durante l\'accesso');
      }
    } else {
      toast.success('Accesso effettuato!');
      // Check for returnUrl parameter to redirect back to original page
      const returnUrl = searchParams.get('returnUrl');
      if (returnUrl) {
        navigate(decodeURIComponent(returnUrl));
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Login Idraulici | Idraulici Subito</title>
        <meta name="description" content="Accedi al tuo account idraulico su Idraulici Subito per gestire le richieste di lavoro." />
        <link rel="canonical" href="https://www.idraulicisubito.com/login" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-primary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Wrench className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              {mode === 'login' && 'Accedi come Idraulico'}
              {mode === 'forgot-password' && 'Recupera Password'}
              {mode === 'reset-password' && 'Nuova Password'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {mode === 'login' && 'Accedi per visualizzare le richieste nella tua zona'}
              {mode === 'forgot-password' && 'Inserisci la tua email per ricevere il link di reset'}
              {mode === 'reset-password' && 'Inserisci la tua nuova password'}
            </p>
          </div>

          {/* Login Form */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="bg-card rounded-xl p-6 border border-border shadow-sm space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="La tua email"
                    className="pl-10"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="La tua password"
                    className="pl-10"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setMode('forgot-password')}
                  className="text-sm text-primary hover:underline"
                >
                  Password dimenticata?
                </button>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Accesso in corso...' : 'Accedi'}
              </Button>

              <p className="text-sm text-center text-muted-foreground mt-4">
                Non hai un account?{' '}
                <Link to="/auth" className="text-primary hover:underline font-medium">
                  Registrati qui
                </Link>
              </p>
            </form>
          )}

          {/* Forgot Password Form */}
          {mode === 'forgot-password' && (
            <form onSubmit={handleForgotPassword} className="bg-card rounded-xl p-6 border border-border shadow-sm space-y-4">
              {emailSent ? (
                <div className="text-center py-4">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Email inviata!</h3>
                  <p className="text-muted-foreground text-sm">
                    Controlla la tua casella di posta e clicca sul link per reimpostare la password.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="forgot-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="forgot-email"
                        type="email"
                        placeholder="La tua email"
                        className="pl-10"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Invio in corso...' : 'Invia link di reset'}
                  </Button>
                </>
              )}

              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setEmailSent(false);
                }}
                className="text-sm text-primary hover:underline w-full text-center"
              >
                Torna al login
              </button>
            </form>
          )}

          {/* Reset Password Form */}
          {mode === 'reset-password' && (
            <form onSubmit={handleResetPassword} className="bg-card rounded-xl p-6 border border-border shadow-sm space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">Nuova Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Minimo 12 caratteri"
                    className="pl-10"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Deve contenere maiuscole, minuscole e numeri
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-new-password">Conferma Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirm-new-password"
                    type="password"
                    placeholder="Ripeti la password"
                    className="pl-10"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Aggiornamento...' : 'Aggiorna Password'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}
