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
        // esbuild ships transitively with Vite; load it dynamically and bundle
        // the TS metadata module to a single ESM string we can import via data URI.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - esbuild is a vite transitive dep available at build time
        const esbuild = await import("esbuild");
        const result = await esbuild.build({
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
