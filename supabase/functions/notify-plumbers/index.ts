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

    // Send notification to owner using centralized notify-owner function
    try {
      const ownerNotifyResponse = await fetch(`${supabaseUrl}/functions/v1/notify-owner`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseServiceKey}`,
        },
        body: JSON.stringify({
          notification_type: 'new_request',
          request_id: request_id
        }),
      });
      
      if (ownerNotifyResponse.ok) {
        console.log("Owner notified of new request via notify-owner function");
      } else {
        console.error("Failed to notify owner:", ownerNotifyResponse.status);
      }
    } catch (ownerError) {
      console.error("Error calling notify-owner:", ownerError);
    }

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
                        <td style="background:linear-gradient(135deg,#0284c7 0%,#075985 100%);padding:30px;text-align:center;border-radius:12px 12px 0 0;">
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
                          <div style="background-color:#e0f2fe;border-left:4px solid #0284c7;padding:20px;margin:20px 0;border-radius:0 8px 8px 0;">
                            <h3 style="margin:0 0 15px 0;color:#0284c7;font-size:16px;">📋 Riepilogo richiesta</h3>
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
                            Se hai domande, rispondi a questa email o contattaci a <a href="mailto:supporto@idraulicisubito.com" style="color:#0284c7;">supporto@idraulicisubito.com</a>
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
    // With credit-based system: notify ALL plumbers in the area (they can unlock with trial or credits)
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
        ),
        plumber_credits (
          balance
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
    // 2. Are available
    // 3. Have trial requests remaining OR have credits (can potentially unlock)
    // With credit-based system: all registered plumbers can see requests and buy credits
    const matchingPlumbers = (plumbersWithSubs || []).filter((plumber) => {
      // Check if the city is in their service areas
      const serviceAreas = plumber.service_areas || [];
      const requestCity = serviceRequest.city.toLowerCase().trim();
      
      // Extract city name and province code
      // e.g. "Portici (NA)" -> cityName="portici", provinceCode="NA"
      const requestCityName = requestCity.replace(/\s*\([^)]*\)\s*$/, '').trim();
      const requestProvinceMatch = serviceRequest.city.match(/\(([A-Z]{2})\)$/);
      const requestProvinceCode = requestProvinceMatch ? requestProvinceMatch[1] : null;
      
      const cityMatches = serviceAreas.some((area: string) => {
        const areaLower = (area || '').toLowerCase().trim();
        const areaCityName = areaLower.replace(/\s*\([^)]*\)\s*$/, '').trim();
        
        // Extract province code from area (e.g., "Napoli (NA)" -> "NA")
        const areaProvinceMatch = (area || '').match(/\(([A-Z]{2})\)$/);
        const areaProvinceCode = areaProvinceMatch ? areaProvinceMatch[1] : null;
        
        // Match if:
        // 1. Exact city match
        // 2. City names match
        // 3. Area contains city or vice versa
        // 4. NEW: Province codes match (e.g., NA = NA means Napoli plumber sees Portici requests)
        return areaLower === requestCity || 
               areaCityName === requestCityName ||
               areaLower.includes(requestCityName) || 
               requestCity.includes(areaCityName) ||
               (requestProvinceCode && areaProvinceCode && requestProvinceCode === areaProvinceCode);
      });

      console.log(`Plumber ${plumber.email}: service_areas=${JSON.stringify(serviceAreas)}, requestCity=${requestCity}, requestProvince=${requestProvinceCode}, cityMatches=${cityMatches}`);

      if (!cityMatches) return false;

      // Check subscription status - plumber_subscriptions can be array or object
      const subsData = plumber.plumber_subscriptions;
      let sub: any = null;
      
      if (Array.isArray(subsData)) {
        sub = subsData.length > 0 ? subsData[0] : null;
      } else if (subsData && typeof subsData === 'object') {
        sub = subsData;
      }
      
      // Check credits - plumber_credits can be array or object
      const creditsData = (plumber as any).plumber_credits;
      let creditBalance = 0;
      
      if (Array.isArray(creditsData) && creditsData.length > 0) {
        creditBalance = creditsData[0]?.balance ?? 0;
      } else if (creditsData && typeof creditsData === 'object') {
        creditBalance = creditsData.balance ?? 0;
      }
      
      console.log(`Plumber ${plumber.email}: subscription=${JSON.stringify(sub)}, creditBalance=${creditBalance}`);
      
      if (!sub) {
        console.log(`Plumber ${plumber.email}: no subscription found after parsing`);
        return false;
      }

      // Must be available
      if (sub.is_available === false) {
        console.log(`Plumber ${plumber.email}: not available`);
        return false;
      }

      // With credit-based system:
      // - Trial users with remaining free requests can unlock for free
      // - Users with credits can pay to unlock
      // - Users with neither can still see requests (might buy credits later)
      // Notify ALL available plumbers in the area
      const hasTrialRequestsLeft = sub.is_trial === true && (sub.free_requests_remaining ?? 0) > 0;
      const hasCredits = creditBalance > 0;
      const isRegistered = true; // All plumbers in DB are registered

      console.log(`Plumber ${plumber.email}: is_trial=${sub.is_trial}, free_remaining=${sub.free_requests_remaining}, hasTrialLeft=${hasTrialRequestsLeft}, hasCredits=${hasCredits}`);

      // Notify all registered plumbers in the area (they can always buy credits)
      return isRegistered;
    });

    console.log("Matching plumbers for city:", matchingPlumbers.length);

    // Initialize counters for registered plumbers (may be 0)
    let successCount = 0;
    let failedCount = 0;
    let results: any[] = [];
    let whatsappSuccessCount = 0;
    let whatsappFailedCount = 0;
    let whatsappResults: any[] = [];

    if (matchingPlumbers.length === 0) {
      console.log("No matching registered plumbers found for this request - continuing to unregistered");
    } else {
      // Send emails to matching plumbers with rate limiting (max 2/second for Resend)
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      
      for (let i = 0; i < matchingPlumbers.length; i++) {
        const plumber = matchingPlumbers[i];
        const interventionLabel = INTERVENTION_LABELS[serviceRequest.intervention_type] || serviceRequest.intervention_type;
        const urgencyLabel = URGENCY_LABELS[serviceRequest.urgency] || serviceRequest.urgency;

        try {
          // Add delay between emails to respect Resend rate limit (2 emails/second)
          if (i > 0) {
            await delay(600); // 600ms delay = ~1.6 emails/second (safe margin)
          }
          
          const emailResult = await resend.emails.send({
            from: "IdrauliciSubito <noreply@idraulicisubito.com>",
            reply_to: "supporto@idraulicisubito.com",
            to: [plumber.email],
            subject: `🔧 Nuova richiesta: ${interventionLabel} a ${serviceRequest.city}`,
            text: `Ciao ${plumber.full_name || plumber.business_name},\n\nNuova richiesta a ${serviceRequest.city}.\nIntervento: ${interventionLabel}\nUrgenza: ${urgencyLabel}\n\nAccetta subito: https://www.idraulicisubito.com/dashboard/richieste?id=${serviceRequest.id}\n\nChi accetta per primo ottiene i dati del cliente!`,
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
              <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;">
                  <tr>
                    <td align="center" style="padding:20px;">
                      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
                        
                        <!-- Header -->
                        <tr>
                          <td style="background:linear-gradient(135deg,#0284c7 0%,#075985 100%);padding:30px;text-align:center;border-radius:12px 12px 0 0;">
                            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:bold;">🔧 Nuova Richiesta di Intervento</h1>
                          </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                          <td style="background-color:#ffffff;padding:30px;">
                            <p style="margin:0 0 20px 0;font-size:16px;line-height:1.6;color:#333333;">
                              Ciao <strong>${plumber.full_name || plumber.business_name}</strong>,
                            </p>
                            
                            <p style="margin:0 0 20px 0;font-size:16px;line-height:1.6;color:#333333;">
                              Un nuovo cliente ha bisogno del tuo intervento a <strong>${serviceRequest.city}</strong>.
                            </p>
                            
                            <!-- Request Details -->
                            <div style="background-color:#e0f2fe;border-left:4px solid #0284c7;padding:20px;margin:20px 0;border-radius:0 8px 8px 0;">
                              <h3 style="margin:0 0 15px 0;color:#0284c7;font-size:16px;">📋 Dettagli richiesta</h3>
                              <p style="margin:0 0 8px 0;font-size:14px;color:#333;">
                                <strong>Tipo intervento:</strong> ${interventionLabel}
                              </p>
                              <p style="margin:0 0 8px 0;font-size:14px;color:#333;">
                                <strong>Urgenza:</strong> ${urgencyLabel}
                              </p>
                              <p style="margin:0 0 8px 0;font-size:14px;color:#333;">
                                <strong>Città:</strong> ${serviceRequest.city}
                              </p>
                              <p style="margin:0;font-size:14px;color:#333;">
                                <strong>Descrizione:</strong> ${serviceRequest.description}
                              </p>
                            </div>
                            
                            <!-- CTA Button -->
                            <div style="text-align:center;margin:30px 0;">
                              <a href="https://www.idraulicisubito.com/dashboard/richieste?id=${serviceRequest.id}" 
                                 style="display:inline-block;background:linear-gradient(135deg,#0284c7 0%,#075985 100%);color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:8px;font-size:16px;font-weight:bold;">
                                ⚡ Accetta Richiesta
                              </a>
                            </div>
                            
                            <p style="margin:20px 0 0 0;font-size:14px;color:#666666;text-align:center;">
                              <strong>Chi accetta per primo ottiene i dati del cliente!</strong>
                            </p>
                          </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                          <td style="background-color:#f9fafb;padding:20px;text-align:center;border-radius:0 0 12px 12px;border-top:1px solid #e5e7eb;">
                            <p style="margin:0 0 10px 0;font-size:12px;color:#9ca3af;">
                              Se non vuoi più ricevere notifiche, rispondi a questa email con "STOP".
                            </p>
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

          console.log(`Email sent to ${plumber.email}:`, emailResult);
          results.push({ success: true, plumber_id: plumber.id, email: plumber.email });
          successCount++;
        } catch (emailError) {
          console.error(`Failed to send email to ${plumber.email}:`, emailError);
          results.push({ success: false, plumber_id: plumber.id, email: plumber.email, error: emailError });
          failedCount++;
        }
      }

      console.log(`Emails sent: ${successCount} success, ${failedCount} failed`);

      // Send WhatsApp notifications to ALL matching plumbers (not just trial)
      // With credit-based system, all plumbers should receive WhatsApp notifications
      console.log(`Found ${matchingPlumbers.length} plumbers for WhatsApp notification`);

      // Send WhatsApp to each plumber
      const whatsappPromises = matchingPlumbers.map(async (plumber) => {
        try {
          const whatsappResponse = await fetch(`${supabaseUrl}/functions/v1/send-whatsapp-notification`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${supabaseServiceKey}`,
            },
            body: JSON.stringify({
              request_id: serviceRequest.id,
              plumber_id: plumber.id,
            }),
          });

          const whatsappResult = await whatsappResponse.json();
          console.log(`WhatsApp sent to ${plumber.full_name}:`, whatsappResult);
          return { success: whatsappResult.success, plumber_id: plumber.id, name: plumber.full_name };
        } catch (whatsappError) {
          console.error(`Failed to send WhatsApp to ${plumber.full_name}:`, whatsappError);
          return { success: false, plumber_id: plumber.id, name: plumber.full_name, error: whatsappError };
        }
      });

      whatsappResults = await Promise.all(whatsappPromises);
      whatsappSuccessCount = whatsappResults.filter((r) => r.success).length;
      whatsappFailedCount = whatsappResults.filter((r) => !r.success).length;

      console.log(`WhatsApp sent to registered plumbers: ${whatsappSuccessCount} success, ${whatsappFailedCount} failed`);
    }

    // ====== SEND WHATSAPP TO UNREGISTERED PLUMBERS ======
    // Fetch unregistered plumbers that match the request city or province
    const requestCityLower = serviceRequest.city.toLowerCase().trim();
    const requestCityName = requestCityLower.replace(/\s*\([^)]*\)\s*$/, '').trim();
    const requestProvinceMatch = serviceRequest.city.match(/\(([A-Z]{2})\)$/);
    const requestProvinceCode = requestProvinceMatch ? requestProvinceMatch[1] : null;
    
    const { data: unregisteredPlumbers, error: unregError } = await supabase
      .from("unregistered_plumbers")
      .select("*")
      .eq("is_active", true);

    if (unregError) {
      console.error("Error fetching unregistered plumbers:", unregError);
    }

    // Filter by city OR province (case-insensitive, flexible matching)
    const matchingUnregistered = (unregisteredPlumbers || []).filter((p) => {
      const pCityLower = (p.city || '').toLowerCase().trim();
      const pCityName = pCityLower.replace(/\s*\([^)]*\)\s*$/, '').trim();
      
      // Extract province code from unregistered plumber's city
      const pProvinceMatch = (p.city || '').match(/\(([A-Z]{2})\)$/);
      const pProvinceCode = pProvinceMatch ? pProvinceMatch[1] : null;
      
      // Match by city name OR by province code
      return pCityLower === requestCityLower || 
             pCityName === requestCityName ||
             pCityLower.includes(requestCityName) || 
             requestCityLower.includes(pCityName) ||
             (requestProvinceCode && pProvinceCode && requestProvinceCode === pProvinceCode);
    });

    console.log(`Found ${matchingUnregistered.length} unregistered plumbers matching city/province ${serviceRequest.city}`);

    // Send WhatsApp to unregistered plumbers with FULL client contact info
    const respondIoApiKey = Deno.env.get("RESPOND_IO_API_KEY");
    const respondIoChannelId = Deno.env.get("RESPOND_IO_CHANNEL_ID");
    
    const unregWhatsappPromises = matchingUnregistered.map(async (unreg) => {
      try {
        // Format phone number for Italian numbers
        // Remove spaces, leading zeros, and +
        let cleanPhone = unreg.phone.replace(/\s+/g, '').replace(/^0+/, '').replace(/^\+/, '');
        
        // If it's a 10-digit Italian number (3xxxxxxxxx), add 39 prefix
        // Italian mobile numbers start with 3 and are 10 digits
        if (cleanPhone.length === 10 && cleanPhone.startsWith('3')) {
          cleanPhone = '39' + cleanPhone;
        }
        // If already starts with 39 and is 12 digits, it's already formatted
        // Otherwise add 39 prefix
        else if (!cleanPhone.startsWith('39')) {
          cleanPhone = '39' + cleanPhone;
        }

        console.log(`Sending WhatsApp to unregistered plumber ${unreg.full_name}: ${cleanPhone}`);

        // Find or create contact in respond.io
        const contactResponse = await fetch(`https://api.respond.io/v2/contact/phone:${cleanPhone}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${respondIoApiKey}`,
            'Content-Type': 'application/json',
          },
        });

        let contactId: string;

        if (contactResponse.ok) {
          const contactData = await contactResponse.json();
          contactId = contactData.id;
          console.log(`Found existing contact: ${contactId}`);
        } else {
          // Create new contact with proper phone format (+39...)
          const phoneWithPlus = '+' + cleanPhone;
          console.log(`Creating new contact with phone: ${phoneWithPlus}`);
          
          const createContactResponse = await fetch(`https://api.respond.io/v2/contact`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${respondIoApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              phone: phoneWithPlus,
              firstName: unreg.full_name,
            }),
          });

          if (!createContactResponse.ok) {
            const errorText = await createContactResponse.text();
            console.error(`Failed to create contact for ${unreg.full_name}: ${errorText}`);
            return { success: false, name: unreg.full_name, error: errorText };
          }

          const newContact = await createContactResponse.json();
          contactId = newContact.id;
          console.log(`Created new contact: ${contactId}`);
        }

        // Prepare template params using the approved "richiestidraulco" template
        const interventionLabel = INTERVENTION_LABELS[serviceRequest.intervention_type] || serviceRequest.intervention_type;
        const urgencyLabel = URGENCY_LABELS[serviceRequest.urgency] || serviceRequest.urgency;
        
        // Use the approved template "richiestidraulco" with variables:
        // {{1}} = Name, {{2}} = City, {{3}} = Type, {{4}} = Urgency
        const templatePayload = {
          channelId: parseInt(respondIoChannelId || '0'),
          message: {
            type: 'whatsapp_template',
            template: {
              name: 'richiestidraulco',
              languageCode: 'it',
              components: [
                {
                  type: 'body',
                  parameters: [
                    { type: 'text', text: unreg.full_name },
                    { type: 'text', text: serviceRequest.city },
                    { type: 'text', text: interventionLabel },
                    { type: 'text', text: urgencyLabel },
                  ],
                },
              ],
            },
          },
        };

        console.log(`Sending template to unregistered ${unreg.full_name}:`, JSON.stringify(templatePayload, null, 2));

        const messageResponse = await fetch(`https://api.respond.io/v2/contact/id:${contactId}/message`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${respondIoApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(templatePayload),
        });

        if (!messageResponse.ok) {
          const errorText = await messageResponse.text();
          console.error(`Failed to send message to ${unreg.full_name}: ${errorText}`);
          
          // Log the failed WhatsApp notification
          await supabase.from("whatsapp_logs").insert({
            recipient_phone: '+' + cleanPhone,
            recipient_name: unreg.full_name,
            message_type: "unregistered_lead",
            request_id: serviceRequest.id,
            plumber_id: null,
            status: "failed",
            error_message: `Failed to send template: ${errorText}`,
          });
          
          return { success: false, name: unreg.full_name, error: errorText };
        }

        const messageData = await messageResponse.json();
        console.log(`WhatsApp sent to unregistered ${unreg.full_name}:`, messageData);

        // Log the WhatsApp notification
        await supabase.from("whatsapp_logs").insert({
          recipient_phone: unreg.phone,
          recipient_name: unreg.full_name,
          message_type: "unregistered_lead",
          request_id: serviceRequest.id,
          plumber_id: null,
          status: "sent",
          respond_io_message_id: messageData.id || messageData.messageId || null,
        });

        return { success: true, name: unreg.full_name, messageId: messageData.id };
      } catch (err) {
        console.error(`Error sending WhatsApp to ${unreg.full_name}:`, err);
        return { success: false, name: unreg.full_name, error: err instanceof Error ? err.message : 'Unknown error' };
      }
    });

    const unregWhatsappResults = await Promise.all(unregWhatsappPromises);
    const unregSuccessCount = unregWhatsappResults.filter((r) => r.success).length;
    const unregFailedCount = unregWhatsappResults.filter((r) => !r.success).length;

    console.log(`WhatsApp sent to unregistered plumbers: ${unregSuccessCount} success, ${unregFailedCount} failed`);

    return new Response(
      JSON.stringify({
        request_id,
        message: "Notifications sent",
        email_notified: successCount,
        email_failed: failedCount,
        whatsapp_registered_notified: whatsappSuccessCount,
        whatsapp_registered_failed: whatsappFailedCount,
        whatsapp_unregistered_notified: unregSuccessCount,
        whatsapp_unregistered_failed: unregFailedCount,
        email_details: results,
        whatsapp_registered_details: whatsappResults,
        whatsapp_unregistered_details: unregWhatsappResults,
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
