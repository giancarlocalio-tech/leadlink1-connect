/**
 * Dati SEO per le pagine quartieri di Napoli
 * Struttura ottimizzata per posizionamento locale
 */

export interface QuartiereData {
  slug: string;
  nome: string;
  nomeCompleto: string;
  descrizione: string;
  problemiComuni: string;
  mapCoordinates: { lat: number; lng: number };
}

export const NAPOLI_QUARTIERI: QuartiereData[] = [
  {
    slug: 'centro-storico',
    nome: 'Centro Storico',
    nomeCompleto: 'Centro Storico di Napoli',
    descrizione: 'Il Centro Storico di Napoli, patrimonio UNESCO, è caratterizzato da edifici antichi con impianti idraulici che richiedono interventi specializzati. Tubature in piombo e ferro, colonne di scarico condivise e accessi difficili sono la norma in questa zona.',
    problemiComuni: 'Nel Centro Storico di Napoli i problemi idraulici più frequenti riguardano le tubature vetuste dei palazzi storici, spesso risalenti al XVIII secolo. Le colonne di scarico condominiali sono sottodimensionate e soggette a frequenti intasamenti. La pressione dell\'acqua può essere instabile a causa della conformazione dei vicoli stretti.',
    mapCoordinates: { lat: 40.8518, lng: 14.2681 }
  },
  {
    slug: 'vomero',
    nome: 'Vomero',
    nomeCompleto: 'Vomero',
    descrizione: 'Il Vomero è un quartiere residenziale collinare di Napoli, situato a circa 250 metri sul livello del mare. Gli edifici, prevalentemente degli anni \'50-\'70, presentano impianti in ferro zincato spesso corrosi dal calcare.',
    problemiComuni: 'Al Vomero i problemi idraulici più comuni sono legati alla pressione dell\'acqua insufficiente ai piani alti, causata dall\'altitudine del quartiere. Le tubature in ferro zincato degli edifici del boom edilizio sono spesso intasate dal calcare. Frequenti anche i problemi alle caldaie durante l\'inverno.',
    mapCoordinates: { lat: 40.8451, lng: 14.2323 }
  },
  {
    slug: 'arenella',
    nome: 'Arenella',
    nomeCompleto: 'Arenella',
    descrizione: 'L\'Arenella è un quartiere collinare adiacente al Vomero, con una miscela di edifici storici e costruzioni più recenti. La zona presenta sfide idrauliche tipiche delle aree in pendenza.',
    problemiComuni: 'All\'Arenella i problemi idraulici più frequenti includono scarichi lenti causati dalla pendenza naturale del terreno, pressione acqua variabile e tubature datate nei condomini più vecchi. Comune anche la corrosione degli impianti per l\'acqua dura della zona.',
    mapCoordinates: { lat: 40.8544, lng: 14.2356 }
  },
  {
    slug: 'posillipo',
    nome: 'Posillipo',
    nomeCompleto: 'Posillipo',
    descrizione: 'Posillipo è il quartiere residenziale più esclusivo di Napoli, affacciato sul golfo. Le ville e gli appartamenti di pregio richiedono interventi idraulici di alta qualità e materiali premium.',
    problemiComuni: 'A Posillipo i problemi idraulici sono spesso legati alla corrosione accelerata causata dalla salsedine marina. Gli impianti delle ville storiche necessitano di manutenzione specializzata. La pressione dell\'acqua può essere problematica nelle zone più elevate della collina.',
    mapCoordinates: { lat: 40.8058, lng: 14.1883 }
  },
  {
    slug: 'chiaia',
    nome: 'Chiaia',
    nomeCompleto: 'Chiaia',
    descrizione: 'Chiaia è il quartiere elegante del lungomare napoletano, con palazzi signorili e boutique di lusso. Gli edifici storici richiedono interventi idraulici discreti e professionali.',
    problemiComuni: 'A Chiaia i problemi idraulici comuni riguardano gli impianti dei palazzi d\'epoca, spesso con tubature originali mai sostituite. La vicinanza al mare causa corrosione nelle tubature metalliche. Frequenti le richieste per ristrutturazioni bagni in appartamenti di pregio.',
    mapCoordinates: { lat: 40.8338, lng: 14.2273 }
  },
  {
    slug: 'mergellina',
    nome: 'Mergellina',
    nomeCompleto: 'Mergellina',
    descrizione: 'Mergellina è il caratteristico borgo marinaro di Napoli, famoso per il porto turistico. La zona presenta edifici di varie epoche con problematiche idrauliche legate all\'ambiente marino.',
    problemiComuni: 'A Mergellina i problemi idraulici più frequenti sono causati dalla salsedine che corrode rapidamente tubature e rubinetteria. Gli scarichi delle attività commerciali del porto richiedono manutenzione costante. La pressione dell\'acqua è generalmente buona ma l\'umidità marina accelera l\'usura degli impianti.',
    mapCoordinates: { lat: 40.8289, lng: 14.2157 }
  },
  {
    slug: 'fuorigrotta',
    nome: 'Fuorigrotta',
    nomeCompleto: 'Fuorigrotta',
    descrizione: 'Fuorigrotta è un quartiere densamente popolato di Napoli ovest, noto per lo Stadio Maradona e la Mostra d\'Oltremare. I condomini degli anni \'60-\'80 presentano impianti che necessitano di aggiornamento.',
    problemiComuni: 'A Fuorigrotta i problemi idraulici più comuni riguardano gli impianti dei grandi condomini: colonne di scarico intasate, pressione insufficiente ai piani alti e tubature in ferro corroso. Frequenti anche le emergenze per perdite nelle cantine e nei garage seminterrati.',
    mapCoordinates: { lat: 40.8260, lng: 14.1889 }
  },
  {
    slug: 'bagnoli',
    nome: 'Bagnoli',
    nomeCompleto: 'Bagnoli',
    descrizione: 'Bagnoli è un quartiere costiero in trasformazione, ex zona industriale ora in riqualificazione. Gli edifici residenziali presentano problematiche tipiche delle zone marine.',
    problemiComuni: 'A Bagnoli i problemi idraulici sono spesso legati all\'umidità e alla salsedine del mare. Gli edifici più datati hanno tubature corrose, mentre le nuove costruzioni possono presentare difetti di installazione. Comune la formazione di calcare negli scaldabagni per la durezza dell\'acqua.',
    mapCoordinates: { lat: 40.8128, lng: 14.1667 }
  },
  {
    slug: 'soccavo',
    nome: 'Soccavo',
    nomeCompleto: 'Soccavo',
    descrizione: 'Soccavo è un quartiere residenziale periferico di Napoli ovest, caratterizzato da edilizia popolare e palazzine degli anni \'70-\'90. Gli impianti idraulici richiedono frequente manutenzione.',
    problemiComuni: 'A Soccavo i problemi idraulici più frequenti riguardano le tubature in ferro zincato ormai obsolete dei condomini IACP. Comuni gli intasamenti degli scarichi condominiali e le perdite nelle colonne montanti. La pressione dell\'acqua può essere scarsa nelle ore di punta.',
    mapCoordinates: { lat: 40.8439, lng: 14.1867 }
  },
  {
    slug: 'pianura',
    nome: 'Pianura',
    nomeCompleto: 'Pianura',
    descrizione: 'Pianura è un quartiere periferico della zona ovest di Napoli, con una miscela di edilizia residenziale e piccole attività. Gli impianti idraulici variano molto a seconda dell\'età degli edifici.',
    problemiComuni: 'A Pianura i problemi idraulici comuni includono intasamenti frequenti dovuti a scarichi obsoleti, perdite nelle tubature interrate e problemi di pressione nelle zone più periferiche. Gli edifici più vecchi hanno spesso fosse settiche che richiedono spurgo regolare.',
    mapCoordinates: { lat: 40.8561, lng: 14.1667 }
  },
  {
    slug: 'san-giovanni-a-teduccio',
    nome: 'San Giovanni a Teduccio',
    nomeCompleto: 'San Giovanni a Teduccio',
    descrizione: 'San Giovanni a Teduccio è un quartiere della periferia orientale di Napoli, storicamente industriale. Gli edifici residenziali sono prevalentemente di edilizia popolare con impianti datati.',
    problemiComuni: 'A San Giovanni a Teduccio i problemi idraulici sono spesso legati alla vetustà degli impianti dei palazzi popolari. Comuni le perdite nelle colonne montanti, gli intasamenti fognari e i problemi alle caldaie centralizzate. La vicinanza al mare causa corrosione accelerata.',
    mapCoordinates: { lat: 40.8367, lng: 14.3089 }
  },
  {
    slug: 'scampia',
    nome: 'Scampia',
    nomeCompleto: 'Scampia',
    descrizione: 'Scampia è un quartiere della periferia nord di Napoli, noto per i grandi complessi di edilizia popolare. Gli impianti idraulici centralizzati richiedono interventi specializzati.',
    problemiComuni: 'A Scampia i problemi idraulici più comuni riguardano gli impianti centralizzati dei grandi condomini: perdite nelle colonne, intasamenti degli scarichi condominiali, pressione insufficiente ai piani alti. Frequenti anche i problemi agli impianti di riscaldamento centralizzato.',
    mapCoordinates: { lat: 40.8967, lng: 14.2456 }
  },
  {
    slug: 'secondigliano',
    nome: 'Secondigliano',
    nomeCompleto: 'Secondigliano',
    descrizione: 'Secondigliano è un quartiere della periferia nord di Napoli con un mix di edilizia popolare e palazzine residenziali. Gli impianti idraulici variano notevolmente per età e condizione.',
    problemiComuni: 'A Secondigliano i problemi idraulici frequenti includono tubature corrose nei palazzi più vecchi, scarichi intasati e problemi di pressione. I condomini IACP hanno spesso colonne di scarico sottodimensionate che causano rigurgiti frequenti.',
    mapCoordinates: { lat: 40.8833, lng: 14.2667 }
  },
  {
    slug: 'ponticelli',
    nome: 'Ponticelli',
    nomeCompleto: 'Ponticelli',
    descrizione: 'Ponticelli è un quartiere della periferia orientale di Napoli, caratterizzato da edilizia mista. Gli impianti idraulici delle costruzioni più datate necessitano di interventi frequenti.',
    problemiComuni: 'A Ponticelli i problemi idraulici comuni sono legati agli impianti obsoleti: perdite nelle tubature interrate, scarichi lenti, problemi alle fosse settiche nelle zone non raggiunte dalla rete fognaria. Frequenti gli allagamenti nelle cantine durante le piogge intense.',
    mapCoordinates: { lat: 40.8511, lng: 14.3422 }
  },
  {
    slug: 'barra',
    nome: 'Barra',
    nomeCompleto: 'Barra',
    descrizione: 'Barra è un quartiere della periferia est di Napoli, con edifici residenziali di varie epoche. La zona presenta problematiche idrauliche tipiche delle aree periferiche.',
    problemiComuni: 'A Barra i problemi idraulici più frequenti riguardano le tubature vetuste dei palazzi più vecchi e gli scarichi delle attività commerciali. Comuni le perdite sotterranee e i problemi di pressione nelle ore di punta. Gli edifici recenti possono avere difetti di costruzione.',
    mapCoordinates: { lat: 40.8567, lng: 14.3267 }
  },
  {
    slug: 'piscinola',
    nome: 'Piscinola',
    nomeCompleto: 'Piscinola',
    descrizione: 'Piscinola è un quartiere della periferia nord di Napoli, caratterizzato da edilizia residenziale degli anni \'70-\'90. Gli impianti idraulici necessitano spesso di aggiornamento.',
    problemiComuni: 'A Piscinola i problemi idraulici comuni includono tubature in ferro corrose dal calcare, scarichi intasati nei condomini e pressione acqua insufficiente ai piani superiori. Frequenti anche i problemi alle caldaie durante i mesi invernali.',
    mapCoordinates: { lat: 40.8889, lng: 14.2333 }
  },
  {
    slug: 'chiaiano',
    nome: 'Chiaiano',
    nomeCompleto: 'Chiaiano',
    descrizione: 'Chiaiano è un quartiere collinare della periferia nord di Napoli, con una miscela di ville, palazzine e case rurali. Gli impianti idraulici variano molto a seconda del tipo di edificio.',
    problemiComuni: 'A Chiaiano i problemi idraulici sono spesso legati alla conformazione collinare: pressione acqua insufficiente nelle zone più elevate, scarichi lenti, pozzi e fosse settiche nelle aree non servite dalla rete. Comuni anche i problemi alle autoclave nelle ville.',
    mapCoordinates: { lat: 40.8778, lng: 14.2111 }
  },
  {
    slug: 'capodimonte',
    nome: 'Capodimonte',
    nomeCompleto: 'Capodimonte',
    descrizione: 'Capodimonte è un quartiere collinare di Napoli, famoso per la Reggia e il Real Bosco. Gli edifici residenziali sono prevalentemente del \'900 con impianti che richiedono manutenzione specializzata.',
    problemiComuni: 'A Capodimonte i problemi idraulici più frequenti sono causati dall\'altitudine: pressione acqua bassa ai piani alti, necessità di autoclave. Gli edifici storici vicino alla Reggia hanno tubature antiche. Comune anche l\'intasamento degli scarichi per le foglie del bosco.',
    mapCoordinates: { lat: 40.8656, lng: 14.2511 }
  },
  {
    slug: 'sanita',
    nome: 'Sanità',
    nomeCompleto: 'Rione Sanità',
    descrizione: 'Il Rione Sanità è uno dei quartieri più antichi e caratteristici di Napoli, famoso per le Catacombe di San Gennaro. Gli edifici storici presentano impianti idraulici datati che richiedono interventi specializzati.',
    problemiComuni: 'Alla Sanità i problemi idraulici più frequenti riguardano le tubature vetuste dei palazzi storici, spesso in piombo o ferro. Le colonne di scarico sono sottodimensionate e gli allagamenti sono comuni nelle cantine a causa della conformazione del territorio.',
    mapCoordinates: { lat: 40.8611, lng: 14.2522 }
  },
  {
    slug: 'materdei',
    nome: 'Materdei',
    nomeCompleto: 'Materdei',
    descrizione: 'Materdei è un quartiere residenziale situato nella zona collinare di Napoli, ben collegato dalla metropolitana. Gli edifici sono prevalentemente del \'900 con impianti che necessitano di aggiornamento.',
    problemiComuni: 'A Materdei i problemi idraulici comuni includono pressione acqua insufficiente ai piani alti, tubature in ferro corrose e scarichi lenti nei condomini più datati. Frequenti anche i problemi alle caldaie durante i mesi invernali.',
    mapCoordinates: { lat: 40.8567, lng: 14.2433 }
  },
  {
    slug: 'colli-aminei',
    nome: 'Colli Aminei',
    nomeCompleto: 'Colli Aminei',
    descrizione: 'I Colli Aminei sono un quartiere residenziale collinare di Napoli, caratterizzato da palazzine e ville. La zona presenta sfide idrauliche tipiche delle aree in altura.',
    problemiComuni: 'Ai Colli Aminei i problemi idraulici più frequenti sono legati alla pressione acqua insufficiente, che richiede spesso l\'installazione di autoclave. Le tubature delle ville possono presentare perdite sotterranee difficili da individuare.',
    mapCoordinates: { lat: 40.8678, lng: 14.2367 }
  },
  {
    slug: 'rione-alto',
    nome: 'Rione Alto',
    nomeCompleto: 'Rione Alto',
    descrizione: 'Rione Alto è un quartiere residenziale della zona collinare di Napoli, adiacente ai Colli Aminei. Gli edifici sono prevalentemente degli anni \'60-\'80 con impianti che richiedono manutenzione.',
    problemiComuni: 'A Rione Alto i problemi idraulici comuni riguardano la pressione acqua variabile, le tubature in ferro zincato corrose e gli scarichi condominiali. La conformazione collinare può causare problemi di drenaggio durante le piogge intense.',
    mapCoordinates: { lat: 40.8633, lng: 14.2378 }
  },
  {
    slug: 'miano',
    nome: 'Miano',
    nomeCompleto: 'Miano',
    descrizione: 'Miano è un quartiere della periferia nord di Napoli, caratterizzato da edilizia mista residenziale e commerciale. Gli impianti idraulici variano notevolmente per età e condizione.',
    problemiComuni: 'A Miano i problemi idraulici frequenti includono intasamenti degli scarichi, perdite nelle tubature interrate e problemi di pressione nelle ore di punta. Gli edifici più vecchi hanno spesso colonne di scarico sottodimensionate.',
    mapCoordinates: { lat: 40.8856, lng: 14.2544 }
  },
  {
    slug: 'marianella',
    nome: 'Marianella',
    nomeCompleto: 'Marianella',
    descrizione: 'Marianella è un quartiere della periferia nord di Napoli, con una miscela di edilizia residenziale e piccole attività. Gli impianti idraulici necessitano spesso di interventi di manutenzione.',
    problemiComuni: 'A Marianella i problemi idraulici comuni sono legati alle tubature datate dei condomini, agli scarichi intasati e ai problemi di pressione. Frequenti anche le perdite nelle cantine e nei garage seminterrati.',
    mapCoordinates: { lat: 40.8789, lng: 14.2389 }
  },
  {
    slug: 'poggioreale',
    nome: 'Poggioreale',
    nomeCompleto: 'Poggioreale',
    descrizione: 'Poggioreale è un quartiere della zona orientale di Napoli, noto per il cimitero monumentale e la zona industriale. Gli edifici residenziali presentano problematiche idrauliche tipiche delle zone miste.',
    problemiComuni: 'A Poggioreale i problemi idraulici più frequenti riguardano le tubature vetuste, gli scarichi delle attività commerciali e i problemi di pressione. La vicinanza alla zona industriale può causare problemi alla qualità dell\'acqua.',
    mapCoordinates: { lat: 40.8567, lng: 14.2878 }
  },
  {
    slug: 'gianturco',
    nome: 'Gianturco',
    nomeCompleto: 'Gianturco',
    descrizione: 'Gianturco è un quartiere della zona orientale di Napoli, prevalentemente industriale e commerciale. Gli edifici residenziali sono limitati ma presentano problematiche specifiche.',
    problemiComuni: 'A Gianturco i problemi idraulici sono spesso legati alla vetustà degli impianti e alla presenza di attività industriali. Comuni le perdite nelle tubature interrate e i problemi di drenaggio durante le piogge.',
    mapCoordinates: { lat: 40.8489, lng: 14.2856 }
  },
  {
    slug: 'san-carlo-all-arena',
    nome: 'San Carlo all\'Arena',
    nomeCompleto: 'San Carlo all\'Arena',
    descrizione: 'San Carlo all\'Arena è un quartiere storico di Napoli, situato tra la Sanità e Capodimonte. Gli edifici antichi richiedono interventi idraulici specializzati.',
    problemiComuni: 'A San Carlo all\'Arena i problemi idraulici più comuni riguardano le tubature storiche, spesso in materiali obsoleti. Le colonne di scarico condominiali sono sottodimensionate e soggette a frequenti intasamenti.',
    mapCoordinates: { lat: 40.8589, lng: 14.2533 }
  },
  {
    slug: 'stella',
    nome: 'Stella',
    nomeCompleto: 'Stella',
    descrizione: 'Stella è un quartiere storico del centro di Napoli, caratterizzato da vicoli stretti e palazzi antichi. Gli impianti idraulici sono spesso datati e richiedono interventi delicati.',
    problemiComuni: 'A Stella i problemi idraulici frequenti includono tubature in piombo da sostituire, scarichi intasati per la conformazione dei vicoli e pressione acqua variabile. Gli accessi difficili complicano spesso gli interventi.',
    mapCoordinates: { lat: 40.8556, lng: 14.2544 }
  },
  {
    slug: 'avvocata',
    nome: 'Avvocata',
    nomeCompleto: 'Avvocata',
    descrizione: 'L\'Avvocata è un quartiere del centro storico di Napoli, densamente popolato e caratterizzato da edifici storici. Gli impianti idraulici sono spesso obsoleti.',
    problemiComuni: 'All\'Avvocata i problemi idraulici più comuni riguardano le tubature vetuste, gli scarichi condominiali intasati e la pressione acqua insufficiente ai piani alti. Gli edifici storici richiedono interventi specializzati.',
    mapCoordinates: { lat: 40.8511, lng: 14.2522 }
  },
  {
    slug: 'montecalvario',
    nome: 'Montecalvario',
    nomeCompleto: 'Montecalvario',
    descrizione: 'Montecalvario è un quartiere del centro storico di Napoli che include i famosi Quartieri Spagnoli. Gli edifici antichi presentano sfide idrauliche uniche.',
    problemiComuni: 'A Montecalvario i problemi idraulici sono legati alla struttura antica degli edifici: tubature in piombo, colonne di scarico condivise tra più unità e accessi difficili nei vicoli stretti. Frequenti gli allagamenti nelle cantine.',
    mapCoordinates: { lat: 40.8444, lng: 14.2467 }
  },
  {
    slug: 'quartieri-spagnoli',
    nome: 'Quartieri Spagnoli',
    nomeCompleto: 'Quartieri Spagnoli',
    descrizione: 'I Quartieri Spagnoli sono una delle zone più caratteristiche di Napoli, con vicoli stretti e palazzi storici del XVI secolo. Gli impianti idraulici richiedono interventi specializzati.',
    problemiComuni: 'Nei Quartieri Spagnoli i problemi idraulici più frequenti riguardano le tubature antichissime, spesso mai sostituite. Gli scarichi sono sottodimensionati e gli accessi estremamente difficili per i mezzi di lavoro.',
    mapCoordinates: { lat: 40.8433, lng: 14.2478 }
  },
  {
    slug: 'san-ferdinando',
    nome: 'San Ferdinando',
    nomeCompleto: 'San Ferdinando',
    descrizione: 'San Ferdinando è il quartiere elegante del lungomare di Napoli, che include Piazza Plebiscito e Via Toledo. Gli edifici storici richiedono interventi idraulici di pregio.',
    problemiComuni: 'A San Ferdinando i problemi idraulici comuni riguardano gli impianti dei palazzi d\'epoca, spesso con tubature originali. La vicinanza al mare causa corrosione accelerata. Richieste frequenti per ristrutturazioni bagni di lusso.',
    mapCoordinates: { lat: 40.8378, lng: 14.2489 }
  },
  {
    slug: 'pendino',
    nome: 'Pendino',
    nomeCompleto: 'Pendino',
    descrizione: 'Pendino è un quartiere del centro storico di Napoli, situato nella zona bassa verso il porto. Gli edifici antichi presentano problematiche idrauliche tipiche delle zone storiche.',
    problemiComuni: 'A Pendino i problemi idraulici frequenti includono tubature vetuste, scarichi intasati per la conformazione dei vicoli e problemi di umidità risalente. La vicinanza al mare accelera la corrosione degli impianti.',
    mapCoordinates: { lat: 40.8478, lng: 14.2589 }
  },
  {
    slug: 'mercato',
    nome: 'Mercato',
    nomeCompleto: 'Mercato',
    descrizione: 'Il quartiere Mercato è una zona storica di Napoli vicino al porto, caratterizzata da attività commerciali e edifici antichi. Gli impianti idraulici sono spesso datati.',
    problemiComuni: 'Al Mercato i problemi idraulici più comuni riguardano gli scarichi delle attività commerciali, le tubature vetuste dei palazzi e i problemi di drenaggio. La zona è soggetta ad allagamenti durante le piogge intense.',
    mapCoordinates: { lat: 40.8456, lng: 14.2678 }
  },
  {
    slug: 'san-lorenzo',
    nome: 'San Lorenzo',
    nomeCompleto: 'San Lorenzo',
    descrizione: 'San Lorenzo è un quartiere del centro storico di Napoli, sede dell\'Università Federico II. Gli edifici storici e i palazzi universitari presentano sfide idrauliche specifiche.',
    problemiComuni: 'A San Lorenzo i problemi idraulici frequenti includono tubature antiche dei palazzi storici, scarichi condominiali sottodimensionati e problemi di pressione. La densità abitativa aumenta il carico sugli impianti.',
    mapCoordinates: { lat: 40.8511, lng: 14.2567 }
  },
  {
    slug: 'vicaria',
    nome: 'Vicaria',
    nomeCompleto: 'Vicaria',
    descrizione: 'Vicaria è un quartiere storico di Napoli situato nella zona orientale del centro. Gli edifici antichi richiedono interventi idraulici specializzati per la loro conformazione.',
    problemiComuni: 'Alla Vicaria i problemi idraulici più comuni riguardano le tubature in materiali obsoleti, gli scarichi intasati e la pressione acqua variabile. Gli edifici storici hanno spesso accessi difficili per le riparazioni.',
    mapCoordinates: { lat: 40.8533, lng: 14.2633 }
  },
  {
    slug: 'porto',
    nome: 'Porto',
    nomeCompleto: 'Porto',
    descrizione: 'Il quartiere Porto è la zona marittima di Napoli, caratterizzata da attività portuali e commerciali. Gli edifici residenziali sono esposti alla salsedine marina.',
    problemiComuni: 'Al Porto i problemi idraulici sono principalmente causati dalla corrosione accelerata dovuta alla salsedine. Le tubature metalliche si deteriorano rapidamente e gli scarichi delle attività commerciali richiedono manutenzione costante.',
    mapCoordinates: { lat: 40.8411, lng: 14.2678 }
  },
  {
    slug: 'san-giuseppe',
    nome: 'San Giuseppe',
    nomeCompleto: 'San Giuseppe',
    descrizione: 'San Giuseppe è un quartiere centrale di Napoli, situato tra Via Toledo e il centro direzionale. Gli edifici sono prevalentemente storici con alcuni complessi moderni.',
    problemiComuni: 'A San Giuseppe i problemi idraulici comuni riguardano la convivenza di impianti antichi e moderni. Le tubature storiche necessitano di sostituzione, mentre i nuovi edifici possono avere difetti di costruzione.',
    mapCoordinates: { lat: 40.8489, lng: 14.2544 }
  },
  {
    slug: 'agnano',
    nome: 'Agnano',
    nomeCompleto: 'Agnano',
    descrizione: 'Agnano è un quartiere della zona ovest di Napoli, famoso per le terme e l\'ippodromo. La zona presenta caratteristiche geologiche particolari che influenzano gli impianti idraulici.',
    problemiComuni: 'Ad Agnano i problemi idraulici sono spesso legati alla conformazione del territorio vulcanico. L\'acqua può essere particolarmente dura e causare incrostazioni. Comuni i problemi di drenaggio nella zona termale.',
    mapCoordinates: { lat: 40.8278, lng: 14.1678 }
  }
];

// Helper per trovare un quartiere dal slug
export function getQuartiereBySlug(slug: string): QuartiereData | undefined {
  return NAPOLI_QUARTIERI.find(q => q.slug === slug);
}

// Lista servizi idraulici per tutte le pagine quartiere
export const SERVIZI_IDRAULICI = [
  'Riparazione perdite acqua',
  'Disotturazione scarichi e WC',
  'Riparazione tubature',
  'Sostituzione rubinetti',
  'Installazione sanitari',
  'Riparazione scaldabagni',
  'Spurgo lavandini',
  'Riparazioni urgenti bagno e cucina'
];

// Tipi di emergenza comuni
export const EMERGENZE_COMUNI = [
  'Perdite d\'acqua improvvise',
  'Tubi rotti',
  'WC completamente intasato',
  'Allagamenti in bagno o cucina',
  'Rubinetti che perdono senza sosta',
  'Caldaia bloccata in inverno'
];
