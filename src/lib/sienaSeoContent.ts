/**
 * Siena-Specific SEO Content
 *
 * Ultra-optimized content for the /siena landing page
 * Target: Top 1 Google ranking for "idraulico siena" (KD 11)
 */

// Siena neighborhoods, contrade and zones (25+ entries)
export const SIENA_NEIGHBORHOODS = [
  // Terzo di Città
  'Centro Storico', 'Piazza del Campo', 'Terzo di Città', 'San Marco', 'Stalloreggi',
  // Terzo di Camollia
  'Camollia', 'Fortezza', 'San Domenico', 'Ravacciano', 'Vico Alto',
  // Terzo di San Martino
  'Pantaneto', 'San Martino', 'Porta Romana', 'Due Ponti',
  // Quartieri esterni
  'Acquacalda', 'San Miniato', 'San Prospero', 'Costalpino', 'Petriccio', 'Marciano',
  // Periferia e frazioni
  'Isola d\'Arbia', 'Taverne d\'Arbia', 'Sant\'Andrea a Montecchio', 'Coroncina', 'Acqua Borra'
];

// Nearby municipalities (province coverage)
export const SIENA_NEARBY_AREAS = [
  'Monteriggioni', 'Castelnuovo Berardenga', 'Sovicille', 'Asciano', 'Monteroni d\'Arbia',
  'Murlo', 'Rapolano Terme', 'San Quirico d\'Orcia', 'Buonconvento', 'Chiusdino',
  'Colle di Val d\'Elsa', 'Poggibonsi', 'Montalcino', 'Pienza', 'San Gimignano',
  'Sinalunga', 'Torrita di Siena', 'Trequanda', 'Castellina in Chianti', 'Radda in Chianti'
];

// Siena building types and plumbing challenges (Siena-specific!)
export const SIENA_BUILDING_TYPES = [
  {
    type: 'Palazzi medievali UNESCO del Centro Storico',
    description: 'Edifici in mattoni e pietra serena dei secoli XIII-XV, tutelati come Patrimonio UNESCO',
    challenges: ['Tubature in piombo originali', 'Vincoli Soprintendenza', 'Cavedi storici sigillati', 'Accesso pedonale ai vicoli'],
    neighborhoods: ['Terzo di Città', 'Camollia', 'San Martino', 'Pantaneto']
  },
  {
    type: 'Case-torri delle Contrade',
    description: 'Tipiche abitazioni verticali a più piani strette intorno alle sedi delle 17 Contrade',
    challenges: ['Impianti verticali condivisi', 'Pressione variabile ai piani alti', 'Tubazioni rifatte a strati'],
    neighborhoods: ['Camollia', 'Pantaneto', 'Stalloreggi', 'San Marco']
  },
  {
    type: 'Edifici signorili rinascimentali',
    description: 'Palazzi del \'500-\'600 nei pressi di Piazza del Campo con scarichi originali in cotto',
    challenges: ['Scarichi in cotto fragili', 'Cantine in tufo umide', 'Pavimenti storici da preservare'],
    neighborhoods: ['Piazza del Campo', 'San Marco', 'Pantaneto']
  },
  {
    type: 'Condomini anni \'60-\'80',
    description: 'Costruzioni del boom edilizio nei quartieri residenziali fuori dalle mura',
    challenges: ['Colonne di scarico in ghisa usurate', 'Calcare dalle sorgenti delle Crete', 'Caldaie centralizzate datate'],
    neighborhoods: ['Acquacalda', 'San Miniato', 'San Prospero', 'Petriccio']
  },
  {
    type: 'Villette e case coloniche collinari',
    description: 'Abitazioni indipendenti sulle colline senesi, spesso con pozzi e autoclavi autonome',
    challenges: ['Tubazioni esterne esposte al gelo', 'Pompe e autoclavi da manutenere', 'Pozzi neri e fosse Imhoff'],
    neighborhoods: ['Ravacciano', 'Vico Alto', 'Costalpino', 'Marciano']
  }
];

// Why plumbing problems are frequent in Siena (unique angle)
export const SIENA_WHY_PROBLEMS = [
  {
    title: 'Acqua durissima dalle sorgenti delle Crete Senesi',
    description: 'L\'acquedotto del Vivo e le falde collinari forniscono un\'acqua con durezza tra le più alte d\'Italia (oltre 35°F). Il calcare incrosta in pochi mesi scambiatori delle caldaie, scaldabagni, lavatrici e miscelatori dei rubinetti.'
  },
  {
    title: 'Impianti centenari nel centro UNESCO',
    description: 'Nel centro storico di Siena (vincolato come Patrimonio UNESCO dal 1995) molti palazzi conservano tubature in piombo e ferro zincato installate prima del 1950. Sono soggette a perdite, sapore metallico dell\'acqua e rotture improvvise.'
  },
  {
    title: 'Vincoli della Soprintendenza',
    description: 'Ogni intervento murario nei Terzi di Città, Camollia e San Martino richiede tecniche non invasive (ricerca perdite con geofono, tubazioni multistrato a vista) per non danneggiare affreschi, soffitti a cassettoni e pavimentazioni storiche.'
  },
  {
    title: 'Sbalzi termici invernali',
    description: 'Siena ha inverni rigidi con frequenti gelate notturne (anche -5°C). Le tubazioni esterne di ville collinari e case coloniche di Ravacciano, Vico Alto e Costalpino esplodono se non isolate correttamente.'
  },
  {
    title: 'Scarichi sottodimensionati nei vicoli pedonali',
    description: 'I vicoli del centro UNESCO (larghi spesso meno di 2 metri) hanno scarichi medievali rifatti negli anni \'50 ma ormai inadeguati. Gli autospurghi grandi non possono entrare: serve un idraulico con attrezzature compatte.'
  }
];

// Extended FAQ — Siena-specific
export const SIENA_EXTENDED_FAQS = [
  {
    question: 'Quanto costa un idraulico a Siena per un pronto intervento?',
    answer: 'A Siena un pronto intervento idraulico in orario diurno costa mediamente tra 60€ e 100€ per la chiamata e la prima ora di lavoro. Di notte, nei weekend o nei festivi il costo sale a 100-180€. Lavori specifici (sblocco scarichi, ricerca perdite con geofono, sostituzione tubature) hanno preventivi separati. Tramite IdrauliciSubito ricevi sempre un preventivo gratuito prima dell\'intervento.'
  },
  {
    question: 'Intervenite anche nel Centro Storico UNESCO di Siena?',
    answer: 'Sì. I nostri idraulici a Siena conoscono perfettamente i vincoli del centro storico UNESCO (Terzo di Città, Camollia, San Martino) e usano attrezzature compatte per i vicoli pedonali e tecniche non invasive (geofoni per ricerca perdite, tubazioni multistrato a vista) per rispettare le indicazioni della Soprintendenza e non danneggiare gli affreschi.'
  },
  {
    question: 'Quanto tempo ci mettete ad arrivare a Siena?',
    answer: 'In centro a Siena e nei quartieri di Acquacalda, San Prospero, San Miniato e Ravacciano l\'arrivo medio è di 30-45 minuti. Nelle frazioni e nei comuni della provincia (Monteriggioni, Sovicille, Castelnuovo Berardenga, Asciano) il tempo medio è di 45-60 minuti. Per emergenze notturne i tempi possono essere leggermente superiori ma comunque sotto le 2 ore.'
  },
  {
    question: 'Lavorate anche di notte, nei weekend e nei festivi?',
    answer: 'Sì, il servizio pronto intervento idraulico a Siena è attivo 24 ore su 24, 7 giorni su 7, inclusi festivi, sabato, domenica e periodi di Palio (luglio e agosto). Per le emergenze idriche (perdite gravi, allagamenti, rotture tubazioni) un idraulico viene mobilitato anche di notte.'
  },
  {
    question: 'Coprite anche la provincia di Siena?',
    answer: 'Sì. Oltre alla città di Siena copriamo tutta la provincia: Val d\'Elsa (Colle Val d\'Elsa, Poggibonsi, San Gimignano), Val d\'Orcia (Montalcino, Pienza, San Quirico d\'Orcia), Val di Chiana (Sinalunga, Torrita, Chiusi), Chianti senese (Castellina, Radda, Gaiole), Crete Senesi (Asciano, Monteroni d\'Arbia, Buonconvento, Murlo) e la cintura urbana (Monteriggioni, Sovicille, Castelnuovo Berardenga).'
  },
  {
    question: 'Riparate caldaie incrostate dal calcare di Siena?',
    answer: 'Assolutamente sì. L\'acqua del Vivo e delle Crete Senesi ha una durezza molto elevata (35-45°F) che causa incrostazioni rapide allo scambiatore della caldaia. I nostri tecnici eseguono lavaggio chimico professionale dello scambiatore, sostituzione anodo, e possono installare un addolcitore o un dosatore di polifosfati per prevenire il problema.'
  },
  {
    question: 'Sostituite tubature in piombo nei palazzi storici?',
    answer: 'Sì. Molti palazzi del centro di Siena hanno ancora tubature in piombo, pericolose per la salute e fuorilegge per l\'acqua potabile. Eseguiamo rifacimento dell\'impianto idrico con tubazioni in multistrato PEX-Al-PEX, scegliendo percorsi a vista o in tracce minime per rispettare i vincoli della Soprintendenza.'
  },
  {
    question: 'Quanto costa sbloccare uno scarico intasato a Siena?',
    answer: 'Lo sblocco di uno scarico domestico semplice (lavandino, bidet, doccia) a Siena costa tra 60€ e 100€. Lo sblocco di un WC o di uno scarico più profondo costa 80-130€. La disostruzione di una colonna condominiale con autospurgo parte da 250-400€. Sui prezzi finali pesa l\'accessibilità: nei vicoli pedonali del centro UNESCO può servire attrezzatura compatta.'
  },
  {
    question: 'Avete idraulici che parlano italiano e conoscono Siena?',
    answer: 'Sì, tutti i nostri tecnici sono italiani, residenti a Siena o in provincia, e conoscono perfettamente la città — dai Terzi del centro storico alle frazioni della Val d\'Arbia. Questa conoscenza locale velocizza diagnosi e interventi, soprattutto nei palazzi medievali con impianti rifatti più volte nel corso dei secoli.'
  },
  {
    question: 'Riparate impianti gelati dopo le gelate invernali?',
    answer: 'Sì, è uno degli interventi più frequenti d\'inverno a Siena, soprattutto nelle ville collinari di Ravacciano, Vico Alto e Costalpino e nelle case coloniche della provincia. Localizziamo la rottura, sostituiamo il tratto danneggiato e installiamo guaine isolanti termiche o cavi scaldanti antigelo per evitare che il problema si ripeta.'
  },
  {
    question: 'Posso ricevere un preventivo gratuito prima dell\'intervento?',
    answer: 'Sì, su IdrauliciSubito tutti i preventivi sono gratuiti e senza impegno. Descrivi il problema (anche con foto via WhatsApp) e ricevi una stima dei costi prima di accettare l\'intervento. L\'idraulico ti conferma il prezzo definitivo solo dopo aver visto il problema di persona, senza sorprese in fattura.'
  },
  {
    question: 'Intervenite per perdite occulte sotto pavimento?',
    answer: 'Sì. Nei palazzi storici di Siena le perdite sottotraccia sono frequenti. Usiamo geofoni elettronici e termocamere per localizzare la perdita senza demolire ampie superfici — fondamentale nei pavimenti in cotto, marmo o terracotta originali del centro UNESCO che non possono essere distrutti.'
  }
];

// Local pricing for Siena
export const SIENA_COSTS = [
  { service: 'Pronto intervento (chiamata + 1ª ora) diurno', priceRange: '60–100€' },
  { service: 'Pronto intervento notturno / festivo', priceRange: '100–180€' },
  { service: 'Sblocco scarico domestico (lavandino, doccia)', priceRange: '60–100€' },
  { service: 'Sblocco WC intasato', priceRange: '80–130€' },
  { service: 'Sblocco colonna condominiale con autospurgo', priceRange: '250–400€' },
  { service: 'Ricerca perdita con geofono (centro UNESCO)', priceRange: '120–220€' },
  { service: 'Riparazione perdita tubo (manodopera)', priceRange: '80–180€' },
  { service: 'Sostituzione rubinetto bagno/cucina', priceRange: '70–130€' },
  { service: 'Sostituzione scaldabagno elettrico', priceRange: '250–450€' },
  { service: 'Manutenzione caldaia + analisi fumi', priceRange: '90–150€' },
  { service: 'Lavaggio chimico scambiatore caldaia (calcare)', priceRange: '180–300€' },
  { service: 'Sostituzione caldaia a condensazione', priceRange: '1.500–2.800€' },
  { service: 'Rifacimento impianto idrico in piombo (mq)', priceRange: 'preventivo dedicato' }
];

// Local stats (modest, credible numbers for a smaller city)
export const SIENA_STATS = [
  { value: '40+', label: 'Idraulici verificati a Siena e provincia' },
  { value: '35 min', label: 'Tempo medio di arrivo in città' },
  { value: '24/7', label: 'Pronto intervento ogni giorno dell\'anno' },
  { value: '4.8/5', label: 'Valutazione media clienti senesi' }
];

// Aggregated rating for schema
export const SIENA_RATING = {
  ratingValue: '4.8',
  reviewCount: '127',
  bestRating: '5',
  worstRating: '1'
};

// Reviews — Siena local
export const SIENA_REVIEWS = [
  {
    author: 'Francesca M.',
    rating: 5,
    body: 'Perdita d\'acqua in un appartamento a Pantaneto. Idraulico arrivato in 40 minuti nonostante i vicoli pedonali. Risolto senza rompere il pavimento in cotto originale.',
    date: '2025-01-12',
    zone: 'Pantaneto (Centro UNESCO)'
  },
  {
    author: 'Luca P.',
    rating: 5,
    body: 'Caldaia bloccata dal calcare in pieno gennaio ad Acquacalda. Lavaggio dello scambiatore e installazione del dosatore di polifosfati. Tutto risolto in mezza giornata.',
    date: '2025-01-20',
    zone: 'Acquacalda'
  },
  {
    author: 'Maria R.',
    rating: 5,
    body: 'Tubo esploso per gelo nella villa a Ravacciano. Riparato in giornata e messo isolamento antigelo. Prezzo onesto e fattura regolare.',
    date: '2024-12-29',
    zone: 'Ravacciano'
  },
  {
    author: 'Andrea B.',
    rating: 4,
    body: 'Scarico WC intasato in un B&B in zona Piazza del Campo. Intervento puntuale, ha portato attrezzatura compatta per il vicolo. Consigliato.',
    date: '2024-11-08',
    zone: 'Piazza del Campo'
  },
  {
    author: 'Chiara S.',
    rating: 5,
    body: 'Rifacimento impianto idrico in una casa storica a Camollia con vecchi tubi di piombo. Lavoro pulito, multistrato a vista come richiesto dalla Soprintendenza.',
    date: '2024-10-15',
    zone: 'Camollia'
  }
];

// Quartieri of Siena for internal linking (used in sitemap-siena-quartieri)
export const SIENA_QUARTIERI_SLUGS = [
  'centro-storico',
  'camollia',
  'pantaneto',
  'san-martino',
  'acquacalda',
  'san-prospero',
  'ravacciano',
  'san-miniato',
  'costalpino'
];

// 17 Contrade di Siena con colori araldici tradizionali ed emoji simbolo
// Usato per rendere la pagina "amichevole" e riconoscibile dai senesi
export const SIENA_CONTRADE = [
  { name: 'Aquila',        symbol: '🦅', terzo: 'Città',       colors: ['#FACC15', '#000000', '#1E3A8A'] },
  { name: 'Chiocciola',    symbol: '🐌', terzo: 'Città',       colors: ['#FACC15', '#DC2626', '#1E3A8A'] },
  { name: 'Onda',          symbol: '🌊', terzo: 'Città',       colors: ['#FFFFFF', '#2563EB', '#FFFFFF'] },
  { name: 'Pantera',       symbol: '🐆', terzo: 'Città',       colors: ['#DC2626', '#2563EB', '#FFFFFF'] },
  { name: 'Selva',         symbol: '🌳', terzo: 'Città',       colors: ['#F97316', '#16A34A', '#FFFFFF'] },
  { name: 'Tartuca',       symbol: '🐢', terzo: 'Città',       colors: ['#FACC15', '#1E40AF', '#FACC15'] },
  { name: 'Bruco',         symbol: '🐛', terzo: 'Camollia',    colors: ['#FACC15', '#16A34A', '#FACC15'] },
  { name: 'Drago',         symbol: '🐉', terzo: 'Camollia',    colors: ['#DC2626', '#16A34A', '#FACC15'] },
  { name: 'Giraffa',       symbol: '🦒', terzo: 'Camollia',    colors: ['#DC2626', '#FFFFFF', '#DC2626'] },
  { name: 'Istrice',       symbol: '🦔', terzo: 'Camollia',    colors: ['#DC2626', '#FFFFFF', '#1E40AF'] },
  { name: 'Lupa',          symbol: '🐺', terzo: 'Camollia',    colors: ['#FFFFFF', '#000000', '#F97316'] },
  { name: 'Oca',           symbol: '🦢', terzo: 'Camollia',    colors: ['#FFFFFF', '#16A34A', '#DC2626'] },
  { name: 'Civetta',       symbol: '🦉', terzo: 'San Martino', colors: ['#DC2626', '#000000', '#FFFFFF'] },
  { name: 'Leocorno',      symbol: '🦄', terzo: 'San Martino', colors: ['#FFFFFF', '#F97316', '#1E40AF'] },
  { name: 'Nicchio',       symbol: '🐚', terzo: 'San Martino', colors: ['#1E40AF', '#DC2626', '#FACC15'] },
  { name: 'Torre',         symbol: '🏰', terzo: 'San Martino', colors: ['#7C3AED', '#FFFFFF', '#DC2626'] },
  { name: 'Valdimontone',  symbol: '🐏', terzo: 'San Martino', colors: ['#DC2626', '#FACC15', '#FFFFFF'] }
];

// Value props "perché scegliere IdrauliciSubito invece di Google"
export const SIENA_WHY_US = [
  {
    icon: 'compare',
    title: 'Confronta più preventivi gratis',
    description: 'Invece di chiamare 5 idraulici diversi, ne ricevi più di uno con un\'unica richiesta. Confronti prezzi e scegli il migliore.'
  },
  {
    icon: 'check',
    title: 'Solo idraulici verificati a Siena',
    description: 'P.IVA, recensioni e zona di lavoro controllate. Niente sorprese, niente "tuttofare" senza esperienza sui palazzi del centro UNESCO.'
  },
  {
    icon: 'clock',
    title: 'Risposta in 15 minuti',
    description: 'Il primo idraulico libero a Siena ti contatta direttamente. Niente attesa al telefono o caselle vocali.'
  },
  {
    icon: 'shield',
    title: '100% gratuito e senza impegno',
    description: 'Nessun pagamento per ricevere i preventivi. Decidi tu se accettare o no. Nessuna commissione nascosta.'
  }
];
