/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  /** True only when built by Netlify's own CI (production, deploy previews,
   * and branch deploys) — injected via vite.config.ts's `define`, not a
   * real environment variable available at runtime. */
  readonly VITE_ON_NETLIFY?: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
