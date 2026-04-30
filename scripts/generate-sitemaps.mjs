#!/usr/bin/env node
/**
 * Auto-generate sitemap-city-services.xml + sitemap.xml index
 * Source of truth: src/lib/cityLocalContent.ts (cities) + src/lib/serviceContent.ts (canonical services)
 * Aliases are intentionally EXCLUDED (duplicate content -> canonical only).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const DOMAIN = 'https://www.idraulicisubito.com';
const TODAY = new Date().toISOString().slice(0, 10);

function extractKeys(filePath) {
  const src = fs.readFileSync(filePath, 'utf8');
  const re = /^\s{2}'([a-z0-9-]+)':\s*\{/gm;
  const keys = [];
  let m;
  while ((m = re.exec(src)) !== null) keys.push(m[1]);
  return keys;
}

const cities = extractKeys(path.join(ROOT, 'src/lib/cityLocalContent.ts'));
const allServices = extractKeys(path.join(ROOT, 'src/lib/serviceContent.ts'));

// Canonical services only — exclude aliases
const aliasSrc = fs.readFileSync(path.join(ROOT, 'src/lib/serviceContent.ts'), 'utf8');
const aliasBlock = aliasSrc.match(/SLUG_ALIASES[\s\S]*?\};/)[0];
const aliases = new Set([...aliasBlock.matchAll(/'([a-z0-9-]+)':\s*'/g)].map(m => m[1]));
const services = allServices.filter(s => !aliases.has(s));

console.log(`Cities: ${cities.length}, Canonical services: ${services.length} (excluded ${aliases.size} aliases)`);
console.log(`Total city×service URLs: ${cities.length * services.length}`);

const urlEntry = (loc, priority = '0.7', changefreq = 'weekly') =>
  `  <url><loc>${loc}</loc><lastmod>${TODAY}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;

// Anti-cannibalization: master cities have a dedicated ProblemCity master at
// /pronto-intervento-idraulico-{city}. The city+service variant
// /{city}-pronto-intervento is therefore SECONDARY → lower priority + monthly.
const MASTER_CITIES = new Set(['napoli', 'milano', 'roma', 'torino']);
const isSecondaryCityService = (city, service) =>
  service === 'pronto-intervento' && MASTER_CITIES.has(city);

// 1) City × Service sitemap
const csUrls = [];
for (const city of cities) {
  for (const service of services) {
    if (isSecondaryCityService(city, service)) {
      csUrls.push(urlEntry(`${DOMAIN}/${city}-${service}`, '0.4', 'monthly'));
    } else {
      csUrls.push(urlEntry(`${DOMAIN}/${city}-${service}`, '0.7'));
    }
  }
}
const csXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Auto-generated ${TODAY} — ${cities.length} cities × ${services.length} canonical services = ${csUrls.length} URLs -->
${csUrls.join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(PUBLIC, 'sitemap-city-services.xml'), csXml);

// 2) City standalone sitemap (refresh)
const cityUrls = cities.map(c => urlEntry(`${DOMAIN}/${c}`, '0.8', 'weekly'));
const citiesXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Auto-generated ${TODAY} — ${cities.length} city pages -->
${cityUrls.join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(PUBLIC, 'sitemap-cities.xml'), citiesXml);

// 3) Sitemap index — refresh lastmod & ensure city-services included
const subSitemaps = [
  'sitemap-static.xml',
  'sitemap-keywords.xml',
  'sitemap-cities.xml',
  'sitemap-city-services.xml',
  'sitemap-neighborhoods.xml',
  'sitemap-napoli-quartieri.xml',
  'sitemap-milano-quartieri.xml',
  'sitemap-problem-city.xml',
  'sitemap-blog.xml',
];
const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${subSitemaps.map(s => `  <sitemap>\n    <loc>${DOMAIN}/${s}</loc>\n    <lastmod>${TODAY}</lastmod>\n  </sitemap>`).join('\n')}
</sitemapindex>
`;
fs.writeFileSync(path.join(PUBLIC, 'sitemap.xml'), indexXml);

// Remove obsolete partial file
const obsolete = path.join(PUBLIC, 'sitemap-city-services-1.xml');
if (fs.existsSync(obsolete)) {
  fs.unlinkSync(obsolete);
  console.log('Removed obsolete sitemap-city-services-1.xml');
}

console.log('✅ Sitemaps generated successfully');
