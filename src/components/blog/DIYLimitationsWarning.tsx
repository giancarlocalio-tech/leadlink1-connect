import { AlertTriangle } from 'lucide-react';

// Get limitations based on article type
function getLimitations(articleSlug: string, articleTitle: string): string[] {
  const lowerSlug = articleSlug.toLowerCase();
  const lowerTitle = articleTitle.toLowerCase();
  
  // WC / Water
  if (lowerSlug.includes('wc') || lowerSlug.includes('water') || lowerTitle.includes('wc')) {
    return [
      'Il blocco è totale e l\'acqua non defluisce affatto',
      'L\'acqua risale o trabocca dal WC',
      'L\'ostruzione è nelle tubature principali del condominio',
      'Il problema si ripresenta frequentemente'
    ];
  }
  
  // Lavandino
  if (lowerSlug.includes('lavandino') || lowerTitle.includes('lavandino')) {
    return [
      'Lo scarico è completamente bloccato',
      'Senti cattivo odore di fogna dalla tubatura',
      'L\'acqua risale da altri scarichi della casa',
      'Il problema riguarda più lavandini contemporaneamente'
    ];
  }
  
  // Caldaia
  if (lowerSlug.includes('caldaia') || lowerTitle.includes('caldaia')) {
    return [
      'Senti odore di gas (chiama subito il pronto intervento)',
      'La caldaia perde acqua abbondantemente',
      'Il display mostra un codice errore grave',
      'La caldaia fa rumori anomali forti o continui'
    ];
  }
  
  // Doccia
  if (lowerSlug.includes('doccia') || lowerTitle.includes('doccia')) {
    return [
      'Lo scarico è completamente bloccato',
      'L\'acqua ristagna anche dopo i tentativi fai-da-te',
      'Il problema è nel sifone incassato o nelle tubature',
      'Noti macchie di umidità sotto il piatto doccia'
    ];
  }
  
  // Rubinetto
  if (lowerSlug.includes('rubinetto') || lowerTitle.includes('rubinetto')) {
    return [
      'I componenti sono troppo ossidati per svitarli',
      'La sede della valvola è visibilmente corrosa',
      'Ci sono perdite dai raccordi o dalla base',
      'Il miscelatore è un modello particolare o di marca'
    ];
  }
  
  // Tubo che perde
  if (lowerSlug.includes('tubo') || lowerSlug.includes('perdita') || lowerSlug.includes('allagamento')) {
    return [
      'La perdita è abbondante e continua',
      'Il tubo è nel muro o sotto il pavimento',
      'La tubatura è molto vecchia o in piombo',
      'Ci sono più perdite in punti diversi'
    ];
  }
  
  // Termosifone
  if (lowerSlug.includes('termosifone') || lowerSlug.includes('sfiata')) {
    return [
      'Devi sfiatare i termosifoni molto spesso',
      'Il termosifone resta freddo anche dopo lo sfiato',
      'La caldaia va in blocco per bassa pressione',
      'Noti perdite d\'acqua dall\'impianto'
    ];
  }
  
  // Default
  return [
    'Il problema è grave o in peggioramento',
    'I metodi fai-da-te non hanno funzionato',
    'Ci sono rischi per la sicurezza',
    'Il danno potrebbe estendersi ad altre zone'
  ];
}

interface DIYLimitationsWarningProps {
  articleSlug: string;
  articleTitle: string;
}

export function DIYLimitationsWarning({ articleSlug, articleTitle }: DIYLimitationsWarningProps) {
  const limitations = getLimitations(articleSlug, articleTitle);
  
  return (
    <div className="my-8 p-5 bg-accent/30 border border-accent rounded-xl">
      <div className="flex items-start gap-3">
        <div className="shrink-0 w-10 h-10 rounded-full bg-accent flex items-center justify-center">
          <AlertTriangle className="h-5 w-5 text-accent-foreground" />
        </div>
        <div>
          <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
            ⚠️ Questi metodi NON funzionano se:
          </h3>
          <ul className="space-y-2">
            {limitations.map((limitation, index) => (
              <li key={index} className="flex items-start gap-2 text-muted-foreground">
                <span className="text-destructive mt-0.5">✗</span>
                <span>{limitation}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground italic">
            In questi casi, è consigliabile chiamare un idraulico professionista per evitare danni maggiori.
          </p>
        </div>
      </div>
    </div>
  );
}
