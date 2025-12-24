import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('[check-expired] Starting check for expired assignments');

    // Find all expired assignments
    const { data: expiredRequests, error: fetchError } = await supabase
      .from('service_requests')
      .select('id, assigned_plumber_id, urgency, city, assignment_expires_at')
      .eq('status', 'assigned')
      .lt('assignment_expires_at', new Date().toISOString());

    if (fetchError) {
      console.error('[check-expired] Error fetching expired requests:', fetchError);
      throw fetchError;
    }

    if (!expiredRequests || expiredRequests.length === 0) {
      console.log('[check-expired] No expired assignments found');
      return new Response(
        JSON.stringify({ processed: 0, results: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[check-expired] Found ${expiredRequests.length} expired assignments`);

    const results = [];

    // Process each expired request
    for (const request of expiredRequests) {
      console.log(`[check-expired] Processing request: ${request.id}`);
      
      try {
        // Call the handle_expired_assignment function
        const { data: result, error: handleError } = await supabase
          .rpc('handle_expired_assignment', {
            p_request_id: request.id
          });

        if (handleError) {
          console.error(`[check-expired] Error handling request ${request.id}:`, handleError);
          results.push({ request_id: request.id, status: 'error', error: handleError.message });
        } else {
          console.log(`[check-expired] Request ${request.id} result: ${result}`);
          results.push({ request_id: request.id, status: result });

          // If reassigned, try to notify the new plumber
          if (result === 'reassigned') {
            const { data: updatedRequest } = await supabase
              .from('service_requests')
              .select('assigned_plumber_id')
              .eq('id', request.id)
              .single();

            if (updatedRequest?.assigned_plumber_id) {
              const { data: plumber } = await supabase
                .from('plumber_profiles')
                .select('email, full_name')
                .eq('id', updatedRequest.assigned_plumber_id)
                .single();

              if (plumber) {
                // TODO: Send email notification
                console.log(`[check-expired] Would notify new plumber: ${plumber.email}`);
              }
            }
          }
        }
      } catch (err: unknown) {
        console.error(`[check-expired] Exception for request ${request.id}:`, err);
        const message = err instanceof Error ? err.message : 'Unknown error';
        results.push({ request_id: request.id, status: 'exception', error: message });
      }
    }

    console.log(`[check-expired] Completed processing ${results.length} requests`);

    return new Response(
      JSON.stringify({ processed: results.length, results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('[check-expired] Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
