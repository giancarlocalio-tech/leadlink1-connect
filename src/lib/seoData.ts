// Centralized SEO data for programmatic landing pages
// This file contains all cities, services, and keyword data for SEO

// ============================================
// CITIES DATABASE - Top 50 Italian cities
// ============================================
export interface CityData {
  slug: string;
  name: string;
  province: string;
  region: string;
  population: string;
  neighborhoods: string[];
  nearbyAreas: string[];
}

export const CITIES: CityData[] = [
  // LOMBARDIA
  {
    slug: 'milano',
    name: 'Milano',
    province: 'MI',
    region: 'Lombardia',
    population: '1.400.000',
    neighborhoods: ['Centro', 'Navigli', 'Porta Romana', 'Isola', 'Città Studi', 'Lambrate', 'Brera', 'Porta Venezia', 'San Siro', 'Bicocca'],
    nearbyAreas: ['Monza', 'Sesto San Giovanni', 'Cinisello Balsamo', 'Rho', 'Legnano', 'Cologno Monzese', 'Corsico', 'San Donato Milanese']
  },
  {
    slug: 'brescia',
    name: 'Brescia',
    province: 'BS',
    region: 'Lombardia',
    population: '200.000',
    neighborhoods: ['Centro Storico', 'San Polo', 'Borgo Trento', 'Lamarmora', 'Urago Mella', "Sant'Eufemia", 'Buffalora', 'Fiumicello'],
    nearbyAreas: ['Rezzato', 'Concesio', 'Gussago', 'Bovezzo', 'Collebeato', 'Nave', 'Botticino', 'Mazzano']
  },
  {
    slug: 'bergamo',
    name: 'Bergamo',
    province: 'BG',
    region: 'Lombardia',
    population: '120.000',
    neighborhoods: ['Città Alta', 'Città Bassa', 'Borgo Palazzo', 'Redona', 'Monterosso', 'Longuelo', 'Colognola'],
    nearbyAreas: ['Seriate', 'Dalmine', 'Treviglio', 'Albino', 'Alzano Lombardo', 'Stezzano', 'Curno']
  },
  {
    slug: 'monza',
    name: 'Monza',
    province: 'MB',
    region: 'Lombardia',
    population: '125.000',
    neighborhoods: ['Centro', 'San Rocco', 'San Gerardo', 'Triante', 'San Biagio', 'Cederna'],
    nearbyAreas: ['Lissone', 'Desio', 'Seregno', 'Brugherio', 'Villasanta', 'Vedano al Lambro']
  },
  // LAZIO
  {
    slug: 'roma',
    name: 'Roma',
    province: 'RM',
    region: 'Lazio',
    population: '2.800.000',
    neighborhoods: ['Centro Storico', 'Trastevere', 'Prati', 'Testaccio', 'EUR', 'San Giovanni', 'Parioli', 'Monteverde', 'Ostiense', 'Tiburtino'],
    nearbyAreas: ['Fiumicino', 'Ciampino', 'Guidonia', 'Tivoli', 'Ostia', 'Frascati', 'Marino', 'Albano Laziale']
  },
  // CAMPANIA
  {
    slug: 'napoli',
    name: 'Napoli',
    province: 'NA',
    region: 'Campania',
    population: '900.000',
    neighborhoods: ['Centro Storico', 'Vomero', 'Chiaia', 'Posillipo', 'Fuorigrotta', 'Bagnoli', 'Mergellina', 'San Giovanni', 'Ponticelli'],
    nearbyAreas: ['Pozzuoli', 'Portici', 'Ercolano', 'Torre del Greco', 'Casoria', 'Afragola', 'Giugliano', 'Marano']
  },
  {
    slug: 'salerno',
    name: 'Salerno',
    province: 'SA',
    region: 'Campania',
    population: '130.000',
    neighborhoods: ['Centro', 'Pastena', 'Torrione', 'Mercatello', 'Fratte', 'Matierno'],
    nearbyAreas: ['Cava de\' Tirreni', 'Battipaglia', 'Pontecagnano', 'Nocera Inferiore', 'Pagani', 'Scafati']
  },
  // PIEMONTE
  {
    slug: 'torino',
    name: 'Torino',
    province: 'TO',
    region: 'Piemonte',
    population: '850.000',
    neighborhoods: ['Centro', 'San Salvario', 'Crocetta', 'Vanchiglia', 'Aurora', 'Barriera di Milano', 'Lingotto', 'Santa Rita', 'Mirafiori'],
    nearbyAreas: ['Moncalieri', 'Collegno', 'Rivoli', 'Nichelino', 'Settimo Torinese', 'Grugliasco', 'Chieri', 'Venaria Reale']
  },
  // SICILIA
  {
    slug: 'palermo',
    name: 'Palermo',
    province: 'PA',
    region: 'Sicilia',
    population: '630.000',
    neighborhoods: ['Centro Storico', 'Politeama', 'Libertà', 'Zisa', 'Brancaccio', 'Mondello', 'Sferracavallo'],
    nearbyAreas: ['Monreale', 'Bagheria', 'Carini', 'Villabate', 'Ficarazzi', 'Termini Imerese']
  },
  {
    slug: 'catania',
    name: 'Catania',
    province: 'CT',
    region: 'Sicilia',
    population: '290.000',
    neighborhoods: ['Centro', 'Borgo', 'Ognina', 'Picanello', 'San Giovanni Galermo', 'Librino', 'Nesima'],
    nearbyAreas: ['Acireale', 'Misterbianco', 'Gravina di Catania', 'Belpasso', 'Mascalucia', 'San Gregorio']
  },
  {
    slug: 'messina',
    name: 'Messina',
    province: 'ME',
    region: 'Sicilia',
    population: '220.000',
    neighborhoods: ['Centro', 'Provinciale', 'Giostra', 'Tremestieri', 'Gazzi', 'Contesse'],
    nearbyAreas: ['Villafranca Tirrena', 'Milazzo', 'Barcellona Pozzo di Gotto', 'Taormina']
  },
  // LIGURIA
  {
    slug: 'genova',
    name: 'Genova',
    province: 'GE',
    region: 'Liguria',
    population: '560.000',
    neighborhoods: ['Centro Storico', 'Nervi', 'Pegli', 'Sampierdarena', 'Sestri Ponente', 'Albaro', 'Quarto', 'Marassi'],
    nearbyAreas: ['Rapallo', 'Chiavari', 'Savona', 'Arenzano', 'Recco', 'Bogliasco']
  },
  // EMILIA-ROMAGNA
  {
    slug: 'bologna',
    name: 'Bologna',
    province: 'BO',
    region: 'Emilia-Romagna',
    population: '390.000',
    neighborhoods: ['Centro', 'Bolognina', 'San Donato', 'Savena', 'Saragozza', 'Santo Stefano', 'Navile', 'San Vitale'],
    nearbyAreas: ['Casalecchio', 'San Lazzaro', 'Castel Maggiore', 'Imola', 'Budrio', 'Zola Predosa']
  },
  {
    slug: 'modena',
    name: 'Modena',
    province: 'MO',
    region: 'Emilia-Romagna',
    population: '185.000',
    neighborhoods: ['Centro', 'Buon Pastore', 'San Faustino', 'Madonnina', 'Villaggio Artigiano', 'Cittadella'],
    nearbyAreas: ['Carpi', 'Sassuolo', 'Formigine', 'Castelfranco Emilia', 'Vignola', 'Maranello']
  },
  {
    slug: 'parma',
    name: 'Parma',
    province: 'PR',
    region: 'Emilia-Romagna',
    population: '195.000',
    neighborhoods: ['Centro', 'Oltretorrente', 'San Leonardo', 'Cittadella', 'Pablo', 'Montanara'],
    nearbyAreas: ['Fidenza', 'Salsomaggiore', 'Collecchio', 'Langhirano', 'Noceto', 'Traversetolo']
  },
  {
    slug: 'rimini',
    name: 'Rimini',
    province: 'RN',
    region: 'Emilia-Romagna',
    population: '150.000',
    neighborhoods: ['Centro', 'Marina Centro', 'Rivazzurra', 'Miramare', 'Viserba', 'Torre Pedrera'],
    nearbyAreas: ['Riccione', 'Cattolica', 'Bellaria', 'Santarcangelo', 'Misano Adriatico']
  },
  {
    slug: 'ferrara',
    name: 'Ferrara',
    province: 'FE',
    region: 'Emilia-Romagna',
    population: '130.000',
    neighborhoods: ['Centro', 'Giardino', 'Arianuova', 'San Giorgio', 'Barco', 'Pontelagoscuro'],
    nearbyAreas: ['Cento', 'Comacchio', 'Copparo', 'Argenta', 'Portomaggiore']
  },
  // TOSCANA
  {
    slug: 'firenze',
    name: 'Firenze',
    province: 'FI',
    region: 'Toscana',
    population: '360.000',
    neighborhoods: ['Centro', 'Oltrarno', 'Santa Croce', 'San Lorenzo', 'Campo di Marte', 'Rifredi', 'Novoli', 'Isolotto'],
    nearbyAreas: ['Fiesole', 'Scandicci', 'Sesto Fiorentino', 'Bagno a Ripoli', 'Campi Bisenzio', 'Prato']
  },
  {
    slug: 'pisa',
    name: 'Pisa',
    province: 'PI',
    region: 'Toscana',
    population: '90.000',
    neighborhoods: ['Centro', 'Sant\'Antonio', 'Porta a Lucca', 'Cisanello', 'Marina di Pisa', 'Tirrenia'],
    nearbyAreas: ['Livorno', 'Pontedera', 'San Giuliano Terme', 'Cascina', 'Vecchiano']
  },
  {
    slug: 'livorno',
    name: 'Livorno',
    province: 'LI',
    region: 'Toscana',
    population: '155.000',
    neighborhoods: ['Centro', 'Venezia', 'Ardenza', 'Antignano', 'Coteto', 'Salviano'],
    nearbyAreas: ['Rosignano', 'Collesalvetti', 'Cecina', 'Piombino']
  },
  {
    slug: 'siena',
    name: 'Siena',
    province: 'SI',
    region: 'Toscana',
    population: '55.000',
    neighborhoods: ['Centro Storico', 'Acquacalda', 'Ravacciano', 'San Miniato', 'Petriccio'],
    nearbyAreas: ['Poggibonsi', 'Colle di Val d\'Elsa', 'Montepulciano', 'San Gimignano', 'Chiusi']
  },
  // VENETO
  {
    slug: 'venezia',
    name: 'Venezia',
    province: 'VE',
    region: 'Veneto',
    population: '260.000',
    neighborhoods: ['San Marco', 'Cannaregio', 'Dorsoduro', 'Mestre', 'Marghera', 'Lido', 'Murano', 'Burano'],
    nearbyAreas: ['Mira', 'Spinea', 'Chioggia', 'Jesolo', 'Mirano', 'Cavallino-Treporti']
  },
  {
    slug: 'verona',
    name: 'Verona',
    province: 'VR',
    region: 'Veneto',
    population: '250.000',
    neighborhoods: ['Centro', 'Borgo Trento', 'Veronetta', 'San Zeno', 'Borgo Roma', 'Stadio', 'Santa Lucia'],
    nearbyAreas: ['Villafranca', 'San Giovanni Lupatoto', 'Bussolengo', 'Legnago', 'San Bonifacio']
  },
  {
    slug: 'padova',
    name: 'Padova',
    province: 'PD',
    region: 'Veneto',
    population: '210.000',
    neighborhoods: ['Centro', 'Arcella', 'Forcellini', 'Guizza', 'Bassanello', 'Mandria', 'Sacra Famiglia'],
    nearbyAreas: ['Abano Terme', 'Albignasego', 'Selvazzano', 'Rubano', 'Noventa Padovana', 'Vigonza']
  },
  {
    slug: 'vicenza',
    name: 'Vicenza',
    province: 'VI',
    region: 'Veneto',
    population: '110.000',
    neighborhoods: ['Centro', 'Laghetto', 'San Bortolo', 'Bertesinella', 'Anconetta', 'Santa Croce'],
    nearbyAreas: ['Bassano del Grappa', 'Schio', 'Thiene', 'Arzignano', 'Montecchio Maggiore']
  },
  {
    slug: 'treviso',
    name: 'Treviso',
    province: 'TV',
    region: 'Veneto',
    population: '85.000',
    neighborhoods: ['Centro', 'Santa Bona', 'San Liberale', 'Santa Maria del Rovere', 'Fiera'],
    nearbyAreas: ['Conegliano', 'Castelfranco Veneto', 'Montebelluna', 'Vittorio Veneto', 'Oderzo']
  },
  // PUGLIA
  {
    slug: 'bari',
    name: 'Bari',
    province: 'BA',
    region: 'Puglia',
    population: '320.000',
    neighborhoods: ['Centro', 'Bari Vecchia', 'Murat', 'Libertà', 'Poggiofranco', 'Japigia', 'San Paolo', 'Carbonara'],
    nearbyAreas: ['Modugno', 'Bitonto', 'Molfetta', 'Triggiano', 'Altamura', 'Monopoli']
  },
  {
    slug: 'taranto',
    name: 'Taranto',
    province: 'TA',
    region: 'Puglia',
    population: '190.000',
    neighborhoods: ['Città Vecchia', 'Borgo', 'Tamburi', 'Paolo VI', 'Salinella', 'San Vito'],
    nearbyAreas: ['Martina Franca', 'Massafra', 'Grottaglie', 'Manduria', 'Castellaneta']
  },
  {
    slug: 'lecce',
    name: 'Lecce',
    province: 'LE',
    region: 'Puglia',
    population: '95.000',
    neighborhoods: ['Centro', 'Santa Rosa', 'Mazzini', 'San Lazzaro', 'Leuca', 'Rudiae'],
    nearbyAreas: ['Nardò', 'Gallipoli', 'Otranto', 'Copertino', 'Galatina', 'Maglie']
  },
  // FRIULI-VENEZIA GIULIA
  {
    slug: 'trieste',
    name: 'Trieste',
    province: 'TS',
    region: 'Friuli-Venezia Giulia',
    population: '200.000',
    neighborhoods: ['Centro', 'Borgo Teresiano', 'Roiano', 'Barcola', 'San Giovanni', 'Servola', 'Valmaura'],
    nearbyAreas: ['Muggia', 'Duino-Aurisina', 'Sgonico', 'Monrupino']
  },
  {
    slug: 'udine',
    name: 'Udine',
    province: 'UD',
    region: 'Friuli-Venezia Giulia',
    population: '100.000',
    neighborhoods: ['Centro', 'Borgo Stazione', 'Cussignacco', 'Laipacco', 'San Paolo', 'Chiavris'],
    nearbyAreas: ['Tavagnacco', 'Campoformido', 'Pasian di Prato', 'Martignacco', 'Pradamano']
  },
  // CALABRIA
  {
    slug: 'reggio-calabria',
    name: 'Reggio Calabria',
    province: 'RC',
    region: 'Calabria',
    population: '175.000',
    neighborhoods: ['Centro', 'Pentimele', 'Archi', 'Sbarre', 'Gallico', 'Catona', 'Pellaro'],
    nearbyAreas: ['Villa San Giovanni', 'Melito di Porto Salvo', 'Bagnara Calabra', 'Scilla']
  },
  {
    slug: 'catanzaro',
    name: 'Catanzaro',
    province: 'CZ',
    region: 'Calabria',
    population: '90.000',
    neighborhoods: ['Centro', 'Lido', 'Santa Maria', 'Gagliano', 'Pontegrande'],
    nearbyAreas: ['Lamezia Terme', 'Sellia Marina', 'Soverato', 'Borgia', 'Squillace']
  },
  // SARDEGNA
  {
    slug: 'cagliari',
    name: 'Cagliari',
    province: 'CA',
    region: 'Sardegna',
    population: '150.000',
    neighborhoods: ['Centro', 'Marina', 'Stampace', 'Villanova', 'Castello', 'Pirri', 'Sant\'Elia'],
    nearbyAreas: ['Quartu Sant\'Elena', 'Selargius', 'Monserrato', 'Capoterra', 'Assemini']
  },
  {
    slug: 'sassari',
    name: 'Sassari',
    province: 'SS',
    region: 'Sardegna',
    population: '125.000',
    neighborhoods: ['Centro', 'Luna e Sole', 'Li Punti', 'Latte Dolce', 'Carbonazzi'],
    nearbyAreas: ['Alghero', 'Porto Torres', 'Sorso', 'Sennori', 'Castelsardo']
  },
  // MARCHE
  {
    slug: 'ancona',
    name: 'Ancona',
    province: 'AN',
    region: 'Marche',
    population: '100.000',
    neighborhoods: ['Centro', 'Passetto', 'Piano', 'Torrette', 'Posatora', 'Pietralacroce'],
    nearbyAreas: ['Jesi', 'Senigallia', 'Falconara Marittima', 'Osimo', 'Loreto']
  },
  {
    slug: 'pesaro',
    name: 'Pesaro',
    province: 'PU',
    region: 'Marche',
    population: '95.000',
    neighborhoods: ['Centro', 'Baia Flaminia', 'Vismara', 'Pantano', 'Muraglia', 'Villa Fastiggi'],
    nearbyAreas: ['Fano', 'Urbino', 'Gabicce Mare', 'Cattolica', 'Gradara']
  },
  // ABRUZZO
  {
    slug: 'pescara',
    name: 'Pescara',
    province: 'PE',
    region: 'Abruzzo',
    population: '120.000',
    neighborhoods: ['Centro', 'Porta Nuova', 'San Silvestro', 'Fontanelle', 'Rancitelli', 'San Donato'],
    nearbyAreas: ['Montesilvano', 'Francavilla al Mare', 'Spoltore', 'Chieti', 'San Giovanni Teatino']
  },
  // UMBRIA
  {
    slug: 'perugia',
    name: 'Perugia',
    province: 'PG',
    region: 'Umbria',
    population: '165.000',
    neighborhoods: ['Centro', 'Fontivegge', 'San Sisto', 'Madonna Alta', 'Elce', 'Monteluce'],
    nearbyAreas: ['Bastia Umbra', 'Assisi', 'Corciano', 'Deruta', 'Torgiano', 'Magione']
  },
  // TRENTINO-ALTO ADIGE
  {
    slug: 'trento',
    name: 'Trento',
    province: 'TN',
    region: 'Trentino-Alto Adige',
    population: '120.000',
    neighborhoods: ['Centro', 'Gardolo', 'Mattarello', 'Povo', 'Sardagna', 'Bondone'],
    nearbyAreas: ['Pergine Valsugana', 'Rovereto', 'Lavis', 'Mezzocorona', 'Civezzano']
  },
  {
    slug: 'bolzano',
    name: 'Bolzano',
    province: 'BZ',
    region: 'Trentino-Alto Adige',
    population: '105.000',
    neighborhoods: ['Centro', 'Gries', 'Oltrisarco', 'Don Bosco', 'Europa-Novacella', 'Rencio'],
    nearbyAreas: ['Merano', 'Laives', 'Bressanone', 'Appiano', 'Caldaro']
  },
  // BASILICATA
  {
    slug: 'potenza',
    name: 'Potenza',
    province: 'PZ',
    region: 'Basilicata',
    population: '65.000',
    neighborhoods: ['Centro', 'Poggio Tre Galli', 'Macchia Romana', 'Malvaccaro', 'Santa Maria'],
    nearbyAreas: ['Matera', 'Melfi', 'Venosa', 'Avigliano', 'Picerno']
  },
  {
    slug: 'matera',
    name: 'Matera',
    province: 'MT',
    region: 'Basilicata',
    population: '60.000',
    neighborhoods: ['Centro', 'Sassi', 'Serra Venerdì', 'Lanera', 'Agna', 'La Martella'],
    nearbyAreas: ['Montescaglioso', 'Bernalda', 'Pisticci', 'Altamura', 'Gravina']
  },
  // MOLISE
  {
    slug: 'campobasso',
    name: 'Campobasso',
    province: 'CB',
    region: 'Molise',
    population: '48.000',
    neighborhoods: ['Centro', 'Vazzieri', 'San Giovanni', 'CEP', 'Santo Stefano'],
    nearbyAreas: ['Isernia', 'Termoli', 'Bojano', 'Vinchiaturo', 'Riccia']
  },
  // VALLE D'AOSTA
  {
    slug: 'aosta',
    name: 'Aosta',
    province: 'AO',
    region: "Valle d'Aosta",
    population: '35.000',
    neighborhoods: ['Centro', 'Porossan', 'Excenex', 'Signayes', 'Arpuilles'],
    nearbyAreas: ['Courmayeur', 'Saint-Vincent', 'Châtillon', 'Gressan', 'Sarre']
  }
];

// ============================================
// SERVICES DATABASE - Main plumbing services
// ============================================
export interface ServiceData {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  keywords: string[];
  icon: string; // lucide icon name
}

export const SERVICES: ServiceData[] = [
  {
    slug: 'idraulico',
    name: 'Idraulico',
    shortName: 'Idraulico',
    description: 'Servizi idraulici professionali per ogni esigenza domestica e commerciale',
    keywords: ['idraulico', 'servizi idraulici', 'impianti idraulici'],
    icon: 'Wrench'
  },
  {
    slug: 'manutenzione-caldaie',
    name: 'Manutenzione Caldaie',
    shortName: 'Caldaie',
    description: 'Manutenzione, riparazione e installazione caldaie di ogni marca',
    keywords: ['manutenzione caldaia', 'riparazione caldaia', 'assistenza caldaie', 'caldaista'],
    icon: 'Flame'
  },
  {
    slug: 'spurgo-fognature',
    name: 'Spurgo Fognature',
    shortName: 'Spurgo',
    description: 'Spurgo fognature, pozzi neri e tubazioni intasate con autospurgo',
    keywords: ['spurgo fognature', 'spurgo pozzi neri', 'autospurgo', 'disostruzione'],
    icon: 'Droplets'
  },
  {
    slug: 'riparazione-perdite',
    name: 'Riparazione Perdite Acqua',
    shortName: 'Perdite',
    description: 'Ricerca e riparazione perdite acqua con tecnologie moderne',
    keywords: ['perdita acqua', 'riparazione perdite', 'infiltrazioni', 'tubazioni'],
    icon: 'Droplet'
  },
  {
    slug: 'pronto-intervento',
    name: 'Pronto Intervento Idraulico',
    shortName: 'Urgenze',
    description: 'Pronto intervento idraulico 24 ore su 24 per emergenze',
    keywords: ['pronto intervento', 'emergenza idraulico', 'idraulico urgente', '24 ore'],
    icon: 'Clock'
  },
  {
    slug: 'installazione-sanitari',
    name: 'Installazione Sanitari',
    shortName: 'Sanitari',
    description: 'Installazione e sostituzione sanitari, rubinetteria e accessori bagno',
    keywords: ['installazione sanitari', 'sostituzione wc', 'rubinetteria', 'bagno'],
    icon: 'Bath'
  },
  {
    slug: 'condizionatori',
    name: 'Installazione Condizionatori',
    shortName: 'Clima',
    description: 'Installazione, manutenzione e riparazione condizionatori e climatizzatori',
    keywords: ['condizionatori', 'climatizzatori', 'aria condizionata', 'split'],
    icon: 'Wind'
  },
  {
    slug: 'impianto-riscaldamento',
    name: 'Impianti Riscaldamento',
    shortName: 'Riscaldamento',
    description: 'Installazione e manutenzione impianti di riscaldamento a pavimento e tradizionali',
    keywords: ['riscaldamento', 'termosifoni', 'riscaldamento pavimento', 'impianto termico'],
    icon: 'Thermometer'
  },
  {
    slug: 'scarichi-intasati',
    name: 'Scarichi Intasati',
    shortName: 'Scarichi',
    description: 'Disostruzione scarichi intasati con sonde e idrogetto professionale',
    keywords: ['scarico intasato', 'disostruzione', 'lavandino otturato', 'wc intasato'],
    icon: 'CircleSlash'
  },
  {
    slug: 'ristrutturazione-bagno',
    name: 'Ristrutturazione Bagno',
    shortName: 'Bagno',
    description: 'Ristrutturazione completa bagno con impianti idraulici a norma',
    keywords: ['ristrutturazione bagno', 'rifacimento bagno', 'bagno nuovo'],
    icon: 'Home'
  }
];

// ============================================
// GENERIC KEYWORD PAGES
// ============================================
export interface KeywordPageData {
  slug: string;
  title: string;
  h1: string;
  description: string;
  keywords: string[];
}

export const KEYWORD_PAGES: KeywordPageData[] = [
  {
    slug: 'idraulico-vicino-a-me',
    title: 'Idraulico Vicino a Me - Trova Professionisti nella Tua Zona',
    h1: 'Trova un Idraulico Vicino a Te',
    description: 'Cerchi un idraulico vicino a te? Trova professionisti verificati nella tua zona con risposta in 15 minuti. Preventivi gratuiti e senza impegno.',
    keywords: ['idraulico vicino a me', 'idraulico nelle vicinanze', 'idraulico zona', 'cerco idraulico', 'cerco un idraulico', 'trova idraulico']
  },
  {
    slug: 'pronto-intervento-idraulico',
    title: 'Pronto Intervento Idraulico 24h - Emergenze Idrauliche',
    h1: 'Pronto Intervento Idraulico 24 Ore',
    description: 'Pronto intervento idraulico disponibile 24 ore su 24, 7 giorni su 7. Emergenze idrauliche risolte in tempi rapidi da professionisti qualificati.',
    keywords: ['pronto intervento idraulico', 'idraulico pronto intervento', 'emergenza idraulico', 'idraulico 24 ore', 'pronto idraulico']
  },
  {
    slug: 'idraulico-urgente',
    title: 'Idraulico Urgente - Intervento Immediato per Emergenze',
    h1: 'Idraulico Urgente - Intervento Immediato',
    description: 'Hai bisogno di un idraulico urgente? Intervento immediato per perdite, allagamenti e guasti. Professionisti disponibili anche nei festivi.',
    keywords: ['idraulico urgente', 'idraulico immediato', 'emergenza casa', 'allagamento', 'sos idraulico', 'idraulico emergenza']
  },
  {
    slug: 'assistenza-caldaie',
    title: 'Assistenza Caldaie - Manutenzione e Riparazione',
    h1: 'Assistenza Caldaie Professionale',
    description: 'Assistenza caldaie di tutte le marche. Manutenzione ordinaria, riparazione guasti e sostituzione caldaie. Tecnici certificati e qualificati.',
    keywords: ['assistenza caldaie', 'manutenzione caldaia', 'riparazione caldaia', 'tecnico caldaie', 'pronto intervento caldaia', 'idraulico caldaia']
  },
  {
    slug: 'spurgo-pozzi-neri',
    title: 'Spurgo Pozzi Neri - Servizio Autospurgo Professionale',
    h1: 'Spurgo Pozzi Neri e Fognature',
    description: 'Servizio spurgo pozzi neri e fognature con autobotti professionali. Svuotamento fosse biologiche e pulizia pozzetti in tutta Italia.',
    keywords: ['spurgo pozzi neri', 'autospurgo', 'svuotamento fosse', 'pulizia fognature']
  },
  {
    slug: 'idraulico-24-ore',
    title: 'Idraulico 24 Ore - Disponibile Giorno e Notte',
    h1: 'Idraulico 24 Ore su 24',
    description: 'Servizio idraulico disponibile 24 ore su 24, anche nei weekend e festivi. Interventi rapidi per emergenze idrauliche h24.',
    keywords: ['idraulico 24 ore', 'idraulico 24h', 'idraulico h24', 'idraulico 24 ore su 24', 'pronto intervento idraulico h24']
  },
  {
    slug: 'idraulico-a-domicilio',
    title: 'Idraulico a Domicilio - Interventi a Casa Tua',
    h1: 'Idraulico a Domicilio',
    description: 'Servizio di idraulico a domicilio. Professionisti qualificati che intervengono direttamente a casa tua per riparazioni e manutenzioni.',
    keywords: ['idraulico a domicilio', 'idraulico casa', 'intervento idraulico', 'assistenza idraulico']
  },
  {
    slug: 'preventivo-idraulico',
    title: 'Preventivo Idraulico Gratuito - Prezzi e Costi',
    h1: 'Preventivo Idraulico Gratuito',
    description: 'Richiedi un preventivo idraulico gratuito e senza impegno. Confronta prezzi e tariffe di idraulici qualificati nella tua zona.',
    keywords: ['preventivo idraulico', 'idraulico prezzi', 'prezzi idraulico', 'idraulico economico', 'tariffe idraulico', 'idraulico prezzo onesto']
  },
  {
    slug: 'termoidraulica',
    title: 'Termoidraulica - Impianti Termici e Idraulici',
    h1: 'Servizi di Termoidraulica Professionale',
    description: 'Servizi di termoidraulica: installazione e manutenzione impianti termici, caldaie, riscaldamento e climatizzazione. Tecnici qualificati.',
    keywords: ['termoidraulica', 'impianto termoidraulico', 'termoidraulico', 'impianti termici']
  },
  {
    slug: 'impianto-idraulico',
    title: 'Impianto Idraulico - Installazione e Rifacimento',
    h1: 'Impianto Idraulico Professionale',
    description: 'Realizzazione e rifacimento impianti idraulici per casa e azienda. Impianti a norma con materiali di qualità e garanzia.',
    keywords: ['impianto idraulico', 'impianti idraulici', 'impianto idrico', 'impianto idrico sanitario', 'installazione impianti idraulici']
  },
  {
    slug: 'impianto-idraulico-bagno',
    title: 'Impianto Idraulico Bagno - Realizzazione e Rifacimento',
    h1: 'Impianto Idraulico Bagno',
    description: 'Realizzazione e rifacimento impianto idraulico bagno. Impianti bagno multistrato, a vista o tradizionali con professionisti qualificati.',
    keywords: ['impianto idraulico bagno', 'impianti idraulici bagno', 'impianto bagno', 'impianti bagno', 'impianto idrico bagno']
  },
  {
    slug: 'idraulico-onesto',
    title: 'Idraulico Onesto - Professionisti Affidabili',
    h1: 'Trova un Idraulico Onesto',
    description: 'Cerchi un idraulico onesto e affidabile? Trova professionisti verificati con recensioni reali e prezzi trasparenti.',
    keywords: ['idraulico onesto', 'idraulico prezzo onesto', 'idraulico affidabile', 'idraulico serio']
  },
  {
    slug: 'disotturazione-wc',
    title: 'Disotturazione WC - Sturare Water Intasato',
    h1: 'Disotturazione WC e Scarichi',
    description: 'Servizio di disotturazione WC e scarichi intasati. Intervento rapido per sturare water, lavandini e tubature ostruiti.',
    keywords: ['disotturazione wc', 'wc intasato', 'sturare wc', 'water intasato', 'riparazione sciacquone water']
  },
  {
    slug: 'sostituzione-caldaia',
    title: 'Sostituzione Caldaia - Cambio Caldaia Vecchia',
    h1: 'Sostituzione Caldaia Professionale',
    description: 'Servizio di sostituzione caldaia vecchia con nuova caldaia a condensazione. Preventivi gratuiti, installazione certificata e smaltimento incluso.',
    keywords: ['sostituzione caldaia', 'cambio caldaia', 'cambiare caldaia', 'sostituzione caldaia a condensazione', 'cambio caldaia vecchia']
  },
  {
    slug: 'installazione-caldaia',
    title: 'Installazione Caldaia - Montaggio e Prima Accensione',
    h1: 'Installazione Caldaia Certificata',
    description: 'Servizio di installazione caldaia a condensazione con prima accensione e collaudo. Tecnici abilitati, garanzia e certificazione di conformità.',
    keywords: ['installazione caldaia', 'installazione caldaia a condensazione', 'montaggio caldaia', 'prima accensione caldaia']
  },
  {
    slug: 'caldaia-perde-acqua',
    title: 'Caldaia Perde Acqua - Riparazione Perdite Caldaia',
    h1: 'Caldaia Perde Acqua: Intervento Rapido',
    description: 'La caldaia perde acqua? Intervento urgente per riparare perdite caldaia, guasti valvola e problemi pressione. Tecnici disponibili 24h.',
    keywords: ['caldaia perde acqua', 'perdita caldaia', 'caldaia gocciola', 'perdita acqua caldaia', 'caldaia perde acqua calda']
  },
  {
    slug: 'riparazione-scaldabagno',
    title: 'Riparazione Scaldabagno - Assistenza e Manutenzione',
    h1: 'Riparazione Scaldabagno Professionale',
    description: 'Riparazione scaldabagno a gas ed elettrico. Sostituzione anodo, resistenza, termostato e valvola. Intervento rapido con tecnici qualificati.',
    keywords: ['riparazione scaldabagno', 'scaldabagno non funziona', 'riparazione scaldabagno a gas', 'assistenza scaldabagno']
  },
  {
    slug: 'installazione-scaldabagno',
    title: 'Installazione Scaldabagno - Montaggio a Gas ed Elettrico',
    h1: 'Installazione Scaldabagno',
    description: 'Installazione scaldabagno a gas ed elettrico. Montaggio professionale, allaccio gas e scarico fumi a norma. Preventivi gratuiti.',
    keywords: ['installazione scaldabagno', 'montaggio scaldabagno', 'installazione scaldabagno a gas', 'installazione boiler']
  }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find(city => city.slug === slug);
}

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find(service => service.slug === slug);
}

export function getKeywordPageBySlug(slug: string): KeywordPageData | undefined {
  return KEYWORD_PAGES.find(page => page.slug === slug);
}

export function generateAllCityServiceCombinations(): { city: CityData; service: ServiceData }[] {
  const combinations: { city: CityData; service: ServiceData }[] = [];
  for (const city of CITIES) {
    for (const service of SERVICES) {
      combinations.push({ city, service });
    }
  }
  return combinations;
}

export function generateSitemapUrls(): string[] {
  const baseUrl = 'https://idraulicisubito.com';
  const urls: string[] = [
    baseUrl + '/',
    baseUrl + '/richiesta',
    baseUrl + '/per-idraulici',
    baseUrl + '/auth',
    baseUrl + '/privacy',
    baseUrl + '/termini',
  ];
  
  // City pages
  for (const city of CITIES) {
    urls.push(`${baseUrl}/${city.slug}`);
  }
  
  // City + Service pages
  for (const city of CITIES) {
    for (const service of SERVICES) {
      urls.push(`${baseUrl}/${city.slug}-${service.slug}`);
    }
  }
  
  // Keyword pages
  for (const page of KEYWORD_PAGES) {
    urls.push(`${baseUrl}/${page.slug}`);
  }
  
  return urls;
}
