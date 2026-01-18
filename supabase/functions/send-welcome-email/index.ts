import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  full_name: string;
  business_name: string;
  plan_type: string;
  app_origin?: string;
}

const PLAN_LABELS: Record<string, string> = {
  basic: "Basic",
  medium: "Medium",
  premium: "Premium",
};

const handler = async (req: Request): Promise<Response> => {
  console.log("send-welcome-email function called");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      email,
      full_name,
      business_name,
      plan_type,
      app_origin,
    }: WelcomeEmailRequest = await req.json();

    console.log(`Sending welcome email to ${email}`);

    const planLabel = PLAN_LABELS[plan_type] || plan_type;

    const appOrigin = (app_origin || "https://www.idraulicisubito.com").replace(/\/$/, "");

    // Direct link to dashboard - the user just registered so they're already authenticated
    // No need for magic link which expires quickly
    const loginUrl = `${appOrigin}/dashboard`;

    const plainTextContent = `Benvenuto su IdrauliciSubito!

Ciao ${full_name},

Siamo entusiasti di averti con noi! La tua registrazione come idraulico professionista e stata completata con successo.

RIEPILOGO ACCOUNT
-----------------
Attivita: ${business_name}
Piano: Prova gratuita
Richieste gratuite: 3

COME FUNZIONA
-------------
Quando un cliente nella tua zona richiede un intervento idraulico, riceverai una notifica via email con tutti i dettagli della richiesta.

Potrai visualizzare le informazioni del cliente e contattarlo direttamente per offrire il tuo servizio.

PROSSIMI PASSI
--------------
1. Completa il tuo profilo
   Aggiungi le citta che copri e i servizi che offri per ricevere richieste pertinenti.

2. Controlla la tua email
   Riceverai notifiche via email ogni volta che arriva una nuova richiesta nella tua zona.

3. Rispondi velocemente
   I clienti apprezzano risposte rapide. Sarai tu a decidere quali richieste accettare.

Accedi alla tua dashboard: ${loginUrl}

Hai domande? Rispondi a questa email e saremo felici di aiutarti!

---
IdrauliciSubito
${appOrigin}`;

    const emailResponse = await resend.emails.send({
      from: "IdrauliciSubito <benvenuto@idraulicisubito.com>",
      reply_to: "supporto@idraulicisubito.com",
      to: [email],
      subject: "Benvenuto su IdrauliciSubito - La tua registrazione e completata",
      text: plainTextContent,
      headers: {
        "List-Unsubscribe": "<mailto:supporto@idraulicisubito.com?subject=unsubscribe>",
      },
      html: `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Benvenuto su IdrauliciSubito</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;">
<tr>
<td align="center" style="padding:20px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

<!-- Header -->
<tr>
<td style="background-color:#16a34a;padding:30px;text-align:center;border-radius:8px 8px 0 0;">
<h1 style="margin:0;color:#ffffff;font-family:Arial,sans-serif;font-size:24px;font-weight:bold;">Benvenuto su IdrauliciSubito</h1>
</td>
</tr>

<!-- Main Content -->
<tr>
<td style="background-color:#ffffff;padding:30px;font-family:Arial,sans-serif;">

<p style="margin:0 0 20px 0;font-size:16px;line-height:1.5;color:#333333;">
Ciao <strong>${full_name}</strong>,
</p>

<p style="margin:0 0 20px 0;font-size:16px;line-height:1.5;color:#333333;">
Siamo entusiasti di averti con noi! La tua registrazione come idraulico professionista e stata completata con successo.
</p>

<!-- Account Summary Box -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;background-color:#f0fdf4;border-left:4px solid #16a34a;">
<tr>
<td style="padding:20px;">
<h3 style="margin:0 0 15px 0;font-size:16px;color:#16a34a;font-family:Arial,sans-serif;">Riepilogo Account</h3>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td style="padding:5px 0;color:#666666;font-size:14px;width:140px;font-family:Arial,sans-serif;"><strong>Attivita:</strong></td>
<td style="padding:5px 0;font-size:14px;color:#333333;font-family:Arial,sans-serif;">${business_name}</td>
</tr>
<tr>
<td style="padding:5px 0;color:#666666;font-size:14px;font-family:Arial,sans-serif;"><strong>Piano:</strong></td>
<td style="padding:5px 0;font-size:14px;font-family:Arial,sans-serif;">
<span style="background-color:#16a34a;color:#ffffff;padding:4px 12px;border-radius:12px;font-size:12px;font-weight:bold;">Prova gratuita</span>
</td>
</tr>
<tr>
<td style="padding:5px 0;color:#666666;font-size:14px;font-family:Arial,sans-serif;"><strong>Richieste gratuite:</strong></td>
<td style="padding:5px 0;font-size:14px;color:#16a34a;font-weight:bold;font-family:Arial,sans-serif;">3 richieste</td>
</tr>
</table>
</td>
</tr>
</table>

<!-- How it works -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;background-color:#eff6ff;border-left:4px solid #3b82f6;">
<tr>
<td style="padding:20px;">
<h3 style="margin:0 0 15px 0;font-size:16px;color:#3b82f6;font-family:Arial,sans-serif;">📧 Come riceverai le richieste</h3>
<p style="margin:0;font-size:14px;line-height:1.6;color:#333333;font-family:Arial,sans-serif;">
Quando un cliente nella tua zona richiede un intervento idraulico, <strong>riceverai una notifica via email</strong> con tutti i dettagli della richiesta.
</p>
<p style="margin:10px 0 0 0;font-size:14px;line-height:1.6;color:#333333;font-family:Arial,sans-serif;">
Potrai visualizzare le informazioni del cliente e contattarlo direttamente per offrire il tuo servizio.
</p>
</td>
</tr>
</table>

<!-- Next Steps -->
<h3 style="margin:25px 0 15px 0;font-size:16px;color:#333333;font-family:Arial,sans-serif;">Prossimi passi</h3>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td style="padding:10px 0;font-family:Arial,sans-serif;">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="width:30px;vertical-align:top;">
<span style="display:inline-block;width:24px;height:24px;background-color:#16a34a;color:#ffffff;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:bold;">1</span>
</td>
<td style="padding-left:10px;">
<strong style="color:#333333;font-size:14px;">Completa il tuo profilo</strong>
<p style="margin:4px 0 0 0;color:#666666;font-size:13px;line-height:1.4;">Aggiungi le citta che copri e i servizi che offri per ricevere richieste pertinenti.</p>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="padding:10px 0;font-family:Arial,sans-serif;">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="width:30px;vertical-align:top;">
<span style="display:inline-block;width:24px;height:24px;background-color:#16a34a;color:#ffffff;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:bold;">2</span>
</td>
<td style="padding-left:10px;">
<strong style="color:#333333;font-size:14px;">Controlla la tua email</strong>
<p style="margin:4px 0 0 0;color:#666666;font-size:13px;line-height:1.4;">Riceverai notifiche via email ogni volta che arriva una nuova richiesta nella tua zona.</p>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="padding:10px 0;font-family:Arial,sans-serif;">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="width:30px;vertical-align:top;">
<span style="display:inline-block;width:24px;height:24px;background-color:#16a34a;color:#ffffff;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:bold;">3</span>
</td>
<td style="padding-left:10px;">
<strong style="color:#333333;font-size:14px;">Rispondi velocemente</strong>
<p style="margin:4px 0 0 0;color:#666666;font-size:13px;line-height:1.4;">I clienti apprezzano risposte rapide. Sarai tu a decidere quali richieste accettare.</p>
</td>
</tr>
</table>
</td>
</tr>
</table>

<!-- CTA Button -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:25px 0;">
<tr>
<td align="center">
<a href="${loginUrl}" style="display:inline-block;background-color:#16a34a;color:#ffffff;padding:14px 30px;border-radius:6px;text-decoration:none;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">Accedi alla Dashboard</a>
</td>
</tr>
</table>

<p style="margin:20px 0 0 0;padding-top:20px;border-top:1px solid #eeeeee;font-size:14px;color:#666666;font-family:Arial,sans-serif;">
Hai domande? Rispondi a questa email e saremo felici di aiutarti!
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td style="padding:20px;text-align:center;font-family:Arial,sans-serif;">
<p style="margin:0;font-size:12px;color:#999999;">Questa email e stata inviata da IdrauliciSubito</p>
<p style="margin:8px 0 0 0;font-size:12px;color:#999999;">IdrauliciSubito - https://www.idraulicisubito.com</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>`,
    });

    console.log("Welcome email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);