// Consulenza AI Idraulico - streaming chat
// Freemium: 4 messaggi utente gratis, poi paywall.
// Multimodale: accetta immagini + video via URL pubblici firmati.

import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { streamText, convertToModelMessages, type UIMessage } from "npm:ai";
import { createLovableAiGatewayProvider, corsHeaders } from "../_shared/ai-gateway.ts";

const FREE_MESSAGE_LIMIT = 4;

const SYSTEM_PROMPT = `Sei "Idraulico AI", un consulente idraulico virtuale esperto e professionale che parla italiano.

**Il tuo ruolo:**
Aiuti persone in Italia a diagnosticare e risolvere problemi idraulici domestici comuni: perdite d'acqua, scarichi otturati, WC che perde, rubinetti gocciolanti, caldaie con problemi, contatori che girano, pressione dell'acqua bassa, ecc.

**Come rispondi:**
1. **Ascolta prima**: se la descrizione è vaga, fai 1-2 domande chiave per capire il problema (dove, da quando, cosa hai già provato).
2. **Chiedi foto/video** quando servirebbero: "Puoi mandarmi una foto del punto dove perde?" - l'utente può caricare immagini e brevi video.
3. **Diagnosi chiara**: spiega la causa più probabile in 2-3 righe, senza tecnicismi inutili.
4. **Procedura passo-passo** ordinata quando si può risolvere in autonomia: usa liste numerate, indica attrezzi necessari (chiave inglese, pinza, teflon...), stima il tempo.
5. **Sicurezza sopra tutto**: NON dare mai istruzioni per interventi su tubazioni gas, caldaie, boiler elettrici sotto tensione. In quei casi di' subito: "Questo intervento richiede un tecnico abilitato per legge (D.M. 37/08). Ecco cosa devi verificare prima di chiamare uno..."
6. **Riconosci i limiti**: se il problema non è risolvibile da soli (perdita nel muro, rottura in colonna, guasto caldaia complesso, allagamento in corso), dillo esplicitamente: "Questo è un caso da idraulico sul posto. Ti conviene chiamarne uno subito." e suggerisci di usare il pulsante "Trova idraulico vicino a me" nell'interfaccia.

**Tono:**
- Professionale ma amichevole, dai del tu.
- Concreto: mai muri di testo. Frasi brevi, elenchi puntati, grassetto sulle cose importanti (usa markdown **testo**).
- Zero disclaimer legali lunghi. Un breve "attenzione" solo quando serve davvero.

**Formato risposta consigliato quando fornisci la soluzione:**
- **Diagnosi:** (2 righe)
- **Cosa serve:** (attrezzi, materiali)
- **Passi:** (elenco numerato)
- **Se non funziona:** (quando fermarsi e chiamare un pro)

**Immagini di supporto:**
Quando un'illustrazione aiuterebbe davvero l'utente a capire (identificare un componente come una valvola sotto il lavandino, mostrare come è fatto un sifone, indicare dove si trova il rubinetto d'arresto della caldaia, mostrare la posizione corretta di una guarnizione, ecc.), inserisci UN tag su una riga a sé nel formato:

[IMG: descrizione breve in italiano dell'immagine da generare]

Regole per i tag [IMG:]:
- Massimo 1-2 immagini per risposta, e SOLO quando aggiungono valore reale.
- Descrizione concisa e visiva (es. "sifone a P sotto lavandino cucina, vista laterale, etichette"; "posizione rubinetto d'arresto acqua sotto WC"; "pulsantiera di reset di una caldaia murale").
- Niente immagini per problemi puramente concettuali o per liste generiche.
- Il tag deve stare su una riga da solo, con la parentesi quadra chiusa.

Non fingere di essere umano. Se l'utente chiede se sei una persona, ammetti di essere un'AI addestrata ma dì che i consigli si basano su esperienza idraulica reale.`;


Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const sessionToken = req.headers.get("x-session-token");
    if (!sessionToken || sessionToken.length < 32) {
      return json({ error: "session_token_required" }, 400);
    }

    const { messages }: { messages: UIMessage[] } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return json({ error: "messages_required" }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Load or create session
    let { data: session } = await supabase
      .from("ai_consultation_sessions")
      .select("*")
      .eq("access_token", sessionToken)
      .maybeSingle();

    if (!session) {
      const ipHash = await hashIp(req.headers.get("x-forwarded-for") ?? "");
      const { data: created, error: createErr } = await supabase
        .from("ai_consultation_sessions")
        .insert({
          access_token: sessionToken,
          ip_hash: ipHash,
          user_agent: req.headers.get("user-agent")?.slice(0, 500) ?? null,
          referer: req.headers.get("referer")?.slice(0, 500) ?? null,
        })
        .select()
        .single();
      if (createErr) {
        console.error("session_create_error", createErr);
        return json({ error: "session_create_failed" }, 500);
      }
      session = created;
    }

    // Count user messages
    const userMsgCount = messages.filter((m) => m.role === "user").length;
    if (userMsgCount > FREE_MESSAGE_LIMIT && !session.unlocked) {
      // Log paywall event
      await supabase.from("ai_consultation_events").insert({
        session_id: session.id,
        event_type: "paywall_blocked",
        event_data: { user_msg_count: userMsgCount },
      });
      return json({
        error: "paywall_required",
        message: "Hai usato le domande gratuite. Sblocca la consulenza completa a €4,90.",
      }, 402);
    }

    // Update usage + persist last user message
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.role === "user") {
      const text = extractText(lastMsg);
      const mediaUrls = extractMediaUrls(lastMsg);
      await supabase.from("ai_consultation_messages").insert({
        session_id: session.id,
        role: "user",
        content: text,
        media_urls: mediaUrls,
      });
      await supabase
        .from("ai_consultation_sessions")
        .update({
          messages_used: userMsgCount,
          last_activity_at: new Date().toISOString(),
        })
        .eq("id", session.id);
    }

    const gateway = createLovableAiGatewayProvider(Deno.env.get("LOVABLE_API_KEY")!);
    const model = gateway("google/gemini-3-flash-preview");

    const result = streamText({
      model,
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      onError: (e) => console.error("stream_error", e),
      onFinish: async ({ text }) => {
        await supabase.from("ai_consultation_messages").insert({
          session_id: session!.id,
          role: "assistant",
          content: text,
        });
      },
    });

    return result.toUIMessageStreamResponse({ headers: corsHeaders });
  } catch (err) {
    console.error("ai-consultation-chat error", err);
    return json({ error: "internal_error", message: (err as Error).message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function extractText(msg: UIMessage): string {
  return msg.parts
    .filter((p: any) => p.type === "text")
    .map((p: any) => p.text)
    .join("\n");
}

function extractMediaUrls(msg: UIMessage): string[] {
  return msg.parts
    .filter((p: any) => p.type === "file" || p.type === "image")
    .map((p: any) => p.url ?? p.image ?? "")
    .filter((s: string) => s.length > 0);
}

async function hashIp(ip: string): Promise<string> {
  if (!ip) return "";
  const data = new TextEncoder().encode(ip + Deno.env.get("SUPABASE_URL"));
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 32);
}
