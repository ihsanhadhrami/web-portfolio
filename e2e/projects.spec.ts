import { test, expect } from '@playwright/test';

/**
 * Projects listing, category filter, and the project detail route.
 */

test.describe('Projects listing page', () => {
  test('renders at least one project card linking to a detail page', async ({
    page,
  }) => {
    await page.goto('/projects');
    const card = page
      .getByRole('link', { name: /View case study/i })
      .first();
    await expect(card).toBeVisible();
    await expect(card).toHaveAttribute('href', /\/projects\//);
  });

  test('category filter tabs are present and clickable', async ({
    page,
  }) => {
    await page.goto('/projects');
    const tablist = page.getByRole('tablist', {
      name: 'Filter projects by category',
    });
    await expect(tablist).toBeVisible();

    const allTab = tablist.getByRole('tab', { name: 'All' });
    await expect(allTab).toHaveAttribute('aria-selected', 'true');

    const otherTabs = await tablist.getByRole('tab').all();
    expect(otherTabs.length).toBeGreaterThanOrEqual(2);

    // Clicking any non-"All" tab should still leave the grid non-empty
    // for at least one category (sanity check, not exhaustive).
    await otherTabs[1]?.click();
    await expect(
      page.getByRole('link', { name: /View case study/i }).first(),
    ).toBeVisible();
  });
});

test.describe('Project detail page', () => {
  test('Focus System detail page loads with expected content', async ({
    page,
  }) => {
    await page.goto('/projects/focus-system');

    await expect(
      page.getByRole('heading', { name: 'Focus System', level: 1 }),
    ).toBeVisible();
    await expect(page.getByText('Solo Developer')).toBeVisible();

    const liveLink = page.getByRole('link', { name: /visit live site/i });
    await expect(liveLink).toBeVisible();
    await expect(liveLink).toHaveAttribute('target', '_blank');
    await expect(liveLink).toHaveAttribute(
      'href',
      /productivity-timer-app\.netlify\.app/,
    );
  });

  test('"All projects" back link returns to the listing', async ({
    page,
  }) => {
    await page.goto('/projects/focus-system');
    await page.getByRole('link', { name: 'All projects' }).click();
    await expect(page).toHaveURL(/\/projects$/);
  });

  test('an unknown project slug shows a not-found state, not a crash', async ({
    page,
  }) => {
    const response = await page.goto('/projects/this-project-does-not-exist');
    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByText('Project not found')).toBeVisible();
    await page.getByRole('link', { name: 'Back to projects' }).click();
    await expect(page).toHaveURL(/\/projects$/);
  });
});
