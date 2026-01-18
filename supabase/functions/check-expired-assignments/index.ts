import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const INTERVENTION_LABELS: Record<string, string> = {
  perdita_acqua: "Perdita acqua",
  rubinetto_rotto: "Rubinetto rotto",
  scarico_intasato: "Scarico intasato",
  caldaia: "Caldaia",
  installazione_sostituzione: "Installazione e sostituzione",
  sturare_spurgo: "Sturare/Spurgo",
  riparazione: "Riparazione",
  impianto_idraulico: "Impianto idraulico",
  box_doccia: "Box doccia",
  impianto_riscaldamento: "Impianto riscaldamento",
  termoidraulico: "Termoidraulico",
  condizionatori: "Condizionatori",
  ristrutturazione: "Ristrutturazione",
  certificazione: "Certificazione",
  termosifone: "Termosifone",
  contatore: "Contatore",
  addolcitore_acqua: "Addolcitore acqua",
  depuratore_acqua: "Depuratore acqua",
  sostituzione_rubinetto: "Sostituzione rubinetto",
  altro: "Altro",
};

const URGENCY_LABELS: Record<string, string> = {
  subito: "Subito",
  entro_24_ore: "Entro 24 ore",
  prossimi_giorni: "Prossimi giorni",
};

async function generateMagicLink(supabase: any, email: string, appOrigin?: string): Promise<string> {
  const origin = appOrigin || "https://www.idraulicisubito.com";
  let loginUrl = `${origin}/auth?mode=login`;
  
  try {
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: "magiclink",
      email,
    });

    if (linkError) {
      console.error("[check-expired] generateLink error:", linkError);
    } else {
      const tokenHash = (linkData as any)?.properties?.hashed_token as string | undefined;
      if (tokenHash) {
        loginUrl = `${origin}/auth/confirm?token_hash=${encodeURIComponent(tokenHash)}&type=magiclink&next=${encodeURIComponent("/dashboard")}`;
      }
    }
  } catch (e) {
    console.error("[check-expired] Error generating magic link:", e);
  }
  
  return loginUrl;
}

async function sendReassignmentEmail(
  email: string, 
  fullName: string, 
  request: any,
  timerMinutes: number,
  supabase: any
): Promise<void> {
  const interventionLabel = INTERVENTION_LABELS[request.intervention_type] || request.intervention_type;
  const urgencyLabel = URGENCY_LABELS[request.urgency] || request.urgency;
  
  // Generate magic link for one-click login
  const loginUrl = await generateMagicLink(supabase, email);
  
  const plainTextContent = `Nuova opportunita di lavoro nella tua zona!

Ciao ${fullName},

Un nuovo lavoro e disponibile nella tua zona. Un altro professionista non ha potuto accettare, quindi ora e la tua occasione!

DETTAGLI RICHIESTA
------------------
Tipo intervento: ${interventionLabel}
Citta: ${request.city}
Urgenza: ${urgencyLabel}
Descrizione: ${request.description}

TEMPO PER ACCETTARE
-------------------
Hai ${timerMinutes} minuti per accettare questa richiesta.

Accedi subito al tuo dashboard:
${loginUrl}

---
IdrauliciSubito
https://www.idraulicisubito.com`;

  const emailResponse = await resend.emails.send({
    from: "IdrauliciSubito <notifiche@idraulicisubito.com>",
    reply_to: "supporto@idraulicisubito.com",
    to: [email],
    subject: `Nuova opportunita: ${interventionLabel} a ${request.city}`,
    text: plainTextContent,
    headers: {
      "List-Unsubscribe": "<mailto:supporto@idraulicisubito.com?subject=unsubscribe>",
    },
    html: `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nuova opportunita di lavoro</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;">
<tr>
<td align="center" style="padding:20px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

<!-- Header -->
<tr>
<td style="background-color:#16a34a;padding:25px;text-align:center;border-radius:8px 8px 0 0;">
<h1 style="margin:0;color:#ffffff;font-family:Arial,sans-serif;font-size:22px;font-weight:bold;">Nuova opportunita nella tua zona!</h1>
</td>
</tr>

<!-- Main Content -->
<tr>
<td style="background-color:#ffffff;padding:30px;font-family:Arial,sans-serif;">

<p style="margin:0 0 20px 0;font-size:16px;line-height:1.5;color:#333333;">
Ciao <strong>${fullName}</strong>,
</p>

<p style="margin:0 0 20px 0;font-size:16px;line-height:1.5;color:#333333;">
Un nuovo lavoro e disponibile nella tua zona. Un altro professionista non ha potuto accettare, quindi ora e la tua occasione!
</p>

<!-- Timer Warning -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;background-color:#dcfce7;border:1px solid #16a34a;border-radius:6px;">
<tr>
<td style="padding:15px;text-align:center;">
<strong style="color:#155724;font-size:14px;font-family:Arial,sans-serif;">Hai ${timerMinutes} minuti per accettare questa opportunita</strong>
</td>
</tr>
</table>

<!-- Request Details Box -->
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
<td style="padding:8px 0;color:#666666;font-size:14px;font-family:Arial,sans-serif;vertical-align:top;"><strong>Citta:</strong></td>
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

<!-- CTA Button -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:25px 0;">
<tr>
<td align="center">
<a href="${loginUrl}" style="display:inline-block;background-color:#16a34a;color:#ffffff;padding:14px 30px;border-radius:6px;text-decoration:none;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">Accetta opportunita</a>
</td>
</tr>
</table>

<p style="margin:20px 0 0 0;font-size:13px;color:#666666;font-family:Arial,sans-serif;text-align:center;">
Non perdere questa occasione! Accetta subito.
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td style="padding:20px;text-align:center;font-family:Arial,sans-serif;">
<p style="margin:0;font-size:12px;color:#999999;">IdrauliciSubito - https://www.idraulicisubito.com</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>`,
  });

  console.log(`[check-expired] Email sent to ${email}:`, emailResponse);
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('[check-expired] Starting check for expired assignments');

    // Find all expired assignments
    const { data: expiredRequests, error: fetchError } = await supabase
      .from('service_requests')
      .select('id, assigned_plumber_id, urgency, city, intervention_type, description, assignment_expires_at')
      .eq('status', 'assigned')
      .lt('assignment_expires_at', new Date().toISOString());

    if (fetchError) {
      console.error('[check-expired] Error fetching expired requests:', fetchError);
      throw fetchError;
    }

    if (!expiredRequests || expiredRequests.length === 0) {
      console.log('[check-expired] No expired assignments found');
      return new Response(
        JSON.stringify({ processed: 0, results: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[check-expired] Found ${expiredRequests.length} expired assignments`);

    const results = [];

    // Process each expired request
    for (const request of expiredRequests) {
      console.log(`[check-expired] Processing request: ${request.id}`);
      
      try {
        // Call the handle_expired_assignment function
        const { data: result, error: handleError } = await supabase
          .rpc('handle_expired_assignment', {
            p_request_id: request.id
          });

        if (handleError) {
          console.error(`[check-expired] Error handling request ${request.id}:`, handleError);
          results.push({ request_id: request.id, status: 'error', error: handleError.message });
        } else {
          console.log(`[check-expired] Request ${request.id} result: ${result}`);
          results.push({ request_id: request.id, status: result });

          // If reassigned, notify the new plumber via email
          if (result === 'reassigned') {
            const { data: updatedRequest } = await supabase
              .from('service_requests')
              .select('*, current_assignee_plan')
              .eq('id', request.id)
              .single();

            if (updatedRequest?.assigned_plumber_id) {
              const { data: plumber } = await supabase
                .from('plumber_profiles')
                .select('email, full_name')
                .eq('id', updatedRequest.assigned_plumber_id)
                .single();

              if (plumber) {
                // Get timer configuration
                const { data: config } = await supabase
                  .from('assignment_config')
                  .select('timer_minutes')
                  .eq('plan_type', updatedRequest.current_assignee_plan || 'premium')
                  .eq('urgency', request.urgency)
                  .single();
                
                const timerMinutes = config?.timer_minutes || 60;

                try {
                  await sendReassignmentEmail(plumber.email, plumber.full_name, updatedRequest, timerMinutes, supabase);
                  console.log(`[check-expired] Reassignment email sent to: ${plumber.email}`);
                } catch (emailError) {
                  console.error(`[check-expired] Failed to send email:`, emailError);
                }
              }
            }
          }
        }
      } catch (err: unknown) {
        console.error(`[check-expired] Exception for request ${request.id}:`, err);
        const message = err instanceof Error ? err.message : 'Unknown error';
        results.push({ request_id: request.id, status: 'exception', error: message });
      }
    }

    console.log(`[check-expired] Completed processing ${results.length} requests`);

    return new Response(
      JSON.stringify({ processed: results.length, results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('[check-expired] Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
