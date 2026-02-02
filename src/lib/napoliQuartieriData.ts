/**
 * Dati SEO per le pagine quartieri di Napoli
 * Struttura ottimizzata per posizionamento locale
 */

export interface QuartiereData {
  slug: string;
  nome: string;
  nomeCompleto: string;
  descrizione: string;
  problemiComuni: string;
  mapCoordinates: { lat: number; lng: number };
}

export const NAPOLI_QUARTIERI: QuartiereData[] = [
  {
    slug: 'centro-storico',
    nome: 'Centro Storico',
    nomeCompleto: 'Centro Storico di Napoli',
    descrizione: 'Il Centro Storico di Napoli, patrimonio UNESCO, è caratterizzato da edifici antichi con impianti idraulici che richiedono interventi specializzati. Tubature in piombo e ferro, colonne di scarico condivise e accessi difficili sono la norma in questa zona.',
    problemiComuni: 'Nel Centro Storico di Napoli i problemi idraulici più frequenti riguardano le tubature vetuste dei palazzi storici, spesso risalenti al XVIII secolo. Le colonne di scarico condominiali sono sottodimensionate e soggette a frequenti intasamenti. La pressione dell\'acqua può essere instabile a causa della conformazione dei vicoli stretti.',
    mapCoordinates: { lat: 40.8518, lng: 14.2681 }
  },
  {
    slug: 'vomero',
    nome: 'Vomero',
    nomeCompleto: 'Vomero',
    descrizione: 'Il Vomero è un quartiere residenziale collinare di Napoli, situato a circa 250 metri sul livello del mare. Gli edifici, prevalentemente degli anni \'50-\'70, presentano impianti in ferro zincato spesso corrosi dal calcare.',
    problemiComuni: 'Al Vomero i problemi idraulici più comuni sono legati alla pressione dell\'acqua insufficiente ai piani alti, causata dall\'altitudine del quartiere. Le tubature in ferro zincato degli edifici del boom edilizio sono spesso intasate dal calcare. Frequenti anche i problemi alle caldaie durante l\'inverno.',
    mapCoordinates: { lat: 40.8451, lng: 14.2323 }
  },
  {
    slug: 'arenella',
    nome: 'Arenella',
    nomeCompleto: 'Arenella',
    descrizione: 'L\'Arenella è un quartiere collinare adiacente al Vomero, con una miscela di edifici storici e costruzioni più recenti. La zona presenta sfide idrauliche tipiche delle aree in pendenza.',
    problemiComuni: 'All\'Arenella i problemi idraulici più frequenti includono scarichi lenti causati dalla pendenza naturale del terreno, pressione acqua variabile e tubature datate nei condomini più vecchi. Comune anche la corrosione degli impianti per l\'acqua dura della zona.',
    mapCoordinates: { lat: 40.8544, lng: 14.2356 }
  },
  {
    slug: 'posillipo',
    nome: 'Posillipo',
    nomeCompleto: 'Posillipo',
    descrizione: 'Posillipo è il quartiere residenziale più esclusivo di Napoli, affacciato sul golfo. Le ville e gli appartamenti di pregio richiedono interventi idraulici di alta qualità e materiali premium.',
    problemiComuni: 'A Posillipo i problemi idraulici sono spesso legati alla corrosione accelerata causata dalla salsedine marina. Gli impianti delle ville storiche necessitano di manutenzione specializzata. La pressione dell\'acqua può essere problematica nelle zone più elevate della collina.',
    mapCoordinates: { lat: 40.8058, lng: 14.1883 }
  },
  {
    slug: 'chiaia',
    nome: 'Chiaia',
    nomeCompleto: 'Chiaia',
    descrizione: 'Chiaia è il quartiere elegante del lungomare napoletano, con palazzi signorili e boutique di lusso. Gli edifici storici richiedono interventi idraulici discreti e professionali.',
    problemiComuni: 'A Chiaia i problemi idraulici comuni riguardano gli impianti dei palazzi d\'epoca, spesso con tubature originali mai sostituite. La vicinanza al mare causa corrosione nelle tubature metalliche. Frequenti le richieste per ristrutturazioni bagni in appartamenti di pregio.',
    mapCoordinates: { lat: 40.8338, lng: 14.2273 }
  },
  {
    slug: 'mergellina',
    nome: 'Mergellina',
    nomeCompleto: 'Mergellina',
    descrizione: 'Mergellina è il caratteristico borgo marinaro di Napoli, famoso per il porto turistico. La zona presenta edifici di varie epoche con problematiche idrauliche legate all\'ambiente marino.',
    problemiComuni: 'A Mergellina i problemi idraulici più frequenti sono causati dalla salsedine che corrode rapidamente tubature e rubinetteria. Gli scarichi delle attività commerciali del porto richiedono manutenzione costante. La pressione dell\'acqua è generalmente buona ma l\'umidità marina accelera l\'usura degli impianti.',
    mapCoordinates: { lat: 40.8289, lng: 14.2157 }
  },
  {
    slug: 'fuorigrotta',
    nome: 'Fuorigrotta',
    nomeCompleto: 'Fuorigrotta',
    descrizione: 'Fuorigrotta è un quartiere densamente popolato di Napoli ovest, noto per lo Stadio Maradona e la Mostra d\'Oltremare. I condomini degli anni \'60-\'80 presentano impianti che necessitano di aggiornamento.',
    problemiComuni: 'A Fuorigrotta i problemi idraulici più comuni riguardano gli impianti dei grandi condomini: colonne di scarico intasate, pressione insufficiente ai piani alti e tubature in ferro corroso. Frequenti anche le emergenze per perdite nelle cantine e nei garage seminterrati.',
    mapCoordinates: { lat: 40.8260, lng: 14.1889 }
  },
  {
    slug: 'bagnoli',
    nome: 'Bagnoli',
    nomeCompleto: 'Bagnoli',
    descrizione: 'Bagnoli è un quartiere costiero in trasformazione, ex zona industriale ora in riqualificazione. Gli edifici residenziali presentano problematiche tipiche delle zone marine.',
    problemiComuni: 'A Bagnoli i problemi idraulici sono spesso legati all\'umidità e alla salsedine del mare. Gli edifici più datati hanno tubature corrose, mentre le nuove costruzioni possono presentare difetti di installazione. Comune la formazione di calcare negli scaldabagni per la durezza dell\'acqua.',
    mapCoordinates: { lat: 40.8128, lng: 14.1667 }
  },
  {
    slug: 'soccavo',
    nome: 'Soccavo',
    nomeCompleto: 'Soccavo',
    descrizione: 'Soccavo è un quartiere residenziale periferico di Napoli ovest, caratterizzato da edilizia popolare e palazzine degli anni \'70-\'90. Gli impianti idraulici richiedono frequente manutenzione.',
    problemiComuni: 'A Soccavo i problemi idraulici più frequenti riguardano le tubature in ferro zincato ormai obsolete dei condomini IACP. Comuni gli intasamenti degli scarichi condominiali e le perdite nelle colonne montanti. La pressione dell\'acqua può essere scarsa nelle ore di punta.',
    mapCoordinates: { lat: 40.8439, lng: 14.1867 }
  },
  {
    slug: 'pianura',
    nome: 'Pianura',
    nomeCompleto: 'Pianura',
    descrizione: 'Pianura è un quartiere periferico della zona ovest di Napoli, con una miscela di edilizia residenziale e piccole attività. Gli impianti idraulici variano molto a seconda dell\'età degli edifici.',
    problemiComuni: 'A Pianura i problemi idraulici comuni includono intasamenti frequenti dovuti a scarichi obsoleti, perdite nelle tubature interrate e problemi di pressione nelle zone più periferiche. Gli edifici più vecchi hanno spesso fosse settiche che richiedono spurgo regolare.',
    mapCoordinates: { lat: 40.8561, lng: 14.1667 }
  },
  {
    slug: 'san-giovanni-a-teduccio',
    nome: 'San Giovanni a Teduccio',
    nomeCompleto: 'San Giovanni a Teduccio',
    descrizione: 'San Giovanni a Teduccio è un quartiere della periferia orientale di Napoli, storicamente industriale. Gli edifici residenziali sono prevalentemente di edilizia popolare con impianti datati.',
    problemiComuni: 'A San Giovanni a Teduccio i problemi idraulici sono spesso legati alla vetustà degli impianti dei palazzi popolari. Comuni le perdite nelle colonne montanti, gli intasamenti fognari e i problemi alle caldaie centralizzate. La vicinanza al mare causa corrosione accelerata.',
    mapCoordinates: { lat: 40.8367, lng: 14.3089 }
  },
  {
    slug: 'scampia',
    nome: 'Scampia',
    nomeCompleto: 'Scampia',
    descrizione: 'Scampia è un quartiere della periferia nord di Napoli, noto per i grandi complessi di edilizia popolare. Gli impianti idraulici centralizzati richiedono interventi specializzati.',
    problemiComuni: 'A Scampia i problemi idraulici più comuni riguardano gli impianti centralizzati dei grandi condomini: perdite nelle colonne, intasamenti degli scarichi condominiali, pressione insufficiente ai piani alti. Frequenti anche i problemi agli impianti di riscaldamento centralizzato.',
    mapCoordinates: { lat: 40.8967, lng: 14.2456 }
  },
  {
    slug: 'secondigliano',
    nome: 'Secondigliano',
    nomeCompleto: 'Secondigliano',
    descrizione: 'Secondigliano è un quartiere della periferia nord di Napoli con un mix di edilizia popolare e palazzine residenziali. Gli impianti idraulici variano notevolmente per età e condizione.',
    problemiComuni: 'A Secondigliano i problemi idraulici frequenti includono tubature corrose nei palazzi più vecchi, scarichi intasati e problemi di pressione. I condomini IACP hanno spesso colonne di scarico sottodimensionate che causano rigurgiti frequenti.',
    mapCoordinates: { lat: 40.8833, lng: 14.2667 }
  },
  {
    slug: 'ponticelli',
    nome: 'Ponticelli',
    nomeCompleto: 'Ponticelli',
    descrizione: 'Ponticelli è un quartiere della periferia orientale di Napoli, caratterizzato da edilizia mista. Gli impianti idraulici delle costruzioni più datate necessitano di interventi frequenti.',
    problemiComuni: 'A Ponticelli i problemi idraulici comuni sono legati agli impianti obsoleti: perdite nelle tubature interrate, scarichi lenti, problemi alle fosse settiche nelle zone non raggiunte dalla rete fognaria. Frequenti gli allagamenti nelle cantine durante le piogge intense.',
    mapCoordinates: { lat: 40.8511, lng: 14.3422 }
  },
  {
    slug: 'barra',
    nome: 'Barra',
    nomeCompleto: 'Barra',
    descrizione: 'Barra è un quartiere della periferia est di Napoli, con edifici residenziali di varie epoche. La zona presenta problematiche idrauliche tipiche delle aree periferiche.',
    problemiComuni: 'A Barra i problemi idraulici più frequenti riguardano le tubature vetuste dei palazzi più vecchi e gli scarichi delle attività commerciali. Comuni le perdite sotterranee e i problemi di pressione nelle ore di punta. Gli edifici recenti possono avere difetti di costruzione.',
    mapCoordinates: { lat: 40.8567, lng: 14.3267 }
  },
  {
    slug: 'piscinola',
    nome: 'Piscinola',
    nomeCompleto: 'Piscinola',
    descrizione: 'Piscinola è un quartiere della periferia nord di Napoli, caratterizzato da edilizia residenziale degli anni \'70-\'90. Gli impianti idraulici necessitano spesso di aggiornamento.',
    problemiComuni: 'A Piscinola i problemi idraulici comuni includono tubature in ferro corrose dal calcare, scarichi intasati nei condomini e pressione acqua insufficiente ai piani superiori. Frequenti anche i problemi alle caldaie durante i mesi invernali.',
    mapCoordinates: { lat: 40.8889, lng: 14.2333 }
  },
  {
    slug: 'chiaiano',
    nome: 'Chiaiano',
    nomeCompleto: 'Chiaiano',
    descrizione: 'Chiaiano è un quartiere collinare della periferia nord di Napoli, con una miscela di ville, palazzine e case rurali. Gli impianti idraulici variano molto a seconda del tipo di edificio.',
    problemiComuni: 'A Chiaiano i problemi idraulici sono spesso legati alla conformazione collinare: pressione acqua insufficiente nelle zone più elevate, scarichi lenti, pozzi e fosse settiche nelle aree non servite dalla rete. Comuni anche i problemi alle autoclave nelle ville.',
    mapCoordinates: { lat: 40.8778, lng: 14.2111 }
  },
  {
    slug: 'capodimonte',
    nome: 'Capodimonte',
    nomeCompleto: 'Capodimonte',
    descrizione: 'Capodimonte è un quartiere collinare di Napoli, famoso per la Reggia e il Real Bosco. Gli edifici residenziali sono prevalentemente del \'900 con impianti che richiedono manutenzione specializzata.',
    problemiComuni: 'A Capodimonte i problemi idraulici più frequenti sono causati dall\'altitudine: pressione acqua bassa ai piani alti, necessità di autoclave. Gli edifici storici vicino alla Reggia hanno tubature antiche. Comune anche l\'intasamento degli scarichi per le foglie del bosco.',
    mapCoordinates: { lat: 40.8656, lng: 14.2511 }
  }
];

// Helper per trovare un quartiere dal slug
export function getQuartiereBySlug(slug: string): QuartiereData | undefined {
  return NAPOLI_QUARTIERI.find(q => q.slug === slug);
}

// Lista servizi idraulici per tutte le pagine quartiere
export const SERVIZI_IDRAULICI = [
  'Riparazione perdite acqua',
  'Disotturazione scarichi e WC',
  'Riparazione tubature',
  'Sostituzione rubinetti',
  'Installazione sanitari',
  'Riparazione scaldabagni',
  'Spurgo lavandini',
  'Riparazioni urgenti bagno e cucina'
];

// Tipi di emergenza comuni
export const EMERGENZE_COMUNI = [
  'Perdite d\'acqua improvvise',
  'Tubi rotti',
  'WC completamente intasato',
  'Allagamenti in bagno o cucina',
  'Rubinetti che perdono senza sosta',
  'Caldaia bloccata in inverno'
];
