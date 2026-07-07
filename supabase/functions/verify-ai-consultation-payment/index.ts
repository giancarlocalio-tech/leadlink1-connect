import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-session-token",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const { stripe_session_id, access_token } = await req.json();
    if (!stripe_session_id || !access_token) {
      return json({ error: "missing_params" }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: session } = await supabase
      .from("ai_consultation_sessions")
      .select("*")
      .eq("access_token", access_token)
      .maybeSingle();

    if (!session) return json({ error: "session_not_found" }, 404);
    if (session.unlocked) {
      return json({ unlocked: true, already: true });
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
      apiVersion: "2025-08-27.basil",
    });

    const checkout = await stripe.checkout.sessions.retrieve(stripe_session_id);
    if (checkout.payment_status !== "paid") {
      return json({ unlocked: false, payment_status: checkout.payment_status });
    }

    await supabase.from("ai_consultation_sessions")
      .update({
        unlocked: true,
        paid_at: new Date().toISOString(),
        amount_paid_cents: checkout.amount_total ?? 490,
        user_email: checkout.customer_details?.email ?? null,
      })
      .eq("id", session.id);

    await supabase.from("ai_consultation_events").insert({
      session_id: session.id,
      event_type: "payment_completed",
      event_data: { amount: checkout.amount_total, email: checkout.customer_details?.email },
    });

    return json({ unlocked: true });
  } catch (err) {
    console.error("verify-ai-consultation-payment error", err);
    return json({ error: "internal_error", message: (err as Error).message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
