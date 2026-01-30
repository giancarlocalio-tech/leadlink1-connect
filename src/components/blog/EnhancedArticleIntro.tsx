import { BookOpen } from 'lucide-react';

// Generate extended intro based on article type
function getExtendedIntro(articleSlug: string, articleTitle: string, originalIntro: string): string {
  const lowerSlug = articleSlug.toLowerCase();
  const lowerTitle = articleTitle.toLowerCase();
  
  // WC / Water intasato
  if (lowerSlug.includes('wc') || lowerSlug.includes('water') || lowerTitle.includes('wc')) {
    return `Il WC intasato è uno dei problemi domestici più comuni e fastidiosi che può capitare in qualsiasi abitazione, dagli appartamenti in condominio alle case indipendenti. Questo tipo di ostruzione è particolarmente frequente negli edifici con tubature datate o in zone con acqua calcarea, e può essere causato da un uso eccessivo di carta igienica, oggetti caduti accidentalmente nel water, o accumuli di calcare nelle tubature. La buona notizia è che nella maggior parte dei casi puoi provare a risolvere il problema con metodi fai-da-te prima di chiamare un idraulico. In questa guida trovi tutti i rimedi efficaci da provare subito, ma anche i segnali che indicano quando è il momento di affidarsi a un professionista.`;
  }
  
  // Lavandino
  if (lowerSlug.includes('lavandino') || lowerTitle.includes('lavandino')) {
    return `Il lavandino intasato è un problema che prima o poi capita in tutte le case. Che sia il lavandino della cucina, bloccato da residui di cibo e grasso, o quello del bagno, ostruito da capelli e residui di sapone, si tratta di una situazione fastidiosa ma quasi sempre risolvibile senza dover chiamare un idraulico. Questo tipo di intasamento è particolarmente frequente nelle abitazioni con impianti datati o dove l'acqua è molto calcarea. Fortunatamente, esistono diversi metodi casalinghi efficaci che puoi provare subito. In questa guida completa troverai tutte le soluzioni fai-da-te, da quelle più semplici a quelle più incisive, ma anche le indicazioni precise su quando è meglio affidarsi a un professionista.`;
  }
  
  // Caldaia
  if (lowerSlug.includes('caldaia') || lowerTitle.includes('caldaia')) {
    return `La caldaia che non parte o va in blocco è un problema che genera sempre preoccupazione, soprattutto nei mesi invernali quando il riscaldamento è essenziale. Questo tipo di guasto è comune in tutte le tipologie di abitazione, dagli appartamenti alle villette, e può avere cause molto diverse: dalla semplice mancanza di pressione a problemi più seri del bruciatore o della scheda elettronica. Prima di chiamare un tecnico e affrontare i costi di un intervento, ci sono alcuni controlli che puoi fare da solo in sicurezza. In questa guida trovi tutti i passaggi per diagnosticare il problema e i rimedi che puoi provare, ma anche i segnali chiari che indicano quando serve assolutamente l'intervento di un professionista abilitato.`;
  }
  
  // Doccia
  if (lowerSlug.includes('doccia') || lowerTitle.includes('doccia')) {
    return `Lo scarico della doccia che non drena correttamente è un problema molto diffuso in appartamenti e case di ogni tipo. L'acqua che ristagna nel piatto doccia durante la doccia è il primo segnale di un'ostruzione in formazione, causata quasi sempre dall'accumulo di capelli, residui di sapone, shampoo e balsamo che formano un tappo nel sifone. Questo problema è particolarmente frequente in bagni con piatti doccia a raso pavimento o sifoni poco accessibili. La buona notizia è che nella maggior parte dei casi puoi risolvere da solo con metodi semplici ed efficaci. In questa guida trovi tutte le soluzioni pratiche da provare subito, e le indicazioni su quando invece è necessario chiamare un idraulico.`;
  }
  
  // Rubinetto
  if (lowerSlug.includes('rubinetto') || lowerTitle.includes('rubinetto')) {
    return `Il rubinetto che gocciola è uno di quei piccoli problemi domestici che tendiamo a ignorare, ma che può avere conseguenze serie: uno spreco d'acqua notevole (fino a 7.000 litri all'anno!) e un fastidioso "tic-tic" notturno. Questo tipo di guasto colpisce sia i vecchi rubinetti con vitone che i moderni miscelatori con cartuccia ceramica, ed è particolarmente comune nelle abitazioni con acqua calcarea che accelera l'usura delle guarnizioni. La buona notizia è che nella maggior parte dei casi puoi risolverlo da solo in pochi minuti, risparmiando sulla chiamata dell'idraulico. In questa guida trovi tutti i passaggi per fermare il gocciolamento, sia su rubinetti tradizionali che su miscelatori moderni.`;
  }
  
  // Tubo che perde
  if (lowerSlug.includes('tubo') || lowerSlug.includes('perdita') || lowerSlug.includes('allagamento')) {
    return `Un tubo che perde acqua è sempre un'emergenza che richiede un intervento immediato. Ogni minuto di ritardo significa litri d'acqua sprecata e potenziali danni gravi a pavimenti, muri, mobili e appartamenti sottostanti. Questo tipo di guasto può verificarsi in qualsiasi abitazione, ma è più frequente in edifici con tubature vecchie, in zone dove l'acqua è particolarmente calcarea, o dopo periodi di gelo intenso. La prima cosa da fare è sempre chiudere l'acqua per limitare i danni, poi puoi valutare se è possibile una riparazione temporanea in attesa dell'idraulico. In questa guida trovi le azioni da compiere immediatamente e le soluzioni di emergenza per contenere la perdita.`;
  }
  
  // Termosifone
  if (lowerSlug.includes('termosifone') || lowerSlug.includes('sfiata')) {
    return `I termosifoni che non scaldano bene o fanno rumore sono un problema comune in tutte le abitazioni con riscaldamento autonomo o centralizzato. La causa più frequente è l'aria che si accumula nell'impianto e impedisce all'acqua calda di circolare correttamente, creando zone fredde nei radiatori e gorgoglii nelle tubature. Questo fenomeno è particolarmente evidente a inizio stagione, dopo che l'impianto è rimasto fermo per mesi, ma può verificarsi anche durante l'inverno. Lo sfiato dei termosifoni è un'operazione semplice che puoi fare da solo in pochi minuti, risparmiando la chiamata del tecnico. In questa guida trovi tutti i passaggi per sfiatare correttamente i radiatori e i segnali che indicano quando serve invece un controllo professionale.`;
  }
  
  // Default: return enhanced version of original
  if (originalIntro && originalIntro.length > 50) {
    return `${originalIntro} Questo tipo di problema è molto comune nelle abitazioni italiane, sia in appartamento che in casa indipendente, e può avere diverse cause. Prima di chiamare un professionista, ci sono alcuni rimedi che puoi provare da solo. In questa guida trovi tutte le soluzioni pratiche, dai metodi più semplici a quelli più efficaci, insieme alle indicazioni su quando è invece necessario affidarsi a un idraulico qualificato.`;
  }
  
  return `Questo è un problema domestico comune che può capitare in qualsiasi tipo di abitazione. Prima di chiamare un professionista, esistono diversi metodi fai-da-te che puoi provare. In questa guida completa troverai tutte le soluzioni pratiche da provare subito, insieme ai segnali che indicano quando è il momento di affidarsi a un idraulico qualificato.`;
}

interface EnhancedArticleIntroProps {
  articleSlug: string;
  articleTitle: string;
  originalIntro: string;
  children?: React.ReactNode;
}

export function EnhancedArticleIntro({ 
  articleSlug, 
  articleTitle, 
  originalIntro,
  children 
}: EnhancedArticleIntroProps) {
  const extendedIntro = getExtendedIntro(articleSlug, articleTitle, originalIntro);
  
  return (
    <div className="bg-gradient-to-br from-muted/30 via-muted/50 to-muted/30 rounded-2xl p-6 md:p-8 border border-border/50 mb-8">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <BookOpen className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            {extendedIntro}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}
