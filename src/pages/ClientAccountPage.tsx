import { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MessageSquare, Plus, MapPin, Clock, LogOut } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
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
};

export default function ClientAccountPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();
  const [requests, setRequests] = useState<Req[]>([]);
  const [convsByReq, setConvsByReq] = useState<Record<string, Conv[]>>({});
  const [loading, setLoading] = useState(true);
  const justRegistered = (location.state as any)?.justRegistered;

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth?returnUrl=' + encodeURIComponent('/account'));
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      const { data: reqs } = await supabase
        .from('service_requests')
        .select('id, intervention_type, city, description, urgency, status, created_at, client_user_id, client_email')
        .or(`client_user_id.eq.${user.id}${user.email ? `,client_email.eq.${user.email}` : ''}`)
        .order('created_at', { ascending: false });
      setRequests((reqs as Req[]) || []);
      if (reqs && reqs.length > 0) {
        const ids = reqs.map((r: any) => r.id);
        const { data: convs } = await supabase
          .from('conversations')
          .select('id, request_id, client_access_token, last_message_at')
          .in('request_id', ids);
        const map: Record<string, Conv[]> = {};
        (convs || []).forEach((c: any) => {
          (map[c.request_id] ||= []).push(c);
        });
        setConvsByReq(map);
      }
      setLoading(false);
    })();
  }, [user]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/');
    toast.success('Disconnesso');
  };

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
                          {convs.length} {convs.length === 1 ? 'idraulico ti ha risposto' : 'idraulici ti hanno risposto'}
                        </p>
                        {convs.map((c) => (
                          <Button key={c.id} asChild variant="outline" size="sm" className="w-full justify-start">
                            <Link to={`/chat/${c.client_access_token}`}>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Apri chat
                            </Link>
                          </Button>
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
