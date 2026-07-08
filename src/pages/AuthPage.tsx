import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Mail, Lock, Loader2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

/**
 * Minimal admin-only auth page (post AI-only pivot).
 * Public/plumber registration flows have been removed.
 */

export default function AuthPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && user) navigate('/admin');
  }, [user, authLoading, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      toast.error(error.message ?? 'Accesso non riuscito.');
      return;
    }
    navigate('/admin');
  }

  return (
    <Layout>
      <Helmet>
        <title>Accesso · Idraulico AI</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container mx-auto px-4 py-16 max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-black mb-2">Accesso riservato</h1>
          <p className="text-sm text-muted-foreground">
            Area amministrativa. Se cerchi la consulenza AI,{' '}
            <Link to="/consulenza" className="text-primary font-semibold hover:underline">
              parla con l'AI qui
            </Link>
            .
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border bg-card p-6 space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="pl-9"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="pl-9"
              />
            </div>
          </div>
          <Button type="submit" disabled={submitting} className="w-full h-11">
            {submitting && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Accedi
          </Button>
        </form>
      </div>
    </Layout>
  );
}
