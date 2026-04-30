import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";
import { staticSeoPlugin } from "./vite-plugin-static-seo";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico"],
      manifest: {
        name: "Lista Spesa Veloce",
        short_name: "Lista Spesa",
        description: "La tua lista della spesa veloce e semplice",
        theme_color: "#10b981",
        background_color: "#f8fafc",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        // Don't cache prerendered HTML routes — let SW only cache assets,
        // so each navigation hits the static SEO HTML directly.
        navigateFallback: null,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
    // Build-time SEO prerender: generates dist/<route>/index.html with proper
    // <title>, <meta>, <link rel="canonical">, JSON-LD and a hidden <h1>.
    // Uses tsx to load TypeScript metadata module from src/lib/seoMetadata.ts.
    staticSeoPlugin({
      routesProvider: async () => {
        // Use tsx to import a TS file at build closeBundle time.
        // tsx is a peer dep of bun/vite available in Lovable build env.
        const { default: tsx } = await import("tsx/esm/api");
        // Fallback: use esbuild-runtime via dynamic import of compiled JS we'll write.
        // Actually, simplest approach: use an inlined dynamic import via import.meta.url
        // After vite build, src/ is available; but to avoid resolving src/* in node ESM,
        // we'll instead read the TS file with a bundler. Easier: use vite's own ssrLoadModule
        // is not available here. So: shell out to `node --import tsx`.
        // To keep this dependency-free, use a small inline transpile via esbuild (already a vite dep).
        const { build } = await import("esbuild");
        const result = await build({
          entryPoints: [path.resolve(__dirname, "src/lib/seoMetadata.ts")],
          bundle: true,
          platform: "node",
          format: "esm",
          write: false,
          external: ["node:*"],
          logLevel: "silent",
        });
        const code = result.outputFiles[0].text;
        const dataUri =
          "data:text/javascript;base64," + Buffer.from(code).toString("base64");
        const mod = await import(/* @vite-ignore */ dataUri);
        return {
          getRouteSeo: mod.getRouteSeo,
          getAllSeoRoutes: mod.getAllSeoRoutes,
        };
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
