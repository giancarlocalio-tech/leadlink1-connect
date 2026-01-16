import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const respondIoApiKey = Deno.env.get("RESPOND_IO_API_KEY")!;
const defaultChannelId = Deno.env.get("RESPOND_IO_CHANNEL_ID")!;

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function assertAdmin(req: Request): Promise<{ userId: string }> {
  const authHeader = req.headers.get("Authorization") || "";
  if (!authHeader.startsWith("Bearer ")) {
    throw new Error("Missing Authorization header");
  }

  const authedClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const { data, error } = await authedClient.auth.getUser();
  if (error || !data?.user) {
    throw new Error("Invalid or expired session");
  }

  const adminCheckClient = createClient(supabaseUrl, supabaseServiceKey);
  const { data: roleRow, error: roleError } = await adminCheckClient
    .from("user_roles")
    .select("id")
    .eq("user_id", data.user.id)
    .eq("role", "admin")
    .limit(1)
    .maybeSingle();

  if (roleError) {
    console.error("[respond-io-channel-status] role check error:", roleError);
    throw new Error("Failed to verify admin role");
  }

  if (!roleRow) {
    throw new Error("Not authorized");
  }

  return { userId: data.user.id };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    await assertAdmin(req);

    const url = new URL(req.url);
    const channelId = url.searchParams.get("channelId") || defaultChannelId;

    const resp = await fetch("https://api.respond.io/v2/space/channel", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${respondIoApiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("[respond-io-channel-status] Respond.io error:", resp.status, text);
      return new Response(JSON.stringify({ success: false, error: "Respond.io API error", status: resp.status }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const payload = await resp.json();

    const candidates: Array<{ name: string; value: unknown }> = [
      { name: "payload", value: payload },
      { name: "payload.data", value: (payload as any)?.data },
      { name: "payload.data.items", value: (payload as any)?.data?.items },
      { name: "payload.data.results", value: (payload as any)?.data?.results },
      { name: "payload.items", value: (payload as any)?.items },
      { name: "payload.results", value: (payload as any)?.results },
      { name: "payload.channels", value: (payload as any)?.channels },
    ];

    const channels = (candidates.find((c) => Array.isArray(c.value))?.value as any[]) || [];

    const found = channels.find((c) => String(c?.id) === String(channelId));

    const debug = new URL(req.url).searchParams.get("debug") === "1";

    return new Response(
      JSON.stringify({
        success: true,
        channelId: String(channelId),
        found: Boolean(found),
        channel: found || null,
        channelsCount: channels.length,
        ...(debug
          ? {
              payloadKeys: payload && typeof payload === "object" ? Object.keys(payload) : null,
              candidateShapes: candidates.map((c) => ({
                name: c.name,
                type: Array.isArray(c.value) ? "array" : typeof c.value,
                length: Array.isArray(c.value) ? (c.value as any[]).length : null,
              })),
            }
          : {}),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Not authorized" ? 403 : message.includes("Authorization") ? 401 : 500;
    return new Response(JSON.stringify({ success: false, error: message }), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
