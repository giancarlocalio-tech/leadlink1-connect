/**
 * National Service Pages Data
 * 
 * Pagine /servizi/ indicizzabili con contenuto approfondito
 * e link alle Top 50 città
 */

export interface ServicePage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: {
    description: string;
    services: string[];
    whenToCall: string[];
    process: string[];
    pricing: {
      service: string;
      range: string;
    }[];
    tips: string[];
  };
  relatedKeywords: string[];
}

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: 'pronto-intervento-idraulico',
    title: 'Pronto Intervento Idraulico 24 Ore',
    metaTitle: 'Pronto Intervento Idraulico 24h | Emergenze in Tutta Italia',
    metaDescription: 'Pronto intervento idraulico disponibile 24 ore su 24, 7 giorni su 7. Emergenze idrauliche, perdite, allagamenti. Trova un idraulico nella tua città.',
    h1: 'Pronto Intervento Idraulico 24 Ore',
    intro: `Quando si verifica un'emergenza idraulica, ogni minuto conta. Una perdita d'acqua può causare danni significativi alla struttura dell'abitazione, ai mobili e agli impianti elettrici. Il nostro servizio di pronto intervento idraulico collega i clienti con professionisti disponibili 24 ore su 24, 7 giorni su 7, festivi inclusi.`,
    sections: {
      description: `Il pronto intervento idraulico è un servizio di emergenza pensato per situazioni che richiedono un intervento immediato. A differenza della manutenzione programmata, qui la rapidità è fondamentale per limitare i danni.

I nostri idraulici partner sono attrezzati con furgoni dotati di tutti gli strumenti necessari per intervenire immediatamente: sonde, pompe di aspirazione, ricambi comuni, videocamere per ispezione e attrezzatura per rilevamento perdite.`,
      services: [
        'Riparazione perdite d\'acqua urgenti',
        'Sblocco scarichi completamente ostruiti',
        'Intervento per allagamenti',
        'Riparazione tubature rotte',
        'Blocco caldaia in pieno inverno',
        'Perdite da soffitti e infiltrazioni',
        'Rottura rubinetti e valvole',
        'Problemi con sanitari'
      ],
      whenToCall: [
        'Perdita d\'acqua abbondante che non riesci a fermare',
        'Allagamento in corso',
        'WC completamente bloccato (unico in casa)',
        'Caldaia in blocco d\'inverno con temperature rigide',
        'Acqua che fuoriesce da muri o soffitti',
        'Perdita vicino a impianto elettrico',
        'Rottura di tubo principale'
      ],
      process: [
        'Contatto telefonico con descrizione del problema',
        'Invio dell\'idraulico più vicino alla tua zona',
        'Arrivo in tempi brevi (solitamente entro 60 minuti)',
        'Diagnosi rapida e preventivo trasparente',
        'Intervento immediato per bloccare l\'emergenza',
        'Riparazione definitiva o temporanea se servono ricambi'
      ],
      pricing: [
        { service: 'Chiamata + uscita urgente', range: '50-100€' },
        { service: 'Riparazione perdita semplice', range: '80-150€' },
        { service: 'Disostruzione urgente', range: '100-200€' },
        { service: 'Intervento notturno/festivo', range: 'Maggiorazione 30-50%' }
      ],
      tips: [
        'Localizza in anticipo la valvola generale dell\'acqua',
        'Tieni a portata il numero di un idraulico di fiducia',
        'In caso di perdita, chiudi l\'acqua prima di chiamare',
        'Se l\'acqua tocca prese elettriche, stacca la corrente',
        'Documenta i danni con foto per l\'assicurazione'
      ]
    },
    relatedKeywords: ['idraulico urgente', 'emergenza idraulica', 'idraulico 24 ore', 'idraulico notturno']
  },
  {
    slug: 'riparazione-perdite-acqua',
    title: 'Riparazione Perdite d\'Acqua',
    metaTitle: 'Riparazione Perdite Acqua | Individuazione e Riparazione',
    metaDescription: 'Servizio professionale di riparazione perdite d\'acqua. Individuazione con strumentazione avanzata, riparazione rapida. Trova un idraulico esperto.',
    h1: 'Riparazione Perdite d\'Acqua',
    intro: `Una perdita d'acqua, anche piccola, può causare danni enormi nel tempo: muffa, infiltrazioni ai piani inferiori, danni strutturali e bollette salate. La difficoltà maggiore è spesso individuare l'origine esatta della perdita, specialmente quando è nascosta sotto pavimenti o dentro muri.`,
    sections: {
      description: `La riparazione di una perdita d'acqua richiede competenze specifiche e strumentazione avanzata. I nostri idraulici partner utilizzano tecnologie non invasive per localizzare le perdite senza demolire, come termocamere, geofoni e rilevatori di umidità.

Una volta individuata la fonte, l'intervento può essere minimamente invasivo - spesso basta un piccolo foro anziché demolire un'intera parete.`,
      services: [
        'Ricerca perdite con strumentazione avanzata',
        'Riparazione tubi in rame, multistrato e PVC',
        'Sostituzione tratti di tubazione danneggiati',
        'Riparazione perdite su giunti e raccordi',
        'Intervento su perdite nascoste (sotto pavimento, nei muri)',
        'Riparazione perdite da rubinetteria',
        'Sigillatura perdite su impianti esistenti'
      ],
      whenToCall: [
        'Macchie di umidità su muri o soffitti',
        'Pavimento bagnato senza causa apparente',
        'Bolletta dell\'acqua aumentata senza spiegazione',
        'Rumore di acqua che scorre quando tutto è chiuso',
        'Pressione dell\'acqua diminuita',
        'Contatore che gira anche con rubinetti chiusi',
        'Muffa ricorrente in punti specifici'
      ],
      process: [
        'Ispezione visiva iniziale',
        'Ricerca strumentale con termocamera/geofono',
        'Individuazione precisa del punto di perdita',
        'Preventivo per la riparazione',
        'Intervento minimamente invasivo',
        'Verifica dell\'avvenuta riparazione',
        'Eventuale ripristino murario/pavimentale'
      ],
      pricing: [
        { service: 'Ricerca perdita semplice', range: '100-200€' },
        { service: 'Ricerca con strumentazione avanzata', range: '200-400€' },
        { service: 'Riparazione tubo accessibile', range: '80-150€' },
        { service: 'Riparazione tubo sotto traccia', range: '200-500€' },
        { service: 'Sostituzione tratto tubazione', range: '150-400€' }
      ],
      tips: [
        'Non ignorare piccole macchie di umidità',
        'Controlla periodicamente il contatore a rubinetti chiusi',
        'Intervieni subito per evitare danni maggiori',
        'Chiedi sempre dove passa la tubazione prima di forare',
        'Considera un\'assicurazione casa per danni da acqua'
      ]
    },
    relatedKeywords: ['perdita acqua', 'ricerca perdite', 'tubo rotto', 'infiltrazione']
  },
  {
    slug: 'disostruzione-scarichi',
    title: 'Disostruzione Scarichi e Tubature',
    metaTitle: 'Disostruzione Scarichi | Spurgo e Pulizia Tubature',
    metaDescription: 'Servizio professionale di disostruzione scarichi. Spurgo, idrogetto, videoispezione. Intervento rapido per WC, lavandini, docce e fognature.',
    h1: 'Disostruzione Scarichi e Tubature',
    intro: `Uno scarico intasato può trasformarsi rapidamente in un problema serio: cattivi odori, risalita di liquami, impossibilità di usare bagno o cucina. I nostri idraulici partner dispongono di attrezzature professionali per liberare qualsiasi tipo di ostruzione.`,
    sections: {
      description: `La disostruzione professionale utilizza strumenti che vanno ben oltre la ventosa domestica. Le sonde elettriche raggiungono ostruzioni profonde, l'idrogetto ad alta pressione pulisce completamente le pareti delle tubature, e la videoispezione permette di vedere esattamente cosa causa il problema.

Per le situazioni più complesse, come colonne condominiali o fognature esterne, interveniamo con autospurgo attrezzato.`,
      services: [
        'Disostruzione lavandini, bidet e docce',
        'Disostruzione WC intasati',
        'Spurgo colonne di scarico condominiali',
        'Pulizia fognature con idrogetto',
        'Videoispezione tubature',
        'Spurgo fosse settiche e biologiche',
        'Disostruzione pozzetti e caditoie'
      ],
      whenToCall: [
        'WC che non scarica o scarica lentamente',
        'Lavandino che non svuota l\'acqua',
        'Cattivi odori persistenti dagli scarichi',
        'Risalita di acqua in altri sanitari',
        'Gorgoglii quando scarichi',
        'Scarico completamente bloccato',
        'Ostruzione ricorrente nello stesso punto'
      ],
      process: [
        'Valutazione del tipo di ostruzione',
        'Scelta dello strumento più adatto',
        'Intervento con sonda o idrogetto',
        'Verifica del corretto deflusso',
        'Videoispezione se il problema è ricorrente',
        'Consiglio su manutenzione preventiva'
      ],
      pricing: [
        { service: 'Disostruzione semplice (ventosa/sonda)', range: '60-100€' },
        { service: 'Disostruzione con sonda elettrica', range: '100-180€' },
        { service: 'Intervento con idrogetto', range: '150-350€' },
        { service: 'Videoispezione tubature', range: '100-200€' },
        { service: 'Spurgo fossa biologica', range: '200-400€' }
      ],
      tips: [
        'Non gettare grassi e oli nello scarico',
        'Usa griglie raccogli-capelli in doccia',
        'Evita di scaricare salviette nel WC',
        'Fai un lavaggio mensile con acqua bollente',
        'Non usare disgorganti chimici aggressivi regolarmente'
      ]
    },
    relatedKeywords: ['scarico intasato', 'wc bloccato', 'spurgo', 'idrogetto']
  },
  {
    slug: 'manutenzione-caldaie',
    title: 'Manutenzione Caldaie',
    metaTitle: 'Manutenzione Caldaie | Controllo Fumi e Assistenza',
    metaDescription: 'Servizio di manutenzione caldaie obbligatoria. Controllo fumi, pulizia, certificazione. Tecnici abilitati in tutta Italia.',
    h1: 'Manutenzione Caldaie',
    intro: `La manutenzione della caldaia è obbligatoria per legge e fondamentale per sicurezza, efficienza e durata dell'impianto. Un controllo regolare previene guasti improvvisi (soprattutto in inverno), riduce i consumi e garantisce il rispetto delle normative.`,
    sections: {
      description: `La manutenzione caldaia comprende diverse operazioni: pulizia del bruciatore e dello scambiatore, verifica della combustione, controllo dei dispositivi di sicurezza e analisi fumi. Quest'ultima, obbligatoria con cadenza biennale o quadriennale a seconda della Regione, certifica che la caldaia rispetti i limiti di emissione.

I nostri partner sono tecnici abilitati che rilasciano la documentazione richiesta per legge (rapporto di controllo di efficienza energetica).`,
      services: [
        'Manutenzione ordinaria caldaia',
        'Controllo fumi e rilascio bollino',
        'Pulizia bruciatore e scambiatore',
        'Verifica dispositivi di sicurezza',
        'Controllo pressione impianto',
        'Assistenza caldaie in blocco',
        'Sostituzione componenti usurati',
        'Prima accensione caldaie nuove'
      ],
      whenToCall: [
        'Scadenza della manutenzione obbligatoria',
        'Prima dell\'inverno per controllo preventivo',
        'Caldaia che va in blocco frequentemente',
        'Rumori anomali durante il funzionamento',
        'Consumo di gas aumentato senza motivo',
        'Radiatori che non scaldano uniformemente',
        'Caldaia nuova da avviare per la prima volta'
      ],
      process: [
        'Spegnimento e messa in sicurezza',
        'Pulizia componenti interni',
        'Verifica efficienza combustione',
        'Controllo tenuta fumi',
        'Analisi dei fumi di scarico',
        'Compilazione rapporto di controllo',
        'Rilascio bollino regionale',
        'Consigli per ottimizzare l\'uso'
      ],
      pricing: [
        { service: 'Manutenzione ordinaria', range: '80-120€' },
        { service: 'Controllo fumi + bollino', range: '80-150€' },
        { service: 'Manutenzione completa (tutto incluso)', range: '120-180€' },
        { service: 'Sostituzione scheda elettronica', range: '200-400€' },
        { service: 'Sostituzione scambiatore', range: '300-600€' }
      ],
      tips: [
        'Programma la manutenzione prima dell\'inverno',
        'Conserva tutti i rapporti di controllo',
        'Sfoga i termosifoni a inizio stagione',
        'Controlla periodicamente la pressione',
        'Considera un contratto di manutenzione annuale'
      ]
    },
    relatedKeywords: ['manutenzione caldaia', 'controllo fumi', 'bollino caldaia', 'assistenza caldaie']
  },
  {
    slug: 'installazione-sanitari',
    title: 'Installazione Sanitari',
    metaTitle: 'Installazione Sanitari | WC, Lavabi, Docce e Bidet',
    metaDescription: 'Installazione professionale di sanitari: WC, lavabi, bidet, docce, vasche. Sostituzione e montaggio. Trova un idraulico nella tua città.',
    h1: 'Installazione Sanitari',
    intro: `L'installazione di sanitari richiede precisione e competenza per garantire un funzionamento perfetto e duraturo. Che si tratti di sostituire un vecchio WC, installare un nuovo lavabo o montare un box doccia, affidarsi a un professionista evita perdite, infiltrazioni e malfunzionamenti.`,
    sections: {
      description: `L'installazione corretta di un sanitario va oltre il semplice montaggio: richiede il collegamento preciso agli scarichi e alle tubature di alimentazione, la sigillatura perfetta per evitare infiltrazioni, il livellamento accurato e la verifica del corretto funzionamento.

I nostri idraulici partner hanno esperienza con tutti i tipi di sanitari, dalle installazioni tradizionali a quelle più moderne come WC sospesi, docce a filo pavimento e sistemi di scarico nascosti.`,
      services: [
        'Installazione WC (a pavimento e sospesi)',
        'Montaggio lavabi e lavelli',
        'Installazione bidet',
        'Montaggio box doccia e piatti doccia',
        'Installazione vasche da bagno',
        'Sostituzione rubinetteria',
        'Montaggio cassette di scarico incassate',
        'Installazione sanitrit e trituratori'
      ],
      whenToCall: [
        'Ristrutturazione bagno',
        'Sostituzione sanitari vecchi o danneggiati',
        'Installazione sanitari in nuova costruzione',
        'Upgrade a sanitari più moderni (es. WC sospeso)',
        'Aggiunta di un secondo bagno',
        'Cambio layout del bagno',
        'Installazione sanitari accessibili'
      ],
      process: [
        'Sopralluogo per verificare predisposizione impianti',
        'Rimozione vecchi sanitari (se presente)',
        'Preparazione attacchi idraulici',
        'Posizionamento e fissaggio del sanitario',
        'Collegamento scarico e alimentazione',
        'Sigillatura con silicone',
        'Verifica funzionamento e tenuta'
      ],
      pricing: [
        { service: 'Installazione WC a pavimento', range: '80-150€' },
        { service: 'Installazione WC sospeso', range: '150-250€' },
        { service: 'Installazione lavabo', range: '60-120€' },
        { service: 'Installazione bidet', range: '70-130€' },
        { service: 'Montaggio box doccia', range: '100-200€' },
        { service: 'Installazione piatto doccia', range: '150-300€' }
      ],
      tips: [
        'Verifica le dimensioni prima dell\'acquisto',
        'Controlla che gli attacchi siano compatibili',
        'Per WC sospesi serve struttura murata adatta',
        'Il silicone antimuffa dura di più',
        'Mantieni accesso a cassette incassate per manutenzione'
      ]
    },
    relatedKeywords: ['installazione wc', 'montaggio sanitari', 'sostituzione lavabo', 'box doccia']
  }
];

// Helper functions
export function getServicePageBySlug(slug: string): ServicePage | undefined {
  return SERVICE_PAGES.find(s => s.slug === slug);
}

export function getAllServicePages(): ServicePage[] {
  return SERVICE_PAGES;
}
