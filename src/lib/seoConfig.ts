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
  'lecce',
  'siena'
] as const;

// ============================================
// 5 CORE SERVICES (INDEXABLE)
// ============================================
export const CORE_SERVICES = [
  'pronto-intervento',      // Emergency plumbing
  'manutenzione-caldaie',   // Boiler maintenance
  'sostituzione-caldaia',   // Boiler replacement
  'perdita-acqua',          // Leak repair (canonical slug in serviceContent.ts)
  'scarico-intasato',       // Drain unclog (canonical slug in serviceContent.ts)
  'ricerca-perdite',        // Leak detection
  'disostruzione-fogne'     // Sewer cleaning
] as const;

// ============================================
// CORE KEYWORD PAGES (MAX 30 INDEXABLE)
// ✅ Added new high-volume keywords from GSC
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
  'depuratore-acqua',
  // ✅ NEW KEYWORDS FROM GSC (high volume, 0 CTR)
  'sos-idraulico-in-zona',          // 546 impressioni
  'urgente-idraulico',              // 243 impressioni
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
 * Returns: { shouldIndex: boolean, canonicalUrl: string }
 * 
 * IMPORTANT: noindex pages use SELF-CANONICAL to avoid
 * soft-404/doorway signals. Only strict duplicates would
 * use canonical to another page.
 */
export function getIndexingDecision(
  citySlug?: string,
  serviceSlug?: string,
  keywordSlug?: string
): { shouldIndex: boolean; canonicalUrl: string } {
  const BASE_URL = 'https://www.idraulicisubito.com';
  
  // Build the self-canonical URL based on parameters
  const buildSelfCanonical = (): string => {
    if (keywordSlug) {
      return `${BASE_URL}/${keywordSlug}`;
    }
    if (citySlug && serviceSlug) {
      return `${BASE_URL}/${citySlug}-${serviceSlug}`;
    }
    if (citySlug) {
      return `${BASE_URL}/${citySlug}`;
    }
    return `${BASE_URL}/`;
  };
  
  // Keyword page logic
  if (keywordSlug) {
    return { 
      shouldIndex: isCoreKeywordPage(keywordSlug),
      canonicalUrl: buildSelfCanonical()
    };
  }
  
  // City + Service page logic
  if (citySlug && serviceSlug) {
    const isTopCity = isTop50City(citySlug);
    const isCoreServ = isCoreService(serviceSlug);
    
    return {
      shouldIndex: isTopCity && isCoreServ,
      canonicalUrl: buildSelfCanonical()
    };
  }
  
  // City-only page logic
  if (citySlug) {
    return {
      shouldIndex: isTop50City(citySlug),
      canonicalUrl: buildSelfCanonical()
    };
  }
  
  // Default: homepage
  return { 
    shouldIndex: true,
    canonicalUrl: `${BASE_URL}/`
  };
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
