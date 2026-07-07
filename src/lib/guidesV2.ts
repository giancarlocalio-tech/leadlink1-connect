/**
 * Guide V2 - Nuove guide ad alta intenzione di ricerca.
 * Coprono problemi non ancora presenti nel resto della guida-library.
 */

import { Guide } from './guideData';

export const GUIDES_V2: Guide[] = [
  // ============ ACQUA MARRONE DAL RUBINETTO ============
  {
    slug: 'acqua-marrone-dal-rubinetto',
    title: 'Esce Acqua Marrone dal Rubinetto: Cause e Soluzioni',
    metaTitle: 'Acqua Marrone dal Rubinetto: Cause e Cosa Fare | Guida',
    metaDescription: "Il tuo rubinetto fa uscire acqua marrone o rugginosa? Scopri le cause più comuni, se è pericolosa e come risolvere passo-passo.",
    h1: 'Acqua Marrone dal Rubinetto: Cause e Soluzioni',
    excerpt: "Acqua rugginosa o torbida dai rubinetti? Nel 90% dei casi è un problema di calcare o ruggine nelle tubature. Ecco come agire.",
    category: 'sanitari',
    tags: ['acqua marrone', 'ruggine tubi', 'acqua torbida', 'boiler'],
    publishedAt: '2026-07-07',
    updatedAt: '2026-07-07',
    readingTime: 5,
    relatedServices: ['riparazione-perdite', 'pronto-intervento'],
    sections: {
      gravity: {
        id: 'quanto-grave',
        title: 'Quanto è Grave il Problema',
        content: `
          <p>L'acqua marrone che esce dal rubinetto è quasi sempre sicura per il contatto (doccia, lavaggio piatti), ma <strong>non va bevuta</strong> finché non torna limpida.</p>

          <h3>🟢 Situazione Normale</h3>
          <ul>
            <li>Colore giallo/marrone solo al primo getto del mattino</li>
            <li>Dopo lavori dell'acquedotto in zona</li>
            <li>Sparisce dopo 1-2 minuti di scorrimento</li>
          </ul>

          <h3>🔴 Situazione da Approfondire</h3>
          <ul>
            <li>Colore permanente in tutti i rubinetti di casa</li>
            <li>Solo nell'acqua calda (indica boiler o scaldabagno)</li>
            <li>Odore metallico o di uovo marcio</li>
            <li>Particelle solide visibili nel bicchiere</li>
          </ul>

          <p><strong>Perché succede:</strong> le tubature in ferro zincato di vecchie abitazioni si ossidano nel tempo, oppure sedimenti nel boiler si liberano quando cambia la pressione.</p>
        `
      },
      immediateActions: {
        id: 'cosa-fare-subito',
        title: 'Cosa Puoi Fare Subito',
        content: `
          <h3>1. Test in 3 Minuti</h3>
          <ol>
            <li>Apri il rubinetto della <strong>cucina, acqua fredda</strong>, per 2-3 minuti</li>
            <li>Se torna limpida → problema temporaneo dell'acquedotto</li>
            <li>Se rimane marrone → controlla anche l'acqua calda</li>
          </ol>

          <h3>2. Solo Acqua Calda Marrone?</h3>
          <p>Il problema è nel boiler o scaldabagno: sedimenti accumulati sul fondo.</p>
          <ul>
            <li>Spegni lo scaldabagno</li>
            <li>Chiama un tecnico per lo svuotamento e la pulizia (60-120€)</li>
          </ul>

          <h3>3. Solo un Rubinetto?</h3>
          <p>Sviti l'aeratore (il tappino sulla punta) e lo pulisci sotto acqua corrente: spesso i sedimenti si accumulano lì.</p>

          <h3>4. Tutta la Casa?</h3>
          <ul>
            <li>Chiedi ai vicini se hanno lo stesso problema (probabile lavoro rete pubblica)</li>
            <li>Chiama il numero verde del tuo gestore idrico</li>
            <li>Fino a normalizzazione: bevi solo acqua in bottiglia</li>
          </ul>
        `
      },
      whatNotToDo: {
        id: 'cosa-non-fare',
        title: 'Cosa NON Fare',
        content: `
          <h3>❌ Non Berla</h3>
          <p>Anche se probabilmente non è tossica, la ruggine può contenere batteri e alterare il sapore in modo pericoloso per stomaco e reni.</p>

          <h3>❌ Non Usarla per Cucinare la Pasta</h3>
          <p>I sedimenti si concentrano bollendo e possono macchiare pentole e cibi.</p>

          <h3>❌ Non Fare il Bucato di Capi Chiari</h3>
          <p>L'acqua rugginosa lascia aloni permanenti su tessuti bianchi e delicati.</p>

          <h3>❌ Non Aprire Tutti i Rubinetti Insieme</h3>
          <p>Peggiora il fenomeno smuovendo altri sedimenti nelle tubature.</p>
        `
      },
      whenToCall: {
        id: 'quando-chiamare',
        title: 'Quando Chiamare un Idraulico',
        content: `
          <h3>📞 Chiama un Professionista Se:</h3>
          <ul>
            <li>Il problema dura più di 24 ore</li>
            <li>Solo l'acqua calda è marrone (serve manutenzione boiler)</li>
            <li>Vedi particelle di ruggine in ogni rubinetto</li>
            <li>Casa costruita prima del 1985 con tubi in ferro</li>
          </ul>

          <h3>💰 Costi Indicativi</h3>
          <ul>
            <li><strong>Ispezione e diagnosi</strong>: 40-80€</li>
            <li><strong>Pulizia boiler</strong>: 60-150€</li>
            <li><strong>Sostituzione tratto tubo zincato</strong>: 150-400€</li>
            <li><strong>Rifacimento colonna completa</strong>: 800-2000€</li>
          </ul>
        `
      }
    }
  },

  // ============ LAVATRICE NON SCARICA ACQUA ============
  {
    slug: 'lavatrice-non-scarica-acqua',
    title: 'Lavatrice che Non Scarica Acqua: Come Risolvere',
    metaTitle: 'Lavatrice Non Scarica: Cause e Soluzioni | Guida',
    metaDescription: 'La tua lavatrice non scarica l\'acqua a fine ciclo? Scopri le 4 cause più comuni e come risolverle da solo prima di chiamare un tecnico.',
    h1: 'Lavatrice che Non Scarica: Cause e Soluzioni',
    excerpt: 'Nel 70% dei casi il problema è nel filtro pompa o nel tubo di scarico. Ecco come diagnosticare in 10 minuti.',
    category: 'scarichi',
    tags: ['lavatrice non scarica', 'filtro pompa', 'scarico elettrodomestici'],
    publishedAt: '2026-07-07',
    updatedAt: '2026-07-07',
    readingTime: 6,
    relatedServices: ['scarichi-otturati', 'riparazione-perdite'],
    sections: {
      gravity: {
        id: 'quanto-grave',
        title: 'Quanto è Grave il Problema',
        content: `
          <p>Lavatrice piena d'acqua a fine ciclo? È un problema comune e nella maggior parte dei casi si risolve senza chiamare un tecnico.</p>

          <h3>🟢 Facile da Risolvere</h3>
          <ul>
            <li>Filtro della pompa intasato (soluzione da 10 minuti)</li>
            <li>Tubo di scarico piegato dietro la lavatrice</li>
            <li>Ciclo di lavaggio interrotto per errore</li>
          </ul>

          <h3>🟡 Richiede Attenzione</h3>
          <ul>
            <li>Odore di bruciato → pompa di scarico in avaria</li>
            <li>Rumore ronzante ma acqua ferma → girante bloccata</li>
            <li>Scarichi otturati in tutta la cucina/bagno</li>
          </ul>

          <p><strong>Danno se ignorato:</strong> l'acqua stagnante fa marcire le guarnizioni e crea muffa nel cestello entro 48 ore.</p>
        `
      },
      immediateActions: {
        id: 'cosa-fare-subito',
        title: 'Cosa Puoi Fare Subito',
        content: `
          <h3>1. Svuota la Lavatrice</h3>
          <p>Metti 2-3 asciugamani sotto e apri il filtro (in basso davanti, dietro uno sportellino). Esce acqua: normale. Preparati con una bacinella bassa.</p>

          <h3>2. Pulisci il Filtro Pompa</h3>
          <ol>
            <li>Stacca la spina della lavatrice</li>
            <li>Ruota il tappo del filtro in senso antiorario</li>
            <li>Estrai capelli, monete, forcine, bottoni</li>
            <li>Sciacqua il filtro sotto l'acqua</li>
            <li>Rimonta stringendo bene (senza forzare)</li>
          </ol>

          <h3>3. Controlla il Tubo di Scarico</h3>
          <ul>
            <li>Sposta leggermente la lavatrice</li>
            <li>Verifica che il tubo non sia piegato o schiacciato dal muro</li>
            <li>Stacca il tubo dal sifone e soffiaci dentro: se non passa aria, è otturato</li>
          </ul>

          <h3>4. Prova un Ciclo di Solo Centrifuga</h3>
          <p>Seleziona "solo centrifuga" o "scarico": se ora funziona, il problema era temporaneo.</p>
        `
      },
      whatNotToDo: {
        id: 'cosa-non-fare',
        title: 'Cosa NON Fare',
        content: `
          <h3>❌ Non Aprire lo Sportello Frontale</h3>
          <p>Se il cestello è pieno d'acqua e apri lo sportello, allaghi la cucina. Serve prima svuotare dal filtro.</p>

          <h3>❌ Non Versare Sturalavandini nel Cestello</h3>
          <p>I prodotti chimici aggressivi rovinano guarnizioni e componenti in plastica.</p>

          <h3>❌ Non Ignorare l'Errore Sul Display</h3>
          <p>Codici come "E20", "F03", "OE" indicano proprio problemi di scarico: cerca il manuale del tuo modello.</p>

          <h3>❌ Non Riavviare 10 Volte lo Stesso Ciclo</h3>
          <p>Se il primo non scarica, gli altri non scaricheranno. Rischi di bruciare la pompa.</p>
        `
      },
      whenToCall: {
        id: 'quando-chiamare',
        title: 'Quando Chiamare un Tecnico',
        content: `
          <h3>📞 Chiama un Professionista Se:</h3>
          <ul>
            <li>Il filtro è pulito e il tubo libero, ma non scarica</li>
            <li>Senti odore di bruciato o vedi fumo</li>
            <li>La pompa ronza ma non gira</li>
            <li>Perde acqua dal fondo mentre lavora</li>
          </ul>

          <h3>💰 Costi Indicativi</h3>
          <ul>
            <li><strong>Disostruzione scarico</strong>: 60-120€</li>
            <li><strong>Sostituzione pompa</strong>: 100-200€ + manodopera</li>
            <li><strong>Sostituzione elettrovalvola</strong>: 80-150€</li>
          </ul>
        `
      }
    }
  },

  // ============ VALVOLA SICUREZZA CALDAIA PERDE ============
  {
    slug: 'valvola-sicurezza-caldaia-perde',
    title: 'Valvola di Sicurezza Caldaia che Perde: Cosa Significa',
    metaTitle: 'Valvola Sicurezza Caldaia Perde: Cause e Soluzioni',
    metaDescription: "Vedi acqua che gocciola dalla valvola di sicurezza della caldaia? Scopri se è normale, quando è urgente e come intervenire.",
    h1: 'Valvola di Sicurezza Caldaia che Perde',
    excerpt: "La valvola di sicurezza che scarica acqua è un segnale importante: la caldaia sta proteggendo se stessa. Ecco come capire il perché.",
    category: 'caldaie',
    tags: ['valvola sicurezza', 'caldaia perde', 'pressione caldaia', 'vaso espansione'],
    publishedAt: '2026-07-07',
    updatedAt: '2026-07-07',
    readingTime: 5,
    relatedServices: ['manutenzione-caldaie', 'pronto-intervento'],
    sections: {
      gravity: {
        id: 'quanto-grave',
        title: 'Quanto è Grave il Problema',
        content: `
          <p>La valvola di sicurezza scarica acqua quando la pressione nell'impianto sale sopra i 3 bar. È un meccanismo di protezione: senza di lei, la caldaia rischierebbe di esplodere.</p>

          <h3>🟡 Problema da Risolvere ma Non Urgente</h3>
          <ul>
            <li>Gocciola solo quando la caldaia lavora al massimo</li>
            <li>Manometro sale sopra 2,5 bar in riscaldamento</li>
            <li>Piccola perdita costante di poche gocce</li>
          </ul>

          <h3>🔴 Situazione Grave</h3>
          <ul>
            <li>Perdita continua e abbondante (bicchiere ogni ora)</li>
            <li>Manometro oltre 3 bar anche a freddo</li>
            <li>Caldaia in blocco associato</li>
            <li>Rumori di ebollizione nel circuito</li>
          </ul>

          <p><strong>Cause tipiche:</strong> vaso di espansione sgonfio (70% dei casi), valvola di carico che perde, valvola di sicurezza stessa difettosa.</p>
        `
      },
      immediateActions: {
        id: 'cosa-fare-subito',
        title: 'Cosa Puoi Fare Subito',
        content: `
          <h3>1. Controlla la Pressione</h3>
          <ol>
            <li>Guarda il manometro della caldaia (a freddo)</li>
            <li>Deve essere <strong>tra 1 e 1,5 bar</strong></li>
            <li>Se sopra 2 bar a freddo → serve svuotare l'impianto</li>
          </ol>

          <h3>2. Se la Pressione È Troppo Alta</h3>
          <ol>
            <li>Chiudi il rubinetto di carico della caldaia</li>
            <li>Sfiata un termosifone: apri la valvolina finché esce acqua stabile</li>
            <li>Controlla il manometro: se scende sotto 1,5 bar, chiudi</li>
            <li>Osserva per 24 ore: la pressione dovrebbe stabilizzarsi</li>
          </ol>

          <h3>3. Test del Vaso di Espansione</h3>
          <p>Se la pressione risale rapidamente in riscaldamento e scende in raffreddamento, il vaso di espansione è sgonfio. Richiede intervento tecnico per essere ripompato (10-15 min di lavoro).</p>

          <h3>4. Posiziona un Contenitore</h3>
          <p>Metti una bacinella sotto la valvola per raccogliere l'acqua ed evitare macchie o infiltrazioni finché non risolvi.</p>
        `
      },
      whatNotToDo: {
        id: 'cosa-non-fare',
        title: 'Cosa NON Fare',
        content: `
          <h3>❌ Non Tappare la Valvola</h3>
          <p>MAI. Chiudere o bloccare lo scarico di sicurezza rende la caldaia una potenziale bomba.</p>

          <h3>❌ Non Ignorare per Settimane</h3>
          <p>L'acqua persa va rabboccata continuamente, ma quella nuova contiene ossigeno che ossida le parti interne dell'impianto.</p>

          <h3>❌ Non Aprire il Vaso di Espansione</h3>
          <p>Contiene azoto in pressione: manovra da tecnico con manometro dedicato.</p>

          <h3>❌ Non Rabboccare Oltre 1,5 bar a Freddo</h3>
          <p>Peggiori la situazione: la valvola scaricherà ancora di più quando l'acqua si scalda.</p>
        `
      },
      whenToCall: {
        id: 'quando-chiamare',
        title: 'Quando Chiamare il Tecnico',
        content: `
          <h3>📞 Chiama Subito Se:</h3>
          <ul>
            <li>La pressione a freddo è già sopra 2 bar</li>
            <li>Sospetti il vaso di espansione sgonfio</li>
            <li>La perdita è continua nonostante gli sfiati</li>
            <li>La caldaia va in blocco (codice errore)</li>
          </ul>

          <h3>💰 Costi Indicativi</h3>
          <ul>
            <li><strong>Ricarica vaso di espansione</strong>: 60-100€</li>
            <li><strong>Sostituzione vaso di espansione</strong>: 150-280€</li>
            <li><strong>Sostituzione valvola di sicurezza</strong>: 80-150€</li>
            <li><strong>Manutenzione ordinaria caldaia</strong>: 90-140€</li>
          </ul>
        `
      }
    }
  },

  // ============ DOCCIA PERDE DAL SOFFIONE ============
  {
    slug: 'doccia-perde-dal-soffione',
    title: 'Doccia che Perde dal Soffione: Come Fermarla',
    metaTitle: 'Soffione Doccia che Perde: Cause e Rimedi | Guida',
    metaDescription: 'Il soffione della doccia continua a gocciolare anche a rubinetti chiusi? Scopri cause e come risolvere in autonomia con pochi euro.',
    h1: 'Doccia che Perde dal Soffione a Rubinetti Chiusi',
    excerpt: "Un soffione che gocciola può sprecare fino a 30 litri al giorno. Nel 90% dei casi è la cartuccia del miscelatore. Ecco come agire.",
    category: 'sanitari',
    tags: ['soffione doccia', 'miscelatore doccia', 'cartuccia doccia', 'perdita bagno'],
    publishedAt: '2026-07-07',
    updatedAt: '2026-07-07',
    readingTime: 5,
    relatedServices: ['riparazione-perdite', 'installazione-sanitari'],
    sections: {
      gravity: {
        id: 'quanto-grave',
        title: 'Quanto è Grave il Problema',
        content: `
          <p>Il soffione che continua a gocciolare a rubinetti chiusi è un problema comune ma <strong>non trascurabile</strong>: significa che internamente qualcosa non trattiene l'acqua.</p>

          <h3>💧 Spreco Reale</h3>
          <ul>
            <li><strong>Goccia lenta</strong>: 10-15 litri al giorno</li>
            <li><strong>Goccia veloce</strong>: 30-50 litri al giorno</li>
            <li><strong>Filo continuo</strong>: 100+ litri al giorno</li>
          </ul>

          <h3>🔴 Da Non Sottovalutare Se:</h3>
          <ul>
            <li>Perde solo acqua calda → spreco energia + bolletta gas</li>
            <li>Piatto doccia con muffa o calcare permanente</li>
            <li>Gocciolamento sonoro di notte (fastidio)</li>
          </ul>

          <p><strong>Cause tipiche:</strong> cartuccia del miscelatore usurata (80% casi), guarnizione del deviatore, valvola di non-ritorno rotta.</p>
        `
      },
      immediateActions: {
        id: 'cosa-fare-subito',
        title: 'Cosa Puoi Fare Subito',
        content: `
          <h3>1. Identifica il Tipo di Doccia</h3>
          <ul>
            <li><strong>Miscelatore monocomando</strong>: leva unica → problema cartuccia</li>
            <li><strong>Rubinetti separati caldo/freddo</strong>: → problema vitone/guarnizione</li>
            <li><strong>Colonna doccia termostatica</strong>: → problema cartuccia termostatica</li>
          </ul>

          <h3>2. Test del Deviatore</h3>
          <p>Se hai anche la doccetta oltre al soffione:</p>
          <ol>
            <li>Sposta il pulsante deviatore avanti e indietro</li>
            <li>Se muovendolo la perdita cambia → deviatore da sostituire</li>
            <li>Se non cambia nulla → problema nella cartuccia principale</li>
          </ol>

          <h3>3. Sostituzione Cartuccia (Livello Medio)</h3>
          <ol>
            <li>Chiudi l'acqua sotto il lavandino o dal contatore</li>
            <li>Rimuovi il tappino colorato sulla leva del miscelatore</li>
            <li>Svita la vite interna con brugola</li>
            <li>Sfila la leva, poi la ghiera in ceramica</li>
            <li>Estrai la cartuccia (35-40mm standard)</li>
            <li>Porta il pezzo in ferramenta per un ricambio identico (10-25€)</li>
            <li>Rimonta al contrario</li>
          </ol>

          <h3>4. Pulizia Preventiva</h3>
          <p>Anche solo togliere il calcare dal soffione ammollandolo 2 ore nell'aceto può migliorare la tenuta.</p>
        `
      },
      whatNotToDo: {
        id: 'cosa-non-fare',
        title: 'Cosa NON Fare',
        content: `
          <h3>❌ Non Stringere di Più la Leva</h3>
          <p>Forzarla accelera l'usura della cartuccia e rischi di romperla.</p>

          <h3>❌ Non Usare Sigillanti Chimici</h3>
          <p>Non funzionano su miscelatori interni e rovinano le guarnizioni buone.</p>

          <h3>❌ Non Aprire il Miscelatore Senza Chiudere l'Acqua</h3>
          <p>Ti allaghi il bagno in 30 secondi. Sempre chiusura acqua prima.</p>

          <h3>❌ Non Comprare "un Ricambio Universale"</h3>
          <p>Le cartucce non sono standard: porta sempre il vecchio pezzo in ferramenta per confronto.</p>
        `
      },
      whenToCall: {
        id: 'quando-chiamare',
        title: 'Quando Chiamare un Idraulico',
        content: `
          <h3>📞 Chiama un Professionista Se:</h3>
          <ul>
            <li>Il miscelatore è ad incasso nel muro</li>
            <li>Hai una colonna termostatica</li>
            <li>Dopo aver cambiato la cartuccia perde ancora</li>
            <li>Non ti senti sicuro nello smontaggio</li>
          </ul>

          <h3>💰 Costi Indicativi</h3>
          <ul>
            <li><strong>Sostituzione cartuccia miscelatore</strong>: 60-100€</li>
            <li><strong>Sostituzione miscelatore completo</strong>: 100-180€ (esclusa fornitura)</li>
            <li><strong>Miscelatore incasso</strong>: 150-300€</li>
            <li><strong>Sostituzione cartuccia termostatica</strong>: 80-140€</li>
          </ul>
        `
      }
    }
  },

  // ============ PRESSIONE ACQUA BASSA CASA ============
  {
    slug: 'pressione-acqua-bassa-in-casa',
    title: 'Pressione dell\'Acqua Bassa in Casa: Cause e Soluzioni',
    metaTitle: 'Pressione Acqua Bassa: Cause e Come Risolvere | Guida',
    metaDescription: "Acqua che esce debole dai rubinetti e doccia con poca pressione? Scopri le 5 cause più comuni e come risolvere velocemente.",
    h1: 'Pressione dell\'Acqua Bassa in Casa',
    excerpt: "Doccia debole, lavatrice che ci mette il doppio? Ecco come diagnosticare in 10 minuti se è colpa dei filtri, dell'autoclave o della rete.",
    category: 'manutenzione',
    tags: ['pressione bassa', 'autoclave', 'filtri rubinetto', 'aeratore'],
    publishedAt: '2026-07-07',
    updatedAt: '2026-07-07',
    readingTime: 5,
    relatedServices: ['manutenzione-impianti', 'installazione-autoclave'],
    sections: {
      gravity: {
        id: 'quanto-grave',
        title: 'Quanto è Grave il Problema',
        content: `
          <p>La pressione dell'acqua di rete in Italia dovrebbe essere <strong>tra 1,5 e 4 bar</strong>. Sotto 1,5 bar la doccia diventa fastidiosa, la lavatrice ci mette il doppio e la caldaia va in blocco.</p>

          <h3>🟢 Non è un Problema Grave Se:</h3>
          <ul>
            <li>Succede solo in orari di punta (7-9, 19-21)</li>
            <li>Riguarda un solo rubinetto</li>
            <li>Succede dopo lavori dell'acquedotto</li>
          </ul>

          <h3>🔴 Serve Intervenire Se:</h3>
          <ul>
            <li>Tutta la casa ha poca pressione a tutte le ore</li>
            <li>La caldaia va in blocco per bassa pressione</li>
            <li>Peggiorata gradualmente negli ultimi mesi</li>
            <li>Vivi ai piani alti e prima non avevi problemi</li>
          </ul>

          <p><strong>Cause tipiche:</strong> aeratori/filtri intasati dal calcare, riduttore di pressione starato, autoclave in avaria, tubi otturati da incrostazioni, problema dell'acquedotto.</p>
        `
      },
      immediateActions: {
        id: 'cosa-fare-subito',
        title: 'Cosa Puoi Fare Subito',
        content: `
          <h3>1. Test in 5 Minuti</h3>
          <ol>
            <li>Apri il rubinetto della cucina, acqua fredda al massimo</li>
            <li>Prova acqua calda al massimo</li>
            <li>Prova la doccia</li>
            <li>Chiedi al vicino di piano se ha lo stesso problema</li>
          </ol>
          <p>Se solo tu hai problemi → problema in casa. Se anche i vicini → problema in condominio o rete pubblica.</p>

          <h3>2. Pulizia degli Aeratori (Soluzione del 40% dei Casi)</h3>
          <ol>
            <li>Svita la punta di ogni rubinetto (l'anello con il filtrino)</li>
            <li>Ammolla i filtri in aceto bianco per 2 ore</li>
            <li>Sciacqua bene e rimonta</li>
            <li>Fai lo stesso con il soffione della doccia</li>
          </ol>

          <h3>3. Controlla la Valvola dell'Acqua Principale</h3>
          <p>La saracinesca in ingresso deve essere completamente aperta (spesso è chiusa a metà per errore).</p>

          <h3>4. Test Caldaia</h3>
          <p>Se hai bassa pressione solo di acqua calda: pulire il filtro in ingresso alla caldaia (sotto il boiler).</p>
        `
      },
      whatNotToDo: {
        id: 'cosa-non-fare',
        title: 'Cosa NON Fare',
        content: `
          <h3>❌ Non Regolare il Riduttore Senza Manometro</h3>
          <p>Se hai un riduttore di pressione, va tarato con strumenti. Girarlo a caso può danneggiare la caldaia o creare colpi d'ariete.</p>

          <h3>❌ Non Installare "Pompette Aumenta-Pressione" Fai-da-Te</h3>
          <p>Devono essere dimensionate all'impianto e collegate a valle del contatore: intervento da tecnico.</p>

          <h3>❌ Non Ignorare gli Errori della Caldaia</h3>
          <p>La caldaia in blocco per bassa pressione idraulica va analizzata: forza altrimenti la valvola di sicurezza.</p>

          <h3>❌ Non Usare Prodotti "Anticalcare" Aggressivi nei Tubi</h3>
          <p>Non risolvono l'incrostazione interna e possono rovinare guarnizioni ed elettrodomestici.</p>
        `
      },
      whenToCall: {
        id: 'quando-chiamare',
        title: 'Quando Chiamare un Idraulico',
        content: `
          <h3>📞 Chiama un Professionista Se:</h3>
          <ul>
            <li>Pulizia aeratori non risolve</li>
            <li>Serve tarare o sostituire il riduttore di pressione</li>
            <li>Sospetti autoclave rotto (villa/casa indipendente)</li>
            <li>Casa vecchia con tubi in ferro incrostati</li>
            <li>Bassa pressione solo ai piani alti del condominio</li>
          </ul>

          <h3>💰 Costi Indicativi</h3>
          <ul>
            <li><strong>Diagnosi e taratura riduttore</strong>: 60-100€</li>
            <li><strong>Sostituzione riduttore di pressione</strong>: 120-220€</li>
            <li><strong>Riparazione autoclave</strong>: 150-400€</li>
            <li><strong>Sostituzione autoclave</strong>: 500-1200€</li>
            <li><strong>Installazione pompa di rilancio</strong>: 400-900€</li>
          </ul>
        `
      }
    }
  },

  // ============ COLPO ARIETE RUMORE TUBI ============
  {
    slug: 'colpo-ariete-rumore-tubi',
    title: 'Colpo d\'Ariete: Perché i Tubi Battono e Come Risolverlo',
    metaTitle: 'Colpo d\'Ariete Tubi: Cause e Soluzioni Definitive',
    metaDescription: "Rumore di martello nei tubi quando chiudi il rubinetto? È il colpo d'ariete. Scopri cause, rischi e come eliminarlo per sempre.",
    h1: 'Colpo d\'Ariete: Rumore nei Tubi Quando Chiudi il Rubinetto',
    excerpt: "Quel 'BAM' improvviso dai tubi non è normale: può rompere raccordi e giunti. Ecco perché succede e come risolverlo.",
    category: 'manutenzione',
    tags: ['colpo ariete', 'rumori tubi', 'martellamento tubature', 'ammortizzatore idraulico'],
    publishedAt: '2026-07-07',
    updatedAt: '2026-07-07',
    readingTime: 5,
    relatedServices: ['manutenzione-impianti', 'riparazione-perdite'],
    sections: {
      gravity: {
        id: 'quanto-grave',
        title: 'Quanto è Grave il Problema',
        content: `
          <p>Il colpo d'ariete è un'onda di pressione che si genera quando l'acqua in movimento viene fermata bruscamente. Il rumore è un sintomo, il vero problema è il <strong>danno progressivo</strong> alle tubature.</p>

          <h3>🟡 Fastidio ma Non Urgenza</h3>
          <ul>
            <li>Rumore occasionale al chiudere rapidamente il rubinetto</li>
            <li>Un solo "bang" secco e poi silenzio</li>
            <li>Succede solo con la lavatrice/lavastoviglie</li>
          </ul>

          <h3>🔴 Problema Serio</h3>
          <ul>
            <li>Rumore forte e vibrazioni prolungate</li>
            <li>Succede più volte al giorno</li>
            <li>Tubi che si muovono visibilmente nelle pareti</li>
            <li>Perdite improvvise apparse dopo colpi d'ariete</li>
          </ul>

          <p><strong>Rischio reale:</strong> con il tempo può causare rottura di raccordi, distacco di curve, cedimento di flessibili e perdite improvvise dietro le pareti.</p>
        `
      },
      immediateActions: {
        id: 'cosa-fare-subito',
        title: 'Cosa Puoi Fare Subito',
        content: `
          <h3>1. Test per Identificare l'Origine</h3>
          <p>Prova a chiudere lentamente ogni rubinetto e ascolta. Molto spesso il colpo arriva dall'elettrovalvola di lavatrice o lavastoviglie: si chiudono in un istante generando l'onda.</p>

          <h3>2. Riduci la Pressione dell'Acqua</h3>
          <p>Se hai un riduttore di pressione in ingresso, abbassalo leggermente (senza scendere sotto 2 bar). Meno pressione = meno colpo.</p>

          <h3>3. Sfiata gli Ammortizzatori d'Aria</h3>
          <p>Molti impianti hanno colonne d'aria alle estremità che assorbono i colpi. Se saturate d'acqua non funzionano più. Come rigenerarle:</p>
          <ol>
            <li>Chiudi la valvola generale dell'acqua</li>
            <li>Apri tutti i rubinetti di casa (soprattutto quelli alti)</li>
            <li>Aspetta 15 minuti che tutta l'acqua scenda</li>
            <li>Chiudi i rubinetti in ordine dall'alto al basso</li>
            <li>Riapri la valvola generale</li>
          </ol>

          <h3>4. Ancoraggio Tubi</h3>
          <p>Se vedi tubi a vista che vibrano, fissali con collari imbottiti al muro ogni 50 cm.</p>
        `
      },
      whatNotToDo: {
        id: 'cosa-non-fare',
        title: 'Cosa NON Fare',
        content: `
          <h3>❌ Non Ignorare Vibrazioni Ripetute</h3>
          <p>Ogni colpo indebolisce raccordi e saldature: prima o poi qualcosa cede.</p>

          <h3>❌ Non Alzare la Pressione</h3>
          <p>Più pressione = colpi più forti. Se hai poca pressione risolvi quello con un professionista, non modificando riduttori a caso.</p>

          <h3>❌ Non Serrare a Bestia i Raccordi</h3>
          <p>Non è il modo di risolvere: rischi di crepare filetti e piombature.</p>

          <h3>❌ Non Aspettare la Perdita per Chiamare</h3>
          <p>Il colpo d'ariete cronico è un intervento programmabile a poche decine di euro. La perdita improvvisa dietro una parete costa centinaia.</p>
        `
      },
      whenToCall: {
        id: 'quando-chiamare',
        title: 'Quando Chiamare un Idraulico',
        content: `
          <h3>📞 Chiama un Professionista Se:</h3>
          <ul>
            <li>Lo sfiato degli ammortizzatori non risolve</li>
            <li>Rumore forte e persistente in tutto l'impianto</li>
            <li>Vibrazioni evidenti nelle pareti</li>
            <li>Perdite già comparse in seguito ai colpi</li>
          </ul>

          <h3>💡 Soluzione Definitiva</h3>
          <p>L'idraulico installerà uno o più <strong>ammortizzatori idraulici a molla</strong> (o "arresta-colpi") vicino ai punti di generazione: elettrovalvole di lavatrice/lavastoviglie e rubinetti principali. Sono cilindretti che assorbono l'onda di pressione.</p>

          <h3>💰 Costi Indicativi</h3>
          <ul>
            <li><strong>Diagnosi</strong>: 40-70€</li>
            <li><strong>Installazione arresta-colpi singolo</strong>: 60-100€</li>
            <li><strong>Installazione multipla (3-4 punti)</strong>: 200-350€</li>
            <li><strong>Ancoraggio e revisione tubazioni</strong>: 150-400€</li>
          </ul>
        `
      }
    }
  }
];
