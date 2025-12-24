import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AssignRequestPayload {
  request_id: string;
}

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

async function sendAssignmentEmail(
  email: string, 
  fullName: string, 
  request: any,
  timerMinutes: number
): Promise<void> {
  const interventionLabel = INTERVENTION_LABELS[request.intervention_type] || request.intervention_type;
  const urgencyLabel = URGENCY_LABELS[request.urgency] || request.urgency;
  
  const plainTextContent = `Nuova richiesta assegnata a te!

Ciao ${fullName},

Hai ricevuto una nuova richiesta di intervento in esclusiva nella tua zona.

DETTAGLI RICHIESTA
------------------
Tipo intervento: ${interventionLabel}
Citta: ${request.city}
Urgenza: ${urgencyLabel}
Descrizione: ${request.description}

TEMPO PER ACCETTARE
-------------------
Hai ${timerMinutes} minuti per accettare questa richiesta prima che venga riassegnata.

Accedi subito al tuo dashboard per accettare:
https://idraulicisubito.com/dashboard

---
IdrauliciSubito
https://idraulicisubito.com`;

  const emailResponse = await resend.emails.send({
    from: "IdrauliciSubito <notifiche@idraulicisubito.com>",
    reply_to: "supporto@idraulicisubito.com",
    to: [email],
    subject: `Nuova richiesta: ${interventionLabel} a ${request.city}`,
    text: plainTextContent,
    headers: {
      "List-Unsubscribe": "<mailto:supporto@idraulicisubito.com?subject=unsubscribe>",
    },
    html: `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nuova richiesta assegnata</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;">
<tr>
<td align="center" style="padding:20px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

<!-- Header -->
<tr>
<td style="background-color:#16a34a;padding:25px;text-align:center;border-radius:8px 8px 0 0;">
<h1 style="margin:0;color:#ffffff;font-family:Arial,sans-serif;font-size:22px;font-weight:bold;">Nuova richiesta assegnata a te!</h1>
</td>
</tr>

<!-- Main Content -->
<tr>
<td style="background-color:#ffffff;padding:30px;font-family:Arial,sans-serif;">

<p style="margin:0 0 20px 0;font-size:16px;line-height:1.5;color:#333333;">
Ciao <strong>${fullName}</strong>,
</p>

<p style="margin:0 0 20px 0;font-size:16px;line-height:1.5;color:#333333;">
Hai ricevuto una nuova richiesta di intervento in esclusiva nella tua zona.
</p>

<!-- Timer Warning -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;background-color:#fff3cd;border:1px solid #ffc107;border-radius:6px;">
<tr>
<td style="padding:15px;text-align:center;">
<strong style="color:#856404;font-size:14px;font-family:Arial,sans-serif;">Hai ${timerMinutes} minuti per accettare questa richiesta</strong>
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
<a href="https://idraulicisubito.com/dashboard" style="display:inline-block;background-color:#28a745;color:#ffffff;padding:14px 30px;border-radius:6px;text-decoration:none;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">Accetta richiesta</a>
</td>
</tr>
</table>

<p style="margin:20px 0 0 0;font-size:13px;color:#666666;font-family:Arial,sans-serif;text-align:center;">
Se non accetti entro il tempo previsto, la richiesta verra riassegnata.
</p>

</td>
</tr>

<!-- Footer -->
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

  console.log(`[assign-request] Email sent to ${email}:`, emailResponse);
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

    const { request_id } = await req.json() as AssignRequestPayload;

    if (!request_id) {
      return new Response(
        JSON.stringify({ error: 'request_id is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[assign-request] Processing request: ${request_id}`);

    // Get request details
    const { data: request, error: requestError } = await supabase
      .from('service_requests')
      .select('*')
      .eq('id', request_id)
      .single();

    if (requestError || !request) {
      console.error('[assign-request] Request not found:', requestError);
      return new Response(
        JSON.stringify({ error: 'Request not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[assign-request] Request status: ${request.status}, city: ${request.city}, urgency: ${request.urgency}`);

    // Skip if already assigned or accepted
    if (request.status === 'assigned' || request.status === 'accepted') {
      console.log(`[assign-request] Request already processed, status: ${request.status}`);
      return new Response(
        JSON.stringify({ success: true, message: 'Request already processed' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const urgency = request.urgency;
    const city = request.city;

    // Determine starting plan based on urgency
    // SUBITO: Premium only first, then Medium (skip Basic)
    // ENTRO_24_ORE: Premium -> Medium -> Basic
    // PROSSIMI_GIORNI: Premium -> Medium -> Basic
    let planPriority: string[] = [];
    
    if (urgency === 'subito') {
      planPriority = ['premium', 'medium']; // Basic excluded for SUBITO
    } else {
      planPriority = ['premium', 'medium', 'basic'];
    }

    console.log(`[assign-request] Urgency: ${urgency}, City: ${city}, Plan priority: ${planPriority.join(' -> ')}`);

    let assignedPlumber = null;

    // Try to find an eligible plumber starting from highest tier
    for (const plan of planPriority) {
      console.log(`[assign-request] Trying plan: ${plan}`);
      
      const { data: plumberId } = await supabase
        .rpc('get_next_eligible_plumber', {
          p_request_id: request_id,
          p_city: city,
          p_urgency: urgency,
          p_target_plan: plan
        });

      if (plumberId) {
        console.log(`[assign-request] Found eligible plumber: ${plumberId} (${plan})`);
        assignedPlumber = { id: plumberId, plan };
        break;
      }
    }

    if (!assignedPlumber) {
      console.log('[assign-request] No eligible plumbers found, marking as expired');
      
      await supabase
        .from('service_requests')
        .update({ status: 'expired' })
        .eq('id', request_id);

      return new Response(
        JSON.stringify({ success: false, message: 'No eligible plumbers found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Assign the request to the plumber
    const { data: assignResult } = await supabase
      .rpc('assign_request_to_plumber', {
        p_request_id: request_id,
        p_plumber_id: assignedPlumber.id
      });

    console.log(`[assign-request] Assignment result: ${assignResult}`);

    // Get timer configuration for this plan/urgency
    const { data: config } = await supabase
      .from('assignment_config')
      .select('timer_minutes')
      .eq('plan_type', assignedPlumber.plan)
      .eq('urgency', urgency)
      .single();
    
    const timerMinutes = config?.timer_minutes || 60;

    // Get plumber details and send notification email
    const { data: plumber } = await supabase
      .from('plumber_profiles')
      .select('email, full_name, business_name')
      .eq('id', assignedPlumber.id)
      .single();

    if (plumber) {
      try {
        await sendAssignmentEmail(plumber.email, plumber.full_name, request, timerMinutes);
        console.log(`[assign-request] Notification email sent to: ${plumber.email}`);
      } catch (emailError) {
        console.error(`[assign-request] Failed to send email:`, emailError);
        // Don't fail the assignment if email fails
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        assigned_to: assignedPlumber.id,
        plan: assignedPlumber.plan
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('[assign-request] Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
