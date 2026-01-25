import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
  Mail,
  CreditCard,
  MailOpen,
  Send,
  Timer,
  TrendingUp,
  MessageCircle,
  CheckCheck,
  Coins,
  Unlock,
  Globe,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { UrlExporter } from '@/components/admin/UrlExporter';
import { QuickRequestForm } from '@/components/admin/QuickRequestForm';

// Extended plumber type with subscription and credits info
interface PlumberWithSubscription extends PlumberProfile {
  subscription?: {
    plan_type: string;
    status: string;
    is_trial: boolean;
    free_requests_remaining: number | null;
    monthly_contacts_used: number | null;
    monthly_contact_limit: number | null;
    current_period_end: string | null;
  } | null;
  credits?: {
    balance: number;
    total_purchased: number;
    total_spent: number;
  } | null;
}

// Contact unlock info
interface ContactUnlock {
  id: string;
  plumber_id: string;
  request_id: string;
  is_exclusive: boolean;
  unlocked_at: string;
  plumber?: {
    full_name: string;
    phone: string;
    email: string;
  };
}

// Assignment log type
interface AssignmentLog {
  id: string;
  request_id: string;
  responded: boolean;
  response_type: string | null;
  response_at: string | null;
  assigned_at: string;
  expires_at: string;
  request?: {
    city: string;
    intervention_type: InterventionType;
    description: string;
  };
}

// Email log type
interface EmailLog {
  id: string;
  email_type: string;
  subject: string;
  status: string;
  created_at: string;
  delivered_at: string | null;
  opened_at: string | null;
  request_id: string | null;
}

// WhatsApp log type
interface WhatsAppLog {
  id: string;
  recipient_phone: string;
  recipient_name: string;
  message_type: string;
  request_id: string | null;
  plumber_id: string | null;
  status: string;
  error_message: string | null;
  respond_io_message_id: string | null;
  created_at: string;
  delivered_at: string | null;
  read_at: string | null;
}

export default function AdminPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin(user);
  
  const [plumbers, setPlumbers] = useState<PlumberWithSubscription[]>([]);
  type ExtendedRequest = ServiceRequest & { 
    accepted_by_name?: string; 
    accepted_by_email?: string; 
    accepted_by_phone?: string; 
    assigned_to_name?: string;
    unlocks?: ContactUnlock[];
  };
  
  const [requests, setRequests] = useState<ExtendedRequest[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [searchPlumber, setSearchPlumber] = useState('');
  const [searchRequest, setSearchRequest] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const [deleteDialog, setDeleteDialog] = useState<{ type: 'plumber' | 'request'; id: string } | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<ExtendedRequest | null>(null);
  
  // Plumber detail dialog state
  const [selectedPlumber, setSelectedPlumber] = useState<PlumberWithSubscription | null>(null);
  const [plumberAssignments, setPlumberAssignments] = useState<AssignmentLog[]>([]);
  const [plumberEmails, setPlumberEmails] = useState<EmailLog[]>([]);
  const [plumberWhatsApps, setPlumberWhatsApps] = useState<WhatsAppLog[]>([]);
  const [loadingPlumberDetails, setLoadingPlumberDetails] = useState(false);
  
  // Request detail WhatsApp logs
  const [requestWhatsApps, setRequestWhatsApps] = useState<WhatsAppLog[]>([]);
  const [loadingRequestWhatsApps, setLoadingRequestWhatsApps] = useState(false);

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
    // Fetch plumbers with their subscription and credits info
    const { data, error } = await supabase
      .from('plumber_profiles')
      .select(`
        *,
        subscription:plumber_subscriptions(
          plan_type,
          status,
          is_trial,
          free_requests_remaining,
          monthly_contacts_used,
          monthly_contact_limit,
          current_period_end
        ),
        credits:plumber_credits(
          balance,
          total_purchased,
          total_spent
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching plumbers:', error);
    } else {
      setPlumbers((data || []).map(p => ({
        ...p,
        intervention_types: (p.intervention_types as InterventionType[]) || [],
        availability: (p.availability as AvailabilityType[]) || [],
        service_areas: (p.service_areas as string[]) || [],
        subscription: Array.isArray(p.subscription) ? p.subscription[0] : p.subscription,
        credits: Array.isArray(p.credits) ? p.credits[0] : p.credits,
      })));
    }
  };

  const fetchPlumberDetails = async (plumber: PlumberWithSubscription) => {
    setSelectedPlumber(plumber);
    setLoadingPlumberDetails(true);
    
    try {
      // Fetch assignment logs for this plumber
      const { data: assignmentsData, error: assignmentsError } = await supabase
        .from('assignment_logs')
        .select(`
          id,
          request_id,
          responded,
          response_type,
          response_at,
          assigned_at,
          expires_at
        `)
        .eq('plumber_id', plumber.id)
        .order('assigned_at', { ascending: false })
        .limit(20);
      
      if (assignmentsError) {
        console.error('Error fetching assignments:', assignmentsError);
      } else {
        // Fetch request details for each assignment
        const requestIds = (assignmentsData || []).map(a => a.request_id);
        const { data: requestsData } = await supabase
          .from('service_requests')
          .select('id, city, intervention_type, description')
          .in('id', requestIds);
        
        const requestsMap = new Map((requestsData || []).map(r => [r.id, r]));
        
        setPlumberAssignments((assignmentsData || []).map(a => ({
          ...a,
          request: requestsMap.get(a.request_id) as any,
        })));
      }
      
      // Fetch email logs for this plumber
      const { data: emailsData, error: emailsError } = await supabase
        .from('email_logs')
        .select('*')
        .eq('plumber_id', plumber.id)
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (emailsError) {
        console.error('Error fetching emails:', emailsError);
      } else {
        setPlumberEmails(emailsData || []);
      }
      
      // Fetch WhatsApp logs for this plumber
      const { data: whatsappData, error: whatsappError } = await supabase
        .from('whatsapp_logs')
        .select('*')
        .eq('plumber_id', plumber.id)
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (whatsappError) {
        console.error('Error fetching whatsapp logs:', whatsappError);
      } else {
        setPlumberWhatsApps(whatsappData || []);
      }
    } finally {
      setLoadingPlumberDetails(false);
    }
  };
  
  // Fetch WhatsApp logs when a request is selected
  const fetchRequestWhatsApps = async (requestId: string) => {
    setLoadingRequestWhatsApps(true);
    try {
      const { data, error } = await supabase
        .from('whatsapp_logs')
        .select('*')
        .eq('request_id', requestId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching request whatsapp logs:', error);
      } else {
        setRequestWhatsApps(data || []);
      }
    } finally {
      setLoadingRequestWhatsApps(false);
    }
  };

  const fetchRequests = async () => {
    // Fetch requests with accepted_by and assigned plumber info
    const { data, error } = await supabase
      .from('service_requests')
      .select(`
        *,
        accepted_by:accepted_by_id(full_name, email, phone),
        assigned_to:assigned_plumber_id(full_name, email, phone)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching requests:', error);
      return;
    }

    // Fetch all contact unlocks with plumber info
    const requestIds = (data || []).map(r => r.id);
    const { data: unlocksData, error: unlocksError } = await supabase
      .from('contact_unlocks')
      .select(`
        id,
        plumber_id,
        request_id,
        is_exclusive,
        unlocked_at,
        plumber:plumber_id(full_name, phone, email)
      `)
      .in('request_id', requestIds);

    if (unlocksError) {
      console.error('Error fetching unlocks:', unlocksError);
    }

    // Group unlocks by request_id
    const unlocksByRequest = new Map<string, ContactUnlock[]>();
    (unlocksData || []).forEach((unlock: any) => {
      const requestId = unlock.request_id;
      if (!unlocksByRequest.has(requestId)) {
        unlocksByRequest.set(requestId, []);
      }
      unlocksByRequest.get(requestId)!.push({
        ...unlock,
        plumber: unlock.plumber ? {
          full_name: unlock.plumber.full_name,
          phone: unlock.plumber.phone,
          email: unlock.plumber.email,
        } : undefined,
      });
    });

    setRequests((data || []).map(r => ({
      ...r,
      intervention_type: r.intervention_type as InterventionType,
      urgency: r.urgency as UrgencyType,
      property_type: r.property_type as PropertyType,
      accessibility: r.accessibility as AccessibilityType,
      accepted_by_name: (r.accepted_by as any)?.full_name,
      accepted_by_email: (r.accepted_by as any)?.email,
      accepted_by_phone: (r.accepted_by as any)?.phone,
      assigned_to_name: (r.assigned_to as any)?.full_name,
      unlocks: unlocksByRequest.get(r.id) || [],
    })));
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

  const filteredRequests = requests.filter(r => {
    const matchesSearch = r.client_name.toLowerCase().includes(searchRequest.toLowerCase()) ||
      r.city.toLowerCase().includes(searchRequest.toLowerCase()) ||
      r.description.toLowerCase().includes(searchRequest.toLowerCase()) ||
      (r.accepted_by_name?.toLowerCase().includes(searchRequest.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case 'accepted':
        return <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs font-medium px-2 py-1 rounded"><CheckCircle className="h-3 w-3" />Accettata</span>;
      case 'assigned':
        return <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 text-xs font-medium px-2 py-1 rounded"><Clock className="h-3 w-3" />Assegnata</span>;
      case 'expired':
        return <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 text-xs font-medium px-2 py-1 rounded"><XCircle className="h-3 w-3" />Scaduta</span>;
      case 'new':
      default:
        return <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-medium px-2 py-1 rounded"><AlertCircle className="h-3 w-3" />Nuova</span>;
    }
  };

  const getPlanBadge = (plumber: PlumberWithSubscription) => {
    const sub = plumber.subscription;
    if (!sub) return <Badge variant="outline">Nessun piano</Badge>;
    
    if (sub.is_trial) {
      return (
        <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
          <Timer className="h-3 w-3 mr-1" />
          Trial ({sub.free_requests_remaining ?? 0} richieste)
        </Badge>
      );
    }
    
    const planColors: Record<string, string> = {
      premium: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      medium: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      basic: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    };
    
    return (
      <Badge variant="secondary" className={planColors[sub.plan_type] || planColors.basic}>
        <CreditCard className="h-3 w-3 mr-1" />
        {sub.plan_type.charAt(0).toUpperCase() + sub.plan_type.slice(1)}
      </Badge>
    );
  };

  const getResponseBadge = (responseType: string | null) => {
    switch (responseType) {
      case 'accepted':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"><CheckCircle className="h-3 w-3 mr-1" />Accettata</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"><XCircle className="h-3 w-3 mr-1" />Rifiutata</Badge>;
      case 'timeout':
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"><Clock className="h-3 w-3 mr-1" />Scaduta</Badge>;
      default:
        return <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />In attesa</Badge>;
    }
  };

  const getEmailStatusBadge = (email: EmailLog) => {
    if (email.opened_at) {
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"><MailOpen className="h-3 w-3 mr-1" />Aperta</Badge>;
    }
    if (email.delivered_at) {
      return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"><CheckCircle className="h-3 w-3 mr-1" />Consegnata</Badge>;
    }
    if (email.status === 'sent') {
      return <Badge variant="outline"><Send className="h-3 w-3 mr-1" />Inviata</Badge>;
    }
    return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Errore</Badge>;
  };

  const getWhatsAppStatusBadge = (wa: WhatsAppLog) => {
    if (wa.read_at) {
      return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"><CheckCheck className="h-3 w-3 mr-1" />Letto</Badge>;
    }
    if (wa.delivered_at) {
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"><CheckCircle className="h-3 w-3 mr-1" />Consegnato</Badge>;
    }
    if (wa.status === 'sent') {
      return <Badge variant="outline"><Send className="h-3 w-3 mr-1" />Inviato</Badge>;
    }
    if (wa.status === 'failed') {
      return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Errore</Badge>;
    }
    return <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />In attesa</Badge>;
  };

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
      <Helmet>
        <title>Pannello Admin | Idraulici Subito</title>
        <meta name="description" content="Pannello di amministrazione per la gestione di professionisti e richieste." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-lg p-2">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{plumbers.length}</p>
                  <p className="text-xs text-muted-foreground">Idraulici</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/10 rounded-lg p-2">
                  <AlertCircle className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{requests.filter(r => r.status === 'new').length}</p>
                  <p className="text-xs text-muted-foreground">Nuove</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center gap-3">
                <div className="bg-success/10 rounded-lg p-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{requests.filter(r => r.status === 'accepted').length}</p>
                  <p className="text-xs text-muted-foreground">Accettate</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500/10 rounded-lg p-2">
                  <Unlock className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{requests.filter(r => r.unlocks && r.unlocks.length > 0).length}</p>
                  <p className="text-xs text-muted-foreground">Sbloccate</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center gap-3">
                <div className="bg-destructive/10 rounded-lg p-2">
                  <XCircle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{requests.filter(r => r.status === 'expired').length}</p>
                  <p className="text-xs text-muted-foreground">Scadute</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="quick" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="quick">
                <Plus className="h-4 w-4 mr-2" />
                Inserimento
              </TabsTrigger>
              <TabsTrigger value="plumbers">
                <Users className="h-4 w-4 mr-2" />
                Idraulici
              </TabsTrigger>
              <TabsTrigger value="requests">
                <FileText className="h-4 w-4 mr-2" />
                Richieste
              </TabsTrigger>
              <TabsTrigger value="seo">
                <Globe className="h-4 w-4 mr-2" />
                SEO Tools
              </TabsTrigger>
            </TabsList>

            {/* Quick Request Form Tab */}
            <TabsContent value="quick" className="space-y-4">
              <QuickRequestForm onRequestCreated={fetchRequests} />
            </TabsContent>

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
                      className="bg-card rounded-lg border border-border p-4 hover:border-primary/50 transition-colors cursor-pointer"
                      onClick={() => fetchPlumberDetails(plumber)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold text-foreground truncate">
                              {plumber.business_name}
                            </h3>
                            {plumber.email_verified ? (
                              <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                            ) : (
                              <XCircle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            )}
                            {getPlanBadge(plumber)}
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
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              fetchPlumberDetails(plumber);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteDialog({ type: 'plumber', id: plumber.id });
                            }}
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

            {/* Requests Tab */}
            <TabsContent value="requests" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cerca per nome, città, idraulico..."
                    value={searchRequest}
                    onChange={(e) => setSearchRequest(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">Tutti gli stati</option>
                  <option value="new">Nuove</option>
                  <option value="assigned">Assegnate</option>
                  <option value="accepted">Accettate</option>
                  <option value="expired">Scadute</option>
                </select>
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
                            {getStatusBadge(request.status)}
                            <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded">
                              {INTERVENTION_LABELS[request.intervention_type]}
                            </span>
                            <span className="inline-block bg-muted text-muted-foreground text-xs font-medium px-2 py-1 rounded">
                              {URGENCY_LABELS[request.urgency]}
                            </span>
                          </div>
                          <p className="text-foreground text-sm mb-2 line-clamp-2">{request.description}</p>
                          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-2">
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
                          {/* Stato accettazione/sblocco */}
                          {(request.unlocks && request.unlocks.length > 0) || request.accepted_by_name ? (
                            <div className="mt-2 pt-2 border-t border-border">
                              {/* Mostra chi ha sbloccato/accettato */}
                              {request.unlocks && request.unlocks.length > 0 ? (
                                <>
                                  <p className="text-xs font-medium text-success mb-1 flex items-center gap-1">
                                    <CheckCircle className="h-3 w-3" />
                                    Presa in carico da {request.unlocks.length} idraulic{request.unlocks.length === 1 ? 'o' : 'i'}:
                                  </p>
                                  <div className="flex flex-wrap gap-1">
                                    {request.unlocks.map((unlock) => (
                                      <Badge 
                                        key={unlock.id} 
                                        variant="outline" 
                                        className="text-xs bg-success/10 border-success/30 text-success"
                                      >
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        {unlock.plumber?.full_name || 'N/A'}
                                        {unlock.is_exclusive && ' (Esclusivo)'}
                                        {unlock.plumber?.phone && (
                                          <span className="ml-1 text-muted-foreground">• {unlock.plumber.phone}</span>
                                        )}
                                      </Badge>
                                    ))}
                                  </div>
                                </>
                              ) : request.accepted_by_name && (
                                <>
                                  <p className="text-xs font-medium text-success mb-1 flex items-center gap-1">
                                    <CheckCircle className="h-3 w-3" />
                                    Presa in carico:
                                  </p>
                                  <Badge 
                                    variant="outline" 
                                    className="text-xs bg-success/10 border-success/30 text-success"
                                  >
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    {request.accepted_by_name}
                                    {request.accepted_by_phone && (
                                      <span className="ml-1 text-muted-foreground">• {request.accepted_by_phone}</span>
                                    )}
                                  </Badge>
                                </>
                              )}
                            </div>
                          ) : (
                            <div className="mt-2 pt-2 border-t border-border">
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                Nessun idraulico ha ancora preso in carico questa richiesta
                              </p>
                            </div>
                          )}
                          {/* Assegnazione in corso */}
                          {request.status === 'assigned' && request.assigned_to_name && (
                            <div className="mt-2 pt-2 border-t border-border">
                              <p className="text-xs text-muted-foreground mb-1">In attesa di risposta da:</p>
                              <p className="text-sm font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {request.assigned_to_name}
                              </p>
                              {request.assignment_expires_at && (
                                <p className="text-xs text-muted-foreground">
                                  Scade: {formatDate(request.assignment_expires_at)}
                                </p>
                              )}
                            </div>
                          )}
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

            {/* SEO Tools Tab */}
            <TabsContent value="seo" className="space-y-4">
              <UrlExporter />
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
      <AlertDialog open={!!selectedRequest} onOpenChange={(open) => {
        if (!open) {
          setSelectedRequest(null);
          setRequestWhatsApps([]);
        }
      }}>
        <AlertDialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
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
              {/* Plumber info in dialog */}
              {selectedRequest.accepted_by_name && (
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Idraulico che ha accettato</p>
                  <p className="text-foreground font-medium text-green-600 dark:text-green-400">{selectedRequest.accepted_by_name}</p>
                  {selectedRequest.accepted_by_phone && (
                    <p className="text-foreground">{selectedRequest.accepted_by_phone}</p>
                  )}
                  {selectedRequest.accepted_by_email && (
                    <p className="text-foreground">{selectedRequest.accepted_by_email}</p>
                  )}
                  {selectedRequest.accepted_at && (
                    <p className="text-xs text-muted-foreground mt-1">Accettata il: {formatDate(selectedRequest.accepted_at)}</p>
                  )}
                </div>
              )}
              {selectedRequest.status === 'assigned' && selectedRequest.assigned_to_name && (
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Attualmente assegnata a</p>
                  <p className="text-foreground font-medium text-yellow-600 dark:text-yellow-400">{selectedRequest.assigned_to_name}</p>
                  {selectedRequest.assignment_expires_at && (
                    <p className="text-xs text-muted-foreground mt-1">Scadenza: {formatDate(selectedRequest.assignment_expires_at)}</p>
                  )}
                </div>
              )}
              
              {/* WhatsApp Logs for this request */}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-green-600" />
                    Notifiche WhatsApp
                  </p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => fetchRequestWhatsApps(selectedRequest.id)}
                    disabled={loadingRequestWhatsApps}
                  >
                    {loadingRequestWhatsApps ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    ) : (
                      'Carica'
                    )}
                  </Button>
                </div>
                {requestWhatsApps.length > 0 ? (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {requestWhatsApps.map((wa) => (
                      <div key={wa.id} className="flex items-center justify-between bg-muted/50 rounded p-2 text-sm">
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-foreground font-medium">{wa.recipient_name}</p>
                          <p className="text-xs text-muted-foreground">
                            {wa.recipient_phone} • {formatDate(wa.created_at)}
                          </p>
                          {wa.read_at && (
                            <p className="text-xs text-blue-600 dark:text-blue-400">
                              Letto: {formatDate(wa.read_at)}
                            </p>
                          )}
                        </div>
                        <div>
                          {getWhatsAppStatusBadge(wa)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">Clicca "Carica" per vedere le notifiche</p>
                )}
              </div>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Chiudi</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Plumber detail dialog */}
      <Dialog open={!!selectedPlumber} onOpenChange={() => setSelectedPlumber(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {selectedPlumber?.business_name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedPlumber && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nome completo</p>
                  <p className="text-foreground">{selectedPlumber.full_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Città principale</p>
                  <p className="text-foreground">{selectedPlumber.main_city}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Telefono</p>
                  <p className="text-foreground">{selectedPlumber.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-foreground">{selectedPlumber.email}</p>
                </div>
              </div>

              {/* Credits Info */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Coins className="h-4 w-4 text-amber-500" />
                  Crediti
                </h4>
                {selectedPlumber.credits ? (
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-background rounded-lg p-3">
                      <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                        {selectedPlumber.credits.balance}
                      </p>
                      <p className="text-xs text-muted-foreground">Saldo attuale</p>
                    </div>
                    <div className="bg-background rounded-lg p-3">
                      <p className="text-2xl font-bold text-success">
                        {selectedPlumber.credits.total_purchased}
                      </p>
                      <p className="text-xs text-muted-foreground">Acquistati</p>
                    </div>
                    <div className="bg-background rounded-lg p-3">
                      <p className="text-2xl font-bold text-destructive">
                        {selectedPlumber.credits.total_spent}
                      </p>
                      <p className="text-xs text-muted-foreground">Spesi</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">Nessun credito trovato</p>
                )}
              </div>

              {/* Trial Status */}
              {selectedPlumber.subscription && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Timer className="h-4 w-4" />
                    Stato Trial
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Piano:</span>
                      {getPlanBadge(selectedPlumber)}
                    </div>
                    
                    {selectedPlumber.subscription.is_trial && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Richieste gratuite rimanenti:</span>
                          <span className="font-bold text-lg text-foreground">
                            {selectedPlumber.subscription.free_requests_remaining ?? 0} / 3
                          </span>
                        </div>
                        <Progress 
                          value={((selectedPlumber.subscription.free_requests_remaining ?? 0) / 3) * 100} 
                          className="h-2"
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <Badge variant={selectedPlumber.subscription.status === 'active' ? 'default' : 'secondary'}>
                        {selectedPlumber.subscription.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}

              {/* Assignment History */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Storico Richieste ({plumberAssignments.length})
                </h4>
                {loadingPlumberDetails ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                ) : plumberAssignments.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Nessuna richiesta ricevuta</p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {plumberAssignments.map((assignment) => (
                      <div key={assignment.id} className="flex items-center justify-between bg-background rounded p-2 text-sm">
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-foreground">
                            {assignment.request?.city} - {assignment.request?.intervention_type ? INTERVENTION_LABELS[assignment.request.intervention_type] : 'N/A'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(assignment.assigned_at)}
                          </p>
                        </div>
                        <div>
                          {getResponseBadge(assignment.response_type)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Email History */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Inviate ({plumberEmails.length})
                </h4>
                {loadingPlumberDetails ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                ) : plumberEmails.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Nessuna email inviata</p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {plumberEmails.map((email) => (
                      <div key={email.id} className="flex items-center justify-between bg-background rounded p-2 text-sm">
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-foreground">{email.subject}</p>
                          <p className="text-xs text-muted-foreground">
                            {email.email_type} • {formatDate(email.created_at)}
                          </p>
                        </div>
                        <div>
                          {getEmailStatusBadge(email)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* WhatsApp History */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-green-600" />
                  WhatsApp Inviati ({plumberWhatsApps.length})
                </h4>
                {loadingPlumberDetails ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                ) : plumberWhatsApps.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Nessun WhatsApp inviato</p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {plumberWhatsApps.map((wa) => (
                      <div key={wa.id} className="flex items-center justify-between bg-background rounded p-2 text-sm">
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-foreground">{wa.message_type}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(wa.created_at)}
                          </p>
                        </div>
                        <div>
                          {getWhatsAppStatusBadge(wa)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {plumberAssignments.filter(a => a.response_type === 'accepted').length}
                  </p>
                  <p className="text-xs text-muted-foreground">Accettate</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {plumberAssignments.filter(a => a.response_type === 'timeout').length}
                  </p>
                  <p className="text-xs text-muted-foreground">Scadute</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {plumberEmails.filter(e => e.opened_at).length}/{plumberEmails.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Email aperte</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
