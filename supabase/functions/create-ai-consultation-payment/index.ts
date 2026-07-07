import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-session-token",
};

const PRICE_ID = "price_1TqU15GG40HuLABOHCc0bxeJ";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const sessionToken = req.headers.get("x-session-token");
    if (!sessionToken || sessionToken.length < 32) {
      return json({ error: "session_token_required" }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: session } = await supabase
      .from("ai_consultation_sessions")
      .select("id, unlocked")
      .eq("access_token", sessionToken)
      .maybeSingle();

    if (!session) return json({ error: "session_not_found" }, 404);
    if (session.unlocked) return json({ error: "already_unlocked" }, 400);

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
      apiVersion: "2025-08-27.basil",
    });

    const origin = req.headers.get("origin") ?? "https://idraulicisubito.com";
    const checkout = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      success_url: `${origin}/consulenza/successo?session_id={CHECKOUT_SESSION_ID}&token=${sessionToken}`,
      cancel_url: `${origin}/consulenza?canceled=1`,
      metadata: {
        ai_session_id: session.id,
        access_token: sessionToken,
      },
      payment_intent_data: {
        metadata: {
          ai_session_id: session.id,
          purpose: "ai_consultation_unlock",
        },
      },
    });

    await supabase.from("ai_consultation_sessions")
      .update({ stripe_session_id: checkout.id })
      .eq("id", session.id);

    await supabase.from("ai_consultation_events").insert({
      session_id: session.id,
      event_type: "payment_started",
      event_data: { stripe_session_id: checkout.id },
    });

    return json({ url: checkout.url });
  } catch (err) {
    console.error("create-ai-consultation-payment error", err);
    return json({ error: "internal_error", message: (err as Error).message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
