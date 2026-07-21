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
 * Per-page document metadata. Relies on React 19 hoisting `<title>` and
 * `<meta>` tags rendered anywhere in the tree into `<head>`.
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

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
}
