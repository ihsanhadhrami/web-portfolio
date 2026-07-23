import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Automated accessibility scan (WCAG 2.0/2.1 A+AA rulesets) on every
 * top-level page. This catches contrast, missing labels, invalid ARIA,
 * and landmark issues automatically — it does not replace manual
 * keyboard/screen-reader testing, but it's a strong first pass.
 */

const PAGES = ['/', '/projects', '/projects/focus-system', '/services', '/about', '/contact'];

/**
 * Scroll the full page so every scroll-triggered (`whileInView`) reveal
 * fires and settles at full opacity, then return to the top. Without
 * this, axe can scan below-the-fold elements while they are still at
 * opacity 0 / mid-reveal and report spurious color-contrast failures.
 */
async function settleReveals(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 100));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(200);
}

for (const path of PAGES) {
  test(`${path} has no automatically detectable a11y violations`, async ({
    page,
  }) => {
    await page.goto(path);
    await settleReveals(page);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    const summary = results.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      nodes: v.nodes.map((n) => n.target),
    }));

    expect(summary, JSON.stringify(summary, null, 2)).toEqual([]);
  });
}
