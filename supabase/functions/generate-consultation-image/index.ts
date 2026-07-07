// Genera un'immagine tramite Lovable AI Gateway (google/gemini-2.5-flash-image-preview)
// Utile per mostrare al cliente diagrammi/illustrazioni che aiutano a capire la soluzione.
import { corsHeaders } from "../_shared/ai-gateway.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string" || prompt.length < 3) {
      return json({ error: "prompt_required" }, 400);
    }

    const styled =
      `Illustrazione tecnica pulita e didattica per uso in una guida idraulica italiana. ` +
      `Stile: schema chiaro, linee nette, sfondo bianco, colori tenui, etichette minime, senza testo lungo. ` +
      `Soggetto: ${prompt}`;

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": Deno.env.get("LOVABLE_API_KEY")!,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        modalities: ["image", "text"],
        messages: [{ role: "user", content: styled }],
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("image_gen_failed", resp.status, text);
      return json({ error: "image_gen_failed", status: resp.status }, 502);
    }

    const data = await resp.json();
    // Cerca l'immagine nel formato di risposta OpenAI-compatible del gateway.
    const msg = data?.choices?.[0]?.message ?? {};
    const images: any[] = msg.images ?? [];
    let imageUrl: string | null = images?.[0]?.image_url?.url ?? null;

    if (!imageUrl && Array.isArray(msg.content)) {
      const imgPart = msg.content.find((c: any) => c?.type === "image_url" || c?.type === "image");
      imageUrl = imgPart?.image_url?.url ?? imgPart?.image ?? null;
    }

    if (!imageUrl) {
      console.error("image_gen_no_image", JSON.stringify(data).slice(0, 400));
      return json({ error: "no_image_returned" }, 502);
    }

    return json({ imageUrl });
  } catch (e) {
    console.error("generate-consultation-image error", e);
    return json({ error: "internal_error", message: (e as Error).message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
