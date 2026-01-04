import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapPin, Filter, Search, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { RequestCard } from '@/components/dashboard/RequestCard';
import { TrialPaywall } from '@/components/dashboard/TrialPaywall';
import { TrialRequestCard } from '@/components/dashboard/TrialRequestCard';
import { useAuth } from '@/hooks/useAuth';
import { usePlumberProfile } from '@/hooks/usePlumberProfile';
import { SubscriptionProvider, useSubscriptionContext } from '@/contexts/SubscriptionContext';
import { useTrialRequests } from '@/hooks/useTrialRequests';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { ServiceRequest, InterventionType, UrgencyType, PropertyType, AccessibilityType } from '@/lib/types';
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
    isRequestUnlocked,
    canUnlockContact,
    unlockContact,
    getCurrentPlan,
    subscription
  } = useSubscriptionContext();
  
  const {
    requests: trialRequests,
    loading: trialLoading,
    claiming,
    isTrial,
    freeRequestsRemaining,
    claimRequest
  } = useTrialRequests();
  
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const highlightedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && profile && !isTrial) {
      fetchRequests();
    } else if (isTrial) {
      setLoadingRequests(false);
    }
  }, [user, profile, isTrial]);

  // Scroll to highlighted request when loaded
  useEffect(() => {
    if (highlightedRequestId && highlightedRef.current && !trialLoading && !loadingRequests) {
      setTimeout(() => {
        highlightedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [highlightedRequestId, trialLoading, loadingRequests]);

  const fetchRequests = async () => {
    setLoadingRequests(true);
    
    // Use the secure view that masks contact info for non-unlocked requests
    const { data, error } = await supabase
      .from('service_requests_plumber_view')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching requests:', error);
      toast.error('Errore nel caricamento delle richieste');
    } else {
      let filteredData = data || [];
      if (profile?.service_areas && profile.service_areas.length > 0) {
        filteredData = (data || []).filter(request => 
          profile.service_areas.some(area => 
            request.city.toLowerCase().includes(area.toLowerCase()) ||
            area.toLowerCase().includes(request.city.toLowerCase())
          )
        );
      }
      
      setRequests(filteredData.map(r => ({
        ...r,
        intervention_type: r.intervention_type as InterventionType,
        urgency: r.urgency as UrgencyType,
        property_type: r.property_type as PropertyType,
        accessibility: r.accessibility as AccessibilityType,
        is_exclusive: r.is_exclusive ?? false,
      })));
    }
    
    setLoadingRequests(false);
  };

  const handleUnlock = async (requestId: string) => {
    const plan = getCurrentPlan();
    const isExclusive = plan?.contacts_are_exclusive ?? false;
    return await unlockContact(requestId, isExclusive);
  };

  // Filter requests (for non-trial users)
  const filteredRequests = requests.filter(request => {
    const matchesSearch = searchQuery === '' || 
      request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesUrgency = urgencyFilter === 'all' || request.urgency === urgencyFilter;
    const matchesType = typeFilter === 'all' || request.intervention_type === typeFilter;
    
    return matchesSearch && matchesUrgency && matchesType;
  });

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

  const isLoading = isTrial ? trialLoading : loadingRequests;
  const displayRequests = isTrial ? filteredTrialRequests : filteredRequests;

  const isTrialExhausted = isTrial && freeRequestsRemaining <= 0;

  return (
    <DashboardLayout title="Richieste" breadcrumbs={[{ label: 'Richieste' }]}>
      <div className="space-y-6">
        {/* Trial Paywall - Show when trial requests are exhausted */}
        {isTrialExhausted && (
          <TrialPaywall freeRequestsRemaining={0} />
        )}

        {/* Trial info banner - Show when user still has free requests */}
        {isTrial && !isTrialExhausted && (
          <TrialPaywall freeRequestsRemaining={freeRequestsRemaining} />
        )}

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
              {isTrial 
                ? 'Non ci sono richieste disponibili nella tua zona al momento. Controlla più tardi!'
                : 'Prova a modificare i filtri o aggiungi altre zone di servizio nel tuo profilo.'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {isTrial ? (
              // Show trial request cards
              filteredTrialRequests.map((request) => (
                <div 
                  key={request.id}
                  ref={request.id === highlightedRequestId ? highlightedRef : undefined}
                  className={request.id === highlightedRequestId ? 'ring-2 ring-primary ring-offset-2 rounded-lg animate-pulse' : ''}
                >
                  <TrialRequestCard
                    request={request}
                    onClaim={claimRequest}
                    claiming={claiming === request.id}
                    freeRequestsRemaining={freeRequestsRemaining}
                  />
                </div>
              ))
            ) : (
              // Show regular request cards for paid users
              filteredRequests.map((request) => (
                <div 
                  key={request.id}
                  ref={request.id === highlightedRequestId ? highlightedRef : undefined}
                  className={request.id === highlightedRequestId ? 'ring-2 ring-primary ring-offset-2 rounded-lg animate-pulse' : ''}
                >
                  <RequestCard
                    request={request}
                    isUnlocked={(request as any).is_contact_unlocked || isRequestUnlocked(request.id)}
                    canUnlock={canUnlockContact()}
                    onUnlock={handleUnlock}
                  />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}