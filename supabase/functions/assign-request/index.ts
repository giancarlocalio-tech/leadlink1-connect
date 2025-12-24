import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AssignRequestPayload {
  request_id: string;
}

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
      .select('*')
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

    // Skip if already assigned or accepted
    if (request.status === 'assigned' || request.status === 'accepted') {
      console.log(`[assign-request] Request already processed, status: ${request.status}`);
      return new Response(
        JSON.stringify({ success: true, message: 'Request already processed' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const urgency = request.urgency;
    const city = request.city;

    // Determine starting plan based on urgency
    // SUBITO: Premium only first, then Medium (skip Basic)
    // ENTRO_24_ORE: Premium -> Medium -> Basic
    // PROSSIMI_GIORNI: Premium -> Medium -> Basic
    let planPriority: string[] = [];
    
    if (urgency === 'subito') {
      planPriority = ['premium', 'medium']; // Basic excluded for SUBITO
    } else {
      planPriority = ['premium', 'medium', 'basic'];
    }

    console.log(`[assign-request] Urgency: ${urgency}, City: ${city}, Plan priority: ${planPriority.join(' -> ')}`);

    let assignedPlumber = null;

    // Try to find an eligible plumber starting from highest tier
    for (const plan of planPriority) {
      console.log(`[assign-request] Trying plan: ${plan}`);
      
      const { data: plumberId } = await supabase
        .rpc('get_next_eligible_plumber', {
          p_request_id: request_id,
          p_city: city,
          p_urgency: urgency,
          p_target_plan: plan
        });

      if (plumberId) {
        console.log(`[assign-request] Found eligible plumber: ${plumberId} (${plan})`);
        assignedPlumber = { id: plumberId, plan };
        break;
      }
    }

    if (!assignedPlumber) {
      console.log('[assign-request] No eligible plumbers found, marking as expired');
      
      await supabase
        .from('service_requests')
        .update({ status: 'expired' })
        .eq('id', request_id);

      return new Response(
        JSON.stringify({ success: false, message: 'No eligible plumbers found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Assign the request to the plumber
    const { data: assignResult } = await supabase
      .rpc('assign_request_to_plumber', {
        p_request_id: request_id,
        p_plumber_id: assignedPlumber.id
      });

    console.log(`[assign-request] Assignment result: ${assignResult}`);

    // Get plumber details for notification
    const { data: plumber } = await supabase
      .from('plumber_profiles')
      .select('email, full_name, business_name')
      .eq('id', assignedPlumber.id)
      .single();

    if (plumber) {
      // TODO: Send email notification to plumber
      console.log(`[assign-request] Would notify: ${plumber.email}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        assigned_to: assignedPlumber.id,
        plan: assignedPlumber.plan
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
