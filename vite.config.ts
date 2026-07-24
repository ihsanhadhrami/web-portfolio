import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    // Netlify sets NETLIFY=true in its own build environment (production,
    // deploy previews, and branch deploys alike). This lets the contact
    // form know whether Netlify Forms' backend actually exists to receive
    // a submission, vs. local dev/preview/tests where it doesn't.
    'import.meta.env.VITE_ON_NETLIFY': JSON.stringify(
      process.env.NETLIFY === 'true',
    ),
  },
  build: {
    target: 'es2022',
    cssMinify: 'lightningcss',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
