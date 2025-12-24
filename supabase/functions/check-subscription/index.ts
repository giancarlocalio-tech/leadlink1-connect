import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

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

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });
    
    const hasActiveSub = subscriptions.data.length > 0;
    let planType = null;
    let subscriptionEnd = null;
    let stripeSubscriptionId = null;

    if (hasActiveSub) {
      const subscription = subscriptions.data[0];
      stripeSubscriptionId = subscription.id;
      subscriptionEnd = new Date(subscription.current_period_end * 1000).toISOString();
      const subscriptionStart = new Date(subscription.current_period_start * 1000).toISOString();
      logStep("Active subscription found", { subscriptionId: subscription.id, endDate: subscriptionEnd });
      
      const productId = subscription.items.data[0].price.product as string;
      planType = PRODUCT_TO_PLAN[productId] || null;
      logStep("Determined plan type", { productId, planType });

      // Sync subscription data to plumber_subscriptions table
      if (planType) {
        // First get the plumber profile
        const { data: plumberProfile, error: profileError } = await supabaseClient
          .from('plumber_profiles')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (plumberProfile && !profileError) {
          logStep("Found plumber profile", { plumberId: plumberProfile.id });

          // Check if subscription record exists
          const { data: existingSub, error: subError } = await supabaseClient
            .from('plumber_subscriptions')
            .select('id, plan_type, status')
            .eq('plumber_id', plumberProfile.id)
            .single();

          if (existingSub) {
            // Update existing subscription
            const { error: updateError } = await supabaseClient
              .from('plumber_subscriptions')
              .update({
                plan_type: planType,
                status: 'active',
                stripe_customer_id: customerId,
                stripe_subscription_id: stripeSubscriptionId,
                current_period_start: subscriptionStart,
                current_period_end: subscriptionEnd,
                updated_at: new Date().toISOString(),
              })
              .eq('id', existingSub.id);

            if (updateError) {
              logStep("Error updating subscription in DB", { error: updateError.message });
            } else {
              logStep("Updated subscription in DB", { plumberId: plumberProfile.id, planType });
            }
          } else {
            // Create new subscription record
            const { error: insertError } = await supabaseClient
              .from('plumber_subscriptions')
              .insert({
                plumber_id: plumberProfile.id,
                plan_type: planType,
                status: 'active',
                stripe_customer_id: customerId,
                stripe_subscription_id: stripeSubscriptionId,
                current_period_start: subscriptionStart,
                current_period_end: subscriptionEnd,
              });

            if (insertError) {
              logStep("Error inserting subscription in DB", { error: insertError.message });
            } else {
              logStep("Created new subscription in DB", { plumberId: plumberProfile.id, planType });
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
