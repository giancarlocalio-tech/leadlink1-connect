import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const log = (s: string, d?: Record<string, unknown>) =>
  console.log(`[VERIFY-TOPUP] ${s}${d ? " - " + JSON.stringify(d) : ""}`);

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Auth: ${userError.message}`);
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");

    const { session_id } = await req.json();
    if (!session_id) throw new Error("session_id is required");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY not set");
    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    const session = await stripe.checkout.sessions.retrieve(session_id);
    log("Session retrieved", { status: session.payment_status });

    if (session.payment_status !== "paid") {
      return new Response(
        JSON.stringify({ success: false, message: "Pagamento non completato" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    const plumberId = session.metadata?.plumber_id;
    const amountCents = parseInt(session.metadata?.amount_cents || "0", 10);
    if (!plumberId || !amountCents) throw new Error("Invalid session metadata");

    // Chiama la funzione SQL idempotente add_balance
    const { data, error } = await supabaseAdmin.rpc("add_balance", {
      p_plumber_id: plumberId,
      p_amount_cents: amountCents,
      p_stripe_payment_id: session.payment_intent as string,
      p_description: `Ricarica saldo +${(amountCents / 100).toFixed(2).replace(".", ",")} €`,
    });

    if (error) throw new Error(`add_balance failed: ${error.message}`);

    const row = Array.isArray(data) ? data[0] : data;
    const newBalanceCents = row?.new_balance_cents ?? 0;
    log("Balance updated", { newBalanceCents });

    return new Response(
      JSON.stringify({
        success: true,
        amount_added_cents: amountCents,
        new_balance_cents: newBalanceCents,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    log("ERROR", { msg });
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
