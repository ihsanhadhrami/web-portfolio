import { test, expect } from '@playwright/test';

/**
 * Theme toggle (dark-first, persisted) and the mobile hamburger menu.
 */

test.describe('Theme toggle', () => {
  // Config pins colorScheme to 'dark' (the primary theme), so this is
  // the default a first-time visitor with no stored preference sees.
  test('defaults to dark mode', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  // Intended behavior (see theme-provider.tsx): dark is primary, but an
  // explicit OS *light* preference is honored on first visit.
  test('honors an explicit OS light preference on first visit', async ({
    browser,
  }) => {
    const context = await browser.newContext({ colorScheme: 'light' });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/light/);
    await context.close();
  });

  test('switches to light mode and persists across reload', async ({
    page,
  }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /switch to light theme/i }).click();
    await expect(page.locator('html')).toHaveClass(/light/);

    await page.reload();
    await expect(page.locator('html')).toHaveClass(/light/);
  });

  test('toggles back to dark mode', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /switch to light theme/i }).click();
    await page.getByRole('button', { name: /switch to dark theme/i }).click();
    await expect(page.locator('html')).toHaveClass(/dark/);
  });
});

test.describe('Mobile navigation menu', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('opens, exposes nav links, and navigates on selection', async ({
    page,
  }) => {
    await page.goto('/');

    const openButton = page.getByRole('button', { name: 'Open menu' });
    await expect(openButton).toBeVisible();
    await openButton.click();

    // Scope to the <header> landmark so this doesn't collide with the
    // footer's identical set of nav links, which are always in the DOM.
    const header = page.getByRole('banner');
    await expect(header.getByRole('link', { name: 'About' })).toBeVisible();

    await header.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/\/about$/);
  });

  test('locks body scroll while open', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open menu' }).click();
    const overflow = await page.evaluate(
      () => document.body.style.overflow,
    );
    expect(overflow).toBe('hidden');

    await page.getByRole('button', { name: 'Close menu' }).click();
    const overflowAfter = await page.evaluate(
      () => document.body.style.overflow,
    );
    expect(overflowAfter).toBe('');
  });
});
