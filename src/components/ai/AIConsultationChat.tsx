import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Send, Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAIConsultation } from "@/hooks/useAIConsultation";
import { MediaUploader } from "./MediaUploader";
import { PaywallCard } from "./PaywallCard";
import { LocalPlumbersCard } from "./LocalPlumbersCard";
import { AIGeneratedImage } from "./AIGeneratedImage";

// Splits assistant text into markdown segments and inline [IMG: ...] tags.
function splitByImageTags(text: string): Array<{ type: "text" | "img"; value: string }> {
  const re = /\[IMG:\s*([^\]\n]+)\]/gi;
  const out: Array<{ type: "text" | "img"; value: string }> = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push({ type: "text", value: text.slice(last, m.index) });
    out.push({ type: "img", value: m[1].trim() });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ type: "text", value: text.slice(last) });
  return out;
}


interface Props {
  initialPrompt?: string;
  problemHint?: string;
  cityHint?: string;
}

export function AIConsultationChat({ initialPrompt, problemHint, cityHint }: Props) {
  const [input, setInput] = useState(initialPrompt ?? "");
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [showPlumbers, setShowPlumbers] = useState(false);
  const {
    messages,
    status,
    send,
    userMessageCount,
    paywallVisible,
    paywallError,
    setPaywallVisible,
  } = useAIConsultation(problemHint);

  const messagesRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, paywallVisible, showPlumbers, status]);

  useEffect(() => {
    // Do not autofocus on mount — on mobile it opens the keyboard and scrolls the page.
  }, []);


  const isLoading = status === "submitted" || status === "streaming";
  const disabled = isLoading || paywallVisible;

  async function handleSend() {
    if (!input.trim() && mediaUrls.length === 0) return;
    const text = input;
    const urls = mediaUrls;
    setInput("");
    setMediaUrls([]);
    await send(text, urls);
    setTimeout(() => textareaRef.current?.focus(), 100);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex flex-col h-full bg-background rounded-2xl border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-card flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
            🔧
          </div>
          <div>
            <div className="font-bold text-sm">Idraulico AI</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Online · risponde in italiano
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setShowPlumbers((v) => !v)} className="gap-1 text-xs">
          <MapPin className="w-3.5 h-3.5" />
          Idraulico vicino
        </Button>
      </div>

      {/* Messages */}
      <div ref={messagesRef} className="flex-1 overflow-y-auto overscroll-contain p-3 md:p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-6 md:py-10 max-w-lg mx-auto">
            <div className="text-5xl mb-3">👋</div>
            <h3 className="font-black text-lg md:text-xl mb-2">Ciao! Sono il tuo Idraulico AI</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Descrivimi cosa succede oppure scegli un problema qui sotto. Puoi anche caricare foto o video.
            </p>
            <div className="grid grid-cols-2 gap-2 text-left">
              {[
                { emoji: "💧", label: "Perdita d'acqua", prompt: "Ho una perdita d'acqua, non so da dove viene." },
                { emoji: "🚿", label: "Scarico otturato", prompt: "Il mio scarico è otturato e non defluisce." },
                { emoji: "🔥", label: "Caldaia in blocco", prompt: "La caldaia si è bloccata e non si accende." },
                { emoji: "🚽", label: "WC che perde", prompt: "Il WC perde acqua continuamente." },
              ].map((s) => (
                <button
                  key={s.label}
                  onClick={() => { setInput(s.prompt); setTimeout(() => textareaRef.current?.focus(), 50); }}
                  className="flex items-center gap-2 rounded-xl border bg-card hover:border-primary hover:bg-primary/5 px-3 py-2.5 text-sm text-left transition"
                >
                  <span className="text-lg">{s.emoji}</span>
                  <span className="font-medium truncate">{s.label}</span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground/70 mt-4">Prima diagnosi gratis · niente registrazione</p>
          </div>
        )}


        {messages.map((m) => {
          const text = m.parts
            .filter((p: any) => p.type === "text")
            .map((p: any) => p.text)
            .join("");
          const files = m.parts.filter((p: any) => p.type === "file" || p.type === "image");
          return (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "user" ? (
                <div className="max-w-[85%] bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-2.5">
                  {files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {files.map((f: any, i: number) => (
                        <img key={i} src={f.url ?? f.image} alt="" className="w-24 h-24 rounded-lg object-cover" />
                      ))}
                    </div>
                  )}
                  {text && <div className="whitespace-pre-wrap text-sm">{text}</div>}
                </div>
              ) : (
                <div className="max-w-[92%] md:max-w-[85%]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-sky-500 flex items-center justify-center text-sm shadow-sm">🔧</div>
                    <span className="text-xs font-semibold text-foreground">Idraulico AI</span>
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-card border px-4 py-3 shadow-sm">
                    <div className="prose prose-sm max-w-none text-[15px] leading-[1.65]
                      prose-p:my-2.5 prose-p:leading-[1.65]
                      prose-headings:font-bold prose-headings:mt-4 prose-headings:mb-2 prose-headings:text-foreground
                      prose-h1:text-lg prose-h2:text-base prose-h3:text-[15px]
                      prose-ul:my-2.5 prose-ol:my-2.5 prose-ul:pl-5 prose-ol:pl-5
                      prose-li:my-1.5 prose-li:leading-[1.6] prose-li:marker:text-primary
                      prose-strong:text-foreground prose-strong:font-bold
                      prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                      prose-hr:my-4 prose-hr:border-border
                      prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-[13px] prose-code:before:content-none prose-code:after:content-none">
                      {splitByImageTags(text).map((seg, i) =>
                        seg.type === "img" ? (
                          <AIGeneratedImage key={i} prompt={seg.value} />
                        ) : (
                          <ReactMarkdown key={i}>{seg.value}</ReactMarkdown>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 pl-9">
            <span className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" />
            </span>
            <span className="text-xs text-muted-foreground">L'AI sta scrivendo…</span>
          </div>
        )}


        {paywallError && (
          <div className="text-sm text-destructive px-3 py-2 rounded-lg bg-destructive/10">
            {paywallError}
          </div>
        )}

        {paywallVisible && <PaywallCard onClose={() => setPaywallVisible(false)} />}

        {showPlumbers && <LocalPlumbersCard defaultCity={cityHint} />}

      </div>


      {/* Composer */}
      <div className="border-t bg-card p-3 space-y-2">
        <MediaUploader onChange={setMediaUrls} disabled={disabled} />
        <div className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={paywallVisible ? "Sblocca la consulenza per continuare..." : "Descrivi il problema o fai una domanda..."}
            className="flex-1 resize-none rounded-xl border bg-background px-3 py-2 text-sm min-h-[44px] max-h-32 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            rows={1}
            disabled={disabled}
          />
          <Button onClick={handleSend} disabled={disabled || (!input.trim() && mediaUrls.length === 0)} size="icon" className="shrink-0">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground text-center">
          I consigli dell'AI sono informativi. Per interventi su gas, caldaie o elettricità serve sempre un tecnico abilitato.
        </p>
      </div>
    </div>
  );
}
