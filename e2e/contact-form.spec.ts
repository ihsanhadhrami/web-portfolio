import { test, expect, type Page } from '@playwright/test';

/**
 * Contact form: client-side validation, error recovery, and submission.
 *
 * Submission is backed by a Cloudflare Pages Function
 * (functions/api/contact.ts) which has no runtime under `vite preview`,
 * so success-path tests stub the endpoint at the network layer. The app
 * itself never fakes success — that is the point of `expectDelivered`.
 *
 * Field lookups are scoped to the <form> element because the contact
 * sidebar also exposes an "Email" mailto link — an unscoped getByLabel
 * would match both.
 */

const form = (page: Page) => page.locator('form');

/** Stub the contact endpoint with the real success contract. */
async function mockContactEndpoint(page: Page): Promise<void> {
  await page.route('**/api/contact', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true }),
    }),
  );
}

async function fillValidForm(page: Page): Promise<void> {
  await form(page).getByLabel('Name', { exact: true }).fill('Jane Doe');
  await form(page)
    .getByLabel('Email', { exact: true })
    .fill('jane@example.com');
  await form(page)
    .getByLabel('Project details')
    .fill('I would like to discuss a new product build.');
}

test.beforeEach(async ({ page }) => {
  await page.goto('/contact');
});

test('rejects an empty submission with field-level errors', async ({
  page,
}) => {
  await page.getByRole('button', { name: 'Send message' }).click();

  await expect(page.getByText('Please enter your name.')).toBeVisible();
  await expect(
    page.getByText('Please enter a valid email address.'),
  ).toBeVisible();
  await expect(page.getByText(/Tell me a little more/i)).toBeVisible();
});

test('rejects an invalid email format', async ({ page }) => {
  await form(page).getByLabel('Name').fill('Jane Doe');
  await form(page).getByLabel('Email').fill('not-an-email');
  await form(page).getByLabel('Project details').fill('A message long enough.');
  await page.getByRole('button', { name: 'Send message' }).click();

  await expect(
    page.getByText('Please enter a valid email address.'),
  ).toBeVisible();
});

test('rejects a message under 10 characters', async ({ page }) => {
  await form(page).getByLabel('Name').fill('Jane Doe');
  await form(page).getByLabel('Email').fill('jane@example.com');
  await form(page).getByLabel('Project details').fill('short');
  await page.getByRole('button', { name: 'Send message' }).click();

  await expect(page.getByText(/Tell me a little more/i)).toBeVisible();
});

test('error clears as soon as the field is corrected', async ({ page }) => {
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText('Please enter your name.')).toBeVisible();

  await form(page).getByLabel('Name').fill('Jane Doe');
  await expect(page.getByText('Please enter your name.')).toBeHidden();
});

test('valid submission posts to the API and confirms success', async ({
  page,
}) => {
  await mockContactEndpoint(page);

  const request = page.waitForRequest(
    (r) => r.url().includes('/api/contact') && r.method() === 'POST',
  );
  await fillValidForm(page);
  await page.getByRole('button', { name: 'Send message' }).click();

  // The enquiry actually leaves the browser with the expected payload.
  const payload = JSON.parse((await request).postData() ?? '{}');
  expect(payload).toMatchObject({
    name: 'Jane Doe',
    email: 'jane@example.com',
  });

  await expect(page.getByRole('status')).toContainText('Message sent', {
    timeout: 5000,
  });
  await expect(
    page.getByRole('button', { name: 'Send another message' }),
  ).toBeVisible();
});

test('"Send another message" resets the form to a blank state', async ({
  page,
}) => {
  await mockContactEndpoint(page);
  await fillValidForm(page);
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByRole('status')).toContainText('Message sent');

  await page.getByRole('button', { name: 'Send another message' }).click();
  await expect(form(page).getByLabel('Name', { exact: true })).toHaveValue('');
  await expect(
    page.getByRole('button', { name: 'Send message' }),
  ).toBeVisible();
});

/*
 * Regression guard for a silent data-loss bug: the SPA catch-all rewrites
 * unknown paths to index.html with a 200, so a missing/misconfigured
 * backend returns "success" at the HTTP level. The form must treat that
 * as a failure rather than telling the visitor their message was sent.
 */
test('treats an HTML 200 (SPA fallback) as failure, not success', async ({
  page,
}) => {
  await page.route('**/api/contact', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: '<!doctype html><title>app shell</title>',
    }),
  );

  await fillValidForm(page);
  await page.getByRole('button', { name: 'Send message' }).click();

  await expect(page.getByRole('alert')).toContainText(/something went wrong/i);
  await expect(page.getByText('Message sent')).toHaveCount(0);
});

test('surfaces a visible error when the API rejects the request', async ({
  page,
}) => {
  await page.route('**/api/contact', (route) =>
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ ok: false, error: 'nope' }),
    }),
  );

  await fillValidForm(page);
  await page.getByRole('button', { name: 'Send message' }).click();

  await expect(page.getByRole('alert')).toContainText(/something went wrong/i);
});
