/**
 * Consolidated Sitemap Generator for SEO
 * 
 * Only includes indexable pages:
 * - Homepage
 * - 20 core keyword pages
 * - Top 50 cities
 * - Top 50 cities × 5 core services = 250 combinations
 * - Blog articles and categories
 * 
 * Total: ~350+ pages
 */

import { CITIES, KEYWORD_PAGES } from './seoData';
import { TOP_50_CITIES, CORE_SERVICES, CORE_KEYWORD_PAGES, getIndexablePageCounts } from './seoConfig';
import { NEIGHBORHOOD_PAGES } from './neighborhoodPagesData';
import { BLOG_ARTICLES, BLOG_CATEGORIES } from './blogData';

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
    { loc: `${BASE_URL}/per-idraulici`, lastmod: TODAY, changefreq: 'weekly', priority: 0.8 },
    { loc: `${BASE_URL}/blog`, lastmod: TODAY, changefreq: 'weekly', priority: 0.8 },
    { loc: `${BASE_URL}/guide`, lastmod: TODAY, changefreq: 'weekly', priority: 0.8 },
    { loc: `${BASE_URL}/privacy`, lastmod: TODAY, changefreq: 'yearly', priority: 0.3 },
    { loc: `${BASE_URL}/termini`, lastmod: TODAY, changefreq: 'yearly', priority: 0.3 },
  ];
  return generateSitemapXml(staticUrls);
}

/**
 * Generate blog sitemap (articles + categories)
 */
export function generateBlogSitemap(): string {
  const blogUrls: SitemapUrl[] = [];
  
  // Add blog categories
  BLOG_CATEGORIES.forEach(category => {
    blogUrls.push({
      loc: `${BASE_URL}/blog/categoria/${category.slug}`,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: 0.7,
    });
  });
  
  // Add all blog articles
  BLOG_ARTICLES.forEach(article => {
    blogUrls.push({
      loc: `${BASE_URL}/blog/${article.slug}`,
      lastmod: article.updatedAt || article.publishedAt,
      changefreq: 'monthly',
      priority: 0.75,
    });
  });
  
  return generateSitemapXml(blogUrls);
}

/**
 * Generate CORE keyword pages sitemap only (max 20)
 */
export function generateKeywordsSitemap(): string {
  const coreKeywords = KEYWORD_PAGES.filter(page => 
    CORE_KEYWORD_PAGES.includes(page.slug as any)
  );
  
  const keywordUrls: SitemapUrl[] = coreKeywords.map(page => ({
    loc: `${BASE_URL}/${page.slug}`,
    lastmod: TODAY,
    changefreq: 'weekly' as const,
    priority: 0.9,
  }));
  
  return generateSitemapXml(keywordUrls);
}

/**
 * Generate TOP 50 cities sitemap only
 */
export function generateCitiesSitemap(): string {
  const top50Cities = CITIES.filter(city => 
    TOP_50_CITIES.includes(city.slug as any)
  );
  
  const cityUrls: SitemapUrl[] = top50Cities.map((city, index) => ({
    loc: `${BASE_URL}/${city.slug}`,
    lastmod: TODAY,
    changefreq: 'weekly' as const,
    priority: index < 10 ? 0.95 : 0.9, // Top 10 cities get slightly higher priority
  }));
  
  return generateSitemapXml(cityUrls);
}

/**
 * Generate city+service sitemap (only Top 50 × 5 core services)
 */
export function generateCityServiceSitemaps(): string[] {
  const top50Cities = CITIES.filter(city => 
    TOP_50_CITIES.includes(city.slug as any)
  );
  
  const allCombinations: SitemapUrl[] = [];
  
  for (const city of top50Cities) {
    for (const serviceSlug of CORE_SERVICES) {
      allCombinations.push({
        loc: `${BASE_URL}/${city.slug}-${serviceSlug}`,
        lastmod: TODAY,
        changefreq: 'weekly',
        priority: 0.85,
      });
    }
  }
  
  // All fit in one sitemap (250 URLs)
  return [generateSitemapXml(allCombinations)];
}

/**
 * Generate neighborhood pages sitemap (25 URLs)
 */
export function generateNeighborhoodsSitemap(): string {
  const neighborhoodUrls: SitemapUrl[] = NEIGHBORHOOD_PAGES.map(n => ({
    loc: `${BASE_URL}/${n.citySlug}-${n.neighborhoodSlug}-idraulico`,
    lastmod: TODAY,
    changefreq: 'weekly' as const,
    priority: 0.85,
  }));
  
  return generateSitemapXml(neighborhoodUrls);
}

/**
 * Generate sitemap index
 */
export function generateSitemapIndex(cityServiceSitemapCount: number): string {
  const sitemaps = [
    'sitemap-static.xml',
    'sitemap-keywords.xml',
    'sitemap-cities.xml',
    'sitemap-neighborhoods.xml',
    'sitemap-blog.xml', // Blog articles and categories
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
 * Get all INDEXABLE URLs for export/GSC submission
 * Only includes core pages that should be indexed
 */
export function getAllIndexableUrls(): {
  static: string[];
  keywords: string[];
  cities: string[];
  cityServices: string[];
  neighborhoods: string[];
  blog: string[];
  total: number;
} {
  const staticUrls = [
    `${BASE_URL}/`,
    `${BASE_URL}/per-idraulici`,
    `${BASE_URL}/blog`,
    `${BASE_URL}/guide`,
    `${BASE_URL}/privacy`,
    `${BASE_URL}/termini`,
  ];
  
  // Only core keyword pages
  const coreKeywords = KEYWORD_PAGES.filter(page => 
    CORE_KEYWORD_PAGES.includes(page.slug as any)
  );
  const keywordUrls = coreKeywords.map(page => `${BASE_URL}/${page.slug}`);
  
  // Only top 50 cities
  const top50Cities = CITIES.filter(city => 
    TOP_50_CITIES.includes(city.slug as any)
  );
  const cityUrls = top50Cities.map(city => `${BASE_URL}/${city.slug}`);
  
  // Only top 50 × 5 core services
  const cityServiceUrls: string[] = [];
  for (const city of top50Cities) {
    for (const serviceSlug of CORE_SERVICES) {
      cityServiceUrls.push(`${BASE_URL}/${city.slug}-${serviceSlug}`);
    }
  }
  
  // Neighborhood pages (25 URLs)
  const neighborhoodUrls = NEIGHBORHOOD_PAGES.map(n => 
    `${BASE_URL}/${n.citySlug}-${n.neighborhoodSlug}-idraulico`
  );
  
  // Blog URLs (categories + articles)
  const blogUrls: string[] = [];
  BLOG_CATEGORIES.forEach(category => {
    blogUrls.push(`${BASE_URL}/blog/categoria/${category.slug}`);
  });
  BLOG_ARTICLES.forEach(article => {
    blogUrls.push(`${BASE_URL}/blog/${article.slug}`);
  });
  
  return {
    static: staticUrls,
    keywords: keywordUrls,
    cities: cityUrls,
    cityServices: cityServiceUrls,
    neighborhoods: neighborhoodUrls,
    blog: blogUrls,
    total: staticUrls.length + keywordUrls.length + cityUrls.length + cityServiceUrls.length + neighborhoodUrls.length + blogUrls.length,
  };
}

/**
 * Get SEO statistics
 */
export function getSitemapStats() {
  const counts = getIndexablePageCounts();
  const blogCount = BLOG_ARTICLES.length + BLOG_CATEGORIES.length;
  
  return {
    totalCities: TOP_50_CITIES.length,
    totalServices: CORE_SERVICES.length,
    totalKeywordPages: CORE_KEYWORD_PAGES.length,
    totalCityServicePages: TOP_50_CITIES.length * CORE_SERVICES.length,
    totalNeighborhoodPages: NEIGHBORHOOD_PAGES.length,
    totalBlogPages: blogCount,
    totalSitemapFiles: 6, // static, keywords, cities, neighborhoods, blog, city-services
    totalIndexablePages: counts.total + NEIGHBORHOOD_PAGES.length + blogCount,
    // For comparison
    previousTotalPages: CITIES.length * 15 + KEYWORD_PAGES.length + 5, // Approximate old count
    reductionPercent: Math.round((1 - counts.total / (CITIES.length * 15)) * 100)
  };
}

/**
 * Generate all sitemaps as downloadable files
 */
export function generateAllSitemaps(): { filename: string; content: string }[] {
  const files: { filename: string; content: string }[] = [];
  
  // Static sitemap
  files.push({ filename: 'sitemap-static.xml', content: generateStaticSitemap() });
  
  // Core keywords sitemap
  files.push({ filename: 'sitemap-keywords.xml', content: generateKeywordsSitemap() });
  
  // Top 50 cities sitemap
  files.push({ filename: 'sitemap-cities.xml', content: generateCitiesSitemap() });
  
  // Neighborhood pages sitemap (25 URLs)
  files.push({ filename: 'sitemap-neighborhoods.xml', content: generateNeighborhoodsSitemap() });
  
  // Blog sitemap (articles + categories)
  files.push({ filename: 'sitemap-blog.xml', content: generateBlogSitemap() });
  
  // City+Service sitemaps (Top 50 × 5)
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
