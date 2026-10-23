import { test, expect } from '@playwright/test';

test.describe('Background page', () => {
  test('"More about me" on /about leads to the background page', async ({
    page,
  }) => {
    await page.goto('/about');
    await page.getByRole('link', { name: 'More about me' }).click();
    await expect(page).toHaveURL(/\/about\/background$/);
    await expect(
      page.getByRole('heading', { name: 'Certifications', exact: true }),
    ).toBeVisible();
  });

  test('every certificate opens full size and closes again', async ({
    page,
  }) => {
    await page.goto('/about/background');
    const buttons = page.getByRole('button', { name: /^View certificate:/ });
    await expect(buttons).toHaveCount(5);

    await buttons.first().click();
    const dialog = page.locator('dialog[open]');
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole('img', { name: /certificate, issued by/ }),
    ).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);

    await buttons.nth(1).click();
    await page
      .locator('dialog[open]')
      .getByRole('button', { name: 'Close' })
      .click();
    await expect(page.locator('dialog[open]')).toHaveCount(0);
  });

  test('the Coursera certificate links to its verification page', async ({
    page,
  }) => {
    await page.goto('/about/background');
    await expect(page.getByRole('link', { name: 'Verify' })).toHaveAttribute(
      'href',
      /coursera\.org\/verify\//,
    );
  });
});
