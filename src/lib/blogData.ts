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
