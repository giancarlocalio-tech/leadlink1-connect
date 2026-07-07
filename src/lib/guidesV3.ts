/**
 * Guide V3 - Secondo lotto di guide ad alta intenzione.
 * Boiler elettrico, lavastoviglie, WC che perde, sifone ostruito.
 */

import { Guide } from './guideData';

export const GUIDES_V3: Guide[] = [
  // ============ BOILER ELETTRICO CHE PERDE ============
  {
    slug: 'boiler-elettrico-perde-acqua',
    title: 'Boiler Elettrico che Perde Acqua: Cause e Soluzioni',
    metaTitle: 'Boiler Elettrico Perde Acqua: Cosa Fare Subito | Guida',
    metaDescription: "Il boiler elettrico gocciola o perde acqua da sotto? Scopri le cause (valvola, resistenza, serbatoio forato) e come intervenire in sicurezza.",
    h1: 'Boiler Elettrico che Perde Acqua: Cause e Soluzioni',
    excerpt: "Uno scaldabagno elettrico che perde è quasi sempre un segnale serio: valvola di sicurezza, guarnizioni o serbatoio corroso. Ecco come agire.",
    category: 'caldaie',
    tags: ['boiler elettrico', 'scaldabagno perde', 'valvola sicurezza', 'perdita acqua'],
    publishedAt: '2026-07-07',
    updatedAt: '2026-07-07',
    readingTime: 5,
    relatedServices: ['riparazione-caldaie', 'pronto-intervento'],
    sections: {
      gravity: {
        id: 'quanto-grave',
        title: 'Quanto è Grave il Problema',
        content: `
          <p>Un boiler elettrico che perde è un problema <strong>sempre da prendere sul serio</strong>: c'è acqua, corrente elettrica e pressione nello stesso oggetto appeso al muro.</p>

          <h3>🟢 Situazione Gestibile</h3>
          <ul>
            <li>Poche gocce dal <strong>tubicino della valvola di sicurezza</strong> durante il riscaldamento</li>
            <li>Condensa in estate sotto il boiler in ambienti umidi</li>
          </ul>

          <h3>🔴 Situazione Grave</h3>
          <ul>
            <li>Acqua che cola <strong>dal fondo del serbatoio</strong> (spesso indica corrosione irreversibile)</li>
            <li>Perdita continua anche a boiler spento</li>
            <li>Macchie di ruggine sulla scocca metallica</li>
            <li>Salta il differenziale (salvavita) quando il boiler è acceso</li>
          </ul>
        `
      },
      immediateActions: {
        id: 'cosa-fare-subito',
        title: 'Cosa Fare Subito',
        content: `
          <ol>
            <li><strong>Stacca la corrente</strong>: interruttore dedicato del boiler o salvavita generale. Mai toccare un boiler che perde con l'elettricità attiva.</li>
            <li><strong>Chiudi il rubinetto d'arresto</strong> dell'acqua fredda in ingresso al boiler (di solito subito sotto, con leva blu o rossa).</li>
            <li><strong>Apri un rubinetto di acqua calda</strong> in casa per sfiatare la pressione interna.</li>
            <li><strong>Identifica il punto di perdita</strong>: valvola di sicurezza (tubicino laterale), attacchi filettati, flangia della resistenza, o direttamente dal serbatoio.</li>
            <li>Metti un contenitore o vecchi asciugamani sotto per limitare i danni al pavimento.</li>
          </ol>
        `
      },
      whatNotToDo: {
        id: 'cosa-non-fare',
        title: 'Cosa NON Fare',
        content: `
          <ul>
            <li>❌ Non tappare il tubicino della valvola di sicurezza: se lo fai, il boiler può <strong>esplodere</strong> quando la pressione sale.</li>
            <li>❌ Non riaccendere per "vedere se ancora perde": rischio scossa.</li>
            <li>❌ Non stringere a martello raccordi che sembrano gocciolare — spesso peggiori la perdita e rompi la filettatura.</li>
            <li>❌ Non cercare di svuotare il boiler da solo se è a incasso o sopra la testa: pesa 40-100 kg pieno.</li>
            <li>❌ Non rimandare: se perde dal serbatoio, è solo questione di tempo prima che ceda del tutto.</li>
          </ul>
        `
      },
      whenToCall: {
        id: 'quando-chiamare',
        title: 'Quando Chiamare un Idraulico',
        content: `
          <p><strong>Chiama subito</strong> se la perdita viene dal fondo/serbatoio, se salta il salvavita o se non trovi il rubinetto d'arresto.</p>

          <h3>💡 Cosa Farà l'Idraulico</h3>
          <ul>
            <li>Valvola di sicurezza tarata male → sostituzione (30-60€ + manodopera)</li>
            <li>Guarnizione flangia resistenza → sostituzione guarnizione e anodo di magnesio (80-150€)</li>
            <li>Serbatoio forato → <strong>non si ripara</strong>, va sostituito il boiler intero</li>
          </ul>

          <h3>💰 Costi Indicativi</h3>
          <ul>
            <li><strong>Diagnosi + valvola</strong>: 80-130€</li>
            <li><strong>Sostituzione resistenza + anodo</strong>: 120-200€</li>
            <li><strong>Sostituzione boiler 80L completa</strong>: 350-600€</li>
          </ul>
        `
      }
    }
  },

  // ============ LAVASTOVIGLIE BLOCCATA / NON SCARICA ============
  {
    slug: 'lavastoviglie-non-scarica-acqua',
    title: 'Lavastoviglie che Non Scarica Acqua: Cause e Soluzioni',
    metaTitle: 'Lavastoviglie Non Scarica: Come Risolvere | Guida',
    metaDescription: "Lavastoviglie bloccata con acqua sul fondo? Filtro, pompa di scarico o sifone otturato: ecco come diagnosticare e risolvere passo-passo.",
    h1: 'Lavastoviglie che Non Scarica Acqua: Cause e Soluzioni',
    excerpt: "Se la lavastoviglie resta con l'acqua sul fondo alla fine del ciclo, nel 70% dei casi è filtro o sifone. Ecco la sequenza corretta per intervenire.",
    category: 'scarichi',
    tags: ['lavastoviglie', 'non scarica', 'filtro', 'pompa scarico'],
    publishedAt: '2026-07-07',
    updatedAt: '2026-07-07',
    readingTime: 5,
    relatedServices: ['disostruzione-scarichi', 'riparazione-perdite'],
    sections: {
      gravity: {
        id: 'quanto-grave',
        title: 'Quanto è Grave il Problema',
        content: `
          <p>Non è un'emergenza allagamento, ma se ignorato può portare a <strong>rottura della pompa di scarico</strong> (100-200€ di ricambio) o al blocco del sifone comune con il lavello.</p>

          <h3>🟢 Situazione Gestibile</h3>
          <ul>
            <li>Poca acqua sul fondo, drena lentamente aprendo lo sportello</li>
            <li>Errore E1/E4/F5 sul display (drenaggio) senza rumori strani</li>
          </ul>

          <h3>🔴 Situazione da Approfondire</h3>
          <ul>
            <li>La macchina fa un ronzio continuo ma non pompa</li>
            <li>Acqua che risale nel lavello quando la lavastoviglie parte</li>
            <li>Cattivo odore persistente dopo ogni ciclo</li>
          </ul>
        `
      },
      immediateActions: {
        id: 'cosa-fare-subito',
        title: 'Cosa Fare Subito',
        content: `
          <ol>
            <li><strong>Spegni la lavastoviglie</strong> e stacca la spina (o abbassa l'interruttore).</li>
            <li><strong>Svuota l'acqua a mano</strong> con un bicchiere o una spugna prima di smontare qualcosa.</li>
            <li><strong>Estrai e pulisci il filtro</strong> sul fondo (si svita in senso antiorario): rimuovi residui di cibo, ossicini, vetri. È il colpevole nell'80% dei casi.</li>
            <li><strong>Controlla le braccia rotanti</strong>: fori otturati da calcare rallentano il drenaggio.</li>
            <li><strong>Verifica il tubo di scarico</strong> dietro: non deve essere schiacciato o piegato ad "S" stretta.</li>
            <li><strong>Controlla il sifone del lavello</strong>: se la lavastoviglie scarica lì, un sifone otturato blocca anche la macchina.</li>
            <li>Fai partire un ciclo breve a vuoto per verificare.</li>
          </ol>
        `
      },
      whatNotToDo: {
        id: 'cosa-non-fare',
        title: 'Cosa NON Fare',
        content: `
          <ul>
            <li>❌ Non usare <strong>disgorganti chimici aggressivi</strong> dentro la lavastoviglie: danneggiano guarnizioni e pompa.</li>
            <li>❌ Non capovolgere la macchina "per far uscire l'acqua": versi acqua sull'elettronica sul fondo.</li>
            <li>❌ Non forzare l'apertura mentre lavora: rischi di allagare.</li>
            <li>❌ Non ignorare l'errore ripetuto: la pompa in blocco meccanico brucia.</li>
            <li>❌ Non pulire il filtro con oggetti metallici affilati: graffi = intasamenti futuri.</li>
          </ul>
        `
      },
      whenToCall: {
        id: 'quando-chiamare',
        title: 'Quando Chiamare un Idraulico',
        content: `
          <p>Se dopo pulizia filtro + sifone + verifica tubo il problema persiste, serve un tecnico. Distingui:</p>
          <ul>
            <li><strong>Idraulico</strong>: se lo scarico murario (dietro il mobile) è otturato, o se serve rifare il collegamento al sifone.</li>
            <li><strong>Tecnico elettrodomestici</strong>: se la pompa di scarico è rotta o la scheda dà errore.</li>
          </ul>

          <h3>💰 Costi Indicativi</h3>
          <ul>
            <li><strong>Disostruzione scarico murario</strong>: 70-130€</li>
            <li><strong>Rifacimento sifone/collegamento</strong>: 60-120€</li>
            <li><strong>Sostituzione pompa scarico</strong> (tecnico): 100-200€</li>
          </ul>
        `
      }
    }
  },

  // ============ WC CHE PERDE ACQUA CONTINUAMENTE ============
  {
    slug: 'wc-perde-acqua-continua-nella-tazza',
    title: 'WC che Perde Acqua Continuamente nella Tazza: Soluzioni',
    metaTitle: 'WC Perde Acqua nella Tazza: Come Fermarlo | Guida',
    metaDescription: "Il WC continua a far scorrere acqua nella tazza anche dopo lo scarico? Galleggiante, guarnizione a campana o batteria: ecco come risolvere.",
    h1: 'WC che Perde Acqua Continuamente nella Tazza: Soluzioni',
    excerpt: "Uno sciacquone che gocciola in tazza può sprecare oltre 100 litri al giorno. Nel 90% dei casi è la guarnizione a campana della cassetta. Ecco come intervenire.",
    category: 'sanitari',
    tags: ['wc perde', 'sciacquone', 'cassetta wc', 'galleggiante'],
    publishedAt: '2026-07-07',
    updatedAt: '2026-07-07',
    readingTime: 5,
    relatedServices: ['riparazione-sanitari', 'riparazione-perdite'],
    sections: {
      gravity: {
        id: 'quanto-grave',
        title: 'Quanto è Grave il Problema',
        content: `
          <p>Non è un'emergenza acuta, ma è un <strong>problema economico serio</strong>: un WC che perde in tazza consuma 100-400 litri al giorno = 3.000-12.000 litri al mese in bolletta.</p>

          <h3>🟢 Situazione Gestibile</h3>
          <ul>
            <li>Filo d'acqua che scende lentamente nella parete della tazza</li>
            <li>Rumore leggero della cassetta che si riempie ogni tanto</li>
          </ul>

          <h3>🔴 Situazione da Approfondire Subito</h3>
          <ul>
            <li>Acqua che scorre a getto continuo in tazza</li>
            <li>La cassetta si riempie e si svuota da sola ogni pochi minuti</li>
            <li>Perdita anche a terra dietro il WC (guarnizione base cassetta)</li>
          </ul>
        `
      },
      immediateActions: {
        id: 'cosa-fare-subito',
        title: 'Cosa Fare Subito',
        content: `
          <ol>
            <li><strong>Chiudi il rubinetto d'arresto</strong> del WC (di solito a parete, dietro o sotto la cassetta, a manopola cromata).</li>
            <li><strong>Apri la cassetta</strong>: cassetta esterna → coperchio superiore; cassetta a incasso → pannello di ispezione dietro la placca dello sciacquone.</li>
            <li><strong>Verifica il livello dell'acqua</strong>: se supera il troppopieno (il tubo verticale al centro), il problema è il <strong>galleggiante</strong>. Abbassalo o piega leggermente il braccio.</li>
            <li><strong>Se il livello è normale ma l'acqua continua a scendere</strong>: è la <strong>guarnizione a campana</strong> sul fondo che non chiude più. Prova a premerla e rilasciarla: se si ferma, va sostituita.</li>
            <li><strong>Controlla la batteria di scarico</strong>: molle rotte o incrostate sul pulsante possono tenere aperta la valvola.</li>
            <li>Se identifichi il pezzo, portalo in ferramenta/idraulica per un ricambio compatibile (5-25€).</li>
          </ol>
        `
      },
      whatNotToDo: {
        id: 'cosa-non-fare',
        title: 'Cosa NON Fare',
        content: `
          <ul>
            <li>❌ Non mettere <strong>mattoni o pesi</strong> dentro la cassetta "per risparmiare acqua": danneggiano il meccanismo.</li>
            <li>❌ Non usare pastiglie disinfettanti aggressive in cassetta: corrodono guarnizioni in gomma e accelerano il problema.</li>
            <li>❌ Non forzare il pulsante di scarico se resta abbassato: rischi di rompere la placca a incasso (60-150€ di ricambio).</li>
            <li>❌ Non ignorare: 6 mesi di perdita silenziosa = 300-800€ in più di bolletta acqua.</li>
            <li>❌ Non aprire una cassetta a incasso senza chiudere l'acqua prima.</li>
          </ul>
        `
      },
      whenToCall: {
        id: 'quando-chiamare',
        title: 'Quando Chiamare un Idraulico',
        content: `
          <p>Chiama un idraulico se:</p>
          <ul>
            <li>Hai una <strong>cassetta a incasso Geberit/Pucci/Oli</strong>: i pezzi vanno individuati esattamente sul modello</li>
            <li>Perde anche da <strong>sotto la cassetta o dal collegamento a muro</strong></li>
            <li>Il WC è "sospeso" a parete e non hai accesso comodo</li>
            <li>Dopo aver cambiato guarnizione a campana la perdita continua</li>
          </ul>

          <h3>💰 Costi Indicativi</h3>
          <ul>
            <li><strong>Sostituzione guarnizione a campana</strong> (esterna): 40-70€</li>
            <li><strong>Batteria completa cassetta esterna</strong>: 60-110€</li>
            <li><strong>Kit interno cassetta a incasso Geberit</strong>: 90-180€</li>
            <li><strong>Sostituzione rubinetto d'arresto WC</strong>: 40-80€</li>
          </ul>
        `
      }
    }
  },

  // ============ SIFONE OSTRUITO ============
  {
    slug: 'sifone-lavandino-otturato',
    title: 'Sifone del Lavandino Otturato: Come Pulirlo Passo-Passo',
    metaTitle: 'Sifone Lavandino Otturato: Guida Pulizia | Idraulici Subito',
    metaDescription: "Lavandino che si svuota lentamente o non scarica? Il sifone è il primo indiziato. Ecco come smontarlo e pulirlo senza allagare il mobile.",
    h1: 'Sifone del Lavandino Otturato: Come Pulirlo Passo-Passo',
    excerpt: "Un sifone a P intasato è il problema più comune sotto un lavandino. In 15 minuti lo pulisci da solo senza chiamare nessuno. Ecco come.",
    category: 'scarichi',
    tags: ['sifone otturato', 'lavandino intasato', 'scarico lento', 'sifone P'],
    publishedAt: '2026-07-07',
    updatedAt: '2026-07-07',
    readingTime: 4,
    relatedServices: ['disostruzione-scarichi', 'pronto-intervento'],
    sections: {
      gravity: {
        id: 'quanto-grave',
        title: 'Quanto è Grave il Problema',
        content: `
          <p>Un sifone otturato è un problema <strong>locale e risolvibile</strong>: raramente indica ostruzioni più profonde della colonna di scarico condominiale.</p>

          <h3>🟢 Sicuramente Sifone</h3>
          <ul>
            <li>Solo <strong>quel lavandino</strong> scarica lento (gli altri OK)</li>
            <li>Cattivo odore locale, che sparisce facendo scorrere acqua</li>
            <li>Piccoli residui visibili quando smonti il sifone</li>
          </ul>

          <h3>🔴 Probabilmente NON è solo il Sifone</h3>
          <ul>
            <li>Più scarichi lenti contemporaneamente (bagno + cucina)</li>
            <li>Gorgoglii nel WC quando svuoti il lavandino</li>
            <li>Acqua che risale dallo scarico del piatto doccia</li>
          </ul>
        `
      },
      immediateActions: {
        id: 'cosa-fare-subito',
        title: 'Come Smontare e Pulire il Sifone',
        content: `
          <p><strong>Ti servono</strong>: un secchio, guanti, uno straccio, un cacciavite (a volte non serve).</p>
          <ol>
            <li><strong>Svuota il lavandino</strong> con un bicchiere se c'è acqua ferma.</li>
            <li><strong>Metti il secchio sotto il sifone</strong>: la curva a "P" (o "S") è piena di 200-400 ml d'acqua sporca.</li>
            <li><strong>Svita le due ghiere di plastica</strong> a mano (senso antiorario): quella superiore che attacca alla piletta, e quella laterale che va al tubo di scarico. Sifoni moderni si svitano <strong>senza attrezzi</strong>.</li>
            <li><strong>Rimuovi la curva</strong> e svuotala nel secchio: capelli, residui di sapone, cibo, fondi caffè escono di lì.</li>
            <li><strong>Pulisci con acqua calda</strong> e uno scovolino (va bene anche uno scovolino da biberon o un fil di ferro con panno).</li>
            <li><strong>Controlla la piletta</strong> sopra: spesso sotto la griglia c'è un blocco di capelli. Toglilo con pinze.</li>
            <li><strong>Rimonta</strong> senza stringere troppo (rischi di rompere le ghiere). Le guarnizioni bianche vanno nella loro sede.</li>
            <li>Fai scorrere acqua calda per 30 secondi: se non gocciola sotto e drena veloce, hai finito.</li>
          </ol>
        `
      },
      whatNotToDo: {
        id: 'cosa-non-fare',
        title: 'Cosa NON Fare',
        content: `
          <ul>
            <li>❌ Non versare <strong>acido muriatico o soda caustica</strong>: se il sifone è di plastica lo bucano, e se resta acqua ferma sono pericolosi da smontare dopo.</li>
            <li>❌ Non usare pinze grandi sulle ghiere di plastica: le crepi. Solo mani (al massimo pinza a pappagallo con panno).</li>
            <li>❌ Non dimenticare il secchio sotto: 400ml d'acqua nera nel mobile della cucina non è divertente.</li>
            <li>❌ Non provare a spingere il tappo giù con un ferro rigido dalla piletta: rischi di bucare il sifone dall'interno.</li>
            <li>❌ Non stringere le ghiere con forza al rimontaggio: la tenuta la fa la guarnizione, non la pressione.</li>
          </ul>
        `
      },
      whenToCall: {
        id: 'quando-chiamare',
        title: 'Quando Chiamare un Idraulico',
        content: `
          <p>Se dopo aver pulito il sifone il lavandino <strong>continua a scaricare lento</strong>, l'ostruzione è più a valle (nel tubo di scarico murario o nella colonna condominiale) e serve una molla o un'idropulitrice professionale.</p>

          <p>Chiama subito se:</p>
          <ul>
            <li>Più scarichi lenti contemporaneamente</li>
            <li>Acqua che rigurgita da altri sanitari</li>
            <li>Il sifone perde dopo il rimontaggio (guarnizioni rovinate o ghiere crepate)</li>
          </ul>

          <h3>💰 Costi Indicativi</h3>
          <ul>
            <li><strong>Disostruzione con molla manuale</strong>: 60-100€</li>
            <li><strong>Disostruzione con idropulitrice</strong>: 100-180€</li>
            <li><strong>Sostituzione sifone completo</strong>: 40-80€ (ricambio 8-20€ + manodopera)</li>
            <li><strong>Ispezione videocamera scarico</strong>: 90-150€</li>
          </ul>
        `
      }
    }
  }
];
