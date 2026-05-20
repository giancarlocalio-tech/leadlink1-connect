import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Search, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { TrialPaywall } from '@/components/dashboard/TrialPaywall';
import { TrialRequestCard } from '@/components/dashboard/TrialRequestCard';
import type { UnlockWithCreditsResult } from '@/components/dashboard/TrialRequestCard';
import { AcceptedTrialRequestCard } from '@/components/dashboard/AcceptedTrialRequestCard';
import { useAuth } from '@/hooks/useAuth';
import { usePlumberProfile } from '@/hooks/usePlumberProfile';
import { useCredits } from '@/hooks/useCredits';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';
import { useTrialRequests } from '@/hooks/useTrialRequests';
import { supabase } from '@/integrations/supabase/client';
import { INTERVENTION_LABELS, URGENCY_LABELS } from '@/lib/types';

// Wrapper component to provide subscription context
export default function RequestsPage() {
  return (
    <SubscriptionProvider>
      <RequestsContent />
    </SubscriptionProvider>
  );
}

function RequestsContent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const highlightedRequestId = searchParams.get('id');
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = usePlumberProfile();
  
  const {
    requests: trialRequests,
    acceptedRequests: trialAcceptedRequests,
    loading: trialLoading,
    claiming,
    freeRequestsRemaining,
    claimRequest,
  } = useTrialRequests(profile);

  const { credits, refreshCredits, refreshTransactions } = useCredits();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const highlightedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      // Preserve the current URL with query params so user returns here after login
      const returnUrl = window.location.pathname + window.location.search;
      const urlParams = new URLSearchParams(window.location.search);
      const emailParam = urlParams.get('email');
      const emailQuery = emailParam ? `&email=${encodeURIComponent(emailParam)}` : '';
      navigate(`/login?returnUrl=${encodeURIComponent(returnUrl)}${emailQuery}`);
    }
  }, [user, authLoading, navigate]);

  // Scroll to highlighted request when loaded
  useEffect(() => {
    if (highlightedRequestId && highlightedRef.current && !trialLoading) {
      setTimeout(() => {
        highlightedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [highlightedRequestId, trialLoading]);

  // Function to unlock a request using credits (for trial exhausted users)
  const handleUnlockWithCredits = async (
    requestId: string,
    quote?: { quote_amount_cents: number; quote_message: string }
  ): Promise<UnlockWithCreditsResult> => {
    if (!profile) {
      return { success: false, message: 'Profilo non trovato' };
    }

    const { data, error } = await supabase.rpc('unlock_contact_with_balance', {
      p_plumber_id: profile.id,
      p_request_id: requestId,
    });

    if (error) {
      console.error('Error unlocking with credits:', error);
      return { success: false, message: error.message };
    }

    if (data && data.length > 0) {
      const result = data[0];
      if (result.success) {
        // Attach quote message to the (trigger-created) conversation
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

        // Notify client (email + WhatsApp con link alla chat, include preventivo)
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
        // Refresh credits balance and transactions
        await Promise.all([refreshCredits(), refreshTransactions()]);
        return {
          success: true,
          message: result.message,
          amount_spent_cents: result.amount_spent_cents,
          new_balance_cents: result.new_balance_cents,
          client_name: result.client_name,
          client_phone: result.client_phone,
          client_email: result.client_email,
        };
      }
      return { success: false, message: result.message };
    }

    return { success: false, message: 'Nessun risultato dalla funzione' };
  };

  // Filter trial requests
  const filteredTrialRequests = trialRequests.filter(request => {
    const matchesSearch = searchQuery === '' || 
      request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesUrgency = urgencyFilter === 'all' || request.urgency === urgencyFilter;
    const matchesType = typeFilter === 'all' || request.intervention_type === typeFilter;
    
    return matchesSearch && matchesUrgency && matchesType;
  });

  if (authLoading || profileLoading) {
    return (
      <DashboardLayout title="Richieste" breadcrumbs={[{ label: 'Richieste' }]}>
        <div className="py-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  const isLoading = trialLoading;
  const displayRequests = filteredTrialRequests;
  return (
    <DashboardLayout title="Richieste" breadcrumbs={[{ label: 'Richieste' }]}>
      <Helmet>
        <title>Richieste Disponibili | Dashboard Idraulici Subito</title>
        <meta name="description" content="Visualizza e gestisci le richieste di intervento disponibili nella tua zona." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="space-y-6">
        {/* Trial Accepted Requests - Show client contact details */}
        {trialAcceptedRequests.length > 0 && (
          <Card className="border-success/50 bg-success/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Richieste accettate
              </CardTitle>
              <CardDescription>
                Qui trovi i dati dei clienti che hai sbloccato
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {trialAcceptedRequests.map((request) => (
                <AcceptedTrialRequestCard key={request.id} request={request} />
              ))}
            </CardContent>
          </Card>
        )}

        <TrialPaywall balanceCents={credits?.balance_cents ?? 0} />


        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cerca per descrizione o città..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Urgenza" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutte</SelectItem>
                {Object.entries(URGENCY_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti i tipi</SelectItem>
                {Object.entries(INTERVENTION_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground">
          {displayRequests.length} richieste trovate
        </p>

        {/* Requests list */}
        {isLoading ? (
          <div className="py-16 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : displayRequests.length === 0 ? (
          <div className="py-16 text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Nessuna richiesta trovata</h3>
            <p className="text-muted-foreground text-sm">
              Non ci sono richieste disponibili nella tua zona al momento. Controlla più tardi!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTrialRequests.map((request) => (
              <div 
                key={request.id}
                ref={request.id === highlightedRequestId ? highlightedRef : undefined}
                className={request.id === highlightedRequestId ? 'ring-2 ring-primary ring-offset-2 rounded-lg' : ''}
              >
                <TrialRequestCard
                  request={request}
                  onClaim={claimRequest}
                  onUnlockWithCredits={handleUnlockWithCredits}
                  claiming={claiming === request.id}
                  freeRequestsRemaining={freeRequestsRemaining}
                  balanceCents={credits?.balance_cents ?? 0}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}