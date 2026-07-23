import { test, expect, type Page } from '@playwright/test';

/**
 * Contact form: client-side validation, error recovery, and the
 * (simulated, since VITE_CONTACT_ENDPOINT is unset in this env)
 * submission flow.
 *
 * Field lookups are scoped to the <form> element because the contact
 * sidebar also exposes an "Email" mailto link — an unscoped getByLabel
 * would match both.
 */

const form = (page: Page) => page.locator('form');

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

test('valid submission shows a success confirmation', async ({ page }) => {
  await form(page).getByLabel('Name').fill('Jane Doe');
  await form(page).getByLabel('Email').fill('jane@example.com');
  await form(page)
    .getByLabel('Project details')
    .fill('I would like to discuss a new product build.');

  await page.getByRole('button', { name: 'Send message' }).click();

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
  await form(page).getByLabel('Name').fill('Jane Doe');
  await form(page).getByLabel('Email').fill('jane@example.com');
  await form(page)
    .getByLabel('Project details')
    .fill('I would like to discuss a new product build.');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByRole('status')).toContainText('Message sent');

  await page.getByRole('button', { name: 'Send another message' }).click();
  await expect(form(page).getByLabel('Name')).toHaveValue('');
  await expect(
    page.getByRole('button', { name: 'Send message' }),
  ).toBeVisible();
});
