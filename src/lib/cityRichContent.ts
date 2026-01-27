/**
 * City-Specific Rich Content Generator
 * 
 * Generates unique, city-specific content to avoid thin content issues
 * and differentiate pages for SEO purposes.
 */

import { CityData } from './seoData';

// ============================================
// CONTENT TEMPLATES WITH VARIATIONS
// ============================================

// Common plumbing problems - multiple variations per city
const PROBLEM_TEMPLATES = [
  {
    variations: [
      (city: string) => `A ${city}, le tubazioni degli edifici storici spesso presentano problemi di corrosione e perdite. Il calcare dell'acqua locale accelera il deterioramento degli impianti più datati.`,
      (city: string) => `Gli impianti idraulici di ${city} soffrono frequentemente di ostruzioni causate da calcare e sedimenti. Le vecchie tubature in ferro zincato sono particolarmente vulnerabili.`,
      (city: string) => `Nella zona di ${city}, riscontriamo spesso problemi di pressione dell'acqua insufficiente, specialmente nei piani alti degli edifici residenziali.`,
    ]
  },
  {
    variations: [
      (city: string) => `Le caldaie a ${city} richiedono manutenzione regolare, soprattutto durante i mesi invernali quando il riscaldamento è in funzione continuativa.`,
      (city: string) => `A ${city}, le emergenze caldaie aumentano del 40% nei mesi freddi. La manutenzione preventiva è fondamentale per evitare guasti improvvisi.`,
      (city: string) => `Gli impianti di riscaldamento a ${city} sono spesso sovraccaricati durante l'inverno, causando malfunzionamenti e blocchi improvvisi.`,
    ]
  },
  {
    variations: [
      (city: string) => `Gli scarichi intasati sono tra i problemi più comuni a ${city}, spesso causati da residui di grasso e sapone nelle cucine.`,
      (city: string) => `A ${city}, interveniamo frequentemente per ostruzioni degli scarichi, in particolare nelle zone con edifici più datati.`,
      (city: string) => `Le fognature di ${city} possono presentare problemi stagionali, specialmente dopo periodi di forti piogge che sovraccaricano il sistema.`,
    ]
  }
];

// Response time variations based on city size
const RESPONSE_TIME_CONTENT = {
  large: [
    (city: string) => `A ${city}, grazie alla nostra rete di oltre 50 professionisti, garantiamo tempi di risposta medi di 15-20 minuti per le emergenze urgenti.`,
    (city: string) => `La nostra copertura capillare a ${city} ci permette di intervenire rapidamente in tutti i quartieri, con un tempo medio di arrivo di 25 minuti.`,
    (city: string) => `Con idraulici disponibili 24/7 in tutta ${city} e provincia, possiamo garantire interventi in meno di 30 minuti per le urgenze.`,
  ],
  medium: [
    (city: string) => `A ${city} e nei comuni limitrofi, i nostri professionisti raggiungono la tua abitazione in media entro 30-40 minuti dalla chiamata.`,
    (city: string) => `La nostra rete di idraulici copre ${city} e l'intera provincia, garantendo interventi tempestivi in 30-45 minuti.`,
    (city: string) => `Per le emergenze a ${city}, i nostri professionisti sono operativi 24 ore su 24, con arrivo medio in 35 minuti.`,
  ],
  small: [
    (city: string) => `A ${city} e nelle zone limitrofe, garantiamo interventi entro 45-60 minuti per le urgenze idrauliche.`,
    (city: string) => `I nostri professionisti servono ${city} e la provincia con interventi programmabili in giornata o entro 48 ore.`,
    (city: string) => `Per ${city} e i comuni vicini, offriamo assistenza rapida con tempi di intervento di 45 minuti per le emergenze.`,
  ]
};

// Price range content
const PRICE_CONTENT_TEMPLATES = [
  (city: string) => `I costi degli interventi idraulici a ${city} variano in base alla tipologia di lavoro. Una riparazione semplice parte da 50-80€, mentre interventi più complessi come la sostituzione di sanitari possono costare 150-400€. Chiedi sempre un preventivo dettagliato prima di iniziare i lavori.`,
  (city: string) => `A ${city}, le tariffe medie per gli interventi idraulici sono: spurgo scarichi 70-120€, riparazione perdite 60-150€, manutenzione caldaia 80-150€, installazione sanitari 200-500€. I prezzi possono variare in base all'urgenza e alla complessità del lavoro.`,
  (city: string) => `Nella zona di ${city}, i nostri professionisti applicano tariffe competitive: chiamata di emergenza 40-60€, riparazioni standard 80-180€, interventi complessi 200-600€. Il preventivo è sempre gratuito e senza impegno.`,
];

// Neighborhoods coverage content
const NEIGHBORHOOD_TEMPLATES = [
  (city: string, neighborhoods: string[]) => `Operiamo in tutti i quartieri di ${city}, inclusi ${neighborhoods.slice(0, 5).join(', ')} e molte altre zone. Ogni quartiere ha le sue caratteristiche edilizie specifiche che i nostri professionisti conoscono bene.`,
  (city: string, neighborhoods: string[]) => `La nostra rete di idraulici copre capillarmente ${city}: da ${neighborhoods[0]} a ${neighborhoods[Math.min(3, neighborhoods.length-1)]}, passando per ${neighborhoods.slice(1, 4).join(', ')}. Interveniamo rapidamente ovunque tu sia.`,
  (city: string, neighborhoods: string[]) => `Serviamo tutte le zone di ${city} con la stessa efficienza: ${neighborhoods.slice(0, 4).join(', ')} e tutte le altre aree residenziali e commerciali della città.`,
];

// ============================================
// CONTENT GENERATOR FUNCTIONS
// ============================================

function getCitySize(population: string): 'large' | 'medium' | 'small' {
  const pop = parseInt(population.replace(/\./g, ''));
  if (pop >= 500000) return 'large';
  if (pop >= 100000) return 'medium';
  return 'small';
}

function getConsistentIndex(seed: string, arrayLength: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash) % arrayLength;
}

export interface CityRichContent {
  problemsSection: {
    title: string;
    content: string;
    problems: string[];
  };
  neighborhoodsSection: {
    title: string;
    content: string;
    list: string[];
  };
  responseTimeSection: {
    title: string;
    content: string;
    avgTime: string;
  };
  pricingSection: {
    title: string;
    content: string;
  };
}

/**
 * Generate rich, unique content for a city page
 */
export function getCityRichContent(cityData: CityData): CityRichContent {
  const { slug, name, population, neighborhoods } = cityData;
  const citySize = getCitySize(population);
  
  // Use city slug as seed for consistent but varied content
  const problemIdx = getConsistentIndex(slug + 'problems', PROBLEM_TEMPLATES[0].variations.length);
  const responseIdx = getConsistentIndex(slug + 'response', RESPONSE_TIME_CONTENT[citySize].length);
  const priceIdx = getConsistentIndex(slug + 'price', PRICE_CONTENT_TEMPLATES.length);
  const neighborhoodIdx = getConsistentIndex(slug + 'neighborhood', NEIGHBORHOOD_TEMPLATES.length);
  
  // Generate problem descriptions (take from different template groups for variety)
  const problems = PROBLEM_TEMPLATES.map((template, i) => {
    const variationIdx = getConsistentIndex(slug + `problem${i}`, template.variations.length);
    return template.variations[variationIdx](name);
  });
  
  // Response time based on city size
  const responseContent = RESPONSE_TIME_CONTENT[citySize][responseIdx](name);
  const avgTime = citySize === 'large' ? '15-25 min' : citySize === 'medium' ? '30-40 min' : '45-60 min';
  
  return {
    problemsSection: {
      title: `Problemi Idraulici Più Comuni a ${name}`,
      content: `Conosciamo bene le sfide idrauliche specifiche di ${name}. I nostri professionisti intervengono quotidianamente per risolvere questi problemi comuni nella tua zona.`,
      problems
    },
    neighborhoodsSection: {
      title: `Quartieri Serviti a ${name}`,
      content: NEIGHBORHOOD_TEMPLATES[neighborhoodIdx](name, neighborhoods),
      list: neighborhoods
    },
    responseTimeSection: {
      title: `Tempi di Intervento a ${name}`,
      content: responseContent,
      avgTime
    },
    pricingSection: {
      title: `Costi Medi Intervento Idraulico a ${name}`,
      content: PRICE_CONTENT_TEMPLATES[priceIdx](name)
    }
  };
}

/**
 * Generate additional SEO-friendly text with variation
 */
export function getCityIntroText(cityData: CityData): string {
  const { name, province, region, population } = cityData;
  const idx = getConsistentIndex(cityData.slug, 3);
  
  const templates = [
    `Con una popolazione di ${population} abitanti, ${name} (${province}) è una delle città più importanti del ${region}. I nostri idraulici professionisti conoscono perfettamente le caratteristiche degli impianti idraulici locali e sono pronti a intervenire rapidamente per qualsiasi emergenza o lavoro programmato.`,
    
    `${name}, situata in ${region}, conta ${population} abitanti e presenta una varietà di edifici con impianti idraulici di diverse epoche. La nostra rete di professionisti verificati offre assistenza completa per riparazioni, manutenzioni e nuove installazioni in tutta la provincia di ${province}.`,
    
    `Nella provincia di ${province}, ${name} rappresenta un importante centro urbano con ${population} residenti. I nostri idraulici qualificati sono specializzati negli interventi tipici degli edifici della zona ${region}, garantendo soluzioni efficaci e durature.`
  ];
  
  return templates[idx];
}
