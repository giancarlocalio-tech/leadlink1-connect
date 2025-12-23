import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { usePlumberProfile } from './usePlumberProfile';
import type { 
  PlumberSubscription, 
  SubscriptionPlanInfo, 
  ContactUnlock,
  SubscriptionPlan,
  SubscriptionStatus
} from '@/lib/types';

export function useSubscription() {
  const { profile } = usePlumberProfile();
  const [subscription, setSubscription] = useState<PlumberSubscription | null>(null);
  const [plans, setPlans] = useState<SubscriptionPlanInfo[]>([]);
  const [unlocks, setUnlocks] = useState<ContactUnlock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    if (profile) {
      fetchSubscription();
      fetchUnlocks();
    } else {
      setSubscription(null);
      setUnlocks([]);
      setLoading(false);
    }
  }, [profile]);

  const fetchPlans = async () => {
    const { data, error } = await supabase
      .from('subscription_plans')
      .select('*')
      .order('price_monthly', { ascending: true });

    if (error) {
      console.error('Error fetching plans:', error);
    } else if (data) {
      setPlans(data.map(p => ({
        ...p,
        plan_type: p.plan_type as SubscriptionPlan,
        price_monthly: Number(p.price_monthly),
      })));
    }
  };

  const fetchSubscription = async () => {
    if (!profile) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('plumber_subscriptions')
      .select('*')
      .eq('plumber_id', profile.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching subscription:', error);
    } else if (data) {
      setSubscription({
        ...data,
        plan_type: data.plan_type as SubscriptionPlan,
        status: data.status as SubscriptionStatus,
      });
    }
    setLoading(false);
  };

  const fetchUnlocks = async () => {
    if (!profile) return;

    const { data, error } = await supabase
      .from('contact_unlocks')
      .select('*')
      .eq('plumber_id', profile.id);

    if (error) {
      console.error('Error fetching unlocks:', error);
    } else if (data) {
      setUnlocks(data);
    }
  };

  const isRequestUnlocked = (requestId: string): boolean => {
    return unlocks.some(u => u.request_id === requestId);
  };

  const canUnlockContact = (): { allowed: boolean; reason?: string } => {
    if (!subscription) {
      return { allowed: false, reason: 'Nessun abbonamento attivo' };
    }

    if (subscription.status !== 'active') {
      return { allowed: false, reason: 'Abbonamento non attivo' };
    }

    const plan = plans.find(p => p.plan_type === subscription.plan_type);
    if (!plan) {
      return { allowed: false, reason: 'Piano non trovato' };
    }

    // Check exclusive contact limits for Medium plan
    if (plan.plan_type === 'medium' && plan.max_exclusive_contacts) {
      if (subscription.exclusive_contacts_used >= plan.max_exclusive_contacts) {
        return { 
          allowed: false, 
          reason: `Hai raggiunto il limite di ${plan.max_exclusive_contacts} contatti esclusivi questo mese` 
        };
      }
    }

    return { allowed: true };
  };

  const unlockContact = async (requestId: string, isExclusive: boolean = false) => {
    if (!profile) return { error: new Error('Profilo non trovato') };

    const canUnlock = canUnlockContact();
    if (!canUnlock.allowed) {
      return { error: new Error(canUnlock.reason) };
    }

    // Create unlock record
    const { data, error } = await supabase
      .from('contact_unlocks')
      .insert({
        plumber_id: profile.id,
        request_id: requestId,
        is_exclusive: isExclusive,
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        // Already unlocked
        return { error: null, alreadyUnlocked: true };
      }
      return { error };
    }

    // Update exclusive contacts count if applicable
    if (isExclusive && subscription) {
      await supabase
        .from('plumber_subscriptions')
        .update({ 
          exclusive_contacts_used: subscription.exclusive_contacts_used + 1 
        })
        .eq('id', subscription.id);

      setSubscription(prev => prev ? {
        ...prev,
        exclusive_contacts_used: prev.exclusive_contacts_used + 1
      } : null);
    }

    // Add to local state
    if (data) {
      setUnlocks(prev => [...prev, data]);
    }

    return { error: null };
  };

  const getCurrentPlan = (): SubscriptionPlanInfo | null => {
    if (!subscription) return null;
    return plans.find(p => p.plan_type === subscription.plan_type) || null;
  };

  const getMonthlyUnlocksRemaining = (): number | null => {
    const plan = getCurrentPlan();
    if (!plan || !plan.max_exclusive_contacts) return null;
    return Math.max(0, plan.max_exclusive_contacts - (subscription?.exclusive_contacts_used || 0));
  };

  const getBasicContactsRemaining = (): { used: number; max: number; remaining: number } | null => {
    if (!subscription || subscription.plan_type !== 'basic') return null;
    
    const now = new Date();
    const thisMonthUnlocks = unlocks.filter(u => {
      const unlockDate = new Date(u.unlocked_at);
      return unlockDate.getMonth() === now.getMonth() && 
             unlockDate.getFullYear() === now.getFullYear();
    }).length;
    
    const maxBasicContacts = 3;
    return {
      used: thisMonthUnlocks,
      max: maxBasicContacts,
      remaining: Math.max(0, maxBasicContacts - thisMonthUnlocks)
    };
  };

  return {
    subscription,
    plans,
    unlocks,
    loading,
    isRequestUnlocked,
    canUnlockContact,
    unlockContact,
    getCurrentPlan,
    getMonthlyUnlocksRemaining,
    getBasicContactsRemaining,
    refreshSubscription: fetchSubscription,
    refreshUnlocks: fetchUnlocks,
  };
}