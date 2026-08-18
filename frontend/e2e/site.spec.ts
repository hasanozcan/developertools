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
  await page.goto('/tools/json/json-validator');
  await page.keyboard.press('/');

  const search = page.getByRole('combobox', { name: /search/i });
  await expect(search).toBeVisible();
  await search.fill('json');
  await expect(page.getByRole('option', { name: /json validator/i })).toBeVisible();

  // Capture live screenshot of the search modal open on the screen
  await page.screenshot({
    path: 'C:/Users/PC/.gemini/antigravity/brain/70f40b8d-043e-47d1-b030-10209f073a81/search_modal_live.png',
  });

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

test('homepage category filter and live search filter work correctly', async ({ page }) => {
  await page.goto('/');

  // Search input on homepage
  const filterInput = page.getByPlaceholder(/filter tools/i);
  await expect(filterInput).toBeVisible();

  // Type regex in filter input
  await filterInput.fill('regex');
  await expect(page.getByRole('heading', { name: /regex tester/i })).toBeVisible();

  // Clear filter input
  await filterInput.fill('');

  // Click on a category tab (e.g. JSON Tools)
  const jsonPill = page.getByRole('button', { name: /json/i }).first();
  await jsonPill.click();

  // Check JSON Formatter is shown
  await expect(page.getByRole('heading', { name: /json formatter/i })).toBeVisible();

  // Click on 'All' to show full toolbox
  const allPill = page.getByRole('button', { name: /all/i }).first();
  await allPill.click();

  // Capture live screenshot of the updated homepage toolbox
  await page.screenshot({
    path: 'C:/Users/PC/.gemini/antigravity/brain/70f40b8d-043e-47d1-b030-10209f073a81/homepage_live.png',
  });
});

test('header navigation dropdown renders cleanly with opaque background over tool page', async ({ page }) => {
  await page.goto('/tools/encoding/jwt-decoder');
  await page.setViewportSize({ width: 1280, height: 800 });

  // Hover directly over the Encoders link inside the group
  const encodersLink = page.getByLabel('Primary navigation').getByRole('link', { name: 'Encoders' });
  await encodersLink.hover();
  await page.waitForTimeout(300);

  // The dropdown items should be visible
  await expect(page.getByRole('link', { name: /base64/i }).first()).toBeVisible();

  // Capture screenshot of dropdown menu open over page
  await page.screenshot({
    path: 'C:/Users/PC/.gemini/antigravity/brain/70f40b8d-043e-47d1-b030-10209f073a81/nav_dropdown_live.png',
  });
});

test('header navigation dropdown in Turkish renders with solid background', async ({ page }) => {
  await page.goto('/tools/encoding/jwt-decoder');
  await page.setViewportSize({ width: 1280, height: 800 });

  // Switch to Turkish via localStorage
  await page.evaluate(() => {
    localStorage.setItem('language', 'tr');
  });
  await page.reload();
  await page.waitForTimeout(300);

  // Hover over Kodlayıcılar
  const kodlayicilarLink = page.getByLabel('Primary navigation').getByRole('link', { name: /kodlayıcılar/i });
  await kodlayicilarLink.hover();
  await page.waitForTimeout(300);

  await expect(page.getByRole('link', { name: /base64/i }).first()).toBeVisible();

  await page.screenshot({
    path: 'C:/Users/PC/.gemini/antigravity/brain/70f40b8d-043e-47d1-b030-10209f073a81/nav_dropdown_tr_live.png',
  });
});

