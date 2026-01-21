import { KEYWORD_PAGES, CITIES, SERVICES } from './seoData';
import { BASE_URL } from './seoJsonLd';

/**
 * Generate all keyword landing page URLs for GSC re-indexing
 */
export function generateKeywordUrls(): string[] {
  return KEYWORD_PAGES.map(page => `${BASE_URL}/${page.slug}`);
}

/**
 * Generate all city landing page URLs
 */
export function generateCityUrls(): string[] {
  return CITIES.map(city => `${BASE_URL}/${city.slug}`);
}

/**
 * Generate all city+service combination URLs
 */
export function generateCityServiceUrls(): string[] {
  const urls: string[] = [];
  for (const city of CITIES) {
    for (const service of SERVICES) {
      urls.push(`${BASE_URL}/${city.slug}-${service.slug}`);
    }
  }
  return urls;
}

/**
 * Generate all URLs for GSC re-indexing
 */
export function generateAllUrls(): {
  keyword: string[];
  city: string[];
  cityService: string[];
  total: number;
} {
  const keyword = generateKeywordUrls();
  const city = generateCityUrls();
  const cityService = generateCityServiceUrls();
  
  return {
    keyword,
    city,
    cityService,
    total: keyword.length + city.length + cityService.length
  };
}

/**
 * Export URLs as plain text (one per line)
 */
export function exportUrlsAsText(urls: string[]): string {
  return urls.join('\n');
}

/**
 * Get stats about all URLs
 */
export function getUrlStats() {
  const all = generateAllUrls();
  return {
    keywordPages: all.keyword.length,
    cityPages: all.city.length,
    cityServicePages: all.cityService.length,
    totalPages: all.total
  };
}
