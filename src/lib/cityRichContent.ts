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
 * Minimum 150 words per intro for better content depth
 */
export function getCityIntroText(cityData: CityData): string {
  const { name, province, region, population, neighborhoods } = cityData;
  const idx = getConsistentIndex(cityData.slug, 4);
  
  // Extended templates with housing types and province references (150+ words each)
  const templates = [
    `Con una popolazione di ${population} abitanti, ${name} (${province}) è una delle città più importanti della regione ${region}. Il tessuto urbano si caratterizza per una varietà di tipologie abitative: dal centro storico con edifici d'epoca ai moderni condomini residenziali delle zone periferiche, fino alle villette unifamiliari delle aree suburbane. Questa diversità architettonica comporta esigenze idrauliche specifiche che i nostri professionisti conoscono perfettamente. Dalle tubature in piombo degli edifici storici agli impianti moderni in multistrato, interveniamo con competenza su ogni tipologia di impianto. La nostra rete di idraulici opera in tutta la provincia di ${province}, garantendo interventi rapidi anche nei comuni limitrofi. Per emergenze come perdite d'acqua, scarichi intasati o guasti alla caldaia, offriamo pronto intervento 24 ore su 24, 7 giorni su 7.`,
    
    `${name}, situata nel cuore della provincia di ${province} in ${region}, conta ${population} residenti distribuiti tra il nucleo urbano principale e le frazioni circostanti. La città presenta un patrimonio edilizio eterogeneo: palazzi storici nel centro, quartieri residenziali degli anni '60-'80 con condomini di media altezza, e nuove costruzioni nelle zone di espansione. Ogni tipologia edilizia richiede competenze specifiche in ambito idraulico. I nostri professionisti sono specializzati nella gestione di impianti di diverse epoche e materiali, dalle vecchie tubature in ferro zincato ai moderni sistemi in polietilene. Operiamo in tutti i quartieri di ${name}, inclusi ${neighborhoods.slice(0, 3).join(', ')}, garantendo tempi di risposta rapidi e preventivi trasparenti. La vicinanza con altri centri della provincia di ${province} ci permette di offrire assistenza capillare su tutto il territorio.`,
    
    `Nella provincia di ${province}, ${name} rappresenta un importante polo urbano con i suoi ${population} abitanti. La struttura urbanistica della città riflette decenni di sviluppo: il centro storico conserva edifici con impianti idraulici che richiedono manutenzione specializzata, mentre le zone residenziali più recenti presentano tecnologie impiantistiche moderne. I nostri idraulici qualificati intervengono quotidianamente su problematiche diverse: dalle riparazioni urgenti di perdite d'acqua alla manutenzione ordinaria di caldaie e scaldabagni, dalla sostituzione di sanitari alla ristrutturazione completa di bagni e cucine. Conosciamo le specificità degli impianti della zona ${region} e siamo attrezzati per gestire ogni tipo di intervento. La nostra presenza capillare garantisce assistenza rapida non solo a ${name}, ma anche nelle zone limitrofe come ${neighborhoods.slice(0, 2).join(' e ')}.`,
    
    `${name} (${province}) è un centro urbano dinamico con ${population} abitanti, caratterizzato da un mix di edifici storici e costruzioni moderne. L'area metropolitana comprende sia il centro città, dove gli edifici d'epoca richiedono interventi di manutenzione specializzati sugli impianti datati, sia le periferie con complessi condominiali e abitazioni unifamiliari di più recente costruzione. I professionisti della nostra rete conoscono le peculiarità idrauliche del territorio ${region}: dalla durezza dell'acqua locale che influisce sulla formazione di calcare, alle caratteristiche delle reti fognarie comunali. Offriamo servizi completi che spaziano dal pronto intervento per emergenze alla programmazione di lavori di ristrutturazione impiantistica. I nostri idraulici raggiungono tutti i quartieri di ${name} e i comuni della provincia di ${province}, garantendo professionalità e puntualità.`
  ];
  
  return templates[idx];
}

/**
 * Get estimated word count for city page content
 * Used to verify minimum 500 words target
 */
export function getEstimatedWordCount(cityData: CityData): number {
  const richContent = getCityRichContent(cityData);
  const introText = getCityIntroText(cityData);
  
  let wordCount = 0;
  
  // Count intro text
  wordCount += introText.split(/\s+/).length;
  
  // Count problems section
  wordCount += richContent.problemsSection.content.split(/\s+/).length;
  richContent.problemsSection.problems.forEach(p => {
    wordCount += p.split(/\s+/).length;
  });
  
  // Count neighborhoods section
  wordCount += richContent.neighborhoodsSection.content.split(/\s+/).length;
  
  // Count response time section
  wordCount += richContent.responseTimeSection.content.split(/\s+/).length;
  
  // Count pricing section
  wordCount += richContent.pricingSection.content.split(/\s+/).length;
  
  return wordCount;
}
