import { MethodCard } from './MethodCard';
import { SummaryBox } from './SummaryBox';
import { WarningBox } from './WarningBox';
import { ProCallBox } from './ProCallBox';
import { FinalCTABox } from './FinalCTABox';
import { ArticleIntro } from './ArticleIntro';

// Configuration for article-specific visual enhancements
interface ArticleEnhancement {
  slug: string;
  intro: string;
  summary?: {
    icon: string;
    title: string;
    items: Array<{ icon: string; label: string }>;
  };
  methods?: Array<{
    icon: string;
    title: string;
    description: string;
    steps: string[];
  }>;
  warnings?: Array<{
    title?: string;
    text: string;
  }>;
  proCallSection?: {
    title?: string;
    text: string;
  };
  finalCta?: {
    title: string;
    description: string;
    interventionType: string;
    problemContext: string;
  };
}

// Enhanced content for specific articles
const ARTICLE_ENHANCEMENTS: Record<string, ArticleEnhancement> = {
  'come-sturare-lavandino-intasato': {
    slug: 'come-sturare-lavandino-intasato',
    intro: 'Il lavandino si intasa per accumulo di capelli, residui di sapone, grasso e detriti alimentari. Prima di chiamare un idraulico, puoi provare alcuni metodi fai da te efficaci che risolvono la maggior parte dei problemi.',
    summary: {
      icon: '🪠',
      title: 'Lavandino intasato? Prova questi 5 metodi prima di chiamare un idraulico',
      items: [
        { icon: '🔥', label: 'Acqua bollente' },
        { icon: '🧪', label: 'Bicarbonato e aceto' },
        { icon: '🪠', label: 'Ventosa' },
        { icon: '🔧', label: 'Pulizia del sifone' },
        { icon: '🌀', label: 'Sonda flessibile' },
      ]
    },
    methods: [
      {
        icon: '🔥',
        title: 'Acqua bollente',
        description: 'Il metodo più semplice: l\'acqua calda scioglie i grassi e può liberare le ostruzioni leggere in pochi minuti.',
        steps: [
          'Porta a ebollizione 1-2 litri d\'acqua',
          'Versala lentamente nello scarico',
          'Attendi qualche minuto e ripeti se necessario'
        ]
      },
      {
        icon: '🧪',
        title: 'Bicarbonato e aceto',
        description: 'Questo metodo naturale crea una reazione effervescente che può sciogliere anche le ostruzioni più ostinate.',
        steps: [
          'Versa mezza tazza di bicarbonato nello scarico',
          'Aggiungi mezza tazza di aceto bianco',
          'Copri lo scarico e attendi 15-30 minuti',
          'Risciacqua con acqua bollente'
        ]
      },
      {
        icon: '🪠',
        title: 'La ventosa',
        description: 'La classica ventosa è efficace per ostruzioni più resistenti che non si sciolgono con i metodi chimici.',
        steps: [
          'Riempi il lavandino con qualche centimetro d\'acqua',
          'Posiziona la ventosa sullo scarico creando una buona tenuta',
          'Pompa energicamente per 20-30 secondi',
          'Ripeti se necessario fino a liberare lo scarico'
        ]
      },
      {
        icon: '🔧',
        title: 'Pulizia del sifone',
        description: 'Se i metodi precedenti non funzionano, potrebbe essere necessario smontare e pulire il sifone manualmente.',
        steps: [
          'Posiziona una bacinella sotto il sifone',
          'Svita il sifone (di solito a mano)',
          'Pulisci l\'interno con uno spazzolino',
          'Rimonta e verifica che non ci siano perdite'
        ]
      },
      {
        icon: '🌀',
        title: 'Sonda flessibile',
        description: 'Per ostruzioni profonde che si trovano oltre il sifone, una sonda flessibile può raggiungere dove gli altri metodi non arrivano.',
        steps: [
          'Inserisci la sonda nello scarico oltre il sifone',
          'Ruota mentre spingi per agganciare l\'ostruzione',
          'Estrai lentamente portando via i detriti',
          'Sciacqua con acqua calda al termine'
        ]
      }
    ],
    warnings: [
      {
        title: 'Non usare prodotti chimici aggressivi',
        text: 'I disgorganti chimici possono danneggiare le tubature nel tempo e sono pericolosi per la salute. Preferisci sempre i metodi naturali descritti sopra.'
      },
      {
        title: 'Attenzione con l\'acqua bollente',
        text: 'Non usare acqua bollente se hai tubature in PVC molto vecchie o fragili, potrebbero danneggiarsi. In quel caso, usa acqua molto calda ma non bollente.'
      }
    ],
    proCallSection: {
      title: 'Quando è il momento di chiamare un professionista',
      text: 'Se nessun metodo funziona, l\'ostruzione potrebbe essere più profonda o seria. Un idraulico professionista dispone di strumenti come l\'idrogetto e la videoispezione per risolvere anche i problemi più complessi senza danneggiare le tubature.'
    },
    finalCta: {
      title: 'Non si è ancora sturato?',
      description: 'Il problema potrebbe essere più profondo di quanto pensi. Trova subito un idraulico qualificato vicino a te per un intervento rapido e risolutivo.',
      interventionType: 'sturare_spurgo',
      problemContext: 'Lavandino intasato - metodi fai da te non hanno funzionato'
    }
  }
};

interface EnhancedArticleContentProps {
  slug: string;
  originalContent: string;
}

export function EnhancedArticleContent({ slug, originalContent }: EnhancedArticleContentProps) {
  const enhancement = ARTICLE_ENHANCEMENTS[slug];
  
  // If no enhancement exists, render original content with improved styling
  if (!enhancement) {
    return (
      <article 
        className="prose prose-lg max-w-none prose-headings:text-foreground prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:marker:text-primary prose-li:my-1 prose-h2:mt-10 prose-h2:mb-4 prose-h3:mt-8 prose-h3:mb-3"
        dangerouslySetInnerHTML={{ __html: originalContent }}
      />
    );
  }
  
  // Render enhanced visual content
  return (
    <div className="space-y-8">
      {/* Intro */}
      <ArticleIntro>
        <p>{enhancement.intro}</p>
      </ArticleIntro>
      
      {/* Summary Box */}
      {enhancement.summary && (
        <SummaryBox
          icon={enhancement.summary.icon}
          title={enhancement.summary.title}
          items={enhancement.summary.items}
        />
      )}
      
      {/* Methods as Cards */}
      {enhancement.methods && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">I 5 metodi per sturare il lavandino</h2>
          <div className="grid gap-6">
            {enhancement.methods.map((method, index) => (
              <MethodCard
                key={index}
                icon={method.icon}
                number={index + 1}
                title={method.title}
                description={method.description}
                steps={method.steps}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Warnings */}
      {enhancement.warnings && enhancement.warnings.map((warning, index) => (
        <WarningBox key={index} title={warning.title}>
          {warning.text}
        </WarningBox>
      ))}
      
      {/* Pro Call Section */}
      {enhancement.proCallSection && (
        <ProCallBox title={enhancement.proCallSection.title}>
          <p>{enhancement.proCallSection.text}</p>
        </ProCallBox>
      )}
      
      {/* Final CTA */}
      {enhancement.finalCta && (
        <FinalCTABox
          title={enhancement.finalCta.title}
          description={enhancement.finalCta.description}
          interventionType={enhancement.finalCta.interventionType}
          problemContext={enhancement.finalCta.problemContext}
        />
      )}
    </div>
  );
}

// Export the enhancement check function
export function hasEnhancement(slug: string): boolean {
  return slug in ARTICLE_ENHANCEMENTS;
}
