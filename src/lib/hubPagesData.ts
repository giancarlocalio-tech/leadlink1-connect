/**
 * Hub Pages Data (Pillar Pages)
 * 
 * Pagine pilastro che raggruppano guide correlate per categoria.
 * Ogni hub ha contenuto lungo (800-1200 parole), FAQ, e link silo.
 */

export interface HubFAQ {
  question: string;
  answer: string;
}

export interface HubPage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  categorySlug: string; // Matches GUIDE_CATEGORIES slug
  content: {
    overview: string;
    commonProblems: string;
    whenToWorry: string;
    prevention: string;
    costs: string;
  };
  faqs: HubFAQ[];
  relatedPricingPages: string[]; // slugs
  publishedAt: string;
  updatedAt: string;
}

export const HUB_PAGES: HubPage[] = [
  // ============ PERDITE D'ACQUA ============
  {
    slug: 'perdite-acqua',
    title: 'Perdite d\'Acqua: Guida Completa ai Problemi e Soluzioni',
    metaTitle: 'Perdite d\'Acqua in Casa: Cause, Soluzioni e Costi | Guida Completa',
    metaDescription: 'Tutto quello che devi sapere sulle perdite d\'acqua domestiche: come individuarle, valutare la gravità, intervenire correttamente e quando chiamare un idraulico.',
    h1: 'Perdite d\'Acqua in Casa: Guida Completa',
    intro: 'Le perdite d\'acqua sono tra i problemi idraulici più comuni e potenzialmente dannosi. Che si tratti di un rubinetto che gocciola o di una tubatura nascosta nel muro, ogni perdita merita attenzione. In questa guida completa trovi tutto ciò che devi sapere per identificare, valutare e gestire qualsiasi tipo di perdita idrica.',
    categorySlug: 'perdite',
    content: {
      overview: `
        <p>Le perdite d'acqua domestiche rappresentano uno dei problemi più insidiosi per le abitazioni italiane. Secondo le statistiche, <strong>circa il 30% delle case italiane presenta almeno una perdita nascosta</strong> che spesso passa inosservata per mesi o addirittura anni.</p>
        
        <p>Le conseguenze di una perdita non trattata possono essere devastanti:</p>
        <ul>
          <li><strong>Danni strutturali</strong>: l'acqua indebolisce murature, intonaci e strutture portanti</li>
          <li><strong>Formazione di muffa</strong>: pericolosa per la salute, specialmente per bambini e anziani</li>
          <li><strong>Spreco idrico</strong>: una perdita apparentemente piccola può sprecare migliaia di litri all'anno</li>
          <li><strong>Aumento bollette</strong>: costi che possono raggiungere centinaia di euro annui</li>
          <li><strong>Danni a vicini</strong>: in condominio, le infiltrazioni possono causare danni agli appartamenti sottostanti</li>
        </ul>
        
        <p>La buona notizia è che la maggior parte delle perdite può essere identificata precocemente con un po' di attenzione. <strong>Controllare regolarmente tubature visibili, rubinetti e scarichi</strong> è la prima linea di difesa contro danni maggiori.</p>
      `,
      commonProblems: `
        <h3>Perdite Visibili</h3>
        <p>Le perdite visibili sono le più facili da individuare ma non per questo meno pericolose:</p>
        <ul>
          <li><strong>Rubinetto che gocciola</strong>: causato da guarnizioni usurate o cartucce ceramiche danneggiate</li>
          <li><strong>Sifone che perde</strong>: spesso dovuto a guarnizioni secche o giunti allentati</li>
          <li><strong>WC che perde dalla base</strong>: indica problemi alla guarnizione di tenuta</li>
          <li><strong>Flessibili danneggiati</strong>: i tubi flessibili sotto lavelli e WC sono tra i primi a cedere</li>
        </ul>
        
        <h3>Perdite Nascoste</h3>
        <p>Le perdite nascoste sono più insidiose perché si manifestano quando il danno è già avanzato:</p>
        <ul>
          <li><strong>Perdite nel muro</strong>: si manifestano con macchie di umidità, rigonfiamenti dell'intonaco, pittura che si stacca</li>
          <li><strong>Perdite sotto pavimento</strong>: causano pavimenti che si sollevano, macchie di umidità alla base dei muri</li>
          <li><strong>Perdite in cassoni e colonne</strong>: tipiche dei condomini, possono interessare più appartamenti</li>
        </ul>
        
        <h3>Come Individuare Perdite Nascoste</h3>
        <p>Ecco i segnali d'allarme da non ignorare:</p>
        <ol>
          <li>Bolletta dell'acqua improvvisamente più alta senza motivo apparente</li>
          <li>Rumore di acqua che scorre anche quando tutti i rubinetti sono chiusi</li>
          <li>Macchie di umidità su pareti o soffitti</li>
          <li>Odore di muffa persistente</li>
          <li>Contatore che gira con tutti i rubinetti chiusi</li>
        </ol>
      `,
      whenToWorry: `
        <h3>Situazioni di Emergenza</h3>
        <p>Alcune perdite richiedono intervento immediato:</p>
        <ul>
          <li>🔴 <strong>Acqua che gocciola o scorre visibilmente</strong>: chiudi subito la valvola generale</li>
          <li>🔴 <strong>Perdita vicino a prese elettriche</strong>: stacca la corrente e chiama immediatamente</li>
          <li>🔴 <strong>Acqua che raggiunge il pavimento</strong>: rischio di danni ai vicini sottostanti</li>
          <li>🔴 <strong>Perdita dalla caldaia</strong>: può indicare problemi gravi all'impianto</li>
        </ul>
        
        <h3>Situazioni Urgenti (Entro 24-48 Ore)</h3>
        <ul>
          <li>🟡 Macchia umida che cresce lentamente</li>
          <li>🟡 Rubinetto che gocciola continuamente</li>
          <li>🟡 Aumento anomalo della bolletta</li>
          <li>🟡 Rumore di acqua nelle tubature</li>
        </ul>
        
        <h3>Situazioni da Monitorare</h3>
        <ul>
          <li>🟢 Piccola macchia stabile da tempo</li>
          <li>🟢 Umidità che appare solo con pioggia (potrebbe essere infiltrazione esterna)</li>
          <li>🟢 Condensa su finestre o tubazioni (normale in certi periodi)</li>
        </ul>
      `,
      prevention: `
        <h3>Manutenzione Preventiva</h3>
        <p>Prevenire è sempre meglio che riparare. Ecco cosa puoi fare:</p>
        
        <h4>Controlli Mensili</h4>
        <ul>
          <li>Verifica visivamente tutti i rubinetti per gocciolamenti</li>
          <li>Controlla sotto lavelli e WC per segni di umidità</li>
          <li>Ispeziona i flessibili per segni di usura o rigonfiamenti</li>
        </ul>
        
        <h4>Controlli Stagionali</h4>
        <ul>
          <li><strong>Prima dell'inverno</strong>: isola le tubazioni esposte al freddo</li>
          <li><strong>In primavera</strong>: controlla che non ci siano danni da gelo</li>
          <li><strong>Annualmente</strong>: fai controllare l'impianto da un professionista</li>
        </ul>
        
        <h4>Sostituzioni Preventive</h4>
        <p>Alcuni componenti hanno una durata limitata e vanno sostituiti prima che cedano:</p>
        <ul>
          <li><strong>Flessibili</strong>: ogni 5-7 anni</li>
          <li><strong>Guarnizioni rubinetti</strong>: quando iniziano a gocciolare</li>
          <li><strong>Valvole di intercettazione</strong>: ogni 10-15 anni</li>
        </ul>
      `,
      costs: `
        <h3>Costi Indicativi degli Interventi</h3>
        <p>I costi variano in base alla complessità dell'intervento e alla zona geografica:</p>
        
        <table>
          <thead>
            <tr>
              <th>Tipo di Intervento</th>
              <th>Costo Indicativo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sostituzione guarnizione rubinetto</td>
              <td>30€ - 60€</td>
            </tr>
            <tr>
              <td>Sostituzione flessibile</td>
              <td>40€ - 80€</td>
            </tr>
            <tr>
              <td>Riparazione perdita sifone</td>
              <td>50€ - 100€</td>
            </tr>
            <tr>
              <td>Ricerca perdita con strumenti</td>
              <td>100€ - 300€</td>
            </tr>
            <tr>
              <td>Riparazione tubo nel muro</td>
              <td>200€ - 600€</td>
            </tr>
            <tr>
              <td>Sostituzione tratto tubazione</td>
              <td>300€ - 800€</td>
            </tr>
          </tbody>
        </table>
        
        <p><strong>Nota:</strong> I costi di pronto intervento (sera, weekend, festivi) possono essere maggiorati del 30-50%.</p>
      `
    },
    faqs: [
      {
        question: 'Come faccio a capire se ho una perdita nascosta?',
        answer: 'I segnali principali sono: bolletta dell\'acqua aumentata senza motivo, contatore che gira con rubinetti chiusi, macchie di umidità su pareti o soffitti, rumore di acqua che scorre, odore di muffa. Se noti uno o più di questi segnali, contatta un idraulico per una verifica.'
      },
      {
        question: 'Quanto costa riparare una perdita d\'acqua?',
        answer: 'I costi variano molto: una semplice sostituzione di guarnizione costa 30-60€, mentre la riparazione di un tubo nel muro può arrivare a 200-600€. La ricerca della perdita con strumenti professionali costa 100-300€. Per preventivi precisi, richiedi un sopralluogo.'
      },
      {
        question: 'Posso riparare una perdita da solo?',
        answer: 'Dipende dal tipo di perdita. Sostituire una guarnizione del rubinetto è un intervento fai-da-te accessibile. Ma per perdite nascoste, tubi nel muro o problemi complessi, è sempre meglio affidarsi a un professionista per evitare di peggiorare la situazione.'
      },
      {
        question: 'Cosa devo fare se trovo una perdita d\'acqua in casa?',
        answer: 'Prima di tutto, chiudi la valvola generale dell\'acqua per limitare i danni. Poi documenta la perdita con foto. Allontana mobili e oggetti dalla zona. Se l\'acqua è vicina a prese elettriche, stacca la corrente. Infine, contatta un idraulico il prima possibile.'
      },
      {
        question: 'Quanto tempo ho prima che una perdita causi danni gravi?',
        answer: 'Dipende dall\'entità della perdita. Una perdita abbondante può causare danni strutturali in poche ore. Una piccola perdita nascosta può progredire per settimane prima di manifestarsi, ma nel frattempo crea umidità e favorisce la muffa. Intervenire subito è sempre la scelta migliore.'
      },
      {
        question: 'L\'assicurazione copre i danni da perdite d\'acqua?',
        answer: 'Molte polizze casa includono la copertura per danni da acqua, ma le condizioni variano. Generalmente sono coperti i danni causati da eventi improvvisi, mentre le perdite dovute a mancata manutenzione potrebbero non essere rimborsate. Verifica sempre la tua polizza.'
      },
      {
        question: 'Come si trova una perdita nascosta nel muro?',
        answer: 'I professionisti usano strumenti specifici: rilevatori di umidità per mappare l\'estensione, termocamere per individuare tubazioni calde o fredde, geofoni per "ascoltare" il rumore dell\'acqua, e videoispezioni per controllare l\'interno dei tubi. Questi strumenti evitano demolizioni inutili.'
      }
    ],
    relatedPricingPages: ['costi-idraulico', 'costo-riparazione-perdita-acqua'],
    publishedAt: '2026-01-28',
    updatedAt: '2026-01-28'
  },

  // ============ SCARICHI INTASATI ============
  {
    slug: 'scarichi-intasati',
    title: 'Scarichi Intasati: Guida Completa a Cause e Soluzioni',
    metaTitle: 'Scarichi Intasati: Come Sturare WC, Lavandino e Doccia | Guida Completa',
    metaDescription: 'Problemi con scarichi intasati? Scopri le cause più comuni, i rimedi immediati, cosa evitare e quando chiamare un professionista per la disostruzione.',
    h1: 'Scarichi Intasati: Guida Completa',
    intro: 'Uno scarico intasato è uno dei problemi domestici più fastidiosi e frequenti. Che sia il WC, il lavandino della cucina o lo scarico della doccia, un\'ostruzione può trasformarsi rapidamente in un\'emergenza. Questa guida ti spiega tutto ciò che devi sapere per affrontare e prevenire i problemi di scarico.',
    categorySlug: 'scarichi',
    content: {
      overview: `
        <p>Gli intasamenti degli scarichi sono estremamente comuni nelle abitazioni italiane. <strong>Ogni anno vengono effettuati milioni di interventi di disostruzione</strong>, molti dei quali evitabili con un po' di prevenzione.</p>
        
        <p>Le cause principali degli intasamenti variano in base al tipo di scarico:</p>
        <ul>
          <li><strong>WC</strong>: carta igienica in eccesso, salviette umidificate, oggetti caduti accidentalmente</li>
          <li><strong>Lavandino cucina</strong>: grassi e oli che solidificano, residui di cibo</li>
          <li><strong>Lavandino bagno</strong>: capelli, residui di sapone, dentifricio</li>
          <li><strong>Doccia/Vasca</strong>: capelli, sapone, prodotti per il corpo</li>
          <li><strong>Colonne condominiali</strong>: accumulo di materiali da più appartamenti</li>
        </ul>
        
        <p>Un intasamento non risolto può causare:</p>
        <ul>
          <li>Risalita di liquami e cattivi odori</li>
          <li>Allagamenti del bagno o della cucina</li>
          <li>Danni a pavimenti e mobili</li>
          <li>Problemi igienici e sanitari</li>
          <li>In condominio, danni agli appartamenti vicini</li>
        </ul>
      `,
      commonProblems: `
        <h3>WC Intasato</h3>
        <p>È il problema più urgente perché rende inutilizzabile il bagno:</p>
        <ul>
          <li><strong>Sintomi</strong>: acqua che sale dopo lo scarico, scarico lento, gorgoglii</li>
          <li><strong>Cause comuni</strong>: troppa carta, salviette "biodegradabili" (che non lo sono), oggetti</li>
          <li><strong>Primo intervento</strong>: ventosa speciale per WC, acqua calda con detersivo</li>
        </ul>
        
        <h3>Lavandino Cucina Intasato</h3>
        <p>Spesso causato da grassi che solidificano nelle tubature:</p>
        <ul>
          <li><strong>Sintomi</strong>: acqua che defluisce lentamente, cattivo odore</li>
          <li><strong>Cause comuni</strong>: olio versato nello scarico, residui di cibo</li>
          <li><strong>Primo intervento</strong>: acqua bollente con bicarbonato, ventosa</li>
        </ul>
        
        <h3>Doccia o Vasca Intasata</h3>
        <p>I capelli sono il nemico principale:</p>
        <ul>
          <li><strong>Sintomi</strong>: acqua che ristagna, scarico molto lento</li>
          <li><strong>Cause comuni</strong>: capelli che formano "tappi" con sapone</li>
          <li><strong>Primo intervento</strong>: rimuovere il griglietto e pulire manualmente</li>
        </ul>
        
        <h3>Problemi alla Colonna di Scarico</h3>
        <p>Riguardano tutto il condominio:</p>
        <ul>
          <li><strong>Sintomi</strong>: gorgoglii da più scarichi, odore di fogna, risalita in più appartamenti</li>
          <li><strong>Cause</strong>: accumulo nel tempo, oggetti incastrati, radici</li>
          <li><strong>Intervento</strong>: sempre professionale, spesso richiede videoispezione</li>
        </ul>
      `,
      whenToWorry: `
        <h3>Emergenza - Chiamare Subito</h3>
        <ul>
          <li>🔴 <strong>Risalita di liquami</strong>: acqua sporca che esce dagli scarichi</li>
          <li>🔴 <strong>Allagamento in corso</strong>: acqua che fuoriesce dal WC o lavandino</li>
          <li>🔴 <strong>Unico WC in casa</strong>: non puoi aspettare</li>
          <li>🔴 <strong>Problema in più scarichi contemporaneamente</strong>: indica ostruzione nella colonna</li>
        </ul>
        
        <h3>Urgente - Entro 24 Ore</h3>
        <ul>
          <li>🟡 Scarico molto lento ma funzionante</li>
          <li>🟡 Cattivo odore persistente</li>
          <li>🟡 Gorgoglii quando si scarica</li>
          <li>🟡 Problema ricorrente dopo tentativi fai-da-te</li>
        </ul>
        
        <h3>Da Pianificare</h3>
        <ul>
          <li>🟢 Scarico leggermente rallentato</li>
          <li>🟢 Odore occasionale</li>
          <li>🟢 Manutenzione preventiva programmata</li>
        </ul>
      `,
      prevention: `
        <h3>Prevenzione Quotidiana</h3>
        
        <h4>In Cucina</h4>
        <ul>
          <li><strong>Mai versare olio o grasso</strong> nello scarico - raccoglilo e smaltiscolo</li>
          <li>Usa sempre il filtro raccogli-residui</li>
          <li>Dopo aver lavato i piatti unti, fai scorrere acqua calda</li>
          <li>Settimanalmente: versa acqua bollente con bicarbonato</li>
        </ul>
        
        <h4>In Bagno</h4>
        <ul>
          <li>Installa grigliette raccogli-capelli in doccia e vasca</li>
          <li>Rimuovi i capelli dalla griglietta dopo ogni doccia</li>
          <li>Non gettare salviette, cotton fioc o assorbenti nel WC</li>
          <li>Usa quantità moderate di carta igienica</li>
        </ul>
        
        <h4>Manutenzione Periodica</h4>
        <ul>
          <li><strong>Mensile</strong>: versa acqua bollente in tutti gli scarichi</li>
          <li><strong>Trimestrale</strong>: usa prodotti enzimatici (non chimici aggressivi)</li>
          <li><strong>Annuale</strong>: considera una pulizia professionale preventiva</li>
        </ul>
        
        <p><strong>Importante:</strong> evita l'uso eccessivo di prodotti chimici che possono danneggiare le tubature, specialmente se datate.</p>
      `,
      costs: `
        <h3>Costi Indicativi per Disostruzione</h3>
        
        <table>
          <thead>
            <tr>
              <th>Tipo di Intervento</th>
              <th>Costo Indicativo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Disostruzione WC semplice</td>
              <td>60€ - 100€</td>
            </tr>
            <tr>
              <td>Disostruzione lavandino</td>
              <td>50€ - 90€</td>
            </tr>
            <tr>
              <td>Disostruzione doccia/vasca</td>
              <td>50€ - 90€</td>
            </tr>
            <tr>
              <td>Disostruzione con sonda elettrica</td>
              <td>100€ - 200€</td>
            </tr>
            <tr>
              <td>Spurgo colonna condominiale</td>
              <td>150€ - 400€</td>
            </tr>
            <tr>
              <td>Videoispezione tubature</td>
              <td>100€ - 250€</td>
            </tr>
            <tr>
              <td>Spurgo fossa biologica</td>
              <td>200€ - 500€</td>
            </tr>
          </tbody>
        </table>
        
        <p><strong>Nota:</strong> Gli interventi urgenti (sera, weekend, festivi) hanno una maggiorazione del 30-50%.</p>
      `
    },
    faqs: [
      {
        question: 'Posso usare prodotti chimici per sturare lo scarico?',
        answer: 'I prodotti chimici possono funzionare per intasamenti leggeri, ma presentano rischi: danneggiano le tubature (specialmente quelle vecchie), sono pericolosi da maneggiare, e non risolvono ostruzioni serie. Meglio usare metodi meccanici (ventosa, sonda) o prodotti enzimatici più delicati.'
      },
      {
        question: 'Quanto costa far sturare un WC intasato?',
        answer: 'Una disostruzione semplice costa 60-100€ in orario lavorativo. Se serve una sonda elettrica, il costo sale a 100-200€. Gli interventi urgenti (sera/weekend) hanno maggiorazioni del 30-50%. Per ostruzioni nella colonna condominiale, si arriva a 150-400€.'
      },
      {
        question: 'Perché lo scarico si intasa spesso anche se faccio attenzione?',
        answer: 'Intasamenti ricorrenti indicano un problema strutturale: tubature con pendenza insufficiente, accumuli di calcare, radici che entrano nei tubi, o tubature troppo strette. Una videoispezione può identificare la causa e suggerire la soluzione definitiva.'
      },
      {
        question: 'Le salviette biodegradabili si possono buttare nel WC?',
        answer: 'No, mai. Le salviette "biodegradabili" impiegano molto tempo a decomporsi e nel frattempo causano ostruzioni. Anche quelle etichettate "flushable" sono problematiche. Solo carta igienica può essere gettata nel WC.'
      },
      {
        question: 'Cosa fare se l\'acqua risale da più scarichi contemporaneamente?',
        answer: 'È un segnale di ostruzione nella colonna di scarico principale o nella fognatura. Smetti di usare gli scarichi, chiama subito un professionista. In condominio, avvisa anche l\'amministratore perché potrebbe riguardare più appartamenti.'
      },
      {
        question: 'Ogni quanto va fatta la manutenzione degli scarichi?',
        answer: 'Per uso domestico normale: versare acqua bollente mensilmente, usare prodotti enzimatici ogni 3 mesi, e considerare una pulizia professionale annuale. Per locali commerciali (ristoranti, bar) la frequenza deve essere maggiore.'
      },
      {
        question: 'La videoispezione è davvero necessaria?',
        answer: 'Per problemi occasionali no. Ma per intasamenti ricorrenti, odori persistenti, o prima di acquistare una casa, la videoispezione è fondamentale: mostra lo stato reale delle tubature, individua crepe, radici, accumuli, e permette interventi mirati evitando costi inutili.'
      }
    ],
    relatedPricingPages: ['costo-spurgo-fogne', 'costi-idraulico'],
    publishedAt: '2026-01-28',
    updatedAt: '2026-01-28'
  },

  // ============ CALDAIA E RISCALDAMENTO ============
  {
    slug: 'caldaia-e-riscaldamento',
    title: 'Problemi Caldaia e Riscaldamento: Guida Completa',
    metaTitle: 'Problemi Caldaia e Riscaldamento: Cause, Soluzioni e Costi | Guida Completa',
    metaDescription: 'Caldaia in blocco, termosifoni freddi, acqua calda che non arriva? Scopri le cause più comuni, cosa puoi fare e quando chiamare un tecnico specializzato.',
    h1: 'Problemi Caldaia e Riscaldamento: Guida Completa',
    intro: 'La caldaia è il cuore dell\'impianto di riscaldamento domestico. Quando smette di funzionare correttamente, specialmente in inverno, diventa un\'emergenza. Questa guida ti aiuta a capire i problemi più comuni, valutarne la gravità e sapere quando è necessario l\'intervento di un tecnico.',
    categorySlug: 'caldaie',
    content: {
      overview: `
        <p>Le caldaie moderne sono sistemi complessi che richiedono manutenzione regolare per funzionare correttamente. <strong>La legge italiana prevede controlli obbligatori</strong> con frequenza variabile in base al tipo di impianto e alla regione.</p>
        
        <p>I problemi alla caldaia si manifestano in diversi modi:</p>
        <ul>
          <li><strong>Caldaia in blocco</strong>: si spegne e mostra un codice errore</li>
          <li><strong>Assenza di acqua calda</strong>: la caldaia funziona ma non scalda l'acqua sanitaria</li>
          <li><strong>Termosifoni freddi</strong>: il riscaldamento non funziona correttamente</li>
          <li><strong>Rumori anomali</strong>: fischi, gorgoglii, colpi</li>
          <li><strong>Perdite d'acqua</strong>: dalla caldaia o dall'impianto</li>
          <li><strong>Consumo eccessivo</strong>: bollette del gas anomalmente alte</li>
        </ul>
        
        <p>Alcuni problemi sono risolvibili autonomamente (reset, controllo pressione), altri richiedono assolutamente l'intervento di un tecnico abilitato. <strong>Mai improvvisare interventi su impianti a gas</strong>: è pericoloso e illegale.</p>
      `,
      commonProblems: `
        <h3>Caldaia in Blocco</h3>
        <p>Quando la caldaia va in blocco, sul display appare un codice errore:</p>
        <ul>
          <li><strong>E01, E02, E03</strong>: i codici più comuni, significato varia per marca</li>
          <li><strong>Cause frequenti</strong>: mancanza gas, fiamma che non si accende, sensori guasti</li>
          <li><strong>Cosa provare</strong>: reset tramite pulsante (una sola volta), verificare che il gas sia aperto</li>
          <li><strong>Quando chiamare</strong>: se il blocco si ripete dopo il reset</li>
        </ul>
        
        <h3>Pressione Caldaia Anomala</h3>
        <p>La pressione ideale è tra 1 e 1,5 bar a impianto freddo:</p>
        <ul>
          <li><strong>Pressione bassa</strong>: può indicare perdita nell'impianto o necessità di ricaricare</li>
          <li><strong>Pressione alta</strong>: vaso di espansione da controllare, possibile guasto</li>
          <li><strong>Cosa fare</strong>: ripristinare la pressione tramite rubinetto di carico</li>
          <li><strong>Quando chiamare</strong>: se la pressione cala/sale frequentemente</li>
        </ul>
        
        <h3>Termosifoni Freddi</h3>
        <p>Quando alcuni o tutti i termosifoni non scaldano:</p>
        <ul>
          <li><strong>Solo uno freddo</strong>: potrebbe avere aria, provare a sfiatarlo</li>
          <li><strong>Freddi in alto</strong>: aria nell'impianto da sfiatare</li>
          <li><strong>Tutti freddi</strong>: problema alla caldaia o alla pompa di circolazione</li>
          <li><strong>Freddi al piano alto</strong>: pressione insufficiente</li>
        </ul>
        
        <h3>Acqua Calda Assente o Insufficiente</h3>
        <ul>
          <li><strong>Niente acqua calda</strong>: caldaia in blocco, sensore guasto, o problema al bruciatore</li>
          <li><strong>Acqua tiepida</strong>: scambiatore intasato, portata insufficiente</li>
          <li><strong>Acqua calda intermittente</strong>: problema al flussostato o alla modulazione</li>
        </ul>
      `,
      whenToWorry: `
        <h3>Emergenza - Chiamare Subito</h3>
        <ul>
          <li>🔴 <strong>Odore di gas</strong>: non accendere luci, aprire finestre, uscire, chiamare pronto intervento gas</li>
          <li>🔴 <strong>Perdita d'acqua dalla caldaia</strong>: chiudere l'acqua e chiamare</li>
          <li>🔴 <strong>Fumo o odore di bruciato</strong>: spegnere immediatamente e chiamare</li>
          <li>🔴 <strong>Casa senza riscaldamento in inverno</strong>: specialmente con bambini o anziani</li>
        </ul>
        
        <h3>Urgente - Entro 24-48 Ore</h3>
        <ul>
          <li>🟡 Caldaia in blocco che non riparte dopo reset</li>
          <li>🟡 Niente acqua calda</li>
          <li>🟡 Termosifoni tutti freddi</li>
          <li>🟡 Rumori anomali persistenti</li>
        </ul>
        
        <h3>Da Programmare</h3>
        <ul>
          <li>🟢 Manutenzione annuale obbligatoria</li>
          <li>🟢 Termosifone singolo da sfiatare</li>
          <li>🟢 Pressione da ricaricare occasionalmente</li>
          <li>🟢 Piccolo gocciolamento da valvola</li>
        </ul>
      `,
      prevention: `
        <h3>Manutenzione Obbligatoria</h3>
        <p>Per legge, le caldaie devono essere sottoposte a:</p>
        <ul>
          <li><strong>Controllo efficienza energetica</strong>: ogni 2-4 anni (dipende dalla potenza e regione)</li>
          <li><strong>Manutenzione ordinaria</strong>: consigliata annualmente</li>
          <li><strong>Libretto impianto</strong>: deve essere sempre aggiornato</li>
        </ul>
        
        <h3>Cosa Include la Manutenzione</h3>
        <ul>
          <li>Pulizia bruciatore e scambiatore</li>
          <li>Controllo tenuta circuito gas</li>
          <li>Verifica sicurezze</li>
          <li>Analisi fumi di combustione</li>
          <li>Controllo pressione vaso espansione</li>
        </ul>
        
        <h3>Buone Pratiche</h3>
        <ul>
          <li>Controlla periodicamente la pressione dell'impianto</li>
          <li>Prima dell'inverno, accendi il riscaldamento per verificare che tutto funzioni</li>
          <li>Sfiata i termosifoni a inizio stagione</li>
          <li>Non coprire la caldaia con oggetti</li>
          <li>Assicurati che le prese d'aria non siano ostruite</li>
        </ul>
      `,
      costs: `
        <h3>Costi Indicativi Interventi Caldaia</h3>
        
        <table>
          <thead>
            <tr>
              <th>Tipo di Intervento</th>
              <th>Costo Indicativo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Manutenzione ordinaria + analisi fumi</td>
              <td>80€ - 150€</td>
            </tr>
            <tr>
              <td>Riparazione blocco caldaia</td>
              <td>80€ - 200€</td>
            </tr>
            <tr>
              <td>Sostituzione scheda elettronica</td>
              <td>200€ - 400€</td>
            </tr>
            <tr>
              <td>Sostituzione scambiatore</td>
              <td>300€ - 600€</td>
            </tr>
            <tr>
              <td>Lavaggio impianto riscaldamento</td>
              <td>200€ - 400€</td>
            </tr>
            <tr>
              <td>Sostituzione caldaia completa</td>
              <td>1.500€ - 4.000€</td>
            </tr>
          </tbody>
        </table>
        
        <p><strong>Detrazioni fiscali:</strong> Per la sostituzione della caldaia con modelli a condensazione sono disponibili detrazioni fiscali dal 50% al 65%.</p>
      `
    },
    faqs: [
      {
        question: 'Ogni quanto va fatta la manutenzione della caldaia?',
        answer: 'La manutenzione ordinaria è consigliata annualmente, preferibilmente prima dell\'inverno. Il controllo fumi obbligatorio ha frequenza variabile (ogni 2-4 anni) in base alla potenza della caldaia e alla regione. Consulta il libretto impianto o il tuo tecnico di fiducia.'
      },
      {
        question: 'Cosa fare se la caldaia va in blocco?',
        answer: 'Prova a fare un reset tramite il pulsante dedicato (una sola volta). Se il blocco si ripete, annota il codice errore sul display e chiama un tecnico. Non continuare a resettare: potrebbe nascondere un problema serio.'
      },
      {
        question: 'Perché la caldaia perde pressione?',
        answer: 'Le cause più comuni sono: piccola perdita nell\'impianto (radiatori, valvole, giunti), vaso di espansione scarico, valvola di sicurezza che perde. Se devi ricaricare spesso, c\'è sicuramente una perdita da individuare.'
      },
      {
        question: 'Come si sfiata un termosifone?',
        answer: 'Spegni la caldaia e attendi che i termosifoni si raffreddino. Con una chiave per sfiatare (o un cacciavite piatto), apri la valvolina di sfiato in alto. Lascia uscire l\'aria finché non esce solo acqua. Chiudi e verifica la pressione della caldaia.'
      },
      {
        question: 'Quanto costa sostituire una caldaia?',
        answer: 'Una caldaia a condensazione nuova costa 1.500-4.000€ installata, in base alla potenza e al modello. Ma grazie alle detrazioni fiscali (50-65%), il costo effettivo è molto inferiore. Richiedi sempre più preventivi.'
      },
      {
        question: 'Posso fare da solo la manutenzione della caldaia?',
        answer: 'No. Per legge, la manutenzione e l\'analisi fumi devono essere eseguite da tecnici abilitati che rilasciano il rapporto di controllo. Puoi solo controllare la pressione e sfiatare i termosifoni. Qualsiasi altro intervento richiede un professionista.'
      },
      {
        question: 'Cosa sono i codici errore della caldaia?',
        answer: 'I codici errore (E01, E02, ecc.) indicano il tipo di guasto rilevato dalla centralina. Ogni marca usa codici diversi. Consulta il manuale o cerca online il codice specifico + marca della caldaia. Comunicalo sempre al tecnico quando chiami.'
      }
    ],
    relatedPricingPages: ['costo-manutenzione-caldaia', 'costo-installazione-caldaia'],
    publishedAt: '2026-01-28',
    updatedAt: '2026-01-28'
  },

  // ============ PROBLEMI SANITARI ============
  {
    slug: 'problemi-sanitari',
    title: 'Problemi Sanitari e Rubinetti: Guida Completa',
    metaTitle: 'Problemi WC, Lavabi, Docce e Rubinetti: Soluzioni e Costi | Guida Completa',
    metaDescription: 'WC che perde, rubinetto che gocciola, doccia con poca pressione? Scopri le cause dei problemi più comuni a sanitari e rubinetti e quando serve un idraulico.',
    h1: 'Problemi Sanitari e Rubinetti: Guida Completa',
    intro: 'I sanitari e i rubinetti sono tra gli elementi più utilizzati in casa. Piccoli problemi come un rubinetto che gocciola o un WC che scorre possono sembrare banali, ma causano sprechi significativi e possono peggiorare nel tempo. Questa guida ti aiuta a riconoscere, gestire e prevenire i problemi più comuni.',
    categorySlug: 'sanitari',
    content: {
      overview: `
        <p>In una casa media, i rubinetti vengono usati decine di volte al giorno e il WC viene azionato 5-10 volte a persona. <strong>Questa usura continua porta inevitabilmente a problemi</strong> che, se trascurati, causano sprechi e danni.</p>
        
        <p>I problemi più comuni sono:</p>
        <ul>
          <li><strong>Rubinetti che gocciolano</strong>: guarnizioni o cartucce usurate</li>
          <li><strong>WC che scorre continuamente</strong>: galleggiante o guarnizione di scarico difettosi</li>
          <li><strong>Scarichi lenti</strong>: accumuli di capelli, sapone, calcare</li>
          <li><strong>Pressione acqua insufficiente</strong>: aeratori intasati o problemi all'impianto</li>
          <li><strong>Perdite dalla base del WC</strong>: guarnizione di tenuta da sostituire</li>
          <li><strong>Doccia che gocciola</strong>: cartuccia o deviatore da sostituire</li>
        </ul>
        
        <p>Molti di questi problemi possono essere risolti con semplici interventi. Altri richiedono l'intervento di un professionista, specialmente quando coinvolgono elementi incassati nel muro.</p>
      `,
      commonProblems: `
        <h3>Rubinetto che Gocciola</h3>
        <p>Un classico problema domestico che causa spreco:</p>
        <ul>
          <li><strong>Rubinetto a vitone</strong>: guarnizione in gomma usurata da sostituire</li>
          <li><strong>Miscelatore monocomando</strong>: cartuccia ceramica da sostituire</li>
          <li><strong>Costo fai-da-te</strong>: 5-20€ per il ricambio</li>
          <li><strong>Costo idraulico</strong>: 30-80€ compreso ricambio</li>
        </ul>
        
        <h3>WC che Perde o Scorre</h3>
        <p>L'acqua che scorre nel WC può sprecare centinaia di litri al giorno:</p>
        <ul>
          <li><strong>Acqua che scorre nella tazza</strong>: guarnizione di scarico da sostituire</li>
          <li><strong>Cassetta che non si riempie</strong>: galleggiante bloccato o rotto</li>
          <li><strong>Acqua dalla base</strong>: guarnizione di tenuta al pavimento</li>
          <li><strong>Pulsante che non funziona</strong>: meccanismo interno da riparare</li>
        </ul>
        
        <h3>Problemi Doccia</h3>
        <ul>
          <li><strong>Getto debole</strong>: soffione intasato dal calcare, pulire con aceto</li>
          <li><strong>Doccia che gocciola</strong>: cartuccia del miscelatore usurata</li>
          <li><strong>Temperatura instabile</strong>: termostatico da regolare o sostituire</li>
          <li><strong>Perdita dal box</strong>: silicone da rifare o guarnizioni da sostituire</li>
        </ul>
        
        <h3>Lavabo e Bidet</h3>
        <ul>
          <li><strong>Scarico lento</strong>: sifone da pulire o sostituire</li>
          <li><strong>Perdita dal sifone</strong>: guarnizioni o dadi allentati</li>
          <li><strong>Rubinetto duro</strong>: calcare interno, necessita manutenzione</li>
          <li><strong>Crepe sul lavabo</strong>: generalmente richiede sostituzione</li>
        </ul>
      `,
      whenToWorry: `
        <h3>Intervento Urgente</h3>
        <ul>
          <li>🔴 <strong>Perdita abbondante dal WC</strong>: rischio allagamento</li>
          <li>🔴 <strong>Perdita da rubinetto incassato</strong>: può danneggiare il muro</li>
          <li>🔴 <strong>WC completamente bloccato</strong>: unico bagno in casa</li>
          <li>🔴 <strong>Acqua che fuoriesce dalla base del WC</strong>: problema di tenuta</li>
        </ul>
        
        <h3>Da Risolvere a Breve</h3>
        <ul>
          <li>🟡 Rubinetto che gocciola costantemente</li>
          <li>🟡 WC che scorre (spreco idrico significativo)</li>
          <li>🟡 Scarico doccia/vasca molto lento</li>
          <li>🟡 Cassetta WC che si riempie lentamente</li>
        </ul>
        
        <h3>Manutenzione Programmabile</h3>
        <ul>
          <li>🟢 Pulizia soffione doccia intasato</li>
          <li>🟢 Rinnovo silicone box doccia</li>
          <li>🟢 Pulizia aeratori rubinetti</li>
          <li>🟢 Sostituzione flessibili preventiva</li>
        </ul>
      `,
      prevention: `
        <h3>Manutenzione Ordinaria</h3>
        
        <h4>Rubinetti</h4>
        <ul>
          <li>Pulisci gli aeratori (i rompigetto) ogni 2-3 mesi per mantenere un getto uniforme</li>
          <li>Non forzare mai la chiusura: danneggia le guarnizioni</li>
          <li>In zone con acqua calcarea, usa addolcitore o pulisci più frequentemente</li>
        </ul>
        
        <h4>WC</h4>
        <ul>
          <li>Non usare tavolette colorate nella cassetta: possono danneggiare le guarnizioni</li>
          <li>Controlla periodicamente che l'acqua non scorra nella tazza</li>
          <li>Non versare prodotti chimici aggressivi</li>
        </ul>
        
        <h4>Doccia</h4>
        <ul>
          <li>Pulisci il soffione con aceto ogni mese in zone calcaree</li>
          <li>Dopo ogni doccia, asciuga le guarnizioni del box</li>
          <li>Rinnova il silicone quando inizia a scurirsi o staccarsi</li>
        </ul>
        
        <h4>Sotto i Lavelli</h4>
        <ul>
          <li>Controlla regolarmente che non ci siano gocciolamenti</li>
          <li>I flessibili vanno sostituiti ogni 5-7 anni preventivamente</li>
          <li>Verifica che i dadi del sifone siano stretti</li>
        </ul>
      `,
      costs: `
        <h3>Costi Indicativi</h3>
        
        <table>
          <thead>
            <tr>
              <th>Intervento</th>
              <th>Costo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sostituzione guarnizione rubinetto</td>
              <td>30€ - 60€</td>
            </tr>
            <tr>
              <td>Sostituzione cartuccia miscelatore</td>
              <td>50€ - 100€</td>
            </tr>
            <tr>
              <td>Installazione rubinetto nuovo</td>
              <td>60€ - 120€</td>
            </tr>
            <tr>
              <td>Riparazione cassetta WC</td>
              <td>50€ - 100€</td>
            </tr>
            <tr>
              <td>Sostituzione WC completo</td>
              <td>150€ - 300€</td>
            </tr>
            <tr>
              <td>Installazione sanitari (set completo)</td>
              <td>300€ - 600€</td>
            </tr>
            <tr>
              <td>Sostituzione box doccia</td>
              <td>200€ - 500€</td>
            </tr>
          </tbody>
        </table>
        
        <p><strong>Nota:</strong> I prezzi si riferiscono alla sola manodopera. Il materiale (rubinetti, sanitari) è escluso.</p>
      `
    },
    faqs: [
      {
        question: 'Quanto spreca un rubinetto che gocciola?',
        answer: 'Un rubinetto che perde 1 goccia al secondo spreca circa 20 litri al giorno, ovvero 7.300 litri all\'anno. Con 2 gocce al secondo, si raddoppia. Oltre al danno economico (15-30€/anno in bolletta), c\'è l\'impatto ambientale.'
      },
      {
        question: 'Posso sostituire da solo la cartuccia del miscelatore?',
        answer: 'Sì, è un intervento accessibile al fai-da-te: chiudi l\'acqua, smonta la leva, estrai la cartuccia vecchia, portala in ferramenta per trovare il ricambio compatibile, rimonta. Servono cacciavite, brugola e chiave regolabile.'
      },
      {
        question: 'Perché il WC continua a scorrere?',
        answer: 'Le cause principali sono: guarnizione di scarico usurata che non sigilla bene, galleggiante che non chiude l\'acqua, o livello dell\'acqua troppo alto. Spesso basta sostituire la guarnizione o regolare il galleggiante.'
      },
      {
        question: 'Come pulisco il soffione della doccia dal calcare?',
        answer: 'Svita il soffione, immergilo in una bacinella con acqua e aceto bianco (50-50) per alcune ore. Poi pulisci i forellini con uno spazzolino. Per manutenzione regolare, basta uno spray anticalcare settimanale.'
      },
      {
        question: 'Quando conviene sostituire anziché riparare?',
        answer: 'Se il rubinetto o sanitario è molto vecchio (15+ anni), ha parti arrugginite, o richiede ricambi introvabili, conviene sostituire. Spesso la riparazione di un rubinetto datato costa quanto uno nuovo. Valuta anche l\'estetica e il risparmio idrico dei modelli nuovi.'
      },
      {
        question: 'Cosa fare se esce poca acqua dalla doccia?',
        answer: 'Prima verifica se il problema è solo la doccia (soffione intasato dal calcare) o generalizzato. Pulisci il soffione con aceto. Se il problema persiste, potrebbe essere la cartuccia del miscelatore, il riduttore di pressione, o un problema dell\'impianto.'
      },
      {
        question: 'Quanto costa far installare un nuovo WC?',
        answer: 'Solo manodopera: 150-300€ per rimuovere il vecchio e installare il nuovo. Se bisogna anche spostare gli scarichi o adattare gli attacchi, il costo aumenta. Il WC stesso costa da 80€ a 500€+ in base al modello.'
      }
    ],
    relatedPricingPages: ['costo-sostituzione-sanitari', 'costi-idraulico'],
    publishedAt: '2026-01-28',
    updatedAt: '2026-01-28'
  },

  // ============ EMERGENZE IDRAULICHE ============
  {
    slug: 'emergenze-idrauliche',
    title: 'Emergenze Idrauliche: Cosa Fare e Chi Chiamare',
    metaTitle: 'Emergenze Idrauliche: Guida Pronto Intervento | Cosa Fare Subito',
    metaDescription: 'Allagamento, tubo rotto, perdita grave? Scopri cosa fare immediatamente in caso di emergenza idraulica e come trovare un idraulico per pronto intervento.',
    h1: 'Emergenze Idrauliche: Cosa Fare Subito',
    intro: 'Un\'emergenza idraulica può capitare in qualsiasi momento: un tubo che esplode, un allagamento improvviso, una perdita che minaccia l\'impianto elettrico. Sapere cosa fare nei primi minuti può fare la differenza tra un problema gestibile e un disastro. Questa guida ti prepara ad affrontare le situazioni più critiche.',
    categorySlug: 'emergenze',
    content: {
      overview: `
        <p>Le emergenze idrauliche sono situazioni che <strong>richiedono azione immediata</strong> per limitare i danni. Non c'è tempo per cercare soluzioni online o aspettare: bisogna agire subito e poi chiamare un professionista.</p>
        
        <p>Le emergenze più comuni sono:</p>
        <ul>
          <li><strong>Allagamento</strong>: da tubo rotto, lavatrice, lavastoviglie, WC</li>
          <li><strong>Tubo che esplode o si rompe</strong>: acqua che fuoriesce a pressione</li>
          <li><strong>Perdita grave dalla caldaia</strong>: rischio per l'impianto</li>
          <li><strong>Riflusso fognario</strong>: liquami che risalgono dagli scarichi</li>
          <li><strong>Gelo che rompe le tubature</strong>: tipico dell'inverno</li>
          <li><strong>Perdita che raggiunge l'elettricità</strong>: rischio elettrico</li>
        </ul>
        
        <p><strong>La regola d'oro</strong>: prima metti in sicurezza (chiudi acqua, stacca corrente se necessario), poi chiama aiuto. Non tentare riparazioni improvvisate in emergenza.</p>
      `,
      commonProblems: `
        <h3>Allagamento in Casa</h3>
        <p>Cause tipiche e azioni immediate:</p>
        <ul>
          <li><strong>Tubo rotto</strong>: chiudi immediatamente la valvola generale</li>
          <li><strong>Lavatrice/lavastoviglie</strong>: chiudi il rubinetto dedicato, scollega dalla corrente</li>
          <li><strong>WC che trabocca</strong>: non tirare più lo scarico, chiudi l'acqua</li>
          <li><strong>Perdita dal piano di sopra</strong>: avvisa i vicini, metti contenitori</li>
        </ul>
        
        <h3>Tubo Rotto o Esploso</h3>
        <ul>
          <li><strong>Primo step</strong>: corri alla valvola generale e chiudi</li>
          <li><strong>Se non sai dov'è</strong>: cerca in bagno, cucina, o vano contatori</li>
          <li><strong>Dopo aver chiuso</strong>: documenta con foto, chiama idraulico</li>
          <li><strong>In condominio</strong>: potrebbe essere necessario chiudere la colonna</li>
        </ul>
        
        <h3>Riflusso Fognario</h3>
        <p>Quando liquami risalgono dagli scarichi:</p>
        <ul>
          <li><strong>Non usare nessuno scarico</strong>: peggioreresti la situazione</li>
          <li><strong>Apri le finestre</strong>: i gas delle fogne sono pericolosi</li>
          <li><strong>Isola la zona</strong>: non calpestare i liquami</li>
          <li><strong>Chiama subito</strong>: serve spurgo professionale urgente</li>
        </ul>
        
        <h3>Perdita + Rischio Elettrico</h3>
        <ul>
          <li><strong>Non toccare acqua vicino a prese</strong>: rischio folgorazione</li>
          <li><strong>Stacca la corrente dal quadro</strong>: usa il salvavita generale</li>
          <li><strong>Se non puoi raggiungere il quadro</strong>: esci e chiama aiuto</li>
          <li><strong>Non usare apparecchi elettrici</strong> nella zona allagata</li>
        </ul>
      `,
      whenToWorry: `
        <h3>🔴 Emergenza Assoluta - Agire ORA</h3>
        <ul>
          <li>Acqua che fuoriesce a getto continuo</li>
          <li>Perdita vicino all'impianto elettrico</li>
          <li>Riflusso di liquami in casa</li>
          <li>Odore di gas dalla caldaia o tubazioni</li>
          <li>Allagamento che sta raggiungendo i vicini sotto</li>
          <li>Tubature gelate che scoppiano</li>
        </ul>
        
        <h3>🟡 Emergenza Controllabile - Agire Velocemente</h3>
        <ul>
          <li>Perdita contenibile con secchi</li>
          <li>Lavatrice che perde (ma è scollegata)</li>
          <li>Caldaia che gocciola</li>
          <li>WC intasato (con altro bagno disponibile)</li>
        </ul>
        
        <h3>Cosa NON È Emergenza</h3>
        <ul>
          <li>Rubinetto che gocciola lentamente</li>
          <li>Scarico un po' lento</li>
          <li>Termosifone che non scalda</li>
          <li>Caldaia in blocco (senza perdite)</li>
        </ul>
        <p>Questi problemi sono urgenti ma non emergenze: puoi aspettare l'orario lavorativo ed evitare tariffe maggiorate.</p>
      `,
      prevention: `
        <h3>Preparati PRIMA dell'Emergenza</h3>
        
        <h4>Conosci la Tua Casa</h4>
        <ul>
          <li><strong>Dove si trova la valvola generale dell'acqua?</strong> Segnala la posizione a tutti in famiglia</li>
          <li><strong>Dov'è il quadro elettrico?</strong> E quale interruttore spegne cosa?</li>
          <li><strong>Hai il numero di un idraulico di fiducia?</strong> Salvalo nel telefono</li>
        </ul>
        
        <h4>Kit Emergenza Idraulica</h4>
        <p>Tieni a portata di mano:</p>
        <ul>
          <li>Nastro americano (per tamponare provvisoriamente)</li>
          <li>Secchi e bacinelle</li>
          <li>Stracci assorbenti</li>
          <li>Torcia (per cercare valvole in zone buie)</li>
          <li>Chiave regolabile</li>
        </ul>
        
        <h4>Manutenzione Preventiva</h4>
        <ul>
          <li><strong>Controlla i flessibili</strong> sotto lavelli: sono tra i primi a cedere</li>
          <li><strong>Prima dell'inverno</strong>: isola tubature esposte al gelo</li>
          <li><strong>Fai controllare la caldaia</strong>: previene perdite improvvise</li>
          <li><strong>In vacanza prolungata</strong>: chiudi l'acqua generale</li>
        </ul>
        
        <h4>Assicurazione Casa</h4>
        <p>Verifica che la tua polizza copra:</p>
        <ul>
          <li>Danni da acqua (rottura tubi, allagamenti)</li>
          <li>Ricerca perdite senza demolizione</li>
          <li>Danni a terzi (vicini, parti comuni)</li>
        </ul>
      `,
      costs: `
        <h3>Costi Pronto Intervento Idraulico</h3>
        
        <table>
          <thead>
            <tr>
              <th>Tipo di Intervento</th>
              <th>Orario Normale</th>
              <th>Sera/Weekend</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Uscita + diagnosi</td>
              <td>40€ - 80€</td>
              <td>60€ - 120€</td>
            </tr>
            <tr>
              <td>Chiusura perdita urgente</td>
              <td>80€ - 150€</td>
              <td>120€ - 220€</td>
            </tr>
            <tr>
              <td>Riparazione tubo rotto</td>
              <td>150€ - 300€</td>
              <td>220€ - 450€</td>
            </tr>
            <tr>
              <td>Spurgo urgente</td>
              <td>150€ - 350€</td>
              <td>250€ - 500€</td>
            </tr>
            <tr>
              <td>Intervento caldaia urgente</td>
              <td>100€ - 200€</td>
              <td>150€ - 300€</td>
            </tr>
          </tbody>
        </table>
        
        <p><strong>Importante:</strong> Le tariffe notturne/festive sono più alte, ma in vera emergenza non puoi aspettare. Valuta se è davvero urgente per evitare costi maggiorati inutili.</p>
      `
    },
    faqs: [
      {
        question: 'Dove si trova la valvola generale dell\'acqua?',
        answer: 'Solitamente: vicino al contatore dell\'acqua, in un vano tecnico sul pianerottolo, sotto il lavello della cucina, o in bagno. Nelle case indipendenti può essere nel garage o all\'esterno. Individuale PRIMA di un\'emergenza.'
      },
      {
        question: 'Quanto costa un idraulico di notte o nel weekend?',
        answer: 'Gli interventi fuori orario hanno maggiorazioni del 30-50% rispetto alle tariffe diurne. Un\'uscita urgente di sera può costare 60-120€ solo per la chiamata, più il costo dell\'intervento. Valuta sempre se puoi aspettare il giorno lavorativo.'
      },
      {
        question: 'Cosa faccio se non riesco a chiudere l\'acqua?',
        answer: 'Se la valvola è bloccata o non sai dove sia: metti contenitori per raccogliere l\'acqua, stacca la corrente se l\'acqua si avvicina a prese, chiama immediatamente un idraulico spiegando la situazione. In condominio, contatta anche l\'amministratore.'
      },
      {
        question: 'Posso usare il nastro americano per fermare una perdita?',
        answer: 'Come soluzione temporanea d\'emergenza sì, può rallentare una perdita in attesa dell\'idraulico. Ma non è una riparazione: l\'acqua in pressione prima o poi trova la strada. È solo per guadagnare tempo, non per evitare l\'intervento.'
      },
      {
        question: 'Chi paga in caso di danni all\'appartamento sotto?',
        answer: 'Generalmente chi causa il danno (o la sua assicurazione). Se la perdita è da parti comuni (colonna, tetto) paga il condominio. Se è dal tuo appartamento (tubo privato, lavatrice) paghi tu. L\'assicurazione casa può coprire questi casi.'
      },
      {
        question: 'Quanto tempo ci vuole per un intervento di emergenza?',
        answer: 'Un buon servizio di pronto intervento arriva entro 30-60 minuti nelle grandi città. In zone rurali o orari notturni può richiedere più tempo. Quando chiami, chiedi sempre una stima dei tempi di arrivo.'
      },
      {
        question: 'Devo avvisare l\'assicurazione subito?',
        answer: 'Sì, appena hai messo in sicurezza la situazione. Molte polizze richiedono denuncia entro 24-72 ore. Documenta tutto con foto e video prima di qualsiasi intervento di riparazione. Conserva fatture e preventivi.'
      }
    ],
    relatedPricingPages: ['costo-pronto-intervento-idraulico', 'costi-idraulico'],
    publishedAt: '2026-01-28',
    updatedAt: '2026-01-28'
  }
];

/**
 * Get a hub page by slug
 */
export function getHubPageBySlug(slug: string): HubPage | undefined {
  return HUB_PAGES.find(hub => hub.slug === slug);
}

/**
 * Get all hub pages
 */
export function getAllHubPages(): HubPage[] {
  return HUB_PAGES;
}
