import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { getStripePriceId, StripePlanType } from '@/lib/stripeConfig';
import { toast } from 'sonner';

export interface StripeSubscriptionState {
  subscribed: boolean;
  plan_type: StripePlanType | null;
  subscription_end: string | null;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
}

export function useStripeSubscription() {
  const { user, session } = useAuth();
  const [subscription, setSubscription] = useState<StripeSubscriptionState | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const checkSubscription = useCallback(async () => {
    if (!session?.access_token) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error('Error checking subscription:', error);
        setSubscription(null);
      } else {
        setSubscription(data);
      }
    } catch (err) {
      console.error('Error invoking check-subscription:', err);
      setSubscription(null);
    } finally {
      setLoading(false);
    }
  }, [session?.access_token]);

  // Check subscription on mount and when session changes
  useEffect(() => {
    if (user) {
      checkSubscription();
    } else {
      setSubscription(null);
      setLoading(false);
    }
  }, [user, checkSubscription]);

  // Auto-refresh subscription status every minute
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      checkSubscription();
    }, 60000);

    return () => clearInterval(interval);
  }, [user, checkSubscription]);

  const createCheckout = async (planType: StripePlanType) => {
    if (!session?.access_token) {
      toast.error('Devi effettuare il login per abbonarti');
      return;
    }

    setCheckoutLoading(true);

    try {
      const priceId = getStripePriceId(planType);
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error('Error creating checkout:', error);
        toast.error('Errore nella creazione del checkout');
        return;
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (err) {
      console.error('Error invoking create-checkout:', err);
      toast.error('Errore nella creazione del checkout');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const openCustomerPortal = async () => {
    if (!session?.access_token) {
      toast.error('Devi effettuare il login');
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error('Error opening portal:', error);
        toast.error('Errore nell\'apertura del portale');
        return;
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (err) {
      console.error('Error invoking customer-portal:', err);
      toast.error('Errore nell\'apertura del portale');
    }
  };

  return {
    subscription,
    loading,
    checkoutLoading,
    isSubscribed: subscription?.subscribed ?? false,
    currentPlan: subscription?.plan_type ?? null,
    subscriptionEnd: subscription?.subscription_end ?? null,
    checkSubscription,
    createCheckout,
    openCustomerPortal,
  };
}
