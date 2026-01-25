import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const respondIoApiKey = Deno.env.get("RESPOND_IO_API_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-RESPONDIO-CONTACT] ${step}${detailsStr}`);
};

interface CreateContactRequest {
  phone: string;
  full_name: string;
  email?: string;
}

function formatPhoneNumber(phone: string): string {
  // Remove all whitespace and special characters except +
  let formatted = phone.replace(/[\s\-\(\)]/g, '');
  
  // Remove leading zeros
  formatted = formatted.replace(/^0+/, '');
  
  // If it doesn't start with + or 39, add +39 prefix
  if (!formatted.startsWith('+') && !formatted.startsWith('39')) {
    formatted = '+39' + formatted;
  } else if (formatted.startsWith('39') && !formatted.startsWith('+')) {
    formatted = '+' + formatted;
  }
  
  // Ensure it starts with +
  if (!formatted.startsWith('+')) {
    formatted = '+' + formatted;
  }
  
  return formatted;
}

async function createOrGetContact(
  phone: string, 
  fullName: string,
  email?: string
): Promise<{ success: boolean; contactId?: string; error?: string; alreadyExists?: boolean }> {
  const formattedPhone = formatPhoneNumber(phone);
  
  logStep("Checking if contact exists", { phone: formattedPhone });
  
  // First, try to find existing contact
  // For GET request, use phone without + for identifier
  const phoneForIdentifier = formattedPhone.replace(/^\+/, '');
  const findResponse = await fetch(`https://api.respond.io/v2/contact/phone:${phoneForIdentifier}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${respondIoApiKey}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (findResponse.ok) {
    const contactData = await findResponse.json();
    logStep("Contact already exists", { contactId: contactData.id, name: fullName });
    return { success: true, contactId: contactData.id, alreadyExists: true };
  }
  
  // Contact doesn't exist, create it
  logStep("Creating new contact", { phone: formattedPhone, name: fullName });
  
  const createPayload: Record<string, unknown> = {
    phone: formattedPhone,
    firstName: fullName.split(' ')[0],
    lastName: fullName.split(' ').slice(1).join(' ') || undefined,
  };
  
  if (email) {
    createPayload.email = email;
  }
  
  const createResponse = await fetch(`https://api.respond.io/v2/contact`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${respondIoApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createPayload),
  });
  
  if (!createResponse.ok) {
    const errorText = await createResponse.text();
    logStep("ERROR creating contact", { error: errorText });
    return { success: false, error: `Failed to create contact: ${errorText}` };
  }
  
  const newContact = await createResponse.json();
  logStep("Contact created successfully", { contactId: newContact.id });
  
  return { success: true, contactId: newContact.id, alreadyExists: false };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");
    
    const { phone, full_name, email }: CreateContactRequest = await req.json();
    
    if (!phone || !full_name) {
      return new Response(
        JSON.stringify({ success: false, error: "phone and full_name are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    logStep("Processing request", { phone, full_name, email });
    
    const result = await createOrGetContact(phone, full_name, email);
    
    if (!result.success) {
      return new Response(
        JSON.stringify({ success: false, error: result.error }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        contactId: result.contactId,
        alreadyExists: result.alreadyExists,
        message: result.alreadyExists 
          ? `Contact already exists with ID: ${result.contactId}` 
          : `Contact created with ID: ${result.contactId}`
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logStep("ERROR", { message: errorMessage });
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});