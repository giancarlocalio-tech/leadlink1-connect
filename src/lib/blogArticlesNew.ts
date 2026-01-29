// New SEO-optimized blog articles following standardized template
// Structure: Intro → Cause → DIY Methods → When to call pro → CTA

import { BlogArticle } from './blogData';

/**
 * TEMPLATE STRUCTURE for all articles:
 * 
 * 1. <p>Intro paragraph</p>
 * 
 * 2. <h2>Cause comuni</h2>
 *    <ul><li>Cause 1</li>...</ul>
 * 
 * 3. <h2>Metodo X — Title</h2> (numbered 1-5)
 *    <p>Description</p>
 *    <ul/ol><li>Step</li>...</ul/ol>
 * 
 * 4. <h2>Attenzione</h2> (optional)
 *    <p>Warning content</p>
 * 
 * 5. <h2>Quando chiamare un idraulico</h2>
 *    <p>Pro call content</p>
 */

export const NEW_BLOG_ARTICLES: BlogArticle[] = [
  // ===== WC INTASATO =====
  {
    slug: 'wc-intasato-come-sturarlo',
    title: 'WC Intasato: Come Sturarlo Senza Chiamare l\'Idraulico',
    metaTitle: 'WC Intasato: 5 Metodi per Sturarlo Subito | Guida 2025',
    metaDescription: 'WC otturato? Scopri 5 metodi efficaci per sturare il water intasato. Dalla ventosa all\'acqua calda, tutti i trucchi fai-da-te prima di chiamare un idraulico.',
    h1: 'WC Intasato: Come Sturarlo',
    excerpt: 'Water bloccato? Ecco 5 metodi efficaci per sturaccare il WC senza dover chiamare un idraulico. Soluzioni rapide e pratiche.',
    category: 'emergenze',
    tags: ['wc intasato', 'water otturato', 'sturare wc', 'emergenza bagno', 'fai da te'],
    publishedAt: '2025-01-25',
    updatedAt: '2025-01-25',
    readingTime: 6,
    content: `
      <p>Il WC intasato è una delle emergenze domestiche più comuni e sgradevoli. Prima di entrare nel panico e chiamare un idraulico, puoi provare alcuni metodi fai-da-te che nella maggior parte dei casi risolvono il problema in pochi minuti.</p>
      
      <h2>Cause comuni del WC intasato</h2>
      <ul>
        <li>Troppa carta igienica usata in una volta</li>
        <li>Oggetti estranei caduti nel water (salviette, assorbenti, cotton fioc)</li>
        <li>Accumulo di calcare nelle tubature</li>
        <li>Problemi al sifone o alle tubature di scarico</li>
        <li>Difetti nella pressione dell'acqua dello sciacquone</li>
      </ul>
      
      <h2>Metodo 1 — Acqua calda e detersivo</h2>
      <p>Il metodo più semplice e spesso efficace per ostruzioni leggere causate da materiale organico.</p>
      <ol>
        <li>Versa mezzo bicchiere di detersivo per piatti nel WC</li>
        <li>Scalda 2-3 litri d'acqua (calda ma non bollente)</li>
        <li>Versa l'acqua dall'altezza della vita per creare pressione</li>
        <li>Attendi 10-15 minuti e prova a tirare lo sciacquone</li>
      </ol>
      
      <h2>Metodo 2 — La ventosa (sturalavandini)</h2>
      <p>Lo strumento classico per sturare i WC. Usa una ventosa grande, specifica per water, non quella piccola per i lavandini.</p>
      <ol>
        <li>Assicurati che ci sia abbastanza acqua nel water per coprire la ventosa</li>
        <li>Posiziona la ventosa sull'apertura dello scarico creando una tenuta</li>
        <li>Pompa energicamente su e giù per 15-20 secondi</li>
        <li>Ripeti più volte se necessario</li>
        <li>Quando l'acqua inizia a defluire, tira lo sciacquone</li>
      </ol>
      
      <h2>Metodo 3 — Bicarbonato e aceto</h2>
      <p>Una reazione chimica naturale che può sciogliere le ostruzioni organiche.</p>
      <ol>
        <li>Versa una tazza di bicarbonato di sodio nel WC</li>
        <li>Aggiungi lentamente una tazza di aceto bianco</li>
        <li>Lascia agire l'effervescenza per 20-30 minuti</li>
        <li>Versa acqua calda e prova lo sciacquone</li>
      </ol>
      
      <h2>Metodo 4 — La sonda flessibile</h2>
      <p>Per ostruzioni più profonde, una sonda (o "serpente idraulico") può raggiungere il blocco.</p>
      <ol>
        <li>Inserisci la sonda nel foro di scarico del WC</li>
        <li>Spingi delicatamente fino a incontrare resistenza</li>
        <li>Ruota la manovella per agganciare l'ostruzione</li>
        <li>Estrai lentamente o spingi per liberare il passaggio</li>
      </ol>
      
      <h2>Metodo 5 — Bottiglia di plastica</h2>
      <p>Un trucco casalingo quando non hai una ventosa a disposizione.</p>
      <ol>
        <li>Taglia il fondo di una bottiglia di plastica da 2 litri</li>
        <li>Inserisci la bottiglia (tappo chiuso) nello scarico del WC</li>
        <li>Pompa su e giù rapidamente come faresti con una ventosa</li>
        <li>La pressione creata può sbloccare l'ostruzione</li>
      </ol>
      
      <h2>Attenzione: cosa NON fare</h2>
      <ul>
        <li>Non usare prodotti chimici aggressivi che possono danneggiare le tubature</li>
        <li>Non versare acqua bollente che può spaccare la ceramica</li>
        <li>Non tirare lo sciacquone ripetutamente se l'acqua non defluisce (rischi allagamento)</li>
        <li>Non usare oggetti metallici che possono graffiare il WC</li>
      </ul>
      
      <h2>Quando chiamare un idraulico</h2>
      <p>Se dopo aver provato tutti questi metodi il WC è ancora intasato, probabilmente l'ostruzione è più profonda nelle tubature o c'è un problema strutturale. In questi casi serve un intervento professionale con strumenti come l'idrogetto o la videoispezione per individuare il blocco.</p>
    `
  },
  
  // ===== DOCCIA CHE NON SCARICA =====
  {
    slug: 'doccia-non-scarica-bene',
    title: 'La Doccia Non Scarica Bene? Ecco Come Risolvere',
    metaTitle: 'Doccia Non Scarica: Cause e Soluzioni Fai-Da-Te 2025',
    metaDescription: 'Lo scarico della doccia è lento o bloccato? Scopri le cause più comuni e i metodi efficaci per sturare il piatto doccia senza chiamare l\'idraulico.',
    h1: 'Doccia Che Non Scarica: Come Risolvere',
    excerpt: 'Acqua che ristagna nella doccia? Ecco come sturare lo scarico e ripristinare il drenaggio corretto in pochi minuti.',
    category: 'guide-pratiche',
    tags: ['doccia intasata', 'scarico doccia', 'piatto doccia', 'capelli scarico', 'sturare doccia'],
    publishedAt: '2025-01-25',
    updatedAt: '2025-01-25',
    readingTime: 5,
    content: `
      <p>Lo scarico della doccia che non drena correttamente è un problema fastidioso ma molto comune. L'acqua che ristagna ai piedi mentre fai la doccia è il primo segnale di un'ostruzione in formazione. Agire subito evita che il problema peggiori.</p>
      
      <h2>Cause comuni dello scarico lento</h2>
      <ul>
        <li>Accumulo di capelli (la causa principale nel 90% dei casi)</li>
        <li>Residui di sapone, shampoo e balsamo che formano depositi</li>
        <li>Calcare che restringe il passaggio nelle tubature</li>
        <li>Piccoli oggetti caduti nello scarico (tappi, fermagli)</li>
        <li>Inclinazione insufficiente del piatto doccia</li>
      </ul>
      
      <h2>Metodo 1 — Rimuovi la griglia e pulisci</h2>
      <p>Spesso il problema è proprio sotto il tappo dello scarico. Basta una pulizia manuale.</p>
      <ol>
        <li>Rimuovi la griglia dello scarico (solitamente svitandola o sollevandola)</li>
        <li>Usa le dita o delle pinzette per estrarre capelli e residui visibili</li>
        <li>Pulisci la griglia con acqua e sapone</li>
        <li>Rimonta e testa lo scarico</li>
      </ol>
      
      <h2>Metodo 2 — Acqua bollente</h2>
      <p>L'acqua molto calda scioglie i residui di sapone e grasso che intrappolano i capelli.</p>
      <ol>
        <li>Porta a ebollizione 2 litri d'acqua</li>
        <li>Versala lentamente nello scarico</li>
        <li>Attendi 5 minuti</li>
        <li>Ripeti se necessario</li>
      </ol>
      
      <h2>Metodo 3 — Bicarbonato, sale e aceto</h2>
      <p>Una combinazione efficace per sciogliere i depositi organici.</p>
      <ol>
        <li>Versa mezza tazza di bicarbonato nello scarico</li>
        <li>Aggiungi mezza tazza di sale grosso</li>
        <li>Versa una tazza di aceto bianco caldo</li>
        <li>Copri e lascia agire per 30 minuti</li>
        <li>Risciacqua con acqua bollente</li>
      </ol>
      
      <h2>Metodo 4 — Ventosa per doccia</h2>
      <p>Se l'ostruzione è più profonda, la ventosa può creare la pressione necessaria.</p>
      <ol>
        <li>Rimuovi la griglia dello scarico</li>
        <li>Riempi il piatto doccia con qualche centimetro d'acqua</li>
        <li>Posiziona la ventosa sullo scarico</li>
        <li>Pompa vigorosamente per 20-30 secondi</li>
      </ol>
      
      <h2>Metodo 5 — Gancio di fil di ferro</h2>
      <p>Un metodo casalingo per estrarre i capelli intrappolati più in profondità.</p>
      <ol>
        <li>Raddrizza una gruccia di metallo lasciando un piccolo gancio a un'estremità</li>
        <li>Inseriscila nello scarico</li>
        <li>Ruota e "pesca" i capelli agganciandoli</li>
        <li>Estrai e ripulisci più volte</li>
      </ol>
      
      <h2>Prevenzione: come evitare intasamenti futuri</h2>
      <ul>
        <li>Installa un filtro raccogli-capelli sulla griglia</li>
        <li>Pulisci il filtro dopo ogni doccia</li>
        <li>Una volta al mese versa acqua bollente nello scarico</li>
        <li>Evita di lasciare cadere residui di prodotti solidi</li>
      </ul>
      
      <h2>Quando chiamare un idraulico</h2>
      <p>Se lo scarico resta lento dopo aver provato tutti questi metodi, l'ostruzione potrebbe essere nella colonna di scarico principale o nel sifone sifonato. Un idraulico può effettuare una videoispezione e usare attrezzature professionali per risolvere definitivamente il problema.</p>
    `
  },
  
  // ===== RUBINETTO CHE GOCCIOLA =====
  {
    slug: 'rubinetto-gocciola-come-riparare',
    title: 'Rubinetto Che Gocciola? Come Fermarlo in 10 Minuti',
    metaTitle: 'Rubinetto Che Gocciola: Come Ripararlo Subito | Guida 2025',
    metaDescription: 'Il rubinetto gocciola di notte? Scopri come fermarlo in 10 minuti sostituendo la guarnizione. Guida passo-passo con foto e consigli pratici.',
    h1: 'Rubinetto Che Gocciola: Come Ripararlo',
    excerpt: 'Un rubinetto che perde può sprecare 20 litri al giorno. Ecco come fermarlo sostituendo la guarnizione in pochi minuti.',
    category: 'guide-pratiche',
    tags: ['rubinetto gocciola', 'guarnizione rubinetto', 'spreco acqua', 'riparazione fai da te', 'rubinetto perde'],
    publishedAt: '2025-01-25',
    updatedAt: '2025-01-25',
    readingTime: 5,
    content: `
      <p>Quel "tic tic" del rubinetto che gocciola di notte non è solo fastidioso: può sprecare fino a 7.000 litri d'acqua all'anno. La buona notizia? Nella maggior parte dei casi puoi risolverlo tu stesso in meno di 10 minuti cambiando una semplice guarnizione.</p>
      
      <h2>Cause comuni del gocciolamento</h2>
      <ul>
        <li>Guarnizione del vitone usurata o indurita</li>
        <li>Cartuccia ceramica danneggiata (nei miscelatori moderni)</li>
        <li>Sede della valvola corrosa o incrostata</li>
        <li>Raccordi allentati o filettature danneggiate</li>
        <li>Pressione dell'acqua troppo alta</li>
      </ul>
      
      <h2>Metodo 1 — Stringere i raccordi</h2>
      <p>A volte il gocciolamento viene da un raccordo allentato, non dalla valvola interna.</p>
      <ol>
        <li>Chiudi l'acqua sotto il lavello</li>
        <li>Controlla i raccordi del flessibile di alimentazione</li>
        <li>Stringi delicatamente con una chiave inglese (1/4 di giro)</li>
        <li>Riapri l'acqua e verifica</li>
      </ol>
      
      <h2>Metodo 2 — Sostituire la guarnizione del vitone</h2>
      <p>Per rubinetti tradizionali con manopole separate per caldo e freddo.</p>
      <ol>
        <li>Chiudi l'acqua dalla valvola di arresto</li>
        <li>Rimuovi il cappuccio decorativo della manopola</li>
        <li>Svita la vite centrale e sfila la manopola</li>
        <li>Svita il vitone con una chiave inglese</li>
        <li>Sostituisci la guarnizione in fondo al vitone</li>
        <li>Rimonta tutto e riapri l'acqua</li>
      </ol>
      
      <h2>Metodo 3 — Sostituire la cartuccia del miscelatore</h2>
      <p>Per rubinetti moderni con leva singola.</p>
      <ol>
        <li>Chiudi l'acqua</li>
        <li>Rimuovi il cappuccio e la vite di fissaggio della leva</li>
        <li>Sfila la leva e il cappuccio decorativo</li>
        <li>Svita il dado di fissaggio della cartuccia</li>
        <li>Estrai la vecchia cartuccia e porta in ferramenta per il ricambio</li>
        <li>Installa la nuova cartuccia e rimonta</li>
      </ol>
      
      <h2>Metodo 4 — Pulire la sede della valvola</h2>
      <p>Se dopo aver cambiato la guarnizione il rubinetto continua a gocciolare, la sede potrebbe essere danneggiata.</p>
      <ol>
        <li>Con il vitone rimosso, ispeziona la sede interna</li>
        <li>Usa una spazzola in ottone per rimuovere incrostazioni</li>
        <li>Per danni maggiori, usa uno svasatore per sedi</li>
        <li>Rimonta con guarnizione nuova</li>
      </ol>
      
      <h2>Attenzione: errori da evitare</h2>
      <ul>
        <li>Non stringere troppo i raccordi (rischi di romperli)</li>
        <li>Non forzare viti ossidate (usa spray sbloccante prima)</li>
        <li>Non dimenticare di chiudere l'acqua prima di smontare</li>
        <li>Non usare guarnizioni di misura sbagliata</li>
      </ul>
      
      <h2>Quando chiamare un idraulico</h2>
      <p>Se il gocciolamento persiste dopo aver sostituito guarnizione e cartuccia, il problema potrebbe essere nella sede corrosa o nelle tubature. Un idraulico può valutare se sia meglio riparare o sostituire l'intero rubinetto.</p>
    `
  },
  
  // ===== TUBO CHE PERDE =====
  {
    slug: 'tubo-che-perde-riparazione-urgente',
    title: 'Tubo Che Perde Acqua: Riparazione d\'Emergenza',
    metaTitle: 'Tubo Che Perde: Come Fermarlo Subito | Emergenza 2025',
    metaDescription: 'Hai un tubo che perde acqua? Scopri come fermare la perdita in emergenza e limitare i danni. Soluzioni temporanee e quando chiamare l\'idraulico.',
    h1: 'Tubo Che Perde: Cosa Fare Subito',
    excerpt: 'Perdita da un tubo? Ecco come intervenire immediatamente per limitare i danni e le soluzioni temporanee in attesa dell\'idraulico.',
    category: 'emergenze',
    tags: ['tubo perde', 'perdita acqua', 'emergenza idraulica', 'riparazione tubo', 'allagamento'],
    publishedAt: '2025-01-25',
    updatedAt: '2025-01-25',
    readingTime: 6,
    content: `
      <p>Un tubo che perde acqua è un'emergenza che richiede un intervento immediato. Ogni minuto di ritardo significa litri d'acqua sprecata e potenziali danni a pavimenti, muri e mobili. Ecco cosa fare subito e come contenere il danno.</p>
      
      <h2>Le prime 3 cose da fare</h2>
      <ul>
        <li><strong>CHIUDI L'ACQUA:</strong> Trova la valvola generale e chiudila immediatamente</li>
        <li><strong>RACCOGLI L'ACQUA:</strong> Posiziona secchi, bacinelle o stracci sotto la perdita</li>
        <li><strong>STACCA LA CORRENTE:</strong> Se l'acqua è vicina a prese elettriche, disattiva il contatore</li>
      </ul>
      
      <h2>Cause comuni delle perdite</h2>
      <ul>
        <li>Tubature vecchie e corrose</li>
        <li>Giunzioni allentate o guarnizioni usurate</li>
        <li>Gelo che ha fatto scoppiare il tubo</li>
        <li>Pressione dell'acqua troppo alta</li>
        <li>Vibrazioni o movimenti strutturali</li>
        <li>Danni accidentali (chiodi, viti)</li>
      </ul>
      
      <h2>Metodo 1 — Nastro autoagglomerante</h2>
      <p>Per piccole perdite su tubature in pressione. Questo nastro speciale si fonde con se stesso creando una guarnizione impermeabile.</p>
      <ol>
        <li>Asciuga bene la zona della perdita</li>
        <li>Avvolgi il nastro partendo da 5 cm prima del foro</li>
        <li>Stira il nastro mentre lo avvolgi (deve aderire a se stesso)</li>
        <li>Sovrapponi ogni giro al 50% del precedente</li>
        <li>Continua per 5 cm oltre la perdita</li>
      </ol>
      
      <h2>Metodo 2 — Fascetta con guarnizione</h2>
      <p>Per perdite più consistenti o su tubi metallici.</p>
      <ol>
        <li>Acquista una fascetta di riparazione della misura giusta</li>
        <li>Posiziona la guarnizione in gomma sul foro</li>
        <li>Avvolgi la fascetta metallica attorno al tubo</li>
        <li>Stringi le viti o i bulloni uniformemente</li>
        <li>Riapri l'acqua lentamente per verificare</li>
      </ol>
      
      <h2>Metodo 3 — Stucco epossidico</h2>
      <p>Per crepe o fori piccoli, quando il tubo è accessibile e asciutto.</p>
      <ol>
        <li>Chiudi l'acqua e asciuga completamente il tubo</li>
        <li>Miscela le due componenti dello stucco</li>
        <li>Applica sulla fessura premendo bene</li>
        <li>Lascia indurire per il tempo indicato (solitamente 1 ora)</li>
        <li>Riapri l'acqua gradualmente</li>
      </ol>
      
      <h2>Metodo 4 — Morsetto d'emergenza</h2>
      <p>Per fermare temporaneamente una perdita importante.</p>
      <ol>
        <li>Taglia un pezzo di gomma (camera d'aria, guanto spesso)</li>
        <li>Posizionala sul foro</li>
        <li>Fissala con un morsetto stringitubo o fascette</li>
        <li>Questa è una soluzione temporanea: chiama l'idraulico</li>
      </ol>
      
      <h2>Attenzione: soluzioni temporanee</h2>
      <ul>
        <li>Questi metodi sono riparazioni d'emergenza, non definitive</li>
        <li>Non usare nastro isolante normale (non è impermeabile a pressione)</li>
        <li>I tubi in piombo o molto vecchi andrebbero sempre sostituiti</li>
        <li>Se la perdita è nel muro o nel pavimento, serve un professionista</li>
      </ul>
      
      <h2>Quando chiamare un idraulico</h2>
      <p>Dopo aver fermato l'emergenza, contatta sempre un idraulico per una riparazione definitiva. Le soluzioni fai-da-te sono temporanee e potrebbero cedere, causando danni ancora maggiori. Un professionista può anche valutare lo stato generale delle tubature.</p>
    `
  },
  
  // ===== CALDAIA NON SI ACCENDE =====
  {
    slug: 'caldaia-non-parte-cosa-controllare',
    title: 'Caldaia Non Si Accende? Cosa Controllare Prima di Chiamare',
    metaTitle: 'Caldaia Non Parte: 6 Controlli Fai-Da-Te | Guida 2025',
    metaDescription: 'La caldaia non si accende? Prima di chiamare l\'assistenza, ecco 6 cose da verificare. Spesso la soluzione è più semplice di quanto pensi.',
    h1: 'Caldaia Non Si Accende: Cosa Controllare',
    excerpt: 'Caldaia bloccata? Prima di chiamare il tecnico, verifica questi 6 punti. Spesso la soluzione è semplice e puoi risolvere da solo.',
    category: 'emergenze',
    tags: ['caldaia non parte', 'caldaia bloccata', 'riscaldamento', 'errore caldaia', 'manutenzione caldaia'],
    publishedAt: '2025-01-25',
    updatedAt: '2025-01-25',
    readingTime: 7,
    content: `
      <p>La caldaia che non si accende è un problema che può avere cause banali o serie. Prima di chiamare il tecnico (con costi di uscita che partono da 50€), verifica questi punti. Nel 30% dei casi puoi risolvere da solo in pochi minuti.</p>
      
      <h2>Cause comuni del blocco caldaia</h2>
      <ul>
        <li>Pressione dell'impianto troppo bassa</li>
        <li>Alimentazione elettrica o gas interrotta</li>
        <li>Termostato spento o impostato male</li>
        <li>Valvole del gas chiuse</li>
        <li>Aria nell'impianto di riscaldamento</li>
        <li>Sensori di sicurezza attivati</li>
      </ul>
      
      <h2>Metodo 1 — Controlla la pressione</h2>
      <p>La causa più comune di blocco. La pressione deve essere tra 1 e 1,5 bar.</p>
      <ol>
        <li>Guarda il manometro sulla caldaia (lancetta o display)</li>
        <li>Se la pressione è sotto 1 bar, devi ricaricare</li>
        <li>Trova il rubinetto di carico (di solito sotto la caldaia)</li>
        <li>Aprilo lentamente finché la pressione raggiunge 1,2-1,3 bar</li>
        <li>Chiudi il rubinetto e prova a riaccendere</li>
      </ol>
      
      <h2>Metodo 2 — Verifica alimentazione elettrica</h2>
      <p>Sembra banale, ma succede più spesso di quanto credi.</p>
      <ol>
        <li>Controlla che la spina della caldaia sia inserita</li>
        <li>Verifica che l'interruttore dedicato sia su ON</li>
        <li>Controlla che non sia scattato il salvavita</li>
        <li>Prova a staccare e riattaccare la spina</li>
      </ol>
      
      <h2>Metodo 3 — Controlla il gas</h2>
      <p>Se il gas non arriva, la caldaia non può accendersi.</p>
      <ol>
        <li>Verifica che il contatore del gas non sia bloccato</li>
        <li>Controlla che le valvole del gas siano aperte</li>
        <li>Prova ad accendere un fornello per verificare l'erogazione</li>
        <li>Se non c'è gas, contatta il fornitore</li>
      </ol>
      
      <h2>Metodo 4 — Reset della caldaia</h2>
      <p>Molte caldaie si bloccano per sicurezza e basta un reset per ripartire.</p>
      <ol>
        <li>Cerca il pulsante di reset (spesso rosso o con simbolo R)</li>
        <li>Tienilo premuto per 3-5 secondi</li>
        <li>Attendi che la caldaia completi il ciclo di avvio</li>
        <li>Se si blocca di nuovo, potrebbe esserci un problema serio</li>
      </ol>
      
      <h2>Metodo 5 — Controlla il termostato</h2>
      <p>Il termostato ambiente potrebbe essere il "colpevole".</p>
      <ol>
        <li>Verifica che sia acceso e con le pile cariche</li>
        <li>Imposta una temperatura superiore a quella attuale della stanza</li>
        <li>Controlla che sia in modalità riscaldamento (non raffreddamento)</li>
        <li>Verifica la programmazione oraria</li>
      </ol>
      
      <h2>Metodo 6 — Sfiata i termosifoni</h2>
      <p>L'aria nell'impianto può bloccare la circolazione e far scattare le sicurezze.</p>
      <ol>
        <li>Spegni la caldaia</li>
        <li>Apri le valvole di sfiato dei termosifoni (partendo dal più alto)</li>
        <li>Lascia uscire l'aria fino a quando esce acqua</li>
        <li>Ricontrolla la pressione e ricarica se necessario</li>
      </ol>
      
      <h2>Codici di errore comuni</h2>
      <ul>
        <li><strong>E01/E1:</strong> Problema di accensione (mancanza gas o elettrodo)</li>
        <li><strong>E02/E2:</strong> Sovratemperatura (blocco di sicurezza)</li>
        <li><strong>E10:</strong> Pressione bassa (ricarica impianto)</li>
        <li><strong>E25:</strong> Circolazione bloccata (aria o pompa)</li>
        <li><strong>E35:</strong> Problema fiamma (elettrodo o scheda)</li>
      </ul>
      
      <h2>Quando chiamare un idraulico</h2>
      <p>Se dopo questi controlli la caldaia non riparte, o se si blocca ripetutamente con errori, serve un tecnico qualificato. Problemi alla scheda elettronica, alla valvola gas o allo scambiatore richiedono intervento professionale. Non improvvisare su componenti a gas.</p>
    `
  },
  
  // ===== SCARICO LENTO LAVANDINO =====
  {
    slug: 'scarico-lento-lavandino-cucina',
    title: 'Scarico Lento nel Lavandino della Cucina: Come Liberarlo',
    metaTitle: 'Scarico Lavandino Lento: Soluzioni Efficaci | Guida 2025',
    metaDescription: 'L\'acqua nel lavandino della cucina scende lentamente? Scopri le cause e i metodi per liberare lo scarico intasato da grasso e residui alimentari.',
    h1: 'Scarico Lento in Cucina: Come Risolvere',
    excerpt: 'Lavandino della cucina che scarica lentamente? Ecco come liberarlo da grasso e residui senza prodotti chimici aggressivi.',
    category: 'guide-pratiche',
    tags: ['scarico lento', 'lavandino cucina', 'grasso scarico', 'intasamento', 'sifone'],
    publishedAt: '2025-01-26',
    updatedAt: '2025-01-26',
    readingTime: 5,
    content: `
      <p>Il lavandino della cucina che scarica lentamente è un problema che peggiora nel tempo se non affrontato. Il colpevole principale? Grasso e residui alimentari che si accumulano nelle tubature. Ecco come risolvere prima che l'intasamento diventi totale.</p>
      
      <h2>Cause comuni dello scarico lento</h2>
      <ul>
        <li>Grasso che si solidifica nelle tubature fredde</li>
        <li>Residui alimentari (fondi di caffè, bucce, riso)</li>
        <li>Depositi di sapone e calcare</li>
        <li>Sifone ostruito da detriti accumulati</li>
        <li>Problemi nella colonna di scarico principale</li>
      </ul>
      
      <h2>Metodo 1 — Acqua bollente e detersivo</h2>
      <p>Il grasso si scioglie con il calore. Questo metodo semplice funziona per ostruzioni leggere.</p>
      <ol>
        <li>Porta a ebollizione 3 litri d'acqua</li>
        <li>Aggiungi un cucchiaio di detersivo per piatti</li>
        <li>Versa lentamente nello scarico</li>
        <li>Attendi 10 minuti e ripeti</li>
        <li>Fai scorrere acqua calda per 2 minuti</li>
      </ol>
      
      <h2>Metodo 2 — Bicarbonato, sale e acqua bollente</h2>
      <p>Una combinazione potente contro grasso e residui organici.</p>
      <ol>
        <li>Versa mezza tazza di sale grosso nello scarico</li>
        <li>Aggiungi mezza tazza di bicarbonato</li>
        <li>Lascia agire per 2-3 ore (o tutta la notte)</li>
        <li>Risciacqua con acqua bollente</li>
      </ol>
      
      <h2>Metodo 3 — Pulisci il sifone</h2>
      <p>Il sifone (curva a "S" sotto il lavandino) è dove si accumula la maggior parte dei residui.</p>
      <ol>
        <li>Posiziona un secchio sotto il sifone</li>
        <li>Svita i dadi di raccordo del sifone</li>
        <li>Rimuovi il sifone e svuotalo</li>
        <li>Pulisci l'interno con una spazzola</li>
        <li>Rimonta verificando che le guarnizioni siano a posto</li>
      </ol>
      
      <h2>Metodo 4 — Ventosa per lavandini</h2>
      <p>Crea pressione per smuovere l'ostruzione più in profondità.</p>
      <ol>
        <li>Se hai due vasche, tappa quella libera</li>
        <li>Riempi la vasca con 5-10 cm d'acqua</li>
        <li>Posiziona la ventosa sullo scarico</li>
        <li>Pompa vigorosamente per 30 secondi</li>
        <li>Ripeti più volte</li>
      </ol>
      
      <h2>Metodo 5 — Enzimi naturali</h2>
      <p>Per manutenzione regolare, gli enzimi "mangiano" il grasso senza danneggiare le tubature.</p>
      <ol>
        <li>Acquista un prodotto enzimatico per scarichi</li>
        <li>Versalo nello scarico prima di dormire</li>
        <li>Lascia agire tutta la notte senza usare l'acqua</li>
        <li>Risciacqua al mattino</li>
        <li>Ripeti una volta al mese per prevenzione</li>
      </ol>
      
      <h2>Prevenzione: buone abitudini in cucina</h2>
      <ul>
        <li>Non versare mai olio o grasso nello scarico</li>
        <li>Usa un colino raccogli-residui</li>
        <li>Dopo aver lavato piatti unti, fai scorrere acqua calda per 1 minuto</li>
        <li>Una volta a settimana versa acqua bollente nello scarico</li>
      </ul>
      
      <h2>Quando chiamare un idraulico</h2>
      <p>Se lo scarico resta lento dopo tutti questi tentativi, l'ostruzione potrebbe essere nella colonna principale dell'edificio o nelle tubature murate. Servono attrezzature professionali come l'idrogetto per risolvere questi casi.</p>
    `
  },
  
  // ===== PERDITA SOTTO LAVANDINO =====
  {
    slug: 'perdita-acqua-sotto-lavandino',
    title: 'Perdita d\'Acqua Sotto il Lavandino: Come Trovarla e Ripararla',
    metaTitle: 'Perdita Sotto Lavandino: Cause e Soluzioni | Guida 2025',
    metaDescription: 'C\'è acqua sotto il lavandino? Scopri come individuare la perdita e ripararla. Dal sifone ai flessibili, ecco dove guardare e cosa fare.',
    h1: 'Perdita Sotto il Lavandino: Cosa Fare',
    excerpt: 'Hai trovato acqua sotto il lavello? Ecco come individuare l\'origine della perdita e ripararla prima che causi danni.',
    category: 'emergenze',
    tags: ['perdita lavandino', 'sifone perde', 'flessibile rotto', 'umidità mobile', 'riparazione'],
    publishedAt: '2025-01-26',
    updatedAt: '2025-01-26',
    readingTime: 6,
    content: `
      <p>Trovare acqua sotto il lavandino è sempre una brutta sorpresa. La buona notizia? Nella maggior parte dei casi la perdita è in un punto accessibile e puoi ripararla tu stesso. La chiave è trovare l'origine esatta prima di intervenire.</p>
      
      <h2>Come individuare l'origine della perdita</h2>
      <ul>
        <li>Asciuga bene tutto sotto il lavandino</li>
        <li>Metti della carta assorbente nei punti sospetti</li>
        <li>Fai scorrere l'acqua e osserva dove si bagna prima</li>
        <li>Controlla con una torcia mentre l'acqua scorre</li>
        <li>Verifica anche quando NON usi l'acqua (potrebbe essere il rubinetto)</li>
      </ul>
      
      <h2>Causa 1 — Sifone che perde</h2>
      <p>Il sifone ha guarnizioni che nel tempo si deteriorano. È la causa più comune.</p>
      <ol>
        <li>Svita i dadi del sifone a mano o con pinza</li>
        <li>Controlla le guarnizioni di gomma</li>
        <li>Se sono dure, schiacciate o rotte, sostituiscile</li>
        <li>Pulisci le filettature da calcare e residui</li>
        <li>Rimonta stringendo bene (ma senza esagerare)</li>
      </ol>
      
      <h2>Causa 2 — Flessibili di alimentazione</h2>
      <p>I tubi flessibili che portano l'acqua al rubinetto possono logorarsi.</p>
      <ol>
        <li>Chiudi l'acqua dalle valvole sotto il lavello</li>
        <li>Controlla i raccordi: sono stretti?</li>
        <li>Ispeziona il tubo per screpolature o rigonfiamenti</li>
        <li>Se il flessibile è danneggiato, sostituiscilo (costano 5-10€)</li>
        <li>Usa nastro teflon sulle filettature quando rimonti</li>
      </ol>
      
      <h2>Causa 3 — Base del rubinetto</h2>
      <p>L'acqua può infiltrarsi dalla base del rubinetto quando la guarnizione è usurata.</p>
      <ol>
        <li>Asciuga la base del rubinetto</li>
        <li>Fai scorrere l'acqua e osserva se esce dalla base</li>
        <li>Se perde, devi stringere il dado sotto il lavello</li>
        <li>Se continua, va sostituita la guarnizione di base</li>
      </ol>
      
      <h2>Causa 4 — Piletta dello scarico</h2>
      <p>La piletta (dove si chiude il tappo) può perdere dalla guarnizione.</p>
      <ol>
        <li>Riempi il lavandino d'acqua</li>
        <li>Osserva se gocciola dalla giunzione piletta-lavello</li>
        <li>Se perde, svita la piletta dal sotto</li>
        <li>Sostituisci la guarnizione e applica sigillante siliconico</li>
        <li>Rimonta e attendi 24 ore prima di usare</li>
      </ol>
      
      <h2>Causa 5 — Tubo di scarico crepato</h2>
      <p>I tubi in PVC possono creparsi nel tempo, specialmente nei punti di giunzione.</p>
      <ol>
        <li>Ispeziona tutti i tubi per crepe visibili</li>
        <li>Piccole crepe: sigilla con nastro autoagglomerante</li>
        <li>Crepe grandi: sostituisci la sezione di tubo</li>
        <li>I raccordi in PVC costano pochi euro in ferramenta</li>
      </ol>
      
      <h2>Attenzione: danni da acqua</h2>
      <ul>
        <li>Controlla il fondo del mobile: se è gonfio, c'è un danno da umidità</li>
        <li>Verifica se ci sono macchie di muffa (rischio per la salute)</li>
        <li>Perdite prolungate possono danneggiare il pavimento sottostante</li>
        <li>Asciuga sempre bene dopo la riparazione</li>
      </ul>
      
      <h2>Quando chiamare un idraulico</h2>
      <p>Se non riesci a individuare l'origine della perdita, o se si trova in un punto non accessibile (dentro il muro, sotto il pavimento), è il momento di chiamare un professionista. Anche perdite ricorrenti dopo riparazioni indicano un problema più serio.</p>
    `
  },
  
  // ===== TERMOSIFONE NON SCALDA =====
  {
    slug: 'termosifone-non-scalda-freddo',
    title: 'Termosifone Che Non Scalda: 5 Cause e Soluzioni Rapide',
    metaTitle: 'Termosifone Freddo: Perché Non Scalda e Come Risolvere 2025',
    metaDescription: 'Il termosifone resta freddo o scalda solo in parte? Ecco le 5 cause più comuni e come risolvere il problema senza chiamare il tecnico.',
    h1: 'Termosifone Non Scalda: Cause e Soluzioni',
    excerpt: 'Termosifone freddo o che scalda solo a metà? Scopri le cause più comuni e le soluzioni fai-da-te per ripristinare il riscaldamento.',
    category: 'manutenzione',
    tags: ['termosifone freddo', 'riscaldamento', 'aria impianto', 'valvola termosifone', 'sfiatare'],
    publishedAt: '2025-01-26',
    updatedAt: '2025-01-26',
    readingTime: 6,
    content: `
      <p>Con l'inverno alle porte, scoprire che un termosifone non scalda è un bel problema. Prima di chiamare il tecnico, verifica queste cause comuni. Spesso la soluzione è semplice e puoi risolverla in pochi minuti.</p>
      
      <h2>Cause comuni del termosifone freddo</h2>
      <ul>
        <li>Aria intrappolata nell'impianto</li>
        <li>Valvola termostatica chiusa o bloccata</li>
        <li>Pressione della caldaia troppo bassa</li>
        <li>Valvola di zona chiusa</li>
        <li>Termosifone ostruito da fanghi</li>
      </ul>
      
      <h2>Metodo 1 — Sfiata il termosifone</h2>
      <p>Se il termosifone è caldo sotto e freddo sopra, c'è aria intrappolata. È la causa più comune.</p>
      <ol>
        <li>Spegni la caldaia e attendi 15 minuti</li>
        <li>Trova la valvola di sfiato (in alto, lato opposto alla valvola)</li>
        <li>Posiziona uno straccio sotto e una bacinella</li>
        <li>Apri la valvola con l'apposita chiave</li>
        <li>Quando esce acqua (non più aria), chiudi subito</li>
        <li>Controlla la pressione caldaia e ricarica se sotto 1 bar</li>
      </ol>
      
      <h2>Metodo 2 — Controlla la valvola termostatica</h2>
      <p>Le valvole termostatiche possono bloccarsi in posizione chiusa.</p>
      <ol>
        <li>Imposta la valvola al massimo (5 o simbolo sole)</li>
        <li>Se non si muove, potrebbe essere bloccata</li>
        <li>Svita la testa della valvola (girando l'anello)</li>
        <li>Vedrai un perno metallico: dovrebbe entrare/uscire liberamente</li>
        <li>Se è bloccato dentro, prova a sbloccarlo con una pinza</li>
        <li>Spruzza lubrificante e muovi il perno più volte</li>
      </ol>
      
      <h2>Metodo 3 — Verifica la pressione della caldaia</h2>
      <p>Pressione troppo bassa = circolazione insufficiente = termosifoni freddi.</p>
      <ol>
        <li>Controlla il manometro della caldaia</li>
        <li>La pressione dovrebbe essere tra 1 e 1,5 bar</li>
        <li>Se è sotto 1 bar, apri il rubinetto di carico</li>
        <li>Ricarica lentamente fino a 1,2-1,3 bar</li>
        <li>Chiudi il rubinetto</li>
      </ol>
      
      <h2>Metodo 4 — Controlla le valvole di zona</h2>
      <p>Negli impianti a zone, ogni zona ha una valvola motorizzata.</p>
      <ol>
        <li>Individua il collettore dell'impianto</li>
        <li>Verifica che tutte le valvole siano aperte</li>
        <li>Controlla che i motorini elettrici funzionino</li>
        <li>Se una valvola è bloccata, potrebbe servire sostituzione</li>
      </ol>
      
      <h2>Metodo 5 — Verifica se l'impianto è sporco</h2>
      <p>Fanghi e ruggine possono ostruire la circolazione. Alcuni segnali:</p>
      <ul>
        <li>Alcuni termosifoni non scaldano, altri sì</li>
        <li>L'acqua di sfiato è scura o nera</li>
        <li>Rumori di gorgoglio continui</li>
        <li>Termosifoni che scaldano solo in parte (macchie fredde)</li>
      </ul>
      <p>In questo caso serve un lavaggio dell'impianto da parte di un professionista.</p>
      
      <h2>Caso particolare: tutti i termosifoni freddi</h2>
      <ul>
        <li>Controlla che la caldaia sia accesa e funzionante</li>
        <li>Verifica il termostato ambiente (temperatura impostata troppo bassa?)</li>
        <li>Controlla la pompa di circolazione (senti un ronzio?)</li>
        <li>Verifica che non ci sia un blocco sulla caldaia</li>
      </ul>
      
      <h2>Quando chiamare un idraulico</h2>
      <p>Se dopo aver sfiatato, controllato le valvole e la pressione il termosifone resta freddo, potrebbe esserci un problema più serio: ostruzione da fanghi, pompa guasta, valvole di zona rotte. In questi casi serve un intervento professionale con eventuale lavaggio chimico dell'impianto.</p>
    `
  },
  
  // ===== SCALDABAGNO NON SCALDA =====
  {
    slug: 'scaldabagno-non-scalda-acqua',
    title: 'Scaldabagno Non Scalda: Cosa Controllare Prima di Chiamare',
    metaTitle: 'Scaldabagno Non Scalda: 5 Controlli Fai-Da-Te | Guida 2025',
    metaDescription: 'Lo scaldabagno non produce acqua calda? Ecco cosa verificare prima di chiamare il tecnico. Soluzioni per boiler elettrici e a gas.',
    h1: 'Scaldabagno Non Scalda: Cosa Verificare',
    excerpt: 'Acqua fredda dal rubinetto? Prima di chiamare il tecnico, verifica questi punti sullo scaldabagno. Spesso la soluzione è semplice.',
    category: 'emergenze',
    tags: ['scaldabagno', 'boiler', 'acqua calda', 'termostato', 'resistenza'],
    publishedAt: '2025-01-26',
    updatedAt: '2025-01-26',
    readingTime: 6,
    content: `
      <p>Apri l'acqua calda e arriva fredda. Lo scaldabagno non scalda. Prima di chiamare il tecnico (con costi che partono da 60-80€), fai questi controlli. Nel 40% dei casi puoi risolvere da solo in pochi minuti.</p>
      
      <h2>Cause comuni del malfunzionamento</h2>
      <ul>
        <li>Termostato impostato troppo basso o guasto</li>
        <li>Interruttore o salvavita scattato</li>
        <li>Pilota spento (scaldabagno a gas)</li>
        <li>Resistenza bruciata (elettrico)</li>
        <li>Calcare eccessivo nel serbatoio</li>
        <li>Valvola di sicurezza bloccata</li>
      </ul>
      
      <h2>Metodo 1 — Controlla l'alimentazione (elettrico)</h2>
      <p>Sembra banale, ma è la causa più frequente.</p>
      <ol>
        <li>Verifica che l'interruttore dello scaldabagno sia su ON</li>
        <li>Controlla il quadro elettrico: è scattato il salvavita?</li>
        <li>Se c'è un timer, verifica la programmazione</li>
        <li>Prova a spegnere e riaccendere l'interruttore</li>
      </ol>
      
      <h2>Metodo 2 — Regola il termostato</h2>
      <p>Il termostato potrebbe essere troppo basso o essersi spostato accidentalmente.</p>
      <ol>
        <li>Individua la manopola del termostato (di solito sotto un coperchio)</li>
        <li>Verifica che sia impostato tra 50-60°C</li>
        <li>Se era al minimo, alzalo e attendi 1-2 ore</li>
        <li>Se l'acqua resta fredda, il termostato potrebbe essere guasto</li>
      </ol>
      
      <h2>Metodo 3 — Riaccendi il pilota (a gas)</h2>
      <p>Negli scaldabagno a gas, il pilota può spegnersi per correnti d'aria o mancanza momentanea di gas.</p>
      <ol>
        <li>Apri lo sportello inferiore dello scaldabagno</li>
        <li>Verifica se la fiammella pilota è accesa</li>
        <li>Se è spenta, segui le istruzioni sul pannello per riaccenderla</li>
        <li>Di solito: tieni premuto il pulsante e avvicina una fiamma</li>
        <li>Mantieni premuto 30 secondi dopo l'accensione</li>
      </ol>
      
      <h2>Metodo 4 — Controlla la valvola di sicurezza</h2>
      <p>La valvola di sicurezza potrebbe bloccarsi ed impedire il riscaldamento.</p>
      <ol>
        <li>Individua la valvola (di solito in alto, con leva)</li>
        <li>Solleva la leva: dovrebbe uscire un po' d'acqua</li>
        <li>Se non esce nulla o gocciola continuamente, va sostituita</li>
        <li>Una valvola bloccata chiusa non fa circolare l'acqua</li>
      </ol>
      
      <h2>Metodo 5 — Reset dello scaldabagno</h2>
      <p>Molti scaldabagno hanno un reset di sicurezza che si attiva in caso di surriscaldamento.</p>
      <ol>
        <li>Stacca l'alimentazione elettrica</li>
        <li>Attendi 5 minuti</li>
        <li>Cerca il pulsante di reset (spesso rosso, sotto il termostato)</li>
        <li>Premilo se presente</li>
        <li>Riattiva l'alimentazione</li>
      </ol>
      
      <h2>Segnali di problemi seri</h2>
      <ul>
        <li>Rumori di "bollire" dal serbatoio (calcare eccessivo)</li>
        <li>Acqua che esce arrugginita (anodo consumato)</li>
        <li>Gocciolamento dalla base (serbatoio forato)</li>
        <li>Odore di gas (chiamare immediatamente il pronto intervento gas)</li>
      </ul>
      
      <h2>Quando chiamare un idraulico</h2>
      <p>Se dopo questi controlli lo scaldabagno non scalda, probabilmente la resistenza è bruciata o c'è un problema elettrico/di scheda. Per interventi che richiedono di aprire lo scaldabagno o lavorare sull'impianto a gas, è sempre meglio affidarsi a un tecnico qualificato.</p>
    `
  },
  
  // ===== LAVASTOVIGLIE NON SCARICA =====
  {
    slug: 'lavastoviglie-non-scarica-acqua',
    title: 'La Lavastoviglie Non Scarica? Ecco Come Risolvere',
    metaTitle: 'Lavastoviglie Non Scarica: Cause e Soluzioni Fai-Da-Te 2025',
    metaDescription: 'Lavastoviglie con acqua stagnante? Scopri le cause più comuni e come sbloccare lo scarico. Guida pratica con soluzioni step-by-step.',
    h1: 'Lavastoviglie Non Scarica: Cosa Fare',
    excerpt: 'Acqua che ristagna nella lavastoviglie? Ecco come individuare il problema e risolverlo senza chiamare il tecnico.',
    category: 'guide-pratiche',
    tags: ['lavastoviglie', 'scarico bloccato', 'filtro lavastoviglie', 'pompa scarico', 'elettrodomestici'],
    publishedAt: '2025-01-27',
    updatedAt: '2025-01-27',
    readingTime: 6,
    content: `
      <p>Apri la lavastoviglie e trovi acqua stagnante sul fondo. Il ciclo non si completa correttamente. Prima di chiamare un tecnico (costo medio 80-120€), verifica questi punti. Spesso il problema si risolve in 10 minuti.</p>
      
      <h2>Cause comuni dello scarico bloccato</h2>
      <ul>
        <li>Filtro intasato da residui alimentari</li>
        <li>Tubo di scarico piegato o ostruito</li>
        <li>Sifone del lavandino intasato (se condiviso)</li>
        <li>Pompa di scarico bloccata</li>
        <li>Problemi elettronici o alla scheda</li>
      </ul>
      
      <h2>Metodo 1 — Pulisci il filtro</h2>
      <p>La causa più comune in assoluto. Il filtro va pulito regolarmente.</p>
      <ol>
        <li>Svuota l'acqua stagnante con una spugna o un contenitore</li>
        <li>Rimuovi il cestello inferiore</li>
        <li>Estrai il filtro (di solito svitando o ruotando)</li>
        <li>Puliscilo sotto acqua corrente con una spazzola</li>
        <li>Controlla anche la zona sotto il filtro per detriti</li>
        <li>Rimonta il filtro e prova un ciclo di scarico</li>
      </ol>
      
      <h2>Metodo 2 — Verifica il tubo di scarico</h2>
      <p>Il tubo può piegarsi o ostruirsi, impedendo il deflusso.</p>
      <ol>
        <li>Stacca la lavastoviglie dalla corrente</li>
        <li>Accedi al retro dell'elettrodomestico</li>
        <li>Controlla che il tubo non sia piegato o schiacciato</li>
        <li>Stacca il tubo e soffia dentro per verificare che sia libero</li>
        <li>Se ostruito, puliscilo con acqua e una sonda flessibile</li>
      </ol>
      
      <h2>Metodo 3 — Controlla il sifone del lavandino</h2>
      <p>Spesso la lavastoviglie scarica nello stesso sifone del lavandino. Se è intasato, blocca tutto.</p>
      <ol>
        <li>Verifica se anche il lavandino scarica lentamente</li>
        <li>Se sì, il problema è nel sifone</li>
        <li>Pulisci il sifone del lavandino (vedi guida dedicata)</li>
        <li>Riprova la lavastoviglie</li>
      </ol>
      
      <h2>Metodo 4 — Sblocca la pompa di scarico</h2>
      <p>Piccoli oggetti (ossi, stuzzicadenti, vetro) possono bloccare la girante della pompa.</p>
      <ol>
        <li>Stacca la corrente</li>
        <li>Rimuovi il filtro e cerca l'accesso alla pompa</li>
        <li>Di solito c'è un coperchio da svitare</li>
        <li>Rimuovi eventuali corpi estranei</li>
        <li>Verifica che la girante ruoti liberamente</li>
        <li>Rimonta e prova</li>
      </ol>
      
      <h2>Metodo 5 — Reset della lavastoviglie</h2>
      <p>A volte un errore software blocca lo scarico.</p>
      <ol>
        <li>Stacca la spina per 5 minuti</li>
        <li>Riattacca e seleziona un ciclo breve</li>
        <li>Verifica se scarica normalmente</li>
        <li>Consulta il manuale per la procedura di reset specifica</li>
      </ol>
      
      <h2>Codici di errore comuni</h2>
      <ul>
        <li><strong>E24 (Bosch/Siemens):</strong> Problema scarico - verifica tubo e filtro</li>
        <li><strong>F5E2 (Whirlpool):</strong> Troppa schiuma - usa meno detersivo</li>
        <li><strong>i30 (Electrolux):</strong> Allagamento vasca - controlla il galleggiante</li>
        <li><strong>E21 (Miele):</strong> Pompa scarico bloccata</li>
      </ul>
      
      <h2>Quando chiamare un idraulico/tecnico</h2>
      <p>Se filtro e tubo sono liberi ma l'acqua non scarica, potrebbe esserci un problema alla pompa di scarico (va sostituita) o alla scheda elettronica. In questi casi serve un tecnico specializzato in elettrodomestici.</p>
    `
  },
  
  // ===== LAVATRICE PERDE ACQUA =====
  {
    slug: 'lavatrice-perde-acqua-da-sotto',
    title: 'Lavatrice Che Perde Acqua da Sotto: Come Trovare la Perdita',
    metaTitle: 'Lavatrice Perde Acqua: Cause e Soluzioni | Guida 2025',
    metaDescription: 'La lavatrice perde acqua dal fondo? Ecco come individuare l\'origine della perdita: dalla guarnizione al tubo di carico, tutte le cause e soluzioni.',
    h1: 'Lavatrice Perde Acqua: Come Risolvere',
    excerpt: 'Pozzanghera sotto la lavatrice? Ecco come trovare l\'origine della perdita e ripararla senza chiamare il tecnico.',
    category: 'guide-pratiche',
    tags: ['lavatrice perde', 'guarnizione oblò', 'tubo carico', 'perdita lavatrice', 'elettrodomestici'],
    publishedAt: '2025-01-27',
    updatedAt: '2025-01-27',
    readingTime: 6,
    content: `
      <p>Trovare acqua sotto la lavatrice è preoccupante, ma spesso la causa è banale e risolvibile. La chiave è capire da dove esce l'acqua: davanti, dietro, durante il carico o durante lo scarico. Ogni indizio porta alla soluzione.</p>
      
      <h2>Come individuare l'origine della perdita</h2>
      <ul>
        <li>Asciuga tutto e metti carta assorbente attorno alla lavatrice</li>
        <li>Fai partire un lavaggio e osserva quando appare l'acqua</li>
        <li>Nota se perde durante il carico, il lavaggio o lo scarico</li>
        <li>Controlla se la perdita viene da davanti, dietro o sotto</li>
      </ul>
      
      <h2>Causa 1 — Guarnizione dell'oblò</h2>
      <p>Se l'acqua esce dalla parte frontale durante il lavaggio.</p>
      <ol>
        <li>Ispeziona la guarnizione di gomma attorno all'oblò</li>
        <li>Cerca crepe, tagli o oggetti incastrati (monetine, fermagli)</li>
        <li>Pulisci la guarnizione da residui di detersivo</li>
        <li>Se danneggiata, va sostituita (intervento tecnico consigliato)</li>
      </ol>
      
      <h2>Causa 2 — Tubo di carico acqua</h2>
      <p>Se l'acqua esce dal retro all'inizio del ciclo.</p>
      <ol>
        <li>Stacca la corrente e chiudi il rubinetto dell'acqua</li>
        <li>Controlla che il tubo non sia piegato o screpolato</li>
        <li>Verifica i raccordi: sono ben stretti?</li>
        <li>Se i raccordi sono ok, sostituisci le guarnizioni interne</li>
        <li>Se il tubo è danneggiato, comprarne uno nuovo (10-15€)</li>
      </ol>
      
      <h2>Causa 3 — Tubo di scarico</h2>
      <p>Se l'acqua esce durante o dopo lo scarico.</p>
      <ol>
        <li>Controlla che il tubo di scarico non sia crepato</li>
        <li>Verifica che sia ben inserito nel sifone o nello scarico a muro</li>
        <li>L'altezza giusta è 60-90 cm da terra</li>
        <li>Se troppo basso, l'acqua può defluire durante il carico</li>
      </ol>
      
      <h2>Causa 4 — Troppo detersivo</h2>
      <p>Può sembrare strano, ma è una causa comune.</p>
      <ol>
        <li>Troppa schiuma può fuoriuscire dalla guarnizione</li>
        <li>Controlla le dosi consigliate sul detersivo</li>
        <li>Usa detersivi specifici per lavatrici</li>
        <li>Fai un lavaggio a vuoto a 90°C per pulire i residui</li>
      </ol>
      
      <h2>Causa 5 — Cassetto detersivo</h2>
      <p>Se l'acqua esce dalla parte superiore frontale.</p>
      <ol>
        <li>Estrai il cassetto e puliscilo accuratamente</li>
        <li>Verifica che i fori di uscita non siano ostruiti</li>
        <li>Controlla che i tubi interni non siano staccati</li>
        <li>Reinserisci correttamente il cassetto</li>
      </ol>
      
      <h2>Causa 6 — Pompa di scarico</h2>
      <p>Se l'acqua esce da sotto durante lo scarico.</p>
      <ol>
        <li>Accedi alla pompa (di solito dal pannello frontale in basso)</li>
        <li>Controlla la tenuta della pompa</li>
        <li>Verifica le guarnizioni dei tubi collegati</li>
        <li>Se la pompa è danneggiata, va sostituita (intervento tecnico)</li>
      </ol>
      
      <h2>Attenzione: sicurezza prima di tutto</h2>
      <ul>
        <li>Stacca sempre la corrente prima di intervenire</li>
        <li>Chiudi l'acqua dal rubinetto dedicato</li>
        <li>Asciuga bene l'acqua per evitare scivolamenti</li>
        <li>Non usare la lavatrice finché non hai trovato la causa</li>
      </ul>
      
      <h2>Quando chiamare un idraulico/tecnico</h2>
      <p>Se la perdita viene da componenti interni (cuscinetti, vasca, pompa), serve un tecnico specializzato. Anche la sostituzione della guarnizione oblò, sebbene fattibile, richiede attrezzi specifici. Per perdite dai tubi o raccordi esterni, puoi risolvere da solo.</p>
    `
  }
];
