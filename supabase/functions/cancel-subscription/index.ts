import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CANCEL-SUBSCRIPTION] ${step}${detailsStr}`);
};

const getPlanDisplayName = (planType: string): string => {
  const planNames: Record<string, string> = {
    'basic': 'Piano Basic (€29/mese)',
    'medium': 'Piano Medium (€69/mese)',
    'premium': 'Piano Premium (€119/mese)',
  };
  return planNames[planType] || planType;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const ownerEmail = Deno.env.get("OWNER_NOTIFICATION_EMAIL");

    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Get plumber profile
    const { data: plumberProfile, error: profileError } = await supabaseClient
      .from('plumber_profiles')
      .select('id, full_name, email, business_name')
      .eq('user_id', user.id)
      .single();

    if (profileError || !plumberProfile) {
      throw new Error("Plumber profile not found");
    }
    logStep("Plumber profile found", { plumberId: plumberProfile.id });

    // Get subscription from database
    const { data: subscription, error: subError } = await supabaseClient
      .from('plumber_subscriptions')
      .select('stripe_subscription_id, plan_type')
      .eq('plumber_id', plumberProfile.id)
      .single();

    if (subError || !subscription?.stripe_subscription_id) {
      throw new Error("No active subscription found");
    }
    logStep("Subscription found", { subscriptionId: subscription.stripe_subscription_id, planType: subscription.plan_type });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Cancel the subscription at period end (so user keeps access until end of billing period)
    const canceledSubscription = await stripe.subscriptions.update(
      subscription.stripe_subscription_id,
      { cancel_at_period_end: true }
    );
    logStep("Subscription canceled", { 
      subscriptionId: canceledSubscription.id, 
      cancelAtPeriodEnd: canceledSubscription.cancel_at_period_end,
      currentPeriodEnd: new Date(canceledSubscription.current_period_end * 1000).toISOString()
    });

    // Update local database
    await supabaseClient
      .from('plumber_subscriptions')
      .update({ 
        status: 'cancelled',
        updated_at: new Date().toISOString()
      })
      .eq('plumber_id', plumberProfile.id);

    // Send confirmation email to the plumber
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const planDisplayName = getPlanDisplayName(subscription.plan_type);
      const cancelDate = new Date(canceledSubscription.current_period_end * 1000).toLocaleDateString('it-IT', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      // Email to plumber
      const plumberEmailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
              .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
              .info-box { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #3b82f6; }
              .label { font-weight: 600; color: #64748b; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }
              .value { font-size: 16px; color: #1e293b; }
              .highlight { background: #fef3c7; border-left-color: #f59e0b; }
              .footer { text-align: center; padding: 20px; color: #64748b; font-size: 12px; }
              .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 15px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px;">Abbonamento Cancellato</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Conferma della cancellazione del tuo abbonamento</p>
              </div>
              <div class="content">
                <p>Ciao ${plumberProfile.full_name},</p>
                <p>Ti confermiamo che il tuo abbonamento è stato cancellato con successo.</p>
                
                <div class="info-box">
                  <div class="label">Piano cancellato</div>
                  <div class="value">${planDisplayName}</div>
                </div>
                
                <div class="info-box highlight">
                  <div class="label">⚠️ Importante</div>
                  <div class="value">Avrai ancora accesso a tutte le funzionalità fino al <strong>${cancelDate}</strong></div>
                </div>
                
                <p>Dopo questa data, non riceverai più nuove richieste di lavoro.</p>
                
                <p>Se cambi idea, puoi riattivare il tuo abbonamento in qualsiasi momento dalla tua area personale.</p>
                
                <p style="text-align: center;">
                  <a href="https://www.idraulicisubito.com/abbonamento" class="button">Riattiva Abbonamento</a>
                </p>
                
                <p>Grazie per aver utilizzato IdrauliciSubito!</p>
              </div>
              <div class="footer">
                <p>Hai domande? Contattaci a <a href="mailto:supporto@idraulicisubito.com" style="color: #3b82f6;">supporto@idraulicisubito.com</a></p>
                <p>IdrauliciSubito.com</p>
              </div>
            </div>
          </body>
        </html>
      `;

      await resend.emails.send({
        from: "IdrauliciSubito <noreply@idraulicisubito.com>",
        to: [plumberProfile.email],
        subject: `Conferma cancellazione abbonamento - IdrauliciSubito`,
        html: plumberEmailHtml,
      });
      logStep("Plumber confirmation email sent", { email: plumberProfile.email });

      // Also notify owner if email is configured
      if (ownerEmail) {
        const ownerEmailHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
                .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
                .info-box { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #ef4444; }
                .label { font-weight: 600; color: #64748b; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }
                .value { font-size: 16px; color: #1e293b; }
                .plan-badge { display: inline-block; background: #64748b; color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; }
                .date-badge { display: inline-block; background: #f97316; color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; }
                .footer { text-align: center; padding: 20px; color: #64748b; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="margin: 0; font-size: 24px;">❌ Abbonamento Cancellato</h1>
                  <p style="margin: 10px 0 0 0; opacity: 0.9;">Un idraulico ha cancellato il suo abbonamento</p>
                </div>
                <div class="content">
                  <div class="info-box">
                    <div class="label">Nome Idraulico</div>
                    <div class="value">${plumberProfile.full_name}</div>
                  </div>
                  ${plumberProfile.business_name ? `
                  <div class="info-box">
                    <div class="label">Nome Attività</div>
                    <div class="value">${plumberProfile.business_name}</div>
                  </div>
                  ` : ''}
                  <div class="info-box">
                    <div class="label">Email</div>
                    <div class="value"><a href="mailto:${plumberProfile.email}" style="color: #3b82f6;">${plumberProfile.email}</a></div>
                  </div>
                  <div class="info-box">
                    <div class="label">Piano Cancellato</div>
                    <div class="value"><span class="plan-badge">${planDisplayName}</span></div>
                  </div>
                  <div class="info-box">
                    <div class="label">Accesso Attivo Fino Al</div>
                    <div class="value"><span class="date-badge">${cancelDate}</span></div>
                  </div>
                </div>
                <div class="footer">
                  <p>L'idraulico manterrà l'accesso fino alla fine del periodo di fatturazione.</p>
                  <p>Questa email è stata inviata automaticamente da IdrauliciSubito.com</p>
                </div>
              </div>
            </body>
          </html>
        `;

        await resend.emails.send({
          from: "IdrauliciSubito <noreply@idraulicisubito.com>",
          to: [ownerEmail],
          subject: `❌ Abbonamento cancellato: ${plumberProfile.full_name} - ${planDisplayName}`,
          html: ownerEmailHtml,
        });
        logStep("Owner notification sent");
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Subscription cancelled",
        cancel_at: new Date(canceledSubscription.current_period_end * 1000).toISOString()
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});

