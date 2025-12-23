import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { SubscriptionCard } from '@/components/dashboard/SubscriptionCard';
import { RequestCard } from '@/components/dashboard/RequestCard';
import { useAuth } from '@/hooks/useAuth';
import { usePlumberProfile } from '@/hooks/usePlumberProfile';
import { useSubscription } from '@/hooks/useSubscription';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { ServiceRequest, InterventionType, UrgencyType, PropertyType, AccessibilityType } from '@/lib/types';

export default function DashboardPage() {
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
    unlocks
  } = useSubscription();
  
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && profile) {
      fetchRequests();
    }
  }, [user, profile]);

  const fetchRequests = async () => {
    setLoadingRequests(true);
    
    const { data, error } = await supabase
      .from('service_requests')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

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

  // Calculate stats
  const thisMonthUnlocks = unlocks.filter(u => {
    const unlockDate = new Date(u.unlocked_at);
    const now = new Date();
    return unlockDate.getMonth() === now.getMonth() && 
           unlockDate.getFullYear() === now.getFullYear();
  }).length;

  const pendingRequests = requests.filter(r => !isRequestUnlocked(r.id)).length;

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

  return (
    <DashboardLayout title={`Bentornato, ${profile.full_name}`}>
      <div className="space-y-6">
        {/* Stats */}
        <StatsCards
          totalRequests={requests.length}
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
              onUpgrade={() => navigate('/dashboard/abbonamento')}
            />
          </div>

          {/* Recent Requests */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Ultime richieste</CardTitle>
                  <CardDescription>
                    Le richieste più recenti nella tua zona
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/richieste')}>
                  Vedi tutte
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {loadingRequests ? (
                  <div className="py-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  </div>
                ) : requests.length === 0 ? (
                  <div className="py-8 text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Nessuna richiesta</h3>
                    <p className="text-muted-foreground text-sm">
                      Non ci sono richieste nelle tue zone di servizio.
                    </p>
                  </div>
                ) : (
                  requests.slice(0, 3).map((request) => (
                    <RequestCard
                      key={request.id}
                      request={request}
                      isUnlocked={isRequestUnlocked(request.id)}
                      canUnlock={canUnlockContact()}
                      onUnlock={handleUnlock}
                    />
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}