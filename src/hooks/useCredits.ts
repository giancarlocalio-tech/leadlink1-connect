import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { usePlumberProfile } from './usePlumberProfile';

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price_cents: number;
  amount_cents: number; // nuovo: importo ricarica
  price_per_credit: number;
  stripe_price_id: string | null;
  is_active: boolean;
  sort_order: number;
}

export interface PlumberCredits {
  id: string;
  plumber_id: string;
  /** @deprecated usa balance_cents */
  balance: number;
  /** @deprecated usa total_purchased_cents */
  total_purchased: number;
  /** @deprecated usa total_spent_cents */
  total_spent: number;
  balance_cents: number;
  total_purchased_cents: number;
  total_spent_cents: number;
}

export interface CreditTransaction {
  id: string;
  plumber_id: string;
  transaction_type: 'purchase' | 'unlock' | 'refund' | 'bonus';
  credits: number;
  balance_after: number;
  amount_cents_delta: number;
  balance_after_cents: number;
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
  cost_cents: number;
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
    if (error) console.error('packages', error);
    else if (data) setPackages(data as unknown as CreditPackage[]);
  }, []);

  const fetchUnlockCosts = useCallback(async () => {
    const { data, error } = await supabase
      .from('unlock_costs')
      .select('urgency, credits_cost, cost_cents');
    if (error) console.error('unlock_costs', error);
    else if (data) setUnlockCosts(data as unknown as UnlockCost[]);
  }, []);

  const fetchCredits = useCallback(async () => {
    if (!profile) return;
    const { data, error } = await supabase
      .from('plumber_credits')
      .select('*')
      .eq('plumber_id', profile.id)
      .maybeSingle();
    if (error) console.error('credits', error);
    else if (data) setCredits(data as unknown as PlumberCredits);
    else setCredits({
      id: '', plumber_id: profile.id,
      balance: 0, total_purchased: 0, total_spent: 0,
      balance_cents: 0, total_purchased_cents: 0, total_spent_cents: 0,
    });
  }, [profile]);

  const fetchTransactions = useCallback(async () => {
    if (!profile) return;
    const { data, error } = await supabase
      .from('credit_transactions')
      .select('*')
      .eq('plumber_id', profile.id)
      .order('created_at', { ascending: false })
      .limit(50);
    if (error) console.error('transactions', error);
    else if (data) setTransactions(data as unknown as CreditTransaction[]);
  }, [profile]);

  useEffect(() => {
    fetchPackages();
    fetchUnlockCosts();
  }, [fetchPackages, fetchUnlockCosts]);

  useEffect(() => {
    if (profile) {
      setLoading(true);
      Promise.all([fetchCredits(), fetchTransactions()]).finally(() => setLoading(false));
    } else {
      setCredits(null);
      setTransactions([]);
      setLoading(false);
    }
  }, [profile, fetchCredits, fetchTransactions]);

  useEffect(() => {
    if (!profile) return;

    const syncCredits = () => {
      void fetchCredits();
    };
    const intervalId = window.setInterval(syncCredits, 5000);
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') syncCredits();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', syncCredits);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', syncCredits);
    };
  }, [profile, fetchCredits]);

  const purchaseCredits = async (packageId: string): Promise<{ url?: string; error?: string }> => {
    setPurchasing(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;
      if (!accessToken) return { error: 'Non autenticato' };

      const { data, error } = await supabase.functions.invoke('create-credit-checkout', {
        headers: { Authorization: `Bearer ${accessToken}` },
        body: { package_id: packageId },
      });
      if (error) return { error: error.message };
      if (data?.url) return { url: data.url };
      return { error: 'Nessun URL di checkout ricevuto' };
    } catch (e) {
      return { error: e instanceof Error ? e.message : 'Errore' };
    } finally {
      setPurchasing(false);
    }
  };

  const verifyPurchase = async (sessionId: string): Promise<{
    success: boolean;
    amount_added_cents?: number;
    new_balance_cents?: number;
    error?: string;
  }> => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;
      if (!accessToken) return { success: false, error: 'Non autenticato' };

      const { data, error } = await supabase.functions.invoke('verify-credit-purchase', {
        headers: { Authorization: `Bearer ${accessToken}` },
        body: { session_id: sessionId },
      });
      if (error) return { success: false, error: error.message };
      if (data?.success) {
        await fetchCredits();
        await fetchTransactions();
        return {
          success: true,
          amount_added_cents: data.amount_added_cents,
          new_balance_cents: data.new_balance_cents,
        };
      }
      return { success: false, error: data?.message || 'Verifica fallita' };
    } catch (e) {
      return { success: false, error: e instanceof Error ? e.message : 'Errore' };
    }
  };

  /** Costo sblocco in centesimi per una data urgenza. */
  const getUnlockCostCents = (urgency: string): number => {
    const c = unlockCosts.find((x) => x.urgency === urgency);
    return c?.cost_cents ?? 400;
  };

  /** Compatibilità legacy: alcuni componenti chiedono ancora il "costo in crediti". */
  const getUnlockCost = (urgency: string): number => getUnlockCostCents(urgency);

  const canUnlockWithCredits = (urgency: string): { allowed: boolean; reason?: string } => {
    const cost = getUnlockCostCents(urgency);
    const balance = credits?.balance_cents ?? 0;
    if (balance < cost) {
      const euros = (cost / 100).toFixed(2).replace('.', ',');
      const bal = (balance / 100).toFixed(2).replace('.', ',');
      return { allowed: false, reason: `Saldo insufficiente. Hai ${bal} €, servono ${euros} €.` };
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
    getUnlockCostCents,
    canUnlockWithCredits,
    refreshCredits: fetchCredits,
    refreshTransactions: fetchTransactions,
  };
}
