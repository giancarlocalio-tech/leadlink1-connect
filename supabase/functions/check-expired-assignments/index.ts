import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * check-expired-assignments (repurposed)
 * 
 * Now handles expiring old service requests after 3 days.
 * Called periodically by external cron (e.g., cron-job.org).
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

    console.log('[check-expired-assignments] Starting expiration check...');

    // Call the expire_old_requests function
    const { data, error } = await supabase.rpc('expire_old_requests');

    if (error) {
      console.error('[check-expired-assignments] Error calling expire_old_requests:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const expiredCount = data ?? 0;
    console.log(`[check-expired-assignments] Expired ${expiredCount} requests older than 3 days`);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: `Expired ${expiredCount} old requests`,
        expired_count: expiredCount
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('[check-expired-assignments] Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
