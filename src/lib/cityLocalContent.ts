/**
 * City-Specific Local Content Data
 * 
 * Provides unique, hyper-local content for each Top 50 city:
 * - Building types and architecture characteristics
 * - Local plumbing problems related to geography/climate
 * - Climate impact on plumbing systems
 * - Recent intervention examples
 * 
 * SEO Purpose: Differentiate city pages with genuinely unique local content
 */

export interface CityLocalContent {
  buildingTypes: string[];
  localProblems: string[];
  climateImpact: string;
  recentInterventions: {
    type: string;
    zone: string;
    description: string;
  }[];
}

// Detailed local content for Top 50 cities
const CITY_LOCAL_CONTENT: Record<string, CityLocalContent> = {
  'milano': {
    buildingTypes: [
      'Condomini anni \'60-\'80 con tubature in ferro zincato',
      'Palazzi storici del centro con impianti d\'epoca',
      'Nuove costruzioni residenziali con impianti multistrato',
      'Loft ristrutturati in ex aree industriali',
      'Villette unifamiliari nelle zone periferiche'
    ],
    localProblems: [
      'Tubature corrose dal calcare elevato dell\'acquedotto lombardo',
      'Scarichi intasati nei condomini anni \'70 con colonne fognarie sottodimensionate',
      'Perdite nelle giunzioni dei vecchi edifici del centro storico',
      'Caldaie sovraccaricate negli inverni rigidi con consumi elevati',
      'Problemi di pressione idrica ai piani alti dei grattacieli residenziali'
    ],
    climateImpact: 'Gli inverni milanesi con temperature sotto zero causano frequenti rotture di tubazioni esterne e problemi ai contatori. L\'umidità elevata favorisce la formazione di condensa negli impianti non isolati. In estate, il caldo intenso mette sotto stress le caldaie per la produzione di acqua calda sanitaria.',
    recentInterventions: [
      { type: 'Riparazione perdita', zone: 'Navigli', description: 'Intervento su perdita tubatura in rame in appartamento d\'epoca' },
      { type: 'Spurgo scarichi', zone: 'Città Studi', description: 'Disostruzione colonna fognaria condominiale bloccata' },
      { type: 'Sostituzione caldaia', zone: 'Isola', description: 'Installazione caldaia a condensazione in loft ristrutturato' },
      { type: 'Emergenza allagamento', zone: 'Porta Romana', description: 'Pronto intervento per tubo rotto in bagno' },
      { type: 'Manutenzione impianto', zone: 'Bicocca', description: 'Revisione completa impianto riscaldamento condominio' }
    ]
  },
  'roma': {
    buildingTypes: [
      'Palazzi storici del centro con impianti risalenti agli anni \'50',
      'Edifici residenziali dell\'EUR con architettura razionalista',
      'Condomini delle periferie anni \'60-\'70',
      'Villini indipendenti nelle zone collinari',
      'Nuovi complessi residenziali nelle aree di espansione'
    ],
    localProblems: [
      'Tubazioni in piombo ancora presenti in molti edifici storici del centro',
      'Scarichi intasati da calcare nelle zone con acqua più dura',
      'Perdite nelle facciate esposte dei palazzi storici',
      'Problemi fognari legati alla vetustà della rete urbana',
      'Caldaie centralizzate obsolete nei grandi condomini'
    ],
    climateImpact: 'Le estati romane molto calde sovraccaricano gli impianti di produzione acqua calda. I rari ma intensi temporali autunnali causano intasamenti fognari. Gli sbalzi termici tra stagioni provocano dilatazioni che stressano le giunzioni degli impianti datati.',
    recentInterventions: [
      { type: 'Sostituzione tubature', zone: 'Trastevere', description: 'Rifacimento impianto in palazzo del \'700 con tubazioni in multistrato' },
      { type: 'Spurgo fogne', zone: 'EUR', description: 'Intervento su intasamento fognario condominiale' },
      { type: 'Riparazione caldaia', zone: 'Prati', description: 'Riparazione urgente caldaia centralizzata' },
      { type: 'Perdita acqua', zone: 'San Giovanni', description: 'Localizzazione e riparazione perdita occulta' },
      { type: 'Installazione sanitari', zone: 'Monteverde', description: 'Sostituzione completa bagno in appartamento' }
    ]
  },
  'napoli': {
    buildingTypes: [
      'Palazzi storici del centro antico con strutture medievali',
      'Edifici liberty del Vomero e Chiaia',
      'Condomini popolari delle zone periferiche',
      'Case indipendenti sulle colline di Posillipo',
      'Costruzioni recenti nelle aree di nuova urbanizzazione'
    ],
    localProblems: [
      'Impianti idraulici vetustissimi nei bassi del centro storico',
      'Perdite da infiltrazioni marine nelle zone costiere',
      'Scarichi intasati da depositi calcarei nelle tubature antiche',
      'Pressione idrica insufficiente nelle zone collinari alte',
      'Problemi di umidità di risalita che danneggiano gli impianti'
    ],
    climateImpact: 'L\'aria salmastra marina accelera la corrosione delle tubature metalliche. L\'elevata umidità favorisce la formazione di muffe che ostruiscono gli scarichi. Gli inverni miti riducono i problemi di gelo ma le piogge autunnali intense sovraccaricano il sistema fognario.',
    recentInterventions: [
      { type: 'Emergenza perdita', zone: 'Centro Storico', description: 'Riparazione urgente perdita in palazzo settecentesco' },
      { type: 'Sostituzione impianto', zone: 'Vomero', description: 'Rifacimento completo impianto bagno in edificio liberty' },
      { type: 'Spurgo scarichi', zone: 'Fuorigrotta', description: 'Disostruzione scarico cucina in condominio' },
      { type: 'Installazione caldaia', zone: 'Chiaia', description: 'Nuova caldaia a condensazione in appartamento' },
      { type: 'Riparazione termosifoni', zone: 'Posillipo', description: 'Spurgo e riparazione impianto riscaldamento' }
    ]
  },
  'torino': {
    buildingTypes: [
      'Palazzi sabaudi del centro con facciate monumentali',
      'Case di ringhiera nei quartieri operai storici',
      'Grandi condomini razionalisti degli anni \'30',
      'Edifici residenziali delle aree industriali riconvertite',
      'Villette nelle zone precollinari e nella prima cintura'
    ],
    localProblems: [
      'Tubazioni in ferro soggette a corrosione per il calcare alpino',
      'Impianti di riscaldamento centralizzati obsoleti nei grandi condomini',
      'Perdite nelle cantine e nei seminterrati per infiltrazioni',
      'Caldaie sotto stress per i lunghi inverni rigidi',
      'Scarichi intasati nelle vecchie case di ringhiera'
    ],
    climateImpact: 'Gli inverni torinesi molto rigidi, con temperature spesso sotto zero, causano frequenti rotture per gelo di tubazioni esterne e contatori. La neve abbondante può ostruire pozzetti e scarichi esterni. I forti sbalzi termici stagionali stressano giunzioni e raccordi degli impianti.',
    recentInterventions: [
      { type: 'Riparazione gelo', zone: 'San Salvario', description: 'Sostituzione tubo rotto per gelo in cortile interno' },
      { type: 'Manutenzione caldaia', zone: 'Crocetta', description: 'Revisione caldaia centralizzata condominio' },
      { type: 'Spurgo scarichi', zone: 'Aurora', description: 'Disostruzione colonna fognaria casa di ringhiera' },
      { type: 'Perdita acqua', zone: 'Lingotto', description: 'Riparazione perdita in appartamento ristrutturato' },
      { type: 'Sostituzione sanitari', zone: 'Santa Rita', description: 'Rifacimento bagno completo in condominio anni \'60' }
    ]
  },
  'bologna': {
    buildingTypes: [
      'Palazzi storici sotto i portici del centro',
      'Case a torre medievali nella zona universitaria',
      'Condomini residenziali anni \'60-\'70 in periferia',
      'Ville e villette nella zona collinare',
      'Nuovi complessi residenziali nelle aree di espansione'
    ],
    localProblems: [
      'Impianti idraulici datati nei palazzi storici del centro',
      'Umidità di risalita che corrode le tubature nei piani terra',
      'Scarichi intasati per la conformazione delle vecchie case a torre',
      'Caldaie sovraccaricate negli inverni nebbiosi e freddi',
      'Problemi di pressione nelle zone collinari'
    ],
    climateImpact: 'Gli inverni freddi e umidi della pianura padana causano problemi di condensa e gelo. L\'umidità elevata favorisce corrosione e formazione di calcare. Le nebbie persistenti rendono critiche le dispersioni termiche degli impianti di riscaldamento non isolati.',
    recentInterventions: [
      { type: 'Riparazione perdita', zone: 'Centro', description: 'Intervento su perdita in palazzo storico sotto i portici' },
      { type: 'Spurgo fogne', zone: 'Bolognina', description: 'Disostruzione fognatura condominiale' },
      { type: 'Sostituzione caldaia', zone: 'San Donato', description: 'Installazione caldaia a condensazione' },
      { type: 'Emergenza allagamento', zone: 'Santo Stefano', description: 'Pronto intervento per tubo rotto' },
      { type: 'Manutenzione impianto', zone: 'Saragozza', description: 'Revisione impianto riscaldamento villa' }
    ]
  },
  'palermo': {
    buildingTypes: [
      'Palazzi Nobiliari del Settecento (Centro Storico - Kalsa/Albergheria): Strutture con cortili interni e cisterne d\'epoca, spesso presentano tubature in piombo originali o canalizzazioni in muratura.',
      'Villini Liberty primi \'900 (Mondello/Via Libertà): Architetture di Ernesto Basile con impianti che risentono della corrosione salina e sistemi di scarico a caduta complessi.',
      'Edilizia Popolare anni \'50-\'60 (CEP/Zen): Grandi complessi condominiali con colonne di scarico in ghisa ormai deteriorate e problemi di pressione ai piani alti.',
      'Palazzine anni \'70 con \'autoclave\' (Notarbartolo/Strasburgo): Caratterizzate da locali tecnici interrati per le riserve idriche, tipiche dell\'espansione urbana post-sacco di Palermo.',
      'Case a schiera e rimesse storiche (Borgo Vecchio): Edifici stratificati con accessi idrici angusti e sovrapposizioni di impianti di epoche diverse in spazi ridottissimi.',
    ],
    localProblems: [
      'Incrostazioni massive di calcare dovute all\'elevata durezza dell\'acqua proveniente dalle sorgenti di Scillato e dai pozzi locali.',
      'Corrosione accelerata delle tubature esterne causata dall\'aerosol marino, specialmente lungo la zona della Bandita e dell\'Acquasanta.',
      'Frequenti blocchi delle pompe sommerse nei quartieri bassi a causa dei sedimenti sabbiosi trasportati dalla rete idrica obsoleta.',
      'Riflusso di acque reflue nei vespai durante i temporali per l\'insufficienza del sistema fognario misto in zona via Messine Marine.',
      'Usura precoce delle guarnizioni e dei galleggianti dei serbatoi d\'accumulo, necessari per sopperire all\'erogazione idrica a turni.',
    ],
    climateImpact: 'L\'alternanza tra scirocco torrido e piogge torrenziali autunnali causa forti sbalzi termici che dilatano le giunzioni dei tubi in PVC, mentre l\'umidità salmastra accelera la corrosione galvanica dei raccordi metallici esterni nelle zone costiere. Inoltre, la scarsità idrica stagionale costringe all\'uso prolungato di pompe e autoclavi, stressando le valvole di ritegno e i pressostati.',
    recentInterventions: [
      { type: 'Risanamento fognario condominiale', zone: 'Via Roma (Centro Storico)', description: 'Sostituzione integrale del collettore principale di scarico in un palazzo d\'epoca con risanamento non distruttivo (relining).' },
      { type: 'Trattamento acque e riscaldamento', zone: 'Viale Strasburgo (Quartiere San Lorenzo)', description: 'Installazione di un sistema di filtraggio a polifosfati e addolcitore per proteggere la nuova caldaia a condensazione dal calcare aggressivo.' },
      { type: 'Ricerca perdite e riparazione idrica', zone: 'Piazza Marina (Kalsa)', description: 'Ripristino di una perdita occulta individuata sotto il basolato tramite termografia, causata dal cedimento del terreno.' },
      { type: 'Ristrutturazione idraulica completa', zone: 'Mondello (Valdesi)', description: 'Rifacimento completo dell\'impianto idraulico di un villino con materiali multistrato resistenti alla salsedine e installazione autoclave silenziata.' },
      { type: 'Manutenzione elettropompe di sollevamento', zone: 'Partanna Mondello', description: 'Sostituzione della pompa di sollevamento acque nere bruciata a causa di detriti e installazione di allarme di massimo livello.' },
    ]
  },
  'genova': {
    buildingTypes: [
      'Palazzi dei Rolli (Centro Storico): edifici rinascimentali e barocchi con cisterne monumentali, tubature in piombo storiche e scale in ardesia.',
      'Case a schiera dei borghi marinari (Boccadasse, Nervi): sviluppo verticale stretto, soggette a corrosione salina e infiltrazioni dal basso.',
      'Condomini anni \'50 e \'60 (Sampierdarena, Marassi): edilizia intensiva con colonne di scarico in ghisa spesso sature di calcare e impianti centralizzati.',
      'Palazzine Liberty (Albaro, Castelletto): architettura del primo novecento con eleganti radiatori in ghisa e reti di distribuzione spesso da ammodernare.',
      'Edifici popolari delle \'Lavatrici\' (Pra\'): complessi in cemento armato con problematiche di isolamento termico e distribuzione idrica su grandi dislivelli.',
    ],
    localProblems: [
      'Corrosione accelerata dal salino costiero su caldaie e unità esterne posizionate su balconi esposti.',
      'Otturazione cronica dei \'creuza\' e dei piccoli condotti sotterranei a causa dei sedimenti trascinati dalle forti piogge.',
      'Elevata durezza dell\'acqua proveniente dagli invasi (Brugneto) che causa incrostazioni rapide nei boiler e nelle serpentine.',
      'Cedimenti dei tubi di scarico in gres e piombo negli stretti caruggi a causa delle vibrazioni e dei micro-assestamenti del terreno.',
      'Ritorno di reflui dai collettori nei quartieri a livello del mare durante i picchi di alta marea e forti piogge.',
    ],
    climateImpact: 'Le forti escursioni altimetriche e la vicinanza del mare comportano una pressione idrica variabile che mette a dura prova le valvole di riduzione. Inoltre, i periodi di siccità seguiti da alluvioni improvvise saturano i vecchi sistemi di drenaggio misti (acque bianche e nere) tipici del centro storico.',
    recentInterventions: [
      { type: 'Rifacimento colonna discendente verticali', zone: 'Castelletto (Piazza della Meridiana)', description: 'Sostituzione completa della colonna di scarico in ghisa ammalorata e ripristino braghe in un palazzo del XIX secolo.' },
      { type: 'Protezione anti-riflusso acque nere', zone: 'Foce (Corso Italia) Borghetto di Boccadasse', description: 'Installazione di gruppo pompe di sollevamento e valvole di non ritorno per prevenire allagamenti da seminterrato.' },
      { type: 'Sostituzione tubature in piombo con multistrato', zone: 'Centro Storico (Via del Campo) outdoor', description: 'Bonifica e bypass di vecchie tubature in piombo rinvenute durante la ristrutturazione di un appartamento nobiliare.' },
      { type: 'Efficientamento termico e trattamento acque', zone: 'Quinto al Mare (Via Gianelli)', description: 'Installazione di addolcitore a condensazione e sostituzione vecchia caldaia con modello ad alta resistenza alla salsedine.' },
      { type: 'Ricerca e riparazione perdite nel sottosuolo', zone: 'Pegli (Viale Modugno)', description: 'Riparazione urgente di perdita idrica occulta su tubazione interrata in polietilene deformata dalle radici.' },
    ]
  },
  'firenze': {
    buildingTypes: [
      'Case a schiera medievali a torre (Oltrarno e San Frediano): edifici stretti del XIII-XIV secolo con tubazioni in piombo originali spesso incamiciate e scarichi verticali angusti.',
      'Palazzi Signorili Rinascimentali (Centro Storico - via Tornabuoni): strutture del XV-XVI secolo con spessi muri in pietra forte che rendono estremamente complesso il passaggio di nuovi impianti sottotraccia.',
      'Villini Liberty (Viali di Circonvallazione e Campo di Marte): architetture del primo novecento con ampie stanze da bagno originali e reti di adduzione in ferro zincato soggette a corrosione.',
      'Condomini anni \'50 e \'60 (Novoli e Isolotto): edifici del boom economico con colonne di scarico in ghisa ormai deteriorate e sistemi di riscaldamento centralizzato a colonna.',
      'Residenze collinari e Case coloniche (Arcetri e Settignano): strutture in pietra con impianti di approvvigionamento spesso dipendenti da pozzi privati o depositi di accumulo per gestire la pressione.',
    ],
    localProblems: [
      'Elevata durezza dell\'acqua dell\'acquedotto dell\'Anconella, che causa rapidi depositi di calcare negli scambiatori delle caldaie a condensazione.',
      'Corrosione galvanica nelle giunzioni tra vecchi tubi in ferro e nuovi raccordi in multistrato nei restauri in zona Santa Croce.',
      'Pressione idrica instabile nelle zone alte come Fiesole o coverciano, che richiede l\'installazione di riduttori di pressione di alta qualità.',
      'Infiltrazioni capillari dai seminterrati dovute alla risalita dell\'umidità nei quartieri adiacenti alle antiche mura (ex zone paludose).',
      'Ostruzioni frequenti dei condotti di scarico storici di sezione ridotta (i cosiddetti \'gottini\') nei palazzi dell\'Oltrarno.',
    ],
    climateImpact: 'Il microclima fiorentino, caratterizzato da estati torride e afose (fenomeno della conca) ed inverni umidi, accelera la dilatazione termica delle tubazioni esterne dei palazzi storici. Inoltre, le frequenti piogge intense espongono il sistema di smaltimento delle acque bianche del centro a frequenti rigurgiti dovuti alla vicinanza del livello freatico dell\'Arno.',
    recentInterventions: [
      { type: 'Rifacimento scarichi condominiali', zone: 'Novoli (via Baracca)', description: 'Sostituzione di una colonna montante in ghisa fessurata con una in polipropilene insonorizzato in un palazzo degli anni \'60.' },
      { type: 'Risanamento idraulico conservativo', zone: 'San Frediano (piazza del Tiratoio)', description: 'Bonifica e rimozione di vecchie tubazioni in piombo con installazione di nuovo impianto in sfilabile in un terratetto storico.' },
      { type: 'Trattamento acque e manutenzione caldaia', zone: 'Campo di Marte (viale dei Mille)', description: 'Installazione di un sistema di addolcimento a monte e sostituzione scambiatore a piastre intasato dal calcare.' },
      { type: 'Riparazione no-dig condotta fognaria', zone: 'Rifredi (via delle Panche)', description: 'Videoispezione e successiva riparazione mediante relining di una condotta fognaria privata danneggiata dalle radici.' },
      { type: 'Potenziamento pressione idrica', zone: 'Piazza Beccaria (Via Gioberti)', description: 'Adeguamento impianto idrico per attico con installazione di autoclave silenziata per garantire portata ai piani alti.' },
    ]
  },
  'bari': {
    buildingTypes: [
      'Palazzi Umbertini del Quartiere Murattiano: stabili di fine \'800 con soffitti alti 5 metri e vecchie colonne di scarico in ghisa ancora funzionali ma soggette a micro-fratture.',
      'Case a corte di Bari Vecchia (Città Vecchia): strutture medievali con muri in pietra calcarea larghi oltre un metro, dove l\'integrazione di impianti moderni richiede carotaggi speciali.',
      'Condomini intensivi di Carrassi e San Pasquale: edilizia degli anni \'60 e \'70 caratterizzata da tubature in ferro zincato ormai sature di sedimenti che riducono drasticamente la pressione.',
      'Ville Liberty di Palese e Santo Spirito: residenze di inizio \'900 spesso dotate di cisterne sotterranee per la raccolta piovana, oggi riconvertite o integrate nei sistemi idrici moderni.',
      'Nuovi complessi residenziali di Poggiofranco: architettura contemporanea dotata di sistemi di riscaldamento a pavimento e centralizzazione idrica avanzata, spesso con problemi di gestione del calcare.',
    ],
    localProblems: [
      'Eccessiva durezza dell\'acqua proveniente dall\'Acquedotto Pugliese, che causa incrostazioni rapide negli scambiatori delle caldaie nel quartiere Libertà.',
      'Infiltrazioni di acqua salmastra nelle fondamenta degli stabili vicini al porto, che danneggiano le pompe di sollevamento nei piani interrati.',
      'Pressione idrica incostante ai piani alti dei palazzi di Japigia a causa dell\'obsolescenza dei serbatoi comuni (autoclavi).',
      'Intasamenti critici dei pluviali a causa dei residui di sabbia sahariana portati dai venti di scirocco, frequenti nella zona sud.',
      'Corrosione galvanica accelerata negli attacchi dei termosifoni dovuta all\'esposizione all\'aria marina costante della costa barese.',
    ],
    climateImpact: 'L\'estrema umidità salmastra di Bari corrode precocemente le unità esterne delle caldaie e dei condizionatori lungo il Lungomare Nazario Sauro. Inoltre, i rapidi passaggi da scirocco a tramontana causano sbalzi termici che sollecitano le giunture delle tubazioni esterne non isolate termicamente.',
    recentInterventions: [
      { type: 'Rifacimento colonna di scarico', zone: 'Quartiere Murat (Via Sparano)', description: 'Sostituzione integrale della colonna montante in ghisa con nuovi materiali fonoassorbenti in un palazzo d\'epoca.' },
      { type: 'Installazione sistema anticalcare professionale', zone: 'Poggiofranco (Via Camillo Rosalba) whale', description: 'Installazione di un addolcitore a scambio ionico per proteggere i nuovi impianti radianti dall\'acqua dura della Murgia.' },
      { type: 'Riparazione tramite Relining idraulico', zone: 'Bari Vecchia (Strada delle Crociate)', description: 'Risanamento non invasivo (relining) di una vecchia tubazione di scarico che passava sotto la pavimentazione originale in chianche.' },
      { type: 'Manutenzione sistema di sollevamento acque reflue', zone: 'Quartiere Madonnella (Corso Di Cagno Abbrescia)提升', description: 'Sostituzione della pompa di sentina e installazione di sensori anti-allagamento per prevenire le risalite di falda.' },
      { type: 'Efficientamento centrale termica condominiale', zone: 'Quartiere San Paolo (Viale delle Regioni)', description: 'Ricalibrazione dei vasi di espansione e sostituzione circolatori per migliorare l\'efficienza energetica del riscaldamento condominiale.' },
    ]
  },
  'catania': {
    buildingTypes: [
      'Casasemi-indipendenti in pietra lavica e malta di calcinaccio (Fine \'800, tipiche di zone come San Berillo e Picanello)',
      'Palazzi Nobiliari Barocchi con cortili interni e cisterne ipogee (Post-terremoto 1693, Centro Storico/Via Etnea)',
      'Condomini della ricostruzione post-bellica in cemento armato (Anni \'50/\'60, quartieri San Leone e Corso Italia)',
      'Edilizia intensiva popolare ad alta densità (Anni \'70/\'80, Librino e San Giorgio con impianti centralizzati complessi)',
      'Ville Liberty con ampi giardini e impianti di irrigazione ramificati (Inizio \'900, Viale Regina Margherita e zona Ognina)',
    ],
    localProblems: [
      'Corrosione precoce delle tubature dovuta all\'elevata salinità dell\'aria e della falda nelle zone costiere (La Plaia/Ognina)',
      'Ostruzioni da cenere vulcanica dell\'Etna che intasa grondaie, pluviali e pozzetti d\'ispezione dopo ogni parossismo',
      'Infiltrazioni di acqua meteorica dalle \'sciabiche\' (canali di scolo storici) non adeguatamente dimensionate per i nuovi volumi di pioggia tropicale',
      'Danni strutturali alle condotte interrate causati dalle vibrazioni del sottosuolo e dalla natura basaltica del terreno che non ammortizza i movimenti',
      'Elevata durezza dell\'acqua proveniente dai pozzi pedemontani che causa incrostazioni rapide negli scambiatori delle caldaie beretta o junkers molto diffuse in città',
    ],
    climateImpact: 'L\'estrema escursione termica estiva, unita alla \'guazza\' salmastra proveniente dal mare, accelera la corrosione galvanica delle tubazioni esterne e dei raccordi dei climatizzatori. Inoltre, le piogge torrenziali autunnali (i cosiddetti \'flash floods\' etnei) sovraccaricano istantaneamente i sistemi di scarico misti, causando riflussi critici nei piani seminterrati.',
    recentInterventions: [
      { type: 'Espurgo e pulizia pluviali post-eruzione', zone: 'Borgo-Sanzio', description: 'Rimozione di sedimenti di cenere vulcanica consolidata che bloccavano completamente il sistema di scarico di un condominio.' },
      { type: 'Ristrutturazione impianto idrico in palazzo storico', zone: 'Via Crociferi (Centro Storico)', description: 'Sostituzione integrale di colonne di scarico in piombo e ferro con tubazioni in PP silenziate.' },
      { type: 'Protezione anti-allagamento seminterrato', zone: 'Villaggio Santa Maria Goretti (vicino Aeroporto)', description: 'Installazione di un sistema di paratie e valvole di non ritorno per proteggere un garage sotterraneo dagli sversamenti stradali.' },
      { type: 'Decalcificazione impianto termico centralizzato', zone: 'Canalicchio / Via Carnazza Oro', description: 'Bonifica chimica dei circuiti di riscaldamento a causa di eccessivi depositi calcarei che riducevano l\'efficienza dei radiatori.' },
      { type: 'Sostituzione tubazioni esterne anti-corrosione marina', zone: 'San Giovanni Li Cuti / Ognina', description: 'Rifacimento dei raccordi idrici esterni aggrediti dalla salsedine utilizzando acciaio inox AISI 316.' },
    ]
  },
  'venezia': {
    buildingTypes: [
      'Case a schiera in linea del Ghetto (Cannaregio): edifici verticali del XVI secolo con soffitti bassi e vani tecnici angusti.',
      'Palazzi patrizi sul Canal Grande (San Marco/Dorsoduro): architetture gotiche e barocche con fondamenta su pali di legno e scarichi in pietra d\'Istria.',
      'Case popolari IACP della Giudecca: complessi di inizio \'900 con impianti di adduzione in piombo spesso non completamente bonificati.',
      'Edifici del Ventennio a Sant\'Elena: architettura razionalista con impianti centralizzati originali e problematiche di corrosione galvanica.',
      'Casoni orizzontali di Burano e Mazzorbo: abitazioni vivaci con sistemi di smaltimento a filo laguna soggetti alle forti maree.',
    ],
    localProblems: [
      'Corrosione delle braghe di scarico causata dall\'alto contenuto salino delle \'acque alte\' che penetrano nei piani terra.',
      'Intasamento dei gatoli (antichi canali di scolo) dovuto alla sedimentazione di fanghi lagunari e proliferazione di biodeteriogeni.',
      'Difficoltà di installazione di fosse settiche a norma a causa dell\'esiguità degli spazi e della fragilità delle rive.',
      'Rotture da gelo dei contatori acqua posizionati nelle nicchie esterne esposte ai venti gelidi del nord-est (Bora).',
      'Infiltrazioni dalle \'vasche\' di protezione: le barriere contro l\'acqua alta possono cedere, allagando i vani tecnici dei bruciatori.',
    ],
    climateImpact: 'L\'umidità salmastra risale per capillarità nelle murature in mattoni pieni, accelerando la corrosione esterna delle tubazioni in rame e ghisa. Inoltre, le escursioni termiche tra la barena e i canali richiedono coibentazioni specifiche per evitare shock termici alle caldaie esterne durante i picchi di Bora.',
    recentInterventions: [
      { type: 'Rifacimento impianto idrico sanitario', zone: 'Castello (Vicinanza San Francesco della Vigna)', description: 'Sostituzione completa di una dorsale in piombo con multistrato all\'interno di un\'unità abitativa storica del sestiere, garantendo la compatibilità con i muri portanti da 60cm.' },
      { type: 'Manutenzione straordinaria caldaia a condensazione', zone: 'Dorsoduro (Zona Campo Santa Margherita)', description: 'Sostituzione di uno scambiatore a piastre occluso dal calcare e dai residui bituminosi tipici della rete idrica di terraferma convogliata verso le isole.' },
      { type: 'Protezione anti-reflusso acqua alta', zone: 'Cannaregio (Fondamenta de la Misericordia)', description: 'Installazione di valvola unidirezionale a \'clapet\' per impedire il reflusso dell\'acqua di marea negli scarichi domestici al piano terra.' },
      { type: 'Sigillatura passaggi tecnici contro marea eccezionale', zone: 'San Marco (Piazza San Marco e zone limitrofe)', description: 'Impermeabilizzazione dei fori di passaggio dei tubi gas e acqua per evitare l\'ingresso di acqua salmastra durante le maree sostenute.' },
      { type: 'Installazione pompa di sentina a immersione con sensore conduttivo', zone: 'Santa Croce (Zona San Giacomo dell\'Orio)', description: 'Realizzazione di un sistema di sollevamento acque meteoriche per un cortile interno soggetto ad allagamento cronico per ingressione lagunare.' },
    ]
  },
  'verona': {
    buildingTypes: [
      'Case a schiera in tufo e mattoni nel rione di Veronetta (XIX secolo), caratterizzate da scarichi a piombo e tubature in piombo originali spesso murate.',
      'Condomini signorili degli anni \'60 e \'70 in Borgo Trento, con impianti di riscaldamento centralizzato a colonna e radiatori in ghisa ad alta inerzia termica.',
      'Ville Liberty nel quartiere di Valdonega, che presentano spesso diramazioni idriche complesse per la gestione di ampi giardini terrazzati.',
      'Palazzi storici di epoca scaligera nel Centro Storico (ZTL), con spesse mura in pietra che rendono estremamente difficile la mappatura degli impianti senza termocamera.',
      'Edilizia residenziale intensiva del boom economico in Borgo Roma, con frequenti problemi di corrosione galvanica nelle vecchie tubature in ferro zincato.',
    ],
    localProblems: [
      'Incrostazioni calcaree severe (durezza media 30-35°f) che bloccano i filtri dei miscelatori e riducono l\'efficienza delle caldaie domestiche.',
      'Infiltrazioni da risalita nei locali interrati e nelle cantine dei palazzi adiacenti all\'Adige a causa delle variazioni della falda acquifera.',
      'Corrosione delle reti di scarico in ghisa o piombo nei palazzi nobiliari del centro, con conseguenti perdite occulte nei solai in legno.',
      'Necessità di installazione di riduttori di pressione in zona Borgo Venezia per gestire gli sbalzi della rete idrica comunale.',
      'Ostruzioni frequenti delle colonne di scarico condominiali in zona Stadio dovute alla sedimentazione di residui favoriti da pendenze non ottimali.',
    ],
    climateImpact: 'L\'elevata umidità della Valle dell\'Adige, unita alle escursioni termiche invernali che portano il termometro sotto lo zero, mette a dura prova le tubazioni esterne e i contatori non coibentati, sensibili alle gelate. Inoltre, l\'estrema durezza dell\'acqua proveniente dalle falde prealpine accelera la calcificazione di scambiatori e caldaie durante i mesi di picco operativo invernale.',
    recentInterventions: [
      { type: 'Rifacimento centrale termica', zone: 'Borgo Trento', description: 'Sostituzione urgente di un corpo caldaia a condensazione e lavaggio chimico dell\'impianto a causa di ostruzioni da calcare in un palazzo anni \'30.' },
      { type: 'Riparazione perdita idrica sottosuolo', zone: 'Veronetta (via San Vitale) Fine del XIX secolo.', description: 'Ricerca perdita occulta tramite gas tracciante sotto il pavimento in cotto e successivo bypass della tubazione ammalorata.' },
      { type: 'Montaggio addolcitore a scambio ionico', zone: 'Quinzano', description: 'Installazione di un sistema di addolcimento a monte dell\'impianto residenziale per proteggere gli elettrodomestici di una villa singola.' },
      { type: 'Spurgo e videoispezione condotte', zone: 'San Zeno (vicolo Abazia)', description: 'Disostruzione meccanica di una vecchia colonna di scarico in gres mediante sonda ad alta pressione per ripristinare il corretto deflusso.' },
      { type: 'Rifacimento completo bagno e cucina', zone: 'Borgo Milano (Corso Milano)', description: 'Sostituzione integrale di tubature in ferro zincato con multistrato in un appartamento oggetto di ristrutturazione edilizia.' },
    ]
  },
  'messina': {
    buildingTypes: [
      'Palazzine post-terremoto del 1908 (stile Liberty e Eclettico): Caratterizzate da soffitti alti e tubazioni originali in piombo, comuni nel centro storico tra via Garibaldi e via Tommaso Cannizzaro.',
      'Edilizia intensiva degli anni \'70 a ridosso dei torrenti: Condomini multipiano di zone come Giostra o l\'Annunziata, con impianti centralizzati spesso soggetti a corrosione accelerata.',
      'Case basse a schiera dei villaggi rivieraschi: Abitazioni tipiche di Ganzirri e Torre Faro, con impianti esposti alla salsedine e alla risalita di falda dei laghi salmastri.',
      'Residenze moderne a gradoni dei complessi collinari: Edifici recenti sulle colline di San Michele o Curcuraci, con sistemi di pompaggio complessi per superare i forti dislivelli tecnici.',
      'Case popolari dell\'IACP a Camaro e Bordonaro: Strutture in cemento armato degli anni \'50-\'60 con reti idriche intercomunicanti spesso soggette a perdite occulte significative.',
    ],
    localProblems: [
      'Corrosione da correnti vaganti causate dalla linea tranviaria su via La Farina e viale della Libertà.',
      'Infiltrazioni saline nelle condotte interrate dei villaggi della zona Nord (Riviera) a causa della vicinanza al mare.',
      'Accumuli di calcare e sedimenti ferrosi derivanti dalla rete idrica del Fiumefreddo che intasano scambiatori e filtri.',
      'Cedimenti delle tubazioni di scarico causati dal micro-assestamento dei terreni alluvionali vicino ai torrenti tombinati.',
      'Pressione idrica incostante che richiede l\'installazione di serbatoi di accumulo (autoclavi) con regolatori di pressione specifici per evitare colpi d\'ariete.',
    ],
    climateImpact: 'La fortissima escursione termica tra le colline Peloritane e la costa, unita all\'alto tasso di umidità salmastra dello Stretto, accelera la carbonatazione del calcestruzzo copritubo e la corrosione galvanica delle giunzioni. Inoltre, le piogge alluvionali brevi e intense mettono regolarmente in pressione le condotte di scarico miste nelle zone di fondo valle, causando frequenti riflussi idrici nei piani terra.',
    recentInterventions: [
      { type: 'Rifacimento colonna idrica condominiale', zone: 'Quartiere Lombardo (vicino Viale Europa)', description: 'Sostituzione integrale della colonna montante in multistrato e installazione di riduttore di pressione per proteggere l\'impianto dai picchi notturni.' },
      { type: 'Riparazione condotta fognaria sottosuolo', zone: 'Ganzirri', description: 'Videoispezione e risanamento non invasivo (relining) di uno scarico lesionato dalla salsedine in una villa fronte lago.' },
      { type: 'Installazione sistema trattamento acque', zone: 'Viale San Martino (Centro)', description: 'Installazione di un sistema di filtraggio a stadi e addolcitore magnetico per proteggere una caldaia a condensazione dai detriti della rete cittadina.' },
      { type: 'Riparazione idrica d\'urgenza', zone: 'Viale della Libertà (zona Fiera)', description: 'Consolidamento di una tubazione di mandata che presentava continue perdite dovute alle vibrazioni del passaggio del tram.' },
      { type: 'Adeguamento sistema anti-allagamento seminterrato', zone: 'Contemplazione', description: 'Installazione di pompe di sollevamento con valvole di non ritorno per prevenire l\'allagamento dei locali tecnici durante le mareggiate.' },
    ]
  },
  'padova': {
    buildingTypes: [
      'Case a schiera Liberty in zona Città Giardino (anni \'20), con impianti originali spesso in piombo o ferro galvanizzato e scarichi a terra.',
      'Palazzi storici del Centro (Ghetto e Piazze) del XIV-XVII secolo, con muri portanti in mattoni pieni di enorme spessore che complicano il passaggio di nuove dorsali.',
      'Condomini anni \'60 e \'70 dell\'Arcella, caratterizzati da colonne di scarico in ghisa ormai soggette a corrosione e impianti centralizzati a colonna montante.',
      'Ville venete e case padronali di fine \'800 a ridosso del Bacchiglione (zona Bassanello), con problemi di risalita capillare e vecchie reti di drenaggio esterno.',
      'Moderni complessi residenziali a basso consumo in zona Net Center/Padova Est, con impianti radianti a pavimento e sistemi di ricircolo aria (VMC) integrati.',
    ],
    localProblems: [
      'Elevata durezza dell\'acqua proveniente dai pozzi di Camazzole, che causa incrostazioni calcaree rapide su scambiatori di caldaie e resistenze elettriche.',
      'Corrosione galvanica accelerata nelle zone con falda acquifera alta (zona Guizza), che intacca le tubature interrate non adeguatamente protette.',
      'Riflusso della rete fognaria durante le "bombe d\'acqua" estive in quartieri con reti miste vecchie come la zona del Bassanello.',
      'Ostruzione frequente dei sifoni per accumulo di biofilm batterico favorito dalle temperature medie elevate dei sottosuoli urbani padovani.',
      'Perdite occulte nelle vecchie condotte in cemento-amianto o ferro nero ancora presenti in molti scantinati del quartiere Forcellini.',
    ],
    climateImpact: 'L\'elevata umidità della Pianura Padana e la vicinanza ai fiumi Bacchiglione e Brenta causano una forte condensa sulle tubazioni non isolate nelle centrali termiche. Inoltre, le gelate improvvise ma intense di gennaio mettono a serio rischio le condutture esterne dei giardini nelle aree meno urbanizzate come Granze o Ponte di Brenta.',
    recentInterventions: [
      { type: 'Rifacimento colonna di scarico', zone: 'Arcella (Via Tiziano Aspetti)', description: 'Sostituzione integrale di una colonna di scarico in ghisa fessurata con tubazioni in PP fonoisolante in un condominio degli anni \'60.' },
      { type: 'Trattamento acque e decalcificazione', zone: 'Città Giardino (Via Marghera)', description: 'Installazione di un addolcitore a scambio ionico ad alta efficienza per proteggere l\'impianto radiante di una monofamiliare.' },
      { type: 'Ricerca perdita non distruttiva', zone: 'Centro Storico (Via del Santo)', description: 'Bonifica di una perdita occulta individuata tramite geofono sotto il pavimento in marmo di un palazzo nobiliare.' },
      { type: 'Protezione antiallagamento', zone: 'Bassanello (Via Adriatica)', description: 'Installazione di valvola antiriflusso automatica per prevenire allagamenti causati dal sovraccarico della rete fognaria comunale.' },
      { type: 'Riqualificazione energetica centrale termica', zone: 'Forcellini (Via Nazareth)', description: 'Sostituzione di un vecchio generatore a gasolio con una pompa di calore aria-acqua e integrazione con impianto solare termico.' },
    ]
  },
  'trieste': {
    buildingTypes: [
      'Case Tergestine del Borgo Teresiano (XVIII-XIX sec): magazzini e abitazioni con fondamenta su palificazioni in aree bonificate.',
      'Palazzi Neoclassici e Liberty del Borgo Franceschino: ampi volumi con colonne montanti in piombo o ghisa originale.',
      'Case popolari di epoca fascista a Ponziana e San Giacomo: edifici in linea con impianti centralizzati del dopoguerra.',
      'Ville storiche con parchi nel rione di San Vito: architettura eclettica con sistemi di drenaggio acque meteoriche complessi.',
      'Condomini moderni anni \'60-\'70 sulle pendici di Opicina e Conconello: architettura a terrazze che segue l\'orografia carsica.',
    ],
    localProblems: [
      'Incrostazioni di calcare massicce dovute alla durezza estrema dell\'acqua proveniente dal Carso.',
      'Sifonamento causato dalle forti raffiche di Bora che creano sbalzi di pressione nelle colonne di scarico degli edifici alti.',
      'Intrusione di acqua salmastra e allagamenti delle cantine nei palazzi delle Rive durante i fenomeni di Acqua Alta.',
      'Corrosione galvanica accelerata negli impianti misti dei palazzi storici del centro.',
      'Rotture dei contatori e delle tubature esterne esposte sul Carso triestino durante i picchi di gelo invernale.',
    ],
    climateImpact: 'La Bora scura e quella chiara, che può superare i 150 km/h, accelera il raffreddamento delle tubazioni esterne ed esposte, rendendo l\'isolamento termico cruciale per prevenire rotture da gelo improvviso. Inoltre, l\'elevata salinità portata dagli spruzzi marini (mareggiata) nelle zone delle Rive causa una corrosione accelerata dei componenti idraulici esterni in rame e acciaio.',
    recentInterventions: [
      { type: 'Rifacimento colonna montante', zone: 'Borgo Teresiano', description: 'Rifornimento completo delle dorsali idriche per risolvere perdite occulte in un palazzo neoclassico.' },
      { type: 'Trattamento acque condominiale', zone: 'Roiano', description: 'Installazione di addolcitori a scambio ionico ad alta capacità per proteggere le caldaie condominiali dal calcare carsico.' },
      { type: 'Pronto intervento gelo', zone: 'Basovizza (Altopiano Carsico)', description: 'Intervento d\'urgenza per la sostituzione di un contatore esploso a causa del gelo in una villetta vicino alla zona del Sincrotrone.' },
      { type: 'Adeguamento rete antiallagamento', zone: 'Rive / Cavana', description: 'Installazione di valvole di non ritorno e pompe di sentina per proteggere i locali interrati dalle mareggiate.' },
      { type: 'Ristrutturazione impianto sanitario interno', zone: 'San Giacomo', description: 'Sostituzione delle vecchie tubature in piombo con sistemi in multistrato in un appartamento d\'epoca.' },
    ]
  },
  'taranto': {
    buildingTypes: [
      'Palazzi Umbertini del Borgo Nuovo (fine \'800): ampie metrature e soffitti a volta, caratterizzati da colonne di scarico in ghisa originali lungo Via D\'Aquino.',
      'Case a corte dell\'Isola (Città Vecchia): strutture medievali e rinascimentali con cisterne ipogee scavate nel carparo, spesso soggette a infiltrazioni di risalita.',
      'Condomini anni \'60/\'70 di Taranto 2: architettura intensiva con impianti centralizzati originariamente progettati per il teleriscaldamento, oggi spesso convertiti.',
      'Ville costiere di San Vito e Talsano: edilizia residenziale bassa degli anni \'80 con sistemi di sollevamento acque reflue necessari per la conformazione del terreno.',
      'Palazzine IACP del Quartiere Tamburi: edilizia popolare del dopoguerra con problemi cronici di corrosione causati dalla vicinanza alle polveri industriali e all\'umidità marina.',
    ],
    localProblems: [
      'Corrosione accelerata da aerosol marino e depositi di polveri minerali (area Tamburi/Statte).',
      'Eccessivo calcare dell\'acqua proveniente dall\'Acquedotto Pugliese, che ostruisce rapidamente scambiatori di calore e soffioni.',
      'Risalita di acqua salmastra nelle fondamenta degli edifici della Città Vecchia per effetto delle maree del Mar Piccolo.',
      'Cedimento strutturale di vecchie condotte in piombo ancora presenti in alcuni stabili del Borgo.',
      'Intasamento delle griglie di drenaggio dovuto ai sedimenti di calcare e sabbia trasportati dai forti temporali autunnali.',
    ],
    climateImpact: 'L\'alto tasso di salinità dell\'aria, accentuato dal vento di Scirocco che soffia dal Mar Ionio, accelera drasticamente la corrosione galvanica dei raccordi esterni e delle unità esterne delle pompe di calore. Inoltre, le ondate di calore estive tarantine causano la dilatazione termica delle tubazioni in PVC a vista, comuni sui terrazzi, provocando frequenti disallineamenti e perdite.',
    recentInterventions: [
      { type: 'Rifacimento colonna di scarico condominiale', zone: 'Borgo Umbertino (Via Anfiteatro)', description: 'Rimozione di vecchie tubazioni in ghisa e installazione di nuovi scarichi in polipropilene insonorizzato in un palazzo storico.' },
      { type: 'Installazione caldaia e trattamento acque', zone: 'San Vito (Viale del Tramonto)', description: 'Sostituzione integrale di una caldaia a condensazione corrosa dalla salsedine con trattamento protettivo per scambiatori.' },
      { type: 'Risanamento fognario no-dig', zone: 'Quartiere Italia (Viale Magna Grecia)', description: 'Videoispezione e risanamento non invasivo (relining) di una condotta fognaria danneggiata dalle radici di pini marittimi.' },
      { type: 'Impermeabilizzazione e drenaggio ipogeo', zone: 'Città Vecchia (Via Duomo)', description: 'Bonifica di un locale tecnico allagato per infiltrazione dalla falda ipogea e installazione pompa a immersione automatica.' },
      { type: 'Montaggio sistema addolcimento condominiale', zone: 'Taranto 2 (Via Lago di Garda)', description: 'Installazione di addolcitori a scambio ionico per proteggere gli impianti di un intero stabile dalla durezza estrema dell\'acqua locale.' },
    ]
  },
  'brescia': {
    buildingTypes: [
      'Palazzi nobiliari del centro storico (es. Via Musei), con tubature in piombo stratificate e cortili interni con cisterne medievali.',
      'Condomini "Ina-Casa" di fine anni \'50 nel quartiere Mompiano, caratterizzati da colonne di scarico in ghisa ormai corrose.',
      'Villette Liberty di inizio \'900 in zona Viale Venezia, con impianti di riscaldamento a radiatori in ghisa a colonna alta.',
      'Edilizia intensiva del quartiere San Polo (Comparti), con sistemi di teleriscaldamento centralizzato e problematiche di bilanciamento termico.',
      'Case a corte di fine \'800 a Sant\'Eustacchio, spesso soggette a infiltrazioni di risalita dalle vecchie scuderie riconvertite.',
    ],
    localProblems: [
      'Eccessiva durezza dell\'acqua proveniente dai pozzi di pianura (fino a 35-40°F), che causa incrostazioni rapide in caldaie e scambiatori.',
      'Corrosione galvanica nei palazzi del centro storico per la coesistenza di tubi in rame nuovi e vecchie condotte in ferro/piombo.',
      'Ostruzioni saline nei filtri degli aeratori a causa dei sedimenti calcarei tipici della rete idrica comunale (A2A).',
      'Perdite occulte nelle linee di diramazione dei giardini privati in zona Borgo Trento, dovute a movimenti del terreno argilloso.',
      'Malfunzionamento dei gruppi pompa negli interrati dei quartieri a sud (Chiesanuova) per l\'innalzamento della falda acquifera.',
    ],
    climateImpact: 'Le forti escursioni termiche tipiche della zona prealpina bresciana e l\'umidità stagnante della vicina Bassa causano frequenti shock termici alle tubazioni esterne non coibentate. Inoltre, i temporali estivi violenti (cosiddette \'bombe d\'acqua\') sovraccaricano regolarmente i vecchi sistemi di smaltimento acque bianche del centro, rendendo cruciale l\'installazione di valvole di non ritorno.',
    recentInterventions: [
      { type: 'Rifacimento colonna scarico', zone: 'Quartiere Mompiano (Via Ambaraga)', description: 'Sostituzione urgente della vecchia colonna di scarico in cemento-amianto con tubazioni in PP insonorizzato.' },
      { type: 'Risanamento conservativo idraulico', zone: 'Centro Storico (Contrada Santa Chiara)', description: 'Bonifica impianto idraulico di una dimora storica con eliminazione delle ultime sezioni in piombo e installazione addolcitore a scambio ionico.' },
      { type: 'Efficientamento energetico', zone: 'Quartiere Crocifissa di Rosa', description: 'Distacco dall\'impianto condominiale centralizzato e creazione di impianto autonomo a pompa di calore per attico.' },
      { type: 'Sostituzione elettropompa sommersa', zone: 'Quartiere Chiesanuova (Via Labirinto)', description: 'Intervento d\'urgenza per allagamento garage dovuto al blocco della pompa di sentina post-acquazzone.' },
      { type: 'Installazione impianto idrico completo', zone: 'Quartiere Villaggio Badia', description: 'Rete di distribuzione acqua sanitaria con tubi multistrato per nuovo complesso residenziale ecosostenibile.' },
    ]
  },
  'parma': {
    buildingTypes: [
      'Case a schiera in Oltretorrente: nuclei storici con tubature in piombo tardo-ottocentesche e collettori in comune tra più civici.',
      'Condomini anni \'60/\'70 in zona Pablo: strutture con scarichi in fibrocemento o ghisa, spesso soggetti a corrosione interna e infiltrazioni nei solai.',
      'Palazzi nobiliari del centro storico (area Duomo/Piazza Garibaldi): edifici di epoca farnesiana con sistemi di adduzione misti e scarichi verticali incassati in muri portanti di grande spessore.',
      'Ville liberty in zona Cittadella: residenze di pregio del primo \'900 con rubinetteria d\'epoca e impianti di riscaldamento a radiatori in ghisa ornamentale.',
      'Quadrifogli e nuove costruzioni a Parma Mia: edifici moderni ad alta efficienza con riscaldamento a pavimento e sistemi di ricircolo dell\'acqua calda sanitaria.',
    ],
    localProblems: [
      'Elevata durezza dell\'acqua proveniente dai pozzi di Marore e Pannocchia, che causa incrostazioni rapide su scambiatori e resistenze.',
      'Ristagno e cattivi odori dalle reti fognarie nei periodi di bassa pressione atmosferica tipici della "bassa" parmense.',
      'Cedimenti differenziali delle tubature interrate dovuti alla natura argillosa del suolo in zona San Lazzaro.',
      'Corrosione galvanica nei raccordi di passaggio tra vecchie colonne in ferro e nuovi impianti in multistrato nei palazzi di via d\'Azeglio.',
      'Allagamenti di taverne e cantine nel quartiere Montanara durante le piene del torrente Baganza per riflusso dalle condotte.',
    ],
    climateImpact: 'Le forti escursioni termiche della pianura parmense, con umidità stagnante in inverno, accelerano la condensa nelle caldaie a condensazione non correttamente isolate. Inoltre, i periodi di siccità prolungata seguiti da bombe d\'acqua mettono a dura prova le pompe di sentina dei numerosi garage interrati nei quartieri sud.',
    recentInterventions: [
      { type: 'Riparazione perdita occulta e rifacimento scarichi', zone: 'Oltretorrente (Via Bixio)', description: 'Sostituzione urgente di una colonna di scarico in ghisa lesionata che causava infiltrazioni nel negozio sottostante.' },
      { type: 'Trattamento acque e anticalcare', zone: 'Quartiere Pablo (Via Savani)', description: 'Installazione di un addolcitore a scambio ionico ad alta capacità per proteggere gli impianti di un intero condominio anni \'70.' },
      { type: 'Ristrutturazione idraulica completa', zone: 'San Lazzaro (Via Emilia Est)', description: 'Rifacimento completo di due bagni con installazione di cassette da incasso silenziate e tubazioni in polipropilene termosaldato.' },
      { type: 'Efficientamento energetico impianto termico', zone: 'Cittadella (Viale Solferino)', description: 'Sostituzione di un vecchio generatore a gasolio con pompa di calore aria-acqua e integrazione con impianto esistente.' },
      { type: 'Adeguamento sistema anti-allagamento', zone: 'Quartiere Montanara (Via Langhirano)', description: 'Installazione di valvole di non ritorno e potenziamento elettropompe per prevenire allagamenti da reflusso fognario.' },
    ]
  },
  'prato': {
    buildingTypes: [
      'Case di corte e terratetti operai di fine \'800 nel quartiere di San Fabiano, caratterizzati da tubature in piombo originali e scarichi a caduta sottodimensionati.',
      'Edifici industriali dismessi e riconvertiti degli anni \'50 e \'60 nell\'area del Macrolotto Zero, con impianti di scarico ad alta portata pensati originariamente per il comparto tessile.',
      'Condomini intensivi degli anni \'70 nella zona di Galciana e San Paolo, spesso affetti da problemi di corrosione galvanica nelle colonne montanti in ferro zincato.',
      'Ville storiche del XV-XVII secolo sulle colline di Figline e della Castellina, che richiedono manutenzione specialistica per sistemi di raccolta acque piovane e cisterne d\'epoca.',
      'Residenze moderne ad alta efficienza energetica nel comparto Paperino e San Giorgio, dotate di sistemi radianti a pavimento e pompe di calore integrate.',
    ],
    localProblems: [
      'Alcalinità dell\'acqua elevata proveniente dalle fonti locali, che causa occlusioni calcaree repentine su scambiatori e caldaie.',
      'Sedimenti ferrosi residui derivanti dalla vecchia rete di distribuzione in zone come Santa Lucia.',
      'Allagamenti delle cantine e dei garage seminterrati nei pressi del Viale Leonardo da Vinci (declassata) per risalita della falda.',
      'Ostruzioni ricorrenti da residui fibrosi tessili nelle reti fognarie del comparto industriale storico.',
      'Pressione di rete instabile durante i picchi di prelievo estivo nelle zone collinari alte come Coiano.',
    ],
    climateImpact: 'La forte escursione termica tipica della piana pratese, con inverni rigidi soggetti a gelate e umidità stagnante, mette a dura prova le tubature esterne non coibentate lungo il Bisenzio. Inoltre, le piogge torrenziali autunnali saturano rapidamente il reticolo dei \'fossi\' storici, causando frequenti riflussi nelle reti fognarie private a causa della pendenza ridotta del suolo.',
    recentInterventions: [
      { type: 'Adeguamento idraulico antiallagamento', zone: 'Chiesanuova', description: 'Rifacimento integrale del sistema di scarico e installazione di una pompa di sollevamento fognario in un seminterrato a rischio esondazione.' },
      { type: 'Risanamento impianto condominiale e trattamento acque', zone: 'Piazza dell\'Università (Centro Storico)', description: 'Sostituzione urgente di una colonna montante ammalorata e installazione di un addolcitore a scambio ionico per proteggere i nuovi impianti.' },
      { type: 'Ricerca e riparazione perdite idriche', zone: 'Grignano', description: 'Riparazione di una perdita occulta su tubazione interrata in acciaio mediante tecnica non invasiva.' },
      { type: 'Efficientamento termico residenziale', zone: 'La Pietà', description: 'Conversione di un vecchio impianto a radiatori in un sistema a pannelli radianti con installazione di caldaia a condensazione ad alta efficienza.' },
      { type: 'Manutenzione straordinaria scarichi industriali', zone: 'Iolo (Macrolotto 1)', description: 'Pulizia meccanica e chimica di un bypass industriale intasato da residui di lavorazione tessile.' },
    ]
  },
  'modena': {
    buildingTypes: [
      'Palazzi nobiliari del centro storico (es. Via Taglio/Corso Canalgrande): XVII-XVIII secolo con soffitti a cassettoni e vecchie colonne di scarico in ghisa murate.',
      'Case a schiera dei villaggi operai Anni \'50 (Zona Sacca/Crocetta): architettura razionalista post-bellica con impianti originali in piombo spesso soggetti a corrosione.',
      'Condomini anni \'70 del quartiere Musicisti: edifici intensivi con riscaldamento centralizzato a colonne montanti e sottostazioni di teleriscaldamento Hera.',
      'Villette signorili di fine anni \'80 a Modena Est: strutture in mattoni faccia a vista con impianti in rame e primi sistemi di irrigazione automatizzata per i giardini.',
      'Nuove residenze Green del quartiere Sant’Agnese Nuova: edifici in classe A4 con riscaldamento a pavimento, pompe di calore e sistemi di recupero acque grigie.',
    ],
    localProblems: [
      'Calcare estremamente aggressivo dovuto alla durezza dell\'acqua prelevata dalle falde locali, che ostruisce rapidamente scambiatori di calore e soffioni.',
      'Fenomeni di corrosione galvanica e pitting su vecchie tubazioni in ferro zincato, frequenti nei quartieri storici come San Faustino.',
      'Ritorno di reflui fognari durante i violenti temporali estivi nelle zone basse come la Madonnina, per insufficienza temporanea della rete di drenaggio.',
      'Perdite occulte e infiltrazioni nei seminterrati dei palazzi vicino al passaggio di canali tombati (es. Canale Naviglio).',
      'Ostruzioni da sedimenti sabbiosi nei filtri degli impianti di irrigazione alimentati da pozzi privati molto comuni nella zona Buon Pastore.',
    ],
    climateImpact: 'Le forti escursioni termiche tipiche della pianura modenese, con estati torride e inverni rigidi e umidi, accelerano la dilatazione termica delle tubazioni esterne e stressano i gruppi frigoriferi. Inoltre, l\'elevata umidità della zona favorisce la condensa sulle tubazioni del freddo non perfettamente coibentate, causando ammaloramenti nei cartongessi e macchie di muffa localizzate.',
    recentInterventions: [
      { type: 'Ristrutturazione impianto idrico-sanitario', zone: 'Quartiere Buon Pastore', description: 'Rifacimento completo del bagno con sostituzione delle vecchie tubature in piombo e installazione di piatti doccia a filo pavimento.' },
      { type: 'Riqualificazione centrale termica', zone: 'Zona Vaciglio/Paganine', description: 'Sostituzione di una vecchia caldaia a gasolio con un moderno sistema ibrido caldaia a condensazione e pompa di calore per migliorare l\'efficienza energetica.' },
      { type: 'Installazione dispositivo anti-riflusso fognario', zone: 'Quartiere Madonnina', description: 'Installazione di una valvola di non ritorno di grandi dimensioni per prevenire allagamenti da reflui fognari durante le piogge intense.' },
      { type: 'Trattamento acque e decalcificazione', zone: 'Villaggio Giardino', description: 'Installazione di un addolcitore a scambio ionico ad alta resa per proteggere gli elettrodomestici di un condominio di 12 unità.' },
      { type: 'Ricerca perdita occulta con tecnologia acustica', zone: 'Quartiere Musicisti (Via Puccini)', description: 'Ricerca perdita non distruttiva tramite geofono su una linea di adduzione esterna che causava bollette elevate.' },
    ]
  },
  'reggio-calabria': {
    buildingTypes: [
      'Palazzi in stile Liberty reggino (Ricostruzione post-1908) con imponenti facciate decorate nel Centro Storico.',
      'Case a schiera e tessuti densi del quartiere Gebbione (anni \'60-\'70) con impianti originari in piombo o ferro zincato.',
      'Edilizia residenziale pubblica di Arghillà, caratterizzata da sistemi di distribuzione idrica complessi e spesso degradati.',
      'Ville e strutture indipendenti di lusso sulla collina di Pentimele e Cannavò, con impianti di irrigazione e autoclavi potenziate.',
      'Complessi condominiali moderni con facciate in cortina nella zona di Viale Calabria e Modena, dotati di sistemi di riscaldamento centralizzati a gas.',
    ],
    localProblems: [
      'Corrosione galvanica accelerata dall\'elevata salinità dell\'aria marina, specialmente sul Lungomare Falcomatà.',
      'Ostruzioni da calcare ionico molto duro proveniente dalle falde aspromontane che alimentano la rete cittadina.',
      'Cedimenti strutturali delle condotte sotterranee causati dalla natura sismica del terreno e dai micro-assestamenti nell\'area dello Stretto.',
      'Fenomeni di "colpo d\'ariete" frequenti dovuti all\'irregolarità della pressione idrica erogata dai serbatoi comunali (es. Trabocchetto).',
      'Intrusione di radici di alberi secolari e piante tropicali nelle tubazioni di scarico vecchie nel quartiere di Condera.',
    ],
    climateImpact: 'Il microclima di Reggio, influenzato dalle correnti dello Stretto, espone le tubazioni esterne a una forte corrosione salina (nebbino). Inoltre, le ondate di calore prolungate causano stress termico ai serbatoi di accumulo sui tetti, accelerando la proliferazione algale e il deterioramento delle guarnizioni.',
    recentInterventions: [
      { type: 'Rifacimento impianto idrico verticale', zone: 'Centro Storico (Via Giulia)', description: 'Sostituzione integrale della colonna montante ammalorata e installazione di addolcitore d\'acqua in un condominio degli anni \'30.' },
      { type: 'Ricerca e riparazione perdita idrica sottosuolo', zone: 'Pellaro', description: 'Riparazione di una perdita occulta nel giardino privato causata dal cedimento del terreno sabbioso tipico della zona costiera.' },
      { type: 'Manutenzione gruppo autoclave professionale', zone: 'Sbarre Centrali', description: 'Sostituzione pompa di sollevamento e autoclave per garantire pressione costante ai piani alti durante i cali di pressione estivi.' },
      { type: 'Impermeabilizzazione e spurgo pluviali', zone: 'Eremo', description: 'Rimozione di infiltrazioni capillari provenienti dal lastrico solare e ripristino scarichi piovani ostruiti da aghi di pino.' },
      { type: 'Efficientamento energetico idrosanitario', zone: 'Gallico Marina', description: 'Installazione di scaldabagni a pompa di calore per migliorare l\'efficienza energetica in un piccolo complesso indipendente.' },
    ]
  },
  'reggio-emilia': {
    buildingTypes: [
      'Case a schiera in mattoni faccia a vista del Villaggio Architetti (anni \'50-\'60), con impianti radianti originali spesso da rifare.',
      'Palazzi nobiliari del centro storico (Corso Garibaldi/Via Emilia) con murature in laterizio di grande spessore e condutture in piombo o ferro galvanizzato pre-belliche.',
      'Condomini intensivi di Via Gandhi e quartiere Rosta Nuova, caratterizzati da colonne di scarico in fibro-cemento e riscaldamento centralizzato a colonne montanti.',
      'Case coloniche della "Bassa" reggiana (zona Pratofontana), con impianti di approvvigionamento tramite pozzi privati e problemi di risalita capillare.',
      'Ville Liberty della Zona Mirabello, con distribuzioni idriche complesse e necessità di integrazione tra estetica storica e domotica moderna.',
    ],
    localProblems: [
      'Elevata durezza dell\'acqua proveniente dai pozzi di pianura, con conseguente rapida calcificazione di caldaie e scambiatori di calore.',
      'Corrosione galvanica nelle vecchie tubature in ferro dei quartieri operai storici a causa di mancata messa a terra degli impianti.',
      'Allagamenti di scantinati e garage nel quartiere Canalina dovuti a sovraccarico della rete fognaria durante i "bombe d\'acqua" estive.',
      'Ostruzioni da sedimenti argillosi e sabbiosi tipici dei prelievi di falda nelle zone periferiche verso San Bartolomeo.',
      'Perdite occulte nelle reti interrate dei complessi artigianali di Villaggio Crostolo per assestamenti del terreno argilloso.',
    ],
    climateImpact: 'L\'elevata umidità della Pianura Padana e le forti escursioni termiche reggiane mettono a dura prova le coibentazioni delle tubazioni esterne, mentre le gelate improvvise possono causare rotture nei contatori non protetti delle abitazioni isolate. In estate, le ondate di calore rendono critico il raffrescamento idronico, richiedendo deumidificatori efficienti per evitare la condensa sui pavimenti.',
    recentInterventions: [
      { type: 'Rifacimento colonna di scarico', zone: 'Rosta Nuova', description: 'Sostituzione completa del sistema di scarico in ghisa con tubazioni fonoassorbenti in triplo strato.' },
      { type: 'Trattamento acque e anticalcare', zone: 'Mancasale (Zona Industriale)', description: 'Installazione addolcitore a scambio ionico ad alta efficienza per proteggere elettrodomestici e caldaia a condensazione.' },
      { type: 'Riparazione tubazione storica', zone: 'Centro Storico (Zona Piazza Fontanesi)', description: 'Risanamento non invasivo (relining) di una storica condotta di adduzione sotto pavimentazione protetta.' },
      { type: 'Efficientamento energetico idraulico', zone: 'Sesso (Frazione Nord)', description: 'Convertito il vecchio impianto a radiatori in un sistema ibrido con pompa di calore e ventilcoltori per gestione caldo/freddo.' },
      { type: 'Adeguamento fognario anti-allagamento', zone: 'Quartiere Canalina (zona Parco delle Caprette)', description: 'Installazione di valvole di non ritorno e pompe di sollevamento per prevenire il reflusso fognario nei locali interrati.' },
    ]
  },
  'perugia': {
    buildingTypes: [
      'Case a torre e palazzi nobiliari medievali del Centro Storico (Rione Porta Sole), caratterizzati da mura in pietra massiccia e spazi angusti.',
      'Condomini anni \'60 e \'70 di Elce e Case Bruciate, con impianti centralizzati in ferro e montanti spesso ammalorati.',
      'Villette singole e bifamiliari in stile razionalista degli anni \'50 nel quartiere di Santa Lucia e filosofi.',
      'Edilizia popolare del Dopoguerra a Fontivegge, soggetta a forti vibrazioni a causa della vicinanza alla ferrovia e al minimetro.',
      'Casali rurali recuperati nelle frazioni collinari come l\'Area del Monte Tezio, con impianti di approvvigionamento idrico autonomi (pozzi).',
    ],
    localProblems: [
      'Elevata durezza dell\'acqua proveniente dai bacini locali, che causa occlusioni calcaree precoci negli scambiatori delle caldaie beretta e baxi molto diffuse in città.',
      'Corrosione galvanica nei palazzi di Corso Vannucci dovuta alla convivenza di vecchie tubature in piombo e nuovi raccordi in rame o multistrato.',
      'Pressioni idriche incostanti dovute ai dislivelli altimetrici tra la zona alta (centro) e le zone a valle (Ponte San Giovanni).',
      'Infiltrazioni meteoriche nei "fondi" medievali causate dal drenaggio inefficiente delle pendenze stradali in pietra serena e travertino.',
      'Cedimenti dei collettori fognari in muratura nelle zone di San Francesco al Prato a causa del dilavamento del terreno sottostante.',
    ],
    climateImpact: 'L\'escursione termica tra le zone collinari e la Valle Umbra, unita all\'alto tasso di umidità della piana di Fontignano, causa forti fenomeni di condensa nelle tubature esterne. In inverno, le gelate improvvise tipiche del vento di Tramontana che spira dai valichi appenninici mettono a serio rischio i contatori non protetti e le tubature interrate a bassa profondità nel terreno calcareo.',
    recentInterventions: [
      { type: 'Rifacimento colonna di scarico e adduzione', zone: 'Case Bruciate', description: 'Sostituzione integrale della colonna montante in un condominio degli anni \'70 per frequenti perdite ed ossidazione dei tubi in ferro.' },
      { type: 'Trattamento acque e anticalcare', zone: 'Quartiere Filosofi', description: 'Installazione di un addolcitore a scambio ionico per proteggere i circuiti di una villa d\'epoca soggetta a calcare estremo.' },
      { type: 'Risanamento fognario non invasivo', zone: 'Corso Bersaglieri (Porta Pesa)', description: 'Videoispezione e risanamento con calza (relining) di una vecchia condotta fognaria passante sotto un cortile del \'400.' },
      { type: 'Riparazione urgente rottura da gelo', zone: 'Monte Malbe', description: 'Messa in sicurezza di un impianto idrico esterno ghiacciato e scoppiato a causa della tramontana invernale.' },
      { type: 'Efficientamento energetico idraulico', zone: 'Elce (vicino zona universitaria)', description: 'Modernizzazione della centrale termica con passaggio a pompa di calore in un edificio scolastico riconvertito.' },
    ]
  },
  'ravenna': {
    buildingTypes: [
      'Case di Borgo dell\'Ottocento (es. zona Borgo San Biagio): edifici a schiera con murature portanti in mattoni pieni e impianti idraulici originali spesso in piombo o ferro zincato.',
      'Condomini anni \'60 e \'70 del Quartiere San Giuseppe (Ex Villaggio Anic): architettura razionalista legata al boom industriale, con colonne di scarico centralizzate soggette a corrosione galvanica.',
      'Palazzi Storici Bizantini e Rinascimentali (Centro Storico - via Diaz, via di Roma): edifici con vincoli della Soprintendenza che richiedono tecniche di relining per non intaccare le strutture antiche.',
      'Villette monofamiliari anni \'80 a Ravenna Sud (quartiere Galilei): tipiche costruzioni con interrati e taverne, particolarmente esposte al rischio di risalita delle acque di falda.',
      'Residenze balneari di Marina di Ravenna (anni \'50-\'60): strutture soggette ad aerosol marino e salsedine, con estreme necessità di protezione per i componenti esterni come caldaie e rubinetterie.',
    ],
    localProblems: [
      'Corrosione da correnti vaganti nelle zone industriali e limitrofe al porto, che perforano i tubi in rame sotterranei.',
      'Infiltrazioni di acqua salmastra nelle condutture di scarico seminterrate nelle zone vicine al Candiano e alla Darsena.',
      'Eccessiva durezza dell\'acqua (superiore ai 30° francesi) proveniente dai pozzi locali, che causa occlusioni calcaree repentine in scambiatori e soffioni.',
      'Cedimenti strutturali delle vecchie tubazioni in gres dovuti alla natura argillosa e instabile del terreno ravennate (subsidenza).',
      'Allagamenti dei vani tecnici interrati causati dall\'innalzamento della falda acquifera durante i periodi di piogge persistenti e alta marea.',
    ],
    climateImpact: 'L\'altissima umidità relativa di Ravenna e la vicinanza alla costa accelerano i processi di ossidazione delle staffe di fissaggio e dei raccordi. Inoltre, l\'elevata salinità dell\'aria nei Lidi provoca il deterioramento precoce delle scocche metalliche delle caldaie a condensazione installate esternamente senza protezione.',
    recentInterventions: [
      { type: 'Rifacimento colonna scarico bagno', zone: 'Centro Storico (vicinanze Basilica di San Vitale)', description: 'Sostituzione urgente di una colonna montante ammalorata dal calcare in un palazzo dei primi del \'900.' },
      { type: 'Installazione sistema anti-allagamento', zone: 'Quartiere Nullo Baldini', description: 'Installazione di una pompa di sentina con sensore di allagamento per proteggere la centrale termica interrata dopo una risalita della falda.' },
      { type: 'Manutenzione straordinaria caldaia e trattamento acque', zone: 'Classe (vicino alla Basilica)', description: 'Sostituzione scambiatore di calore primario e installazione addolcitore a polifosfati per contrastare l\'acqua dura della zona.' },
      { type: 'Ristrutturazione idraulica completa', zone: 'Borgo San Rocco', description: 'Rimozione di vecchie tubature in piombo e rifacimento impianto con multistrato in un appartamento d\'epoca.' },
      { type: 'Intervento anticorrosivo marino', zone: 'Marina di Ravenna (Viale delle Nazioni)', description: 'Trattamento protettivo specifico su rubinetterie esterne e sostituzione raccordi corrosi dalla salsedine in un appartamento fronte mare.' },
    ]
  },
  'livorno': {
    buildingTypes: [
      'Palazzi storici del Quartiere Venezia (XVII secolo) con fondamenta a palafitta e cantine sotto il livello dei canali.',
      'Casermoni ottocenteschi del quartiere San Jacopo, caratterizzati da grandi altezze interne e tubazioni originali in piombo.',
      'Condomini anni \'60 e \'70 della zona Coteto, con impianti centralizzati originariamente progettati per il teleriscaldamento.',
      'Ville liberty di Ardenza e Antignano, spesso dotate di cisterne sotterranee per la raccolta delle acque piovane degli anni \'20.',
      'Edifici popolari del dopoguerra nel quartiere Shangai, nati con impianti a vista e materiali poveri soggetti a rapida usura.',
    ],
    localProblems: [
      'Corrosione accelerata da aerosol marino sulle componenti metalliche esterne dei sistemi di condizionamento.',
      'Ostruzioni frequenti nei quartieri Venezia e Pontino dovute all\'accumulo di sedimenti limosi portati dalle infiltrazioni dei canali medicei.',
      'Durezza dell\'acqua estremamente elevata che causa incrostazioni rapide negli scambiatori delle caldaie murarie in zona Sorgenti.',
      'Allagamenti delle chiostre interne e dei seminterrati in zona centro dopo i nubifragi, per l\'insufficienza del sistema di smaltimento acque miste.',
      'Infiltrazioni saline nel sistema fognario privato delle zone costiere che danneggiano le pompe di sollevamento.',
    ],
    climateImpact: 'Il forte libeccio e l\'elevata salinità dell\'aria a Livorno accelerano drasticamente la corrosione galvanica dei raccordi esterni e delle caldaie esposte sui balconi. Inoltre, l\'umidità di risalita capillare, alimentata dalla vicinanza della falda alla superficie, mette a dura prova la tenuta delle tubazioni di scarico interrate.',
    recentInterventions: [
      { type: 'Rifacimento colonna di scarico', zone: 'Quartiere Venezia Nuova', description: 'Sostituzione integrale della colonna di scarico in ghisa con nuovi materiali fonoassorbenti in un palazzo d\'epoca affacciato sul Fosso Reale.' },
      { type: 'Trattamento acque e anticalcare', zone: 'Quartiere Sorgenti', description: 'Installazione di un addolcitore a doppia colonna per proteggere gli impianti di un intero condominio devastati dal calcare.' },
      { type: 'Protezione antiallagamento', zone: 'Via Grande / Centro Storico', description: 'Progettazione e posa di un sistema di paratie e pompe sommerse con sensori di allagamento per un locale commerciale seminterrato.' },
      { type: 'Sostituzione centrale termica esterna', zone: 'Antignano alta', description: 'Sostituzione caldaia a condensazione con protezione speciale \'antisalino\' e raccordi in ottone CR in una villa vista mare.' },
      { type: 'Riparazione non invasiva fognatura', zone: 'Viale Italia / Ardenza Mare', description: 'Riparazione tramite relining di una tubazione sotterranea danneggiata dalle radici dei pini marittimi senza scavo nel giardino condominiale.' },
    ]
  },
  'cagliari': {
    buildingTypes: [
      'Palazzi signorili di fine \'800 in stile Liberty e Neoclassico nel quartiere Villanova, caratterizzati da ampi soffitti e vecchie colonne di scarico in ghisa.',
      'Case a torre e condomini intensivi degli anni \'60 e \'70 nel quartiere di San Benedetto, con impianti centralizzati spesso soggetti a corrosione galvanica.',
      'Antiche abitazioni a schiera del quartiere Castello, con fondamenta scavate nella roccia calcarea e tubature che devono adattarsi a percorsi irregolari e angusti.',
      'Edilizia residenziale pubblica del dopoguerra a Sant\'Avendrace, dove i materiali originali come il piombo sono ancora presenti in molti sottotraccia.',
      'Ville moderne e complessi residenziali degli anni \'90 e 2000 nella zona di Genneruxi e Quartiere del Sole, con impianti radianti a pavimento e sistemi di domotica idrica.',
    ],
    localProblems: [
      'Corrosione accelerata delle tubazioni esterne a causa dell\'aerosol marino nel quartiere Poetto e Sant\'Elia.',
      'Intasamenti da calcare estremamente aggressivo (elevata durezza dell\'acqua proveniente dagli invasi sardi) che ostruisce scambiatori e soffioni.',
      'Infiltrazioni e risalita di umidità nelle cantine dei palazzi storici della Marina, situati sotto il livello del mare.',
      'Cedimenti strutturali delle vecchie condotte fognarie in cemento nel quartiere Stampace a causa delle vibrazioni del traffico su pavimentazione storica.',
      'Shock termici agli impianti solari termici, molto comuni a Cagliari, durante i picchi di irraggiamento solare senza adeguati sistemi di dissipazione.',
    ],
    climateImpact: 'L\'elevata salinità dell\'aria marina unita all\'umidità persistente accelera l\'ossidazione dei componenti esterni come caldaie e condizionatori posizionati sui balconi esposti al Maestrale. Inoltre, le ondate di calore estive causano forti sbalzi di pressione nella rete idrica cittadina, mettendo a dura prova le valvole di sicurezza dei boiler elettrici molto diffusi in città.',
    recentInterventions: [
      { type: 'Rifacimento scarichi condominiali', zone: 'Villanova (Via Sulis)', description: 'Sostituzione integrale di una vecchia colonna in ghisa con nuovi materiali fonoassorbenti in un palazzo d\'epoca.' },
      { type: 'Trattamento acque e riscaldamento', zone: 'San Benedetto (Via Dante)', description: 'Installazione di un sistema di filtraggio a polifosfati e addolcitore per proteggere la nuova caldaia a condensazione dal calcare.' },
      { type: 'Gestione acque meteoriche e scantinati', zone: 'La Marina (Via Roma lato portici)', description: 'Impermeabilizzazione e installazione pompa a immersione automatica per prevenire allagamenti da alta marea/piogge torrenziali.' },
      { type: 'Rifacimento completo bagno e cucina', zone: 'Quartiere del Sole (Via del Sole)', description: 'Realizzazione di impianto idrico-sanitario sfilabile in multistrato per un attico vista mare, con protezione extra per la salsedine.' },
      { type: 'Videoispezione e riparazione non invasiva', zone: 'Castello (Via vico II Fossario)', description: 'Videoispezione e risanamento localizzato (relining) di una condotta fognaria fessurata sotto la roccia calcarea.' },
    ]
  },
  'foggia': {
    buildingTypes: [
      'Palazzi "Incis" di epoca fascista (anni \'30) nel Rione Puglie, caratterizzati da colonne di scarico originali in ghisa spesso corrose.',
      'Case a ballatoio del Settecento in via Arpi e nel Centro Storico (Terra Vecchia), con impianti idrici esterni aggiunti in epoche successive.',
      'Condomini intensivi anni \'60/\'70 in zona Viale Ofanto e Corso Roma, famosi per l\'uso di tubazioni in ferro nero ormai soggette a ostruzioni calcaree.',
      'Complessi residenziali moderni nell\'area di espansione Macchia Gialla, con impianti a collettore e riscaldamento a pavimento di nuova generazione.',
      'Case coloniche della Riforma Fondiaria (Enti Irrigui) nelle borgate rurali come Arpinova, con sistemi di adduzione dipendenti da cisterne e pozzi artesiani.',
    ],
    localProblems: [
      'Eccessiva durezza dell\'acqua proveniente dall\'Acquedotto Pugliese che causa incrostazioni rapide nelle serpentine delle caldaie in zona Comparto B.',
      'Pressione idrica incostante che rende necessario l\'uso di autoclavi rumorose o pompe di rilancio nei piani alti di Via Bari.',
      'Ritorno di odori sgradevoli dalle fognature bianche a causa della scarsa pendenza naturale del terreno pianeggiante del Tavoliere.',
      'Infiltrazioni di umidità di risalita capillare nei piani terra dei palazzi ottocenteschi intorno a Piazza XX Settembre.',
      'Corrosione galvanica accelerata nelle vecchie condotte in piombo ancora presenti in alcuni vicoli di Via Manzoni.',
    ],
    climateImpact: 'Il microclima del Tavoliere, caratterizzato da estati torride con picchi oltre i 40°C, causa una dilatazione termica estrema delle tubazioni esterne e un surriscaldamento delle riserve idriche sui lastrici solari. Al contrario, le improvvise gelate invernali dovute ai venti del sub-appennino dauno mettono a rischio i contatori non isolati, provocandone frequentemente la rottura per congelamento catastale.',
    recentInterventions: [
      { type: 'Rifacimento colonna montante scarichi', zone: 'Rione Biccari', description: 'Sostituzione integrale di una colonna di scarico in ghisa crepata con nuove tubazioni in PVC insonorizzato.' },
      { type: 'Installazione sistema addolcimento acqua', zone: 'Quartiere San Pio X', description: 'Adeguamento dell\'impianto con installazione di addolcitore a scambio ionico per proteggere i nuovi elettrodomestici.' },
      { type: 'Ristrutturazione bagno completa', zone: 'Rione Martucci', description: 'Rifacimento completo del bagno con installazione di sanitari sospesi e sostituzione tubi in rame con multistrato.' },
      { type: 'Sostituzione contatore e isolamento termico', zone: 'Borgo Segezia (area rurale)', description: 'Intervento d\'urgenza per la sostituzione di un contatore esploso a causa del gelo notturno.' },
      { type: 'Efficientamento sistema idrico condominiale', zone: 'Zona Villaggio Artigiani', description: 'Sostituzione autoclave condominiale con sistema a inverter per ottimizzare i consumi e ridurre il rumore.' },
    ]
  },
  'rimini': {
    buildingTypes: [
      'Villini Liberty e Art Nouveau di Marina Centro (inizi \'900), caratterizzati da impianti spesso interrati in giardini storici e tubature in piombo originali.',
      'Condomini degli anni \'60 e \'70 in zona Bellariva e Marebello, con colonne di scarico in ghisa soggette a corrosione galvanica e sistemi di riscaldamento centralizzato.',
      'Case a schiera e palazzotti del Centro Storico (all\'interno delle mura), con murature in mattoni pieni del XVIII-XIX secolo che complicano la stiva delle nuove tubature multistrato.',
      'Strutture alberghiere stagionali della zona nord (Viserba e Viserbella), con impianti sovradimensionati per il picco estivo e criticità legate al ristagno idrico invernale.',
      'Nuove residenze ad alta efficienza energetica nel comparto Padulli e Villaggio Primo Maggio, dotate di riscaldamento a pavimento e pompe di calore aria-acqua.',
    ],
    localProblems: [
      'Elevata durezza dell\'acqua proveniente dall\'acquedotto della Valmarecchia, che causa incrostazioni calcaree massicce negli scambiatori delle caldaie.',
      'Intrusione di sabbia fine nelle tubature di scarico delle strutture balneari e degli hotel frontemare, che provoca ostruzioni croniche.',
      'Rientro di cattivi odori dai sifoni durante i periodi di bassa pressione atmosferica e mareggiate, tipico della zona di Rimini Sud.',
      'Corrosione alveolare accelerata sui tubi in rame a causa della componente salina nell\'aria e nell\'umidità di risalita.',
      'Allagamenti localizzati dei vani tecnici interrati nei pressi del porto canale a causa della risalita della falda freatica.',
    ],
    climateImpact: 'L\'elevata umidità salmastra tipica del litorale riminese accelera la corrosione delle componenti esterne delle caldaie e dei condizionatori, mentre l\'alto livello della falda acquifera, specialmente dopo forti sciroccate o mareggiate, mette a dura prova le pompe di sentina dei seminterrati in zona mare. In inverno, le gelate improvvise nell\'entroterra (zona Coriano/Covignano) possono causare la rottura dei contatori se non adeguatamente isolati.',
    recentInterventions: [
      { type: 'Relining tubazioni di scarico', zone: 'Marina Centro (Viale Amerigo Vespucci)', description: 'Risanamento non invasivo delle colonne di scarico deteriorate che causavano infiltrazioni nei negozi sottostanti.' },
      { type: 'Riqualificazione centrale termica', zone: 'San Giuliano Mare', description: 'Sostituzione di una vecchia caldaia a basamento con sistema a condensazione e installazione di addolcitore a scambio ionico per contrastare il calcare.' },
      { type: 'Adeguamento sistema sollevamento acque reflue', zone: 'Zona Porto (Via Destra del Porto)', description: 'Installazione di nuove pompe ad immersione con sensori di livello per prevenire allagamenti durante i nubifragi.' },
      { type: 'Ristrutturazione idraulica centro storico', zone: 'Rione Clodio', description: 'Rifacimento totale bagno e adeguamento impianto idrosanitario in un appartamento con pareti in sasso vicino alla Cattedrale.' },
      { type: 'Installazione impianto ibrido in Hotel', zone: 'Rivazzurra', description: 'Integrazione tra pompa di calore e solare termico per ottimizzare i consumi durante la stagione turistica.' },
    ]
  },
  'salerno': {
    buildingTypes: [
      'Palazzi gentilizi del Centro Storico (Via de\' Mercanti): Strutture medievali e barocche con spessi muri in pietra e condotte di scarico originali in ghisa o piombo spesso incassate.',
      'Condomini razionalisti del Quartiere Italia: Edifici degli anni \'30 e \'40 caratterizzati da impianti centralizzati e colonne montanti che risentono della corrosione galvanica.',
      'Edilizia intensiva di Pastena e Torrione: Palazzi degli anni \'60 e \'70 con ampi balconi e reti di scarico orizzontali spesso sottodimensionate per i moderni carichi idrici.',
      'Ville liberty di Sala Abbagnano: Residenze di pregio su più livelli con impianti di irrigazione complessi e necessità di autoclavi per la gestione della pressione in quota.',
      'Nuove architetture dell\'Area Orientale (Parco Arbostella): Edifici moderni con sistemi di riscaldamento a pavimento e integrazione solare termico, conformi alle ultime normative energetiche.',
    ],
    localProblems: [
      'Corrosione da salsedine delle unità esterne e della rubinetteria nelle zone del Lungomare Trieste.',
      'Infiltrazioni dai lastrici solari negli edifici degli anni \'70 a Mercatello a causa del degrado delle guaine bituminose.',
      'Calcare ostinato derivante dalla durezza dell\'acqua locale, che compromette rapidamente scambiatori di calore e serpentine.',
      'Ostruzioni croniche dei collettori fognari nei vicoli bassi del Centro Storico a causa della scarsa pendenza delle vecchie condotte.',
      'Pressione idrica instabile nelle zone alte come Giovi e Casa Manzo, con frequente necessità di sostituzione dei riduttori di pressione.',
    ],
    climateImpact: 'Il clima di Salerno, influenzato dalla vicinanza del Golfo e dai venti di Libeccio, provoca un\'elevata umidità salina che accelera l\'ossidazione delle componenti esterne (caldaie e tubazioni a vista). Inoltre, le piogge torrenziali autunnali mettono a dura prova i sistemi di drenaggio dei terrazzi, sovraccaricando i pluviali spesso ostruiti dagli aghi di pino delle zone collinari.',
    recentInterventions: [
      { type: 'Rifacimento impianto idrico-sanitario', zone: 'Centro Storico (Largo Campo)', description: 'Risanamento completo della colonna di scarico principale e sostituzione delle tubazioni in piombo con multistrato in un immobile storico.' },
      { type: 'Installazione trattamento acque e riscaldamento', zone: 'Quartiere Carmine (Via Velia)', description: 'Installazione di un sistema di addolcimento a monte e sostituzione della caldaia a condensazione per contrastare i danni da calcare.' },
      { type: 'Riparazione sistema di drenaggio piovano', zone: 'Torrione Alto', description: 'Ripristino del sistema di deflusso acque meteoriche con l\'installazione di nuovi pluviali in rame resistenti alla salsedine.' },
      { type: 'Manutenzione gruppo pressurizzazione idrica快速', zone: 'Sala Abbagnano (Via dei Gelsomini)', description: 'Sostituzione dell\'elettropompa del gruppo autoclave e taratura dei pressostati per garantire acqua ai piani alti.' },
      { type: 'Ricerca e riparazione perdite idriche', zone: 'Parco Arbostella (Viale Verdi)', description: 'Rilevazione perdita occulta tramite geofonia nel giardino pensile e successiva riparazione della tubazione di mandata.' },
    ]
  },
  'ferrara': {
    buildingTypes: [
      'Case di Addizione Erculea (Rinascimento, Corso Ercole I d\'Este): palazzi nobiliari con cortili interni e antichi sistemi di raccolta acque piovane del XV secolo.',
      'Case a Schiera Medievali (Via delle Volte, Via San Romano): edifici stretti del XII-XIV secolo con scarichi originali in cotto e scantinati soggetti a umidità di risalita.',
      'Condomini Modernisti del Quartiere Giardino (Anni \'20-\'30, zona Stadio): architettura razionalista con impianti idrici in ferro zincato spesso ostruiti da ossidazione.',
      'Villette del villaggio INA-Casa (Anni \'50, QRE - Quartiere Residenziale Est): tipologie unifamiliari con tubature in piombo originali e locali caldaia interrati.',
      'Rustici Ristrutturati della Campagna Ferrarese (Frazioni come Aguscello o Malborghetto): ex case coloniche con pozzi artesiani e sistemi di depurazione acque neri indipendenti.',
    ],
    localProblems: [
      'Elevata durezza dell\'acqua del Po e del Reno (oltre i 30°F), che causa incrostazioni calcaree severe in scambiatori e caldaie.',
      'Fenomeni di subsidenza del suolo argilloso che provocano disallineamenti e rotture nelle condotte fognarie interrate.',
      'Allagamenti degli scantinati nel centro storico a causa di una rete fognaria antica che fatica a reggere le "bombe d\'acqua" estive.',
      'Corrosione puntiforme dei tubi in rame dovuta alla composizione chimica specifica delle acque trattate localmente.',
      'Blocco delle valvole termostatiche causato dai sedimenti melmosi tipici dei circuiti idraulici non lavati chimicamente.',
    ],
    climateImpact: 'Il clima ferrarese, caratterizzato da un\'umidità stagnante in inverno e picchi di calore afoso in estate, accelera i processi di corrosione galvanica nelle tubature esposte. Inoltre, le forti escursioni termiche stagionali mettono a dura prova le guarnizioni degli impianti di riscaldamento centralizzati, tipici dei grandi complessi di via Bologna.',
    recentInterventions: [
      { type: 'Rifacimento impianto idrico sanitario', zone: 'Centro Storico - San Romano', description: 'Sostituzione colonna montante in un palazzo storico vicino alla Cattedrale, con rimozione di vecchie tubazioni in piombo intasate.' },
      { type: 'Trattamento acque e anticalcare', zone: 'Quartiere Foro Boario', description: 'Installazione di un addolcitore a scambio ionico per proteggere una caldaia a condensazione appena installata.' },
      { type: 'Riparazione perdita occulta interrata', zone: 'Pontelagoscuro', description: 'Riparazione d\'urgenza di una perdita sotterranea causata dal cedimento del terreno argilloso sotto il vialetto d\'ingresso.' },
      { type: 'Gestione acque reflue e allagamenti', zone: 'Quartiere Giardino - Stadio', description: 'Bonifica e risanamento di una cantina allagata con installazione di pompa di sentina automatica ad alte prestazioni.' },
      { type: 'Manutenzione straordinaria riscaldamento', zone: 'Villa Fulvia / Quacchio Junior', description: 'Sostituzione completa del gruppo termico e lavaggio chimico dell\'impianto radiante in una villetta schiera.' },
    ]
  },
  'sassari': {
    buildingTypes: [
      'Palazzi signorili in stile Umbertino del centro storico (Piazza d\'Italia e via Roma), caratterizzati da imponenti altezze di interpiano.',
      'Case a torre del nucleo medievale (rioni di San Donato e San Nicola) con spessi muri in trachite e canalizzazioni originali in piombo.',
      'Edilizia residenziale intensiva del boom anni \'60/\'70 nel quartiere Latte Dolce, con colonne montanti condivise e problemi di corrosione galvanica.',
      'Ville indipendenti e bifamiliari di fine anni \'90 nel quartiere residenziale di Luna e Sole, dotate spesso di impianti radianti a pavimento.',
      'Palazzine moderne a basso impatto energetico del recente comparto di Sant\'Orsola, con sistemi di raccolta delle acque grigie.',
    ],
    localProblems: [
      'Frequenti occlusioni per sedimenti calcarei e manganese provenienti dalla rete idrica del serbatoio di via Vienna.',
      'Corrosione elettrochimica nelle vecchie tubazioni in ferro zincato dei palazzi di via Pascoli e via Dante.',
      'Bassa pressione idrica cronica nelle zone alte della città, che richiede l\'installazione e la manutenzione di autoclavi e serbatoi d\'accumulo.',
      'Infiltrazioni di risalita capillare nelle cantine umide del centro storico, dovute alla porosità della trachite sassarese.',
      'Rotture delle tubazioni di smaltimento in fibrocemento in alcuni lotti popolari di Monte Rosello.',
    ],
    climateImpact: 'L\'escursione termica tra le estati siccitose e le gelate sporadiche ma intense della zona di Sassari (specie con il vento di Maestrale) mette a dura prova le tubazioni esterne non isolate. Inoltre, la natura calcarea del suolo incide sulla durezza dell\'acqua proveniente dagli invasi (come il Bidighinzu), accelerando le incrostazioni nei boiler e nelle serpentine delle caldaie.',
    recentInterventions: [
      { type: 'Rifacimento impianto idrico condominiale', zone: 'Monte Rosello', description: 'Sostituzione integrale della colonna montante ammalorata e installazione di riduttore di pressione per proteggere i nuovi raccordi multistrato.' },
      { type: 'Ricerca perdita e riparazione localizzata', zone: 'Luna e Sole Project', description: 'Ricerca perdite occulte tramite termografia su impianto di riscaldamento a pavimento e successiva riparazione mirata senza demolizione estesa.' },
      { type: 'Tratamento acque e manutenzione caldaia', zone: 'Santu Orsola Nord Building', description: 'Pulizia chimica degli scambiatori di calore e installazione di un addolcitore a scambio ionico per contrastare l\'elevata durezza dell\'acqua locale.' },
      { type: 'Ristrutturazione bagno storico', zone: 'Centro Storico (vicino San Nicola)', description: 'Ripristino degli scarichi in facciata e installazione di nuovi sanitari a sospensione previo consolidamento della parete in tufo e trachite.' },
      { type: 'Emergenza impianto di sollevamento idrico', zone: 'Viale Italia / Via Sardegna', description: 'Sostituzione pompa sommersa bruciata e revisione del vaso d\'espansione dell\'autoclave per garantire pressione ai piani alti del palazzo.' },
    ]
  },
  'latina': {
    buildingTypes: [
      'Case di Fondazione (anni \'30) nel Centro Storico: Edifici razionalisti con tubature originali in piombo o ferro zincato soggette a corrosione galvanica.',
      'Condomini intensivi di Q4 e Q5 (nuova espansione): Edifici degli anni \'80 e \'90 con impianti spesso realizzati in polipropilene di prima generazione o multistrato economico.',
      'Ville dell\'Agro Pontino e del Lido: Strutture mono/bifamiliari con criticità legate alla risalita capillare e impianti di irrigazione alimentati da pozzi artesiani.',
      'Palazzi INA-Casa di via Nervi/via Don Torello: Edilizia del secondo dopoguerra con problemi di scarichi in ghisa e dorsali condominiali sottodimensionate.',
      'Edifici direzionali della \'Città del Razionalismo\': Strutture pubbliche con grandi volumi e impianti di riscaldamento centralizzato a colonne montanti.',
    ],
    localProblems: [
      'Elevata durezza dell\'acqua proveniente dai pozzi di Sardellane, che causa incrostazioni calcaree severe su scambiatori e resistenze.',
      'Infiltrazioni saline nelle tubature degli stabilimenti e delle abitazioni di Foce Verde e Capoportiere.',
      'Sabbia e sedimenti nei filtri dovuti ai frequenti picchi di pressione della rete idrica comunale gestita da Acqualatina.',
      'Allagamenti dei seminterrati nei quartieri bassi dovuti all\'insufficiente ricezione delle pompe di sollevamento della bonifica durante le piogge intense.',
      'Corrosione elettrolitica accelerata nei vecchi lotti del centro a causa di impianti elettrici non adeguatamente messi a terra.',
    ],
    climateImpact: 'Il clima di Latina, caratterizzato da un\'umidità salmastra persistente data la vicinanza al mare, accelera l\'ossidazione della rubinetteria esterna e delle caldaie non protette. Inoltre, la natura argillosa e di bonifica del terreno causa assestamenti strutturali che mettono sotto stress i giunti delle condotte idriche interrate.',
    recentInterventions: [
      { type: 'Rifacimento colonna montante', zone: 'Piazza del Quadrato', description: 'Sostituzione integrale di una dorsale in ferro ostruita dal calcare in un palazzo razionalista.' },
      { type: 'Trattamento acque e filtrazione', zone: 'Borgo Sabotino (Lido di Latina)', description: 'Installazione di sistema di filtraggio a sabbia e addolcitore a scambio ionico per villa singola.' },
      { type: 'Ricerca e riparazione perdite idriche', zone: 'Quartiere Q4 (Nuova Latina)', description: 'Riparazione perdita occulta su tubazione interrata in polietilene deformata dal terreno argilloso.' },
      { type: 'Installazione valvola di non ritorno', zone: 'Zona Pantanaccio', description: 'Adeguamento impianto di scarico con installazione di valvola antiriflusso per prevenire allagamenti da rete fognaria.' },
      { type: 'Efficientamento energetico termico pocket', zone: 'Quartiere Nicolosi (Lotti storici)', description: 'Conversione di vecchio impianto centralizzato a gasolio in sistema ibrido con pompa di calore.' },
    ]
  },
  'giugliano': {
    buildingTypes: [
      'Palazzi gentilizi del centro storico (XVII-XVIII secolo) con cortili in piperno e antiche cisterne per la raccolta piovana, situati tra Corso Campano e Piazza Annunziata.',
      'Residenze \'Liberty\' di inizio \'900 con soffitti a volta e impianti idrici originariamente in piombo, frequenti nella zona di via Roma.',
      'Condomini intensivi degli anni \'70 e \'80 con colonne di scarico in ghisa o PVC di prima generazione, tipici della zona di via Colonne e via Primo Maggio.',
      'Complessi residenziali a schiera ed edilizia moderna della zona costiera (Varcaturo e Licola), caratterizzati da impianti con autoclave e sistemi di sollevamento acque.',
      'Case rurali ed ex masserie riconvertite nella zona di Casacelle, con pozzi artesiani ancora attivi per l\'irrigazione e sistemi di smaltimento indipendenti.',
    ],
    localProblems: [
      'Corrosione galvanica accelerata nelle zone costiere di Licola e Varcaturo a causa dell\'alta salinità dell\'aria che intacca i raccordi esterni.',
      'Frequenti intasamenti delle caditoie condominiali per i residui di cenere e polvere trasportati dal vento nelle aree adiacenti ai terreni agricoli di Casacelle.',
      'Eccessiva durezza dell\'acqua proveniente da alcuni pozzi artesiani locali, che causa occlusioni calcaree repentine negli scambiatori delle caldaie.',
      'Riflusso delle acque reflue nei piani interrati durante le piogge torrenziali a causa della pendenza critica di alcuni tratti del sistema fognario cittadino.',
      'Deterioramento delle guarnizioni e dei componenti in gomma dovuto alle escursioni termiche estive che surriscaldano le tubazioni esterne non isolate.',
    ],
    climateImpact: 'Il regime pluviometrico di Giugliano, caratterizzato da fenomeni temporaleschi di forte intensità (le cosiddette \'bombe d\'acqua\'), mette a dura prova i sistemi di troppopieno delle coperture piane e i canali di gronda, spesso sottodimensionati per la portata d\'acqua attuale. Inoltre, la vicinanza al litorale di Licola espone la componentistica esterna a una corrosione salina accelerata, tipica dei climi caldi e umidi della fascia costiera domitiana.',
    recentInterventions: [
      { type: 'Rifacimento colonna di scarico', zone: 'Centro Storico (vicino Piazza Matteotti)', description: 'Sostituzione integrale di una vecchia colonna di scarico in ghisa fessurata con nuovi tubi in polipropilene insonorizzato in un palazzo storico.' },
      { type: 'Trattamento acque e filtraggio', zone: 'Zona Monaci', description: 'Installazione di un sistema di filtraggio a sedimenti e addolcitore a scambio ionico per proteggere i nuovi impianti da incrostazioni calcaree severe.' },
      { type: 'Adeguamento sistema antiallagamento', zone: 'Varcaturo (zona via Staffetta)', description: 'Installazione di una doppia pompa sommersa con quadro elettrico di emergenza per prevenire l\'allagamento del garage durante i nubifragi.' },
      { type: 'Ristrutturazione impianto idrico sanitario', zone: 'Via Colonne', description: 'Passaggio da impianto a vista degradato a impianto sottotraccia con collettore in ottone e tubazioni in multistrato per un appartamento anni \'60.' },
      { type: 'Ricerca perdite e riparazione mirata', zone: 'Campopantano / Licola Mare', description: 'Riparazione di una perdita occulta individuata tramite termografia su un sistema di riscaldamento radiante a pavimento.' },
    ]
  },
  'monza': {
    buildingTypes: [
      'Residenze storiche del Centro (ZTL), come i palazzi di fine \'800 in stile floreale e neoclassico vicino al Duomo, caratterizzati da colonne di scarico originali in piombo o ghisa.',
      'Condomini della "Grande Monza" degli anni \'60 e \'70 in zona San Biagio, con impianti di riscaldamento centralizzato a colonna e tubazioni in ferro nero soggette a corrosione.',
      'Ville di pregio in zona Parco/Villa Reale, costruzioni del primo \'900 con ampi giardini e impianti di irrigazione complessi che attingono spesso da pozzi privati.',
      'Nuovi complessi residenziali in zona Policlinico/Boroughs, edifici in classe A con riscaldamento a pavimento, sistemi di domotica idraulica e pompe di calore.',
      'Ex aree industriali riconvertite in loft in zona Triante, dove il recupero architettonico ha richiesto l\'integrazione di sistemi di sollevamento acque (trituratori) per bagni ricavati in seminterrati.',
    ],
    localProblems: [
      'Elevata durezza dell\'acqua proveniente dalle falde brianzole, che causa incrostazioni precoci negli scambiatori delle caldaie murali a San Rocco.',
      'Risalita di umidità e infiltrazioni nei locali interrati degli edifici storici a causa dei sedimenti permeabili del bacino del Lambro.',
      'Corrosione galvanica nei raccordi delle vecchie tubazioni in ferro e rame, comune nei condomini di Via Cavallotti.',
      'Ostruzione dei pluviali a causa del deposito di aghi di pino e fogliame nelle zone limitrofe al Parco di Monza.',
      'Infiltrazioni di gas radon dal sottosuolo che richiedono una ventilazione specifica delle reti di scarico interrate.',
    ],
    climateImpact: 'Il microclima di Monza, influenzato dalla vicinanza del fiume Lambro e dall\'elevata umidità della Brianza, accelera la formazione di condensa nelle tubazioni non isolate, mentre le gelate invernali improvvise mettono a rischio i contatori esterni nei quartieri periferici come Cederna. L\'alternanza di periodi siccitosi e piogge torrenziali causa forti stress meccanici alla rete fognaria che deve gestire repentini volumi di acqua meteorica.',
    recentInterventions: [
      { type: 'Risanamento scarichi storici', zone: 'Centro Storico (Via Vittorio Emanuele II)', description: 'Sostituzione completa di una vecchia colonna di scarico in piombo con tubazioni in PP fonoisolante in un palazzo d\'epoca.' },
      { type: 'Trattamento acque e anticalcare', zone: 'San Biagio (Via Prina)', description: 'Bonifica e de-calcificazione dell\'impianto ACS tramite lavaggio chimico e installazione di addolcitore a scambio ionico.' },
      { type: 'Emergenza rottura tubazioni esterne', zone: 'Cederna (Via Borsa)', description: 'Riparazione d\'urgenza di una batteria di contatori esplosa a causa di un picco di gelo notturno.' },
      { type: 'Efficientamento energetico', zone: 'Triante (Via Monte Cervino)', description: 'Progettazione e posa di impianto solare termico integrato per la produzione di acqua calda sanitaria.' },
      { type: 'Manutenzione reti fognarie private', zone: 'Zona Parco (Viale Cesare Battisti)', description: 'Videoispezione fognaria per individuazione radici che avevano ostruito il collettore principale della villa.' },
    ]
  },
  'siracusa': {
    buildingTypes: [
      'Palazzi Nobiliari Barocchi in Ortigia (XVIII secolo) con spesse murature in pietra bianca e cisterne ipogee originarie.',
      'Case a schiera del quartiere Santa Lucia (anni \'20-\'40) con impianti di scarico originari in ghisa o piombo spesso occlusi.',
      'Condomini intensivi in zona Akradina (anni \'60-\'70) caratterizzati da colonne montanti in ferro zincato ormai corrose.',
      'Ville indipendenti a Tremmilia e Belvedere (stile contemporaneo) dotate di moderni sistemi di irrigazione e serbatoi di accumulo.',
      'Edilizia popolare di Tiche e Mazzarrona (anni \'80) con criticità frequenti nelle tubazioni preisolate dei sottoservizi.',
    ],
    localProblems: [
      'Elevata durezza dell\'acqua proveniente dai pozzi locali, che causa rapidi accumuli di calcare nelle resistenze degli scaldabagni.',
      'Infiltrazioni di acqua salmastra nelle condotte sotterranee vicine alla linea di costa, specialmente dopo mareggiate.',
      'Corrosione precoce delle rubinetterie e delle raccorderie in ottone a causa dell\'ambiente marino aggressivo di Ortigia e della costa sud.',
      'Ostruzioni frequenti da sedimenti sabbiosi trasportati dalla rete idrica dopo periodi di siccità o manutenzioni straordinarie dei pozzi.',
      'Cedimenti strutturali delle vecchie condotte fognarie in cemento nel quartiere Umbertino dovuti al traffico pesante e alla salsedine.',
    ],
    climateImpact: 'L\'elevata salinità dell\'aria marina (carico salino) accelera la corrosione galvanica dei componenti esterni, come le unità delle pompe di calore e le staffe di supporto. Inoltre, le ondate di calore estremo registrate nel siracusano causano dilatazioni termiche critiche sulle tubazioni in PVC non adeguatamente protette all\'esterno.',
    recentInterventions: [
      { type: 'Rifacimento colonna montante', zone: 'Ortigia', description: 'Sostituzione integrale di una colonna montante in ferro con multistrato in un palazzo d\'epoca vicino alla Fontana di Diana.' },
      { type: 'Installazione sistema filtrante e addolcitore', zone: 'Fanusa/Plemmirio', description: 'Installazione di un addolcitore a scambio ionico per proteggere gli elettrodomestici di una villa bifamiliare.' },
      { type: 'Videoispezione e riparazione scarichi', zone: 'Neapolis (Viale Teocrito)', description: 'Videoispezione e risanamento relining di una condotta di scarico lesionata da radici di pini marittimi.' },
      { type: 'Sostituzione gruppo autoclave', zone: 'Zecchino/Tisia station', description: 'Sostituzione urgente di un autoclave centralizzato arrugginito per ripristinare la pressione nei piani alti.' },
      { type: 'Riparazione perdita sottosuolo', zone: 'Cassibile/Fontane Bianche', description: 'Intervento di emergenza per la rottura di un tubo interrato causata da dilatazione termica estrema.' },
    ]
  },
  'pescara': {
    buildingTypes: [
      'Palazzine liberty e villini primo \'900 nel quartiere Pineta-Portanuova, con impianti in piombo e rame spesso incrostati.',
      'Condomini degli anni \'60 e \'70 in zona Piazza Salotto e Via Firenze, caratterizzati da colonne di scarico in ghisa soggette a corrosione galvanica.',
      'Edifici intensivi a ridosso della ferrovia (via Ferrari/via Chieti) con reti idriche sottodimensionate rispetto all\'attuale carico abitativo.',
      'Nuove residenze di pregio in Classe A con riscaldamento a pavimento e sistemi di ricircolo acqua calda in zona Strada Parco.',
      'Case basse storiche dei pescatori nel borgo di Marina Nord, soggette a risalita capillare e corrosione per la salsedine.',
    ],
    localProblems: [
      'Elevata durezza dell\'acqua proveniente dalle sorgenti del Gran Sasso, che causa ostruzioni rapide negli scambiatori delle caldaie beretta e junkers molto diffuse.',
      'Fenomeni di corrosione precoce delle rubinetterie e dei raccordi esterni a causa dell\'aerosol marino, specialmente sul Lungomare Matteotti.',
      'Infiltrazioni e rigurgiti fognari nei seminterrati di Portanuova durante le mareggiate, quando il fiume Pescara non riceve correttamente gli scarichi.',
      'Sabbia fine nei filtri dei contatori nelle zone vicino alla riviera, che danneggia le guarnizioni e i miscelatori a cartuccia ceramica.',
      'Calo della pressione idrica ai piani alti delle palazzine senza autoclave nei quartieri collinari come San Silvestro o Colli durante l\'estate.',
    ],
    climateImpact: 'Il clima adriatico di Pescara, con elevata umidità e venti di maestrale carichi di salsedine, accelera l\'ossidazione delle componenti esterne delle caldaie e delle unità esterne dei condizionatori. Inoltre, le forti piogge improvvise (bombe d\'acqua) mettono regolarmente in crisi i sistemi di scarico delle acque bianche nelle zone pianeggianti sotto il livello del mare.',
    recentInterventions: [
      { type: 'Installazione pompa di pressione inverter', zone: 'Pescara Colli (Via di Sotto)', description: 'Sostituzione di un\'autoclave rumorosa con un modello inverter silenzioso per migliorare la pressione ai piani alti.' },
      { type: 'Relining colonna di scarico fognario', zone: 'Centro (Via Nicola Fabrizi)', description: 'Risanamento non invasivo (relining) di una colonna di scarico in ghisa che presentava perdite occulte dietro le piastrelle decorative.' },
      { type: 'Trattamento acque e anticalcare', zone: 'Portanuova (Viale Marconi)', description: 'Installazione di un addolcitore a scambio ionico per proteggere una nuova caldaia a condensazione dai depositi calcarei del Gran Sasso.' },
      { type: 'Adeguamento sistema anti-allagamento', zone: 'Zona Stadio (Via Pepe)', description: 'Intervento d\'urgenza per la pulizia delle caditoie private e installazione di valvole di non ritorno per prevenire allagamenti da riflusso.' },
      { type: 'Riqualificazione energetica impianto termico', zone: 'Pineta Dannunziana (Via Scarfoglio)', description: 'Rifacimento completo dell\'impianto di riscaldamento con sistema a pannelli radianti e pompa di calore in un villino d\'epoca.' },
    ]
  },
  'bergamo': {
    buildingTypes: [
      'Case a ballatoio di Borgo Palazzo e Borgo Santa Caterina: edifici di fine \'800 con impianti idraulici originariamente esterni e strette colonne di scarico in ghisa.',
      'Palazzi nobiliari di Città Alta (XVI-XVIII secolo): strutture con pareti in pietra spessa oltre un metro e reti idriche che devono convivere con antiche cisterne venete e vincoli monumentali.',
      'Condomini anni \'60 e \'70 di Loreto e San Tomaso de\' Calvi: caratterizzati da riscaldamento centralizzato a colonne montanti e tubature in ferro spesso soggette a corrosione galvanica.',
      'Ville Liberty in zona Viale Vittorio Emanuele e pendici dei colli: residenze dei primi del \'900 con eleganti rubinetterie d\'epoca e sistemi di smaltimento acque meteoriche integrati nel design architettonico.',
      'Residenze moderne di Bergamo Infrastructure e Redona-Centro: edifici in classe A con riscaldamento a pavimento, sistemi di domotica idraulica e recupero delle acque grigie.',
    ],
    localProblems: [
      'Elevata durezza dell\'acqua proveniente dalle sorgenti prealpine, che causa rapide incrostazioni di calcare negli scambiatori delle caldaie a condensazione.',
      'Ostruzioni frequenti nei canali di scolo di Città Alta dovute all\'accumulo di fogliame e detriti vegetali trasportati dai venti di valle.',
      'Infiltrazioni capillari nei piani interrati dei quartieri vicini al torrente Morla a causa delle oscillazioni della falda acquifera.',
      'Corrosione delle vecchie tubature in piombo ancora presenti in alcuni isolati storici delle "Cinque Vie".',
      'Pressione idrica irregolare tra la parte bassa e i colli, che rende necessaria l\'installazione di riduttori di pressione o autoclavi silenziate.',
    ],
    climateImpact: 'L\'escursione termica tra le zone collinari e la pianura bergamasca, unita all\'umidità stagnante della conca di Città Alta, accelera la formazione di condensa critica nelle canne fumarie e richiedere coibentazioni specifiche per evitare il congelamento delle tubazioni esposte nei sottotetti dei borghi storici.',
    recentInterventions: [
      { type: 'Ristrutturazione bagno storica', zone: 'Città Alta (Via Gombito)', description: 'Rifacimento completo del sistema di scarico e installazione di piatti doccia a filo pavimento in un appartamento del Settecento.' },
      { type: 'Efficientamento energetico idraulico', zone: 'Colli di Bergamo (Via San Vigilio)', description: 'Sostituzione di una vecchia caldaia a gasolio con un sistema ibrido a pompa di calore in una villa d\'epoca.' },
      { type: 'Impianto idraulico industriale-residenziale', zone: 'Malpensata (ex aree industriali)', description: 'Realizzazione di un nuovo impianto idrico-sanitario con tubazioni in multistrato in un loft derivato da recupero industriale.' },
      { type: 'Ricerca perdite e riparazione tubazione interrata', zone: 'Quartiere Finardi', description: 'Riparazione urgente di una perdita occulta nel giardino condominiale che causava un calo di pressione ai piani alti.' },
      { type: 'Manutenzione straordinaria riscaldamento centralizzato', zone: 'Villaggio degli Sposi均衡', description: 'Lavaggio chimico dell\'impianto di riscaldamento a radiatori e installazione di valvole termostatiche in un condominio anni \'60.' },
    ]
  },
  'forlì': {
    buildingTypes: [
      'Case Novecentesche in stile razionalista (Zona Viale della Libertà e Piazzale della Vittoria), caratterizzate da ampi locali tecnici e tubature in piombo originali.',
      'Palazzi gentilizi del centro storico (Quartiere San Biagio e Schiavonia), con strutture murarie a sacco di epoca rinascimentale che rendono complessa la mappatura degli impianti.',
      'Case a schiera degli anni \'70 e \'80 nel quartiere Spazzoli-Ca\' Ossi, spesso con impianti ancora in ferro zincato e problemi di corrosione galvanica.',
      'Villette a schiera di recente costruzione nella zona della Cava e Ronco, dotate di sistemi radianti a pavimento e caldaie a condensazione ad alta efficienza.',
      'Case coloniche e rustici ristrutturati nelle zone collinari di Vecchiazzano e San Martino in Strada, dove si integrano pozzi artesiani e sistemi di addolcimento.',
    ],
    localProblems: [
      'Elevato residuo fisso dell\'acqua proveniente da Ridracoli che, pur essendo di alta qualità, presenta un calcare ostinato che ostruisce gli scambiatori delle caldaie.',
      'Corrosione delle vecchie tubature in piombo ancora presenti in molti sottolivelli di Corso della Repubblica e Via Diaz.',
      'Infiltrazioni di acque meteoriche nei garage interrati della zona Piscina a causa dell\'innalzamento della falda freatica dopo periodi di pioggia prolungata.',
      'Ostruzione delle colonne di scarico condominiali dovuta all\'accumulo di grassi nelle zone densamente popolate come Quartiere Romiti.',
      'Cedimenti dei raccordi interrati causati dai terreni argillosi che si ritirano con la siccità estiva, particolarmente sentiti nella zona della Bussecchio.',
    ],
    climateImpact: 'L\'elevata umidità tipica della Valle del Montone, unita alle escursioni termiche tra la nebbia invernale e il caldo torrido estivo, accelera la formazione di condensa nei condotti di sfiato e mette a dura prova le guarnizioni esterne. Inoltre, la vicinanza del fiume Montone rende necessario l\'uso di valvole antiriflusso per prevenire allagamenti durante le piene improvvise causate da forti temporali.',
    recentInterventions: [
      { type: 'Riqualificazione Energetica Centrale Termica', zone: 'Quartiere Spazzoli-Ca\' Ossi', description: 'Sostituzione integrale di una vecchia caldaia a camera aperta con una nuova a condensazione e lavaggio chimico dell\'impianto con defangatore magnetico.' },
      { type: 'Riparazione Perdita Occulta Sanitaria', zone: 'Viale della Libertà (Zona Razionalista)', description: 'Intervento d\'urgenza per la riparazione di una colonna di scarico in ghisa lesionata all\'interno di un palazzo storico degli anni \'30.' },
      { type: 'Montaggio Addolcitore a Resine', zone: 'Quartiere Ronco', description: 'Installazione di un sistema di addolcimento a monte dell\'impianto per proteggere i nuovi elettrodomestici dal calcare locale.' },
      { type: 'Rifacimento Bagno Completo', zone: 'Quartiere San Biagio (Centro Storico)', description: 'Posa di nuove tubature in multistrato e rifacimento scarichi Geberit per la ristrutturazione completa di un bagno in un appartamento anni \'50.' },
      { type: 'Prevenzione Allagamenti Seminterrati', zone: 'Quartiere Romiti (Zona adiacente al fiume)', description: 'Installazione di elettropompa sommersa con sistema di backup a batteria per prevenire allagamenti del seminterrato.' },
    ]
  },
  'trento': {
    buildingTypes: [
      'Case a schiera del quartiere operaio di San Martino (fine \'800), con tubazioni originali in piombo o ferro galvanizzato spesso incrostate.',
      'Palazzi nobiliari del centro storico (es. via Belenzani), caratterizzati da muri in pietra di grande spessore che rendono complessi i passaggi delle moderne colonne di scarico.',
      'Condomini anni \'60 e \'70 di Trento Nord (Cristo Re), con impianti centralizzati a colonna montante singola e problemi di corrosione galvanica diffusa.',
      'Edifici moderni in bioedilizia del quartiere Le Albere (arch. Renzo Piano), dotati di sistemi avanzati di teleriscaldamento e recupero acque piovane.',
      'Case rurali ristrutturate a ridosso della collina di Povo e Villazzano, dove la pressione dell\'acqua deve essere gestita con riduttori a causa del forte dislivello.',
    ],
    localProblems: [
      'Elevata durezza dell\'acqua (oltre 25-30°F) che causa ostruzioni precoci nei soffioni e nelle serpentine delle caldaie in tutta la zona urbana.',
      'Shock termico delle tubazioni interrate dovuto alla notevole escursione termica tra le acque di fusione nivale e il terreno riscaldato in estate.',
      'Corrosione da correnti vaganti nelle zone limitrofe alla linea ferroviaria del Brennero, che bucano i tubi in rame sotterranei.',
      'Necessità di stazioni di sollevamento acque reflue nei garage interrati delle zone più basse (es. via Ghiaie) causa vicinanza alla falda dell\'Adige.',
      'Malfunzionamento dei vasi di espansione nei sistemi solari termici, molto diffusi in collina, a causa delle alte temperature estive e del gelo invernale.',
    ],
    climateImpact: 'Le rigide temperature invernali della Valle dell\'Adige, unite all\'umidità persistente, espongono le tubazioni esterne e i contatori non isolati in zone come l\'Interporto a frequenti rotture per gelo. Inoltre, la forte durezza dell\'acqua proveniente dalle fonti calcaree locali accelera la formazione di calcare negli scambiatori delle caldaie a condensazione durante i picchi di utilizzo invernale.',
    recentInterventions: [
      { type: 'Rifacimento colonna di scarico fognario', zone: 'Centro Storico (Via Manci) balance', description: 'Sostituzione completa del collettore principale di scarico in un palazzo settecentesco per infiltrazioni nelle cantine umide.' },
      { type: 'Trattamento acque e protezione impianto', zone: 'Gardolo', description: 'Installazione di addolcitore a scambio ionico e defangatore magnetico per proteggere una nuova caldaia a condensazione.' },
      { type: 'Riparazione d\'emergenza rottura da gelo', zone: 'Sopramonte (Collina Ovest)', description: 'Riparazione di una tubazione in polietilene da 50mm esplosa a causa delle temperature sotto zero della notte precedente.' },
      { type: 'Manutenzione straordinaria sistema radiante', zone: 'Quartiere Le Albere', description: 'Bilanciamento idraulico del sistema di riscaldamento a pavimento con sostituzione dei flussimetri bloccati dal calcare.' },
      { type: 'Adeguamento sistema anti-allagamento', zone: 'San Bartolomeo (Trento Sud)', description: 'Installazione di doppie valvole di non ritorno e pompe sommerse con allarme per prevenire allagamenti da riflusso fognario.' },
    ]
  },
  'vicenza': {
    buildingTypes: [
      'Palazzi Nobiliari Palladiani (Città Storica): Strutture del Rinascimento con chiostri interni e scantinati soggetti a risalita capillare, situati tra Corso Palladio e Contra\' Porti.',
      'Case a Schiera del Ventennio (Quartiere San Bortolo): Edifici degli anni \'20 e \'30 con tubazioni originali in piombo o ferro zincato e scarichi a caduta singola.',
      'Condomini Intensivi degli anni \'60 (San Lazzaro e Pomari): Grandi complessi con colonne di scarico in eternit e impianti di riscaldamento centralizzati a colonne montanti.',
      'Ville Venete e Liberty (Viale Fusinato/Monte Berico): Residenze signorili di fine \'800 e primi \'900 con ampi giardini e impianti di irrigazione complessi che attingono spesso da pozzi artesiani.',
      'Case di Corte Rurali Urbanizzate (Anconetta e Saviabona): Vecchie strutture agricole riconvertite, caratterizzate da allacciamenti alla rete fognaria spesso lunghi e con pendenze scarse.',
    ],
    localProblems: [
      'Corrosione galvanica accelerata dall\'elevata durezza dell\'acqua proveniente dalle risorgive pedemontane (oltre 30° f).',
      'Intasamento dei sifoni a causa dei sedimenti calcarei nei vecchi impianti di San Pio X.',
      'Cedimento strutturale delle condotte di scarico in gres vitrificato nel centro storico dovuto alle vibrazioni del traffico pesante.',
      'Infiltrazioni di acqua meteorica nei garage interrati in zona Villaggio del Sole durante le "bombe d\'acqua" estive.',
      'Blocco delle valvole termostatiche per accumulo di fanghi magnetitici nei circuiti radianti obsoleti della zona Est.',
    ],
    climateImpact: 'L\'elevata umidità della Valle dell\'Astichello e l\'escursione termica tra le gelate invernali e l\'afa estiva causano forti dilatazioni termiche nelle tubazioni esterne dei condomini. Inoltre, la vicinanza della falda acquifera superficiale tipica della zona ripariale vicentina rende indispensabile l\'uso di pompe di sentina nei vani tecnici interrati per prevenire allagamenti durante le piene del Bacchiglione.',
    recentInterventions: [
      { type: 'Rifacimento colonna condominiale', zone: 'San Felice', description: 'Sostituzione integrale della colonna montante dell\'acqua fredda in un condominio degli anni \'70, gravemente ostruita dal calcare.' },
      { type: 'Trattamento acque e filtraggio', zone: 'Riviera Berica', description: 'Installazione di un sistema di addolcimento a resine e filtraggio meccanico per proteggere le caldaie a condensazione di un complesso residenziale.' },
      { type: 'Risanamento fognario no-dig', zone: 'Parco Querini / Centro Storico', description: 'Videoispezione e risanamento non invasivo (relining) di una vecchia condotta fognaria che presentava radici di alberi penetrate nelle giunture.' },
      { type: 'Manutenzione elettropompe di sollevamento', zone: 'Debba (zona golenale)', description: 'Sostituzione d\'urgenza di una pompa sommersa e installazione di allarme acustico in un garage seminterrato soggetto ad allagamenti.' },
      { type: 'Riqualificazione energetica impianto termico', zone: 'Santa Bertilla / San Francesco', description: 'Trasformazione di un vecchio impianto a pioggia in un sistema a zone con termoregolazione smart in un villino dei primi del \'900.' },
    ]
  },
  'terni': {
    buildingTypes: [
      'Case operaie del Villaggio Matteotti: architettura razionalista degli anni \'70 di Giancarlo De Carlo, caratterizzate da complessi sistemi di scarico integrati.',
      'Palazzotti signorili di fine \'800 in Corso Tacito: edifici con tubature originali in piombo o ferro galvanizzato e altezza dei soffitti che complica la pressione idrica.',
      'Edilizia intensiva del dopoguerra nel quartiere Polymer: palazzine con impianti a colonna montante singola e materiali spesso soggetti a corrosione galvanica.',
      'Case in pietra del borgo medievale di Collescipoli: pareti spesse oltre un metro che rendono estremamente complesso il passaggio di nuove linee idriche.',
      'Villette a schiera anni \'90 in zona Campitello: dotate di moderni impianti radianti, ma spesso soggette a problemi di calcare nelle caldaie a condensazione.',
    ],
    localProblems: [
      'Elevata durezza dell\'acqua proveniente dalle sorgenti della Valnerina, con conseguente calcificazione precoce degli scambiatori delle caldaie.',
      'Corrosione delle tubature interrate causata dalle correnti galvaniche disperse, frequenti nelle zone limitrofe al polo industriale AST (Acciai Speciali Terni).',
      'Sedimentazione di residui ferrosi nelle reti idriche delle zone storiche, che ostruiscono i filtri dei miscelatori dopo ogni manutenzione della rete pubblica.',
      'Allagamenti delle taverne nel quartiere San Giovanni a causa dell\'innalzamento della falda acquifera durante i periodi di piogge intense nella conca.',
      'Ritorno di odori sgradevoli dagli scarichi nei quartieri a densità industriale dovuti a squilibri di pressione nelle reti fognarie comunali.',
    ],
    climateImpact: 'Il microclima della conca ternana, caratterizzato da un\'elevatissima umidità e inversioni termiche, accelera i processi di ossidazione delle valvole esterne. Inoltre, le gelate improvvise che colpiscono le zone pedemontane come Piediluco o Marmore richiedono coibentazioni specifiche per evitare lo scoppio delle tubature esterne in polietilene.',
    recentInterventions: [
      { type: 'Rifacimento colonna di scarico', zone: 'Centro Storico (Via Roma)', description: 'Sostituzione integrale della dorsale di scarico in ghisa con tubazioni in PP insonorizzato in un palazzo d\'epoca.' },
      { type: 'Trattamento acque e filtraggio', zone: 'Borgo Rivo (Via del Centenario)', description: 'Installazione di un addolcitore a scambio ionico per proteggere l\'impianto termico dai depositi calcarei tipici della zona.' },
      { type: 'Efficientamento termico condonimiale', zone: 'Quartiere Italia (Via Piave)', description: 'Bilanciamento idraulico di un impianto centralizzato in un condominio degli anni \'60 per garantire acqua calda uniforme a tutti i piani.' },
      { type: 'Protezione antiallagamento seminterrati', zone: 'Gabelletta (Via Gabelletta)', description: 'Realizzazione di un sistema di drenaggio con pompe a immersione e valvole di non ritorno per proteggere i locali interrati.' },
      { type: 'Coibentazione antigelo per utenze esterne', zone: 'Piediluco (Zona belvedere)', description: 'Messa in sicurezza di tubature esterne esposte al gelo mediante guaine elastomeriche ad alto spessore.' },
    ]
  },
  'bolzano': {
    buildingTypes: [
      'Palazzi razionalisti di Corso Italia e Corso Libertà (anni \'30): strutture imponenti con impianti originali in ferro zincato spesso ostruiti dal calcare.',
      'Edifici in stile Liberty di Gries-Quirein: ville storiche con tubature in piombo o rame che richiedono risanamenti non invasivi per preservare i decori.',
      'Case a schiera e condomini ITEA di Don Bosco: edilizia popolare degli anni \'50-\'60 con colonne di scarico in ghisa soggette a corrosione interna.',
      'Masi storici e abitazioni rurali di Rencio e Santa Maddalena: murature in pietra massiccia dove l\'integrazione di sistemi di riscaldamento moderni è complessa.',
      'Nuovi complessi residenziali CasaClima A-Nature di Firmian: impianti ad alta efficienza con ventilazione meccanica controllata e riscaldamento a pavimento radiante.',
    ],
    localProblems: [
      'Elevata durezza dell\'acqua proveniente dalle fonti locali, che causa una rapida calcificazione degli scambiatori di calore delle caldaie.',
      'Congelamento delle tubature nei sottotetti delle case storiche del Centro durante i picchi di freddo pungente portati dal vento del nord (Tramontana).',
      'Ostruzione dei pluviali causata dai pollini e dai residui dei numerosi parchi urbani e vigneti limitrofi che circondano la città.',
      'Pressione idrica variabile nelle zone alte come la zona di Sant\'Osvaldo, che richiede l\'installazione di riduttori di pressione specifici.',
      'Corrosione galvanica nei raccordi di transizione tra vecchi impianti in ferro e nuovi tratti in multistrato, molto comune nelle ristrutturazioni a Oltrisarco.',
    ],
    climateImpact: 'Il microclima del catino di Bolzano, caratterizzato da forti escursioni termiche e inverni gelidi, richiede una coibentazione estrema delle condutture esterne per evitare lo scoppio delle valvole. L\'umidità estiva stagnante nella conca bolzanina rende inoltre critico il bilanciamento dei sistemi di raffrescamento a pavimento per evitare fenomeni di condensa superficiale.',
    recentInterventions: [
      { type: 'Pronto intervento gelo', zone: 'Piani di Bolzano (Bozner Boden)', description: 'Sostituzione urgente di una batteria di contatori gelata a causa di un isolamento insufficiente durante una notte a -10°C.' },
      { type: 'Bonifica anticalcare sistemi idrici', zone: 'Corso Libertà (Gries)', description: 'Decalcificazione chimica dell\'intero sistema di distribuzione ACS in un condominio degli anni \'30 per ripristinare la portata d\'acqua.' },
      { type: 'Efficientamento energetico CasaClima', zone: 'Quartiere Europa-Novacella (Europa-Neustift)', description: 'Installazione di un sistema ibrido caldaia a condensazione e pompa di calore in un attico per ottimizzare i consumi invernali.' },
      { type: 'Ricerca perdite e riparazione non invasiva', zone: 'Rencio (Rentsch)', description: 'Riparazione di una perdita occulta nel giardino di una villa storica tramite tecnologia no-dig per non rovinare il prato alberato.' },
      { type: 'Ristrutturazione idraulica completa condomino ITEA', zone: 'Don Bosco (quartiere operaio) underground', description: 'Rifacimento completo delle colonne di scarico degli appartamenti e installazione di cassette WC a incasso a basso consumo.' },
    ]
  },
  'novara': {
    buildingTypes: [
      'Cascine a corte chiusa di fine \'800: presenti nelle frazioni come Agogna e Casalgiate, caratterizzate da ampie tubazioni in ferro e pozzi artesiani originali.',
      'Condomini signorili anni \'60/\'70 in zona Sacro Cuore: architettura razionalista con impianti centralizzati originariamente a piombo o ferro zincato.',
      'Edifici storici del Centro (asse via Fratelli Rosselli): palazzi ottocenteschi con muri portanti spessi e sottotetti dove le diramazioni degli scarichi seguono pendenze irregolari.',
      'Residenziali moderni a basso impatto a Porta Mortara: nuove costruzioni con riscaldamento a pavimento e sistemi di ricircolo delle acque piovane.',
      'Case popolari post-belliche di Sant\'Agabio: costruzioni con distribuzioni idriche a colonna montante singola soggette a frequenti corrosioni.',
    ],
    localProblems: [
      'Elevata durezza dell\'acqua proveniente dalla falda freatica locale, che causa incrostazioni rapide su scambiatori di caldaie e soffioni.',
      'Risalita di umidità per capillarità nei seminterrati del centro storico, aggravata dalla vicinanza di vecchi canali irrigui oggi interrati.',
      'Ostruzione degli scarichi dovuta alla sedimentazione di residui limo-sabbiosi tipici del sottosuolo di pianura.',
      'Corrosione galvanica nei condomini anni \'70 per la coesistenza di tubi in rame e raccordi in ferro zincato senza giunti dielettrici.',
      'Allagamenti delle cantine nella zona Sud durante i periodi di forti piogge per il sovraccarico della rete fognaria mista.',
    ],
    climateImpact: 'Le forti escursioni termiche della pianura novarese, unite all\'umidità della zona risicola, accelerano la formazione di condensa nociva sulle tubazioni esterne non isolate. Inoltre, il gelo invernale prolungato mette a nido d\'ape i contatori situati nei pozzetti interrati non protetti nelle zone periferiche.',
    recentInterventions: [
      { type: 'Sostituzione tubazioni in ferro ammalorate', zone: 'Centro Storico (vicino al Duomo)', description: 'Rifacimento completo della dorsale di distribuzione acqua calda e fredda per un intero piano interrato.' },
      { type: 'Trattamento acque per calcare eccessivo', zone: 'Bicocca', description: 'Installazione di un sistema di addolcimento a resine per proteggere gli elettrodomestici di una palazzina.' },
      { type: 'Pronto intervento caldaie', zone: 'Veveri', description: 'Sostituzione d\'urgenza di una caldaia a condensazione esplosa per mancata manutenzione del sifone condensa.' },
      { type: 'Disotturazione fognaria professionale', zone: 'Sant\'Andrea', description: 'Videoispezione e stasatura di una colonna di scarico intasata da detriti cementizi vecchi.' },
      { type: 'Riqualificazione termica moderna', zone: 'Lumellogno', description: 'Posa di un impianto radiante a soffitto in una ristrutturazione di pregio in un ex opificio.' },
    ]
  },
  'piacenza': {
    buildingTypes: [
      'Case di ringhiera di inizio \'000 in zona via Roma e via Taverna, con tubature originali in piombo o ferro zincato spesso incrostate.',
      'Palazzi nobiliari del XVII-XVIII secolo nel Centro Storico (area Piazza Cavalli), caratterizzati da cortili interni e locali tecnici interrati soggetti a risalita capillare.',
      'Condomini intensivi degli anni \'60 e \'70 nel quartiere Besurica, con colonne di scarico in ghisa che presentano frequenti fenomeni di corrosione.',
      'Villette a schiera e monofamiliari della zona Veggioletta, tipiche dell\'espansione anni \'80, con impianti sottotraccia in rame.',
      'Edilizia popolare del quartiere Farnesiana (anni \'50), con necessità di rifacimento integrale delle reti di adduzione idrica esterne.',
    ],
    localProblems: [
      'Eccessiva durezza dell\'acqua proveniente dai pozzi locali, che causa occlusioni calcaree precoci in caldaie e scambiatori di calore.',
      'Allagamenti di scantinati e taverne nel quartiere Belvedere dovuti alla saturazione della rete fognaria durante i violenti temporali estivi.',
      'Corrosione galvanica negli impianti misti (ferro-rame) frequenti nelle ristrutturazioni parziali dei palazzi di via XX Settembre.',
      'Presenza di depositi sabbiosi e sedimenti fini nelle reti idriche della zona Sant\'Antonio, che danneggiano le cartucce dei miscelatori.',
      'Rotture da sbalzo termico sulle condotte interrate in zone periferiche soggette a forti gelate notturne.',
    ],
    climateImpact: 'Il clima fortemente continentale di Piacenza, con inverni rigidi e nebbiosi, espone le tubazioni esterne e i contatori a forti rischi di congelamento, specialmente nelle zone più aperte come San Lazzaro. L\'alto tasso di umidità della Pianura Padana accelera inoltre l\'ossidazione della componentistica metallica esposta nei sottotetti e nelle cantine.',
    recentInterventions: [
      { type: 'Trattamento acque e manutenzione straordinaria', zone: 'Quartiere Besurica', description: 'Rostituzione integrale dei flessibili e installazione addolcitore a sali per contrastare il calcare aggressivo della zona.' },
      { type: 'Riparazione perdite occulte', zone: 'Via Campagna (Centro Storico)', description: 'Risanamento non invasivo (relining) di una colonna di scarico in ghisa fessurata in un palazzo storico.' },
      { type: 'Rifacimento impianto idrico sanitario', zone: 'Zona Via Roma / I Macelli', description: 'Bonifica dell\'impianto di adduzione con rimozione dei tratti residui in piombo e sostituzione con multistrato.' },
      { type: 'Adeguamento sistema di scarico anti-allagamento', zone: 'Argine Po / Borgotrebbia', description: 'Installazione di valvole di non ritorno clapet per prevenire il reflusso fognario durante le piene del Po e del Trebbia.' },
      { type: 'Riparazione sistema di riscaldamento', zone: 'Quartiere San Lazzaro / Università Cattolica', description: 'Sostituzione rapida di un circolatore grippato e lavaggio chimico dell\'impianto radiante a pavimento.' },
    ]
  },
  'ancona': {
    buildingTypes: [
      'Case a schiera dei pescatori nel Rione Porto: risalenti al XIX secolo, con murature portanti in mattoni pieni e spazi angusti che complicano il rifacimento dei montanti idrici.',
      'Palazzi signorili di Corso Garibaldi e Corso Stamira: architettura umbertina di fine \'800 e primo \'900, caratterizzata da soffitti altissimi e vecchie tubazioni in piombo o ferro galvanizzato spesso incassate in spessori murari considerevoli.',
      'Edilizia intensiva del Dopoguerra nel quartiere Adriatico: complessi degli anni \'50 e \'60 con impianti centralizzati che oggi soffrono di corrosione galvanica e perdite nei radiatori in ghisa.',
      'Condomini moderni di Brecce Bianche e Q2: architettura degli anni \'80 e \'90 che utilizza i primi sistemi in multistrato e collettori, situati in zone collinari esposte a forti sbalzi di pressione.',
      'Case coloniche e ville storiche tra Pietralacroce e il Monte Conero: strutture in pietra calcarea del Conero, dove l\'integrazione di sistemi moderni (come pompe di calore) deve rispettare vincoli paesaggistici rigidi.',
    ],
    localProblems: [
      'Elevata durezza dell\'acqua proveniente dall\'acquedotto del Gorgovivo, che causa incrostazioni calcaree severe su scambiatori di calore e soffioni doccia.',
      'Corrosione da nebbia salina per le componenti metalliche esposte all\'esterno, particolarmente critica nelle zone del Guasco e del rione San Pietro.',
      'Sbalzi di pressione idrica causati dall\'orografia collinare della città (continui saliscendi tra Posatora, Pinocchio e il centro), che sollecitano le valvole di sicurezza.',
      'Infiltrazioni di acqua piovana nelle vecchie condotte fognarie miste del centro storico durante le "bombe d\'acqua" autunnali.',
      'Ostruzioni frequenti negli scarichi dovute alla conformazione delle reti fognarie storiche a bassa pendenza nel quartiere degli Archi.',
    ],
    climateImpact: 'L\'elevata salinità dell\'aria marina, portata dal vento di Maestrale e Scirocco, accelera drasticamente l\'ossidazione delle unità esterne delle pompe di calore e delle caldaie installate sui balconi fronte mare. Inoltre, l\'umidità persistente tipica del microclima tra il porto e il Passetto favorisce fenomeni di condensa interstiziale che danneggiano le coibentazioni delle tubazioni.',
    recentInterventions: [
      { type: 'Trattamento acque e filtraggio', zone: 'Pietralacroce', description: 'Installazione di un addolcitore a scambio ionico per proteggere i nuovi impianti radianti dai depositi di calcare dell\'acqua del Gorgovivo.' },
      { type: 'Rifacimento colonna di scarico condominiale', zone: 'Quartiere Adriatico (zona Passetto)', description: 'Sostituzione di una vecchia colonna di scarico in eternit con tubazioni in PP insonorizzato in un palazzo degli anni \'60.' },
      { type: 'Riparazione perdita idrica sottotraccia', zone: 'Rione San Pietro (Centro Storico)', description: 'Intervento d\'urgenza per la riparazione di una tubazione in ferro invecchiata all\'interno di una muratura in mattoni del 1800.' },
      { type: 'Riqualificazione energetica centrale termica', zone: 'Quartiere Q3 (Brecce Bianche)', description: 'Adeguamento della centrale termica con installazione di caldaie a condensazione ad alta efficienza in un complesso residenziale.' },
      { type: 'Installazione sistema anti-allagamento', zone: 'Quartiere degli Archi (vicino alla Stazione)', description: 'Installazione di pompe ad immersione con sensori di allagamento per prevenire i danni causati dal reflusso delle acque nere durante i temporali.' },
    ]
  },
  'andria': {
    buildingTypes: [
      'Palazzi nobiliari del Centro Storico (area limitrofa alla Cattedrale): Strutture medievali e rinascimentali con murature a sacco e cisterne ipogee per il recupero dell\'acqua piovana.',
      'Case a corte del Rione Grotte: Abitazioni storiche scavate in parte nel tufo, caratterizzate da alti livelli di umidità di risalita e condutture in piombo o ghisa originali.',
      'Condomini anni \'60/\'70 in zona Viale Venezia Giulia: Edifici intensivi del boom economico con impianti centralizzati originariamente in ferro zincato, oggi soggetti a corrosione.',
      'Ville e residenze moderne di Castel del Monte/Montegrosso: Strutture isolate con impianti di depurazione autonomi e sistemi di irrigazione alimentati da pozzi artesiani.',
      'Palazzine a schiera del quartiere San Valentino: Edilizia popolare e residenziale moderna con frequenti problemi di pressione dovuti alla posizione sopraelevata rispetto ai nodi idrici principali.',
    ],
    localProblems: [
      'Calcare estremamente aggressivo tipico della Murgia, che ostruisce serpentini di caldaie e scambiatori di calore in tempi brevi.',
      'Infiltrazioni termiche e umidità nelle abitazioni ipogee dei quartieri storici, causate dalla porosità del tufo locale.',
      'Corrosione galvanica delle vecchie tubature in ferro zincato nelle zone di espansione anni \'70.',
      'Malfunzionamento delle pompe di sollevamento nei quartieri nuovi (zona via Bisceglie) a causa di sbalzi di pressione della rete idrica extraurbana.',
      'Ostruzione dei pluviali a causa dell\'accumulo di polvere calcarea e terra rossa trasportata dal vento di scirocco.',
    ],
    climateImpact: 'Il clima di Andria, caratterizzato da estati torride e inverni brevi ma con improvvise gelate dovute alla vicinanza alle Murge, mette a dura prova le tubature esterne non coibentate. Inoltre, i periodi di siccità prolungata seguiti da piogge torrenziali causano il sovraccarico delle vecchie reti fognarie miste del centro, provocando rigurgiti nei seminterrati.',
    recentInterventions: [
      { type: 'Rifacimento impianto idrico condominiale', zone: 'Quartiere Pineta (Viale Gramsci)', description: 'Sostituzione integrale della colonna montante in ferro con multistrato in un condominio degli anni \'70 per eliminare perdite occulte.' },
      { type: 'Installazione sistema di trattamento acque', zone: 'Zona Cappuccini', description: 'Installazione di un addolcitore a scambio ionico ad alta capacità per proteggere gli impianti di un intero stabile dal calcare murgiano.' },
      { type: 'Risanamento fognario e videoispezione', zone: 'Quartiere Santa Maria Vetere', description: 'Videoispezione e risanamento non distruttivo di uno scarico in gres ostruito da radici di alberi secolari.' },
      { type: 'Sostituzione caldaia e lavaggio impianto', zone: 'Quartiere Europa (Via Trani)', description: 'Sostituzione urgente di una caldaia a condensazione e lavaggio chimico dell\'impianto radiante dopo il blocco dovuto alla sabbia calcarea.' },
      { type: 'Bonifica umidità e sistemi antiallagamento', zone: 'Centro Storico (vicinanze Piazza La Corte)', description: 'Impermeabilizzazione delle pareti contro terra e installazione di pompe sommerse per prevenire allagamenti da risalita.' },
    ]
  },
  'arezzo': {
    buildingTypes: [
      'Palazzi nobiliari del centro storico (XIII-XVI secolo): Strutture in pietra e mattoni lungo Corso Italia e Piazza Grande, con condotte di scarico in piombo o ceramica incassate in mura spesse oltre un metro.',
      'Case a schiera del quartiere Giotto (anni \'60-\'70): Edilizia signorile del boom economico con impianti in ferro zincato soggetti a corrosione galvanica e originali sistemi di riscaldamento centralizzato.',
      'Case torri medioevali di via Pescioni e via di Sapia: Spazi angusti che richiedono soluzioni idrauliche verticali complesse e sistemi di pompaggio per superare i dislivelli storici.',
      'Condomini anni \'50 di zona Saione: Edifici con colonne montanti vetuste spesso situate in cavedi stretti, tipici dell\'espansione ferroviaria post-bellica.',
      'Ville rinascimentali e leopoldine nella zona di Santa Maria delle Grazie: Residenze con ampi giardini che richiedono gestione complessa di cisterne storiche e sistemi di irrigazione moderni integrati.',
    ],
    localProblems: [
      'Elevata durezza dell\'acqua proveniente dall\'invaso di Montedoglio, che causa incrostazioni calcaree accelerate nelle caldaie e negli scambiatori di calore.',
      'Corrosione delle vecchie tubature in ferro nei quartieri periferici dovuta alla composizione minerale del terreno locale.',
      'Ritorno di riflusso fognario durante le "bombe d\'acqua" estive nelle zone più basse del quartiere Pescaiola.',
      'Ostruzioni da sedimenti limosi nelle diramazioni idriche della zona di San Lorentino, legate ai lavori di manutenzione delle reti cittadine.',
      'Shock termici sulle tubazioni nei sottotetti delle case di via Guido Monaco, esposte a temperature estreme senza ventilazione.',
    ],
    climateImpact: 'Le forti escursioni termiche tipiche della conca aretina, con inverni rigidi che portano gelate improvvise, causano frequenti rotture delle tubazioni esterne non isolate, specialmente nelle zone pedecollinari. Inoltre, l\'umidità di risalita dalle falde vicine al torrente Castro mette a dura prova la tenuta delle giunzioni degli scarichi nelle fondamenta dei palazzi storici.',
    recentInterventions: [
      { type: 'Risanamento non invasivo scarichi', zone: 'Centro Storico (vicino Duomo)', description: 'Sostituzione completa della colonna montante in un palazzo storico con tecnologie no-dig per non danneggiare gli affreschi.' },
      { type: 'Trattamento acque e decalcificazione', zone: 'Quartiere Giotto', description: 'Installazione di un sistema di addolcimento magnetico industriale per proteggere le caldaie di un intero isolato dal calcare di Montedoglio.' },
      { type: 'Riparazione perdite occulte per gelo', zone: 'Santa Maria delle Grazie', description: 'Riparazione d\'urgenza di una tubazione sotterranea esplosa a causa del gelo notturno in una residenza storica.' },
      { type: 'Adeguamento sistema anti-allagamento fognario', zone: 'Pescaiola', description: 'Aggiornamento dell\'impianto di sollevamento acque reflue per prevenire allagamenti durante le piogge intense.' },
      { type: 'Ristrutturazione idraulica completa', zone: 'Zona Saione (via Guelfa)', description: 'Rifacimento totale dell\'impianto idraulico di un appartamento anni \'50 con sostituzione del vecchio piombo con multistrato.' },
    ]
  },
  'udine': {
    buildingTypes: [
      'Case a schiera del primo Novecento in Borgo Grazzano, con tubature in piombo originali e scarichi stretti sottodimensionati.',
      'Condomini degli anni \'60 e \'70 nel quartiere San Domenico, caratterizzati da colonne di scarico in ghisa soggette a corrosione galvanica.',
      'Ville liberty di via Diaz e zona Ospedale, con impianti idrici monumentali che richiedono manutenzione conservativa specialistica.',
      'Edifici moderni e uffici compatti del quartiere Chiavris, con sistemi di riscaldamento a pavimento e caldaie a condensazione di ultima generazione.',
      'Case coloniche friulane ristrutturate a Beivars e Godia, con sistemi di adduzione acqua che spesso attingono da pozzi artesiani privati.',
    ],
    localProblems: [
      'Elevata durezza dell\'acqua proveniente dall\'acquedotto del Torre, che causa incrostazioni calcaree severe negli scambiatori delle caldaie.',
      'Congelamento delle condutture esterne e dei contatori durante le gelate invernali tipiche del Friuli centrale.',
      'Cavitazione e vibrazioni nelle tubature causate dagli sbalzi di pressione della rete idrica comunale in alcune zone del centro.',
      'Ostruzioni frequenti da radici di tigli e platani nelle vecchie condutture fognarie in cemento dei borghi storici.',
      'Perdite occulte nelle reti di distribuzione interrate a causa dell\'assestamento dei terreni ghiaiosi morenici su cui sorge la città.',
    ],
    climateImpact: 'Il clima di Udine, caratterizzato da inverni rigidi e un\'umidità costante dovuta alla vicinanza delle Prealpi, sottopone le tubature esterne a forti stress termici. Inoltre, le abbondanti piogge autunnali mettono a dura prova i sistemi di drenaggio e le pompe di sentina nei numerosi interrati del centro storico.',
    recentInterventions: [
      { type: 'Risanamento fognario e videoispezione', zone: 'Borgo Villalta', description: 'Sostituzione completa del collettore principale di scarico in un palazzo d\'epoca per prevenire infiltrazioni nelle cantine.' },
      { type: 'Trattamento acque e anticalcare', zone: 'Laipacco', description: 'Installazione di un sistema di addolcimento a resine per proteggere l\'impianto idraulico di una villa singola.' },
      { type: 'Ristrutturazione impianto idrico-sanitario', zone: 'Quartiere Aurora (via Riccardo Di Giusto)', description: 'Rifacimento integrale del bagno con tubazioni in multistrato e installazione di cassetta di scarico incassata.' },
      { type: 'Riparazione perdite ed emergenza idraulica', zone: 'Paderno', description: 'Pronto intervento notturno per la rottura di una tubazione in ferro zincato causata dal gelo.' },
      { type: 'Efficientamento energetico impianto termico', zone: 'Rizzi (vicino allo Stadio)', description: 'Upgrade dell\'impianto di riscaldamento con installazione di valvole termostatiche e lavaggio chimico del circuito.' },
    ]
  },
  'cesena': {
    buildingTypes: [
      'Case a schiera del centro storico (es. via Zeffirino Re), risalenti al XV-XVII secolo con cantine umide e tubature in piombo o ghisa stratificata.',
      'Case coloniche della Centuriazione Romana (zona San Giorgio/Pievesestina), con impianti pozzo-dipendenti e sistemi di irrigazione integrati.',
      'Condomini degli anni \'60 e \'70 del quartiere Oltresavio, caratterizzati da colonne di scarico in fibro-cemento e riscaldamenti centralizzati a colonna montante.',
      'Ville Liberty e art deco della zona Viale Mazzoni-Osservanza, con bagni dalle ampie volumetrie e rubinetterie pesanti montate su pareti portanti spesse.',
      'Edilizia moderna biosostenibile nel quartiere ex-Zuccherificio, con impianti radianti a pavimento e sistemi di recupero acque grigie per l\'irrigazione dei terrazzi.',
    ],
    localProblems: [
      'Sedimentazione di calcare estrema dovuta all\'elevata durezza dell\'acqua proveniente dall\'acquedotto di Ridracoli miscelata con fonti locali.',
      'Corrosione galvanica nei vecchi impianti della zona Valzania a causa della commistione tra tubature storiche in ferro e nuovi raccordi in rame.',
      'Intasamento cronico delle caditoie esterne nelle zone collinari (Diegaro e San Carlo) per via dei residui argillosi trasportati dall\'acqua piovana.',
      'Presenza di depositi sabbiosi nei filtri dei miscelatori per le abitazioni servite da pozzi artesiani nella zona di Sant\'Egidio.',
      'Perdite occulte nelle dorsali di distribuzione interrate dei giardini del quartiere Fiorenzuola, aggravate dai movimenti di assestamento del terreno argilloso.',
    ],
    climateImpact: 'Le forti escursioni termiche tipiche della valle del Savio e le gelate improvvise che colpiscono la prima collina cesenate (es. zona Madonna del Monte) mettono a dura prova la tenuta delle valvole di sfiato e delle caldaie esterne non isolate. Le alluvioni e le piene del fiume Savio richiedono inoltre un\'attenzione maniacale alle valvole antiriflusso per evitare il rigurgito delle reti fognarie nei piani seminterrati.',
    recentInterventions: [
      { type: 'Rifacimento colonna scarico e addolcimento', zone: 'Viale Carducci (vicino alla Barriera)', description: 'Sostituzione integrale della colonna di scarico principale degradata dal tempo e installazione di un moderno addolcitore centralizzato a sale.' },
      { type: 'Disostruzione fognaria complessa', zone: 'Quartiere San Vittore', description: 'Videoispezione di emergenza e spurgo dei condotti interrati ostruiti da radici di alberi secolari e sedimenti alluvionali.' },
      { type: 'Efficientamento energetico termico', zone: 'Quartiere Ponte Pietra', description: 'Conversione di un vecchio impianto a radiatori in ghisa con un sistema a pompa di calore e integrazione di un accumulo tecnico per ridurre l\'impatto energetico.' },
      { type: 'Installazione valvole antiriflusso per protezione idrogeologica', zone: 'Zona Mulini/Ex-Zuccherificio', description: 'Montaggio di una serie di valvole a clapet antiriflusso per proteggere le pertinenze sotterranee dalle piene del canale Molini.' },
      { type: 'Riparazione perdite idriche occulte', zone: 'Quartiere Case Finali', description: 'Intervento di riparazione localizzata su tubature in rame danneggiate da correnti vaganti in una palazzina degli anni \'80.' },
    ]
  },
  'lecce': {
    buildingTypes: [
      'Palazzi gentilizi in Barocco Leccese (Centro Storico - XVII/XVIII sec.) con facciate in pietra leccese porosa.',
      'Case a corte medievali e rinascimentali (quartiere San Biagio/Santa Rosa) con pavimentazioni in basolato.',
      'Condomini degli anni \'60 e \'70 (Quartiere Salesiani/Mazzini) con vecchie colonne di scarico in ghisa.',
      'Villette a schiera e residenze moderne (Comparto 35/Arnesano) con impianti a collettore.',
      'Case coloniche e masserie storiche periurbane (zona Fondone/San Ligorio) con sistemi di approvvigionamento autonomi.',
    ],
    localProblems: [
      'Accumuli massicci di calcare dovuti all\'estrema durezza dell\'acqua proveniente dall\'Acquedotto Pugliese (origine sorgiva/carsica).',
      'Corrosione delle tubazioni interrate causata dalla salinità dell\'aria, particolarmente sentita nelle zone esposte ai venti di Scirocco.',
      'Ostruzioni frequenti da sedimenti di pietra leccese (polvere e frammenti) nei canali di scolo delle acque bianche.',
      'Shock termici sulle caldaie a causa della temperatura dell\'acqua in ingresso che varia drasticamente tra estate e inverno.',
      'Infiltrazioni nelle cantine del centro storico dovute alla risalita per capillarità favorita dalla natura porosa del sottosuolo in calcarenite.',
    ],
    climateImpact: 'Il clima sub-tropicale di Lecce, con estati torride e prolungate, causa una dilatazione termica eccessiva delle tubazioni esterne non isolate, mentre l\'umidità di risalita tipica del terreno carsico salentino accelera la corrosione galvanica dei raccordi metallici nei sottosudoli.',
    recentInterventions: [
      { type: 'Relining condotta di scarico', zone: 'Quartiere Mazzini', description: 'Videoispezione e risanamento non distruttivo di uno scarico in ghisa corroso in un palazzo di Via Trinchese.' },
      { type: 'Decalcificazione impianto termico', zone: 'Rione Santa Rosa', description: 'Rimozione radicale di incrostazioni calcaree che ostruivano lo scambiatore di calore di una caldaia a condensazione.' },
      { type: 'Rifacimento bagno e filtraggio acqua', zone: 'Quartiere Castromediano', description: 'Installazione di un sistema di addolcimento a monte dell\'impianto e rifacimento tubazioni in multistrato.' },
      { type: 'Ricerca perdite idriche e restauro tubazioni', zone: 'Centro Storico (vicinanze Chiesa Greca)', description: 'Riparazione di una perdita occulta sotto il basolato interno di una corte storica del \'700 utilizzando geofoni.' },
      { type: 'Potenziamento gruppo pompe e accumulo idrico', zone: 'Zona Stadio (Via Giovanni Paolo II)', description: 'Ottimizzazione dell\'autoclave per garantire pressione costante ai piani alti durante i picchi di prelievo estivi.' },
    ]
  },
};

// Default content for cities not in the detailed list
const DEFAULT_LOCAL_CONTENT: CityLocalContent = {
  buildingTypes: [
    'Edifici residenziali del centro storico',
    'Condomini anni \'60-\'80',
    'Villette unifamiliari nelle zone periferiche',
    'Nuove costruzioni residenziali',
    'Edifici commerciali e misti'
  ],
  localProblems: [
    'Tubature datate soggette a corrosione e perdite',
    'Scarichi intasati da calcare e residui',
    'Caldaie che richiedono manutenzione stagionale',
    'Problemi di pressione idrica in alcuni quartieri',
    'Impianti obsoleti nei condomini più vecchi'
  ],
  climateImpact: 'Le variazioni stagionali influenzano gli impianti idraulici: inverni freddi stressano caldaie e tubazioni esterne, mentre l\'umidità può accelerare la corrosione. Una manutenzione regolare previene i problemi più comuni.',
  recentInterventions: [
    { type: 'Riparazione perdita', zone: 'Centro', description: 'Intervento su perdita tubatura in appartamento' },
    { type: 'Spurgo scarichi', zone: 'Zona residenziale', description: 'Disostruzione scarico cucina intasato' },
    { type: 'Manutenzione caldaia', zone: 'Periferia', description: 'Revisione e pulizia caldaia a gas' },
    { type: 'Sostituzione rubinetto', zone: 'Centro storico', description: 'Installazione nuovo rubinetto bagno' },
    { type: 'Emergenza idraulica', zone: 'Condominio', description: 'Pronto intervento per blocco scarico' }
  ]
};

// Generate content with consistent variation for cities not in detailed list
function generateVariedContent(cityName: string, citySlug: string, region: string): CityLocalContent {
  // Use city slug as seed for consistent but varied content
  let hash = 0;
  for (let i = 0; i < citySlug.length; i++) {
    hash = ((hash << 5) - hash) + citySlug.charCodeAt(i);
    hash = hash & hash;
  }
  const idx = Math.abs(hash) % 4;
  
  // Regional climate variations
  const climateVariations: Record<string, string> = {
    'Lombardia': `Gli inverni rigidi della ${region} mettono sotto stress gli impianti di riscaldamento. Il calcare elevato dell'acqua lombarda accelera l'usura delle tubature. La manutenzione preventiva è fondamentale per evitare emergenze nei mesi freddi.`,
    'Lazio': `Il clima mediterraneo del ${region} con estati calde richiede impianti efficienti per l'acqua calda sanitaria. Le piogge autunnali intense possono sovraccaricare gli scarichi. Gli sbalzi termici stressano le giunzioni degli impianti datati.`,
    'Campania': `L'aria marina della ${region} accelera la corrosione delle tubature metalliche. L'umidità elevata favorisce depositi calcarei. Una buona manutenzione protegge gli impianti dall'usura accelerata tipica delle zone costiere.`,
    'Piemonte': `Gli inverni molto freddi del ${region} causano rischio gelo per tubazioni esterne. Le escursioni termiche stressano raccordi e giunzioni. Il riscaldamento è sotto sforzo per molti mesi, richiedendo manutenzione regolare.`,
    'Veneto': `L'umidità del ${region} favorisce corrosione e condensa negli impianti. Gli inverni nebbiosi richiedono impianti di riscaldamento efficienti. La manutenzione stagionale previene i problemi più comuni.`,
    'Emilia-Romagna': `Il clima continentale dell'${region} con inverni freddi e nebbiosi stressa caldaie e impianti. L'umidità elevata accelera l'usura. Le estati calde richiedono impianti per acqua calda sanitaria ben dimensionati.`,
    'Toscana': `Il clima mite della ${region} riduce i problemi di gelo, ma le case storiche hanno spesso impianti datati che richiedono attenzione. L'acqua dura in alcune zone accelera la formazione di calcare nelle tubature.`,
    'Puglia': `Il clima mediterraneo della ${region} con estati molto calde mette sotto stress i sistemi di produzione acqua calda. L'aria marina nelle zone costiere accelera la corrosione. La prevenzione è essenziale.`,
    'Sicilia': `Il clima caldo della ${region} riduce i problemi di gelo ma aumenta la domanda di acqua potabile. Le tubature nelle zone costiere soffrono la salsedine. La manutenzione estiva è importante per prevenire blocchi.`,
    'Liguria': `Il clima marittimo della ${region} causa corrosione accelerata negli impianti esposti. L'umidità costante favorisce depositi e ostruzioni. Una manutenzione regolare protegge le tubature dall'usura.`
  };
  
  return {
    buildingTypes: [
      `Edifici storici del centro di ${cityName}`,
      'Condomini residenziali anni \'60-\'80 con impianti originali',
      'Villette e case indipendenti nelle zone periferiche',
      'Nuove costruzioni con impianti moderni in multistrato',
      'Edifici misti residenziali e commerciali'
    ],
    localProblems: [
      `Tubature datate nei quartieri storici di ${cityName} soggette a perdite`,
      'Scarichi intasati da calcare e residui organici nei condomini',
      'Caldaie che necessitano manutenzione stagionale regolare',
      `Problemi di pressione idrica in alcune zone di ${cityName}`,
      'Impianti obsoleti che richiedono aggiornamento nei vecchi edifici'
    ],
    climateImpact: climateVariations[region] || DEFAULT_LOCAL_CONTENT.climateImpact,
    recentInterventions: [
      { type: 'Riparazione perdita', zone: 'Centro', description: `Intervento su perdita tubatura in appartamento a ${cityName}` },
      { type: 'Spurgo scarichi', zone: 'Zona nord', description: 'Disostruzione completa scarico cucina intasato' },
      { type: 'Manutenzione caldaia', zone: 'Zona residenziale', description: 'Revisione e pulizia caldaia a gas con sostituzione pezzi' },
      { type: 'Emergenza allagamento', zone: 'Centro storico', description: 'Pronto intervento notturno per tubo rotto' },
      { type: 'Sostituzione sanitari', zone: 'Periferia', description: 'Installazione nuovi sanitari in bagno ristrutturato' }
    ]
  };
}

/**
 * Get local content for a specific city
 */
export function getCityLocalContent(citySlug: string, cityName: string, region: string): CityLocalContent {
  // Check if we have detailed content for this city
  if (CITY_LOCAL_CONTENT[citySlug]) {
    return CITY_LOCAL_CONTENT[citySlug];
  }
  
  // Generate varied content for other cities
  return generateVariedContent(cityName, citySlug, region);
}

/**
 * Get city-specific FAQ items (localized for SEO)
 */
export function getCityLocalFAQs(cityName: string, province: string): Array<{ question: string; answer: string }> {
  return [
    {
      question: `Quanto costa chiamare un idraulico a ${cityName}?`,
      answer: `A ${cityName} il costo di un idraulico parte da 40-60€ per la chiamata base, più il costo dell'intervento che varia da 50€ per riparazioni semplici a 200-400€ per lavori complessi. Su Idraulici Subito puoi richiedere preventivi gratuiti e confrontare i prezzi dei professionisti della provincia di ${province}.`
    },
    {
      question: `In quanto tempo arriva un idraulico a ${cityName}?`,
      answer: `I nostri professionisti a ${cityName} rispondono in media entro 15-30 minuti dalla richiesta. Per le emergenze urgenti, gli idraulici della zona possono intervenire anche in meno di un'ora, a seconda del quartiere e della disponibilità.`
    },
    {
      question: `Trovate idraulici anche nei quartieri periferici di ${cityName}?`,
      answer: `Sì, la nostra rete copre tutti i quartieri di ${cityName} e i comuni limitrofi della provincia di ${province}. Che tu sia in centro o in periferia, troverai professionisti disponibili nella tua zona.`
    },
    {
      question: `Gli idraulici a ${cityName} fanno interventi urgenti nei weekend?`,
      answer: `Molti dei nostri professionisti a ${cityName} offrono disponibilità 24/7, inclusi weekend e festivi. Gli interventi fuori orario possono prevedere una maggiorazione, che viene sempre comunicata prima dell'intervento.`
    },
    {
      question: `Come posso verificare l'affidabilità di un idraulico a ${cityName}?`,
      answer: `Su Idraulici Subito tutti i professionisti di ${cityName} sono verificati e puoi vedere le recensioni dei clienti precedenti. Prima di confermare un intervento, controlla sempre il profilo del professionista e chiedi un preventivo dettagliato.`
    },
    {
      question: `Quali sono i problemi idraulici più comuni a ${cityName}?`,
      answer: `A ${cityName} i problemi più frequenti sono perdite d'acqua da tubature vecchie, scarichi intasati, guasti alla caldaia durante l'inverno e rubinetti che perdono. Gli edifici più datati della città presentano spesso impianti che necessitano aggiornamento.`
    },
    {
      question: `È possibile avere un preventivo gratuito a ${cityName}?`,
      answer: `Assolutamente sì! Su Idraulici Subito la richiesta di preventivo è sempre gratuita e senza impegno. Descrivi il tuo problema, indica la zona di ${cityName} e riceverai proposte da professionisti qualificati della tua area.`
    }
  ];
}
