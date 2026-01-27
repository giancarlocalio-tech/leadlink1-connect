/**
 * Neighborhood Pages Data
 * 
 * Data for neighborhood-specific landing pages for 5 major cities:
 * Milano, Roma, Napoli, Torino, Bologna
 * 
 * Each city has 5-8 neighborhood pages
 * URL structure: /{city}-{neighborhood}-idraulico
 */

export interface NeighborhoodData {
  citySlug: string;
  cityName: string;
  province: string;
  region: string;
  neighborhoodSlug: string;
  neighborhoodName: string;
  description: string;
  characteristics: string[];
  commonProblems: string[];
}

// Neighborhood pages for major cities
export const NEIGHBORHOOD_PAGES: NeighborhoodData[] = [
  // MILANO
  {
    citySlug: 'milano',
    cityName: 'Milano',
    province: 'MI',
    region: 'Lombardia',
    neighborhoodSlug: 'centro',
    neighborhoodName: 'Centro',
    description: 'Il centro di Milano presenta edifici storici con impianti idraulici spesso datati che richiedono professionisti esperti in interventi su strutture d\'epoca.',
    characteristics: [
      'Palazzi storici con cortili interni',
      'Edifici ottocenteschi con tubature originali',
      'Uffici e abitazioni in stabili d\'epoca',
      'Problemi di accesso per mezzi e attrezzature'
    ],
    commonProblems: [
      'Tubature in piombo e ferro da sostituire',
      'Perdite in impianti centenari',
      'Scarichi intasati in colonne fognarie verticali',
      'Pressione idrica variabile ai piani alti'
    ]
  },
  {
    citySlug: 'milano',
    cityName: 'Milano',
    province: 'MI',
    region: 'Lombardia',
    neighborhoodSlug: 'navigli',
    neighborhoodName: 'Navigli',
    description: 'La zona dei Navigli, con i suoi edifici affacciati sui canali, presenta sfide idrauliche uniche legate all\'umidità e alla vicinanza dell\'acqua.',
    characteristics: [
      'Case affacciate sui canali',
      'Cantine e seminterrati con problemi di umidità',
      'Loft ricavati da ex magazzini',
      'Edifici con storia industriale'
    ],
    commonProblems: [
      'Umidità di risalita che danneggia le tubature',
      'Infiltrazioni nelle cantine',
      'Problemi fognari legati ai canali',
      'Impianti di locali commerciali sovraccaricati'
    ]
  },
  {
    citySlug: 'milano',
    cityName: 'Milano',
    province: 'MI',
    region: 'Lombardia',
    neighborhoodSlug: 'porta-romana',
    neighborhoodName: 'Porta Romana',
    description: 'Porta Romana mescola edifici storici e moderni, con una varietà di impianti idraulici che richiedono competenze diverse.',
    characteristics: [
      'Mix di edifici storici e moderni',
      'Condomini residenziali di diverse epoche',
      'Zone riqualificate con nuove costruzioni',
      'Alta densità abitativa'
    ],
    commonProblems: [
      'Caldaie centralizzate obsolete nei vecchi condomini',
      'Pressione idrica insufficiente',
      'Scarichi condominiali intasati',
      'Perdite nelle giunzioni tra vecchio e nuovo'
    ]
  },
  {
    citySlug: 'milano',
    cityName: 'Milano',
    province: 'MI',
    region: 'Lombardia',
    neighborhoodSlug: 'isola',
    neighborhoodName: 'Isola',
    description: 'Il quartiere Isola, riqualificato negli ultimi anni, presenta un mix di vecchie case di ringhiera e moderni grattacieli residenziali.',
    characteristics: [
      'Case di ringhiera storiche',
      'Nuovi grattacieli residenziali',
      'Loft in ex aree industriali',
      'Zona in continua trasformazione'
    ],
    commonProblems: [
      'Impianti obsoleti nelle vecchie case',
      'Problemi di pressione ai piani alti dei grattacieli',
      'Adeguamento impianti in ristrutturazioni',
      'Scarichi sovradimensionati per nuovi usi'
    ]
  },
  {
    citySlug: 'milano',
    cityName: 'Milano',
    province: 'MI',
    region: 'Lombardia',
    neighborhoodSlug: 'citta-studi',
    neighborhoodName: 'Città Studi',
    description: 'Città Studi, la zona universitaria di Milano, ha molti appartamenti in affitto con impianti che richiedono manutenzione frequente.',
    characteristics: [
      'Alta concentrazione di appartamenti in affitto',
      'Edifici anni \'50-\'70',
      'Molti studenti e turnover elevato',
      'Manutenzione spesso trascurata'
    ],
    commonProblems: [
      'Scarichi intasati per uso intensivo',
      'Caldaie trascurate che si guastano',
      'Rubinetti e sanitari usurati',
      'Perdite non segnalate tempestivamente'
    ]
  },

  // ROMA
  {
    citySlug: 'roma',
    cityName: 'Roma',
    province: 'RM',
    region: 'Lazio',
    neighborhoodSlug: 'trastevere',
    neighborhoodName: 'Trastevere',
    description: 'Trastevere, cuore storico della Roma popolare, presenta edifici medievali e rinascimentali con impianti idraulici molto datati.',
    characteristics: [
      'Vicoli stretti e edifici storici',
      'Case medievali e rinascimentali',
      'Difficoltà di accesso per mezzi',
      'Alta concentrazione di locali commerciali'
    ],
    commonProblems: [
      'Tubature in piombo ancora presenti',
      'Fognature storiche sottodimensionate',
      'Perdite in murature antiche',
      'Scarichi intasati da calcare secolare'
    ]
  },
  {
    citySlug: 'roma',
    cityName: 'Roma',
    province: 'RM',
    region: 'Lazio',
    neighborhoodSlug: 'eur',
    neighborhoodName: 'EUR',
    description: 'L\'EUR, quartiere razionalista degli anni \'40, ha edifici monumentali con impianti centralizzati che richiedono manutenzione specializzata.',
    characteristics: [
      'Architettura razionalista monumentale',
      'Grandi condomini con impianti centralizzati',
      'Uffici e residenze di prestigio',
      'Strade larghe e facile accesso'
    ],
    commonProblems: [
      'Caldaie centralizzate obsolete',
      'Tubazioni in ferro corrose',
      'Problemi di distribuzione calore',
      'Impianti sovradimensionati da efficientare'
    ]
  },
  {
    citySlug: 'roma',
    cityName: 'Roma',
    province: 'RM',
    region: 'Lazio',
    neighborhoodSlug: 'prati',
    neighborhoodName: 'Prati',
    description: 'Prati, elegante quartiere vicino al Vaticano, ha palazzi umbertini con impianti che richiedono interventi rispettosi dell\'architettura.',
    characteristics: [
      'Palazzi umbertini di pregio',
      'Studi professionali e abitazioni signorili',
      'Soffitti alti e impianti a vista',
      'Richieste di qualità elevata'
    ],
    commonProblems: [
      'Tubature vecchie da sostituire con discrezione',
      'Caldaie a terra ingombranti',
      'Pressione idrica ai piani alti',
      'Integrazione impianti moderni in contesti storici'
    ]
  },
  {
    citySlug: 'roma',
    cityName: 'Roma',
    province: 'RM',
    region: 'Lazio',
    neighborhoodSlug: 'san-giovanni',
    neighborhoodName: 'San Giovanni',
    description: 'San Giovanni è un quartiere residenziale con edifici di diverse epoche, dai palazzi storici ai condomini moderni.',
    characteristics: [
      'Quartiere residenziale consolidato',
      'Mix di edifici di diverse epoche',
      'Buona accessibilità',
      'Alta densità abitativa'
    ],
    commonProblems: [
      'Impianti datati nei vecchi stabili',
      'Scarichi condominiali intasati',
      'Caldaie autonome da manutenere',
      'Perdite nelle colonne montanti'
    ]
  },
  {
    citySlug: 'roma',
    cityName: 'Roma',
    province: 'RM',
    region: 'Lazio',
    neighborhoodSlug: 'monteverde',
    neighborhoodName: 'Monteverde',
    description: 'Monteverde, quartiere collinare verde, ha villini e palazzine con impianti che soffrono le variazioni di pressione idrica.',
    characteristics: [
      'Zona collinare con villini',
      'Palazzine residenziali',
      'Molto verde e tranquillità',
      'Strade in pendenza'
    ],
    commonProblems: [
      'Pressione idrica insufficiente ai piani alti',
      'Autoclave sovraccariche',
      'Perdite da sbalzi di pressione',
      'Impianti esterni esposti'
    ]
  },

  // NAPOLI
  {
    citySlug: 'napoli',
    cityName: 'Napoli',
    province: 'NA',
    region: 'Campania',
    neighborhoodSlug: 'centro-storico',
    neighborhoodName: 'Centro Storico',
    description: 'Il centro storico di Napoli, patrimonio UNESCO, presenta sfide uniche con edifici medievali e impianti antichissimi.',
    characteristics: [
      'Vicoli stretti e palazzi storici',
      'Edifici medievali e barocchi',
      'Bassi e piani terra sotto il livello stradale',
      'Difficoltà di accesso estrema'
    ],
    commonProblems: [
      'Tubature in piombo da bonificare',
      'Umidità di risalita pervasiva',
      'Fognature storiche intasate',
      'Pressione idrica molto bassa'
    ]
  },
  {
    citySlug: 'napoli',
    cityName: 'Napoli',
    province: 'NA',
    region: 'Campania',
    neighborhoodSlug: 'vomero',
    neighborhoodName: 'Vomero',
    description: 'Il Vomero, quartiere collinare elegante, ha edifici liberty e moderni con problemi legati all\'altitudine e alla pressione idrica.',
    characteristics: [
      'Quartiere collinare elegante',
      'Edifici liberty e razionalisti',
      'Panorami sulla città e sul golfo',
      'Funicolari e metropolitana'
    ],
    commonProblems: [
      'Pressione idrica bassa per altitudine',
      'Autoclave sempre in funzione',
      'Impianti datati nei vecchi palazzi',
      'Caldaie sotto stress d\'inverno'
    ]
  },
  {
    citySlug: 'napoli',
    cityName: 'Napoli',
    province: 'NA',
    region: 'Campania',
    neighborhoodSlug: 'chiaia',
    neighborhoodName: 'Chiaia',
    description: 'Chiaia, quartiere elegante sul lungomare, soffre la corrosione marina e ha palazzi signorili con impianti di pregio.',
    characteristics: [
      'Quartiere sul lungomare',
      'Palazzi ottocenteschi signorili',
      'Negozi e ristoranti di lusso',
      'Esposizione all\'aria marina'
    ],
    commonProblems: [
      'Corrosione da salsedine',
      'Tubature esterne ossidate',
      'Impianti di pregio da preservare',
      'Scarichi intasati da calcare'
    ]
  },
  {
    citySlug: 'napoli',
    cityName: 'Napoli',
    province: 'NA',
    region: 'Campania',
    neighborhoodSlug: 'fuorigrotta',
    neighborhoodName: 'Fuorigrotta',
    description: 'Fuorigrotta, zona residenziale e sportiva, ha condomini anni \'60-\'80 con impianti che richiedono aggiornamento.',
    characteristics: [
      'Quartiere residenziale moderno',
      'Vicinanza allo stadio e alla Mostra',
      'Condomini anni \'60-\'80',
      'Buona accessibilità'
    ],
    commonProblems: [
      'Impianti datati da ristrutturare',
      'Colonne fognarie intasate',
      'Caldaie centralizzate obsolete',
      'Perdite nelle tubature in ferro'
    ]
  },
  {
    citySlug: 'napoli',
    cityName: 'Napoli',
    province: 'NA',
    region: 'Campania',
    neighborhoodSlug: 'posillipo',
    neighborhoodName: 'Posillipo',
    description: 'Posillipo, collina panoramica sul mare, ha ville e palazzine esposte alla salsedine con problemi di pressione idrica.',
    characteristics: [
      'Collina panoramica sul golfo',
      'Ville e palazzine di lusso',
      'Strade tortuose in pendenza',
      'Forte esposizione marina'
    ],
    commonProblems: [
      'Pressione idrica molto bassa',
      'Corrosione accelerata da salsedine',
      'Impianti esterni danneggiati',
      'Autoclave frequentemente guaste'
    ]
  },

  // TORINO
  {
    citySlug: 'torino',
    cityName: 'Torino',
    province: 'TO',
    region: 'Piemonte',
    neighborhoodSlug: 'centro',
    neighborhoodName: 'Centro',
    description: 'Il centro di Torino ha palazzi sabaudi monumentali con impianti storici che richiedono interventi specializzati.',
    characteristics: [
      'Palazzi sabaudi monumentali',
      'Portici e cortili interni',
      'Uffici e residenze di pregio',
      'Edifici vincolati'
    ],
    commonProblems: [
      'Impianti storici da preservare',
      'Tubature in ferro corrose',
      'Caldaie a terra ingombranti',
      'Interventi soggetti a vincoli'
    ]
  },
  {
    citySlug: 'torino',
    cityName: 'Torino',
    province: 'TO',
    region: 'Piemonte',
    neighborhoodSlug: 'san-salvario',
    neighborhoodName: 'San Salvario',
    description: 'San Salvario, quartiere multiculturale e vivace, ha case di ringhiera e condomini con impianti spesso trascurati.',
    characteristics: [
      'Quartiere multiculturale',
      'Case di ringhiera storiche',
      'Molti locali e attività commerciali',
      'Alta densità abitativa'
    ],
    commonProblems: [
      'Impianti trascurati da aggiornare',
      'Scarichi sovraccaricati',
      'Caldaie guaste per uso intensivo',
      'Perdite in edifici fatiscenti'
    ]
  },
  {
    citySlug: 'torino',
    cityName: 'Torino',
    province: 'TO',
    region: 'Piemonte',
    neighborhoodSlug: 'crocetta',
    neighborhoodName: 'Crocetta',
    description: 'La Crocetta, quartiere residenziale elegante, ha palazzi signorili con impianti che richiedono manutenzione di qualità.',
    characteristics: [
      'Quartiere residenziale elegante',
      'Palazzi signorili ben tenuti',
      'Vicinanza al Politecnico',
      'Alta qualità degli edifici'
    ],
    commonProblems: [
      'Manutenzione di qualità richiesta',
      'Impianti datati ma di pregio',
      'Caldaie centralizzate da efficientare',
      'Pressione idrica ai piani alti'
    ]
  },
  {
    citySlug: 'torino',
    cityName: 'Torino',
    province: 'TO',
    region: 'Piemonte',
    neighborhoodSlug: 'aurora',
    neighborhoodName: 'Aurora',
    description: 'Aurora, ex quartiere operaio in trasformazione, ha edifici industriali riconvertiti e case popolari da ristrutturare.',
    characteristics: [
      'Ex quartiere operaio',
      'Edifici industriali riconvertiti',
      'Loft e case popolari',
      'Zona in trasformazione'
    ],
    commonProblems: [
      'Impianti industriali da adeguare',
      'Tubature vecchissime',
      'Scarichi sottodimensionati',
      'Perdite croniche'
    ]
  },
  {
    citySlug: 'torino',
    cityName: 'Torino',
    province: 'TO',
    region: 'Piemonte',
    neighborhoodSlug: 'lingotto',
    neighborhoodName: 'Lingotto',
    description: 'Il Lingotto, area dell\'ex stabilimento FIAT riqualificata, ha moderne costruzioni ma anche vecchi edifici operai.',
    characteristics: [
      'Area riqualificata ex FIAT',
      'Mix vecchio e nuovo',
      'Edifici moderni e vecchie case',
      'Grandi spazi commerciali'
    ],
    commonProblems: [
      'Adeguamento impianti vecchi edifici',
      'Integrazione sistemi diversi',
      'Scarichi commerciali sovraccaricati',
      'Manutenzione complessi moderni'
    ]
  },

  // BOLOGNA
  {
    citySlug: 'bologna',
    cityName: 'Bologna',
    province: 'BO',
    region: 'Emilia-Romagna',
    neighborhoodSlug: 'centro',
    neighborhoodName: 'Centro',
    description: 'Il centro di Bologna, con i suoi portici patrimonio UNESCO, presenta edifici medievali con impianti spesso molto datati.',
    characteristics: [
      'Portici storici patrimonio UNESCO',
      'Edifici medievali e rinascimentali',
      'Case a torre restaurate',
      'Alta concentrazione di studenti'
    ],
    commonProblems: [
      'Impianti in edifici vincolati',
      'Tubature antiche da sostituire',
      'Umidità nei piani terra sotto i portici',
      'Scarichi intasati nelle vecchie case'
    ]
  },
  {
    citySlug: 'bologna',
    cityName: 'Bologna',
    province: 'BO',
    region: 'Emilia-Romagna',
    neighborhoodSlug: 'bolognina',
    neighborhoodName: 'Bolognina',
    description: 'La Bolognina, quartiere popolare vicino alla stazione, ha edifici di diverse epoche con impianti spesso da aggiornare.',
    characteristics: [
      'Quartiere popolare storico',
      'Vicinanza alla stazione',
      'Mix di edifici di diverse epoche',
      'Alta densità abitativa'
    ],
    commonProblems: [
      'Impianti obsoleti da ristrutturare',
      'Caldaie vecchie e inquinanti',
      'Scarichi condominiali intasati',
      'Perdite croniche'
    ]
  },
  {
    citySlug: 'bologna',
    cityName: 'Bologna',
    province: 'BO',
    region: 'Emilia-Romagna',
    neighborhoodSlug: 'san-donato',
    neighborhoodName: 'San Donato',
    description: 'San Donato, quartiere residenziale e universitario, ha molti appartamenti per studenti con impianti sotto stress.',
    characteristics: [
      'Quartiere universitario',
      'Molti appartamenti in affitto',
      'Condomini anni \'60-\'80',
      'Uso intensivo degli impianti'
    ],
    commonProblems: [
      'Scarichi intasati per uso intensivo',
      'Caldaie trascurate',
      'Rubinetti e sanitari usurati',
      'Manutenzione differita'
    ]
  },
  {
    citySlug: 'bologna',
    cityName: 'Bologna',
    province: 'BO',
    region: 'Emilia-Romagna',
    neighborhoodSlug: 'saragozza',
    neighborhoodName: 'Saragozza',
    description: 'Saragozza, quartiere collinare verso San Luca, ha villette e palazzine con problemi di pressione idrica.',
    characteristics: [
      'Zona collinare residenziale',
      'Villette e palazzine',
      'Strada verso San Luca',
      'Ambiente verde e tranquillo'
    ],
    commonProblems: [
      'Pressione idrica bassa',
      'Autoclave sovraccariche',
      'Impianti esterni esposti al gelo',
      'Caldaie sotto stress d\'inverno'
    ]
  },
  {
    citySlug: 'bologna',
    cityName: 'Bologna',
    province: 'BO',
    region: 'Emilia-Romagna',
    neighborhoodSlug: 'santo-stefano',
    neighborhoodName: 'Santo Stefano',
    description: 'Santo Stefano, elegante quartiere storico, ha palazzi signorili con impianti che richiedono interventi di qualità.',
    characteristics: [
      'Quartiere storico elegante',
      'Palazzi signorili ben conservati',
      'Vicinanza alle Due Torri',
      'Clientela esigente'
    ],
    commonProblems: [
      'Interventi rispettosi dell\'architettura',
      'Impianti di pregio da preservare',
      'Tubature antiche',
      'Standard qualitativi elevati richiesti'
    ]
  }
];

/**
 * Get neighborhood page by combined slug
 * e.g., "milano-navigli-idraulico" -> NeighborhoodData
 */
export function getNeighborhoodPage(fullSlug: string): NeighborhoodData | undefined {
  // Pattern: {city}-{neighborhood}-idraulico
  const match = fullSlug.match(/^([a-z-]+)-([a-z-]+)-idraulico$/);
  if (!match) return undefined;
  
  const [, citySlug, neighborhoodSlug] = match;
  return NEIGHBORHOOD_PAGES.find(
    n => n.citySlug === citySlug && n.neighborhoodSlug === neighborhoodSlug
  );
}

/**
 * Get all neighborhood pages for a city
 */
export function getNeighborhoodPagesForCity(citySlug: string): NeighborhoodData[] {
  return NEIGHBORHOOD_PAGES.filter(n => n.citySlug === citySlug);
}

/**
 * Get all unique cities that have neighborhood pages
 */
export function getCitiesWithNeighborhoodPages(): string[] {
  return [...new Set(NEIGHBORHOOD_PAGES.map(n => n.citySlug))];
}
