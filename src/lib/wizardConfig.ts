// Wizard flow configuration for all plumber service categories
// Based on ProntoPro flow structure

export interface WizardQuestion {
  id: string;
  title: string;
  options: string[];
  nextQuestionId?: string | ((answer: string) => string | null);
  priceRange?: string;
}

export interface CategoryFlow {
  questions: Record<string, WizardQuestion>;
  startQuestionId: string;
}

// ============================================
// INSTALLAZIONE E SOSTITUZIONE
// ============================================
const INSTALLAZIONE_FLOW: CategoryFlow = {
  startQuestionId: 'cosa_sostituire',
  questions: {
    cosa_sostituire: {
      id: 'cosa_sostituire',
      title: 'Cosa vorresti sostituire / installare?',
      options: [
        'Rubinetto',
        'Lavandino',
        'WC',
        'Bidet',
        'Caldaia',
        'Scaldabagno',
        'Doccia',
        'Box doccia',
        'Colonna doccia',
        'Vasca con doccia',
        'Vasca da bagno',
        'Lavatrice',
        'Lavastoviglie',
        'Condizionatori',
        'Pompa di calore',
        'Piano cottura',
        'Termosifoni',
        'Depuratore acqua',
        'Addolcitore acqua',
        'Contatore acqua',
        'Contatore gas',
        'Riscaldamento a pavimento',
        'Filtro anticalcare caldaia',
        'Altro',
      ],
      priceRange: '70 € - 750 €',
      nextQuestionId: (answer: string) => {
        switch (answer) {
          case 'Rubinetto': return 'rubinetto_tipo';
          case 'Lavandino': return 'lavandino_tipo';
          case 'WC': return 'wc_tipo';
          case 'Bidet': return 'sanitario_fornisce';
          case 'Caldaia': return 'caldaia_tipo';
          case 'Scaldabagno': return 'scaldabagno_tipo';
          case 'Doccia': return 'doccia_tipo';
          case 'Box doccia': return 'box_doccia_tipo';
          case 'Vasca da bagno': return 'vasca_tipo';
          case 'Vasca con doccia': return 'vasca_doccia_tipo';
          case 'Lavatrice': return 'elettrodomestico_fornisce';
          case 'Lavastoviglie': return 'elettrodomestico_fornisce';
          case 'Condizionatori': return 'condizionatore_tipo';
          case 'Pompa di calore': return 'pompa_tipo';
          case 'Termosifoni': return 'termosifone_quanti';
          case 'Depuratore acqua': return 'depuratore_tipo';
          case 'Addolcitore acqua': return 'addolcitore_tipo';
          case 'Contatore acqua': return 'contatore_tipo';
          case 'Contatore gas': return 'contatore_tipo';
          default: return null;
        }
      },
    },
    // --- RUBINETTO ---
    rubinetto_tipo: {
      id: 'rubinetto_tipo',
      title: 'Quali rubinetti vorresti sostituire?',
      options: ['Cucina', 'Bagno', 'Lavabo', 'Lavello', 'Bidet', 'Doccia', 'Vasca', 'Esterno', 'Altro'],
      priceRange: '50 € - 250 €',
      nextQuestionId: 'rubinetto_fornisce',
    },
    rubinetto_fornisce: {
      id: 'rubinetto_fornisce',
      title: 'Chi fornirà il rubinetto?',
      options: ['Li fornirò io', 'Il professionista'],
      priceRange: '60 € - 180 €',
      nextQuestionId: 'rubinetto_quanti',
    },
    rubinetto_quanti: {
      id: 'rubinetto_quanti',
      title: 'Di quanti rubinetti hai bisogno per la sostituzione?',
      options: ['1', '2', '3', '4 o più'],
      priceRange: '60 € - 150 €',
      nextQuestionId: null,
    },
    // --- LAVANDINO ---
    lavandino_tipo: {
      id: 'lavandino_tipo',
      title: 'Dove si trova il lavandino da sostituire?',
      options: ['Bagno', 'Cucina', 'Lavanderia', 'Esterno', 'Altro'],
      priceRange: '80 € - 350 €',
      nextQuestionId: 'sanitario_fornisce',
    },
    sanitario_fornisce: {
      id: 'sanitario_fornisce',
      title: 'Chi fornirà il materiale?',
      options: ['Lo fornirò io', 'Il professionista'],
      priceRange: '100 € - 400 €',
      nextQuestionId: null,
    },
    // --- WC ---
    wc_tipo: {
      id: 'wc_tipo',
      title: 'Che tipo di WC vuoi installare?',
      options: ['WC a terra', 'WC sospeso', 'WC con cassetta esterna', 'WC con cassetta incassata', 'Altro'],
      priceRange: '150 € - 500 €',
      nextQuestionId: 'wc_fornisce',
    },
    wc_fornisce: {
      id: 'wc_fornisce',
      title: 'Chi fornirà il WC?',
      options: ['Lo fornirò io', 'Il professionista'],
      priceRange: '150 € - 450 €',
      nextQuestionId: 'wc_rimuovere',
    },
    wc_rimuovere: {
      id: 'wc_rimuovere',
      title: 'È necessario rimuovere il WC esistente?',
      options: ['Sì, va rimosso', 'No, è una nuova installazione'],
      priceRange: '150 € - 400 €',
      nextQuestionId: null,
    },
    // --- CALDAIA ---
    caldaia_tipo: {
      id: 'caldaia_tipo',
      title: 'Che tipo di caldaia vuoi installare?',
      options: ['Caldaia a condensazione', 'Caldaia tradizionale', 'Caldaia a camera stagna', 'Caldaia a camera aperta', 'Non so / da valutare'],
      priceRange: '800 € - 3500 €',
      nextQuestionId: 'caldaia_alimentazione',
    },
    caldaia_alimentazione: {
      id: 'caldaia_alimentazione',
      title: 'Quale alimentazione preferisci?',
      options: ['Gas metano', 'GPL', 'Gasolio', 'Non so / da valutare'],
      priceRange: '800 € - 3000 €',
      nextQuestionId: 'caldaia_fornisce',
    },
    caldaia_fornisce: {
      id: 'caldaia_fornisce',
      title: 'Chi fornirà la caldaia?',
      options: ['La fornirò io', 'Il professionista'],
      priceRange: '500 € - 2500 €',
      nextQuestionId: 'caldaia_rimuovere',
    },
    caldaia_rimuovere: {
      id: 'caldaia_rimuovere',
      title: 'È necessario rimuovere una caldaia esistente?',
      options: ['Sì, va sostituita', 'No, nuova installazione'],
      priceRange: '800 € - 3000 €',
      nextQuestionId: null,
    },
    // --- SCALDABAGNO ---
    scaldabagno_tipo: {
      id: 'scaldabagno_tipo',
      title: 'Che tipo di scaldabagno vuoi installare?',
      options: ['Scaldabagno elettrico', 'Scaldabagno a gas', 'Boiler a pompa di calore', 'Non so / da valutare'],
      priceRange: '200 € - 1500 €',
      nextQuestionId: 'scaldabagno_capacita',
    },
    scaldabagno_capacita: {
      id: 'scaldabagno_capacita',
      title: 'Quale capacità ti serve?',
      options: ['30 litri', '50 litri', '80 litri', '100 litri o più', 'Non so / da valutare'],
      priceRange: '200 € - 1200 €',
      nextQuestionId: 'scaldabagno_fornisce',
    },
    scaldabagno_fornisce: {
      id: 'scaldabagno_fornisce',
      title: 'Chi fornirà lo scaldabagno?',
      options: ['Lo fornirò io', 'Il professionista'],
      priceRange: '150 € - 800 €',
      nextQuestionId: null,
    },
    // --- DOCCIA ---
    doccia_tipo: {
      id: 'doccia_tipo',
      title: 'Che tipo di doccia vuoi installare?',
      options: ['Piatto doccia', 'Doccia a filo pavimento', 'Colonna doccia', 'Soffione', 'Trasformazione vasca in doccia'],
      priceRange: '300 € - 2000 €',
      nextQuestionId: 'doccia_fornisce',
    },
    doccia_fornisce: {
      id: 'doccia_fornisce',
      title: 'Chi fornirà i materiali?',
      options: ['Li fornirò io', 'Il professionista'],
      priceRange: '250 € - 1500 €',
      nextQuestionId: null,
    },
    // --- BOX DOCCIA ---
    box_doccia_tipo: {
      id: 'box_doccia_tipo',
      title: 'Che tipo di box doccia ti serve?',
      options: ['Box doccia angolare', 'Box doccia frontale', 'Box doccia curvo', 'Parete doccia walk-in', 'Altro'],
      priceRange: '200 € - 1200 €',
      nextQuestionId: 'box_doccia_fornisce',
    },
    box_doccia_fornisce: {
      id: 'box_doccia_fornisce',
      title: 'Chi fornirà il box doccia?',
      options: ['Lo fornirò io', 'Il professionista'],
      priceRange: '150 € - 800 €',
      nextQuestionId: null,
    },
    // --- VASCA ---
    vasca_tipo: {
      id: 'vasca_tipo',
      title: 'Che tipo di vasca vuoi installare?',
      options: ['Vasca da incasso', 'Vasca freestanding', 'Vasca con idromassaggio', 'Vasca angolare', 'Altro'],
      priceRange: '400 € - 3000 €',
      nextQuestionId: 'vasca_fornisce',
    },
    vasca_fornisce: {
      id: 'vasca_fornisce',
      title: 'Chi fornirà la vasca?',
      options: ['La fornirò io', 'Il professionista'],
      priceRange: '300 € - 2000 €',
      nextQuestionId: 'vasca_rimuovere',
    },
    vasca_rimuovere: {
      id: 'vasca_rimuovere',
      title: 'È necessario rimuovere una vasca esistente?',
      options: ['Sì, va sostituita', 'No, nuova installazione'],
      priceRange: '400 € - 2500 €',
      nextQuestionId: null,
    },
    // --- VASCA CON DOCCIA ---
    vasca_doccia_tipo: {
      id: 'vasca_doccia_tipo',
      title: 'Che tipo di combinazione vasca-doccia vuoi?',
      options: ['Vasca con parete doccia', 'Vasca con box sopra', 'Vasca con sportello', 'Altro'],
      priceRange: '500 € - 3500 €',
      nextQuestionId: 'vasca_fornisce',
    },
    // --- ELETTRODOMESTICI ---
    elettrodomestico_fornisce: {
      id: 'elettrodomestico_fornisce',
      title: 'Chi fornirà l\'elettrodomestico?',
      options: ['Lo fornirò io', 'Il professionista'],
      priceRange: '50 € - 150 €',
      nextQuestionId: 'elettrodomestico_rimuovere',
    },
    elettrodomestico_rimuovere: {
      id: 'elettrodomestico_rimuovere',
      title: 'È necessario rimuovere quello esistente?',
      options: ['Sì, va rimosso', 'No, nuova installazione'],
      priceRange: '50 € - 120 €',
      nextQuestionId: null,
    },
    // --- CONDIZIONATORI ---
    condizionatore_tipo: {
      id: 'condizionatore_tipo',
      title: 'Che tipo di condizionatore vuoi installare?',
      options: ['Split singolo', 'Dual split', 'Multi split (3+)', 'Condizionatore portatile', 'Climatizzatore canalizzato'],
      priceRange: '300 € - 3000 €',
      nextQuestionId: 'condizionatore_fornisce',
    },
    condizionatore_fornisce: {
      id: 'condizionatore_fornisce',
      title: 'Chi fornirà il condizionatore?',
      options: ['Lo fornirò io', 'Il professionista'],
      priceRange: '200 € - 2000 €',
      nextQuestionId: 'condizionatore_quanti',
    },
    condizionatore_quanti: {
      id: 'condizionatore_quanti',
      title: 'Quante unità interne vuoi installare?',
      options: ['1', '2', '3', '4 o più'],
      priceRange: '300 € - 2500 €',
      nextQuestionId: null,
    },
    // --- POMPA DI CALORE ---
    pompa_tipo: {
      id: 'pompa_tipo',
      title: 'Che tipo di pompa di calore ti serve?',
      options: ['Pompa aria-aria', 'Pompa aria-acqua', 'Pompa geotermica', 'Non so / da valutare'],
      priceRange: '2000 € - 15000 €',
      nextQuestionId: 'pompa_uso',
    },
    pompa_uso: {
      id: 'pompa_uso',
      title: 'Per quale uso principale?',
      options: ['Solo riscaldamento', 'Solo raffrescamento', 'Riscaldamento e raffrescamento', 'Produzione acqua calda'],
      priceRange: '2000 € - 12000 €',
      nextQuestionId: null,
    },
    // --- TERMOSIFONI ---
    termosifone_quanti: {
      id: 'termosifone_quanti',
      title: 'Quanti termosifoni vuoi installare?',
      options: ['1', '2', '3-5', '6 o più'],
      priceRange: '100 € - 800 €',
      nextQuestionId: 'termosifone_tipo',
    },
    termosifone_tipo: {
      id: 'termosifone_tipo',
      title: 'Che tipo di termosifone preferisci?',
      options: ['Termosifone in alluminio', 'Termosifone in ghisa', 'Termoarredo', 'Scaldasalviette', 'Non so / da valutare'],
      priceRange: '80 € - 600 €',
      nextQuestionId: 'termosifone_fornisce',
    },
    termosifone_fornisce: {
      id: 'termosifone_fornisce',
      title: 'Chi fornirà i termosifoni?',
      options: ['Li fornirò io', 'Il professionista'],
      priceRange: '50 € - 400 €',
      nextQuestionId: null,
    },
    // --- DEPURATORE ---
    depuratore_tipo: {
      id: 'depuratore_tipo',
      title: 'Che tipo di depuratore ti serve?',
      options: ['Depuratore a osmosi inversa', 'Depuratore con microfiltrazione', 'Depuratore a carbone attivo', 'Non so / da valutare'],
      priceRange: '200 € - 2000 €',
      nextQuestionId: 'depuratore_uso',
    },
    depuratore_uso: {
      id: 'depuratore_uso',
      title: 'Per quale uso principale?',
      options: ['Acqua da bere', 'Tutta la casa', 'Solo cucina'],
      priceRange: '200 € - 1500 €',
      nextQuestionId: null,
    },
    // --- ADDOLCITORE ---
    addolcitore_tipo: {
      id: 'addolcitore_tipo',
      title: 'Che tipo di addolcitore ti serve?',
      options: ['Addolcitore a sale', 'Addolcitore senza sale', 'Addolcitore magnetico', 'Non so / da valutare'],
      priceRange: '300 € - 2500 €',
      nextQuestionId: 'addolcitore_dimensione',
    },
    addolcitore_dimensione: {
      id: 'addolcitore_dimensione',
      title: 'Per quante persone è il consumo?',
      options: ['1-2 persone', '3-4 persone', '5+ persone'],
      priceRange: '300 € - 2000 €',
      nextQuestionId: null,
    },
    // --- CONTATORE ---
    contatore_tipo: {
      id: 'contatore_tipo',
      title: 'Che tipo di intervento ti serve?',
      options: ['Installazione nuovo contatore', 'Spostamento contatore', 'Sostituzione contatore', 'Allaccio nuova utenza'],
      priceRange: '100 € - 500 €',
      nextQuestionId: null,
    },
  },
};

// ============================================
// STURARE / SPURGO
// ============================================
const SPURGO_FLOW: CategoryFlow = {
  startQuestionId: 'cosa_intasato',
  questions: {
    cosa_intasato: {
      id: 'cosa_intasato',
      title: 'Cosa si è intasato?',
      options: [
        'Lavandino',
        'WC',
        'Doccia',
        'Vasca da bagno',
        'Bidet',
        'Scarico cucina',
        'Colonna di scarico',
        'Pozzetto',
        'Fognatura',
        'Altro',
      ],
      priceRange: '50 € - 400 €',
      nextQuestionId: (answer: string) => {
        if (['Colonna di scarico', 'Pozzetto', 'Fognatura'].includes(answer)) {
          return 'spurgo_gravita';
        }
        return 'spurgo_frequenza';
      },
    },
    spurgo_frequenza: {
      id: 'spurgo_frequenza',
      title: 'È la prima volta che si intasa?',
      options: ['Sì, prima volta', 'No, succede spesso', 'Non so'],
      priceRange: '50 € - 200 €',
      nextQuestionId: 'spurgo_urgenza',
    },
    spurgo_gravita: {
      id: 'spurgo_gravita',
      title: 'Qual è la gravità del problema?',
      options: ['Scarico lento', 'Completamente bloccato', 'Fuoriuscita acqua/liquami', 'Cattivi odori'],
      priceRange: '100 € - 500 €',
      nextQuestionId: 'spurgo_urgenza',
    },
    spurgo_urgenza: {
      id: 'spurgo_urgenza',
      title: 'Quanto è urgente l\'intervento?',
      options: ['Urgente (entro oggi)', 'Entro 24 ore', 'Nei prossimi giorni'],
      priceRange: '60 € - 300 €',
      nextQuestionId: null,
    },
  },
};

// ============================================
// RIPARAZIONE
// ============================================
const RIPARAZIONE_FLOW: CategoryFlow = {
  startQuestionId: 'cosa_riparare',
  questions: {
    cosa_riparare: {
      id: 'cosa_riparare',
      title: 'Cosa devi riparare?',
      options: [
        'Rubinetto',
        'Tubo',
        'Scarico',
        'WC',
        'Lavandino',
        'Doccia',
        'Vasca',
        'Cassetta WC',
        'Sifone',
        'Caldaia',
        'Scaldabagno',
        'Termosifone',
        'Altro',
      ],
      priceRange: '50 € - 350 €',
      nextQuestionId: (answer: string) => {
        switch (answer) {
          case 'Rubinetto': return 'riparazione_rubinetto_problema';
          case 'Tubo': return 'riparazione_tubo_problema';
          case 'WC': return 'riparazione_wc_problema';
          case 'Caldaia': return 'riparazione_caldaia_problema';
          case 'Termosifone': return 'riparazione_termosifone_problema';
          default: return 'riparazione_descrizione';
        }
      },
    },
    riparazione_rubinetto_problema: {
      id: 'riparazione_rubinetto_problema',
      title: 'Qual è il problema del rubinetto?',
      options: ['Perde acqua', 'Non si apre/chiude bene', 'Esce poca acqua', 'Fa rumore', 'Altro'],
      priceRange: '40 € - 150 €',
      nextQuestionId: 'riparazione_rubinetto_dove',
    },
    riparazione_rubinetto_dove: {
      id: 'riparazione_rubinetto_dove',
      title: 'Dove si trova il rubinetto?',
      options: ['Cucina', 'Bagno', 'Lavanderia', 'Esterno', 'Altro'],
      priceRange: '40 € - 120 €',
      nextQuestionId: null,
    },
    riparazione_tubo_problema: {
      id: 'riparazione_tubo_problema',
      title: 'Qual è il problema del tubo?',
      options: ['Perdita visibile', 'Tubo rotto', 'Tubo intasato', 'Perdita nascosta', 'Altro'],
      priceRange: '60 € - 400 €',
      nextQuestionId: 'riparazione_tubo_tipo',
    },
    riparazione_tubo_tipo: {
      id: 'riparazione_tubo_tipo',
      title: 'Che tipo di tubo è?',
      options: ['Tubo acqua calda/fredda', 'Tubo di scarico', 'Tubo del gas', 'Non so'],
      priceRange: '60 € - 350 €',
      nextQuestionId: null,
    },
    riparazione_wc_problema: {
      id: 'riparazione_wc_problema',
      title: 'Qual è il problema del WC?',
      options: ['Non scarica', 'Perde acqua dalla base', 'Cassetta che perde', 'Scarico lento', 'Altro'],
      priceRange: '50 € - 200 €',
      nextQuestionId: null,
    },
    riparazione_caldaia_problema: {
      id: 'riparazione_caldaia_problema',
      title: 'Qual è il problema della caldaia?',
      options: ['Non parte', 'Non scalda l\'acqua', 'Perde acqua', 'Fa rumore strano', 'Errore sul display', 'Altro'],
      priceRange: '80 € - 400 €',
      nextQuestionId: 'riparazione_caldaia_tipo',
    },
    riparazione_caldaia_tipo: {
      id: 'riparazione_caldaia_tipo',
      title: 'Che tipo di caldaia hai?',
      options: ['A condensazione', 'Tradizionale', 'A camera stagna', 'Non so'],
      priceRange: '80 € - 350 €',
      nextQuestionId: null,
    },
    riparazione_termosifone_problema: {
      id: 'riparazione_termosifone_problema',
      title: 'Qual è il problema del termosifone?',
      options: ['Non scalda', 'Perde acqua', 'Fa rumore (aria)', 'Freddo in parte', 'Altro'],
      priceRange: '40 € - 200 €',
      nextQuestionId: 'riparazione_termosifone_quanti',
    },
    riparazione_termosifone_quanti: {
      id: 'riparazione_termosifone_quanti',
      title: 'Quanti termosifoni hanno il problema?',
      options: ['1', '2-3', '4 o più', 'Tutti'],
      priceRange: '40 € - 180 €',
      nextQuestionId: null,
    },
    riparazione_descrizione: {
      id: 'riparazione_descrizione',
      title: 'Puoi descrivere brevemente il problema?',
      options: ['Perdita d\'acqua', 'Non funziona', 'Rumore strano', 'Altro problema'],
      priceRange: '50 € - 250 €',
      nextQuestionId: null,
    },
  },
};

// ============================================
// PERDITA ACQUA
// ============================================
const PERDITA_FLOW: CategoryFlow = {
  startQuestionId: 'perdita_dove',
  questions: {
    perdita_dove: {
      id: 'perdita_dove',
      title: 'Dove si trova la perdita?',
      options: [
        'Bagno',
        'Cucina',
        'Sotto il lavandino',
        'Dal soffitto',
        'Dal muro',
        'Tubature esterne',
        'Cantina/seminterrato',
        'Non so / nascosta',
      ],
      priceRange: '50 € - 500 €',
      nextQuestionId: 'perdita_gravita',
    },
    perdita_gravita: {
      id: 'perdita_gravita',
      title: 'Qual è la gravità della perdita?',
      options: ['Gocce/umidità', 'Perdita costante', 'Allagamento', 'Perdita nascosta (macchie)'],
      priceRange: '50 € - 400 €',
      nextQuestionId: 'perdita_urgenza',
    },
    perdita_urgenza: {
      id: 'perdita_urgenza',
      title: 'Quanto è urgente l\'intervento?',
      options: ['Urgente (entro oggi)', 'Entro 24 ore', 'Nei prossimi giorni'],
      priceRange: '60 € - 350 €',
      nextQuestionId: null,
    },
  },
};

// ============================================
// IMPIANTO IDRAULICO
// ============================================
const IMPIANTO_FLOW: CategoryFlow = {
  startQuestionId: 'impianto_tipo',
  questions: {
    impianto_tipo: {
      id: 'impianto_tipo',
      title: 'Che tipo di lavoro ti serve?',
      options: [
        'Rifacimento completo bagno',
        'Rifacimento completo cucina',
        'Nuovo impianto (nuova costruzione)',
        'Modifica impianto esistente',
        'Spostamento attacchi',
        'Allaccio nuovo bagno/cucina',
      ],
      priceRange: '500 € - 8000 €',
      nextQuestionId: 'impianto_dimensione',
    },
    impianto_dimensione: {
      id: 'impianto_dimensione',
      title: 'Quanto è grande l\'ambiente?',
      options: ['Piccolo (< 5 mq)', 'Medio (5-10 mq)', 'Grande (> 10 mq)'],
      priceRange: '500 € - 6000 €',
      nextQuestionId: 'impianto_punti',
    },
    impianto_punti: {
      id: 'impianto_punti',
      title: 'Quanti punti acqua servono?',
      options: ['1-3 punti', '4-6 punti', '7+ punti'],
      priceRange: '500 € - 5000 €',
      nextQuestionId: null,
    },
  },
};

// ============================================
// CALDAIA
// ============================================
const CALDAIA_FLOW: CategoryFlow = {
  startQuestionId: 'caldaia_servizio',
  questions: {
    caldaia_servizio: {
      id: 'caldaia_servizio',
      title: 'Di che servizio hai bisogno?',
      options: [
        'Installazione nuova caldaia',
        'Sostituzione caldaia',
        'Manutenzione ordinaria',
        'Riparazione',
        'Controllo fumi/certificazione',
      ],
      priceRange: '80 € - 3500 €',
      nextQuestionId: (answer: string) => {
        if (['Installazione nuova caldaia', 'Sostituzione caldaia'].includes(answer)) {
          return 'caldaia_tipo_servizio';
        }
        if (answer === 'Riparazione') {
          return 'caldaia_problema_servizio';
        }
        return null;
      },
    },
    caldaia_tipo_servizio: {
      id: 'caldaia_tipo_servizio',
      title: 'Che tipo di caldaia preferisci?',
      options: ['A condensazione', 'Tradizionale', 'A camera stagna', 'Non so / da valutare'],
      priceRange: '800 € - 3500 €',
      nextQuestionId: 'caldaia_potenza',
    },
    caldaia_potenza: {
      id: 'caldaia_potenza',
      title: 'Quale potenza ti serve?',
      options: ['24 kW (appartamento piccolo)', '28-32 kW (appartamento medio)', '35+ kW (casa grande)', 'Non so'],
      priceRange: '800 € - 3000 €',
      nextQuestionId: null,
    },
    caldaia_problema_servizio: {
      id: 'caldaia_problema_servizio',
      title: 'Qual è il problema?',
      options: ['Non parte', 'Non scalda acqua', 'Perde acqua', 'Rumore anomalo', 'Errore display', 'Altro'],
      priceRange: '80 € - 400 €',
      nextQuestionId: null,
    },
  },
};

// ============================================
// IMPIANTO RISCALDAMENTO
// ============================================
const RISCALDAMENTO_FLOW: CategoryFlow = {
  startQuestionId: 'riscaldamento_servizio',
  questions: {
    riscaldamento_servizio: {
      id: 'riscaldamento_servizio',
      title: 'Di che servizio hai bisogno?',
      options: [
        'Nuovo impianto di riscaldamento',
        'Sostituzione radiatori',
        'Installazione riscaldamento a pavimento',
        'Manutenzione impianto',
        'Riparazione',
        'Sfiatare termosifoni',
      ],
      priceRange: '50 € - 15000 €',
      nextQuestionId: (answer: string) => {
        if (answer === 'Nuovo impianto di riscaldamento') {
          return 'riscaldamento_tipo';
        }
        if (answer === 'Sostituzione radiatori') {
          return 'riscaldamento_quanti_radiatori';
        }
        return 'riscaldamento_dimensione';
      },
    },
    riscaldamento_tipo: {
      id: 'riscaldamento_tipo',
      title: 'Che tipo di riscaldamento preferisci?',
      options: ['Radiatori tradizionali', 'Riscaldamento a pavimento', 'Pompa di calore', 'Non so / da valutare'],
      priceRange: '3000 € - 15000 €',
      nextQuestionId: 'riscaldamento_dimensione',
    },
    riscaldamento_quanti_radiatori: {
      id: 'riscaldamento_quanti_radiatori',
      title: 'Quanti radiatori vuoi sostituire?',
      options: ['1-2', '3-5', '6-10', '10+'],
      priceRange: '150 € - 3000 €',
      nextQuestionId: null,
    },
    riscaldamento_dimensione: {
      id: 'riscaldamento_dimensione',
      title: 'Quanto è grande l\'abitazione?',
      options: ['< 50 mq', '50-100 mq', '100-150 mq', '> 150 mq'],
      priceRange: '500 € - 10000 €',
      nextQuestionId: null,
    },
  },
};

// ============================================
// CONDIZIONATORI
// ============================================
const CONDIZIONATORI_FLOW: CategoryFlow = {
  startQuestionId: 'condizionatore_servizio',
  questions: {
    condizionatore_servizio: {
      id: 'condizionatore_servizio',
      title: 'Di che servizio hai bisogno?',
      options: [
        'Installazione nuovo condizionatore',
        'Sostituzione condizionatore',
        'Manutenzione/ricarica gas',
        'Riparazione',
        'Pulizia filtri',
      ],
      priceRange: '50 € - 3000 €',
      nextQuestionId: (answer: string) => {
        if (['Installazione nuovo condizionatore', 'Sostituzione condizionatore'].includes(answer)) {
          return 'condizionatore_tipo_servizio';
        }
        return null;
      },
    },
    condizionatore_tipo_servizio: {
      id: 'condizionatore_tipo_servizio',
      title: 'Che tipo di condizionatore ti serve?',
      options: ['Split singolo', 'Dual split', 'Multi split', 'Climatizzatore portatile', 'Canalizzato'],
      priceRange: '300 € - 3000 €',
      nextQuestionId: 'condizionatore_quanti_split',
    },
    condizionatore_quanti_split: {
      id: 'condizionatore_quanti_split',
      title: 'Quante stanze vuoi climatizzare?',
      options: ['1', '2', '3', '4 o più'],
      priceRange: '300 € - 2500 €',
      nextQuestionId: 'condizionatore_fornisce_servizio',
    },
    condizionatore_fornisce_servizio: {
      id: 'condizionatore_fornisce_servizio',
      title: 'Chi fornirà il condizionatore?',
      options: ['Lo fornirò io', 'Il professionista'],
      priceRange: '200 € - 2000 €',
      nextQuestionId: null,
    },
  },
};

// ============================================
// BOX DOCCIA
// ============================================
const BOX_DOCCIA_FLOW: CategoryFlow = {
  startQuestionId: 'box_servizio',
  questions: {
    box_servizio: {
      id: 'box_servizio',
      title: 'Di che servizio hai bisogno?',
      options: [
        'Installazione nuovo box doccia',
        'Sostituzione box doccia',
        'Riparazione (vetro, guarnizioni)',
        'Trasformazione vasca in doccia',
      ],
      priceRange: '100 € - 2000 €',
      nextQuestionId: (answer: string) => {
        if (answer === 'Trasformazione vasca in doccia') {
          return 'box_trasformazione';
        }
        return 'box_tipo_servizio';
      },
    },
    box_tipo_servizio: {
      id: 'box_tipo_servizio',
      title: 'Che tipo di box doccia?',
      options: ['Box angolare', 'Box frontale', 'Box curvo', 'Parete walk-in', 'Nicchia'],
      priceRange: '150 € - 1500 €',
      nextQuestionId: 'box_fornisce_servizio',
    },
    box_fornisce_servizio: {
      id: 'box_fornisce_servizio',
      title: 'Chi fornirà il box doccia?',
      options: ['Lo fornirò io', 'Il professionista'],
      priceRange: '100 € - 1000 €',
      nextQuestionId: null,
    },
    box_trasformazione: {
      id: 'box_trasformazione',
      title: 'Che tipo di trasformazione vuoi?',
      options: ['Doccia con piatto', 'Doccia a filo pavimento', 'Doccia con seduta', 'Non so / da valutare'],
      priceRange: '1000 € - 3500 €',
      nextQuestionId: null,
    },
  },
};

// ============================================
// TERMOSIFONE
// ============================================
const TERMOSIFONE_FLOW: CategoryFlow = {
  startQuestionId: 'termosifone_servizio',
  questions: {
    termosifone_servizio: {
      id: 'termosifone_servizio',
      title: 'Di che servizio hai bisogno?',
      options: [
        'Installazione nuovi termosifoni',
        'Sostituzione termosifoni',
        'Riparazione (perdita, non scalda)',
        'Sfiatare aria',
        'Spostamento termosifone',
      ],
      priceRange: '30 € - 800 €',
      nextQuestionId: (answer: string) => {
        if (['Installazione nuovi termosifoni', 'Sostituzione termosifoni'].includes(answer)) {
          return 'termosifone_quanti_servizio';
        }
        return null;
      },
    },
    termosifone_quanti_servizio: {
      id: 'termosifone_quanti_servizio',
      title: 'Quanti termosifoni?',
      options: ['1', '2-3', '4-6', '7+'],
      priceRange: '100 € - 800 €',
      nextQuestionId: 'termosifone_tipo_servizio',
    },
    termosifone_tipo_servizio: {
      id: 'termosifone_tipo_servizio',
      title: 'Che tipo preferisci?',
      options: ['Alluminio', 'Ghisa', 'Acciaio', 'Termoarredo/scaldasalviette', 'Non so'],
      priceRange: '80 € - 600 €',
      nextQuestionId: null,
    },
  },
};

// ============================================
// RISTRUTTURAZIONE
// ============================================
const RISTRUTTURAZIONE_FLOW: CategoryFlow = {
  startQuestionId: 'ristrutturazione_cosa',
  questions: {
    ristrutturazione_cosa: {
      id: 'ristrutturazione_cosa',
      title: 'Cosa vuoi ristrutturare?',
      options: ['Bagno completo', 'Cucina', 'Bagno e cucina', 'Tutto l\'impianto casa'],
      priceRange: '2000 € - 20000 €',
      nextQuestionId: 'ristrutturazione_dimensione',
    },
    ristrutturazione_dimensione: {
      id: 'ristrutturazione_dimensione',
      title: 'Quanto è grande l\'ambiente?',
      options: ['< 5 mq', '5-10 mq', '10-20 mq', '> 20 mq'],
      priceRange: '2000 € - 15000 €',
      nextQuestionId: 'ristrutturazione_include',
    },
    ristrutturazione_include: {
      id: 'ristrutturazione_include',
      title: 'Il lavoro include anche le piastrelle?',
      options: ['Sì, tutto compreso', 'No, solo impianto idraulico'],
      priceRange: '1500 € - 12000 €',
      nextQuestionId: null,
    },
  },
};

// ============================================
// CERTIFICAZIONE
// ============================================
const CERTIFICAZIONE_FLOW: CategoryFlow = {
  startQuestionId: 'certificazione_tipo',
  questions: {
    certificazione_tipo: {
      id: 'certificazione_tipo',
      title: 'Che tipo di certificazione ti serve?',
      options: [
        'Certificazione impianto idraulico',
        'Certificazione impianto gas',
        'Controllo fumi caldaia',
        'Dichiarazione di conformità',
        'Altro',
      ],
      priceRange: '80 € - 300 €',
      nextQuestionId: 'certificazione_motivo',
    },
    certificazione_motivo: {
      id: 'certificazione_motivo',
      title: 'Per quale motivo ti serve?',
      options: ['Vendita immobile', 'Affitto', 'Fine lavori', 'Richiesta ente/comune', 'Altro'],
      priceRange: '80 € - 250 €',
      nextQuestionId: null,
    },
  },
};

// ============================================
// CONTATORE
// ============================================
const CONTATORE_FLOW: CategoryFlow = {
  startQuestionId: 'contatore_servizio',
  questions: {
    contatore_servizio: {
      id: 'contatore_servizio',
      title: 'Di che servizio hai bisogno?',
      options: [
        'Installazione nuovo contatore acqua',
        'Installazione nuovo contatore gas',
        'Spostamento contatore',
        'Sostituzione contatore',
        'Allaccio nuova utenza',
      ],
      priceRange: '100 € - 500 €',
      nextQuestionId: null,
    },
  },
};

// ============================================
// ADDOLCITORE ACQUA
// ============================================
const ADDOLCITORE_FLOW: CategoryFlow = {
  startQuestionId: 'addolcitore_servizio',
  questions: {
    addolcitore_servizio: {
      id: 'addolcitore_servizio',
      title: 'Di che servizio hai bisogno?',
      options: [
        'Installazione nuovo addolcitore',
        'Sostituzione addolcitore',
        'Manutenzione/ricarica sale',
        'Riparazione',
      ],
      priceRange: '50 € - 2500 €',
      nextQuestionId: (answer: string) => {
        if (['Installazione nuovo addolcitore', 'Sostituzione addolcitore'].includes(answer)) {
          return 'addolcitore_tipo_servizio';
        }
        return null;
      },
    },
    addolcitore_tipo_servizio: {
      id: 'addolcitore_tipo_servizio',
      title: 'Che tipo preferisci?',
      options: ['Addolcitore a sale', 'Addolcitore elettronico', 'Non so / da valutare'],
      priceRange: '300 € - 2500 €',
      nextQuestionId: 'addolcitore_persone',
    },
    addolcitore_persone: {
      id: 'addolcitore_persone',
      title: 'Quante persone vivono in casa?',
      options: ['1-2', '3-4', '5+'],
      priceRange: '300 € - 2000 €',
      nextQuestionId: null,
    },
  },
};

// ============================================
// DEPURATORE ACQUA
// ============================================
const DEPURATORE_FLOW: CategoryFlow = {
  startQuestionId: 'depuratore_servizio',
  questions: {
    depuratore_servizio: {
      id: 'depuratore_servizio',
      title: 'Di che servizio hai bisogno?',
      options: [
        'Installazione nuovo depuratore',
        'Sostituzione depuratore',
        'Manutenzione/sostituzione filtri',
        'Riparazione',
      ],
      priceRange: '50 € - 2000 €',
      nextQuestionId: (answer: string) => {
        if (['Installazione nuovo depuratore', 'Sostituzione depuratore'].includes(answer)) {
          return 'depuratore_tipo_servizio';
        }
        return null;
      },
    },
    depuratore_tipo_servizio: {
      id: 'depuratore_tipo_servizio',
      title: 'Che tipo preferisci?',
      options: ['Osmosi inversa', 'Microfiltrazione', 'Carbone attivo', 'Non so / da valutare'],
      priceRange: '200 € - 2000 €',
      nextQuestionId: 'depuratore_dove',
    },
    depuratore_dove: {
      id: 'depuratore_dove',
      title: 'Dove lo vuoi installare?',
      options: ['Sotto il lavello cucina', 'Ingresso acqua casa', 'Altro'],
      priceRange: '200 € - 1500 €',
      nextQuestionId: null,
    },
  },
};

// ============================================
// TERMOIDRAULICO
// ============================================
const TERMOIDRAULICO_FLOW: CategoryFlow = {
  startQuestionId: 'termoidraulico_servizio',
  questions: {
    termoidraulico_servizio: {
      id: 'termoidraulico_servizio',
      title: 'Di che servizio hai bisogno?',
      options: [
        'Installazione impianto termoidraulico',
        'Manutenzione caldaia + impianto',
        'Riparazione impianto',
        'Consulenza/sopralluogo',
      ],
      priceRange: '80 € - 10000 €',
      nextQuestionId: 'termoidraulico_tipo_impianto',
    },
    termoidraulico_tipo_impianto: {
      id: 'termoidraulico_tipo_impianto',
      title: 'Che tipo di impianto hai o vuoi?',
      options: ['Riscaldamento tradizionale', 'Riscaldamento a pavimento', 'Pompa di calore', 'Non so'],
      priceRange: '100 € - 8000 €',
      nextQuestionId: null,
    },
  },
};

// ============================================
// ALTRO (generic)
// ============================================
const ALTRO_FLOW: CategoryFlow = {
  startQuestionId: 'altro_descrizione',
  questions: {
    altro_descrizione: {
      id: 'altro_descrizione',
      title: 'Puoi descrivere brevemente cosa ti serve?',
      options: [
        'Riparazione generica',
        'Installazione',
        'Manutenzione',
        'Consulenza/sopralluogo',
        'Emergenza/urgente',
      ],
      priceRange: '50 € - 500 €',
      nextQuestionId: null,
    },
  },
};

// Map intervention types to their flows
import type { InterventionType } from '@/lib/types';

export const CATEGORY_FLOWS: Partial<Record<InterventionType, CategoryFlow>> = {
  installazione_sostituzione: INSTALLAZIONE_FLOW,
  sturare_spurgo: SPURGO_FLOW,
  riparazione: RIPARAZIONE_FLOW,
  perdita_acqua: PERDITA_FLOW,
  impianto_idraulico: IMPIANTO_FLOW,
  caldaia: CALDAIA_FLOW,
  impianto_riscaldamento: RISCALDAMENTO_FLOW,
  condizionatori: CONDIZIONATORI_FLOW,
  box_doccia: BOX_DOCCIA_FLOW,
  termosifone: TERMOSIFONE_FLOW,
  ristrutturazione: RISTRUTTURAZIONE_FLOW,
  certificazione: CERTIFICAZIONE_FLOW,
  contatore: CONTATORE_FLOW,
  addolcitore_acqua: ADDOLCITORE_FLOW,
  depuratore_acqua: DEPURATORE_FLOW,
  termoidraulico: TERMOIDRAULICO_FLOW,
  altro: ALTRO_FLOW,
  // sostituzione_rubinetto goes to INSTALLAZIONE_FLOW with rubinetto preselected
  sostituzione_rubinetto: INSTALLAZIONE_FLOW,
};

// Helper to get the next question ID
export function getNextQuestionId(question: WizardQuestion, answer: string): string | null {
  if (!question.nextQuestionId) return null;
  if (typeof question.nextQuestionId === 'function') {
    return question.nextQuestionId(answer);
  }
  return question.nextQuestionId;
}
