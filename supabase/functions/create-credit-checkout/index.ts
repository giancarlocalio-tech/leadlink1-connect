import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CREDIT-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    logStep("Function started");

    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Get package_id from request body
    const { package_id } = await req.json();
    if (!package_id) throw new Error("package_id is required");
    logStep("Package requested", { package_id });

    // Fetch package details
    const { data: packageData, error: packageError } = await supabaseAdmin
      .from("credit_packages")
      .select("*")
      .eq("id", package_id)
      .eq("is_active", true)
      .single();

    if (packageError || !packageData) {
      throw new Error("Package not found or inactive");
    }
    logStep("Package found", { 
      name: packageData.name, 
      credits: packageData.credits,
      price_id: packageData.stripe_price_id 
    });

    if (!packageData.stripe_price_id) {
      throw new Error("Package does not have a Stripe price configured");
    }

    // Get plumber profile
    const { data: profileData, error: profileError } = await supabaseAdmin
      .from("plumber_profiles")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (profileError || !profileData) {
      throw new Error("Plumber profile not found");
    }
    logStep("Plumber profile found", { plumber_id: profileData.id });

    // Initialize Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Check if customer already exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing Stripe customer found", { customerId });
    }

    // Create checkout session
    const origin = req.headers.get("origin") || "https://leadlink1-connect.lovable.app";
    
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price: packageData.stripe_price_id,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/dashboard/crediti?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/crediti?canceled=true`,
      metadata: {
        plumber_id: profileData.id,
        package_id: package_id,
        credits: packageData.credits.toString(),
        user_id: user.id,
      },
    });

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
