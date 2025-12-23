import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  ChevronDown, 
  ChevronUp,
  AlertCircle,
  User,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { usePlumberProfile } from '@/hooks/usePlumberProfile';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { ServiceRequest, InterventionType, UrgencyType, PropertyType, AccessibilityType } from '@/lib/types';
import { 
  INTERVENTION_LABELS, 
  URGENCY_LABELS, 
  PROPERTY_LABELS, 
  ACCESSIBILITY_LABELS 
} from '@/lib/types';

interface RequestWithContact extends ServiceRequest {
  showContact?: boolean;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = usePlumberProfile();
  const [requests, setRequests] = useState<RequestWithContact[]>([]);
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
    
    // Fetch requests that match the plumber's service areas
    const { data, error } = await supabase
      .from('service_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching requests:', error);
      toast.error('Errore nel caricamento delle richieste');
    } else {
      // Filter by service areas if defined
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
        showContact: false,
      })));
    }
    
    setLoadingRequests(false);
  };

  const handleContactReveal = async (requestId: string) => {
    // Log the contact
    if (profile) {
      await supabase
        .from('contact_logs')
        .upsert({
          plumber_id: profile.id,
          request_id: requestId,
        }, {
          onConflict: 'plumber_id,request_id'
        });
    }

    setRequests(prev => 
      prev.map(r => 
        r.id === requestId 
          ? { ...r, showContact: !r.showContact } 
          : r
      )
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getUrgencyColor = (urgency: UrgencyType) => {
    switch (urgency) {
      case 'subito':
        return 'bg-destructive/10 text-destructive';
      case 'entro_24_ore':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (authLoading || profileLoading) {
    return (
      <Layout>
        <div className="py-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <div className="py-16">
          <div className="container mx-auto px-4 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-xl font-bold mb-2">Profilo non trovato</h1>
            <p className="text-muted-foreground mb-4">
              Sembra che il tuo profilo non sia stato creato correttamente.
            </p>
            <Button onClick={() => navigate('/auth')}>
              Torna al login
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-6 md:py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">
                Bentornato, {profile.full_name}
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate('/profilo')}>
              <Settings className="h-4 w-4 mr-2" />
              Modifica Profilo
            </Button>
          </div>

          {/* Profile summary */}
          <div className="bg-card rounded-lg border border-border p-4 mb-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-full p-3">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-foreground">{profile.business_name}</h2>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {profile.main_city}
                  {profile.service_areas.length > 1 && (
                    <span className="text-muted-foreground/70">
                      {' '}+{profile.service_areas.length - 1} zone
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Requests */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Richieste nella tua zona
              <span className="text-muted-foreground font-normal ml-2">
                ({requests.length})
              </span>
            </h2>

            {loadingRequests ? (
              <div className="py-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            ) : requests.length === 0 ? (
              <div className="bg-card rounded-lg border border-border p-8 text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Nessuna richiesta trovata</h3>
                <p className="text-muted-foreground text-sm">
                  Non ci sono richieste nelle tue zone di servizio al momento.
                  Puoi aggiungere altre zone nel tuo profilo.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-card rounded-lg border border-border overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-2 py-1 rounded">
                            {INTERVENTION_LABELS[request.intervention_type]}
                          </span>
                          <span className={`inline-block text-sm font-medium px-2 py-1 rounded ml-2 ${getUrgencyColor(request.urgency)}`}>
                            {URGENCY_LABELS[request.urgency]}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(request.created_at)}
                        </span>
                      </div>

                      <p className="text-foreground mb-3">{request.description}</p>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {request.city}
                        </span>
                        <span>{PROPERTY_LABELS[request.property_type]}</span>
                        <span>Accessibilità: {ACCESSIBILITY_LABELS[request.accessibility]}</span>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-2">
                          <div className="bg-muted rounded-full p-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <span className="font-medium text-foreground">
                            {request.client_name}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleContactReveal(request.id)}
                        >
                          {request.showContact ? (
                            <>
                              <ChevronUp className="h-4 w-4 mr-1" />
                              Nascondi
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4 mr-1" />
                              Contatta
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    {request.showContact && (
                      <div className="bg-accent/50 p-4 border-t border-border">
                        <div className="flex flex-wrap gap-4 mb-3">
                          <a
                            href={`tel:${request.client_phone}`}
                            className="flex items-center gap-2 text-primary hover:underline"
                          >
                            <Phone className="h-4 w-4" />
                            {request.client_phone}
                          </a>
                          {request.client_email && (
                            <a
                              href={`mailto:${request.client_email}`}
                              className="flex items-center gap-2 text-primary hover:underline"
                            >
                              <Mail className="h-4 w-4" />
                              {request.client_email}
                            </a>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          <AlertCircle className="h-3 w-3 inline mr-1" />
                          Il contatto è diretto tra te e il cliente. La piattaforma non gestisce pagamenti.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
