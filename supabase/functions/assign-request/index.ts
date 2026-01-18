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

async function generateMagicLink(supabase: any, email: string, appOrigin?: string): Promise<string> {
  // Use provided origin or default to production
  const origin = appOrigin || "https://www.idraulicisubito.com";
  let loginUrl = `${origin}/auth?mode=login`;
  
  try {
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: "magiclink",
      email,
    });

    if (linkError) {
      console.error("[assign-request] generateLink error:", linkError);
    } else {
      const tokenHash = (linkData as any)?.properties?.hashed_token as string | undefined;
      if (tokenHash) {
        loginUrl = `${origin}/auth/confirm?token_hash=${encodeURIComponent(tokenHash)}&type=magiclink&next=${encodeURIComponent("/dashboard")}`;
        console.log("[assign-request] Generated magic link for:", email);
      } else {
        console.error("[assign-request] generateLink missing hashed_token");
      }
    }
  } catch (e) {
    console.error("[assign-request] Error generating magic link:", e);
  }
  
  return loginUrl;
}

async function logEmail(
  supabase: any,
  emailType: string,
  recipientEmail: string,
  recipientName: string,
  subject: string,
  resendEmailId: string | null,
  requestId: string | null,
  plumberId: string | null,
  status: string,
  errorMessage?: string,
  metadata?: Record<string, unknown>
): Promise<void> {
  try {
    await supabase
      .from('email_logs')
      .insert({
        email_type: emailType,
        recipient_email: recipientEmail,
        recipient_name: recipientName,
        subject: subject,
        resend_email_id: resendEmailId,
        request_id: requestId,
        plumber_id: plumberId,
        status: status,
        error_message: errorMessage,
        metadata: metadata || {}
      });
    console.log(`[assign-request] Email logged: ${emailType} to ${recipientEmail}`);
  } catch (err) {
    console.error(`[assign-request] Failed to log email:`, err);
  }
}

async function notifyOwner(
  supabaseUrl: string,
  supabaseServiceKey: string,
  notificationType: string,
  requestId?: string,
  plumberId?: string
): Promise<void> {
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/notify-owner`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseServiceKey}`,
      },
      body: JSON.stringify({
        notification_type: notificationType,
        request_id: requestId,
        plumber_id: plumberId
      })
    });
    
    if (!response.ok) {
      console.error(`[assign-request] Failed to notify owner: ${response.status}`);
    } else {
      console.log(`[assign-request] Owner notified: ${notificationType}`);
    }
  } catch (err) {
    console.error(`[assign-request] Error notifying owner:`, err);
  }
}

async function sendAssignmentEmail(
  supabase: any,
  supabaseUrl: string,
  supabaseServiceKey: string,
  email: string, 
  fullName: string, 
  request: any,
  timerMinutes: number,
  plumberId: string
): Promise<{ success: boolean; emailId?: string; error?: string }> {
  const interventionLabel = INTERVENTION_LABELS[request.intervention_type] || request.intervention_type;
  const urgencyLabel = URGENCY_LABELS[request.urgency] || request.urgency;
  
  // Generate magic link for one-click login
  const loginUrl = await generateMagicLink(supabase, email);
  const subject = `Nuova richiesta: ${interventionLabel} a ${request.city}`;
  
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
${loginUrl}

---
IdrauliciSubito
https://www.idraulicisubito.com`;

  try {
    const emailResponse = await resend.emails.send({
      from: "IdrauliciSubito <notifiche@idraulicisubito.com>",
      reply_to: "supporto@idraulicisubito.com",
      to: [email],
      subject: subject,
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
<a href="${loginUrl}" style="display:inline-block;background-color:#16a34a;color:#ffffff;padding:14px 30px;border-radius:6px;text-decoration:none;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">Accetta richiesta</a>
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

    console.log(`[assign-request] Email sent to ${email}:`, emailResponse);
    
    // Log successful email
    await logEmail(
      supabase,
      'assignment',
      email,
      fullName,
      subject,
      emailResponse.data?.id || null,
      request.id,
      plumberId,
      'sent'
    );

    return { success: true, emailId: emailResponse.data?.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`[assign-request] Email send failed:`, error);
    
    // Log failed email
    await logEmail(
      supabase,
      'assignment',
      email,
      fullName,
      subject,
      null,
      request.id,
      plumberId,
      'failed',
      errorMessage
    );

    return { success: false, error: errorMessage };
  }
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
    // All urgency types now include Basic (Premium -> Medium -> Basic)
    const planPriority = ['premium', 'medium', 'basic'];

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
      // Don't mark as expired - trial users can still claim this request
      // Trial users see all 'new' requests and can claim them (first come, first served)
      console.log('[assign-request] No eligible subscribers found, keeping request as new for trial users');
      
      return new Response(
        JSON.stringify({ success: true, message: 'No subscribers found, available for trial users' }),
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
      const emailResult = await sendAssignmentEmail(
        supabase, 
        supabaseUrl, 
        supabaseServiceKey, 
        plumber.email, 
        plumber.full_name, 
        request, 
        timerMinutes,
        assignedPlumber.id
      );
      
      if (emailResult.success) {
        console.log(`[assign-request] Notification email sent to: ${plumber.email}, ID: ${emailResult.emailId}`);
      } else {
        console.error(`[assign-request] Failed to send email: ${emailResult.error}`);
      }

      // Send WhatsApp notification (fire and forget)
      try {
        const whatsappResponse = await fetch(`${supabaseUrl}/functions/v1/send-whatsapp-notification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseServiceKey}`,
          },
          body: JSON.stringify({
            request_id: request_id,
            plumber_id: assignedPlumber.id,
          }),
        });
        
        if (whatsappResponse.ok) {
          console.log(`[assign-request] WhatsApp notification sent to plumber: ${assignedPlumber.id}`);
        } else {
          const whatsappError = await whatsappResponse.text();
          console.error(`[assign-request] WhatsApp notification failed: ${whatsappError}`);
        }
      } catch (whatsappErr) {
        console.error(`[assign-request] WhatsApp notification error:`, whatsappErr);
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
