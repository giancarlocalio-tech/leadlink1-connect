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
  },
  // === NUOVE CITTÀ - Lombardia ===
  {
    slug: 'varese',
    name: 'Varese',
    province: 'VA',
    region: 'Lombardia',
    population: '80.000',
    neighborhoods: ['Centro', 'Biumo Inferiore', 'Biumo Superiore', 'Masnago', 'Sant\'Ambrogio', 'Capolago'],
    nearbyAreas: ['Busto Arsizio', 'Gallarate', 'Saronno', 'Tradate', 'Laveno Mombello']
  },
  {
    slug: 'como',
    name: 'Como',
    province: 'CO',
    region: 'Lombardia',
    population: '85.000',
    neighborhoods: ['Centro', 'Borgo Vico', 'Lora', 'Camerlata', 'Rebbio', 'Albate'],
    nearbyAreas: ['Cernobbio', 'Cantù', 'Erba', 'Mariano Comense', 'Olgiate Comasco']
  },
  {
    slug: 'lecco',
    name: 'Lecco',
    province: 'LC',
    region: 'Lombardia',
    population: '48.000',
    neighborhoods: ['Centro', 'Pescarenico', 'Germanedo', 'Maggianico', 'Rancio', 'Laorca'],
    nearbyAreas: ['Malgrate', 'Valmadrera', 'Calolziocorte', 'Mandello del Lario', 'Oggiono']
  },
  {
    slug: 'cremona',
    name: 'Cremona',
    province: 'CR',
    region: 'Lombardia',
    population: '72.000',
    neighborhoods: ['Centro', 'Po', 'Borgo Loreto', 'Sant\'Imerio', 'Cambonino'],
    nearbyAreas: ['Crema', 'Casalmaggiore', 'Soresina', 'Pizzighettone', 'Castelleone']
  },
  {
    slug: 'mantova',
    name: 'Mantova',
    province: 'MN',
    region: 'Lombardia',
    population: '49.000',
    neighborhoods: ['Centro', 'Te', 'Valletta Valsecchi', 'Borgochiesanuova', 'Lunetta'],
    nearbyAreas: ['Curtatone', 'Porto Mantovano', 'Virgilio', 'San Giorgio di Mantova', 'Castiglione delle Stiviere']
  },
  {
    slug: 'pavia',
    name: 'Pavia',
    province: 'PV',
    region: 'Lombardia',
    population: '73.000',
    neighborhoods: ['Centro', 'Borgo Ticino', 'Città Giardino', 'Vallone', 'San Pietro'],
    nearbyAreas: ['Vigevano', 'Voghera', 'Mortara', 'Stradella', 'Broni']
  },
  {
    slug: 'lodi',
    name: 'Lodi',
    province: 'LO',
    region: 'Lombardia',
    population: '45.000',
    neighborhoods: ['Centro', 'Martinetta', 'Revellino', 'San Bernardo', 'San Fereolo'],
    nearbyAreas: ['Codogno', 'Sant\'Angelo Lodigiano', 'Casalpusterlengo', 'Lodi Vecchio']
  },
  // === NUOVE CITTÀ - Emilia-Romagna ===
  {
    slug: 'piacenza',
    name: 'Piacenza',
    province: 'PC',
    region: 'Emilia-Romagna',
    population: '104.000',
    neighborhoods: ['Centro', 'Infrangibile', 'Sant\'Antonio', 'Galleana', 'Farnesiana'],
    nearbyAreas: ['Fiorenzuola d\'Arda', 'Castel San Giovanni', 'Rottofreno', 'Podenzano']
  },
  {
    slug: 'reggio-emilia',
    name: 'Reggio Emilia',
    province: 'RE',
    region: 'Emilia-Romagna',
    population: '172.000',
    neighborhoods: ['Centro', 'Santa Croce', 'Ospizio', 'Regina Pacis', 'Rosta Nuova'],
    nearbyAreas: ['Correggio', 'Scandiano', 'Castelnovo né Monti', 'Guastalla', 'Rubiera']
  },
  {
    slug: 'ravenna',
    name: 'Ravenna',
    province: 'RA',
    region: 'Emilia-Romagna',
    population: '160.000',
    neighborhoods: ['Centro', 'San Bartolo', 'Darsena', 'Madonna dell\'Albero', 'San Biagio'],
    nearbyAreas: ['Cervia', 'Faenza', 'Lugo', 'Russi', 'Alfonsine']
  },
  {
    slug: 'forli',
    name: 'Forlì',
    province: 'FC',
    region: 'Emilia-Romagna',
    population: '118.000',
    neighborhoods: ['Centro', 'Cava', 'Ronco', 'Vecchiazzano', 'San Martino in Strada'],
    nearbyAreas: ['Cesena', 'Cesenatico', 'Forlimpopoli', 'Predappio', 'Bertinoro']
  },
  {
    slug: 'cesena',
    name: 'Cesena',
    province: 'FC',
    region: 'Emilia-Romagna',
    population: '97.000',
    neighborhoods: ['Centro', 'Cesuola', 'Sant\'Egidio', 'Fiorenzuola', 'Case Finali'],
    nearbyAreas: ['Cesenatico', 'Gambettola', 'Savignano sul Rubicone', 'San Mauro Pascoli']
  },
  // === NUOVE CITTÀ - Toscana ===
  {
    slug: 'prato',
    name: 'Prato',
    province: 'PO',
    region: 'Toscana',
    population: '195.000',
    neighborhoods: ['Centro', 'San Paolo', 'Galceti', 'Maliseti', 'Grignano'],
    nearbyAreas: ['Montemurlo', 'Vaiano', 'Vernio', 'Poggio a Caiano', 'Carmignano']
  },
  {
    slug: 'lucca',
    name: 'Lucca',
    province: 'LU',
    region: 'Toscana',
    population: '90.000',
    neighborhoods: ['Centro', 'Sant\'Anna', 'San Concordio', 'Arancio', 'San Marco'],
    nearbyAreas: ['Capannori', 'Altopascio', 'Porcari', 'Montecatini Terme', 'Viareggio']
  },
  {
    slug: 'pistoia',
    name: 'Pistoia',
    province: 'PT',
    region: 'Toscana',
    population: '90.000',
    neighborhoods: ['Centro', 'Sant\'Agostino', 'Le Fornaci', 'Bottegone', 'Pontelungo'],
    nearbyAreas: ['Quarrata', 'Montecatini Terme', 'Pescia', 'Agliana', 'Serravalle Pistoiese']
  },
  {
    slug: 'arezzo',
    name: 'Arezzo',
    province: 'AR',
    region: 'Toscana',
    population: '100.000',
    neighborhoods: ['Centro', 'Saione', 'San Leo', 'Pescaiola', 'Fiorentina'],
    nearbyAreas: ['Cortona', 'Sansepolcro', 'Montevarchi', 'Bibbiena', 'Castiglion Fiorentino']
  },
  {
    slug: 'grosseto',
    name: 'Grosseto',
    province: 'GR',
    region: 'Toscana',
    population: '82.000',
    neighborhoods: ['Centro', 'Barbanella', 'Gorarella', 'Pizzetti', 'Europa'],
    nearbyAreas: ['Follonica', 'Orbetello', 'Massa Marittima', 'Castiglione della Pescaia']
  },
  // === NUOVE CITTÀ - Veneto ===
  {
    slug: 'rovigo',
    name: 'Rovigo',
    province: 'RO',
    region: 'Veneto',
    population: '52.000',
    neighborhoods: ['Centro', 'Boara Polesine', 'Grignano Polesine', 'Sant\'Apollinare'],
    nearbyAreas: ['Adria', 'Badia Polesine', 'Lendinara', 'Porto Viro', 'Occhiobello']
  },
  {
    slug: 'belluno',
    name: 'Belluno',
    province: 'BL',
    region: 'Veneto',
    population: '36.000',
    neighborhoods: ['Centro', 'Borgo Piave', 'Cavarzano', 'Mier', 'Safforze'],
    nearbyAreas: ['Feltre', 'Ponte nelle Alpi', 'Sedico', 'Limana', 'Cortina d\'Ampezzo']
  },
  // === NUOVE CITTÀ - Puglia ===
  {
    slug: 'foggia',
    name: 'Foggia',
    province: 'FG',
    region: 'Puglia',
    population: '150.000',
    neighborhoods: ['Centro', 'Candelaro', 'San Lorenzo', 'Ordona Sud', 'CEP'],
    nearbyAreas: ['Lucera', 'San Severo', 'Manfredonia', 'Cerignola', 'San Giovanni Rotondo']
  },
  {
    slug: 'brindisi',
    name: 'Brindisi',
    province: 'BR',
    region: 'Puglia',
    population: '88.000',
    neighborhoods: ['Centro', 'Sant\'Elia', 'Casale', 'Paradiso', 'Bozzano'],
    nearbyAreas: ['Ostuni', 'Francavilla Fontana', 'Mesagne', 'San Vito dei Normanni', 'Fasano']
  },
  {
    slug: 'andria',
    name: 'Andria',
    province: 'BT',
    region: 'Puglia',
    population: '100.000',
    neighborhoods: ['Centro', 'Fornaci', 'Sant\'Angelo', 'Masseria Sant\'Agostino'],
    nearbyAreas: ['Barletta', 'Trani', 'Corato', 'Bisceglie', 'Canosa di Puglia']
  },
  {
    slug: 'trani',
    name: 'Trani',
    province: 'BT',
    region: 'Puglia',
    population: '56.000',
    neighborhoods: ['Centro', 'Pozzo Piano', 'Sant\'Angelo', 'Pozzopiano'],
    nearbyAreas: ['Barletta', 'Andria', 'Bisceglie', 'Corato', 'Molfetta']
  },
  // === NUOVE CITTÀ - Campania ===
  {
    slug: 'caserta',
    name: 'Caserta',
    province: 'CE',
    region: 'Campania',
    population: '76.000',
    neighborhoods: ['Centro', 'Casertavecchia', 'San Clemente', 'Aldifreda', 'Puccianiello'],
    nearbyAreas: ['Aversa', 'Marcianise', 'Maddaloni', 'Santa Maria Capua Vetere', 'Capua']
  },
  {
    slug: 'benevento',
    name: 'Benevento',
    province: 'BN',
    region: 'Campania',
    population: '60.000',
    neighborhoods: ['Centro', 'Rione Libertà', 'Capodimonte', 'Mellusi', 'Pacevecchia'],
    nearbyAreas: ['Montesarchio', 'Telese Terme', 'San Giorgio del Sannio', 'Airola']
  },
  {
    slug: 'avellino',
    name: 'Avellino',
    province: 'AV',
    region: 'Campania',
    population: '55.000',
    neighborhoods: ['Centro', 'Rione Mazzini', 'Valle', 'San Tommaso', 'Contrade'],
    nearbyAreas: ['Atripalda', 'Mercogliano', 'Solofra', 'Ariano Irpino', 'Monteforte Irpino']
  },
  // === NUOVE CITTÀ - Sicilia ===
  {
    slug: 'siracusa',
    name: 'Siracusa',
    province: 'SR',
    region: 'Sicilia',
    population: '120.000',
    neighborhoods: ['Ortigia', 'Neapolis', 'Tyche', 'Akradina', 'Santa Lucia'],
    nearbyAreas: ['Augusta', 'Noto', 'Avola', 'Lentini', 'Floridia']
  },
  {
    slug: 'ragusa',
    name: 'Ragusa',
    province: 'RG',
    region: 'Sicilia',
    population: '73.000',
    neighborhoods: ['Ragusa Ibla', 'Ragusa Superiore', 'Marina di Ragusa', 'San Giacomo'],
    nearbyAreas: ['Modica', 'Vittoria', 'Comiso', 'Scicli', 'Ispica']
  },
  {
    slug: 'trapani',
    name: 'Trapani',
    province: 'TP',
    region: 'Sicilia',
    population: '70.000',
    neighborhoods: ['Centro', 'Casa Santa', 'Fontanelle', 'Xitta', 'Marausa'],
    nearbyAreas: ['Marsala', 'Erice', 'Alcamo', 'Mazara del Vallo', 'Castelvetrano']
  },
  {
    slug: 'agrigento',
    name: 'Agrigento',
    province: 'AG',
    region: 'Sicilia',
    population: '60.000',
    neighborhoods: ['Centro', 'Villaseta', 'San Leone', 'Fontanelle', 'Monserrato'],
    nearbyAreas: ['Favara', 'Porto Empedocle', 'Canicattì', 'Licata', 'Sciacca']
  },
  {
    slug: 'caltanissetta',
    name: 'Caltanissetta',
    province: 'CL',
    region: 'Sicilia',
    population: '63.000',
    neighborhoods: ['Centro', 'Villaggio Santa Barbara', 'San Luca', 'Firrio'],
    nearbyAreas: ['Gela', 'San Cataldo', 'Mussomeli', 'Serradifalco', 'Riesi']
  },
  {
    slug: 'enna',
    name: 'Enna',
    province: 'EN',
    region: 'Sicilia',
    population: '27.000',
    neighborhoods: ['Centro', 'Enna Bassa', 'Pergusa', 'Borgo Cascino'],
    nearbyAreas: ['Piazza Armerina', 'Nicosia', 'Leonforte', 'Agira', 'Barrafranca']
  },
  // === NUOVE CITTÀ - Sardegna ===
  {
    slug: 'nuoro',
    name: 'Nuoro',
    province: 'NU',
    region: 'Sardegna',
    population: '37.000',
    neighborhoods: ['Centro', 'Monte Gurtei', 'Biscollai', 'Città Giardino'],
    nearbyAreas: ['Orosei', 'Macomer', 'Siniscola', 'Dorgali', 'Orgosolo']
  },
  {
    slug: 'oristano',
    name: 'Oristano',
    province: 'OR',
    region: 'Sardegna',
    population: '31.000',
    neighborhoods: ['Centro', 'Silì', 'Massama', 'Nuraxinieddu', 'Torre Grande'],
    nearbyAreas: ['Terralba', 'Santa Giusta', 'Cabras', 'Mogoro', 'Bosa']
  },
  // === NUOVE CITTÀ - Calabria ===
  {
    slug: 'cosenza',
    name: 'Cosenza',
    province: 'CS',
    region: 'Calabria',
    population: '67.000',
    neighborhoods: ['Centro', 'Via Popilia', 'Via Roma', 'Serra Spiga', 'Mazzini'],
    nearbyAreas: ['Rende', 'Montalto Uffugo', 'Castrolibero', 'Mendicino', 'Paola']
  },
  {
    slug: 'crotone',
    name: 'Crotone',
    province: 'KR',
    region: 'Calabria',
    population: '60.000',
    neighborhoods: ['Centro', 'Tufolo', 'Poggio Pudano', 'Farina', 'Esaro'],
    nearbyAreas: ['Isola di Capo Rizzuto', 'Cirò Marina', 'Cutro', 'Mesoraca']
  },
  {
    slug: 'vibo-valentia',
    name: 'Vibo Valentia',
    province: 'VV',
    region: 'Calabria',
    population: '34.000',
    neighborhoods: ['Centro', 'Vibo Marina', 'Longobardi', 'Triparni', 'Piscopio'],
    nearbyAreas: ['Pizzo', 'Tropea', 'Mileto', 'Serra San Bruno', 'Nicotera']
  },
  // === NUOVE CITTÀ - Liguria ===
  {
    slug: 'la-spezia',
    name: 'La Spezia',
    province: 'SP',
    region: 'Liguria',
    population: '94.000',
    neighborhoods: ['Centro', 'Migliarina', 'Canaletto', 'Mazzetta', 'Rebocco'],
    nearbyAreas: ['Lerici', 'Portovenere', 'Sarzana', 'Santo Stefano di Magra', 'Levanto']
  },
  {
    slug: 'savona',
    name: 'Savona',
    province: 'SV',
    region: 'Liguria',
    population: '61.000',
    neighborhoods: ['Centro', 'Fornaci', 'Legino', 'Zinola', 'Lavagnola'],
    nearbyAreas: ['Albisola Superiore', 'Varazze', 'Celle Ligure', 'Vado Ligure', 'Finale Ligure']
  },
  {
    slug: 'imperia',
    name: 'Imperia',
    province: 'IM',
    region: 'Liguria',
    population: '42.000',
    neighborhoods: ['Oneglia', 'Porto Maurizio', 'Caramagna', 'Borgo Prino'],
    nearbyAreas: ['Sanremo', 'Diano Marina', 'San Bartolomeo al Mare', 'Ventimiglia', 'Bordighera']
  },
  // === NUOVE CITTÀ - Marche ===
  {
    slug: 'macerata',
    name: 'Macerata',
    province: 'MC',
    region: 'Marche',
    population: '42.000',
    neighborhoods: ['Centro', 'Piediripa', 'Sforzacosta', 'Villa Potenza', 'Corneto'],
    nearbyAreas: ['Civitanova Marche', 'Recanati', 'Tolentino', 'Corridonia', 'Porto Recanati']
  },
  {
    slug: 'fermo',
    name: 'Fermo',
    province: 'FM',
    region: 'Marche',
    population: '37.000',
    neighborhoods: ['Centro', 'Marina Palmense', 'Lido di Fermo', 'Capodarco'],
    nearbyAreas: ['Porto San Giorgio', 'Sant\'Elpidio a Mare', 'Porto Sant\'Elpidio', 'Montegranaro']
  },
  {
    slug: 'ascoli-piceno',
    name: 'Ascoli Piceno',
    province: 'AP',
    region: 'Marche',
    population: '49.000',
    neighborhoods: ['Centro', 'Campo Parignano', 'Monticelli', 'Porta Maggiore'],
    nearbyAreas: ['San Benedetto del Tronto', 'Grottammare', 'Monteprandone', 'Spinetoli']
  },
  // === NUOVE CITTÀ - Abruzzo ===
  {
    slug: 'l-aquila',
    name: 'L\'Aquila',
    province: 'AQ',
    region: 'Abruzzo',
    population: '70.000',
    neighborhoods: ['Centro', 'Pettino', 'Coppito', 'Paganica', 'Bazzano'],
    nearbyAreas: ['Avezzano', 'Sulmona', 'Carsoli', 'Celano', 'Rocca di Mezzo']
  },
  {
    slug: 'teramo',
    name: 'Teramo',
    province: 'TE',
    region: 'Abruzzo',
    population: '55.000',
    neighborhoods: ['Centro', 'Villa Mosca', 'Piano d\'Accio', 'Cartecchio', 'Gammarana'],
    nearbyAreas: ['Giulianova', 'Roseto degli Abruzzi', 'Atri', 'Silvi', 'Pineto']
  },
  {
    slug: 'chieti',
    name: 'Chieti',
    province: 'CH',
    region: 'Abruzzo',
    population: '52.000',
    neighborhoods: ['Centro', 'Chieti Scalo', 'Madonna delle Piane', 'Brecciarola'],
    nearbyAreas: ['Pescara', 'Lanciano', 'Francavilla al Mare', 'Ortona', 'Vasto']
  },
  // === NUOVE CITTÀ AGGIUNTE - Lombardia ===
  {
    slug: 'busto-arsizio',
    name: 'Busto Arsizio',
    province: 'VA',
    region: 'Lombardia',
    population: '84.000',
    neighborhoods: ['Centro', 'Sacconago', 'Borsano', 'Sant\'Anna', 'Madonna Regina'],
    nearbyAreas: ['Gallarate', 'Legnano', 'Castellanza', 'Olgiate Olona', 'Saronno']
  },
  {
    slug: 'legnano',
    name: 'Legnano',
    province: 'MI',
    region: 'Lombardia',
    population: '60.000',
    neighborhoods: ['Centro', 'Canazza', 'Mazzafame', 'San Bernardino', 'Flora'],
    nearbyAreas: ['Busto Arsizio', 'Parabiago', 'Nerviano', 'San Giorgio su Legnano']
  },
  {
    slug: 'gallarate',
    name: 'Gallarate',
    province: 'VA',
    region: 'Lombardia',
    population: '54.000',
    neighborhoods: ['Centro', 'Arnate', 'Cedrate', 'Crenna', 'Madonna in Campagna'],
    nearbyAreas: ['Busto Arsizio', 'Saronno', 'Cassano Magnago', 'Cardano al Campo']
  },
  {
    slug: 'saronno',
    name: 'Saronno',
    province: 'VA',
    region: 'Lombardia',
    population: '40.000',
    neighborhoods: ['Centro', 'Cassina Ferrara', 'Prealpi', 'Matteotti'],
    nearbyAreas: ['Origgio', 'Uboldo', 'Gerenzano', 'Ceriano Laghetto', 'Caronno Pertusella']
  },
  {
    slug: 'seregno',
    name: 'Seregno',
    province: 'MB',
    region: 'Lombardia',
    population: '45.000',
    neighborhoods: ['Centro', 'San Salvatore', 'Ceredo', 'Santa Valeria'],
    nearbyAreas: ['Desio', 'Lissone', 'Giussano', 'Meda', 'Cabiate']
  },
  {
    slug: 'desio',
    name: 'Desio',
    province: 'MB',
    region: 'Lombardia',
    population: '42.000',
    neighborhoods: ['Centro', 'San Giorgio', 'Spaccone', 'Cattaneo'],
    nearbyAreas: ['Seregno', 'Lissone', 'Nova Milanese', 'Cesano Maderno']
  },
  {
    slug: 'lissone',
    name: 'Lissone',
    province: 'MB',
    region: 'Lombardia',
    population: '46.000',
    neighborhoods: ['Centro', 'Santa Margherita', 'Bareggia', 'San Mauro'],
    nearbyAreas: ['Monza', 'Desio', 'Seregno', 'Biassono', 'Vedano al Lambro']
  },
  {
    slug: 'cantu',
    name: 'Cantù',
    province: 'CO',
    region: 'Lombardia',
    population: '40.000',
    neighborhoods: ['Centro', 'Vighizzolo', 'Fecchio', 'Mirabello'],
    nearbyAreas: ['Mariano Comense', 'Carimate', 'Cermenate', 'Figino Serenza']
  },
  {
    slug: 'crema',
    name: 'Crema',
    province: 'CR',
    region: 'Lombardia',
    population: '35.000',
    neighborhoods: ['Centro', 'San Bernardino', 'Castelnuovo', 'Santa Maria'],
    nearbyAreas: ['Offanengo', 'Sergnano', 'Vaiano Cremasco', 'Palazzo Pignano']
  },
  // === NUOVE CITTÀ - Piemonte ===
  {
    slug: 'novara',
    name: 'Novara',
    province: 'NO',
    region: 'Piemonte',
    population: '104.000',
    neighborhoods: ['Centro', 'Sant\'Andrea', 'Bicocca', 'Vignale', 'San Paolo'],
    nearbyAreas: ['Galliate', 'Trecate', 'Oleggio', 'Cameri', 'Borgomanero']
  },
  {
    slug: 'asti',
    name: 'Asti',
    province: 'AT',
    region: 'Piemonte',
    population: '76.000',
    neighborhoods: ['Centro', 'San Pietro', 'Tanaro', 'Viatosto', 'Torretta'],
    nearbyAreas: ['Nizza Monferrato', 'Canelli', 'San Damiano d\'Asti', 'Costigliole d\'Asti']
  },
  {
    slug: 'cuneo',
    name: 'Cuneo',
    province: 'CN',
    region: 'Piemonte',
    population: '56.000',
    neighborhoods: ['Centro', 'San Paolo', 'San Rocco', 'Madonna dell\'Olmo', 'Roata Rossi'],
    nearbyAreas: ['Borgo San Dalmazzo', 'Boves', 'Mondovì', 'Saluzzo', 'Fossano']
  },
  {
    slug: 'alessandria',
    name: 'Alessandria',
    province: 'AL',
    region: 'Piemonte',
    population: '94.000',
    neighborhoods: ['Centro', 'Cristo', 'Pista', 'San Michele', 'Orti'],
    nearbyAreas: ['Valenza', 'Tortona', 'Casale Monferrato', 'Novi Ligure', 'Acqui Terme']
  },
  {
    slug: 'moncalieri',
    name: 'Moncalieri',
    province: 'TO',
    region: 'Piemonte',
    population: '58.000',
    neighborhoods: ['Centro', 'Borgo San Pietro', 'Santa Maria', 'Tagliaferro', 'Testona'],
    nearbyAreas: ['Torino', 'Nichelino', 'Trofarello', 'La Loggia', 'Cambiano']
  },
  {
    slug: 'rivoli',
    name: 'Rivoli',
    province: 'TO',
    region: 'Piemonte',
    population: '49.000',
    neighborhoods: ['Centro', 'Cascine Vica', 'Tetti Neirotti', 'Bruere'],
    nearbyAreas: ['Collegno', 'Grugliasco', 'Alpignano', 'Rosta', 'Villarbasse']
  },
  // === NUOVE CITTÀ - Veneto ===
  {
    slug: 'bassano-del-grappa',
    name: 'Bassano del Grappa',
    province: 'VI',
    region: 'Veneto',
    population: '43.000',
    neighborhoods: ['Centro', 'Sant\'Eusebio', 'Rubbio', 'Campese', 'Angarano'],
    nearbyAreas: ['Marostica', 'Cassola', 'Romano d\'Ezzelino', 'Rosà', 'Mussolente']
  },
  {
    slug: 'schio',
    name: 'Schio',
    province: 'VI',
    region: 'Veneto',
    population: '39.000',
    neighborhoods: ['Centro', 'Magrè', 'Santa Caterina', 'San Vito', 'Giavenale'],
    nearbyAreas: ['Thiene', 'Valdagno', 'Malo', 'Santorso', 'Piovene Rocchette']
  },
  {
    slug: 'conegliano',
    name: 'Conegliano',
    province: 'TV',
    region: 'Veneto',
    population: '35.000',
    neighborhoods: ['Centro', 'Collalbrigo', 'Scomigo', 'Ogliano', 'Costa'],
    nearbyAreas: ['Vittorio Veneto', 'Susegana', 'San Vendemiano', 'Pieve di Soligo']
  },
  {
    slug: 'chioggia',
    name: 'Chioggia',
    province: 'VE',
    region: 'Veneto',
    population: '50.000',
    neighborhoods: ['Centro', 'Sottomarina', 'Borgo San Giovanni', 'Ca\' Lino', 'Brondolo'],
    nearbyAreas: ['Cavarzere', 'Codevigo', 'Cona', 'Piove di Sacco']
  },
  // === NUOVE CITTÀ - Toscana ===
  {
    slug: 'massa',
    name: 'Massa',
    province: 'MS',
    region: 'Toscana',
    population: '69.000',
    neighborhoods: ['Centro', 'Marina di Massa', 'Turano', 'Altagnana', 'Castagnetola'],
    nearbyAreas: ['Carrara', 'Montignoso', 'Forte dei Marmi', 'Pietrasanta']
  },
  {
    slug: 'carrara',
    name: 'Carrara',
    province: 'MS',
    region: 'Toscana',
    population: '62.000',
    neighborhoods: ['Centro', 'Marina di Carrara', 'Avenza', 'Fossola', 'Torano'],
    nearbyAreas: ['Massa', 'Sarzana', 'Ortonovo', 'Fosdinovo']
  },
  {
    slug: 'viareggio',
    name: 'Viareggio',
    province: 'LU',
    region: 'Toscana',
    population: '62.000',
    neighborhoods: ['Centro', 'Darsena', 'Marco Polo', 'Torre del Lago', 'Bicchio'],
    nearbyAreas: ['Camaiore', 'Pietrasanta', 'Massarosa', 'Forte dei Marmi']
  },
  {
    slug: 'empoli',
    name: 'Empoli',
    province: 'FI',
    region: 'Toscana',
    population: '49.000',
    neighborhoods: ['Centro', 'Pontorme', 'Pozzale', 'Cortenuova', 'Serravalle'],
    nearbyAreas: ['Montelupo Fiorentino', 'Fucecchio', 'Vinci', 'Cerreto Guidi', 'Castelfiorentino']
  },
  {
    slug: 'scandicci',
    name: 'Scandicci',
    province: 'FI',
    region: 'Toscana',
    population: '50.000',
    neighborhoods: ['Centro', 'Casellina', 'Vingone', 'San Giusto', 'Le Bagnese'],
    nearbyAreas: ['Firenze', 'Lastra a Signa', 'Signa', 'Impruneta']
  },
  // === NUOVE CITTÀ - Lazio ===
  {
    slug: 'guidonia',
    name: 'Guidonia Montecelio',
    province: 'RM',
    region: 'Lazio',
    population: '90.000',
    neighborhoods: ['Centro', 'Villanova', 'Colleverde', 'Marco Simone', 'Setteville'],
    nearbyAreas: ['Tivoli', 'Monterotondo', 'Mentana', 'Sant\'Angelo Romano']
  },
  {
    slug: 'tivoli',
    name: 'Tivoli',
    province: 'RM',
    region: 'Lazio',
    population: '57.000',
    neighborhoods: ['Centro', 'Tivoli Terme', 'Villa Adriana', 'Campolimpido', 'Favale'],
    nearbyAreas: ['Guidonia', 'Palestrina', 'San Polo dei Cavalieri', 'Castel Madama']
  },
  {
    slug: 'civitavecchia',
    name: 'Civitavecchia',
    province: 'RM',
    region: 'Lazio',
    population: '53.000',
    neighborhoods: ['Centro', 'San Gordiano', 'Boccelle', 'Aurelia', 'La Scaglia'],
    nearbyAreas: ['Santa Marinella', 'Tarquinia', 'Tolfa', 'Allumiere']
  },
  {
    slug: 'velletri',
    name: 'Velletri',
    province: 'RM',
    region: 'Lazio',
    population: '53.000',
    neighborhoods: ['Centro', 'Pratolungo', 'Lazzaria', 'Ponte di Mele'],
    nearbyAreas: ['Lariano', 'Artena', 'Genzano di Roma', 'Cisterna di Latina']
  },
  {
    slug: 'pomezia',
    name: 'Pomezia',
    province: 'RM',
    region: 'Lazio',
    population: '63.000',
    neighborhoods: ['Centro', 'Torvaianica', 'Martin Pescatore', 'Santa Palomba'],
    nearbyAreas: ['Ardea', 'Aprilia', 'Albano Laziale', 'Marino']
  },
  // === NUOVE CITTÀ - Puglia ===
  {
    slug: 'altamura',
    name: 'Altamura',
    province: 'BA',
    region: 'Puglia',
    population: '70.000',
    neighborhoods: ['Centro', 'Parco Tridente', 'Via Santeramo', 'Fornaci'],
    nearbyAreas: ['Gravina in Puglia', 'Santeramo in Colle', 'Matera', 'Acquaviva delle Fonti']
  },
  {
    slug: 'molfetta',
    name: 'Molfetta',
    province: 'BA',
    region: 'Puglia',
    population: '59.000',
    neighborhoods: ['Centro', 'Molfetta Alta', 'Madonna della Rosa', 'Sant\'Andrea'],
    nearbyAreas: ['Giovinazzo', 'Bisceglie', 'Terlizzi', 'Bari']
  },
  {
    slug: 'cerignola',
    name: 'Cerignola',
    province: 'FG',
    region: 'Puglia',
    population: '58.000',
    neighborhoods: ['Centro', 'Terra Vecchia', 'Borgo Libertà', 'Torricelli'],
    nearbyAreas: ['San Ferdinando di Puglia', 'Stornara', 'Orta Nova', 'Trinitapoli']
  },
  {
    slug: 'martina-franca',
    name: 'Martina Franca',
    province: 'TA',
    region: 'Puglia',
    population: '49.000',
    neighborhoods: ['Centro', 'Pergolo', 'Motolese', 'Montedoro'],
    nearbyAreas: ['Locorotondo', 'Alberobello', 'Ceglie Messapica', 'Taranto']
  },
  // === NUOVE CITTÀ - Campania ===
  {
    slug: 'battipaglia',
    name: 'Battipaglia',
    province: 'SA',
    region: 'Campania',
    population: '51.000',
    neighborhoods: ['Centro', 'Serroni', 'Sant\'Anna', 'Taverna'],
    nearbyAreas: ['Eboli', 'Pontecagnano Faiano', 'Bellizzi', 'Olevano sul Tusciano']
  },
  {
    slug: 'cava-de-tirreni',
    name: 'Cava de\' Tirreni',
    province: 'SA',
    region: 'Campania',
    population: '54.000',
    neighborhoods: ['Centro', 'Annunziata', 'Santa Lucia', 'Pregiato', 'San Pietro'],
    nearbyAreas: ['Vietri sul Mare', 'Nocera Superiore', 'Salerno', 'Maiori']
  },
  {
    slug: 'aversa',
    name: 'Aversa',
    province: 'CE',
    region: 'Campania',
    population: '54.000',
    neighborhoods: ['Centro', 'Canosa', 'Ischitella', 'Gescal'],
    nearbyAreas: ['Giugliano', 'Casoria', 'Afragola', 'Villa di Briano', 'Trentola-Ducenta']
  },
  {
    slug: 'torre-del-greco',
    name: 'Torre del Greco',
    province: 'NA',
    region: 'Campania',
    population: '85.000',
    neighborhoods: ['Centro', 'Santa Maria la Bruna', 'Leopardi', 'Cappuccini'],
    nearbyAreas: ['Ercolano', 'Torre Annunziata', 'Portici', 'Boscoreale']
  },
  // === NUOVE CITTÀ - Sicilia ===
  {
    slug: 'marsala',
    name: 'Marsala',
    province: 'TP',
    region: 'Sicilia',
    population: '82.000',
    neighborhoods: ['Centro', 'Strasatti', 'Lato Mazara', 'Terrenove'],
    nearbyAreas: ['Mazara del Vallo', 'Trapani', 'Petrosino', 'Salemi']
  },
  {
    slug: 'vittoria',
    name: 'Vittoria',
    province: 'RG',
    region: 'Sicilia',
    population: '64.000',
    neighborhoods: ['Centro', 'Fanello', 'Macconi', 'Scoglitti'],
    nearbyAreas: ['Ragusa', 'Comiso', 'Acate', 'Gela', 'Santa Croce Camerina']
  },
  {
    slug: 'modica',
    name: 'Modica',
    province: 'RG',
    region: 'Sicilia',
    population: '55.000',
    neighborhoods: ['Modica Alta', 'Modica Bassa', 'Sorda', 'Frigintini'],
    nearbyAreas: ['Ragusa', 'Scicli', 'Ispica', 'Pozzallo', 'Rosolini']
  },
  {
    slug: 'acireale',
    name: 'Acireale',
    province: 'CT',
    region: 'Sicilia',
    population: '53.000',
    neighborhoods: ['Centro', 'Santa Maria la Scala', 'Pozzillo', 'Guardia', 'Mangano'],
    nearbyAreas: ['Catania', 'Giarre', 'Aci Catena', 'Aci Sant\'Antonio', 'Riposto']
  },
  {
    slug: 'milazzo',
    name: 'Milazzo',
    province: 'ME',
    region: 'Sicilia',
    population: '32.000',
    neighborhoods: ['Centro', 'Borgo', 'San Papino', 'Santa Marina'],
    nearbyAreas: ['Barcellona Pozzo di Gotto', 'Terme Vigliatore', 'Lipari', 'Furnari']
  },
  // === NUOVE CITTÀ - Sardegna ===
  {
    slug: 'olbia',
    name: 'Olbia',
    province: 'SS',
    region: 'Sardegna',
    population: '60.000',
    neighborhoods: ['Centro', 'Bandinu', 'San Nicola', 'Poltu Quatu', 'Porto Rotondo'],
    nearbyAreas: ['San Teodoro', 'Arzachena', 'Golfo Aranci', 'Loiri Porto San Paolo']
  },
  {
    slug: 'quartu-sant-elena',
    name: 'Quartu Sant\'Elena',
    province: 'CA',
    region: 'Sardegna',
    population: '71.000',
    neighborhoods: ['Centro', 'Margine Rosso', 'Poetto', 'Is Arenas', 'Pitz\'e Serra'],
    nearbyAreas: ['Cagliari', 'Selargius', 'Quartucciu', 'Maracalagonis', 'Villasimius']
  },
  {
    slug: 'alghero',
    name: 'Alghero',
    province: 'SS',
    region: 'Sardegna',
    population: '44.000',
    neighborhoods: ['Centro', 'Fertilia', 'Maristella', 'Maria Pia', 'Calabona'],
    nearbyAreas: ['Sassari', 'Villanova Monteleone', 'Uri', 'Ittiri', 'Stintino']
  },
  // === NUOVE CITTÀ - Calabria ===
  {
    slug: 'lamezia-terme',
    name: 'Lamezia Terme',
    province: 'CZ',
    region: 'Calabria',
    population: '70.000',
    neighborhoods: ['Nicastro', 'Sambiase', 'Sant\'Eufemia', 'Fronti', 'San Teodoro'],
    nearbyAreas: ['Catanzaro', 'Maida', 'Curinga', 'Gizzeria', 'Falerna']
  },
  {
    slug: 'rende',
    name: 'Rende',
    province: 'CS',
    region: 'Calabria',
    population: '36.000',
    neighborhoods: ['Centro', 'Roges', 'Quattromiglia', 'Commenda', 'Arcavacata'],
    nearbyAreas: ['Cosenza', 'Montalto Uffugo', 'Castrolibero', 'San Fili']
  },
  // === NUOVE CITTÀ - Marche ===
  {
    slug: 'civitanova-marche',
    name: 'Civitanova Marche',
    province: 'MC',
    region: 'Marche',
    population: '42.000',
    neighborhoods: ['Centro', 'Civitanova Alta', 'San Marone', 'Santa Maria Apparente'],
    nearbyAreas: ['Porto Sant\'Elpidio', 'Potenza Picena', 'Montecosaro', 'Porto Recanati']
  },
  {
    slug: 'san-benedetto-del-tronto',
    name: 'San Benedetto del Tronto',
    province: 'AP',
    region: 'Marche',
    population: '48.000',
    neighborhoods: ['Centro', 'Porto d\'Ascoli', 'Ragnola', 'Ponterotto', 'Salaria'],
    nearbyAreas: ['Grottammare', 'Monteprandone', 'Acquaviva Picena', 'Martinsicuro']
  },
  {
    slug: 'senigallia',
    name: 'Senigallia',
    province: 'AN',
    region: 'Marche',
    population: '45.000',
    neighborhoods: ['Centro', 'Marzocca', 'Cesanella', 'Ciarnin', 'Portone'],
    nearbyAreas: ['Fano', 'Ancona', 'Mondolfo', 'Ostra', 'Trecastelli']
  },
  // === NUOVE CITTÀ - Abruzzo ===
  {
    slug: 'montesilvano',
    name: 'Montesilvano',
    province: 'PE',
    region: 'Abruzzo',
    population: '54.000',
    neighborhoods: ['Centro', 'Montesilvano Colle', 'Villa Verrocchio', 'Montesilvano Spiaggia'],
    nearbyAreas: ['Pescara', 'Silvi', 'Cappelle sul Tavo', 'Spoltore', 'Città Sant\'Angelo']
  },
  {
    slug: 'vasto',
    name: 'Vasto',
    province: 'CH',
    region: 'Abruzzo',
    population: '42.000',
    neighborhoods: ['Centro', 'Vasto Marina', 'San Salvo Marina', 'Incoronata'],
    nearbyAreas: ['San Salvo', 'Cupello', 'Monteodorisio', 'Casalbordino']
  },
  {
    slug: 'lanciano',
    name: 'Lanciano',
    province: 'CH',
    region: 'Abruzzo',
    population: '36.000',
    neighborhoods: ['Centro', 'Civitanova', 'Lancianovecchia', 'Santa Rita'],
    nearbyAreas: ['Fossacesia', 'Castel Frentano', 'Frisa', 'Rocca San Giovanni']
  },
  // === NUOVE CITTÀ - Umbria ===
  {
    slug: 'terni',
    name: 'Terni',
    province: 'TR',
    region: 'Umbria',
    population: '111.000',
    neighborhoods: ['Centro', 'Borgo Rivo', 'Cesi', 'Piediluco', 'Papigno'],
    nearbyAreas: ['Narni', 'Orvieto', 'Spoleto', 'Amelia', 'Acquasparta']
  },
  {
    slug: 'foligno',
    name: 'Foligno',
    province: 'PG',
    region: 'Umbria',
    population: '58.000',
    neighborhoods: ['Centro', 'Sportella Marini', 'Pale', 'Scopoli', 'Colfiorito'],
    nearbyAreas: ['Spello', 'Trevi', 'Bevagna', 'Montefalco', 'Nocera Umbra']
  },
  {
    slug: 'spoleto',
    name: 'Spoleto',
    province: 'PG',
    region: 'Umbria',
    population: '39.000',
    neighborhoods: ['Centro', 'San Giacomo', 'Madonna di Lugo', 'Bazzano Inferiore'],
    nearbyAreas: ['Foligno', 'Norcia', 'Trevi', 'Campello sul Clitunno']
  },
  // === NUOVE CITTÀ - Molise ===
  {
    slug: 'isernia',
    name: 'Isernia',
    province: 'IS',
    region: 'Molise',
    population: '22.000',
    neighborhoods: ['Centro', 'San Lazzaro', 'Santo Spirito', 'Conocchia'],
    nearbyAreas: ['Venafro', 'Agnone', 'Frosolone', 'Castel di Sangro']
  },
  {
    slug: 'termoli',
    name: 'Termoli',
    province: 'CB',
    region: 'Molise',
    population: '33.000',
    neighborhoods: ['Centro', 'Borgo Antico', 'Difesa Grande', 'Rio Vivo'],
    nearbyAreas: ['Campomarino', 'San Giacomo degli Schiavoni', 'Guglionesi', 'Larino']
  },
  // === NUOVE CITTÀ - Trentino-Alto Adige ===
  {
    slug: 'merano',
    name: 'Merano',
    province: 'BZ',
    region: 'Trentino-Alto Adige',
    population: '40.000',
    neighborhoods: ['Centro', 'Maia Alta', 'Maia Bassa', 'Quarazze', 'Sinigo'],
    nearbyAreas: ['Lana', 'Tirolo', 'Lagundo', 'Marlengo', 'Naturno']
  },
  {
    slug: 'rovereto',
    name: 'Rovereto',
    province: 'TN',
    region: 'Trentino-Alto Adige',
    population: '40.000',
    neighborhoods: ['Centro', 'Borgo Sacco', 'Lizzana', 'Marco', 'Noriglio'],
    nearbyAreas: ['Riva del Garda', 'Mori', 'Ala', 'Isera', 'Villa Lagarina']
  },
  {
    slug: 'bressanone',
    name: 'Bressanone',
    province: 'BZ',
    region: 'Trentino-Alto Adige',
    population: '22.000',
    neighborhoods: ['Centro', 'Stufles', 'Millan', 'Sant\'Andrea', 'Sarnes'],
    nearbyAreas: ['Varna', 'Fortezza', 'Chiusa', 'Luson', 'Naz-Sciaves']
  },
  // === CITTÀ AGGIUNTE PER FIX GSC "SCANSIONATE MA NON INDICIZZATE" ===
  // Manfredonia (standalone - non duplicata)
  {
    slug: 'manfredonia',
    name: 'Manfredonia',
    province: 'FG',
    region: 'Puglia',
    population: '55.000',
    neighborhoods: ['Centro', 'Monticchio', 'Siponto', 'Borgo Mezzanone', 'San Leonardo'],
    nearbyAreas: ['Foggia', 'San Giovanni Rotondo', 'Monte Sant\'Angelo', 'Vieste', 'Mattinata']
  },
  // === CITTÀ AGGIUNTE PER FIX GSC "SCANSIONATE MA NON INDICIZZATE" ===
  // SICILIA
  {
    slug: 'bagheria',
    name: 'Bagheria',
    province: 'PA',
    region: 'Sicilia',
    population: '56.000',
    neighborhoods: ['Centro', 'Aspra', 'Santa Flavia', 'Mongerbino', 'Porticello'],
    nearbyAreas: ['Palermo', 'Ficarazzi', 'Casteldaccia', 'Altavilla Milicia', 'Termini Imerese']
  },
  // EMILIA-ROMAGNA
  {
    slug: 'formigine',
    name: 'Formigine',
    province: 'MO',
    region: 'Emilia-Romagna',
    population: '35.000',
    neighborhoods: ['Centro', 'Casinalbo', 'Magreta', 'Corlo', 'Colombaro'],
    nearbyAreas: ['Modena', 'Sassuolo', 'Maranello', 'Fiorano Modenese', 'Castelnuovo Rangone']
  },
  // PIEMONTE
  {
    slug: 'biella',
    name: 'Biella',
    province: 'BI',
    region: 'Piemonte',
    population: '45.000',
    neighborhoods: ['Centro', 'Chiavazza', 'Pavignano', 'Cossila', 'Oropa'],
    nearbyAreas: ['Cossato', 'Vigliano Biellese', 'Candelo', 'Gaglianico', 'Verrone']
  },
  {
    slug: 'vercelli',
    name: 'Vercelli',
    province: 'VC',
    region: 'Piemonte',
    population: '47.000',
    neighborhoods: ['Centro', 'Cappuccini', 'Porta Milano', 'Belvedere', 'Isola'],
    nearbyAreas: ['Novara', 'Casale Monferrato', 'Trino', 'Santhià', 'Livorno Ferraris']
  },
  {
    slug: 'verbania',
    name: 'Verbania',
    province: 'VB',
    region: 'Piemonte',
    population: '31.000',
    neighborhoods: ['Intra', 'Pallanza', 'Suna', 'Fondotoce', 'Trobaso'],
    nearbyAreas: ['Stresa', 'Baveno', 'Gravellona Toce', 'Omegna', 'Cannobio']
  },
  // FRIULI-VENEZIA GIULIA
  {
    slug: 'gorizia',
    name: 'Gorizia',
    province: 'GO',
    region: 'Friuli-Venezia Giulia',
    population: '35.000',
    neighborhoods: ['Centro', 'Sant\'Andrea', 'Campagnuzza', 'Piedimonte', 'Lucinico'],
    nearbyAreas: ['Gradisca d\'Isonzo', 'Monfalcone', 'Cormons', 'Nova Gorica', 'Sagrado']
  },
  {
    slug: 'pordenone',
    name: 'Pordenone',
    province: 'PN',
    region: 'Friuli-Venezia Giulia',
    population: '51.000',
    neighborhoods: ['Centro', 'Borgomeduna', 'Torre', 'Villanova', 'Vallenoncello'],
    nearbyAreas: ['Sacile', 'Porcia', 'Cordenons', 'Roveredo in Piano', 'San Vito al Tagliamento']
  },
  // LAZIO
  {
    slug: 'rieti',
    name: 'Rieti',
    province: 'RI',
    region: 'Lazio',
    population: '47.000',
    neighborhoods: ['Centro', 'Madonna del Cuore', 'Campoloniano', 'Villa Reatina', 'Quattro Strade'],
    nearbyAreas: ['Cittaducale', 'Leonessa', 'Poggio Mirteto', 'Contigliano', 'Greccio']
  },
  {
    slug: 'frosinone',
    name: 'Frosinone',
    province: 'FR',
    region: 'Lazio',
    population: '46.000',
    neighborhoods: ['Centro', 'De Matthaeis', 'Cavoni', 'Madonna della Neve', 'Selva Piana'],
    nearbyAreas: ['Alatri', 'Ferentino', 'Ceccano', 'Veroli', 'Cassino']
  },
  {
    slug: 'viterbo',
    name: 'Viterbo',
    province: 'VT',
    region: 'Lazio',
    population: '67.000',
    neighborhoods: ['Centro', 'San Faustino', 'Pianoscarano', 'Bagnaia', 'La Quercia'],
    nearbyAreas: ['Montefiascone', 'Vitorchiano', 'Vetralla', 'Ronciglione', 'Tarquinia']
  },
  // LOMBARDIA - Province minori e hinterland milanese
  {
    slug: 'sondrio',
    name: 'Sondrio',
    province: 'SO',
    region: 'Lombardia',
    population: '22.000',
    neighborhoods: ['Centro', 'Mossini', 'Triangia', 'Ponchiera', 'Arquino'],
    nearbyAreas: ['Morbegno', 'Tirano', 'Chiesa in Valmalenco', 'Castione Andevenno', 'Montagna in Valtellina']
  },
  {
    slug: 'rozzano',
    name: 'Rozzano',
    province: 'MI',
    region: 'Lombardia',
    population: '43.000',
    neighborhoods: ['Centro', 'Quinto de\'Stampi', 'Valleambrosia', 'Ponte Sesto', 'Fizzonasco'],
    nearbyAreas: ['Milano', 'Pieve Emanuele', 'Opera', 'Basiglio', 'Assago']
  },
  {
    slug: 'assago',
    name: 'Assago',
    province: 'MI',
    region: 'Lombardia',
    population: '9.000',
    neighborhoods: ['Centro', 'Milanofiori', 'Milanofiori Nord'],
    nearbyAreas: ['Milano', 'Rozzano', 'Corsico', 'Buccinasco', 'Cesano Boscone']
  },
  {
    slug: 'brugherio',
    name: 'Brugherio',
    province: 'MB',
    region: 'Lombardia',
    population: '35.000',
    neighborhoods: ['Centro', 'San Damiano', 'Moia', 'Baraggia', 'San Cristoforo'],
    nearbyAreas: ['Monza', 'Cologno Monzese', 'Sesto San Giovanni', 'Agrate Brianza', 'Carugate']
  },
  {
    slug: 'nova-milanese',
    name: 'Nova Milanese',
    province: 'MB',
    region: 'Lombardia',
    population: '24.000',
    neighborhoods: ['Centro', 'Grugnotorto', 'Via Brodolini'],
    nearbyAreas: ['Desio', 'Muggiò', 'Paderno Dugnano', 'Bovisio-Masciago', 'Varedo']
  },
  {
    slug: 'rho',
    name: 'Rho',
    province: 'MI',
    region: 'Lombardia',
    population: '51.000',
    neighborhoods: ['Centro', 'Passirana', 'Lucernate', 'Terrazzano', 'Mazzo'],
    nearbyAreas: ['Pero', 'Arese', 'Pregnana Milanese', 'Lainate', 'Pogliano Milanese']
  },
  {
    slug: 'peschiera-borromeo',
    name: 'Peschiera Borromeo',
    province: 'MI',
    region: 'Lombardia',
    population: '24.000',
    neighborhoods: ['Centro', 'Mezzate', 'San Bovio', 'Mirazzano', 'Bellaria'],
    nearbyAreas: ['Milano', 'Pantigliate', 'Mediglia', 'San Donato Milanese', 'Segrate']
  },
  {
    slug: 'pieve-emanuele',
    name: 'Pieve Emanuele',
    province: 'MI',
    region: 'Lombardia',
    population: '16.000',
    neighborhoods: ['Centro', 'Fizzonasco', 'Tolcinasco'],
    nearbyAreas: ['Rozzano', 'Opera', 'Locate di Triulzi', 'Basiglio', 'Lacchiarella']
  },
  {
    slug: 'bollate',
    name: 'Bollate',
    province: 'MI',
    region: 'Lombardia',
    population: '37.000',
    neighborhoods: ['Centro', 'Ospiate', 'Cassina Nuova', 'Castellazzo'],
    nearbyAreas: ['Novate Milanese', 'Baranzate', 'Arese', 'Senago', 'Garbagnate Milanese']
  },
  {
    slug: 'vimercate',
    name: 'Vimercate',
    province: 'MB',
    region: 'Lombardia',
    population: '26.000',
    neighborhoods: ['Centro', 'Oreno', 'Ruginello', 'Velasca'],
    nearbyAreas: ['Concorezzo', 'Agrate Brianza', 'Burago di Molgora', 'Arcore', 'Sulbiate']
  },
  {
    slug: 'mariano-comense',
    name: 'Mariano Comense',
    province: 'CO',
    region: 'Lombardia',
    population: '25.000',
    neighborhoods: ['Centro', 'Perticato', 'Cascina Ravella'],
    nearbyAreas: ['Cantù', 'Cabiate', 'Giussano', 'Carugo', 'Lentate sul Seveso']
  },
  {
    slug: 'cesano-maderno',
    name: 'Cesano Maderno',
    province: 'MB',
    region: 'Lombardia',
    population: '38.000',
    neighborhoods: ['Centro', 'Binzago', 'Cassina Savina', 'Villaggio Snia'],
    nearbyAreas: ['Seveso', 'Bovisio-Masciago', 'Desio', 'Limbiate', 'Varedo']
  },
  {
    slug: 'biassono',
    name: 'Biassono',
    province: 'MB',
    region: 'Lombardia',
    population: '12.000',
    neighborhoods: ['Centro', 'San Giorgio'],
    nearbyAreas: ['Monza', 'Vedano al Lambro', 'Lissone', 'Macherio', 'Lesmo']
  },
  {
    slug: 'trezzo-sull-adda',
    name: 'Trezzo sull\'Adda',
    province: 'MI',
    region: 'Lombardia',
    population: '12.000',
    neighborhoods: ['Centro', 'Concesa'],
    nearbyAreas: ['Vaprio d\'Adda', 'Capriate San Gervasio', 'Grezzago', 'Pozzo d\'Adda', 'Trezzano Rosa']
  },
  {
    slug: 'triuggio',
    name: 'Triuggio',
    province: 'MB',
    region: 'Lombardia',
    population: '9.000',
    neighborhoods: ['Centro', 'Rancate', 'Canonica', 'Tregasio'],
    nearbyAreas: ['Albiate', 'Veduggio con Colzano', 'Sovico', 'Carate Brianza', 'Besana in Brianza']
  },
  {
    slug: 'trezzano-rosa',
    name: 'Trezzano Rosa',
    province: 'MI',
    region: 'Lombardia',
    population: '5.000',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Trezzo sull\'Adda', 'Basiano', 'Grezzago', 'Masate', 'Pozzo d\'Adda']
  },
  {
    slug: 'roncello',
    name: 'Roncello',
    province: 'MB',
    region: 'Lombardia',
    population: '4.000',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Sulbiate', 'Busnago', 'Ornago', 'Bellusco', 'Mezzago']
  },
  {
    slug: 'settala',
    name: 'Settala',
    province: 'MI',
    region: 'Lombardia',
    population: '8.000',
    neighborhoods: ['Centro', 'Caleppio'],
    nearbyAreas: ['Pantigliate', 'Rodano', 'Vignate', 'Peschiera Borromeo', 'Liscate']
  },
  {
    slug: 'inzago',
    name: 'Inzago',
    province: 'MI',
    region: 'Lombardia',
    population: '11.000',
    neighborhoods: ['Centro', 'Naviglio'],
    nearbyAreas: ['Cassano d\'Adda', 'Gessate', 'Bellinzago Lombardo', 'Pozzuolo Martesana', 'Liscate']
  },
  {
    slug: 'erba',
    name: 'Erba',
    province: 'CO',
    region: 'Lombardia',
    population: '17.000',
    neighborhoods: ['Centro', 'Buccinigo', 'Crevenna', 'Villincino'],
    nearbyAreas: ['Eupilio', 'Albavilla', 'Pusiano', 'Merone', 'Ponte Lambro']
  },
  {
    slug: 'carugate',
    name: 'Carugate',
    province: 'MI',
    region: 'Lombardia',
    population: '15.000',
    neighborhoods: ['Centro', 'Cascina Trombetta'],
    nearbyAreas: ['Cologno Monzese', 'Agrate Brianza', 'Cernusco sul Naviglio', 'Brugherio', 'Bussero']
  },
  {
    slug: 'albiate',
    name: 'Albiate',
    province: 'MB',
    region: 'Lombardia',
    population: '6.000',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Carate Brianza', 'Triuggio', 'Seregno', 'Sovico', 'Verano Brianza']
  },
  {
    slug: 'agrate-brianza',
    name: 'Agrate Brianza',
    province: 'MB',
    region: 'Lombardia',
    population: '16.000',
    neighborhoods: ['Centro', 'Omate'],
    nearbyAreas: ['Concorezzo', 'Vimercate', 'Carugate', 'Burago di Molgora', 'Brugherio']
  },
  {
    slug: 'abbiategrasso',
    name: 'Abbiategrasso',
    province: 'MI',
    region: 'Lombardia',
    population: '33.000',
    neighborhoods: ['Centro', 'Castelletto', 'San Pietro Cusico'],
    nearbyAreas: ['Magenta', 'Vigevano', 'Gaggiano', 'Ozzero', 'Morimondo']
  },
  {
    slug: 'cassina-de-pecchi',
    name: 'Cassina de\' Pecchi',
    province: 'MI',
    region: 'Lombardia',
    population: '14.000',
    neighborhoods: ['Centro', 'Sant\'Agata'],
    nearbyAreas: ['Cernusco sul Naviglio', 'Vignate', 'Bussero', 'Pioltello', 'Melzo']
  },
  {
    slug: 'cambiago',
    name: 'Cambiago',
    province: 'MI',
    region: 'Lombardia',
    population: '7.000',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Gessate', 'Cavenago di Brianza', 'Ornago', 'Bellusco', 'Bussero']
  },
  {
    slug: 'opera',
    name: 'Opera',
    province: 'MI',
    region: 'Lombardia',
    population: '14.000',
    neighborhoods: ['Centro', 'Noverasco'],
    nearbyAreas: ['Milano', 'Rozzano', 'Pieve Emanuele', 'Locate di Triulzi', 'San Donato Milanese']
  },
  // === CITTÀ MANCANTI DA GSC - LOMBARDIA ===
  {
    slug: 'sulbiate',
    name: 'Sulbiate',
    province: 'MB',
    region: 'Lombardia',
    population: '4.500',
    neighborhoods: ['Centro', 'Sulbiate Superiore', 'Sulbiate Inferiore'],
    nearbyAreas: ['Bernareggio', 'Mezzago', 'Aicurzio', 'Bellusco', 'Ornago']
  },
  {
    slug: 'burago-di-molgora',
    name: 'Burago di Molgora',
    province: 'MB',
    region: 'Lombardia',
    population: '4.500',
    neighborhoods: ['Centro', 'Cascina Salette'],
    nearbyAreas: ['Agrate Brianza', 'Vimercate', 'Caponago', 'Carnate', 'Ornago']
  },
  {
    slug: 'basiano',
    name: 'Basiano',
    province: 'MI',
    region: 'Lombardia',
    population: '4.000',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Masate', 'Trezzano Rosa', 'Pozzo d\'Adda', 'Grezzago', 'Inzago']
  },
  {
    slug: 'arcore',
    name: 'Arcore',
    province: 'MB',
    region: 'Lombardia',
    population: '18.000',
    neighborhoods: ['Centro', 'Cascina del Bruno', 'Bernate'],
    nearbyAreas: ['Vimercate', 'Villasanta', 'Usmate Velate', 'Lesmo', 'Concorezzo']
  },
  {
    slug: 'bernareggio',
    name: 'Bernareggio',
    province: 'MB',
    region: 'Lombardia',
    population: '11.000',
    neighborhoods: ['Centro', 'Villanova'],
    nearbyAreas: ['Carnate', 'Sulbiate', 'Ronco Briantino', 'Aicurzio', 'Vimercate']
  },
  {
    slug: 'carnate',
    name: 'Carnate',
    province: 'MB',
    region: 'Lombardia',
    population: '7.500',
    neighborhoods: ['Centro', 'Passirano'],
    nearbyAreas: ['Bernareggio', 'Usmate Velate', 'Vimercate', 'Burago di Molgora', 'Ronco Briantino']
  },
  {
    slug: 'bellusco',
    name: 'Bellusco',
    province: 'MB',
    region: 'Lombardia',
    population: '7.500',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Mezzago', 'Ornago', 'Cavenago di Brianza', 'Sulbiate', 'Vimercate']
  },
  {
    slug: 'ornago',
    name: 'Ornago',
    province: 'MB',
    region: 'Lombardia',
    population: '5.000',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Bellusco', 'Cavenago di Brianza', 'Burago di Molgora', 'Vimercate', 'Cambiago']
  },
  {
    slug: 'mezzago',
    name: 'Mezzago',
    province: 'MB',
    region: 'Lombardia',
    population: '4.500',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Bellusco', 'Sulbiate', 'Cornate d\'Adda', 'Cavenago di Brianza', 'Busnago']
  },
  {
    slug: 'busnago',
    name: 'Busnago',
    province: 'MB',
    region: 'Lombardia',
    population: '6.000',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Roncello', 'Cornate d\'Adda', 'Mezzago', 'Grezzago', 'Trezzo sull\'Adda']
  },
  {
    slug: 'cornate-d-adda',
    name: 'Cornate d\'Adda',
    province: 'MB',
    region: 'Lombardia',
    population: '10.500',
    neighborhoods: ['Centro', 'Porto d\'Adda', 'Colnago'],
    nearbyAreas: ['Trezzo sull\'Adda', 'Busnago', 'Mezzago', 'Bottanuco', 'Vaprio d\'Adda']
  },
  {
    slug: 'usmate-velate',
    name: 'Usmate Velate',
    province: 'MB',
    region: 'Lombardia',
    population: '10.000',
    neighborhoods: ['Centro', 'Velate'],
    nearbyAreas: ['Arcore', 'Carnate', 'Vimercate', 'Lesmo', 'Camparada']
  },
  {
    slug: 'lesmo',
    name: 'Lesmo',
    province: 'MB',
    region: 'Lombardia',
    population: '8.500',
    neighborhoods: ['Centro', 'Peregallo'],
    nearbyAreas: ['Arcore', 'Correzzana', 'Camparada', 'Usmate Velate', 'Villasanta']
  },
  {
    slug: 'villasanta',
    name: 'Villasanta',
    province: 'MB',
    region: 'Lombardia',
    population: '14.000',
    neighborhoods: ['Centro', 'San Fiorano'],
    nearbyAreas: ['Monza', 'Arcore', 'Lesmo', 'Concorezzo', 'Vimercate']
  },
  {
    slug: 'concorezzo',
    name: 'Concorezzo',
    province: 'MB',
    region: 'Lombardia',
    population: '16.000',
    neighborhoods: ['Centro', 'San Albino'],
    nearbyAreas: ['Vimercate', 'Agrate Brianza', 'Monza', 'Villasanta', 'Brugherio']
  },
  {
    slug: 'cavenago-di-brianza',
    name: 'Cavenago di Brianza',
    province: 'MB',
    region: 'Lombardia',
    population: '7.500',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Ornago', 'Cambiago', 'Bellusco', 'Agrate Brianza', 'Burago di Molgora']
  },
  {
    slug: 'caponago',
    name: 'Caponago',
    province: 'MB',
    region: 'Lombardia',
    population: '5.500',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Agrate Brianza', 'Burago di Molgora', 'Pessano con Bornago', 'Cambiago', 'Carugate']
  },
  {
    slug: 'pessano-con-bornago',
    name: 'Pessano con Bornago',
    province: 'MI',
    region: 'Lombardia',
    population: '9.500',
    neighborhoods: ['Centro', 'Bornago'],
    nearbyAreas: ['Caponago', 'Bussero', 'Gorgonzola', 'Cambiago', 'Cassina de\' Pecchi']
  },
  {
    slug: 'bussero',
    name: 'Bussero',
    province: 'MI',
    region: 'Lombardia',
    population: '8.500',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Cassina de\' Pecchi', 'Gorgonzola', 'Pessano con Bornago', 'Cernusco sul Naviglio', 'Carugate']
  },
  {
    slug: 'gorgonzola',
    name: 'Gorgonzola',
    province: 'MI',
    region: 'Lombardia',
    population: '21.000',
    neighborhoods: ['Centro', 'Villa Pompea'],
    nearbyAreas: ['Melzo', 'Bussero', 'Pessano con Bornago', 'Cassano d\'Adda', 'Cernusco sul Naviglio']
  },
  {
    slug: 'melzo',
    name: 'Melzo',
    province: 'MI',
    region: 'Lombardia',
    population: '18.500',
    neighborhoods: ['Centro', 'Cascine San Pietro'],
    nearbyAreas: ['Gorgonzola', 'Vignate', 'Pozzuolo Martesana', 'Liscate', 'Inzago']
  },
  {
    slug: 'vignate',
    name: 'Vignate',
    province: 'MI',
    region: 'Lombardia',
    population: '9.500',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Melzo', 'Cassina de\' Pecchi', 'Rodano', 'Liscate', 'Settala']
  },
  {
    slug: 'liscate',
    name: 'Liscate',
    province: 'MI',
    region: 'Lombardia',
    population: '4.500',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Pozzuolo Martesana', 'Melzo', 'Vignate', 'Settala', 'Pantigliate']
  },
  {
    slug: 'pozzuolo-martesana',
    name: 'Pozzuolo Martesana',
    province: 'MI',
    region: 'Lombardia',
    population: '8.500',
    neighborhoods: ['Centro', 'Trecella', 'Pobbiano'],
    nearbyAreas: ['Melzo', 'Inzago', 'Liscate', 'Gessate', 'Bellinzago Lombardo']
  },
  {
    slug: 'gessate',
    name: 'Gessate',
    province: 'MI',
    region: 'Lombardia',
    population: '9.000',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Inzago', 'Cambiago', 'Pozzuolo Martesana', 'Bellinzago Lombardo', 'Pessano con Bornago']
  },
  {
    slug: 'cassano-d-adda',
    name: 'Cassano d\'Adda',
    province: 'MI',
    region: 'Lombardia',
    population: '19.000',
    neighborhoods: ['Centro', 'Groppello'],
    nearbyAreas: ['Inzago', 'Treviglio', 'Vaprio d\'Adda', 'Melzo', 'Rivolta d\'Adda']
  },
  {
    slug: 'vaprio-d-adda',
    name: 'Vaprio d\'Adda',
    province: 'MI',
    region: 'Lombardia',
    population: '9.000',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Trezzo sull\'Adda', 'Cassano d\'Adda', 'Canonica d\'Adda', 'Pozzo d\'Adda', 'Cornate d\'Adda']
  },
  {
    slug: 'pozzo-d-adda',
    name: 'Pozzo d\'Adda',
    province: 'MI',
    region: 'Lombardia',
    population: '6.000',
    neighborhoods: ['Centro', 'Bettola'],
    nearbyAreas: ['Trezzano Rosa', 'Vaprio d\'Adda', 'Basiano', 'Trezzo sull\'Adda', 'Grezzago']
  },
  {
    slug: 'grezzago',
    name: 'Grezzago',
    province: 'MI',
    region: 'Lombardia',
    population: '3.000',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Trezzano Rosa', 'Pozzo d\'Adda', 'Busnago', 'Trezzo sull\'Adda', 'Basiano']
  },
  {
    slug: 'masate',
    name: 'Masate',
    province: 'MI',
    region: 'Lombardia',
    population: '3.500',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Basiano', 'Gessate', 'Inzago', 'Cambiago', 'Trezzano Rosa']
  },
  {
    slug: 'cernusco-sul-naviglio',
    name: 'Cernusco sul Naviglio',
    province: 'MI',
    region: 'Lombardia',
    population: '35.000',
    neighborhoods: ['Centro', 'Ronco'],
    nearbyAreas: ['Cassina de\' Pecchi', 'Pioltello', 'Vimodrone', 'Bussero', 'Carugate']
  },
  {
    slug: 'pioltello',
    name: 'Pioltello',
    province: 'MI',
    region: 'Lombardia',
    population: '37.000',
    neighborhoods: ['Centro', 'Limito', 'Seggiano'],
    nearbyAreas: ['Cernusco sul Naviglio', 'Rodano', 'Segrate', 'Cassina de\' Pecchi', 'Pantigliate']
  },
  {
    slug: 'segrate',
    name: 'Segrate',
    province: 'MI',
    region: 'Lombardia',
    population: '36.000',
    neighborhoods: ['Centro', 'San Felice', 'Milano 2', 'Redecesio', 'Novegro'],
    nearbyAreas: ['Milano', 'Pioltello', 'Vimodrone', 'Peschiera Borromeo', 'Cernusco sul Naviglio']
  },
  {
    slug: 'vimodrone',
    name: 'Vimodrone',
    province: 'MI',
    region: 'Lombardia',
    population: '17.500',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Cologno Monzese', 'Cernusco sul Naviglio', 'Segrate', 'Pioltello', 'Milano']
  },
  {
    slug: 'cologno-monzese',
    name: 'Cologno Monzese',
    province: 'MI',
    region: 'Lombardia',
    population: '48.000',
    neighborhoods: ['Centro', 'San Maurizio al Lambro', 'Cologno Nord'],
    nearbyAreas: ['Milano', 'Brugherio', 'Sesto San Giovanni', 'Vimodrone', 'Carugate']
  },
  {
    slug: 'sesto-san-giovanni',
    name: 'Sesto San Giovanni',
    province: 'MI',
    region: 'Lombardia',
    population: '82.000',
    neighborhoods: ['Centro', 'Cascina Gatti', 'Rondò', 'Pelucca'],
    nearbyAreas: ['Milano', 'Cologno Monzese', 'Cinisello Balsamo', 'Bresso', 'Brugherio']
  },
  {
    slug: 'cinisello-balsamo',
    name: 'Cinisello Balsamo',
    province: 'MI',
    region: 'Lombardia',
    population: '76.000',
    neighborhoods: ['Centro', 'Sant\'Eusebio', 'Balsamo', 'Crocetta'],
    nearbyAreas: ['Sesto San Giovanni', 'Cusano Milanino', 'Bresso', 'Muggiò', 'Monza']
  },
  {
    slug: 'cusano-milanino',
    name: 'Cusano Milanino',
    province: 'MI',
    region: 'Lombardia',
    population: '19.500',
    neighborhoods: ['Centro', 'Milanino'],
    nearbyAreas: ['Cinisello Balsamo', 'Paderno Dugnano', 'Bresso', 'Cormano', 'Nova Milanese']
  },
  {
    slug: 'bresso',
    name: 'Bresso',
    province: 'MI',
    region: 'Lombardia',
    population: '26.500',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Sesto San Giovanni', 'Cinisello Balsamo', 'Cormano', 'Cusano Milanino', 'Milano']
  },
  {
    slug: 'cormano',
    name: 'Cormano',
    province: 'MI',
    region: 'Lombardia',
    population: '20.500',
    neighborhoods: ['Centro', 'Ospitaletto'],
    nearbyAreas: ['Bresso', 'Cusano Milanino', 'Paderno Dugnano', 'Novate Milanese', 'Bollate']
  },
  {
    slug: 'paderno-dugnano',
    name: 'Paderno Dugnano',
    province: 'MI',
    region: 'Lombardia',
    population: '47.000',
    neighborhoods: ['Centro', 'Palazzolo Milanese', 'Incirano', 'Villaggio Ambrosiano'],
    nearbyAreas: ['Cusano Milanino', 'Cormano', 'Nova Milanese', 'Senago', 'Varedo']
  },
  {
    slug: 'senago',
    name: 'Senago',
    province: 'MI',
    region: 'Lombardia',
    population: '21.500',
    neighborhoods: ['Centro', 'Senaghino'],
    nearbyAreas: ['Paderno Dugnano', 'Bollate', 'Garbagnate Milanese', 'Cesate', 'Cormano']
  },
  {
    slug: 'garbagnate-milanese',
    name: 'Garbagnate Milanese',
    province: 'MI',
    region: 'Lombardia',
    population: '27.500',
    neighborhoods: ['Centro', 'Santa Maria Rossa'],
    nearbyAreas: ['Bollate', 'Senago', 'Arese', 'Cesate', 'Lainate']
  },
  {
    slug: 'arese',
    name: 'Arese',
    province: 'MI',
    region: 'Lombardia',
    population: '19.500',
    neighborhoods: ['Centro', 'Valera'],
    nearbyAreas: ['Rho', 'Garbagnate Milanese', 'Lainate', 'Bollate', 'Baranzate']
  },
  {
    slug: 'lainate',
    name: 'Lainate',
    province: 'MI',
    region: 'Lombardia',
    population: '26.000',
    neighborhoods: ['Centro', 'Pagliera', 'Barbaiana', 'Grancia'],
    nearbyAreas: ['Arese', 'Rho', 'Nerviano', 'Garbagnate Milanese', 'Pogliano Milanese']
  },
  {
    slug: 'nerviano',
    name: 'Nerviano',
    province: 'MI',
    region: 'Lombardia',
    population: '17.500',
    neighborhoods: ['Centro', 'Sant\'Ilario'],
    nearbyAreas: ['Lainate', 'Parabiago', 'Pogliano Milanese', 'Vanzago', 'Rho']
  },
  {
    slug: 'parabiago',
    name: 'Parabiago',
    province: 'MI',
    region: 'Lombardia',
    population: '28.000',
    neighborhoods: ['Centro', 'Villastanza', 'Ravello'],
    nearbyAreas: ['Legnano', 'Nerviano', 'Canegrate', 'San Vittore Olona', 'Villa Cortese']
  },
  {
    slug: 'canegrate',
    name: 'Canegrate',
    province: 'MI',
    region: 'Lombardia',
    population: '13.000',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Parabiago', 'Legnano', 'San Giorgio su Legnano', 'Villa Cortese', 'Cerro Maggiore']
  },
  {
    slug: 'san-giorgio-su-legnano',
    name: 'San Giorgio su Legnano',
    province: 'MI',
    region: 'Lombardia',
    population: '7.000',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Legnano', 'Canegrate', 'Villa Cortese', 'Dairago', 'Cerro Maggiore']
  },
  {
    slug: 'cerro-maggiore',
    name: 'Cerro Maggiore',
    province: 'MI',
    region: 'Lombardia',
    population: '15.500',
    neighborhoods: ['Centro', 'Cantalupo'],
    nearbyAreas: ['Legnano', 'Rescaldina', 'San Vittore Olona', 'Canegrate', 'Uboldo']
  },
  {
    slug: 'rescaldina',
    name: 'Rescaldina',
    province: 'MI',
    region: 'Lombardia',
    population: '14.500',
    neighborhoods: ['Centro', 'Rescalda'],
    nearbyAreas: ['Cerro Maggiore', 'Castellanza', 'Uboldo', 'Cislago', 'Legnano']
  },
  {
    slug: 'castellanza',
    name: 'Castellanza',
    province: 'VA',
    region: 'Lombardia',
    population: '14.500',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Busto Arsizio', 'Legnano', 'Olgiate Olona', 'Gorla Minore', 'Marnate']
  },
  {
    slug: 'olgiate-olona',
    name: 'Olgiate Olona',
    province: 'VA',
    region: 'Lombardia',
    population: '12.500',
    neighborhoods: ['Centro', 'Gerbone'],
    nearbyAreas: ['Busto Arsizio', 'Castellanza', 'Gorla Minore', 'Marnate', 'Fagnano Olona']
  },
  {
    slug: 'solaro',
    name: 'Solaro',
    province: 'MI',
    region: 'Lombardia',
    population: '14.500',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Saronno', 'Ceriano Laghetto', 'Cesate', 'Limbiate', 'Garbagnate Milanese']
  },
  {
    slug: 'limbiate',
    name: 'Limbiate',
    province: 'MB',
    region: 'Lombardia',
    population: '36.000',
    neighborhoods: ['Centro', 'Mombello', 'Pinzano', 'Villaggio Giovi'],
    nearbyAreas: ['Cesano Maderno', 'Bovisio-Masciago', 'Varedo', 'Senago', 'Solaro']
  },
  {
    slug: 'varedo',
    name: 'Varedo',
    province: 'MB',
    region: 'Lombardia',
    population: '13.000',
    neighborhoods: ['Centro', 'Valera'],
    nearbyAreas: ['Cesano Maderno', 'Bovisio-Masciago', 'Paderno Dugnano', 'Limbiate', 'Nova Milanese']
  },
  {
    slug: 'bovisio-masciago',
    name: 'Bovisio-Masciago',
    province: 'MB',
    region: 'Lombardia',
    population: '17.000',
    neighborhoods: ['Centro', 'Masciago'],
    nearbyAreas: ['Cesano Maderno', 'Varedo', 'Nova Milanese', 'Desio', 'Limbiate']
  },
  {
    slug: 'muggio',
    name: 'Muggiò',
    province: 'MB',
    region: 'Lombardia',
    population: '24.000',
    neighborhoods: ['Centro', 'San Carlo'],
    nearbyAreas: ['Monza', 'Nova Milanese', 'Desio', 'Cinisello Balsamo', 'Lissone']
  },
  {
    slug: 'giussano',
    name: 'Giussano',
    province: 'MB',
    region: 'Lombardia',
    population: '25.500',
    neighborhoods: ['Centro', 'Paina', 'Birone', 'Robbiano'],
    nearbyAreas: ['Seregno', 'Carate Brianza', 'Verano Brianza', 'Mariano Comense', 'Briosco']
  },
  {
    slug: 'carate-brianza',
    name: 'Carate Brianza',
    province: 'MB',
    region: 'Lombardia',
    population: '18.500',
    neighborhoods: ['Centro', 'Agliate', 'Costa Lambro', 'Realdino'],
    nearbyAreas: ['Giussano', 'Verano Brianza', 'Albiate', 'Besana in Brianza', 'Seregno']
  },
  {
    slug: 'verano-brianza',
    name: 'Verano Brianza',
    province: 'MB',
    region: 'Lombardia',
    population: '9.500',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Giussano', 'Carate Brianza', 'Seregno', 'Desio', 'Lissone']
  },
  {
    slug: 'besana-in-brianza',
    name: 'Besana in Brianza',
    province: 'MB',
    region: 'Lombardia',
    population: '16.000',
    neighborhoods: ['Centro', 'Villa Raverio', 'Vergo Zoccorino', 'Calò'],
    nearbyAreas: ['Carate Brianza', 'Triuggio', 'Renate', 'Veduggio con Colzano', 'Briosco']
  },
  {
    slug: 'meda',
    name: 'Meda',
    province: 'MB',
    region: 'Lombardia',
    population: '24.000',
    neighborhoods: ['Centro', 'Polo'],
    nearbyAreas: ['Seregno', 'Seveso', 'Cabiate', 'Lentate sul Seveso', 'Barlassina']
  },
  {
    slug: 'seveso',
    name: 'Seveso',
    province: 'MB',
    region: 'Lombardia',
    population: '23.500',
    neighborhoods: ['Centro', 'Baruccana', 'Altopiano', 'San Pietro Martire'],
    nearbyAreas: ['Cesano Maderno', 'Meda', 'Barlassina', 'Lentate sul Seveso', 'Seregno']
  },
  {
    slug: 'lentate-sul-seveso',
    name: 'Lentate sul Seveso',
    province: 'MB',
    region: 'Lombardia',
    population: '16.000',
    neighborhoods: ['Centro', 'Birago', 'Cimnago', 'Copreno'],
    nearbyAreas: ['Meda', 'Seveso', 'Barlassina', 'Mariano Comense', 'Cabiate']
  },
  {
    slug: 'barlassina',
    name: 'Barlassina',
    province: 'MB',
    region: 'Lombardia',
    population: '7.000',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Seveso', 'Meda', 'Lentate sul Seveso', 'Seregno', 'Cesano Maderno']
  },
  {
    slug: 'cabiate',
    name: 'Cabiate',
    province: 'CO',
    region: 'Lombardia',
    population: '7.500',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Mariano Comense', 'Meda', 'Seregno', 'Carugo', 'Lentate sul Seveso']
  },
  {
    slug: 'carugo',
    name: 'Carugo',
    province: 'CO',
    region: 'Lombardia',
    population: '6.500',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Mariano Comense', 'Giussano', 'Arosio', 'Inverigo', 'Cabiate']
  },
  {
    slug: 'inverigo',
    name: 'Inverigo',
    province: 'CO',
    region: 'Lombardia',
    population: '9.000',
    neighborhoods: ['Centro', 'Cremnago', 'Romanò', 'Villa Romano'],
    nearbyAreas: ['Lurago d\'Erba', 'Carugo', 'Lambrugo', 'Nibionno', 'Anzano del Parco']
  },
  {
    slug: 'canzo',
    name: 'Canzo',
    province: 'CO',
    region: 'Lombardia',
    population: '5.000',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Asso', 'Castelmarte', 'Eupilio', 'Valbrona', 'Erba']
  },
  {
    slug: 'asso',
    name: 'Asso',
    province: 'CO',
    region: 'Lombardia',
    population: '3.500',
    neighborhoods: ['Centro', 'Scarenna'],
    nearbyAreas: ['Canzo', 'Eupilio', 'Sormano', 'Valbrona', 'Lasnigo']
  },
  {
    slug: 'oggiono',
    name: 'Oggiono',
    province: 'LC',
    region: 'Lombardia',
    population: '9.000',
    neighborhoods: ['Centro', 'Imberido'],
    nearbyAreas: ['Annone di Brianza', 'Molteno', 'Sirone', 'Dolzago', 'Ello']
  },
  {
    slug: 'calolziocorte',
    name: 'Calolziocorte',
    province: 'LC',
    region: 'Lombardia',
    population: '14.000',
    neighborhoods: ['Centro', 'Rossino', 'Foppenico', 'Sala'],
    nearbyAreas: ['Lecco', 'Vercurago', 'Erve', 'Monte Marenzo', 'Carenno']
  },
  {
    slug: 'valmadrera',
    name: 'Valmadrera',
    province: 'LC',
    region: 'Lombardia',
    population: '12.000',
    neighborhoods: ['Centro', 'Bellagio', 'Paré'],
    nearbyAreas: ['Lecco', 'Malgrate', 'Civate', 'Galbiate', 'Mandello del Lario']
  },
  {
    slug: 'malgrate',
    name: 'Malgrate',
    province: 'LC',
    region: 'Lombardia',
    population: '4.500',
    neighborhoods: ['Centro'],
    nearbyAreas: ['Lecco', 'Valmadrera', 'Pescate', 'Garlate', 'Olginate']
  },
  {
    slug: 'mandello-del-lario',
    name: 'Mandello del Lario',
    province: 'LC',
    region: 'Lombardia',
    population: '10.500',
    neighborhoods: ['Centro', 'Molina', 'Somana', 'Tonzanico'],
    nearbyAreas: ['Lecco', 'Abbadia Lariana', 'Lierna', 'Varenna', 'Bellano']
  },
  {
    slug: 'casatenovo',
    name: 'Casatenovo',
    province: 'LC',
    region: 'Lombardia',
    population: '13.000',
    neighborhoods: ['Centro', 'Cascina Bracchi', 'Campofiorenzo', 'Galgiana'],
    nearbyAreas: ['Besana in Brianza', 'Monticello Brianza', 'Missaglia', 'Correzzana', 'Lomagna']
  },
  {
    slug: 'merate',
    name: 'Merate',
    province: 'LC',
    region: 'Lombardia',
    population: '15.500',
    neighborhoods: ['Centro', 'Sartirana', 'Pagnano', 'Brugarolo'],
    nearbyAreas: ['Olgiate Molgora', 'Cernusco Lombardone', 'Robbiate', 'Osnago', 'Montevecchia']
  },
  {
    slug: 'missaglia',
    name: 'Missaglia',
    province: 'LC',
    region: 'Lombardia',
    population: '9.000',
    neighborhoods: ['Centro', 'Maresso', 'Lomaniga'],
    nearbyAreas: ['Casatenovo', 'Monticello Brianza', 'Castello di Brianza', 'Cremella', 'Barzanò']
  },
  {
    slug: 'olgiate-molgora',
    name: 'Olgiate Molgora',
    province: 'LC',
    region: 'Lombardia',
    population: '6.500',
    neighborhoods: ['Centro', 'Regondello'],
    nearbyAreas: ['Merate', 'Calco', 'Brivio', 'Imbersago', 'Cernusco Lombardone']
  },
  // === CITTÀ MANCANTI DA GSC - ALTRE REGIONI ===
  {
    slug: 'afragola',
    name: 'Afragola',
    province: 'NA',
    region: 'Campania',
    population: '65.000',
    neighborhoods: ['Centro', 'Salicelle', 'Zona Industriale'],
    nearbyAreas: ['Napoli', 'Casoria', 'Acerra', 'Cardito', 'Caivano']
  },
  {
    slug: 'casoria',
    name: 'Casoria',
    province: 'NA',
    region: 'Campania',
    population: '78.000',
    neighborhoods: ['Centro', 'Arpino', 'Cittadella'],
    nearbyAreas: ['Napoli', 'Afragola', 'Arzano', 'Casavatore', 'Cardito']
  },
  {
    slug: 'giugliano-in-campania',
    name: 'Giugliano in Campania',
    province: 'NA',
    region: 'Campania',
    population: '125.000',
    neighborhoods: ['Centro', 'Lago Patria', 'Varcaturo', 'Licola'],
    nearbyAreas: ['Napoli', 'Marano', 'Qualiano', 'Villaricca', 'Aversa']
  },
  {
    slug: 'marano-di-napoli',
    name: 'Marano di Napoli',
    province: 'NA',
    region: 'Campania',
    population: '60.000',
    neighborhoods: ['Centro', 'San Rocco', 'Quarto'],
    nearbyAreas: ['Napoli', 'Giugliano', 'Qualiano', 'Mugnano', 'Villaricca']
  },
  {
    slug: 'portici',
    name: 'Portici',
    province: 'NA',
    region: 'Campania',
    population: '55.000',
    neighborhoods: ['Centro', 'Granatello', 'Bellavista', 'Via Libertà'],
    nearbyAreas: ['Napoli', 'Ercolano', 'San Giorgio a Cremano', 'Torre del Greco', 'San Sebastiano al Vesuvio']
  },
  {
    slug: 'ercolano',
    name: 'Ercolano',
    province: 'NA',
    region: 'Campania',
    population: '53.000',
    neighborhoods: ['Centro', 'Pugliano', 'Miglio d\'Oro', 'Scavi'],
    nearbyAreas: ['Portici', 'Torre del Greco', 'San Giorgio a Cremano', 'Napoli', 'San Sebastiano al Vesuvio']
  },
  {
    slug: 'san-giorgio-a-cremano',
    name: 'San Giorgio a Cremano',
    province: 'NA',
    region: 'Campania',
    population: '46.000',
    neighborhoods: ['Centro', 'Arenaccia', 'San Leonardo'],
    nearbyAreas: ['Napoli', 'Portici', 'Ercolano', 'Cercola', 'San Sebastiano al Vesuvio']
  },
  {
    slug: 'pozzuoli',
    name: 'Pozzuoli',
    province: 'NA',
    region: 'Campania',
    population: '80.000',
    neighborhoods: ['Centro', 'Arco Felice', 'Lucrino', 'Monteruscello', 'Toiano'],
    nearbyAreas: ['Napoli', 'Bacoli', 'Quarto', 'Monte di Procida', 'Baia']
  },
  {
    slug: 'torre-annunziata',
    name: 'Torre Annunziata',
    province: 'NA',
    region: 'Campania',
    population: '42.000',
    neighborhoods: ['Centro', 'Leopardi', 'Rovigliano', 'Cappella Bianchini'],
    nearbyAreas: ['Torre del Greco', 'Boscoreale', 'Boscotrecase', 'Pompei', 'Castellammare di Stabia']
  },
  {
    slug: 'castellammare-di-stabia',
    name: 'Castellammare di Stabia',
    province: 'NA',
    region: 'Campania',
    population: '66.000',
    neighborhoods: ['Centro', 'Quisisana', 'Scanzano', 'Santa Maria delle Grazie'],
    nearbyAreas: ['Pompei', 'Torre Annunziata', 'Gragnano', 'Vico Equense', 'Sorrento']
  },
  {
    slug: 'acerra',
    name: 'Acerra',
    province: 'NA',
    region: 'Campania',
    population: '60.000',
    neighborhoods: ['Centro', 'Madonnella', 'Parco Primavera'],
    nearbyAreas: ['Afragola', 'Pomigliano d\'Arco', 'Casalnuovo', 'Caivano', 'Marigliano']
  },
  {
    slug: 'pomigliano-d-arco',
    name: 'Pomigliano d\'Arco',
    province: 'NA',
    region: 'Campania',
    population: '40.000',
    neighborhoods: ['Centro', 'Pratola', 'Madonna delle Grazie'],
    nearbyAreas: ['Acerra', 'Casalnuovo', 'Sant\'Anastasia', 'Marigliano', 'Brusciano']
  },
  {
    slug: 'nocera-inferiore',
    name: 'Nocera Inferiore',
    province: 'SA',
    region: 'Campania',
    population: '45.000',
    neighborhoods: ['Centro', 'Piedimonte', 'Montevescovado', 'Pareti'],
    nearbyAreas: ['Nocera Superiore', 'Sarno', 'Pagani', 'Angri', 'Cava de\' Tirreni']
  },
  {
    slug: 'pagani',
    name: 'Pagani',
    province: 'SA',
    region: 'Campania',
    population: '36.000',
    neighborhoods: ['Centro', 'Barbazzano'],
    nearbyAreas: ['Nocera Inferiore', 'Angri', 'Sant\'Egidio del Monte Albino', 'San Marzano sul Sarno', 'Sarno']
  },
  {
    slug: 'angri',
    name: 'Angri',
    province: 'SA',
    region: 'Campania',
    population: '34.000',
    neighborhoods: ['Centro', 'Rione Croce'],
    nearbyAreas: ['Pagani', 'Sant\'Antonio Abate', 'San Marzano sul Sarno', 'Scafati', 'Nocera Inferiore']
  },
  {
    slug: 'scafati',
    name: 'Scafati',
    province: 'SA',
    region: 'Campania',
    population: '51.000',
    neighborhoods: ['Centro', 'Bagni', 'San Pietro'],
    nearbyAreas: ['Pompei', 'Angri', 'Poggiomarino', 'Sant\'Antonio Abate', 'Boscoreale']
  },
  {
    slug: 'barletta',
    name: 'Barletta',
    province: 'BT',
    region: 'Puglia',
    population: '94.000',
    neighborhoods: ['Centro', 'Borgovilla', 'Patalini', 'Settefrati'],
    nearbyAreas: ['Trani', 'Andria', 'Bisceglie', 'Margherita di Savoia', 'Canosa di Puglia']
  },
  {
    slug: 'bisceglie',
    name: 'Bisceglie',
    province: 'BT',
    region: 'Puglia',
    population: '55.000',
    neighborhoods: ['Centro', 'Salnitro', 'San Domenico', 'Seminario'],
    nearbyAreas: ['Molfetta', 'Trani', 'Corato', 'Giovinazzo', 'Barletta']
  },
  {
    slug: 'molfetta',
    name: 'Molfetta',
    province: 'BA',
    region: 'Puglia',
    population: '60.000',
    neighborhoods: ['Centro', 'Sant\'Andrea', 'Immacolata', 'Maddalena'],
    nearbyAreas: ['Bisceglie', 'Terlizzi', 'Giovinazzo', 'Corato', 'Bari']
  },
  {
    slug: 'giovinazzo',
    name: 'Giovinazzo',
    province: 'BA',
    region: 'Puglia',
    population: '20.500',
    neighborhoods: ['Centro', 'Centro Storico'],
    nearbyAreas: ['Molfetta', 'Bari', 'Terlizzi', 'Bitonto', 'Bisceglie']
  },
  {
    slug: 'modugno',
    name: 'Modugno',
    province: 'BA',
    region: 'Puglia',
    population: '38.000',
    neighborhoods: ['Centro', 'San Paolo', 'Zona Industriale'],
    nearbyAreas: ['Bari', 'Bitonto', 'Palo del Colle', 'Bitetto', 'Bitritto']
  },
  {
    slug: 'bitonto',
    name: 'Bitonto',
    province: 'BA',
    region: 'Puglia',
    population: '56.000',
    neighborhoods: ['Centro', 'Palombaio', 'Mariotto'],
    nearbyAreas: ['Bari', 'Modugno', 'Palo del Colle', 'Terlizzi', 'Giovinazzo']
  },
  {
    slug: 'corato',
    name: 'Corato',
    province: 'BA',
    region: 'Puglia',
    population: '48.000',
    neighborhoods: ['Centro', 'Sant\'Elia'],
    nearbyAreas: ['Ruvo di Puglia', 'Andria', 'Terlizzi', 'Molfetta', 'Bisceglie']
  },
  {
    slug: 'monopoli',
    name: 'Monopoli',
    province: 'BA',
    region: 'Puglia',
    population: '49.000',
    neighborhoods: ['Centro', 'Centro Storico', 'Cala Corvino'],
    nearbyAreas: ['Polignano a Mare', 'Conversano', 'Fasano', 'Alberobello', 'Castellana Grotte']
  },
  {
    slug: 'polignano-a-mare',
    name: 'Polignano a Mare',
    province: 'BA',
    region: 'Puglia',
    population: '18.000',
    neighborhoods: ['Centro', 'San Vito'],
    nearbyAreas: ['Monopoli', 'Conversano', 'Mola di Bari', 'Castellana Grotte', 'Bari']
  },
  {
    slug: 'conversano',
    name: 'Conversano',
    province: 'BA',
    region: 'Puglia',
    population: '26.000',
    neighborhoods: ['Centro', 'Marchione'],
    nearbyAreas: ['Polignano a Mare', 'Monopoli', 'Mola di Bari', 'Castellana Grotte', 'Turi']
  },
  {
    slug: 'triggiano',
    name: 'Triggiano',
    province: 'BA',
    region: 'Puglia',
    population: '28.000',
    neighborhoods: ['Centro', 'Ferrovieri'],
    nearbyAreas: ['Bari', 'Noicattaro', 'Capurso', 'Valenzano', 'Mola di Bari']
  },
  {
    slug: 'mola-di-bari',
    name: 'Mola di Bari',
    province: 'BA',
    region: 'Puglia',
    population: '26.000',
    neighborhoods: ['Centro', 'San Materno'],
    nearbyAreas: ['Polignano a Mare', 'Rutigliano', 'Conversano', 'Noicattaro', 'Triggiano']
  },
  {
    slug: 'fasano',
    name: 'Fasano',
    province: 'BR',
    region: 'Puglia',
    population: '40.000',
    neighborhoods: ['Centro', 'Savelletri', 'Torre Canne', 'Selva di Fasano'],
    nearbyAreas: ['Ostuni', 'Monopoli', 'Cisternino', 'Alberobello', 'Locorotondo']
  },
  {
    slug: 'ostuni',
    name: 'Ostuni',
    province: 'BR',
    region: 'Puglia',
    population: '32.000',
    neighborhoods: ['Centro', 'Rosa Marina', 'Villanova'],
    nearbyAreas: ['Fasano', 'Cisternino', 'Carovigno', 'San Vito dei Normanni', 'Ceglie Messapica']
  },
  {
    slug: 'mesagne',
    name: 'Mesagne',
    province: 'BR',
    region: 'Puglia',
    population: '27.000',
    neighborhoods: ['Centro', 'Muro Tenente'],
    nearbyAreas: ['Brindisi', 'Latiano', 'San Pietro Vernotico', 'Cellino San Marco', 'Torchiarolo']
  },
  {
    slug: 'francavilla-fontana',
    name: 'Francavilla Fontana',
    province: 'BR',
    region: 'Puglia',
    population: '37.000',
    neighborhoods: ['Centro', 'San Lorenzo', 'Cimitero'],
    nearbyAreas: ['Oria', 'Ceglie Messapica', 'Villa Castelli', 'Latiano', 'Grottaglie']
  },
  {
    slug: 'grottaglie',
    name: 'Grottaglie',
    province: 'TA',
    region: 'Puglia',
    population: '32.000',
    neighborhoods: ['Centro', 'Quartiere delle Ceramiche'],
    nearbyAreas: ['Taranto', 'Francavilla Fontana', 'Monteiasi', 'Montemesola', 'San Giorgio Ionico']
  },
  {
    slug: 'massafra',
    name: 'Massafra',
    province: 'TA',
    region: 'Puglia',
    population: '33.000',
    neighborhoods: ['Centro', 'Marina di Ferrara', 'Chiatona'],
    nearbyAreas: ['Taranto', 'Mottola', 'Crispiano', 'Palagiano', 'Statte']
  },
  {
    slug: 'manduria',
    name: 'Manduria',
    province: 'TA',
    region: 'Puglia',
    population: '31.000',
    neighborhoods: ['Centro', 'San Pietro in Bevagna'],
    nearbyAreas: ['Sava', 'Avetrana', 'Maruggio', 'Francavilla Fontana', 'Oria']
  },
  {
    slug: 'nardo',
    name: 'Nardò',
    province: 'LE',
    region: 'Puglia',
    population: '31.000',
    neighborhoods: ['Centro', 'Santa Maria al Bagno', 'Santa Caterina', 'Sant\'Isidoro'],
    nearbyAreas: ['Gallipoli', 'Galatone', 'Copertino', 'Avetrana', 'Porto Cesareo']
  },
  {
    slug: 'gallipoli',
    name: 'Gallipoli',
    province: 'LE',
    region: 'Puglia',
    population: '20.000',
    neighborhoods: ['Centro', 'Città Vecchia', 'Baia Verde'],
    nearbyAreas: ['Nardò', 'Galatone', 'Taviano', 'Alezio', 'Tuglie']
  },
  {
    slug: 'galatina',
    name: 'Galatina',
    province: 'LE',
    region: 'Puglia',
    population: '27.000',
    neighborhoods: ['Centro', 'Noha', 'Collemeto'],
    nearbyAreas: ['Galatone', 'Cutrofiano', 'Sternatia', 'Soleto', 'Copertino']
  },
  {
    slug: 'nola',
    name: 'Nola',
    province: 'NA',
    region: 'Campania',
    population: '34.000',
    neighborhoods: ['Centro', 'Cinquevie', 'Piazzolla'],
    nearbyAreas: ['Marigliano', 'Saviano', 'Cimitile', 'San Paolo Bel Sito', 'Cicciano']
  },
  {
    slug: 'pompei',
    name: 'Pompei',
    province: 'NA',
    region: 'Campania',
    population: '25.000',
    neighborhoods: ['Centro', 'Scavi'],
    nearbyAreas: ['Castellammare di Stabia', 'Torre Annunziata', 'Scafati', 'Boscoreale', 'Boscotrecase']
  },
  {
    slug: 'giarre',
    name: 'Giarre',
    province: 'CT',
    region: 'Sicilia',
    population: '27.000',
    neighborhoods: ['Centro', 'Macchia', 'Trepunti'],
    nearbyAreas: ['Acireale', 'Riposto', 'Mascali', 'Sant\'Alfio', 'Zafferana Etnea']
  },
  {
    slug: 'gela',
    name: 'Gela',
    province: 'CL',
    region: 'Sicilia',
    population: '75.000',
    neighborhoods: ['Centro', 'Macchitella', 'Settefarine', 'Caposoprano'],
    nearbyAreas: ['Vittoria', 'Niscemi', 'Butera', 'Licata', 'Riesi']
  },
  {
    slug: 'alcamo',
    name: 'Alcamo',
    province: 'TP',
    region: 'Sicilia',
    population: '46.000',
    neighborhoods: ['Centro', 'Alcamo Marina'],
    nearbyAreas: ['Trapani', 'Castellammare del Golfo', 'Calatafimi-Segesta', 'Partinico', 'Camporeale']
  },
  {
    slug: 'mazara-del-vallo',
    name: 'Mazara del Vallo',
    province: 'TP',
    region: 'Sicilia',
    population: '52.000',
    neighborhoods: ['Centro', 'Tonnarella', 'Mazara Due'],
    nearbyAreas: ['Marsala', 'Campobello di Mazara', 'Castelvetrano', 'Petrosino', 'Salemi']
  },
  {
    slug: 'castelvetrano',
    name: 'Castelvetrano',
    province: 'TP',
    region: 'Sicilia',
    population: '31.000',
    neighborhoods: ['Centro', 'Triscina', 'Marinella di Selinunte'],
    nearbyAreas: ['Mazara del Vallo', 'Campobello di Mazara', 'Partanna', 'Santa Ninfa', 'Gibellina']
  },
  {
    slug: 'scicli',
    name: 'Scicli',
    province: 'RG',
    region: 'Sicilia',
    population: '27.000',
    neighborhoods: ['Centro', 'Sampieri', 'Donnalucata', 'Cava d\'Aliga'],
    nearbyAreas: ['Modica', 'Ragusa', 'Ispica', 'Santa Croce Camerina', 'Pozzallo']
  },
  {
    slug: 'imola',
    name: 'Imola',
    province: 'BO',
    region: 'Emilia-Romagna',
    population: '70.000',
    neighborhoods: ['Centro', 'Pedagna', 'Zolino', 'Cappuccini'],
    nearbyAreas: ['Castel San Pietro Terme', 'Dozza', 'Casalfiumanese', 'Mordano', 'Faenza']
  },
  {
    slug: 'carpi',
    name: 'Carpi',
    province: 'MO',
    region: 'Emilia-Romagna',
    population: '72.000',
    neighborhoods: ['Centro', 'Cibeno', 'Santa Croce', 'Quartirolo'],
    nearbyAreas: ['Modena', 'Soliera', 'Novi di Modena', 'Correggio', 'Campogalliano']
  },
  {
    slug: 'sassuolo',
    name: 'Sassuolo',
    province: 'MO',
    region: 'Emilia-Romagna',
    population: '41.000',
    neighborhoods: ['Centro', 'Braida', 'San Michele dei Mucchietti'],
    nearbyAreas: ['Modena', 'Formigine', 'Fiorano Modenese', 'Maranello', 'Casalgrande']
  },
  {
    slug: 'faenza',
    name: 'Faenza',
    province: 'RA',
    region: 'Emilia-Romagna',
    population: '58.000',
    neighborhoods: ['Centro', 'Borgo Durbecco', 'San Rocco'],
    nearbyAreas: ['Ravenna', 'Imola', 'Brisighella', 'Castel Bolognese', 'Forlì']
  },
  {
    slug: 'lugo',
    name: 'Lugo',
    province: 'RA',
    region: 'Emilia-Romagna',
    population: '33.000',
    neighborhoods: ['Centro', 'Voltana', 'Belricetto'],
    nearbyAreas: ['Ravenna', 'Alfonsine', 'Bagnacavallo', 'Cotignola', 'Massa Lombarda']
  },
  {
    slug: 'cervia',
    name: 'Cervia',
    province: 'RA',
    region: 'Emilia-Romagna',
    population: '29.000',
    neighborhoods: ['Centro', 'Milano Marittima', 'Pinarella', 'Tagliata'],
    nearbyAreas: ['Ravenna', 'Cesenatico', 'Russi', 'Bertinoro', 'Classe']
  },
  {
    slug: 'cesenatico',
    name: 'Cesenatico',
    province: 'FC',
    region: 'Emilia-Romagna',
    population: '26.000',
    neighborhoods: ['Centro', 'Valverde', 'Villamarina', 'Zadina'],
    nearbyAreas: ['Cervia', 'Cesena', 'Gatteo', 'Savignano sul Rubicone', 'Gambettola']
  },
  {
    slug: 'fidenza',
    name: 'Fidenza',
    province: 'PR',
    region: 'Emilia-Romagna',
    population: '27.000',
    neighborhoods: ['Centro', 'Cabriolo', 'Sant\'Andrea'],
    nearbyAreas: ['Parma', 'Salsomaggiore Terme', 'Fontanellato', 'Noceto', 'Busseto']
  },
  {
    slug: 'correggio',
    name: 'Correggio',
    province: 'RE',
    region: 'Emilia-Romagna',
    population: '26.000',
    neighborhoods: ['Centro', 'Mandrio', 'Budrio'],
    nearbyAreas: ['Reggio Emilia', 'Carpi', 'Rio Saliceto', 'Campagnola Emilia', 'San Martino in Rio']
  },
  {
    slug: 'scandiano',
    name: 'Scandiano',
    province: 'RE',
    region: 'Emilia-Romagna',
    population: '26.000',
    neighborhoods: ['Centro', 'Arceto', 'Rondinara'],
    nearbyAreas: ['Reggio Emilia', 'Casalgrande', 'Rubiera', 'Albinea', 'Castellarano']
  },
  {
    slug: 'guastalla',
    name: 'Guastalla',
    province: 'RE',
    region: 'Emilia-Romagna',
    population: '15.500',
    neighborhoods: ['Centro', 'San Girolamo'],
    nearbyAreas: ['Reggiolo', 'Luzzara', 'Novellara', 'Gualtieri', 'Suzzara']
  },
  {
    slug: 'cento',
    name: 'Cento',
    province: 'FE',
    region: 'Emilia-Romagna',
    population: '36.000',
    neighborhoods: ['Centro', 'Renazzo', 'Casumaro'],
    nearbyAreas: ['Ferrara', 'San Giovanni in Persiceto', 'Crevalcore', 'Sant\'Agostino', 'Bondeno']
  },
  {
    slug: 'comacchio',
    name: 'Comacchio',
    province: 'FE',
    region: 'Emilia-Romagna',
    population: '22.000',
    neighborhoods: ['Centro', 'Lido degli Estensi', 'Porto Garibaldi', 'Lido delle Nazioni'],
    nearbyAreas: ['Ravenna', 'Ferrara', 'Argenta', 'Ostellato', 'Lagosanto']
  },
  {
    slug: 'argenta',
    name: 'Argenta',
    province: 'FE',
    region: 'Emilia-Romagna',
    population: '22.000',
    neighborhoods: ['Centro', 'San Biagio', 'Boccaleone'],
    nearbyAreas: ['Ferrara', 'Comacchio', 'Alfonsine', 'Molinella', 'Portomaggiore']
  },
  {
    slug: 'sanremo',
    name: 'Sanremo',
    province: 'IM',
    region: 'Liguria',
    population: '55.000',
    neighborhoods: ['Centro', 'La Pigna', 'Foce', 'Coldirodi', 'Poggio'],
    nearbyAreas: ['Imperia', 'Ventimiglia', 'Bordighera', 'Taggia', 'Ospedaletti']
  },
  {
    slug: 'ventimiglia',
    name: 'Ventimiglia',
    province: 'IM',
    region: 'Liguria',
    population: '24.000',
    neighborhoods: ['Centro', 'Latte', 'Grimaldi', 'Bevera'],
    nearbyAreas: ['Bordighera', 'Sanremo', 'Dolceacqua', 'Mentone', 'Camporosso']
  },
  {
    slug: 'chiavari',
    name: 'Chiavari',
    province: 'GE',
    region: 'Liguria',
    population: '28.000',
    neighborhoods: ['Centro', 'Preli', 'Caperana', 'Ri'],
    nearbyAreas: ['Lavagna', 'Rapallo', 'Sestri Levante', 'Leivi', 'Cogorno']
  },
  {
    slug: 'rapallo',
    name: 'Rapallo',
    province: 'GE',
    region: 'Liguria',
    population: '30.000',
    neighborhoods: ['Centro', 'San Michele di Pagana', 'Sant\'Anna', 'San Massimo'],
    nearbyAreas: ['Genova', 'Santa Margherita Ligure', 'Chiavari', 'Zoagli', 'Portofino']
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
  },
  // === NUOVI SERVIZI ===
  {
    slug: 'scaldabagno',
    name: 'Riparazione Scaldabagno',
    shortName: 'Scaldabagno',
    description: 'Riparazione, manutenzione e installazione scaldabagno a gas ed elettrici',
    keywords: ['scaldabagno', 'boiler', 'riparazione scaldabagno', 'installazione scaldabagno'],
    icon: 'Zap'
  },
  {
    slug: 'autoclave',
    name: 'Installazione Autoclave',
    shortName: 'Autoclave',
    description: 'Installazione e riparazione autoclave per aumentare la pressione dell\'acqua',
    keywords: ['autoclave', 'pompa autoclave', 'pressione acqua', 'autoclave domestica'],
    icon: 'Gauge'
  },
  {
    slug: 'addolcitore-acqua',
    name: 'Addolcitore Acqua',
    shortName: 'Addolcitore',
    description: 'Installazione e manutenzione addolcitori acqua per eliminare il calcare',
    keywords: ['addolcitore acqua', 'anticalcare', 'depuratore', 'filtro acqua'],
    icon: 'Filter'
  },
  {
    slug: 'depuratore-acqua',
    name: 'Depuratore Acqua',
    shortName: 'Depuratore',
    description: 'Installazione depuratori acqua domestici a osmosi inversa e microfiltrazione',
    keywords: ['depuratore acqua', 'osmosi inversa', 'filtro acqua potabile', 'purificatore'],
    icon: 'Droplets'
  },
  {
    slug: 'pompa-calore',
    name: 'Pompa di Calore',
    shortName: 'Pompa Calore',
    description: 'Installazione e manutenzione pompe di calore aria-acqua e geotermiche',
    keywords: ['pompa di calore', 'pompa calore aria acqua', 'riscaldamento pompa calore'],
    icon: 'Thermometer'
  },
  {
    slug: 'pannelli-solari-termici',
    name: 'Pannelli Solari Termici',
    shortName: 'Solare Termico',
    description: 'Installazione pannelli solari termici per acqua calda sanitaria e riscaldamento',
    keywords: ['pannelli solari termici', 'solare termico', 'acqua calda solare'],
    icon: 'Sun'
  },
  {
    slug: 'termosifoni',
    name: 'Termosifoni e Radiatori',
    shortName: 'Termosifoni',
    description: 'Installazione, sostituzione e riparazione termosifoni e radiatori',
    keywords: ['termosifoni', 'radiatori', 'caloriferi', 'sostituzione termosifoni'],
    icon: 'Heater'
  },
  {
    slug: 'valvole-termostatiche',
    name: 'Valvole Termostatiche',
    shortName: 'Valvole',
    description: 'Installazione valvole termostatiche obbligatorie per risparmio energetico',
    keywords: ['valvole termostatiche', 'contabilizzazione calore', 'risparmio energetico'],
    icon: 'Settings'
  },
  {
    slug: 'impianto-gas',
    name: 'Impianto Gas',
    shortName: 'Gas',
    description: 'Installazione, manutenzione e certificazione impianti gas domestici',
    keywords: ['impianto gas', 'tubazioni gas', 'allaccio gas', 'certificazione gas'],
    icon: 'Flame'
  },
  {
    slug: 'contatore-acqua',
    name: 'Contatore Acqua',
    shortName: 'Contatore',
    description: 'Installazione e sostituzione contatori acqua condominiali e individuali',
    keywords: ['contatore acqua', 'sottocontatore', 'misuratore acqua', 'contabilizzazione acqua'],
    icon: 'Activity'
  },
  {
    slug: 'box-doccia',
    name: 'Installazione Box Doccia',
    shortName: 'Box Doccia',
    description: 'Installazione box doccia, cabine doccia e piatti doccia a filo pavimento',
    keywords: ['box doccia', 'cabina doccia', 'piatto doccia', 'installazione doccia'],
    icon: 'Droplet'
  },
  {
    slug: 'vasca-doccia',
    name: 'Trasformazione Vasca in Doccia',
    shortName: 'Vasca-Doccia',
    description: 'Trasformazione vasca da bagno in doccia walk-in moderna e accessibile',
    keywords: ['vasca in doccia', 'trasformazione vasca', 'sostituzione vasca', 'doccia anziani'],
    icon: 'RefreshCw'
  },
  {
    slug: 'rubinetteria',
    name: 'Rubinetteria',
    shortName: 'Rubinetti',
    description: 'Installazione e riparazione rubinetti, miscelatori e sistemi di erogazione',
    keywords: ['rubinetteria', 'rubinetti', 'miscelatori', 'sostituzione rubinetto'],
    icon: 'Pipette'
  },
  {
    slug: 'scarichi-fognature',
    name: 'Scarichi e Fognature',
    shortName: 'Fognature',
    description: 'Installazione, riparazione e manutenzione scarichi e reti fognarie',
    keywords: ['scarichi', 'fognature', 'rete fognaria', 'allaccio fognatura'],
    icon: 'ArrowDown'
  },
  {
    slug: 'certificazione-impianti',
    name: 'Certificazione Impianti',
    shortName: 'Certificazioni',
    description: 'Rilascio certificazioni di conformità per impianti idraulici e gas',
    keywords: ['certificazione impianti', 'dichiarazione conformità', 'certificato impianto'],
    icon: 'FileCheck'
  },
  {
    slug: 'irrigazione-giardino',
    name: 'Impianto Irrigazione',
    shortName: 'Irrigazione',
    description: 'Progettazione e installazione impianti di irrigazione automatica per giardini',
    keywords: ['impianto irrigazione', 'irrigazione giardino', 'impianto automatico', 'irrigazione a goccia'],
    icon: 'Sprout'
  },
  {
    slug: 'piscine',
    name: 'Impianti Piscine',
    shortName: 'Piscine',
    description: 'Installazione e manutenzione impianti idraulici per piscine e spa',
    keywords: ['impianto piscina', 'idraulico piscina', 'filtrazione piscina', 'pompa piscina'],
    icon: 'Waves'
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
  },
  // ============================================
  // NUOVE KEYWORD LONG-TAIL - Costi e Prezzi
  // ============================================
  {
    slug: 'quanto-costa-idraulico',
    title: 'Quanto Costa un Idraulico? Prezzi e Tariffe 2025',
    h1: 'Quanto Costa un Idraulico?',
    description: 'Scopri quanto costa chiamare un idraulico nel 2025. Prezzi medi per riparazioni, installazioni e pronto intervento. Confronta tariffe e richiedi preventivi gratuiti.',
    keywords: ['quanto costa idraulico', 'costo idraulico', 'prezzo idraulico', 'tariffa idraulico', 'idraulico costo orario']
  },
  {
    slug: 'costo-pronto-intervento-idraulico',
    title: 'Costo Pronto Intervento Idraulico - Prezzi Emergenze 24h',
    h1: 'Costo Pronto Intervento Idraulico',
    description: 'Quanto costa il pronto intervento idraulico? Prezzi per emergenze notturne, festivi e weekend. Tariffe trasparenti e preventivi immediati.',
    keywords: ['costo pronto intervento idraulico', 'prezzo idraulico urgente', 'costo idraulico notte', 'tariffa idraulico emergenza']
  },
  {
    slug: 'costo-riparazione-perdita-acqua',
    title: 'Costo Riparazione Perdita Acqua - Prezzi e Preventivi',
    h1: 'Costo Riparazione Perdita Acqua',
    description: 'Quanto costa riparare una perdita acqua? Prezzi per perdite tubature, muri e pavimenti. Preventivi gratuiti da idraulici qualificati.',
    keywords: ['costo riparazione perdita acqua', 'prezzo riparazione tubo', 'quanto costa riparare perdita', 'costo perdita acqua muro']
  },
  {
    slug: 'costo-sostituzione-rubinetto',
    title: 'Costo Sostituzione Rubinetto - Prezzi Montaggio Miscelatore',
    h1: 'Costo Sostituzione Rubinetto',
    description: 'Quanto costa sostituire un rubinetto? Prezzi per cambio rubinetto cucina, bagno e miscelatore doccia. Preventivi e tariffe idraulico.',
    keywords: ['costo sostituzione rubinetto', 'prezzo cambio rubinetto', 'quanto costa montare rubinetto', 'costo miscelatore']
  },
  {
    slug: 'costo-spurgo-fognature',
    title: 'Costo Spurgo Fognature - Prezzi Autospurgo e Pozzi Neri',
    h1: 'Costo Spurgo Fognature',
    description: 'Quanto costa lo spurgo fognature? Prezzi autospurgo, svuotamento pozzi neri e fosse biologiche. Tariffe per metro cubo e forfait.',
    keywords: ['costo spurgo fognature', 'prezzo autospurgo', 'quanto costa spurgo', 'costo svuotamento pozzo nero']
  },
  // ============================================
  // NUOVE KEYWORD LONG-TAIL - Problemi Specifici
  // ============================================
  {
    slug: 'perdita-acqua-sotto-pavimento',
    title: 'Perdita Acqua Sotto Pavimento - Come Trovare e Riparare',
    h1: 'Perdita Acqua Sotto Pavimento',
    description: 'Come trovare e riparare una perdita acqua sotto il pavimento senza rompere. Tecniche di ricerca non invasive e intervento professionale.',
    keywords: ['perdita acqua sotto pavimento', 'perdita tubo pavimento', 'infiltrazione pavimento', 'ricerca perdite occulte']
  },
  {
    slug: 'perdita-acqua-muro',
    title: 'Perdita Acqua nel Muro - Ricerca e Riparazione',
    h1: 'Perdita Acqua nel Muro',
    description: 'Macchia umidità sul muro? Trova e ripara perdite acqua nascoste nei muri con tecniche termografiche e acustiche non distruttive.',
    keywords: ['perdita acqua muro', 'infiltrazione muro', 'macchia umidità muro', 'tubo rotto nel muro']
  },
  {
    slug: 'rubinetto-perde-acqua',
    title: 'Rubinetto Perde Acqua - Come Riparare Gocciolamento',
    h1: 'Rubinetto Perde Acqua: Riparazione',
    description: 'Il rubinetto gocciola? Scopri come riparare un rubinetto che perde acqua. Sostituzione guarnizioni, cartuccia e intervento idraulico.',
    keywords: ['rubinetto perde acqua', 'rubinetto gocciola', 'riparare rubinetto', 'rubinetto che sgocciola']
  },
  {
    slug: 'wc-perde-acqua',
    title: 'WC Perde Acqua - Riparazione Cassetta e Scarico',
    h1: 'WC Perde Acqua: Come Riparare',
    description: 'Il water perde acqua dalla cassetta o dalla base? Intervento rapido per riparare perdite WC, galleggiante e guarnizioni.',
    keywords: ['wc perde acqua', 'water perde', 'cassetta wc perde', 'wc perde dalla base']
  },
  {
    slug: 'scarico-lento-lavandino',
    title: 'Scarico Lento Lavandino - Cause e Soluzioni',
    h1: 'Scarico Lento Lavandino',
    description: 'Il lavandino scarica lentamente? Cause e soluzioni per scarichi lenti. Disostruzione professionale e pulizia sifone.',
    keywords: ['scarico lento lavandino', 'lavandino scarica lento', 'lavandino intasato', 'acqua non scende lavandino']
  },
  {
    slug: 'doccia-perde-acqua',
    title: 'Doccia Perde Acqua - Riparazione Infiltrazioni Box Doccia',
    h1: 'Doccia Perde Acqua: Soluzioni',
    description: 'Perdite dalla doccia? Riparazione infiltrazioni box doccia, soffione, miscelatore e piatto doccia. Intervento idraulico professionale.',
    keywords: ['doccia perde acqua', 'infiltrazione doccia', 'box doccia perde', 'perdita soffione doccia']
  },
  {
    slug: 'tubo-rotto',
    title: 'Tubo Rotto - Riparazione Urgente Tubature',
    h1: 'Tubo Rotto: Intervento Urgente',
    description: 'Tubo rotto in casa? Pronto intervento per riparazione tubature rotte, sostituzione tubi e blocco perdite. Disponibile 24/7.',
    keywords: ['tubo rotto', 'rottura tubo', 'tubo scoppiato', 'riparazione tubo rotto']
  },
  {
    slug: 'acqua-calda-non-funziona',
    title: 'Acqua Calda Non Funziona - Cause e Riparazioni',
    h1: 'Acqua Calda Non Funziona',
    description: 'Non esce acqua calda? Cause e soluzioni per problemi caldaia, scaldabagno e boiler. Diagnosi e riparazione rapida.',
    keywords: ['acqua calda non funziona', 'no acqua calda', 'caldaia non scalda acqua', 'scaldabagno non funziona']
  },
  {
    slug: 'pressione-acqua-bassa',
    title: 'Pressione Acqua Bassa - Cause e Come Aumentarla',
    h1: 'Pressione Acqua Bassa in Casa',
    description: 'Pressione acqua troppo bassa in casa? Scopri le cause e le soluzioni per aumentare la pressione dell\'acqua. Installazione autoclave e riduttori.',
    keywords: ['pressione acqua bassa', 'poca pressione acqua', 'aumentare pressione acqua', 'acqua esce piano']
  },
  // ============================================
  // NUOVE KEYWORD LONG-TAIL - Orari e Disponibilità
  // ============================================
  {
    slug: 'idraulico-festivi',
    title: 'Idraulico Festivi - Pronto Intervento Sabato, Domenica e Feste',
    h1: 'Idraulico Disponibile nei Festivi',
    description: 'Cerchi un idraulico disponibile sabato, domenica e festivi? Pronto intervento anche durante le feste. Tariffe e costi per interventi festivi.',
    keywords: ['idraulico festivi', 'idraulico domenica', 'idraulico sabato', 'idraulico feste', 'idraulico weekend']
  },
  {
    slug: 'idraulico-notturno',
    title: 'Idraulico Notturno - Emergenze Idrauliche di Notte',
    h1: 'Idraulico Notturno 24h',
    description: 'Emergenza idraulica di notte? Idraulico notturno disponibile per interventi urgenti. Pronto intervento h24 anche in orario notturno.',
    keywords: ['idraulico notturno', 'idraulico notte', 'idraulico h24', 'emergenza idraulica notte']
  },
  // ============================================
  // NUOVE KEYWORD LONG-TAIL - Servizi Specifici
  // ============================================
  {
    slug: 'installazione-lavatrice',
    title: 'Installazione Lavatrice - Allacciamento Acqua e Scarico',
    h1: 'Installazione Lavatrice Professionale',
    description: 'Servizio di installazione lavatrice con allacciamento acqua e scarico. Montaggio professionale con verifica funzionamento.',
    keywords: ['installazione lavatrice', 'montaggio lavatrice', 'allacciamento lavatrice', 'attacco lavatrice']
  },
  {
    slug: 'installazione-lavastoviglie',
    title: 'Installazione Lavastoviglie - Allacciamento e Montaggio',
    h1: 'Installazione Lavastoviglie',
    description: 'Installazione lavastoviglie con allacciamento acqua calda/fredda e scarico. Montaggio professionale sotto piano o libera installazione.',
    keywords: ['installazione lavastoviglie', 'montaggio lavastoviglie', 'allacciamento lavastoviglie', 'attacco lavastoviglie']
  },
  {
    slug: 'installazione-bidet',
    title: 'Installazione Bidet - Montaggio e Allacciamento',
    h1: 'Installazione Bidet Professionale',
    description: 'Installazione bidet nuovo o sostituzione. Montaggio a pavimento o sospeso con allacciamento idraulico a norma.',
    keywords: ['installazione bidet', 'montaggio bidet', 'sostituzione bidet', 'bidet sospeso']
  },
  {
    slug: 'installazione-wc',
    title: 'Installazione WC - Montaggio Water e Cassetta',
    h1: 'Installazione WC Professionale',
    description: 'Installazione WC nuovo, sostituzione water e cassetta di scarico. Montaggio a pavimento o sospeso con scarico a parete o terra.',
    keywords: ['installazione wc', 'montaggio water', 'sostituzione wc', 'wc sospeso', 'cassetta incasso']
  },
  {
    slug: 'sostituzione-sifone',
    title: 'Sostituzione Sifone Lavandino - Riparazione e Montaggio',
    h1: 'Sostituzione Sifone Lavandino',
    description: 'Sostituzione sifone lavandino cucina e bagno. Riparazione perdite sifone, montaggio e pulizia professionale.',
    keywords: ['sostituzione sifone', 'sifone lavandino', 'cambio sifone', 'sifone perde']
  },
  {
    slug: 'riparazione-autoclave',
    title: 'Riparazione Autoclave - Assistenza e Manutenzione',
    h1: 'Riparazione Autoclave',
    description: 'Riparazione autoclave domestica e condominiale. Assistenza pressostato, membrana e pompa. Manutenzione e sostituzione.',
    keywords: ['riparazione autoclave', 'autoclave non funziona', 'assistenza autoclave', 'autoclave domestica']
  },
  {
    slug: 'installazione-autoclave',
    title: 'Installazione Autoclave - Aumento Pressione Acqua',
    h1: 'Installazione Autoclave',
    description: 'Installazione autoclave per aumentare la pressione dell\'acqua. Sistemi per appartamenti, ville e condomini. Preventivi gratuiti.',
    keywords: ['installazione autoclave', 'montaggio autoclave', 'autoclave casa', 'pompa pressione acqua']
  },
  {
    slug: 'installazione-addolcitore',
    title: 'Installazione Addolcitore Acqua - Montaggio e Manutenzione',
    h1: 'Installazione Addolcitore Acqua',
    description: 'Installazione addolcitore acqua per eliminare calcare. Montaggio professionale, manutenzione e ricarica sale. Preventivi gratuiti.',
    keywords: ['installazione addolcitore', 'addolcitore acqua', 'anticalcare casa', 'addolcitore domestico']
  },
  {
    slug: 'ricerca-perdite-acqua',
    title: 'Ricerca Perdite Acqua - Rilevamento Non Distruttivo',
    h1: 'Ricerca Perdite Acqua Occulte',
    description: 'Servizio di ricerca perdite acqua con tecnologie non distruttive: termografia, geofono e gas tracciante. Trova perdite nascoste senza rompere.',
    keywords: ['ricerca perdite acqua', 'rilevamento perdite', 'perdite occulte', 'trova perdite']
  },
  {
    slug: 'videoispezione-tubature',
    title: 'Videoispezione Tubature - Ispezione Fognature con Telecamera',
    h1: 'Videoispezione Tubature e Fognature',
    description: 'Servizio videoispezione tubature e fognature con telecamera endoscopica. Diagnosi precisa di intasamenti, rotture e infiltrazioni.',
    keywords: ['videoispezione tubature', 'ispezione fognature', 'telecamera tubature', 'videoispezione scarichi']
  },
  {
    slug: 'disostruzione-colonne-scarico',
    title: 'Disostruzione Colonne di Scarico - Spurgo Condominiale',
    h1: 'Disostruzione Colonne di Scarico',
    description: 'Disostruzione colonne di scarico condominiali intasate. Spurgo con idrogetto professionale e pulizia completa tubazioni verticali.',
    keywords: ['disostruzione colonne scarico', 'colonna scarico intasata', 'spurgo colonne', 'colonne condominiali']
  },
  // ============================================
  // NUOVE KEYWORD LONG-TAIL - Termini Colloquiali
  // ============================================
  {
    slug: 'idraulico-buono',
    title: 'Idraulico Buono e Affidabile - Come Trovarlo',
    h1: 'Come Trovare un Idraulico Buono',
    description: 'Cerchi un idraulico bravo e affidabile? Trova professionisti con recensioni verificate, prezzi onesti e lavoro garantito.',
    keywords: ['idraulico buono', 'idraulico bravo', 'buon idraulico', 'idraulico di fiducia']
  },
  {
    slug: 'idraulico-economico',
    title: 'Idraulico Economico - Prezzi Bassi ma Qualità Garantita',
    h1: 'Idraulico Economico nella Tua Zona',
    description: 'Cerchi un idraulico economico? Confronta preventivi gratuiti e trova professionisti con prezzi competitivi senza rinunciare alla qualità.',
    keywords: ['idraulico economico', 'idraulico low cost', 'idraulico prezzi bassi', 'idraulico conveniente']
  },
  {
    slug: 'cerco-idraulico',
    title: 'Cerco Idraulico - Trova Professionisti nella Tua Città',
    h1: 'Cerco un Idraulico',
    description: 'Stai cercando un idraulico? Trova subito professionisti qualificati nella tua zona. Preventivi gratuiti e risposta rapida.',
    keywords: ['cerco idraulico', 'cerco un idraulico', 'mi serve idraulico', 'ho bisogno idraulico']
  },
  {
    slug: 'chiamare-idraulico',
    title: 'Chiamare Idraulico - Quando e Come Contattare un Professionista',
    h1: 'Quando Chiamare un Idraulico',
    description: 'Non sai se chiamare un idraulico? Scopri quando è necessario l\'intervento di un professionista e come richiedere assistenza.',
    keywords: ['chiamare idraulico', 'quando chiamare idraulico', 'contattare idraulico', 'telefonare idraulico']
  },
  {
    slug: 'bagno-allagato',
    title: 'Bagno Allagato - Pronto Intervento e Soluzioni',
    h1: 'Bagno Allagato: Cosa Fare',
    description: 'Bagno allagato? Pronto intervento per bloccare perdite, aspirare acqua e riparare guasti. Intervento urgente disponibile 24/7.',
    keywords: ['bagno allagato', 'allagamento bagno', 'bagno pieno acqua', 'perdita bagno']
  },
  {
    slug: 'cucina-allagata',
    title: 'Cucina Allagata - Emergenza Perdite e Riparazioni',
    h1: 'Cucina Allagata: Intervento Urgente',
    description: 'Cucina allagata per perdita lavatrice, lavastoviglie o lavandino? Pronto intervento per bloccare l\'acqua e riparare il guasto.',
    keywords: ['cucina allagata', 'allagamento cucina', 'perdita cucina', 'lavatrice perde']
  },
  {
    slug: 'cantina-allagata',
    title: 'Cantina Allagata - Aspirazione Acqua e Riparazione',
    h1: 'Cantina Allagata: Soluzioni',
    description: 'Cantina o garage allagati? Servizio di aspirazione acqua, ricerca cause infiltrazione e installazione pompe sommerse.',
    keywords: ['cantina allagata', 'garage allagato', 'aspirazione acqua cantina', 'infiltrazioni cantina']
  },
  // ============================================
  // NUOVE PROBLEMATICHE - Caldaie e Riscaldamento
  // ============================================
  {
    slug: 'caldaia-non-parte',
    title: 'Caldaia Non Parte - Cause e Soluzioni',
    h1: 'Caldaia Non Parte: Cosa Fare',
    description: 'La caldaia non si accende? Scopri le cause più comuni e le soluzioni. Intervento tecnico rapido per riparare caldaie bloccate.',
    keywords: ['caldaia non parte', 'caldaia non si accende', 'caldaia bloccata', 'caldaia non funziona']
  },
  {
    slug: 'caldaia-va-in-blocco',
    title: 'Caldaia Va in Blocco - Reset e Riparazione',
    h1: 'Caldaia Va in Blocco: Soluzioni',
    description: 'Caldaia che va in blocco continuamente? Cause del blocco, come fare il reset e quando chiamare il tecnico.',
    keywords: ['caldaia in blocco', 'caldaia blocco', 'reset caldaia', 'caldaia si blocca']
  },
  {
    slug: 'caldaia-rumorosa',
    title: 'Caldaia Rumorosa - Cause Rumori Strani',
    h1: 'Caldaia Rumorosa: Diagnosi',
    description: 'Caldaia che fa rumore? Fischi, gorgoglii e vibrazioni: scopri le cause dei rumori caldaia e come risolvere.',
    keywords: ['caldaia rumorosa', 'caldaia fa rumore', 'caldaia fischia', 'caldaia gorgoglia']
  },
  {
    slug: 'termosifone-non-scalda',
    title: 'Termosifone Non Scalda - Cause e Rimedi',
    h1: 'Termosifone Non Scalda',
    description: 'Termosifone freddo o che scalda poco? Cause comuni e soluzioni: sfiatare aria, lavaggio impianto e sostituzione valvole.',
    keywords: ['termosifone non scalda', 'termosifone freddo', 'radiatore freddo', 'calorifero non funziona']
  },
  {
    slug: 'sfiatare-termosifoni',
    title: 'Sfiatare Termosifoni - Come Fare e Quando',
    h1: 'Sfiatare i Termosifoni',
    description: 'Come sfiatare i termosifoni correttamente per eliminare aria dall\'impianto. Guida passo passo e intervento professionale.',
    keywords: ['sfiatare termosifoni', 'sfiato termosifone', 'aria termosifoni', 'spurgo radiatori']
  },
  {
    slug: 'lavaggio-impianto-riscaldamento',
    title: 'Lavaggio Impianto Riscaldamento - Pulizia Professionale',
    h1: 'Lavaggio Impianto Riscaldamento',
    description: 'Servizio lavaggio impianto riscaldamento per eliminare fanghi e incrostazioni. Migliora efficienza caldaia e riduci consumi.',
    keywords: ['lavaggio impianto riscaldamento', 'pulizia termosifoni', 'lavaggio radiatori', 'fanghi impianto']
  },
  // ============================================
  // NUOVE PROBLEMATICHE - Scarichi e Tubazioni
  // ============================================
  {
    slug: 'lavandino-intasato',
    title: 'Lavandino Intasato - Come Sturarlo',
    h1: 'Lavandino Intasato: Soluzioni',
    description: 'Lavandino intasato in cucina o bagno? Metodi per sturare lo scarico e quando chiamare un idraulico professionista.',
    keywords: ['lavandino intasato', 'lavandino otturato', 'sturare lavandino', 'scarico lavandino intasato']
  },
  {
    slug: 'doccia-intasata',
    title: 'Doccia Intasata - Disostruzione Scarico Doccia',
    h1: 'Doccia Intasata: Come Risolvere',
    description: 'Scarico doccia intasato da capelli e sapone? Metodi casalinghi e disostruzione professionale per docce ostruite.',
    keywords: ['doccia intasata', 'scarico doccia intasato', 'sturare doccia', 'piletta doccia intasata']
  },
  {
    slug: 'bidet-intasato',
    title: 'Bidet Intasato - Disostruzione e Riparazione',
    h1: 'Bidet Intasato',
    description: 'Bidet intasato o che scarica lento? Intervento di disostruzione e riparazione scarico bidet con idraulico professionista.',
    keywords: ['bidet intasato', 'scarico bidet intasato', 'bidet otturato', 'sturare bidet']
  },
  {
    slug: 'vasca-intasata',
    title: 'Vasca da Bagno Intasata - Disostruzione Scarico',
    h1: 'Vasca da Bagno Intasata',
    description: 'Vasca da bagno che non scarica? Disostruzione scarico vasca con sonda e idrogetto professionale.',
    keywords: ['vasca intasata', 'scarico vasca intasato', 'vasca non scarica', 'sturare vasca']
  },
  {
    slug: 'fognatura-intasata',
    title: 'Fognatura Intasata - Spurgo e Disostruzione',
    h1: 'Fognatura Intasata: Intervento',
    description: 'Fognatura intasata con risalita cattivi odori? Spurgo fognature con autospurgo e disostruzione professionale.',
    keywords: ['fognatura intasata', 'fogna intasata', 'spurgo fognatura', 'fognatura ostruita']
  },
  {
    slug: 'pozzetto-intasato',
    title: 'Pozzetto Intasato - Pulizia e Svuotamento',
    h1: 'Pozzetto Intasato',
    description: 'Pozzetto o tombino intasato? Servizio pulizia pozzetti, svuotamento e disostruzione con attrezzature professionali.',
    keywords: ['pozzetto intasato', 'tombino intasato', 'pulizia pozzetto', 'svuotamento pozzetto']
  },
  {
    slug: 'odore-fogna-bagno',
    title: 'Odore di Fogna in Bagno - Cause e Rimedi',
    h1: 'Odore di Fogna in Bagno',
    description: 'Puzza di fogna in bagno? Scopri le cause: sifone secco, guarnizioni usurate, problemi fognatura e soluzioni.',
    keywords: ['odore fogna bagno', 'puzza fogna', 'cattivo odore bagno', 'fetore bagno']
  },
  {
    slug: 'odore-fogna-cucina',
    title: 'Odore di Fogna in Cucina - Cause e Soluzioni',
    h1: 'Odore di Fogna in Cucina',
    description: 'Cattivo odore di fogna in cucina? Cause comuni dal lavandino, lavastoviglie e soluzioni professionali.',
    keywords: ['odore fogna cucina', 'puzza lavandino cucina', 'cattivo odore cucina', 'scarico cucina puzza']
  },
  // ============================================
  // NUOVE PROBLEMATICHE - Perdite Specifiche
  // ============================================
  {
    slug: 'tubo-che-perde',
    title: 'Tubo che Perde Acqua - Riparazione Urgente',
    h1: 'Tubo che Perde Acqua',
    description: 'Tubo che gocciola o perde acqua? Intervento urgente per riparare perdite tubazioni, giunti e raccordi.',
    keywords: ['tubo che perde', 'tubo gocciola', 'perdita tubo', 'riparare tubo']
  },
  {
    slug: 'giunto-che-perde',
    title: 'Giunto che Perde - Riparazione Raccordi Idraulici',
    h1: 'Giunto che Perde Acqua',
    description: 'Giunto o raccordo idraulico che perde? Sostituzione guarnizioni e riparazione giunti con idraulico professionista.',
    keywords: ['giunto che perde', 'raccordo perde', 'perdita giunto', 'giunto idraulico']
  },
  {
    slug: 'sifone-che-perde',
    title: 'Sifone che Perde - Riparazione e Sostituzione',
    h1: 'Sifone che Perde Acqua',
    description: 'Sifone lavandino o bidet che perde? Riparazione perdite sifone, sostituzione guarnizioni e montaggio nuovo sifone.',
    keywords: ['sifone che perde', 'sifone perde acqua', 'perdita sifone', 'sifone gocciola']
  },
  {
    slug: 'cassetta-wc-perde',
    title: 'Cassetta WC Perde - Riparazione Scarico Water',
    h1: 'Cassetta WC che Perde',
    description: 'Cassetta WC che perde acqua? Riparazione galleggiante, valvola e meccanismo scarico. Intervento rapido.',
    keywords: ['cassetta wc perde', 'sciacquone perde', 'cassetta scarico perde', 'galleggiante wc']
  },
  {
    slug: 'flessibile-che-perde',
    title: 'Flessibile che Perde - Sostituzione Tubi Flessibili',
    h1: 'Flessibile che Perde Acqua',
    description: 'Tubo flessibile rubinetto o lavatrice che perde? Sostituzione flessibili usurati con nuovi tubi in acciaio inox.',
    keywords: ['flessibile che perde', 'tubo flessibile perde', 'sostituzione flessibile', 'flessibile lavatrice']
  },
  {
    slug: 'boiler-perde-acqua',
    title: 'Boiler Perde Acqua - Riparazione Scaldabagno',
    h1: 'Boiler che Perde Acqua',
    description: 'Scaldabagno o boiler che perde acqua dalla base o dalla valvola? Intervento riparazione o sostituzione.',
    keywords: ['boiler perde acqua', 'scaldabagno perde', 'boiler gocciola', 'perdita scaldabagno']
  },
  {
    slug: 'lavatrice-perde-acqua',
    title: 'Lavatrice Perde Acqua - Cause e Riparazioni',
    h1: 'Lavatrice che Perde Acqua',
    description: 'Lavatrice che perde acqua da sotto o durante il lavaggio? Cause comuni e intervento idraulico per riparazioni.',
    keywords: ['lavatrice perde acqua', 'lavatrice perde', 'perdita lavatrice', 'lavatrice gocciola']
  },
  {
    slug: 'lavastoviglie-perde-acqua',
    title: 'Lavastoviglie Perde Acqua - Riparazione Perdite',
    h1: 'Lavastoviglie che Perde Acqua',
    description: 'Lavastoviglie che perde acqua da sotto la porta o dal tubo? Diagnosi e riparazione perdite lavastoviglie.',
    keywords: ['lavastoviglie perde acqua', 'lavastoviglie perde', 'perdita lavastoviglie', 'acqua sotto lavastoviglie']
  },
  // ============================================
  // NUOVE PROBLEMATICHE - Rubinetteria
  // ============================================
  {
    slug: 'miscelatore-che-perde',
    title: 'Miscelatore che Perde - Riparazione Rubinetto',
    h1: 'Miscelatore che Perde',
    description: 'Miscelatore doccia, lavandino o cucina che gocciola? Riparazione o sostituzione cartuccia miscelatore.',
    keywords: ['miscelatore che perde', 'miscelatore gocciola', 'riparare miscelatore', 'cartuccia miscelatore']
  },
  {
    slug: 'rubinetto-bloccato',
    title: 'Rubinetto Bloccato dal Calcare - Sblocco e Riparazione',
    h1: 'Rubinetto Bloccato',
    description: 'Rubinetto duro o bloccato dal calcare? Sblocco maniglia, sostituzione cartuccia e riparazione rubinetti incrostati.',
    keywords: ['rubinetto bloccato', 'rubinetto duro', 'rubinetto calcare', 'sbloccare rubinetto']
  },
  {
    slug: 'soffione-doccia-intasato',
    title: 'Soffione Doccia Intasato dal Calcare',
    h1: 'Soffione Doccia Intasato',
    description: 'Soffione doccia con getti ostruiti dal calcare? Pulizia professionale o sostituzione soffione e doccetta.',
    keywords: ['soffione intasato', 'soffione doccia calcare', 'doccetta intasata', 'pulire soffione']
  },
  {
    slug: 'aeratore-rubinetto-intasato',
    title: 'Aeratore Rubinetto Intasato - Pulizia e Sostituzione',
    h1: 'Aeratore Rubinetto Intasato',
    description: 'Aeratore (rompigetto) rubinetto otturato dal calcare? Pulizia o sostituzione per ripristinare flusso acqua normale.',
    keywords: ['aeratore intasato', 'rompigetto intasato', 'filtro rubinetto', 'acqua rubinetto debole']
  },
  // ============================================
  // NUOVE PROBLEMATICHE - Acqua e Pressione
  // ============================================
  {
    slug: 'acqua-marrone-rubinetto',
    title: 'Acqua Marrone dal Rubinetto - Cause e Soluzioni',
    h1: 'Acqua Marrone dal Rubinetto',
    description: 'Esce acqua marrone o gialla dal rubinetto? Cause: ruggine tubazioni, lavori acquedotto, e soluzioni.',
    keywords: ['acqua marrone rubinetto', 'acqua gialla', 'acqua sporca rubinetto', 'acqua arrugginita']
  },
  {
    slug: 'acqua-non-esce',
    title: 'Acqua Non Esce dal Rubinetto - Cause e Soluzioni',
    h1: 'Acqua Non Esce dal Rubinetto',
    description: 'Non esce acqua dal rubinetto? Cause: contatore chiuso, tubazioni gelate, guasti e come risolvere.',
    keywords: ['acqua non esce', 'rubinetto senza acqua', 'manca acqua', 'no acqua rubinetto']
  },
  {
    slug: 'tubazioni-gelate',
    title: 'Tubazioni Gelate - Scongelare Tubi Acqua',
    h1: 'Tubazioni Gelate: Cosa Fare',
    description: 'Tubi dell\'acqua gelati in inverno? Come scongelare tubazioni ghiacciate senza romperle e prevenire danni.',
    keywords: ['tubazioni gelate', 'tubi gelati', 'scongelare tubi', 'tubature ghiacciate']
  },
  {
    slug: 'colpo-ariete',
    title: 'Colpo d\'Ariete - Rumori Tubazioni Acqua',
    h1: 'Colpo d\'Ariete nelle Tubazioni',
    description: 'Rumori forti (botti) quando si chiude il rubinetto? Il colpo d\'ariete: cause, rischi e soluzioni.',
    keywords: ['colpo ariete', 'botti tubazioni', 'rumore tubi acqua', 'vibrazioni tubazioni']
  },
  {
    slug: 'gorgoglio-scarichi',
    title: 'Gorgoglio negli Scarichi - Cause Rumore',
    h1: 'Gorgoglio negli Scarichi',
    description: 'Gli scarichi fanno rumore di gorgoglio? Cause: sfiato mancante, intasamento parziale e soluzioni.',
    keywords: ['gorgoglio scarichi', 'rumore scarichi', 'scarico fa rumore', 'glu glu scarico']
  },
  // ============================================
  // NUOVE KEYWORD - Tipologie Edifici
  // ============================================
  {
    slug: 'idraulico-condominio',
    title: 'Idraulico per Condominio - Manutenzione Parti Comuni',
    h1: 'Idraulico per Condominio',
    description: 'Servizi idraulici per condomini: manutenzione colonne, autoclave condominiale, spurgo fognature e pronto intervento.',
    keywords: ['idraulico condominio', 'manutenzione condominio', 'colonne condominiali', 'autoclave condominio']
  },
  {
    slug: 'idraulico-ristorante',
    title: 'Idraulico per Ristoranti e Locali - Interventi Commerciali',
    h1: 'Idraulico per Ristoranti',
    description: 'Idraulico specializzato per ristoranti, bar e locali commerciali. Manutenzione cucine professionali e impianti.',
    keywords: ['idraulico ristorante', 'idraulico bar', 'idraulico commerciale', 'cucina professionale']
  },
  {
    slug: 'idraulico-ufficio',
    title: 'Idraulico per Uffici e Aziende - Interventi Business',
    h1: 'Idraulico per Uffici',
    description: 'Servizi idraulici per uffici e aziende: manutenzione bagni, impianti e pronto intervento per attività commerciali.',
    keywords: ['idraulico ufficio', 'idraulico azienda', 'idraulico business', 'manutenzione uffici']
  },
  {
    slug: 'idraulico-negozio',
    title: 'Idraulico per Negozi - Interventi Rapidi Attività',
    h1: 'Idraulico per Negozi',
    description: 'Pronto intervento idraulico per negozi e attività commerciali. Riparazioni rapide per non fermare l\'attività.',
    keywords: ['idraulico negozio', 'idraulico attività commerciale', 'idraulico negozi', 'emergenza negozio']
  },
  {
    slug: 'idraulico-hotel',
    title: 'Idraulico per Hotel e B&B - Assistenza Strutture Ricettive',
    h1: 'Idraulico per Hotel',
    description: 'Servizi idraulici per hotel, B&B e strutture ricettive. Manutenzione programmata e pronto intervento h24.',
    keywords: ['idraulico hotel', 'idraulico b&b', 'idraulico albergo', 'manutenzione hotel']
  },
  // ============================================
  // NUOVE KEYWORD - Marche Caldaie
  // ============================================
  {
    slug: 'assistenza-caldaia-vaillant',
    title: 'Assistenza Caldaia Vaillant - Riparazione e Manutenzione',
    h1: 'Assistenza Caldaia Vaillant',
    description: 'Centro assistenza caldaie Vaillant: manutenzione, riparazione guasti e ricambi originali. Tecnici qualificati.',
    keywords: ['assistenza vaillant', 'caldaia vaillant', 'riparazione vaillant', 'manutenzione vaillant']
  },
  {
    slug: 'assistenza-caldaia-baxi',
    title: 'Assistenza Caldaia Baxi - Riparazione e Manutenzione',
    h1: 'Assistenza Caldaia Baxi',
    description: 'Centro assistenza caldaie Baxi: manutenzione ordinaria, riparazione guasti e installazione. Tecnici certificati.',
    keywords: ['assistenza baxi', 'caldaia baxi', 'riparazione baxi', 'manutenzione baxi']
  },
  {
    slug: 'assistenza-caldaia-junkers',
    title: 'Assistenza Caldaia Junkers Bosch - Riparazione',
    h1: 'Assistenza Caldaia Junkers',
    description: 'Assistenza caldaie Junkers Bosch: manutenzione, riparazione e ricambi. Intervento rapido in tutta la città.',
    keywords: ['assistenza junkers', 'caldaia junkers', 'riparazione junkers', 'junkers bosch']
  },
  {
    slug: 'assistenza-caldaia-immergas',
    title: 'Assistenza Caldaia Immergas - Manutenzione e Riparazioni',
    h1: 'Assistenza Caldaia Immergas',
    description: 'Servizio assistenza caldaie Immergas: manutenzione annuale, riparazione guasti e sostituzione caldaie.',
    keywords: ['assistenza immergas', 'caldaia immergas', 'riparazione immergas', 'manutenzione immergas']
  },
  {
    slug: 'assistenza-caldaia-ariston',
    title: 'Assistenza Caldaia Ariston - Manutenzione e Riparazioni',
    h1: 'Assistenza Caldaia Ariston',
    description: 'Centro assistenza caldaie Ariston: manutenzione, riparazione e installazione. Ricambi originali garantiti.',
    keywords: ['assistenza ariston', 'caldaia ariston', 'riparazione ariston', 'manutenzione ariston']
  },
  {
    slug: 'assistenza-caldaia-beretta',
    title: 'Assistenza Caldaia Beretta - Manutenzione e Riparazioni',
    h1: 'Assistenza Caldaia Beretta',
    description: 'Assistenza tecnica caldaie Beretta: manutenzione ordinaria, riparazioni urgenti e sostituzione caldaia.',
    keywords: ['assistenza beretta', 'caldaia beretta', 'riparazione beretta', 'manutenzione beretta']
  },
  {
    slug: 'assistenza-caldaia-ferroli',
    title: 'Assistenza Caldaia Ferroli - Manutenzione e Riparazioni',
    h1: 'Assistenza Caldaia Ferroli',
    description: 'Servizio assistenza caldaie Ferroli: manutenzione, riparazione guasti e prima accensione. Tecnici abilitati.',
    keywords: ['assistenza ferroli', 'caldaia ferroli', 'riparazione ferroli', 'manutenzione ferroli']
  },
  {
    slug: 'assistenza-caldaia-riello',
    title: 'Assistenza Caldaia Riello - Manutenzione e Riparazioni',
    h1: 'Assistenza Caldaia Riello',
    description: 'Centro assistenza caldaie Riello: manutenzione programmata, riparazioni e installazione nuove caldaie.',
    keywords: ['assistenza riello', 'caldaia riello', 'riparazione riello', 'manutenzione riello']
  },
  // ============================================
  // SCALDABAGNI - MARCHE E PROBLEMI
  // ============================================
  {
    slug: 'assistenza-scaldabagno-ariston',
    title: 'Assistenza Scaldabagno Ariston - Riparazione e Manutenzione',
    h1: 'Assistenza Scaldabagno Ariston',
    description: 'Centro assistenza scaldabagni Ariston: riparazione guasti, sostituzione resistenza e anodo. Tecnici qualificati.',
    keywords: ['assistenza scaldabagno ariston', 'scaldabagno ariston', 'boiler ariston', 'riparazione ariston']
  },
  {
    slug: 'assistenza-scaldabagno-vaillant',
    title: 'Assistenza Scaldabagno Vaillant - Riparazione',
    h1: 'Assistenza Scaldabagno Vaillant',
    description: 'Assistenza scaldabagni Vaillant a gas ed elettrici. Manutenzione, riparazione e ricambi originali.',
    keywords: ['assistenza scaldabagno vaillant', 'scaldabagno vaillant', 'boiler vaillant']
  },
  {
    slug: 'assistenza-scaldabagno-junkers',
    title: 'Assistenza Scaldabagno Junkers Bosch',
    h1: 'Assistenza Scaldabagno Junkers',
    description: 'Servizio assistenza scaldabagni Junkers Bosch: riparazione, manutenzione e prima accensione.',
    keywords: ['assistenza scaldabagno junkers', 'scaldabagno junkers', 'boiler junkers bosch']
  },
  {
    slug: 'assistenza-scaldabagno-baxi',
    title: 'Assistenza Scaldabagno Baxi - Manutenzione',
    h1: 'Assistenza Scaldabagno Baxi',
    description: 'Centro assistenza scaldabagni Baxi: interventi rapidi per guasti, manutenzione e sostituzione.',
    keywords: ['assistenza scaldabagno baxi', 'scaldabagno baxi', 'boiler baxi']
  },
  {
    slug: 'scaldabagno-non-si-accende',
    title: 'Scaldabagno Non Si Accende - Cause e Soluzioni',
    h1: 'Scaldabagno Non Si Accende',
    description: 'Lo scaldabagno non si accende? Scopri le cause comuni e le soluzioni. Intervento tecnico rapido.',
    keywords: ['scaldabagno non si accende', 'boiler non parte', 'scaldabagno non funziona']
  },
  {
    slug: 'scaldabagno-non-scalda',
    title: 'Scaldabagno Non Scalda Acqua - Riparazione',
    h1: 'Scaldabagno Non Scalda',
    description: 'Scaldabagno che non scalda acqua? Cause: resistenza bruciata, termostato guasto. Intervento rapido.',
    keywords: ['scaldabagno non scalda', 'boiler acqua fredda', 'scaldabagno acqua tiepida']
  },
  {
    slug: 'scaldabagno-va-in-blocco',
    title: 'Scaldabagno Va in Blocco - Reset e Riparazione',
    h1: 'Scaldabagno Va in Blocco',
    description: 'Scaldabagno a gas che va in blocco? Come fare il reset e quando chiamare il tecnico.',
    keywords: ['scaldabagno in blocco', 'boiler bloccato', 'reset scaldabagno']
  },
  {
    slug: 'sostituzione-resistenza-scaldabagno',
    title: 'Sostituzione Resistenza Scaldabagno Elettrico',
    h1: 'Sostituzione Resistenza Scaldabagno',
    description: 'Cambio resistenza scaldabagno elettrico. Intervento professionale con ricambi originali.',
    keywords: ['resistenza scaldabagno', 'cambio resistenza boiler', 'sostituzione resistenza']
  },
  {
    slug: 'sostituzione-anodo-scaldabagno',
    title: 'Sostituzione Anodo Scaldabagno - Manutenzione',
    h1: 'Sostituzione Anodo Scaldabagno',
    description: 'Cambio anodo di magnesio scaldabagno per prevenire corrosione. Manutenzione preventiva importante.',
    keywords: ['anodo scaldabagno', 'anodo magnesio', 'cambio anodo boiler']
  },
  // ============================================
  // CONDIZIONATORI E CLIMATIZZAZIONE
  // ============================================
  {
    slug: 'installazione-condizionatore',
    title: 'Installazione Condizionatore - Montaggio Split',
    h1: 'Installazione Condizionatore',
    description: 'Installazione condizionatori mono e multi split. Montaggio professionale, predisposizione e collaudo.',
    keywords: ['installazione condizionatore', 'montaggio climatizzatore', 'installazione split']
  },
  {
    slug: 'manutenzione-condizionatore',
    title: 'Manutenzione Condizionatore - Pulizia e Ricarica',
    h1: 'Manutenzione Condizionatore',
    description: 'Manutenzione condizionatori: pulizia filtri, sanificazione e ricarica gas refrigerante.',
    keywords: ['manutenzione condizionatore', 'pulizia condizionatore', 'ricarica gas condizionatore']
  },
  {
    slug: 'condizionatore-non-raffredda',
    title: 'Condizionatore Non Raffredda - Cause e Soluzioni',
    h1: 'Condizionatore Non Raffredda',
    description: 'Il condizionatore non raffredda? Cause: gas esaurito, filtri sporchi, guasti. Intervento tecnico.',
    keywords: ['condizionatore non raffredda', 'climatizzatore non funziona', 'aria condizionata calda']
  },
  {
    slug: 'condizionatore-perde-acqua',
    title: 'Condizionatore Perde Acqua - Riparazione',
    h1: 'Condizionatore Perde Acqua',
    description: 'Condizionatore che gocciola o perde acqua dentro casa? Pulizia scarico condensa e riparazione.',
    keywords: ['condizionatore perde acqua', 'climatizzatore gocciola', 'condensa condizionatore']
  },
  {
    slug: 'condizionatore-rumoroso',
    title: 'Condizionatore Rumoroso - Cause Rumori',
    h1: 'Condizionatore Rumoroso',
    description: 'Condizionatore che fa rumore? Vibrazioni, fischi e ronzii: cause e soluzioni.',
    keywords: ['condizionatore rumoroso', 'climatizzatore rumore', 'condizionatore vibra']
  },
  {
    slug: 'ricarica-gas-condizionatore',
    title: 'Ricarica Gas Condizionatore - R410A R32',
    h1: 'Ricarica Gas Condizionatore',
    description: 'Ricarica gas refrigerante condizionatore R410A e R32. Controllo perdite e rabbocco gas.',
    keywords: ['ricarica gas condizionatore', 'gas climatizzatore', 'r410a', 'r32']
  },
  // ============================================
  // POMPE DI CALORE
  // ============================================
  {
    slug: 'installazione-pompa-calore',
    title: 'Installazione Pompa di Calore - Aria Acqua',
    h1: 'Installazione Pompa di Calore',
    description: 'Installazione pompe di calore aria-acqua e aria-aria. Riscaldamento efficiente con incentivi fiscali.',
    keywords: ['installazione pompa calore', 'pompa di calore', 'pompa calore aria acqua']
  },
  {
    slug: 'manutenzione-pompa-calore',
    title: 'Manutenzione Pompa di Calore - Assistenza',
    h1: 'Manutenzione Pompa di Calore',
    description: 'Manutenzione ordinaria pompe di calore: controllo pressioni, pulizia filtri e verifica efficienza.',
    keywords: ['manutenzione pompa calore', 'assistenza pompa calore', 'revisione pompa calore']
  },
  {
    slug: 'pompa-calore-non-funziona',
    title: 'Pompa di Calore Non Funziona - Riparazione',
    h1: 'Pompa di Calore Non Funziona',
    description: 'Pompa di calore guasta o che non scalda? Diagnosi e riparazione con tecnici specializzati.',
    keywords: ['pompa calore non funziona', 'pompa calore guasta', 'pompa calore non scalda']
  },
  // ============================================
  // PANNELLI SOLARI TERMICI
  // ============================================
  {
    slug: 'installazione-pannelli-solari-termici',
    title: 'Installazione Pannelli Solari Termici',
    h1: 'Installazione Pannelli Solari Termici',
    description: 'Installazione impianti solari termici per acqua calda sanitaria. Risparmio energetico garantito.',
    keywords: ['pannelli solari termici', 'solare termico', 'acqua calda solare']
  },
  {
    slug: 'manutenzione-pannelli-solari',
    title: 'Manutenzione Pannelli Solari Termici',
    h1: 'Manutenzione Pannelli Solari',
    description: 'Manutenzione impianti solari termici: controllo glicole, pulizia pannelli e verifica circolatore.',
    keywords: ['manutenzione solare termico', 'pulizia pannelli solari', 'controllo impianto solare']
  },
  // ============================================
  // RISCALDAMENTO A PAVIMENTO
  // ============================================
  {
    slug: 'riscaldamento-pavimento',
    title: 'Riscaldamento a Pavimento - Installazione',
    h1: 'Riscaldamento a Pavimento',
    description: 'Installazione impianti riscaldamento a pavimento radiante. Comfort e risparmio energetico.',
    keywords: ['riscaldamento pavimento', 'pavimento radiante', 'impianto a pavimento']
  },
  {
    slug: 'manutenzione-riscaldamento-pavimento',
    title: 'Manutenzione Riscaldamento a Pavimento',
    h1: 'Manutenzione Pavimento Radiante',
    description: 'Manutenzione impianti a pavimento: lavaggio serpentine, controllo collettori e bilanciamento.',
    keywords: ['manutenzione pavimento radiante', 'lavaggio serpentine', 'pulizia riscaldamento pavimento']
  },
  {
    slug: 'riscaldamento-pavimento-non-scalda',
    title: 'Riscaldamento a Pavimento Non Scalda',
    h1: 'Pavimento Radiante Non Scalda',
    description: 'Il riscaldamento a pavimento non funziona? Cause: aria nel circuito, pompa guasta, valvole.',
    keywords: ['pavimento radiante non scalda', 'riscaldamento pavimento freddo', 'pavimento non riscalda']
  },
  // ============================================
  // VALVOLE E REGOLAZIONE
  // ============================================
  {
    slug: 'installazione-valvole-termostatiche',
    title: 'Installazione Valvole Termostatiche Termosifoni',
    h1: 'Installazione Valvole Termostatiche',
    description: 'Installazione valvole termostatiche su termosifoni per risparmio energetico e comfort.',
    keywords: ['valvole termostatiche', 'installazione valvole', 'valvole termosifoni']
  },
  {
    slug: 'valvola-termostatica-bloccata',
    title: 'Valvola Termostatica Bloccata - Sblocco',
    h1: 'Valvola Termostatica Bloccata',
    description: 'Valvola termostatica del termosifone bloccata? Come sbloccarla e quando sostituirla.',
    keywords: ['valvola termostatica bloccata', 'sbloccare valvola', 'valvola termosifone dura']
  },
  {
    slug: 'sostituzione-valvola-radiatore',
    title: 'Sostituzione Valvola Radiatore - Cambio',
    h1: 'Sostituzione Valvola Radiatore',
    description: 'Cambio valvole radiatore e detentori. Sostituzione valvole che perdono o non regolano.',
    keywords: ['sostituzione valvola radiatore', 'cambio valvola termosifone', 'valvola perde']
  },
  // ============================================
  // TERMOSIFONI E RADIATORI
  // ============================================
  {
    slug: 'installazione-termosifone',
    title: 'Installazione Termosifone - Montaggio Radiatore',
    h1: 'Installazione Termosifone',
    description: 'Installazione termosifoni e radiatori in alluminio, ghisa e acciaio. Montaggio professionale.',
    keywords: ['installazione termosifone', 'montaggio radiatore', 'aggiungere termosifone']
  },
  {
    slug: 'sostituzione-termosifone',
    title: 'Sostituzione Termosifone - Cambio Radiatore',
    h1: 'Sostituzione Termosifone',
    description: 'Sostituzione termosifoni vecchi con nuovi radiatori design. Smontaggio e montaggio inclusi.',
    keywords: ['sostituzione termosifone', 'cambio radiatore', 'sostituire calorifero']
  },
  {
    slug: 'termosifone-perde-acqua',
    title: 'Termosifone Perde Acqua - Riparazione',
    h1: 'Termosifone che Perde Acqua',
    description: 'Termosifone che perde acqua dalla valvola o dal corpo? Riparazione rapida o sostituzione.',
    keywords: ['termosifone perde', 'radiatore perde acqua', 'calorifero gocciola']
  },
  {
    slug: 'termosifone-rumoroso',
    title: 'Termosifone Rumoroso - Gorgoglii e Ticchettii',
    h1: 'Termosifone Rumoroso',
    description: 'Termosifone che gorgoglia o fa rumore? Cause: aria nel circuito, dilatazione, fango.',
    keywords: ['termosifone rumoroso', 'radiatore rumore', 'termosifone gorgoglia', 'calorifero ticchetta']
  },
  {
    slug: 'verniciatura-termosifoni',
    title: 'Verniciatura Termosifoni - Ripristino Radiatori',
    h1: 'Verniciatura Termosifoni',
    description: 'Verniciatura e ripristino termosifoni arrugginiti o rovinati. Sabbiatura e verniciatura professionale.',
    keywords: ['verniciatura termosifoni', 'verniciare radiatore', 'ripristino caloriferi']
  },
  // ============================================
  // GAS E SICUREZZA
  // ============================================
  {
    slug: 'installazione-impianto-gas',
    title: 'Installazione Impianto Gas Metano - A Norma',
    h1: 'Installazione Impianto Gas',
    description: 'Realizzazione impianti gas metano e GPL a norma. Certificazione di conformità inclusa.',
    keywords: ['impianto gas', 'installazione gas metano', 'impianto gas cucina']
  },
  {
    slug: 'riparazione-perdita-gas',
    title: 'Riparazione Perdita Gas - Intervento Urgente',
    h1: 'Perdita Gas: Intervento Urgente',
    description: 'Senti odore di gas? Intervento urgente per riparare perdite gas. Ricerca fughe e riparazione.',
    keywords: ['perdita gas', 'fuga gas', 'odore gas', 'riparazione gas']
  },
  {
    slug: 'prova-tenuta-impianto-gas',
    title: 'Prova Tenuta Impianto Gas - Verifica Fughe',
    h1: 'Prova Tenuta Impianto Gas',
    description: 'Verifica tenuta impianto gas con rilascio certificazione. Controllo obbligatorio per sicurezza.',
    keywords: ['prova tenuta gas', 'verifica impianto gas', 'controllo fughe gas']
  },
  {
    slug: 'certificazione-impianto-gas',
    title: 'Certificazione Impianto Gas - Dichiarazione Conformità',
    h1: 'Certificazione Impianto Gas',
    description: 'Rilascio certificazione di conformità impianto gas. Adeguamento impianti non a norma.',
    keywords: ['certificazione gas', 'dichiarazione conformità gas', 'impianto gas a norma']
  },
  {
    slug: 'sostituzione-tubo-gas',
    title: 'Sostituzione Tubo Gas Cucina - Flessibile Gas',
    h1: 'Sostituzione Tubo Gas',
    description: 'Cambio tubo flessibile gas cucina e piano cottura. Tubi a norma con data di scadenza.',
    keywords: ['tubo gas cucina', 'flessibile gas', 'sostituzione tubo gas', 'tubo gas scaduto']
  },
  {
    slug: 'installazione-rilevatore-gas',
    title: 'Installazione Rilevatore Gas - Sicurezza Casa',
    h1: 'Installazione Rilevatore Gas',
    description: 'Installazione rilevatori fughe gas metano e GPL per sicurezza domestica. Sensori certificati.',
    keywords: ['rilevatore gas', 'sensore gas', 'allarme gas', 'sicurezza gas']
  },
  // ============================================
  // CONTATORI E ALLACCI
  // ============================================
  {
    slug: 'allaccio-acqua',
    title: 'Allaccio Acqua - Nuova Utenza Acquedotto',
    h1: 'Allaccio Acqua',
    description: 'Pratica e realizzazione allaccio acqua alla rete idrica. Nuove utenze e spostamento contatori.',
    keywords: ['allaccio acqua', 'nuova utenza acqua', 'allaccio acquedotto']
  },
  {
    slug: 'allaccio-fognatura',
    title: 'Allaccio Fognatura - Collegamento Rete Fognaria',
    h1: 'Allaccio Fognatura',
    description: 'Realizzazione allaccio fognatura alla rete comunale. Scavi, posa tubi e collaudo.',
    keywords: ['allaccio fognatura', 'collegamento fogna', 'allaccio scarichi']
  },
  {
    slug: 'spostamento-contatore-acqua',
    title: 'Spostamento Contatore Acqua - Riposizionamento',
    h1: 'Spostamento Contatore Acqua',
    description: 'Spostamento contatore acqua in altra posizione. Pratica, lavori idraulici e collaudo.',
    keywords: ['spostamento contatore', 'spostare contatore acqua', 'riposizionamento contatore']
  },
  {
    slug: 'installazione-sottocontatore',
    title: 'Installazione Sottocontatore Acqua - Condominiale',
    h1: 'Installazione Sottocontatore',
    description: 'Installazione sottocontatori acqua per ripartizione consumi condominiali. Lettura individuale.',
    keywords: ['sottocontatore', 'contatore individuale', 'contabilizzazione acqua']
  },
  // ============================================
  // BAGNO COMPLETO
  // ============================================
  {
    slug: 'ristrutturazione-bagno',
    title: 'Ristrutturazione Bagno Completa - Preventivo',
    h1: 'Ristrutturazione Bagno',
    description: 'Ristrutturazione bagno completa chiavi in mano. Demolizione, impianti, rivestimenti e sanitari.',
    keywords: ['ristrutturazione bagno', 'rifacimento bagno', 'bagno nuovo', 'rifare bagno']
  },
  {
    slug: 'secondo-bagno',
    title: 'Realizzazione Secondo Bagno - Nuovo Bagno',
    h1: 'Realizzazione Secondo Bagno',
    description: 'Creazione secondo bagno in casa. Verifica fattibilità, impianti e realizzazione completa.',
    keywords: ['secondo bagno', 'nuovo bagno', 'aggiungere bagno', 'bagno aggiuntivo']
  },
  {
    slug: 'bagno-per-disabili',
    title: 'Bagno per Disabili - Accessibilità e Normativa',
    h1: 'Bagno per Disabili',
    description: 'Realizzazione e adeguamento bagni per disabili a norma. Sanitari, maniglioni e accessori.',
    keywords: ['bagno disabili', 'bagno accessibile', 'bagno anziani', 'bagno barriere architettoniche']
  },
  {
    slug: 'sanitari-sospesi',
    title: 'Installazione Sanitari Sospesi - WC e Bidet',
    h1: 'Installazione Sanitari Sospesi',
    description: 'Montaggio sanitari sospesi con cassetta incasso. WC, bidet e lavabo a parete.',
    keywords: ['sanitari sospesi', 'wc sospeso', 'bidet sospeso', 'cassetta incasso']
  },
  {
    slug: 'sostituzione-sanitari',
    title: 'Sostituzione Sanitari Bagno - Cambio WC Bidet',
    h1: 'Sostituzione Sanitari',
    description: 'Sostituzione sanitari bagno: WC, bidet, lavabo. Smontaggio vecchi e montaggio nuovi.',
    keywords: ['sostituzione sanitari', 'cambio wc', 'cambio bidet', 'nuovi sanitari']
  },
  // ============================================
  // CUCINA E ELETTRODOMESTICI
  // ============================================
  {
    slug: 'impianto-idraulico-cucina',
    title: 'Impianto Idraulico Cucina - Realizzazione',
    h1: 'Impianto Idraulico Cucina',
    description: 'Realizzazione impianto idraulico cucina per lavello, lavastoviglie e piano cottura gas.',
    keywords: ['impianto cucina', 'idraulico cucina', 'scarico cucina', 'attacchi cucina']
  },
  {
    slug: 'spostamento-lavello',
    title: 'Spostamento Lavello Cucina - Riposizionamento',
    h1: 'Spostamento Lavello Cucina',
    description: 'Spostamento lavello cucina in altra posizione. Modifica scarichi e attacchi acqua.',
    keywords: ['spostamento lavello', 'spostare lavello', 'riposizionare lavello']
  },
  {
    slug: 'installazione-trituratore',
    title: 'Installazione Trituratore WC - Sanitrit',
    h1: 'Installazione Trituratore',
    description: 'Installazione trituratori per WC e sanitari dove manca la pendenza fognaria. Tipo Sanitrit.',
    keywords: ['trituratore wc', 'sanitrit', 'wc con trituratore', 'pompa trituratore']
  },
  {
    slug: 'riparazione-trituratore',
    title: 'Riparazione Trituratore WC - Assistenza',
    h1: 'Riparazione Trituratore',
    description: 'Riparazione trituratori WC bloccati o guasti. Assistenza Sanitrit e marche compatibili.',
    keywords: ['riparazione trituratore', 'trituratore bloccato', 'assistenza sanitrit']
  },
  // ============================================
  // ESTERNI E GIARDINO
  // ============================================
  {
    slug: 'impianto-irrigazione-interrato',
    title: 'Impianto Irrigazione Interrato - Giardino',
    h1: 'Impianto Irrigazione Interrato',
    description: 'Progettazione e installazione impianto irrigazione interrato automatico per giardini.',
    keywords: ['irrigazione interrata', 'impianto irrigazione giardino', 'irrigazione automatica']
  },
  {
    slug: 'riparazione-irrigazione',
    title: 'Riparazione Impianto Irrigazione - Manutenzione',
    h1: 'Riparazione Irrigazione',
    description: 'Riparazione impianti irrigazione: elettrovalvole, programmatore, irrigatori rotti.',
    keywords: ['riparazione irrigazione', 'irrigatore rotto', 'elettrovalvola guasta']
  },
  {
    slug: 'installazione-fontana',
    title: 'Installazione Fontana Giardino - Allaccio Acqua',
    h1: 'Installazione Fontana',
    description: 'Installazione fontane da giardino e rubinetti esterni con allaccio idraulico.',
    keywords: ['fontana giardino', 'rubinetto esterno', 'punto acqua giardino']
  },
  {
    slug: 'impianto-idrico-piscina',
    title: 'Impianto Idrico Piscina - Installazione',
    h1: 'Impianto Idrico Piscina',
    description: 'Realizzazione impianti idraulici per piscine: filtrazione, ricircolo, riscaldamento acqua.',
    keywords: ['impianto piscina', 'idraulica piscina', 'filtrazione piscina']
  },
  {
    slug: 'scarico-condensa-condizionatore',
    title: 'Scarico Condensa Condizionatore - Canalizzazione',
    h1: 'Scarico Condensa Condizionatore',
    description: 'Realizzazione scarico condensa climatizzatori in fognatura o raccolta. Evita gocciolamenti.',
    keywords: ['scarico condensa', 'condensa condizionatore', 'tubo scarico condensa']
  },
  // ============================================
  // PROBLEMI SPECIFICI AVANZATI
  // ============================================
  {
    slug: 'perdita-occulta',
    title: 'Perdita Acqua Occulta - Ricerca con Strumenti',
    h1: 'Perdita Acqua Occulta',
    description: 'Ricerca perdite acqua occulte con termocamera, geofono e gas tracciante. Tecnologie non invasive.',
    keywords: ['perdita occulta', 'perdita nascosta', 'ricerca perdite', 'perdita non visibile']
  },
  {
    slug: 'infiltrazione-dal-terrazzo',
    title: 'Infiltrazione dal Terrazzo - Riparazione',
    h1: 'Infiltrazione dal Terrazzo',
    description: 'Infiltrazioni acqua dal terrazzo o balcone? Ricerca causa e riparazione impermeabilizzazione.',
    keywords: ['infiltrazione terrazzo', 'perdita terrazzo', 'balcone che perde']
  },
  {
    slug: 'infiltrazione-dal-tetto',
    title: 'Infiltrazione dal Tetto - Ricerca Perdite',
    h1: 'Infiltrazione dal Tetto',
    description: 'Infiltrazioni acqua dal tetto? Ricerca punto di ingresso acqua e riparazione.',
    keywords: ['infiltrazione tetto', 'perdita tetto', 'tetto che perde']
  },
  {
    slug: 'umidita-risalita',
    title: 'Umidità di Risalita - Cause e Soluzioni',
    h1: 'Umidità di Risalita',
    description: 'Problemi di umidità di risalita nei muri? Diagnosi cause e soluzioni professionali.',
    keywords: ['umidità risalita', 'muri umidi', 'umidità capillare', 'muffa muri']
  },
  {
    slug: 'contaminazione-acqua',
    title: 'Contaminazione Acqua Potabile - Analisi',
    h1: 'Contaminazione Acqua',
    description: 'Sospetti contaminazione acqua potabile? Analisi qualità acqua e bonifica tubazioni.',
    keywords: ['acqua contaminata', 'qualità acqua', 'analisi acqua', 'acqua non potabile']
  },
  {
    slug: 'legionella-impianti',
    title: 'Prevenzione Legionella Impianti Idrici',
    h1: 'Prevenzione Legionella',
    description: 'Prevenzione e bonifica legionella negli impianti idrici. Disinfezione e trattamento.',
    keywords: ['legionella', 'prevenzione legionella', 'bonifica legionella', 'disinfezione impianti']
  },
  // ============================================
  // EMERGENZE SPECIFICHE
  // ============================================
  {
    slug: 'rottura-tubo-incassato',
    title: 'Rottura Tubo Incassato - Riparazione Urgente',
    h1: 'Tubo Incassato Rotto',
    description: 'Tubo incassato nel muro rotto? Intervento urgente con minima demolizione.',
    keywords: ['tubo incassato rotto', 'tubo nel muro', 'rottura tubo muro']
  },
  {
    slug: 'allagamento-seminterrato',
    title: 'Allagamento Seminterrato - Pronto Intervento',
    h1: 'Allagamento Seminterrato',
    description: 'Seminterrato o taverna allagati? Aspirazione acqua, ricerca causa e prevenzione.',
    keywords: ['allagamento seminterrato', 'taverna allagata', 'seminterrato acqua']
  },
  {
    slug: 'blocco-colonna-condominiale',
    title: 'Blocco Colonna Condominiale - Disostruzione',
    h1: 'Colonna Condominiale Bloccata',
    description: 'Colonna di scarico condominiale intasata? Disostruzione urgente per tutto il palazzo.',
    keywords: ['colonna condominiale', 'scarico condominio', 'blocco colonna']
  },
  {
    slug: 'riflusso-fognatura',
    title: 'Riflusso Fognatura - Risalita Acqua Nera',
    h1: 'Riflusso Fognatura',
    description: 'Acqua nera che risale dagli scarichi? Intervento urgente per riflusso fognario.',
    keywords: ['riflusso fognatura', 'risalita fogna', 'acqua nera scarichi']
  },
  // ============================================
  // COSTI SPECIFICI
  // ============================================
  {
    slug: 'costo-installazione-caldaia',
    title: 'Costo Installazione Caldaia a Condensazione 2025',
    h1: 'Costo Installazione Caldaia',
    description: 'Quanto costa installare una caldaia a condensazione? Prezzi medi, detrazioni e preventivi.',
    keywords: ['costo caldaia', 'prezzo caldaia condensazione', 'quanto costa caldaia']
  },
  {
    slug: 'costo-ristrutturazione-bagno',
    title: 'Costo Ristrutturazione Bagno Completo 2025',
    h1: 'Costo Ristrutturazione Bagno',
    description: 'Quanto costa rifare il bagno? Prezzi al mq per ristrutturazione bagno completa.',
    keywords: ['costo bagno', 'prezzo ristrutturazione bagno', 'quanto costa rifare bagno']
  },
  {
    slug: 'costo-impianto-idraulico',
    title: 'Costo Impianto Idraulico Nuovo 2025',
    h1: 'Costo Impianto Idraulico',
    description: 'Quanto costa un impianto idraulico nuovo? Prezzi per casa e appartamento.',
    keywords: ['costo impianto idraulico', 'prezzo impianto acqua', 'quanto costa impianto']
  },
  {
    slug: 'costo-disostruzione',
    title: 'Costo Disostruzione Scarichi e WC 2025',
    h1: 'Costo Disostruzione',
    description: 'Quanto costa sturare uno scarico o WC? Prezzi disostruzione lavandino, doccia e fogna.',
    keywords: ['costo disostruzione', 'prezzo sturare wc', 'costo sturare scarico']
  },
  {
    slug: 'costo-termosifone',
    title: 'Costo Installazione Termosifone 2025',
    h1: 'Costo Termosifone Nuovo',
    description: 'Quanto costa aggiungere o sostituire un termosifone? Prezzi radiatori e manodopera.',
    keywords: ['costo termosifone', 'prezzo radiatore', 'quanto costa calorifero']
  },
  {
    slug: 'costo-boiler',
    title: 'Costo Scaldabagno Nuovo - Installazione 2025',
    h1: 'Costo Scaldabagno',
    description: 'Quanto costa uno scaldabagno nuovo? Prezzi boiler elettrico e a gas con installazione.',
    keywords: ['costo scaldabagno', 'prezzo boiler', 'quanto costa boiler']
  },
  {
    slug: 'costo-condizionatore',
    title: 'Costo Installazione Condizionatore 2025',
    h1: 'Costo Condizionatore',
    description: 'Quanto costa installare un condizionatore? Prezzi climatizzatori mono e multi split.',
    keywords: ['costo condizionatore', 'prezzo climatizzatore', 'quanto costa split']
  },
  {
    slug: 'costo-pompa-calore',
    title: 'Costo Pompa di Calore - Prezzi 2025',
    h1: 'Costo Pompa di Calore',
    description: 'Quanto costa una pompa di calore? Prezzi aria-acqua, aria-aria e incentivi.',
    keywords: ['costo pompa calore', 'prezzo pompa calore', 'quanto costa pompa calore']
  },
  // ============================================
  // SERVIZI PER PROFESSIONISTI
  // ============================================
  {
    slug: 'idraulico-cantiere',
    title: 'Idraulico per Cantieri Edili - Imprese',
    h1: 'Idraulico per Cantieri',
    description: 'Servizi idraulici per cantieri edili e imprese di costruzione. Impianti completi.',
    keywords: ['idraulico cantiere', 'idraulico impresa edile', 'impianti cantiere']
  },
  {
    slug: 'idraulico-impresa',
    title: 'Idraulico per Imprese - Manutenzione Programmata',
    h1: 'Idraulico per Imprese',
    description: 'Servizi idraulici per aziende con contratti di manutenzione programmata.',
    keywords: ['idraulico impresa', 'manutenzione aziendale', 'idraulico azienda']
  },
  {
    slug: 'idraulico-amministratore',
    title: 'Idraulico per Amministratori Condominio',
    h1: 'Idraulico per Amministratori',
    description: 'Servizi idraulici dedicati ad amministratori di condominio. Pronto intervento e manutenzione.',
    keywords: ['idraulico amministratore', 'idraulico condominio', 'manutenzione condominiale']
  },
  // ============================================
  // SOLUZIONI SMART E RISPARMIO
  // ============================================
  {
    slug: 'risparmio-acqua',
    title: 'Risparmio Acqua Casa - Soluzioni e Dispositivi',
    h1: 'Risparmio Acqua in Casa',
    description: 'Soluzioni per risparmiare acqua: riduttori flusso, rubinetti temporizzati, recupero acqua.',
    keywords: ['risparmio acqua', 'ridurre consumi acqua', 'dispositivi risparmio']
  },
  {
    slug: 'domotica-idraulica',
    title: 'Domotica Idraulica - Impianti Smart',
    h1: 'Domotica Idraulica',
    description: 'Impianti idraulici smart: sensori perdite, valvole motorizzate, controllo remoto.',
    keywords: ['domotica idraulica', 'impianto smart', 'sensori perdite', 'valvola wifi']
  },
  {
    slug: 'sensore-allagamento',
    title: 'Installazione Sensore Allagamento - Protezione',
    h1: 'Sensore Allagamento',
    description: 'Installazione sensori allagamento con allarme e chiusura automatica acqua.',
    keywords: ['sensore allagamento', 'allarme acqua', 'protezione allagamento']
  },
  // ============================================
  // MATERIALI E TIPOLOGIE
  // ============================================
  {
    slug: 'tubazioni-multistrato',
    title: 'Tubazioni Multistrato - Installazione',
    h1: 'Impianti in Multistrato',
    description: 'Realizzazione impianti idraulici in tubo multistrato. Vantaggi e applicazioni.',
    keywords: ['multistrato', 'tubo multistrato', 'impianto multistrato']
  },
  {
    slug: 'tubazioni-rame',
    title: 'Tubazioni in Rame - Installazione e Riparazione',
    h1: 'Impianti in Rame',
    description: 'Impianti idraulici in tubo di rame. Installazione, saldatura e riparazione.',
    keywords: ['tubo rame', 'impianto rame', 'saldatura rame']
  },
  {
    slug: 'tubazioni-polietilene',
    title: 'Tubazioni in Polietilene - Acqua Interrata',
    h1: 'Tubazioni Polietilene',
    description: 'Posa tubazioni in polietilene per acqua interrata. Allacci e riparazioni.',
    keywords: ['polietilene', 'tubo pead', 'tubazione interrata']
  },
  // ============================================
  // DETRAZIONI E BONUS
  // ============================================
  {
    slug: 'bonus-caldaia',
    title: 'Bonus Caldaia 2025 - Detrazioni e Incentivi',
    h1: 'Bonus Caldaia 2025',
    description: 'Guida al bonus caldaia: detrazioni fiscali, ecobonus e incentivi per sostituzione.',
    keywords: ['bonus caldaia', 'detrazione caldaia', 'ecobonus caldaia', 'incentivi caldaia']
  },
  {
    slug: 'bonus-ristrutturazione-bagno',
    title: 'Bonus Ristrutturazione Bagno 2025',
    h1: 'Bonus Bagno 2025',
    description: 'Detrazioni per ristrutturazione bagno: bonus 50%, requisiti e come ottenerlo.',
    keywords: ['bonus bagno', 'detrazione bagno', 'bonus ristrutturazione']
  },
  {
    slug: 'superbonus-impianti',
    title: 'Superbonus Impianti Termici 2025',
    h1: 'Superbonus Impianti',
    description: 'Guida al Superbonus per impianti termici: pompe di calore, caldaie, cappotto.',
    keywords: ['superbonus', 'bonus 110', 'superbonus impianti']
  },
  // ============================================
  // PROBLEMI STAGIONALI
  // ============================================
  {
    slug: 'preparazione-inverno-impianti',
    title: 'Preparazione Impianti per Inverno - Manutenzione',
    h1: 'Preparazione Impianti Inverno',
    description: 'Manutenzione impianti prima dell\'inverno: caldaia, termosifoni, antigelo.',
    keywords: ['manutenzione inverno', 'preparazione caldaia', 'controllo inverno']
  },
  {
    slug: 'riattivazione-impianto-riscaldamento',
    title: 'Riattivazione Impianto Riscaldamento - Stagionale',
    h1: 'Riattivazione Riscaldamento',
    description: 'Riattivazione impianto riscaldamento dopo estate. Controlli e manutenzione.',
    keywords: ['riattivazione riscaldamento', 'accensione caldaia', 'avvio riscaldamento']
  },
  {
    slug: 'chiusura-impianto-irrigazione',
    title: 'Chiusura Impianto Irrigazione Invernale',
    h1: 'Chiusura Irrigazione Inverno',
    description: 'Svuotamento e chiusura impianto irrigazione per inverno. Protezione antigelo.',
    keywords: ['chiusura irrigazione', 'svuotamento irrigazione', 'winterizzazione']
  },
  {
    slug: 'manutenzione-estiva-caldaia',
    title: 'Manutenzione Caldaia Estate - Controllo Annuale',
    h1: 'Manutenzione Caldaia Estate',
    description: 'Manutenzione caldaia in estate: momento ideale per revisione annuale.',
    keywords: ['manutenzione estate', 'revisione caldaia', 'controllo caldaia estate']
  },
  // ============================================
  // DOMANDE FREQUENTI E GUIDE
  // ============================================
  {
    slug: 'come-chiudere-acqua',
    title: 'Come Chiudere l\'Acqua di Casa - Guida',
    h1: 'Come Chiudere l\'Acqua',
    description: 'Dove si trova il rubinetto generale dell\'acqua? Guida per chiudere l\'acqua in emergenza.',
    keywords: ['chiudere acqua', 'rubinetto generale', 'chiudere acqua casa']
  },
  {
    slug: 'come-sturare-wc',
    title: 'Come Sturare il WC - Metodi Fai da Te',
    h1: 'Come Sturare il WC',
    description: 'WC intasato? Metodi casalinghi per sturare il water prima di chiamare l\'idraulico.',
    keywords: ['sturare wc', 'wc intasato fai da te', 'sturalavandini wc']
  },
  {
    slug: 'come-svitare-rubinetto',
    title: 'Come Svitare Rubinetto Bloccato - Guida',
    h1: 'Svitare Rubinetto Bloccato',
    description: 'Rubinetto bloccato dal calcare? Tecniche per svitare rubinetti e raccordi ossidati.',
    keywords: ['svitare rubinetto', 'rubinetto bloccato', 'sbloccare raccordo']
  },
  {
    slug: 'come-leggere-contatore-acqua',
    title: 'Come Leggere Contatore Acqua - Guida',
    h1: 'Leggere Contatore Acqua',
    description: 'Come si legge il contatore dell\'acqua? Guida pratica per autolettura e controllo consumi.',
    keywords: ['leggere contatore', 'autolettura acqua', 'contatore acqua lettura']
  },
  {
    slug: 'come-aumentare-pressione-acqua',
    title: 'Come Aumentare Pressione Acqua - Soluzioni',
    h1: 'Aumentare Pressione Acqua',
    description: 'Pressione acqua bassa in casa? Tutte le soluzioni: autoclave, riduttore, pompe.',
    keywords: ['aumentare pressione', 'più pressione acqua', 'poca pressione rubinetto']
  },
  // ============================================
  // QUARTIERI E ZONE SPECIFICHE
  // ============================================
  {
    slug: 'idraulico-centro-storico',
    title: 'Idraulico Centro Storico - Edifici Storici',
    h1: 'Idraulico Centro Storico',
    description: 'Idraulico specializzato in centri storici e palazzi d\'epoca. Interventi rispettosi.',
    keywords: ['idraulico centro storico', 'palazzo storico', 'edifici antichi']
  },
  {
    slug: 'idraulico-zona-industriale',
    title: 'Idraulico Zona Industriale - Capannoni',
    h1: 'Idraulico Zona Industriale',
    description: 'Servizi idraulici per zone industriali, capannoni e magazzini. Impianti industriali.',
    keywords: ['idraulico industriale', 'impianti capannone', 'idraulico magazzino']
  },
  {
    slug: 'idraulico-nuovo-quartiere',
    title: 'Idraulico Nuove Costruzioni - Cantieri',
    h1: 'Idraulico Nuove Costruzioni',
    description: 'Impianti idraulici per nuove costruzioni e lottizzazioni. Prima installazione.',
    keywords: ['nuove costruzioni', 'impianti nuovi', 'idraulico cantiere nuovo']
  },
  // ============================================
  // PROBLEMI WC E SANITARI SPECIFICI
  // ============================================
  {
    slug: 'wc-non-scarica',
    title: 'WC Non Scarica - Riparazione Urgente',
    h1: 'WC Non Scarica',
    description: 'Il WC non scarica bene? Cause e soluzioni per lo scarico lento o assente del water.',
    keywords: ['wc non scarica', 'water non scarica', 'scarico wc lento']
  },
  {
    slug: 'wc-perde-dalla-base',
    title: 'WC Perde Acqua dalla Base - Riparazione',
    h1: 'WC Perde dalla Base',
    description: 'Perdita acqua alla base del WC? Sostituzione guarnizione e sigillatura.',
    keywords: ['wc perde base', 'water perde sotto', 'guarnizione wc']
  },
  {
    slug: 'cassetta-scarico-non-si-riempie',
    title: 'Cassetta WC Non Si Riempie - Riparazione',
    h1: 'Cassetta WC Non Si Riempie',
    description: 'La cassetta del WC non si riempie? Riparazione galleggiante e meccanismo.',
    keywords: ['cassetta non riempie', 'galleggiante wc rotto', 'meccanismo wc']
  },
  {
    slug: 'pulsante-wc-non-funziona',
    title: 'Pulsante WC Non Funziona - Sostituzione',
    h1: 'Pulsante WC Rotto',
    description: 'Pulsante scarico WC non funziona? Sostituzione e riparazione pulsantiera.',
    keywords: ['pulsante wc rotto', 'scarico non funziona', 'pulsantiera wc']
  },
  {
    slug: 'bidet-non-scarica',
    title: 'Bidet Non Scarica - Disostruzione',
    h1: 'Bidet Non Scarica',
    description: 'Bidet intasato o scarico lento? Disostruzione e pulizia sifone bidet.',
    keywords: ['bidet non scarica', 'bidet intasato', 'scarico bidet lento']
  },
  {
    slug: 'lavabo-crepato',
    title: 'Lavabo Crepato - Sostituzione',
    h1: 'Lavabo Crepato o Rotto',
    description: 'Lavabo rotto o crepato? Sostituzione lavandino bagno e cucina.',
    keywords: ['lavabo crepato', 'lavandino rotto', 'sostituzione lavabo']
  },
  {
    slug: 'piatto-doccia-rotto',
    title: 'Piatto Doccia Rotto - Sostituzione',
    h1: 'Piatto Doccia Danneggiato',
    description: 'Piatto doccia crepato o scheggiato? Sostituzione con nuovo piatto doccia.',
    keywords: ['piatto doccia rotto', 'doccia crepata', 'cambiare piatto doccia']
  },
  {
    slug: 'vasca-da-bagno-perde',
    title: 'Vasca da Bagno Perde Acqua - Riparazione',
    h1: 'Vasca da Bagno Perde',
    description: 'Perdita dalla vasca da bagno? Riparazione scarico, rubinetti e sigillature.',
    keywords: ['vasca perde', 'perdita vasca bagno', 'scarico vasca rotto']
  },
  {
    slug: 'sanitari-traballanti',
    title: 'Sanitari Traballanti - Fissaggio',
    h1: 'WC o Bidet Traballanti',
    description: 'WC, bidet o lavabo traballanti? Fissaggio e ancoraggio sanitari.',
    keywords: ['wc traballante', 'bidet traballante', 'fissare sanitari']
  },
  // ============================================
  // PROBLEMI DOCCIA SPECIFICI
  // ============================================
  {
    slug: 'doccia-fredda',
    title: 'Doccia Esce Solo Acqua Fredda - Riparazione',
    h1: 'Doccia Solo Acqua Fredda',
    description: 'Dalla doccia esce solo acqua fredda? Cause e riparazione miscelatore.',
    keywords: ['doccia fredda', 'no acqua calda doccia', 'miscelatore doccia rotto']
  },
  {
    slug: 'doccia-scottante',
    title: 'Doccia Troppo Calda - Regolazione',
    h1: 'Doccia Acqua Scottante',
    description: 'Acqua doccia troppo calda? Regolazione miscelatore termostatico.',
    keywords: ['doccia troppo calda', 'acqua bollente doccia', 'regolare temperatura doccia']
  },
  {
    slug: 'doccia-gocciola',
    title: 'Doccia Gocciola - Riparazione',
    h1: 'Doccia che Gocciola',
    description: 'Il soffione doccia gocciola? Sostituzione guarnizioni e cartuccia miscelatore.',
    keywords: ['doccia gocciola', 'soffione perde', 'doccia perde gocce']
  },
  {
    slug: 'box-doccia-perde',
    title: 'Box Doccia Perde Acqua - Sigillatura',
    h1: 'Box Doccia Perde',
    description: 'Perdite dal box doccia? Sostituzione guarnizioni e silicone anti-muffa.',
    keywords: ['box doccia perde', 'perdita box doccia', 'sigillare box doccia']
  },
  {
    slug: 'colonna-doccia-installazione',
    title: 'Installazione Colonna Doccia',
    h1: 'Installazione Colonna Doccia',
    description: 'Montaggio colonna doccia multifunzione. Installazione professionale.',
    keywords: ['colonna doccia', 'installare colonna doccia', 'montaggio colonna']
  },
  {
    slug: 'doccetta-bloccata',
    title: 'Doccetta Bloccata dal Calcare',
    h1: 'Doccetta Calcificata',
    description: 'Soffione o doccetta bloccati dal calcare? Decalcificazione o sostituzione.',
    keywords: ['doccetta calcare', 'soffione bloccato', 'calcare doccia']
  },
  // ============================================
  // PROBLEMI CUCINA SPECIFICI
  // ============================================
  {
    slug: 'lavello-cucina-intasato',
    title: 'Lavello Cucina Intasato - Disostruzione',
    h1: 'Lavello Cucina Intasato',
    description: 'Lavello della cucina intasato? Disostruzione professionale e pulizia sifone.',
    keywords: ['lavello intasato', 'scarico cucina intasato', 'sturare lavello']
  },
  {
    slug: 'rubinetto-cucina-perde',
    title: 'Rubinetto Cucina Perde - Riparazione',
    h1: 'Rubinetto Cucina Perde',
    description: 'Il rubinetto della cucina gocciola? Riparazione o sostituzione miscelatore.',
    keywords: ['rubinetto cucina perde', 'miscelatore cucina rotto', 'gocciola rubinetto']
  },
  {
    slug: 'installazione-rubinetto-estraibile',
    title: 'Installazione Rubinetto Estraibile Cucina',
    h1: 'Rubinetto Estraibile',
    description: 'Montaggio rubinetto con doccetta estraibile per lavello cucina.',
    keywords: ['rubinetto estraibile', 'doccetta cucina', 'rubinetto lavello']
  },
  {
    slug: 'attacco-lavastoviglie',
    title: 'Attacco Lavastoviglie - Installazione',
    h1: 'Attacco Lavastoviglie',
    description: 'Predisposizione e attacco per lavastoviglie. Allacci acqua e scarico.',
    keywords: ['attacco lavastoviglie', 'allaccio lavastoviglie', 'scarico lavastoviglie']
  },
  {
    slug: 'odore-lavandino-cucina',
    title: 'Odore Cattivo Lavandino Cucina',
    h1: 'Puzza dal Lavandino',
    description: 'Cattivo odore dal lavandino cucina? Pulizia sifone e ventilazione scarichi.',
    keywords: ['odore lavandino', 'puzza lavello', 'cattivo odore cucina']
  },
  {
    slug: 'scarico-lavello-doppio',
    title: 'Installazione Scarico Lavello Doppio',
    h1: 'Scarico Lavello a Due Vasche',
    description: 'Installazione scarico per lavello cucina a due vasche. Sifoni doppi.',
    keywords: ['lavello doppio', 'sifone doppio', 'scarico due vasche']
  },
  // ============================================
  // MARCHE CONDIZIONATORI
  // ============================================
  {
    slug: 'assistenza-condizionatore-daikin',
    title: 'Assistenza Condizionatore Daikin',
    h1: 'Tecnico Daikin',
    description: 'Assistenza e riparazione condizionatori Daikin. Tecnici specializzati.',
    keywords: ['condizionatore daikin', 'assistenza daikin', 'riparazione daikin']
  },
  {
    slug: 'assistenza-condizionatore-mitsubishi',
    title: 'Assistenza Condizionatore Mitsubishi',
    h1: 'Tecnico Mitsubishi',
    description: 'Assistenza condizionatori Mitsubishi Electric. Manutenzione e riparazione.',
    keywords: ['condizionatore mitsubishi', 'mitsubishi electric', 'assistenza mitsubishi']
  },
  {
    slug: 'assistenza-condizionatore-samsung',
    title: 'Assistenza Condizionatore Samsung',
    h1: 'Tecnico Samsung',
    description: 'Riparazione e assistenza condizionatori Samsung. Interventi rapidi.',
    keywords: ['condizionatore samsung', 'assistenza samsung', 'samsung climatizzatore']
  },
  {
    slug: 'assistenza-condizionatore-lg',
    title: 'Assistenza Condizionatore LG',
    h1: 'Tecnico LG',
    description: 'Assistenza condizionatori LG. Riparazione e manutenzione clima LG.',
    keywords: ['condizionatore lg', 'assistenza lg', 'lg climatizzatore']
  },
  {
    slug: 'assistenza-condizionatore-panasonic',
    title: 'Assistenza Condizionatore Panasonic',
    h1: 'Tecnico Panasonic',
    description: 'Manutenzione e riparazione condizionatori Panasonic.',
    keywords: ['condizionatore panasonic', 'assistenza panasonic', 'panasonic clima']
  },
  {
    slug: 'assistenza-condizionatore-fujitsu',
    title: 'Assistenza Condizionatore Fujitsu',
    h1: 'Tecnico Fujitsu',
    description: 'Assistenza climatizzatori Fujitsu. Riparazione e manutenzione.',
    keywords: ['condizionatore fujitsu', 'assistenza fujitsu', 'fujitsu general']
  },
  {
    slug: 'assistenza-condizionatore-hisense',
    title: 'Assistenza Condizionatore Hisense',
    h1: 'Tecnico Hisense',
    description: 'Riparazione condizionatori Hisense. Assistenza tecnica.',
    keywords: ['condizionatore hisense', 'assistenza hisense', 'hisense clima']
  },
  {
    slug: 'assistenza-condizionatore-toshiba',
    title: 'Assistenza Condizionatore Toshiba',
    h1: 'Tecnico Toshiba',
    description: 'Assistenza climatizzatori Toshiba. Manutenzione e riparazione.',
    keywords: ['condizionatore toshiba', 'assistenza toshiba', 'toshiba clima']
  },
  // ============================================
  // PROBLEMI SPECIFICI CONDIZIONATORI
  // ============================================
  {
    slug: 'condizionatore-non-parte',
    title: 'Condizionatore Non Si Accende - Riparazione',
    h1: 'Condizionatore Non Parte',
    description: 'Il condizionatore non si accende? Diagnosi e riparazione guasti.',
    keywords: ['condizionatore non parte', 'clima non si accende', 'guasto condizionatore']
  },
  {
    slug: 'condizionatore-errore',
    title: 'Condizionatore Mostra Errore - Codici',
    h1: 'Errore Condizionatore',
    description: 'Codice errore sul condizionatore? Diagnosi e risoluzione problemi.',
    keywords: ['errore condizionatore', 'codice errore clima', 'guasto condizionatore']
  },
  {
    slug: 'condizionatore-ghiaccia',
    title: 'Condizionatore Si Ghiaccia - Riparazione',
    h1: 'Condizionatore Ghiacciato',
    description: 'Ghiaccio sul condizionatore? Cause e soluzioni per evaporatore ghiacciato.',
    keywords: ['condizionatore ghiaccia', 'ghiaccio clima', 'evaporatore gelato']
  },
  {
    slug: 'condizionatore-non-scalda',
    title: 'Condizionatore Non Scalda - Pompa di Calore',
    h1: 'Clima Non Scalda',
    description: 'Il condizionatore non riscalda in inverno? Riparazione pompa di calore.',
    keywords: ['condizionatore non scalda', 'pompa calore non funziona', 'clima non riscalda']
  },
  {
    slug: 'pulizia-filtri-condizionatore',
    title: 'Pulizia Filtri Condizionatore',
    h1: 'Pulizia Filtri Clima',
    description: 'Pulizia e sanificazione filtri condizionatore. Manutenzione periodica.',
    keywords: ['pulizia filtri', 'filtri condizionatore', 'manutenzione filtri']
  },
  {
    slug: 'sanificazione-condizionatore',
    title: 'Sanificazione Condizionatore - Igienizzazione',
    h1: 'Sanificazione Clima',
    description: 'Sanificazione e igienizzazione condizionatori. Elimina batteri e muffe.',
    keywords: ['sanificazione condizionatore', 'igienizzazione clima', 'pulizia profonda']
  },
  // ============================================
  // MARCHE CALDAIE AGGIUNTIVE
  // ============================================
  {
    slug: 'assistenza-caldaia-hermann',
    title: 'Assistenza Caldaia Hermann Saunier Duval',
    h1: 'Tecnico Hermann',
    description: 'Assistenza caldaie Hermann Saunier Duval. Manutenzione e riparazione.',
    keywords: ['caldaia hermann', 'saunier duval', 'assistenza hermann']
  },
  {
    slug: 'assistenza-caldaia-biasi',
    title: 'Assistenza Caldaia Biasi',
    h1: 'Tecnico Biasi',
    description: 'Riparazione e manutenzione caldaie Biasi. Assistenza tecnica.',
    keywords: ['caldaia biasi', 'assistenza biasi', 'riparazione biasi']
  },
  {
    slug: 'assistenza-caldaia-sime',
    title: 'Assistenza Caldaia Sime',
    h1: 'Tecnico Sime',
    description: 'Assistenza caldaie Sime. Manutenzione ordinaria e straordinaria.',
    keywords: ['caldaia sime', 'assistenza sime', 'riparazione sime']
  },
  {
    slug: 'assistenza-caldaia-fondital',
    title: 'Assistenza Caldaia Fondital',
    h1: 'Tecnico Fondital',
    description: 'Manutenzione caldaie Fondital. Controllo fumi e riparazione.',
    keywords: ['caldaia fondital', 'assistenza fondital', 'fondital']
  },
  {
    slug: 'assistenza-caldaia-ocean',
    title: 'Assistenza Caldaia Ocean',
    h1: 'Tecnico Ocean',
    description: 'Riparazione caldaie Ocean. Assistenza tecnica specializzata.',
    keywords: ['caldaia ocean', 'assistenza ocean', 'riparazione ocean']
  },
  {
    slug: 'assistenza-caldaia-chaffoteaux',
    title: 'Assistenza Caldaia Chaffoteaux',
    h1: 'Tecnico Chaffoteaux',
    description: 'Assistenza caldaie Chaffoteaux. Manutenzione e pronto intervento.',
    keywords: ['caldaia chaffoteaux', 'chaffoteaux maury', 'assistenza chaffoteaux']
  },
  {
    slug: 'assistenza-caldaia-radiant',
    title: 'Assistenza Caldaia Radiant',
    h1: 'Tecnico Radiant',
    description: 'Manutenzione caldaie Radiant. Riparazione e assistenza.',
    keywords: ['caldaia radiant', 'assistenza radiant', 'riparazione radiant']
  },
  {
    slug: 'assistenza-caldaia-italtherm',
    title: 'Assistenza Caldaia Italtherm',
    h1: 'Tecnico Italtherm',
    description: 'Assistenza caldaie Italtherm. Controllo annuale e riparazione.',
    keywords: ['caldaia italtherm', 'assistenza italtherm', 'italtherm']
  },
  // ============================================
  // PROBLEMI CALDAIE SPECIFICI
  // ============================================
  {
    slug: 'caldaia-errore-e01',
    title: 'Caldaia Errore E01 - Risoluzione',
    h1: 'Errore E01 Caldaia',
    description: 'Errore E01 sulla caldaia? Problema accensione. Diagnosi e riparazione.',
    keywords: ['errore e01', 'caldaia e01', 'errore accensione caldaia']
  },
  {
    slug: 'caldaia-errore-e02',
    title: 'Caldaia Errore E02 - Sovratemperatura',
    h1: 'Errore E02 Caldaia',
    description: 'Errore E02: sovratemperatura caldaia. Cause e soluzioni.',
    keywords: ['errore e02', 'sovratemperatura caldaia', 'caldaia surriscaldata']
  },
  {
    slug: 'caldaia-errore-e03',
    title: 'Caldaia Errore E03 - Fumi',
    h1: 'Errore E03 Caldaia',
    description: 'Errore E03: problema scarico fumi. Verifica canna fumaria.',
    keywords: ['errore e03', 'caldaia fumi', 'canna fumaria intasata']
  },
  {
    slug: 'caldaia-errore-e04',
    title: 'Caldaia Errore E04 - Fiamma',
    h1: 'Errore E04 Caldaia',
    description: 'Errore E04: distacco fiamma. Pulizia elettrodo e controllo gas.',
    keywords: ['errore e04', 'distacco fiamma', 'caldaia si spegne']
  },
  {
    slug: 'caldaia-pressione-bassa',
    title: 'Caldaia Pressione Bassa - Come Ricaricare',
    h1: 'Pressione Caldaia Bassa',
    description: 'Pressione caldaia sotto 1 bar? Come ricaricare e trovare perdite.',
    keywords: ['pressione caldaia bassa', 'ricaricare caldaia', 'caldaia perde pressione']
  },
  {
    slug: 'caldaia-pressione-alta',
    title: 'Caldaia Pressione Alta - Cosa Fare',
    h1: 'Pressione Caldaia Alta',
    description: 'Pressione caldaia troppo alta? Sfiatare e controllare vaso espansione.',
    keywords: ['pressione caldaia alta', 'caldaia oltre 2 bar', 'sfiatare caldaia']
  },
  {
    slug: 'caldaia-non-fa-acqua-calda',
    title: 'Caldaia Non Fa Acqua Calda - Riparazione',
    h1: 'Niente Acqua Calda Caldaia',
    description: 'La caldaia non produce acqua calda sanitaria? Diagnosi e riparazione.',
    keywords: ['caldaia no acqua calda', 'boiler non scalda', 'acqua fredda caldaia']
  },
  {
    slug: 'caldaia-fischia',
    title: 'Caldaia Fischia - Rumori Strani',
    h1: 'Caldaia Rumorosa Fischia',
    description: 'La caldaia fischia o fa rumore? Cause: calcare, aria, pompa difettosa.',
    keywords: ['caldaia fischia', 'rumore caldaia', 'caldaia sibila']
  },
  {
    slug: 'caldaia-gocciola',
    title: 'Caldaia Gocciola Acqua - Perdita',
    h1: 'Caldaia che Gocciola',
    description: 'La caldaia perde gocce d\'acqua? Valvola sicurezza, scambiatore, raccordi.',
    keywords: ['caldaia gocciola', 'perdita caldaia', 'caldaia perde acqua sotto']
  },
  // ============================================
  // EMERGENZE SPECIFICHE
  // ============================================
  {
    slug: 'allagamento-casa',
    title: 'Allagamento Casa - Pronto Intervento',
    h1: 'Casa Allagata Emergenza',
    description: 'Casa allagata? Pronto intervento 24h per chiudere acqua e aspirare.',
    keywords: ['casa allagata', 'allagamento abitazione', 'emergenza acqua']
  },
  {
    slug: 'rottura-tubo-principale',
    title: 'Rottura Tubo Principale Acqua',
    h1: 'Tubo Principale Rotto',
    description: 'Rottura del tubo principale dell\'acqua? Intervento urgente 24/7.',
    keywords: ['tubo principale rotto', 'colonna montante rotta', 'tubo condominiale']
  },
  {
    slug: 'scarico-fognario-intasato',
    title: 'Scarico Fognario Intasato - Urgente',
    h1: 'Fogna Intasata',
    description: 'Scarico fognario completamente bloccato? Spurgo urgente 24h.',
    keywords: ['fogna intasata', 'scarico fognario', 'spurgo urgente']
  },
  {
    slug: 'perdita-gas-domestico',
    title: 'Perdita Gas in Casa - Emergenza',
    h1: 'Perdita Gas Domestico',
    description: 'Odore di gas in casa? Cosa fare e chi chiamare. Intervento urgente.',
    keywords: ['perdita gas', 'odore gas casa', 'fuga gas emergenza']
  },
  {
    slug: 'caldaia-esplode-rumore',
    title: 'Caldaia Fa Rumore Forte - Cosa Fare',
    h1: 'Caldaia Scoppia Rumori',
    description: 'Rumori forti dalla caldaia? Potrebbe essere pericoloso. Chiamare subito.',
    keywords: ['caldaia rumore forte', 'caldaia scoppia', 'botti caldaia']
  },
  {
    slug: 'wc-trabocca',
    title: 'WC Trabocca - Intervento Urgente',
    h1: 'Water Trabocca',
    description: 'Il WC trabocca acqua? Intervento urgente per evitare allagamento.',
    keywords: ['wc trabocca', 'water straripa', 'wc esce acqua']
  },
  {
    slug: 'tubo-scoppiato-muro',
    title: 'Tubo Scoppiato nel Muro',
    h1: 'Tubo Rotto nel Muro',
    description: 'Tubo scoppiato dentro al muro? Tracciamento e riparazione rapida.',
    keywords: ['tubo scoppiato muro', 'rottura tubo incassato', 'tubo rotto parete']
  },
  // ============================================
  // TIPI DI IMPIANTO
  // ============================================
  {
    slug: 'impianto-acqua-calda-sanitaria',
    title: 'Impianto Acqua Calda Sanitaria',
    h1: 'Impianto ACS',
    description: 'Realizzazione impianto acqua calda sanitaria. Bollitori e ricircolo.',
    keywords: ['acqua calda sanitaria', 'acs', 'impianto acs', 'bollitore']
  },
  {
    slug: 'impianto-solare-termico',
    title: 'Impianto Solare Termico Completo',
    h1: 'Solare Termico',
    description: 'Installazione impianto solare termico per acqua calda e riscaldamento.',
    keywords: ['solare termico', 'pannelli solari termici', 'acqua calda solare']
  },
  {
    slug: 'impianto-geotermico',
    title: 'Impianto Geotermico - Pompe di Calore',
    h1: 'Geotermia',
    description: 'Impianti geotermici con pompe di calore. Riscaldamento e raffrescamento.',
    keywords: ['geotermico', 'pompa calore geotermica', 'sonde geotermiche']
  },
  {
    slug: 'impianto-a-zone',
    title: 'Impianto Riscaldamento a Zone',
    h1: 'Riscaldamento a Zone',
    description: 'Impianto riscaldamento suddiviso in zone. Controllo temperatura ambiente.',
    keywords: ['riscaldamento zone', 'valvole zona', 'controllo temperatura stanze']
  },
  {
    slug: 'impianto-autonomo',
    title: 'Trasformazione in Impianto Autonomo',
    h1: 'Impianto Autonomo',
    description: 'Distacco dal centralizzato. Realizzazione impianto riscaldamento autonomo.',
    keywords: ['impianto autonomo', 'distacco centralizzato', 'riscaldamento autonomo']
  },
  {
    slug: 'impianto-centralizzato',
    title: 'Manutenzione Impianto Centralizzato',
    h1: 'Riscaldamento Centralizzato',
    description: 'Manutenzione impianti centralizzati condominiali. Contabilizzatori e valvole.',
    keywords: ['centralizzato', 'riscaldamento condominio', 'contabilizzazione calore']
  },
  {
    slug: 'impianto-antincendio',
    title: 'Impianto Antincendio - Idranti',
    h1: 'Impianto Antincendio',
    description: 'Realizzazione impianti antincendio. Idranti, sprinkler, naspi.',
    keywords: ['antincendio', 'idranti', 'sprinkler', 'impianto spegnimento']
  },
  // ============================================
  // INTERVENTI SPECIFICI RISCALDAMENTO
  // ============================================
  {
    slug: 'sostituzione-circolatore',
    title: 'Sostituzione Circolatore Caldaia',
    h1: 'Cambio Pompa Circolatore',
    description: 'Sostituzione pompa circolatore caldaia o impianto. Circolatori alta efficienza.',
    keywords: ['circolatore', 'pompa circolatore', 'sostituzione circolatore']
  },
  {
    slug: 'sostituzione-vaso-espansione',
    title: 'Sostituzione Vaso Espansione',
    h1: 'Cambio Vaso Espansione',
    description: 'Vaso espansione caldaia rotto o sgonfio? Sostituzione rapida.',
    keywords: ['vaso espansione', 'polmone caldaia', 'vaso espansione rotto']
  },
  {
    slug: 'sostituzione-scambiatore',
    title: 'Sostituzione Scambiatore Caldaia',
    h1: 'Cambio Scambiatore',
    description: 'Scambiatore primario o sanitario da sostituire? Intervento tecnico.',
    keywords: ['scambiatore caldaia', 'scambiatore primario', 'scambiatore sanitario']
  },
  {
    slug: 'pulizia-scambiatore',
    title: 'Pulizia Scambiatore Caldaia',
    h1: 'Pulizia Scambiatore',
    description: 'Lavaggio chimico scambiatore caldaia. Rimuove calcare e incrostazioni.',
    keywords: ['pulizia scambiatore', 'lavaggio scambiatore', 'decalcificare caldaia']
  },
  {
    slug: 'sostituzione-valvola-gas',
    title: 'Sostituzione Valvola Gas Caldaia',
    h1: 'Cambio Valvola Gas',
    description: 'Valvola gas caldaia difettosa? Sostituzione e taratura.',
    keywords: ['valvola gas', 'valvola gas caldaia', 'regolatore gas']
  },
  {
    slug: 'sostituzione-scheda-caldaia',
    title: 'Sostituzione Scheda Elettronica Caldaia',
    h1: 'Scheda Caldaia Rotta',
    description: 'Scheda elettronica caldaia guasta? Diagnosi e sostituzione.',
    keywords: ['scheda caldaia', 'scheda elettronica', 'centralina caldaia']
  },
  {
    slug: 'bilanciamento-impianto',
    title: 'Bilanciamento Impianto Riscaldamento',
    h1: 'Bilanciamento Termosifoni',
    description: 'Bilanciamento idraulico impianto. Termosifoni caldi uniformemente.',
    keywords: ['bilanciamento', 'termosifoni non scaldano', 'regolazione portata']
  },
  // ============================================
  // INSTALLAZIONI ELETTRODOMESTICI
  // ============================================
  {
    slug: 'installazione-frigorifero-americano',
    title: 'Installazione Frigorifero Americano',
    h1: 'Attacco Frigo Americano',
    description: 'Allaccio acqua frigorifero americano con dispenser. Installazione filtri.',
    keywords: ['frigo americano', 'allaccio frigo', 'dispenser acqua frigo']
  },
  {
    slug: 'installazione-macchina-caffe',
    title: 'Allaccio Macchina Caffè Plumbed',
    h1: 'Macchina Caffè Allacciata',
    description: 'Collegamento macchina caffè alla rete idrica. Installazione professionale.',
    keywords: ['macchina caffe allacciata', 'caffè plumbed', 'attacco macchina caffè']
  },
  {
    slug: 'installazione-asciugatrice',
    title: 'Installazione Scarico Asciugatrice',
    h1: 'Scarico Asciugatrice',
    description: 'Collegamento scarico condensa asciugatrice. Installazione a parete.',
    keywords: ['asciugatrice scarico', 'installazione asciugatrice', 'condensa asciugatrice']
  },
  {
    slug: 'spostamento-lavatrice',
    title: 'Spostamento Attacchi Lavatrice',
    h1: 'Spostare Lavatrice',
    description: 'Spostamento attacchi acqua e scarico lavatrice. Nuova predisposizione.',
    keywords: ['spostare lavatrice', 'attacchi lavatrice', 'predisposizione lavatrice']
  },
  // ============================================
  // PROBLEMI ACQUA SPECIFICI
  // ============================================
  {
    slug: 'acqua-gialla-rubinetto',
    title: 'Acqua Gialla dal Rubinetto - Cause',
    h1: 'Acqua Gialla',
    description: 'Acqua gialla o torbida dal rubinetto? Cause: tubazioni vecchie, ruggine.',
    keywords: ['acqua gialla', 'acqua torbida', 'ruggine tubazioni']
  },
  {
    slug: 'acqua-puzza-uova',
    title: 'Acqua Puzza di Uova Marce - Zolfo',
    h1: 'Acqua Puzza Zolfo',
    description: 'L\'acqua puzza di uova marce? Problema boiler o acqua con zolfo.',
    keywords: ['acqua puzza', 'odore uova', 'zolfo acqua']
  },
  {
    slug: 'acqua-troppo-dura',
    title: 'Acqua Troppo Dura - Soluzioni',
    h1: 'Acqua Calcarea',
    description: 'Acqua troppo dura e calcarea? Installazione addolcitore o anticalcare.',
    keywords: ['acqua dura', 'acqua calcarea', 'addolcitore acqua']
  },
  {
    slug: 'bolle-aria-tubazioni',
    title: 'Bolle d\'Aria nelle Tubazioni',
    h1: 'Aria nei Tubi',
    description: 'Rumori e spruzzi dai rubinetti? Aria nell\'impianto idrico. Sfiatare.',
    keywords: ['aria tubazioni', 'bolle aria acqua', 'sfiatare impianto']
  },
  {
    slug: 'acqua-non-arriva-piani-alti',
    title: 'Acqua Non Arriva ai Piani Alti',
    h1: 'Poca Acqua Piani Alti',
    description: 'Poca pressione ai piani alti del condominio? Autoclave o pressurizzatore.',
    keywords: ['acqua piani alti', 'pressione ultimo piano', 'autoclave condominio']
  },
  // ============================================
  // TIPI DI INTERVENTO
  // ============================================
  {
    slug: 'intervento-non-invasivo',
    title: 'Riparazione Non Invasiva - No Demolizione',
    h1: 'Intervento Senza Rompere',
    description: 'Riparazione perdite senza demolire. Risanamento relining e tecniche no-dig.',
    keywords: ['non invasivo', 'senza rompere', 'relining', 'no dig']
  },
  {
    slug: 'ricerca-perdite-termocamera',
    title: 'Ricerca Perdite con Termocamera',
    h1: 'Termografia Perdite',
    description: 'Individuazione perdite occulte con termocamera a infrarossi.',
    keywords: ['termocamera', 'ricerca termica', 'infrarossi perdite']
  },
  {
    slug: 'ricerca-perdite-gas-tracciante',
    title: 'Ricerca Perdite Gas Tracciante',
    h1: 'Gas Tracciante',
    description: 'Ricerca perdite con gas tracciante. Trova perdite impossibili.',
    keywords: ['gas tracciante', 'ricerca perdite gas', 'localizzazione perdite']
  },
  {
    slug: 'relining-tubazioni',
    title: 'Relining Tubazioni - Risanamento',
    h1: 'Relining Tubi',
    description: 'Risanamento tubazioni con relining. Ripara senza scavare.',
    keywords: ['relining', 'risanamento tubi', 'rivestimento interno']
  },
  // ============================================
  // AMBIENTI SPECIFICI
  // ============================================
  {
    slug: 'idraulico-bed-breakfast',
    title: 'Idraulico per B&B e Affittacamere',
    h1: 'Idraulico B&B',
    description: 'Servizi idraulici per B&B e affittacamere. Interventi rapidi per ospiti.',
    keywords: ['idraulico b&b', 'affittacamere', 'idraulico turismo']
  },
  {
    slug: 'idraulico-palestra',
    title: 'Idraulico per Palestre e Centri Fitness',
    h1: 'Idraulico Palestra',
    description: 'Impianti idraulici per palestre: spogliatoi, docce, sauna.',
    keywords: ['idraulico palestra', 'spogliatoi', 'docce palestra']
  },
  {
    slug: 'idraulico-piscina',
    title: 'Idraulico per Piscine Private',
    h1: 'Idraulico Piscina',
    description: 'Impianti idraulici piscine. Filtrazione, ricircolo, riscaldamento.',
    keywords: ['idraulico piscina', 'impianto piscina', 'filtrazione piscina']
  },
  {
    slug: 'idraulico-bar-ristorante',
    title: 'Idraulico per Bar e Ristoranti',
    h1: 'Idraulico Ristorazione',
    description: 'Impianti per bar e ristoranti. Cucine professionali, lavaggio, scarichi.',
    keywords: ['idraulico bar', 'idraulico ristorante', 'cucina professionale']
  },
  {
    slug: 'idraulico-studio-medico',
    title: 'Idraulico per Studi Medici e Dentistici',
    h1: 'Idraulico Studio Medico',
    description: 'Impianti idraulici per studi medici. Acqua sterile e conformità.',
    keywords: ['idraulico medico', 'studio dentistico', 'ambulatorio']
  },
  {
    slug: 'idraulico-parrucchiere',
    title: 'Idraulico per Parrucchieri ed Estetiste',
    h1: 'Idraulico Parrucchiere',
    description: 'Impianti per saloni di bellezza. Lavatesta, poltrone relax.',
    keywords: ['idraulico parrucchiere', 'lavatesta', 'salone bellezza']
  },
  {
    slug: 'idraulico-scuola',
    title: 'Idraulico per Scuole e Asili',
    h1: 'Idraulico Scolastico',
    description: 'Manutenzione impianti scolastici. Bagni, fontanelle, mense.',
    keywords: ['idraulico scuola', 'asilo', 'manutenzione scolastica']
  },
  {
    slug: 'idraulico-chiesa',
    title: 'Idraulico per Chiese e Luoghi di Culto',
    h1: 'Idraulico Chiesa',
    description: 'Interventi in chiese e luoghi storici. Rispetto patrimonio artistico.',
    keywords: ['idraulico chiesa', 'luoghi culto', 'edifici storici']
  },
  // ============================================
  // INSTALLAZIONI BAGNO COMPLETE
  // ============================================
  {
    slug: 'installazione-doccia-walk-in',
    title: 'Installazione Doccia Walk-In',
    h1: 'Doccia Walk-In',
    description: 'Montaggio doccia walk-in senza porta. Design moderno e accessibile.',
    keywords: ['doccia walk in', 'doccia aperta', 'doccia senza porta']
  },
  {
    slug: 'installazione-vasca-idromassaggio',
    title: 'Installazione Vasca Idromassaggio',
    h1: 'Vasca Idromassaggio',
    description: 'Installazione vasca idromassaggio. Allacci e collaudo.',
    keywords: ['vasca idromassaggio', 'jacuzzi', 'installazione idromassaggio']
  },
  {
    slug: 'installazione-doccia-idromassaggio',
    title: 'Installazione Cabina Doccia Idromassaggio',
    h1: 'Cabina Doccia Multifunzione',
    description: 'Montaggio cabina doccia idromassaggio multifunzione.',
    keywords: ['cabina doccia', 'doccia idromassaggio', 'doccia multifunzione']
  },
  {
    slug: 'installazione-sanitrit',
    title: 'Installazione Sanitrit - Trituratore WC',
    h1: 'Sanitrit Trituratore',
    description: 'Installazione WC con trituratore Sanitrit. Bagno dove vuoi.',
    keywords: ['sanitrit', 'trituratore wc', 'wc trituratore']
  },
  {
    slug: 'bagno-disabili',
    title: 'Bagno per Disabili - Adeguamento',
    h1: 'Bagno Accessibile',
    description: 'Adeguamento bagno per disabili. Maniglioni, sanitari speciali, doccia a filo.',
    keywords: ['bagno disabili', 'accessibilità', 'bagno anziani']
  },
  {
    slug: 'secondo-bagno',
    title: 'Realizzazione Secondo Bagno',
    h1: 'Aggiungere Secondo Bagno',
    description: 'Creazione secondo bagno in casa. Impianto completo e finiture.',
    keywords: ['secondo bagno', 'nuovo bagno', 'aggiungere bagno']
  },
  // ============================================
  // TIPOLOGIE CALDAIE
  // ============================================
  {
    slug: 'caldaia-condensazione',
    title: 'Installazione Caldaia a Condensazione',
    h1: 'Caldaia Condensazione',
    description: 'Installazione caldaia a condensazione. Risparmio energetico e bonus.',
    keywords: ['caldaia condensazione', 'condensazione', 'risparmio caldaia']
  },
  {
    slug: 'caldaia-tradizionale',
    title: 'Manutenzione Caldaia Tradizionale',
    h1: 'Caldaia Camera Aperta',
    description: 'Manutenzione caldaie tradizionali a camera aperta. Controllo fumi.',
    keywords: ['caldaia tradizionale', 'camera aperta', 'caldaia vecchia']
  },
  {
    slug: 'caldaia-murale',
    title: 'Installazione Caldaia Murale',
    h1: 'Caldaia a Muro',
    description: 'Caldaia murale compatta per appartamenti. Installazione e allacci.',
    keywords: ['caldaia murale', 'caldaia a muro', 'caldaia compatta']
  },
  {
    slug: 'caldaia-basamento',
    title: 'Installazione Caldaia a Basamento',
    h1: 'Caldaia a Terra',
    description: 'Caldaie a basamento per grandi potenze. Ville e condomini.',
    keywords: ['caldaia basamento', 'caldaia a terra', 'caldaia grande potenza']
  },
  {
    slug: 'caldaia-biomassa',
    title: 'Installazione Caldaia a Biomassa',
    h1: 'Caldaia Pellet/Legna',
    description: 'Caldaie a pellet, legna e cippato. Energia rinnovabile.',
    keywords: ['caldaia biomassa', 'caldaia pellet', 'caldaia legna']
  },
  // ============================================
  // SCALDABAGNI TIPOLOGIE
  // ============================================
  {
    slug: 'scaldabagno-elettrico',
    title: 'Scaldabagno Elettrico - Installazione',
    h1: 'Boiler Elettrico',
    description: 'Installazione scaldabagno elettrico. Accumulo o istantaneo.',
    keywords: ['scaldabagno elettrico', 'boiler elettrico', 'scaldacqua']
  },
  {
    slug: 'scaldabagno-gas',
    title: 'Scaldabagno a Gas - Installazione',
    h1: 'Boiler a Gas',
    description: 'Installazione scaldabagno a gas. Camera stagna o aperta.',
    keywords: ['scaldabagno gas', 'boiler gas', 'scaldacqua gas']
  },
  {
    slug: 'scaldabagno-istantaneo',
    title: 'Scaldabagno Istantaneo',
    h1: 'Scalda Acqua Istantaneo',
    description: 'Scaldabagno istantaneo senza serbatoio. Acqua calda infinita.',
    keywords: ['istantaneo', 'senza serbatoio', 'tankless']
  },
  {
    slug: 'scaldabagno-accumulo',
    title: 'Scaldabagno ad Accumulo',
    h1: 'Boiler con Serbatoio',
    description: 'Scaldabagno ad accumulo da 50 a 300 litri. Per famiglie numerose.',
    keywords: ['accumulo', 'serbatoio', 'bollitore']
  },
  {
    slug: 'scaldabagno-pompa-calore',
    title: 'Scaldabagno a Pompa di Calore',
    h1: 'Boiler Pompa Calore',
    description: 'Scaldabagno con pompa di calore integrata. Massimo risparmio.',
    keywords: ['pompa calore', 'scaldabagno efficiente', 'risparmio energetico']
  },
  // ============================================
  // COSTI SPECIFICI AGGIUNTIVI
  // ============================================
  {
    slug: 'costo-idraulico-orario',
    title: 'Costo Idraulico all\'Ora 2025',
    h1: 'Tariffa Oraria Idraulico',
    description: 'Quanto costa un idraulico all\'ora? Tariffe medie per interventi.',
    keywords: ['costo orario', 'tariffa idraulico', 'prezzo ora idraulico']
  },
  {
    slug: 'costo-chiamata-idraulico',
    title: 'Costo Chiamata Idraulico - Uscita',
    h1: 'Costo Uscita Idraulico',
    description: 'Quanto costa la chiamata dell\'idraulico? Diritto di chiamata e uscita.',
    keywords: ['costo chiamata', 'uscita idraulico', 'diritto chiamata']
  },
  {
    slug: 'costo-spurgo',
    title: 'Costo Spurgo Fogne 2025',
    h1: 'Prezzo Spurgo Fogna',
    description: 'Quanto costa spurgare la fossa biologica o le fogne? Prezzi spurgo.',
    keywords: ['costo spurgo', 'prezzo spurgo fogna', 'spurgo fossa biologica']
  },
  {
    slug: 'costo-sostituzione-wc',
    title: 'Costo Sostituzione WC 2025',
    h1: 'Prezzo Cambio Water',
    description: 'Quanto costa cambiare il WC? Prezzo sanitario e manodopera.',
    keywords: ['costo sostituzione wc', 'prezzo cambio water', 'installazione wc']
  },
  {
    slug: 'costo-sostituzione-lavandino',
    title: 'Costo Sostituzione Lavandino 2025',
    h1: 'Prezzo Cambio Lavabo',
    description: 'Quanto costa sostituire il lavandino? Prezzi lavabo e montaggio.',
    keywords: ['costo lavandino', 'prezzo lavabo', 'sostituire lavandino']
  },
  {
    slug: 'costo-sostituzione-bidet',
    title: 'Costo Sostituzione Bidet 2025',
    h1: 'Prezzo Cambio Bidet',
    description: 'Quanto costa cambiare il bidet? Prezzo sanitario e installazione.',
    keywords: ['costo bidet', 'prezzo bidet nuovo', 'sostituzione bidet']
  },
  {
    slug: 'costo-allaccio-acqua',
    title: 'Costo Allaccio Acqua Nuovo 2025',
    h1: 'Prezzo Allaccio Acquedotto',
    description: 'Quanto costa allacciare l\'acqua? Costi contatore e allaccio rete.',
    keywords: ['costo allaccio', 'prezzo contatore', 'allaccio acquedotto']
  },
  {
    slug: 'costo-rifacimento-bagno-piccolo',
    title: 'Costo Rifacimento Bagno Piccolo 2025',
    h1: 'Prezzo Bagno Piccolo',
    description: 'Quanto costa ristrutturare un bagno piccolo? Budget e preventivi.',
    keywords: ['bagno piccolo costo', 'rifacimento bagno piccolo', 'ristrutturare bagno']
  },
  // ============================================
  // GUIDE E FAQ AGGIUNTIVE
  // ============================================
  {
    slug: 'quando-chiamare-idraulico',
    title: 'Quando Chiamare l\'Idraulico - Guida',
    h1: 'Quando Serve l\'Idraulico',
    description: 'Quando è necessario chiamare un idraulico? Casi in cui serve un professionista.',
    keywords: ['quando chiamare idraulico', 'serve idraulico', 'fai da te o idraulico']
  },
  {
    slug: 'come-scegliere-idraulico',
    title: 'Come Scegliere l\'Idraulico Giusto',
    h1: 'Scegliere l\'Idraulico',
    description: 'Come scegliere un idraulico affidabile? Consigli per evitare truffe.',
    keywords: ['scegliere idraulico', 'idraulico affidabile', 'trovare idraulico bravo']
  },
  {
    slug: 'idraulico-vs-fai-da-te',
    title: 'Idraulico o Fai da Te - Cosa Conviene',
    h1: 'Fai da Te o Idraulico?',
    description: 'Meglio chiamare l\'idraulico o fare da soli? Quando conviene il fai da te.',
    keywords: ['fai da te idraulico', 'riparazioni da solo', 'conviene idraulico']
  },
  {
    slug: 'garanzia-lavori-idraulico',
    title: 'Garanzia Lavori Idraulici - Diritti',
    h1: 'Garanzia Idraulico',
    description: 'Quanta garanzia ha un lavoro idraulico? I tuoi diritti sui lavori.',
    keywords: ['garanzia idraulico', 'garanzia lavori', 'diritti cliente']
  },
  {
    slug: 'preventivo-idraulico-gratuito',
    title: 'Preventivo Idraulico Gratuito Online',
    h1: 'Preventivo Gratuito',
    description: 'Richiedi un preventivo idraulico gratuito e senza impegno. Confronta offerte.',
    keywords: ['preventivo gratuito', 'preventivo online', 'preventivo senza impegno']
  },
  {
    slug: 'manutenzione-periodica-impianti',
    title: 'Manutenzione Periodica Impianti Idraulici',
    h1: 'Manutenzione Programmata',
    description: 'Importanza della manutenzione periodica. Prevenire guasti e risparmiare.',
    keywords: ['manutenzione periodica', 'controllo annuale', 'prevenzione guasti']
  },
  // ============================================
  // REGIONI ITALIANE
  // ============================================
  {
    slug: 'idraulico-lombardia',
    title: 'Idraulico in Lombardia - Tutte le Province',
    h1: 'Idraulico Lombardia',
    description: 'Trova idraulici in Lombardia. Milano, Brescia, Bergamo e tutte le province.',
    keywords: ['idraulico lombardia', 'lombardia', 'idraulici lombardi']
  },
  {
    slug: 'idraulico-lazio',
    title: 'Idraulico nel Lazio - Roma e Province',
    h1: 'Idraulico Lazio',
    description: 'Idraulici professionisti nel Lazio. Roma e tutte le province laziali.',
    keywords: ['idraulico lazio', 'lazio', 'idraulici roma']
  },
  {
    slug: 'idraulico-campania',
    title: 'Idraulico in Campania - Napoli e Province',
    h1: 'Idraulico Campania',
    description: 'Trova idraulici in Campania. Napoli, Salerno, Caserta e province.',
    keywords: ['idraulico campania', 'napoli idraulico', 'campania']
  },
  {
    slug: 'idraulico-piemonte',
    title: 'Idraulico in Piemonte - Torino e Province',
    h1: 'Idraulico Piemonte',
    description: 'Idraulici in Piemonte. Torino, Novara, Alessandria e tutte le province.',
    keywords: ['idraulico piemonte', 'torino idraulico', 'piemonte']
  },
  {
    slug: 'idraulico-emilia-romagna',
    title: 'Idraulico in Emilia Romagna',
    h1: 'Idraulico Emilia Romagna',
    description: 'Trova idraulici in Emilia Romagna. Bologna, Modena, Parma e province.',
    keywords: ['idraulico emilia', 'emilia romagna', 'bologna idraulico']
  },
  {
    slug: 'idraulico-veneto',
    title: 'Idraulico in Veneto - Venezia e Province',
    h1: 'Idraulico Veneto',
    description: 'Idraulici professionisti in Veneto. Venezia, Verona, Padova e province.',
    keywords: ['idraulico veneto', 'venezia idraulico', 'verona idraulico']
  },
  {
    slug: 'idraulico-toscana',
    title: 'Idraulico in Toscana - Firenze e Province',
    h1: 'Idraulico Toscana',
    description: 'Trova idraulici in Toscana. Firenze, Pisa, Livorno e tutte le province.',
    keywords: ['idraulico toscana', 'firenze idraulico', 'toscana']
  },
  {
    slug: 'idraulico-sicilia',
    title: 'Idraulico in Sicilia - Palermo e Province',
    h1: 'Idraulico Sicilia',
    description: 'Idraulici in Sicilia. Palermo, Catania, Messina e tutte le province.',
    keywords: ['idraulico sicilia', 'palermo idraulico', 'catania idraulico']
  },
  {
    slug: 'idraulico-puglia',
    title: 'Idraulico in Puglia - Bari e Province',
    h1: 'Idraulico Puglia',
    description: 'Trova idraulici in Puglia. Bari, Lecce, Taranto e tutte le province.',
    keywords: ['idraulico puglia', 'bari idraulico', 'puglia']
  },
  {
    slug: 'idraulico-liguria',
    title: 'Idraulico in Liguria - Genova e Province',
    h1: 'Idraulico Liguria',
    description: 'Idraulici in Liguria. Genova, Savona, La Spezia e province.',
    keywords: ['idraulico liguria', 'genova idraulico', 'liguria']
  },
  // ============================================
  // SOLUZIONI RISPARMIO ENERGETICO
  // ============================================
  {
    slug: 'pompa-calore-aria-acqua',
    title: 'Pompa di Calore Aria-Acqua',
    h1: 'Pompa Aria-Acqua',
    description: 'Installazione pompa di calore aria-acqua. Riscaldamento e ACS.',
    keywords: ['aria acqua', 'pompa calore riscaldamento', 'split aria acqua']
  },
  {
    slug: 'pompa-calore-aria-aria',
    title: 'Pompa di Calore Aria-Aria',
    h1: 'Pompa Aria-Aria',
    description: 'Pompa di calore aria-aria per climatizzazione. Caldo e freddo.',
    keywords: ['aria aria', 'climatizzatore pompa calore', 'condizionatore riscaldamento']
  },
  {
    slug: 'caldaia-ibrida',
    title: 'Caldaia Ibrida - Condensazione + Pompa Calore',
    h1: 'Sistema Ibrido',
    description: 'Installazione caldaia ibrida: condensazione e pompa di calore insieme.',
    keywords: ['caldaia ibrida', 'sistema ibrido', 'condensazione pompa calore']
  },
  {
    slug: 'contabilizzazione-calore',
    title: 'Contabilizzazione Calore - Ripartitori',
    h1: 'Contabilizzatori Calore',
    description: 'Installazione ripartitori e contabilizzatori di calore. Obbligo condominiale.',
    keywords: ['contabilizzazione', 'ripartitori', 'lettura calorie']
  },
  {
    slug: 'cronotermostato-smart',
    title: 'Installazione Cronotermostato Smart',
    h1: 'Termostato Intelligente',
    description: 'Montaggio cronotermostato smart WiFi. Controllo da smartphone.',
    keywords: ['cronotermostato', 'termostato smart', 'termostato wifi']
  },
  // ============================================
  // SERVIZI OUTDOOR AGGIUNTIVI
  // ============================================
  {
    slug: 'fontana-giardino',
    title: 'Installazione Fontana da Giardino',
    h1: 'Fontana Giardino',
    description: 'Installazione fontane decorative e funzionali per giardino.',
    keywords: ['fontana giardino', 'fontana decorativa', 'installazione fontana']
  },
  {
    slug: 'irrigazione-automatica',
    title: 'Impianto Irrigazione Automatica',
    h1: 'Irrigazione Automatica',
    description: 'Sistema irrigazione automatico programmabile. Pop-up e gocciolamento.',
    keywords: ['irrigazione automatica', 'irrigatore programmabile', 'timer irrigazione']
  },
  {
    slug: 'laghetto-giardino',
    title: 'Impianto Idrico Laghetto Giardino',
    h1: 'Laghetto Artificiale',
    description: 'Realizzazione impianto idrico per laghetti ornamentali. Filtri e pompe.',
    keywords: ['laghetto giardino', 'stagno artificiale', 'pompe laghetto']
  },
  {
    slug: 'rubinetto-esterno',
    title: 'Installazione Rubinetto Esterno',
    h1: 'Rubinetto da Giardino',
    description: 'Installazione rubinetti esterni per giardino e cortile. Antigelo.',
    keywords: ['rubinetto esterno', 'rubinetto giardino', 'attacco acqua esterno']
  },
  {
    slug: 'doccia-esterna',
    title: 'Installazione Doccia Esterna',
    h1: 'Doccia da Giardino',
    description: 'Montaggio doccia esterna per giardino e piscina. Miscelata o fredda.',
    keywords: ['doccia esterna', 'doccia giardino', 'doccia piscina']
  },
  // ============================================
  // CERTIFICAZIONI E NORMATIVE
  // ============================================
  {
    slug: 'certificazione-conformita-impianto',
    title: 'Certificazione Conformità Impianto Idraulico',
    h1: 'Dichiarazione Conformità',
    description: 'Rilascio dichiarazione di conformità impianto idraulico. DM 37/08.',
    keywords: ['conformità impianto', 'dichiarazione conformità', 'dm 37/08']
  },
  {
    slug: 'libretto-caldaia',
    title: 'Compilazione Libretto Caldaia',
    h1: 'Libretto Impianto',
    description: 'Compilazione e aggiornamento libretto caldaia. Obbligo di legge.',
    keywords: ['libretto caldaia', 'libretto impianto', 'registro caldaia']
  },
  {
    slug: 'bollino-blu-caldaia',
    title: 'Bollino Blu Caldaia - Controllo Fumi',
    h1: 'Bollino Blu',
    description: 'Controllo fumi e rilascio bollino blu caldaia. Manutenzione obbligatoria.',
    keywords: ['bollino blu', 'controllo fumi', 'analisi combustione']
  },
  {
    slug: 'collaudo-impianto',
    title: 'Collaudo Impianto Idraulico',
    h1: 'Collaudo Impianti',
    description: 'Collaudo e prova pressione impianti idraulici. Certificazione tenuta.',
    keywords: ['collaudo', 'prova pressione', 'tenuta impianto']
  },
  // ============================================
  // PROBLEMI MENO COMUNI
  // ============================================
  {
    slug: 'incrostazioni-tubazioni',
    title: 'Rimozione Incrostazioni Tubazioni',
    h1: 'Pulizia Tubazioni Incrostate',
    description: 'Rimozione calcare e incrostazioni dalle tubazioni. Lavaggio acido.',
    keywords: ['incrostazioni tubi', 'calcare tubazioni', 'lavaggio acido']
  },
  {
    slug: 'corrosione-tubazioni',
    title: 'Tubazioni Corrose - Sostituzione',
    h1: 'Corrosione Tubi',
    description: 'Tubazioni corrose o bucate? Sostituzione parziale o totale.',
    keywords: ['corrosione', 'tubi corrosi', 'tubazioni vecchie']
  },
  {
    slug: 'radici-tubazioni',
    title: 'Radici nelle Tubazioni - Rimozione',
    h1: 'Radici nei Tubi',
    description: 'Radici di alberi nelle fogne? Rimozione e protezione tubazioni.',
    keywords: ['radici fogne', 'radici tubi', 'ostruzione radici']
  },
  {
    slug: 'grasso-tubazioni',
    title: 'Grasso nelle Tubazioni - Disostruzione',
    h1: 'Grasso nei Tubi',
    description: 'Accumulo di grasso negli scarichi? Disostruzione e prevenzione.',
    keywords: ['grasso scarichi', 'grasso tubazioni', 'sturare grasso']
  },
  {
    slug: 'oggetti-scarico',
    title: 'Oggetti nello Scarico - Recupero',
    h1: 'Oggetto Caduto nello Scarico',
    description: 'Hai perso un oggetto nello scarico? Recupero professionale.',
    keywords: ['oggetto scarico', 'recupero scarico', 'anello scarico']
  },
  
  // ============================================
  // NAPOLI - KEYWORD PAGES (Google Ads)
  // ============================================
  {
    slug: 'idraulico-napoli',
    title: 'Idraulico Napoli - Pronto Intervento 24/7 | Preventivo Gratis',
    h1: 'Idraulico a Napoli',
    description: 'Cerchi un idraulico a Napoli? Professionisti verificati, pronto intervento 24/7, preventivo gratuito. Risposta in 15 minuti. ⭐ 4.8/5 recensioni.',
    keywords: ['idraulico napoli', 'idraulico a napoli', 'idraulici napoli', 'pronto intervento idraulico napoli']
  },
  {
    slug: 'termoidraulica-napoli',
    title: 'Termoidraulica Napoli - Caldaie, Riscaldamento, Climatizzazione',
    h1: 'Termoidraulica a Napoli',
    description: 'Servizi di termoidraulica a Napoli. Installazione e manutenzione caldaie, impianti di riscaldamento e climatizzazione. Tecnici certificati.',
    keywords: ['termoidraulica napoli', 'termoidraulico napoli', 'caldaie napoli', 'riscaldamento napoli']
  },
  {
    slug: 'pronto-intervento-idraulico-napoli',
    title: 'Pronto Intervento Idraulico Napoli 24/7 - Emergenze',
    h1: 'Pronto Intervento Idraulico Napoli',
    description: 'Emergenza idraulica a Napoli? Pronto intervento 24 ore su 24, 7 giorni su 7. Arrivo rapido, risoluzione immediata. Chiama ora!',
    keywords: ['pronto intervento idraulico napoli', 'idraulico napoli pronto intervento', 'emergenza idraulico napoli', 'idraulico urgente napoli']
  },
  {
    slug: 'idraulico-napoli-centro',
    title: 'Idraulico Napoli Centro Storico - Pronto Intervento',
    h1: 'Idraulico Napoli Centro',
    description: 'Idraulico nel centro storico di Napoli. Interventi rapidi in zona Spaccanapoli, Piazza del Plebiscito, Decumani. Preventivo gratuito.',
    keywords: ['idraulico napoli centro', 'idraulico centro storico napoli', 'idraulico spaccanapoli', 'idraulico decumani']
  },
  {
    slug: 'idraulico-vomero',
    title: 'Idraulico Vomero Napoli - Pronto Intervento 24/7',
    h1: 'Idraulico al Vomero',
    description: 'Cerchi un idraulico al Vomero? Professionisti verificati per riparazioni, pronto intervento e manutenzione. Preventivo gratuito in 15 minuti.',
    keywords: ['idraulico vomero', 'idraulico vomero napoli', 'idraulici vomero', 'pronto intervento vomero']
  },
  {
    slug: 'idraulico-fuorigrotta',
    title: 'Idraulico Fuorigrotta Napoli - Interventi Rapidi',
    h1: 'Idraulico a Fuorigrotta',
    description: 'Idraulico a Fuorigrotta e Bagnoli. Riparazioni urgenti, manutenzione caldaie, installazioni. Preventivo gratuito, risposta rapida.',
    keywords: ['idraulico fuorigrotta', 'idraulico fuorigrotta napoli', 'idraulico bagnoli', 'idraulici fuorigrotta']
  },
  {
    slug: 'idraulico-posillipo',
    title: 'Idraulico Posillipo Napoli - Servizio Premium',
    h1: 'Idraulico a Posillipo',
    description: 'Idraulico a Posillipo. Servizio professionale per riparazioni, manutenzione e installazioni. Interventi rapidi, preventivo gratuito.',
    keywords: ['idraulico posillipo', 'idraulico posillipo napoli', 'idraulici posillipo', 'pronto intervento posillipo']
  },
  {
    slug: 'idraulico-chiaia',
    title: 'Idraulico Chiaia Napoli - Pronto Intervento',
    h1: 'Idraulico a Chiaia',
    description: 'Idraulico a Chiaia e Mergellina. Riparazioni urgenti, perdite, caldaie. Professionisti verificati con preventivo gratuito.',
    keywords: ['idraulico chiaia', 'idraulico chiaia napoli', 'idraulico mergellina', 'idraulici chiaia']
  },
  {
    slug: 'idraulico-san-giovanni-napoli',
    title: 'Idraulico San Giovanni a Teduccio Napoli',
    h1: 'Idraulico San Giovanni Napoli',
    description: 'Idraulico a San Giovanni a Teduccio e Ponticelli. Interventi rapidi, pronto intervento 24/7. Preventivo gratuito.',
    keywords: ['idraulico san giovanni napoli', 'idraulico ponticelli', 'idraulico teduccio', 'idraulici napoli est']
  },
  
  // ============================================
  // MILANO - KEYWORD PAGES (Google Ads)
  // ============================================
  {
    slug: 'idraulico-milano',
    title: 'Idraulico Milano - Pronto Intervento 24/7 | Preventivo Gratis',
    h1: 'Idraulico a Milano',
    description: 'Cerchi un idraulico a Milano? Professionisti verificati, pronto intervento 24/7, preventivo gratuito. Risposta in 15 minuti. ⭐ 4.8/5 recensioni.',
    keywords: ['idraulico milano', 'idraulico a milano', 'idraulici milano', 'pronto intervento idraulico milano']
  },
  {
    slug: 'termoidraulica-milano',
    title: 'Termoidraulica Milano - Caldaie, Riscaldamento, Climatizzazione',
    h1: 'Termoidraulica a Milano',
    description: 'Servizi di termoidraulica a Milano. Installazione e manutenzione caldaie, impianti di riscaldamento e climatizzazione. Tecnici certificati.',
    keywords: ['termoidraulica milano', 'termoidraulico milano', 'caldaie milano', 'riscaldamento milano']
  },
  {
    slug: 'pronto-intervento-idraulico-milano',
    title: 'Pronto Intervento Idraulico Milano 24/7 - Emergenze',
    h1: 'Pronto Intervento Idraulico Milano',
    description: 'Emergenza idraulica a Milano? Pronto intervento 24 ore su 24, 7 giorni su 7. Arrivo rapido, risoluzione immediata. Chiama ora!',
    keywords: ['pronto intervento idraulico milano', 'idraulico milano pronto intervento', 'emergenza idraulico milano', 'idraulico urgente milano']
  },
  {
    slug: 'idraulico-milano-centro',
    title: 'Idraulico Milano Centro - Duomo e Zona Centrale',
    h1: 'Idraulico Milano Centro',
    description: 'Idraulico nel centro di Milano. Interventi rapidi in zona Duomo, Cordusio, San Babila. Preventivo gratuito, risposta in 15 minuti.',
    keywords: ['idraulico milano centro', 'idraulico centro storico milano', 'idraulico duomo milano', 'idraulico san babila']
  },
  {
    slug: 'idraulico-navigli',
    title: 'Idraulico Navigli Milano - Pronto Intervento 24/7',
    h1: 'Idraulico ai Navigli',
    description: 'Cerchi un idraulico ai Navigli? Professionisti verificati per riparazioni, pronto intervento e manutenzione. Preventivo gratuito in 15 minuti.',
    keywords: ['idraulico navigli', 'idraulico navigli milano', 'idraulici navigli', 'pronto intervento navigli']
  },
  {
    slug: 'idraulico-porta-romana',
    title: 'Idraulico Porta Romana Milano - Interventi Rapidi',
    h1: 'Idraulico a Porta Romana',
    description: 'Idraulico a Porta Romana. Riparazioni urgenti, manutenzione caldaie, installazioni. Preventivo gratuito, risposta rapida.',
    keywords: ['idraulico porta romana', 'idraulico porta romana milano', 'idraulici porta romana', 'pronto intervento porta romana']
  },
  {
    slug: 'idraulico-brera',
    title: 'Idraulico Brera Milano - Servizio Premium',
    h1: 'Idraulico a Brera',
    description: 'Idraulico a Brera e Garibaldi. Servizio professionale per riparazioni, manutenzione e installazioni. Interventi rapidi, preventivo gratuito.',
    keywords: ['idraulico brera', 'idraulico brera milano', 'idraulici brera', 'idraulico garibaldi milano']
  },
  {
    slug: 'idraulico-isola',
    title: 'Idraulico Isola Milano - Pronto Intervento',
    h1: 'Idraulico all\'Isola',
    description: 'Idraulico a Isola Milano. Riparazioni urgenti, perdite, caldaie. Professionisti verificati con preventivo gratuito.',
    keywords: ['idraulico isola', 'idraulico isola milano', 'idraulici isola', 'pronto intervento isola']
  },
  {
    slug: 'idraulico-citta-studi',
    title: 'Idraulico Città Studi Milano - Lambrate e Piola',
    h1: 'Idraulico Città Studi',
    description: 'Idraulico a Città Studi, Lambrate e Piola. Interventi rapidi, pronto intervento 24/7. Preventivo gratuito.',
    keywords: ['idraulico citta studi', 'idraulico lambrate', 'idraulico piola', 'idraulici citta studi milano']
  },
  {
    slug: 'idraulico-porta-venezia',
    title: 'Idraulico Porta Venezia Milano - Interventi 24/7',
    h1: 'Idraulico a Porta Venezia',
    description: 'Idraulico a Porta Venezia e Buenos Aires. Riparazioni, manutenzione caldaie, installazioni. Preventivo gratuito.',
    keywords: ['idraulico porta venezia', 'idraulico porta venezia milano', 'idraulico buenos aires', 'idraulici porta venezia']
  },
  {
    slug: 'idraulico-san-siro',
    title: 'Idraulico San Siro Milano - Fiera e Stadio',
    h1: 'Idraulico a San Siro',
    description: 'Idraulico a San Siro e zona Fiera. Pronto intervento 24/7, riparazioni urgenti, manutenzione. Preventivo gratuito.',
    keywords: ['idraulico san siro', 'idraulico san siro milano', 'idraulico fiera milano', 'idraulici san siro']
  },
  {
    slug: 'idraulico-bicocca',
    title: 'Idraulico Bicocca Milano - Niguarda e Greco',
    h1: 'Idraulico alla Bicocca',
    description: 'Idraulico a Bicocca, Niguarda e Greco. Interventi rapidi, pronto intervento 24/7. Preventivo gratuito.',
    keywords: ['idraulico bicocca', 'idraulico bicocca milano', 'idraulico niguarda', 'idraulico greco']
  },
  {
    slug: 'idraulico-loreto',
    title: 'Idraulico Loreto Milano - Pronto Intervento',
    h1: 'Idraulico a Loreto',
    description: 'Idraulico a Piazzale Loreto e dintorni. Riparazioni urgenti, perdite, caldaie. Professionisti verificati.',
    keywords: ['idraulico loreto', 'idraulico loreto milano', 'idraulico piazzale loreto', 'idraulici loreto']
  },
  {
    slug: 'idraulico-centrale',
    title: 'Idraulico Stazione Centrale Milano - Interventi Rapidi',
    h1: 'Idraulico Stazione Centrale',
    description: 'Idraulico zona Stazione Centrale Milano. Pronto intervento 24/7, riparazioni urgenti. Preventivo gratuito.',
    keywords: ['idraulico stazione centrale', 'idraulico centrale milano', 'idraulici stazione centrale', 'pronto intervento centrale']
  },
  {
    slug: 'idraulico-corso-buenos-aires',
    title: 'Idraulico Corso Buenos Aires Milano',
    h1: 'Idraulico Corso Buenos Aires',
    description: 'Idraulico in zona Corso Buenos Aires. Interventi rapidi, manutenzione caldaie, installazioni. Preventivo gratuito.',
    keywords: ['idraulico corso buenos aires', 'idraulico buenos aires milano', 'idraulici buenos aires']
  },
  {
    slug: 'idraulico-sempione',
    title: 'Idraulico Sempione Milano - Arco della Pace',
    h1: 'Idraulico a Sempione',
    description: 'Idraulico a Sempione e Arco della Pace. Riparazioni, pronto intervento, manutenzione caldaie. Preventivo gratuito.',
    keywords: ['idraulico sempione', 'idraulico sempione milano', 'idraulico arco della pace', 'idraulici sempione']
  },
  {
    slug: 'idraulico-moscova',
    title: 'Idraulico Moscova Milano - Pronto Intervento',
    h1: 'Idraulico a Moscova',
    description: 'Idraulico a Moscova e Corso Como. Servizio professionale, interventi rapidi. Preventivo gratuito.',
    keywords: ['idraulico moscova', 'idraulico moscova milano', 'idraulico corso como', 'idraulici moscova']
  },
  {
    slug: 'idraulico-porta-genova',
    title: 'Idraulico Porta Genova Milano - Darsena',
    h1: 'Idraulico a Porta Genova',
    description: 'Idraulico a Porta Genova e Darsena. Riparazioni urgenti, manutenzione, installazioni. Preventivo gratuito.',
    keywords: ['idraulico porta genova', 'idraulico porta genova milano', 'idraulico darsena', 'idraulici porta genova']
  },
  {
    slug: 'idraulico-porta-ticinese',
    title: 'Idraulico Porta Ticinese Milano - Colonne di San Lorenzo',
    h1: 'Idraulico a Porta Ticinese',
    description: 'Idraulico a Porta Ticinese. Pronto intervento 24/7, riparazioni perdite, manutenzione caldaie. Preventivo gratuito.',
    keywords: ['idraulico porta ticinese', 'idraulico porta ticinese milano', 'idraulico colonne san lorenzo', 'idraulici porta ticinese']
  },
  {
    slug: 'idraulico-bovisa',
    title: 'Idraulico Bovisa Milano - Politecnico e Dergano',
    h1: 'Idraulico alla Bovisa',
    description: 'Idraulico a Bovisa e Dergano. Interventi rapidi, pronto intervento 24/7. Preventivo gratuito.',
    keywords: ['idraulico bovisa', 'idraulico bovisa milano', 'idraulico dergano', 'idraulici bovisa']
  },
  {
    slug: 'idraulico-affori',
    title: 'Idraulico Affori Milano - Comasina e Bruzzano',
    h1: 'Idraulico ad Affori',
    description: 'Idraulico ad Affori, Comasina e Bruzzano. Riparazioni, manutenzione caldaie, installazioni. Preventivo gratuito.',
    keywords: ['idraulico affori', 'idraulico affori milano', 'idraulico comasina', 'idraulico bruzzano']
  },
  {
    slug: 'idraulico-quarto-oggiaro',
    title: 'Idraulico Quarto Oggiaro Milano',
    h1: 'Idraulico a Quarto Oggiaro',
    description: 'Idraulico a Quarto Oggiaro. Pronto intervento 24/7, riparazioni urgenti, manutenzione. Preventivo gratuito.',
    keywords: ['idraulico quarto oggiaro', 'idraulico quarto oggiaro milano', 'idraulici quarto oggiaro']
  },
  {
    slug: 'idraulico-baggio',
    title: 'Idraulico Baggio Milano - Olmi e Muggiano',
    h1: 'Idraulico a Baggio',
    description: 'Idraulico a Baggio, Olmi e Muggiano. Interventi rapidi, riparazioni perdite, caldaie. Preventivo gratuito.',
    keywords: ['idraulico baggio', 'idraulico baggio milano', 'idraulico olmi', 'idraulico muggiano']
  },
  {
    slug: 'idraulico-corvetto',
    title: 'Idraulico Corvetto Milano - Rogoredo e Santa Giulia',
    h1: 'Idraulico a Corvetto',
    description: 'Idraulico a Corvetto, Rogoredo e Santa Giulia. Pronto intervento 24/7, manutenzione caldaie. Preventivo gratuito.',
    keywords: ['idraulico corvetto', 'idraulico corvetto milano', 'idraulico rogoredo', 'idraulico santa giulia']
  },
  {
    slug: 'idraulico-certosa',
    title: 'Idraulico Certosa Milano - Villapizzone',
    h1: 'Idraulico alla Certosa',
    description: 'Idraulico a Certosa e Villapizzone. Riparazioni urgenti, perdite, caldaie. Preventivo gratuito.',
    keywords: ['idraulico certosa', 'idraulico certosa milano', 'idraulico villapizzone', 'idraulici certosa']
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
  const baseUrl = 'https://www.idraulicisubito.com';
  const urls: string[] = [
    baseUrl + '/',
    baseUrl + '/richiesta',
    baseUrl + '/per-idraulici',
    baseUrl + '/auth',
    baseUrl + '/privacy',
    baseUrl + '/termini',
    baseUrl + '/blog',
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

// Statistics for SEO
export function getSEOStats() {
  const totalCities = CITIES.length;
  const totalServices = SERVICES.length;
  const totalKeywordPages = KEYWORD_PAGES.length;
  const totalCityServiceCombinations = totalCities * totalServices;
  const totalPages = totalCities + totalCityServiceCombinations + totalKeywordPages + 7; // +7 for static pages
  
  return {
    totalCities,
    totalServices,
    totalKeywordPages,
    totalCityServiceCombinations,
    totalPages
  };
}
