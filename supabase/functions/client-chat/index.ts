// Public edge function for client chat access via magic-link token.
// No JWT verification: auth is done via the client_access_token in the conversation row.
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    if (!token || token.length < 32) return json({ error: "invalid token" }, 400);

    // Resolve conversation + related context
    const { data: conv, error: convErr } = await supabase
      .from("conversations")
      .select(`
        id, request_id, plumber_id, quote_amount_cents, created_at,
        plumber:plumber_profiles!conversations_plumber_id_fkey ( full_name, business_name, photo_url, phone ),
        request:service_requests!conversations_request_id_fkey ( intervention_type, city, description, client_name )
      `)
      .eq("client_access_token", token)
      .maybeSingle();

    // Fallback: simpler query if FK names not auto-detected
    let conversation = conv as any;
    if (convErr || !conversation) {
      const { data: c2, error: e2 } = await supabase
        .from("conversations")
        .select("id, request_id, plumber_id, quote_amount_cents, created_at")
        .eq("client_access_token", token)
        .maybeSingle();
      if (e2 || !c2) return json({ error: "conversation not found" }, 404);
      const [{ data: plumber }, { data: request }] = await Promise.all([
        supabase.from("plumber_profiles").select("full_name, business_name, photo_url, phone").eq("id", c2.plumber_id).maybeSingle(),
        supabase.from("service_requests").select("intervention_type, city, description, client_name").eq("id", c2.request_id).maybeSingle(),
      ]);
      conversation = { ...c2, plumber, request };
    }

    if (req.method === "GET") {
      const { data: messages, error: msgErr } = await supabase
        .from("conversation_messages")
        .select("id, sender_type, content, created_at")
        .eq("conversation_id", conversation.id)
        .order("created_at", { ascending: true });
      if (msgErr) return json({ error: msgErr.message }, 500);

      return json({
        conversation: {
          id: conversation.id,
          plumber_name: conversation.plumber?.business_name || conversation.plumber?.full_name || "Idraulico",
          plumber_photo: conversation.plumber?.photo_url ?? null,
          plumber_phone: conversation.plumber?.phone ?? null,
          service: conversation.request?.intervention_type ?? null,
          city: conversation.request?.city ?? null,
          description: conversation.request?.description ?? null,
          client_name: conversation.request?.client_name ?? null,
          quote_amount_cents: conversation.quote_amount_cents,
        },
        messages: messages ?? [],
      });
    }

    if (req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      const content = typeof body?.content === "string" ? body.content.trim() : "";
      if (!content || content.length > 4000) return json({ error: "invalid content" }, 400);

      const { data: msg, error: insErr } = await supabase
        .from("conversation_messages")
        .insert({
          conversation_id: conversation.id,
          sender_type: "client",
          content,
        })
        .select("id, sender_type, content, created_at")
        .single();
      if (insErr) return json({ error: insErr.message }, 500);
      return json({ message: msg });
    }

    return json({ error: "method not allowed" }, 405);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "unknown error" }, 500);
  }
});
