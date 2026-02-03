/**
 * Napoli-Specific SEO Content
 * 
 * Ultra-optimized content for the /napoli landing page
 * Target: Top 3 Google ranking for "idraulico napoli"
 */

// Extended Napoli neighborhoods (40+ zones) - Complete coverage
export const NAPOLI_NEIGHBORHOODS = [
  // Zone Centro Storico
  'Centro Storico', 'Spaccanapoli', 'Quartieri Spagnoli', 'Forcella', 'San Lorenzo',
  'Pendino', 'Mercato', 'Vicaria', 'Porto', 'San Giuseppe',
  // Zone Storiche
  'Sanità', 'Stella', 'Avvocata', 'Montecalvario', 'San Ferdinando',
  'San Carlo all\'Arena',
  // Zone Collinari
  'Vomero', 'Arenella', 'Posillipo', 'Capodimonte', 'Colli Aminei',
  'Rione Alto', 'Materdei',
  // Zone Costiere
  'Chiaia', 'Mergellina', 'Santa Lucia', 'Bagnoli', 'Marechiaro', 'Agnano',
  // Zone Residenziali Ovest
  'Fuorigrotta', 'Soccavo', 'Pianura', 'Cavalleggeri',
  // Zone Est
  'San Giovanni a Teduccio', 'Barra', 'Ponticelli', 'Poggioreale', 'Gianturco',
  // Zone Nord
  'Secondigliano', 'Scampia', 'Piscinola', 'Chiaiano', 'Miano', 'Marianella'
];

// Extended nearby municipalities (province coverage)
export const NAPOLI_NEARBY_AREAS = [
  // Costa
  'Pozzuoli', 'Bacoli', 'Monte di Procida', 'Ischia', 'Procida',
  // Vesuvio
  'Portici', 'Ercolano', 'Torre del Greco', 'Torre Annunziata', 'Pompei',
  // Nord
  'Casoria', 'Afragola', 'Giugliano in Campania', 'Marano di Napoli', 'Mugnano',
  // Est
  'Nola', 'Acerra', 'Pomigliano d\'Arco', 'Casalnuovo', 'Volla'
];

// Napoli-specific building types and their plumbing challenges
export const NAPOLI_BUILDING_TYPES = [
  {
    type: 'Palazzi storici del Centro',
    description: 'Edifici del XVI-XVIII secolo con tubature originali in piombo o ghisa',
    challenges: ['Tubature molto datate', 'Colonne di scarico condivise', 'Accesso difficile'],
    neighborhoods: ['Centro Storico', 'Spaccanapoli', 'Quartieri Spagnoli']
  },
  {
    type: 'Condomini anni \'50-\'70',
    description: 'Costruzioni del boom edilizio con impianti in ferro zincato',
    challenges: ['Corrosione diffusa', 'Calcare accumulato', 'Pressione insufficiente ai piani alti'],
    neighborhoods: ['Vomero', 'Fuorigrotta', 'Soccavo']
  },
  {
    type: 'Ville e appartamenti di pregio',
    description: 'Residenze signorili con impianti spesso ristrutturati',
    challenges: ['Impianti complessi', 'Standard elevati richiesti', 'Materiali di qualità'],
    neighborhoods: ['Posillipo', 'Chiaia', 'Mergellina']
  },
  {
    type: 'Edifici residenziali moderni',
    description: 'Costruzioni recenti con impianti in multistrato o polietilene',
    challenges: ['Difetti di costruzione', 'Garanzie da gestire', 'Normative recenti'],
    neighborhoods: ['Centro Direzionale', 'Bagnoli', 'Colli Aminei']
  }
];

// Why plumbing problems are frequent in Naples - local context
export const NAPOLI_PROBLEM_REASONS = [
  {
    title: 'Patrimonio edilizio storico',
    description: 'Napoli vanta uno dei centri storici più grandi d\'Europa (UNESCO). Molti edifici hanno oltre 200 anni con tubature originali mai sostituite.',
    icon: 'Building'
  },
  {
    title: 'Conformazione del territorio',
    description: 'La città è costruita su colline e pendii. La pressione dell\'acqua varia enormemente tra zone basse (Chiaia) e alte (Vomero, Posillipo).',
    icon: 'Mountain'
  },
  {
    title: 'Durezza dell\'acqua',
    description: 'L\'acqua napoletana ha una durezza media di 25-35°F che causa depositi di calcare negli impianti, riducendo flusso e efficienza.',
    icon: 'Droplets'
  },
  {
    title: 'Umidità e salsedine',
    description: 'La vicinanza al mare causa corrosione accelerata delle tubature metalliche, specialmente nelle zone costiere come Mergellina e Santa Lucia.',
    icon: 'Waves'
  },
  {
    title: 'Alta densità abitativa',
    description: 'Napoli è tra le città più densamente popolate d\'Italia. Gli impianti condominiali sono sottoposti a stress continuo.',
    icon: 'Users'
  }
];

// Extended FAQs for Napoli (10 questions)
export const NAPOLI_EXTENDED_FAQS = [
  {
    question: 'Quanto costa un idraulico a Napoli?',
    answer: 'Il costo di un idraulico a Napoli varia da 50€ a 180€ per interventi standard. Una riparazione perdita costa 60-100€, lo spurgo di uno scarico 70-120€, la manutenzione caldaia 80-150€. Le emergenze notturne o festive hanno una maggiorazione del 30-50%. Su IdrauliciSubito ricevi preventivi gratuiti per confrontare i prezzi.'
  },
  {
    question: 'In quanto tempo arriva un idraulico a Napoli?',
    answer: 'A Napoli città, i nostri idraulici arrivano mediamente in 30-60 minuti. Per le emergenze gravi (allagamenti, perdite importanti) i tempi si riducono a 15-30 minuti. Nelle zone periferiche e nei comuni limitrofi i tempi aumentano a 45-90 minuti. Il servizio è attivo 24/7.'
  },
  {
    question: 'Gli idraulici a Napoli lavorano anche di domenica e festivi?',
    answer: 'Sì, molti idraulici napoletani offrono pronto intervento 24/7 inclusi domenica, festivi e agosto. Le tariffe festive hanno una maggiorazione del 30-50% ma garantiscono assistenza immediata per vere emergenze come allagamenti o caldaie bloccate in inverno.'
  },
  {
    question: 'Come scelgo un idraulico affidabile a Napoli?',
    answer: 'Con IdrauliciSubito trovi solo idraulici verificati a Napoli. Verifichiamo esperienza, recensioni e affidabilità. Compila il form indicando problema e zona: riceverai risposta da un professionista della tua area che fornirà preventivo dettagliato senza impegno.'
  },
  {
    question: 'In quali zone di Napoli intervenite?',
    answer: 'Copriamo tutta Napoli città con pronto intervento 24h: Centro Storico, Vomero, Chiaia, Posillipo, Fuorigrotta, Bagnoli, Ponticelli, Secondigliano, Scampia, Arenella e tutte le altre zone. Arrivo medio in 30-60 minuti in qualsiasi quartiere.'
  },
  {
    question: 'Quanto costa un pronto intervento notturno a Napoli?',
    answer: 'Un pronto intervento notturno a Napoli costa mediamente il 30-50% in più rispetto alle tariffe diurne. Per una perdita d\'acqua urgente, aspettati 90-150€. Per uno scarico intasato di notte, 100-170€. Il preventivo viene sempre comunicato prima dell\'intervento.'
  },
  {
    question: 'Gli idraulici a Napoli rilasciano fattura?',
    answer: 'Sì, gli idraulici professionisti a Napoli rilasciano regolare fattura. Questo è importante per le detrazioni fiscali del 50% per manutenzione straordinaria. Chiedi sempre la fattura prima di pagare e verifica che includa descrizione lavori e materiali utilizzati.'
  },
  {
    question: 'Cosa fare in caso di perdita d\'acqua urgente a Napoli?',
    answer: 'In caso di perdita d\'acqua a Napoli: 1) Chiudi subito il rubinetto generale (di solito nel vano contatori o in bagno), 2) Se l\'acqua arriva dal piano di sopra, avvisa i vicini, 3) Richiedi un idraulico urgente tramite IdrauliciSubito. Non aspettare: ogni minuto causa danni.'
  },
  {
    question: 'Perché la pressione dell\'acqua a Napoli è così variabile?',
    answer: 'Napoli è costruita su colline con dislivelli di oltre 150 metri tra zone basse (Centro, Chiaia) e alte (Vomero, Posillipo). La rete idrica fatica a garantire pressione uniforme. Ai piani alti delle zone collinari sono spesso necessari gruppi di pressurizzazione.'
  },
  {
    question: 'Quanto costa sostituire una caldaia a Napoli?',
    answer: 'Sostituire una caldaia a Napoli costa da 1.500€ a 3.500€ inclusa installazione, a seconda della potenza e del modello. Le caldaie a condensazione (obbligatorie per nuove installazioni) costano di più ma garantiscono risparmio in bolletta. Approfitta delle detrazioni fiscali fino al 65%.'
  }
];

// Napoli-specific statistics
export const NAPOLI_STATISTICS = {
  interventionsPerMonth: '2.500+',
  averageResponseTime: '35 min',
  activeePlumbers: '80+',
  customerSatisfaction: '4.7/5',
  coveredArea: '117 km²',
  population: '920.000'
};

// Emergency tips specific to Naples
export const NAPOLI_EMERGENCY_TIPS = [
  {
    situation: 'Perdita dal soffitto',
    tip: 'Nei condomini storici del Centro, la perdita spesso viene dal piano superiore. Avvisa subito i vicini e chiudi l\'acqua al contatore condominiale se necessario.'
  },
  {
    situation: 'Caldaia bloccata in inverno',
    tip: 'A Napoli gli inverni possono essere rigidi. Se la caldaia va in blocco, controlla prima la pressione (deve essere 1-1.5 bar) e prova il reset. Se non riparte, chiama un tecnico.'
  },
  {
    situation: 'Scarico intasato con rigurgito',
    tip: 'Negli edifici storici napoletani le colonne di scarico sono spesso sottodimensionate. Non usare altri sanitari e chiama subito: il problema potrebbe essere nella colonna condominiale.'
  },
  {
    situation: 'Pressione acqua insufficiente',
    tip: 'Al Vomero e nelle zone collinari è comune. Verifica se il problema è solo casa tua o condominiale. Potrebbe servire un autoclave o la pulizia dei filtri dei rubinetti.'
  }
];

// Long-form intro content for Napoli (SEO optimized, 300+ words)
export const NAPOLI_INTRO_CONTENT = {
  headline: 'Idraulico a Napoli: Pronto Intervento 24h in Tutti i Quartieri',
  subheadline: 'Trova rapidamente un idraulico professionista nella tua zona di Napoli',
  
  paragraph1: `Stai cercando un **idraulico a Napoli** per un'emergenza o una riparazione? Napoli, con il suo straordinario patrimonio edilizio che spazia dai palazzi storici del Centro Storico (Patrimonio UNESCO) ai moderni condomini di Fuorigrotta e Bagnoli, presenta sfide idrauliche uniche che richiedono professionisti esperti e preparati.`,
  
  paragraph2: `La conformazione geografica della città partenopea – costruita su colline con dislivelli di oltre 150 metri – causa problemi di pressione dell'acqua che variano enormemente tra quartieri bassi come Chiaia e zone collinari come Vomero e Posillipo. Gli edifici storici del Centro, molti dei quali risalgono al XVI-XVIII secolo, hanno tubature che richiedono interventi specializzati e grande esperienza.`,
  
  paragraph3: `Con **IdrauliciSubito** trovi rapidamente un idraulico verificato disponibile nella tua zona di Napoli. Il nostro servizio copre capillarmente l'intera città: dal Centro Storico ai Quartieri Spagnoli, da Forcella a Chiaia, da Mergellina a Posillipo, dal Vomero all'Arenella, da Fuorigrotta a Bagnoli, da Ponticelli a San Giovanni, da Secondigliano a Scampia.`,
  
  paragraph4: `I problemi idraulici più frequenti a Napoli includono: **perdite d'acqua** nei vecchi condomini con tubature in piombo o ferro zincato, **scarichi intasati** causati dal calcare dell'acqua napoletana (25-35°F di durezza), **caldaie in blocco** durante i mesi invernali, **pressione insufficiente** ai piani alti delle zone collinari. Per ognuno di questi problemi i nostri idraulici hanno l'esperienza e gli strumenti per intervenire rapidamente.`,
  
  whyUs: [
    'Idraulici napoletani verificati con esperienza specifica sul patrimonio edilizio locale',
    'Pronto intervento 24h in tutti i quartieri di Napoli - arrivo in 30-60 minuti',
    'Preventivi gratuiti e trasparenti prima di ogni intervento',
    'Tempi di arrivo medi di 35 minuti in città',
    'Conoscenza approfondita delle problematiche locali: pressione, calcare, edifici storici'
  ]
};
