import { test, expect } from '@playwright/test';

/**
 * The snap-scrolled homepage: section pacing, the section nav that
 * replaces the global navbar on this route, and the work carousel.
 */

const SECTIONS = ['hero', 'about', 'skills', 'work', 'writing', 'contact'];

test.describe('Snap-scrolled homepage', () => {
  test('renders every section, each filling at least the viewport', async ({
    page,
  }) => {
    await page.goto('/');

    for (const id of SECTIONS) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }

    // Measure only once the display webfont has settled. Syne loads async,
    // and swapping it in reflows every section between the count check
    // above and the boundingBox reads below.
    await page.evaluate(() => document.fonts.ready);

    const viewportHeight = page.viewportSize()?.height ?? 0;
    for (const id of SECTIONS) {
      const box = await page.locator(`#${id}`).boundingBox();
      expect(box, `#${id} should have a layout box`).not.toBeNull();
      // `min-height: 100svh`, so a section is never shorter than the
      // viewport. A small tolerance absorbs svh/px rounding.
      expect(box!.height).toBeGreaterThanOrEqual(viewportHeight - 2);
    }
  });

  test('the global navbar and footer are absent here', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('navigation', { name: 'Primary' })).toHaveCount(
      0,
    );
    await expect(page.getByRole('contentinfo')).toHaveCount(0);
  });

  test('scroll cue moves the reader to the About section', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /to explore/i }).click();
    await expect(page.locator('#about')).toBeInViewport({ timeout: 10_000 });
  });

  test('the writing preview links through to the full index', async ({
    page,
  }) => {
    await page.goto('/');
    await page
      .locator('#writing')
      .getByRole('link', { name: 'View all' })
      .click();
    await expect(page).toHaveURL(/\/articles$/);
  });
});

test.describe('Homepage section nav (desktop)', () => {
  test.skip(
    ({ viewport }) => !!viewport && viewport.width < 768,
    'Section links collapse into the menu below md.',
  );

  test('jumps to a section and marks it as current', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Homepage sections' });

    await nav.getByRole('button', { name: 'Work', exact: true }).click();
    await expect(page.locator('#work')).toBeInViewport({ timeout: 10_000 });
    await expect(
      nav.getByRole('button', { name: 'Work', exact: true }),
    ).toHaveAttribute('aria-current', 'true');
  });

  test('the carousel arrows advance through the projects', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Homepage sections' });
    await nav.getByRole('button', { name: 'Work', exact: true }).click();

    const work = page.locator('#work');
    const previous = work.getByRole('button', { name: 'Previous project' });
    const next = work.getByRole('button', { name: 'Next project' });

    // Nothing precedes the first slide.
    await expect(previous).toBeDisabled();

    await next.click();
    await expect(work.getByText(/^02/)).toBeVisible({ timeout: 10_000 });
    await expect(previous).toBeEnabled();

    await previous.click();
    await expect(work.getByText(/^01/)).toBeVisible({ timeout: 10_000 });
  });
});

test.describe('Homepage section menu (mobile)', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('opens and scrolls to the chosen section', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open menu' }).click();

    const header = page.getByRole('banner');
    await header.getByRole('button', { name: /Contact/ }).click();

    await expect(page.locator('#contact')).toBeInViewport({ timeout: 10_000 });
    // Choosing a section closes the menu rather than leaving it covering
    // the content it just scrolled to.
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible();
  });
});
