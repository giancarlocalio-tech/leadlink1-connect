import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    logStep("Function started");

    const { priceId, planType } = await req.json();
    if (!priceId) {
      throw new Error("Price ID is required");
    }
    logStep("Price ID received", { priceId, planType });

    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { 
      apiVersion: "2025-08-27.basil" 
    });

    // Check if customer already exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing customer found", { customerId });
    } else {
      logStep("No existing customer, will create new one");
    }

    const origin = req.headers.get("origin") || "http://localhost:5173";
    
    // Configure checkout session based on plan type
    const subscriptionData: any = {
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/dashboard/pagamento-completato`,
      cancel_url: `${origin}/dashboard/abbonamento?checkout=cancelled`,
      metadata: {
        user_id: user.id,
      },
    };

    // Plan-specific trial/discount configuration
    if (planType === "basic") {
      // Basic: 30 days completely free trial
      subscriptionData.subscription_data = {
        trial_period_days: 30,
      };
      logStep("Adding 30-day free trial for Basic plan");
    } else if (planType === "medium") {
      // Medium: First month at €9.99 instead of €59
      // Use coupon if it exists (must be created manually in Stripe dashboard)
      try {
        await stripe.coupons.retrieve("MEDIUM_TRIAL_9_99");
        subscriptionData.discounts = [{ coupon: "MEDIUM_TRIAL_9_99" }];
        logStep("Adding Medium trial discount (first month €9.99)");
      } catch {
        // Coupon doesn't exist, proceed without discount
        logStep("Medium coupon not found, proceeding without discount");
      }
    } else if (planType === "premium") {
      // Premium: First month at €19.99 instead of €99
      // Use coupon if it exists (must be created manually in Stripe dashboard)
      try {
        await stripe.coupons.retrieve("PREMIUM_TRIAL_19_99");
        subscriptionData.discounts = [{ coupon: "PREMIUM_TRIAL_19_99" }];
        logStep("Adding Premium trial discount (first month €19.99)");
      } catch {
        // Coupon doesn't exist, proceed without discount
        logStep("Premium coupon not found, proceeding without discount");
      }
    }

    const session = await stripe.checkout.sessions.create(subscriptionData);

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
