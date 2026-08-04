import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { cloudflare } from '@cloudflare/vite-plugin';
import { fileURLToPath, URL } from 'node:url';
import { projects } from './src/data/projects';

const SITE_URL = process.env.VITE_SITE_URL ?? 'https://ihsanhadhrami.com';

/** Routes that always exist, with their relative crawl priority. */
const STATIC_ROUTES: ReadonlyArray<[path: string, priority: string]> = [
  ['/', '1.0'],
  ['/projects', '0.9'],
  ['/services', '0.8'],
  ['/about', '0.7'],
  ['/contact', '0.6'],
];

/**
 * Emits sitemap.xml at build time from the same data the UI renders, so
 * adding a project can never silently leave it unindexed. Replaces the
 * previous hand-maintained public/sitemap.xml, which had already drifted
 * (it was missing the Léna Maison Spa route entirely).
 */
function sitemapPlugin(): Plugin {
  return {
    name: 'generate-sitemap',
    apply: 'build',
    // The Cloudflare plugin adds a second build environment for the
    // Worker. Without this guard the sitemap would also be emitted into
    // the Worker bundle, where it is meaningless.
    applyToEnvironment: (environment) => environment.name === 'client',
    generateBundle() {
      const lastmod = new Date().toISOString().slice(0, 10);
      const entries = [
        ...STATIC_ROUTES.map(([path, priority]) => ({ path, priority })),
        ...projects.map((p) => ({
          path: `/projects/${p.slug}`,
          priority: '0.7',
        })),
      ];

      const urls = entries
        .map(
          ({ path, priority }) =>
            `  <url>\n    <loc>${SITE_URL}${path}</loc>\n` +
            `    <lastmod>${lastmod}</lastmod>\n` +
            `    <changefreq>monthly</changefreq>\n` +
            `    <priority>${priority}</priority>\n  </url>`,
        )
        .join('\n');

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  // cloudflare() reads wrangler.jsonc, builds the Worker alongside the
  // client bundle, and runs both under workerd for `vite dev` and
  // `vite preview` — so local runs exercise the real runtime.
  plugins: [react(), tailwindcss(), cloudflare(), sitemapPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2022',
    cssMinify: 'lightningcss',
  },
  environments: {
    // Chunking is scoped to the client build: a Worker must ship as a
    // single entry, so manualChunks would be invalid there.
    client: {
      build: {
        rollupOptions: {
          output: {
            /*
             * Path-based splitting. The previous array form
             * (`{ 'react-vendor': ['react', 'react-dom', ...] }`) matched
             * package entry points only, so react-dom's internals landed
             * in the app entry chunk — meaning every content edit
             * invalidated ~130kB of framework code for returning
             * visitors. Matching on resolved module paths keeps vendor
             * code in stable chunks.
             */
            manualChunks(id: string) {
              if (!id.includes('node_modules')) return;
              // framer-motion v12 splits its runtime across siblings.
              if (/[\\/](framer-motion|motion-dom|motion-utils)[\\/]/.test(id))
                return 'motion';
              if (
                /[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom)[\\/]/.test(
                  id,
                )
              )
                return 'react-vendor';
              return 'vendor';
            },
          },
        },
      },
    },
  },
});
