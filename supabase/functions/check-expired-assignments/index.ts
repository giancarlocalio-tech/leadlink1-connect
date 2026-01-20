import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * DEPRECATED: check-expired-assignments
 * 
 * With the credit-based system, there are no more tier-based assignments with timers.
 * All requests are visible to all plumbers and can be unlocked with:
 * - Free trial requests (first 3)
 * - Credits (after trial)
 * 
 * This function is kept for backwards compatibility but does nothing.
 * It can be safely removed after confirming the system works correctly.
 */
serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  console.log('[check-expired-assignments] DEPRECATED - No action needed with credit-based system');

  return new Response(
    JSON.stringify({ 
      message: 'This function is deprecated. Credit-based system does not use timed assignments.',
      processed: 0, 
      results: [] 
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
});
