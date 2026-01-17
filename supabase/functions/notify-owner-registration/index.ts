import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[NOTIFY-OWNER-REGISTRATION] ${step}${detailsStr}`);
};

interface RegistrationNotification {
  plumber_name: string;
  plumber_email: string;
  plumber_phone: string;
  business_name: string;
  main_city: string;
  service_areas?: string[];
  intervention_types?: string[];
}

const INTERVENTION_LABELS: Record<string, string> = {
  'perdita_acqua': 'Perdita acqua',
  'rubinetto_rotto': 'Rubinetto rotto',
  'scarico_intasato': 'Scarico intasato',
  'caldaia': 'Caldaia',
  'installazione_sostituzione': 'Installazione/Sostituzione',
  'sturare_spurgo': 'Sturare/Spurgo',
  'riparazione': 'Riparazione',
  'impianto_idraulico': 'Impianto idraulico',
  'box_doccia': 'Box doccia',
  'impianto_riscaldamento': 'Impianto riscaldamento',
  'termoidraulico': 'Termoidraulico',
  'condizionatori': 'Condizionatori',
  'ristrutturazione': 'Ristrutturazione',
  'certificazione': 'Certificazione',
  'termosifone': 'Termosifone',
  'contatore': 'Contatore',
  'addolcitore_acqua': 'Addolcitore acqua',
  'depuratore_acqua': 'Depuratore acqua',
  'sostituzione_rubinetto': 'Sostituzione rubinetto',
  'altro': 'Altro',
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const ownerEmail = Deno.env.get("OWNER_NOTIFICATION_EMAIL");

    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not set");
    }

    if (!ownerEmail) {
      throw new Error("OWNER_NOTIFICATION_EMAIL is not set");
    }

    logStep("Environment variables verified");

    const body: RegistrationNotification = await req.json();
    const { 
      plumber_name, 
      plumber_email, 
      plumber_phone, 
      business_name, 
      main_city,
      service_areas,
      intervention_types
    } = body;

    if (!plumber_name || !plumber_email || !business_name) {
      throw new Error("Missing required fields: plumber_name, plumber_email, business_name");
    }

    logStep("Registration data received", { plumber_name, plumber_email, business_name, main_city });

    const resend = new Resend(resendApiKey);

    const interventionLabels = intervention_types?.map(t => INTERVENTION_LABELS[t] || t).join(', ') || 'Non specificati';
    const areasStr = service_areas?.join(', ') || 'Non specificate';

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #22c55e; }
            .label { font-weight: 600; color: #64748b; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }
            .value { font-size: 16px; color: #1e293b; }
            .badge { display: inline-block; background: #3b82f6; color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; }
            .footer { text-align: center; padding: 20px; color: #64748b; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">🆕 Nuovo Idraulico Registrato!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Un nuovo professionista si è iscritto su IdrauliciSubito</p>
            </div>
            <div class="content">
              <div class="info-box">
                <div class="label">Nome Completo</div>
                <div class="value">${plumber_name}</div>
              </div>
              <div class="info-box">
                <div class="label">Nome Attività</div>
                <div class="value">${business_name}</div>
              </div>
              <div class="info-box">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${plumber_email}" style="color: #3b82f6;">${plumber_email}</a></div>
              </div>
              <div class="info-box">
                <div class="label">Telefono</div>
                <div class="value"><a href="tel:${plumber_phone}" style="color: #3b82f6;">${plumber_phone}</a></div>
              </div>
              <div class="info-box">
                <div class="label">Città Principale</div>
                <div class="value">${main_city}</div>
              </div>
              <div class="info-box">
                <div class="label">Zone Coperte</div>
                <div class="value">${areasStr}</div>
              </div>
              <div class="info-box">
                <div class="label">Tipi di Intervento</div>
                <div class="value">${interventionLabels}</div>
              </div>
              <div style="text-align: center; margin-top: 20px;">
                <span class="badge">Prova Gratuita Attiva</span>
              </div>
            </div>
            <div class="footer">
              <p>Questa email è stata inviata automaticamente da IdrauliciSubito.com</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "IdrauliciSubito <noreply@idraulicisubito.com>",
      to: [ownerEmail],
      subject: `🆕 Nuovo idraulico: ${plumber_name} (${business_name}) - ${main_city}`,
      html: emailHtml,
    });

    logStep("Email sent successfully", { emailResponse });

    return new Response(
      JSON.stringify({ success: true, message: "Notification sent" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
