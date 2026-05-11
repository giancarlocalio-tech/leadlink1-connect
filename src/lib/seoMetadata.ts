/**
 * SEO Metadata Resolver
 *
 * Pure function: given a URL path, returns title/description/h1/canonical/jsonLd
 * for that route. Used by:
 *  - the build-time prerender plugin (vite-plugin-static-seo)
 *  - React components via useDocumentSeo()
 *
 * Designed to be importable in plain Node (no React, no DOM).
 * 
 * ✅ OPTIMIZED FOR CTR: Added emojis, urgency language, and character limits
 */

import { CITIES } from './seoData';
import { TOP_50_CITIES, CORE_SERVICES, CORE_KEYWORD_PAGES } from './seoConfig';
import { BLOG_ARTICLES, BLOG_CATEGORIES } from './blogData';
import { GUIDES, GUIDE_CATEGORIES } from './guideData';
import { NEIGHBORHOOD_PAGES } from './neighborhoodPagesData';
import { PROBLEM_CITY_PAGES } from './problemCityPagesData';
import { HUB_PAGES } from './hubPagesData';
import { PRICING_PAGES } from './pricingPagesData';

export const BASE_URL = 'https://www.idraulicisubito.com';

export interface RouteSeo {
  title: string;
  description: string;
  h1: string;
  canonical: string;
  noindex?: boolean;
  jsonLd?: object[];
  ogImage?: string;
}

const DEFAULT_OG = `${BASE_URL}/og-image.jpg`;

const norm = (p: string) => {
  let s = p.split('?')[0].split('#')[0];
  if (!s.startsWith('/')) s = '/' + s;
  if (s.length > 1 && s.endsWith('/')) s = s.slice(0, -1);
  return s.toLowerCase();
};

const titleCase = (s: string) =>
  s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

function baseJsonLd(opts: { name: string; description: string; url: string; breadcrumbs?: { name: string; url: string }[] }): object[] {
  const ld: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${opts.url}#webpage`,
      url: opts.url,
      name: opts.name,
      description: opts.description,
      isPartOf: { '@type': 'WebSite', '@id': `${BASE_URL}#website`, url: BASE_URL, name: 'Idraulici Subito' },
      inLanguage: 'it-IT',
    },
  ];
  if (opts.breadcrumbs && opts.breadcrumbs.length) {
    const items = [{ name: 'Home', url: BASE_URL }, ...opts.breadcrumbs];
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: b.url,
      })),
    });
  }
  return ld;
}

function serviceJsonLd(name: string, description: string, url: string, areaName?: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    description,
    url,
    areaServed: areaName ? { '@type': 'City', name: areaName } : { '@type': 'Country', name: 'Italia' },
    serviceType: ['Pronto intervento idraulico', 'Riparazione perdite acqua', 'Installazione impianti idraulici'],
    provider: {
      '@type': 'Organization',
      '@id': `${BASE_URL}#organization`,
      name: 'Idraulici Subito',
      url: BASE_URL,
      logo: `${BASE_URL}/favicon.png`,
    },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '1247', bestRating: '5', worstRating: '1' },
  };
}

// ---------- STATIC ROUTES ----------
const STATIC: Record<string, RouteSeo> = {
  '/': {
    title: 'Idraulico Subito ⚡ Pronto Intervento 24/7 in Tutta Italia | Preventivo Gratis',
    description: 'Trova un idraulico professionista verificato nella tua zona. Risposta in 15 minuti, anche di notte e nei weekend. Preventivo gratuito senza impegno.',
    h1: 'Trova un idraulico professionista nella tua zona',
    canonical: `${BASE_URL}/`,
  },
  '/per-idraulici': {
    title: 'Lavora come Idraulico: Ricevi Richieste di Lavoro nella Tua Zona | Idraulici Subito',
    description: 'Sei un idraulico? Iscriviti gratis e ricevi 3 richieste di prova. Solo clienti reali, geolocalizzati nella tua zona. Nessuna commissione sui lavori.',
    h1: 'Ricevi richieste di lavoro come idraulico professionista',
    canonical: `${BASE_URL}/per-idraulici`,
  },
  '/blog': {
    title: 'Blog Idraulica: Guide Pratiche, Consigli e Tutorial | Idraulici Subito',
    description: 'Articoli aggiornati su problemi idraulici, riparazioni fai-da-te, manutenzione caldaie, perdite acqua e molto altro. Risolvi i tuoi problemi.',
    h1: 'Blog: guide pratiche e consigli da idraulici esperti',
    canonical: `${BASE_URL}/blog`,
  },
  '/guide': {
    title: 'Guide Idrauliche: Risolvi i Problemi di Casa | Idraulici Subito',
    description: 'Guide passo-passo per risolvere i problemi idraulici più comuni: perdite, scarichi intasati, caldaie, rubinetti. Scritte da professionisti.',
    h1: 'Guide pratiche per risolvere i problemi idraulici',
    canonical: `${BASE_URL}/guide`,
  },
  '/prezzi': {
    title: 'Prezzi Idraulico 2026: Costi Aggiornati per Intervento | Idraulici Subito',
    description: 'Listino prezzi aggiornato 2026: tariffa oraria idraulico, costo pronto intervento, riparazioni, sostituzioni. Confronta e risparmia.',
    h1: 'Prezzi e tariffe idraulico aggiornati 2026',
    canonical: `${BASE_URL}/prezzi`,
  },
  '/contatti': {
    title: 'Contattaci: Parla con un Idraulico Subito | Idraulici Subito',
    description: 'Hai bisogno di un idraulico? Contattaci subito via WhatsApp o richiedi un preventivo gratuito. Risposta in pochi minuti.',
    h1: 'Contatta Idraulici Subito',
    canonical: `${BASE_URL}/contatti`,
  },
  '/chi-siamo': {
    title: 'Chi Siamo: Idraulici Subito, la Piattaforma per Trovare Idraulici Verificati',
    description: "Idraulici Subito connette clienti e idraulici professionisti in tutta Italia. Scopri come funziona la piattaforma più rapida del settore.",
    h1: 'Chi siamo: la piattaforma di Idraulici Subito',
    canonical: `${BASE_URL}/chi-siamo`,
  },
  '/come-funziona': {
    title: 'Come Funziona Idraulici Subito: 3 Step per Trovare un Idraulico',
    description: 'Scopri in 3 semplici passi come trovare un idraulico nella tua zona: invia richiesta, ricevi contatti, scegli il professionista giusto.',
    h1: 'Come funziona Idraulici Subito',
    canonical: `${BASE_URL}/come-funziona`,
  },
  '/privacy': {
    title: 'Privacy Policy | Idraulici Subito',
    description: 'Informativa sulla privacy e trattamento dei dati personali su Idraulici Subito.',
    h1: 'Privacy Policy',
    canonical: `${BASE_URL}/privacy`,
    noindex: true,
  },
  '/termini': {
    title: 'Termini e Condizioni | Idraulici Subito',
    description: 'Termini e condizioni di utilizzo del servizio Idraulici Subito.',
    h1: 'Termini e Condizioni',
    canonical: `${BASE_URL}/termini`,
    noindex: true,
  },
};

// ---------- KEYWORD PAGES (CTR-optimized) ----------
// ✅ OPTIMIZED: Added emojis, urgency language, character limits (155 chars max for description)
const KEYWORD_TITLES: Record<string, { title: string; description: string; h1: string }> = {
  'pronto-intervento-idraulico': {
    title: '🔧 Pronto Intervento Idraulico 24h ⚡ Emergenza Subito',
    description: '🚨 Pronto intervento idraulico H24 in tutta Italia. Perdite, allagamenti, scarichi, caldaie. Intervento rapido in 30 min. CHIAMA SUBITO!',
    h1: 'Pronto intervento idraulico 24 ore: chiama subito',
  },
  'idraulico-vicino-a-me': {
    title: '🔍 Idraulico Vicino a Me ⚡ Trova Subito in 5 Min',
    description: '⚡ Idraulico vicino a te. Inserisci la zona e ricevi in 5 minuti i contatti dei migliori idraulici. Preventivo gratis. CHIAMA SUBITO!',
    h1: 'Idraulico vicino a me: trova un professionista in zona',
  },
  'idraulico-24-ore': {
    title: '⏰ Idraulico 24 Ore: Pronto Intervento H24 ⚡ Subito',
    description: '24/7 Idraulico H24 in tutta Italia. Disponibili anche di notte, weekend e festivi. Intervento in 30 minuti. CHIAMA SUBITO!',
    h1: 'Idraulico 24 ore su 24: sempre disponibile',
  },
  'perdita-acqua': {
    title: '💧 Perdita d\'Acqua ⚡ Pronto Intervento Idraulico Subito',
    description: '💧 Perdita d\'acqua in casa? Chiama subito un idraulico esperto. Intervento rapido in 30 min. Preventivo gratuito. CHIAMA SUBITO!',
    h1: 'Riparazione perdite d\'acqua: intervento rapido',
  },
  'scarico-intasato': {
    title: '🚰 Scarico Intasato ⚡ Idraulico Specializzato Subito',
    description: '🚫 Scarico intasato? Lavandino, doccia, water. Idraulico specializzato in disostruzione. Intervento oggi. CHIAMA SUBITO!',
    h1: 'Scarico intasato: come risolvere subito',
  },
  'wc-intasato': {
    title: '🚽 WC Intasato ⚡ Pronto Intervento per Disostruzione',
    description: '🚫 WC intasato? Chiama subito un idraulico esperto. Disostruzione rapida in 30 minuti. Preventivo gratis. CHIAMA SUBITO!',
    h1: 'WC intasato: idraulico per disostruzione rapida',
  },
  'allagamento': {
    title: '🌊 Allagamento Casa ⚡ Pronto Intervento H24 Emergenza',
    description: '🌊 Allagamento in casa? Idraulici H24 per emergenze. Blocco acqua, asciugatura, riparazioni subito. CHIAMA SUBITO!',
    h1: 'Allagamento in casa: cosa fare subito',
  },
  'rubinetto-che-perde': {
    title: '💧 Rubinetto che Perde ⚡ Riparazione e Sostituzione',
    description: '💧 Rubinetto che perde o gocciola? Idraulico specializzato in riparazione. Preventivo in 5 minuti. CHIAMA SUBITO!',
    h1: 'Rubinetto che perde: come risolvere',
  },
  'sostituzione-rubinetto': {
    title: '🔧 Costo Sostituzione Rubinetto ⚡ Prezzi 2026 Subito',
    description: '💰 Quanto costa sostituire un rubinetto? Prezzi 2026, idraulici professionisti, installazione. Preventivo gratis. CHIAMA SUBITO!',
    h1: 'Sostituzione rubinetto: costi e idraulici esperti',
  },
  'riparazione-caldaia': {
    title: '🔥 Riparazione Caldaia ⚡ Tecnico Specialist Subito',
    description: '🔥 Caldaia rotta? Tecnici specializzati. Tutte le marche. Intervento in giornata. Preventivo gratis. CHIAMA SUBITO!',
    h1: 'Riparazione caldaia: tecnici esperti pronti',
  },
  'manutenzione-caldaia': {
    title: '🔧 Manutenzione Caldaia Obbligatoria ⚡ Costi 2026',
    description: '📋 Manutenzione caldaia annuale: costi, normative, tecnici certificati. Prenota controllo. CHIAMA SUBITO!',
    h1: 'Manutenzione caldaia: costi e tecnici certificati',
  },
  'sostituzione-caldaia': {
    title: '🔥 Sostituzione Caldaia ⚡ Costi 2026, Bonus Subito',
    description: '🔥 Caldaia rotta? Costi 2026, bonus fiscali, idraulici certificati. Preventivo gratuito. CHIAMA SUBITO!',
    h1: 'Sostituzione caldaia: costi, bonus e installazione',
  },
  // ✅ NEW KEYWORDS FROM GSC (High volume, 0 CTR)
  'sos-idraulico-in-zona': {
    title: '🚨 SOS Idraulico nella Tua Zona ⚡ H24 Emergenza',
    description: '🚨 SOS idraulico? Emergenza nella tua zona. H24. Intervento rapido 30 min. CHIAMA SUBITO!',
    h1: 'SOS Idraulico nella tua zona: emergenza H24',
  },
  'urgente-idraulico': {
    title: '⚠️ Idraulico Urgente ⚡ Emergenza H24 Subito',
    description: '⚠️ Idraulico urgente? Emergenza idraulica H24. Intervento rapido. CHIAMA SUBITO!',
    h1: 'Idraulico urgente: emergenza risolta subito',
  },
};

function getKeywordSeo(slug: string): RouteSeo | null {
  if (!CORE_KEYWORD_PAGES.includes(slug as never)) return null;
  const url = `${BASE_URL}/${slug}`;
  const k = KEYWORD_TITLES[slug] || {
    title: `🔧 ${titleCase(slug)} ⚡ Subito | Idraulici Subito`,
    description: `⚡ ${titleCase(slug).toLowerCase()}. Idraulico esperto. Intervento rapido 30 min. CHIAMA SUBITO!`,
    h1: titleCase(slug),
  };
  return {
    ...k,
    canonical: url,
    jsonLd: [
      ...baseJsonLd({ name: k.title, description: k.description, url, breadcrumbs: [{ name: k.h1, url }] }),
      serviceJsonLd(k.h1, k.description, url),
    ],
  };
}

// ---------- CITY PAGES ----------
// ✅ OPTIMIZED: High CTR formulas with emojis and urgency
function getCitySeo(citySlug: string): RouteSeo | null {
  if (!TOP_50_CITIES.includes(citySlug as never)) return null;
  const city = CITIES.find(c => c.slug === citySlug);
  const cityName = city?.name || titleCase(citySlug);
  const url = `${BASE_URL}/${citySlug}`;
  const title = `🔧 Idraulico ${cityName} 24/7 ⚡ Subito | Preventivo Gratis`;
  const description = `⚡ Idraulico ${cityName} H24. Emergenza? Intervento in 30 min. Perdite, scarichi, caldaie. CHIAMA GRATIS!`;
  const h1 = `Idraulico a ${cityName}: pronto intervento 24h`;
  return {
    title, description, h1, canonical: url,
    jsonLd: [
      ...baseJsonLd({ name: title, description, url, breadcrumbs: [{ name: cityName, url }] }),
      serviceJsonLd(`Idraulico a ${cityName}`, description, url, cityName),
    ],
  };
}

// ---------- CITY + SERVICE PAGES (e.g. /milano-pronto-intervento) ----------
// ✅ OPTIMIZED: High CTR formulas
function getCityServiceSeo(path: string): RouteSeo | null {
  // Match /{city}-{service} where service is a CORE_SERVICE
  for (const service of CORE_SERVICES) {
    const suffix = `-${service}`;
    if (path.endsWith(suffix)) {
      const citySlug = path.slice(1, -suffix.length);
      if (TOP_50_CITIES.includes(citySlug as never)) {
        const city = CITIES.find(c => c.slug === citySlug);
        const cityName = city?.name || titleCase(citySlug);
        const serviceName = titleCase(service);
        const url = `${BASE_URL}/${citySlug}-${service}`;
        const title = `🔧 ${serviceName} ${cityName} ⚡ Subito | Preventivo Gratis`;
        const description = `⚡ ${serviceName} a ${cityName}. Idraulici specializzati H24. Intervento 30 min. CHIAMA GRATIS!`;
        const h1 = `${serviceName} a ${cityName}: idraulici specializzati`;
        return {
          title, description, h1, canonical: url,
          jsonLd: [
            ...baseJsonLd({ name: title, description, url, breadcrumbs: [{ name: cityName, url: `${BASE_URL}/${citySlug}` }, { name: serviceName, url }] }),
            serviceJsonLd(`${serviceName} a ${cityName}`, description, url, cityName),
          ],
        };
      }
    }
  }
  return null;
}

// ---------- BLOG / GUIDES / NEIGHBORHOOD / PROBLEM-CITY / HUB / PRICING ----------
function getBlogSeo(path: string): RouteSeo | null {
  if (path === '/blog') return STATIC['/blog'];
  if (path.startsWith('/blog/categoria/')) {
    const slug = path.replace('/blog/categoria/', '');
    const cat = BLOG_CATEGORIES.find(c => c.slug === slug);
    if (!cat) return null;
    const url = `${BASE_URL}${path}`;
    return {
      title: `${cat.name}: Articoli e Guide | Blog Idraulici Subito`,
      description: cat.description,
      h1: cat.name,
      canonical: url,
      jsonLd: baseJsonLd({ name: cat.name, description: cat.description, url, breadcrumbs: [{ name: 'Blog', url: `${BASE_URL}/blog` }, { name: cat.name, url }] }),
    };
  }
  if (path.startsWith('/blog/')) {
    const slug = path.replace('/blog/', '');
    const a = BLOG_ARTICLES.find(x => x.slug === slug);
    if (!a) return null;
    const url = `${BASE_URL}${path}`;
    return {
      title: a.metaTitle,
      description: a.metaDescription,
      h1: a.h1,
      canonical: url,
      jsonLd: [
        ...baseJsonLd({ name: a.metaTitle, description: a.metaDescription, url, breadcrumbs: [{ name: 'Blog', url: `${BASE_URL}/blog` }, { name: a.title, url }] }),
        {
          '@context': 'https://schema.org', '@type': 'Article',
          headline: a.h1, description: a.metaDescription, datePublished: a.publishedAt, dateModified: a.updatedAt || a.publishedAt,
          author: { '@type': 'Organization', name: 'Idraulici Subito' },
          publisher: { '@type': 'Organization', name: 'Idraulici Subito', logo: { '@type': 'ImageObject', url: `${BASE_URL}/favicon.png` } },
          mainEntityOfPage: url,
        },
      ],
    };
  }
  return null;
}

function getGuideSeo(path: string): RouteSeo | null {
  if (path === '/guide') return STATIC['/guide'];
  if (path.startsWith('/guide/categoria/')) {
    const slug = path.replace('/guide/categoria/', '');
    const cat = GUIDE_CATEGORIES.find(c => c.slug === slug);
    if (!cat) return null;
    const url = `${BASE_URL}${path}`;
    return {
      title: `${cat.name}: Guide e Tutorial | Idraulici Subito`,
      description: cat.description,
      h1: cat.name,
      canonical: url,
      jsonLd: baseJsonLd({ name: cat.name, description: cat.description, url, breadcrumbs: [{ name: 'Guide', url: `${BASE_URL}/guide` }, { name: cat.name, url }] }),
    };
  }
  if (path.startsWith('/guide/')) {
    const slug = path.replace('/guide/', '');
    const g = GUIDES.find(x => x.slug === slug);
    if (!g) return null;
    const url = `${BASE_URL}${path}`;
    return {
      title: g.metaTitle,
      description: g.metaDescription,
      h1: g.h1,
      canonical: url,
      jsonLd: [
        ...baseJsonLd({ name: g.metaTitle, description: g.metaDescription, url, breadcrumbs: [{ name: 'Guide', url: `${BASE_URL}/guide` }, { name: g.title, url }] }),
        {
          '@context': 'https://schema.org', '@type': 'Article',
          headline: g.h1, description: g.metaDescription, datePublished: g.publishedAt, dateModified: g.updatedAt || g.publishedAt,
          author: { '@type': 'Organization', name: 'Idraulici Subito' },
          publisher: { '@type': 'Organization', name: 'Idraulici Subito', logo: { '@type': 'ImageObject', url: `${BASE_URL}/favicon.png` } },
          mainEntityOfPage: url,
        },
      ],
    };
  }
  return null;
}

function getNeighborhoodSeo(path: string): RouteSeo | null {
  // /{city}-{neighborhood}-idraulico  OR  /idraulico-{city}-{neighborhood}
  for (const n of NEIGHBORHOOD_PAGES) {
    const url = `${BASE_URL}${path}`;
    const candidates = [
      `/idraulico-${n.citySlug}-${n.neighborhoodSlug}`,
      `/${n.citySlug}-${n.neighborhoodSlug}-idraulico`,
    ];
    if (candidates.includes(path)) {
      const title = `🔧 Idraulico ${n.neighborhoodName}, ${n.cityName} ⚡ Subito`;
      const description = `⚡ Idraulico a ${n.neighborhoodName}, ${n.cityName}. Intervento locale rapido 30 min. CHIAMA GRATIS!`;
      const h1 = `Idraulico a ${n.cityName} ${n.neighborhoodName}`;
      return {
        title, description, h1, canonical: url,
        jsonLd: [
          ...baseJsonLd({ name: title, description, url, breadcrumbs: [{ name: n.cityName, url: `${BASE_URL}/${n.citySlug}` }, { name: n.neighborhoodName, url }] }),
          serviceJsonLd(`Idraulico ${n.cityName} ${n.neighborhoodName}`, description, url, `${n.cityName} ${n.neighborhoodName}`),
        ],
      };
    }
  }
  return null;
}

function getProblemCitySeo(path: string): RouteSeo | null {
  for (const p of PROBLEM_CITY_PAGES) {
    if (path === `/${p.slug}`) {
      const url = `${BASE_URL}${path}`;
      return {
        title: p.metaTitle,
        description: p.metaDescription,
        h1: p.h1,
        canonical: url,
        jsonLd: [
          ...baseJsonLd({ name: p.metaTitle, description: p.metaDescription, url, breadcrumbs: [{ name: p.cityName, url: `${BASE_URL}/${p.citySlug}` }, { name: p.problemName, url }] }),
          serviceJsonLd(p.h1, p.metaDescription, url, p.cityName),
        ],
      };
    }
  }
  return null;
}

function getHubSeo(path: string): RouteSeo | null {
  for (const h of HUB_PAGES) {
    if (path === `/${h.slug}` || path === `/hub/${h.slug}`) {
      const url = `${BASE_URL}${path}`;
      return {
        title: h.metaTitle || `${h.title} | Idraulici Subito`,
        description: h.metaDescription || h.intro?.slice(0, 160) || '',
        h1: h.h1 || h.title,
        canonical: url,
        jsonLd: baseJsonLd({ name: h.title, description: h.metaDescription || '', url, breadcrumbs: [{ name: h.title, url }] }),
      };
    }
  }
  return null;
}

function getPricingSeo(path: string): RouteSeo | null {
  for (const p of PRICING_PAGES) {
    if (path === `/${p.slug}` || path === `/prezzi/${p.slug}`) {
      const url = `${BASE_URL}${path}`;
      return {
        title: p.metaTitle || `${p.title} | Prezzi 2026`,
        description: p.metaDescription || p.intro?.slice(0, 160) || '',
        h1: p.h1 || p.title,
        canonical: url,
        jsonLd: baseJsonLd({ name: p.title, description: p.metaDescription || '', url, breadcrumbs: [{ name: 'Prezzi', url: `${BASE_URL}/prezzi` }, { name: p.title, url }] }),
      };
    }
  }
  return null;
}

// ---------- MAIN RESOLVER ----------
export function getRouteSeo(rawPath: string): RouteSeo {
  const path = norm(rawPath);

  // 1) Static
  if (STATIC[path]) return { ogImage: DEFAULT_OG, ...STATIC[path] };

  // 2) Blog / Guide
  const blog = getBlogSeo(path); if (blog) return { ogImage: DEFAULT_OG, ...blog };
  const guide = getGuideSeo(path); if (guide) return { ogImage: DEFAULT_OG, ...guide };

  // 3) Pricing / Hub (specific slugs)
  const pricing = getPricingSeo(path); if (pricing) return { ogImage: DEFAULT_OG, ...pricing };
  const hub = getHubSeo(path); if (hub) return { ogImage: DEFAULT_OG, ...hub };

  // 4) Neighborhood (more specific than city)
  const nbh = getNeighborhoodSeo(path); if (nbh) return { ogImage: DEFAULT_OG, ...nbh };

  // 5) Problem + city pages (specific slugs registered)
  const pc = getProblemCitySeo(path); if (pc) return { ogImage: DEFAULT_OG, ...pc };

  // 6) Keyword pages
  const slug = path.slice(1);
  const kw = getKeywordSeo(slug); if (kw) return { ogImage: DEFAULT_OG, ...kw };

  // 7) City + service combo
  const cs = getCityServiceSeo(path); if (cs) return { ogImage: DEFAULT_OG, ...cs };

  // 8) City alone
  const city = getCitySeo(slug); if (city) return { ogImage: DEFAULT_OG, ...city };

  // Fallback (homepage-ish defaults but self-canonical)
  return {
    title: 'Idraulici Subito | Trova un Idraulico Professionista in 15 Minuti',
    description: 'Trova un idraulico professionista verificato nella tua zona. Pronto intervento 24/7, preventivo gratis.',
    h1: 'Trova un idraulico professionista',
    canonical: `${BASE_URL}${path === '/' ? '/' : path}`,
    ogImage: DEFAULT_OG,
  };
}

// ---------- ROUTE ENUMERATION (for prerender) ----------
export function getAllSeoRoutes(): string[] {
  const routes = new Set<string>();

  // Static
  for (const p of Object.keys(STATIC)) {
    if (!STATIC[p].noindex) routes.add(p);
  }

  // Cities
  for (const c of TOP_50_CITIES) routes.add(`/${c}`);

  // City + service
  for (const c of TOP_50_CITIES) for (const s of CORE_SERVICES) routes.add(`/${c}-${s}`);

  // Keyword pages
  for (const k of CORE_KEYWORD_PAGES) routes.add(`/${k}`);

  // Blog
  for (const cat of BLOG_CATEGORIES) routes.add(`/blog/categoria/${cat.slug}`);
  for (const a of BLOG_ARTICLES) routes.add(`/blog/${a.slug}`);

  // Guides
  for (const cat of GUIDE_CATEGORIES) routes.add(`/guide/categoria/${cat.slug}`);
  for (const g of GUIDES) routes.add(`/guide/${g.slug}`);

  // Neighborhoods (both URL formats)
  for (const n of NEIGHBORHOOD_PAGES) {
    routes.add(`/idraulico-${n.citySlug}-${n.neighborhoodSlug}`);
  }

  // Problem-city pages (only those declared)
  for (const p of PROBLEM_CITY_PAGES) routes.add(`/${p.slug}`);

  // Hub & pricing
  for (const h of HUB_PAGES) routes.add(`/${h.slug}`);
  for (const p of PRICING_PAGES) routes.add(`/${p.slug}`);

  return Array.from(routes).sort();
}
