import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const payload = await req.json();
    console.log('Respond.io webhook received:', JSON.stringify(payload, null, 2));

    // Respond.io sends different event types
    // Common events: message.sent, message.delivered, message.read
    const eventType = payload.event || payload.type;
    const messageId = payload.message?.id || payload.messageId || payload.data?.messageId;
    
    if (!messageId) {
      console.log('No messageId found in webhook payload');
      return new Response(
        JSON.stringify({ success: true, message: 'No messageId to process' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing event: ${eventType} for messageId: ${messageId}`);

    // Update the whatsapp_logs based on event type
    if (eventType === 'message.delivered' || eventType === 'delivered') {
      const { error } = await supabase
        .from('whatsapp_logs')
        .update({ 
          delivered_at: new Date().toISOString(),
          status: 'delivered'
        })
        .eq('respond_io_message_id', String(messageId));

      if (error) {
        console.error('Error updating delivered status:', error);
      } else {
        console.log(`Message ${messageId} marked as delivered`);
      }
    } else if (eventType === 'message.read' || eventType === 'read') {
      const { error } = await supabase
        .from('whatsapp_logs')
        .update({ 
          read_at: new Date().toISOString(),
          status: 'read'
        })
        .eq('respond_io_message_id', String(messageId));

      if (error) {
        console.error('Error updating read status:', error);
      } else {
        console.log(`Message ${messageId} marked as read`);
      }
    } else if (eventType === 'message.failed' || eventType === 'failed') {
      const errorMessage = payload.error?.message || payload.data?.error || 'Unknown error';
      const { error } = await supabase
        .from('whatsapp_logs')
        .update({ 
          status: 'failed',
          error_message: errorMessage
        })
        .eq('respond_io_message_id', String(messageId));

      if (error) {
        console.error('Error updating failed status:', error);
      } else {
        console.log(`Message ${messageId} marked as failed: ${errorMessage}`);
      }
    }

    return new Response(
      JSON.stringify({ success: true, event: eventType, messageId }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
