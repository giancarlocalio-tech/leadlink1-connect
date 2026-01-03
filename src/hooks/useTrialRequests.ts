import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { usePlumberProfile } from './usePlumberProfile';
import { useSubscription } from './useSubscription';
import { toast } from 'sonner';
import type { InterventionType, UrgencyType, PropertyType, AccessibilityType } from '@/lib/types';

export interface TrialRequest {
  id: string;
  intervention_type: InterventionType;
  urgency: UrgencyType;
  property_type: PropertyType;
  accessibility: AccessibilityType;
  city: string;
  description: string;
  created_at: string;
  is_exclusive: boolean;
}

export interface ClaimResult {
  success: boolean;
  message: string;
  client_name?: string;
  client_phone?: string;
  client_email?: string;
}

export function useTrialRequests() {
  const { profile } = usePlumberProfile();
  const { subscription, refreshSubscription } = useSubscription();
  const [requests, setRequests] = useState<TrialRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState<string | null>(null);

  const isTrial = subscription?.is_trial === true;
  const freeRequestsRemaining = subscription?.free_requests_remaining ?? 0;

  const fetchAvailableRequests = useCallback(async () => {
    if (!profile || !isTrial) {
      setRequests([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.rpc('get_trial_available_requests', {
        p_plumber_id: profile.id
      });

      if (error) {
        console.error('Error fetching trial requests:', error);
        setRequests([]);
      } else {
        setRequests((data || []) as TrialRequest[]);
      }
    } catch (err) {
      console.error('Error in fetchAvailableRequests:', err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, [profile, isTrial]);

  // Fetch requests on mount and when profile changes
  useEffect(() => {
    fetchAvailableRequests();
  }, [fetchAvailableRequests]);

  // Refresh every 30 seconds to catch new requests
  useEffect(() => {
    if (!isTrial || !profile) return;

    const interval = setInterval(() => {
      fetchAvailableRequests();
    }, 30000);

    return () => clearInterval(interval);
  }, [isTrial, profile, fetchAvailableRequests]);

  const claimRequest = async (requestId: string): Promise<ClaimResult> => {
    if (!profile) {
      return { success: false, message: 'Profilo non trovato' };
    }

    if (freeRequestsRemaining <= 0) {
      return { success: false, message: 'Hai esaurito le richieste gratuite. Scegli un piano per continuare.' };
    }

    setClaiming(requestId);

    try {
      const { data, error } = await supabase.rpc('trial_claim_request', {
        p_plumber_id: profile.id,
        p_request_id: requestId
      });

      if (error) {
        console.error('Error claiming request:', error);
        return { success: false, message: 'Errore durante l\'accettazione della richiesta' };
      }

      const result = data?.[0] as ClaimResult | undefined;

      if (result?.success) {
        toast.success(result.message);
        // Remove the claimed request from the list
        setRequests(prev => prev.filter(r => r.id !== requestId));
        // Refresh subscription to update remaining requests count
        await refreshSubscription();
        return {
          success: true,
          message: result.message,
          client_name: result.client_name,
          client_phone: result.client_phone,
          client_email: result.client_email
        };
      } else {
        toast.error(result?.message || 'Errore durante l\'accettazione');
        // Refresh requests in case someone else claimed it
        await fetchAvailableRequests();
        return { success: false, message: result?.message || 'Errore sconosciuto' };
      }
    } catch (err) {
      console.error('Error in claimRequest:', err);
      return { success: false, message: 'Errore di connessione' };
    } finally {
      setClaiming(null);
    }
  };

  return {
    requests,
    loading,
    claiming,
    isTrial,
    freeRequestsRemaining,
    claimRequest,
    refreshRequests: fetchAvailableRequests
  };
}
