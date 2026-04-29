import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const respondIoApiKey = Deno.env.get("RESPOND_IO_API_KEY")!;
const respondIoChannelId = Deno.env.get("RESPOND_IO_CHANNEL_ID")!;
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const INTERVENTION_LABELS: Record<string, string> = {
  perdita_acqua: "Perdita acqua",
  rubinetto_rotto: "Rubinetto rotto",
  scarico_intasato: "Scarico intasato",
  caldaia: "Caldaia",
  riparazione: "Riparazione",
  installazione_sostituzione: "Installazione/Sostituzione",
  sturare_spurgo: "Sturare/Spurgo",
  impianto_idraulico: "Impianto idraulico",
  box_doccia: "Box doccia",
  impianto_riscaldamento: "Impianto riscaldamento",
  altro: "Altro",
};

const URGENCY_LABELS: Record<string, string> = {
  subito: "Subito",
  entro_24_ore: "Entro 24 ore",
  prossimi_giorni: "Prossimi giorni",
};

interface SendMessageRequest {
  request_id: string;
  plumber_id: string;
}

interface TemplateParams {
  name: string;
  city: string;
  interventionType: string;
  urgency: string;
}

async function sendWhatsAppTemplate(
  phone: string, 
  templateParams: TemplateParams
): Promise<{ success: boolean; error?: string; messageId?: string }> {
  try {
    // Format phone number - ensure E.164 format WITH + prefix
    let formattedPhone = phone.replace(/[\s\-\(\)]/g, '').replace(/^0+/, '');
    
    // If it doesn't start with + or 39, add +39 prefix
    if (!formattedPhone.startsWith('+') && !formattedPhone.startsWith('39')) {
      formattedPhone = '+39' + formattedPhone;
    } else if (formattedPhone.startsWith('39') && !formattedPhone.startsWith('+')) {
      formattedPhone = '+' + formattedPhone;
    }
    
    // Ensure it starts with +
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = '+' + formattedPhone;
    }
    
    console.log(`Sending WhatsApp template to: ${formattedPhone}`);
    console.log(`Template params:`, templateParams);
    
    // Send template message via channel
    const templatePayload = {
      channelId: parseInt(respondIoChannelId),
      message: {
        type: 'whatsapp_template',
        template: {
          name: 'richiestidraulco',
          languageCode: 'it',
          components: [
            {
              type: 'body',
              parameters: [
                { type: 'text', text: templateParams.name },
                { type: 'text', text: templateParams.city },
                { type: 'text', text: templateParams.interventionType },
                { type: 'text', text: templateParams.urgency },
              ],
            },
          ],
        },
      },
    };

    console.log(`Sending template payload:`, JSON.stringify(templatePayload, null, 2));

    const contactIdentifier = `phone:${encodeURIComponent(formattedPhone)}`;
    const messageResponse = await fetch(`https://api.respond.io/v2/contact/${contactIdentifier}/message`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${respondIoApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(templatePayload),
    });
    
    if (!messageResponse.ok) {
      const errorText = await messageResponse.text();
      console.error(`Failed to send template message: ${errorText}`);
      return { success: false, error: `Failed to send template: ${errorText}` };
    }
    
    const messageData = await messageResponse.json();
    console.log(`Template message sent successfully:`, messageData);
    
    return { success: true, messageId: messageData.id || messageData.messageId };
  } catch (error) {
    console.error(`Error sending WhatsApp template:`, error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { request_id, plumber_id }: SendMessageRequest = await req.json();
    
    if (!request_id || !plumber_id) {
      return new Response(
        JSON.stringify({ error: "request_id and plumber_id are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get request details
    const { data: request, error: requestError } = await supabase
      .from("service_requests")
      .select("*")
      .eq("id", request_id)
      .single();

    if (requestError || !request) {
      console.error("Request not found:", requestError);
      return new Response(
        JSON.stringify({ error: "Request not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get plumber details
    const { data: plumber, error: plumberError } = await supabase
      .from("plumber_profiles")
      .select("*")
      .eq("id", plumber_id)
      .single();

    if (plumberError || !plumber) {
      console.error("Plumber not found:", plumberError);
      return new Response(
        JSON.stringify({ error: "Plumber not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!plumber.phone) {
      return new Response(
        JSON.stringify({ error: "Plumber has no phone number" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const interventionLabel = INTERVENTION_LABELS[request.intervention_type] || request.intervention_type;
    const urgencyLabel = URGENCY_LABELS[request.urgency] || request.urgency;

    // Send WhatsApp template message
    const result = await sendWhatsAppTemplate(plumber.phone, {
      name: plumber.full_name,
      city: request.city,
      interventionType: interventionLabel,
      urgency: urgencyLabel,
    });

    // Log the WhatsApp notification
    await supabase.from("whatsapp_logs").insert({
      recipient_phone: plumber.phone,
      recipient_name: plumber.full_name,
      message_type: "assignment",
      request_id: request_id,
      plumber_id: plumber_id,
      status: result.success ? "sent" : "failed",
      error_message: result.error || null,
      respond_io_message_id: result.messageId || null,
    }).then(({ error }) => {
      if (error) {
        console.error("Failed to log WhatsApp message:", error);
      }
    });

    if (!result.success) {
      return new Response(
        JSON.stringify({ success: false, error: result.error }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, messageId: result.messageId }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
