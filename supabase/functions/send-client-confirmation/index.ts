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

    // Email ottimizzata per deliverability:
    // - Mittente più "umano" (conferma@ invece di noreply@)
    // - HTML semplificato senza troppi stili
    // - Meno emoji
    // - Testo chiaro e professionale
    const emailResponse = await resend.emails.send({
      from: "IdrauliciSubito <conferma@idraulicisubito.com>",
      reply_to: "supporto@idraulicisubito.com",
      to: [client_email],
      subject: `Conferma: un idraulico ha accettato la tua richiesta a ${city}`,
      text: `Gentile ${client_name},

Un idraulico professionista ha accettato la tua richiesta di intervento.

DATI DELL'IDRAULICO:
Nome: ${plumber_name}
Attivita: ${plumber_business}
Telefono: ${plumber_phone}

DETTAGLI RICHIESTA:
Tipo intervento: ${interventionLabel}
Localita: ${city}

L'idraulico ti contattera a breve per concordare i dettagli dell'intervento.
Se hai urgenza, puoi chiamarlo direttamente al numero indicato.

Cordiali saluti,
Il team IdrauliciSubito

---
Questa email e stata inviata perche hai richiesto un intervento tramite IdrauliciSubito.
Per assistenza: supporto@idraulicisubito.com`,
      html: `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Conferma richiesta accettata</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 1.5; color: #333333; background-color: #f5f5f5;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td style="padding: 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="margin: 0 auto; background-color: #ffffff; border-radius: 8px;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 30px 30px 20px 30px; text-align: center; background-color: #2e7d32; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: normal;">Richiesta Accettata</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0 0 20px 0;">Gentile <strong>${client_name}</strong>,</p>
              
              <p style="margin: 0 0 20px 0;">Un idraulico professionista ha accettato la tua richiesta di intervento a ${city}.</p>
              
              <!-- Plumber Info Box -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #e8f5e9; border-radius: 6px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 10px 0; font-weight: bold; color: #2e7d32;">Dati dell'idraulico</p>
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding: 5px 0; color: #666666; width: 100px;">Nome:</td>
                        <td style="padding: 5px 0;">${plumber_name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #666666;">Attivita:</td>
                        <td style="padding: 5px 0;">${plumber_business}</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; color: #666666;">Telefono:</td>
                        <td style="padding: 5px 0;">
                          <a href="tel:${plumber_phone}" style="color: #2e7d32; font-weight: bold; text-decoration: none;">${plumber_phone}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Request Details -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5; border-radius: 6px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 10px 0; font-weight: bold;">Dettagli richiesta</p>
                    <p style="margin: 5px 0; color: #666666;">Intervento: ${interventionLabel}</p>
                    <p style="margin: 5px 0; color: #666666;">Localita: ${city}</p>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0 0 20px 0;">L'idraulico ti contattera a breve per concordare i dettagli dell'intervento. Se hai urgenza, puoi chiamarlo direttamente al numero indicato.</p>
              
              <!-- CTA Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="text-align: center; padding: 10px 0;">
                    <a href="tel:${plumber_phone}" style="display: inline-block; background-color: #2e7d32; color: #ffffff; padding: 14px 30px; border-radius: 6px; text-decoration: none; font-weight: bold;">Chiama ${plumber_name}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; text-align: center; border-top: 1px solid #eeeeee;">
              <p style="margin: 0; color: #999999; font-size: 14px;">Grazie per aver scelto IdrauliciSubito</p>
              <p style="margin: 10px 0 0 0; color: #999999; font-size: 12px;">
                Per assistenza: <a href="mailto:supporto@idraulicisubito.com" style="color: #2e7d32;">supporto@idraulicisubito.com</a>
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
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