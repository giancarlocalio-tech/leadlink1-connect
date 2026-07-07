import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ArrowUp, Loader2 } from "lucide-react";
import { useAIConsultation } from "@/hooks/useAIConsultation";
import { MediaUploader } from "./MediaUploader";
import { PaywallCard } from "./PaywallCard";
import { LocalPlumbersCard } from "./LocalPlumbersCard";
import { AIGeneratedImage } from "./AIGeneratedImage";

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

const SUGGESTIONS = [
  { emoji: "💧", label: "Perdita d'acqua", prompt: "Ho una perdita d'acqua, non so da dove viene." },
  { emoji: "🚿", label: "Scarico otturato", prompt: "Il mio scarico è otturato e non defluisce." },
  { emoji: "🔥", label: "Caldaia in blocco", prompt: "La caldaia si è bloccata e non si accende." },
  { emoji: "🚽", label: "WC che perde", prompt: "Il WC perde acqua continuamente." },
];

export function AIConsultationChat({ initialPrompt, problemHint, cityHint }: Props) {
  const [input, setInput] = useState(initialPrompt ?? "");
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const {
    messages,
    status,
    send,
    paywallVisible,
    paywallError,
    setPaywallVisible,
  } = useAIConsultation(problemHint);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, paywallVisible, status]);

  // Autosize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [input]);

  const isLoading = status === "submitted" || status === "streaming";
  const disabled = isLoading || paywallVisible;
  const isEmpty = messages.length === 0;

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
    <div className="flex flex-col h-full bg-background">
      {/* Messages / Empty state */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-10">
          {isEmpty ? (
            <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-3xl mb-5">
                🔧
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                Come posso aiutarti?
              </h2>
              <p className="text-sm text-muted-foreground mb-8">
                Descrivi il problema idraulico o scegli un esempio.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-xl">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => { setInput(s.prompt); setTimeout(() => textareaRef.current?.focus(), 50); }}
                    className="flex items-center gap-3 rounded-2xl border bg-card hover:bg-muted/60 px-4 py-3 text-sm text-left transition"
                  >
                    <span className="text-lg">{s.emoji}</span>
                    <span className="font-medium text-foreground">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {messages.map((m) => {
                const text = m.parts
                  .filter((p: any) => p.type === "text")
                  .map((p: any) => p.text)
                  .join("");
                const files = m.parts.filter((p: any) => p.type === "file" || p.type === "image");

                if (m.role === "user") {
                  return (
                    <div key={m.id} className="flex justify-end">
                      <div className="max-w-[85%] bg-muted rounded-3xl px-4 py-2.5">
                        {files.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-2">
                            {files.map((f: any, i: number) => (
                              <img key={i} src={f.url ?? f.image} alt="" className="w-24 h-24 rounded-xl object-cover" />
                            ))}
                          </div>
                        )}
                        {text && <div className="whitespace-pre-wrap text-[15px] text-foreground">{text}</div>}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={m.id} className="text-foreground">
                    <div className="prose prose-neutral dark:prose-invert max-w-none text-[15px] leading-[1.75]
                      prose-p:my-4 prose-p:leading-[1.75]
                      prose-headings:font-semibold prose-headings:mt-6 prose-headings:mb-3
                      prose-h1:text-xl prose-h2:text-lg prose-h3:text-base
                      prose-ul:my-4 prose-ol:my-4 prose-ul:pl-6 prose-ol:pl-6
                      prose-li:my-2 prose-li:leading-[1.7]
                      prose-strong:text-foreground prose-strong:font-semibold
                      prose-a:text-primary prose-a:underline-offset-2
                      prose-hr:my-6 prose-hr:border-border
                      prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[13px] prose-code:before:content-none prose-code:after:content-none">
                      {splitByImageTags(text).map((seg, i) =>
                        seg.type === "img" ? (
                          <AIGeneratedImage key={i} prompt={seg.value} />
                        ) : (
                          <ReactMarkdown key={i}>{seg.value}</ReactMarkdown>
                        ),
                      )}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce" />
                  </span>
                </div>
              )}

              {paywallError && (
                <div className="text-sm text-destructive px-3 py-2 rounded-lg bg-destructive/10">
                  {paywallError}
                </div>
              )}

              {paywallVisible && <PaywallCard onClose={() => setPaywallVisible(false)} />}
            </div>
          )}
        </div>
      </div>

      {/* Composer */}
      <div className="bg-background">
        <div className="max-w-3xl mx-auto px-4 md:px-6 pb-4 pt-2">
          {mediaUrls.length > 0 || !isEmpty ? (
            <div className="mb-2">
              <MediaUploader onChange={setMediaUrls} disabled={disabled} />
            </div>
          ) : null}
          <div className="relative flex items-end rounded-3xl border bg-card shadow-sm focus-within:border-foreground/30 transition">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={paywallVisible ? "Sblocca la consulenza per continuare…" : "Scrivi un messaggio…"}
              className="flex-1 resize-none bg-transparent px-5 py-4 pr-14 text-[15px] leading-6 max-h-[200px] focus-visible:outline-none placeholder:text-muted-foreground"
              rows={1}
              disabled={disabled}
            />
            <button
              onClick={handleSend}
              disabled={disabled || (!input.trim() && mediaUrls.length === 0)}
              className="absolute right-2 bottom-2 w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition"
              aria-label="Invia"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowUp className="w-4 h-4" />}
            </button>
          </div>
          {isEmpty && mediaUrls.length === 0 && (
            <div className="mt-2">
              <MediaUploader onChange={setMediaUrls} disabled={disabled} />
            </div>
          )}
          <p className="text-[11px] text-muted-foreground text-center mt-2">
            L'Idraulico AI può sbagliare. Per gas, caldaie o elettricità serve un tecnico abilitato.
          </p>
          {cityHint && messages.length > 3 && (
            <div className="mt-3">
              <LocalPlumbersCard defaultCity={cityHint} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
