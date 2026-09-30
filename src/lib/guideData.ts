/**
 * Guide Data - SEO-optimized problem guides
 * 
 * Structure per guida:
 * - H1
 * - Indice interno (anchor links)
 * - Sezioni H2: Gravità, Cosa fare subito, Cosa NON fare, Quando chiamare
 * - CTA finale con link città
 * - Schema.org Article
 */

export interface GuideSection {
  id: string;
  title: string;
  content: string; // HTML content
}

export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  excerpt: string;
  category: 'perdite' | 'scarichi' | 'caldaie' | 'sanitari' | 'emergenze' | 'manutenzione';
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  sections: {
    gravity: GuideSection;      // Quanto è grave il problema
    immediateActions: GuideSection; // Cosa puoi fare subito
    whatNotToDo: GuideSection;  // Cosa NON fare
    whenToCall: GuideSection;   // Quando chiamare un idraulico
  };
  relatedServices: string[]; // Related CORE_SERVICES slugs
}

export interface GuideCategory {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export const GUIDE_CATEGORIES: GuideCategory[] = [
  {
    slug: 'perdite',
    name: 'Perdite d\'Acqua',
    description: 'Guide per gestire perdite e infiltrazioni',
    icon: 'Droplets'
  },
  {
    slug: 'scarichi',
    name: 'Scarichi Intasati',
    description: 'Come affrontare ostruzioni e intasamenti',
    icon: 'Trash2'
  },
  {
    slug: 'caldaie',
    name: 'Problemi Caldaie',
    description: 'Guasti, blocchi e manutenzione caldaie',
    icon: 'Flame'
  },
  {
    slug: 'sanitari',
    name: 'Sanitari e Rubinetti',
    description: 'Problemi con WC, lavabi, docce e rubinetti',
    icon: 'ShowerHead'
  },
  {
    slug: 'emergenze',
    name: 'Emergenze Idrauliche',
    description: 'Situazioni urgenti che richiedono intervento rapido',
    icon: 'AlertTriangle'
  },
  {
    slug: 'manutenzione',
    name: 'Manutenzione Preventiva',
    description: 'Consigli per prevenire problemi idraulici',
    icon: 'Wrench'
  }
];

import { PERDITE_GUIDES, SCARICHI_GUIDES, CALDAIE_GUIDES } from './guidesExpanded';

export const GUIDES: Guide[] = [
  // ============ PERDITE ============
  {
    slug: 'perdita-acqua-tubo-muro',
    title: 'Perdita d\'Acqua dal Muro: Cosa Fare Subito',
    metaTitle: 'Perdita Acqua dal Muro: Guida Completa | Cosa Fare e Quando Chiamare',
    metaDescription: 'Hai notato una perdita d\'acqua dal muro? Scopri quanto è grave, cosa fare subito, gli errori da evitare e quando chiamare un idraulico professionista.',
    h1: 'Perdita d\'Acqua dal Muro: Guida Completa',
    excerpt: 'Una macchia umida sul muro può indicare una perdita nascosta. Ecco come valutare la gravità e intervenire correttamente.',
    category: 'perdite',
    tags: ['perdita acqua', 'tubo nel muro', 'infiltrazione', 'emergenza idraulica'],
    publishedAt: '2026-01-15',
    updatedAt: '2026-01-27',
    readingTime: 7,
    relatedServices: ['riparazione-perdite', 'pronto-intervento'],
    sections: {
      gravity: {
        id: 'quanto-grave',
        title: 'Quanto è Grave il Problema',
        content: `
          <p>Una perdita dal muro è quasi sempre un problema <strong>serio</strong> che richiede attenzione immediata. La gravità dipende da diversi fattori:</p>
          
          <h3>🔴 Situazione Grave</h3>
          <ul>
            <li>Acqua che gocciola visibilmente o scorre lungo il muro</li>
            <li>Macchia che si espande rapidamente</li>
            <li>Muro bagnato al tatto</li>
            <li>Pavimento bagnato sotto il muro</li>
            <li>Bolletta dell'acqua improvvisamente aumentata</li>
          </ul>
          
          <h3>🟡 Situazione Moderata</h3>
          <ul>
            <li>Piccola macchia di umidità che non cresce</li>
            <li>Macchia che appare solo in determinate condizioni (es. dopo pioggia)</li>
            <li>Lieve alone senza bagnato evidente</li>
          </ul>
          
          <h3>Perché è Urgente</h3>
          <p>L'acqua che infiltra nel muro può causare:</p>
          <ul>
            <li><strong>Danni strutturali</strong>: indebolimento del muro, distacco intonaco</li>
            <li><strong>Muffa</strong>: pericolosa per la salute, specialmente con bambini o anziani</li>
            <li><strong>Danni elettrici</strong>: cortocircuiti se l'acqua raggiunge cavi</li>
            <li><strong>Danni a appartamenti vicini</strong>: responsabilità civile</li>
          </ul>
        `
      },
      immediateActions: {
        id: 'cosa-fare-subito',
        title: 'Cosa Puoi Fare Subito',
        content: `
          <p>Ecco le azioni immediate da compiere appena noti una perdita dal muro:</p>
          
          <h3>1. Chiudi l'Acqua Generale</h3>
          <p>Se la perdita è evidente e abbondante, <strong>chiudi immediatamente la valvola generale</strong> dell'acqua. Si trova solitamente:</p>
          <ul>
            <li>Vicino al contatore</li>
            <li>In un vano tecnico sul pianerottolo</li>
            <li>Sotto il lavello della cucina</li>
          </ul>
          
          <h3>2. Documenta il Danno</h3>
          <p>Scatta foto e video della zona interessata. Questo sarà utile per:</p>
          <ul>
            <li>L'idraulico che dovrà intervenire</li>
            <li>L'assicurazione (se hai una polizza casa)</li>
            <li>Eventuali controversie con vicini</li>
          </ul>
          
          <h3>3. Proteggi Mobili e Oggetti</h3>
          <p>Allontana tutto ciò che può essere danneggiato dall'acqua:</p>
          <ul>
            <li>Mobili di legno</li>
            <li>Tappeti e tessuti</li>
            <li>Apparecchi elettronici</li>
            <li>Documenti importanti</li>
          </ul>
          
          <h3>4. Individua la Fonte</h3>
          <p>Se possibile, cerca di capire da dove proviene l'acqua:</p>
          <ul>
            <li>Il muro è in bagno/cucina? Potrebbe essere un tubo di scarico o adduzione</li>
            <li>Il muro è esterno? Potrebbe essere infiltrazione piovana</li>
            <li>Il muro è condiviso con un vicino? La perdita potrebbe venire dal loro appartamento</li>
          </ul>
        `
      },
      whatNotToDo: {
        id: 'cosa-non-fare',
        title: 'Cosa NON Fare',
        content: `
          <p>Alcuni interventi "fai da te" possono peggiorare la situazione:</p>
          
          <h3>❌ Non Bucare il Muro</h3>
          <p>Resistete alla tentazione di forare per "vedere cosa c'è dentro". Potresti:</p>
          <ul>
            <li>Danneggiare ulteriormente il tubo</li>
            <li>Creare un percorso per l'acqua verso altre zone</li>
            <li>Colpire cavi elettrici</li>
          </ul>
          
          <h3>❌ Non Usare Stucco o Sigillanti</h3>
          <p>Coprire la macchia con stucco non risolve il problema, lo nasconde solo temporaneamente mentre il danno continua a propagarsi.</p>
          
          <h3>❌ Non Ignorare il Problema</h3>
          <p>Anche una piccola macchia può indicare una perdita importante. L'acqua trova sempre il percorso di minore resistenza, quindi potrebbe filtrare per metri prima di manifestarsi.</p>
          
          <h3>❌ Non Usare Asciugacapelli o Stufe</h3>
          <p>Tentare di "asciugare" il muro con calore forzato può:</p>
          <ul>
            <li>Danneggiare la vernice e l'intonaco</li>
            <li>Creare crepe termiche</li>
            <li>Non risolvere il problema alla fonte</li>
          </ul>
        `
      },
      whenToCall: {
        id: 'quando-chiamare',
        title: 'Quando Chiamare un Idraulico',
        content: `
          <p><strong>In caso di perdita dal muro, è sempre consigliabile chiamare un professionista.</strong> Tuttavia, l'urgenza varia:</p>
          
          <h3>🚨 Chiama Subito (Emergenza)</h3>
          <ul>
            <li>Acqua che gocciola o scorre visibilmente</li>
            <li>Muro completamente bagnato</li>
            <li>Perdita vicino a prese elettriche</li>
            <li>Acqua che sta raggiungendo il pavimento</li>
            <li>Perdita in appartamento con vicini sotto</li>
          </ul>
          
          <h3>📞 Chiama Entro 24 Ore</h3>
          <ul>
            <li>Macchia umida che non cresce rapidamente</li>
            <li>Aumento anomalo della bolletta senza perdite visibili</li>
            <li>Rumore di acqua nelle tubature quando tutto è chiuso</li>
          </ul>
          
          <h3>📅 Pianifica un Controllo</h3>
          <ul>
            <li>Piccola macchia stabile da tempo</li>
            <li>Dubbi sulla provenienza dell'umidità</li>
          </ul>
          
          <h3>Cosa Aspettarsi dall'Idraulico</h3>
          <p>Un professionista esperto utilizzerà:</p>
          <ul>
            <li><strong>Rilevatore di umidità</strong>: per mappare l'estensione del danno</li>
            <li><strong>Termocamera</strong>: per individuare tubazioni nascoste</li>
            <li><strong>Geofono</strong>: per localizzare perdite dal rumore</li>
            <li><strong>Videoispezione</strong>: per esaminare l'interno dei tubi</li>
          </ul>
        `
      }
    }
  },
  {
    slug: 'rubinetto-perde-acqua-goccia',
    title: 'Rubinetto che Gocciola: Cause e Soluzioni',
    metaTitle: 'Rubinetto che Perde Acqua: Cosa Fare | Guida Completa',
    metaDescription: 'Il tuo rubinetto gocciola continuamente? Scopri le cause, quanto costa ignorarlo, e quando è il momento di chiamare un professionista.',
    h1: 'Rubinetto che Perde Acqua a Gocce',
    excerpt: 'Un rubinetto che gocciola sembra un problema banale, ma può sprecare fino a 20 litri al giorno. Ecco come valutarlo.',
    category: 'sanitari',
    tags: ['rubinetto gocciola', 'spreco acqua', 'guarnizione', 'riparazione'],
    publishedAt: '2026-01-10',
    updatedAt: '2026-01-27',
    readingTime: 5,
    relatedServices: ['riparazione-perdite', 'installazione-sanitari'],
    sections: {
      gravity: {
        id: 'quanto-grave',
        title: 'Quanto è Grave il Problema',
        content: `
          <p>Un rubinetto che gocciola può sembrare un fastidio minore, ma ecco i numeri reali:</p>
          
          <h3>💧 Lo Spreco Reale</h3>
          <ul>
            <li><strong>1 goccia al secondo</strong> = 20 litri al giorno = 7.300 litri all'anno</li>
            <li><strong>2 gocce al secondo</strong> = 40 litri al giorno = 14.600 litri all'anno</li>
            <li><strong>Filo continuo</strong> = 200+ litri al giorno = 73.000 litri all'anno</li>
          </ul>
          
          <h3>💰 Impatto sulla Bolletta</h3>
          <p>Con un costo medio dell'acqua di 2€/metro cubo:</p>
          <ul>
            <li>7.300 litri/anno = <strong>~15€ in più</strong> sulla bolletta</li>
            <li>73.000 litri/anno = <strong>~150€ in più</strong> sulla bolletta</li>
          </ul>
          
          <h3>🔴 Segnale di Usura</h3>
          <p>Il gocciolamento indica che componenti interni sono usurati. Se non riparato, il problema tende a peggiorare.</p>
        `
      },
      immediateActions: {
        id: 'cosa-fare-subito',
        title: 'Cosa Puoi Fare Subito',
        content: `
          <h3>1. Identifica il Tipo di Rubinetto</h3>
          <ul>
            <li><strong>Rubinetto a vitone</strong> (manopole separate caldo/freddo): ha guarnizioni in gomma sostituibili</li>
            <li><strong>Miscelatore monocomando</strong> (leva unica): ha una cartuccia ceramica interna</li>
          </ul>
          
          <h3>2. Verifica la Causa</h3>
          <ul>
            <li><strong>Gocciola dal beccuccio</strong>: guarnizione o cartuccia usurata</li>
            <li><strong>Gocciola dalla base</strong>: O-ring danneggiato o dado allentato</li>
            <li><strong>Gocciola dalla manopola</strong>: guarnizione del vitone da sostituire</li>
          </ul>
          
          <h3>3. Prova Fai-da-Te (Solo per Esperti)</h3>
          <p>Se hai esperienza con lavori idraulici:</p>
          <ol>
            <li>Chiudi l'acqua sotto il lavello</li>
            <li>Smonta la manopola o la leva</li>
            <li>Estrai il vitone o la cartuccia</li>
            <li>Porta il pezzo in ferramenta per trovare il ricambio compatibile</li>
            <li>Sostituisci e rimonta</li>
          </ol>
        `
      },
      whatNotToDo: {
        id: 'cosa-non-fare',
        title: 'Cosa NON Fare',
        content: `
          <h3>❌ Non Stringere Troppo le Manopole</h3>
          <p>Forzare la chiusura danneggia ulteriormente le guarnizioni e la sede del rubinetto.</p>
          
          <h3>❌ Non Usare Prodotti Chimici Sigillanti</h3>
          <p>Spray o paste "blocca-perdite" non funzionano per i rubinetti e possono danneggiare le componenti interne.</p>
          
          <h3>❌ Non Ignorare per Mesi</h3>
          <p>Un gocciolamento trascurato può:</p>
          <ul>
            <li>Lasciare macchie di calcare permanenti</li>
            <li>Corrodere il lavello in acciaio</li>
            <li>Danneggiare il mobile sottostante</li>
            <li>Evolvere in perdita più grave</li>
          </ul>
          
          <h3>❌ Non Smontare Senza Chiudere l'Acqua</h3>
          <p>Sembra ovvio, ma dimenticare di chiudere la valvola prima di smontare causa allagamenti.</p>
        `
      },
      whenToCall: {
        id: 'quando-chiamare',
        title: 'Quando Chiamare un Idraulico',
        content: `
          <h3>📞 Chiama un Professionista Se:</h3>
          <ul>
            <li>Non riesci a trovare il ricambio compatibile</li>
            <li>Dopo la sostituzione continua a gocciolare</li>
            <li>Il rubinetto è vecchio e le valvole sono bloccate</li>
            <li>Non ti senti sicuro nel fai-da-te</li>
            <li>Si tratta di un rubinetto da incasso nel muro</li>
          </ul>
          
          <h3>💡 Valuta la Sostituzione Completa</h3>
          <p>A volte riparare un rubinetto vecchio costa più della sostituzione con uno nuovo. Un idraulico può consigliarti la soluzione più conveniente.</p>
          
          <h3>💰 Costi Indicativi</h3>
          <ul>
            <li><strong>Sostituzione guarnizione</strong>: 30-60€</li>
            <li><strong>Sostituzione cartuccia</strong>: 50-100€</li>
            <li><strong>Installazione rubinetto nuovo</strong>: 60-120€ (escluso materiale)</li>
          </ul>
        `
      }
    }
  },
  {
    slug: 'wc-intasato-non-scarica',
    title: 'WC Intasato che Non Scarica: Guida Completa',
    metaTitle: 'WC Intasato che Non Scarica: Cosa Fare | Soluzioni Efficaci',
    metaDescription: 'Il WC è intasato e non scarica? Scopri quanto è grave, i rimedi immediati, cosa NON fare e quando è necessario l\'intervento di un idraulico.',
    h1: 'WC Intasato che Non Scarica: Cosa Fare',
    excerpt: 'Un WC che non scarica è un problema urgente. Ecco come valutare la situazione e intervenire correttamente.',
    category: 'scarichi',
    tags: ['wc intasato', 'scarico bloccato', 'water otturato', 'disostruzione'],
    publishedAt: '2026-01-12',
    updatedAt: '2026-01-27',
    readingTime: 6,
    relatedServices: ['spurgo-scarichi', 'pronto-intervento'],
    sections: {
      gravity: {
        id: 'quanto-grave',
        title: 'Quanto è Grave il Problema',
        content: `
          <p>L'urgenza di un WC intasato dipende dalla situazione:</p>
          
          <h3>🔴 Emergenza - Agire Subito</h3>
          <ul>
            <li>L'acqua sale quasi fino al bordo dopo lo scarico</li>
            <li>C'è un solo WC in casa</li>
            <li>Fuoriesce acqua sul pavimento</li>
            <li>Risalita di liquami nello scarico doccia/vasca</li>
          </ul>
          
          <h3>🟡 Urgente - Risolvere Oggi</h3>
          <ul>
            <li>Lo scarico è molto lento ma funziona</li>
            <li>Hai un altro WC disponibile</li>
            <li>Si tratta di un intasamento parziale</li>
          </ul>
          
          <h3>⚠️ Segnali di Problema Grave</h3>
          <ul>
            <li>Odore di fogna persistente</li>
            <li>Gorgoglii quando scarichi altri sanitari</li>
            <li>Problema ricorrente nonostante le disostruzioni</li>
          </ul>
        `
      },
      immediateActions: {
        id: 'cosa-fare-subito',
        title: 'Cosa Puoi Fare Subito',
        content: `
          <h3>1. Non Tirare Più lo Scarico</h3>
          <p>Se l'acqua sale, smetti immediatamente di scaricare. Ogni tentativo peggiora la situazione e rischia di causare tracimazione.</p>
          
          <h3>2. Usa lo Sturalavandini (Ventosa)</h3>
          <p>La ventosa per WC è diversa da quella per lavandini - ha una forma a campana:</p>
          <ol>
            <li>Inserisci la ventosa nel fondo della tazza</li>
            <li>Assicurati che ci sia abbastanza acqua da coprire la gomma</li>
            <li>Pompa energicamente per 20-30 secondi</li>
            <li>Ripeti più volte</li>
          </ol>
          
          <h3>3. Metodo dell'Acqua Calda</h3>
          <p>Per intasamenti leggeri da materiale organico:</p>
          <ol>
            <li>Versa un secchio di acqua molto calda (non bollente) da altezza</li>
            <li>Aggiungi una tazza di detersivo per piatti</li>
            <li>Attendi 15-20 minuti</li>
            <li>Riprova con la ventosa</li>
          </ol>
          
          <h3>4. Sonda Flessibile</h3>
          <p>Se hai una sonda idraulica (si trova nei negozi bricolage):</p>
          <ol>
            <li>Inserisci delicatamente la sonda nel sifone</li>
            <li>Ruota mentre spingi per aggirare le curve</li>
            <li>Quando senti resistenza, continua a ruotare per rompere l'ostruzione</li>
          </ol>
        `
      },
      whatNotToDo: {
        id: 'cosa-non-fare',
        title: 'Cosa NON Fare',
        content: `
          <h3>❌ Non Usare Disgorganti Chimici Aggressivi</h3>
          <p>Prodotti a base di acido solforico o soda caustica concentrata:</p>
          <ul>
            <li>Possono danneggiare le tubature in PVC</li>
            <li>Sono pericolosi da maneggiare</li>
            <li>Rendono più difficile l'intervento dell'idraulico</li>
            <li>Possono causare schizzi pericolosi se usati dopo altri prodotti</li>
          </ul>
          
          <h3>❌ Non Gettare Oggetti per "Spingere"</h3>
          <p>Infilare manici di scopa o altri oggetti può:</p>
          <ul>
            <li>Spingere l'ostruzione più in profondità</li>
            <li>Graffiare o rompere la ceramica</li>
            <li>Restare incastrato peggiorando tutto</li>
          </ul>
          
          <h3>❌ Non Continuare a Scaricare</h3>
          <p>Ogni scarico con WC intasato aumenta il rischio di tracimazione e danni al pavimento.</p>
          
          <h3>❌ Non Smontare il WC da Solo</h3>
          <p>Senza esperienza rischi di:</p>
          <ul>
            <li>Rompere la guarnizione di cera</li>
            <li>Danneggiare la ceramica</li>
            <li>Creare perdite alla base</li>
          </ul>
        `
      },
      whenToCall: {
        id: 'quando-chiamare',
        title: 'Quando Chiamare un Idraulico',
        content: `
          <h3>🚨 Chiama Subito Se:</h3>
          <ul>
            <li>L'acqua sta per tracimare o è già tracimata</li>
            <li>Risalita di liquami in altri scarichi (doccia, vasca, bidet)</li>
            <li>È l'unico WC di casa</li>
            <li>Sospetti sia caduto un oggetto solido (giocattolo, spazzola, etc.)</li>
          </ul>
          
          <h3>📞 Chiama Entro Oggi Se:</h3>
          <ul>
            <li>La ventosa non ha funzionato dopo più tentativi</li>
            <li>Lo scarico è ancora molto lento</li>
            <li>Il problema si ripresenta frequentemente</li>
          </ul>
          
          <h3>🔧 Cosa Farà l'Idraulico</h3>
          <ul>
            <li><strong>Sonda professionale motorizzata</strong>: raggiunge ostruzioni profonde</li>
            <li><strong>Idrogetto ad alta pressione</strong>: per intasamenti resistenti</li>
            <li><strong>Videoispezione</strong>: per capire la causa del problema ricorrente</li>
          </ul>
          
          <h3>💰 Costi Indicativi</h3>
          <ul>
            <li><strong>Disostruzione semplice</strong>: 60-100€</li>
            <li><strong>Disostruzione con sonda</strong>: 80-150€</li>
            <li><strong>Intervento con idrogetto</strong>: 150-300€</li>
          </ul>
        `
      }
    }
  },
  {
    slug: 'caldaia-non-parte-blocco',
    title: 'Caldaia Non Si Accende o Va in Blocco: Cosa Fare',
    metaTitle: 'Caldaia Non Parte o in Blocco: Cause e Soluzioni | Guida 2026',
    metaDescription: 'La caldaia non si accende o va in blocco? Scopri le cause comuni, cosa puoi controllare da solo e quando chiamare un tecnico.',
    h1: 'Caldaia Non Si Accende o Va in Blocco',
    excerpt: 'Caldaia in blocco d\'inverno? Ecco i controlli da fare prima di chiamare il tecnico e quando invece serve assistenza professionale.',
    category: 'caldaie',
    tags: ['caldaia blocco', 'caldaia non parte', 'errore caldaia', 'manutenzione caldaia'],
    publishedAt: '2026-01-08',
    updatedAt: '2026-01-27',
    readingTime: 8,
    relatedServices: ['manutenzione-caldaie', 'pronto-intervento'],
    sections: {
      gravity: {
        id: 'quanto-grave',
        title: 'Quanto è Grave il Problema',
        content: `
          <p>Una caldaia che non parte può avere cause semplici o indicare problemi seri:</p>
          
          <h3>🟢 Probabilmente Risolvibile da Solo</h3>
          <ul>
            <li>Display spento o con codice errore</li>
            <li>Caldaia che si blocca occasionalmente</li>
            <li>Problema comparso dopo un blackout</li>
            <li>Pressione dell'impianto bassa (manometro sotto 1 bar)</li>
          </ul>
          
          <h3>🟡 Serve Tecnico ma Non Urgentissimo</h3>
          <ul>
            <li>Caldaia che parte ma si spegne subito</li>
            <li>Acqua calda OK ma riscaldamento no (o viceversa)</li>
            <li>Errore ricorrente dopo ogni sblocco</li>
            <li>Manutenzione scaduta da oltre 2 anni</li>
          </ul>
          
          <h3>🔴 Situazione Potenzialmente Pericolosa</h3>
          <ul>
            <li>Odore di gas vicino alla caldaia</li>
            <li>Perdita d'acqua dalla caldaia</li>
            <li>Rumori anomali (fischi, scoppiettii, vibrazioni)</li>
            <li>Fumo o vapore anomalo</li>
          </ul>
          <p><strong>⚠️ In caso di odore di gas: apri le finestre, non usare interruttori elettrici, esci e chiama i Vigili del Fuoco.</strong></p>
        `
      },
      immediateActions: {
        id: 'cosa-fare-subito',
        title: 'Cosa Puoi Fare Subito',
        content: `
          <h3>1. Controlla l'Alimentazione</h3>
          <ul>
            <li>Verifica che l'interruttore della caldaia sia acceso</li>
            <li>Controlla che non sia saltato un fusibile</li>
            <li>Verifica che il termostato ambiente sia impostato correttamente</li>
          </ul>
          
          <h3>2. Leggi il Codice Errore</h3>
          <p>Il display mostra solitamente un codice (es. E01, F28, etc.):</p>
          <ul>
            <li>Cerca il codice nel libretto istruzioni</li>
            <li>Oppure cercalo su Google insieme al modello della caldaia</li>
          </ul>
          
          <h3>3. Prova il Reset</h3>
          <p>La maggior parte delle caldaie ha un pulsante di reset (solitamente rosso o con simbolo R):</p>
          <ol>
            <li>Tieni premuto per 3-5 secondi</li>
            <li>Attendi che la caldaia riprovi a partire</li>
            <li>Se va in blocco di nuovo, non ripetere più di 2-3 volte</li>
          </ol>
          
          <h3>4. Controlla la Pressione</h3>
          <p>Il manometro deve indicare tra 1 e 1,5 bar a freddo:</p>
          <ol>
            <li>Se è sotto 1 bar: apri il rubinetto di carico (solitamente sotto la caldaia)</li>
            <li>Riempi lentamente guardando il manometro</li>
            <li>Chiudi quando raggiunge 1,2-1,3 bar</li>
          </ol>
          
          <h3>5. Verifica il Gas</h3>
          <ul>
            <li>Il rubinetto del gas è aperto?</li>
            <li>I fornelli funzionano? Se sì, il gas arriva</li>
            <li>Hai pagato le bollette? (Alcuni fornitori sospendono dopo più insoluti)</li>
          </ul>
        `
      },
      whatNotToDo: {
        id: 'cosa-non-fare',
        title: 'Cosa NON Fare',
        content: `
          <h3>❌ Non Aprire la Caldaia</h3>
          <p>L'interno della caldaia contiene:</p>
          <ul>
            <li>Componenti elettrici ad alta tensione</li>
            <li>Connessioni del gas</li>
            <li>Parti calde anche dopo lo spegnimento</li>
          </ul>
          <p>Aprirla senza qualifica può essere pericoloso e invalida la garanzia.</p>
          
          <h3>❌ Non Resettare all'Infinito</h3>
          <p>Se la caldaia va in blocco dopo ogni reset, c'è un problema reale. Continuare a resettare può:</p>
          <ul>
            <li>Danneggiare componenti</li>
            <li>Creare situazioni pericolose</li>
            <li>Far ignorare alla caldaia protezioni di sicurezza</li>
          </ul>
          
          <h3>❌ Non Bypassare i Dispositivi di Sicurezza</h3>
          <p>Mai "ingannare" termostati, pressostati o altri dispositivi di sicurezza. Esistono per prevenire incidenti gravi.</p>
          
          <h3>❌ Non Usare la Caldaia se C'è Perdita</h3>
          <p>Acqua e corrente elettrica sono una combinazione pericolosa. Inoltre l'acqua potrebbe infiltrarsi nella scheda elettronica.</p>
        `
      },
      whenToCall: {
        id: 'quando-chiamare',
        title: 'Quando Chiamare un Tecnico',
        content: `
          <h3>🚨 Chiama Immediatamente Se:</h3>
          <ul>
            <li>Senti odore di gas</li>
            <li>C'è una perdita d'acqua dalla caldaia</li>
            <li>Esce fumo dalla caldaia</li>
            <li>Senti rumori preoccupanti</li>
          </ul>
          
          <h3>📞 Chiama Entro 24 Ore Se:</h3>
          <ul>
            <li>I controlli fai-da-te non hanno risolto</li>
            <li>La caldaia va in blocco ripetutamente</li>
            <li>È inverno e sei senza riscaldamento</li>
            <li>Hai bambini piccoli o anziani in casa</li>
          </ul>
          
          <h3>📅 Pianifica un Appuntamento Se:</h3>
          <ul>
            <li>La manutenzione è scaduta</li>
            <li>La caldaia funziona ma con prestazioni ridotte</li>
            <li>Vuoi un controllo preventivo prima dell'inverno</li>
          </ul>
          
          <h3>💰 Costi Indicativi</h3>
          <ul>
            <li><strong>Chiamata + diagnosi</strong>: 50-80€</li>
            <li><strong>Manutenzione ordinaria</strong>: 80-120€</li>
            <li><strong>Sostituzione scheda elettronica</strong>: 200-400€</li>
            <li><strong>Sostituzione scambiatore</strong>: 300-600€</li>
          </ul>
        `
      }
    }
  },
  {
    slug: 'scarico-lento-lavandino',
    title: 'Scarico Lento del Lavandino: Cause e Rimedi',
    metaTitle: 'Scarico Lento Lavandino: Come Risolvere | Guida Pratica',
    metaDescription: 'Il lavandino scarica lentamente? Scopri le cause più comuni, i rimedi fai-da-te efficaci e quando serve l\'intervento di un professionista.',
    h1: 'Scarico Lento del Lavandino: Cause e Soluzioni',
    excerpt: 'Uno scarico lento è spesso il primo segnale di un\'ostruzione in formazione. Ecco come intervenire prima che diventi un blocco totale.',
    category: 'scarichi',
    tags: ['scarico lento', 'lavandino', 'intasamento', 'sifone'],
    publishedAt: '2026-01-05',
    updatedAt: '2026-01-27',
    readingTime: 5,
    relatedServices: ['spurgo-scarichi', 'riparazione-perdite'],
    sections: {
      gravity: {
        id: 'quanto-grave',
        title: 'Quanto è Grave il Problema',
        content: `
          <p>Uno scarico lento è un problema progressivo che tende a peggiorare:</p>
          
          <h3>🟢 Fase Iniziale - Facile da Risolvere</h3>
          <ul>
            <li>L'acqua impiega qualche secondo in più a scendere</li>
            <li>Il problema è recente (giorni)</li>
            <li>Solo un lavandino è interessato</li>
          </ul>
          
          <h3>🟡 Fase Intermedia - Intervento Consigliato</h3>
          <ul>
            <li>L'acqua ristagna per secondi prima di scendere</li>
            <li>Odori sgradevoli dallo scarico</li>
            <li>Il problema peggiora settimana dopo settimana</li>
          </ul>
          
          <h3>🔴 Fase Avanzata - Ostruzione Imminente</h3>
          <ul>
            <li>L'acqua impiega minuti a defluire</li>
            <li>Gorgoglii o rumori dallo scarico</li>
            <li>Più scarichi della casa sono lenti</li>
          </ul>
        `
      },
      immediateActions: {
        id: 'cosa-fare-subito',
        title: 'Cosa Puoi Fare Subito',
        content: `
          <h3>1. Rimuovi la Griglia e Pulisci</h3>
          <p>Spesso l'ostruzione è proprio all'ingresso:</p>
          <ul>
            <li>Togli la griglia o il tappo</li>
            <li>Rimuovi capelli e detriti visibili</li>
            <li>Usa un vecchio spazzolino per pulire i bordi</li>
          </ul>
          
          <h3>2. Metodo Bicarbonato + Aceto</h3>
          <ol>
            <li>Versa mezza tazza di bicarbonato nello scarico</li>
            <li>Aggiungi mezza tazza di aceto bianco</li>
            <li>Copri lo scarico con uno straccio umido</li>
            <li>Attendi 30 minuti</li>
            <li>Risciacqua con acqua bollente</li>
          </ol>
          
          <h3>3. Acqua Bollente</h3>
          <p>Per grassi e sapone accumulato:</p>
          <ol>
            <li>Porta a bollore 2 litri d'acqua</li>
            <li>Versa lentamente nello scarico</li>
            <li>Attendi 5 minuti</li>
            <li>Ripeti se necessario</li>
          </ol>
          
          <h3>4. Pulisci il Sifone</h3>
          <p>Se i metodi precedenti non funzionano:</p>
          <ol>
            <li>Metti una bacinella sotto il sifone</li>
            <li>Svita i raccordi (di solito a mano)</li>
            <li>Pulisci l'interno del sifone</li>
            <li>Controlla che non ci siano oggetti (anelli, tappi, etc.)</li>
            <li>Rimonta e verifica che non ci siano perdite</li>
          </ol>
        `
      },
      whatNotToDo: {
        id: 'cosa-non-fare',
        title: 'Cosa NON Fare',
        content: `
          <h3>❌ Non Usare Disgorganti Chimici Regolarmente</h3>
          <p>I prodotti chimici aggressivi:</p>
          <ul>
            <li>Corrodono le tubazioni nel tempo</li>
            <li>Sono tossici e pericolosi</li>
            <li>Mascherano il problema senza risolverlo</li>
          </ul>
          
          <h3>❌ Non Ignorare il Problema</h3>
          <p>Uno scarico lento oggi sarà intasato domani. Intervenire subito è più semplice e meno costoso.</p>
          
          <h3>❌ Non Spingere Oggetti nello Scarico</h3>
          <p>Infilare fili di ferro, bastoncini o altri oggetti può:</p>
          <ul>
            <li>Graffiare le tubature</li>
            <li>Spingere l'ostruzione più in profondità</li>
            <li>Restare incastrato</li>
          </ul>
          
          <h3>❌ Non Usare Troppa Forza sul Sifone</h3>
          <p>I sifoni in plastica sono fragili. Se non si svita facilmente, potrebbe essere calcificato - meglio chiamare un professionista.</p>
        `
      },
      whenToCall: {
        id: 'quando-chiamare',
        title: 'Quando Chiamare un Idraulico',
        content: `
          <h3>📞 Chiama Se:</h3>
          <ul>
            <li>I rimedi fai-da-te non hanno migliorato la situazione</li>
            <li>Più scarichi sono lenti contemporaneamente</li>
            <li>Risalgono cattivi odori persistenti</li>
            <li>Lo scarico emette gorgoglii quando scarichi altrove</li>
            <li>Il problema si ripresenta frequentemente</li>
          </ul>
          
          <h3>🔧 Strumenti Professionali</h3>
          <p>Un idraulico dispone di:</p>
          <ul>
            <li><strong>Sonda elettrica</strong>: raggiunge ostruzioni profonde</li>
            <li><strong>Videoispezione</strong>: identifica causa e posizione esatta</li>
            <li><strong>Idrogetto</strong>: pulisce completamente le pareti delle tubature</li>
          </ul>
          
          <h3>💰 Costi Indicativi</h3>
          <ul>
            <li><strong>Disostruzione sifone</strong>: 40-70€</li>
            <li><strong>Disostruzione con sonda</strong>: 80-150€</li>
            <li><strong>Videoispezione</strong>: 100-200€</li>
          </ul>
        `
      }
    }
  },
  {
    slug: 'perdita-acqua-sotto-lavello',
    title: 'Perdita Acqua Sotto il Lavello: Cosa Fare Subito',
    metaTitle: 'Perdita Acqua Sotto Lavello: Guida Completa | Cosa Fare e Quando Chiamare',
    metaDescription: 'Hai trovato acqua sotto il lavello? Scopri le cause più comuni, cosa fare subito per limitare i danni e quando chiamare un idraulico professionista.',
    h1: 'Perdita Acqua Sotto il Lavello: Cosa Fare Subito',
    excerpt: 'Se trovi acqua sotto il lavello della cucina o del bagno, non ignorarla. Anche una piccola perdita può trasformarsi in un danno serio a mobili e pavimenti.',
    category: 'perdite',
    tags: ['perdita lavello', 'sifone', 'guarnizioni', 'tubo scarico', 'flessibili'],
    publishedAt: '2026-01-27',
    updatedAt: '2026-01-27',
    readingTime: 6,
    relatedServices: ['riparazione-perdite', 'pronto-intervento'],
    sections: {
      gravity: {
        id: 'quanto-grave',
        title: 'Perché Sta Uscendo Acqua da Sotto il Lavello',
        content: `
          <p>Se trovi acqua sotto il lavello della cucina o del bagno, <strong>non ignorarla</strong>. Anche una piccola perdita può trasformarsi in un danno serio a mobili, pavimento o pareti nel giro di poche ore.</p>
          
          <h3>🔍 Le Cause Più Comuni</h3>
          <ul>
            <li><strong>Guarnizioni usurate</strong> nei raccordi</li>
            <li><strong>Sifone allentato o crepato</strong></li>
            <li><strong>Tubo di scarico lesionato</strong></li>
            <li><strong>Flessibili dell'acqua rovinati</strong></li>
            <li><strong>Rubinetto che perde</strong> dall'attacco inferiore</li>
          </ul>
          <p>Capire da dove viene l'acqua è il primo passo per evitare danni maggiori.</p>
          
          <h3>🚨 È un'Emergenza o Posso Aspettare?</h3>
          <p>Dipende dalla quantità d'acqua:</p>
          <ul>
            <li><strong>🔹 Poche gocce lente</strong> → puoi fare un controllo veloce</li>
            <li><strong>🔹 Acqua che cola continuamente</strong> → serve intervento rapido</li>
            <li><strong>🔹 Acqua che sgorga o mobile allagato</strong> → è un'urgenza</li>
          </ul>
          <p><strong>⚠️ Se il legno del mobile si bagna a lungo, può gonfiarsi e rovinarsi in modo permanente.</strong></p>
        `
      },
      immediateActions: {
        id: 'cosa-fare-subito',
        title: 'Cosa Puoi Fare SUBITO (Prima dell\'Idraulico)',
        content: `
          <p>Ecco le azioni immediate per limitare i danni:</p>
          
          <h3>1. Chiudi il Rubinetto Generale</h3>
          <p>Cerca il rubinetto di arresto sotto il lavello e chiudilo. Se non c'è, chiudi quello generale dell'appartamento.</p>
          
          <h3>2. Asciuga Bene Tutta l'Acqua</h3>
          <p>Usa stracci o carta assorbente per rimuovere tutta l'acqua presente nel mobile.</p>
          
          <h3>3. Metti un Secchio Sotto la Perdita</h3>
          <p>Posiziona un contenitore sotto il punto esatto della perdita per raccogliere l'acqua.</p>
          
          <h3>4. Controlla se il Sifone è Solo Allentato</h3>
          <p>A volte il problema è semplicemente un raccordo che si è allentato nel tempo. Verifica (senza forzare) se il sifone è stabile.</p>
          
          <h3>5. Non Forzare le Guarnizioni</h3>
          <p>Se vedi una guarnizione fuori sede, <strong>non forzarla</strong>. Potresti peggiorare la situazione.</p>
          
          <p><em>Questi passaggi servono solo a limitare i danni, non a risolvere definitivamente il problema.</em></p>
        `
      },
      whatNotToDo: {
        id: 'cosa-non-fare',
        title: 'Cosa NON Devi Fare',
        content: `
          <p>Molti tentativi "fai da te" peggiorano la situazione e aumentano il costo della riparazione:</p>
          
          <h3>❌ Non Usare Nastro Adesivo o Silicone</h3>
          <p>Non sono soluzioni definitive. Il nastro adesivo non regge l'umidità e il silicone applicato male peggiora solo le cose.</p>
          
          <h3>❌ Non Stringere Troppo i Raccordi in Plastica</h3>
          <p>I raccordi in PVC sono fragili. Se stringi troppo, si rompono e dovrai sostituire tutto il pezzo.</p>
          
          <h3>❌ Non Ignorare la Perdita</h3>
          <p>Sperare che smetta da sola è un errore. L'acqua continuerà a danneggiare il mobile e potrebbe arrivare al pavimento.</p>
          
          <h3>❌ Non Usare Prodotti Chimici</h3>
          <p>Se lo scarico perde, i prodotti chimici disgorganti non servono a nulla e sono solo pericolosi da maneggiare.</p>
        `
      },
      whenToCall: {
        id: 'quando-chiamare',
        title: 'Quando Serve un Idraulico',
        content: `
          <h3>📞 Chiama un Idraulico Se:</h3>
          <ul>
            <li>La perdita continua dopo aver stretto i raccordi</li>
            <li>Il tubo è crepato o bucato</li>
            <li>Il sifone perde dalla giunzione</li>
            <li>L'acqua arriva dal muro</li>
            <li>Il mobile si sta allagando</li>
          </ul>
          
          <h3>🔧 Cosa Può Fare un Tecnico</h3>
          <ul>
            <li>✔ Sostituire tubi e guarnizioni</li>
            <li>✔ Riparare il sifone</li>
            <li>✔ Sistemare collegamenti difettosi</li>
            <li>✔ Evitare danni a pareti e pavimento</li>
          </ul>
          
          <h3>💰 Costi Indicativi</h3>
          <ul>
            <li><strong>Sostituzione guarnizione o serraggio</strong>: 50-90€</li>
            <li><strong>Sostituzione sifone</strong>: 80-150€</li>
            <li><strong>Riparazione tubo danneggiato</strong>: 100-200€</li>
          </ul>
          <p><em>I costi dipendono da accessibilità e gravità del danno.</em></p>
          
          <h3>❓ Domande Frequenti</h3>
          <p><strong>Posso usare il lavello se perde acqua sotto?</strong><br/>
          Meglio evitarlo: ogni utilizzo aumenta la perdita.</p>
          
          <p><strong>La perdita può venire dal muro?</strong><br/>
          Sì, in quel caso il problema è più serio e va visto subito da un professionista.</p>
          
          <p><strong>Una piccola perdita può diventare grave?</strong><br/>
          Sì, nel tempo rovina mobili e pavimenti. Un intervento rapido può evitarti centinaia di euro di danni.</p>
        `
      }
    }
  }
,
  // Import expanded guides
  ...PERDITE_GUIDES,
  ...SCARICHI_GUIDES,
  ...CALDAIE_GUIDES
];

// Helper functions
export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find(g => g.slug === slug);
}

export function getGuidesByCategory(category: string): Guide[] {
  return GUIDES.filter(g => g.category === category);
}

export function getRelatedGuides(slug: string, limit: number = 3): Guide[] {
  const current = getGuideBySlug(slug);
  if (!current) return [];
  
  return GUIDES
    .filter(g => g.slug !== slug && g.category === current.category)
    .slice(0, limit);
}

export function getGuidesForCityPage(): Guide[] {
  // Return guides most useful for city landing pages
  return GUIDES.slice(0, 4);
}
