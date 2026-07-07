// Genera un signed upload URL per il bucket ai-chat-media.
// L'access_token della sessione autorizza l'upload.

import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-session-token",
};

const ALLOWED_TYPES = [
  "image/jpeg", "image/png", "image/webp", "image/heic", "image/heif",
  "video/mp4", "video/quicktime", "video/webm",
];
const MAX_SIZE = 20 * 1024 * 1024;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const sessionToken = req.headers.get("x-session-token");
    if (!sessionToken || sessionToken.length < 32) {
      return json({ error: "session_token_required" }, 400);
    }
    const { filename, contentType, size } = await req.json();
    if (!filename || !contentType) {
      return json({ error: "missing_params" }, 400);
    }
    if (!ALLOWED_TYPES.includes(contentType)) {
      return json({ error: "unsupported_type" }, 400);
    }
    if (typeof size === "number" && size > MAX_SIZE) {
      return json({ error: "file_too_large" }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: session } = await supabase
      .from("ai_consultation_sessions")
      .select("id")
      .eq("access_token", sessionToken)
      .maybeSingle();
    if (!session) return json({ error: "session_not_found" }, 404);

    const ext = filename.split(".").pop()?.toLowerCase() ?? "bin";
    const safeName = `${crypto.randomUUID()}.${ext}`;
    const path = `${session.id}/${safeName}`;

    const { data: signed, error: signErr } = await supabase.storage
      .from("ai-chat-media")
      .createSignedUploadUrl(path);

    if (signErr || !signed) {
      console.error("signed_upload_error", signErr);
      return json({ error: "signed_url_failed" }, 500);
    }

    // Return also a signed READ url so the AI can access the file for 1 hour
    const { data: readUrl } = await supabase.storage
      .from("ai-chat-media")
      .createSignedUrl(path, 3600);

    return json({
      uploadUrl: signed.signedUrl,
      token: signed.token,
      path,
      publicUrl: readUrl?.signedUrl ?? null,
    });
  } catch (err) {
    console.error("upload-consultation-media error", err);
    return json({ error: "internal_error", message: (err as Error).message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
