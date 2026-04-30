/**
 * Quick Answers per le guide — ottimizzati per AI Overviews / GEO.
 *
 * Formato pensato per essere "estratto" e citato dalle AI generative
 * (Google AI Overviews, ChatGPT Search, Perplexity, Gemini):
 *  - Risposta diretta in 40-80 parole
 *  - Steps numerati brevi (1 riga ciascuno)
 *  - Stats citabili: tempo, costo, difficoltà
 *
 * Linkato a `Guide.slug` in src/lib/guideData.ts
 */

export interface QuickAnswer {
  /** Risposta diretta in 40-80 parole. Stile dichiarativo, no marketing. */
  answer: string;
  /** 3-6 passi numerati, max 15 parole ciascuno */
  steps?: string[];
  /** Tempo medio per risolvere (es. "10-15 min" oppure "Subito") */
  time?: string;
  /** Costo medio se chiami un professionista (es. "€80-150") */
  cost?: string;
  /** Livello difficoltà fai-da-te */
  difficulty?: 'Facile' | 'Media' | 'Difficile' | 'Solo professionista';
  /** Quando chiamare un idraulico subito (1 frase decisiva) */
  whenToCallPro?: string;
}

export const GUIDE_QUICK_ANSWERS: Record<string, QuickAnswer> = {
  'perdita-acqua-tubo-muro': {
    answer:
      "Una perdita d'acqua dal muro indica quasi sempre un tubo rotto nell'impianto interno. Chiudi subito il rubinetto generale dell'acqua, asciuga la zona, scatta una foto e contatta un idraulico entro poche ore. Più aspetti, più aumentano i danni a muro, intonaco e impianto elettrico.",
    steps: [
      "Chiudi il rubinetto generale dell'acqua di casa",
      'Stacca la corrente nella zona se il muro è molto bagnato',
      'Asciuga e fotografa la macchia per documentare',
      'Non bucare il muro per cercare la perdita da solo',
      'Chiama un idraulico con cercaperdite (entro 24h)',
    ],
    time: '15-30 min (azioni immediate)',
    cost: '€150-400 (intervento + ricerca perdita)',
    difficulty: 'Solo professionista',
    whenToCallPro:
      'Subito, se la macchia cresce, il muro è fradicio o la bolletta è aumentata.',
  },
  'rubinetto-perde-acqua-goccia': {
    answer:
      "Un rubinetto che gocciola dipende quasi sempre da una guarnizione o cartuccia usurata. Puoi sostituirla in 20-30 minuti con strumenti base. Se invece la perdita è alla base del rubinetto o dal collegamento ai tubi, serve un idraulico. Una goccia al secondo spreca circa 5.000 litri d'anno.",
    steps: [
      "Chiudi i rubinetti sottolavello (acqua calda e fredda)",
      'Apri il rubinetto per scaricare la pressione residua',
      'Smonta la maniglia e individua guarnizione o cartuccia',
      'Sostituisci con ricambio identico (foto prima di smontare)',
      'Riapri lentamente e verifica assenza perdite',
    ],
    time: '20-30 min',
    cost: '€60-120 se chiami un idraulico, €5-25 ricambio fai-da-te',
    difficulty: 'Facile',
    whenToCallPro:
      "Se perde dalla base, dai tubi sotto il lavandino o se non riesci a smontare la maniglia.",
  },
  'wc-intasato-non-scarica': {
    answer:
      "Un WC intasato si risolve nell'80% dei casi con uno sturalavandini a campana e movimenti decisi su-giù per 2 minuti. Se il livello d'acqua è alto non scaricare di nuovo: travasa con un secchio. Per ostruzioni profonde serve una sonda flessibile o l'autospurgo. Mai usare acidi o soda caustica: danneggiano sifoni e tubi.",
    steps: [
      'Non tirare lo sciacquone una seconda volta (rischio allagamento)',
      "Se l'acqua è alta, travasa metà con un secchio",
      'Posiziona uno sturalavandini a campana e pompa per 2 min',
      'Versa 1 litro di acqua calda (NON bollente) dal centro',
      'Se non si sblocca, usa una sonda flessibile o chiama autospurgo',
    ],
    time: '5-15 min (fai-da-te)',
    cost: '€80-200 idraulico, €150-350 autospurgo',
    difficulty: 'Facile',
    whenToCallPro:
      "Se l'acqua risale anche da doccia o lavandino, il problema è nella colonna comune: chiama subito.",
  },
  'caldaia-non-parte-blocco': {
    answer:
      "Se la caldaia non parte, controlla nell'ordine: pressione (deve essere 1-1,5 bar a freddo), corrente elettrica, gas aperto e codice errore sul display. Spesso basta ricaricare l'acqua o premere il tasto reset. Se l'errore persiste o senti odore di gas, spegni tutto, areggia e chiama subito un tecnico abilitato.",
    steps: [
      'Verifica il display: leggi e annota il codice di errore',
      'Controlla pressione manometro (deve essere 1-1,5 bar a freddo)',
      'Se sotto 1 bar: ricarica acqua dal rubinetto di carico',
      'Verifica gas aperto e interruttore elettrico inserito',
      'Premi tasto reset una sola volta; se ri-blocca, chiama tecnico',
    ],
    time: '5-10 min (controlli base)',
    cost: '€80-150 chiamata tecnico, €200-500 sostituzione componente',
    difficulty: 'Media',
    whenToCallPro:
      "Subito se senti odore di gas, vedi acqua sotto la caldaia o l'errore si ripresenta dopo il reset.",
  },
  'scarico-lento-lavandino': {
    answer:
      "Uno scarico lento del lavandino è quasi sempre causato da capelli, sapone e calcare nel sifone. Si risolve in 15 minuti smontando il sifone (la curva sotto il lavandino) e pulendolo. Evita prodotti chimici aggressivi: corrodono i tubi nel tempo. Usa invece bicarbonato + aceto + acqua bollente come manutenzione preventiva mensile.",
    steps: [
      'Metti un secchio sotto il sifone (curva a U sotto il lavandino)',
      'Svita le ghiere a mano (o con pinza protetta da panno)',
      'Estrai e pulisci il sifone con acqua calda e spazzolino',
      'Rimonta verificando che le guarnizioni siano in sede',
      "Versa acqua bollente + bicarbonato per igienizzare",
    ],
    time: '15-20 min',
    cost: '€60-100 idraulico, €0 fai-da-te',
    difficulty: 'Facile',
    whenToCallPro:
      "Se anche dopo aver pulito il sifone lo scarico resta lento: il blocco è più profondo nella colonna.",
  },
  'perdita-acqua-sotto-lavello': {
    answer:
      "Una perdita sotto il lavello deriva quasi sempre da: sifone allentato, guarnizione del piletta usurata o flessibili dei rubinetti danneggiati. Asciuga tutto, apri l'acqua e identifica il punto esatto della perdita con carta da cucina. Sifone e flessibili si sostituiscono in 20-40 minuti senza idraulico. Le perdite dai tubi sotto piastrelle richiedono un professionista.",
    steps: [
      'Svuota il mobile sottolavello e asciuga tutto',
      "Chiudi i rubinetti sottolavello (acqua calda e fredda)",
      'Apri lentamente e tampona con carta per trovare il punto esatto',
      'Stringi le ghiere allentate o sostituisci sifone/flessibili',
      "Verifica con un foglio di carta sotto le giunzioni per 24h",
    ],
    time: '20-40 min',
    cost: '€60-120 idraulico, €5-30 ricambi fai-da-te',
    difficulty: 'Facile',
    whenToCallPro:
      'Se la perdita viene dal muro, dal pavimento o non riesci a localizzarla in 10 minuti.',
  },
};

export function getGuideQuickAnswer(slug: string): QuickAnswer | undefined {
  return GUIDE_QUICK_ANSWERS[slug];
}
