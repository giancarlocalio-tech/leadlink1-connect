import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Check, Crown, Star, Zap, AlertCircle, ExternalLink, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { usePlumberProfile } from '@/hooks/usePlumberProfile';
import { useStripeSubscription } from '@/hooks/useStripeSubscription';
import { STRIPE_PLANS, StripePlanType } from '@/lib/stripeConfig';
import { toast } from 'sonner';

export default function SubscriptionPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = usePlumberProfile();
  const { 
    subscription,
    loading: subLoading,
    checkoutLoading,
    currentPlan,
    subscriptionEnd,
    isSubscribed,
    createCheckout,
    openCustomerPortal,
    checkSubscription,
  } = useStripeSubscription();

  // Handle checkout redirect
  useEffect(() => {
    const checkoutStatus = searchParams.get('checkout');
    if (checkoutStatus === 'success') {
      toast.success('Pagamento completato! Il tuo abbonamento è ora attivo.');
      checkSubscription();
      // Clean up URL
      navigate('/abbonamento', { replace: true });
    } else if (checkoutStatus === 'cancelled') {
      toast.info('Pagamento annullato');
      navigate('/abbonamento', { replace: true });
    }
  }, [searchParams, navigate, checkSubscription]);

  const getPlanIcon = (planType: string) => {
    switch (planType) {
      case 'premium':
        return <Crown className="h-6 w-6" />;
      case 'medium':
        return <Star className="h-6 w-6" />;
      default:
        return <Zap className="h-6 w-6" />;
    }
  };

  const getPlanGradient = (planType: string) => {
    switch (planType) {
      case 'premium':
        return 'from-amber-500 to-orange-500';
      case 'medium':
        return 'from-purple-500 to-indigo-500';
      default:
        return 'from-primary to-blue-600';
    }
  };

  const getPlanFeatures = (planType: string) => {
    switch (planType) {
      case 'premium':
        return [
          'Contatti esclusivi illimitati',
          'Accesso immediato a tutte le richieste',
          'Nessun altro idraulico li vede',
          'Badge Premium visibile ai clienti',
          'Supporto prioritario',
        ];
      case 'medium':
        return [
          'Fino a 10 contatti esclusivi/mese',
          'Accesso immediato a tutte le richieste',
          'Nessun altro idraulico li vede',
          'Notifiche in tempo reale',
          'Badge verificato',
        ];
      default:
        return [
          'Fino a 3 contatti al mese',
          'Accesso ai contatti dopo 1 ora',
          'Solo se non sbloccati da piani superiori',
          'Profilo base',
        ];
    }
  };

  const handleSelectPlan = async (planType: StripePlanType) => {
    if (!profile) {
      toast.error('Devi prima completare il tuo profilo');
      return;
    }
    
    await createCheckout(planType);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (authLoading || profileLoading || subLoading) {
    return (
      <DashboardLayout title="Abbonamento" breadcrumbs={[{ label: 'Abbonamento' }]}>
        <div className="py-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  const plans = Object.entries(STRIPE_PLANS).map(([type, plan]) => ({
    type: type as StripePlanType,
    ...plan,
  }));

  return (
    <DashboardLayout title="Abbonamento" breadcrumbs={[{ label: 'Abbonamento' }]}>
      <div className="space-y-8">
        {/* Current subscription info */}
        {isSubscribed && currentPlan && (
          <Card className="border-primary/50 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${getPlanGradient(currentPlan)} flex items-center justify-center text-white`}>
                    {getPlanIcon(currentPlan)}
                  </div>
                  <div>
                    <p className="font-medium">
                      Piano attuale: <span className="text-primary">{currentPlan.toUpperCase()}</span>
                    </p>
                    {subscriptionEnd && (
                      <p className="text-sm text-muted-foreground">
                        Si rinnova il {formatDate(subscriptionEnd)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => checkSubscription()}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Aggiorna stato
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => openCustomerPortal()}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Gestisci abbonamento
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Not subscribed info */}
        {!isSubscribed && (
          <Card className="border-warning/50 bg-warning/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-warning" />
                <div>
                  <p className="font-medium">Nessun abbonamento attivo</p>
                  <p className="text-sm text-muted-foreground">
                    Scegli un piano per iniziare a ricevere richieste di lavoro
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Plans grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const isCurrentPlan = currentPlan === plan.type;
            const isPopular = plan.type === 'medium';
            
            return (
              <Card 
                key={plan.type} 
                className={`relative transition-all ${
                  isCurrentPlan 
                    ? 'ring-2 ring-primary border-primary' 
                    : 'hover:shadow-lg hover:border-primary/50'
                }`}
              >
                {isPopular && (
                  <Badge 
                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-indigo-500"
                  >
                    Più popolare
                  </Badge>
                )}
                
                {isCurrentPlan && (
                  <Badge 
                    className="absolute -top-3 right-4 bg-primary"
                  >
                    Il tuo piano
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-2">
                  <div className={`mx-auto w-14 h-14 rounded-2xl bg-gradient-to-r ${getPlanGradient(plan.type)} flex items-center justify-center text-white mb-4`}>
                    {getPlanIcon(plan.type)}
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>
                    {plan.type === 'basic' && 'Perfetto per iniziare'}
                    {plan.type === 'medium' && 'Per professionisti attivi'}
                    {plan.type === 'premium' && 'Massima visibilità'}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="text-center">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">€{plan.price_monthly}</span>
                    <span className="text-muted-foreground">/mese</span>
                  </div>
                  
                  <ul className="space-y-3 text-left">
                    {getPlanFeatures(plan.type).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.type === 'premium' 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' 
                        : ''
                    }`}
                    variant={isCurrentPlan ? 'outline' : 'default'}
                    disabled={isCurrentPlan || checkoutLoading}
                    onClick={() => handleSelectPlan(plan.type)}
                  >
                    {checkoutLoading ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                    ) : null}
                    {isCurrentPlan ? 'Piano attuale' : 'Abbonati ora'}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Info note */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              <strong>Pagamenti sicuri con Stripe:</strong> I tuoi dati di pagamento sono protetti 
              e gestiti da Stripe, leader mondiale nei pagamenti online. Puoi annullare 
              o modificare il tuo abbonamento in qualsiasi momento.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
