/**
 * ProblemCityDIYLimitations - Warning box for DIY method limitations
 * 
 * Shows when DIY methods won't work
 */

import { AlertTriangle } from 'lucide-react';

interface ProblemCityDIYLimitationsProps {
  problemSlug: string;
}

// DIY limitations by problem type
const diyLimitations: Record<string, string[]> = {
  "lavandino-intasato": [
    "L'ostruzione è nella colonna di scarico condominiale",
    "Il blocco è causato da radici o detriti solidi",
    "Il problema si ripresenta entro pochi giorni"
  ],
  "wc-otturato": [
    "L'acqua risale quando usi altri scarichi della casa",
    "L'ostruzione è nel tubo principale della fognatura",
    "Hai già provato più volte senza successo"
  ],
  "scaldabagno-non-scalda": [
    "Il problema è nella resistenza elettrica o nel bruciatore",
    "Ci sono perdite d'acqua visibili",
    "Lo scaldabagno ha più di 10 anni senza manutenzione"
  ],
  "caldaia-in-blocco": [
    "Il codice di errore indica un guasto interno",
    "La caldaia non si riaccende dopo il reset",
    "Senti odore di gas o vedi perdite d'acqua"
  ],
  "tubo-che-perde": [
    "La perdita è nel muro o sotto il pavimento",
    "Il tubo è visibilmente corroso o deformato",
    "La perdita è nel giunto di un tubo in ferro o piombo"
  ],
  "doccia-non-scarica": [
    "L'ostruzione è oltre la piletta, nelle tubature interne",
    "L'acqua non scende affatto, nemmeno lentamente",
    "Hai già provato i metodi fai-da-te senza risultato"
  ],
  "scarico-cucina-lento": [
    "Il blocco è nel tubo orizzontale sotto il pavimento",
    "L'ostruzione coinvolge più scarichi contemporaneamente",
    "I depositi di grasso sono troppo stratificati"
  ],
  "termosifone-freddo": [
    "Tutti i termosifoni sono freddi, non solo uno",
    "La caldaia mostra errori o va in blocco",
    "Sfiatare non risolve il problema"
  ]
};

export function ProblemCityDIYLimitations({ problemSlug }: ProblemCityDIYLimitationsProps) {
  const limitations = diyLimitations[problemSlug] || [
    "Il problema è profondo nelle tubature",
    "I metodi casalinghi non hanno funzionato",
    "Il problema si ripresenta frequentemente"
  ];

  return (
    <div className="bg-accent/50 border border-accent rounded-xl p-4 my-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-foreground mb-2 text-sm">
            ⚠️ Questi metodi NON funzionano se:
          </h4>
          <ul className="space-y-1">
            {limitations.map((limitation, index) => (
              <li key={index} className="text-muted-foreground text-sm flex items-start gap-2">
                <span className="text-primary">•</span>
                {limitation}
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground text-xs mt-3 pt-2 border-t border-border">
            In questi casi, è necessario l'intervento di un professionista con attrezzature adeguate.
          </p>
        </div>
      </div>
    </div>
  );
}
