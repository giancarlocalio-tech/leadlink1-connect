import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, svix-id, svix-timestamp, svix-signature",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[RESEND-WEBHOOK] ${step}${detailsStr}`);
};

// Resend webhook event types
interface ResendWebhookEvent {
  type: string;
  created_at: string;
  data: {
    email_id: string;
    from: string;
    to: string[];
    subject: string;
    created_at?: string;
    // For bounce events
    bounce?: {
      message: string;
    };
    // For click events
    click?: {
      link: string;
      timestamp: string;
      userAgent: string;
      ipAddress: string;
    };
  };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const resendWebhookSecret = Deno.env.get('RESEND_WEBHOOK_SECRET');

  try {
    logStep("Webhook received");

    // Get the raw body for signature verification
    const rawBody = await req.text();
    
    // Optional: Verify webhook signature if secret is configured
    // Resend uses Svix for webhook signing
    if (resendWebhookSecret) {
      const svixId = req.headers.get('svix-id');
      const svixTimestamp = req.headers.get('svix-timestamp');
      const svixSignature = req.headers.get('svix-signature');
      
      if (!svixId || !svixTimestamp || !svixSignature) {
        logStep("WARNING: Missing Svix headers, proceeding without verification");
      }
      // Note: Full signature verification would require the svix library
      // For now, we'll proceed but log the warning
    }

    const event: ResendWebhookEvent = JSON.parse(rawBody);
    logStep("Event parsed", { type: event.type, email_id: event.data.email_id });

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Map Resend event types to our status
    let newStatus: string | null = null;
    let updateData: Record<string, unknown> = {};

    switch (event.type) {
      case 'email.sent':
        newStatus = 'sent';
        break;
      
      case 'email.delivered':
        newStatus = 'delivered';
        updateData.delivered_at = event.created_at;
        break;
      
      case 'email.opened':
        newStatus = 'opened';
        updateData.opened_at = event.created_at;
        break;
      
      case 'email.clicked':
        newStatus = 'clicked';
        updateData.metadata = {
          last_click: {
            link: event.data.click?.link,
            timestamp: event.data.click?.timestamp,
            userAgent: event.data.click?.userAgent,
          }
        };
        break;
      
      case 'email.bounced':
        newStatus = 'bounced';
        updateData.error_message = event.data.bounce?.message || 'Email bounced';
        break;
      
      case 'email.complained':
        newStatus = 'complained';
        updateData.error_message = 'Recipient marked as spam';
        break;
      
      case 'email.delivery_delayed':
        newStatus = 'delayed';
        break;

      default:
        logStep("Unknown event type, ignoring", { type: event.type });
        return new Response(
          JSON.stringify({ received: true, ignored: true }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }

    // Update the email log if we found a matching email_id
    const { data: emailLog, error: findError } = await supabase
      .from('email_logs')
      .select('id, status, metadata')
      .eq('resend_email_id', event.data.email_id)
      .maybeSingle();

    if (findError) {
      logStep("Error finding email log", { error: findError.message });
    }

    if (emailLog) {
      // Merge existing metadata with new data
      const existingMetadata = (emailLog.metadata as Record<string, unknown>) || {};
      const newMetadata = (updateData.metadata as Record<string, unknown>) || {};
      const mergedMetadata = { ...existingMetadata, ...newMetadata };
      
      // Build update object
      const updateObj: Record<string, unknown> = {
        status: newStatus,
      };
      
      if (updateData.delivered_at) {
        updateObj.delivered_at = updateData.delivered_at;
      }
      if (updateData.opened_at) {
        updateObj.opened_at = updateData.opened_at;
      }
      if (updateData.error_message) {
        updateObj.error_message = updateData.error_message;
      }
      if (updateData.metadata) {
        updateObj.metadata = mergedMetadata;
      }

      const { error: updateError } = await supabase
        .from('email_logs')
        .update(updateObj)
        .eq('id', emailLog.id);

      if (updateError) {
        logStep("Error updating email log", { error: updateError.message });
      } else {
        logStep("Email log updated", { 
          email_id: event.data.email_id, 
          old_status: emailLog.status, 
          new_status: newStatus 
        });
      }

      // If email bounced, notify owner immediately
      if (newStatus === 'bounced' || newStatus === 'complained') {
        try {
          await notifyOwnerOfEmailIssue(supabaseUrl, supabaseServiceKey, event, emailLog.id);
        } catch (notifyError) {
          logStep("Failed to notify owner of email issue", { error: String(notifyError) });
        }
      }
    } else {
      // Email not found in our logs - might be from before we started logging
      logStep("Email not found in logs", { email_id: event.data.email_id });
      
      // Create a new log entry for tracking purposes
      const { error: insertError } = await supabase
        .from('email_logs')
        .insert({
          email_type: 'unknown',
          recipient_email: event.data.to?.[0] || 'unknown',
          subject: event.data.subject || 'Unknown',
          resend_email_id: event.data.email_id,
          status: newStatus,
          ...updateData,
          metadata: {
            source: 'webhook_retroactive',
            original_event: event.type,
            ...((updateData.metadata as object) || {})
          }
        });

      if (insertError) {
        logStep("Error creating retroactive email log", { error: insertError.message });
      } else {
        logStep("Created retroactive email log", { email_id: event.data.email_id, status: newStatus });
      }
    }

    return new Response(
      JSON.stringify({ 
        received: true, 
        event_type: event.type,
        email_id: event.data.email_id,
        status_updated: newStatus 
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    
    // Return 200 to prevent Resend from retrying (we've logged the error)
    return new Response(
      JSON.stringify({ error: errorMessage, received: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

async function notifyOwnerOfEmailIssue(
  supabaseUrl: string,
  supabaseServiceKey: string,
  event: ResendWebhookEvent,
  emailLogId: string
): Promise<void> {
  const ownerEmail = Deno.env.get("OWNER_NOTIFICATION_EMAIL");
  if (!ownerEmail) return;

  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  if (!resendApiKey) return;

  const { Resend } = await import("https://esm.sh/resend@4.0.0");
  const resend = new Resend(resendApiKey);

  const issuetype = event.type === 'email.bounced' ? '⚠️ EMAIL BOUNCE' : '🚨 SPAM COMPLAINT';
  const recipientEmail = event.data.to?.[0] || 'Unknown';

  await resend.emails.send({
    from: "IdrauliciSubito <noreply@idraulicisubito.com>",
    to: [ownerEmail],
    subject: `${issuetype}: ${recipientEmail}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; padding: 20px;">
            <h2 style="color: #856404; margin: 0 0 15px 0;">${issuetype}</h2>
            <p style="color: #856404; margin: 0 0 10px 0;">
              <strong>Destinatario:</strong> ${recipientEmail}
            </p>
            <p style="color: #856404; margin: 0 0 10px 0;">
              <strong>Oggetto email:</strong> ${event.data.subject}
            </p>
            ${event.data.bounce?.message ? `
            <p style="color: #856404; margin: 0 0 10px 0;">
              <strong>Motivo:</strong> ${event.data.bounce.message}
            </p>
            ` : ''}
            <p style="color: #856404; margin: 15px 0 0 0; font-size: 13px;">
              Questa email potrebbe non essere stata recapitata. Verifica l'indirizzo del destinatario.
            </p>
          </div>
        </body>
      </html>
    `,
  });

  logStep("Owner notified of email issue", { type: event.type, recipient: recipientEmail });
}
