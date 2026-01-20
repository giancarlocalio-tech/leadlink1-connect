import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { usePlumberProfile } from './usePlumberProfile';

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price_cents: number;
  price_per_credit: number;
  stripe_price_id: string | null;
  is_active: boolean;
  sort_order: number;
}

export interface PlumberCredits {
  id: string;
  plumber_id: string;
  balance: number;
  total_purchased: number;
  total_spent: number;
}

export interface CreditTransaction {
  id: string;
  plumber_id: string;
  transaction_type: 'purchase' | 'unlock' | 'refund' | 'bonus';
  credits: number;
  balance_after: number;
  package_id: string | null;
  request_id: string | null;
  unlock_reason: string | null;
  description: string | null;
  amount_cents: number | null;
  created_at: string;
}

export interface UnlockCost {
  urgency: string;
  credits_cost: number;
}

export function useCredits() {
  const { profile } = usePlumberProfile();
  const [credits, setCredits] = useState<PlumberCredits | null>(null);
  const [packages, setPackages] = useState<CreditPackage[]>([]);
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [unlockCosts, setUnlockCosts] = useState<UnlockCost[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  const fetchPackages = useCallback(async () => {
    const { data, error } = await supabase
      .from('credit_packages')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching packages:', error);
    } else if (data) {
      setPackages(data as CreditPackage[]);
    }
  }, []);

  const fetchUnlockCosts = useCallback(async () => {
    const { data, error } = await supabase
      .from('unlock_costs')
      .select('urgency, credits_cost');

    if (error) {
      console.error('Error fetching unlock costs:', error);
    } else if (data) {
      setUnlockCosts(data);
    }
  }, []);

  const fetchCredits = useCallback(async () => {
    if (!profile) return;

    const { data, error } = await supabase
      .from('plumber_credits')
      .select('*')
      .eq('plumber_id', profile.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching credits:', error);
    } else if (data) {
      setCredits(data as PlumberCredits);
    } else {
      // No credits record yet
      setCredits({ 
        id: '', 
        plumber_id: profile.id, 
        balance: 0, 
        total_purchased: 0, 
        total_spent: 0 
      });
    }
  }, [profile]);

  const fetchTransactions = useCallback(async () => {
    if (!profile) return;

    const { data, error } = await supabase
      .from('credit_transactions')
      .select('*')
      .eq('plumber_id', profile.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching transactions:', error);
    } else if (data) {
      setTransactions(data as CreditTransaction[]);
    }
  }, [profile]);

  useEffect(() => {
    fetchPackages();
    fetchUnlockCosts();
  }, [fetchPackages, fetchUnlockCosts]);

  useEffect(() => {
    if (profile) {
      setLoading(true);
      Promise.all([fetchCredits(), fetchTransactions()]).finally(() => {
        setLoading(false);
      });
    } else {
      setCredits(null);
      setTransactions([]);
      setLoading(false);
    }
  }, [profile, fetchCredits, fetchTransactions]);

  const purchaseCredits = async (packageId: string): Promise<{ url?: string; error?: string }> => {
    setPurchasing(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;
      
      if (!accessToken) {
        return { error: 'Non autenticato' };
      }

      const { data, error } = await supabase.functions.invoke('create-credit-checkout', {
        headers: { Authorization: `Bearer ${accessToken}` },
        body: { package_id: packageId },
      });

      if (error) {
        return { error: error.message };
      }

      if (data?.url) {
        return { url: data.url };
      }

      return { error: 'Nessun URL di checkout ricevuto' };
    } catch (e) {
      return { error: e instanceof Error ? e.message : 'Errore sconosciuto' };
    } finally {
      setPurchasing(false);
    }
  };

  const verifyPurchase = async (sessionId: string): Promise<{ success: boolean; credits_added?: number; new_balance?: number; error?: string }> => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;
      
      if (!accessToken) {
        return { success: false, error: 'Non autenticato' };
      }

      const { data, error } = await supabase.functions.invoke('verify-credit-purchase', {
        headers: { Authorization: `Bearer ${accessToken}` },
        body: { session_id: sessionId },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data?.success) {
        // Refresh credits
        await fetchCredits();
        await fetchTransactions();
        return { 
          success: true, 
          credits_added: data.credits_added, 
          new_balance: data.new_balance 
        };
      }

      return { success: false, error: data?.message || 'Verifica fallita' };
    } catch (e) {
      return { success: false, error: e instanceof Error ? e.message : 'Errore sconosciuto' };
    }
  };

  const getUnlockCost = (urgency: string): number => {
    const cost = unlockCosts.find(c => c.urgency === urgency);
    return cost?.credits_cost ?? 3; // Default to 3 if not found
  };

  const canUnlockWithCredits = (urgency: string): { allowed: boolean; reason?: string } => {
    const cost = getUnlockCost(urgency);
    const balance = credits?.balance ?? 0;
    
    if (balance < cost) {
      return { 
        allowed: false, 
        reason: `Crediti insufficienti. Hai ${balance} crediti, ne servono ${cost}.` 
      };
    }
    
    return { allowed: true };
  };

  return {
    credits,
    packages,
    transactions,
    unlockCosts,
    loading,
    purchasing,
    purchaseCredits,
    verifyPurchase,
    getUnlockCost,
    canUnlockWithCredits,
    refreshCredits: fetchCredits,
    refreshTransactions: fetchTransactions,
  };
}
