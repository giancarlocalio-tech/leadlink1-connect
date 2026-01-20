import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

// Mapping from Stripe product IDs to plan types
const PRODUCT_TO_PLAN: Record<string, string> = {
  "prod_TfCj18sjggBGVT": "basic",
  "prod_TfCjaPPRWBnsPH": "medium",
  "prod_TfCju3C6AevWst": "premium",
};

const PLAN_LABELS: Record<string, string> = {
  basic: "Basic",
  medium: "Medium",
  premium: "Premium",
};

// Monthly contact limits per plan
const PLAN_CONTACT_LIMITS: Record<string, number | null> = {
  basic: 3,
  medium: 10,
  premium: null, // Unlimited
};

const toIsoFromUnix = (unixSeconds: unknown): string | null => {
  if (typeof unixSeconds === "number" && Number.isFinite(unixSeconds)) {
    return new Date(unixSeconds * 1000).toISOString();
  }
  return null;
};

// Helper function to send welcome email
async function sendWelcomeEmail(
  email: string, 
  fullName: string, 
  businessName: string, 
  planType: string,
  appOrigin: string,
  supabaseClient: any
) {
  const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
  const planLabel = PLAN_LABELS[planType] || planType;

  // Generate magic link for one-click login
  let loginUrl = `${appOrigin}/dashboard`;
  try {
    const { data: linkData, error: linkError } = await supabaseClient.auth.admin.generateLink({
      type: "magiclink",
      email,
    });

    if (!linkError && linkData) {
      const tokenHash = (linkData as any)?.properties?.hashed_token as string | undefined;
      if (tokenHash) {
        loginUrl = `${appOrigin}/auth/confirm?token_hash=${encodeURIComponent(tokenHash)}&type=magiclink&next=${encodeURIComponent("/dashboard")}`;
      }
    }
  } catch (e) {
    logStep("Error generating magic link for welcome email", { error: String(e) });
  }

  const htmlContent = `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;">
<tr>
<td align="center" style="padding:20px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
<tr>
<td style="background-color:#16a34a;padding:30px;text-align:center;border-radius:8px 8px 0 0;">
<h1 style="margin:0;color:#ffffff;font-family:Arial,sans-serif;font-size:24px;font-weight:bold;">🎉 Pagamento Completato!</h1>
</td>
</tr>
<tr>
<td style="background-color:#ffffff;padding:30px;font-family:Arial,sans-serif;">
<p style="margin:0 0 20px 0;font-size:16px;line-height:1.5;color:#333333;">
Ciao <strong>${fullName}</strong>,
</p>
<p style="margin:0 0 20px 0;font-size:16px;line-height:1.5;color:#333333;">
Il tuo abbonamento è stato attivato con successo! Ora puoi iniziare a ricevere richieste di lavoro nella tua zona.
</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;background-color:#f0fdf4;border-left:4px solid #16a34a;">
<tr>
<td style="padding:20px;">
<h3 style="margin:0 0 15px 0;font-size:16px;color:#16a34a;font-family:Arial,sans-serif;">Riepilogo Abbonamento</h3>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td style="padding:5px 0;color:#666666;font-size:14px;width:120px;font-family:Arial,sans-serif;"><strong>Attività:</strong></td>
<td style="padding:5px 0;font-size:14px;color:#333333;font-family:Arial,sans-serif;">${businessName}</td>
</tr>
<tr>
<td style="padding:5px 0;color:#666666;font-size:14px;font-family:Arial,sans-serif;"><strong>Piano:</strong></td>
<td style="padding:5px 0;font-size:14px;font-family:Arial,sans-serif;">
<span style="background-color:#16a34a;color:#ffffff;padding:4px 12px;border-radius:12px;font-size:12px;font-weight:bold;">${planLabel}</span>
</td>
</tr>
</table>
</td>
</tr>
</table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:25px 0;">
<tr>
<td align="center">
<a href="${loginUrl}" style="display:inline-block;background-color:#16a34a;color:#ffffff;padding:14px 30px;border-radius:6px;text-decoration:none;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">Vai alla Dashboard</a>
</td>
</tr>
</table>
<p style="margin:20px 0 0 0;padding-top:20px;border-top:1px solid #eeeeee;font-size:14px;color:#666666;font-family:Arial,sans-serif;">
Hai domande? Rispondi a questa email e saremo felici di aiutarti!
</p>
</td>
</tr>
<tr>
<td style="padding:20px;text-align:center;font-family:Arial,sans-serif;">
<p style="margin:0;font-size:12px;color:#999999;">IdrauliciSubito - ${appOrigin}</p>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`;

  try {
    const result = await resend.emails.send({
      from: "IdrauliciSubito <benvenuto@idraulicisubito.com>",
      reply_to: "supporto@idraulicisubito.com",
      to: [email],
      subject: "🎉 Abbonamento attivato - Benvenuto su IdrauliciSubito!",
      html: htmlContent,
    });
    logStep("Welcome email sent", { email, result });
    return true;
  } catch (e) {
    logStep("Error sending welcome email", { error: String(e) });
    return false;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      logStep("Missing Authorization header");
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }
    logStep("Authorization header found");

    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (!token) {
      logStep("Empty bearer token");
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    logStep("Authenticating user with token");

    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) {
      logStep("Auth failed", { message: userError.message });
      return new Response(JSON.stringify({ error: "reauth_required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    const user = userData.user;
    if (!user?.email) {
      logStep("User missing email");
      return new Response(JSON.stringify({ error: "reauth_required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    logStep("User authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    
    if (customers.data.length === 0) {
      logStep("No customer found, user is not subscribed");
      return new Response(JSON.stringify({ 
        subscribed: false,
        plan_type: null,
        subscription_end: null,
        stripe_subscription_id: null,
        stripe_customer_id: null,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    // Check for both active and trialing subscriptions
    let subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });
    
    // If no active subscription, check for trialing subscriptions
    if (subscriptions.data.length === 0) {
      logStep("No active subscription, checking for trialing...");
      subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: "trialing",
        limit: 1,
      });
    }
    
    const hasActiveSub = subscriptions.data.length > 0;
    let planType = null;
    let subscriptionEnd = null;
    let stripeSubscriptionId = null;

    if (hasActiveSub) {
      const subscription = subscriptions.data[0];
      stripeSubscriptionId = subscription.id;

      const subscriptionEndIso =
        toIsoFromUnix((subscription as any).current_period_end) ??
        toIsoFromUnix((subscription as any).trial_end) ??
        null;
      const subscriptionStartIso =
        toIsoFromUnix((subscription as any).current_period_start) ?? null;

      subscriptionEnd = subscriptionEndIso;
      const subscriptionStart = subscriptionStartIso;

      logStep("Subscription found", {
        subscriptionId: subscription.id,
        status: (subscription as any).status,
        current_period_start: (subscription as any).current_period_start,
        current_period_end: (subscription as any).current_period_end,
        trial_end: (subscription as any).trial_end,
        computedStart: subscriptionStart,
        computedEnd: subscriptionEnd,
      });

      const productId = subscription.items?.data?.[0]?.price?.product as string | undefined;
      planType = productId ? PRODUCT_TO_PLAN[productId] || null : null;
      logStep("Determined plan type", { productId, planType });


      // Sync subscription data to plumber_subscriptions table
      if (planType) {
        // First get the plumber profile with details for welcome email
        const { data: plumberProfile, error: profileError } = await supabaseClient
          .from('plumber_profiles')
          .select('id, full_name, business_name, email')
          .eq('user_id', user.id)
          .single();

        if (plumberProfile && !profileError) {
          logStep("Found plumber profile", { plumberId: plumberProfile.id });

          // Check if subscription record exists
          const { data: existingSub, error: subError } = await supabaseClient
            .from('plumber_subscriptions')
            .select('id, plan_type, status, stripe_subscription_id, current_period_start, monthly_contacts_used')
            .eq('plumber_id', plumberProfile.id)
            .single();

          const isFirstStripeSync = !existingSub?.stripe_subscription_id;

          if (existingSub) {
            // Check if new billing period has started - reset contacts if so
            const existingPeriodStart = existingSub.current_period_start;
            const isNewPeriod = existingPeriodStart && subscriptionStart && 
              new Date(existingPeriodStart).getTime() !== new Date(subscriptionStart).getTime();
            
            if (isNewPeriod) {
              logStep("New billing period detected - resetting monthly contacts", {
                oldPeriodStart: existingPeriodStart,
                newPeriodStart: subscriptionStart,
                previousContactsUsed: existingSub.monthly_contacts_used,
              });
            }

            // Update existing subscription
            const { error: updateError } = await supabaseClient
              .from('plumber_subscriptions')
              .update({
                plan_type: planType,
                status: 'active',
                is_trial: false, // User has paid, no longer in trial
                stripe_customer_id: customerId,
                stripe_subscription_id: stripeSubscriptionId,
                current_period_start: subscriptionStart,
                current_period_end: subscriptionEnd,
                monthly_contact_limit: PLAN_CONTACT_LIMITS[planType] ?? null,
                // Reset contacts to 0 if new billing period, otherwise keep current value
                monthly_contacts_used: isNewPeriod ? 0 : existingSub.monthly_contacts_used,
                contacts_reset_at: isNewPeriod ? new Date().toISOString() : undefined,
                updated_at: new Date().toISOString(),
              })
              .eq('id', existingSub.id);

            if (updateError) {
              logStep("Error updating subscription in DB", { error: updateError.message });
            } else {
              logStep("Updated subscription in DB", { plumberId: plumberProfile.id, planType });
              
              // Send welcome email only on first Stripe sync
              if (isFirstStripeSync) {
                logStep("First Stripe sync - sending welcome email");
                const appOrigin = req.headers.get("origin") || "https://www.idraulicisubito.com";
                await sendWelcomeEmail(
                  plumberProfile.email,
                  plumberProfile.full_name,
                  plumberProfile.business_name,
                  planType,
                  appOrigin,
                  supabaseClient
                );
              }
            }
          } else {
            // Create new subscription record
            const { error: insertError } = await supabaseClient
              .from('plumber_subscriptions')
              .insert({
                plumber_id: plumberProfile.id,
                plan_type: planType,
                status: 'active',
                is_trial: false, // User has paid, no longer in trial
                stripe_customer_id: customerId,
                stripe_subscription_id: stripeSubscriptionId,
                current_period_start: subscriptionStart,
                current_period_end: subscriptionEnd,
                monthly_contact_limit: PLAN_CONTACT_LIMITS[planType] ?? null,
              });

            if (insertError) {
              logStep("Error inserting subscription in DB", { error: insertError.message });
            } else {
              logStep("Created new subscription in DB", { plumberId: plumberProfile.id, planType });
              
              // Send welcome email for new subscription
              logStep("New subscription - sending welcome email");
              const appOrigin = req.headers.get("origin") || "https://www.idraulicisubito.com";
              await sendWelcomeEmail(
                plumberProfile.email,
                plumberProfile.full_name,
                plumberProfile.business_name,
                planType,
                appOrigin,
                supabaseClient
              );
            }
          }
        } else {
          logStep("No plumber profile found for user", { userId: user.id });
        }
      }
    } else {
      logStep("No active subscription found");
    }

    return new Response(JSON.stringify({
      subscribed: hasActiveSub,
      plan_type: planType,
      subscription_end: subscriptionEnd,
      stripe_subscription_id: stripeSubscriptionId,
      stripe_customer_id: customerId,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in check-subscription", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
