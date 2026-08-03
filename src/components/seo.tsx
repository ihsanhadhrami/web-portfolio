import { SITE } from '@/constants/site';

type JsonLdNode = Record<string, unknown>;

interface SeoProps {
  title?: string;
  description?: string;
  /** Path only, e.g. "/projects"; combined with the site URL for canonical. */
  path?: string;
  /**
   * Extra JSON-LD node(s) for this route (e.g. Person, CollectionPage,
   * CreativeWork). Merged into the same @graph as the auto-generated
   * WebPage node — see the module doc for why this is one script per
   * page rather than several.
   */
  jsonLd?: JsonLdNode | JsonLdNode[];
  /**
   * True for soft-404 states (unknown route, unknown project slug). The
   * SPA fallback serves these with an HTTP 200, which Google explicitly
   * flags as a "soft 404" if left indexable — this renders a noindex
   * meta tag instead of a canonical/JSON-LD for that response.
   */
  noindex?: boolean;
}

/**
 * Per-route document metadata, hoisted into <head> by React 19.
 *
 * Owns <title>, the meta description, the canonical link, robots (for
 * noindex routes), and this page's structured data. Open Graph and
 * Twitter tags are deliberately NOT rendered here — they live in
 * index.html, because social scrapers do not execute JavaScript and
 * would never see a React-rendered copy. Emitting the same tag in both
 * places previously left two conflicting copies on every page.
 *
 * Structured data uses one @graph per page rather than one <script> per
 * entity: every route gets an auto-generated WebPage node, and callers
 * can pass additional nodes (Person, CollectionPage, CreativeWork, ...)
 * via `jsonLd`. Cross-page entities (WebSite, Person) are linked by a
 * stable @id rather than redeclared — Google's own guidance for
 * multi-entity, multi-page structured data.
 */
export function Seo({
  title,
  description,
  path = '',
  jsonLd,
  noindex = false,
}: SeoProps) {
  const fullTitle = title
    ? `${title} — ${SITE.name}`
    : `${SITE.name} — ${SITE.role}`;
  const desc = description ?? SITE.shortBio;
  const canonical = `${SITE.url}${path}`;

  const extraNodes = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  const graph: JsonLdNode[] = noindex
    ? []
    : [
        {
          '@type': 'WebPage',
          '@id': `${canonical}#webpage`,
          url: canonical,
          name: fullTitle,
          description: desc,
          inLanguage: 'en',
          isPartOf: { '@id': `${SITE.url}/#website` },
        },
        ...extraNodes,
      ];

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <link rel="canonical" href={canonical} />
      )}

      {graph.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': graph,
            }),
          }}
        />
      )}
    </>
  );
}
