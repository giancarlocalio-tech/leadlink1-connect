import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { usePlumberProfile } from './usePlumberProfile';
import { useSubscriptionContext } from '@/contexts/SubscriptionContext';
import { toast } from 'sonner';
import type { PlumberProfile, InterventionType, UrgencyType, PropertyType, AccessibilityType } from '@/lib/types';

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
  phone_contact_allowed?: boolean;
}

export interface ClaimResult {
  success: boolean;
  message: string;
  client_name?: string;
  client_phone?: string;
  client_email?: string;
}

export interface AcceptedTrialRequest extends TrialRequest {
  client_name: string;
  client_phone: string;
  client_email?: string;
  accepted_at: string;
}

/**
 * Hook for fetching and claiming available requests
 * Works for both trial users (free claims) and credit-based users (paid unlocks)
 */
export function useTrialRequests(profileOverride?: PlumberProfile | null) {
  const { profile: internalProfile } = usePlumberProfile();
  const profile = profileOverride ?? internalProfile;
  // Use shared context instead of creating a new instance
  const { subscription, refreshSubscription, refreshUnlocks } = useSubscriptionContext();
  const [requests, setRequests] = useState<TrialRequest[]>([]);
  const [acceptedRequests, setAcceptedRequests] = useState<AcceptedTrialRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState<string | null>(null);

  const isTrial = subscription?.is_trial === true;
  // Only count free requests if user is actually in trial mode
  // Users who purchased credits have is_trial = false and should use credits instead
  const freeRequestsRemaining = isTrial ? (subscription?.free_requests_remaining ?? 0) : 0;

  const fetchAvailableRequests = useCallback(async () => {
    if (!profile) {
      setRequests([]);
      setLoading(false);
      return;
    }

    try {
      // Fetch all available requests in the plumber's service areas
      // With credit-based system, all plumbers can see all requests
      const { data, error } = await supabase.rpc('get_trial_available_requests', {
        p_plumber_id: profile.id,
      });

      if (error) {
        console.error('Error fetching available requests:', error);
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
  }, [profile]);

  const fetchAcceptedRequests = useCallback(async () => {
    if (!profile) {
      return;
    }

    try {
      // IMPORTANT: use the plumber view, which is already scoped to the current plumber
      // and only reveals contact details when they are unlocked.
      const { data, error } = await supabase
        .from('service_requests_plumber_view')
        .select(
          'id, intervention_type, urgency, property_type, accessibility, city, description, created_at, is_exclusive, client_name, client_phone, client_email, status, is_contact_unlocked'
        )
        .eq('is_contact_unlocked', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching accepted requests:', error);
        return;
      }

      const mapped = (data || [])
        .filter((r) => r.id)
        .map((r) => {
          const createdAt = r.created_at ?? new Date().toISOString();

          return {
            id: r.id!,
            intervention_type: r.intervention_type as InterventionType,
            urgency: r.urgency as UrgencyType,
            property_type: r.property_type as PropertyType,
            accessibility: r.accessibility as AccessibilityType,
            city: r.city ?? '',
            description: r.description ?? '',
            created_at: createdAt,
            is_exclusive: r.is_exclusive ?? true,
            client_name: r.client_name ?? '',
            client_phone: r.client_phone ?? '',
            client_email: r.client_email ?? undefined,
            // service_requests_plumber_view doesn't expose accepted_at, so we fall back to created_at.
            accepted_at: createdAt,
          } satisfies AcceptedTrialRequest;
        });

      setAcceptedRequests(mapped);
    } catch (err) {
      console.error('Error in fetchAcceptedRequests:', err);
    }
  }, [profile]);

  // Fetch requests on mount and when profile changes
  useEffect(() => {
    fetchAvailableRequests();
    fetchAcceptedRequests();
  }, [fetchAvailableRequests, fetchAcceptedRequests]);

  // Refresh every 30 seconds to catch new requests / accepted requests
  useEffect(() => {
    if (!profile) return;

    const interval = setInterval(() => {
      fetchAvailableRequests();
      fetchAcceptedRequests();
    }, 30000);

    return () => clearInterval(interval);
  }, [profile, fetchAvailableRequests, fetchAcceptedRequests]);

  const claimRequest = async (
    requestId: string,
    quote?: { quote_amount_cents: number; quote_message: string }
  ): Promise<ClaimResult> => {
    if (!profile) {
      return { success: false, message: 'Profilo non trovato' };
    }

    if (freeRequestsRemaining <= 0) {
      return { success: false, message: 'Hai esaurito le richieste gratuite. Usa il saldo per sbloccare.' };
    }

    // Get the request data before claiming (we need city and intervention_type for the email)
    const requestData = requests.find(r => r.id === requestId);

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
        // Attach quote message to the conversation (auto-created by DB trigger on contact_unlocks)
        if (quote) {
          try {
            const { data: conv } = await supabase
              .from('conversations')
              .select('id')
              .eq('plumber_id', profile.id)
              .eq('request_id', requestId)
              .maybeSingle();
            if (conv) {
              const euros = (quote.quote_amount_cents / 100).toLocaleString('it-IT', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              });
              await Promise.all([
                supabase.from('conversation_messages').insert({
                  conversation_id: conv.id,
                  sender_type: 'plumber',
                  content: `💶 Preventivo: € ${euros}\n\n${quote.quote_message}`,
                }),
                supabase
                  .from('conversations')
                  .update({ quote_amount_cents: quote.quote_amount_cents })
                  .eq('id', conv.id),
              ]);
            }
          } catch (e) {
            console.error('attach quote failed', e);
          }
        }

        // Move the request from available to accepted (with client data)
        if (requestData) {
          const acceptedRequest: AcceptedTrialRequest = {
            ...requestData,
            client_name: result.client_name || '',
            client_phone: result.client_phone || '',
            client_email: result.client_email,
            accepted_at: new Date().toISOString()
          };
          setAcceptedRequests(prev => [acceptedRequest, ...prev]);
        }
        
        // Remove the claimed request from the available list
        setRequests(prev => prev.filter(r => r.id !== requestId));

        // Refresh subscription to update remaining requests count (shared context)
        await refreshSubscription();
        await refreshUnlocks();

        // Always sync accepted requests from DB (so they're visible on dashboard/other pages)
        await fetchAcceptedRequests();

        // Notify client with quote info (email + WhatsApp + chat link)
        try {
          await supabase.functions.invoke('notify-client-chat', {
            body: {
              request_id: requestId,
              plumber_id: profile.id,
              quote_amount_cents: quote?.quote_amount_cents,
              quote_message: quote?.quote_message,
            },
          });
        } catch (e) {
          console.error('notify-client-chat failed', e);
        }

        return {
          success: true,
          message: result.message,
          client_name: result.client_name,
          client_phone: result.client_phone,
          client_email: result.client_email
        };
      } else {
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
    acceptedRequests,
    loading,
    claiming,
    isTrial,
    freeRequestsRemaining,
    claimRequest,
    refreshRequests: fetchAvailableRequests,
  };
}
