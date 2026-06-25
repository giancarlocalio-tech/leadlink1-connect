// AI Estimate edge function - generates a plumbing estimate from text + optional photos
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const INTERVENTION_LABELS: Record<string, string> = {
  perdita_acqua: "Perdita acqua",
  rubinetto_rotto: "Rubinetto rotto",
  scarico_intasato: "Scarico intasato",
  caldaia: "Caldaia",
  installazione_sostituzione: "Installazione/Sostituzione",
  sturare_spurgo: "Sturare/Spurgo",
  riparazione: "Riparazione idraulica",
  impianto_idraulico: "Impianto idraulico",
  box_doccia: "Box doccia",
  impianto_riscaldamento: "Impianto riscaldamento",
  termoidraulico: "Termoidraulico",
  condizionatori: "Condizionatori",
  ristrutturazione: "Ristrutturazione bagno",
  certificazione: "Certificazione",
  termosifone: "Termosifone",
  contatore: "Contatore",
  addolcitore_acqua: "Addolcitore acqua",
  depuratore_acqua: "Depuratore acqua",
  sostituzione_rubinetto: "Sostituzione rubinetto",
  altro: "Altro intervento",
};

const SYSTEM_PROMPT = `Sei un idraulico professionista italiano con 20 anni di esperienza.
Il cliente ti descrive (con testo ed eventuali foto) un problema idraulico nella sua casa.
Tu fornisci una STIMA ORIENTATIVA onesta e professionale, considerando:
- Complessità tipica dell'intervento in Italia nel 2026
- Costo medio di manodopera idraulica (40-60€/ora) + diritto di chiamata (30-50€)
- Materiali tipici per il tipo di intervento
- Differenze geografiche (Milano/Roma più care, Sud più economiche)
- Urgenza (chiamata fuori orario = sovrapprezzo 30-50%)

REGOLE FERREE:
- Usa SEMPRE un range di prezzo, mai un prezzo secco
- Sii realistico ma non spaventare: la stima serve a far procedere il cliente
- Se le info sono scarse, allarga il range e abbassa "confidence"
- Diagnosi e steps devono essere in italiano scorrevole, comprensibili a un non tecnico
- Rispondi SOLO in JSON valido, senza markdown, senza testo prima o dopo`;

interface EstimateRequest {
  interventionType: string;
  description: string;
  city: string;
  urgency?: string;
  answers?: Array<{ questionId: string; questionTitle?: string; answer: string }>;
  photoUrls?: string[];
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const lovableKey = Deno.env.get("LOVABLE_API_KEY");
    if (!lovableKey) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY missing" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = (await req.json()) as EstimateRequest;
    const {
      interventionType,
      description,
      city,
      urgency,
      answers = [],
      photoUrls = [],
    } = body;

    if (!interventionType || !description || !city) {
      return new Response(
        JSON.stringify({ error: "interventionType, description e city sono richiesti" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const interventionLabel =
      INTERVENTION_LABELS[interventionType] || interventionType;

    const answersText = answers.length
      ? answers
          .map((a) => `- ${a.questionTitle || a.questionId}: ${a.answer}`)
          .join("\n")
      : "(nessuna risposta aggiuntiva)";

    const userText = `Tipo intervento: ${interventionLabel}
Città: ${city}
Urgenza dichiarata: ${urgency || "non specificata"}

Descrizione del cliente:
"${description}"

Risposte preliminari del wizard:
${answersText}

${photoUrls.length > 0 ? `Allego ${photoUrls.length} foto del problema, analizzale per essere più preciso.` : "Nessuna foto allegata."}

Restituisci ESCLUSIVAMENTE un JSON con questa struttura esatta:
{
  "priceMin": <numero euro, intero>,
  "priceMax": <numero euro, intero>,
  "durationMinHours": <numero, può essere 0.5>,
  "durationMaxHours": <numero>,
  "diagnosis": "<2-3 frasi che spiegano cosa probabilmente sta succedendo>",
  "plumberSteps": ["<azione 1>", "<azione 2>", "<azione 3>", "<azione 4>"],
  "urgencyLevel": "<bassa|media|alta|critica>",
  "urgencyReason": "<1 frase>",
  "riskIfPostponed": "<1-2 frasi sui rischi reali se il cliente rimanda>",
  "confidence": <0.0-1.0>,
  "notes": "<eventuali note aggiuntive utili al cliente, max 1 frase>"
}`;

    // Build message content (multimodal if photos present)
    const userContent: any[] = [{ type: "text", text: userText }];
    for (const url of photoUrls.slice(0, 3)) {
      userContent.push({ type: "image_url", image_url: { url } });
    }

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lovableKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userContent },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!aiResp.ok) {
      const errText = await aiResp.text();
      console.error("AI gateway error:", aiResp.status, errText);
      if (aiResp.status === 429) {
        return new Response(
          JSON.stringify({ error: "Troppe richieste, riprova tra qualche secondo." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (aiResp.status === 402) {
        return new Response(
          JSON.stringify({ error: "Servizio AI temporaneamente non disponibile." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      throw new Error(`AI gateway ${aiResp.status}`);
    }

    const aiJson = await aiResp.json();
    const content = aiJson.choices?.[0]?.message?.content;
    if (!content) throw new Error("AI response empty");

    let estimate: any;
    try {
      estimate = JSON.parse(content);
    } catch {
      // Try to extract JSON from a code fence
      const match = content.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("AI did not return JSON");
      estimate = JSON.parse(match[0]);
    }

    // Sanity defaults
    estimate.priceMin = Number(estimate.priceMin) || 50;
    estimate.priceMax = Number(estimate.priceMax) || 150;
    estimate.durationMinHours = Number(estimate.durationMinHours) || 0.5;
    estimate.durationMaxHours = Number(estimate.durationMaxHours) || 2;
    estimate.confidence = Number(estimate.confidence) || 0.6;
    estimate.plumberSteps = Array.isArray(estimate.plumberSteps)
      ? estimate.plumberSteps.slice(0, 6)
      : [];

    return new Response(JSON.stringify({ estimate }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("ai-estimate error:", err);
    return new Response(
      JSON.stringify({ error: (err as Error).message || "Errore interno" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
