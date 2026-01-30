/**
 * ProblemCityWhenToCallSection - "Quando chiamare un idraulico a [città]"
 * 
 * SEO-optimized section explaining when professional help is needed
 */

import { Phone, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface ProblemCityWhenToCallSectionProps {
  cityName: string;
  problemName: string;
  problemSlug: string;
}

// When to call data by problem
const getWhenToCallData = (problemSlug: string, cityName: string) => {
  const data: Record<string, { urgentSigns: string[]; riskText: string; callText: string }> = {
    "lavandino-intasato": {
      urgentSigns: [
        "L'acqua non defluisce affatto nonostante i tentativi fai-da-te",
        "Cattivi odori persistenti che indicano un'ostruzione profonda",
        "Gorgoglii in altri scarichi della casa",
        "Il problema si ripresenta frequentemente"
      ],
      riskText: "Un lavandino intasato non trattato può causare risalite d'acqua, danni ai mobili sottostanti e proliferazione di batteri.",
      callText: `Se il lavandino continua a non scaricare, è il momento di chiamare un idraulico a ${cityName}. Un professionista può ispezionare le tubature con telecamera e rimuovere ostruzioni profonde.`
    },
    "wc-otturato": {
      urgentSigns: [
        "L'acqua risale invece di scendere",
        "Gorgoglii in altri sanitari del bagno",
        "Tracimazione o rischio allagamento",
        "Tentativi con sturalavandini falliti"
      ],
      riskText: "Un WC otturato può causare allagamenti, danni igienici gravi e problemi alla rete fognaria condominiale.",
      callText: `Se l'acqua risale o il problema coinvolge altri scarichi, chiama subito un idraulico a ${cityName}. Potrebbe esserci un'ostruzione nella colonna di scarico.`
    },
    "scaldabagno-non-scalda": {
      urgentSigns: [
        "Lo scaldabagno non si accende dopo il reset",
        "Perdite d'acqua visibili dall'apparecchio",
        "Rumori anomali (scoppi, gorgoglii)",
        "Odore di bruciato o di gas"
      ],
      riskText: "Uno scaldabagno malfunzionante può causare sprechi energetici, perdite d'acqua e, nei modelli a gas, rischi per la sicurezza.",
      callText: `Se lo scaldabagno non risponde ai controlli base, chiama un tecnico qualificato a ${cityName}. Gli interventi su apparecchi a gas richiedono certificazione.`
    },
    "caldaia-in-blocco": {
      urgentSigns: [
        "La caldaia mostra codici di errore persistenti",
        "Il reset non funziona dopo 2-3 tentativi",
        "Odore di gas o fumi anomali",
        "Perdite d'acqua dalla caldaia"
      ],
      riskText: "Una caldaia in blocco lascia la casa senza riscaldamento e acqua calda, con rischi maggiori in inverno.",
      callText: `Se la caldaia non riparte dopo i controlli, chiama un tecnico caldaista a ${cityName}. Non resettare più di 3 volte: potresti mascherare un guasto serio.`
    },
    "tubo-che-perde": {
      urgentSigns: [
        "La perdita è abbondante e non si ferma",
        "Acqua che esce dal muro o dal soffitto",
        "Macchie di umidità che si allargano",
        "Presenza di acqua vicino a impianti elettrici"
      ],
      riskText: "Una perdita d'acqua non riparata causa danni strutturali, muffe, cortocircuiti e bollette salate.",
      callText: `Una perdita d'acqua richiede sempre un idraulico a ${cityName}. Le riparazioni fai-da-te sono solo temporanee. Chiudi l'acqua e chiama subito.`
    },
    "doccia-non-scarica": {
      urgentSigns: [
        "L'acqua ristagna completamente nel piatto doccia",
        "Cattivi odori persistenti dalla piletta",
        "Gorgoglii in altri scarichi del bagno",
        "Il problema ritorna dopo pochi giorni"
      ],
      riskText: "Uno scarico doccia intasato può indicare problemi nella colonna condominiale e causare infiltrazioni.",
      callText: `Se la doccia non scarica nonostante la pulizia della piletta, un idraulico a ${cityName} può ispezionare e pulire le tubature con attrezzatura professionale.`
    },
    "scarico-cucina-lento": {
      urgentSigns: [
        "Lo scarico è completamente bloccato",
        "Cattivi odori che non vanno via",
        "Acqua che risale dal lavello",
        "Pulizia del sifone senza risultati"
      ],
      riskText: "Uno scarico cucina intasato può causare risalite di acqua sporca e rendere inutilizzabile la cucina.",
      callText: `Se lo scarico resta lento dopo i tentativi fai-da-te, chiama un idraulico a ${cityName}. Potrebbe servire una pulizia professionale delle tubature.`
    },
    "termosifone-freddo": {
      urgentSigns: [
        "Lo sfiato non risolve il problema",
        "Più termosifoni sono freddi",
        "La caldaia va in blocco frequentemente",
        "Rumori anomali nell'impianto"
      ],
      riskText: "Un impianto di riscaldamento inefficiente causa sprechi energetici e comfort abitativo compromesso.",
      callText: `Se il termosifone resta freddo dopo lo sfiato, potrebbe servire un lavaggio dell'impianto. Un tecnico a ${cityName} può verificare pompa e valvole.`
    }
  };
  return data[problemSlug] || data["lavandino-intasato"];
};

export function ProblemCityWhenToCallSection({ 
  cityName, 
  problemName, 
  problemSlug 
}: ProblemCityWhenToCallSectionProps) {
  const data = getWhenToCallData(problemSlug, cityName);

  return (
    <section className="scroll-mt-24">
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
        <Phone className="h-6 w-6 text-primary" />
        Quando Chiamare un Idraulico a {cityName}
      </h2>

      {/* Urgent signs */}
      <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5 mb-6">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          Segnali che richiedono intervento professionale
        </h3>
        <ul className="space-y-2">
          {data.urgentSigns.map((sign, index) => (
            <li key={index} className="flex items-start gap-2 text-muted-foreground">
              <XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
              <span>{sign}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Risk text */}
      <div className="bg-accent border border-border rounded-xl p-5 mb-6">
        <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-accent-foreground" />
          Rischi se non intervieni
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {data.riskText}
        </p>
      </div>

      {/* Call recommendation */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-primary" />
          Il nostro consiglio
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {data.callText}
        </p>
      </div>
    </section>
  );
}
