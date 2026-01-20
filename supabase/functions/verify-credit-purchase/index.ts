import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[VERIFY-CREDIT-PURCHASE] ${step}${detailsStr}`);
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
    if (!user?.email) throw new Error("User not authenticated");
    logStep("User authenticated", { userId: user.id });

    // Get session_id from request body
    const { session_id } = await req.json();
    if (!session_id) throw new Error("session_id is required");
    logStep("Session ID received", { session_id });

    // Initialize Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Retrieve checkout session
    const session = await stripe.checkout.sessions.retrieve(session_id);
    logStep("Session retrieved", { 
      status: session.payment_status,
      metadata: session.metadata 
    });

    if (session.payment_status !== "paid") {
      return new Response(JSON.stringify({ 
        success: false, 
        message: "Payment not completed" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const plumberId = session.metadata?.plumber_id;
    const packageId = session.metadata?.package_id;
    const credits = parseInt(session.metadata?.credits || "0", 10);

    if (!plumberId || !packageId || !credits) {
      throw new Error("Invalid session metadata");
    }

    // Check if this session was already processed
    const { data: existingTx } = await supabaseAdmin
      .from("credit_transactions")
      .select("id")
      .eq("stripe_payment_intent_id", session.payment_intent as string)
      .single();

    if (existingTx) {
      logStep("Transaction already processed", { txId: existingTx.id });
      
      // Get current balance
      const { data: creditData } = await supabaseAdmin
        .from("plumber_credits")
        .select("balance")
        .eq("plumber_id", plumberId)
        .single();

      return new Response(JSON.stringify({ 
        success: true, 
        already_processed: true,
        credits_added: credits,
        new_balance: creditData?.balance || 0
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Get or create plumber credits record
    const { data: currentCredits, error: creditsError } = await supabaseAdmin
      .from("plumber_credits")
      .select("*")
      .eq("plumber_id", plumberId)
      .single();

    let currentBalance = 0;
    if (creditsError && creditsError.code === "PGRST116") {
      // No record exists, create one
      await supabaseAdmin
        .from("plumber_credits")
        .insert({ plumber_id: plumberId, balance: 0 });
    } else if (currentCredits) {
      currentBalance = currentCredits.balance;
    }

    const newBalance = currentBalance + credits;
    logStep("Updating credits", { currentBalance, credits, newBalance });

    // Update credits balance
    const { error: updateError } = await supabaseAdmin
      .from("plumber_credits")
      .update({
        balance: newBalance,
        total_purchased: (currentCredits?.total_purchased || 0) + credits,
        updated_at: new Date().toISOString(),
      })
      .eq("plumber_id", plumberId);

    if (updateError) {
      throw new Error(`Failed to update credits: ${updateError.message}`);
    }

    // Record transaction
    const { error: txError } = await supabaseAdmin
      .from("credit_transactions")
      .insert({
        plumber_id: plumberId,
        transaction_type: "purchase",
        credits: credits,
        balance_after: newBalance,
        package_id: packageId,
        stripe_payment_intent_id: session.payment_intent as string,
        amount_cents: session.amount_total,
        description: `Acquisto pacchetto crediti`,
      });

    if (txError) {
      logStep("Warning: Failed to record transaction", { error: txError.message });
    }

    // Update subscription to mark as non-trial if still in trial
    await supabaseAdmin
      .from("plumber_subscriptions")
      .update({ 
        is_trial: false,
        status: 'active'
      })
      .eq("plumber_id", plumberId)
      .eq("is_trial", true);

    logStep("Credits added successfully", { newBalance });

    return new Response(JSON.stringify({ 
      success: true, 
      credits_added: credits,
      new_balance: newBalance
    }), {
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
