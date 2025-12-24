import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ClientConfirmationRequest {
  client_email: string;
  client_name: string;
  plumber_name: string;
  plumber_phone: string;
  plumber_business: string;
  intervention_type: string;
  city: string;
}

const INTERVENTION_LABELS: Record<string, string> = {
  perdita_acqua: "Perdita acqua",
  rubinetto_rotto: "Rubinetto rotto",
  scarico_intasato: "Scarico intasato",
  caldaia: "Caldaia",
  installazione_sostituzione: "Installazione/Sostituzione",
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

const handler = async (req: Request): Promise<Response> => {
  console.log("send-client-confirmation function called");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      client_email, 
      client_name, 
      plumber_name, 
      plumber_phone, 
      plumber_business,
      intervention_type,
      city 
    }: ClientConfirmationRequest = await req.json();

    if (!client_email) {
      console.log("No client email provided, skipping");
      return new Response(
        JSON.stringify({ message: "No client email provided" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`Sending confirmation email to client ${client_email}`);

    const interventionLabel = INTERVENTION_LABELS[intervention_type] || intervention_type;

    const emailResponse = await resend.emails.send({
      from: "IdrauliciSubito <noreply@idraulicisubito.com>",
      to: [client_email],
      subject: "✅ Un idraulico ha accettato la tua richiesta!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%); padding: 40px 30px; border-radius: 16px 16px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">✅ Richiesta Accettata!</h1>
          </div>
          
          <div style="background: white; padding: 40px 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <p style="font-size: 18px; margin-top: 0;">Ciao <strong>${client_name}</strong>,</p>
            
            <p style="font-size: 16px;">Ottime notizie! Un idraulico professionista ha accettato la tua richiesta di intervento.</p>
            
            <div style="background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); padding: 24px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #28a745;">
              <h3 style="margin-top: 0; color: #1e7e34; font-size: 18px;">👷 Il tuo idraulico</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #666; width: 120px;"><strong>Nome:</strong></td>
                  <td style="padding: 10px 0; font-size: 16px;">${plumber_name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;"><strong>Attività:</strong></td>
                  <td style="padding: 10px 0; font-size: 16px;">${plumber_business}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666;"><strong>Telefono:</strong></td>
                  <td style="padding: 10px 0;">
                    <a href="tel:${plumber_phone}" style="color: #0066cc; font-size: 18px; font-weight: 600; text-decoration: none;">
                      📞 ${plumber_phone}
                    </a>
                  </td>
                </tr>
              </table>
            </div>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; margin: 24px 0;">
              <h3 style="margin-top: 0; color: #333; font-size: 16px;">📋 Dettagli richiesta</h3>
              <p style="margin: 8px 0; color: #666;"><strong>Intervento:</strong> ${interventionLabel}</p>
              <p style="margin: 8px 0 0 0; color: #666;"><strong>Località:</strong> ${city}</p>
            </div>
            
            <div style="background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%); padding: 20px; border-radius: 12px; margin: 24px 0;">
              <h3 style="margin-top: 0; color: #856404; font-size: 16px;">💡 Cosa fare adesso?</h3>
              <p style="margin: 8px 0 0 0; color: #856404; font-size: 14px;">
                L'idraulico ti contatterà a breve per concordare i dettagli dell'intervento. 
                Se hai urgenza, puoi chiamarlo direttamente al numero indicato sopra.
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 32px;">
              <a href="tel:${plumber_phone}" 
                 style="display: inline-block; background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%); color: white; padding: 16px 40px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);">
                📞 Chiama ${plumber_name}
              </a>
            </div>
            
            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee;">
              <p style="font-size: 14px; color: #666; margin: 0; text-align: center;">
                Grazie per aver scelto IdrauliciSubito per trovare il tuo idraulico!
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

    console.log("Client confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-client-confirmation function:", error);
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
