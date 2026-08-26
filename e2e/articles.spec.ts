import { test, expect } from '@playwright/test';

/**
 * The articles index and the article detail route.
 *
 * Publishing a post has two halves: dropping the `draft` flag in
 * data/articles.ts and registering a body in content/articles. The first
 * test here is what fails if those two ever disagree, since a card that
 * links nowhere real is a soft 404 the sitemap would happily advertise.
 */

test.describe('Articles index', () => {
  test('every linked article resolves to a real page', async ({ page }) => {
    await page.goto('/articles');

    const links = page.locator('a[href^="/articles/"]');
    await expect(links.first()).toBeVisible();

    const hrefs = await links.evaluateAll((els) =>
      els.map((el) => el.getAttribute('href') ?? '').filter(Boolean),
    );
    expect(hrefs.length).toBeGreaterThan(0);

    for (const href of hrefs) {
      await page.goto(href);
      await expect(
        page.getByText('Article not found'),
        `${href} should render an article, not a soft 404`,
      ).toHaveCount(0);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    }
  });

  test('every card either links out or is marked a draft', async ({ page }) => {
    await page.goto('/articles');

    const links = page.locator('a[href^="/articles/"]');
    await expect(links.first()).toBeVisible();

    // Written without requiring drafts to exist: the backlog is empty right
    // now, but the invariant is what matters. No card may be a dead end,
    // and a draft marker may never sit inside an anchor.
    const drafts = page.getByText(/^draft$/i);
    const draftCount = await drafts.count();

    for (let i = 0; i < draftCount; i += 1) {
      const insideLink = await drafts
        .nth(i)
        .evaluate((el) => el.closest('a') !== null);
      expect(insideLink, 'draft cards must not be links').toBe(false);
    }

    const cardCount = await page
      .getByRole('main')
      .locator('article, a[href^="/articles/"]')
      .count();
    expect(
      (await links.count()) + draftCount,
      'every card is either a working link or a marked draft',
    ).toBe(cardCount);
  });

  test('the track filter narrows the list', async ({ page }) => {
    await page.goto('/articles');
    const tablist = page.getByRole('tablist', {
      name: 'Filter articles by track',
    });

    const list = page.getByRole('main');

    await tablist.getByRole('tab', { name: 'Arabic NLP' }).click();
    await expect(
      tablist.getByRole('tab', { name: 'Arabic NLP' }),
    ).toHaveAttribute('aria-selected', 'true');
    // Every remaining card is on the Arabic NLP track. Scoped past the
    // tablist, which still carries an 'Engineering' label of its own.
    await expect(
      list.locator('article, a[href^="/articles/"]').getByText('Engineering'),
    ).toHaveCount(0);
  });
});

test.describe('Article detail page', () => {
  const SLUG = '/articles/how-machines-learn-to-read-arabic';

  test('renders the body, the table, and the reference list', async ({
    page,
  }) => {
    await page.goto(SLUG);

    await expect(
      page.getByRole('heading', { name: 'How Machines Learn to Read Arabic' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'References' }),
    ).toBeVisible();

    // The root-and-pattern table survived the markdown conversion.
    await expect(page.getByRole('table')).toBeVisible();
    await expect(page.getByRole('cell', { name: 'maktūb' })).toBeVisible();

    // Nine references, each with a footnote target.
    await expect(page.locator('.footnotes > li')).toHaveCount(9);
    await expect(page.locator('#fn-9')).toHaveCount(1);
  });

  test('footnote markers jump to their reference', async ({ page }) => {
    await page.goto(SLUG);
    await page.getByRole('link', { name: 'Reference 4' }).first().click();
    await expect(page.locator('#fn-4')).toBeInViewport({ timeout: 10_000 });
  });

  test('Arabic examples carry a language and direction', async ({ page }) => {
    await page.goto(SLUG);
    const root = page.locator('.lang-ar').first();
    await expect(root).toHaveAttribute('lang', 'ar');
    await expect(root).toHaveAttribute('dir', 'rtl');
  });

  test('the APIs article renders its body and HTTP verb table', async ({
    page,
  }) => {
    await page.goto('/articles/the-invisible-glue-why-apis-run-everything');

    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'The Invisible Glue',
    );
    await expect(page.getByRole('cell', { name: 'PATCH' })).toBeVisible();
    await expect(page.locator('.footnotes > li')).toHaveCount(3);
  });

  test('an unknown slug is a noindex soft 404, not a crash', async ({
    page,
  }) => {
    const response = await page.goto('/articles/no-such-article');
    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByText('Article not found')).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      /noindex/,
    );
    await page.getByRole('link', { name: 'Back to articles' }).click();
    await expect(page).toHaveURL(/\/articles$/);
  });
});
