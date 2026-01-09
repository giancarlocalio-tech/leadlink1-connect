import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AcceptRequestPayload {
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
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

    // Get the user's JWT from the request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization header required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create client with user's auth to get their info
    const supabaseUser = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Get the current user
    const { data: { user }, error: userError } = await supabaseUser.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authentication' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get the plumber profile for this user
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    
    const { data: plumberProfile, error: profileError } = await supabaseAdmin
      .from('plumber_profiles')
      .select('id, full_name, business_name, phone')
      .eq('user_id', user.id)
      .single();

    if (profileError || !plumberProfile) {
      return new Response(
        JSON.stringify({ error: 'Plumber profile not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { request_id } = await req.json() as AcceptRequestPayload;

    if (!request_id) {
      return new Response(
        JSON.stringify({ error: 'request_id is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[accept-request] User ${user.id} (plumber ${plumberProfile.id}) accepting request ${request_id}`);

    // Verify this plumber is the current assignee
    const { data: request, error: requestError } = await supabaseAdmin
      .from('service_requests')
      .select('assigned_plumber_id, status')
      .eq('id', request_id)
      .single();

    if (requestError || !request) {
      console.error('[accept-request] Request fetch error:', requestError);
      return new Response(
        JSON.stringify({ error: 'Request not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (request.status !== 'assigned') {
      return new Response(
        JSON.stringify({ error: 'Request is not in assigned status' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (request.assigned_plumber_id !== plumberProfile.id) {
      return new Response(
        JSON.stringify({ error: 'You are not the current assignee for this request' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Accept the request
    const { data: acceptResult, error: acceptError } = await supabaseAdmin
      .rpc('accept_request', {
        p_request_id: request_id,
        p_plumber_id: plumberProfile.id
      });

    if (acceptError) {
      console.error('[accept-request] Error accepting request:', acceptError);
      return new Response(
        JSON.stringify({ error: 'Failed to accept request' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!acceptResult) {
      return new Response(
        JSON.stringify({ error: 'Accept operation failed' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[accept-request] Request ${request_id} accepted by plumber ${plumberProfile.id}`);

    // Get the full request details to return
    const { data: acceptedRequest } = await supabaseAdmin
      .from('service_requests')
      .select('*')
      .eq('id', request_id)
      .single();

    // Send confirmation email to client if email is provided
    if (acceptedRequest?.client_email) {
      try {
        await fetch(`${supabaseUrl}/functions/v1/send-client-confirmation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseServiceKey}`,
          },
          body: JSON.stringify({
            client_email: acceptedRequest.client_email,
            client_name: acceptedRequest.client_name,
            plumber_name: plumberProfile.full_name,
            plumber_phone: plumberProfile.phone,
            plumber_business: plumberProfile.business_name,
            intervention_type: acceptedRequest.intervention_type,
            city: acceptedRequest.city,
          }),
        });
        console.log(`[accept-request] Confirmation email sent to client ${acceptedRequest.client_email}`);
      } catch (emailError) {
        console.error('[accept-request] Error sending client confirmation email:', emailError);
        // Don't fail the request if email fails
      }
    }

    // NOTIFY OWNER that request was accepted
    try {
      const ownerNotifyResponse = await fetch(`${supabaseUrl}/functions/v1/notify-owner`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseServiceKey}`,
        },
        body: JSON.stringify({
          notification_type: 'request_accepted',
          request_id: request_id,
          plumber_id: plumberProfile.id
        }),
      });
      
      if (ownerNotifyResponse.ok) {
        console.log(`[accept-request] Owner notified of acceptance`);
      } else {
        console.error(`[accept-request] Failed to notify owner: ${ownerNotifyResponse.status}`);
      }
    } catch (ownerError) {
      console.error('[accept-request] Error notifying owner:', ownerError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Richiesta accettata con successo!',
        request: acceptedRequest
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('[accept-request] Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
