// Blog data for SEO-optimized articles
// Practical guides and tutorials for plumbing topics

export interface BlogArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  excerpt: string;
  content: string; // HTML content
  category: 'guide-pratiche' | 'manutenzione' | 'emergenze' | 'risparmio' | 'normative';
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readingTime: number; // minutes
  featuredImage?: string;
}

export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: 'guide-pratiche',
    name: 'Guide Pratiche',
    description: 'Tutorial passo-passo per piccole riparazioni fai da te',
    icon: 'BookOpen'
  },
  {
    slug: 'manutenzione',
    name: 'Manutenzione Casa',
    description: 'Consigli per la manutenzione degli impianti idraulici',
    icon: 'Wrench'
  },
  {
    slug: 'emergenze',
    name: 'Emergenze Idrauliche',
    description: 'Come comportarsi in caso di emergenze e guasti improvvisi',
    icon: 'AlertTriangle'
  },
  {
    slug: 'risparmio',
    name: 'Risparmio e Efficienza',
    description: 'Consigli per risparmiare acqua e ridurre le bollette',
    icon: 'PiggyBank'
  },
  {
    slug: 'normative',
    name: 'Normative e Bonus',
    description: 'Agevolazioni fiscali e normative per impianti idraulici',
    icon: 'FileText'
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  // === GUIDE PRATICHE ===
  {
    slug: 'come-sturare-lavandino-intasato',
    title: 'Come Sturare un Lavandino Intasato: 5 Metodi Efficaci',
    metaTitle: 'Come Sturare Lavandino Intasato: Guida Completa 2025',
    metaDescription: 'Scopri come sturare un lavandino intasato con metodi fai da te efficaci. Dalla ventosa al bicarbonato, tutti i trucchi per liberare lo scarico.',
    h1: 'Come Sturare un Lavandino Intasato',
    excerpt: 'Lavandino otturato? Ecco 5 metodi efficaci per sturarlo senza chiamare l\'idraulico. Dal bicarbonato alla ventosa, scopri come fare.',
    category: 'guide-pratiche',
    tags: ['lavandino intasato', 'sturare scarico', 'fai da te', 'bicarbonato', 'ventosa'],
    publishedAt: '2025-01-10',
    updatedAt: '2025-01-10',
    readingTime: 6,
    content: `
      <h2>Perché il lavandino si intasa?</h2>
      <p>Il lavandino può intasarsi per diversi motivi: accumulo di capelli, residui di sapone, grasso e detriti alimentari. Prima di chiamare un idraulico, puoi provare alcuni metodi fai da te efficaci.</p>
      
      <h2>1. Metodo dell'acqua bollente</h2>
      <p>Il metodo più semplice: versa lentamente un litro di acqua bollente nello scarico. L'acqua calda scioglie i grassi e può liberare l'ostruzione leggera.</p>
      <ul>
        <li>Porta a ebollizione 1-2 litri d'acqua</li>
        <li>Versala lentamente nello scarico</li>
        <li>Attendi qualche minuto e ripeti se necessario</li>
      </ul>
      
      <h2>2. Bicarbonato e aceto</h2>
      <p>Questo metodo naturale crea una reazione effervescente che può sciogliere l'ostruzione:</p>
      <ol>
        <li>Versa mezza tazza di bicarbonato nello scarico</li>
        <li>Aggiungi mezza tazza di aceto bianco</li>
        <li>Copri lo scarico e attendi 15-30 minuti</li>
        <li>Risciacqua con acqua bollente</li>
      </ol>
      
      <h2>3. La ventosa</h2>
      <p>La classica ventosa è efficace per ostruzioni più resistenti:</p>
      <ul>
        <li>Riempi il lavandino con qualche centimetro d'acqua</li>
        <li>Posiziona la ventosa sullo scarico creando una buona tenuta</li>
        <li>Pompa energicamente per 20-30 secondi</li>
        <li>Ripeti se necessario</li>
      </ul>
      
      <h2>4. Pulizia del sifone</h2>
      <p>Se i metodi precedenti non funzionano, potrebbe essere necessario smontare il sifone:</p>
      <ol>
        <li>Posiziona una bacinella sotto il sifone</li>
        <li>Svita il sifone (di solito a mano)</li>
        <li>Pulisci l'interno con uno spazzolino</li>
        <li>Rimonta e verifica che non ci siano perdite</li>
      </ol>
      
      <h2>5. Sonda flessibile</h2>
      <p>Per ostruzioni profonde, una sonda flessibile (disponibile nei negozi di bricolage) può essere la soluzione.</p>
      
      <h2>Quando chiamare l'idraulico</h2>
      <p>Se nessun metodo funziona, l'ostruzione potrebbe essere più profonda o seria. In questi casi, <strong>è meglio affidarsi a un professionista</strong> che dispone di strumenti come l'idrogetto e la videoispezione.</p>
      
      <div class="cta-box">
        <p><strong>Hai provato tutto senza successo?</strong> Richiedi un preventivo gratuito da un idraulico qualificato nella tua zona.</p>
      </div>
    `
  },
  {
    slug: 'come-sostituire-rubinetto-cucina',
    title: 'Come Sostituire il Rubinetto della Cucina: Guida Passo Passo',
    metaTitle: 'Sostituire Rubinetto Cucina: Tutorial Completo 2025',
    metaDescription: 'Guida completa per sostituire il rubinetto della cucina. Attrezzi necessari, procedura passo-passo e consigli per evitare errori comuni.',
    h1: 'Come Sostituire il Rubinetto della Cucina',
    excerpt: 'Vuoi cambiare il rubinetto della cucina da solo? Ecco la guida completa con tutti i passaggi e gli attrezzi necessari.',
    category: 'guide-pratiche',
    tags: ['rubinetto cucina', 'sostituzione rubinetto', 'fai da te', 'miscelatore', 'montaggio'],
    publishedAt: '2025-01-08',
    updatedAt: '2025-01-08',
    readingTime: 8,
    content: `
      <h2>Attrezzi necessari</h2>
      <ul>
        <li>Chiave inglese regolabile</li>
        <li>Chiave a pappagallo</li>
        <li>Cacciavite a croce e piatto</li>
        <li>Nastro teflon (PTFE)</li>
        <li>Bacinella e stracci</li>
        <li>Torcia (utile sotto il lavello)</li>
      </ul>
      
      <h2>Prima di iniziare</h2>
      <p><strong>Chiudi l'acqua!</strong> Cerca le valvole di arresto sotto il lavello e chiudile. Se non le trovi, chiudi la valvola generale dell'appartamento.</p>
      
      <h2>Passo 1: Rimuovi il vecchio rubinetto</h2>
      <ol>
        <li>Apri il rubinetto per scaricare l'acqua residua</li>
        <li>Posiziona la bacinella sotto i collegamenti</li>
        <li>Svita i flessibili di alimentazione dalle valvole</li>
        <li>Svita il dado di fissaggio sotto il lavello</li>
        <li>Solleva e rimuovi il vecchio rubinetto</li>
      </ol>
      
      <h2>Passo 2: Prepara il nuovo rubinetto</h2>
      <ol>
        <li>Verifica che sia compatibile con i fori del lavello</li>
        <li>Monta la guarnizione sulla base del rubinetto</li>
        <li>Collega i flessibili di alimentazione se non sono già montati</li>
      </ol>
      
      <h2>Passo 3: Installa il nuovo rubinetto</h2>
      <ol>
        <li>Inserisci i flessibili nel foro del lavello dall'alto</li>
        <li>Posiziona il rubinetto e la guarnizione</li>
        <li>Da sotto, metti la rondella e avvita il dado di fissaggio</li>
        <li>Stringi bene ma senza esagerare</li>
      </ol>
      
      <h2>Passo 4: Collega l'alimentazione</h2>
      <ol>
        <li>Avvolgi del nastro teflon sui filetti delle valvole</li>
        <li>Collega il flessibile dell'acqua calda (solitamente a sinistra)</li>
        <li>Collega il flessibile dell'acqua fredda (a destra)</li>
        <li>Stringi i raccordi a mano, poi 1/4 di giro con la chiave</li>
      </ol>
      
      <h2>Passo 5: Verifica</h2>
      <ol>
        <li>Apri lentamente le valvole di arresto</li>
        <li>Controlla che non ci siano perdite</li>
        <li>Testa acqua calda e fredda</li>
        <li>Se tutto ok, il lavoro è finito!</li>
      </ol>
      
      <h2>Errori comuni da evitare</h2>
      <ul>
        <li>Stringere troppo i raccordi (rischi di danneggiarli)</li>
        <li>Dimenticare le guarnizioni</li>
        <li>Non chiudere l'acqua prima di iniziare</li>
        <li>Forzare componenti che non si adattano</li>
      </ul>
    `
  },
  {
    slug: 'come-cambiare-guarnizione-rubinetto',
    title: 'Come Cambiare la Guarnizione del Rubinetto che Gocciola',
    metaTitle: 'Cambiare Guarnizione Rubinetto: Stop al Gocciolamento',
    metaDescription: 'Il rubinetto gocciola? Scopri come sostituire la guarnizione in pochi minuti. Guida semplice con foto e consigli pratici.',
    h1: 'Come Cambiare la Guarnizione del Rubinetto',
    excerpt: 'Un rubinetto che gocciola può sprecare fino a 20 litri d\'acqua al giorno. Ecco come risolvere sostituendo la guarnizione.',
    category: 'guide-pratiche',
    tags: ['rubinetto gocciola', 'guarnizione rubinetto', 'fai da te', 'riparazione', 'spreco acqua'],
    publishedAt: '2025-01-05',
    updatedAt: '2025-01-05',
    readingTime: 5,
    content: `
      <h2>Quanto costa un rubinetto che gocciola?</h2>
      <p>Un rubinetto che perde una goccia al secondo spreca circa <strong>20 litri d'acqua al giorno</strong>, ovvero 7.000 litri all'anno! Ripararlo è semplice e veloce.</p>
      
      <h2>Cosa ti serve</h2>
      <ul>
        <li>Cacciavite piatto o a croce</li>
        <li>Chiave inglese o a pappagallo</li>
        <li>Guarnizioni di ricambio (porta il vecchio modello in ferramenta)</li>
        <li>Grasso al silicone (opzionale)</li>
      </ul>
      
      <h2>Rubinetto tradizionale a vitone</h2>
      <ol>
        <li><strong>Chiudi l'acqua</strong> dalla valvola sotto il lavello</li>
        <li><strong>Rimuovi la manopola</strong>: svita la vite centrale (spesso nascosta sotto un cappuccio colorato)</li>
        <li><strong>Svita il vitone</strong> con la chiave inglese</li>
        <li><strong>Sostituisci la guarnizione</strong> all'estremità del vitone</li>
        <li><strong>Rimonta tutto</strong> seguendo l'ordine inverso</li>
        <li><strong>Riapri l'acqua</strong> e verifica che non goccioli più</li>
      </ol>
      
      <h2>Miscelatore con cartuccia</h2>
      <p>I rubinetti moderni hanno una cartuccia ceramica invece del vitone:</p>
      <ol>
        <li>Chiudi l'acqua e svita la maniglia</li>
        <li>Rimuovi il cappuccio decorativo e la vite di fissaggio</li>
        <li>Estrai la vecchia cartuccia</li>
        <li>Porta la cartuccia in ferramenta per trovare quella compatibile</li>
        <li>Installa la nuova cartuccia e rimonta</li>
      </ol>
      
      <h2>Consiglio</h2>
      <p>Applica un po' di grasso al silicone sulle guarnizioni nuove: dureranno più a lungo e sarà più facile smontarle in futuro.</p>
    `
  },
  // === MANUTENZIONE ===
  {
    slug: 'manutenzione-caldaia-cosa-fare',
    title: 'Manutenzione Caldaia: Cosa Fare e Quando Farla',
    metaTitle: 'Manutenzione Caldaia Obbligatoria: Guida Completa 2025',
    metaDescription: 'Tutto sulla manutenzione caldaia: quando farla, quanto costa, cosa comprende. Obblighi di legge e consigli per risparmiare.',
    h1: 'Manutenzione Caldaia: Guida Completa',
    excerpt: 'La manutenzione della caldaia è obbligatoria per legge. Scopri cosa prevede, ogni quanto farla e come risparmiare.',
    category: 'manutenzione',
    tags: ['manutenzione caldaia', 'caldaia obblighi', 'controllo fumi', 'bollino blu', 'caldaia a condensazione'],
    publishedAt: '2025-01-12',
    updatedAt: '2025-01-12',
    readingTime: 7,
    content: `
      <h2>La manutenzione caldaia è obbligatoria?</h2>
      <p><strong>Sì</strong>, la manutenzione della caldaia è obbligatoria per legge (DPR 74/2013). È responsabilità del proprietario o dell'inquilino (se specificato nel contratto) far eseguire i controlli periodici.</p>
      
      <h2>Ogni quanto va fatta?</h2>
      <p>La frequenza dipende dal tipo di caldaia e dalla potenza:</p>
      <ul>
        <li><strong>Caldaie a gas < 35 kW</strong>: manutenzione ogni anno, controllo fumi ogni 2-4 anni</li>
        <li><strong>Caldaie a gas > 35 kW</strong>: manutenzione e controllo fumi annuali</li>
        <li><strong>Caldaie a condensazione</strong>: stesse tempistiche, ma controllo più accurato</li>
      </ul>
      
      <h2>Cosa comprende la manutenzione</h2>
      <h3>Manutenzione ordinaria</h3>
      <ul>
        <li>Pulizia del bruciatore e dello scambiatore</li>
        <li>Verifica della pressione dell'impianto</li>
        <li>Controllo dei dispositivi di sicurezza</li>
        <li>Verifica dell'accensione e del funzionamento</li>
        <li>Pulizia del sifone di scarico condensa (caldaie a condensazione)</li>
      </ul>
      
      <h3>Controllo fumi (analisi combustione)</h3>
      <ul>
        <li>Misurazione delle emissioni inquinanti</li>
        <li>Verifica del rendimento energetico</li>
        <li>Compilazione del rapporto di controllo di efficienza energetica</li>
        <li>Rilascio del "bollino blu"</li>
      </ul>
      
      <h2>Quanto costa</h2>
      <p>I costi medi nel 2025:</p>
      <ul>
        <li><strong>Manutenzione ordinaria</strong>: 80-120€</li>
        <li><strong>Controllo fumi + bollino</strong>: 80-150€</li>
        <li><strong>Manutenzione completa</strong>: 120-200€</li>
      </ul>
      
      <h2>Sanzioni per mancata manutenzione</h2>
      <p>Le multe possono variare da <strong>500€ a 3.000€</strong>. Inoltre, in caso di incidente, l'assicurazione potrebbe non coprire i danni se la caldaia non era a norma.</p>
      
      <h2>Consigli per risparmiare</h2>
      <ul>
        <li>Stipula un contratto di manutenzione annuale</li>
        <li>Confronta più preventivi</li>
        <li>Fai la manutenzione prima dell'inverno (eviti emergenze)</li>
      </ul>
    `
  },
  {
    slug: 'come-sfiatare-termosifoni',
    title: 'Come Sfiatare i Termosifoni: Guida Completa per l\'Inverno',
    metaTitle: 'Sfiatare Termosifoni: Come Fare in 5 Minuti',
    metaDescription: 'I termosifoni non scaldano bene? Probabilmente c\'è aria nell\'impianto. Scopri come sfiatarli correttamente in pochi minuti.',
    h1: 'Come Sfiatare i Termosifoni',
    excerpt: 'Termosifoni freddi o che fanno rumore? L\'aria nell\'impianto è la causa più comune. Ecco come eliminarla in pochi minuti.',
    category: 'manutenzione',
    tags: ['termosifoni', 'sfiatare', 'aria impianto', 'riscaldamento', 'inverno'],
    publishedAt: '2025-01-07',
    updatedAt: '2025-01-07',
    readingTime: 4,
    content: `
      <h2>Perché sfiatare i termosifoni?</h2>
      <p>L'aria che si accumula nell'impianto di riscaldamento impedisce all'acqua calda di circolare correttamente. I sintomi sono:</p>
      <ul>
        <li>Termosifone caldo sotto e freddo sopra</li>
        <li>Rumori di gorgoglio nelle tubature</li>
        <li>Riscaldamento meno efficiente</li>
      </ul>
      
      <h2>Cosa ti serve</h2>
      <ul>
        <li>Chiave per sfiato (o cacciavite piatto)</li>
        <li>Bacinella o straccio</li>
        <li>Guanti (l'acqua potrebbe essere calda)</li>
      </ul>
      
      <h2>Procedura passo-passo</h2>
      <ol>
        <li><strong>Spegni la caldaia</strong>: aspetta 10-15 minuti che l'acqua si raffreddi leggermente</li>
        <li><strong>Individua la valvola di sfiato</strong>: è una piccola valvola in alto, di solito sul lato opposto al termostato</li>
        <li><strong>Posiziona la bacinella</strong>: sotto la valvola per raccogliere l'acqua</li>
        <li><strong>Apri la valvola</strong>: gira in senso antiorario di mezzo giro</li>
        <li><strong>Lascia uscire l'aria</strong>: sentirai un sibilo; quando esce acqua, chiudi la valvola</li>
        <li><strong>Ripeti per tutti i termosifoni</strong>: inizia da quello più alto e scendi</li>
      </ol>
      
      <h2>Dopo lo sfiato</h2>
      <ol>
        <li>Controlla la pressione della caldaia (deve essere tra 1 e 1,5 bar)</li>
        <li>Se è scesa troppo, ricarica l'impianto aprendo il rubinetto di carico</li>
        <li>Riaccendi la caldaia</li>
      </ol>
      
      <h2>Quando chiamare l'idraulico</h2>
      <p>Se devi sfiatare i termosifoni troppo spesso, potrebbe esserci una perdita nell'impianto. In questo caso è meglio far controllare tutto da un professionista.</p>
    `
  },
  // === EMERGENZE ===
  {
    slug: 'cosa-fare-allagamento-casa',
    title: 'Allagamento in Casa: Cosa Fare Subito per Limitare i Danni',
    metaTitle: 'Allagamento Casa: Guida Emergenza e Primi Interventi',
    metaDescription: 'Casa allagata? Ecco cosa fare immediatamente per limitare i danni: chiudere l\'acqua, la corrente e come intervenire.',
    h1: 'Allagamento in Casa: Cosa Fare',
    excerpt: 'Hai scoperto un allagamento in casa? Ecco le azioni immediate da compiere per limitare i danni e gestire l\'emergenza.',
    category: 'emergenze',
    tags: ['allagamento', 'emergenza casa', 'perdita acqua', 'danni acqua', 'pronto intervento'],
    publishedAt: '2025-01-11',
    updatedAt: '2025-01-11',
    readingTime: 5,
    content: `
      <h2>Le prime 3 cose da fare</h2>
      <ol>
        <li><strong>CHIUDI L'ACQUA</strong>: Trova la valvola generale (solitamente vicino al contatore) e chiudila immediatamente</li>
        <li><strong>STACCA LA CORRENTE</strong>: Se l'acqua ha raggiunto prese o apparecchi elettrici, disattiva il contatore generale</li>
        <li><strong>CHIAMA UN IDRAULICO</strong>: Per emergenze serve un pronto intervento disponibile 24h</li>
      </ol>
      
      <h2>Dove si trova la valvola generale?</h2>
      <ul>
        <li><strong>Appartamento</strong>: vicino al contatore, spesso in un vano tecnico sul pianerottolo o in bagno/cucina</li>
        <li><strong>Casa indipendente</strong>: vicino al contatore, spesso in garage o cantina</li>
      </ul>
      
      <h2>Azioni successive</h2>
      <ol>
        <li><strong>Documenta i danni</strong>: scatta foto e video per l'assicurazione</li>
        <li><strong>Rimuovi l'acqua</strong>: usa stracci, mop, secchi. Per grandi quantità servirà un'idrovora</li>
        <li><strong>Sposta mobili e oggetti</strong>: allontana tutto dal pavimento bagnato</li>
        <li><strong>Ventila gli ambienti</strong>: apri finestre e usa ventilatori o deumidificatori</li>
      </ol>
      
      <h2>Se l'allagamento viene da sopra</h2>
      <ul>
        <li>Avvisa subito il vicino del piano di sopra</li>
        <li>Se non risponde, contatta l'amministratore</li>
        <li>In casi gravi, chiama i Vigili del Fuoco (115)</li>
      </ul>
      
      <h2>Per l'assicurazione</h2>
      <ul>
        <li>Conserva foto e video dei danni</li>
        <li>Conserva fatture degli interventi di riparazione</li>
        <li>Fai denuncia entro 3 giorni dalla scoperta del danno</li>
        <li>Non buttare nulla prima della perizia</li>
      </ul>
      
      <h2>Numeri utili</h2>
      <ul>
        <li><strong>Vigili del Fuoco</strong>: 115</li>
        <li><strong>Emergenze generali</strong>: 112</li>
      </ul>
    `
  },
  {
    slug: 'tubo-rotto-cosa-fare',
    title: 'Tubo Rotto in Casa: Come Intervenire Prima dell\'Idraulico',
    metaTitle: 'Tubo Rotto: Guida Emergenza e Riparazione Temporanea',
    metaDescription: 'Un tubo si è rotto in casa? Scopri come fermare l\'acqua e fare una riparazione temporanea in attesa dell\'idraulico.',
    h1: 'Tubo Rotto: Cosa Fare Subito',
    excerpt: 'Hai un tubo rotto? Ecco come intervenire immediatamente per bloccare l\'acqua e limitare i danni mentre aspetti l\'idraulico.',
    category: 'emergenze',
    tags: ['tubo rotto', 'emergenza idraulica', 'perdita acqua', 'riparazione temporanea'],
    publishedAt: '2025-01-09',
    updatedAt: '2025-01-09',
    readingTime: 4,
    content: `
      <h2>Azione immediata: chiudi l'acqua!</h2>
      <p>La prima cosa da fare è <strong>chiudere la valvola di arresto</strong>. Può essere:</p>
      <ul>
        <li>La valvola del singolo apparecchio (sotto lavandino, dietro WC, ecc.)</li>
        <li>La valvola di zona (se il tubo è in un punto specifico)</li>
        <li>La valvola generale (se non trovi quella specifica)</li>
      </ul>
      
      <h2>Riparazione temporanea</h2>
      <p>In attesa dell'idraulico, puoi tentare una riparazione d'emergenza:</p>
      
      <h3>Per piccole perdite</h3>
      <ul>
        <li><strong>Nastro autoagglomerante</strong>: si fonde su se stesso creando una tenuta</li>
        <li><strong>Stucco epossidico</strong>: si modella e indurisce rapidamente</li>
        <li><strong>Fascette stringitubo</strong>: con un pezzo di gomma sotto</li>
      </ul>
      
      <h3>Per perdite più grandi</h3>
      <ul>
        <li>Usa un manicotto di riparazione (disponibile in ferramenta)</li>
        <li>In emergenza: straccio + fascette metalliche strette</li>
      </ul>
      
      <h2>Cosa NON fare</h2>
      <ul>
        <li>Non usare colla o silicone su tubature in pressione</li>
        <li>Non riaprire l'acqua dopo una riparazione temporanea senza controllare</li>
        <li>Non ignorare piccole perdite: peggioreranno</li>
      </ul>
      
      <h2>Quando chiamare subito l'idraulico</h2>
      <ul>
        <li>Se non riesci a chiudere l'acqua</li>
        <li>Se la perdita è in un punto inaccessibile</li>
        <li>Se c'è rischio di danni strutturali</li>
      </ul>
    `
  },
  // === RISPARMIO ===
  {
    slug: 'come-risparmiare-acqua-casa',
    title: '10 Modi per Risparmiare Acqua in Casa (e Ridurre le Bollette)',
    metaTitle: 'Risparmiare Acqua in Casa: 10 Consigli Pratici 2025',
    metaDescription: 'Scopri come risparmiare acqua in casa con 10 consigli pratici. Riduttori di flusso, abitudini virtuose e tecnologie per tagliare la bolletta.',
    h1: '10 Modi per Risparmiare Acqua in Casa',
    excerpt: 'Vuoi ridurre il consumo d\'acqua e le bollette? Ecco 10 consigli pratici che puoi applicare subito nella tua casa.',
    category: 'risparmio',
    tags: ['risparmiare acqua', 'bolletta acqua', 'consumi idrici', 'risparmio casa', 'ecologia'],
    publishedAt: '2025-01-06',
    updatedAt: '2025-01-06',
    readingTime: 6,
    content: `
      <h2>Perché risparmiare acqua?</h2>
      <p>In Italia consumiamo in media 220 litri d'acqua a persona al giorno, tra i valori più alti d'Europa. Risparmiare acqua fa bene all'ambiente e al portafoglio.</p>
      
      <h2>1. Installa riduttori di flusso</h2>
      <p>Costano pochi euro e riducono il consumo del 30-50% senza perdere pressione. Si montano su rubinetti e soffioni doccia in pochi secondi.</p>
      
      <h2>2. Ripara i rubinetti che gocciolano</h2>
      <p>Un rubinetto che perde spreca fino a 20 litri al giorno, ovvero <strong>7.000 litri all'anno</strong>.</p>
      
      <h2>3. Usa lo sciacquone a doppio tasto</h2>
      <p>Il WC può usare 6-12 litri a ogni scarico. Con il doppio tasto scegli tra scarico ridotto (3-4 litri) o completo.</p>
      
      <h2>4. Doccia invece di bagno</h2>
      <p>Una doccia di 5 minuti consuma circa 60 litri; un bagno nella vasca 150-200 litri. Il risparmio è enorme!</p>
      
      <h2>5. Chiudi l'acqua mentre ti insaponi</h2>
      <p>Sembra banale, ma chiudere l'acqua mentre ti lavi i denti, ti insaponi o ti fai lo shampoo può risparmiare 10 litri al minuto.</p>
      
      <h2>6. Lava frutta e verdura in una bacinella</h2>
      <p>Invece di usare acqua corrente, riempi una bacinella. L'acqua usata può poi innaffiare le piante.</p>
      
      <h2>7. Usa lavatrice e lavastoviglie a pieno carico</h2>
      <p>Questi elettrodomestici consumano la stessa acqua indipendentemente dal carico. Aspetta di riempirli completamente.</p>
      
      <h2>8. Installa un WC con cassetta a basso consumo</h2>
      <p>I WC moderni usano solo 4-6 litri per scarico invece dei 9-12 dei modelli vecchi.</p>
      
      <h2>9. Raccogli l'acqua piovana</h2>
      <p>Se hai un giardino, una cisterna per la raccolta dell'acqua piovana è perfetta per irrigazione e pulizie esterne.</p>
      
      <h2>10. Controlla regolarmente l'impianto</h2>
      <p>Perdite nascoste possono sprecare migliaia di litri. Controlla periodicamente contatore e tubature.</p>
      
      <h2>Quanto puoi risparmiare?</h2>
      <p>Applicando questi consigli, una famiglia di 4 persone può risparmiare <strong>30.000-50.000 litri all'anno</strong>, pari a 100-200€ sulla bolletta.</p>
    `
  },
  // === NORMATIVE ===
  {
    slug: 'bonus-caldaia-2025-come-ottenerlo',
    title: 'Bonus Caldaia 2025: Come Funziona e Come Ottenerlo',
    metaTitle: 'Bonus Caldaia 2025: Guida Completa alle Detrazioni',
    metaDescription: 'Tutto sul bonus caldaia 2025: requisiti, detrazioni fiscali, documenti necessari e come richiederlo. Risparmia fino al 65% sulla sostituzione.',
    h1: 'Bonus Caldaia 2025: Guida Completa',
    excerpt: 'Devi sostituire la caldaia? Nel 2025 puoi beneficiare di importanti detrazioni fiscali. Ecco come funziona e come ottenerlo.',
    category: 'normative',
    tags: ['bonus caldaia', 'detrazioni fiscali', 'ecobonus', 'caldaia a condensazione', 'risparmio energetico'],
    publishedAt: '2025-01-13',
    updatedAt: '2025-01-13',
    readingTime: 8,
    content: `
      <h2>Cosa prevede il Bonus Caldaia 2025</h2>
      <p>Il bonus caldaia rientra nell'Ecobonus e permette di detrarre una percentuale delle spese sostenute per la sostituzione della caldaia con modelli più efficienti.</p>
      
      <h2>Le aliquote di detrazione</h2>
      <ul>
        <li><strong>50%</strong>: sostituzione con caldaia a condensazione classe A</li>
        <li><strong>65%</strong>: sostituzione con caldaia a condensazione classe A+ con sistema di termoregolazione evoluto (classe V, VI, VIII)</li>
      </ul>
      
      <h2>Chi può richiederlo</h2>
      <ul>
        <li>Proprietari di immobili</li>
        <li>Inquilini (con autorizzazione del proprietario)</li>
        <li>Titolari di diritti reali (usufrutto, uso, ecc.)</li>
        <li>Condomini (per parti comuni)</li>
      </ul>
      
      <h2>Requisiti della caldaia</h2>
      <ul>
        <li>Deve essere una caldaia a condensazione</li>
        <li>Classe energetica almeno A</li>
        <li>Per il 65%: abbinamento con valvole termostatiche evolute</li>
      </ul>
      
      <h2>Spese detraibili</h2>
      <ul>
        <li>Acquisto della caldaia</li>
        <li>Installazione e manodopera</li>
        <li>Valvole termostatiche e termostato</li>
        <li>Smaltimento vecchia caldaia</li>
        <li>Pratiche burocratiche (APE, ENEA)</li>
      </ul>
      
      <h2>Come ottenerlo</h2>
      <ol>
        <li><strong>Paga con bonifico parlante</strong>: bonifico specifico per detrazioni fiscali</li>
        <li><strong>Conserva la documentazione</strong>: fatture, certificazioni, schede tecniche</li>
        <li><strong>Invia comunicazione ENEA</strong>: entro 90 giorni dalla fine lavori</li>
        <li><strong>Inserisci nella dichiarazione dei redditi</strong>: la detrazione si recupera in 10 rate annuali</li>
      </ol>
      
      <h2>Documenti necessari</h2>
      <ul>
        <li>Fattura dell'intervento</li>
        <li>Ricevuta del bonifico parlante</li>
        <li>Certificazione del produttore della caldaia</li>
        <li>Dichiarazione di conformità dell'installatore</li>
        <li>APE (Attestato di Prestazione Energetica) - se richiesto</li>
      </ul>
      
      <h2>Alternativa: sconto in fattura</h2>
      <p>In alcuni casi è ancora possibile optare per lo <strong>sconto in fattura</strong> o la <strong>cessione del credito</strong>. Verifica con il tuo installatore le opzioni disponibili.</p>
    `
  },
  {
    slug: 'conformita-impianto-idraulico',
    title: 'Dichiarazione di Conformità Impianto Idraulico: Quando Serve',
    metaTitle: 'Conformità Impianto Idraulico: Guida e Obblighi 2025',
    metaDescription: 'Tutto sulla dichiarazione di conformità per impianti idraulici: quando è obbligatoria, chi la rilascia, costi e documenti necessari.',
    h1: 'Dichiarazione di Conformità Impianto Idraulico',
    excerpt: 'La dichiarazione di conformità è obbligatoria per gli impianti idraulici? Ecco tutto quello che devi sapere.',
    category: 'normative',
    tags: ['conformità impianto', 'certificazione idraulico', 'DICO', 'DIRI', 'normativa 37/08'],
    publishedAt: '2025-01-04',
    updatedAt: '2025-01-04',
    readingTime: 6,
    content: `
      <h2>Cos'è la dichiarazione di conformità</h2>
      <p>La <strong>Dichiarazione di Conformità (DiCo)</strong> è un documento che attesta che un impianto è stato realizzato secondo le norme tecniche e di sicurezza vigenti (DM 37/2008).</p>
      
      <h2>Quando è obbligatoria</h2>
      <p>La dichiarazione di conformità è obbligatoria per:</p>
      <ul>
        <li>Nuovi impianti idraulici</li>
        <li>Rifacimento completo dell'impianto</li>
        <li>Trasformazioni importanti dell'impianto esistente</li>
        <li>Ampliamenti significativi</li>
      </ul>
      
      <h2>Quando NON serve</h2>
      <ul>
        <li>Manutenzione ordinaria (es. cambio rubinetto)</li>
        <li>Sostituzione componenti senza modifica dell'impianto</li>
        <li>Piccole riparazioni</li>
      </ul>
      
      <h2>Chi può rilasciarla</h2>
      <p>Solo un'impresa abilitata iscritta alla Camera di Commercio con i requisiti tecnico-professionali previsti dalla legge.</p>
      
      <h2>Cosa contiene</h2>
      <ul>
        <li>Dati dell'impresa installatrice</li>
        <li>Dati del committente</li>
        <li>Descrizione dell'impianto</li>
        <li>Dichiarazione del rispetto delle norme</li>
        <li>Elenco materiali utilizzati</li>
        <li>Schema dell'impianto (progetto)</li>
      </ul>
      
      <h2>DiRi: la dichiarazione di rispondenza</h2>
      <p>Per impianti realizzati prima del 27 marzo 2008 senza certificazione, è possibile ottenere una <strong>Dichiarazione di Rispondenza (DiRi)</strong>, rilasciata da un tecnico abilitato dopo un sopralluogo.</p>
      
      <h2>A cosa serve</h2>
      <ul>
        <li><strong>Vendita immobile</strong>: può essere richiesta dal notaio o dall'acquirente</li>
        <li><strong>Affitto</strong>: garantisce la sicurezza dell'inquilino</li>
        <li><strong>Allaccio utenze</strong>: in alcuni casi richiesta dai gestori</li>
        <li><strong>Pratiche edilizie</strong>: necessaria per fine lavori</li>
      </ul>
      
      <h2>Costi indicativi</h2>
      <ul>
        <li><strong>DiCo</strong>: inclusa nel costo dell'installazione</li>
        <li><strong>DiRi</strong>: 200-500€ a seconda della complessità</li>
      </ul>
    `
  },
  // === NUOVI ARTICOLI RICHIESTI ===
  {
    slug: 'perdita-acqua-cosa-fare',
    title: "Perdita d'Acqua Improvvisa: Cosa Fare Subito",
    metaTitle: 'Perdita Acqua Improvvisa: Guida Emergenza 2026',
    metaDescription: "Hai una perdita d'acqua improvvisa in casa? Scopri cosa fare immediatamente per limitare i danni, chiudere l'acqua e quando chiamare l'idraulico.",
    h1: "Perdita d'Acqua Improvvisa: Cosa Fare Subito",
    excerpt: "Una perdita d'acqua può causare danni gravi in pochi minuti. Ecco le azioni immediate da compiere e come limitare i danni.",
    category: 'emergenze',
    tags: ['perdita acqua', 'emergenza idraulica', 'allagamento', 'pronto intervento', 'chiudere acqua'],
    publishedAt: '2026-01-15',
    updatedAt: '2026-01-15',
    readingTime: 6,
    content: `
      <h2 id="indice">Indice della guida</h2>
      <ul class="toc">
        <li><a href="#primi-passi">I primi passi fondamentali</a></li>
        <li><a href="#dove-chiudere">Dove si chiude l'acqua</a></li>
        <li><a href="#tipi-perdite">Tipi di perdite e gravità</a></li>
        <li><a href="#danni">Come limitare i danni</a></li>
        <li><a href="#quando-chiamare">Quando chiamare l'idraulico</a></li>
        <li><a href="#faq">Domande frequenti</a></li>
      </ul>

      <h2 id="primi-passi">I primi passi fondamentali</h2>
      <p>Quando scopri una perdita d'acqua improvvisa, il panico è comprensibile ma la rapidità d'azione è fondamentale. Ogni minuto conta per limitare i danni. Ecco cosa fare <strong>nei primi 60 secondi</strong>:</p>
      <ol>
        <li><strong>Chiudi immediatamente l'acqua</strong> — È la priorità assoluta. Cerca la valvola di arresto più vicina al punto della perdita o, se non la trovi, quella generale</li>
        <li><strong>Stacca la corrente elettrica</strong> — Se l'acqua ha raggiunto o può raggiungere prese elettriche, quadri o elettrodomestici, disattiva l'interruttore generale</li>
        <li><strong>Raccogli l'acqua</strong> — Usa bacinelle, stracci, asciugamani: tutto ciò che può assorbire o contenere l'acqua</li>
        <li><strong>Sposta oggetti di valore</strong> — Allontana mobili, tappeti, documenti e apparecchi elettronici dalla zona allagata</li>
      </ol>

      <h2 id="dove-chiudere">Dove si chiude l'acqua</h2>
      <p>Conoscere la posizione delle valvole di arresto <em>prima</em> di un'emergenza può salvarti da danni enormi:</p>
      
      <h3>Valvole locali (rubinetti d'arresto)</h3>
      <ul>
        <li><strong>Sotto il lavandino</strong> — Valvole cromate collegate ai flessibili del rubinetto</li>
        <li><strong>Dietro il WC</strong> — Valvola sulla tubatura di alimentazione della cassetta</li>
        <li><strong>Dietro lavatrice/lavastoviglie</strong> — Rubinetti a sfera sulla parete</li>
      </ul>

      <h3>Valvola generale dell'appartamento</h3>
      <p>Solitamente si trova in uno di questi punti:</p>
      <ul>
        <li>Nel vano contatori sul pianerottolo</li>
        <li>Sotto il lavello della cucina</li>
        <li>Nel bagno, vicino alla colonna montante</li>
        <li>In cantina o garage (case indipendenti)</li>
      </ul>

      <h2 id="tipi-perdite">Tipi di perdite e gravità</h2>
      <h3>Emergenza grave — Chiama subito</h3>
      <ul>
        <li>Tubo scoppiato con getto d'acqua</li>
        <li>Perdita dal soffitto o dalle pareti</li>
        <li>Allagamento rapido del pavimento</li>
      </ul>

      <h3>Urgenza media — Intervento entro 24h</h3>
      <ul>
        <li>Perdita lenta ma costante da tubi visibili</li>
        <li>Gocciolamento da raccordi o giunzioni</li>
      </ul>

      <h2 id="danni">Come limitare i danni</h2>
      <ol>
        <li><strong>Documenta tutto</strong> — Scatta foto e video per l'assicurazione</li>
        <li><strong>Ventila l'ambiente</strong> — Apri finestre per accelerare l'asciugatura</li>
        <li><strong>Solleva i mobili</strong> — Metti tasselli sotto i piedi dei mobili bagnati</li>
        <li><strong>Usa un deumidificatore</strong> — Per prevenire muffe nelle pareti</li>
      </ol>

      <h2 id="quando-chiamare">Quando chiamare l'idraulico</h2>
      <ul>
        <li>La valvola generale non chiude completamente</li>
        <li>La perdita è dentro un muro o sotto il pavimento</li>
        <li>Non riesci a identificare l'origine della perdita</li>
      </ul>

      <h2 id="faq">Domande frequenti</h2>
      <h3>Quanto costa un pronto intervento per perdita d'acqua?</h3>
      <p>Il costo varia da 80€ a 200€ per la chiamata urgente, più il costo della riparazione.</p>

      <h3>L'assicurazione copre i danni da perdita d'acqua?</h3>
      <p>Dipende dalla polizza. La maggior parte delle assicurazioni casa copre i danni da "acqua condotta".</p>
    `
  },
  {
    slug: 'scarico-otturato-rimedi',
    title: "Scarico Otturato: Rimedi Prima di Chiamare l'Idraulico",
    metaTitle: 'Scarico Otturato: 7 Rimedi Fai Da Te Efficaci 2026',
    metaDescription: "Lo scarico è otturato? Scopri 7 rimedi efficaci da provare prima di chiamare l'idraulico. Dal bicarbonato alla ventosa, tutti i metodi spiegati.",
    h1: "Scarico Otturato: Rimedi Prima di Chiamare l'Idraulico",
    excerpt: "Lavandino, doccia o WC intasato? Prima di chiamare l'idraulico prova questi rimedi casalinghi: spesso risolvono il problema in pochi minuti.",
    category: 'guide-pratiche',
    tags: ['scarico otturato', 'lavandino intasato', 'rimedi naturali', 'fai da te', 'sturare scarico'],
    publishedAt: '2026-01-14',
    updatedAt: '2026-01-14',
    readingTime: 7,
    content: `
      <h2 id="indice">Indice della guida</h2>
      <ul class="toc">
        <li><a href="#cause">Perché lo scarico si intasa</a></li>
        <li><a href="#rimedi">I 7 rimedi più efficaci</a></li>
        <li><a href="#quando-chiamare">Quando chiamare l'idraulico</a></li>
        <li><a href="#faq">Domande frequenti</a></li>
      </ul>

      <h2 id="cause">Perché lo scarico si intasa</h2>
      <ul>
        <li><strong>Lavandino cucina:</strong> Grasso, olio, residui di cibo</li>
        <li><strong>Lavandino bagno:</strong> Capelli, sapone, dentifricio</li>
        <li><strong>Doccia:</strong> Capelli, balsamo, schiuma</li>
        <li><strong>WC:</strong> Carta igienica eccessiva, oggetti caduti</li>
      </ul>

      <h2 id="rimedi">I 7 rimedi più efficaci</h2>
      
      <h3>1. Acqua bollente</h3>
      <p>Il metodo più semplice, efficace per ostruzioni leggere causate da grasso o sapone. Versa 2 litri d'acqua bollente lentamente nello scarico.</p>

      <h3>2. Bicarbonato e aceto</h3>
      <ol>
        <li>Versa 100g di bicarbonato nello scarico</li>
        <li>Aggiungi 100ml di aceto bianco</li>
        <li>Copri lo scarico e attendi 30 minuti</li>
        <li>Risciacqua con acqua bollente</li>
      </ol>

      <h3>3. La ventosa</h3>
      <p>Lo strumento classico. Riempi il lavandino con 5cm d'acqua, posiziona la ventosa e pompa con forza 15-20 volte.</p>

      <h3>4. Pulizia sifone</h3>
      <p>Metti una bacinella sotto il sifone, svitalo, puliscilo e rimontalo.</p>

      <h3>5. Sonda flessibile</h3>
      <p>Per ostruzioni profonde. Costa 10-30€ in ferramenta.</p>

      <h3>6. Sale grosso e bicarbonato</h3>
      <p>Mescola 100g di sale con 100g di bicarbonato, versa nello scarico la sera e risciacqua la mattina.</p>

      <h3>7. Disgorgante chimico (ultimo ricorso)</h3>
      <p>Efficace ma da usare con cautela. Non mescolare MAI prodotti diversi.</p>

      <h2 id="quando-chiamare">Quando chiamare l'idraulico</h2>
      <ul>
        <li>Hai provato 2-3 metodi senza risultato</li>
        <li>Più scarichi sono bloccati contemporaneamente</li>
        <li>Senti cattivo odore persistente</li>
      </ul>

      <h2 id="faq">Domande frequenti</h2>
      <h3>Quanto costa far sturare uno scarico dall'idraulico?</h3>
      <p>Per uno scarico singolo: 60-120€. Per disostruzione con idrogetto: 150-300€.</p>

      <h3>Ogni quanto fare manutenzione preventiva?</h3>
      <p>Una volta al mese: versa acqua bollente e bicarbonato. Previene il 90% degli intasamenti.</p>
    `
  },
  {
    slug: 'quanto-costa-idraulico',
    title: 'Quanto Costa un Idraulico nel 2026? Prezzi Reali e Tariffe',
    metaTitle: 'Costo Idraulico 2026: Listino Prezzi Completo',
    metaDescription: "Quanto costa chiamare un idraulico nel 2026? Prezzi reali per pronto intervento, riparazioni, installazioni e manutenzione. Guida ai costi aggiornata.",
    h1: 'Quanto Costa un Idraulico nel 2026? Prezzi Reali',
    excerpt: "Hai bisogno di un idraulico ma non sai quanto aspettarti di pagare? Ecco il listino prezzi aggiornato con costi reali per ogni tipo di intervento.",
    category: 'risparmio',
    tags: ['costo idraulico', 'prezzi idraulico', 'tariffa oraria', 'preventivo', 'risparmio'],
    publishedAt: '2026-01-20',
    updatedAt: '2026-01-20',
    readingTime: 8,
    content: `
      <h2 id="indice">Indice della guida</h2>
      <ul class="toc">
        <li><a href="#tariffa-base">Tariffa base e chiamata</a></li>
        <li><a href="#riparazioni">Costi riparazioni comuni</a></li>
        <li><a href="#installazioni">Costi installazioni</a></li>
        <li><a href="#emergenze">Maggiorazioni emergenza</a></li>
        <li><a href="#risparmiare">Come risparmiare</a></li>
        <li><a href="#faq">Domande frequenti</a></li>
      </ul>

      <h2 id="tariffa-base">Tariffa base e costo chiamata</h2>
      <ul>
        <li><strong>Costo di chiamata/uscita:</strong> 30-60€</li>
        <li><strong>Tariffa oraria:</strong> 35-50€/ora</li>
        <li><strong>Materiali:</strong> A parte, con markup del 15-30%</li>
      </ul>
      <p>In media, un intervento semplice costa <strong>tra 80€ e 150€</strong> tutto compreso.</p>

      <h2 id="riparazioni">Costi riparazioni comuni</h2>
      <ul>
        <li>Riparazione rubinetto che gocciola: 50-90€</li>
        <li>Sturare lavandino/WC: 60-120€</li>
        <li>Riparazione perdita tubo visibile: 80-150€</li>
        <li>Riparazione perdita sotto traccia: 200-500€</li>
        <li>Sostituzione sifone: 40-80€</li>
        <li>Riparazione cassetta WC: 70-120€</li>
      </ul>

      <h2 id="installazioni">Costi installazioni</h2>
      <ul>
        <li>Rubinetto cucina/bagno: 50-100€</li>
        <li>WC completo: 100-200€</li>
        <li>Piatto doccia: 150-300€</li>
        <li>Lavatrice/Lavastoviglie: 50-100€</li>
        <li>Scaldabagno elettrico: 80-150€</li>
      </ul>

      <h2 id="emergenze">Maggiorazioni per emergenza</h2>
      <ul>
        <li><strong>Pronto intervento:</strong> +30-50%</li>
        <li><strong>Sera/notte:</strong> +30-50%</li>
        <li><strong>Weekend:</strong> +25-40%</li>
        <li><strong>Festivi:</strong> +50-100%</li>
      </ul>

      <h2 id="risparmiare">Come risparmiare sull'idraulico</h2>
      <ol>
        <li>Chiedi sempre un preventivo</li>
        <li>Confronta almeno 3 preventivi</li>
        <li>Raggruppa più lavori</li>
        <li>Evita l'emergenza quando possibile</li>
        <li>Manutenzione preventiva</li>
      </ol>

      <h2 id="faq">Domande frequenti</h2>
      <h3>Perché i prezzi variano così tanto tra idraulici?</h3>
      <p>Esperienza, zona geografica, copertura assicurativa e specializzazione influenzano i prezzi.</p>

      <h3>È normale pagare la chiamata anche per un preventivo?</h3>
      <p>Per sopralluoghi complessi sì (30-50€). Molti idraulici offrono preventivo gratuito se poi accetti il lavoro.</p>
    `
  },
  {
    slug: 'caldaia-in-blocco-cause',
    title: 'Caldaia in Blocco: Cause Comuni e Cosa Controllare',
    metaTitle: 'Caldaia in Blocco: 8 Cause e Soluzioni 2026',
    metaDescription: "La caldaia è andata in blocco? Scopri le 8 cause più comuni e cosa puoi controllare prima di chiamare il tecnico.",
    h1: 'Caldaia in Blocco: Cause Comuni e Cosa Controllare',
    excerpt: "La caldaia si è bloccata e non parte? Prima di chiamare il tecnico, scopri le cause più frequenti e i controlli che puoi fare da solo.",
    category: 'emergenze',
    tags: ['caldaia in blocco', 'caldaia non parte', 'guasto caldaia', 'reset caldaia', 'manutenzione'],
    publishedAt: '2026-01-18',
    updatedAt: '2026-01-18',
    readingTime: 7,
    content: `
      <h2 id="indice">Indice della guida</h2>
      <ul class="toc">
        <li><a href="#cosa-significa">Cosa significa "caldaia in blocco"</a></li>
        <li><a href="#cause">Le cause più comuni</a></li>
        <li><a href="#reset">Come fare il reset</a></li>
        <li><a href="#controlli">Controlli da fare prima di chiamare</a></li>
        <li><a href="#faq">Domande frequenti</a></li>
      </ul>

      <h2 id="cosa-significa">Cosa significa "caldaia in blocco"</h2>
      <p>Quando una caldaia "va in blocco", un sistema di sicurezza ha rilevato un'anomalia e ha fermato il funzionamento. Sul display appare un <strong>codice di errore</strong> (es. E01, E10, F28).</p>

      <h2 id="cause">Le cause più comuni di blocco caldaia</h2>

      <h3>1. Pressione acqua troppo bassa</h3>
      <p>Controlla il manometro: deve essere tra 1 e 1,5 bar. Se è sotto 1, ricarica l'impianto.</p>

      <h3>2. Mancata accensione del bruciatore</h3>
      <p>Verifica che il gas arrivi (prova un fornello). Se sì, prova un reset.</p>

      <h3>3. Problema al tiraggio fumi</h3>
      <p>Controlla che le bocchette esterne non siano ostruite.</p>

      <h3>4. Surriscaldamento</h3>
      <p>Attendi 20-30 minuti che si raffreddi, poi prova il reset.</p>

      <h3>5. Pressione troppo alta</h3>
      <p>Sfiata qualche termosifone per abbassare la pressione.</p>

      <h3>6. Assenza di corrente elettrica</h3>
      <p>Controlla l'interruttore della caldaia e il quadro elettrico.</p>

      <h2 id="reset">Come fare il reset della caldaia</h2>
      <ol>
        <li>Individua il pulsante di reset (simbolo fiamma o R)</li>
        <li>Tieni premuto per 3-5 secondi</li>
        <li>Attendi 30 secondi</li>
        <li>Se continua a bloccarsi, c'è un problema da risolvere</li>
      </ol>
      <p><strong>Non fare più di 3 reset consecutivi.</strong></p>

      <h2 id="controlli">Controlli da fare prima di chiamare</h2>
      <ol>
        <li>Leggi il codice errore sul display</li>
        <li>Controlla la pressione (1-1,5 bar)</li>
        <li>Verifica il gas (prova un fornello)</li>
        <li>Controlla alimentazione e fusibili</li>
        <li>Guarda le bocchette esterne</li>
      </ol>

      <h2 id="faq">Domande frequenti</h2>
      <h3>Quanto costa far riparare una caldaia in blocco?</h3>
      <p>Manutenzione semplice: 80-120€. Sostituzione componenti: 100-400€.</p>

      <h3>Ogni quanto fare la manutenzione per evitare blocchi?</h3>
      <p>Manutenzione annuale obbligatoria previene la maggior parte dei blocchi.</p>
    `
  },
  {
    slug: 'tubo-che-perde-muro-urgente',
    title: "Tubo che Perde dal Muro: È Urgente? Cosa Fare",
    metaTitle: 'Tubo Perde dal Muro: Urgenza e Soluzioni 2026',
    metaDescription: "Hai notato una perdita d'acqua dal muro? Scopri se è urgente, cosa fare subito e quando è necessario l'intervento dell'idraulico.",
    h1: "Tubo che Perde dal Muro: È Urgente?",
    excerpt: "Una macchia di umidità sul muro potrebbe indicare una perdita nascosta. Ecco come valutare l'urgenza e cosa fare.",
    category: 'emergenze',
    tags: ['tubo che perde', 'perdita muro', 'umidità muro', 'tracciamento perdite', 'urgenza idraulica'],
    publishedAt: '2026-01-16',
    updatedAt: '2026-01-16',
    readingTime: 6,
    content: `
      <h2 id="indice">Indice della guida</h2>
      <ul class="toc">
        <li><a href="#segnali">Segnali di una perdita nel muro</a></li>
        <li><a href="#urgenza">Come valutare l'urgenza</a></li>
        <li><a href="#cosa-fare">Cosa fare subito</a></li>
        <li><a href="#diagnosi">Come si trova la perdita</a></li>
        <li><a href="#faq">Domande frequenti</a></li>
      </ul>

      <h2 id="segnali">Segnali di una perdita nel muro</h2>
      <ul>
        <li><strong>Macchie di umidità</strong> — Zone più scure sul muro o soffitto</li>
        <li><strong>Vernice che si gonfia o sfalda</strong></li>
        <li><strong>Muffa localizzata</strong></li>
        <li><strong>Odore di umido persistente</strong></li>
        <li><strong>Suono di gocciolio</strong> dentro la parete</li>
        <li><strong>Contatore che gira da solo</strong></li>
      </ul>

      <h2 id="urgenza">Come valutare l'urgenza</h2>
      <h3>Alta urgenza — Chiama subito</h3>
      <ul>
        <li>Acqua che fuoriesce visibilmente dal muro</li>
        <li>Macchia che cresce rapidamente</li>
        <li>Vicinanza a quadri elettrici</li>
      </ul>

      <h3>Media urgenza — Intervento entro 24-48h</h3>
      <ul>
        <li>Macchia stabile ma significativa</li>
        <li>Gocciolio udibile ma non visibile</li>
      </ul>

      <h2 id="cosa-fare">Cosa fare subito</h2>
      <ol>
        <li>Chiudi tutti i rubinetti e controlla se il contatore gira</li>
        <li>Localizza approssimativamente l'origine</li>
        <li>Se grave, chiudi l'acqua generale</li>
        <li>Documenta con foto</li>
        <li>Chiama un idraulico specializzato</li>
      </ol>

      <h2 id="diagnosi">Come si trova la perdita nascosta</h2>
      <ul>
        <li><strong>Termocamera</strong> — Rileva differenze di temperatura</li>
        <li><strong>Geofono</strong> — Ascolta il suono dell'acqua</li>
        <li><strong>Gas tracciante</strong> — Localizza il punto esatto</li>
        <li><strong>Igrometro</strong> — Misura l'umidità nelle pareti</li>
      </ul>

      <h2 id="faq">Domande frequenti</h2>
      <h3>Quanto costa riparare una perdita sotto traccia?</h3>
      <p>Ricerca perdita: 100-200€. Riparazione con apertura muro: 200-800€.</p>

      <h3>L'assicurazione copre la riparazione?</h3>
      <p>Molte polizze coprono i danni ma spesso NON la ricerca della perdita. Verifica la tua polizza.</p>
    `
  },
  {
    slug: 'water-che-perde-acqua',
    title: "Water che Perde Acqua: È Guasto o Condensa?",
    metaTitle: 'Water Perde Acqua: Cause e Soluzioni 2026',
    metaDescription: "Il tuo WC perde acqua dalla base o dalla cassetta? Scopri se è un guasto o semplice condensa e come risolvere il problema.",
    h1: "Water che Perde Acqua: Guasto o Condensa?",
    excerpt: "Hai notato acqua intorno al WC? Potrebbe essere una perdita seria o semplice condensa. Ecco come distinguere le cause.",
    category: 'guide-pratiche',
    tags: ['water che perde', 'wc perde acqua', 'cassetta wc', 'condensa wc', 'riparazione wc'],
    publishedAt: '2026-01-12',
    updatedAt: '2026-01-12',
    readingTime: 6,
    content: `
      <h2 id="indice">Indice della guida</h2>
      <ul class="toc">
        <li><a href="#dove-perde">Da dove perde il WC?</a></li>
        <li><a href="#condensa">È condensa? Come riconoscerla</a></li>
        <li><a href="#cassetta">Perdita dalla cassetta</a></li>
        <li><a href="#base">Perdita dalla base</a></li>
        <li><a href="#faq">Domande frequenti</a></li>
      </ul>

      <h2 id="dove-perde">Da dove perde il WC?</h2>
      <ul>
        <li><strong>Dalla cassetta di scarico</strong> — Sotto o intorno alla cassetta</li>
        <li><strong>Dalla base del WC</strong> — Tra water e pavimento</li>
        <li><strong>All'interno del WC</strong> — Acqua che scorre nella tazza</li>
        <li><strong>Sulla superficie esterna</strong> — Condensa</li>
      </ul>

      <h2 id="condensa">È condensa? Come riconoscerla</h2>
      <p>La condensa si forma quando l'acqua fredda incontra l'aria umida del bagno. È <strong>normale</strong> in certi periodi dell'anno.</p>
      <h3>Segnali che è condensa:</h3>
      <ul>
        <li>Goccioline uniformi su tutta la superficie</li>
        <li>Succede dopo docce calde o in estate</li>
        <li>L'acqua sul pavimento è pochissima</li>
      </ul>
      <h3>Soluzioni per la condensa:</h3>
      <ul>
        <li>Usa la ventola del bagno</li>
        <li>Installa un kit anti-condensa per cassette WC</li>
      </ul>

      <h2 id="cassetta">Perdita dalla cassetta</h2>
      <h3>Cause comuni:</h3>
      <ul>
        <li>Guarnizione tubo di carico</li>
        <li>Guarnizione base cassetta</li>
        <li>Cassetta incrinata (raro)</li>
      </ul>
      <h3>Cosa fare:</h3>
      <ol>
        <li>Chiudi la valvola dietro il WC</li>
        <li>Svuota la cassetta</li>
        <li>Individua da dove esce l'acqua</li>
        <li>Sostituisci la guarnizione se necessario (5-15€)</li>
      </ol>

      <h2 id="base">Perdita dalla base del WC</h2>
      <p>Acqua intorno alla base è più preoccupante: potrebbe indicare un problema con la guarnizione di scarico.</p>
      <p>Questo richiede di <strong>smontare e rimontare il WC</strong>. Costo indicativo: 80-150€.</p>

      <h2 id="faq">Domande frequenti</h2>
      <h3>Quanta acqua spreca un WC che "fila"?</h3>
      <p>Da 100 a 500 litri al giorno! Riparalo subito.</p>

      <h3>Quanto costa far riparare un WC che perde?</h3>
      <ul>
        <li>Sostituzione galleggiante/batteria: 50-100€</li>
        <li>Sostituzione guarnizione base: 80-150€</li>
      </ul>
    `
  }
];

// Helper functions
export const getArticleBySlug = (slug: string): BlogArticle | undefined => {
  return BLOG_ARTICLES.find(article => article.slug === slug);
};

export const getArticlesByCategory = (category: string): BlogArticle[] => {
  return BLOG_ARTICLES.filter(article => article.category === category);
};

export const getLatestArticles = (count: number = 5): BlogArticle[] => {
  return [...BLOG_ARTICLES]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count);
};

export const getRelatedArticles = (currentSlug: string, count: number = 3): BlogArticle[] => {
  const current = getArticleBySlug(currentSlug);
  if (!current) return [];
  
  return BLOG_ARTICLES
    .filter(article => article.slug !== currentSlug && article.category === current.category)
    .slice(0, count);
};

export const getCategoryBySlug = (slug: string): BlogCategory | undefined => {
  return BLOG_CATEGORIES.find(cat => cat.slug === slug);
};

export const getAllTags = (): string[] => {
  const tags = new Set<string>();
  BLOG_ARTICLES.forEach(article => {
    article.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
};

// Get blog articles suitable for linking from city pages
export const getArticlesForCityPage = (): BlogArticle[] => {
  // Return the most relevant articles for city landing pages
  const prioritySlugs = [
    'perdita-acqua-cosa-fare',
    'scarico-otturato-rimedi',
    'quanto-costa-idraulico',
    'caldaia-in-blocco-cause'
  ];
  
  return prioritySlugs
    .map(slug => getArticleBySlug(slug))
    .filter((article): article is BlogArticle => article !== undefined);
};
