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
  },
  bari: {
    waterType: "acqua molto dura tipica della Puglia",
    buildingAge: "palazzi del centro murattiano e costruzioni moderne nelle zone residenziali",
    commonIssues: "forte accumulo di calcare e tubature corrose dalla salsedine",
    neighborhoods: "Bari Vecchia, Libertà, Poggiofranco e Japigia"
  },
  padova: {
    waterType: "acqua di media durezza",
    buildingAge: "edifici storici nel centro e zone universitarie con palazzi rinnovati",
    commonIssues: "umidità e problemi di scarico nelle zone più antiche",
    neighborhoods: "Portello, Prato della Valle, Arcella e Mandria"
  },
  palermo: {
    waterType: "acqua dura con alto contenuto di calcio",
    buildingAge: "palazzi liberty e costruzioni arabe-normanne nel centro storico",
    commonIssues: "pressione idrica irregolare e tubature datate",
    neighborhoods: "Kalsa, Vucciria, Politeama e Mondello"
  },
  catania: {
    waterType: "acqua vulcanica dell'Etna, molto pura ma dura",
    buildingAge: "edifici barocchi ricostruiti dopo i terremoti e palazzi moderni",
    commonIssues: "depositi minerali e tubature soggette a sbalzi di pressione",
    neighborhoods: "Centro storico, Ognina, Borgo e San Giovanni Galermo"
  },
  venezia: {
    waterType: "acqua di media durezza trasportata dalla terraferma",
    buildingAge: "edifici storici con fondamenta su pali e impianti spesso complessi",
    commonIssues: "umidità estrema, tubature difficili da raggiungere e problemi di marea",
    neighborhoods: "San Marco, Cannaregio, Dorsoduro e Mestre"
  },
  trieste: {
    waterType: "acqua carsica molto dura",
    buildingAge: "palazzi asburgici del centro e edifici moderni nelle zone residenziali",
    commonIssues: "calcare estremo e tubature soggette al freddo invernale",
    neighborhoods: "Centro, Barcola, Roiano e San Giovanni"
  },
  modena: {
    waterType: "acqua di media durezza",
    buildingAge: "edifici storici del centro e zone industriali con costruzioni moderne",
    commonIssues: "scarichi lenti nelle zone artigianali e calcare moderato",
    neighborhoods: "Centro storico, Modena Est, San Faustino e Madonnina"
  },
  parma: {
    waterType: "acqua di buona qualità ma con durezza media",
    buildingAge: "palazzi ducali e costruzioni moderne nelle zone universitarie",
    commonIssues: "problemi di pressione nei piani alti e calcare moderato",
    neighborhoods: "Oltretorrente, Centro, Pablo e Montanara"
  },
  "reggio-emilia": {
    waterType: "acqua di media durezza",
    buildingAge: "edifici storici del centro e quartieri residenziali moderni",
    commonIssues: "scarichi lenti e problemi di pressione nelle zone più vecchie",
    neighborhoods: "Centro storico, Santa Croce, Ospizio e Pieve Modolena"
  },
  bergamo: {
    waterType: "acqua dolce delle prealpi orobiche",
    buildingAge: "edifici medievali in Città Alta e costruzioni moderne in Città Bassa",
    commonIssues: "problemi di riscaldamento invernale e tubature storiche",
    neighborhoods: "Città Alta, Borgo Santa Caterina, Colognola e Monterosso"
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
  },
  "tubo-che-perde": {
    problemName: "Tubo che Perde",
    interventionType: "perdita_acqua",
    causesTitle: "Cause Comuni del Tubo che Perde",
    causes: [
      "Corrosione delle tubature metalliche nel tempo",
      "Giunti allentati o guarnizioni deteriorate",
      "Pressione dell'acqua troppo alta",
      "Danni da gelo nelle tubature esposte",
      "Usura dei raccordi e delle giunzioni"
    ],
    methods: [
      {
        icon: "🔧",
        title: "Metodo 1 — Chiudi l'Acqua",
        description: "Prima cosa da fare per limitare i danni.",
        steps: [
          "Individua la valvola di arresto più vicina alla perdita",
          "Chiudila ruotando in senso orario",
          "Se non la trovi, chiudi il contatore generale",
          "Asciuga l'acqua fuoriuscita per evitare danni"
        ]
      },
      {
        icon: "🩹",
        title: "Metodo 2 — Nastro Autosigillante",
        description: "Soluzione temporanea per piccole perdite.",
        steps: [
          "Asciuga bene la zona della perdita",
          "Avvolgi il nastro autosigillante strettamente",
          "Fai almeno 3-4 giri sovrapponendo",
          "Questa è una soluzione TEMPORANEA"
        ]
      },
      {
        icon: "🔩",
        title: "Metodo 3 — Stringi i Raccordi",
        description: "Se la perdita è da un giunto, potrebbe bastare stringere.",
        steps: [
          "Individua esattamente il punto di perdita",
          "Usa una chiave inglese per stringere il raccordo",
          "Non forzare troppo per non danneggiare",
          "Riapri l'acqua e verifica"
        ]
      }
    ],
    warnings: [
      "Una perdita d'acqua può causare danni strutturali gravi se ignorata",
      "L'acqua vicino a impianti elettrici è molto pericolosa",
      "Le riparazioni fai-da-te sono solo temporanee, serve un professionista"
    ],
    whenToCallTitle: "Quando Chiamare un Idraulico",
    whenToCallText: "Una perdita d'acqua richiede sempre l'intervento di un professionista per una riparazione definitiva. Se la perdita è consistente, se viene dal muro o dal soffitto, o se sospetti un tubo rotto nel muro, chiama immediatamente un idraulico."
  },
  "doccia-non-scarica": {
    problemName: "Doccia che Non Scarica",
    interventionType: "scarico_intasato",
    causesTitle: "Cause Comuni della Doccia che Non Scarica",
    causes: [
      "Accumulo di capelli nel piletta",
      "Residui di sapone e shampoo stratificati",
      "Calcare che ostruisce le tubature",
      "Sifone intasato da detriti",
      "Problemi nella colonna di scarico condominiale"
    ],
    methods: [
      {
        icon: "🧹",
        title: "Metodo 1 — Pulisci la Piletta",
        description: "Spesso il problema è proprio nella griglia.",
        steps: [
          "Rimuovi la griglia della piletta",
          "Togli manualmente capelli e detriti visibili",
          "Pulisci con una spazzola",
          "Rimonta e testa lo scarico"
        ]
      },
      {
        icon: "🧪",
        title: "Metodo 2 — Bicarbonato e Aceto",
        description: "Scioglie i depositi organici accumulati.",
        steps: [
          "Versa 100g di bicarbonato nella piletta",
          "Aggiungi 200ml di aceto bianco",
          "Copri con un panno umido per 30 minuti",
          "Risciacqua con abbondante acqua calda"
        ]
      },
      {
        icon: "🪠",
        title: "Metodo 3 — Ventosa o Sturalavandini",
        description: "Crea pressione per smuovere l'ostruzione.",
        steps: [
          "Riempi il piatto doccia con pochi cm d'acqua",
          "Posiziona lo sturalavandini sulla piletta",
          "Pompa energicamente per 20-30 volte",
          "Ripeti se necessario"
        ]
      }
    ],
    warnings: [
      "Non usare prodotti chimici aggressivi su piatti doccia in resina",
      "Se l'acqua risale da altri scarichi, il problema è nella colonna principale",
      "Controlla regolarmente la piletta per prevenire intasamenti"
    ],
    whenToCallTitle: "Quando Chiamare un Idraulico",
    whenToCallText: "Se l'acqua continua a ristagnare, se noti cattivi odori persistenti o se il problema coinvolge anche altri scarichi del bagno, è necessario l'intervento di un professionista con attrezzatura per ispezione e disostruzione."
  },
  "scarico-cucina-lento": {
    problemName: "Scarico Cucina Lento",
    interventionType: "scarico_intasato",
    causesTitle: "Cause Comuni dello Scarico Cucina Lento",
    causes: [
      "Accumulo di grasso e olio nelle tubature",
      "Residui alimentari non filtrati",
      "Calcare che restringe i tubi",
      "Sifone ostruito da detriti",
      "Fondi di caffè o altri residui organici"
    ],
    methods: [
      {
        icon: "🔥",
        title: "Metodo 1 — Acqua Bollente e Detersivo",
        description: "Scioglie il grasso accumulato nelle tubature.",
        steps: [
          "Fai bollire 3 litri di acqua",
          "Aggiungi un cucchiaio di detersivo per piatti",
          "Versa lentamente nello scarico",
          "Ripeti 2-3 volte a distanza di 10 minuti"
        ]
      },
      {
        icon: "🧪",
        title: "Metodo 2 — Bicarbonato, Sale e Aceto",
        description: "Miscela potenziata per depositi ostinati.",
        steps: [
          "Versa 50g di sale grosso nello scarico",
          "Aggiungi 100g di bicarbonato",
          "Versa 200ml di aceto e lascia agire 1 ora",
          "Risciacqua con acqua bollente"
        ]
      },
      {
        icon: "🔧",
        title: "Metodo 3 — Pulisci il Sifone",
        description: "Rimuovi fisicamente l'ostruzione dal sifone.",
        steps: [
          "Posiziona un secchio sotto il sifone",
          "Svita i dadi del sifone a mano o con pinza",
          "Pulisci l'interno da grasso e detriti",
          "Rimonta verificando le guarnizioni"
        ]
      }
    ],
    warnings: [
      "Non versare mai olio di frittura nello scarico",
      "Usa sempre un filtro raccogli-avanzi",
      "Evita di scaricare fondi di caffè nel lavandino"
    ],
    whenToCallTitle: "Quando Chiamare un Idraulico",
    whenToCallText: "Se lo scarico resta lento dopo questi interventi, o se noti cattivi odori persistenti, risalite d'acqua o gorgoglii, potrebbe esserci un'ostruzione più profonda che richiede l'intervento di un professionista."
  },
  "termosifone-freddo": {
    problemName: "Termosifone Freddo",
    interventionType: "caldaia",
    causesTitle: "Cause Comuni del Termosifone Freddo",
    causes: [
      "Aria intrappolata nel radiatore",
      "Valvola termostatica bloccata o chiusa",
      "Pressione dell'impianto troppo bassa",
      "Fanghi e depositi che ostruiscono la circolazione",
      "Pompa di circolazione difettosa"
    ],
    methods: [
      {
        icon: "💨",
        title: "Metodo 1 — Sfiata il Termosifone",
        description: "Elimina l'aria che impedisce la circolazione.",
        steps: [
          "Spegni la caldaia e attendi 30 minuti",
          "Posiziona un contenitore sotto la valvola di sfiato",
          "Apri la valvola con la chiave apposita",
          "Chiudi quando esce acqua senza aria"
        ]
      },
      {
        icon: "🔧",
        title: "Metodo 2 — Controlla la Valvola",
        description: "La valvola termostatica potrebbe essere bloccata.",
        steps: [
          "Rimuovi la testina della valvola termostatica",
          "Verifica che il perno sottostante si muova",
          "Se bloccato, prova a sbloccarlo delicatamente",
          "Rimonta la testina e imposta su max"
        ]
      },
      {
        icon: "📊",
        title: "Metodo 3 — Verifica la Pressione",
        description: "La caldaia deve avere pressione tra 1 e 1.5 bar.",
        steps: [
          "Controlla il manometro della caldaia",
          "Se sotto 1 bar, apri il rubinetto di carico",
          "Rabbocca fino a 1.2-1.5 bar",
          "Attendi che l'impianto si riscaldi"
        ]
      }
    ],
    warnings: [
      "Non aprire mai le valvole di sfiato con l'impianto in pressione alta",
      "Se tutti i termosifoni sono freddi, il problema è nella caldaia",
      "L'acqua dell'impianto può essere molto sporca: proteggi i pavimenti"
    ],
    whenToCallTitle: "Quando Chiamare un Idraulico",
    whenToCallText: "Se dopo aver sfiatato e controllato le valvole il termosifone resta freddo, o se il problema riguarda più radiatori, potrebbe essere necessario un lavaggio dell'impianto o la verifica della pompa di circolazione da parte di un tecnico."
  }
};

// City configurations with province names
const cityConfigs: Record<string, { provinceName: string }> = {
  milano: { provinceName: "Milano" },
  roma: { provinceName: "Roma" },
  torino: { provinceName: "Torino" },
  napoli: { provinceName: "Napoli" },
  bologna: { provinceName: "Bologna" },
  firenze: { provinceName: "Firenze" },
  genova: { provinceName: "Genova" },
  bari: { provinceName: "Bari" },
  verona: { provinceName: "Verona" },
  padova: { provinceName: "Padova" },
  palermo: { provinceName: "Palermo" },
  catania: { provinceName: "Catania" },
  venezia: { provinceName: "Venezia" },
  trieste: { provinceName: "Trieste" },
  modena: { provinceName: "Modena" },
  parma: { provinceName: "Parma" },
  "reggio-emilia": { provinceName: "Reggio Emilia" },
  bergamo: { provinceName: "Bergamo" }
};

// Helper function to format city name
const formatCityName = (citySlug: string): string => {
  if (citySlug === "reggio-emilia") return "Reggio Emilia";
  return citySlug.charAt(0).toUpperCase() + citySlug.slice(1);
};

// Helper function to generate page data
const generatePage = (problemSlug: string, citySlug: string): ProblemCityPage => {
  const problem = problemTemplates[problemSlug as keyof typeof problemTemplates];
  const city = cityLocalContent[citySlug] || cityLocalContent.milano; // Fallback
  const cityName = formatCityName(citySlug);
  const config = cityConfigs[citySlug] || { provinceName: cityName };

  const ctaTexts: Record<string, { title: string; text: string }> = {
    "lavandino-intasato": {
      title: "Non si è ancora risolto?",
      text: `Se il lavandino continua a non scaricare, il problema potrebbe essere nelle tubature condominiali o nella rete fognaria. Trova subito un idraulico qualificato a ${cityName}.`
    },
    "wc-otturato": {
      title: "Il WC non si sblocca?",
      text: `Se l'acqua continua a risalire o il problema si ripresenta, è il momento di chiamare un idraulico con attrezzatura professionale. Trova subito un esperto a ${cityName}.`
    },
    "scaldabagno-non-scalda": {
      title: "Ancora senza acqua calda?",
      text: `Se lo scaldabagno non si riaccende o mostra errori, è necessario un tecnico qualificato. Trova subito un professionista a ${cityName}.`
    },
    "caldaia-in-blocco": {
      title: "La caldaia non riparte?",
      text: `Se il reset non funziona o la caldaia mostra codici di errore, serve un tecnico caldaista qualificato. Trova subito un professionista a ${cityName}.`
    },
    "tubo-che-perde": {
      title: "La perdita continua?",
      text: `Una perdita d'acqua può causare danni gravi. Non aspettare, trova subito un idraulico a ${cityName} per una riparazione definitiva.`
    },
    "doccia-non-scarica": {
      title: "L'acqua continua a ristagnare?",
      text: `Se la doccia non scarica nonostante i tentativi, potrebbe servire un'ispezione professionale. Trova un idraulico a ${cityName}.`
    },
    "scarico-cucina-lento": {
      title: "Lo scarico è ancora lento?",
      text: `Se il problema persiste, potrebbero esserci depositi profondi nelle tubature. Trova un idraulico a ${cityName} per una pulizia professionale.`
    },
    "termosifone-freddo": {
      title: "Il termosifone resta freddo?",
      text: `Se lo sfiato non ha risolto, potrebbe servire un lavaggio dell'impianto. Trova un tecnico qualificato a ${cityName}.`
    }
  };

  const h1Texts: Record<string, string> = {
    "lavandino-intasato": `Lavandino Intasato a ${cityName}: Come Risolvere`,
    "wc-otturato": `WC Otturato a ${cityName}: Cosa Fare`,
    "scaldabagno-non-scalda": `Scaldabagno Non Scalda a ${cityName}: Cause e Soluzioni`,
    "caldaia-in-blocco": `Caldaia in Blocco a ${cityName}: Come Risolvere`,
    "tubo-che-perde": `Tubo che Perde a ${cityName}: Cosa Fare Subito`,
    "doccia-non-scarica": `Doccia che Non Scarica a ${cityName}: Come Risolvere`,
    "scarico-cucina-lento": `Scarico Cucina Lento a ${cityName}: Cause e Rimedi`,
    "termosifone-freddo": `Termosifone Freddo a ${cityName}: Come Risolvere`
  };

  const metaTitles: Record<string, string> = {
    "lavandino-intasato": `Lavandino Intasato a ${cityName} | Soluzioni Rapide e Idraulico`,
    "wc-otturato": `WC Otturato a ${cityName} | Soluzioni e Pronto Intervento`,
    "scaldabagno-non-scalda": `Scaldabagno Non Scalda a ${cityName} | Riparazione Urgente`,
    "caldaia-in-blocco": `Caldaia in Blocco a ${cityName} | Sblocco e Assistenza`,
    "tubo-che-perde": `Tubo che Perde a ${cityName} | Riparazione Urgente 24h`,
    "doccia-non-scarica": `Doccia Non Scarica a ${cityName} | Disostruzione Rapida`,
    "scarico-cucina-lento": `Scarico Cucina Lento a ${cityName} | Cause e Soluzioni`,
    "termosifone-freddo": `Termosifone Freddo a ${cityName} | Soluzioni e Assistenza`
  };

  const metaDescriptions: Record<string, string> = {
    "lavandino-intasato": `Hai il lavandino intasato a ${cityName}? Scopri le cause, i metodi fai-da-te e quando chiamare un idraulico. Pronto intervento in tutta la provincia.`,
    "wc-otturato": `WC otturato a ${cityName}? Scopri come sturarlo da solo e quando chiamare un idraulico. Intervento rapido in tutta la provincia.`,
    "scaldabagno-non-scalda": `Lo scaldabagno non scalda l'acqua a ${cityName}? Scopri le cause, i controlli da fare e quando chiamare un tecnico. Assistenza in tutta la provincia.`,
    "caldaia-in-blocco": `La caldaia è in blocco a ${cityName}? Scopri le cause comuni, come resettarla e quando chiamare un tecnico caldaista. Pronto intervento.`,
    "tubo-che-perde": `Hai un tubo che perde a ${cityName}? Scopri cosa fare subito, come limitare i danni e quando chiamare un idraulico. Intervento urgente 24h.`,
    "doccia-non-scarica": `La doccia non scarica a ${cityName}? Scopri le cause dell'intasamento e i rimedi fai-da-te. Idraulico pronto intervento se serve.`,
    "scarico-cucina-lento": `Scarico della cucina lento a ${cityName}? Ecco le cause, i rimedi casalinghi e quando chiamare un idraulico professionista.`,
    "termosifone-freddo": `Termosifone freddo a ${cityName}? Scopri come sfiatarlo, controllare le valvole e quando serve un tecnico. Assistenza riscaldamento.`
  };

  const introTexts: Record<string, string> = {
    "lavandino-intasato": `Hai il **lavandino intasato a ${cityName}**? È uno dei problemi idraulici più comuni, soprattutto in una città con ${city.buildingAge}. L'${city.waterType} può contribuire ad accelerare l'accumulo di depositi nelle tubature. In questa guida trovi le cause, i rimedi fai-da-te e quando è il momento di chiamare un professionista.`,
    "wc-otturato": `Hai il **WC otturato a ${cityName}**? È una situazione fastidiosa che richiede un intervento rapido. In una città con ${city.buildingAge}, questo problema può essere legato sia a cattive abitudini sia all'età degli impianti. Ecco come affrontarlo e quando chiamare un professionista.`,
    "scaldabagno-non-scalda": `Il tuo **scaldabagno non scalda l'acqua a ${cityName}**? Restare senza acqua calda è un disagio importante. In una città con ${city.waterType}, il calcare può essere una delle cause principali. Vediamo cosa puoi controllare e quando è necessario l'intervento di un tecnico.`,
    "caldaia-in-blocco": `La tua **caldaia è in blocco a ${cityName}**? Restare senza riscaldamento, specialmente durante l'inverno, è un problema urgente. Vediamo le cause più comuni, cosa puoi provare a fare e quando è indispensabile chiamare un tecnico certificato.`,
    "tubo-che-perde": `Hai un **tubo che perde a ${cityName}**? Una perdita d'acqua può causare danni significativi se non affrontata tempestivamente. In una città con ${city.buildingAge}, le tubature possono essere soggette a ${city.commonIssues}. Ecco cosa fare subito e quando chiamare un idraulico.`,
    "doccia-non-scarica": `La **doccia non scarica bene a ${cityName}**? L'acqua che ristagna nel piatto doccia è un problema comune, soprattutto in zone con ${city.waterType}. Spesso la causa è semplice, ma a volte indica problemi più profondi. Vediamo come intervenire.`,
    "scarico-cucina-lento": `Lo **scarico della cucina è lento a ${cityName}**? È uno dei problemi più frequenti, causato principalmente da accumuli di grasso e residui alimentari. In una città con ${city.buildingAge}, le tubature possono essere più soggette a ostruzioni. Ecco come risolvere.`,
    "termosifone-freddo": `Hai un **termosifone freddo a ${cityName}**? Durante i mesi invernali è un problema urgente da risolvere. Le cause possono essere diverse, dall'aria nell'impianto a problemi più complessi. Vediamo cosa puoi fare prima di chiamare un tecnico.`
  };

  const localParagraphs: Record<string, string> = {
    "lavandino-intasato": `A ${cityName}, il lavandino intasato è particolarmente frequente nelle zone come ${city.neighborhoods}. Gli ${city.buildingAge} spesso presentano ${city.commonIssues}, rendendo gli scarichi più soggetti a ostruzioni. L'${city.waterType} tipica della zona può accelerare la formazione di depositi. Se abiti in un condominio storico o in una zona con impianti datati, potresti riscontrare questo problema più spesso.`,
    "wc-otturato": `Nelle zone come ${city.neighborhoods}, il WC otturato è un problema ricorrente, specialmente negli ${city.buildingAge}. ${city.commonIssues.charAt(0).toUpperCase() + city.commonIssues.slice(1)} possono aggravare la situazione. Se vivi in un condominio con colonne di scarico condivise, un'ostruzione nel tuo appartamento potrebbe indicare un problema più ampio nella rete fognaria del palazzo.`,
    "scaldabagno-non-scalda": `A ${cityName}, lo scaldabagno che non scalda è spesso legato all'${city.waterType}, che causa accumuli di calcare sulla resistenza o sulla serpentina. Nelle zone come ${city.neighborhoods}, dove molti edifici hanno ${city.buildingAge}, è comune trovare scaldabagni datati che necessitano di manutenzione più frequente.`,
    "caldaia-in-blocco": `A ${cityName}, la caldaia in blocco è un problema frequente soprattutto nei mesi invernali. L'${city.waterType} può causare accumuli di calcare che riducono l'efficienza della caldaia nel tempo. Negli ${city.buildingAge} delle zone come ${city.neighborhoods}, è comune trovare caldaie con più di 15 anni che necessitano di manutenzione approfondita.`,
    "tubo-che-perde": `A ${cityName}, le perdite d'acqua sono frequenti soprattutto negli ${city.buildingAge} delle zone come ${city.neighborhoods}. ${city.commonIssues.charAt(0).toUpperCase() + city.commonIssues.slice(1)} rendono le tubature più vulnerabili. L'${city.waterType} può accelerare la corrosione dei materiali metallici.`,
    "doccia-non-scarica": `Nelle zone di ${city.neighborhoods} a ${cityName}, la doccia che non scarica è spesso legata a ${city.commonIssues}. L'${city.waterType} favorisce l'accumulo di calcare che, unito a capelli e sapone, crea ostruzioni ostinate. Gli ${city.buildingAge} possono avere pilette e tubature di diametro ridotto.`,
    "scarico-cucina-lento": `A ${cityName}, lo scarico cucina lento è molto comune nelle zone come ${city.neighborhoods}. Gli ${city.buildingAge} hanno spesso tubature di diametro ridotto che si ostruiscono più facilmente con grasso e residui. L'${city.waterType} può contribuire a creare depositi più resistenti.`,
    "termosifone-freddo": `A ${cityName}, il termosifone freddo è un problema frequente nelle zone come ${city.neighborhoods}, dove gli ${city.buildingAge} hanno impianti di riscaldamento datati. L'${city.waterType} può causare depositi di fanghi che riducono la circolazione. Gli inverni in città richiedono impianti efficienti.`
  };

  return {
    slug: `${problemSlug}-${citySlug}`,
    problemSlug,
    citySlug,
    cityName,
    provinceName: config.provinceName,
    problemName: problem.problemName,
    interventionType: problem.interventionType,
    h1: h1Texts[problemSlug],
    metaTitle: metaTitles[problemSlug],
    metaDescription: metaDescriptions[problemSlug],
    introText: introTexts[problemSlug],
    causesTitle: problem.causesTitle,
    causes: problem.causes,
    methods: problem.methods,
    warnings: problem.warnings,
    whenToCallTitle: problem.whenToCallTitle,
    whenToCallText: problem.whenToCallText,
    localParagraphTitle: `Il Problema a ${cityName}`,
    localParagraphText: localParagraphs[problemSlug],
    ctaTitle: ctaTexts[problemSlug].title,
    ctaText: ctaTexts[problemSlug].text
  };
};

// Problem-city combinations
const problemCityCombinations: Record<string, string[]> = {
  "lavandino-intasato": ["milano", "roma", "torino", "napoli", "bologna", "firenze", "genova", "bari", "verona", "padova"],
  "wc-otturato": ["milano", "roma", "torino", "napoli", "bologna", "firenze", "genova", "bari", "palermo", "catania"],
  "scaldabagno-non-scalda": ["milano", "roma", "torino", "napoli", "bologna", "firenze", "genova", "bari", "verona", "venezia"],
  "caldaia-in-blocco": ["milano", "roma", "torino", "napoli", "bologna", "firenze", "genova", "bari", "verona", "trieste"],
  "tubo-che-perde": ["milano", "roma", "torino", "napoli", "bologna", "firenze", "genova", "bari", "verona", "modena"],
  "doccia-non-scarica": ["milano", "roma", "torino", "napoli", "bologna", "firenze", "genova", "bari", "verona", "parma"],
  "scarico-cucina-lento": ["milano", "roma", "torino", "napoli", "bologna", "firenze", "genova", "bari", "verona", "reggio-emilia"],
  "termosifone-freddo": ["milano", "roma", "torino", "napoli", "bologna", "firenze", "genova", "bari", "verona", "bergamo"]
};

// Generate all problem+city combinations
export const PROBLEM_CITY_PAGES: ProblemCityPage[] = Object.entries(problemCityCombinations)
  .flatMap(([problemSlug, cities]) => 
    cities.map(citySlug => generatePage(problemSlug, citySlug))
  );

// Helper to get page by slug
export const getProblemCityPageBySlug = (slug: string): ProblemCityPage | undefined => {
  return PROBLEM_CITY_PAGES.find(page => page.slug === slug);
};

// Get all slugs for routing
export const getAllProblemCitySlugs = (): string[] => {
  return PROBLEM_CITY_PAGES.map(page => page.slug);
};
