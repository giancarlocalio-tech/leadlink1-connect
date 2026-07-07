import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { AIConsultationChat } from "@/components/ai/AIConsultationChat";

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

      <div className="h-[calc(100vh-4rem)] bg-background">
        <AIConsultationChat
          initialPrompt={initialPrompt}
          problemHint={problemHint}
          cityHint={cityHint}
        />
      </div>
    </>
  );
}
