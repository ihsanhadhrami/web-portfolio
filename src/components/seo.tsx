import { SITE } from '@/constants/site';

interface SeoProps {
  title?: string;
  description?: string;
  /** Path only, e.g. "/projects"; combined with the site URL for canonical. */
  path?: string;
  /** Structured data injected as a JSON-LD script. */
  jsonLd?: Record<string, unknown>;
}

/**
 * Per-route document metadata, hoisted into <head> by React 19.
 *
 * Owns exactly three things: <title>, the meta description, and the
 * canonical link. Open Graph and Twitter tags are deliberately NOT
 * rendered here — they live in index.html, because social scrapers do not execute
 * JavaScript and would never see a React-rendered copy. Emitting them in
 * both places previously left two conflicting tags on every page.
 */
export function Seo({ title, description, path = '', jsonLd }: SeoProps) {
  const fullTitle = title
    ? `${title} — ${SITE.name}`
    : `${SITE.name} — ${SITE.role}`;
  const desc = description ?? SITE.shortBio;
  const canonical = `${SITE.url}${path}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
}
