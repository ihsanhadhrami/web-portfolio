import { test, expect } from '@playwright/test';

/**
 * The contact email is a copy-to-clipboard affordance (with a mailto
 * fallback) so it does something useful even for visitors without a
 * default mail client.
 */

test('clicking the contact email copies it and confirms', async ({
  page,
  context,
  browserName,
}) => {
  // Clipboard permissions are a Chromium concept; skip elsewhere.
  test.skip(browserName !== 'chromium', 'Clipboard API is Chromium-gated here.');
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);

  await page.goto('/contact');

  const emailLink = page.getByRole('link', {
    name: /ihsanhadhrami\.com/,
  });
  await expect(emailLink).toHaveAttribute('href', /^mailto:/);

  await emailLink.click();

  // Visual/aria confirmation appears.
  await expect(
    page.getByText('Email address copied to clipboard'),
  ).toBeAttached();

  // The address actually landed on the clipboard.
  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboard).toContain('@ihsanhadhrami.com');
});
