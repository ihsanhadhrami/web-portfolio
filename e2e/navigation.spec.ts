import { test, expect } from '@playwright/test';

/**
 * Core routing: every nav link resolves, the logo forces a real
 * navigation home, and unknown routes fall back to the 404 page
 * instead of a blank screen or a server 404.
 */

const NAV_ROUTES = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

// The desktop nav links are hidden behind the hamburger on mobile
// viewports (covered separately in theme-and-menu.spec). Restrict this
// block to the desktop project.
test.describe('Primary navigation', () => {
  test.skip(
    ({ viewport }) => !!viewport && viewport.width < 768,
    'Desktop nav links are hidden behind the mobile menu below md.',
  );

  for (const route of NAV_ROUTES) {
    test(`nav link "${route.label}" navigates to ${route.path}`, async ({
      page,
    }) => {
      await page.goto('/');
      await page
        .getByRole('navigation', { name: 'Primary' })
        .getByRole('link', { name: route.label, exact: true })
        .click();
      await expect(page).toHaveURL(new RegExp(`${route.path}$`));
    });
  }

  test('"Let\'s talk" CTA in navbar goes to /contact', async ({ page }) => {
    await page.goto('/');
    await page
      .getByRole('navigation', { name: 'Primary' })
      .getByRole('link', { name: "Let's talk" })
      .click();
    await expect(page).toHaveURL(/\/contact$/);
  });
});

// Routing behavior that is viewport-independent (runs on mobile too).
test.describe('Routing fallbacks', () => {
  test('unknown route renders the 404 page, not a server error', async ({
    page,
  }) => {
    const response = await page.goto('/this-route-does-not-exist');
    // SPA fallback: Netlify/Vite serve index.html with 200, React Router
    // renders the NotFound page client-side.
    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByText('Page not found')).toBeVisible();
    await expect(page.getByText('404')).toBeVisible();
    await page.getByRole('link', { name: 'Back to home' }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe('Logo / brand mark', () => {
  // The logo renders in both the header and the footer, so scope to the
  // header (banner) landmark to target the primary one unambiguously.
  test('is a real anchor to "/", not a client-side route', async ({
    page,
  }) => {
    await page.goto('/projects');
    const logo = page
      .getByRole('banner')
      .getByRole('link', { name: /reload home page/i });
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('href', '/');
  });

  test('clicking the logo from an inner page returns to home', async ({
    page,
  }) => {
    await page.goto('/about');
    await page
      .getByRole('banner')
      .getByRole('link', { name: /reload home page/i })
      .click();
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe('Footer', () => {
  test('renders navigation links and social links with valid hrefs', async ({
    page,
  }) => {
    await page.goto('/');
    const footer = page.getByRole('contentinfo');
    await expect(footer).toBeVisible();

    for (const route of NAV_ROUTES) {
      await expect(
        footer.getByRole('link', { name: route.label, exact: true }),
      ).toBeVisible();
    }

    const github = footer.getByRole('link', { name: 'GitHub' });
    const linkedin = footer.getByRole('link', { name: 'LinkedIn' });
    await expect(github).toHaveAttribute('href', /github\.com/);
    await expect(linkedin).toHaveAttribute('href', /linkedin\.com/);
  });

  test('copyright line reflects the current site owner', async ({
    page,
  }) => {
    await page.goto('/');
    // Match the copyright line specifically (© … name), not the footer
    // logo wordmark which also contains the name.
    await expect(
      page.getByRole('contentinfo').getByText(/©.*Ihsan Hadhrami/),
    ).toBeVisible();
  });
});
