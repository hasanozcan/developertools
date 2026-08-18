import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { toolCatalog } from '../src/lib/api';

test('every canonical tool route responds successfully', async ({ request }) => {
  for (const tool of toolCatalog) {
    const path = `/tools/${tool.categorySlug}/${tool.slug}`;
    const response = await request.get(path);
    expect(response.ok(), `${path} returned ${response.status()}`).toBeTruthy();
  }
});

test('a representative tool loads without browser errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto('/tools/json/json-formatter');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('JSON Formatter');
  await expect(page.locator('[data-tool-interface="true"]')).toBeVisible();

  expect(errors).toEqual([]);
});

for (const route of ['/', '/tools/json/json-formatter']) {
  test(`${route} has no serious or critical accessibility violations`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('main')).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    const blockingViolations = results.violations.filter(
      (violation) => violation.impact === 'critical' || violation.impact === 'serious',
    );

    expect(
      blockingViolations.map(({ help, id, nodes }) => ({ help, id, targets: nodes.map((node) => node.target) })),
    ).toEqual([]);
  });
}

test('tool search supports keyboard selection', async ({ page }) => {
  await page.goto('/');
  await page.locator('button[aria-controls="tool-search-results"]').click();

  const search = page.getByRole('combobox', { name: /search/i });
  await search.fill('json formatter');
  await expect(page.getByRole('option', { name: /json formatter/i })).toBeVisible();
  await search.press('ArrowDown');
  await search.press('Enter');

  await expect(page).toHaveURL(/\/tools\/json\/json-formatter$/);
});

test('tool search supports keyboard shortcut (/) and ESC closing', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('/');

  const search = page.getByRole('combobox', { name: /search/i });
  await expect(search).toBeVisible();
  await search.fill('base64');
  await expect(page.getByRole('option', { name: 'Base64 Encoder/Decoder' })).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(search).not.toBeVisible();
});

test('contact conversion fires only after a successful submission', async ({ page }) => {
  await page.addInitScript(() => {
    const browserWindow = window as typeof window & { conversionCalls: unknown[][] };
    browserWindow.conversionCalls = [];
    window.gtag = (...args: unknown[]) => browserWindow.conversionCalls.push(args);
  });
  await page.route('**/api/contact', (route) =>
    route.fulfill({ contentType: 'application/json', body: '{"ok":true}', status: 200 }),
  );
  await page.goto('/contact');

  expect(
    await page.evaluate(
      () => (window as typeof window & { conversionCalls: unknown[][] }).conversionCalls,
    ),
  ).toEqual([]);

  await page.locator('#name').fill('Browser Test');
  await page.locator('#email').fill('browser-test@example.com');
  await page.locator('#subject').selectOption('feedback');
  await page.locator('#message').fill('Automated end-to-end verification message.');
  await page.locator('button[type="submit"]').click();

  await expect(page.getByRole('status')).toBeVisible();
  const conversionCalls = await page.evaluate(
    () => (window as typeof window & { conversionCalls: unknown[][] }).conversionCalls,
  );
  expect(conversionCalls).toEqual([
    ['event', 'conversion', { currency: 'USD', send_to: 'AW-TEST/contact', value: 1 }],
  ]);
});

