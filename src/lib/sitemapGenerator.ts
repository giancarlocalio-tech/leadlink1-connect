/**
 * Automated sitemap generator for SEO optimization
 * Generates correct URLs for all landing pages
 * URL Format: /{city-slug} for cities, /{city-slug}-{service-slug} for city+service
 */

import { CITIES, SERVICES, KEYWORD_PAGES, CityData, ServiceData, KeywordPageData } from './seoData';

const BASE_URL = 'https://www.idraulicisubito.com';
const TODAY = new Date().toISOString().split('T')[0];

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
}

/**
 * Generate XML for a single URL entry
 */
function generateUrlXml(url: SitemapUrl): string {
  return `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
}

/**
 * Generate complete sitemap XML
 */
function generateSitemapXml(urls: SitemapUrl[]): string {
  const urlsXml = urls.map(generateUrlXml).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;
}

/**
 * Generate static pages sitemap
 */
export function generateStaticSitemap(): string {
  const staticUrls: SitemapUrl[] = [
    { loc: `${BASE_URL}/`, lastmod: TODAY, changefreq: 'daily', priority: 1.0 },
    { loc: `${BASE_URL}/per-idraulici`, lastmod: TODAY, changefreq: 'weekly', priority: 0.9 },
    { loc: `${BASE_URL}/blog`, lastmod: TODAY, changefreq: 'weekly', priority: 0.7 },
    { loc: `${BASE_URL}/privacy`, lastmod: TODAY, changefreq: 'yearly', priority: 0.3 },
    { loc: `${BASE_URL}/termini`, lastmod: TODAY, changefreq: 'yearly', priority: 0.3 },
  ];
  return generateSitemapXml(staticUrls);
}

/**
 * Generate keyword pages sitemap
 */
export function generateKeywordsSitemap(): string {
  const keywordUrls: SitemapUrl[] = KEYWORD_PAGES.map(page => ({
    loc: `${BASE_URL}/${page.slug}`,
    lastmod: TODAY,
    changefreq: 'weekly' as const,
    priority: 0.8,
  }));
  return generateSitemapXml(keywordUrls);
}

/**
 * Generate cities sitemap - Format: /{city-slug}
 */
export function generateCitiesSitemap(): string {
  const cityUrls: SitemapUrl[] = CITIES.map((city, index) => ({
    loc: `${BASE_URL}/${city.slug}`,
    lastmod: TODAY,
    changefreq: 'weekly' as const,
    // Higher priority for major cities (first 20)
    priority: index < 20 ? 0.9 : 0.8,
  }));
  return generateSitemapXml(cityUrls);
}

/**
 * Generate services sitemap
 */
export function generateServicesSitemap(): string {
  const serviceUrls: SitemapUrl[] = SERVICES.map(service => ({
    loc: `${BASE_URL}/${service.slug}`,
    lastmod: TODAY,
    changefreq: 'weekly' as const,
    priority: 0.8,
  }));
  return generateSitemapXml(serviceUrls);
}

/**
 * Generate city+service combinations sitemap (paginated)
 * CORRECT FORMAT: /{city-slug}-{service-slug}
 * Returns an array of sitemaps, each with max 500 URLs
 */
export function generateCityServiceSitemaps(pageSize: number = 500): string[] {
  const allCombinations: SitemapUrl[] = [];
  
  for (const city of CITIES) {
    for (const service of SERVICES) {
      allCombinations.push({
        // CORRECT FORMAT: /{city}-{service}
        loc: `${BASE_URL}/${city.slug}-${service.slug}`,
        lastmod: TODAY,
        changefreq: 'weekly',
        priority: 0.7,
      });
    }
  }
  
  // Split into pages
  const sitemaps: string[] = [];
  for (let i = 0; i < allCombinations.length; i += pageSize) {
    const pageUrls = allCombinations.slice(i, i + pageSize);
    sitemaps.push(generateSitemapXml(pageUrls));
  }
  
  return sitemaps;
}

/**
 * Generate sitemap index
 */
export function generateSitemapIndex(cityServiceSitemapCount: number): string {
  const sitemaps = [
    'sitemap-static.xml',
    'sitemap-keywords.xml',
    'sitemap-cities.xml',
  ];
  
  // Add city-service sitemaps
  for (let i = 1; i <= cityServiceSitemapCount; i++) {
    sitemaps.push(`sitemap-city-services-${i}.xml`);
  }
  
  const sitemapEntries = sitemaps.map(sitemap => `  <sitemap>
    <loc>${BASE_URL}/${sitemap}</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>`).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;
}

/**
 * Get all URLs for export/GSC submission
 * CORRECT FORMAT: /{city}, /{city}-{service}
 */
export function getAllIndexableUrls(): {
  static: string[];
  keywords: string[];
  cities: string[];
  cityServices: string[];
  total: number;
} {
  const staticUrls = [
    `${BASE_URL}/`,
    `${BASE_URL}/per-idraulici`,
    `${BASE_URL}/blog`,
    `${BASE_URL}/privacy`,
    `${BASE_URL}/termini`,
  ];
  
  const keywordUrls = KEYWORD_PAGES.map(page => `${BASE_URL}/${page.slug}`);
  const cityUrls = CITIES.map(city => `${BASE_URL}/${city.slug}`);
  
  const cityServiceUrls: string[] = [];
  for (const city of CITIES) {
    for (const service of SERVICES) {
      // CORRECT FORMAT: /{city}-{service}
      cityServiceUrls.push(`${BASE_URL}/${city.slug}-${service.slug}`);
    }
  }
  
  return {
    static: staticUrls,
    keywords: keywordUrls,
    cities: cityUrls,
    cityServices: cityServiceUrls,
    total: staticUrls.length + keywordUrls.length + cityUrls.length + cityServiceUrls.length,
  };
}

/**
 * Get SEO statistics
 */
export function getSitemapStats() {
  const cityServiceCount = CITIES.length * SERVICES.length;
  const sitemapPageCount = Math.ceil(cityServiceCount / 500);
  
  return {
    totalCities: CITIES.length,
    totalServices: SERVICES.length,
    totalKeywordPages: KEYWORD_PAGES.length,
    totalCityServicePages: cityServiceCount,
    totalSitemapFiles: 3 + sitemapPageCount, // static, keywords, cities + city-service pages
    totalIndexablePages: 5 + KEYWORD_PAGES.length + CITIES.length + cityServiceCount,
  };
}

/**
 * Generate all sitemaps as downloadable files
 */
export function generateAllSitemaps(): { filename: string; content: string }[] {
  const files: { filename: string; content: string }[] = [];
  
  // Static sitemap
  files.push({ filename: 'sitemap-static.xml', content: generateStaticSitemap() });
  
  // Keywords sitemap
  files.push({ filename: 'sitemap-keywords.xml', content: generateKeywordsSitemap() });
  
  // Cities sitemap
  files.push({ filename: 'sitemap-cities.xml', content: generateCitiesSitemap() });
  
  // City+Service sitemaps
  const cityServiceSitemaps = generateCityServiceSitemaps();
  cityServiceSitemaps.forEach((content, index) => {
    files.push({ filename: `sitemap-city-services-${index + 1}.xml`, content });
  });
  
  // Sitemap index
  files.push({ 
    filename: 'sitemap.xml', 
    content: generateSitemapIndex(cityServiceSitemaps.length) 
  });
  
  return files;
}
