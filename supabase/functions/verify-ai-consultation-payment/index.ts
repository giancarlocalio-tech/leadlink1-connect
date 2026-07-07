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

    // Notifica email al proprietario per ogni pagamento
    try {
      const resendApiKey = Deno.env.get("RESEND_API_KEY");
      const ownerEmail = Deno.env.get("OWNER_NOTIFICATION_EMAIL");
      if (resendApiKey && ownerEmail) {
        const amountEur = ((checkout.amount_total ?? 490) / 100).toFixed(2);
        const clientEmail = checkout.customer_details?.email ?? "n/d";
        const clientName = checkout.customer_details?.name ?? "n/d";
        const paidAt = new Date().toLocaleString("it-IT", { timeZone: "Europe/Rome" });
        const html = `
          <!DOCTYPE html><html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.6;color:#1e293b;background:#f8fafc;padding:20px;">
            <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
              <div style="background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;padding:28px;text-align:center;">
                <h1 style="margin:0;font-size:22px;">💰 Nuovo pagamento consulenza AI</h1>
                <p style="margin:8px 0 0;opacity:.95;font-size:14px;">Un cliente ha sbloccato l'Idraulico AI</p>
              </div>
              <div style="padding:24px;">
                <table style="width:100%;border-collapse:collapse;font-size:15px;">
                  <tr><td style="padding:10px 0;color:#64748b;">Importo</td><td style="padding:10px 0;text-align:right;font-weight:700;color:#16a34a;">€ ${amountEur}</td></tr>
                  <tr><td style="padding:10px 0;color:#64748b;border-top:1px solid #e2e8f0;">Email cliente</td><td style="padding:10px 0;text-align:right;border-top:1px solid #e2e8f0;">${clientEmail}</td></tr>
                  <tr><td style="padding:10px 0;color:#64748b;border-top:1px solid #e2e8f0;">Nome</td><td style="padding:10px 0;text-align:right;border-top:1px solid #e2e8f0;">${clientName}</td></tr>
                  <tr><td style="padding:10px 0;color:#64748b;border-top:1px solid #e2e8f0;">Data</td><td style="padding:10px 0;text-align:right;border-top:1px solid #e2e8f0;">${paidAt}</td></tr>
                  <tr><td style="padding:10px 0;color:#64748b;border-top:1px solid #e2e8f0;">Session ID</td><td style="padding:10px 0;text-align:right;border-top:1px solid #e2e8f0;font-family:monospace;font-size:12px;">${session.id}</td></tr>
                  <tr><td style="padding:10px 0;color:#64748b;border-top:1px solid #e2e8f0;">Stripe</td><td style="padding:10px 0;text-align:right;border-top:1px solid #e2e8f0;font-family:monospace;font-size:12px;">${stripe_session_id}</td></tr>
                </table>
              </div>
            </div>
          </body></html>
        `;
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "IdrauliciSubito <noreply@idraulicisubito.com>",
            to: [ownerEmail],
            subject: `💰 Pagamento €${amountEur} - Consulenza AI (${clientEmail})`,
            html,
          }),
        });
        if (!emailRes.ok) {
          console.error("owner email failed", await emailRes.text());
        }
      } else {
        console.warn("RESEND_API_KEY or OWNER_NOTIFICATION_EMAIL missing - skipping notification");
      }
    } catch (mailErr) {
      console.error("owner email error", mailErr);
    }

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
