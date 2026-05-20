import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const log = (step: string, details?: Record<string, unknown>) => {
  const d = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[CREATE-TOPUP-CHECKOUT] ${step}${d}`);
};

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
    if (!user?.email) throw new Error("User not authenticated");
    log("User authenticated", { userId: user.id });

    const { package_id } = await req.json();
    if (!package_id) throw new Error("package_id is required");

    const { data: pkg, error: pkgErr } = await supabaseAdmin
      .from("credit_packages")
      .select("*")
      .eq("id", package_id)
      .eq("is_active", true)
      .single();
    if (pkgErr || !pkg) throw new Error("Package not found");

    const amountCents = pkg.amount_cents || pkg.price_cents;
    if (!amountCents || amountCents < 100) throw new Error("Invalid package amount");

    const { data: profile, error: profErr } = await supabaseAdmin
      .from("plumber_profiles")
      .select("id, full_name")
      .eq("user_id", user.id)
      .single();
    if (profErr || !profile) throw new Error("Plumber profile not found");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY not set");
    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    const customerId = customers.data[0]?.id;

    const origin = req.headers.get("origin") || "https://leadlink1-connect.lovable.app";
    const euros = (amountCents / 100).toFixed(2).replace(".", ",");

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Ricarica saldo ${euros} €`,
              description: "Ricarica del saldo Idraulici Subito",
            },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/dashboard/conto/ricarica?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/conto/ricarica?canceled=true`,
      metadata: {
        plumber_id: profile.id,
        package_id,
        amount_cents: amountCents.toString(),
        user_id: user.id,
      },
    });

    log("Session created", { id: session.id });
    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    log("ERROR", { msg });
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
