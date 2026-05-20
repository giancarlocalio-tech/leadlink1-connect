import { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MessageSquare, Plus, MapPin, Clock, LogOut, Loader2 } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { usePlumberProfile } from '@/hooks/usePlumberProfile';
import { INTERVENTION_LABELS } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';
import { toast } from 'sonner';

type Req = {
  id: string;
  intervention_type: string;
  city: string;
  description: string;
  urgency: string;
  status: string;
  created_at: string;
};

type Conv = {
  id: string;
  request_id: string;
  client_access_token: string;
  last_message_at: string;
  plumber_name: string;
  last_message_preview: string | null;
  last_sender: 'plumber' | 'client' | null;
};

export default function ClientAccountPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();
  const { profile: plumberProfile, loading: plumberLoading, hasFetched: plumberFetched } = usePlumberProfile() as any;
  const [requests, setRequests] = useState<Req[]>([]);
  const [convsByReq, setConvsByReq] = useState<Record<string, Conv[]>>({});
  const [loading, setLoading] = useState(true);
  const justRegistered = (location.state as any)?.justRegistered;

  // Redirect not-logged-in users to login
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth?returnUrl=' + encodeURIComponent('/account'));
    }
  }, [user, authLoading, navigate]);

  // Role guard: if this auth user is also a plumber, the proper area is the plumber dashboard.
  // Avoid loading client UI for them to prevent the "Saldo insufficiente" misidentification.
  useEffect(() => {
    if (!authLoading && user && plumberFetched && plumberProfile) {
      navigate('/dashboard/richieste', { replace: true });
    }
  }, [authLoading, user, plumberFetched, plumberProfile, navigate]);

  useEffect(() => {
    // Fetch as soon as auth is ready. Don't block on the plumber-profile lookup
    // (it runs in parallel for the role-redirect effect above). On mobile/flaky
    // networks the plumber query could hang and leave this page stuck on the
    // loading skeleton.
    if (authLoading || !user) return;
    if (plumberProfile) return; // plumber — redirect effect will navigate away

    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const ownEmail = user.email?.toLowerCase() || '';
        const [byUserIdRes, byEmailRes] = await Promise.all([
          supabase
            .from('service_requests')
            .select('id, intervention_type, city, description, urgency, status, created_at')
            .eq('client_user_id', user.id)
            .order('created_at', { ascending: false }),
          ownEmail
            ? supabase
                .from('service_requests')
                .select('id, intervention_type, city, description, urgency, status, created_at')
                .ilike('client_email', ownEmail)
                .order('created_at', { ascending: false })
            : Promise.resolve({ data: [] as Req[], error: null } as any),
        ]);

        if (byUserIdRes.error) console.error('Error loading client requests:', byUserIdRes.error);
        if ((byEmailRes as any).error) console.error('Error loading client requests by email:', (byEmailRes as any).error);

        const merged: Record<string, Req> = {};
        ([...(byUserIdRes.data || []), ...(((byEmailRes as any).data) || [])] as Req[]).forEach((r) => {
          merged[r.id] = r;
        });
        const reqList = Object.values(merged).sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        if (cancelled) return;
        setRequests(reqList);

        if (reqList.length > 0) {
          const ids = reqList.map((r) => r.id);
          const { data: convs, error: convErr } = await supabase
            .from('conversations')
            .select(`
              id, request_id, plumber_id, client_access_token, last_message_at,
              plumber:plumber_profiles!conversations_plumber_id_fkey ( full_name, business_name )
            `)
            .in('request_id', ids)
            .order('last_message_at', { ascending: false });

          let convRows: any[] = convs || [];
          if (convErr || !convs) {
            const { data: c2 } = await supabase
              .from('conversations')
              .select('id, request_id, plumber_id, client_access_token, last_message_at')
              .in('request_id', ids)
              .order('last_message_at', { ascending: false });
            convRows = c2 || [];
            if (convRows.length > 0) {
              const plumberIds = Array.from(new Set(convRows.map((c) => c.plumber_id)));
              const { data: plumbers } = await supabase
                .from('plumber_profiles')
                .select('id, full_name, business_name')
                .in('id', plumberIds);
              const byId: Record<string, any> = {};
              (plumbers || []).forEach((p: any) => { byId[p.id] = p; });
              convRows = convRows.map((c) => ({ ...c, plumber: byId[c.plumber_id] }));
            }
          }

          let lastByConv: Record<string, { content: string; sender_type: 'plumber' | 'client' }> = {};
          if (convRows.length > 0) {
            const convIds = convRows.map((c) => c.id);
            const { data: msgs } = await supabase
              .from('conversation_messages')
              .select('conversation_id, content, sender_type, created_at')
              .in('conversation_id', convIds)
              .order('created_at', { ascending: false });
            (msgs || []).forEach((m: any) => {
              if (!lastByConv[m.conversation_id]) {
                lastByConv[m.conversation_id] = { content: m.content, sender_type: m.sender_type };
              }
            });
          }

          const map: Record<string, Conv[]> = {};
          convRows.forEach((c: any) => {
            const last = lastByConv[c.id];
            (map[c.request_id] ||= []).push({
              id: c.id,
              request_id: c.request_id,
              client_access_token: c.client_access_token,
              last_message_at: c.last_message_at,
              plumber_name: c.plumber?.business_name || c.plumber?.full_name || 'Idraulico',
              last_message_preview: last?.content ?? null,
              last_sender: last?.sender_type ?? null,
            });
          });
          if (cancelled) return;
          setConvsByReq(map);
        } else {
          setConvsByReq({});
        }
      } catch (err) {
        console.error('Unexpected error loading client account:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [user, authLoading, plumberProfile]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/');
    toast.success('Disconnesso');
  };

  // Role-resolution skeleton: avoid flashing the wrong UI before role is known.
  if (authLoading || (user && !plumberFetched) || (user && plumberProfile)) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Area Cliente | Idraulici Subito</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Le mie richieste</h1>
              <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
            </div>
            <div className="flex gap-2">
              <Button asChild size="sm">
                <Link to="/"><Plus className="h-4 w-4 mr-1" />Nuova</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {justRegistered && (
            <Card className="p-4 mb-6 bg-primary/5 border-primary/20">
              <p className="text-sm">
                ✅ Richiesta inviata! Stiamo avvisando gli idraulici della tua zona. Riceverai email e WhatsApp quando ti risponderanno.
              </p>
            </Card>
          )}

          {loading ? (
            <p className="text-muted-foreground">Caricamento…</p>
          ) : requests.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground mb-4">Non hai ancora richieste.</p>
              <Button asChild><Link to="/">Crea richiesta</Link></Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {requests.map((r) => {
                const convs = convsByReq[r.id] || [];
                return (
                  <Card key={r.id} className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold">
                        {INTERVENTION_LABELS[r.intervention_type as keyof typeof INTERVENTION_LABELS] || r.intervention_type}
                      </h3>
                      <Badge variant={r.status === 'new' ? 'default' : 'secondary'}>
                        {r.status === 'new' ? 'Attiva' : r.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{r.city}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{formatDistanceToNow(new Date(r.created_at), { addSuffix: true, locale: it })}</span>
                    </div>
                    <p className="text-sm mb-4 line-clamp-2">{r.description}</p>
                    {convs.length > 0 ? (
                      <div className="space-y-2 pt-3 border-t">
                        <p className="text-xs font-medium text-muted-foreground">
                          {convs.length} {convs.length === 1 ? 'preventivo ricevuto' : 'preventivi ricevuti'}
                        </p>
                        {convs.map((c) => (
                          <Link
                            key={c.id}
                            to={`/chat/${c.client_access_token}`}
                            className="block rounded-lg border border-border hover:border-primary/40 hover:bg-muted/50 transition p-3"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <MessageSquare className="h-4 w-4 text-primary shrink-0" />
                                  <p className="font-semibold text-sm truncate">{c.plumber_name}</p>
                                </div>
                                {c.last_message_preview ? (
                                  <p className="text-xs text-muted-foreground line-clamp-1">
                                    <span className="font-medium">
                                      {c.last_sender === 'client' ? 'Tu: ' : ''}
                                    </span>
                                    {c.last_message_preview}
                                  </p>
                                ) : (
                                  <p className="text-xs text-muted-foreground italic">
                                    Nessun messaggio ancora — apri per scrivere
                                  </p>
                                )}
                              </div>
                              <span className="text-[10px] text-muted-foreground shrink-0">
                                {formatDistanceToNow(new Date(c.last_message_at), { addSuffix: false, locale: it })}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground pt-3 border-t">
                        Nessuna risposta ancora. Ti avviseremo via email e WhatsApp.
                      </p>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
