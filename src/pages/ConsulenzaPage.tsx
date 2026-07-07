import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { AIConsultationChat } from "@/components/ai/AIConsultationChat";
import { Sparkles, Shield, Zap, CheckCircle2 } from "lucide-react";

export default function ConsulenzaPage() {
  const [params] = useSearchParams();
  const problemHint = params.get("problema") ?? undefined;
  const cityHint = params.get("citta") ?? undefined;
  const initialPrompt =
    problemHint
      ? `Ho un problema con: ${problemHint.replace(/-/g, " ")}${cityHint ? ` a ${cityHint}` : ""}`
      : undefined;

  return (
    <>
      <Helmet>
        <title>Idraulico AI · Diagnosi Gratis Online | IdrauliciSubito</title>
        <meta
          name="description"
          content="Parla con l'Idraulico AI: descrivi il problema, invia foto o video, ricevi la soluzione passo-passo. Prima diagnosi gratis, niente registrazione."
        />
        <link rel="canonical" href="https://www.idraulicisubito.com/consulenza" />
        <meta property="og:title" content="Idraulico AI · Diagnosi Gratis Online" />
        <meta property="og:description" content="Diagnosi e soluzione ai problemi idraulici in chat. Prima domanda gratis." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
          {/* Hero mini */}
          <div className="text-center mb-6 md:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Nuovo · Diagnosi AI istantanea
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
              Il tuo <span className="text-primary">Idraulico AI</span> personale
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Descrivi il problema, mostra una foto, ricevi la soluzione passo-passo in secondi.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
            {/* Chat */}
            <div className="h-[70vh] min-h-[500px] max-h-[800px]">
              <AIConsultationChat
                initialPrompt={initialPrompt}
                problemHint={problemHint}
                cityHint={cityHint}
              />
            </div>

            {/* Side info */}
            <aside className="space-y-4">
              <div className="rounded-2xl border bg-card p-5">
                <h2 className="font-bold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Come funziona
                </h2>
                <ol className="space-y-3 text-sm">
                  <li className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">1</span>
                    <span>Descrivi il problema in chat, allega foto o video</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">2</span>
                    <span>Ricevi diagnosi e prima soluzione <strong>gratis</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">3</span>
                    <span>Sblocca la guida passo-passo completa a <strong>€4,90</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">4</span>
                    <span>Se non risolvi, ti troviamo un <strong>idraulico vicino</strong> con recensioni</span>
                  </li>
                </ol>
              </div>

              <div className="rounded-2xl border bg-card p-5">
                <h2 className="font-bold mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Perché fidarti
                </h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Consulenza istantanea, 24/7</li>
                  <li>✓ Analisi foto e video con AI multimodale</li>
                  <li>✓ Zero abbonamenti, paghi solo se sblocchi</li>
                  <li>✓ Se non risolve → idraulico vero</li>
                </ul>
              </div>

              <div className="rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-4">
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    <strong>Emergenza gas o allagamento?</strong> Chiudi l'acqua/il gas e chiama subito un idraulico vero. L'AI serve per diagnosi e riparazioni non urgenti.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
