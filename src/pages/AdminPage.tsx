import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  Shield, 
  Trash2, 
  Eye,
  Search,
  AlertCircle,
  CheckCircle,
  XCircle,
  MapPin,
  Clock,
  Phone,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { 
  PlumberProfile, 
  ServiceRequest, 
  InterventionType, 
  UrgencyType, 
  PropertyType, 
  AccessibilityType,
  AvailabilityType
} from '@/lib/types';
import { 
  INTERVENTION_LABELS, 
  URGENCY_LABELS, 
  PROPERTY_LABELS, 
  ACCESSIBILITY_LABELS 
} from '@/lib/types';

export default function AdminPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  
  const [plumbers, setPlumbers] = useState<PlumberProfile[]>([]);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [searchPlumber, setSearchPlumber] = useState('');
  const [searchRequest, setSearchRequest] = useState('');
  
  const [deleteDialog, setDeleteDialog] = useState<{ type: 'plumber' | 'request'; id: string } | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!adminLoading && !isAdmin && user) {
      toast.error('Accesso non autorizzato');
      navigate('/dashboard');
    }
  }, [isAdmin, adminLoading, user, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    setLoadingData(true);
    await Promise.all([fetchPlumbers(), fetchRequests()]);
    setLoadingData(false);
  };

  const fetchPlumbers = async () => {
    const { data, error } = await supabase
      .from('plumber_profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching plumbers:', error);
    } else {
      setPlumbers((data || []).map(p => ({
        ...p,
        intervention_types: (p.intervention_types as InterventionType[]) || [],
        availability: (p.availability as AvailabilityType[]) || [],
        service_areas: (p.service_areas as string[]) || [],
      })));
    }
  };

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from('service_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching requests:', error);
    } else {
      setRequests((data || []).map(r => ({
        ...r,
        intervention_type: r.intervention_type as InterventionType,
        urgency: r.urgency as UrgencyType,
        property_type: r.property_type as PropertyType,
        accessibility: r.accessibility as AccessibilityType,
      })));
    }
  };

  const handleDelete = async () => {
    if (!deleteDialog) return;

    const table = deleteDialog.type === 'plumber' ? 'plumber_profiles' : 'service_requests';
    
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', deleteDialog.id);

    if (error) {
      toast.error('Errore durante l\'eliminazione');
      console.error('Delete error:', error);
    } else {
      toast.success('Eliminato con successo');
      if (deleteDialog.type === 'plumber') {
        setPlumbers(prev => prev.filter(p => p.id !== deleteDialog.id));
      } else {
        setRequests(prev => prev.filter(r => r.id !== deleteDialog.id));
      }
    }
    
    setDeleteDialog(null);
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

  const filteredPlumbers = plumbers.filter(p => 
    p.full_name.toLowerCase().includes(searchPlumber.toLowerCase()) ||
    p.business_name.toLowerCase().includes(searchPlumber.toLowerCase()) ||
    p.main_city.toLowerCase().includes(searchPlumber.toLowerCase())
  );

  const filteredRequests = requests.filter(r => 
    r.client_name.toLowerCase().includes(searchRequest.toLowerCase()) ||
    r.city.toLowerCase().includes(searchRequest.toLowerCase()) ||
    r.description.toLowerCase().includes(searchRequest.toLowerCase())
  );

  if (authLoading || adminLoading) {
    return (
      <Layout>
        <div className="py-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <Layout>
      <div className="py-6 md:py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-primary/10 rounded-lg p-2">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Pannello Admin</h1>
              <p className="text-muted-foreground text-sm">Gestisci profili e richieste</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-lg p-2">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{plumbers.length}</p>
                  <p className="text-sm text-muted-foreground">Idraulici registrati</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center gap-3">
                <div className="bg-accent rounded-lg p-2">
                  <FileText className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{requests.length}</p>
                  <p className="text-sm text-muted-foreground">Richieste totali</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="plumbers" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="plumbers">
                <Users className="h-4 w-4 mr-2" />
                Idraulici
              </TabsTrigger>
              <TabsTrigger value="requests">
                <FileText className="h-4 w-4 mr-2" />
                Richieste
              </TabsTrigger>
            </TabsList>

            {/* Plumbers Tab */}
            <TabsContent value="plumbers" className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cerca per nome, attività o città..."
                  value={searchPlumber}
                  onChange={(e) => setSearchPlumber(e.target.value)}
                  className="pl-10"
                />
              </div>

              {loadingData ? (
                <div className="py-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                </div>
              ) : filteredPlumbers.length === 0 ? (
                <div className="bg-card rounded-lg border border-border p-8 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Nessun idraulico trovato</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredPlumbers.map((plumber) => (
                    <div
                      key={plumber.id}
                      className="bg-card rounded-lg border border-border p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground truncate">
                              {plumber.business_name}
                            </h3>
                            {plumber.email_verified ? (
                              <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                            ) : (
                              <XCircle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{plumber.full_name}</p>
                          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {plumber.main_city}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {plumber.phone}
                            </span>
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {plumber.email}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Registrato: {formatDate(plumber.created_at)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => setDeleteDialog({ type: 'plumber', id: plumber.id })}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Requests Tab */}
            <TabsContent value="requests" className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cerca per nome, città o descrizione..."
                  value={searchRequest}
                  onChange={(e) => setSearchRequest(e.target.value)}
                  className="pl-10"
                />
              </div>

              {loadingData ? (
                <div className="py-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                </div>
              ) : filteredRequests.length === 0 ? (
                <div className="bg-card rounded-lg border border-border p-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Nessuna richiesta trovata</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredRequests.map((request) => (
                    <div
                      key={request.id}
                      className="bg-card rounded-lg border border-border p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded">
                              {INTERVENTION_LABELS[request.intervention_type]}
                            </span>
                            <span className="inline-block bg-muted text-muted-foreground text-xs font-medium px-2 py-1 rounded">
                              {URGENCY_LABELS[request.urgency]}
                            </span>
                          </div>
                          <p className="text-foreground text-sm mb-2 line-clamp-2">{request.description}</p>
                          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {request.city}
                            </span>
                            <span>{request.client_name}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDate(request.created_at)}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedRequest(request)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => setDeleteDialog({ type: 'request', id: request.id })}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deleteDialog} onOpenChange={() => setDeleteDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Conferma eliminazione</AlertDialogTitle>
            <AlertDialogDescription>
              Sei sicuro di voler eliminare questo {deleteDialog?.type === 'plumber' ? 'profilo' : 'richiesta'}? 
              Questa azione non può essere annullata.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Elimina
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Request detail dialog */}
      <AlertDialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Dettagli richiesta</AlertDialogTitle>
          </AlertDialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tipo intervento</p>
                <p className="text-foreground">{INTERVENTION_LABELS[selectedRequest.intervention_type]}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Descrizione</p>
                <p className="text-foreground">{selectedRequest.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Città</p>
                  <p className="text-foreground">{selectedRequest.city}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Urgenza</p>
                  <p className="text-foreground">{URGENCY_LABELS[selectedRequest.urgency]}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tipo abitazione</p>
                  <p className="text-foreground">{PROPERTY_LABELS[selectedRequest.property_type]}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Accessibilità</p>
                  <p className="text-foreground">{ACCESSIBILITY_LABELS[selectedRequest.accessibility]}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm font-medium text-muted-foreground mb-2">Contatto cliente</p>
                <p className="text-foreground font-medium">{selectedRequest.client_name}</p>
                <p className="text-foreground">{selectedRequest.client_phone}</p>
                {selectedRequest.client_email && (
                  <p className="text-foreground">{selectedRequest.client_email}</p>
                )}
              </div>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Chiudi</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}
