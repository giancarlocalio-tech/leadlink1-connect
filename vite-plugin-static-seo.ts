/**
 * vite-plugin-static-seo
 *
 * After `vite build`, for each SEO route this plugin clones dist/index.html into
 * dist/<route>/index.html and replaces:
 *   - <title>
 *   - <meta name="description">
 *   - <meta property="og:title|og:description|og:url">
 *   - <link rel="canonical">
 *   - <meta name="robots"> (when noindex)
 * It also injects:
 *   - a hidden but crawlable <h1> at the very start of <body>
 *   - one or more <script type="application/ld+json"> with route-specific JSON-LD
 *
 * Vercel/Lovable will serve the matching dist/<route>/index.html before SPA
 * fallback, so Googlebot reads correct meta on first request.
 */

import type { Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

interface RouteSeoData {
  title: string;
  description: string;
  h1: string;
  canonical: string;
  noindex?: boolean;
  jsonLd?: object[];
  ogImage?: string;
}

type GetRouteSeo = (path: string) => RouteSeoData;
type GetAllRoutes = () => string[];

interface Options {
  routesProvider: () => Promise<{ getRouteSeo: GetRouteSeo; getAllSeoRoutes: GetAllRoutes }>;
}

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(s: string): string {
  return escapeHtml(s);
}

function replaceTag(html: string, regex: RegExp, replacement: string): string {
  return regex.test(html) ? html.replace(regex, replacement) : html;
}

function injectIntoHead(html: string, snippet: string): string {
  return html.replace(/<\/head>/i, `${snippet}\n</head>`);
}

function injectAfterBodyOpen(html: string, snippet: string): string {
  return html.replace(/<body([^>]*)>/i, `<body$1>\n${snippet}`);
}

function buildSeoHtml(template: string, seo: RouteSeoData): string {
  let html = template;

  // <title>
  html = replaceTag(
    html,
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(seo.title)}</title>`
  );

  // <meta name="description">
  html = replaceTag(
    html,
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${escapeAttr(seo.description)}" />`
  );

  // <link rel="canonical"> (replace if exists, otherwise inject)
  if (/<link\s+rel=["']canonical["'][^>]*>/i.test(html)) {
    html = html.replace(
      /<link\s+rel=["']canonical["'][^>]*>/i,
      `<link rel="canonical" href="${escapeAttr(seo.canonical)}" />`
    );
  } else {
    html = injectIntoHead(html, `<link rel="canonical" href="${escapeAttr(seo.canonical)}" />`);
  }

  // robots meta
  if (seo.noindex) {
    html = replaceTag(
      html,
      /<meta\s+name=["']robots["'][^>]*>/i,
      `<meta name="robots" content="noindex, nofollow" />`
    );
    html = replaceTag(
      html,
      /<meta\s+name=["']googlebot["'][^>]*>/i,
      `<meta name="googlebot" content="noindex, nofollow" />`
    );
  } else {
    html = replaceTag(
      html,
      /<meta\s+name=["']robots["'][^>]*>/i,
      `<meta name="robots" content="index, follow" />`
    );
  }

  // og:title / og:description / og:url
  html = replaceTag(
    html,
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${escapeAttr(seo.title)}" />`
  );
  html = replaceTag(
    html,
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${escapeAttr(seo.description)}" />`
  );
  html = replaceTag(
    html,
    /<meta\s+property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${escapeAttr(seo.canonical)}" />`
  );
  if (seo.ogImage) {
    html = replaceTag(
      html,
      /<meta\s+property=["']og:image["'][^>]*>/i,
      `<meta property="og:image" content="${escapeAttr(seo.ogImage)}" />`
    );
  }
  // Twitter card mirrors og
  html = replaceTag(
    html,
    /<meta\s+name=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${escapeAttr(seo.title)}" />`
  );
  html = replaceTag(
    html,
    /<meta\s+name=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${escapeAttr(seo.description)}" />`
  );

  // JSON-LD: remove any pre-existing prerender LD blocks from previous run, then inject fresh
  html = html.replace(
    /<script\s+type=["']application\/ld\+json["']\s+data-prerender=["']1["'][^>]*>[\s\S]*?<\/script>/gi,
    ''
  );
  if (seo.jsonLd && seo.jsonLd.length) {
    const ldBlocks = seo.jsonLd
      .map(
        (obj) =>
          `<script type="application/ld+json" data-prerender="1">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`
      )
      .join('\n');
    html = injectIntoHead(html, ldBlocks);
  }

  // Hidden H1 + heading marker (helps crawlers parse main topic immediately)
  // Removed by React on hydration (root div replaces children).
  const h1Marker = `<h1 data-prerender-h1="1" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden">${escapeHtml(seo.h1)}</h1>`;
  html = injectAfterBodyOpen(html, h1Marker);

  return html;
}

export function staticSeoPlugin(opts: Options): Plugin {
  return {
    name: 'static-seo',
    apply: 'build',
    enforce: 'post',
    async closeBundle() {
      const distDir = path.resolve(process.cwd(), 'dist');
      const indexPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexPath)) {
        this.warn('[static-seo] dist/index.html not found, skipping prerender');
        return;
      }

      let template: string;
      try {
        template = fs.readFileSync(indexPath, 'utf-8');
      } catch (e) {
        this.warn(`[static-seo] cannot read dist/index.html: ${(e as Error).message}`);
        return;
      }

      let mod: { getRouteSeo: GetRouteSeo; getAllSeoRoutes: GetAllRoutes };
      try {
        mod = await opts.routesProvider();
      } catch (e) {
        this.error(`[static-seo] failed to load routes module: ${(e as Error).message}`);
        return;
      }

      const routes = mod.getAllSeoRoutes();
      let written = 0;
      let skipped = 0;

      for (const route of routes) {
        // homepage = index.html itself → just rewrite it with SEO data
        const isHome = route === '/';
        try {
          const seo = mod.getRouteSeo(route);
          const html = buildSeoHtml(template, seo);
          if (isHome) {
            fs.writeFileSync(indexPath, html, 'utf-8');
          } else {
            const targetDir = path.join(distDir, route);
            fs.mkdirSync(targetDir, { recursive: true });
            fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf-8');
          }
          written++;
        } catch (e) {
          skipped++;
          this.warn(`[static-seo] failed for ${route}: ${(e as Error).message}`);
        }
      }

      // eslint-disable-next-line no-console
      console.log(`\n[static-seo] ✓ generated ${written} static SEO pages (skipped ${skipped})`);
    },
  };
}

export default staticSeoPlugin;
