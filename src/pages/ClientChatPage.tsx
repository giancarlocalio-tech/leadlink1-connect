import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Send, Phone, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/client-chat`;

type Message = {
  id: string;
  sender_type: 'plumber' | 'client';
  content: string;
  created_at: string;
};

type ConversationInfo = {
  id: string;
  plumber_name: string;
  plumber_photo: string | null;
  plumber_phone: string | null;
  service: string | null;
  city: string | null;
  description: string | null;
  client_name: string | null;
  quote_amount_cents: number | null;
};

const initials = (name?: string | null) =>
  (name || '?')
    .split(' ')
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

export default function ClientChatPage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [info, setInfo] = useState<ConversationInfo | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchChat = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${FN_URL}?token=${encodeURIComponent(token)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'Errore di caricamento');
        return;
      }
      setInfo(data.conversation);
      setMessages(data.messages || []);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Errore di rete');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchChat();
  }, [fetchChat]);

  // Poll every 4 seconds
  useEffect(() => {
    if (!token || error) return;
    const id = setInterval(fetchChat, 4000);
    return () => clearInterval(id);
  }, [fetchChat, token, error]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages.length]);

  const handleSend = async () => {
    if (!draft.trim() || !token) return;
    setSending(true);
    const content = draft.trim();
    setDraft('');
    try {
      const res = await fetch(`${FN_URL}?token=${encodeURIComponent(token)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data?.error || 'Errore invio');
        setDraft(content);
      } else if (data?.message) {
        setMessages((prev) =>
          prev.some((m) => m.id === data.message.id) ? prev : [...prev, data.message],
        );
      }
    } catch {
      toast.error('Errore di rete');
      setDraft(content);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !info) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold mb-2">Chat non disponibile</h1>
          <p className="text-muted-foreground">
            {error || 'Il link non è valido o è scaduto.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Chat con {info.plumber_name} | Idraulici Subito</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-muted/30 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="-ml-2 shrink-0"
              aria-label="Indietro"
              onClick={() => {
                if (user) {
                  navigate('/account');
                } else if (window.history.length > 1) {
                  navigate(-1);
                } else {
                  navigate('/');
                }
              }}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Avatar className="h-11 w-11">
              {info.plumber_photo && <AvatarImage src={info.plumber_photo} alt={info.plumber_name} />}
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {initials(info.plumber_name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate">{info.plumber_name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {info.service || 'Idraulico'} {info.city && `· ${info.city}`}
              </p>
            </div>
            {info.plumber_phone && (
              <Button asChild variant="outline" size="icon">
                <a href={`tel:${info.plumber_phone}`} aria-label="Chiama">
                  <Phone className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </header>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-4 py-6 space-y-3">
            {info.description && (
              <div className="text-center text-xs text-muted-foreground bg-card border border-border rounded-xl px-4 py-3 mx-auto max-w-md">
                <p className="font-medium mb-1">La tua richiesta</p>
                <p className="opacity-80">{info.description}</p>
              </div>
            )}
            {messages.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-8">
                Nessun messaggio ancora. Aspetta che l'idraulico ti scriva oppure inizia tu.
              </p>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={cn('flex', m.sender_type === 'client' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      'max-w-[75%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap break-words',
                      m.sender_type === 'client'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-card border border-border rounded-bl-md',
                    )}
                  >
                    {m.content}
                    <div
                      className={cn(
                        'text-[10px] mt-1 opacity-70',
                        m.sender_type === 'client' ? 'text-primary-foreground/80' : 'text-muted-foreground',
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
        </div>

        {/* Composer */}
        <div className="bg-card border-t border-border sticky bottom-0">
          <div className="max-w-2xl mx-auto px-4 py-3 flex gap-2">
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
        </div>
      </div>
    </>
  );
}
