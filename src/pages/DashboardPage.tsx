import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, AlertCircle, ArrowRight, Zap, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { SubscriptionCard } from '@/components/dashboard/SubscriptionCard';
import { RequestCard } from '@/components/dashboard/RequestCard';
import { AssignedRequestCard } from '@/components/dashboard/AssignedRequestCard';
import { TrialPaywall } from '@/components/dashboard/TrialPaywall';
import { TrialRequestCard } from '@/components/dashboard/TrialRequestCard';
import { AcceptedTrialRequestCard } from '@/components/dashboard/AcceptedTrialRequestCard';
import { useAuth } from '@/hooks/useAuth';
import { usePlumberProfile } from '@/hooks/usePlumberProfile';
import { SubscriptionProvider, useSubscriptionContext } from '@/contexts/SubscriptionContext';
import { useTrialRequests } from '@/hooks/useTrialRequests';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { ServiceRequest, InterventionType, UrgencyType, PropertyType, AccessibilityType } from '@/lib/types';

// Wrapper component to provide subscription context
export default function DashboardPage() {
  return (
    <SubscriptionProvider>
      <DashboardContent />
    </SubscriptionProvider>
  );
}

function DashboardContent() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = usePlumberProfile();
  const { 
    subscription, 
    loading: subLoading,
    isRequestUnlocked,
    canUnlockContact,
    unlockContact,
    getCurrentPlan,
    getMonthlyUnlocksRemaining,
    getBasicContactsRemaining,
    unlocks
  } = useSubscriptionContext();

  const {
    requests: trialRequests,
    acceptedRequests: trialAcceptedRequests,
    loading: loadingTrialRequests,
    claiming: claimingTrialRequestId,
    freeRequestsRemaining: trialFreeRequestsRemaining,
    claimRequest: claimTrialRequest,
  } = useTrialRequests(profile);
  
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [assignedRequests, setAssignedRequests] = useState<ServiceRequest[]>([]);
  const [acceptedRequests, setAcceptedRequests] = useState<ServiceRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth?mode=login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && profile) {
      fetchRequests();
      fetchAssignedRequests();
    }
  }, [user, profile]);

  const fetchRequests = async () => {
    if (!profile) return;
    
    setLoadingRequests(true);
    
    // Use the plumber view which shows all requests in plumber's service areas
    const { data, error } = await supabase
      .from('service_requests_plumber_view')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching requests:', error);
      toast.error('Errore nel caricamento delle richieste');
      setLoadingRequests(false);
      return;
    }
    
    // Filter by plumber's service areas
    let filteredData = data || [];
    if (profile.service_areas && profile.service_areas.length > 0) {
      filteredData = filteredData.filter(request => 
        request.city && profile.service_areas!.some(area => 
          request.city!.toLowerCase().includes(area.toLowerCase()) ||
          area.toLowerCase().includes(request.city!.toLowerCase())
        )
      );
    }
    
    setRequests(filteredData.map(r => ({
      id: r.id!,
      intervention_type: r.intervention_type as InterventionType,
      city: r.city!,
      description: r.description!,
      urgency: r.urgency as UrgencyType,
      property_type: r.property_type as PropertyType,
      accessibility: r.accessibility as AccessibilityType,
      client_name: r.client_name!,
      client_phone: r.client_phone!,
      client_email: r.client_email || undefined,
      privacy_accepted: r.privacy_accepted!,
      status: r.status || 'pending',
      is_exclusive: r.is_exclusive ?? false,
      assigned_plumber_id: r.assigned_plumber_id || undefined,
      assigned_at: r.assigned_at || undefined,
      created_at: r.created_at!,
      updated_at: r.updated_at!,
      is_contact_unlocked: r.is_contact_unlocked ?? false,
    })));
    
    setLoadingRequests(false);
  };

  const fetchAssignedRequests = async () => {
    if (!profile) return;
    
    // Fetch requests assigned to or accepted by this plumber
    // Trial users accept via accepted_by_id, regular flow uses assigned_plumber_id
    const { data, error } = await supabase
      .from('service_requests')
      .select('*')
      .or(`assigned_plumber_id.eq.${profile.id},accepted_by_id.eq.${profile.id}`)
      .in('status', ['assigned', 'accepted'])
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching assigned requests:', error);
      return;
    }
    
    const mappedRequests = (data || []).map((r: any) => ({
      id: r.id,
      intervention_type: r.intervention_type as InterventionType,
      city: r.city,
      description: r.description,
      urgency: r.urgency as UrgencyType,
      property_type: r.property_type as PropertyType,
      accessibility: r.accessibility as AccessibilityType,
      client_name: r.client_name,
      client_phone: r.client_phone,
      client_email: r.client_email || undefined,
      privacy_accepted: r.privacy_accepted,
      status: r.status || 'pending',
      is_exclusive: r.is_exclusive ?? false,
      assigned_plumber_id: r.assigned_plumber_id || undefined,
      assigned_at: r.assigned_at || undefined,
      created_at: r.created_at,
      updated_at: r.updated_at,
      current_assignee_id: r.current_assignee_id || undefined,
      current_assignee_plan: r.current_assignee_plan || undefined,
      assignment_started_at: r.assignment_started_at || undefined,
      assignment_expires_at: r.assignment_expires_at || undefined,
      assignment_round: r.assignment_round ?? 0,
      accepted_at: r.accepted_at || undefined,
      accepted_by_id: r.accepted_by_id || undefined,
      wizard_answers: r.wizard_answers || undefined,
    }));
    
    setAssignedRequests(mappedRequests.filter((r: any) => r.status === 'assigned'));
    setAcceptedRequests(mappedRequests.filter((r: any) => r.status === 'accepted'));
  };

  const handleUnlock = async (requestId: string) => {
    const plan = getCurrentPlan();
    const isExclusive = plan?.contacts_are_exclusive ?? false;
    return await unlockContact(requestId, isExclusive);
  };

  const isInTrialMode = subscription?.is_trial === true;

  // Calculate stats
  const thisMonthUnlocks = unlocks.filter(u => {
    const unlockDate = new Date(u.unlocked_at);
    const now = new Date();
    return unlockDate.getMonth() === now.getMonth() && 
           unlockDate.getFullYear() === now.getFullYear();
  }).length;

  const totalRequestsCount = isInTrialMode ? trialRequests.length : requests.length;
  const pendingRequests = isInTrialMode
    ? trialRequests.length
    : requests.filter(r => !isRequestUnlocked(r.id)).length;

  if (authLoading || profileLoading) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="py-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="py-16 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-xl font-bold mb-2">Profilo non trovato</h1>
          <p className="text-muted-foreground mb-4">
            Sembra che il tuo profilo non sia stato creato correttamente.
          </p>
          <Button onClick={() => navigate('/auth')}>
            Torna al login
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  // Check if user is in trial mode - use values from context (which gets refreshed after claim)
  // Use trialFreeRequestsRemaining from useTrialRequests as it's always in sync after claim
  const trialExhausted = isInTrialMode && trialFreeRequestsRemaining <= 0;
  const freeRequestsRemaining = trialFreeRequestsRemaining;

  return (
    <DashboardLayout title={`Bentornato, ${profile.full_name}`}>
      <div className="space-y-6">
        {/* Trial Paywall - Show when trial requests are exhausted */}
        {trialExhausted && (
          <TrialPaywall freeRequestsRemaining={0} />
        )}

        {/* Trial Progress Banner - Show when user still has free requests */}
        {isInTrialMode && !trialExhausted && (
          <TrialPaywall freeRequestsRemaining={freeRequestsRemaining} />
        )}

        {/* Assigned Requests - Priority Section (FIRST - requires immediate action) */}
        {!trialExhausted && assignedRequests.length > 0 && (
          <Card className="border-primary/50 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Richieste assegnate a te
              </CardTitle>
              <CardDescription>
                Queste richieste sono in esclusiva per te. Accetta prima che scada il tempo!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {assignedRequests.map((request) => (
                <AssignedRequestCard
                  key={request.id}
                  request={request}
                  onAccepted={() => fetchAssignedRequests()}
                  onDeclined={() => fetchAssignedRequests()}
                />
              ))}
            </CardContent>
          </Card>
        )}

        {/* Accepted Requests - Show client contact details (for regular subscribers) */}
        {!isInTrialMode && acceptedRequests.length > 0 && (
          <Card className="border-green-500/50 bg-green-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle className="h-5 w-5" />
                Richieste accettate
              </CardTitle>
              <CardDescription>
                Contatta questi clienti per fissare un appuntamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {acceptedRequests.map((request) => (
                <AssignedRequestCard
                  key={request.id}
                  request={request}
                  onAccepted={() => fetchAssignedRequests()}
                  onDeclined={() => fetchAssignedRequests()}
                />
              ))}
            </CardContent>
          </Card>
        )}

        {/* Trial Accepted Requests - Show client contact details (for trial users) */}
        {isInTrialMode && trialAcceptedRequests.length > 0 && (
          <Card className="border-green-500/50 bg-green-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle className="h-5 w-5" />
                Richieste accettate
              </CardTitle>
              <CardDescription>
                Contatta questi clienti per fissare un appuntamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {trialAcceptedRequests.map((request) => (
                <AcceptedTrialRequestCard
                  key={request.id}
                  request={request}
                />
              ))}
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <StatsCards
          totalRequests={totalRequestsCount}
          unlockedContacts={unlocks.length}
          pendingRequests={pendingRequests}
          thisMonthUnlocks={thisMonthUnlocks}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Subscription Card */}
          <div className="lg:col-span-1">
            <SubscriptionCard
              subscription={subscription}
              currentPlan={getCurrentPlan()}
              unlocksRemaining={getMonthlyUnlocksRemaining()}
              basicContactsRemaining={getBasicContactsRemaining()}
              onUpgrade={() => navigate('/dashboard/abbonamento')}
            />
          </div>

          {/* Recent Requests - Only shown for trial users */}
          {isInTrialMode && (
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Richieste disponibili</CardTitle>
                    <CardDescription>
                      Le richieste disponibili nella tua zona
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/richieste')}>
                    Vedi tutte
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loadingTrialRequests ? (
                    <div className="py-8 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    </div>
                  ) : trialRequests.length === 0 ? (
                    <div className="py-8 text-center">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Nessuna richiesta</h3>
                      <p className="text-muted-foreground text-sm">
                        Non ci sono richieste nelle tue zone di servizio.
                      </p>
                    </div>
                  ) : (
                    trialRequests.slice(0, 3).map((request) => (
                      <TrialRequestCard
                        key={request.id}
                        request={request}
                        onClaim={claimTrialRequest}
                        claiming={claimingTrialRequestId === request.id}
                        freeRequestsRemaining={trialFreeRequestsRemaining}
                        onAccepted={() => fetchAssignedRequests()}
                      />
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Info card for subscribers - they only see assigned/accepted requests */}
          {!isInTrialMode && (
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Come funziona
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Le richieste verranno assegnate automaticamente a te in base al tuo piano e alla tua disponibilità. 
                    Quando ricevi una richiesta, la vedrai nella sezione "Richieste assegnate a te" in alto.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}