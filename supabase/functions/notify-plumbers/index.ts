import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { z } from "npm:zod@3.25.76";
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ServiceRequest {
  id: string;
  intervention_type: string;
  city: string;
  urgency: string;
  property_type: string;
  description: string;
  created_at: string;
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

const URGENCY_LABELS: Record<string, string> = {
  subito: "Subito",
  entro_24_ore: "Entro 24 ore",
  prossimi_giorni: "Prossimi giorni",
};

const handler = async (req: Request): Promise<Response> => {
  console.log("notify-plumbers function called");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = (await req.json().catch(() => ({}))) as any;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const CreateRequestSchema = z
      .object({
        intervention_type: z.string().trim().min(1).max(80),
        city: z.string().trim().min(1).max(120),
        description: z.string().trim().min(1).max(2000),
        urgency: z.string().trim().min(1).max(80),
        property_type: z.string().trim().min(1).max(80),
        accessibility: z.string().trim().min(1).max(80),
        client_name: z.string().trim().min(1).max(120),
        client_phone: z.string().trim().min(3).max(30),
        client_email: z.string().trim().email().nullable().optional(),
        privacy_accepted: z.literal(true),
        wizard_answers: z.array(z.object({
          questionId: z.string(),
          questionTitle: z.string(),
          answer: z.string(),
        })).nullable().optional(),
      })
      .strict();

    let request_id: string | undefined = body?.request_id;
    let serviceRequest: any | null = null;

    if (request_id) {
      console.log("Processing request_id:", request_id);

      // Fetch the service request details
      const { data: existingRequest, error: requestError } = await supabase
        .from("service_requests")
        .select("*")
        .eq("id", request_id)
        .maybeSingle();

      if (requestError) {
        console.error("Error fetching service request:", requestError);
        throw new Error(`Failed to fetch service request: ${requestError.message}`);
      }

      if (!existingRequest) {
        console.log("Service request not found:", request_id);
        return new Response(JSON.stringify({ error: "Service request not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      serviceRequest = existingRequest;
    } else {
      // New flow: create the request from the frontend (avoids RLS on return=representation)
      const parsed = CreateRequestSchema.parse(body?.request);

      const { data: inserted, error: insertError } = await supabase
        .from("service_requests")
        .insert({
          ...parsed,
          client_email: parsed.client_email ?? null,
          wizard_answers: parsed.wizard_answers ?? null,
        })
        .select("*")
        .single();

      if (insertError) {
        console.error("Error creating service request:", insertError);
        throw new Error(`Failed to create service request: ${insertError.message}`);
      }

      serviceRequest = inserted;
      request_id = inserted.id;
      console.log("Created service request:", request_id);
    }

    console.log("Service request ready:", serviceRequest.city, serviceRequest.intervention_type);

    // Send confirmation email to the client (if they provided an email)
    if (serviceRequest.client_email) {
      const interventionLabel = INTERVENTION_LABELS[serviceRequest.intervention_type] || serviceRequest.intervention_type;
      
      try {
        await resend.emails.send({
          from: "IdrauliciSubito <noreply@idraulicisubito.com>",
          reply_to: "supporto@idraulicisubito.com",
          to: [serviceRequest.client_email],
          subject: `✅ Richiesta ricevuta: ${interventionLabel}`,
          html: `
            <!DOCTYPE html>
            <html lang="it">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;">
                <tr>
                  <td align="center" style="padding:20px;">
                    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
                      
                      <!-- Header -->
                      <tr>
                        <td style="background:linear-gradient(135deg,#16a34a 0%,#15803d 100%);padding:30px;text-align:center;border-radius:12px 12px 0 0;">
                          <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:bold;">✅ Richiesta Ricevuta!</h1>
                        </td>
                      </tr>
                      
                      <!-- Content -->
                      <tr>
                        <td style="background-color:#ffffff;padding:30px;">
                          <p style="margin:0 0 20px 0;font-size:16px;line-height:1.6;color:#333333;">
                            Ciao <strong>${serviceRequest.client_name}</strong>,
                          </p>
                          
                          <p style="margin:0 0 20px 0;font-size:16px;line-height:1.6;color:#333333;">
                            Abbiamo ricevuto la tua richiesta di intervento e stiamo cercando l'idraulico più adatto nella tua zona.
                          </p>
                          
                          <!-- Request Summary -->
                          <div style="background-color:#f0fdf4;border-left:4px solid #16a34a;padding:20px;margin:20px 0;border-radius:0 8px 8px 0;">
                            <h3 style="margin:0 0 15px 0;color:#16a34a;font-size:16px;">📋 Riepilogo richiesta</h3>
                            <p style="margin:0 0 8px 0;font-size:14px;color:#333;">
                              <strong>Tipo intervento:</strong> ${interventionLabel}
                            </p>
                            <p style="margin:0 0 8px 0;font-size:14px;color:#333;">
                              <strong>Città:</strong> ${serviceRequest.city}
                            </p>
                            <p style="margin:0;font-size:14px;color:#333;">
                              <strong>Descrizione:</strong> ${serviceRequest.description}
                            </p>
                          </div>
                          
                          <p style="margin:20px 0;font-size:16px;line-height:1.6;color:#333333;">
                            <strong>Cosa succede ora?</strong>
                          </p>
                          
                          <ul style="margin:0 0 20px 0;padding-left:20px;color:#333333;font-size:14px;line-height:1.8;">
                            <li>Stiamo contattando gli idraulici disponibili nella tua zona</li>
                            <li>Riceverai un'email con i dati dell'idraulico non appena ne troveremo uno</li>
                            <li>L'idraulico ti contatterà direttamente per fissare l'appuntamento</li>
                          </ul>
                          
                          <p style="margin:0;font-size:14px;color:#666666;line-height:1.6;">
                            Se hai domande, rispondi a questa email o contattaci a <a href="mailto:supporto@idraulicisubito.com" style="color:#16a34a;">supporto@idraulicisubito.com</a>
                          </p>
                        </td>
                      </tr>
                      
                      <!-- Footer -->
                      <tr>
                        <td style="background-color:#f9fafb;padding:20px;text-align:center;border-radius:0 0 12px 12px;border-top:1px solid #e5e7eb;">
                          <p style="margin:0;font-size:12px;color:#9ca3af;">
                            © ${new Date().getFullYear()} IdrauliciSubito. Tutti i diritti riservati.
                          </p>
                        </td>
                      </tr>
                      
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `,
        });
        console.log("Client confirmation email sent to:", serviceRequest.client_email);
      } catch (emailError) {
        console.error("Error sending client confirmation email:", emailError);
        // Don't fail the request if email fails
      }
    }

    // Call assign-request to automatically assign to the best available plumber
    try {
      const assignResponse = await fetch(
        `${supabaseUrl}/functions/v1/assign-request`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseServiceKey}`,
          },
          body: JSON.stringify({ request_id: serviceRequest.id }),
        }
      );
      
      const assignResult = await assignResponse.json();
      console.log("Auto-assignment result:", assignResult);
    } catch (assignError) {
      console.error("Error calling assign-request:", assignError);
      // Continue with notifications even if assignment fails
    }

    // Find plumbers who serve this city and handle this intervention type
    // Join with subscriptions to filter by active/trial status
    const { data: plumbersWithSubs, error: plumbersError } = await supabase
      .from("plumber_profiles")
      .select(`
        id, 
        email, 
        full_name, 
        business_name, 
        service_areas, 
        intervention_types,
        plumber_subscriptions (
          status,
          is_trial,
          free_requests_remaining,
          is_available
        )
      `)
      .contains("intervention_types", [serviceRequest.intervention_type]);

    if (plumbersError) {
      console.error("Error fetching plumbers:", plumbersError);
      throw new Error(`Failed to fetch plumbers: ${plumbersError.message}`);
    }

    console.log("Found plumbers with matching intervention type:", plumbersWithSubs?.length || 0);
    
    // Debug: log the raw data structure
    if (plumbersWithSubs && plumbersWithSubs.length > 0) {
      console.log("First plumber raw data:", JSON.stringify(plumbersWithSubs[0], null, 2));
    }

    // Filter plumbers who:
    // 1. Serve the request city
    // 2. Have an active subscription OR are in trial with remaining requests
    // 3. Are available
    const matchingPlumbers = (plumbersWithSubs || []).filter((plumber) => {
      // Check if the city is in their service areas
      const serviceAreas = plumber.service_areas || [];
      const requestCity = serviceRequest.city.toLowerCase().trim();
      
      // Extract just the city name without province code for more flexible matching
      // e.g. "Siena (SI)" -> "siena"
      const requestCityName = requestCity.replace(/\s*\([^)]*\)\s*$/, '').trim();
      
      const cityMatches = serviceAreas.some((area: string) => {
        const areaLower = (area || '').toLowerCase().trim();
        const areaCityName = areaLower.replace(/\s*\([^)]*\)\s*$/, '').trim();
        
        // Match if: exact match, area contains city, or city contains area
        return areaLower === requestCity || 
               areaCityName === requestCityName ||
               areaLower.includes(requestCityName) || 
               requestCity.includes(areaCityName);
      });

      console.log(`Plumber ${plumber.email}: service_areas=${JSON.stringify(serviceAreas)}, requestCity=${requestCity}, cityMatches=${cityMatches}`);

      if (!cityMatches) return false;

      // Check subscription status - plumber_subscriptions can be array or object
      const subsData = plumber.plumber_subscriptions;
      let sub: any = null;
      
      if (Array.isArray(subsData)) {
        sub = subsData.length > 0 ? subsData[0] : null;
      } else if (subsData && typeof subsData === 'object') {
        // Sometimes Supabase returns a single object instead of array for 1:1 relations
        sub = subsData;
      }
      
      console.log(`Plumber ${plumber.email}: subscription data type=${typeof subsData}, isArray=${Array.isArray(subsData)}, raw=${JSON.stringify(subsData)}`);
      
      if (!sub) {
        console.log(`Plumber ${plumber.email}: no subscription found after parsing`);
        return false;
      }

      // Must be available
      if (sub.is_available === false) {
        console.log(`Plumber ${plumber.email}: not available`);
        return false;
      }

      // Active subscription OR trial with remaining requests
      // Note: trial users have status 'pending' but should still receive notifications
      const hasActiveSubscription = sub.status === 'active' && !sub.is_trial;
      const hasTrialRequestsLeft = sub.is_trial === true && (sub.free_requests_remaining ?? 0) > 0;

      console.log(`Plumber ${plumber.email}: status=${sub.status}, is_trial=${sub.is_trial}, free_remaining=${sub.free_requests_remaining}, hasActive=${hasActiveSubscription}, hasTrial=${hasTrialRequestsLeft}`);

      return hasActiveSubscription || hasTrialRequestsLeft;
    });

    console.log("Matching plumbers for city:", matchingPlumbers.length);

    if (matchingPlumbers.length === 0) {
      console.log("No matching plumbers found for this request");
      return new Response(
        JSON.stringify({ message: "No matching plumbers found", notified: 0 }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send emails to matching plumbers
    const emailPromises = matchingPlumbers.map(async (plumber) => {
      const interventionLabel = INTERVENTION_LABELS[serviceRequest.intervention_type] || serviceRequest.intervention_type;
      const urgencyLabel = URGENCY_LABELS[serviceRequest.urgency] || serviceRequest.urgency;

      try {
        const emailResult = await resend.emails.send({
          from: "IdrauliciSubito <noreply@idraulicisubito.com>",
          reply_to: "supporto@idraulicisubito.com",
          to: [plumber.email],
          subject: `🔧 Nuova richiesta: ${interventionLabel} a ${serviceRequest.city}`,
          text: `Ciao ${plumber.full_name || plumber.business_name},\n\nNuova richiesta a ${serviceRequest.city}.\nIntervento: ${interventionLabel}\nUrgenza: ${urgencyLabel}\n\nAccetta subito: https://idraulicisubito.com/dashboard/richieste?id=${serviceRequest.id}\n\nChi accetta per primo ottiene i dati del cliente!`,
          headers: {
            "List-Unsubscribe": "<mailto:supporto@idraulicisubito.com?subject=unsubscribe>",
          },
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
              <div style="background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); padding: 40px 30px; border-radius: 16px 16px 0 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px;">🔧 Nuova Richiesta di Intervento</h1>
              </div>
              
              <div style="background: white; padding: 40px 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <p style="font-size: 18px; margin-top: 0;">Ciao <strong>${plumber.full_name || plumber.business_name}</strong>,</p>
                
                <p style="font-size: 16px;">È arrivata una nuova richiesta di intervento nella tua zona!</p>
                
                <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 24px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #16a34a;">
                  <h3 style="margin-top: 0; color: #16a34a; font-size: 18px;">📋 Dettagli Richiesta</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 10px 0; color: #666; width: 140px;"><strong>Tipo intervento:</strong></td>
                      <td style="padding: 10px 0; font-size: 16px;">${interventionLabel}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0; color: #666;"><strong>Città:</strong></td>
                      <td style="padding: 10px 0; font-size: 16px;">${serviceRequest.city}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0; color: #666;"><strong>Urgenza:</strong></td>
                      <td style="padding: 10px 0;">
                        <span style="background: ${serviceRequest.urgency === 'subito' ? '#dc3545' : serviceRequest.urgency === 'entro_24_ore' ? '#ffc107' : '#28a745'}; color: ${serviceRequest.urgency === 'subito' ? 'white' : serviceRequest.urgency === 'entro_24_ore' ? '#333' : 'white'}; padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 600;">
                          ${urgencyLabel}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0; color: #666;"><strong>Tipo immobile:</strong></td>
                      <td style="padding: 10px 0; font-size: 16px;">${serviceRequest.property_type}</td>
                    </tr>
                  </table>
                  
                  ${serviceRequest.description ? `
                  <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #eee;">
                    <strong style="color: #666;">Descrizione:</strong>
                    <p style="margin: 8px 0 0 0; font-size: 15px;">${serviceRequest.description}</p>
                  </div>
                  ` : ''}
                </div>
                
                <div style="text-align: center; margin-top: 32px;">
                  <a href="https://idraulicisubito.com/dashboard/richieste?id=${serviceRequest.id}" 
                     style="display: inline-block; background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); color: white; padding: 16px 40px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);">
                    🚀 Accetta Richiesta
                  </a>
                </div>
                
                <p style="font-size: 14px; color: #666; margin-top: 24px; text-align: center;">
                  Chi accetta per primo ottiene i dati del cliente in esclusiva!
                </p>
              </div>
              
              <div style="text-align: center; padding: 24px; color: #999; font-size: 12px;">
                <p style="margin: 0;">Questa email è stata inviata da IdrauliciSubito</p>
                <p style="margin: 8px 0 0 0;">© ${new Date().getFullYear()} IdrauliciSubito. Tutti i diritti riservati.</p>
              </div>
            </body>
            </html>
          `,
        });

        console.log(`Email sent to ${plumber.email}:`, emailResult);
        return { success: true, email: plumber.email, result: emailResult };
      } catch (emailError) {
        console.error(`Failed to send email to ${plumber.email}:`, emailError);
        return { success: false, email: plumber.email, error: emailError };
      }
    });

    const results = await Promise.all(emailPromises);
    const successCount = results.filter((r) => r.success).length;
    const failedCount = results.filter((r) => !r.success).length;

    console.log(`Emails sent: ${successCount} success, ${failedCount} failed`);

    return new Response(
      JSON.stringify({
        request_id,
        message: "Notifications sent",
        notified: successCount,
        failed: failedCount,
        details: results,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in notify-plumbers function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
