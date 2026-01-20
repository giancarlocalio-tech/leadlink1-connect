import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AssignRequestPayload {
  request_id: string;
}

/**
 * SIMPLIFIED assign-request function
 * 
 * With the credit-based system, there are no more subscription tiers.
 * All requests are visible to all plumbers in the service area.
 * Plumbers can unlock contacts using:
 * - Free trial requests (first 3)
 * - Credits (after trial)
 * 
 * This function now just validates the request exists and is ready for plumbers.
 * No automatic assignment happens - plumbers manually claim/unlock requests.
 */
serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { request_id } = await req.json() as AssignRequestPayload;

    if (!request_id) {
      return new Response(
        JSON.stringify({ error: 'request_id is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[assign-request] Processing request: ${request_id}`);

    // Get request details
    const { data: request, error: requestError } = await supabase
      .from('service_requests')
      .select('id, status, city, urgency')
      .eq('id', request_id)
      .single();

    if (requestError || !request) {
      console.error('[assign-request] Request not found:', requestError);
      return new Response(
        JSON.stringify({ error: 'Request not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[assign-request] Request status: ${request.status}, city: ${request.city}, urgency: ${request.urgency}`);

    // Skip if already accepted
    if (request.status === 'accepted') {
      console.log(`[assign-request] Request already accepted`);
      return new Response(
        JSON.stringify({ success: true, message: 'Request already accepted' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // With the new credit-based system, we don't do automatic tier-based assignment
    // All requests stay as 'new' and are visible to all plumbers in the service area
    // Plumbers can unlock them using trial requests or credits
    
    // Ensure the request status is 'new' so plumbers can see it
    if (request.status !== 'new') {
      await supabase
        .from('service_requests')
        .update({ 
          status: 'new',
          assigned_plumber_id: null,
          assigned_at: null,
          current_assignee_plan: null,
          assignment_started_at: null,
          assignment_expires_at: null
        })
        .eq('id', request_id);
      
      console.log(`[assign-request] Reset request to 'new' status for credit-based unlocking`);
    }

    console.log('[assign-request] Request available for all plumbers to unlock with trial/credits');
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Request available for plumbers to unlock'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('[assign-request] Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
