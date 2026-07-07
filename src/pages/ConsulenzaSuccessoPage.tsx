import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ConsulenzaSuccessoPage() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const token = params.get("token");
  const [state, setState] = useState<"verifying" | "success" | "failed">("verifying");

  useEffect(() => {
    async function verify() {
      if (!sessionId || !token) {
        setState("failed");
        return;
      }
      try {
        const resp = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-ai-consultation-payment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            },
            body: JSON.stringify({ stripe_session_id: sessionId, access_token: token }),
          },
        );
        const data = await resp.json();
        setState(data.unlocked ? "success" : "failed");
      } catch {
        setState("failed");
      }
    }
    verify();
  }, [sessionId, token]);

  return (
    <>
      <Helmet>
        <title>Consulenza sbloccata · IdrauliciSubito</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-md w-full text-center">
          {state === "verifying" && (
            <>
              <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
              <h1 className="text-xl font-bold mb-2">Verifico il pagamento...</h1>
              <p className="text-sm text-muted-foreground">Un attimo di pazienza.</p>
            </>
          )}
          {state === "success" && (
            <>
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-2xl md:text-3xl font-black mb-2">Consulenza sbloccata!</h1>
              <p className="text-muted-foreground mb-6">
                Ora puoi chattare senza limiti con l'Idraulico AI, allegare foto e video, e ricevere la procedura passo-passo completa.
              </p>
              <Link to="/consulenza">
                <Button size="lg" className="gap-2">
                  Torna alla chat
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground mt-4">Riceverai la ricevuta via email da Stripe.</p>
            </>
          )}
          {state === "failed" && (
            <>
              <h1 className="text-2xl font-bold mb-2">Pagamento non confermato</h1>
              <p className="text-muted-foreground mb-6">
                Non siamo riusciti a verificare il pagamento. Se hai completato l'acquisto, riprova tra qualche secondo o contattaci.
              </p>
              <Link to="/consulenza">
                <Button variant="outline">Torna alla chat</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
