import { useState } from "react";
import { Sparkles, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSessionToken } from "@/hooks/useAIConsultation";
import { toast } from "sonner";

interface Props {
  onClose?: () => void;
}

export function PaywallCard({ onClose }: Props) {
  const [loading, setLoading] = useState(false);

  async function handlePay() {
    setLoading(true);
    try {
      const token = getSessionToken();
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-ai-consultation-payment`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            "x-session-token": token,
          },
        },
      );
      const data = await resp.json();
      if (!resp.ok || !data.url) {
        toast.error("Impossibile aprire il pagamento. Riprova.");
        return;
      }
      window.location.href = data.url;
    } catch (e) {
      toast.error("Errore di rete. Riprova.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-6 my-4 shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 rounded-full bg-primary/10">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-bold text-lg">Sblocca la soluzione completa</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Hai usato le tue domande gratuite. Con la consulenza completa ottieni:
      </p>
      <ul className="space-y-2 mb-5 text-sm">
        <li className="flex gap-2">
          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <span><strong>Chat illimitata per sempre</strong> con l'Idraulico AI</span>
        </li>
        <li className="flex gap-2">
          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <span>Analisi approfondita di <strong>foto e video</strong> del tuo problema</span>
        </li>
        <li className="flex gap-2">
          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <span>Procedura <strong>passo-passo</strong> personalizzata, attrezzi necessari</span>
        </li>
        <li className="flex gap-2">
          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <span>Assistenza su <strong>ogni nuovo problema</strong> idraulico, senza altri pagamenti</span>
        </li>
      </ul>
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-3xl font-bold text-primary">€4,95</span>
        <span className="text-sm text-muted-foreground">una tantum · niente abbonamenti</span>
      </div>
      <Button
        onClick={handlePay}
        disabled={loading}
        className="w-full h-12 text-base font-semibold"
        size="lg"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        Sblocca ora la consulenza completa
      </Button>
      <p className="text-xs text-muted-foreground text-center mt-3">
        Pagamento sicuro con Stripe · Carte · Apple Pay · Google Pay
      </p>
    </div>
  );
}
