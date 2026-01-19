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
  }
};

// Function to get rich content for a service
export function getServiceRichContent(serviceSlug: string): ServiceRichContent | undefined {
  return SERVICE_RICH_CONTENT[serviceSlug];
}

// Generate unique paragraphs combining city and service for maximum SEO value
export function generateCityServiceContent(cityName: string, serviceName: string, serviceSlug: string): string {
  const content = SERVICE_RICH_CONTENT[serviceSlug];
  if (!content) {
    return `Cerchi un professionista per ${serviceName.toLowerCase()} a ${cityName}? Su Idraulici Subito trovi idraulici verificati pronti a intervenire in tutta ${cityName} e provincia. Richiedi un preventivo gratuito e ricevi risposta in 15 minuti.`;
  }
  
  return `A ${cityName} i problemi più comuni relativi a ${serviceName.toLowerCase()} includono ${content.commonProblems.slice(0, 2).map(p => p.title.toLowerCase()).join(' e ')}. ${content.detailedDescription} I nostri professionisti a ${cityName} intervengono rapidamente, con prezzi che partono da ${content.priceRange.min}€ per interventi standard.`;
}
