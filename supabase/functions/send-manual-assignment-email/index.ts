import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const INTERVENTION_LABELS: Record<string, string> = {
  perdita_acqua: "Perdita acqua",
  rubinetto_rotto: "Rubinetto rotto",
  scarico_intasato: "Scarico intasato",
  caldaia: "Caldaia",
  riparazione: "Riparazione",
  installazione_sostituzione: "Installazione/Sostituzione",
  sturare_spurgo: "Sturare/Spurgo",
  impianto_idraulico: "Impianto idraulico",
  box_doccia: "Box doccia",
  impianto_riscaldamento: "Impianto riscaldamento",
  altro: "Altro",
};

const URGENCY_LABELS: Record<string, string> = {
  subito: "Subito",
  entro_24_ore: "Entro 24 ore",
  prossimi_giorni: "Prossimi giorni",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { request_id, plumber_id } = await req.json();
    
    if (!request_id || !plumber_id) {
      return new Response(
        JSON.stringify({ error: "request_id and plumber_id are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get request details
    const { data: request, error: requestError } = await supabase
      .from("service_requests")
      .select("*")
      .eq("id", request_id)
      .single();

    if (requestError || !request) {
      return new Response(
        JSON.stringify({ error: "Request not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get plumber details
    const { data: plumber, error: plumberError } = await supabase
      .from("plumber_profiles")
      .select("*")
      .eq("id", plumber_id)
      .single();

    if (plumberError || !plumber) {
      return new Response(
        JSON.stringify({ error: "Plumber not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const interventionLabel = INTERVENTION_LABELS[request.intervention_type] || request.intervention_type;
    const urgencyLabel = URGENCY_LABELS[request.urgency] || request.urgency;

    // Generate magic link
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: "magiclink",
      email: plumber.email,
      options: {
        redirectTo: "https://idraulicisubito.com/dashboard"
      }
    });

    let loginUrl = "https://idraulicisubito.com/auth";
    if (linkData?.properties?.hashed_token) {
      const token = linkData.properties.hashed_token;
      loginUrl = `https://qqgtvhtaoxrdnxarnvcw.supabase.co/auth/v1/verify?token=${token}&type=magiclink&redirect_to=https://idraulicisubito.com/dashboard`;
    }

    const subject = `Nuova richiesta: ${interventionLabel} a ${request.city}`;

    const emailResponse = await resend.emails.send({
      from: "IdrauliciSubito <notifiche@idraulicisubito.com>",
      reply_to: "supporto@idraulicisubito.com",
      to: [plumber.email],
      subject: subject,
      html: `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;">
<tr>
<td align="center" style="padding:20px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

<tr>
<td style="background-color:#16a34a;padding:25px;text-align:center;border-radius:8px 8px 0 0;">
<h1 style="margin:0;color:#ffffff;font-family:Arial,sans-serif;font-size:22px;font-weight:bold;">Nuova richiesta assegnata a te!</h1>
</td>
</tr>

<tr>
<td style="background-color:#ffffff;padding:30px;font-family:Arial,sans-serif;">

<p style="margin:0 0 20px 0;font-size:16px;line-height:1.5;color:#333333;">
Ciao <strong>${plumber.full_name}</strong>,
</p>

<p style="margin:0 0 20px 0;font-size:16px;line-height:1.5;color:#333333;">
Hai ricevuto una nuova richiesta di intervento nella tua zona.
</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;background-color:#fff3cd;border:1px solid #ffc107;border-radius:6px;">
<tr>
<td style="padding:15px;text-align:center;">
<strong style="color:#856404;font-size:14px;font-family:Arial,sans-serif;">Hai 24 ore per accettare questa richiesta</strong>
</td>
</tr>
</table>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;background-color:#f0fdf4;border-left:4px solid #16a34a;">
<tr>
<td style="padding:20px;">
<h3 style="margin:0 0 15px 0;font-size:16px;color:#16a34a;font-family:Arial,sans-serif;">Dettagli richiesta</h3>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td style="padding:8px 0;color:#666666;font-size:14px;width:130px;font-family:Arial,sans-serif;vertical-align:top;"><strong>Tipo intervento:</strong></td>
<td style="padding:8px 0;font-size:14px;color:#333333;font-family:Arial,sans-serif;">${interventionLabel}</td>
</tr>
<tr>
<td style="padding:8px 0;color:#666666;font-size:14px;font-family:Arial,sans-serif;vertical-align:top;"><strong>Città:</strong></td>
<td style="padding:8px 0;font-size:14px;color:#333333;font-family:Arial,sans-serif;">${request.city}</td>
</tr>
<tr>
<td style="padding:8px 0;color:#666666;font-size:14px;font-family:Arial,sans-serif;vertical-align:top;"><strong>Urgenza:</strong></td>
<td style="padding:8px 0;font-size:14px;font-family:Arial,sans-serif;">
<span style="background-color:${request.urgency === 'subito' ? '#dc3545' : request.urgency === 'entro_24_ore' ? '#fd7e14' : '#28a745'};color:#ffffff;padding:3px 10px;border-radius:10px;font-size:12px;font-weight:bold;">${urgencyLabel}</span>
</td>
</tr>
<tr>
<td style="padding:8px 0;color:#666666;font-size:14px;font-family:Arial,sans-serif;vertical-align:top;"><strong>Descrizione:</strong></td>
<td style="padding:8px 0;font-size:14px;color:#333333;font-family:Arial,sans-serif;">${request.description}</td>
</tr>
</table>
</td>
</tr>
</table>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:25px 0;">
<tr>
<td align="center">
<a href="${loginUrl}" style="display:inline-block;background-color:#16a34a;color:#ffffff;padding:14px 30px;border-radius:6px;text-decoration:none;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">Accedi e accetta richiesta</a>
</td>
</tr>
</table>

</td>
</tr>

<tr>
<td style="padding:20px;text-align:center;font-family:Arial,sans-serif;">
<p style="margin:0;font-size:12px;color:#999999;">IdrauliciSubito - https://idraulicisubito.com</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>`,
    });

    console.log("Email sent:", emailResponse);

    // Log the email
    await supabase.from("email_logs").insert({
      email_type: "assignment",
      recipient_email: plumber.email,
      recipient_name: plumber.full_name,
      subject: subject,
      resend_email_id: emailResponse.data?.id || null,
      request_id: request_id,
      plumber_id: plumber_id,
      status: "sent"
    });

    return new Response(
      JSON.stringify({ success: true, emailId: emailResponse.data?.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
