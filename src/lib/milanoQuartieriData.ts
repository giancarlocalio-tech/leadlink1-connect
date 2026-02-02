/**
 * Dati SEO per le pagine quartieri di Milano
 * Struttura ottimizzata per posizionamento locale
 */

export interface QuartiereMilanoData {
  slug: string;
  nome: string;
  nomeCompleto: string;
  descrizione: string;
  problemiComuni: string;
  mapCoordinates: { lat: number; lng: number };
}

export const MILANO_QUARTIERI: QuartiereMilanoData[] = [
  {
    slug: 'navigli',
    nome: 'Navigli',
    nomeCompleto: 'Navigli',
    descrizione: 'I Navigli sono il cuore storico e bohémien di Milano, con edifici che risalgono al XIX secolo lungo i canali. Le case di ringhiera e i palazzi d\'epoca presentano impianti idraulici che richiedono interventi specializzati su tubature vetuste.',
    problemiComuni: 'Nei Navigli i problemi idraulici più frequenti riguardano l\'umidità di risalita dovuta alla vicinanza dei canali, tubature in ferro corroso negli edifici storici e scarichi intasati nelle case di ringhiera. La pressione dell\'acqua può essere instabile nei piani alti.',
    mapCoordinates: { lat: 45.4494, lng: 9.1749 }
  },
  {
    slug: 'brera',
    nome: 'Brera',
    nomeCompleto: 'Brera',
    descrizione: 'Brera è il quartiere artistico e culturale di Milano, con eleganti palazzi del XVIII e XIX secolo. Gli appartamenti di pregio richiedono interventi idraulici di alta qualità che rispettino le finiture d\'epoca.',
    problemiComuni: 'A Brera i problemi idraulici più comuni sono legati alle tubature storiche in piombo o ferro, spesso soggette a corrosione. Le colonne di scarico condominiali sono frequentemente sottodimensionate. Richiesti spesso interventi su impianti di riscaldamento centralizzato.',
    mapCoordinates: { lat: 45.4722, lng: 9.1875 }
  },
  {
    slug: 'porta-romana',
    nome: 'Porta Romana',
    nomeCompleto: 'Porta Romana',
    descrizione: 'Porta Romana è un quartiere residenziale di pregio nel sud di Milano, con una miscela di edifici Liberty e costruzioni moderne. La zona presenta sfide idrauliche diverse a seconda dell\'epoca degli edifici.',
    problemiComuni: 'A Porta Romana i problemi idraulici variano tra edifici Liberty con impianti centenari e costruzioni recenti. Frequenti le perdite nelle tubature in ferro degli anni \'20-\'30 e problemi di pressione ai piani alti. Gli scarichi delle vecchie lavanderie comuni spesso causano intasamenti.',
    mapCoordinates: { lat: 45.4531, lng: 9.2019 }
  },
  {
    slug: 'citta-studi',
    nome: 'Città Studi',
    nomeCompleto: 'Città Studi',
    descrizione: 'Città Studi è il quartiere universitario di Milano, dominato dal Politecnico e da edifici degli anni \'30-\'60. La zona ha molti appartamenti per studenti con impianti che richiedono manutenzione frequente.',
    problemiComuni: 'A Città Studi i problemi idraulici più frequenti riguardano le tubature in ferro zincato degli anni \'50-\'60, spesso intasate dal calcare. Alto turnover degli inquilini causa usura accelerata di rubinetti e sanitari. Frequenti interventi su scaldabagni e caldaie autonome.',
    mapCoordinates: { lat: 45.4783, lng: 9.2272 }
  },
  {
    slug: 'isola',
    nome: 'Isola',
    nomeCompleto: 'Isola',
    descrizione: 'L\'Isola è un quartiere trendy di Milano, recentemente riqualificato con il progetto Porta Nuova. Convivono vecchie case operaie e modernissimi grattacieli con impianti all\'avanguardia.',
    problemiComuni: 'All\'Isola i problemi idraulici dipendono dalla tipologia edilizia: nelle vecchie case operaie si trovano tubature vetuste e scarichi sottodimensionati, mentre nei nuovi edifici possono verificarsi problemi di taratura degli impianti centralizzati e perdite nelle tubazioni in multistrato.',
    mapCoordinates: { lat: 45.4856, lng: 9.1889 }
  },
  {
    slug: 'porta-venezia',
    nome: 'Porta Venezia',
    nomeCompleto: 'Porta Venezia',
    descrizione: 'Porta Venezia è un quartiere elegante e multiculturale di Milano, con splendidi palazzi Liberty e ampi viali alberati. Gli edifici d\'epoca richiedono interventi idraulici rispettosi delle finiture originali.',
    problemiComuni: 'A Porta Venezia i problemi idraulici più frequenti riguardano gli impianti Liberty con tubature in piombo da sostituire, caldaie centralizzate obsolete e scarichi in ghisa corrosi. Frequenti anche i problemi di pressione dovuti all\'altezza dei soffitti.',
    mapCoordinates: { lat: 45.4756, lng: 9.2056 }
  },
  {
    slug: 'porta-genova',
    nome: 'Porta Genova',
    nomeCompleto: 'Porta Genova',
    descrizione: 'Porta Genova è un quartiere creativo e vivace, ex zona industriale ora piena di loft e studi d\'artista. Le riconversioni industriali presentano sfide idrauliche uniche.',
    problemiComuni: 'A Porta Genova i problemi idraulici sono spesso legati alle riconversioni di spazi industriali: impianti sovradimensionati o sottodimensionati, tubature industriali adattate all\'uso residenziale e scarichi non sempre conformi. Frequenti problemi di umidità negli ex magazzini.',
    mapCoordinates: { lat: 45.4519, lng: 9.1692 }
  },
  {
    slug: 'lambrate',
    nome: 'Lambrate',
    nomeCompleto: 'Lambrate',
    descrizione: 'Lambrate è un quartiere in forte sviluppo nella zona est di Milano, con ex aree industriali trasformate in residenze e studi creativi. La zona presenta un mix di edifici di diverse epoche.',
    problemiComuni: 'A Lambrate i problemi idraulici variano tra le vecchie case operaie con tubature in ferro e i nuovi loft ricavati da fabbriche. Frequenti i problemi di pressione nelle zone più periferiche e intasamenti negli scarichi delle ex aree industriali.',
    mapCoordinates: { lat: 45.4847, lng: 9.2381 }
  },
  {
    slug: 'porta-nuova',
    nome: 'Porta Nuova',
    nomeCompleto: 'Porta Nuova',
    descrizione: 'Porta Nuova è il quartiere più moderno di Milano, con grattacieli iconici come il Bosco Verticale. Gli impianti idraulici sono all\'avanguardia ma richiedono manutenzione specializzata.',
    problemiComuni: 'A Porta Nuova i problemi idraulici sono tipici degli edifici moderni: taratura dei sistemi di pressurizzazione, manutenzione degli impianti centralizzati di riscaldamento/raffrescamento, e interventi su sistemi di recupero acque grigie. Richiesti tecnici certificati per impianti complessi.',
    mapCoordinates: { lat: 45.4833, lng: 9.1917 }
  },
  {
    slug: 'garibaldi',
    nome: 'Garibaldi',
    nomeCompleto: 'Garibaldi',
    descrizione: 'Garibaldi è un quartiere centrale di Milano, con la storica stazione ferroviaria e un mix di edifici d\'epoca e nuove costruzioni. La zona è molto servita ma con edifici di epoche diverse.',
    problemiComuni: 'A Garibaldi i problemi idraulici variano tra palazzi ottocenteschi con impianti da sostituire completamente e nuovi edifici con sistemi centralizzati. Frequenti le perdite nelle colonne condominiali degli edifici storici e problemi di pressione variabile.',
    mapCoordinates: { lat: 45.4806, lng: 9.1861 }
  },
  {
    slug: 'centrale',
    nome: 'Centrale',
    nomeCompleto: 'Zona Centrale',
    descrizione: 'La zona Centrale di Milano, attorno alla Stazione Centrale, è caratterizzata da grandi palazzi degli anni \'20-\'30 e intense attività commerciali. Gli edifici monumentali hanno impianti complessi.',
    problemiComuni: 'Nella zona Centrale i problemi idraulici più frequenti riguardano le grandi colonne di scarico dei palazzi anni \'30, spesso in ghisa corrosa. Molti edifici hanno caldaie centralizzate obsolete. L\'alto afflusso di persone causa usura accelerata degli impianti comuni.',
    mapCoordinates: { lat: 45.4850, lng: 9.2042 }
  },
  {
    slug: 'loreto',
    nome: 'Loreto',
    nomeCompleto: 'Loreto',
    descrizione: 'Loreto è un vivace snodo commerciale di Milano, con edifici residenziali degli anni \'50-\'70 e numerose attività. La zona ha una densità abitativa elevata con conseguente stress sugli impianti.',
    problemiComuni: 'A Loreto i problemi idraulici più comuni sono legati alla vetustà degli impianti degli anni \'50-\'60, con tubature in ferro zincato intasate dal calcare. L\'alta densità abitativa causa frequenti intasamenti delle colonne di scarico condominiali.',
    mapCoordinates: { lat: 45.4850, lng: 9.2153 }
  },
  {
    slug: 'bicocca',
    nome: 'Bicocca',
    nomeCompleto: 'Bicocca',
    descrizione: 'La Bicocca è un quartiere universitario moderno, nato dalla riconversione delle ex acciaierie Pirelli. Gli edifici sono prevalentemente recenti con impianti moderni.',
    problemiComuni: 'Alla Bicocca i problemi idraulici sono tipici degli edifici recenti: guasti alle valvole di zona, problemi con i contatori individuali del riscaldamento, perdite nelle giunzioni del multistrato. Gli studentati hanno un\'usura accelerata dei sanitari.',
    mapCoordinates: { lat: 45.5153, lng: 9.2111 }
  },
  {
    slug: 'bovisa',
    nome: 'Bovisa',
    nomeCompleto: 'Bovisa',
    descrizione: 'La Bovisa è un quartiere in trasformazione, sede del Politecnico e di ex aree industriali in riconversione. Convivono vecchie case operaie e nuovi complessi residenziali.',
    problemiComuni: 'Alla Bovisa i problemi idraulici variano notevolmente: nelle vecchie case operaie si trovano tubature in ferro corroso, mentre nei nuovi edifici universitari possono verificarsi problemi di dimensionamento degli impianti per l\'alto numero di utenti.',
    mapCoordinates: { lat: 45.5039, lng: 9.1639 }
  },
  {
    slug: 'niguarda',
    nome: 'Niguarda',
    nomeCompleto: 'Niguarda',
    descrizione: 'Niguarda è un quartiere residenziale nel nord di Milano, noto per il grande ospedale. La zona ha molti condomini degli anni \'60-\'80 con impianti che necessitano ammodernamento.',
    problemiComuni: 'A Niguarda i problemi idraulici più frequenti riguardano le tubature in ferro zincato dei condomini anni \'60-\'70, spesso ostruite dal calcare. Le caldaie centralizzate sono in molti casi obsolete. Frequenti anche i problemi agli scarichi dei seminterrati.',
    mapCoordinates: { lat: 45.5097, lng: 9.1917 }
  },
  {
    slug: 'affori',
    nome: 'Affori',
    nomeCompleto: 'Affori',
    descrizione: 'Affori è un quartiere residenziale tranquillo nel nord di Milano, con un mix di villette e condomini. La zona ha caratteristiche semi-periferiche con edifici di diverse epoche.',
    problemiComuni: 'Ad Affori i problemi idraulici sono legati principalmente all\'età degli impianti nei condomini anni \'50-\'70. Le villette spesso hanno pozzi neri o fosse biologiche che richiedono manutenzione. Frequenti i problemi di pressione nelle zone più periferiche.',
    mapCoordinates: { lat: 45.5194, lng: 9.1722 }
  },
  {
    slug: 'quarto-oggiaro',
    nome: 'Quarto Oggiaro',
    nomeCompleto: 'Quarto Oggiaro',
    descrizione: 'Quarto Oggiaro è un quartiere popolare nel nord-ovest di Milano, con grandi complessi di edilizia popolare degli anni \'60-\'70. Gli impianti condominiali sono spesso datati.',
    problemiComuni: 'A Quarto Oggiaro i problemi idraulici più comuni riguardano le grandi colonne di scarico condominiali, spesso intasate e in ghisa corrosa. Le caldaie centralizzate necessitano frequenti interventi. Problemi di pressione ai piani alti dei palazzoni.',
    mapCoordinates: { lat: 45.5167, lng: 9.1333 }
  },
  {
    slug: 'san-siro',
    nome: 'San Siro',
    nomeCompleto: 'San Siro',
    descrizione: 'San Siro è un quartiere residenziale di pregio nell\'ovest di Milano, noto per lo stadio e le eleganti ville. La zona ha edifici di diverse epoche, dalle villette Liberty ai condomini moderni.',
    problemiComuni: 'A San Siro i problemi idraulici variano: le ville d\'epoca hanno impianti centenari da ammodernare, mentre i condomini recenti possono avere problemi di taratura. Frequenti le richieste di rifacimento bagni e installazione di sistemi di irrigazione per i giardini.',
    mapCoordinates: { lat: 45.4783, lng: 9.1250 }
  },
  {
    slug: 'baggio',
    nome: 'Baggio',
    nomeCompleto: 'Baggio',
    descrizione: 'Baggio è un quartiere storico nell\'ovest di Milano, con un nucleo antico e ampie zone residenziali. La zona mantiene un carattere di paese con edifici di diverse tipologie.',
    problemiComuni: 'A Baggio i problemi idraulici più frequenti riguardano le vecchie case del nucleo storico con tubature in ferro e scarichi sottodimensionati. I condomini degli anni \'70-\'80 hanno spesso problemi di calcare nelle tubature. Alcune zone hanno ancora fosse biologiche.',
    mapCoordinates: { lat: 45.4639, lng: 9.0917 }
  },
  {
    slug: 'barona',
    nome: 'Barona',
    nomeCompleto: 'Barona',
    descrizione: 'La Barona è un quartiere popolare nel sud-ovest di Milano, con grandi complessi residenziali e aree verdi lungo il Naviglio Grande. La zona ha prevalentemente edilizia degli anni \'60-\'80.',
    problemiComuni: 'Alla Barona i problemi idraulici sono tipici dell\'edilizia popolare: colonne di scarico condominiali in ghisa corrosa, tubature in ferro zincato ostruite, caldaie centralizzate obsolete. Frequenti anche i problemi di umidità ai piani bassi vicino al Naviglio.',
    mapCoordinates: { lat: 45.4417, lng: 9.1528 }
  },
  {
    slug: 'ticinese',
    nome: 'Ticinese',
    nomeCompleto: 'Ticinese',
    descrizione: 'Il Ticinese è uno dei quartieri più antichi di Milano, con la storica Porta Ticinese e le Colonne di San Lorenzo. Gli edifici storici richiedono interventi idraulici specializzati.',
    problemiComuni: 'Nel Ticinese i problemi idraulici più frequenti riguardano gli edifici medievali e rinascimentali con tubature molto vecchie. Le case di ringhiera hanno scarichi sottodimensionati. L\'umidità di risalita è comune data la vicinanza ai canali. Richiesti interventi rispettosi dei vincoli storici.',
    mapCoordinates: { lat: 45.4547, lng: 9.1806 }
  },
  {
    slug: 'tortona',
    nome: 'Tortona',
    nomeCompleto: 'Zona Tortona',
    descrizione: 'La zona Tortona è il cuore del design milanese, con ex fabbriche trasformate in showroom e loft di lusso. Le riconversioni industriali hanno creato spazi unici con sfide idrauliche particolari.',
    problemiComuni: 'In zona Tortona i problemi idraulici sono spesso legati alle riconversioni: dimensionamento degli impianti per spazi open-space, adeguamento delle tubature industriali all\'uso residenziale, e gestione dell\'umidità negli ex magazzini. Richiesti interventi di design per loft di pregio.',
    mapCoordinates: { lat: 45.4528, lng: 9.1611 }
  },
  {
    slug: 'sempione',
    nome: 'Sempione',
    nomeCompleto: 'Zona Sempione',
    descrizione: 'La zona Sempione è un quartiere elegante vicino all\'Arco della Pace e al parco Sempione. Gli edifici umbertini e Liberty richiedono manutenzione specializzata degli impianti d\'epoca.',
    problemiComuni: 'In zona Sempione i problemi idraulici più frequenti riguardano gli impianti Liberty e umbertini, con tubature in piombo da sostituire e caldaie centralizzate a carbone riconvertite. I soffitti alti causano problemi di pressione. Frequenti interventi su bagni d\'epoca da ristrutturare.',
    mapCoordinates: { lat: 45.4750, lng: 9.1722 }
  },
  {
    slug: 'sarpi',
    nome: 'Sarpi',
    nomeCompleto: 'Via Paolo Sarpi - Chinatown',
    descrizione: 'Via Sarpi è il cuore della Chinatown milanese, con intensa attività commerciale e edifici d\'epoca. L\'alta densità di attività e residenti causa stress sugli impianti idraulici.',
    problemiComuni: 'In zona Sarpi i problemi idraulici sono frequenti per l\'intenso uso degli impianti: intasamenti da grasso nei ristoranti, sovraccarico delle colonne di scarico, perdite nelle tubature vetuste. Molti edifici hanno impianti sottodimensionati per l\'attuale utilizzo commerciale.',
    mapCoordinates: { lat: 45.4806, lng: 9.1750 }
  },
  {
    slug: 'greco',
    nome: 'Greco',
    nomeCompleto: 'Greco',
    descrizione: 'Greco è un quartiere residenziale nel nord di Milano, con un nucleo storico e ampie zone di sviluppo recente. La zona ha un carattere tranquillo con edifici di diverse epoche.',
    problemiComuni: 'A Greco i problemi idraulici variano tra il nucleo storico con tubature centenarie e i nuovi complessi residenziali. Frequenti i problemi di calcare nelle tubature in ferro dei condomini anni \'60. Le case più vecchie possono avere ancora impianti in piombo.',
    mapCoordinates: { lat: 45.5028, lng: 9.2083 }
  },
  {
    slug: 'precotto',
    nome: 'Precotto',
    nomeCompleto: 'Precotto',
    descrizione: 'Precotto è un quartiere residenziale nel nord-est di Milano, con condomini degli anni \'50-\'70 e alcune aree di sviluppo recente. La zona ha un carattere familiare e tranquillo.',
    problemiComuni: 'A Precotto i problemi idraulici più comuni riguardano le tubature in ferro zincato dei condomini anni \'50-\'60, spesso ostruite dal calcare. Frequenti anche i problemi alle caldaie autonome e gli intasamenti degli scarichi condominiali.',
    mapCoordinates: { lat: 45.5083, lng: 9.2167 }
  },
  {
    slug: 'crescenzago',
    nome: 'Crescenzago',
    nomeCompleto: 'Crescenzago',
    descrizione: 'Crescenzago è un quartiere nella periferia nord-est di Milano, con un nucleo storico lungo il Naviglio della Martesana e aree residenziali più recenti.',
    problemiComuni: 'A Crescenzago i problemi idraulici sono legati all\'umidità nelle case vicino al Naviglio, tubature vetuste nel nucleo storico e problemi di pressione nelle zone più periferiche. I condomini anni \'70 hanno spesso caldaie centralizzate obsolete.',
    mapCoordinates: { lat: 45.5111, lng: 9.2361 }
  },
  {
    slug: 'turro',
    nome: 'Turro',
    nomeCompleto: 'Turro',
    descrizione: 'Turro è un quartiere residenziale nel nord-est di Milano, attraversato dal Naviglio della Martesana. La zona ha un carattere popolare con edifici prevalentemente degli anni \'50-\'70.',
    problemiComuni: 'A Turro i problemi idraulici più frequenti riguardano le tubature in ferro dei condomini anni \'50-\'60 e l\'umidità nelle case vicino al Naviglio. Frequenti gli intasamenti degli scarichi condominiali e i problemi alle caldaie autonome.',
    mapCoordinates: { lat: 45.4972, lng: 9.2250 }
  },
  {
    slug: 'gorla',
    nome: 'Gorla',
    nomeCompleto: 'Gorla',
    descrizione: 'Gorla è un quartiere residenziale nel nord-est di Milano, noto per il tragico bombardamento del 1944. La zona ha edifici ricostruiti nel dopoguerra e alcune costruzioni recenti.',
    problemiComuni: 'A Gorla i problemi idraulici sono tipici degli edifici del dopoguerra: tubature in ferro zincato ostruite dal calcare, scarichi in ghisa corrosi, caldaie autonome datate. Alcune zone hanno ancora problemi di pressione dell\'acqua.',
    mapCoordinates: { lat: 45.5028, lng: 9.2222 }
  },
  {
    slug: 'corvetto',
    nome: 'Corvetto',
    nomeCompleto: 'Corvetto',
    descrizione: 'Corvetto è un quartiere popolare nel sud-est di Milano, con grandi complessi di edilizia residenziale pubblica. La zona ha prevalentemente edifici degli anni \'60-\'80.',
    problemiComuni: 'A Corvetto i problemi idraulici sono tipici dell\'edilizia popolare: grandi colonne di scarico condominiali in ghisa corrosa, tubature in ferro ostruite, caldaie centralizzate obsolete che servono centinaia di appartamenti. Frequenti le perdite nelle cantine.',
    mapCoordinates: { lat: 45.4417, lng: 9.2306 }
  },
  {
    slug: 'gratosoglio',
    nome: 'Gratosoglio',
    nomeCompleto: 'Gratosoglio',
    descrizione: 'Gratosoglio è un quartiere di edilizia popolare nel sud di Milano, con grandi complessi residenziali degli anni \'60-\'70. Gli impianti condominiali servono molte unità abitative.',
    problemiComuni: 'A Gratosoglio i problemi idraulici più frequenti riguardano le infrastrutture condominiali datate: colonne di scarico in ghisa corrosa, tubature in ferro con incrostazioni di calcare, caldaie centralizzate che necessitano manutenzione costante. Problemi di pressione ai piani alti.',
    mapCoordinates: { lat: 45.4167, lng: 9.1833 }
  },
  {
    slug: 'chiesa-rossa',
    nome: 'Chiesa Rossa',
    nomeCompleto: 'Chiesa Rossa',
    descrizione: 'Chiesa Rossa è un quartiere residenziale nel sud di Milano, con il caratteristico Parco Chiesa Rossa e edifici prevalentemente degli anni \'60-\'80.',
    problemiComuni: 'A Chiesa Rossa i problemi idraulici sono legati all\'età degli impianti: tubature in ferro zincato con depositi di calcare, scarichi condominiali sottodimensionati, caldaie autonome o centralizzate datate. Alcune zone basse possono avere problemi di umidità.',
    mapCoordinates: { lat: 45.4306, lng: 9.1750 }
  },
  {
    slug: 'vigentino',
    nome: 'Vigentino',
    nomeCompleto: 'Vigentino',
    descrizione: 'Il Vigentino è un quartiere residenziale tranquillo nel sud di Milano, con un nucleo storico e ampie zone di condomini. La zona ha un carattere familiare con edifici di diverse epoche.',
    problemiComuni: 'Al Vigentino i problemi idraulici variano tra le vecchie case del nucleo storico e i condomini degli anni \'60-\'70. Frequenti i problemi di calcare nelle tubature in ferro, intasamenti degli scarichi e perdite nelle cantine dei condomini più datati.',
    mapCoordinates: { lat: 45.4361, lng: 9.2000 }
  },
  {
    slug: 'rogoredo',
    nome: 'Rogoredo',
    nomeCompleto: 'Rogoredo',
    descrizione: 'Rogoredo è un quartiere in forte sviluppo nel sud-est di Milano, con la nuova stazione dell\'alta velocità e moderni complessi residenziali accanto a edilizia più datata.',
    problemiComuni: 'A Rogoredo i problemi idraulici variano notevolmente: i nuovi edifici possono avere problemi di taratura degli impianti, mentre le costruzioni più datate hanno tubature in ferro corroso. La zona industriale riconvertita può presentare sfide particolari.',
    mapCoordinates: { lat: 45.4333, lng: 9.2417 }
  },
  {
    slug: 'stadera',
    nome: 'Stadera',
    nomeCompleto: 'Stadera',
    descrizione: 'Stadera è un quartiere popolare nel sud di Milano, con grandi complessi residenziali e un tessuto sociale vivace. Gli edifici sono prevalentemente degli anni \'50-\'70.',
    problemiComuni: 'A Stadera i problemi idraulici più frequenti riguardano le tubature in ferro zincato dei condomini datati, spesso ostruite dal calcare. Le colonne di scarico condominiali necessitano spesso di spurgo. Frequenti anche i problemi di umidità ai piani terra.',
    mapCoordinates: { lat: 45.4444, lng: 9.1944 }
  }
];

// Helper per trovare un quartiere dal slug
export function getQuartiereMilanoBySlug(slug: string): QuartiereMilanoData | undefined {
  return MILANO_QUARTIERI.find(q => q.slug === slug);
}

// Lista degli slug per il routing
export const MILANO_QUARTIERI_SLUGS = MILANO_QUARTIERI.map(q => q.slug);
