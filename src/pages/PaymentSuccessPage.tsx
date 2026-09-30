import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, ArrowRight, Crown, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useStripeSubscription } from '@/hooks/useStripeSubscription';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { supabase } from '@/integrations/supabase/client';
import { usePlumberProfile } from '@/hooks/usePlumberProfile';
import analytics, { getStoredGclid } from '@/lib/analytics';

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const { user, session, loading: authLoading } = useAuth();
  const { profile } = usePlumberProfile();
  const [retryCount, setRetryCount] = useState(0);
  const [emailSent, setEmailSent] = useState(false);
  const emailSentRef = useRef(false);
  const { 
    currentPlan, 
    subscriptionEnd, 
    isSubscribed,
    checkSubscription,
    loading: subLoading 
  } = useStripeSubscription();

  // Refresh subscription status on mount and when session becomes available
  useEffect(() => {
    if (session?.access_token) {
      checkSubscription();
    }
  }, [session?.access_token, checkSubscription]);

  // Retry checking subscription a few times if not subscribed yet (payment processing delay)
  useEffect(() => {
    if (!subLoading && session?.access_token && !isSubscribed && retryCount < 3) {
      const timer = setTimeout(() => {
        setRetryCount(prev => prev + 1);
        checkSubscription();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [subLoading, session?.access_token, isSubscribed, retryCount, checkSubscription]);

  // Send welcome email, notify owner, and track Ads conversion once subscription is confirmed
  useEffect(() => {
    const sendEmailsAndTrackConversion = async () => {
      if (isSubscribed && profile && currentPlan && !emailSentRef.current) {
        emailSentRef.current = true;
        
        // Track Google Ads conversion for plumber payment
        const gclid = getStoredGclid();
        if (typeof window !== 'undefined' && window.gtag) {
          const conversionData: Record<string, unknown> = {
            send_to: 'AW-17828815580/plumber_payment_conversion',
            value: currentPlan === 'premium' ? 99 : currentPlan === 'medium' ? 59 : 29,
            currency: 'EUR',
            plan_type: currentPlan,
          };
          
          if (gclid) {
            conversionData.gclid = gclid;
            console.log('[Analytics] Plumber payment conversion tracked with GCLID:', gclid);
          }
          
          window.gtag('event', 'conversion', conversionData);
          console.log('[Analytics] Plumber payment conversion tracked:', currentPlan);
        }
        
        // Track page view
        analytics.pageView('/dashboard/pagamento-completato', 'Pagamento Completato');
        
        const planLabels = {
          basic: 'Base',
          medium: 'Professional',
          premium: 'Premium',
        };
        
        try {
          // Send welcome email to plumber
          await supabase.functions.invoke('send-welcome-email', {
            body: {
              email: profile.email,
              fullName: profile.full_name,
              businessName: profile.business_name,
              planName: planLabels[currentPlan as keyof typeof planLabels] || 'Abbonamento',
            },
          });
          console.log('Welcome email sent from PaymentSuccessPage');

          // Notify owner about new subscription
          await supabase.functions.invoke('notify-owner-subscription', {
            body: {
              plumber_name: profile.full_name,
              plumber_email: profile.email,
              plan_type: currentPlan,
              business_name: profile.business_name,
            },
          });
          console.log('Owner notification sent');
          
          setEmailSent(true);
        } catch (emailError) {
          console.error('Error sending emails:', emailError);
          // Don't block the page if email fails
        }
      }
    };
    
    sendEmailsAndTrackConversion();
  }, [isSubscribed, profile, currentPlan]);

  // Redirect if not authenticated after loading
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const getPlanIcon = (planType: string | null) => {
    switch (planType) {
      case 'premium':
        return <Crown className="h-8 w-8" />;
      case 'medium':
        return <Star className="h-8 w-8" />;
      default:
        return <Zap className="h-8 w-8" />;
    }
  };

  const getPlanGradient = (planType: string | null) => {
    switch (planType) {
      case 'premium':
        return 'from-amber-500 to-orange-500';
      case 'medium':
        return 'from-purple-500 to-indigo-500';
      default:
        return 'from-primary to-blue-600';
    }
  };

  const getPlanName = (planType: string | null) => {
    switch (planType) {
      case 'premium':
        return 'Premium';
      case 'medium':
        return 'Professional';
      default:
        return 'Basic';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (authLoading || subLoading) {
    return (
      <DashboardLayout title="Pagamento" breadcrumbs={[{ label: 'Pagamento completato' }]}>
        <div className="py-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Pagamento Completato" breadcrumbs={[{ label: 'Pagamento completato' }]}>
      <Helmet>
        <title>Pagamento Completato | Idraulici Subito</title>
        <meta name="description" content="Il tuo pagamento è stato completato con successo." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="max-w-2xl mx-auto py-8">
        <Card className="overflow-hidden">
          <div className={`bg-gradient-to-r ${getPlanGradient(currentPlan)} p-8 text-white text-center`}>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Pagamento Completato!</h1>
            <p className="text-white/90 text-lg">
              Il tuo abbonamento è ora attivo
            </p>
          </div>

          <CardContent className="p-8">
            {isSubscribed && currentPlan && (
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${getPlanGradient(currentPlan)} text-white mb-4`}>
                  {getPlanIcon(currentPlan)}
                </div>
                <h2 className="text-2xl font-semibold mb-2">
                  Piano {getPlanName(currentPlan)}
                </h2>
                {subscriptionEnd && (
                  <p className="text-muted-foreground">
                    Si rinnova automaticamente il {formatDate(subscriptionEnd)}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 p-4 bg-success/10 rounded-lg border border-success/20">
                <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-success-foreground">Abbonamento attivato</p>
                  <p className="text-sm text-muted-foreground">
                    Hai accesso immediato a tutte le funzionalità del tuo piano
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Riceverai le richieste nella tua zona</p>
                  <p className="text-sm text-muted-foreground">
                    Quando un cliente nella tua area richiede un idraulico, sarai notificato
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-muted rounded-lg border">
                <CheckCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Email di conferma inviata</p>
                  <p className="text-sm text-muted-foreground">
                    Riceverai una email con i dettagli del tuo abbonamento
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                className="flex-1" 
                onClick={() => navigate('/dashboard')}
              >
                Vai alla Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => navigate('/dashboard/richieste')}
              >
                Vedi Richieste
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Hai domande? Contattaci a{' '}
          <a href="mailto:supporto@idraulicisubito.com" className="text-primary hover:underline">
            supporto@idraulicisubito.com
          </a>
        </p>
      </div>
    </DashboardLayout>
  );
}
