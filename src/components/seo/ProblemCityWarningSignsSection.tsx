/**
 * ProblemCityWarningSignsSection - "Quando il problema può essere serio?"
 * 
 * Shows 4 warning signs that indicate a serious problem
 */

import { AlertOctagon } from 'lucide-react';

interface ProblemCityWarningSignsSectionProps {
  problemName: string;
  problemSlug: string;
}

// Warning signs by problem type
const warningSignsByProblem: Record<string, { signs: string[]; conclusion: string }> = {
  "lavandino-intasato": {
    signs: [
      "L'acqua risale invece di scendere quando usi altri scarichi",
      "Cattivo odore persistente di fogna che non va via",
      "Gorgoglii o rumori strani provenienti dai tubi",
      "Il problema si ripresenta pochi giorni dopo averlo risolto"
    ],
    conclusion: "Se noti uno di questi segnali, l'ostruzione potrebbe essere nella colonna di scarico condominiale o nelle tubature principali."
  },
  "wc-otturato": {
    signs: [
      "L'acqua risale nel WC quando tiri lo sciacquone",
      "Altri scarichi della casa (lavandini, doccia) gorgogliano",
      "Cattivo odore di fogna in tutto il bagno",
      "Macchie di umidità o infiltrazioni sul pavimento vicino al WC"
    ],
    conclusion: "Questi segnali indicano un'ostruzione nella rete fognaria principale, che richiede intervento professionale con sonda o idropulitrice."
  },
  "scaldabagno-non-scalda": {
    signs: [
      "Perdita d'acqua visibile sotto o intorno allo scaldabagno",
      "Rumori forti o scoppiettii durante il funzionamento",
      "Acqua con colorazione ruggine o torbida",
      "Odore di gas (per modelli a gas) - PERICOLO"
    ],
    conclusion: "In caso di perdite d'acqua o odore di gas, chiudi immediatamente le valvole e contatta un tecnico."
  },
  "caldaia-in-blocco": {
    signs: [
      "Codice di errore che appare ripetutamente sul display",
      "Odore di gas nelle vicinanze della caldaia",
      "Rumore forte o vibrazioni anomale",
      "Perdita d'acqua visibile sotto la caldaia"
    ],
    conclusion: "Una caldaia che va in blocco ripetutamente indica un problema serio che richiede diagnosi professionale."
  },
  "tubo-che-perde": {
    signs: [
      "Macchie di umidità che si espandono su muri o soffitto",
      "Bolletta dell'acqua improvvisamente più alta del normale",
      "Pavimento bagnato senza causa apparente",
      "Muffa o cattivo odore in zone specifiche della casa"
    ],
    conclusion: "Una perdita nascosta può causare danni strutturali gravi. Intervieni immediatamente per limitare i danni."
  },
  "doccia-non-scarica": {
    signs: [
      "L'acqua ristagna per ore dopo la doccia",
      "Cattivo odore proveniente dallo scarico",
      "Gorgoglii in altri scarichi del bagno",
      "Acqua che risale dalla piletta durante l'uso"
    ],
    conclusion: "Se l'acqua non scende affatto, l'ostruzione potrebbe essere nel sifone o nella tubatura principale del bagno."
  },
  "scarico-cucina-lento": {
    signs: [
      "Cattivo odore persistente dalla cucina",
      "Acqua che risale nel lavandino quando usi la lavastoviglie",
      "Gorgoglii quando scarichi altri lavandini",
      "Presenza di residui di cibo che risalgono"
    ],
    conclusion: "Questi segnali indicano accumuli di grasso nelle tubature che richiedono pulizia professionale."
  },
  "termosifone-freddo": {
    signs: [
      "Tutti i termosifoni della casa sono freddi, non solo uno",
      "La caldaia va in blocco frequentemente",
      "Perdite d'acqua visibili vicino ai radiatori",
      "Rumori di gorgoglio provenienti dall'impianto"
    ],
    conclusion: "Un solo termosifone freddo spesso si risolve sfiatando, ma se il problema è diffuso, potrebbe esserci un guasto alla caldaia o alla pompa."
  }
};

export function ProblemCityWarningSignsSection({ 
  problemName, 
  problemSlug 
}: ProblemCityWarningSignsSectionProps) {
  const warningData = warningSignsByProblem[problemSlug] || {
    signs: [
      "Il problema si ripresenta frequentemente",
      "Cattivi odori persistenti",
      "Rumori anomali dalle tubature",
      "Danni visibili a muri o pavimenti"
    ],
    conclusion: "Se noti uno di questi segnali, è consigliabile contattare un professionista per una valutazione."
  };

  return (
    <section className="py-6">
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
        <AlertOctagon className="h-6 w-6 text-destructive" />
        Quando {problemName} Può Essere un Problema Serio?
      </h2>

      <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5 md:p-6">
        <p className="text-muted-foreground mb-4">
          Fai attenzione a questi <strong className="text-foreground">segnali di allarme</strong> che indicano 
          che il problema potrebbe essere più grave del previsto:
        </p>

        <div className="space-y-3">
          {warningData.signs.map((sign, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 bg-background/80 p-3 rounded-lg border border-border"
            >
              <span className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 text-destructive font-bold text-sm">
                {index + 1}
              </span>
              <span className="text-foreground text-sm md:text-base">{sign}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-destructive/20">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">⚠️ Importante:</strong> {warningData.conclusion}
          </p>
        </div>
      </div>
    </section>
  );
}
