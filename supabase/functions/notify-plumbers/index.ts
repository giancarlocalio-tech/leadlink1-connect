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
    const { data: plumbers, error: plumbersError } = await supabase
      .from("plumber_profiles")
      .select("id, email, full_name, business_name, service_areas, intervention_types")
      .contains("intervention_types", [serviceRequest.intervention_type]);

    if (plumbersError) {
      console.error("Error fetching plumbers:", plumbersError);
      throw new Error(`Failed to fetch plumbers: ${plumbersError.message}`);
    }

    console.log("Found plumbers with matching intervention type:", plumbers?.length || 0);

    // Filter plumbers who serve the request city
    const matchingPlumbers = (plumbers || []).filter((plumber) => {
      // Check if the city is in their service areas or if main_city matches
      const serviceAreas = plumber.service_areas || [];
      const cityLower = serviceRequest.city.toLowerCase();
      
      return serviceAreas.some((area: string) => 
        area.toLowerCase().includes(cityLower) || 
        cityLower.includes(area.toLowerCase())
      );
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
          from: "IdraulicoVicino <onboarding@resend.dev>",
          to: [plumber.email],
          subject: `🔧 Nuova richiesta di intervento a ${serviceRequest.city}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
              <div style="background: linear-gradient(135deg, #0066cc 0%, #004d99 100%); padding: 40px 30px; border-radius: 16px 16px 0 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px;">🔧 Nuova Richiesta di Intervento</h1>
              </div>
              
              <div style="background: white; padding: 40px 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <p style="font-size: 18px; margin-top: 0;">Ciao <strong>${plumber.full_name || plumber.business_name}</strong>,</p>
                
                <p style="font-size: 16px;">È arrivata una nuova richiesta di intervento nella tua zona!</p>
                
                <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 24px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #0066cc;">
                  <h3 style="margin-top: 0; color: #0066cc; font-size: 18px;">📋 Dettagli Richiesta</h3>
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
                  <a href="https://idraulicovicino.it/dashboard" 
                     style="display: inline-block; background: linear-gradient(135deg, #0066cc 0%, #004d99 100%); color: white; padding: 16px 40px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);">
                    Visualizza nel Dashboard
                  </a>
                </div>
                
                <p style="font-size: 14px; color: #666; margin-top: 24px; text-align: center;">
                  Accedi al tuo account per visualizzare i dettagli completi e contattare il cliente.
                </p>
              </div>
              
              <div style="text-align: center; padding: 24px; color: #999; font-size: 12px;">
                <p style="margin: 0;">Questa email è stata inviata da IdraulicoVicino</p>
                <p style="margin: 8px 0 0 0;">© ${new Date().getFullYear()} IdraulicoVicino. Tutti i diritti riservati.</p>
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
