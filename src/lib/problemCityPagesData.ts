// Problem + City SEO Pages Data
// URL structure: /[problem-slug]-[city-slug]

export interface ProblemCityPage {
  slug: string;
  problemSlug: string;
  citySlug: string;
  cityName: string;
  provinceName: string;
  problemName: string;
  interventionType: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  introText: string;
  causesTitle: string;
  causes: string[];
  methods: {
    icon: string;
    title: string;
    description: string;
    steps: string[];
  }[];
  warnings: string[];
  whenToCallTitle: string;
  whenToCallText: string;
  localParagraphTitle: string;
  localParagraphText: string;
  ctaTitle: string;
  ctaText: string;
}

// Local content variations per city
const cityLocalContent: Record<string, { waterType: string; buildingAge: string; commonIssues: string; neighborhoods: string }> = {
  milano: {
    waterType: "acqua mediamente dura",
    buildingAge: "edifici storici del centro e condomini moderni nelle zone periferiche",
    commonIssues: "accumuli di calcare e tubature datate nei palazzi liberty",
    neighborhoods: "Navigli, Porta Romana, Città Studi e Isola"
  },
  roma: {
    waterType: "acqua molto calcarea",
    buildingAge: "palazzi d'epoca con impianti spesso obsoleti",
    commonIssues: "incrostazioni calcaree e tubi in piombo ancora presenti in alcune zone",
    neighborhoods: "Trastevere, Prati, Testaccio e San Giovanni"
  },
  torino: {
    waterType: "acqua dolce proveniente dalle Alpi",
    buildingAge: "edifici sabaudi del centro storico e quartieri residenziali moderni",
    commonIssues: "problemi legati all'umidità e alle basse temperature invernali",
    neighborhoods: "San Salvario, Crocetta, Vanchiglia e Aurora"
  },
  napoli: {
    waterType: "acqua con durezza variabile a seconda della zona",
    buildingAge: "palazzi storici del centro e costruzioni più recenti nelle zone collinari",
    commonIssues: "pressione dell'acqua irregolare e tubature vetuste nei centri storici",
    neighborhoods: "Chiaia, Vomero, Posillipo e Quartieri Spagnoli"
  },
  bologna: {
    waterType: "acqua mediamente dura",
    buildingAge: "palazzi medievali e rinascimentali nel centro, edifici moderni in periferia",
    commonIssues: "scarichi intasati sotto i portici e problemi nei vecchi condomini",
    neighborhoods: "Santo Stefano, Bolognina, Saragozza e San Donato"
  },
  firenze: {
    waterType: "acqua calcarea dell'Arno",
    buildingAge: "edifici storici rinascimentali e palazzi d'epoca",
    commonIssues: "calcare negli impianti e tubature storiche difficili da raggiungere",
    neighborhoods: "Oltrarno, Santa Croce, San Lorenzo e Campo di Marte"
  },
  genova: {
    waterType: "acqua di media durezza",
    buildingAge: "palazzi storici nei caruggi e condomini anni '60-'70 nelle alture",
    commonIssues: "umidità salina e tubature corrose per la vicinanza al mare",
    neighborhoods: "Centro storico, Nervi, Albaro e Sampierdarena"
  },
  verona: {
    waterType: "acqua dura dell'Adige",
    buildingAge: "edifici medievali nel centro e residenze moderne nelle zone esterne",
    commonIssues: "depositi calcarei nelle caldaie e problemi invernali al riscaldamento",
    neighborhoods: "Borgo Trento, Veronetta, San Zeno e Borgo Roma"
  }
};

// Problem templates
const problemTemplates = {
  "lavandino-intasato": {
    problemName: "Lavandino Intasato",
    interventionType: "scarico_intasato",
    causesTitle: "Cause Comuni del Lavandino Intasato",
    causes: [
      "Accumulo di capelli e residui di sapone nel sifone",
      "Depositi di grasso e residui alimentari (in cucina)",
      "Oggetti caduti accidentalmente nello scarico",
      "Calcare che restringe le tubature nel tempo",
      "Radici di piante che infiltrano le tubature esterne"
    ],
    methods: [
      {
        icon: "🔥",
        title: "Metodo 1 — Acqua Bollente",
        description: "Il metodo più semplice per sciogliere grassi e sapone.",
        steps: [
          "Fai bollire 2 litri di acqua",
          "Versa lentamente nello scarico",
          "Attendi 5-10 minuti",
          "Ripeti se necessario"
        ]
      },
      {
        icon: "🧪",
        title: "Metodo 2 — Bicarbonato e Aceto",
        description: "Reazione chimica naturale che scioglie i depositi organici.",
        steps: [
          "Versa 100g di bicarbonato nello scarico",
          "Aggiungi 200ml di aceto bianco",
          "Lascia agire 30 minuti con lo scarico tappato",
          "Risciacqua con acqua bollente"
        ]
      },
      {
        icon: "🪠",
        title: "Metodo 3 — Sturalavandini",
        description: "Pressione meccanica per smuovere l'ostruzione.",
        steps: [
          "Riempi il lavandino con 5cm d'acqua",
          "Posiziona lo sturalavandini sullo scarico",
          "Pompa energicamente 15-20 volte",
          "Verifica se l'acqua defluisce"
        ]
      }
    ],
    warnings: [
      "Non usare prodotti chimici aggressivi se hai tubature vecchie o in plastica",
      "Non mescolare mai candeggina con altri prodotti chimici",
      "Se senti odore di fogna, il problema potrebbe essere più serio"
    ],
    whenToCallTitle: "Quando Chiamare un Idraulico",
    whenToCallText: "Se dopo aver provato questi metodi l'acqua continua a non defluire, o se il problema si ripresenta frequentemente, è il momento di chiamare un professionista. Un lavandino intasato può indicare problemi più profondi nelle tubature che richiedono attrezzature professionali."
  },
  "wc-otturato": {
    problemName: "WC Otturato",
    interventionType: "scarico_intasato",
    causesTitle: "Cause Comuni del WC Otturato",
    causes: [
      "Uso eccessivo di carta igienica",
      "Oggetti non biodegradabili gettati nel water (salviette, cotton fioc)",
      "Accumulo di calcare nel sifone",
      "Problemi nella fossa biologica o nella rete fognaria",
      "Residui organici stratificati nel tempo"
    ],
    methods: [
      {
        icon: "🔥",
        title: "Metodo 1 — Acqua Calda e Detersivo",
        description: "Scioglie i depositi organici e lubrifica il passaggio.",
        steps: [
          "Versa mezzo bicchiere di detersivo per piatti nel WC",
          "Aggiungi 3-4 litri di acqua calda (non bollente)",
          "Lascia agire 20-30 minuti",
          "Tira lo sciacquone"
        ]
      },
      {
        icon: "🪠",
        title: "Metodo 2 — Sturalavandini per WC",
        description: "Crea pressione per smuovere l'ostruzione.",
        steps: [
          "Usa uno sturalavandini con campana larga",
          "Inseriscilo nel foro di scarico",
          "Pompa energicamente 20-30 volte",
          "Tira lo sciacquone per verificare"
        ]
      },
      {
        icon: "🧪",
        title: "Metodo 3 — Bicarbonato e Aceto",
        description: "Reazione effervescente che aiuta a sciogliere l'ostruzione.",
        steps: [
          "Versa 200g di bicarbonato nel WC",
          "Aggiungi 300ml di aceto bianco",
          "Lascia agire 1 ora",
          "Versa acqua calda e tira lo sciacquone"
        ]
      }
    ],
    warnings: [
      "Non usare la candeggina insieme all'aceto o ad altri prodotti chimici",
      "Non tentare di forzare oggetti solidi con strumenti improvvisati",
      "Se l'acqua risale invece di scendere, il problema è nella rete fognaria"
    ],
    whenToCallTitle: "Quando Chiamare un Idraulico",
    whenToCallText: "Se l'acqua risale, se senti gorgoglii in altri scarichi della casa, o se il problema persiste dopo i tentativi fai-da-te, è necessario l'intervento di un professionista con sonda o idropulitrice."
  },
  "scaldabagno-non-scalda": {
    problemName: "Scaldabagno che Non Scalda",
    interventionType: "caldaia",
    causesTitle: "Cause Comuni dello Scaldabagno che Non Scalda",
    causes: [
      "Termostato difettoso o mal regolato",
      "Resistenza elettrica bruciata (nei modelli elettrici)",
      "Accumulo di calcare sulla serpentina",
      "Fiamma pilota spenta (nei modelli a gas)",
      "Pressione dell'acqua troppo bassa"
    ],
    methods: [
      {
        icon: "🔧",
        title: "Metodo 1 — Controlla il Termostato",
        description: "Verifica che la temperatura sia impostata correttamente.",
        steps: [
          "Individua la manopola del termostato",
          "Verifica che sia impostata almeno a 50-60°C",
          "Prova ad aumentare leggermente",
          "Attendi 30 minuti e testa l'acqua calda"
        ]
      },
      {
        icon: "🔥",
        title: "Metodo 2 — Verifica la Fiamma Pilota (Gas)",
        description: "Per scaldabagni a gas, controlla se la fiamma è accesa.",
        steps: [
          "Apri lo sportellino di ispezione",
          "Verifica se la fiamma pilota è accesa",
          "Se spenta, segui le istruzioni per la riaccensione",
          "Se non si riaccende, chiudi il gas e chiama un tecnico"
        ]
      },
      {
        icon: "⚡",
        title: "Metodo 3 — Controlla l'Alimentazione (Elettrico)",
        description: "Verifica che ci sia corrente e che i fusibili siano integri.",
        steps: [
          "Controlla che l'interruttore dedicato sia acceso",
          "Verifica il salvavita generale",
          "Prova a spegnere e riaccendere dopo 30 secondi",
          "Controlla se ci sono spie di errore"
        ]
      }
    ],
    warnings: [
      "Non aprire mai il pannello interno dello scaldabagno se non sei un tecnico qualificato",
      "Se senti odore di gas, chiudi la valvola principale e chiama immediatamente",
      "Gli interventi su apparecchi a gas richiedono certificazione"
    ],
    whenToCallTitle: "Quando Chiamare un Idraulico",
    whenToCallText: "Se lo scaldabagno non si riaccende, se noti perdite d'acqua, rumori anomali o odore di gas, è fondamentale chiamare un tecnico certificato. Gli interventi fai-da-te su apparecchi a gas sono pericolosi e vietati dalla legge."
  },
  "caldaia-in-blocco": {
    problemName: "Caldaia in Blocco",
    interventionType: "caldaia",
    causesTitle: "Cause Comuni della Caldaia in Blocco",
    causes: [
      "Pressione dell'impianto troppo bassa (sotto 1 bar)",
      "Aria nei termosifoni che blocca la circolazione",
      "Termostato difettoso o batterie scariche",
      "Bruciatore sporco o ostruito",
      "Valvola del gas chiusa o difettosa"
    ],
    methods: [
      {
        icon: "📊",
        title: "Metodo 1 — Controlla la Pressione",
        description: "La pressione deve essere tra 1 e 1.5 bar.",
        steps: [
          "Individua il manometro sulla caldaia",
          "Se la lancetta è sotto 1 bar, devi ripristinare",
          "Apri il rubinetto di carico lentamente",
          "Chiudi quando la lancetta raggiunge 1.2-1.5 bar"
        ]
      },
      {
        icon: "🔄",
        title: "Metodo 2 — Resetta la Caldaia",
        description: "Il reset può sbloccare errori temporanei.",
        steps: [
          "Individua il pulsante di reset (spesso rosso)",
          "Tieni premuto per 3-5 secondi",
          "Attendi che la caldaia si riavvii",
          "Se il blocco persiste dopo 2-3 tentativi, chiama un tecnico"
        ]
      },
      {
        icon: "🌡️",
        title: "Metodo 3 — Sfiata i Termosifoni",
        description: "L'aria nell'impianto può causare blocchi.",
        steps: [
          "Spegni la caldaia",
          "Apri la valvola di sfiato di ogni termosifone",
          "Fai uscire l'aria fino a quando esce acqua",
          "Ricontrolla la pressione e rabbocca se necessario"
        ]
      }
    ],
    warnings: [
      "Non tentare mai di aprire il pannello interno della caldaia",
      "Se senti odore di gas, chiudi la valvola principale e chiama subito",
      "Non resettare più di 3 volte consecutive: potresti mascherare un problema serio"
    ],
    whenToCallTitle: "Quando Chiamare un Idraulico",
    whenToCallText: "Se la caldaia continua ad andare in blocco, se mostra codici di errore, se senti rumori strani o se noti perdite d'acqua, è necessario l'intervento di un tecnico caldaista certificato per una diagnosi approfondita."
  }
};

// Generate all problem+city combinations
export const PROBLEM_CITY_PAGES: ProblemCityPage[] = [
  // Lavandino intasato - Milano, Roma, Torino, Napoli, Bologna
  ...["milano", "roma", "torino", "napoli", "bologna"].map(citySlug => {
    const problem = problemTemplates["lavandino-intasato"];
    const city = cityLocalContent[citySlug];
    const cityName = citySlug.charAt(0).toUpperCase() + citySlug.slice(1);
    return {
      slug: `lavandino-intasato-${citySlug}`,
      problemSlug: "lavandino-intasato",
      citySlug,
      cityName,
      provinceName: citySlug === "milano" ? "Milano" : citySlug === "roma" ? "Roma" : citySlug === "torino" ? "Torino" : citySlug === "napoli" ? "Napoli" : "Bologna",
      problemName: problem.problemName,
      interventionType: problem.interventionType,
      h1: `Lavandino Intasato a ${cityName}: Come Risolvere`,
      metaTitle: `Lavandino Intasato a ${cityName} | Soluzioni Rapide e Idraulico`,
      metaDescription: `Hai il lavandino intasato a ${cityName}? Scopri le cause, i metodi fai-da-te e quando chiamare un idraulico. Pronto intervento in tutta la provincia.`,
      introText: `Hai il **lavandino intasato a ${cityName}**? È uno dei problemi idraulici più comuni, soprattutto in una città con ${city.buildingAge}. L'${city.waterType} può contribuire ad accelerare l'accumulo di depositi nelle tubature. In questa guida trovi le cause, i rimedi fai-da-te e quando è il momento di chiamare un professionista.`,
      ...problem,
      localParagraphTitle: `Il Problema a ${cityName}`,
      localParagraphText: `A ${cityName}, il lavandino intasato è particolarmente frequente nelle zone come ${city.neighborhoods}. Gli ${city.buildingAge} spesso presentano ${city.commonIssues}, rendendo gli scarichi più soggetti a ostruzioni. L'${city.waterType} tipica della zona può accelerare la formazione di depositi. Se abiti in un condominio storico o in una zona con impianti datati, potresti riscontrare questo problema più spesso.`,
      ctaTitle: `Non si è ancora risolto?`,
      ctaText: `Se il lavandino continua a non scaricare, il problema potrebbe essere nelle tubature condominiali o nella rete fognaria. Trova subito un idraulico qualificato a ${cityName}.`
    };
  }),

  // WC otturato - Milano, Roma, Torino, Napoli, Firenze
  ...["milano", "roma", "torino", "napoli", "firenze"].map(citySlug => {
    const problem = problemTemplates["wc-otturato"];
    const city = cityLocalContent[citySlug];
    const cityName = citySlug.charAt(0).toUpperCase() + citySlug.slice(1);
    return {
      slug: `wc-otturato-${citySlug}`,
      problemSlug: "wc-otturato",
      citySlug,
      cityName,
      provinceName: cityName,
      problemName: problem.problemName,
      interventionType: problem.interventionType,
      h1: `WC Otturato a ${cityName}: Cosa Fare`,
      metaTitle: `WC Otturato a ${cityName} | Soluzioni e Pronto Intervento`,
      metaDescription: `WC otturato a ${cityName}? Scopri come sturarlo da solo e quando chiamare un idraulico. Intervento rapido in tutta la provincia.`,
      introText: `Hai il **WC otturato a ${cityName}**? È una situazione fastidiosa che richiede un intervento rapido. In una città con ${city.buildingAge}, questo problema può essere legato sia a cattive abitudini sia all'età degli impianti. Ecco come affrontarlo e quando chiamare un professionista.`,
      ...problem,
      localParagraphTitle: `Il Problema a ${cityName}`,
      localParagraphText: `Nelle zone come ${city.neighborhoods}, il WC otturato è un problema ricorrente, specialmente negli ${city.buildingAge}. ${city.commonIssues.charAt(0).toUpperCase() + city.commonIssues.slice(1)} possono aggravare la situazione. Se vivi in un condominio con colonne di scarico condivise, un'ostruzione nel tuo appartamento potrebbe indicare un problema più ampio nella rete fognaria del palazzo.`,
      ctaTitle: `Il WC non si sblocca?`,
      ctaText: `Se l'acqua continua a risalire o il problema si ripresenta, è il momento di chiamare un idraulico con attrezzatura professionale. Trova subito un esperto a ${cityName}.`
    };
  }),

  // Scaldabagno non scalda - Milano, Roma, Torino, Napoli, Genova
  ...["milano", "roma", "torino", "napoli", "genova"].map(citySlug => {
    const problem = problemTemplates["scaldabagno-non-scalda"];
    const city = cityLocalContent[citySlug];
    const cityName = citySlug.charAt(0).toUpperCase() + citySlug.slice(1);
    return {
      slug: `scaldabagno-non-scalda-${citySlug}`,
      problemSlug: "scaldabagno-non-scalda",
      citySlug,
      cityName,
      provinceName: cityName,
      problemName: problem.problemName,
      interventionType: problem.interventionType,
      h1: `Scaldabagno Non Scalda a ${cityName}: Cause e Soluzioni`,
      metaTitle: `Scaldabagno Non Scalda a ${cityName} | Riparazione Urgente`,
      metaDescription: `Lo scaldabagno non scalda l'acqua a ${cityName}? Scopri le cause, i controlli da fare e quando chiamare un tecnico. Assistenza in tutta la provincia.`,
      introText: `Il tuo **scaldabagno non scalda l'acqua a ${cityName}**? Restare senza acqua calda è un disagio importante. In una città con ${city.waterType}, il calcare può essere una delle cause principali. Vediamo cosa puoi controllare e quando è necessario l'intervento di un tecnico.`,
      ...problem,
      localParagraphTitle: `Il Problema a ${cityName}`,
      localParagraphText: `A ${cityName}, lo scaldabagno che non scalda è spesso legato all'${city.waterType}, che causa accumuli di calcare sulla resistenza o sulla serpentina. Nelle zone come ${city.neighborhoods}, dove molti edifici hanno ${city.buildingAge}, è comune trovare scaldabagni datati che necessitano di manutenzione più frequente. Se il tuo apparecchio ha più di 10 anni, potrebbe essere il momento di valutare una sostituzione.`,
      ctaTitle: `Ancora senza acqua calda?`,
      ctaText: `Se lo scaldabagno non si riaccende o mostra errori, è necessario un tecnico qualificato. Trova subito un professionista a ${cityName}.`
    };
  }),

  // Caldaia in blocco - Milano, Roma, Torino, Napoli, Verona
  ...["milano", "roma", "torino", "napoli", "verona"].map(citySlug => {
    const problem = problemTemplates["caldaia-in-blocco"];
    const city = cityLocalContent[citySlug];
    const cityName = citySlug.charAt(0).toUpperCase() + citySlug.slice(1);
    return {
      slug: `caldaia-in-blocco-${citySlug}`,
      problemSlug: "caldaia-in-blocco",
      citySlug,
      cityName,
      provinceName: cityName,
      problemName: problem.problemName,
      interventionType: problem.interventionType,
      h1: `Caldaia in Blocco a ${cityName}: Come Risolvere`,
      metaTitle: `Caldaia in Blocco a ${cityName} | Sblocco e Assistenza`,
      metaDescription: `La caldaia è in blocco a ${cityName}? Scopri le cause comuni, come resettarla e quando chiamare un tecnico caldaista. Pronto intervento.`,
      introText: `La tua **caldaia è in blocco a ${cityName}**? Restare senza riscaldamento, specialmente durante l'inverno, è un problema urgente. Vediamo le cause più comuni, cosa puoi provare a fare e quando è indispensabile chiamare un tecnico certificato.`,
      ...problem,
      localParagraphTitle: `Il Problema a ${cityName}`,
      localParagraphText: `A ${cityName}, la caldaia in blocco è un problema frequente soprattutto nei mesi invernali. L'${city.waterType} può causare accumuli di calcare che riducono l'efficienza della caldaia nel tempo. Negli ${city.buildingAge} delle zone come ${city.neighborhoods}, è comune trovare caldaie con più di 15 anni che necessitano di manutenzione approfondita o sostituzione. Se il blocco si ripete spesso, potrebbe essere il segnale di un problema strutturale all'impianto.`,
      ctaTitle: `La caldaia non riparte?`,
      ctaText: `Se il reset non funziona o la caldaia mostra codici di errore, serve un tecnico caldaista qualificato. Trova subito un professionista a ${cityName}.`
    };
  })
];

// Helper to get page by slug
export const getProblemCityPageBySlug = (slug: string): ProblemCityPage | undefined => {
  return PROBLEM_CITY_PAGES.find(page => page.slug === slug);
};

// Get all slugs for routing
export const getAllProblemCitySlugs = (): string[] => {
  return PROBLEM_CITY_PAGES.map(page => page.slug);
};
