import { Wrench, CheckCircle, ShieldCheck, Clock } from 'lucide-react';

// Content based on article type
function getPlumberContent(articleSlug: string, articleTitle: string): {
  title: string;
  intro: string;
  steps: Array<{ icon: string; title: string; description: string }>;
} {
  const lowerSlug = articleSlug.toLowerCase();
  const lowerTitle = articleTitle.toLowerCase();
  
  // WC / Water intasato
  if (lowerSlug.includes('wc') || lowerSlug.includes('water') || lowerTitle.includes('wc')) {
    return {
      title: 'Cosa Fa l\'Idraulico per un WC Intasato',
      intro: 'Un idraulico professionista dispone di strumenti e competenze per risolvere anche le ostruzioni più ostinate in modo rapido e definitivo.',
      steps: [
        { icon: '🔍', title: 'Diagnosi del problema', description: 'Identifica la posizione e la natura dell\'ostruzione con videoispezione se necessario' },
        { icon: '🔧', title: 'Sturamento professionale', description: 'Utilizza sonda professionale, idrogetto o pompa ad alta pressione per eliminare il blocco' },
        { icon: '🚿', title: 'Pulizia delle tubature', description: 'Rimuove completamente i residui per evitare che il problema si ripresenti' },
        { icon: '✅', title: 'Verifica finale', description: 'Testa lo scarico più volte per assicurarsi che funzioni perfettamente' }
      ]
    };
  }
  
  // Lavandino
  if (lowerSlug.includes('lavandino') || lowerTitle.includes('lavandino')) {
    return {
      title: 'Cosa Fa l\'Idraulico per un Lavandino Intasato',
      intro: 'Quando i metodi casalinghi non funzionano, l\'idraulico interviene con strumenti professionali per una soluzione definitiva.',
      steps: [
        { icon: '🔍', title: 'Ispezione dello scarico', description: 'Verifica sifone, tubature e colonna di scarico per localizzare l\'ostruzione' },
        { icon: '🔧', title: 'Smontaggio sifone', description: 'Se necessario, smonta e pulisce il sifone manualmente' },
        { icon: '🌀', title: 'Sonda professionale', description: 'Utilizza una sonda meccanica o elettrica per raggiungere ostruzioni profonde' },
        { icon: '💧', title: 'Idrogetto', description: 'Per ostruzioni ostinate, usa l\'idrogetto ad alta pressione che pulisce completamente le tubature' }
      ]
    };
  }
  
  // Caldaia
  if (lowerSlug.includes('caldaia') || lowerTitle.includes('caldaia')) {
    return {
      title: 'Cosa Fa il Tecnico per una Caldaia in Blocco',
      intro: 'Un tecnico caldaista certificato può diagnosticare e risolvere qualsiasi problema in sicurezza, rispettando le normative.',
      steps: [
        { icon: '📊', title: 'Lettura codice errore', description: 'Interpreta il codice di errore per identificare immediatamente il componente guasto' },
        { icon: '🔬', title: 'Diagnosi completa', description: 'Verifica pressione, circolazione, bruciatore, scambiatore e tutti i componenti' },
        { icon: '🔧', title: 'Riparazione o sostituzione', description: 'Interviene sul componente guasto con ricambi originali o compatibili' },
        { icon: '📋', title: 'Certificazione', description: 'Rilascia documentazione dell\'intervento e verifica la sicurezza dell\'impianto' }
      ]
    };
  }
  
  // Tubo che perde
  if (lowerSlug.includes('tubo') || lowerSlug.includes('perdita') || lowerSlug.includes('allagamento')) {
    return {
      title: 'Cosa Fa l\'Idraulico per un Tubo che Perde',
      intro: 'L\'idraulico localizza la perdita con precisione e interviene con una riparazione definitiva e sicura.',
      steps: [
        { icon: '🔍', title: 'Localizzazione perdita', description: 'Usa strumenti come termocamera o cercaperdite acustico per trovare perdite nascoste' },
        { icon: '🛠️', title: 'Riparazione professionale', description: 'Sostituisce il tratto danneggiato o salda il tubo con tecniche professionali' },
        { icon: '🧪', title: 'Test di tenuta', description: 'Verifica che non ci siano altre perdite mettendo l\'impianto sotto pressione' },
        { icon: '🏠', title: 'Ripristino', description: 'Se necessario, coordina il ripristino di pareti o pavimenti aperti' }
      ]
    };
  }
  
  // Doccia
  if (lowerSlug.includes('doccia') || lowerTitle.includes('doccia')) {
    return {
      title: 'Cosa Fa l\'Idraulico per una Doccia che Non Scarica',
      intro: 'L\'idraulico interviene anche su scarichi incassati e ostruzioni profonde che non puoi raggiungere.',
      steps: [
        { icon: '🔍', title: 'Ispezione scarico', description: 'Verifica griglia, sifone sifonato e collegamento alla colonna di scarico' },
        { icon: '🌀', title: 'Sonda professionale', description: 'Raggiunge ostruzioni nel sifone o nella tubatura di scarico' },
        { icon: '💧', title: 'Idrogetto', description: 'Pulisce completamente lo scarico eliminando incrostazioni e depositi' },
        { icon: '🔧', title: 'Eventuale sostituzione', description: 'Se il sifone è danneggiato o il piatto doccia mal posato, interviene strutturalmente' }
      ]
    };
  }
  
  // Rubinetto
  if (lowerSlug.includes('rubinetto') || lowerTitle.includes('rubinetto')) {
    return {
      title: 'Cosa Fa l\'Idraulico per un Rubinetto che Gocciola',
      intro: 'L\'idraulico valuta se conviene riparare o sostituire, e interviene anche su componenti ossidati o danneggiati.',
      steps: [
        { icon: '🔍', title: 'Diagnosi del problema', description: 'Verifica se il problema è nella guarnizione, cartuccia, sede o raccordi' },
        { icon: '🔧', title: 'Riparazione esperta', description: 'Sblocca componenti ossidati e sostituisce le parti danneggiate' },
        { icon: '⚙️', title: 'Rettifica sede', description: 'Se la sede è corrosa, usa lo svasatore per ripristinarla' },
        { icon: '✨', title: 'Test e regolazione', description: 'Verifica che non ci siano perdite e regola la pressione se necessario' }
      ]
    };
  }
  
  // Termosifone
  if (lowerSlug.includes('termosifone') || lowerSlug.includes('sfiata')) {
    return {
      title: 'Cosa Fa l\'Idraulico per i Termosifoni',
      intro: 'L\'idraulico verifica l\'intero impianto di riscaldamento per risolvere problemi di circolazione e aria.',
      steps: [
        { icon: '🔍', title: 'Controllo impianto', description: 'Verifica pressione, circolazione, e stato delle valvole' },
        { icon: '🧹', title: 'Sfiato professionale', description: 'Sfiata tutti i radiatori nell\'ordine corretto e verifica eventuali perdite' },
        { icon: '💧', title: 'Lavaggio impianto', description: 'Se necessario, effettua un lavaggio chimico per rimuovere fanghi e incrostazioni' },
        { icon: '🔧', title: 'Sostituzione valvole', description: 'Sostituisce valvole bloccate o detentori non funzionanti' }
      ]
    };
  }
  
  // Default content
  return {
    title: 'Cosa Fa l\'Idraulico Professionista',
    intro: 'Un idraulico qualificato dispone di strumenti professionali e competenze per risolvere qualsiasi problema in modo rapido, sicuro e definitivo.',
    steps: [
      { icon: '🔍', title: 'Diagnosi accurata', description: 'Individua la causa esatta del problema con strumenti professionali' },
      { icon: '🔧', title: 'Intervento mirato', description: 'Risolve il problema alla radice, non solo i sintomi' },
      { icon: '✅', title: 'Garanzia sul lavoro', description: 'Offre garanzia sull\'intervento e usa materiali di qualità' },
      { icon: '📋', title: 'Consulenza', description: 'Fornisce consigli per prevenire problemi futuri' }
    ]
  };
}

interface WhatPlumberDoesProps {
  articleSlug: string;
  articleTitle: string;
}

export function WhatPlumberDoes({ articleSlug, articleTitle }: WhatPlumberDoesProps) {
  const content = getPlumberContent(articleSlug, articleTitle);
  
  return (
    <section className="my-10 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
          <Wrench className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-foreground">
          🔧 {content.title}
        </h2>
      </div>
      
      <p className="text-muted-foreground mb-6 leading-relaxed">
        {content.intro}
      </p>
      
      <div className="grid sm:grid-cols-2 gap-4">
        {content.steps.map((step, index) => (
          <div 
            key={index}
            className="flex items-start gap-3 p-4 bg-background/50 rounded-xl border border-border/50"
          >
            <span className="text-2xl">{step.icon}</span>
            <div>
              <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-primary" />
          Intervento garantito
        </span>
        <span className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Professionisti verificati
        </span>
        <span className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          Risposta rapida
        </span>
      </div>
    </section>
  );
}
