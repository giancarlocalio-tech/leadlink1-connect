import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MessageSquare, Send, ArrowLeft, Phone, Info } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/useAuth';
import { usePlumberProfile } from '@/hooks/usePlumberProfile';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';
import { INTERVENTION_LABELS } from '@/lib/types';
import { cn } from '@/lib/utils';

type ConversationRow = {
  id: string;
  request_id: string;
  plumber_id: string;
  client_access_token: string;
  quote_amount_cents: number | null;
  last_message_at: string;
  created_at: string;
};

type EnrichedConversation = ConversationRow & {
  client_name: string;
  client_phone: string | null;
  service: string;
  city: string;
  description: string;
  last_message_preview: string | null;
};

type Message = {
  id: string;
  conversation_id: string;
  sender_type: 'plumber' | 'client';
  content: string;
  created_at: string;
};

const initials = (name?: string | null) =>
  (name || '?')
    .split(' ')
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

export default function PreventiviPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading, hasFetched } = usePlumberProfile();
  const [conversations, setConversations] = useState<EnrichedConversation[]>([]);
  const [loadingConvs, setLoadingConvs] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sending, setSending] = useState(false);
  const [draft, setDraft] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth?returnUrl=' + encodeURIComponent('/dashboard/preventivi'));
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!authLoading && user && hasFetched && !profile) {
      navigate('/account', { replace: true });
    }
  }, [authLoading, user, hasFetched, profile, navigate]);

  const fetchConversations = useCallback(async () => {
    if (!profile?.id) return;
    setLoadingConvs(true);
    const { data: convs, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('plumber_id', profile.id)
      .order('last_message_at', { ascending: false });

    if (error) {
      toast.error('Errore caricamento preventivi');
      setLoadingConvs(false);
      return;
    }

    const [{ data: reqs }, { data: lastMsgs }] = await Promise.all([
      // Use SECURITY DEFINER RPC so plumbers who unlocked a contact (shared lead model,
      // no assigned_plumber_id) can still see client name + phone. Phone is auto-redacted
      // server-side when the client did NOT authorise phone contact.
      supabase.rpc('get_my_unlocked_requests'),
      (convs || []).length
        ? supabase
            .from('conversation_messages')
            .select('conversation_id, content, created_at')
            .in('conversation_id', (convs || []).map((c) => c.id))
            .order('created_at', { ascending: false })
        : Promise.resolve({ data: [] as any[] }),
    ]);

    const reqMap = new Map((reqs || []).map((r: any) => [r.id, r]));
    const lastMap = new Map<string, string>();
    for (const m of (lastMsgs || []) as any[]) {
      if (!lastMap.has(m.conversation_id)) lastMap.set(m.conversation_id, m.content);
    }

    const enriched: EnrichedConversation[] = (convs || []).map((c: any) => {
      const r = reqMap.get(c.request_id) as any;
      return {
        ...c,
        client_name: r?.client_name || 'Cliente',
        client_phone: r?.client_phone || null,
        service: r?.intervention_type ? INTERVENTION_LABELS[r.intervention_type] || r.intervention_type : 'Servizio',
        city: r?.city || '',
        description: r?.description || '',
        last_message_preview: lastMap.get(c.id) || null,
      };
    });

    setConversations(enriched);
    setLoadingConvs(false);
    if (!activeId && enriched.length > 0) setActiveId(enriched[0].id);
  }, [profile?.id, activeId]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Fetch messages of active conversation
  useEffect(() => {
    if (!activeId) {
      setMessages([]);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from('conversation_messages')
        .select('*')
        .eq('conversation_id', activeId)
        .order('created_at', { ascending: true });
      if (!cancelled && !error) setMessages((data || []) as Message[]);
    })();
    return () => {
      cancelled = true;
    };
  }, [activeId]);

  // Realtime subscription on messages for active conversation
  useEffect(() => {
    if (!activeId) return;
    const channel = supabase
      .channel(`messages-${activeId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'conversation_messages', filter: `conversation_id=eq.${activeId}` },
        (payload) => {
          setMessages((prev) =>
            prev.some((m) => m.id === (payload.new as any).id) ? prev : [...prev, payload.new as Message],
          );
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeId]);

  // Auto-scroll bottom
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages.length]);

  const activeConv = conversations.find((c) => c.id === activeId) || null;

  const handleSend = async () => {
    if (!activeId || !draft.trim()) return;
    setSending(true);
    const content = draft.trim();
    setDraft('');
    const { error } = await supabase.from('conversation_messages').insert({
      conversation_id: activeId,
      sender_type: 'plumber',
      content,
    });
    if (error) {
      toast.error('Errore invio messaggio');
      setDraft(content);
    }
    setSending(false);
  };

  if (authLoading || profileLoading || (user && !hasFetched) || (user && hasFetched && !profile)) {
    return (
      <DashboardLayout title="Preventivi" breadcrumbs={[{ label: 'Preventivi' }]}>
        <div className="py-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Preventivi" breadcrumbs={[{ label: 'Preventivi' }]}>
      <Helmet>
        <title>Preventivi | Dashboard Idraulici Subito</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-4 h-[calc(100vh-200px)] min-h-[500px]">
        {/* LIST */}
        <div
          className={cn(
            'border border-border rounded-2xl bg-card overflow-hidden flex flex-col',
            activeId && 'hidden md:flex',
          )}
        >
          <div className="px-4 py-3 border-b border-border">
            <h2 className="font-bold text-lg">Conversazioni</h2>
            <p className="text-xs text-muted-foreground">{conversations.length} attive</p>
          </div>
          <ScrollArea className="flex-1">
            {loadingConvs ? (
              <div className="p-6 text-center text-sm text-muted-foreground">Caricamento…</div>
            ) : conversations.length === 0 ? (
              <div className="p-6 text-center">
                <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  Nessun preventivo ancora. Sblocca una richiesta da{' '}
                  <button onClick={() => navigate('/dashboard/richieste')} className="text-primary underline">
                    Opportunità
                  </button>{' '}
                  per iniziare.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {conversations.map((c) => (
                  <li key={c.id}>
                    <button
                      onClick={() => setActiveId(c.id)}
                      className={cn(
                        'w-full text-left px-4 py-3 hover:bg-muted/60 transition flex gap-3 items-start',
                        c.id === activeId && 'bg-muted',
                      )}
                    >
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                          {initials(c.client_name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-sm truncate">{c.client_name}</span>
                          <span className="text-[11px] text-muted-foreground shrink-0">
                            {formatDistanceToNow(new Date(c.last_message_at), { locale: it, addSuffix: false })}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {c.service} {c.city && `· ${c.city}`}
                        </p>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {c.last_message_preview || 'Nessun messaggio ancora'}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </ScrollArea>
        </div>

        {/* CHAT */}
        <div
          className={cn(
            'border border-border rounded-2xl bg-card overflow-hidden flex flex-col',
            !activeId && 'hidden md:flex',
          )}
        >
          {!activeConv ? (
            <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
              Seleziona una conversazione
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="px-4 py-3 border-b border-border flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setActiveId(null)}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                    {initials(activeConv.client_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{activeConv.client_name}</p>
                  <p className="text-xs text-muted-foreground truncate">{activeConv.service}</p>
                </div>
                {activeConv.client_phone && (
                  <Button asChild variant="outline" size="icon">
                    <a href={`tel:${activeConv.client_phone}`} aria-label="Chiama cliente">
                      <Phone className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" aria-label="Dettagli richiesta">
                      <Info className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Dettagli richiesta</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4 space-y-3 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">Cliente</p>
                        <p className="font-medium">{activeConv.client_name}</p>
                      </div>
                      {activeConv.client_phone && (
                        <div>
                          <p className="text-muted-foreground text-xs">Telefono</p>
                          <p className="font-medium">{activeConv.client_phone}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-muted-foreground text-xs">Servizio</p>
                        <p className="font-medium">{activeConv.service}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Città</p>
                        <p className="font-medium">{activeConv.city}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Descrizione</p>
                        <p>{activeConv.description}</p>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-muted/20">
                {messages.length === 0 ? (
                  <div className="text-center text-sm text-muted-foreground py-12">
                    Nessun messaggio. Inizia tu la conversazione con il cliente.
                  </div>
                ) : (
                  messages.map((m) => (
                    <div
                      key={m.id}
                      className={cn('flex', m.sender_type === 'plumber' ? 'justify-end' : 'justify-start')}
                    >
                      <div
                        className={cn(
                          'max-w-[75%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap break-words',
                          m.sender_type === 'plumber'
                            ? 'bg-primary text-primary-foreground rounded-br-md'
                            : 'bg-background border border-border rounded-bl-md',
                        )}
                      >
                        {m.content}
                        <div
                          className={cn(
                            'text-[10px] mt-1 opacity-70',
                            m.sender_type === 'plumber' ? 'text-primary-foreground/80' : 'text-muted-foreground',
                          )}
                        >
                          {new Date(m.created_at).toLocaleTimeString('it-IT', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Composer */}
              <div className="border-t border-border p-3 flex gap-2 bg-card">
                <Input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Scrivi un messaggio…"
                  disabled={sending}
                  className="flex-1"
                />
                <Button onClick={handleSend} disabled={sending || !draft.trim()} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
