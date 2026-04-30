// Rich content for each service type to avoid thin content on landing pages
// This provides unique, valuable information for SEO

export interface ServiceRichContent {
  slug: string;
  commonProblems: {
    title: string;
    description: string;
  }[];
  tips: string[];
  priceRange: {
    min: number;
    max: number;
    note: string;
  };
  urgencyInfo: string;
  detailedDescription: string;
  whenToCall: string[];
  diyWarning?: string;
}

export const SERVICE_RICH_CONTENT: Record<string, ServiceRichContent> = {
  'perdita-acqua': {
    slug: 'perdita-acqua',
    commonProblems: [
      {
        title: 'Perdita sotto il lavandino',
        description: 'Spesso causata da guarnizioni usurate o sifone allentato. Può causare danni al mobile e muffa.'
      },
      {
        title: 'Tubo che gocciola nel muro',
        description: 'Richiede intervento immediato per evitare danni strutturali e infiltrazioni nei locali sottostanti.'
      },
      {
        title: 'Perdita dal water',
        description: 'Può essere dalla base (guarnizione) o dalla cassetta. Aumenta significativamente i consumi idrici.'
      },
      {
        title: 'Rubinetto che gocciola',
        description: 'Spreco di oltre 20 litri al giorno. Spesso basta sostituire la cartuccia interna.'
      }
    ],
    tips: [
      'Chiudi immediatamente il rubinetto generale per limitare i danni',
      'Posiziona contenitori sotto la perdita per raccogliere l\'acqua',
      'Fotografa la perdita per mostrare al tecnico l\'entità del problema',
      'Non tentare riparazioni fai-da-te su tubi incassati nel muro'
    ],
    priceRange: {
      min: 50,
      max: 250,
      note: 'Escluse eventuali opere murarie per raggiungere il tubo'
    },
    urgencyInfo: 'Le perdite d\'acqua richiedono intervento rapido per evitare danni a pavimenti, mobili e strutture. Una perdita non riparata può causare muffe pericolose per la salute.',
    detailedDescription: 'Le perdite d\'acqua possono manifestarsi in vari modi: gocciolamento visibile, macchie di umidità sui muri, aumento anomalo della bolletta idrica. Un idraulico professionista individua rapidamente l\'origine del problema utilizzando strumenti specifici come rilevatori di umidità e termocamere, minimizzando le opere di demolizione.',
    whenToCall: [
      'Macchie di umidità su pareti o soffitti',
      'Gocciolamento persistente da rubinetti o tubazioni',
      'Aumento inspiegabile della bolletta dell\'acqua',
      'Pressione dell\'acqua diminuita improvvisamente',
      'Rumore di acqua che scorre anche a rubinetti chiusi'
    ],
    diyWarning: 'Non tentare di riparare perdite su tubazioni incassate o impianti centralizzati. Potresti causare danni maggiori o problemi con l\'assicurazione.'
  },
  'scarico-intasato': {
    slug: 'scarico-intasato',
    commonProblems: [
      {
        title: 'WC che non scarica bene',
        description: 'Accumulo di carta igienica, residui organici o oggetti caduti accidentalmente.'
      },
      {
        title: 'Lavandino lento a scaricare',
        description: 'Capelli, sapone solidificato e grasso formano tappi difficili da rimuovere.'
      },
      {
        title: 'Cattivi odori dallo scarico',
        description: 'Sifone secco, accumuli organici o problemi di ventilazione delle colonne.'
      },
      {
        title: 'Acqua che risale dagli scarichi',
        description: 'Ostruzione grave nella colonna condominiale, richiede intervento professionale urgente.'
      }
    ],
    tips: [
      'Non versare olio di frittura negli scarichi - solidifica e ostruisce',
      'Usa griglie raccogli capelli in doccia e lavandini',
      'Versa acqua bollente negli scarichi settimanalmente',
      'Non usare prodotti chimici aggressivi che danneggiano i tubi'
    ],
    priceRange: {
      min: 80,
      max: 200,
      note: 'Disostruzione standard. Interventi con sonda o autospurgo possono costare di più'
    },
    urgencyInfo: 'Uno scarico intasato può peggiorare rapidamente. L\'acqua stagnante crea cattivi odori e può traboccare causando danni. Meglio intervenire ai primi segnali.',
    detailedDescription: 'La disostruzione professionale utilizza diverse tecniche: sonda meccanica a spirale per ostruzioni vicine, idropulitura ad alta pressione per tubazioni lunghe, videoispezione per individuare il punto esatto del problema. Un professionista sa quale metodo usare senza danneggiare i tubi.',
    whenToCall: [
      'L\'acqua scende molto lentamente',
      'Gorgoglii anomali durante lo scarico',
      'Cattivi odori persistenti nonostante la pulizia',
      'Acqua che risale da altri scarichi',
      'WC che richiede più scarichi per svuotarsi'
    ],
    diyWarning: 'I prodotti chimici disgorganti possono corrodere le tubazioni vecchie. La sonda fai-da-te rischia di perforare i tubi in plastica.'
  },
  'caldaia': {
    slug: 'caldaia',
    commonProblems: [
      {
        title: 'Caldaia in blocco',
        description: 'Display con codice errore, nessuna produzione di acqua calda o riscaldamento.'
      },
      {
        title: 'Acqua calda a intermittenza',
        description: 'La fiamma si accende e spegne, l\'acqua alterna caldo e freddo.'
      },
      {
        title: 'Pressione troppo bassa',
        description: 'L\'impianto perde acqua o la valvola di sicurezza scarica.'
      },
      {
        title: 'Rumore anomalo dalla caldaia',
        description: 'Fischi, scoppiettii o vibrazioni possono indicare problemi gravi.'
      }
    ],
    tips: [
      'Fai eseguire la manutenzione annuale obbligatoria per legge',
      'Controlla periodicamente la pressione (1-1.5 bar a freddo)',
      'Non coprire le bocchette di ventilazione della caldaia',
      'Annota i codici di errore prima di resettare'
    ],
    priceRange: {
      min: 100,
      max: 350,
      note: 'Riparazione standard. Sostituzione componenti (scheda, valvola) può costare 200-600€'
    },
    urgencyInfo: 'Una caldaia che non funziona in inverno è un\'emergenza. In estate invece puoi programmare l\'intervento con calma. La manutenzione preventiva evita guasti improvvisi.',
    detailedDescription: 'I tecnici caldaisti certificati diagnosticano il problema attraverso i codici di errore, ispezione visiva e strumenti di misura. Intervengono su tutte le marche: Vaillant, Baxi, Beretta, Immergas, Ferroli, Ariston, Junkers, Hermann. La manutenzione annuale è obbligatoria per legge e include controllo fumi, pulizia bruciatore e verifica sicurezze.',
    whenToCall: [
      'Caldaia in blocco con codice errore',
      'Nessuna acqua calda o riscaldamento',
      'Perdite d\'acqua dalla caldaia',
      'Odore di gas (in questo caso chiama anche i Vigili del Fuoco)',
      'È passato più di un anno dall\'ultima manutenzione'
    ],
    diyWarning: 'MAI intervenire su caldaie a gas senza abilitazione. Rischi per la sicurezza e invalidazione della garanzia. Solo tecnici F-GAS certificati.'
  },
  'rubinetto': {
    slug: 'rubinetto',
    commonProblems: [
      {
        title: 'Rubinetto che gocciola',
        description: 'Cartuccia ceramica usurata o guarnizioni da sostituire. Spreco d\'acqua continuo.'
      },
      {
        title: 'Rubinetto bloccato dal calcare',
        description: 'La leva non si muove bene o i fori del rompigetto sono ostruiti.'
      },
      {
        title: 'Poca pressione dal rubinetto',
        description: 'Filtro aeratore intasato, tubazioni con depositi o problema generale.'
      },
      {
        title: 'Rubinetto che vibra o fischia',
        description: 'Problema interno alla cartuccia o alla valvola di arresto.'
      }
    ],
    tips: [
      'Pulisci regolarmente l\'aeratore (filtro sulla bocca) con aceto',
      'Non stringere mai troppo la leva del miscelatore',
      'In zone con acqua dura, considera un addolcitore',
      'Chiudi le valvole sotto il lavandino prima di smontare'
    ],
    priceRange: {
      min: 40,
      max: 150,
      note: 'Riparazione. Sostituzione completa rubinetto: 80-250€ incluso nuovo miscelatore'
    },
    urgencyInfo: 'Un rubinetto che gocciola non è urgente ma spreca fino a 20 litri al giorno. Un rubinetto bloccato o che perde molto richiede intervento rapido.',
    detailedDescription: 'L\'idraulico valuta se conviene riparare (sostituzione cartuccia ceramica, guarnizioni) o sostituire l\'intero rubinetto. I miscelatori moderni sono più efficienti e duraturi. Per cucina e bagno esistono modelli specifici: estraibili, termostatici, a parete, sottofinestra.',
    whenToCall: [
      'Gocciolamento continuo anche a rubinetto chiuso',
      'Difficoltà a regolare la temperatura dell\'acqua',
      'Leva del miscelatore dura o bloccata',
      'Vuoi sostituire il rubinetto con uno nuovo',
      'Perdita dalla base o dai collegamenti'
    ]
  },
  'manutenzione-caldaie': {
    slug: 'manutenzione-caldaie',
    commonProblems: [
      {
        title: 'Mancata manutenzione annuale',
        description: 'Obbligatoria per legge, necessaria per sicurezza ed efficienza. Rischio multe.'
      },
      {
        title: 'Bollino fumi scaduto',
        description: 'Controllo efficienza energetica obbligatorio ogni 2-4 anni a seconda della potenza.'
      },
      {
        title: 'Caldaia poco efficiente',
        description: 'Consumi elevati, riscaldamento non uniforme, acqua calda insufficiente.'
      },
      {
        title: 'Pompa circolatore bloccata',
        description: 'I termosifoni non si scaldano nonostante la caldaia funzioni.'
      }
    ],
    tips: [
      'Programma la manutenzione a fine estate, prima dell\'accensione invernale',
      'Conserva sempre il libretto caldaia e le ricevute dei controlli',
      'Spurga i termosifoni almeno una volta all\'anno',
      'Controlla che le bocchette di aspirazione esterna non siano ostruite'
    ],
    priceRange: {
      min: 80,
      max: 150,
      note: 'Manutenzione ordinaria. Controllo fumi con bollino: 100-180€ aggiuntivi'
    },
    urgencyInfo: 'La manutenzione va programmata annualmente prima dell\'inverno. Non è urgente ma è obbligatoria per legge e fondamentale per sicurezza e risparmio energetico.',
    detailedDescription: 'La manutenzione ordinaria comprende: pulizia bruciatore e scambiatore, verifica pressione impianto, controllo valvole sicurezza, pulizia filtri, verifica tiraggio fumi. Il controllo efficienza energetica (bollino blu/verde) prevede l\'analisi dei fumi di combustione con strumentazione certificata e rilascio del rapporto tecnico.',
    whenToCall: [
      'È passato più di un anno dall\'ultima manutenzione',
      'Il bollino fumi è scaduto',
      'Noti un aumento dei consumi di gas',
      'La caldaia fa rumori insoliti',
      'Vuoi ottimizzare i consumi prima dell\'inverno'
    ]
  },
  'impianto-riscaldamento': {
    slug: 'impianto-riscaldamento',
    commonProblems: [
      {
        title: 'Termosifoni freddi in alcune stanze',
        description: 'Aria nell\'impianto, valvole bloccate o bilanciamento errato.'
      },
      {
        title: 'Rumore d\'acqua nei termosifoni',
        description: 'Bolle d\'aria intrappolate, pressione sbagliata o circolatore.'
      },
      {
        title: 'Riscaldamento a pavimento non scalda',
        description: 'Problema al collettore, alle testine elettrotermiche o all\'impianto.'
      },
      {
        title: 'Perdita dal termosifone',
        description: 'Corrosione interna, valvole usurate o raccordi allentati.'
      }
    ],
    tips: [
      'Spurga l\'aria dai termosifoni a inizio stagione',
      'Non coprire i termosifoni con tende o mobili',
      'Imposta il termostato a max 20°C per risparmiare',
      'Con riscaldamento a pavimento non mettere tappeti spessi'
    ],
    priceRange: {
      min: 100,
      max: 400,
      note: 'Interventi standard. Rifacimento impianto: preventivo su misura'
    },
    urgencyInfo: 'In inverno un impianto che non scalda è urgente. In altre stagioni puoi programmare la manutenzione con calma.',
    detailedDescription: 'Gli interventi sull\'impianto di riscaldamento comprendono: spurgo aria, bilanciamento idraulico, sostituzione valvole termostatiche, lavaggio chimico dell\'impianto, installazione pompa di circolazione, riparazione/sostituzione termosifoni. Per il riscaldamento a pavimento: controllo collettori, sostituzione testine, verifica tubazioni.',
    whenToCall: [
      'Alcuni termosifoni restano freddi',
      'Rumore continuo d\'acqua nell\'impianto',
      'Pressione che scende frequentemente',
      'Vuoi installare valvole termostatiche',
      'Riscaldamento a pavimento non funziona bene'
    ]
  },
  'box-doccia': {
    slug: 'box-doccia',
    commonProblems: [
      {
        title: 'Perdita d\'acqua dal box doccia',
        description: 'Guarnizioni usurate, silicone ammuffito o vetri disallineati.'
      },
      {
        title: 'Piatto doccia che non scarica',
        description: 'Piletta ostruita, pendenza insufficiente o sifone intasato.'
      },
      {
        title: 'Muffa sulle guarnizioni',
        description: 'Umidità stagnante, scarsa ventilazione del bagno.'
      },
      {
        title: 'Vetri opachi e macchiati',
        description: 'Depositi di calcare che non vanno più via.'
      }
    ],
    tips: [
      'Asciuga vetri e guarnizioni dopo ogni doccia',
      'Lascia la porta del box aperta per ventilare',
      'Pulisci settimanalmente con anticalcare',
      'Rinnova il silicone ogni 2-3 anni'
    ],
    priceRange: {
      min: 150,
      max: 500,
      note: 'Riparazioni. Sostituzione box doccia completo: 400-1500€ incluso montaggio'
    },
    urgencyInfo: 'Le perdite dal box doccia possono danneggiare pavimenti e locali sottostanti. Meglio intervenire prima che il problema si aggravi.',
    detailedDescription: 'L\'installazione o sostituzione del box doccia comprende: smontaggio vecchio box, preparazione superfici, montaggio profili e guide, sigillatura con silicone antimuffa, regolazione ante. Proponiamo box doccia moderni: ante battenti, scorrevoli, soffietto, walk-in. Materiali: vetro temperato, cristallo, acrilico.',
    whenToCall: [
      'Perdite d\'acqua fuori dal box',
      'Guarnizioni ammuffite da sostituire',
      'Ante che non scorrono bene',
      'Vuoi sostituire il vecchio box doccia',
      'Trasformare la vasca in doccia'
    ]
  },
  'condizionatori': {
    slug: 'condizionatori',
    commonProblems: [
      {
        title: 'Condizionatore che non raffredda',
        description: 'Gas refrigerante scarico, filtri sporchi o problema al compressore.'
      },
      {
        title: 'Cattivo odore all\'accensione',
        description: 'Muffa e batteri accumulati nell\'unità interna.'
      },
      {
        title: 'Condizionatore rumoroso',
        description: 'Ventola ostruita, cuscinetti usurati o vibrazioni.'
      },
      {
        title: 'Perdita d\'acqua dall\'unità interna',
        description: 'Scarico condensa ostruito o vaschetta piena.'
      }
    ],
    tips: [
      'Pulisci i filtri ogni 2-4 settimane in estate',
      'Fai sanificare l\'unità interna ogni anno',
      'Non impostare temperature troppo basse (24-26°C è ideale)',
      'Copri l\'unità esterna d\'inverno se non usi la pompa di calore'
    ],
    priceRange: {
      min: 80,
      max: 200,
      note: 'Manutenzione/riparazione. Ricarica gas: 100-250€. Installazione nuovo split: 400-800€'
    },
    urgencyInfo: 'In piena estate un condizionatore guasto può essere urgente per il comfort e la salute. La manutenzione preventiva va fatta in primavera.',
    detailedDescription: 'I nostri tecnici F-GAS certificati intervengono su tutte le marche: Daikin, Mitsubishi, Samsung, LG, Panasonic, Fujitsu, Hisense. Servizi offerti: installazione mono e multi-split, manutenzione ordinaria, sanificazione, ricarica gas refrigerante, riparazione schede elettroniche, sostituzione compressori.',
    whenToCall: [
      'Il condizionatore non raffredda o scalda bene',
      'Perdite d\'acqua dall\'unità interna',
      'Cattivi odori all\'accensione',
      'Vuoi installare un nuovo impianto',
      'È ora della manutenzione stagionale'
    ]
  },
  'autospurgo': {
    slug: 'autospurgo',
    commonProblems: [
      {
        title: 'Saturazione Fossa Biologica',
        description: 'Il riempimento eccessivo causa il ritorno di reflui e cattivi odori persistenti dovuti alla saturazione dei fanghi pesanti.'
      },
      {
        title: 'Ostruzione Condotte Fognarie',
        description: 'Accumulo di sedimenti calcarei o grassi che riducono il diametro delle condotte fino al blocco totale.'
      },
      {
        title: 'Infiltrazione Radici nelle Fogne',
        description: 'Le radici degli alberi possono penetrare nei tubi in cemento o PVC, causando rotture e blocchi strutturali gravi.'
      },
      {
        title: 'Blocco Pozzetti Difluvio',
        description: 'Allagamenti improvvisi di garage e scantinati causati dall\'intasamento delle caditoie stradali durante piogge intense.'
      },
    ],
    tips: [
      'Effettua una pulizia programmata della fossa biologica almeno una volta ogni 12-18 mesi.',
      'Non gettare mai salviette umidificate o residui di olio da cucina negli scarichi domestici.',
      'Verifica periodicamente lo stato dei pozzetti d\'ispezione esterni per prevenire allagamenti.',
      'Richiedi sempre il formulario FIR per garantire lo smaltimento legale dei reflui prelevati.',
    ],
    priceRange: {
      min: 150,
      max: 600,
      note: 'Il prezzo varia in base alla cubatura dei liquami da smaltire, alla distanza dall\'impianto di depurazione e all\'eventuale urgenza notturna o festiva.'
    },
    urgencyInfo: 'L\'intervento di autospurgo è spesso un\'emergenza critica per prevenire danni strutturali e rischi igienico-sanitari. Garantiamo l\'uscita del mezzo attrezzato entro 2-4 ore dalla chiamata per blocchi totali o rigurgiti interni.',
    detailedDescription: 'Il servizio di autospurgo viene eseguito con autobotti moderne dotate di pompe ad alta pressione tipo \'Canal-Jet\' (fino a 250 bar) e sistemi di aspirazione a vuoto per la rimozione di fanghi e sedimenti. Utilizziamo sonde idrodinamiche ed eventuali testine rotanti specifiche per il grasso o il calcare. Ogni intervento segue rigorosamente il D.Lgs. 152/06 (Normativa Ambientale) per il trasporto e lo smaltimento dei rifiuti speciali presso impianti autorizzati, con rilascio del relativo formulario d\'identificazione dei rifiuti (FIR). In caso di blocchi complessi, integriamo l\'ispezione con videocamere professionali Rothenberger o Ridgid per mappare le anomalie strutturali.',
    whenToCall: [
      'Presenza di cattivi odori persistenti dai sifoni o dai pozzetti esterni.',
      'Rallentamento evidente nel deflusso dell\'acqua da lavandini e WC.',
      'Rigurgito di acque nere dai sanitari ai piani inferiori o scantinati.',
      'Mancato svuotamento della fossa biologica da oltre 2 anni.',
      'Allagamento del vano ascensore o della rampa garage dopo un temporale.',
    ],
    diyWarning: 'L\'uso di acidi corrosivi o sonde manuali improvvisate può danneggiare permanentemente le guarnizioni e le pareti dei tubi, oltre a esporre ai vapori tossici di idrogeno solforato.'
  },
  'sturare-wc': {
    slug: 'sturare-wc',
    commonProblems: [
      {
        title: 'Incrostazioni di Calcare e Sedimenti',
        description: 'L\'accumulo di carbonato di calcio restringe il diametro interno del sifone, facilitando l\'ancoraggio di carta e detriti.'
      },
      {
        title: 'Ostruzione da Materiale Cartaceo e Salviette',
        description: 'Spesso causata dall\'uso eccessivo di carta igienica non biodegradabile o dal getto di salviette umidificate che non si sciolgono.'
      },
      {
        title: 'Corpi Estranei nel Sifone',
        description: 'Caduta accidentale di profumatori per WC, giocattoli o assorbenti che si bloccano nella curva a \'U\' del sifone.'
      },
      {
        title: 'Riflusso dalla Colonna di Scarico Principalex',
        description: 'Quando il problema risiede oltre il WC, nelle colonne di scarico condominiali o nelle fosse biologiche sature.'
      },
    ],
    tips: [
      'Non gettare mai salviette umidificate, anche se dichiarate biodegradabili.',
      'Effettuare una pulizia periodica con prodotti anticalcare specifici per evitare restringimenti del condotto.',
      'In caso di rallentamento dello scarico, non continuare a tirare l\'acqua per evitare allagamenti.',
      'Verificare che il galleggiante della cassetta carichi la quantità d\'acqua corretta (almeno 6-9 litri per scarico).',
    ],
    priceRange: {
      min: 80,
      max: 250,
      note: 'I prezzi variano in base alla complessità: un intervento semplice con molla manuale costa meno di una disostruzione con Canaljet o smontaggio del WC.'
    },
    urgencyInfo: 'Un WC intasato è un\'emergenza igienico-sanitaria che richiede intervento immediato entro 2-4 ore, specialmente in abitazioni con un unico servizio. Il rischio di tracimazione di acque nere può causare danni strutturali ai pavimenti e problemi di salute pubblica.',
    detailedDescription: 'L\'intervento professionale per sturare un WC si avvale di tecnologie avanzate come la videoispezione con telecamere micro-ottiche (es. ROTHENBERGER o RIDGID) per localizzare l\'esatta natura del tappo. Utilizziamo sonde idropulitrici ad alta pressione (Canaljet) per disintegrare i sedimenti senza danneggiare la ceramica (standard UNI EN 12056 per sistemi di scarico). In caso di ostruzioni calcaree persistenti, applichiamo solventi professionali a base di acido solforico inibito o procediamo con la rimozione meccanica del sanitario per agire direttamente sulla braga di scarico, garantendo il ripristino dei diametri nominali previsti dal progetto idraulico.',
    whenToCall: [
      'L\'acqua nel WC sale di livello e scende molto lentamente dopo lo scarico.',
      'Si avvertono gorgoglii provenienti dalle tubature o dagli altri sanitari.',
      'Presenza di cattivi odori persistenti che risalgono dallo scarico.',
      'Fuoriuscita di acqua o liquami dalla base del sanitario.',
      'Il WC rimane otturato nonostante l\'uso di prodotti chimici commerciali.',
    ],
    diyWarning: 'L\'uso improprio di ventose o acidi corrosivi da banco può spingere l\'otturazione più in profondità o causare crepe termiche nella ceramica e danni permanenti alle guarnizioni in gomma.'
  },
  'sostituzione-caldaia': {
    slug: 'sostituzione-caldaia',
    commonProblems: [
      {
        title: 'Efficienza Energetica Compromessa',
        description: 'Accumulo di calcare nello scambiatore primario e ossidazione dei componenti interni che riducono drasticamente la resa termica.'
      },
      {
        title: 'Perdite e Cali di Pressione',
        description: 'Perdite d\'acqua continue dal gruppo idraulico o dalla valvola di sicurezza, spesso segno di vasi di espansione sgonfi o bucati.'
      },
      {
        title: 'Blocchi Elettronici Ricorrenti provinciali',
        description: 'Blocchi frequenti della scheda elettronica o del ventilatore fumi dovuti all\'usura dei componenti di vecchia generazione non a condensazione.'
      },
      {
        title: 'Emissioni Inquinanti Elevate',
        description: 'Emissioni di gas di scarico che superano i limiti legali stabiliti dal DPR 74/2013, rendendo l\'apparecchio fuori norma.'
      },
    ],
    tips: [
      'Richiedi sempre l\'installazione di un termostato modulante Wi-Fi per ottimizzare i consumi fino al 30%.',
      'Verifica la possibilità di accedere al Bonus Casa o all\'Ecobonus per detrarre il 50% o 65% della spesa.',
      'Assicurati che venga eseguita la prova di tenuta dell\'impianto gas dopo il montaggio della nuova caldaia.',
      'Installa un filtro defangatore sotto la caldaia per evitare che i fanghi dell\'impianto danneggino la circolatrice.',
    ],
    priceRange: {
      min: 1600,
      max: 3800,
      note: 'Il prezzo include installazione standard e kit fumi; varia in base alla potenza (kW) e alla necessità di opere murarie o intubamento canne fumarie complesse.'
    },
    urgencyInfo: 'La sostituzione diventa urgente se la caldaia è in blocco totale durante i mesi invernali o se ci sono perdite di gas. Un intervento tempestivo evita danni strutturali causati dalle infiltrazioni d\'acqua e garantisce la sicurezza degli abitanti.',
    detailedDescription: 'Il servizio prevede lo smontaggio del vecchio generatore e l\'installazione di moderne caldaie a condensazione (Classe A) di marchi leader come Vaillant, Bosch o Beretta. L\'intervento include il lavaggio chimico dell\'impianto con pompe ad alta circolazione, l\'installazione di un defangatore magnetico e di un dosatore di polifosfati per proteggere lo scambiatore. Si assicura la conformità alla normativa UNI 7129/2015 per lo scarico fumi e il corretto intubamento della canna fumaria con materiali plastici certificati PPS. Compiliamo inoltre il nuovo Libretto di Impianto e rilasciamo la Dichiarazione di Conformità (DiCo) obbligatoria per legge.',
    whenToCall: [
      'Quando la caldaia ha più di 15 anni e i pezzi di ricambio sono introvabili.',
      'Se le bollette del gas sono aumentate improvvisamente senza variazioni d\'uso.',
      'In presenza di rumori metallici o vibrazioni forti durante l\'accensione.',
      'Se il tecnico manutentore rileva emissioni di CO oltre i limiti di legge.',
      'In caso di ristrutturazione edilizia per il miglioramento della classe energetica.',
    ],
    diyWarning: 'La sostituzione della caldaia richiede l\'abilitazione tecnica (Lettera C) e la certificazione F-Gas per legge; intervenire autonomamente espone a gravi rischi di esplosione, intossicazione da monossido e sanzioni amministrative pesanti.'
  },
  'ricerca-perdite': {
    slug: 'ricerca-perdite',
    commonProblems: [
      {
        title: 'Perdite Occulte Sottotraccia',
        description: 'Infiltrazioni invisibili che degradano i massetti e le strutture portanti, spesso rilevabili solo tramite igrometro o termocamera FLIR.'
      },
      {
        title: 'Perdite Circuito Riscaldamento Sanitario',
        description: 'Calo costante di pressione nella caldaia (es. marche Vaillant o Beretta) causato da micro-fessurazioni nei raccordi del circuito di riscaldamento.'
      },
      {
        title: 'Consumo Eccessivo in Bolletta',
        description: 'Consumi anomali segnalati dal contatore che non si fermano neanche a rubinetti chiusi, indicando un guasto nella tubazione principale.'
      },
      {
        title: 'Infiltrazioni da Scarichi Condominiali',
        description: 'Danni strutturali causati da tubazioni di scarico in PVC o Geberit danneggiate, individuabili con videoispezione ad alta risoluzione.'
      },
    ],
    tips: [
      'Controlla il contatore dell\'acqua di notte: se la rotella gira con tutti i rubinetti chiusi, hai sicuramente una perdita occulta.',
      'In caso di calo pressione caldaia, verifica prima i vasi di espansione per escludere guasti meccanici.',
      'Richiedi sempre una relazione tecnica certificata per l\'assicurazione, fondamentale per ottenere il rimborso del "danno da ricerca".',
      'Utilizza deumidificatori professionali dopo la riparazione per stabilizzare i livelli di umidità residua nei muri.',
    ],
    priceRange: {
      min: 250,
      max: 650,
      note: 'Il costo varia in base alla tecnologia utilizzata (gas tracciante vs geofono) e alle dimensioni della proprietà. Escluso costo di eventuale riparazione.'
    },
    urgencyInfo: 'Una perdita d\'acqua non rilevata può compromettere la stabilità dei solai e favorire la formazione di muffe tossiche in meno di 48 ore. Una diagnosi tempestiva evita il degrado dei materiali cementizi e previene contese legali tra condomini per danni da infiltrazione.',
    detailedDescription: 'Il servizio di ricerca perdite idriche viene eseguito con strumentazione non invasiva di ultima generazione per evitare inutili demolizioni ("metodo distruttivo zero"). Utilizziamo geofoni professionali Sewerin per l\'ascolto delle frequenze sonore provocate dalla fuoriuscita di acqua in pressione, integrando l\'indagine con termocamere Testo ad alta sensibilità termica per mappare le variazioni di temperatura nei massetti. In casi complessi, si ricorre al gas tracciante (miscela di azoto e idrogeno), iniettato nel sistema preventivamente svuotato e rilevato in superficie da sensori ultrasensibili, in conformità con la normativa UNI EN 13184. Questo approccio tecnico garantisce l\'individuazione del punto di rottura con una precisione millimetrica su tubazioni in rame, multistrato o acciaio.',
    whenToCall: [
      'Calo di pressione frequente della caldaia oltre 0.5 bar a settimana',
      'Comparsa di macchie di umidità o efflorescenze saline improvvise sulle pareti',
      'Comunicazione di consumo anomalo da parte dell\'ente gestore (es. Acea, Iren, Hera)',
      'Rumore costante di scorrimento d\'acqua nei muri durante la notte',
      'Pavimenti o battiscopa che presentano sollevamenti o segni di rigonfiamento del legno',
    ],
    diyWarning: 'Intervenire con il "fai-da-te" o rompere muri a caso basandosi su macchie di umidità superficiali può causare danni strutturali permanenti e costi di ripristino triplicati rispetto a un\'indagine professionale mirata.'
  },
  'disostruzione-fogne': {
    slug: 'disostruzione-fogne',
    commonProblems: [
      {
        title: 'Incrostazioni Calcaree e Saponose',
        description: 'Accumulo progressivo di calcare e sedimenti organici che riducono il diametro interno delle colonne montanti condominiali.'
      },
      {
        title: 'Ostruzioni Strutturali e Radici埋',
        description: 'Infiltrazione di radici negli innesti delle tubature o cedimenti strutturali dovuti all\'età della rete fognaria.'
      },
      {
        title: 'Reflusso di Acque Nere',
        description: 'Ritorno di acque reflue dai sanitari del piano terra causato da un tappo nella colonna principale o nel pozzetto di ispezione.'
      },
      {
        title: 'Sedimentazione di Grassi e Oli',
        description: 'Accumulo di grassi alimentari e oli che, raffreddandosi, creano masse solide simili al cemento (fatbergs) nei condotti orizzontali.'
      },
    ],
    tips: [
      'Effettuare una videoispezione ogni 24 mesi per prevenire allagamenti improvvisi.',
      'Evitare assolutamente di gettare salviette umidificate (anche se dichiarate degradabili) nel WC.',
      'Installare valvole antiriflusso certificate per proteggere i piani interrati.',
      'Utilizzare regolarmente prodotti enzimatici per mantenere fluidi i grassi nelle condotte della cucina.',
    ],
    priceRange: {
      min: 180,
      max: 650,
      note: 'Il prezzo varia in base alla lunghezza della colonna, all\'accessibilità dei pozzetti e alla necessità di utilizzare l\'autospurgo per il prelievo dei fanghi. Prezzo medio per pronto intervento h24.'
    },
    urgencyInfo: 'Un\'ostruzione fognaria è un\'emergenza igienico-sanitaria che richiede intervento entro 2-4 ore. Il ristagno di reflui aumenta il rischio di proliferazione batterica e danni permanenti a pavimentazioni e intonaci del condominio.',
    detailedDescription: 'L\'intervento professionale di disostruzione fogne viene eseguito utilizzando canali idrodinamici (Autoespurghi) dotati di pompe ad alta pressione (fino a 250 bar) e sonde Canal-Jet con ugelli rotanti specifici per ogni tipo di tappo. Per una diagnosi precisa, utilizziamo telecamere da ispezione Ridgid o Rems con tecnologia autolivellante e localizzatore a 512Hz per mappare esattamente il punto di rottura o l\'ostruzione. Tutte le operazioni seguono le normative ambientali del D.Lgs 152/2006 (Testo Unico Ambientale) per il corretto smaltimento dei reflui e la sanificazione dei condotti con prodotti certificati presidio medico-chirurgico.',
    whenToCall: [
      'Presenza di cattivi odori persistenti dai sifoni o dai pozzetti esterni.',
      'Rallentamento generalizzato dello scarico in più appartamenti della stessa colonna.',
      'Rumori di \'gorgoglio\' provenienti dalle tubature durante lo scarico dei piani superiori.',
      'Fuoriuscita di liquami dai pozzetti di raccolta o dalle caditoie piovane.',
      'Necessità di certificazione dello stato delle condotte per acquisizioni immobiliari.',
    ],
    diyWarning: 'L\'uso di acidi corrosivi o sonde manuali economiche può causare il collasso delle vecchie tubature in piombo o PVC sottile, rendendo necessaria una costosa sostituzione totale anziché una semplice pulizia.'
  },
  'pronto-intervento': {
    slug: 'pronto-intervento',
    commonProblems: [
      {
        title: 'Perdite d\'Acqua e Allagamenti',
        description: 'Rotture improvvise di tubazioni in pressione o scarichi condominiali che richiedono localizzazione immediata con geofono o termocamera.'
      },
      {
        title: 'WC e Scarichi Intasati',
        description: 'Ostruzioni severe della colonna di scarico che causano rigurgiti fecali, risolvibili con sonde meccaniche o Canal-Jet ad alta pressione.'
      },
      {
        title: 'Guasti alla Caldaia e Assenza Acqua Calda',
        description: 'Malfunzionamento della valvola a tre vie o del flussostato, con necessità di ripristino pressione e analisi fumi secondo norma UNI 7129.'
      },
      {
        title: 'Riparazione Cassette di Scarico e Rubinetteria',
        description: 'Cattivo funzionamento dei galleggianti o perdite dalle guarnizioni della cassetta (esterna o incasso tipo Geberit) che causano spreco idrico continuo.'
      },
    ],
    tips: [
      'In caso di perdita, chiudi immediatamente il rubinetto generale dell\'acqua solitamente posto sotto il lavello o nel vano condominiale.',
      'Se senti odore di gas, non accendere luci o dispositivi elettrici, apri le finestre e contatta subito un tecnico abilitato.',
      'Esegui una manutenzione ordinaria annuale della caldaia per evitare blocchi improvvisi durante i mesi invernali.',
      'Non utilizzare acidi corrosivi per liberare gli scarichi: possono danneggiare le guarnizioni e le tubature in piombo o PVC.',
    ],
    priceRange: {
      min: 120,
      max: 450,
      note: 'Le tariffe variano in base all\'orario (notturno/festivo), alla distanza chilometrica e alla necessità di pezzi di ricambio specifici.'
    },
    urgencyInfo: 'Un\'emergenza idraulica non risolta può causare danni permanenti a pavimentazioni in parquet, solai e arredi, oltre a generare contenziosi con i vicini per infiltrazioni. Il nostro team garantisce l\'arrivo sul posto entro 60 minuti dalla chiamata per minimizzare i danni collaterali.',
    detailedDescription: 'Il nostro servizio di pronto intervento opera nel pieno rispetto delle normative DM 37/08, garantendo riparazioni certificate su impianti idrosanitari e gas. Utilizziamo strumentazione d\'avanguardia come cercaperdite ad azoto idrogenato, termocamere FLIR per infiltrazioni occulte e stasatrici professionali Rothenberger. Trattiamo i principali marchi del settore come Caleffi per le valvole, Geberit per i sistemi di scarico e Vaillant, Beretta o Ariston per la componentistica termica. Ogni intervento d\'urgenza include la verifica della tenuta dell\'impianto e l\'eventuale rilascio del rapporto tecnico di intervento.',
    whenToCall: [
      'Allagamento del bagno o della cucina',
      'Odore persistente di gas o bruciato dalla caldaia',
      'Scarichi che rigurgitano acqua sporca dai sanitari',
      'Rottura improvvisa del flessibile dello scaldabagno',
      'Impossibilità di chiudere il rubinetto principale d\'arresto',
    ],
    diyWarning: 'Intervenire su impianti in pressione o caldaie a gas senza abilitazione professionale comporta rischi di folgorazione, esplosione o gravi danni strutturali che possono invalidare le coperture assicurative.'
  },
  'sostituzione-rubinetto': {
    slug: 'sostituzione-rubinetto',
    commonProblems: [
      {
        title: 'Perdita continua dal beccuccio o dalla base',
        description: 'L\'usura della cartuccia ceramica o degli o-ring interni causa un gocciolamento costante che aumenta i consumi idrici e crea depositi calcarei.'
      },
      {
        title: 'Leva rigida o bloccata dal calcare',
        description: 'L\'accumulo di carbonato di calcio e ossidazione blocca il movimento del monocomando o delle manopole, rendendo difficile la regolazione della temperatura.'
      },
      {
        title: 'Flessibili sottolavello deteriorati o arrugginiti',
        description: 'La corrosione galvanica o chimica dei flessibili in treccia d\'acciaio può portare a rotture improvvise e gravi allagamenti domestici.'
      },
      {
        title: 'Corrosione superficiale e perdita di finitura',
        description: 'Il distacco della cromatura e l\'ossidazione del corpo in ottone non solo compromettono l\'estetica, ma possono rilasciare residui metallici nell\'acqua.'
      },
    ],
    tips: [
      'Scegliete rubinetti con cartuccia a dischi ceramici per una maggiore durata nel tempo rispetto alle vecchie guarnizioni in gomma.',
      'Pulite periodicamente l\'aeratore (rompigetto) immergendolo nell\'aceto per mantenere il flusso d\'acqua regolare e silenzioso.',
      'Verificate periodicamente che non ci sia umidità all\'interno del mobile sottolavello, segno di una possibile micro-perdita dei flessibili.',
      'Se vivete in zone con acqua molto dura, considerate l\'installazione di un filtro a testata prima dei flessibili per proteggere la cartuccia del nuovo rubinetto.',
    ],
    priceRange: {
      min: 80,
      max: 150,
      note: 'Il prezzo si riferisce alla sola manodopera per punto acqua singolo; il costo del rubinetto varia in base al modello scelto dal cliente. Per interventi d\'urgenza o sostituzioni multiple sono previsti preventivi personalizzati.'
    },
    urgencyInfo: 'Sebbene un rubinetto che gocciola possa sembrare un problema minore, l\'urgenza diventa massima se la perdita interessa i flessibili o se non è possibile chiudere l\'acqua. Intervenire tempestivamente evita danni strutturali ai mobili della cucina o del bagno e riduce gli sprechi in bolletta.',
    detailedDescription: 'L\'intervento di sostituzione prevede lo smontaggio del vecchio miscelatore, la pulizia dei fori ceramici e l\'installazione di nuovi rubinetti conformi alla norma UNI EN 817 (per miscelatori meccanici) o UNI EN 200. Utilizziamo strumentazione professionale come la chiave a tubo snodata per dadi sottolavello e pinze a pappagallo isolate per non graffiare le finiture in cromo o PVD. Installiamo esclusivamente prodotti di alta qualità (come Grohe, Hansgrohe, Paffoni o Ideal Standard) dotati di aeratori a risparmio idrico e flessibili certificati DVGW. Il servizio include la verifica delle valvole a squadra e, se necessario, l\'applicazione di sigillanti anaerobici o canapa e pasta verde per garantire la perfetta tenuta idraulica secondo i parametri del DM 174/2004 sulla qualità delle acque destinate al consumo umano.',
    whenToCall: [
      'Presenza di acqua stagnante sotto il lavello o all\'interno del mobile.',
      'Il rubinetto continua a perdere anche dopo aver serrato con forza la manopola.',
      'Si avverte un fischio o un rumore metallico durante l\'erogazione dell\'acqua.',
      'Il getto d\'acqua è irregolare nonostante la pulizia del filtrino esterno.',
      'Volete aggiornare l\'estetica del bagno o passare a un sistema a risparmio idrico certificato.',
    ],
    diyWarning: 'Una sostituzione errata può causare micro-perdite silenziose che danneggiano i mobili sottostanti o, peggio, il serraggio eccessivo dei flessibili può provocarne lo scoppio sotto pressione costante.'
  },
  'allagamento': {
    slug: 'allagamento',
    commonProblems: [
      {
        title: 'Rottura Tubazioni Adduttrici',
        description: 'Rottura improvvisa di flessibili sottolavabo o giunti usurati che liberano acqua a pressione di rete (circa 3 bar) nel locale.'
      },
      {
        title: 'Reflusso dalla Rete Fognaria/Scarichi',
        description: 'Ritorno di acque reflue dalla colonna condominiale per ostruzione dei condotti principali o guasto alle valvole di non ritorno.'
      },
      {
        title: 'Guasto Pompa a Scatto o Sommergibile Luce',
        description: 'Malfunzionamento meccanico o elettrico della pompa sommersa adibita allo svuotamento di pozzetti o locali interrati.'
      },
      {
        title: 'Perdita Blocco Caldaia o Scaldabagno',
        description: 'Perdita continua e silenziosa del pacco lamellare o dello scambiatore che porta al surriscaldamento e all\'espulsione di acqua dalla valvola di sicurezza.'
      },
    ],
    tips: [
      'Individua e chiudi subito la chiave d\'arresto generale dell\'appartamento e stacca l\'interruttore magnetotermico.',
      'Cerca di sollevare mobili e apparecchi elettronici dal pavimento per limitare i danni collaterali da risalita capillare.',
      'Documenta l\'entità dei danni con foto e video prima dell\'arrivo dell\'idraulico per le pratiche di risarcimento assicurativo.',
      'Controlla periodicamente lo stato di corrosione dei flessibili in acciaio inox di boiler e lavandini.',
    ],
    priceRange: {
      min: 180,
      max: 650,
      note: 'Il prezzo varia in base all\'orario (notturno/festivo), al volume d\'acqua da aspirare e ai componenti sostituiti durante l\'emergenza.'
    },
    urgencyInfo: 'Un allagamento è un\'emergenza di grado massimo. L\'acqua non rimossa penetra nelle solette e nei muri perimetrali, danneggiando pavimentazioni in legno o pregiate e causando infiltrazioni ai piani inferiori con conseguenti responsabilità civili.',
    detailedDescription: 'L\'intervento d\'emergenza per allagamento richiede l\'uso di pompe autoadescanti professionali o aspiraliquidi industriali (come i modelli Festool o Ghibli & Wirbel) per l\'evacuazione rapida dei volumi d\'acqua. Una volta rimosso il ristagno, si procede alla videoispezione con telecamere Rothenberger per individuare la crepa strutturale o il blocco. In conformità con il DM 37/08, ogni ripristino dell\'impianto idrico deve garantire la tenuta stagna attraverso pressostati digitali e l\'eventuale installazione di valvole di blocco automatico tipo \'Acquastop\'. Se l\'allagamento interessa locali interrati, è fondamentale verificare l\'integrità del galleggiante e della pompa di sollevamento (marche consigliate: Grundfos o Lowara) per prevenire nuovi episodi.',
    whenToCall: [
      'Presenza di acqua stagnante sul pavimento di casa o cantina',
      'Pressione dell\'acqua drasticamente calata unitamente a rumore di scorrimento nei muri',
      'Reflusso di acque scure dai sanitari o dalle pilette di scarico',
      'Mancato avvio della pompa di sentina durante forti precipitazioni o perdite',
      'Infiltrazioni evidenti dal soffitto o macchie di umidità espansiva rapida',
    ],
    diyWarning: 'Intervenire su un allagamento senza aver sezionato l\'impianto elettrico espone a rischio di folgorazione; inoltre, un\'asciugatura superficiale può causare danni strutturali permanenti e muffe igroscopiche.'
  },
  'ristrutturazione-bagno': {
    slug: 'ristrutturazione-bagno',
    commonProblems: [
      {
        title: 'Perdite da tubature vetuste',
        description: 'La presenza di tubazioni obsolete in piombo o ferro può causare perdite occulte e contaminazione dell\'acqua potabile con ruggine.'
      },
      {
        title: 'Danni agli scarichi e contropendenze',
        description: 'Pendenze errate o diametri insufficienti dei collettori di scarico provocano frequenti ostruzioni e cattivi odori persistenti.'
      },
      {
        title: 'Infiltrazioni e umidità di risalita Ripristinare l\'integrità delle pareti e del massetto è prioritario.',
        description: 'L\'assenza di impermeabilizzazione sotto il massetto (come guaine cementizie) causa infiltrazioni strutturali ai piani inferiori.'
      },
      {
        title: 'Sanitari e rubinetteria inefficienti',
        description: 'Sanitari crepati o fissati male e rubinetterie pesantemente incrostate dal calcare che compromettono l\'efficienza idrica.'
      },
    ],
    tips: [
      'Scegli sempre cassette di scarico incassate a doppio flusso per ottimizzare il consumo idrico giornaliero.',
      'Assicurati che venga effettuata una prova di tenuta dell\'impianto in pressione prima della chiusura delle tracce.',
      'Per i rivestimenti, prediligi il gres porcellanato rettificato: riduce al minimo le fughe e facilita la pulizia.',
      'Installa un filtro defangatore o un addolcitore a monte per proteggere la nuova rubinetteria dal calcare.',
    ],
    priceRange: {
      min: 3500,
      max: 8500,
      note: 'Il prezzo varia in base alla metratura, alla scelta dei materiali (gres porcellanato, sanitari di design) e alla necessità di modificare la posizione degli scarichi esistenti. Escluse opere murarie pesanti fuori capitolato.'
    },
    urgencyInfo: 'Sebbene sia un intervento programmabile, diventa urgente in presenza di macchie di umidità sul soffitto dei vicini o perdite visibili dai muri. Agire tempestivamente evita danni strutturali onerosi e controversie condominiali.',
    detailedDescription: 'La ristrutturazione completa prevede il rifacimento totale dell\'impianto idrico-sanitario secondo la normativa UNI 9182, utilizzando tubazioni in multistrato o polipropilene ad innesto (tipo Geberit Mepla o Valsir). L\'intervento include lo smantellamento del vecchio massetto, la posa di nuovi collettori di distribuzione con valvole di intercettazione singole e l\'installazione di sistemi di scarico insonorizzati (tipo Silent-db20). Fondamentale è l\'applicazione di membrane impermeabilizzanti tipo Mapelastic di Mapei prima della posa dei rivestimenti ceramici con collanti di classe C2TE S1. L\'installazione finale dei sanitari (sospesi o a terra) e della rubinetteria (Grohe, Hansgrohe o Paffoni) assicura conformità e risparmio idrico.',
    whenToCall: [
      'Perdite d\'acqua non localizzate sotto il pavimento o dietro i muri.',
      'Odore persistente di fogna che risale dai sifoni o dalle pareti.',
      'Desiderio di modernizzare il bagno migliorando l\'efficienza energetica.',
      'Presenza di ruggine o detriti nell\'acqua che esce dai rubinetti.',
      'Necessità di passare da una vasca da bagno a un box doccia filo pavimento.',
    ],
    diyWarning: 'Il rifacimento degli impianti richiede il rilascio della Dichiarazione di Conformità (DM 37/08); interventi non professionali rischiano allagamenti gravi e la perdita della copertura assicurativa.'
  },
  'sostituzione-tubature': {
    slug: 'sostituzione-tubature',
    commonProblems: [
      {
        title: 'Corrosione e sedimentazione',
        description: 'Il piombo è tossico e soggetto a micro-fessurazioni, mentre il ferro si ostruisce a causa della ruggine e dei depositi calcarei, riducendo drasticamente la pressione.'
      },
      {
        title: 'Perdite occulte e umidità',
        description: 'Le giunture vecchie perdono elasticità, causando infiltrazioni silenziose nei muri che portano a muffe e danni strutturali costosi.'
      },
      {
        title: 'Rumorosità e cattivi odori',
        description: 'Gorgoglii e scarichi lenti sono spesso segno di tubature di scarico in ghisa o piombo deformate o parzialmente collassate.'
      },
      {
        title: 'Contaminazione dell\'acqua',
        description: 'L\'ossidazione interna rilascia particelle ferrose o metalli pesanti che rendono l\'acqua non idonea all\'uso alimentare e macchiano i sanitari.'
      },
    ],
    tips: [
      'Richiedi sempre il lavaggio chimico dell\'impianto prima del collaudo finale.',
      'Installa un dosatore di polifosfati a monte per proteggere le nuove tubature dal calcare.',
      'Opta per il sistema a collettore per gestire ogni utenza in modo indipendente.',
      'Conserva la Dichiarazione di Conformità per futuri sgravi fiscali o vendite dell\'immobile.',
    ],
    priceRange: {
      min: 800,
      max: 4500,
      note: 'I prezzi variano in base al numero di punti acqua (circa 150-300€ a punto) e se è necessaria la rimozione del massetto o delle piastrelle.'
    },
    urgencyInfo: 'L\'intervento è urgente se si riscontrano cali di pressione improvvisi o macchie di umidità. Una tubatura in piombo vecchia di 40 anni è una bomba a orologeria che può cedere senza preavviso.',
    detailedDescription: 'La sostituzione integrale delle tubature prevede la rimozione dei vecchi condotti in favore di collettori in multistrato (PE-Xc/Al/PE-RT) di marchi leader come Geberit, Valsir o Uponor, certificati secondo la norma UNI EN ISO 21003. Utilizziamo pressatrici elettroidrauliche di precisione per garantire giunzioni a tenuta perfetta e tubazioni isolate termicamente per rispondere ai requisiti del D.M. 26/06/2015 sull\'efficienza energetica. In alternativa, per impianti a vista o di pregio, installiamo rame con raccordi a pressare o saldatura capillare forte, assicurando la conformità al D.M. 37/08 con rilascio finale della Dichiarazione di Conformità.',
    whenToCall: [
      'Se l\'acqua esce di colore rossastro o marrone dai rubinetti.',
      'In fase di ristrutturazione completa di bagno o cucina.',
      'Se la caldaia va spesso in blocco per mancanza di pressione.',
      'In presenza di vicini che lamentano infiltrazioni dal vostro soffitto.',
      'Se l\'impianto ha più di 30 anni e non è mai stato revisionato.',
    ],
    diyWarning: 'Sostituire le tubature richiede attrezzature specifiche (pressatrici da migliaia di euro) e competenze idrauliche certificate; un errore nella giunzione può causare allagamenti devastanti non coperti dalle assicurazioni se il lavoro è svolto da non professionisti.'
  },
};

// Slug aliases: map alternative slugs used elsewhere in the site to the canonical content key
const SLUG_ALIASES: Record<string, string> = {
  'pronto-intervento-idraulico': 'pronto-intervento',
  'idraulico-24-ore': 'pronto-intervento',
  'spurgo-fogne': 'disostruzione-fogne',
  'spurgo-scarichi': 'disostruzione-fogne',
  'spurgo-fognature': 'autospurgo',
  'svuotamento-pozzi-neri': 'autospurgo',
  'ricerca-perdite-acqua': 'ricerca-perdite',
  'ricerca-perdite-termocamera': 'ricerca-perdite',
  'ricerca-perdite-gas-tracciante': 'ricerca-perdite',
  'wc-intasato': 'sturare-wc',
  'come-sturare-wc': 'sturare-wc',
  'riparazione-perdite': 'perdita-acqua',
  'perdita-tubo': 'perdita-acqua',
  'rubinetto-che-perde': 'rubinetto',
  'riparazione-caldaia': 'caldaia',
  'tubazioni-intasate': 'scarico-intasato',
  'riparazione-termosifone': 'impianto-riscaldamento',
};

// Function to get rich content for a service (with alias resolution)
export function getServiceRichContent(serviceSlug: string): ServiceRichContent | undefined {
  const canonical = SLUG_ALIASES[serviceSlug] || serviceSlug;
  return SERVICE_RICH_CONTENT[canonical];
}

// Generate unique paragraphs combining city and service for maximum SEO value
export function generateCityServiceContent(cityName: string, serviceName: string, serviceSlug: string): string {
  const content = SERVICE_RICH_CONTENT[serviceSlug];
  if (!content) {
    return `Cerchi un professionista per ${serviceName.toLowerCase()} a ${cityName}? Su Idraulici Subito trovi idraulici verificati pronti a intervenire in tutta ${cityName} e provincia. Richiedi un preventivo gratuito e ricevi risposta in 15 minuti.`;
  }
  
  return `A ${cityName} i problemi più comuni relativi a ${serviceName.toLowerCase()} includono ${content.commonProblems.slice(0, 2).map(p => p.title.toLowerCase()).join(' e ')}. ${content.detailedDescription} I nostri professionisti a ${cityName} intervengono rapidamente, con prezzi che partono da ${content.priceRange.min}€ per interventi standard.`;
}
