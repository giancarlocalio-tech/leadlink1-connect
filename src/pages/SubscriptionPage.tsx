import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Crown, Star, Zap, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { usePlumberProfile } from '@/hooks/usePlumberProfile';
import { useSubscription } from '@/hooks/useSubscription';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { SubscriptionPlan } from '@/lib/types';

export default function SubscriptionPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = usePlumberProfile();
  const { 
    subscription, 
    plans,
    loading: subLoading,
    refreshSubscription
  } = useSubscription();
  
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [activating, setActivating] = useState(false);

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
          'Fino a 5 contatti esclusivi/mese',
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

  const handleSelectPlan = async (planType: SubscriptionPlan) => {
    if (!profile) {
      toast.error('Profilo non trovato');
      return;
    }

    setSelectedPlan(planType);
    setActivating(true);

    // For now, create a pending subscription (Stripe integration will come later)
    const { error } = await supabase
      .from('plumber_subscriptions')
      .upsert({
        plumber_id: profile.id,
        plan_type: planType,
        status: 'active', // For demo purposes, in production this would be 'pending' until Stripe confirms
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        exclusive_contacts_used: 0,
      }, {
        onConflict: 'plumber_id'
      });

    setActivating(false);

    if (error) {
      console.error('Error creating subscription:', error);
      toast.error('Errore nell\'attivazione dell\'abbonamento');
    } else {
      toast.success('Abbonamento attivato con successo!');
      refreshSubscription();
    }
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

  return (
    <DashboardLayout title="Abbonamento" breadcrumbs={[{ label: 'Abbonamento' }]}>
      <div className="space-y-8">
        {/* Current subscription info */}
        {subscription && (
          <Card className="border-primary/50 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">
                    Il tuo piano attuale: <span className="text-primary">{subscription.plan_type.toUpperCase()}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {subscription.status === 'active' ? 'Abbonamento attivo' : `Stato: ${subscription.status}`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Plans grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const isCurrentPlan = subscription?.plan_type === plan.plan_type;
            const isPopular = plan.plan_type === 'medium';
            
            return (
              <Card 
                key={plan.id} 
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
                
                <CardHeader className="text-center pb-2">
                  <div className={`mx-auto w-14 h-14 rounded-2xl bg-gradient-to-r ${getPlanGradient(plan.plan_type)} flex items-center justify-center text-white mb-4`}>
                    {getPlanIcon(plan.plan_type)}
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="text-center">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">€{plan.price_monthly}</span>
                    <span className="text-muted-foreground">/mese</span>
                  </div>
                  
                  <ul className="space-y-3 text-left">
                    {getPlanFeatures(plan.plan_type).map((feature, index) => (
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
                      plan.plan_type === 'premium' 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' 
                        : ''
                    }`}
                    variant={isCurrentPlan ? 'outline' : 'default'}
                    disabled={isCurrentPlan || activating}
                    onClick={() => handleSelectPlan(plan.plan_type)}
                  >
                    {activating && selectedPlan === plan.plan_type ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                    ) : null}
                    {isCurrentPlan ? 'Piano attuale' : 'Seleziona piano'}
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
              <strong>Nota:</strong> I pagamenti con Stripe saranno disponibili a breve. 
              Per ora puoi testare le funzionalità selezionando un piano. 
              Il conteggio dei contatti esclusivi si resetta ogni mese.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}