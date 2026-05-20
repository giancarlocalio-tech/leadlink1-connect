import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE = "https://www.idraulicisubito.com";
const SIENA = "#A0522D"; // Siena brand accent
const SIENA_DARK = "#6B3A1E";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { request_id, plumber_id, quote_amount_cents, quote_message } = await req.json();
    if (!request_id || !plumber_id) {
      return new Response(JSON.stringify({ error: "Missing params" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Fetch conversation (created by trigger)
    const { data: conv, error: convErr } = await supabase
      .from("conversations")
      .select("id, client_access_token")
      .eq("request_id", request_id)
      .eq("plumber_id", plumber_id)
      .maybeSingle();

    if (convErr || !conv) {
      console.error("Conversation not found", convErr);
      return new Response(JSON.stringify({ error: "Conversation not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Fetch request + plumber details
    const [{ data: request }, { data: plumber }] = await Promise.all([
      supabase
        .from("service_requests")
        .select("client_name, client_email, client_phone, city, intervention_type, description")
        .eq("id", request_id)
        .single(),
      supabase
        .from("plumber_profiles")
        .select("full_name, business_name, phone")
        .eq("id", plumber_id)
        .single(),
    ]);

    if (!request || !plumber) {
      return new Response(JSON.stringify({ error: "Data missing" }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const chatUrl = `${SITE}/chat/${conv.client_access_token}`;
    const plumberLabel = plumber.business_name || plumber.full_name || "L'idraulico";

    // ---- EMAIL ----
    let emailSent = false;
    if (request.client_email) {
      try {
        const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
        await resend.emails.send({
          from: "IdrauliciSubito <conferma@idraulicisubito.com>",
          reply_to: "supporto@idraulicisubito.com",
          to: [request.client_email],
          subject: `${plumberLabel} ti ha inviato un preventivo`,
          html: `<!DOCTYPE html><html lang="it"><body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f5f1ec;color:#333">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f1ec"><tr><td style="padding:24px">
<table width="600" cellpadding="0" cellspacing="0" align="center" style="background:#fff;border-radius:10px;overflow:hidden;border:1px solid #e7ddd1">
<tr><td style="background:${SIENA};padding:24px;text-align:center;color:#fff">
<h1 style="margin:0;font-size:22px;font-weight:600">Hai ricevuto un preventivo</h1>
</td></tr>
<tr><td style="padding:28px">
<p style="margin:0 0 16px">Ciao <strong>${request.client_name || ""}</strong>,</p>
<p style="margin:0 0 16px"><strong>${plumberLabel}</strong> ha preso in carico la tua richiesta a <strong>${request.city}</strong> e ti ha aperto una chat dedicata per inviarti il preventivo e rispondere alle tue domande.</p>
<table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0"><tr><td align="center">
<a href="${chatUrl}" style="display:inline-block;background:${SIENA};color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600">Apri la chat e rispondi</a>
</td></tr></table>
<p style="margin:0 0 8px;color:#666;font-size:14px">Oppure copia questo link nel browser:</p>
<p style="margin:0 0 20px;word-break:break-all"><a href="${chatUrl}" style="color:${SIENA_DARK}">${chatUrl}</a></p>
<div style="background:#f9f4ee;border-left:3px solid ${SIENA};padding:14px 16px;border-radius:4px;margin:20px 0">
<p style="margin:0;font-size:14px"><strong>Contatto diretto:</strong> ${plumber.phone || ""}</p>
</div>
<p style="margin:20px 0 0;color:#999;font-size:12px">Il link è personale: non condividerlo con altri.</p>
</td></tr>
<tr><td style="padding:16px 28px;border-top:1px solid #eee;text-align:center;color:#999;font-size:12px">
IdrauliciSubito · supporto@idraulicisubito.com
</td></tr></table></td></tr></table></body></html>`,
        });
        emailSent = true;
      } catch (e) {
        console.error("Email error", e);
      }
    }

    // ---- WHATSAPP (best-effort via existing function) ----
    let whatsappSent = false;
    if (request.client_phone) {
      try {
        const res = await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/send-whatsapp-notification`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
          },
          body: JSON.stringify({
            phone: request.client_phone,
            message: `Ciao ${request.client_name || ""}, ${plumberLabel} ti ha inviato un preventivo per la tua richiesta a ${request.city}. Apri la chat: ${chatUrl}`,
          }),
        });
        whatsappSent = res.ok;
      } catch (e) {
        console.error("WhatsApp error", e);
      }
    }

    return new Response(
      JSON.stringify({ ok: true, conversation_id: conv.id, emailSent, whatsappSent }),
      { headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
