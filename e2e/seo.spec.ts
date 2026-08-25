import { test, expect, type Page } from '@playwright/test';

/**
 * Per-page document metadata: unique titles, canonical links pointing
 * at the real domain, and required social-preview tags.
 */

const PAGES: { path: string; titleContains: string }[] = [
  { path: '/', titleContains: 'Ihsan Hadhrami' },
  { path: '/projects', titleContains: 'Projects' },
  { path: '/articles', titleContains: 'Articles' },
  { path: '/services', titleContains: 'Services' },
  { path: '/about', titleContains: 'About' },
  { path: '/contact', titleContains: 'Contact' },
];

/**
 * Every head tag that search engines and social scrapers read must appear
 * exactly once. React does not dedupe <title>, <meta>, or <link>, so
 * declaring a tag in BOTH index.html and the <Seo> component silently
 * produces two conflicting copies — which is what previously happened to
 * all seven of these. Ownership is now split (index.html owns the social
 * tags; <Seo> owns title/description/canonical) and this locks it in.
 */
const SINGLETON_TAGS = [
  'title',
  'link[rel="canonical"]',
  'meta[name="description"]',
  'meta[property="og:title"]',
  'meta[property="og:description"]',
  'meta[property="og:url"]',
  'meta[property="og:image"]',
  'meta[name="twitter:card"]',
  'meta[name="twitter:title"]',
  'meta[name="twitter:description"]',
  'meta[name="twitter:image"]',
];

for (const { path, titleContains } of PAGES) {
  test(`${path} has a correct title and no duplicated head tags`, async ({
    page,
  }) => {
    await page.goto(path);
    await expect(page).toHaveTitle(new RegExp(titleContains));

    // Wait for the lazy route chunk to mount. Until it does, the head
    // holds RouteFallback's placeholder title and none of the per-route
    // tags below exist yet.
    await expect(page.getByText('Loading…')).toHaveCount(0);

    // Read from the DOM directly: Playwright locators can resolve <head>
    // tags inconsistently, which is what let the original duplication go
    // unnoticed for so long.
    const counts = await page.evaluate(
      (selectors) =>
        Object.fromEntries(
          selectors.map((s) => [s, document.head.querySelectorAll(s).length]),
        ),
      SINGLETON_TAGS,
    );

    for (const [selector, count] of Object.entries(counts)) {
      expect(count, `${selector} should appear exactly once on ${path}`).toBe(
        1,
      );
    }

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      /^https:\/\/ihsanhadhrami\.com/,
    );
  });
}

/**
 * index.html holds a hand-typed copy of SITE.name + SITE.role and
 * SITE.shortBio, because social scrapers never run the JS that would let
 * <Seo> render them. Nothing in the type system ties the two together, so
 * the copies drift silently — og:description once advertised a generic
 * "beautifully engineered digital products" line the site said nowhere
 * else. On the home route the static tags and the rendered ones describe
 * the same page, so they must agree character for character.
 */
test('social tags match the copy the app renders', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Loading…')).toHaveCount(0);

  const content = (selector: string) =>
    page.evaluate(
      (s) => document.head.querySelector(s)?.getAttribute('content') ?? '',
      selector,
    );

  const title = await page.title();
  const description = await content('meta[name="description"]');
  expect(description.length).toBeGreaterThan(0);

  expect(await content('meta[property="og:title"]')).toBe(title);
  expect(await content('meta[name="twitter:title"]')).toBe(title);
  expect(await content('meta[property="og:image:alt"]')).toBe(title);
  expect(await content('meta[property="og:description"]')).toBe(description);
  expect(await content('meta[name="twitter:description"]')).toBe(description);

  // The manifest carries a third copy, and installs the app under it.
  const manifest = await page.request.get('/site.webmanifest');
  expect(manifest.ok()).toBe(true);
  const { name, description: manifestDescription } = await manifest.json();
  expect(name).toBe(title);
  expect(manifestDescription).toBe(description);
});

test('static head tags reference the real production domain', async ({
  page,
}) => {
  await page.goto('/');

  const ogUrl = page.locator('meta[property="og:url"]');
  await expect(ogUrl).toHaveAttribute(
    'content',
    /^https:\/\/ihsanhadhrami\.com/,
  );

  const ogImage = page.locator('meta[property="og:image"]');
  await expect(ogImage).toHaveAttribute(
    'content',
    /^https:\/\/ihsanhadhrami\.com/,
  );

  const twitterCard = page.locator('meta[name="twitter:card"]');
  await expect(twitterCard).toHaveAttribute('content', 'summary_large_image');
});

/** Fetches and parses the one JSON-LD script on the current page as a @graph. */
async function getJsonLdGraph(page: Page): Promise<Record<string, unknown>[]> {
  const script = page.locator('script[type="application/ld+json"]');
  await expect(script).toHaveCount(1);
  const raw = await script.textContent();
  expect(raw).toBeTruthy();
  const parsed = JSON.parse(raw ?? '{}');
  expect(parsed['@context']).toBe('https://schema.org');
  return parsed['@graph'];
}

function findNode(
  graph: Record<string, unknown>[],
  type: string,
): Record<string, unknown> | undefined {
  return graph.find((node) => node['@type'] === type);
}

test('home page ships WebSite, Person, ProfessionalService, and WebPage nodes', async ({
  page,
}) => {
  await page.goto('/');
  const graph = await getJsonLdGraph(page);

  const person = findNode(graph, 'Person');
  expect(person?.name).toBe('Ihsan Hadhrami');
  expect(person?.url).toMatch(/^https:\/\/ihsanhadhrami\.com/);
  expect(person?.['@id']).toBe('https://ihsanhadhrami.com/#person');

  const website = findNode(graph, 'WebSite');
  expect(website?.url).toBe('https://ihsanhadhrami.com');
  expect(website?.publisher).toEqual({
    '@id': 'https://ihsanhadhrami.com/#person',
  });

  const service = findNode(graph, 'ProfessionalService');
  expect(service?.provider).toEqual({
    '@id': 'https://ihsanhadhrami.com/#person',
  });
  // No fabricated business data — see src/pages/Home/HomePage.tsx.
  expect(service).not.toHaveProperty('aggregateRating');
  expect(service).not.toHaveProperty('review');
  expect(service).not.toHaveProperty('address');
  expect(Array.isArray(service?.makesOffer)).toBe(true);
  expect((service?.makesOffer as unknown[]).length).toBeGreaterThan(0);

  expect(findNode(graph, 'WebPage')?.url).toBe('https://ihsanhadhrami.com/');
});

test('projects page ships a CollectionPage listing every project', async ({
  page,
}) => {
  await page.goto('/projects');
  const graph = await getJsonLdGraph(page);

  const collection = findNode(graph, 'CollectionPage');
  const itemList = collection?.mainEntity as
    { itemListElement: { url: string }[] } | undefined;
  expect(itemList?.itemListElement.length).toBeGreaterThan(0);
  expect(
    itemList?.itemListElement.every((item) =>
      item.url.startsWith('https://ihsanhadhrami.com/projects/'),
    ),
  ).toBe(true);
});

test('a project detail page ships a CreativeWork node', async ({ page }) => {
  await page.goto('/projects/focus-system');
  const graph = await getJsonLdGraph(page);

  const work = findNode(graph, 'CreativeWork');
  expect(work?.name).toBe('Focus System');
  expect(work?.creator).toEqual({
    '@id': 'https://ihsanhadhrami.com/#person',
  });
});

test('soft-404 routes are noindex with no misleading canonical or JSON-LD', async ({
  page,
}) => {
  for (const path of ['/this-route-does-not-exist', '/projects/nonexistent']) {
    await page.goto(path);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, nofollow',
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    await expect(
      page.locator('script[type="application/ld+json"]'),
    ).toHaveCount(0);
  }
});

test('robots.txt and sitemap.xml are reachable and reference the same domain', async ({
  request,
}) => {
  const robots = await request.get('/robots.txt');
  expect(robots.ok()).toBeTruthy();
  const robotsBody = await robots.text();
  expect(robotsBody).toContain('https://ihsanhadhrami.com/sitemap.xml');

  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBeTruthy();
  const sitemapBody = await sitemap.text();
  expect(sitemapBody).toContain('<loc>https://ihsanhadhrami.com/</loc>');
});

/*
 * Drift guard. The sitemap is generated at build time from src/data/
 * projects.ts, but this asserts against what the site actually renders —
 * so if a project ever ships without being indexable, this fails. The
 * previous hand-maintained sitemap silently omitted a whole project.
 */
test('sitemap covers every project linked from the projects page', async ({
  page,
  request,
}) => {
  await page.goto('/projects');

  // /projects is a lazy route, so wait for the grid to actually render
  // before enumerating links — otherwise this races the Suspense boundary.
  const projectLinks = page.locator('a[href^="/projects/"]');
  await expect(projectLinks.first()).toBeVisible();

  const hrefs = await projectLinks.evaluateAll((links) =>
    links.map((a) => a.getAttribute('href') ?? '').filter(Boolean),
  );

  const slugs = [...new Set(hrefs)];
  expect(slugs.length).toBeGreaterThan(0);

  const sitemapBody = await (await request.get('/sitemap.xml')).text();
  for (const slug of slugs) {
    expect(
      sitemapBody,
      `${slug} is reachable in the UI but missing from sitemap.xml`,
    ).toContain(`<loc>https://ihsanhadhrami.com${slug}</loc>`);
  }
});
