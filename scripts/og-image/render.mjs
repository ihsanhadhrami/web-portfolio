// Renders template.html to public/og-image.png at exactly 1200x630.
// Usage: npm run og-image
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';

const template = new URL('./template.html', import.meta.url);
const output = fileURLToPath(
  new URL('../../public/og-image.png', import.meta.url),
);

const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
  });
  await page.goto(template.href, { waitUntil: 'networkidle' });
  // Web fonts are loaded with display=block; wait until they are actually
  // applied so the PNG never captures fallback glyphs.
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: output, type: 'png' });
  console.log(`Wrote ${output}`);
} finally {
  await browser.close();
}
