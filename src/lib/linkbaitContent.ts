/**
 * Linkbait Content Data
 * 
 * Content designed to attract natural backlinks from:
 * - Home improvement blogs
 * - DIY forums
 * - Local news sites
 * - Educational portals
 * 
 * These pages are informational-first, with minimal commercial pressure.
 */

export interface ApprofondimentoArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  excerpt: string;
  category: 'tubature' | 'impianti' | 'manutenzione' | 'prevenzione' | 'tecnologia';
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  sections: {
    id: string;
    title: string;
    content: string;
  }[];
  relatedGuides: string[]; // slugs to /guide/
  relatedPricing: string; // slug to pricing page
}

export interface StatisticData {
  label: string;
  value: string;
  description: string;
  source?: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  frequency: 'mensile' | 'trimestrale' | 'semestrale' | 'annuale';
  urgency: 'alta' | 'media' | 'bassa';
}

// ============================================
// ARTICOLI APPROFONDIMENTO
// ============================================

export const APPROFONDIMENTI: ApprofondimentoArticle[] = [
  {
    slug: 'perche-tubature-rompono-case-vecchie',
    title: 'Perché le Tubature si Rompono più Spesso nelle Case Vecchie',
    metaTitle: 'Perché le Tubature si Rompono nelle Case Vecchie | Analisi Tecnica',
    metaDescription: 'Scopri le cause scientifiche dietro la rottura delle tubature nelle case costruite prima degli anni 80: materiali, usura, calcare e soluzioni moderne.',
    h1: 'Perché le Tubature si Rompono più Spesso nelle Case Vecchie',
    excerpt: 'Un\'analisi tecnica dei fattori che causano la maggiore frequenza di guasti idraulici negli edifici costruiti prima degli anni 80.',
    category: 'tubature',
    publishedAt: '2026-01-20',
    updatedAt: '2026-01-27',
    readingTime: 12,
    relatedGuides: ['perdita-acqua-tubo-muro', 'tubazione-corrosa'],
    relatedPricing: 'costo-riparazione-tubo-perdita',
    sections: [
      {
        id: 'materiali-epoca',
        title: 'I Materiali Usati nelle Diverse Epoche',
        content: `
          <p>La scelta dei materiali per le tubature è cambiata radicalmente nel corso dei decenni. Capire quali materiali sono stati usati aiuta a prevedere i problemi.</p>
          
          <h3>🏛️ Anni '50-'60: Ferro Zincato</h3>
          <table class="w-full border-collapse border border-muted mb-4">
            <thead>
              <tr class="bg-muted/50">
                <th class="border border-muted p-2 text-left">Caratteristica</th>
                <th class="border border-muted p-2 text-left">Valore</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border border-muted p-2">Vita utile media</td><td class="border border-muted p-2">40-50 anni</td></tr>
              <tr><td class="border border-muted p-2">Principale problema</td><td class="border border-muted p-2">Corrosione interna e ruggine</td></tr>
              <tr><td class="border border-muted p-2">Segnali di degrado</td><td class="border border-muted p-2">Acqua rossastra, calo pressione</td></tr>
            </tbody>
          </table>
          <p>Le tubazioni in ferro zincato erano lo standard, ma dopo 40-50 anni la zincatura si consuma e il ferro sottostante inizia a corrodersi dall'interno.</p>
          
          <h3>🏗️ Anni '70-'80: Piombo e Primi Polimeri</h3>
          <p>In questo periodo coesistevano ancora tubazioni in piombo (oggi vietate per ragioni sanitarie) e i primi tubi in materiale plastico.</p>
          <ul>
            <li><strong>Piombo</strong>: ancora presente in molte case, deve essere sostituito</li>
            <li><strong>Primi PVC</strong>: meno resistenti delle versioni moderne</li>
          </ul>
          
          <h3>🏢 Anni '90-2000: Multistrato e Polipropilene</h3>
          <p>Materiali moderni con vita utile stimata di 50+ anni. Se avete tubi di questa generazione, siete in vantaggio.</p>
          
          <h3>📊 Confronto Vita Utile</h3>
          <table class="w-full border-collapse border border-muted">
            <thead>
              <tr class="bg-muted/50">
                <th class="border border-muted p-2 text-left">Materiale</th>
                <th class="border border-muted p-2 text-left">Vita Utile</th>
                <th class="border border-muted p-2 text-left">Rischio Oggi</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border border-muted p-2">Ferro zincato</td><td class="border border-muted p-2">40-50 anni</td><td class="border border-muted p-2">🔴 Alto</td></tr>
              <tr><td class="border border-muted p-2">Piombo</td><td class="border border-muted p-2">80+ anni</td><td class="border border-muted p-2">🔴 Pericoloso</td></tr>
              <tr><td class="border border-muted p-2">Rame</td><td class="border border-muted p-2">50-70 anni</td><td class="border border-muted p-2">🟡 Medio</td></tr>
              <tr><td class="border border-muted p-2">Polipropilene</td><td class="border border-muted p-2">50+ anni</td><td class="border border-muted p-2">🟢 Basso</td></tr>
              <tr><td class="border border-muted p-2">Multistrato</td><td class="border border-muted p-2">50+ anni</td><td class="border border-muted p-2">🟢 Basso</td></tr>
            </tbody>
          </table>
        `
      },
      {
        id: 'fattori-usura',
        title: 'Fattori che Accelerano l\'Usura',
        content: `
          <p>Oltre all'età del materiale, diversi fattori ambientali accelerano il deterioramento delle tubature.</p>
          
          <h3>💧 Durezza dell'Acqua (Calcare)</h3>
          <p>L'Italia è uno dei paesi europei con acqua più dura. Il calcare si deposita all'interno dei tubi causando:</p>
          <ul>
            <li><strong>Riduzione del diametro interno</strong>: fino al 50% in 30 anni</li>
            <li><strong>Aumento della pressione</strong>: maggiore stress sui giunti</li>
            <li><strong>Corrosione localizzata</strong>: sotto i depositi si formano micro-ambienti corrosivi</li>
          </ul>
          
          <h3>🌡️ Escursioni Termiche</h3>
          <p>I cicli di dilatazione e contrazione dovuti al passaggio di acqua calda e fredda stressano i materiali:</p>
          <ul>
            <li>I giunti si allentano progressivamente</li>
            <li>Le guarnizioni perdono elasticità</li>
            <li>Si formano micro-fessure nel materiale</li>
          </ul>
          
          <h3>⚡ Pressione dell'Acqua</h3>
          <p>Una pressione troppo alta (oltre 4-5 bar) accelera l'usura di:</p>
          <ul>
            <li>Valvole e rubinetti</li>
            <li>Guarnizioni</li>
            <li>Giunti e raccordi</li>
          </ul>
          
          <h3>🏗️ Movimenti Strutturali</h3>
          <p>Gli edifici vecchi hanno subito decenni di assestamento. Anche movimenti millimetrici possono causare:</p>
          <ul>
            <li>Stress sui punti di attraversamento muro</li>
            <li>Rottura di tubi rigidi in ferro o rame</li>
            <li>Sconnessione di giunti</li>
          </ul>
        `
      },
      {
        id: 'segnali-allarme',
        title: 'Come Riconoscere i Segnali di Allarme',
        content: `
          <p>Prima di una rottura evidente, le tubature mostrano segnali premonitori che è importante riconoscere.</p>
          
          <h3>🔍 Segnali Visivi</h3>
          <ul>
            <li><strong>Acqua color ruggine</strong>: soprattutto al primo utilizzo mattutino</li>
            <li><strong>Macchie di umidità</strong>: anche piccole e intermittenti</li>
            <li><strong>Efflorescenze bianche</strong>: depositi di calcare sui muri esterni</li>
            <li><strong>Vernice che si gonfia</strong>: segnale di umidità dietro</li>
          </ul>
          
          <h3>👂 Segnali Sonori</h3>
          <ul>
            <li><strong>Gorgoglii</strong>: aria nelle tubature (possibile perdita)</li>
            <li><strong>Colpi d'ariete</strong>: rumori quando si chiude un rubinetto</li>
            <li><strong>Sibilo continuo</strong>: pressione alta o perdita</li>
          </ul>
          
          <h3>📊 Segnali Misurabili</h3>
          <ul>
            <li><strong>Bolletta in aumento</strong>: senza cambio abitudini</li>
            <li><strong>Calo di pressione</strong>: acqua che "arriva piano"</li>
            <li><strong>Contatore che gira</strong>: a rubinetti chiusi</li>
          </ul>
        `
      },
      {
        id: 'soluzioni-moderne',
        title: 'Soluzioni Moderne per Impianti Vecchi',
        content: `
          <p>Esistono diverse opzioni per chi ha un impianto datato, dalla sostituzione completa a interventi meno invasivi.</p>
          
          <h3>🔧 Relining (Rivestimento Interno)</h3>
          <p>Una tecnica che permette di "rivestire" l'interno dei tubi esistenti con una guaina in resina:</p>
          <ul>
            <li><strong>Pro</strong>: nessuna demolizione, costi contenuti</li>
            <li><strong>Contro</strong>: non adatto a tubi molto deteriorati</li>
            <li><strong>Costo indicativo</strong>: 50-100€ al metro lineare</li>
          </ul>
          
          <h3>🏠 Sostituzione Parziale</h3>
          <p>Sostituire solo le tratte più problematiche (es. bagno o cucina):</p>
          <ul>
            <li><strong>Pro</strong>: intervento mirato, costi controllabili</li>
            <li><strong>Contro</strong>: non risolve tutto, possibili problemi futuri altrove</li>
            <li><strong>Costo indicativo</strong>: 1.500-4.000€ per bagno</li>
          </ul>
          
          <h3>🏗️ Rifacimento Completo</h3>
          <p>La soluzione definitiva per impianti oltre 40 anni:</p>
          <ul>
            <li><strong>Pro</strong>: problema risolto per i prossimi 50 anni</li>
            <li><strong>Contro</strong>: invasivo, costoso, richiede tempo</li>
            <li><strong>Costo indicativo</strong>: 8.000-15.000€ per appartamento 100mq</li>
          </ul>
          
          <h3>💡 Quando Conviene il Rifacimento?</h3>
          <p>Consideratelo se:</p>
          <ul>
            <li>L'impianto ha più di 40 anni</li>
            <li>Avete avuto 3+ perdite negli ultimi 5 anni</li>
            <li>State ristrutturando comunque</li>
            <li>Volete vendere o affittare</li>
          </ul>
        `
      }
    ]
  },
  {
    slug: 'differenza-impianto-anni-60-moderno',
    title: 'Differenza tra Impianto Idraulico Anni \'60 e Moderno',
    metaTitle: 'Impianto Idraulico Anni \'60 vs Moderno | Confronto Completo',
    metaDescription: 'Confronto tecnico tra impianti idraulici degli anni \'60 e quelli moderni: materiali, tecnologie, efficienza e sicurezza. Scopri se il tuo impianto è a rischio.',
    h1: 'Differenza tra Impianto Idraulico Anni \'60 e Moderno',
    excerpt: 'Un confronto tecnico dettagliato che ti aiuta a capire lo stato del tuo impianto e quando è il momento di rinnovarlo.',
    category: 'impianti',
    publishedAt: '2026-01-18',
    updatedAt: '2026-01-27',
    readingTime: 15,
    relatedGuides: ['perdita-acqua-tubo-muro'],
    relatedPricing: 'costi-idraulico',
    sections: [
      {
        id: 'schema-anni-60',
        title: 'Come Era Fatto un Impianto degli Anni \'60',
        content: `
          <p>Gli impianti idraulici costruiti tra il 1950 e il 1975 seguivano standard molto diversi da quelli attuali.</p>
          
          <h3>📐 Schema Distributivo</h3>
          <p>L'acqua arrivava tipicamente con uno <strong>schema a derivazione</strong>:</p>
          <ul>
            <li>Un tubo principale attraversava l'appartamento</li>
            <li>Da questo partivano derivazioni per ogni punto acqua</li>
            <li>Tubi spesso murati senza guaina protettiva</li>
          </ul>
          
          <h3>🔩 Materiali Standard</h3>
          <table class="w-full border-collapse border border-muted mb-4">
            <thead>
              <tr class="bg-muted/50">
                <th class="border border-muted p-2 text-left">Componente</th>
                <th class="border border-muted p-2 text-left">Materiale Anni '60</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border border-muted p-2">Adduzione fredda</td><td class="border border-muted p-2">Ferro zincato o piombo</td></tr>
              <tr><td class="border border-muted p-2">Adduzione calda</td><td class="border border-muted p-2">Ferro zincato</td></tr>
              <tr><td class="border border-muted p-2">Scarichi</td><td class="border border-muted p-2">Ghisa o fibrocemento</td></tr>
              <tr><td class="border border-muted p-2">Giunti</td><td class="border border-muted p-2">Filettati con canapa</td></tr>
            </tbody>
          </table>
          
          <h3>⚠️ Problemi Strutturali</h3>
          <ul>
            <li><strong>Nessun collettore</strong>: impossibile chiudere un solo punto</li>
            <li><strong>Tubi annegati nel cemento</strong>: difficili da raggiungere</li>
            <li><strong>Mancanza di valvole di zona</strong>: per chiudere devi chiudere tutto</li>
            <li><strong>Dimensionamento approssimativo</strong>: spesso sottodimensionati</li>
          </ul>
        `
      },
      {
        id: 'impianto-moderno',
        title: 'Come È Fatto un Impianto Moderno',
        content: `
          <p>Gli impianti costruiti dopo il 2000, e specialmente dopo il 2010, seguono normative e tecnologie radicalmente diverse.</p>
          
          <h3>📐 Schema a Collettore</h3>
          <p>Ogni appartamento ha un <strong>collettore centrale</strong> (quadretto idraulico) da cui partono linee dedicate per ogni punto:</p>
          <ul>
            <li>Ogni rubinetto ha il suo tubo dedicato</li>
            <li>Possibilità di chiudere singolarmente ogni utenza</li>
            <li>Pressione uniforme in tutti i punti</li>
            <li>Nessun incrocio tra tubi</li>
          </ul>
          
          <h3>🔩 Materiali Attuali</h3>
          <table class="w-full border-collapse border border-muted mb-4">
            <thead>
              <tr class="bg-muted/50">
                <th class="border border-muted p-2 text-left">Componente</th>
                <th class="border border-muted p-2 text-left">Materiale Moderno</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border border-muted p-2">Adduzione</td><td class="border border-muted p-2">Multistrato o polipropilene</td></tr>
              <tr><td class="border border-muted p-2">Scarichi</td><td class="border border-muted p-2">PVC o polipropilene</td></tr>
              <tr><td class="border border-muted p-2">Giunti</td><td class="border border-muted p-2">Raccordi a pressare o saldati</td></tr>
              <tr><td class="border border-muted p-2">Protezione</td><td class="border border-muted p-2">Guaina corrugata</td></tr>
            </tbody>
          </table>
          
          <h3>✅ Vantaggi Chiave</h3>
          <ul>
            <li><strong>Ispezionabilità</strong>: tubi in guaina sostituibili senza rompere</li>
            <li><strong>Silenziosità</strong>: materiali che assorbono le vibrazioni</li>
            <li><strong>Resistenza al calcare</strong>: superfici lisce che non trattengono depositi</li>
            <li><strong>Sicurezza sanitaria</strong>: materiali certificati per uso alimentare</li>
          </ul>
        `
      },
      {
        id: 'confronto-diretto',
        title: 'Tabella Comparativa Completa',
        content: `
          <table class="w-full border-collapse border border-muted">
            <thead>
              <tr class="bg-muted/50">
                <th class="border border-muted p-2 text-left">Aspetto</th>
                <th class="border border-muted p-2 text-left">Impianto Anni '60</th>
                <th class="border border-muted p-2 text-left">Impianto Moderno</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-muted p-2 font-semibold">Vita utile</td>
                <td class="border border-muted p-2">40-50 anni</td>
                <td class="border border-muted p-2">50-70 anni</td>
              </tr>
              <tr>
                <td class="border border-muted p-2 font-semibold">Manutenzione</td>
                <td class="border border-muted p-2">Invasiva, costosa</td>
                <td class="border border-muted p-2">Semplice, economica</td>
              </tr>
              <tr>
                <td class="border border-muted p-2 font-semibold">Efficienza idrica</td>
                <td class="border border-muted p-2">Bassa (perdite frequenti)</td>
                <td class="border border-muted p-2">Alta (riduttori di flusso)</td>
              </tr>
              <tr>
                <td class="border border-muted p-2 font-semibold">Sicurezza</td>
                <td class="border border-muted p-2">Rischi (piombo, corrosione)</td>
                <td class="border border-muted p-2">Materiali certificati</td>
              </tr>
              <tr>
                <td class="border border-muted p-2 font-semibold">Controllo singolo</td>
                <td class="border border-muted p-2">Impossibile</td>
                <td class="border border-muted p-2">Valvola per ogni punto</td>
              </tr>
              <tr>
                <td class="border border-muted p-2 font-semibold">Rilevazione perdite</td>
                <td class="border border-muted p-2">Solo a danno avvenuto</td>
                <td class="border border-muted p-2">Sensori e automazione</td>
              </tr>
            </tbody>
          </table>
        `
      }
    ]
  },
  {
    slug: 'come-prevenire-perdite-acqua-inverno',
    title: 'Come Prevenire le Perdite d\'Acqua in Inverno',
    metaTitle: 'Come Prevenire Perdite Acqua in Inverno | Guida Pratica',
    metaDescription: 'Proteggi le tubature dal gelo: guida completa con consigli pratici per evitare rotture, danni e costose riparazioni durante i mesi freddi.',
    h1: 'Come Prevenire le Perdite d\'Acqua in Inverno',
    excerpt: 'Il gelo è nemico delle tubature. Scopri come proteggere il tuo impianto e prevenire costose rotture durante i mesi freddi.',
    category: 'prevenzione',
    publishedAt: '2026-01-22',
    updatedAt: '2026-01-27',
    readingTime: 10,
    relatedGuides: ['tubazione-corrosa', 'perdita-acqua-tubo-muro'],
    relatedPricing: 'costo-riparazione-perdita-acqua',
    sections: [
      {
        id: 'perche-gelo-pericoloso',
        title: 'Perché il Gelo È Pericoloso per le Tubature',
        content: `
          <p>L'acqua ha una proprietà unica tra i liquidi: quando gela, <strong>aumenta di volume</strong> del 9%. Questo fenomeno è devastante per le tubature.</p>
          
          <h3>⚗️ La Fisica del Problema</h3>
          <ul>
            <li>A 0°C l'acqua inizia a solidificare</li>
            <li>Il ghiaccio occupa più spazio dell'acqua liquida</li>
            <li>La pressione all'interno del tubo può superare <strong>200 bar</strong></li>
            <li>Nessun materiale domestico resiste a questa forza</li>
          </ul>
          
          <h3>🌡️ Temperature Critiche</h3>
          <table class="w-full border-collapse border border-muted mb-4">
            <thead>
              <tr class="bg-muted/50">
                <th class="border border-muted p-2 text-left">Temperatura</th>
                <th class="border border-muted p-2 text-left">Rischio</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border border-muted p-2">Sopra 5°C</td><td class="border border-muted p-2">🟢 Sicuro</td></tr>
              <tr><td class="border border-muted p-2">0°C - 5°C</td><td class="border border-muted p-2">🟡 Attenzione</td></tr>
              <tr><td class="border border-muted p-2">-5°C - 0°C</td><td class="border border-muted p-2">🟠 Rischio moderato</td></tr>
              <tr><td class="border border-muted p-2">Sotto -5°C</td><td class="border border-muted p-2">🔴 Rischio alto</td></tr>
            </tbody>
          </table>
          
          <h3>🏠 Zone più Vulnerabili</h3>
          <ul>
            <li><strong>Tubature esterne</strong>: rubinetti giardino, contatori</li>
            <li><strong>Sottotetti non isolati</strong>: tubi di adduzione</li>
            <li><strong>Garage e cantine</strong>: senza riscaldamento</li>
            <li><strong>Muri perimetrali esposti a nord</strong></li>
          </ul>
        `
      },
      {
        id: 'misure-preventive',
        title: 'Misure Preventive Efficaci',
        content: `
          <h3>🧤 Isolamento Tubi Esposti</h3>
          <p>L'intervento più semplice ed economico:</p>
          <ul>
            <li>Guaine isolanti in polietilene espanso (costo: 2-5€/metro)</li>
            <li>Nastro termico auto-adesivo per punti difficili</li>
            <li>Cavi scaldanti per zone critiche</li>
          </ul>
          
          <h3>🌡️ Mantenere una Temperatura Minima</h3>
          <p>Durante assenze prolungate in inverno:</p>
          <ul>
            <li>Non spegnere completamente il riscaldamento</li>
            <li>Impostare la caldaia su <strong>minimo 10-12°C</strong></li>
            <li>Lasciare aperte le porte di bagni e cucine</li>
          </ul>
          
          <h3>💧 Svuotamento Preventivo</h3>
          <p>Per case non riscaldate (seconde case, case vacanza):</p>
          <ol>
            <li>Chiudere la valvola generale</li>
            <li>Aprire tutti i rubinetti</li>
            <li>Svuotare lo scaldabagno</li>
            <li>Versare antigelo nei sifoni (wc, lavandini)</li>
          </ol>
          
          <h3>🔧 Manutenzione Pre-Invernale</h3>
          <p>Controlli da fare a ottobre-novembre:</p>
          <ul>
            <li>Verificare tenuta valvole esterne</li>
            <li>Controllare stato isolamento</li>
            <li>Sostituire guarnizioni usurate</li>
            <li>Far revisionare la caldaia</li>
          </ul>
        `
      },
      {
        id: 'cosa-fare-emergenza',
        title: 'Cosa Fare se i Tubi Gelano',
        content: `
          <h3>🔍 Riconoscere un Tubo Gelato</h3>
          <ul>
            <li>Rubinetto che non eroga acqua (o gocciola appena)</li>
            <li>Rumore sordo toccando il tubo</li>
            <li>Tubo visibilmente "gonfio" o deformato</li>
          </ul>
          
          <h3>✅ Procedura Corretta</h3>
          <ol>
            <li><strong>Chiudi subito la valvola generale</strong></li>
            <li>Apri il rubinetto interessato per sfogare la pressione</li>
            <li>Riscalda GRADUALMENTE con phon o panni caldi</li>
            <li>Mai fiamma diretta o acqua bollente</li>
            <li>Monitora durante lo scongelamento per individuare perdite</li>
          </ol>
          
          <h3>❌ Cosa NON Fare</h3>
          <ul>
            <li>Non usare fiamme libere (rischio incendio)</li>
            <li>Non versare acqua bollente (shock termico)</li>
            <li>Non forzare rubinetti bloccati</li>
            <li>Non ignorare il problema (il danno peggiora)</li>
          </ul>
          
          <h3>📞 Quando Chiamare</h3>
          <p>Contatta un professionista se:</p>
          <ul>
            <li>Vedi crepe o rigonfiamenti sul tubo</li>
            <li>Durante lo scongelamento appare una perdita</li>
            <li>Il tubo è inaccessibile o dentro un muro</li>
            <li>Hai dubbi sulla procedura da seguire</li>
          </ul>
        `
      }
    ]
  },
  {
    slug: 'perche-si-forma-calcare-tubature',
    title: 'Perché si Forma il Calcare nelle Tubature',
    metaTitle: 'Perché si Forma il Calcare | Cause, Effetti e Soluzioni',
    metaDescription: 'Scopri la scienza dietro la formazione del calcare: come si accumula, quali danni causa, e le soluzioni per proteggere il tuo impianto idraulico.',
    h1: 'Perché si Forma il Calcare nelle Tubature',
    excerpt: 'Il calcare è il nemico silenzioso degli impianti idraulici italiani. Capire come si forma aiuta a prevenirlo.',
    category: 'tubature',
    publishedAt: '2026-01-21',
    updatedAt: '2026-01-27',
    readingTime: 11,
    relatedGuides: ['rubinetto-perde-acqua-goccia'],
    relatedPricing: 'costi-idraulico',
    sections: [
      {
        id: 'chimica-calcare',
        title: 'La Chimica del Calcare',
        content: `
          <p>Il calcare è principalmente <strong>carbonato di calcio (CaCO₃)</strong>, un minerale naturalmente presente nell'acqua.</p>
          
          <h3>⚗️ Come si Forma</h3>
          <p>L'acqua attraversa strati di roccia calcarea e assorbe minerali. Quando l'acqua:</p>
          <ul>
            <li>Viene riscaldata (oltre 60°C)</li>
            <li>Evapora (rubinetti, docce)</li>
            <li>Ristagna in un punto</li>
          </ul>
          <p>I minerali disciolti <strong>precipitano</strong> e si depositano sulle superfici.</p>
          
          <h3>📏 Durezza dell'Acqua in Italia</h3>
          <p>La durezza si misura in <strong>gradi francesi (°f)</strong>:</p>
          <table class="w-full border-collapse border border-muted mb-4">
            <thead>
              <tr class="bg-muted/50">
                <th class="border border-muted p-2 text-left">Durezza</th>
                <th class="border border-muted p-2 text-left">Gradi °f</th>
                <th class="border border-muted p-2 text-left">Zone Tipiche</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border border-muted p-2">Dolce</td><td class="border border-muted p-2">0-15</td><td class="border border-muted p-2">Piemonte, Sardegna</td></tr>
              <tr><td class="border border-muted p-2">Media</td><td class="border border-muted p-2">15-25</td><td class="border border-muted p-2">Lombardia, Emilia</td></tr>
              <tr><td class="border border-muted p-2">Dura</td><td class="border border-muted p-2">25-40</td><td class="border border-muted p-2">Veneto, Lazio, Puglia</td></tr>
              <tr><td class="border border-muted p-2">Molto dura</td><td class="border border-muted p-2">40+</td><td class="border border-muted p-2">Alcune zone costiere</td></tr>
            </tbody>
          </table>
        `
      },
      {
        id: 'danni-calcare',
        title: 'I Danni Causati dal Calcare',
        content: `
          <h3>🔩 Danni alle Tubature</h3>
          <ul>
            <li><strong>Riduzione del flusso</strong>: fino al 75% in 20 anni</li>
            <li><strong>Aumento della pressione</strong>: stress su giunti e valvole</li>
            <li><strong>Corrosione sotto-deposito</strong>: attacca il metallo sottostante</li>
          </ul>
          
          <h3>🌡️ Danni alla Caldaia</h3>
          <p>Il calcare è particolarmente dannoso per le caldaie:</p>
          <ul>
            <li>Riduce l'efficienza di scambio termico del <strong>15-30%</strong></li>
            <li>Aumenta i consumi di gas</li>
            <li>Può causare blocco della caldaia</li>
            <li>Riduce la vita utile dell'apparecchio</li>
          </ul>
          
          <h3>🚿 Danni a Rubinetti e Sanitari</h3>
          <ul>
            <li>Aeratori intasati</li>
            <li>Cartucce miscelatori che si bloccano</li>
            <li>Macchie permanenti su ceramica e vetro</li>
            <li>Doccini che perdono getto</li>
          </ul>
          
          <h3>💰 Impatto Economico</h3>
          <table class="w-full border-collapse border border-muted">
            <thead>
              <tr class="bg-muted/50">
                <th class="border border-muted p-2 text-left">Problema</th>
                <th class="border border-muted p-2 text-left">Costo Extra Annuo</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border border-muted p-2">Caldaia meno efficiente</td><td class="border border-muted p-2">100-200€</td></tr>
              <tr><td class="border border-muted p-2">Sostituzione anticipata caldaia</td><td class="border border-muted p-2">~150€/anno ammortizzato</td></tr>
              <tr><td class="border border-muted p-2">Riparazioni rubinetteria</td><td class="border border-muted p-2">50-100€</td></tr>
            </tbody>
          </table>
        `
      },
      {
        id: 'soluzioni-calcare',
        title: 'Soluzioni per Combattere il Calcare',
        content: `
          <h3>🧪 Addolcitore d'Acqua</h3>
          <p>La soluzione più efficace per tutta la casa:</p>
          <ul>
            <li>Rimuove il 95-99% del calcio</li>
            <li>Protegge tutto l'impianto e gli elettrodomestici</li>
            <li>Costo installazione: 800-2.000€</li>
            <li>Manutenzione: 50-100€/anno (sale)</li>
          </ul>
          
          <h3>🧲 Anticalcare Magnetico/Elettronico</h3>
          <p>Alternativa meno invasiva:</p>
          <ul>
            <li>Non rimuove il calcio ma ne altera la struttura</li>
            <li>Efficacia discussa (30-70% secondo gli studi)</li>
            <li>Nessuna manutenzione</li>
            <li>Costo: 200-600€</li>
          </ul>
          
          <h3>🔧 Manutenzione Regolare</h3>
          <p>Per chi non vuole installare dispositivi:</p>
          <ul>
            <li>Pulizia aeratori ogni 3 mesi</li>
            <li>Decalcificazione caldaia annuale</li>
            <li>Aceto o anticalcare sui rubinetti</li>
          </ul>
          
          <h3>💡 Quale Scegliere?</h3>
          <table class="w-full border-collapse border border-muted">
            <thead>
              <tr class="bg-muted/50">
                <th class="border border-muted p-2 text-left">Durezza</th>
                <th class="border border-muted p-2 text-left">Soluzione Consigliata</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border border-muted p-2">Dolce (0-15°f)</td><td class="border border-muted p-2">Solo manutenzione</td></tr>
              <tr><td class="border border-muted p-2">Media (15-25°f)</td><td class="border border-muted p-2">Anticalcare magnetico</td></tr>
              <tr><td class="border border-muted p-2">Dura (25-40°f)</td><td class="border border-muted p-2">Addolcitore consigliato</td></tr>
              <tr><td class="border border-muted p-2">Molto dura (40+°f)</td><td class="border border-muted p-2">Addolcitore indispensabile</td></tr>
            </tbody>
          </table>
        `
      }
    ]
  },
  {
    slug: 'manutenzione-impianto-idraulico-frequenza',
    title: 'Manutenzione Impianto Idraulico: Ogni Quanto Farla',
    metaTitle: 'Manutenzione Impianto Idraulico | Guida alla Frequenza Ideale',
    metaDescription: 'Scopri ogni quanto fare manutenzione all\'impianto idraulico: calendario controlli, cosa verificare e quando chiamare un professionista.',
    h1: 'Manutenzione Impianto Idraulico: Ogni Quanto Farla',
    excerpt: 'Una guida pratica per capire quando e come fare manutenzione, risparmiando su riparazioni costose.',
    category: 'manutenzione',
    publishedAt: '2026-01-19',
    updatedAt: '2026-01-27',
    readingTime: 9,
    relatedGuides: ['caldaia-non-parte'],
    relatedPricing: 'costo-manutenzione-caldaia',
    sections: [
      {
        id: 'calendario-controlli',
        title: 'Calendario dei Controlli Consigliati',
        content: `
          <h3>📅 Controlli Mensili (Fai-da-te)</h3>
          <ul>
            <li>Verifica visiva perdite sotto lavelli</li>
            <li>Controllo pressione acqua (deve essere costante)</li>
            <li>Verifica funzionamento scarichi</li>
          </ul>
          
          <h3>📅 Controlli Trimestrali (Fai-da-te)</h3>
          <ul>
            <li>Pulizia aeratori rubinetti</li>
            <li>Verifica guarnizioni visibili</li>
            <li>Controllo sifoni</li>
            <li>Test valvole di arresto</li>
          </ul>
          
          <h3>📅 Controlli Semestrali</h3>
          <ul>
            <li>Pulizia filtri generali</li>
            <li>Verifica pressione caldaia</li>
            <li>Controllo stato flessibili</li>
          </ul>
          
          <h3>📅 Controlli Annuali (Professionista)</h3>
          <ul>
            <li>Manutenzione caldaia (obbligatoria per legge)</li>
            <li>Verifica impianto riscaldamento</li>
            <li>Controllo stato generale tubature</li>
          </ul>
        `
      },
      {
        id: 'cosa-controllare',
        title: 'Cosa Controllare in Ogni Punto',
        content: `
          <h3>🚰 Rubinetti</h3>
          <table class="w-full border-collapse border border-muted mb-4">
            <thead>
              <tr class="bg-muted/50">
                <th class="border border-muted p-2 text-left">Controllo</th>
                <th class="border border-muted p-2 text-left">Frequenza</th>
                <th class="border border-muted p-2 text-left">Segnale Allarme</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border border-muted p-2">Gocciolamento</td><td class="border border-muted p-2">Mensile</td><td class="border border-muted p-2">Gocce a rubinetto chiuso</td></tr>
              <tr><td class="border border-muted p-2">Flusso</td><td class="border border-muted p-2">Trimestrale</td><td class="border border-muted p-2">Getto ridotto o irregolare</td></tr>
              <tr><td class="border border-muted p-2">Movimento</td><td class="border border-muted p-2">Trimestrale</td><td class="border border-muted p-2">Durezza o gioco eccessivo</td></tr>
            </tbody>
          </table>
          
          <h3>🚿 Doccia</h3>
          <table class="w-full border-collapse border border-muted mb-4">
            <thead>
              <tr class="bg-muted/50">
                <th class="border border-muted p-2 text-left">Controllo</th>
                <th class="border border-muted p-2 text-left">Frequenza</th>
                <th class="border border-muted p-2 text-left">Segnale Allarme</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border border-muted p-2">Scarico</td><td class="border border-muted p-2">Mensile</td><td class="border border-muted p-2">Acqua che ristagna</td></tr>
              <tr><td class="border border-muted p-2">Soffione</td><td class="border border-muted p-2">Trimestrale</td><td class="border border-muted p-2">Getti irregolari</td></tr>
              <tr><td class="border border-muted p-2">Sigillatura</td><td class="border border-muted p-2">Semestrale</td><td class="border border-muted p-2">Silicone nero o staccato</td></tr>
            </tbody>
          </table>
          
          <h3>🚽 WC</h3>
          <table class="w-full border-collapse border border-muted">
            <thead>
              <tr class="bg-muted/50">
                <th class="border border-muted p-2 text-left">Controllo</th>
                <th class="border border-muted p-2 text-left">Frequenza</th>
                <th class="border border-muted p-2 text-left">Segnale Allarme</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border border-muted p-2">Scarico completo</td><td class="border border-muted p-2">Mensile</td><td class="border border-muted p-2">Doppio scarico necessario</td></tr>
              <tr><td class="border border-muted p-2">Tenuta cassetta</td><td class="border border-muted p-2">Mensile</td><td class="border border-muted p-2">Rumore acqua continuo</td></tr>
              <tr><td class="border border-muted p-2">Base stabile</td><td class="border border-muted p-2">Semestrale</td><td class="border border-muted p-2">Movimento o oscillazione</td></tr>
            </tbody>
          </table>
        `
      }
    ]
  },
  {
    slug: 'come-funziona-impianto-idraulico-casa',
    title: 'Come Funziona l\'Impianto Idraulico di una Casa',
    metaTitle: 'Come Funziona un Impianto Idraulico | Guida Educativa Completa',
    metaDescription: 'Scopri come funziona l\'impianto idraulico della tua casa: dal contatore ai rubinetti, dalla caldaia agli scarichi. Guida illustrata per tutti.',
    h1: 'Come Funziona l\'Impianto Idraulico di una Casa',
    excerpt: 'Una guida educativa completa per capire ogni componente del sistema idraulico domestico.',
    category: 'impianti',
    publishedAt: '2026-01-23',
    updatedAt: '2026-01-27',
    readingTime: 14,
    relatedGuides: ['perdita-acqua-tubo-muro'],
    relatedPricing: 'costi-idraulico',
    sections: [
      {
        id: 'schema-generale',
        title: 'Lo Schema Generale',
        content: `
          <p>Un impianto idraulico domestico si divide in due circuiti principali:</p>
          
          <h3>💧 Circuito di Adduzione (Acqua in Ingresso)</h3>
          <p>Porta l'acqua potabile dal contatore ai punti di utilizzo:</p>
          <ol>
            <li><strong>Contatore</strong>: misura i consumi</li>
            <li><strong>Riduttore di pressione</strong>: regola la pressione a 3-4 bar</li>
            <li><strong>Valvola generale</strong>: permette di chiudere tutto</li>
            <li><strong>Collettore</strong> (impianti moderni): distribuisce l'acqua</li>
            <li><strong>Tubazioni</strong>: portano l'acqua ai rubinetti</li>
          </ol>
          
          <h3>🚰 Circuito di Scarico (Acqua in Uscita)</h3>
          <p>Raccoglie le acque reflue e le convoglia alla fognatura:</p>
          <ol>
            <li><strong>Sifoni</strong>: bloccano i cattivi odori</li>
            <li><strong>Tubazioni orizzontali</strong>: con pendenza 1-2%</li>
            <li><strong>Colonne di scarico</strong>: verticali, portano alla fognatura</li>
            <li><strong>Pozzetti</strong>: punti di ispezione</li>
            <li><strong>Fognatura pubblica</strong>: destinazione finale</li>
          </ol>
        `
      },
      {
        id: 'adduzione-dettaglio',
        title: 'Il Circuito di Adduzione in Dettaglio',
        content: `
          <h3>🔧 Il Contatore</h3>
          <p>Situato solitamente al confine della proprietà o in un vano comune:</p>
          <ul>
            <li>Misura il consumo in metri cubi</li>
            <li>Ha una valvola a monte (proprietà dell'acquedotto)</li>
            <li>Può avere una valvola a valle (proprietà tua)</li>
          </ul>
          
          <h3>⚙️ Il Riduttore di Pressione</h3>
          <p>Componente fondamentale spesso sottovalutato:</p>
          <ul>
            <li>Riduce la pressione della rete (che può arrivare a 6-8 bar)</li>
            <li>Protegge rubinetti e elettrodomestici</li>
            <li>Va controllato/sostituito ogni 5-10 anni</li>
          </ul>
          
          <h3>🌡️ La Produzione di Acqua Calda</h3>
          <p>Tre sistemi principali:</p>
          <table class="w-full border-collapse border border-muted mb-4">
            <thead>
              <tr class="bg-muted/50">
                <th class="border border-muted p-2 text-left">Sistema</th>
                <th class="border border-muted p-2 text-left">Come Funziona</th>
                <th class="border border-muted p-2 text-left">Pro/Contro</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-muted p-2">Caldaia istantanea</td>
                <td class="border border-muted p-2">Scalda l'acqua al momento</td>
                <td class="border border-muted p-2">Niente scorta, attesa riscaldamento</td>
              </tr>
              <tr>
                <td class="border border-muted p-2">Boiler elettrico</td>
                <td class="border border-muted p-2">Mantiene acqua calda in serbatoio</td>
                <td class="border border-muted p-2">Consumo costante, sempre pronta</td>
              </tr>
              <tr>
                <td class="border border-muted p-2">Caldaia con accumulo</td>
                <td class="border border-muted p-2">Combina i vantaggi</td>
                <td class="border border-muted p-2">Più costosa, migliore comfort</td>
              </tr>
            </tbody>
          </table>
        `
      },
      {
        id: 'scarichi-dettaglio',
        title: 'Il Sistema di Scarico in Dettaglio',
        content: `
          <h3>🔄 I Sifoni</h3>
          <p>Il sifone è la curva a "S" o "U" sotto ogni sanitario:</p>
          <ul>
            <li>Trattiene sempre una piccola quantità d'acqua</li>
            <li>Questa "guardia idraulica" blocca i gas fognari</li>
            <li>Se il sifone si svuota, entra cattivo odore in casa</li>
          </ul>
          
          <h3>↘️ Le Pendenze</h3>
          <p>Gli scarichi orizzontali devono avere pendenza corretta:</p>
          <ul>
            <li><strong>1-2%</strong> è l'ideale (1-2 cm ogni metro)</li>
            <li>Troppo poca: l'acqua ristagna</li>
            <li>Troppa: l'acqua corre via lasciando i solidi</li>
          </ul>
          
          <h3>⬆️ Le Colonne di Scarico</h3>
          <p>Tubi verticali che raccolgono gli scarichi dei piani:</p>
          <ul>
            <li>Terminano sul tetto con lo <strong>sfiato</strong></li>
            <li>Lo sfiato permette l'ingresso d'aria</li>
            <li>Senza sfiato: gorgoglii e sifoni che si svuotano</li>
          </ul>
          
          <h3>💡 Acque Bianche vs Acque Nere</h3>
          <table class="w-full border-collapse border border-muted">
            <thead>
              <tr class="bg-muted/50">
                <th class="border border-muted p-2 text-left">Tipo</th>
                <th class="border border-muted p-2 text-left">Provenienza</th>
                <th class="border border-muted p-2 text-left">Destinazione</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="border border-muted p-2">Acque bianche</td><td class="border border-muted p-2">Pioggia, lavaggi</td><td class="border border-muted p-2">Dispersione o fogna separata</td></tr>
              <tr><td class="border border-muted p-2">Acque grigie</td><td class="border border-muted p-2">Lavandini, doccia</td><td class="border border-muted p-2">Fognatura mista</td></tr>
              <tr><td class="border border-muted p-2">Acque nere</td><td class="border border-muted p-2">WC</td><td class="border border-muted p-2">Fognatura (depurazione)</td></tr>
            </tbody>
          </table>
        `
      }
    ]
  },
  {
    slug: 'dove-passano-tubi-appartamento',
    title: 'Dove Passano i Tubi in un Appartamento',
    metaTitle: 'Dove Passano i Tubi in Casa | Mappa delle Tubature',
    metaDescription: 'Scopri dove sono posizionate le tubature nel tuo appartamento: muri, pavimenti, controsoffitti. Utile per ristrutturazioni e ricerca perdite.',
    h1: 'Dove Passano i Tubi in un Appartamento',
    excerpt: 'Una guida per capire la posizione delle tubature, fondamentale per ristrutturazioni e ricerca perdite.',
    category: 'impianti',
    publishedAt: '2026-01-24',
    updatedAt: '2026-01-27',
    readingTime: 8,
    relatedGuides: ['perdita-acqua-tubo-muro'],
    relatedPricing: 'costo-riparazione-perdita-acqua',
    sections: [
      {
        id: 'posizioni-tipiche',
        title: 'Posizioni Tipiche delle Tubature',
        content: `
          <h3>🚿 Bagno</h3>
          <ul>
            <li><strong>Adduzione</strong>: nel muro dietro sanitari (altezza 50-100 cm)</li>
            <li><strong>Scarichi</strong>: sotto il pavimento (WC, doccia) o nel muro (lavabo)</li>
            <li><strong>Colonna condominiale</strong>: angolo del bagno, verticale</li>
          </ul>
          
          <h3>🍳 Cucina</h3>
          <ul>
            <li><strong>Adduzione</strong>: sotto il lavello (da muro o pavimento)</li>
            <li><strong>Scarico</strong>: sotto il lavello, collegato a colonna</li>
            <li><strong>Gas</strong>: tubo giallo, spesso a vista</li>
          </ul>
          
          <h3>🔥 Caldaia</h3>
          <ul>
            <li><strong>Ingresso acqua fredda</strong>: tubo contrassegnato blu</li>
            <li><strong>Uscita acqua calda</strong>: tubo contrassegnato rosso</li>
            <li><strong>Circuito riscaldamento</strong>: mandata e ritorno termosifoni</li>
            <li><strong>Scarico condensa</strong>: tubo piccolo verso scarico</li>
          </ul>
        `
      },
      {
        id: 'come-trovarli',
        title: 'Come Individuare i Tubi Nascosti',
        content: `
          <h3>🔍 Metodi Non Invasivi</h3>
          <ul>
            <li><strong>Rilevatore di metalli</strong>: trova tubi in rame e ferro</li>
            <li><strong>Termocamera</strong>: vede tubi con acqua calda</li>
            <li><strong>Geofono</strong>: sente il rumore dell'acqua</li>
            <li><strong>Planimetrie</strong>: se disponibili dal costruttore</li>
          </ul>
          
          <h3>📍 Indizi Visivi</h3>
          <ul>
            <li>Tracce di stuccatura lineare nei muri</li>
            <li>Differenze di colore/texture nell'intonaco</li>
            <li>Posizione di rubinetti e sanitari indica il percorso</li>
            <li>Cassette di derivazione (quadratini nel muro)</li>
          </ul>
          
          <h3>⚠️ Regole Generali</h3>
          <ul>
            <li>I tubi viaggiano verticalmente e orizzontalmente, mai in diagonale</li>
            <li>Seguono percorsi logici dal punto di ingresso ai sanitari</li>
            <li>Evitano zone con carichi strutturali (pilastri, travi)</li>
          </ul>
        `
      }
    ]
  },
  {
    slug: 'differenza-scarico-adduzione',
    title: 'Differenza tra Scarico e Adduzione',
    metaTitle: 'Scarico vs Adduzione | Guida ai Due Circuiti Idraulici',
    metaDescription: 'Capire la differenza tra sistema di adduzione (acqua in ingresso) e scarico (acqua in uscita): materiali, funzionamento e problemi tipici.',
    h1: 'Differenza tra Scarico e Adduzione',
    excerpt: 'Due circuiti, due funzioni opposte. Capire la differenza aiuta a diagnosticare i problemi.',
    category: 'impianti',
    publishedAt: '2026-01-25',
    updatedAt: '2026-01-27',
    readingTime: 7,
    relatedGuides: ['wc-intasato-non-scarica', 'perdita-acqua-tubo-muro'],
    relatedPricing: 'costi-idraulico',
    sections: [
      {
        id: 'confronto',
        title: 'Confronto Diretto',
        content: `
          <table class="w-full border-collapse border border-muted">
            <thead>
              <tr class="bg-muted/50">
                <th class="border border-muted p-2 text-left">Caratteristica</th>
                <th class="border border-muted p-2 text-left">Adduzione</th>
                <th class="border border-muted p-2 text-left">Scarico</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-muted p-2 font-semibold">Funzione</td>
                <td class="border border-muted p-2">Porta acqua pulita ai rubinetti</td>
                <td class="border border-muted p-2">Porta via acqua usata</td>
              </tr>
              <tr>
                <td class="border border-muted p-2 font-semibold">Pressione</td>
                <td class="border border-muted p-2">In pressione (3-4 bar)</td>
                <td class="border border-muted p-2">A gravità (0 bar)</td>
              </tr>
              <tr>
                <td class="border border-muted p-2 font-semibold">Diametro</td>
                <td class="border border-muted p-2">Piccolo (16-20 mm)</td>
                <td class="border border-muted p-2">Grande (40-110 mm)</td>
              </tr>
              <tr>
                <td class="border border-muted p-2 font-semibold">Materiale tipico</td>
                <td class="border border-muted p-2">Multistrato, rame, polipropilene</td>
                <td class="border border-muted p-2">PVC, polipropilene</td>
              </tr>
              <tr>
                <td class="border border-muted p-2 font-semibold">Pendenza</td>
                <td class="border border-muted p-2">Non necessaria</td>
                <td class="border border-muted p-2">Obbligatoria (1-2%)</td>
              </tr>
              <tr>
                <td class="border border-muted p-2 font-semibold">Problema tipico</td>
                <td class="border border-muted p-2">Perdite (acqua esce)</td>
                <td class="border border-muted p-2">Intasamenti (acqua non scende)</td>
              </tr>
            </tbody>
          </table>
        `
      },
      {
        id: 'problemi-specifici',
        title: 'Problemi Specifici di Ogni Circuito',
        content: `
          <h3>💧 Problemi di Adduzione</h3>
          <ul>
            <li><strong>Perdite</strong>: l'acqua in pressione cerca sempre una via d'uscita</li>
            <li><strong>Rumorosità</strong>: colpi d'ariete, sibili</li>
            <li><strong>Calcare</strong>: riduce il flusso e la pressione</li>
            <li><strong>Corrosione</strong>: nei tubi metallici vecchi</li>
          </ul>
          
          <h3>🚰 Problemi di Scarico</h3>
          <ul>
            <li><strong>Intasamenti</strong>: accumulo di detriti</li>
            <li><strong>Cattivi odori</strong>: sifoni secchi o danneggiati</li>
            <li><strong>Gorgoglii</strong>: mancanza di sfiato</li>
            <li><strong>Reflusso</strong>: pendenza insufficiente o ostruzione</li>
          </ul>
        `
      }
    ]
  }
];

// ============================================
// STATISTICHE PROBLEMI IDRAULICI
// ============================================

export const PLUMBING_STATISTICS: StatisticData[] = [
  {
    label: 'Case con perdite attive non rilevate',
    value: '14%',
    description: 'Una casa su sette ha una perdita d\'acqua nascosta che sta causando danni progressivi.',
    source: 'Studi settore idraulico italiano'
  },
  {
    label: 'Interventi urgenti (pronto intervento)',
    value: '32%',
    description: 'Quasi un terzo degli interventi idraulici sono emergenze che non possono attendere.',
    source: 'Analisi richieste 2025'
  },
  {
    label: 'Problemi causati da calcare',
    value: '45%',
    description: 'Quasi la metà dei guasti idraulici in Italia è legata all\'accumulo di calcare.',
    source: 'Dati acquedotti italiani'
  },
  {
    label: 'Età media impianti in Italia',
    value: '38 anni',
    description: 'Gran parte del patrimonio edilizio italiano ha impianti che superano la vita utile prevista.',
    source: 'Censimento ISTAT edifici'
  },
  {
    label: 'Spreco medio per rubinetto che gocciola',
    value: '7.300 L/anno',
    description: 'Un singolo rubinetto che perde una goccia al secondo spreca oltre 7.000 litri annui.',
    source: 'Calcolo idraulico standard'
  },
  {
    label: 'Risparmio con manutenzione preventiva',
    value: '60%',
    description: 'Chi fa manutenzione regolare risparmia in media il 60% sui costi di riparazione.',
    source: 'Studi settore impiantistica'
  },
  {
    label: 'WC intasati: causa principale',
    value: '68% salviette',
    description: 'La maggior parte degli intasamenti WC è causata da salviette umidificate gettate nel water.',
    source: 'Dati aziende spurgo'
  },
  {
    label: 'Tempo medio per trovare idraulico urgente',
    value: '2.5 ore',
    description: 'In media, trovare un idraulico disponibile per un\'emergenza richiede oltre 2 ore.',
    source: 'Survey utenti 2025'
  }
];

// ============================================
// CHECKLIST MANUTENZIONE
// ============================================

export const MAINTENANCE_CHECKLIST: ChecklistItem[] = [
  // Controlli mensili
  {
    id: 'check-perdite-visive',
    title: 'Verifica visiva perdite sotto lavelli',
    description: 'Controlla sotto tutti i lavelli e wc per individuare gocciolamenti o macchie di umidità.',
    frequency: 'mensile',
    urgency: 'alta'
  },
  {
    id: 'check-scarichi',
    title: 'Test velocità scarichi',
    description: 'Verifica che l\'acqua defluisca velocemente da tutti i lavandini e dalla doccia.',
    frequency: 'mensile',
    urgency: 'media'
  },
  {
    id: 'check-pressione',
    title: 'Controllo pressione acqua',
    description: 'Apri il rubinetto più lontano dalla fonte e verifica che il getto sia costante.',
    frequency: 'mensile',
    urgency: 'media'
  },
  // Controlli trimestrali
  {
    id: 'pulizia-aeratori',
    title: 'Pulizia aeratori rubinetti',
    description: 'Svita gli aeratori (beccucci) dei rubinetti e puliscili dal calcare con aceto.',
    frequency: 'trimestrale',
    urgency: 'bassa'
  },
  {
    id: 'test-valvole',
    title: 'Test valvole di arresto',
    description: 'Prova ad aprire e chiudere le valvole sotto i sanitari per verificare che funzionino.',
    frequency: 'trimestrale',
    urgency: 'alta'
  },
  {
    id: 'verifica-sifoni',
    title: 'Controllo sifoni',
    description: 'Verifica che tutti i sifoni siano pieni d\'acqua (niente cattivi odori = tutto ok).',
    frequency: 'trimestrale',
    urgency: 'media'
  },
  // Controlli semestrali
  {
    id: 'controllo-flessibili',
    title: 'Ispezione flessibili e giunti',
    description: 'Controlla i tubi flessibili di lavatrice, lavastoviglie e sanitari per crepe o rigonfiamenti.',
    frequency: 'semestrale',
    urgency: 'alta'
  },
  {
    id: 'pulizia-filtri',
    title: 'Pulizia filtri generali',
    description: 'Se presente, pulisci il filtro dell\'impianto idraulico centrale.',
    frequency: 'semestrale',
    urgency: 'media'
  },
  {
    id: 'verifica-sigillature',
    title: 'Controllo sigillature silicone',
    description: 'Verifica lo stato del silicone intorno a doccia, vasca e lavandini.',
    frequency: 'semestrale',
    urgency: 'media'
  },
  // Controlli annuali
  {
    id: 'manutenzione-caldaia',
    title: 'Manutenzione caldaia (obbligatoria)',
    description: 'Fai eseguire la revisione annuale della caldaia da un tecnico abilitato.',
    frequency: 'annuale',
    urgency: 'alta'
  },
  {
    id: 'verifica-termosifoni',
    title: 'Sfiato termosifoni',
    description: 'Prima dell\'inverno, sfiata tutti i termosifoni per eliminare l\'aria.',
    frequency: 'annuale',
    urgency: 'media'
  },
  {
    id: 'controllo-contatore',
    title: 'Lettura contatore a rubinetti chiusi',
    description: 'Chiudi tutti i rubinetti e verifica che il contatore non giri (perdite nascoste).',
    frequency: 'annuale',
    urgency: 'alta'
  }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getApprofondimentoBySlug(slug: string): ApprofondimentoArticle | undefined {
  return APPROFONDIMENTI.find(a => a.slug === slug);
}

export function getStatistics(): StatisticData[] {
  return PLUMBING_STATISTICS;
}

export function getChecklist(): ChecklistItem[] {
  return MAINTENANCE_CHECKLIST;
}

export function getChecklistByFrequency(frequency: ChecklistItem['frequency']): ChecklistItem[] {
  return MAINTENANCE_CHECKLIST.filter(item => item.frequency === frequency);
}
