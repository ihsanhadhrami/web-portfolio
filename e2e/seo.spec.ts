import { test, expect } from '@playwright/test';

/**
 * Per-page document metadata: unique titles, canonical links pointing
 * at the real domain, and required social-preview tags.
 */

const PAGES: { path: string; titleContains: string }[] = [
  { path: '/', titleContains: 'Ihsan Hadhrami' },
  { path: '/projects', titleContains: 'Projects' },
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

test('home page ships a Person JSON-LD block with a matching URL', async ({
  page,
}) => {
  await page.goto('/');
  const script = page.locator('script[type="application/ld+json"]');
  await expect(script).toHaveCount(1);

  const raw = await script.textContent();
  expect(raw).toBeTruthy();
  const json = JSON.parse(raw ?? '{}');

  expect(json['@type']).toBe('Person');
  expect(json.url).toMatch(/^https:\/\/ihsanhadhrami\.com/);
  expect(json.name).toBe('Ihsan Hadhrami');
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
