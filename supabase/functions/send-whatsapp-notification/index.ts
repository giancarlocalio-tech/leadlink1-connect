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

async function sendWhatsAppMessage(phone: string, message: string): Promise<{ success: boolean; error?: string; messageId?: string }> {
  try {
    // Format phone number - remove leading 0 and ensure country code
    let formattedPhone = phone.replace(/\s+/g, '').replace(/^0+/, '');
    
    // If it doesn't start with a country code, assume Italy (+39)
    if (!formattedPhone.startsWith('+') && !formattedPhone.startsWith('39')) {
      formattedPhone = '39' + formattedPhone;
    }
    
    // Remove + if present for API
    formattedPhone = formattedPhone.replace(/^\+/, '');
    
    console.log(`Sending WhatsApp message to: ${formattedPhone}`);
    
    // First, find or create contact
    const contactResponse = await fetch(`https://api.respond.io/v2/contact/phone:${formattedPhone}`, {
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
      // Create new contact
      const createContactResponse = await fetch(`https://api.respond.io/v2/contact`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${respondIoApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: formattedPhone,
        }),
      });
      
      if (!createContactResponse.ok) {
        const errorText = await createContactResponse.text();
        console.error(`Failed to create contact: ${errorText}`);
        return { success: false, error: `Failed to create contact: ${errorText}` };
      }
      
      const newContact = await createContactResponse.json();
      contactId = newContact.id;
      console.log(`Created new contact: ${contactId}`);
    }
    
    // Send message via channel
    const messageResponse = await fetch(`https://api.respond.io/v2/contact/id:${contactId}/message`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${respondIoApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channelId: parseInt(respondIoChannelId),
        message: {
          type: 'text',
          text: message,
        },
      }),
    });
    
    if (!messageResponse.ok) {
      const errorText = await messageResponse.text();
      console.error(`Failed to send message: ${errorText}`);
      return { success: false, error: `Failed to send message: ${errorText}` };
    }
    
    const messageData = await messageResponse.json();
    console.log(`Message sent successfully:`, messageData);
    
    return { success: true, messageId: messageData.id };
  } catch (error) {
    console.error(`Error sending WhatsApp message:`, error);
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

    // Build WhatsApp message
    const message = `🔧 *NUOVA RICHIESTA IDRAULICISUBITO*

Ciao ${plumber.full_name}!

Hai ricevuto una nuova richiesta nella tua zona.

📍 *Città:* ${request.city}
🔨 *Tipo:* ${interventionLabel}
⏰ *Urgenza:* ${urgencyLabel}
📝 *Descrizione:* ${request.description}

⚠️ Hai 24 ore per accettare.

👉 Accedi alla dashboard per accettare:
https://idraulicisubito.com/dashboard`;

    const result = await sendWhatsAppMessage(plumber.phone, message);

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
