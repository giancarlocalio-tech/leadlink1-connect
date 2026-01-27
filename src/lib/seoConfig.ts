/**
 * SEO Configuration - Consolidated Indexing Strategy
 * 
 * This file defines which pages should be indexed vs noindexed
 * to reduce duplicate content and strengthen core pages.
 * 
 * Target: ~350 indexable pages instead of 3300+
 */

// ============================================
// TOP 50 CITIES BY POPULATION (INDEXABLE)
// ============================================
export const TOP_50_CITIES = [
  'roma',
  'milano',
  'napoli',
  'torino',
  'palermo',
  'genova',
  'bologna',
  'firenze',
  'bari',
  'catania',
  'venezia',
  'verona',
  'messina',
  'padova',
  'trieste',
  'taranto',
  'brescia',
  'parma',
  'prato',
  'modena',
  'reggio-calabria',
  'reggio-emilia',
  'perugia',
  'ravenna',
  'livorno',
  'cagliari',
  'foggia',
  'rimini',
  'salerno',
  'ferrara',
  'sassari',
  'latina',
  'giugliano',
  'monza',
  'siracusa',
  'pescara',
  'bergamo',
  'forlì',
  'trento',
  'vicenza',
  'terni',
  'bolzano',
  'novara',
  'piacenza',
  'ancona',
  'andria',
  'arezzo',
  'udine',
  'cesena',
  'lecce'
] as const;

// ============================================
// 5 CORE SERVICES (INDEXABLE)
// ============================================
export const CORE_SERVICES = [
  'pronto-intervento',      // Emergency plumbing
  'manutenzione-caldaie',   // Boiler maintenance
  'spurgo-scarichi',        // Drain cleaning
  'riparazione-perdite',    // Leak repair
  'installazione-sanitari'  // Sanitary installation
] as const;

// ============================================
// CORE KEYWORD PAGES (MAX 20 INDEXABLE)
// ============================================
export const CORE_KEYWORD_PAGES = [
  'pronto-intervento-idraulico',
  'idraulico-vicino-a-me',
  'idraulico-24-ore',
  'perdita-acqua',
  'scarico-intasato',
  'riparazione-caldaia',
  'manutenzione-caldaia',
  'sostituzione-caldaia',
  'spurgo-fogne',
  'tubazioni-intasate',
  'rubinetto-che-perde',
  'wc-intasato',
  'perdita-tubo',
  'allagamento',
  'impianto-idraulico',
  'installazione-sanitari',
  'sostituzione-rubinetto',
  'riparazione-termosifone',
  'addolcitore-acqua',
  'depuratore-acqua'
] as const;

// ============================================
// TYPE DEFINITIONS
// ============================================
export type Top50City = typeof TOP_50_CITIES[number];
export type CoreService = typeof CORE_SERVICES[number];
export type CoreKeywordPage = typeof CORE_KEYWORD_PAGES[number];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if a city slug is in the Top 50
 */
export function isTop50City(citySlug: string): boolean {
  return TOP_50_CITIES.includes(citySlug as Top50City);
}

/**
 * Check if a service slug is a core service
 */
export function isCoreService(serviceSlug: string): boolean {
  return CORE_SERVICES.includes(serviceSlug as CoreService);
}

/**
 * Check if a keyword page is a core keyword
 */
export function isCoreKeywordPage(slug: string): boolean {
  return CORE_KEYWORD_PAGES.includes(slug as CoreKeywordPage);
}

/**
 * Determine if a page should be indexed
 * Returns: { shouldIndex: boolean, canonicalUrl?: string }
 */
export function getIndexingDecision(
  citySlug?: string,
  serviceSlug?: string,
  keywordSlug?: string
): { shouldIndex: boolean; canonicalUrl?: string } {
  const BASE_URL = 'https://www.idraulicisubito.com';
  
  // Keyword page logic
  if (keywordSlug) {
    if (isCoreKeywordPage(keywordSlug)) {
      return { shouldIndex: true };
    }
    // Noindex non-core keyword pages, canonical to closest core keyword
    return { 
      shouldIndex: false,
      canonicalUrl: `${BASE_URL}/pronto-intervento-idraulico`
    };
  }
  
  // City + Service page logic
  if (citySlug && serviceSlug) {
    const isTopCity = isTop50City(citySlug);
    const isCoreServ = isCoreService(serviceSlug);
    
    if (isTopCity && isCoreServ) {
      return { shouldIndex: true };
    }
    
    // Noindex, canonical to city-only page
    return {
      shouldIndex: false,
      canonicalUrl: `${BASE_URL}/${citySlug}`
    };
  }
  
  // City-only page logic
  if (citySlug) {
    if (isTop50City(citySlug)) {
      return { shouldIndex: true };
    }
    // Noindex non-top50 cities, canonical to homepage
    return {
      shouldIndex: false,
      canonicalUrl: `${BASE_URL}/`
    };
  }
  
  // Default: homepage is always indexed
  return { shouldIndex: true };
}

/**
 * Get indexable page counts for sitemap generation
 */
export function getIndexablePageCounts() {
  return {
    homepage: 1,
    keywordPages: CORE_KEYWORD_PAGES.length,
    cityPages: TOP_50_CITIES.length,
    cityServicePages: TOP_50_CITIES.length * CORE_SERVICES.length,
    total: 1 + CORE_KEYWORD_PAGES.length + TOP_50_CITIES.length + (TOP_50_CITIES.length * CORE_SERVICES.length)
  };
}
