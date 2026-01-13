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
