/**
 * Milano-Specific SEO Content
 * 
 * Ultra-optimized content for the /milano landing page
 * Target: Top 3 Google ranking for "idraulico milano"
 */

// Extended Milano neighborhoods (35+ zones)
export const MILANO_NEIGHBORHOODS = [
  // Centro e Zone Storiche
  'Centro Storico', 'Duomo', 'Brera', 'Navigli', 'Ticinese', 'Porta Genova', 
  'Colonne di San Lorenzo', 'Tortona', 'Sarpi', 'Chinatown',
  // Zone Nord
  'Isola', 'Porta Nuova', 'Garibaldi', 'Centrale', 'Bicocca', 'Bovisa', 
  'Niguarda', 'Affori', 'Bruzzano', 'Quarto Oggiaro', 'Greco', 'Precotto',
  // Zone Est
  'Porta Venezia', 'Città Studi', 'Lambrate', 'Loreto', 'Turro', 
  'Gorla', 'Crescenzago', 'Cimiano', 'Udine',
  // Zone Sud
  'Porta Romana', 'Barona', 'Corvetto', 'Gratosoglio', 'Chiesa Rossa',
  'Vigentino', 'Rogoredo', 'Stadera', 'Ripamonti',
  // Zone Ovest
  'San Siro', 'Baggio', 'Lorenteggio', 'Giambellino', 'Sempione', 'Fiera'
];

// Extended nearby municipalities (province coverage)
export const MILANO_NEARBY_AREAS = [
  // Nord
  'Sesto San Giovanni', 'Cinisello Balsamo', 'Monza', 'Cologno Monzese', 
  'Cusano Milanino', 'Bresso', 'Paderno Dugnano',
  // Est
  'Segrate', 'Pioltello', 'Cernusco sul Naviglio', 'Vimodrone', 'San Donato Milanese',
  // Sud
  'San Giuliano Milanese', 'Rozzano', 'Opera', 'Assago', 'Buccinasco', 'Corsico',
  // Ovest
  'Settimo Milanese', 'Pero', 'Rho', 'Arese', 'Bollate', 'Garbagnate Milanese'
];

// Milano-specific building types and their plumbing challenges
export const MILANO_BUILDING_TYPES = [
  {
    type: 'Palazzi Liberty e storici del Centro',
    description: 'Edifici del primo Novecento con architettura Liberty, tubature in piombo o ghisa originali',
    challenges: ['Tubature centenarie', 'Colonne verticali condivise', 'Vincoli architettonici'],
    neighborhoods: ['Brera', 'Centro Storico', 'Porta Venezia', 'Magenta']
  },
  {
    type: 'Case di ringhiera anni \'30-\'50',
    description: 'Tipiche abitazioni milanesi con ballatoio, impianti in ferro zincato',
    challenges: ['Bagni aggiunti successivamente', 'Pressione variabile', 'Scarichi sottodimensionati'],
    neighborhoods: ['Navigli', 'Ticinese', 'Isola', 'Barona', 'Giambellino']
  },
  {
    type: 'Condomini anni \'60-\'80',
    description: 'Grandi complessi residenziali del boom edilizio con impianti centralizzati',
    challenges: ['Calcare nei tubi', 'Caldaie condominiali', 'Colonne di scarico usurate'],
    neighborhoods: ['Città Studi', 'Bicocca', 'Corvetto', 'San Siro', 'Lorenteggio']
  },
  {
    type: 'Loft e appartamenti ristrutturati',
    description: 'Ex spazi industriali convertiti in abitazioni moderne, impianti recenti',
    challenges: ['Impianti complessi', 'Grandi metrature', 'Materiali di pregio'],
    neighborhoods: ['Tortona', 'Lambrate', 'Porta Nuova', 'Isola', 'Bovisa']
  }
];

// Why plumbing problems are frequent in Milano - local context
export const MILANO_PROBLEM_REASONS = [
  {
    title: 'Patrimonio edilizio eterogeneo',
    description: 'Milano ha edifici che spaziano dal Liberty agli anni \'80 fino ai grattacieli moderni. Ogni epoca ha materiali e problematiche diverse.',
    icon: 'Building'
  },
  {
    title: 'Acqua molto dura (calcarea)',
    description: 'L\'acqua di Milano ha una durezza di 30-35°F, tra le più alte in Italia. Causa incrostazioni in caldaie, rubinetti e tubature.',
    icon: 'Droplets'
  },
  {
    title: 'Rete fognaria storica',
    description: 'La rete fognaria del centro risale all\'Ottocento. Gli scarichi possono avere pendenze insufficienti e diametri ridotti.',
    icon: 'GitBranch'
  },
  {
    title: 'Alta densità abitativa',
    description: 'Milano è la città più densamente popolata d\'Italia dopo Napoli. Gli impianti condominiali sono sotto stress costante.',
    icon: 'Users'
  },
  {
    title: 'Escursioni termiche invernali',
    description: 'Gli inverni rigidi milanesi (-5°C frequenti) causano rotture per gelo e caldaie in blocco.',
    icon: 'Thermometer'
  }
];

// Extended FAQs for Milano (10 questions)
export const MILANO_EXTENDED_FAQS = [
  {
    question: 'Quanto costa un idraulico a Milano?',
    answer: 'Il costo di un idraulico a Milano varia da 60€ a 200€ per interventi standard. Una riparazione perdita costa 70-120€, lo spurgo di uno scarico 80-150€, la manutenzione caldaia 90-160€. Le emergenze notturne o festive hanno una maggiorazione del 30-50%. Milano ha costi leggermente superiori alla media nazionale.'
  },
  {
    question: 'In quanto tempo arriva un idraulico a Milano?',
    answer: 'A Milano città, i nostri idraulici arrivano mediamente in 25-45 minuti. Per le emergenze gravi (allagamenti, perdite importanti) i tempi si riducono a 15-25 minuti. Nelle zone periferiche e nell\'hinterland i tempi aumentano a 40-70 minuti. Il servizio è attivo 24/7.'
  },
  {
    question: 'Gli idraulici a Milano lavorano anche di domenica e festivi?',
    answer: 'Sì, molti idraulici milanesi offrono pronto intervento 24/7 inclusi domenica, festivi, Natale e agosto. Le tariffe festive hanno una maggiorazione del 30-50% ma garantiscono assistenza immediata per emergenze come allagamenti o caldaie bloccate in inverno.'
  },
  {
    question: 'Come scelgo un idraulico affidabile a Milano?',
    answer: 'Con IdrauliciSubito trovi solo idraulici verificati a Milano. Verifichiamo esperienza, recensioni e affidabilità. Compila il form indicando problema e zona: riceverai risposta da un professionista della tua area che fornirà preventivo dettagliato senza impegno.'
  },
  {
    question: 'In quali zone di Milano intervenite?',
    answer: 'Copriamo tutta Milano: Centro, Navigli, Brera, Isola, Porta Nuova, Città Studi, Bicocca, Bovisa, San Siro, Corvetto, Barona e tutte le altre zone. Interveniamo anche nell\'hinterland: Sesto, Monza, Rho, San Donato, Rozzano, Assago e tutti i comuni limitrofi.'
  },
  {
    question: 'Quanto costa un pronto intervento notturno a Milano?',
    answer: 'Un pronto intervento notturno a Milano costa mediamente il 30-50% in più rispetto alle tariffe diurne. Per una perdita d\'acqua urgente, aspettati 100-180€. Per uno scarico intasato di notte, 120-200€. Il preventivo viene sempre comunicato prima dell\'intervento.'
  },
  {
    question: 'Gli idraulici a Milano rilasciano fattura?',
    answer: 'Sì, gli idraulici professionisti a Milano rilasciano regolare fattura. Questo è importante per le detrazioni fiscali del 50% per manutenzione straordinaria. Chiedi sempre la fattura prima di pagare e verifica che includa descrizione lavori e materiali utilizzati.'
  },
  {
    question: 'Cosa fare in caso di perdita d\'acqua urgente a Milano?',
    answer: 'In caso di perdita d\'acqua a Milano: 1) Chiudi subito il rubinetto generale (di solito in bagno o nel locale contatori), 2) Se l\'acqua arriva dal piano di sopra, avvisa i vicini, 3) Richiedi un idraulico urgente tramite IdrauliciSubito. Non aspettare: i danni da acqua peggiorano rapidamente.'
  },
  {
    question: 'Perché l\'acqua a Milano è così calcarea?',
    answer: 'L\'acqua di Milano proviene da falde sotterranee ricche di calcio e magnesio. La durezza di 30-35°F causa depositi nelle tubature e negli elettrodomestici. Consigliamo addolcitori per chi ha caldaie, lavatrici e lavastoviglie. Gli idraulici milanesi conoscono bene questo problema.'
  },
  {
    question: 'Quanto costa sostituire una caldaia a Milano?',
    answer: 'Sostituire una caldaia a Milano costa da 1.800€ a 4.000€ inclusa installazione, a seconda della potenza e del modello. Le caldaie a condensazione (obbligatorie per nuove installazioni) costano di più ma garantiscono risparmio in bolletta del 20-30%. Approfitta delle detrazioni fiscali fino al 65%.'
  }
];

// Milano-specific statistics
export const MILANO_STATISTICS = {
  interventionsPerMonth: '3.200+',
  averageResponseTime: '30 min',
  activePlumbers: '120+',
  customerSatisfaction: '4.8/5',
  coveredArea: '182 km²',
  population: '1.400.000'
};

// Emergency tips specific to Milano
export const MILANO_EMERGENCY_TIPS = [
  {
    situation: 'Perdita d\'acqua in condominio',
    tip: 'Nelle case di ringhiera e nei condomini storici di Milano, le colonne di scarico sono condivise. Controlla se anche i vicini hanno problemi: potrebbe essere la colonna condominiale.'
  },
  {
    situation: 'Caldaia bloccata in inverno',
    tip: 'Con le temperature sotto zero frequenti a Milano, la caldaia in blocco è un\'emergenza. Controlla la pressione (1-1.5 bar) e prova il reset. Se non funziona, chiama un tecnico abilitato.'
  },
  {
    situation: 'Scarico lento o gorgogliante',
    tip: 'A Milano il calcare è il nemico principale degli scarichi. Se lo scarico è lento, evita prodotti chimici aggressivi e chiama un professionista per una pulizia con idropulitrice.'
  },
  {
    situation: 'Rottura tubo per gelo',
    tip: 'In inverno i tubi esterni o in locali non riscaldati possono gelare e rompersi. Chiudi subito l\'acqua al contatore e chiama un idraulico. Mai tentare di scaldare i tubi con fiamme libere.'
  }
];

// Long-form intro content for Milano (SEO optimized, 300+ words)
export const MILANO_INTRO_CONTENT = {
  headline: 'Idraulico a Milano: Pronto Intervento 24h in Tutti i Quartieri',
  subheadline: 'Trova rapidamente un idraulico professionista nella tua zona di Milano',
  
  paragraph1: `Stai cercando un **idraulico a Milano** per un'emergenza o una manutenzione programmata? Milano, con il suo mix unico di palazzi Liberty, case di ringhiera, condomini d'epoca e loft moderni, presenta sfide idrauliche specifiche che richiedono professionisti esperti e preparati.`,
  
  paragraph2: `La capitale economica d'Italia è caratterizzata da un'**acqua particolarmente calcarea** (30-35°F di durezza), tra le più dure in Italia, che causa depositi e incrostazioni negli impianti domestici. Gli inverni rigidi con temperature sotto zero creano ulteriori problematiche come il gelo delle tubature esterne e i blocchi delle caldaie.`,
  
  paragraph3: `Con **IdrauliciSubito** trovi rapidamente un idraulico verificato disponibile nella tua zona di Milano. Il nostro servizio copre capillarmente l'intera città: dal Centro ai Navigli, da Brera all'Isola, da Porta Nuova a Città Studi, dalla Bicocca a Bovisa, da San Siro al Corvetto, dalla Barona a Porta Romana. Interveniamo anche in tutto l'hinterland milanese: Sesto San Giovanni, Monza, Rho, San Donato Milanese, Rozzano e tutti i comuni della cintura metropolitana.`,
  
  paragraph4: `I problemi idraulici più frequenti a Milano includono: **perdite d'acqua** causate dalla corrosione dei vecchi impianti in ferro zincato, **scarichi intasati** dal calcare, **caldaie in blocco** durante le ondate di freddo invernali, **bassa pressione** ai piani alti dei palazzi storici. Per ognuno di questi problemi i nostri idraulici hanno l'esperienza e gli strumenti per intervenire rapidamente ed efficacemente.`,
  
  whyUs: [
    'Idraulici milanesi verificati con esperienza specifica sulle tipologie edilizie locali',
    'Pronto intervento 24/7 in tutti i quartieri di Milano e hinterland',
    'Preventivi gratuiti e trasparenti prima di ogni intervento',
    'Tempi di arrivo medi di 30 minuti in città',
    'Conoscenza approfondita delle problematiche locali: calcare, gelo, edifici storici'
  ]
};
