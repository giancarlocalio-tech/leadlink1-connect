import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[NOTIFY-OWNER] ${step}${detailsStr}`);
};

const INTERVENTION_LABELS: Record<string, string> = {
  'riparazione_perdite': 'Riparazione perdite',
  'installazione_sanitari': 'Installazione sanitari',
  'manutenzione_caldaia': 'Manutenzione caldaia',
  'spurgo_scarichi': 'Spurgo scarichi',
  'installazione_impianto': 'Installazione impianto idraulico',
  'riparazione_tubature': 'Riparazione tubature',
  'altro': 'Altro intervento',
};

const URGENCY_LABELS: Record<string, string> = {
  'immediata': '🔴 Immediata',
  'oggi': '🟠 Oggi',
  'settimana': '🟡 Questa settimana',
  'preventivo': '🟢 Solo preventivo',
};

interface NotifyOwnerPayload {
  notification_type: 'new_request' | 'request_accepted' | 'request_expired' | 'subscription';
  request_id?: string;
  plumber_id?: string;
  plumber_name?: string;
  plumber_email?: string;
  plan_type?: string;
  business_name?: string;
  additional_info?: Record<string, unknown>;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const ownerEmail = Deno.env.get("OWNER_NOTIFICATION_EMAIL");

  try {
    logStep("Function started");

    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not set");
    }

    if (!ownerEmail) {
      throw new Error("OWNER_NOTIFICATION_EMAIL is not set");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const resend = new Resend(resendApiKey);

    const payload: NotifyOwnerPayload = await req.json();
    logStep("Payload received", { notification_type: payload.notification_type, request_id: payload.request_id });

    let emailSubject = '';
    let emailHtml = '';
    let emailType = payload.notification_type;

    // ========== NUOVA RICHIESTA ==========
    if (payload.notification_type === 'new_request' && payload.request_id) {
      const { data: request, error: reqError } = await supabase
        .from('service_requests')
        .select('*')
        .eq('id', payload.request_id)
        .single();

      if (reqError || !request) {
        throw new Error(`Request not found: ${payload.request_id}`);
      }

      const interventionLabel = INTERVENTION_LABELS[request.intervention_type] || request.intervention_type;
      const urgencyLabel = URGENCY_LABELS[request.urgency] || request.urgency;

      emailSubject = `🆕 Nuova Richiesta: ${interventionLabel} a ${request.city}`;
      emailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
              .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
              .info-box { background: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #3b82f6; }
              .label { font-weight: 600; color: #64748b; font-size: 12px; text-transform: uppercase; }
              .value { font-size: 16px; color: #1e293b; margin-top: 5px; }
              .urgency-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: 600; background: #fef3c7; color: #92400e; }
              .footer { text-align: center; padding: 20px; color: #64748b; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px;">🆕 Nuova Richiesta Ricevuta!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Una nuova richiesta è stata inserita nel sistema</p>
              </div>
              <div class="content">
                <div class="info-box">
                  <div class="label">Tipo Intervento</div>
                  <div class="value">${interventionLabel}</div>
                </div>
                <div class="info-box">
                  <div class="label">Urgenza</div>
                  <div class="value"><span class="urgency-badge">${urgencyLabel}</span></div>
                </div>
                <div class="info-box">
                  <div class="label">Città</div>
                  <div class="value">📍 ${request.city}</div>
                </div>
                <div class="info-box">
                  <div class="label">Cliente</div>
                  <div class="value">${request.client_name || 'Non specificato'}</div>
                </div>
                <div class="info-box">
                  <div class="label">Telefono Cliente</div>
                  <div class="value">${request.client_phone || 'Non specificato'}</div>
                </div>
                ${request.client_email ? `
                <div class="info-box">
                  <div class="label">Email Cliente</div>
                  <div class="value">${request.client_email}</div>
                </div>
                ` : ''}
                ${request.description ? `
                <div class="info-box">
                  <div class="label">Descrizione</div>
                  <div class="value">${request.description}</div>
                </div>
                ` : ''}
                <div class="info-box">
                  <div class="label">ID Richiesta</div>
                  <div class="value" style="font-family: monospace; font-size: 12px;">${request.id}</div>
                </div>
                <div class="info-box">
                  <div class="label">Stato</div>
                  <div class="value">${request.status === 'pending' ? '⏳ In attesa di assegnazione' : request.status === 'assigned' ? '👷 Assegnata' : request.status}</div>
                </div>
              </div>
              <div class="footer">
                <p>Ricevuta il ${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}</p>
                <p>IdrauliciSubito.com</p>
              </div>
            </div>
          </body>
        </html>
      `;
    }

    // ========== RICHIESTA ACCETTATA ==========
    else if (payload.notification_type === 'request_accepted' && payload.request_id) {
      const { data: request, error: reqError } = await supabase
        .from('service_requests')
        .select('*')
        .eq('id', payload.request_id)
        .single();

      if (reqError || !request) {
        throw new Error(`Request not found: ${payload.request_id}`);
      }

      // Get plumber info
      const { data: plumber } = await supabase
        .from('plumber_profiles')
        .select('full_name, business_name, phone, email')
        .eq('id', request.assigned_plumber_id)
        .single();

      const interventionLabel = INTERVENTION_LABELS[request.intervention_type] || request.intervention_type;

      emailSubject = `✅ Richiesta Accettata: ${plumber?.full_name || 'Idraulico'} ha accettato - ${request.city}`;
      emailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
              .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
              .info-box { background: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #0ea5e9; }
              .label { font-weight: 600; color: #64748b; font-size: 12px; text-transform: uppercase; }
              .value { font-size: 16px; color: #1e293b; margin-top: 5px; }
              .success-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: 600; background: #e0f2fe; color: #166534; }
              .footer { text-align: center; padding: 20px; color: #64748b; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px;">✅ Richiesta Accettata!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Un idraulico ha accettato una richiesta</p>
              </div>
              <div class="content">
                <div class="info-box">
                  <div class="label">Idraulico</div>
                  <div class="value"><strong>${plumber?.full_name || 'N/A'}</strong></div>
                  ${plumber?.business_name ? `<div class="value" style="font-size: 14px; color: #64748b;">${plumber.business_name}</div>` : ''}
                </div>
                <div class="info-box">
                  <div class="label">Contatti Idraulico</div>
                  <div class="value">📞 ${plumber?.phone || 'N/A'}</div>
                  <div class="value">📧 ${plumber?.email || 'N/A'}</div>
                </div>
                <div class="info-box">
                  <div class="label">Tipo Intervento</div>
                  <div class="value">${interventionLabel}</div>
                </div>
                <div class="info-box">
                  <div class="label">Città</div>
                  <div class="value">📍 ${request.city}</div>
                </div>
                <div class="info-box">
                  <div class="label">Cliente</div>
                  <div class="value">${request.client_name || 'Non specificato'}</div>
                  <div class="value">📞 ${request.client_phone || 'N/A'}</div>
                </div>
                <div class="info-box">
                  <div class="label">Stato</div>
                  <div class="value"><span class="success-badge">✅ Completata</span></div>
                </div>
              </div>
              <div class="footer">
                <p>Accettata il ${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}</p>
                <p>IdrauliciSubito.com</p>
              </div>
            </div>
          </body>
        </html>
      `;
    }

    // ========== NUOVO ABBONAMENTO ==========
    else if (payload.notification_type === 'subscription') {
      const { plumber_name, plumber_email, plan_type, business_name } = payload;
      
      if (!plumber_name || !plumber_email || !plan_type) {
        throw new Error("Missing required fields for subscription notification");
      }

      const planNames: Record<string, string> = {
        'basic': 'Piano Basic (€29/mese)',
        'medium': 'Piano Medium (€69/mese)',
        'premium': 'Piano Premium (€119/mese)',
      };
      const planDisplayName = planNames[plan_type] || plan_type;

      emailSubject = `🎉 Nuovo abbonamento: ${plumber_name} - ${planDisplayName}`;
      emailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #8b5cf6, #6d28d9); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
              .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
              .info-box { background: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #8b5cf6; }
              .label { font-weight: 600; color: #64748b; font-size: 12px; text-transform: uppercase; }
              .value { font-size: 16px; color: #1e293b; margin-top: 5px; }
              .plan-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: 600; background: #0ea5e9; color: white; }
              .footer { text-align: center; padding: 20px; color: #64748b; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px;">🎉 Nuovo Abbonamento!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Un idraulico ha sottoscritto un piano</p>
              </div>
              <div class="content">
                <div class="info-box">
                  <div class="label">Nome Idraulico</div>
                  <div class="value">${plumber_name}</div>
                </div>
                ${business_name ? `
                <div class="info-box">
                  <div class="label">Nome Attività</div>
                  <div class="value">${business_name}</div>
                </div>
                ` : ''}
                <div class="info-box">
                  <div class="label">Email</div>
                  <div class="value"><a href="mailto:${plumber_email}" style="color: #3b82f6;">${plumber_email}</a></div>
                </div>
                <div class="info-box">
                  <div class="label">Piano Sottoscritto</div>
                  <div class="value"><span class="plan-badge">${planDisplayName}</span></div>
                </div>
              </div>
              <div class="footer">
                <p>IdrauliciSubito.com</p>
              </div>
            </div>
          </body>
        </html>
      `;
    }

    else {
      throw new Error(`Unknown notification type: ${payload.notification_type}`);
    }

    // Invia email
    logStep("Sending email to owner", { to: ownerEmail, subject: emailSubject });
    
    const emailResponse = await resend.emails.send({
      from: "IdrauliciSubito <noreply@idraulicisubito.com>",
      to: [ownerEmail],
      subject: emailSubject,
      html: emailHtml,
    });

    logStep("Email sent successfully", { emailId: emailResponse.data?.id });

    // Log email nel database
    const { error: logError } = await supabase
      .from('email_logs')
      .insert({
        email_type: emailType,
        recipient_email: ownerEmail,
        recipient_name: 'Owner',
        subject: emailSubject,
        resend_email_id: emailResponse.data?.id,
        request_id: payload.request_id || null,
        plumber_id: payload.plumber_id || null,
        status: 'sent',
        metadata: { notification_payload: payload }
      });

    if (logError) {
      logStep("Warning: Failed to log email", { error: logError.message });
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Owner notification sent",
        email_id: emailResponse.data?.id 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });

    // Log failed email attempt
    try {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      await supabase
        .from('email_logs')
        .insert({
          email_type: 'owner_notification_failed',
          recipient_email: ownerEmail || 'unknown',
          recipient_name: 'Owner',
          subject: 'Failed notification',
          status: 'failed',
          error_message: errorMessage,
          metadata: { error: errorMessage }
        });
    } catch (logErr) {
      logStep("Failed to log error", { logErr });
    }
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
