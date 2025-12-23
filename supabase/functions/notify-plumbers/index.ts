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
  riparazione_perdite: "Riparazione perdite",
  installazione_sanitari: "Installazione sanitari",
  manutenzione_caldaia: "Manutenzione caldaia",
  sblocco_scarichi: "Sblocco scarichi",
  installazione_rubinetteria: "Installazione rubinetteria",
  riparazione_tubature: "Riparazione tubature",
  installazione_scaldabagno: "Installazione scaldabagno",
  manutenzione_impianto: "Manutenzione impianto",
  emergenza_allagamento: "Emergenza allagamento",
  altro: "Altro",
};

const URGENCY_LABELS: Record<string, string> = {
  urgent: "Urgente",
  normal: "Normale",
  flexible: "Flessibile",
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
          from: "IdraulicoVicino <noreply@resend.dev>",
          to: [plumber.email],
          subject: `🔧 Nuova richiesta di intervento a ${serviceRequest.city}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #0066cc 0%, #004d99 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">🔧 Nuova Richiesta di Intervento</h1>
              </div>
              
              <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e9ecef; border-top: none;">
                <p style="font-size: 16px; margin-top: 0;">Ciao <strong>${plumber.full_name || plumber.business_name}</strong>,</p>
                
                <p style="font-size: 16px;">È arrivata una nuova richiesta di intervento nella tua zona!</p>
                
                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0066cc;">
                  <h3 style="margin-top: 0; color: #0066cc;">Dettagli Richiesta</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; color: #666; width: 140px;"><strong>Tipo intervento:</strong></td>
                      <td style="padding: 8px 0;">${interventionLabel}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666;"><strong>Città:</strong></td>
                      <td style="padding: 8px 0;">${serviceRequest.city}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666;"><strong>Urgenza:</strong></td>
                      <td style="padding: 8px 0;">
                        <span style="background: ${serviceRequest.urgency === 'urgent' ? '#dc3545' : serviceRequest.urgency === 'normal' ? '#ffc107' : '#28a745'}; color: ${serviceRequest.urgency === 'urgent' ? 'white' : serviceRequest.urgency === 'normal' ? '#333' : 'white'}; padding: 4px 12px; border-radius: 20px; font-size: 14px;">
                          ${urgencyLabel}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666;"><strong>Tipo immobile:</strong></td>
                      <td style="padding: 8px 0;">${serviceRequest.property_type}</td>
                    </tr>
                  </table>
                  
                  ${serviceRequest.description ? `
                  <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #eee;">
                    <strong style="color: #666;">Descrizione:</strong>
                    <p style="margin: 8px 0 0 0;">${serviceRequest.description}</p>
                  </div>
                  ` : ''}
                </div>
                
                <div style="text-align: center; margin-top: 24px;">
                  <a href="https://qqgtvhtaoxrdnxarnvcw.lovableproject.com/dashboard" 
                     style="display: inline-block; background: linear-gradient(135deg, #0066cc 0%, #004d99 100%); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                    Visualizza nel Dashboard
                  </a>
                </div>
                
                <p style="font-size: 14px; color: #666; margin-top: 24px; text-align: center;">
                  Accedi al tuo account per visualizzare i dettagli completi e contattare il cliente.
                </p>
              </div>
              
              <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
                <p>Questa email è stata inviata da IdraulicoVicino</p>
                <p>© ${new Date().getFullYear()} IdraulicoVicino. Tutti i diritti riservati.</p>
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
