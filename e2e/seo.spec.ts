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

for (const { path, titleContains } of PAGES) {
  test(`${path} has a correct title and exactly one canonical link`, async ({
    page,
  }) => {
    await page.goto(path);

    // The effective document title must be the per-page dynamic one.
    // (A static fallback <title> also lives in index.html for no-JS
    // scrapers; the browser resolves document.title to the dynamic
    // one, which is what this asserts.)
    await expect(page).toHaveTitle(new RegExp(titleContains));

    // Canonical is the SEO-critical one: there must be exactly one, and
    // it must point at the real domain. React does not dedupe
    // <link rel="canonical">, so a stray static copy would produce two
    // conflicting canonicals — this guards against that regressing.
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
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
