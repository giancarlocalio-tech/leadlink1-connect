import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-TEST-REQUEST] ${step}${detailsStr}`);
};

interface TestRequestPayload {
  city?: string;
  urgency?: 'subito' | 'entro_24_ore' | 'prossimi_giorni';
  intervention_type?: string;
  client_name?: string;
  client_phone?: string;
  client_email?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Missing Supabase configuration");
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Parse request body
    let payload: TestRequestPayload = {};
    try {
      payload = await req.json();
    } catch {
      // Use defaults if no body
    }

    const city = payload.city || "Siena";
    const urgency = payload.urgency || "entro_24_ore";
    const intervention_type = payload.intervention_type || "perdita_acqua";
    const client_name = payload.client_name || `Test Client ${Date.now()}`;
    const client_phone = payload.client_phone || "+39 333 1234567";
    const client_email = payload.client_email || `test-client-${Date.now()}@test.com`;

    logStep("Creating test service request", { city, urgency, intervention_type });

    // Create the service request
    const { data: requestData, error: requestError } = await supabase
      .from('service_requests')
      .insert({
        client_name,
        client_phone,
        client_email,
        city,
        intervention_type,
        urgency,
        property_type: 'casa',
        accessibility: 'facile',
        description: `[TEST] Richiesta di test automatica creata il ${new Date().toISOString()}`,
        privacy_accepted: true,
        status: 'new',
        is_exclusive: false
      })
      .select()
      .single();

    if (requestError) {
      logStep("ERROR creating request", { error: requestError.message });
      throw new Error(`Failed to create request: ${requestError.message}`);
    }

    logStep("Service request created", { requestId: requestData.id });

    // Call assign-request to assign to a plumber
    logStep("Calling assign-request function");
    
    const assignResponse = await fetch(`${supabaseUrl}/functions/v1/assign-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serviceRoleKey}`
      },
      body: JSON.stringify({ request_id: requestData.id })
    });

    const assignResult = await assignResponse.json();
    logStep("assign-request response", assignResult);

    // Fetch the updated request to see who it was assigned to
    const { data: updatedRequest, error: fetchError } = await supabase
      .from('service_requests')
      .select(`
        id,
        status,
        urgency,
        city,
        assigned_plumber_id,
        current_assignee_plan,
        assignment_expires_at,
        assignment_round
      `)
      .eq('id', requestData.id)
      .single();

    if (fetchError) {
      logStep("ERROR fetching updated request", { error: fetchError.message });
    }

    // Get plumber details if assigned
    let assignedPlumber = null;
    if (updatedRequest?.assigned_plumber_id) {
      const { data: plumber } = await supabase
        .from('plumber_profiles')
        .select('id, full_name, email, business_name')
        .eq('id', updatedRequest.assigned_plumber_id)
        .single();
      assignedPlumber = plumber;
    }

    // Get assignment logs for this request
    const { data: assignmentLogs } = await supabase
      .from('assignment_logs')
      .select('*')
      .eq('request_id', requestData.id)
      .order('assigned_at', { ascending: false });

    const result = {
      success: true,
      request: updatedRequest,
      assignedPlumber,
      assignmentLogs,
      assignResponse: assignResult
    };

    logStep("Test request completed", result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
