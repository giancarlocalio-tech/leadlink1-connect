import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, Crown, Star, Zap, Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { usePlumberProfile } from '@/hooks/usePlumberProfile';
import { useStripeSubscription } from '@/hooks/useStripeSubscription';
import { toast } from 'sonner';
import type { StripePlanType } from '@/lib/stripeConfig';

const PLANS = [
  {
    type: 'basic' as StripePlanType,
    name: 'Basic',
    price: 29,
    icon: Shield,
    gradient: 'from-slate-500 to-slate-600',
    features: [
      'Contatti condivisi',
      'Richieste dopo 1 ora',
      'Email di notifica',
      'Dashboard base',
    ],
    trialDays: 30,
  },
  {
    type: 'medium' as StripePlanType,
    name: 'Medium',
    price: 59,
    icon: Star,
    gradient: 'from-blue-500 to-blue-600',
    popular: true,
    features: [
      'Contatti esclusivi',
      'Fino a 10 contatti/mese',
      'Richieste in tempo reale',
      'Priorità nelle assegnazioni',
      'Supporto prioritario',
    ],
  },
  {
    type: 'premium' as StripePlanType,
    name: 'Premium',
    price: 99,
    icon: Crown,
    gradient: 'from-amber-500 to-amber-600',
    features: [
      'Contatti esclusivi illimitati',
      'Prima priorità assoluta',
      'Richieste in tempo reale',
      'Badge Premium visibile',
      'Supporto dedicato 24/7',
      'Statistiche avanzate',
    ],
  },
];

export default function PlumberPlanSelectionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const justRegistered = location.state?.justRegistered === true;
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = usePlumberProfile();
  const { createCheckout, checkoutLoading } = useStripeSubscription();
  const [selectedPlan, setSelectedPlan] = useState<StripePlanType | null>(null);

  // Redirect if not logged in - skip profile check if just registered
  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) return;
    
    // If no user, definitely redirect
    if (!user) {
      navigate('/per-idraulici');
      return;
    }
    
    // If just registered, skip profile check - profile was just created
    if (justRegistered) return;
    
    // Wait for profile loading to complete
    if (profileLoading) return;
    
    // Only redirect if profile is definitely missing after loading
    if (!profile) {
      navigate('/per-idraulici');
    }
  }, [user, profile, authLoading, profileLoading, navigate, justRegistered]);

  const handleSelectPlan = async (planType: StripePlanType) => {
    setSelectedPlan(planType);
    
    try {
      const url = await createCheckout(planType);
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Errore durante il checkout. Riprova.');
      setSelectedPlan(null);
    }
  };

  if (authLoading || profileLoading) {
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
      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <Button
                variant="ghost"
                onClick={() => navigate('/per-idraulici')}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Torna alla registrazione
              </Button>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Check className="h-4 w-4" />
                Registrazione completata!
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Scegli il tuo piano
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Seleziona il piano più adatto alle tue esigenze per iniziare a ricevere richieste di lavoro.
              </p>
            </div>

            {/* Plans Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {PLANS.map((plan) => (
                <div
                  key={plan.type}
                  className={`relative bg-card rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                    plan.popular 
                      ? 'border-primary shadow-xl scale-105' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                      Più popolare
                    </div>
                  )}
                  
                  <div className={`p-6 ${plan.popular ? 'pt-10' : ''}`}>
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-4`}>
                      <plan.icon className="h-7 w-7 text-white" />
                    </div>
                    
                    {/* Name & Price */}
                    <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-4xl font-bold text-foreground">€{plan.price}</span>
                      <span className="text-muted-foreground">/mese</span>
                    </div>
                    
                    {plan.trialDays && (
                      <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium mb-4">
                        <Zap className="h-4 w-4" />
                        {plan.trialDays} giorni gratis
                      </div>
                    )}
                    
                    {/* Features */}
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Button */}
                    <Button
                      className="w-full"
                      size="lg"
                      variant={plan.popular ? 'default' : 'outline'}
                      onClick={() => handleSelectPlan(plan.type)}
                      disabled={checkoutLoading && selectedPlan === plan.type}
                    >
                      {checkoutLoading && selectedPlan === plan.type ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                          Caricamento...
                        </>
                      ) : (
                        `Scegli ${plan.name}`
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer note */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                🔒 Pagamento sicuro con Stripe. Puoi annullare in qualsiasi momento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
