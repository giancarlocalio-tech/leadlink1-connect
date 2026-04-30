/**
 * Canonical Hierarchy — Anti-cannibalization strategy for top cities.
 *
 * STRATEGIA (no redirect, Google-friendly):
 *  - Per ogni città master (Napoli, Milano, Roma, Torino) definiamo UNA pagina
 *    "vincitrice" che riceve canonical e link interni con anchor "idraulico {città}".
 *  - Le pagine generiche /idraulico-{città} puntano canonical alla master.
 *  - Le varianti city+service /{città}-pronto-intervento puntano canonical
 *    alla pagina problem-city dedicata (intent emergenza).
 *  - I quartieri (es. /idraulico-napoli-vomero) restano self-canonical ma
 *    differenziano l'H1 ("Idraulico Vomero (Napoli)") per non competere
 *    sulla query principale "idraulico napoli".
 *
 * Le pagine secondarie restano indicizzabili (no noindex) ma:
 *   - hanno canonical → master
 *   - hanno H1 differenziato (vedi getDifferentiatedH1)
 *   - sono in sitemap a priority più bassa (vedi sitemapGenerator)
 */

export const MASTER_CITIES = ['napoli', 'milano', 'roma', 'torino'] as const;
export type MasterCitySlug = typeof MASTER_CITIES[number];

const BASE = 'https://www.idraulicisubito.com';

const CITY_DISPLAY: Record<MasterCitySlug, string> = {
  napoli: 'Napoli',
  milano: 'Milano',
  roma: 'Roma',
  torino: 'Torino',
};

export function isMasterCity(slug: string): slug is MasterCitySlug {
  return (MASTER_CITIES as readonly string[]).includes(slug);
}

/**
 * Returns the master URL for a city, or null if the city is not a master.
 */
export function getMasterUrl(citySlug: string): string | null {
  return isMasterCity(citySlug) ? `${BASE}/${citySlug}` : null;
}

/**
 * Returns the master URL for the "emergency / pronto intervento" intent
 * for a given city (Problem-City page). Used by city+service pages
 * with service "pronto-intervento" to consolidate signals.
 */
export function getEmergencyMasterUrl(citySlug: string): string | null {
  if (!isMasterCity(citySlug)) return null;
  return `${BASE}/pronto-intervento-idraulico-${citySlug}`;
}

/**
 * Decide canonical for a generic keyword landing page like
 *   /idraulico-napoli, /idraulico-milano, /idraulico-roma, /idraulico-torino
 * Returns the master canonical when the slug matches a master city,
 * otherwise returns the self-canonical fallback.
 */
export function getKeywordPageCanonical(slug: string, fallbackSelfUrl: string): string {
  // Match patterns: "idraulico-{city}" exactly
  const match = slug.match(/^idraulico-([a-z-]+)$/);
  if (match) {
    const city = match[1];
    if (isMasterCity(city)) return `${BASE}/${city}`;
  }
  return fallbackSelfUrl;
}

/**
 * Decide canonical for a city+service dynamic landing page.
 * - If service is "pronto-intervento" and city is a master → canonical to ProblemCity master.
 * - Otherwise self-canonical (the page differentiates by service, no overlap with master).
 */
export function getCityServiceCanonical(
  citySlug: string,
  serviceSlug: string,
  fallbackSelfUrl: string,
): string {
  if (serviceSlug === 'pronto-intervento' && isMasterCity(citySlug)) {
    return getEmergencyMasterUrl(citySlug)!;
  }
  return fallbackSelfUrl;
}

/**
 * H1 differentiator for secondary pages, so they don't fight the master
 * on the exact same query "idraulico {città}".
 */
export function getDifferentiatedH1(
  pageType: 'keyword-city' | 'city-service' | 'neighborhood' | 'problem-city',
  params: { citySlug?: string; serviceLabel?: string; neighborhoodName?: string; problemName?: string },
): string | null {
  const cityName = params.citySlug && isMasterCity(params.citySlug) ? CITY_DISPLAY[params.citySlug] : null;
  switch (pageType) {
    case 'keyword-city':
      return cityName ? `Trova un Idraulico a ${cityName} oggi` : null;
    case 'city-service':
      if (cityName && params.serviceLabel) {
        return `${params.serviceLabel} a ${cityName}`;
      }
      return null;
    case 'neighborhood':
      if (cityName && params.neighborhoodName) {
        return `Idraulico ${params.neighborhoodName} (${cityName})`;
      }
      return null;
    case 'problem-city':
      if (cityName && params.problemName) {
        return `${params.problemName} a ${cityName} 24h`;
      }
      return null;
    default:
      return null;
  }
}

/**
 * Returns the anchor text to use when linking back to the master from
 * any secondary page. Always uses the canonical money keyword.
 */
export function getMasterAnchor(citySlug: string): string | null {
  if (!isMasterCity(citySlug)) return null;
  return `Idraulico ${CITY_DISPLAY[citySlug]}`;
}

/**
 * For sitemap: pages that should be downranked (priority + changefreq)
 * because they are secondary to a master.
 */
export function isSecondaryToMaster(slug: string): boolean {
  // /idraulico-{master-city}
  const m = slug.match(/^idraulico-([a-z-]+)$/);
  if (m && isMasterCity(m[1])) return true;
  // /{master-city}-pronto-intervento (the master is the problem-city page)
  for (const c of MASTER_CITIES) {
    if (slug === `${c}-pronto-intervento`) return true;
  }
  return false;
}
