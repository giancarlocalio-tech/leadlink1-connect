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
    const { email, full_name, business_name, plan_type }: WelcomeEmailRequest = await req.json();

    console.log(`Sending welcome email to ${email}`);

    const planLabel = PLAN_LABELS[plan_type] || plan_type;

    const emailResponse = await resend.emails.send({
      from: "IdrauliciSubito <noreply@idraulicisubito.com>",
      reply_to: "supporto@idraulicisubito.com",
      to: [email],
      subject: "Benvenuto su IdrauliciSubito!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background: linear-gradient(135deg, #0066cc 0%, #004d99 100%); padding: 40px 30px; border-radius: 16px 16px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Benvenuto su IdrauliciSubito!</h1>
          </div>
          
          <div style="background: white; padding: 40px 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <p style="font-size: 18px; margin-top: 0;">Ciao <strong>${full_name}</strong>,</p>
            
            <p style="font-size: 16px;">Siamo entusiasti di averti con noi! La tua registrazione come idraulico professionista è stata completata con successo.</p>
            
            <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 24px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #0066cc;">
              <h3 style="margin-top: 0; color: #0066cc; font-size: 18px;">📋 Riepilogo Account</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #666; width: 140px;"><strong>Attività:</strong></td>
                  <td style="padding: 10px 0; font-size: 16px;">${business_name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;"><strong>Piano:</strong></td>
                  <td style="padding: 10px 0;">
                    <span style="background: linear-gradient(135deg, #0066cc 0%, #004d99 100%); color: white; padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 600;">
                      ${planLabel}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;"><strong>Prova gratuita:</strong></td>
                  <td style="padding: 10px 0; font-size: 16px;">
                    <span style="color: #28a745; font-weight: 600;">30 giorni</span>
                  </td>
                </tr>
              </table>
            </div>

            <h3 style="color: #333; font-size: 18px; margin-top: 32px;">🚀 Prossimi passi</h3>
            
            <div style="margin: 16px 0;">
              <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
                <span style="background: #0066cc; color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px; flex-shrink: 0;">1</span>
                <div>
                  <strong style="color: #333;">Completa il tuo profilo</strong>
                  <p style="margin: 4px 0 0 0; color: #666; font-size: 14px;">Aggiungi una foto, la descrizione dei tuoi servizi e le zone che copri.</p>
                </div>
              </div>
              
              <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
                <span style="background: #0066cc; color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px; flex-shrink: 0;">2</span>
                <div>
                  <strong style="color: #333;">Imposta la tua disponibilità</strong>
                  <p style="margin: 4px 0 0 0; color: #666; font-size: 14px;">Indica quando sei disponibile per ricevere nuove richieste.</p>
                </div>
              </div>
              
              <div style="display: flex; align-items: flex-start;">
                <span style="background: #0066cc; color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px; flex-shrink: 0;">3</span>
                <div>
                  <strong style="color: #333;">Inizia a ricevere richieste</strong>
                  <p style="margin: 4px 0 0 0; color: #666; font-size: 14px;">Riceverai notifiche quando arrivano nuove richieste nella tua zona.</p>
                </div>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 32px;">
              <a href="https://idraulicisubito.com/dashboard" 
                 style="display: inline-block; background: linear-gradient(135deg, #0066cc 0%, #004d99 100%); color: white; padding: 16px 40px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);">
                Accedi al Dashboard
              </a>
            </div>
            
            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee;">
              <p style="font-size: 14px; color: #666; margin: 0;">
                Hai domande? Rispondi a questa email e saremo felici di aiutarti!
              </p>
            </div>
          </div>
          
          <div style="text-align: center; padding: 24px; color: #999; font-size: 12px;">
            <p style="margin: 0;">Questa email è stata inviata da IdrauliciSubito</p>
            <p style="margin: 8px 0 0 0;">© ${new Date().getFullYear()} IdrauliciSubito. Tutti i diritti riservati.</p>
          </div>
        </body>
        </html>
      `,
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
