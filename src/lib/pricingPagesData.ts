/**
 * Pricing Pages Data - SEO pages for plumbing costs
 * 
 * Structure: Title, price tables, urgency info, city links, FAQs
 */

export interface PriceRow {
  service: string;
  price: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface PricingPage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  mainPrices: PriceRow[];
  urgencyPrices?: PriceRow[];
  urgencyNote?: string;
  cityNote: string;
  cityExamples: string[];
  factors: string[];
  whenPriceIncreases: string[];
  faqs: FAQ[];
}

export const PRICING_PAGES: PricingPage[] = [
  {
    slug: 'costi-idraulico',
    title: 'Quanto Costa un Idraulico? Prezzi Medi Aggiornati',
    metaTitle: 'Quanto Costa un Idraulico? Prezzi Medi 2026 | Guida Completa',
    metaDescription: 'Scopri quanto costa un idraulico: uscita 40-70€, piccole riparazioni 50-120€, interventi urgenti 120-300€. Prezzi aggiornati e preventivi gratuiti.',
    h1: 'Quanto Costa un Idraulico? Prezzi Medi Aggiornati',
    intro: 'Capire quanto costa un idraulico è una delle prime domande quando si ha un problema in casa. I prezzi possono variare in base al tipo di intervento, all\'urgenza e alla città. Ecco una guida chiara per orientarti.',
    mainPrices: [
      { service: 'Uscita idraulico (senza lavori)', price: '40 – 70€' },
      { service: 'Piccola riparazione', price: '50 – 120€' },
      { service: 'Riparazione perdita acqua', price: '80 – 200€' },
      { service: 'Spurgo scarico domestico', price: '90 – 180€' },
      { service: 'Sostituzione sifone', price: '70 – 150€' },
      { service: 'Disostruzione WC', price: '80 – 150€' },
      { service: 'Sostituzione rubinetto', price: '60 – 150€' }
    ],
    urgencyPrices: [
      { service: 'Sera/notte', price: '+20% – 50%' },
      { service: 'Weekend/festivi', price: '+30% – 60%' },
      { service: 'Allagamenti gravi', price: 'variabile' }
    ],
    urgencyNote: 'Un intervento urgente può costare tra 120€ e 300€ a seconda del problema.',
    cityNote: 'Sì. Nelle grandi città i costi possono essere leggermente più alti per via della domanda e dei tempi di spostamento.',
    cityExamples: [
      'Milano e Roma: fascia alta dei prezzi',
      'Città medie: prezzi nella media',
      'Zone periferiche: possibile costo extra per distanza'
    ],
    factors: [
      'Tipo di problema',
      'Urgenza',
      'Pezzi di ricambio necessari',
      'Accessibilità dell\'impianto',
      'Orario dell\'intervento'
    ],
    whenPriceIncreases: [
      'Il guasto è nascosto nel muro',
      'Servono attrezzature speciali',
      'Il problema ha causato danni estesi',
      'Serve più di un intervento'
    ],
    faqs: [
      { question: 'Un preventivo idraulico è gratuito?', answer: 'Spesso sì, soprattutto se richiesto online. Su Idraulici Subito puoi ricevere preventivi gratuiti da professionisti della tua zona.' },
      { question: 'Si paga anche se non si fa il lavoro?', answer: 'A volte viene richiesto solo il diritto di chiamata (40-70€), ma molti idraulici lo scontano se poi effettuano il lavoro.' },
      { question: 'Conviene aspettare se la perdita è piccola?', answer: 'No, spesso peggiora e costa di più dopo. Una piccola perdita ignorata può causare danni strutturali e muffa.' }
    ]
  },
  {
    slug: 'costo-riparazione-perdita-acqua',
    title: 'Costo Riparazione Perdita Acqua: Prezzi e Preventivi',
    metaTitle: 'Costo Riparazione Perdita Acqua: Prezzi 2026 | Preventivi',
    metaDescription: 'Quanto costa riparare una perdita d\'acqua? Da 80€ per perdite semplici a 500€ per tubi sotto traccia. Prezzi aggiornati e preventivi gratuiti.',
    h1: 'Costo Riparazione Perdita Acqua',
    intro: 'Una perdita d\'acqua può causare danni importanti se non riparata in tempo. Il costo della riparazione dipende dalla posizione del tubo e dalla gravità del danno.',
    mainPrices: [
      { service: 'Riparazione perdita rubinetto', price: '50 – 100€' },
      { service: 'Riparazione perdita tubo visibile', price: '80 – 150€' },
      { service: 'Ricerca perdita con strumenti', price: '100 – 250€' },
      { service: 'Riparazione tubo sotto traccia', price: '200 – 500€' },
      { service: 'Riparazione perdita cassetta WC', price: '60 – 120€' },
      { service: 'Sostituzione tratto tubazione', price: '150 – 400€' }
    ],
    urgencyPrices: [
      { service: 'Intervento urgente diurno', price: '+30%' },
      { service: 'Intervento notturno/festivo', price: '+50%' },
      { service: 'Allagamento in corso', price: 'da 150€' }
    ],
    urgencyNote: 'In caso di emergenza, i costi aumentano ma intervenire subito limita i danni.',
    cityNote: 'I prezzi variano leggermente tra città. Le grandi città tendono ad avere tariffe più alte.',
    cityExamples: [
      'Roma e Milano: 10-20% sopra la media',
      'Città medie: prezzi standard',
      'Piccoli centri: possibile costo trasferta'
    ],
    factors: [
      'Posizione della perdita (visibile o nascosta)',
      'Tipo di tubazione (rame, multistrato, PVC)',
      'Necessità di ricerca con strumenti',
      'Entità del danno',
      'Accessibilità del punto'
    ],
    whenPriceIncreases: [
      'La perdita è dentro un muro o sotto il pavimento',
      'Serve demolire per accedere',
      'Il tubo è molto vecchio e va sostituito tutto',
      'Ci sono danni collaterali da riparare'
    ],
    faqs: [
      { question: 'Quanto costa trovare una perdita nascosta?', answer: 'La ricerca perdita con strumenti professionali (termocamera, geofono) costa 100-250€, ma evita di demolire a caso.' },
      { question: 'Chi paga se la perdita viene dal vicino?', answer: 'La riparazione è a carico di chi ha causato il danno. Documenta tutto con foto per eventuali rivalse.' },
      { question: 'Posso riparare da solo una perdita?', answer: 'Solo se è un semplice rubinetto o flessibile. Per tubi fissi è meglio chiamare un professionista.' }
    ]
  },
  {
    slug: 'prezzo-spurgo-scarichi',
    title: 'Prezzo Spurgo Scarichi: Costi e Preventivi',
    metaTitle: 'Prezzo Spurgo Scarichi: Quanto Costa? | Prezzi 2026',
    metaDescription: 'Quanto costa uno spurgo scarichi? Disostruzione da 60€, spurgo con autospurgo da 200€. Prezzi aggiornati per casa e condominio.',
    h1: 'Prezzo Spurgo Scarichi: Quanto Costa',
    intro: 'Lo spurgo degli scarichi è necessario quando le normali disostruzioni non bastano. I prezzi variano molto in base al tipo di intervento e all\'attrezzatura necessaria.',
    mainPrices: [
      { service: 'Disostruzione lavandino/doccia', price: '50 – 100€' },
      { service: 'Disostruzione WC', price: '80 – 150€' },
      { service: 'Spurgo con sonda elettrica', price: '100 – 200€' },
      { service: 'Spurgo con idrogetto', price: '150 – 350€' },
      { service: 'Spurgo colonna condominiale', price: '200 – 600€' },
      { service: 'Spurgo fossa biologica', price: '200 – 500€' },
      { service: 'Videoispezione tubature', price: '100 – 200€' }
    ],
    urgencyNote: 'Interventi urgenti (sera/weekend) hanno una maggiorazione del 30-50%.',
    cityNote: 'I prezzi sono simili in tutta Italia, ma nelle grandi città la concorrenza può abbassarli.',
    cityExamples: [
      'Grandi città: più scelta, prezzi competitivi',
      'Zone rurali: possibile costo trasferta',
      'Condomini: spesa spesso divisa tra inquilini'
    ],
    factors: [
      'Tipo di ostruzione (organica, oggetti, radici)',
      'Profondità dell\'intasamento',
      'Attrezzatura necessaria (sonda, idrogetto, autospurgo)',
      'Posizione (appartamento, villa, condominio)',
      'Urgenza dell\'intervento'
    ],
    whenPriceIncreases: [
      'L\'ostruzione è nella colonna condominiale',
      'Servono più interventi combinati',
      'Ci sono radici nelle tubature',
      'Il problema è ricorrente e serve diagnosi'
    ],
    faqs: [
      { question: 'Qual è la differenza tra disostruzione e spurgo?', answer: 'La disostruzione rimuove un\'ostruzione specifica (sonda). Lo spurgo pulisce completamente le tubature (idrogetto o autospurgo).' },
      { question: 'Quanto costa un autospurgo?', answer: 'L\'intervento con camion autospurgo parte da 200-300€ per situazioni semplici, fino a 800€ per colonne condominiali.' },
      { question: 'Chi paga lo spurgo in condominio?', answer: 'Se l\'intasamento è nella colonna comune, paga il condominio. Se è nel tratto privato, paga il singolo condomino.' }
    ]
  },
  {
    slug: 'costo-wc-intasato',
    title: 'Costo Disostruzione WC: Prezzi e Preventivi',
    metaTitle: 'Costo Disostruzione WC Intasato: Prezzi 2026 | Preventivi',
    metaDescription: 'Quanto costa sturare un WC intasato? Da 80€ per disostruzione semplice a 200€ con sonda. Prezzi aggiornati e interventi urgenti.',
    h1: 'Costo Disostruzione WC Intasato',
    intro: 'Un WC intasato è un\'emergenza domestica comune. Il costo per sturarlo dipende dalla gravità dell\'ostruzione e dagli strumenti necessari.',
    mainPrices: [
      { service: 'Disostruzione con ventosa/manuale', price: '60 – 100€' },
      { service: 'Disostruzione con sonda', price: '100 – 180€' },
      { service: 'Disostruzione con idrogetto', price: '150 – 250€' },
      { service: 'Recupero oggetto caduto', price: '100 – 250€' },
      { service: 'Smontaggio WC per accesso', price: '+50 – 100€' }
    ],
    urgencyPrices: [
      { service: 'Intervento urgente diurno', price: '100 – 180€' },
      { service: 'Intervento serale', price: '150 – 220€' },
      { service: 'Intervento notturno/festivo', price: '180 – 300€' }
    ],
    urgencyNote: 'Se il WC è l\'unico in casa, viene considerato intervento urgente.',
    cityNote: 'I prezzi sono abbastanza uniformi, con variazioni del 10-20% tra città.',
    cityExamples: [
      'Grandi città: più disponibilità per urgenze',
      'Città medie: prezzi nella norma',
      'Zone isolate: possibile attesa più lunga'
    ],
    factors: [
      'Tipo di ostruzione (carta, oggetti, calcare)',
      'Posizione dell\'intasamento (sifone o tubatura)',
      'Necessità di smontare il WC',
      'Urgenza e orario dell\'intervento'
    ],
    whenPriceIncreases: [
      'È caduto un oggetto solido (giocattolo, spazzola)',
      'L\'ostruzione è oltre il sifone',
      'Bisogna smontare il WC',
      'È un WC sospeso (più complesso)'
    ],
    faqs: [
      { question: 'Posso sturare il WC da solo?', answer: 'Puoi provare con ventosa e acqua calda. Se non funziona dopo 2-3 tentativi, meglio chiamare un professionista.' },
      { question: 'Quanto tempo ci vuole?', answer: 'Una disostruzione semplice richiede 15-30 minuti. Casi complessi possono richiedere 1-2 ore.' },
      { question: 'Il WC potrebbe rompersi durante lo sturaggio?', answer: 'Con strumenti professionali è raro. Il rischio aumenta con metodi fai-da-te improvvisati.' }
    ]
  },
  {
    slug: 'costo-sostituzione-sifone',
    title: 'Costo Sostituzione Sifone Lavello: Prezzi',
    metaTitle: 'Costo Sostituzione Sifone Lavello: Prezzi 2026 | Guida',
    metaDescription: 'Quanto costa sostituire un sifone? Da 70€ per sifone standard a 150€ per sifoni speciali. Prezzi materiale + manodopera.',
    h1: 'Costo Sostituzione Sifone Lavello',
    intro: 'Il sifone è un componente semplice ma essenziale. La sua sostituzione è un intervento rapido e poco costoso, se fatto da un professionista.',
    mainPrices: [
      { service: 'Sostituzione sifone standard', price: '70 – 120€' },
      { service: 'Sostituzione sifone cucina', price: '80 – 150€' },
      { service: 'Sostituzione sifone bagno', price: '70 – 130€' },
      { service: 'Sifone con trituratore', price: '150 – 250€' },
      { service: 'Solo manodopera (sifone tuo)', price: '40 – 70€' }
    ],
    urgencyNote: 'La sostituzione del sifone raramente è urgente, ma se perde molto puoi chiederla prioritaria.',
    cityNote: 'I prezzi del sifone sono simili ovunque. La manodopera può variare del 10-20%.',
    cityExamples: [
      'Grandi città: manodopera leggermente più alta',
      'Piccoli centri: prezzi più contenuti',
      'Ferramenta: sifoni da 10-40€'
    ],
    factors: [
      'Tipo di sifone (standard, salvaspazio, con troppopieno)',
      'Materiale (plastica, ottone, acciaio)',
      'Accessibilità sotto il lavello',
      'Necessità di adattatori'
    ],
    whenPriceIncreases: [
      'Servono adattatori per misure non standard',
      'Il vecchio sifone è calcificato e difficile da rimuovere',
      'Bisogna modificare gli attacchi',
      'È un sifone da incasso'
    ],
    faqs: [
      { question: 'Posso cambiare il sifone da solo?', answer: 'Sì, è uno dei lavori idraulici più semplici. Basta svitare il vecchio e avvitare il nuovo. Se non sei pratico, un idraulico lo fa in 15-20 minuti.' },
      { question: 'Quanto dura un sifone?', answer: 'Un sifone in plastica dura 10-15 anni, uno in ottone anche 30 anni se ben mantenuto.' },
      { question: 'Come capisco se il sifone va sostituito?', answer: 'Quando perde nonostante le guarnizioni nuove, è crepato, o è molto incrostato e puzza anche dopo la pulizia.' }
    ]
  },
  {
    slug: 'costo-manutenzione-caldaia',
    title: 'Costo Manutenzione Caldaia: Prezzi Aggiornati',
    metaTitle: 'Costo Manutenzione Caldaia: Prezzi 2026 | Bollino e Controllo',
    metaDescription: 'Quanto costa la manutenzione caldaia? Da 80€ per controllo ordinario a 150€ con analisi fumi e bollino. Prezzi aggiornati.',
    h1: 'Costo Manutenzione Caldaia',
    intro: 'La manutenzione della caldaia è obbligatoria per legge e fondamentale per sicurezza e risparmio. Ecco quanto costa e cosa include.',
    mainPrices: [
      { service: 'Manutenzione ordinaria', price: '80 – 120€' },
      { service: 'Controllo fumi + bollino', price: '80 – 150€' },
      { service: 'Manutenzione completa (tutto incluso)', price: '120 – 180€' },
      { service: 'Prima accensione caldaia nuova', price: '100 – 150€' },
      { service: 'Contratto annuale manutenzione', price: '100 – 200€/anno' }
    ],
    urgencyNote: 'La manutenzione ordinaria non è urgente, ma se la caldaia è in blocco potresti aver bisogno di un intervento urgente (50-80€ in più).',
    cityNote: 'I prezzi sono regolamentati e abbastanza uniformi. Il bollino ha un costo fisso regionale.',
    cityExamples: [
      'Lombardia: bollino ~13€',
      'Lazio: bollino ~10€',
      'Altre regioni: 8-15€'
    ],
    factors: [
      'Tipo di caldaia (tradizionale, condensazione)',
      'Marca e modello',
      'Regione (per il bollino)',
      'Se include o meno l\'analisi fumi'
    ],
    whenPriceIncreases: [
      'La caldaia necessita pulizie extra',
      'Ci sono componenti da sostituire',
      'È un modello particolare con ricambi costosi',
      'Non è stata fatta manutenzione per anni'
    ],
    faqs: [
      { question: 'Ogni quanto va fatta la manutenzione?', answer: 'La manutenzione ordinaria va fatta ogni anno. Il controllo fumi ogni 2-4 anni a seconda della Regione e del tipo di caldaia.' },
      { question: 'Cosa rischio se non faccio la manutenzione?', answer: 'Multa da 50 a 3.000€, maggiore consumo di gas, rischio guasti e, nei casi gravi, pericolo per la sicurezza.' },
      { question: 'Chi può fare la manutenzione?', answer: 'Solo tecnici abilitati che possono rilasciare il rapporto di controllo e applicare il bollino.' }
    ]
  },
  {
    slug: 'costo-idraulico-urgente',
    title: 'Costo Intervento Idraulico Urgente: Prezzi',
    metaTitle: 'Costo Idraulico Urgente: Prezzi 2026 | Emergenze 24h',
    metaDescription: 'Quanto costa un idraulico urgente? Da 100€ diurno a 300€ notturno. Prezzi per emergenze, allagamenti e pronto intervento 24 ore.',
    h1: 'Costo Intervento Idraulico Urgente',
    intro: 'Un\'emergenza idraulica non aspetta. Ma quanto costa chiamare un idraulico fuori orario o nel weekend? Ecco i prezzi reali.',
    mainPrices: [
      { service: 'Intervento urgente diurno (lun-ven)', price: '80 – 150€' },
      { service: 'Intervento serale (dopo le 19)', price: '120 – 200€' },
      { service: 'Intervento notturno (dopo le 22)', price: '150 – 280€' },
      { service: 'Intervento weekend', price: '120 – 220€' },
      { service: 'Intervento festivo', price: '150 – 300€' },
      { service: 'Emergenza allagamento', price: '150 – 400€' }
    ],
    urgencyNote: 'Questi sono i costi di uscita + prima diagnosi. La riparazione si aggiunge in base al problema.',
    cityNote: 'Nelle grandi città c\'è più disponibilità per urgenze, ma i prezzi sono leggermente più alti.',
    cityExamples: [
      'Milano, Roma: +10-20% rispetto alla media',
      'Città medie: prezzi standard',
      'Zone periferiche: possibile attesa più lunga'
    ],
    factors: [
      'Orario della chiamata',
      'Giorno (feriale, weekend, festivo)',
      'Distanza del tecnico',
      'Gravità dell\'emergenza'
    ],
    whenPriceIncreases: [
      'È notte fonda o un giorno festivo importante',
      'Serve attrezzatura speciale',
      'L\'allagamento è esteso',
      'Servono più tecnici contemporaneamente'
    ],
    faqs: [
      { question: 'Come posso ridurre il costo?', answer: 'Chiudi l\'acqua generale prima di chiamare. Se il problema è contenuto, potresti aspettare il mattino seguente.' },
      { question: 'Il preventivo viene fatto prima?', answer: 'Di solito viene data una stima telefonica, poi un preventivo preciso dopo aver visto il problema.' },
      { question: 'Devo pagare se poi non faccio i lavori?', answer: 'Generalmente sì, il costo dell\'uscita urgente viene comunque addebitato (diritto di chiamata).' }
    ]
  },
  {
    slug: 'costo-riparazione-tubo-perdita',
    title: 'Costo Riparazione Tubo che Perde: Prezzi',
    metaTitle: 'Costo Riparazione Tubo che Perde: Prezzi 2026 | Guida',
    metaDescription: 'Quanto costa riparare un tubo che perde? Da 80€ per tubi visibili a 500€ per tubi nel muro. Prezzi e preventivi.',
    h1: 'Costo Riparazione Tubo che Perde',
    intro: 'Un tubo che perde può causare danni importanti. Il costo della riparazione dipende dalla posizione e dal tipo di tubo.',
    mainPrices: [
      { service: 'Riparazione tubo visibile', price: '80 – 150€' },
      { service: 'Sostituzione tratto tubo (1-2 metri)', price: '120 – 250€' },
      { service: 'Riparazione tubo sotto lavello', price: '70 – 130€' },
      { service: 'Riparazione tubo nel muro', price: '200 – 500€' },
      { service: 'Riparazione tubo sotto pavimento', price: '300 – 700€' },
      { service: 'Ricerca perdita (strumenti)', price: '100 – 250€' }
    ],
    urgencyNote: 'Se la perdita è abbondante, considera l\'intervento urgente (+30-50%).',
    cityNote: 'La manodopera varia tra città, il materiale (tubi) costa uguale ovunque.',
    cityExamples: [
      'Grandi città: manodopera più cara',
      'Città medie: prezzi standard',
      'I tubi costano 5-20€/metro'
    ],
    factors: [
      'Posizione del tubo (visibile, muro, pavimento)',
      'Materiale del tubo (rame, multistrato, ferro, PVC)',
      'Lunghezza del tratto da sostituire',
      'Necessità di demolizione e ripristino'
    ],
    whenPriceIncreases: [
      'Il tubo è annegato nel cemento',
      'Bisogna demolire piastrelle o pavimento',
      'Il tubo è di un materiale obsoleto',
      'Servono permessi condominiali'
    ],
    faqs: [
      { question: 'Conviene riparare o sostituire tutto il tubo?', answer: 'Se il tubo è vecchio e corroso, spesso conviene sostituire tutto il tratto per evitare problemi futuri.' },
      { question: 'Chi paga le riparazioni al muro dopo?', answer: 'L\'idraulico ripara il tubo. Per il ripristino murario serve un muratore (costo aggiuntivo 100-300€).' },
      { question: 'Quanto tempo ci vuole?', answer: 'Riparazione visibile: 1-2 ore. Tubo nel muro: mezza giornata o più.' }
    ]
  },
  {
    slug: 'costo-installazione-sanitari',
    title: 'Costo Installazione Sanitari Bagno: Prezzi',
    metaTitle: 'Costo Installazione Sanitari: Prezzi 2026 | WC, Lavabo, Bidet',
    metaDescription: 'Quanto costa installare sanitari? WC da 80€, lavabo da 60€, bidet da 70€. Prezzi manodopera per installazione bagno completo.',
    h1: 'Costo Installazione Sanitari Bagno',
    intro: 'Stai ristrutturando il bagno o vuoi sostituire un sanitario? Ecco i costi reali per l\'installazione di WC, lavabo, bidet e doccia.',
    mainPrices: [
      { service: 'Installazione WC a terra', price: '80 – 150€' },
      { service: 'Installazione WC sospeso', price: '150 – 250€' },
      { service: 'Installazione lavabo', price: '60 – 120€' },
      { service: 'Installazione bidet', price: '70 – 130€' },
      { service: 'Installazione piatto doccia', price: '150 – 300€' },
      { service: 'Installazione vasca', price: '200 – 400€' },
      { service: 'Montaggio box doccia', price: '100 – 200€' },
      { service: 'Bagno completo (solo posa)', price: '500 – 1.000€' }
    ],
    urgencyNote: 'L\'installazione sanitari raramente è urgente. Pianificala con anticipo per ottenere prezzi migliori.',
    cityNote: 'La manodopera è più cara nelle grandi città. I sanitari costano uguale online.',
    cityExamples: [
      'Milano, Roma: +15-25% sulla manodopera',
      'Città medie: prezzi standard',
      'Consiglio: compara sempre 2-3 preventivi'
    ],
    factors: [
      'Tipo di sanitario (a terra, sospeso)',
      'Complessità degli attacchi',
      'Necessità di modificare gli scarichi',
      'Se è sostituzione o nuova installazione'
    ],
    whenPriceIncreases: [
      'Gli scarichi vanno spostati',
      'Servono adattatori per attacchi non standard',
      'È un WC sospeso con cassetta da incassare',
      'Il bagno è piccolo e difficile da lavorare'
    ],
    faqs: [
      { question: 'Posso comprare i sanitari e farli solo installare?', answer: 'Sì, molti preferiscono così. L\'idraulico si occupa solo della posa e ti fa pagare meno.' },
      { question: 'Quanto tempo ci vuole?', answer: 'Un sanitario singolo: 1-2 ore. Bagno completo: 1-2 giorni.' },
      { question: 'Cosa serve per il WC sospeso?', answer: 'Serve una struttura incassata nel muro (telaio). Se non c\'è, va installata (costo aggiuntivo 200-400€).' }
    ]
  },
  {
    slug: 'costo-sostituzione-rubinetto',
    title: 'Costo Sostituzione Rubinetto: Prezzi',
    metaTitle: 'Costo Sostituzione Rubinetto: Prezzi 2026 | Cucina e Bagno',
    metaDescription: 'Quanto costa sostituire un rubinetto? Da 50€ per rubinetto bagno a 120€ per miscelatore cucina. Prezzi manodopera + materiale.',
    h1: 'Costo Sostituzione Rubinetto',
    intro: 'Sostituire un rubinetto è un intervento semplice e poco costoso. Ecco i prezzi per bagno, cucina e i diversi tipi di rubinetti.',
    mainPrices: [
      { service: 'Sostituzione rubinetto lavabo', price: '50 – 100€' },
      { service: 'Sostituzione rubinetto cucina', price: '70 – 120€' },
      { service: 'Sostituzione rubinetto bidet', price: '50 – 90€' },
      { service: 'Sostituzione miscelatore doccia', price: '80 – 150€' },
      { service: 'Sostituzione rubinetto incasso', price: '120 – 200€' },
      { service: 'Solo manodopera (rubinetto tuo)', price: '40 – 70€' }
    ],
    urgencyNote: 'Se il rubinetto perde molto, puoi chiudere la valvola sottostante e aspettare un appuntamento normale.',
    cityNote: 'La manodopera varia poco. I rubinetti hanno prezzi molto diversi (da 20€ a 500€).',
    cityExamples: [
      'Rubinetto economico: 20-50€',
      'Rubinetto medio: 50-150€',
      'Rubinetto design/marca: 150-500€'
    ],
    factors: [
      'Tipo di rubinetto (mono, miscelatore, incasso)',
      'Posizione (lavabo, cucina, doccia)',
      'Qualità del rubinetto scelto',
      'Necessità di adattatori'
    ],
    whenPriceIncreases: [
      'È un rubinetto da incasso (serve accedere al muro)',
      'I flessibili sono calcificati e difficili da svitare',
      'Servono adattatori per attacchi non standard',
      'Bisogna sostituire anche le valvole di arresto'
    ],
    faqs: [
      { question: 'Posso cambiare il rubinetto da solo?', answer: 'Sì, è relativamente semplice. Servono chiave inglese, teflon e un po\' di pazienza.' },
      { question: 'Conviene comprare rubinetti economici?', answer: 'I rubinetti troppo economici durano poco. Meglio spendere 50-100€ per qualità media.' },
      { question: 'Quanto dura un rubinetto?', answer: 'Un buon rubinetto dura 10-20 anni. La cartuccia interna potrebbe necessitare sostituzione prima.' }
    ]
  }
];

export function getPricingPageBySlug(slug: string): PricingPage | undefined {
  return PRICING_PAGES.find(p => p.slug === slug);
}

export function getAllPricingPages(): PricingPage[] {
  return PRICING_PAGES;
}
