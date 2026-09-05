import { expect, test } from '@playwright/test';

test('locale survives category, tool, search and footer navigation', async ({ page, request }) => {
  await page.goto('/tr');
  await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
  await page
    .getByRole('navigation', { name: 'Primary navigation' })
    .getByRole('link', { name: 'Kodlayıcılar', exact: true })
    .click();
  await expect(page).toHaveURL(/\/tr\/tools\/encoding$/);
  await page.locator('main a[href="/tr/tools/encoding/base64"]').first().click();
  await expect(page).toHaveURL(/\/tr\/tools\/encoding\/base64$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'tr');

  await page.locator('button[aria-controls="tool-search-results"]').click();
  await page.getByRole('combobox').fill('json formatter');
  await page
    .getByRole('option', { name: /json formatter/i })
    .first()
    .click();
  await expect(page).toHaveURL(/\/tr\/tools\/json\/json-formatter$/);
  await page.locator('footer a[href="/tr/contact"]').click();
  await expect(page).toHaveURL(/\/tr\/contact$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'tr');

  await page.getByRole('button', { name: /Current: Türkçe/ }).click();
  await page.getByRole('option', { name: 'Deutsch', exact: true }).click();
  await expect(page).toHaveURL(/\/de\/contact$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  await page.getByRole('button', { name: /Current: Deutsch/ }).click();
  await page.getByRole('option', { name: 'English', exact: true }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');

  const redirect = await request.get('/tr/tools/converters/json-csv', { maxRedirects: 0 });
  expect(redirect.status()).toBe(308);
  expect(redirect.headers().location).toBe('/tr/tools/json/json-csv');
});

test('extension fragments reach all four web tools and search', async ({ page }) => {
  const routes = [
    ['json/json-formatter', '{"hello":"dünya"}'],
    ['encoding/base64', 'SGVsbG8='],
    ['encoding/jwt-decoder', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0In0.signature'],
    ['crypto/sha256-hash', 'abc'],
  ];
  for (const [route, input] of routes) {
    await page.goto(`/tools/${route}#input=${encodeURIComponent(input)}`);
    await expect(page.locator('textarea').first()).toHaveValue(input);
  }
  await expect(
    page.getByText('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad', {
      exact: true,
    }),
  ).toBeVisible();
  await page.goto('/tools/crypto/sha256-hash?lang=tr#input=abc');
  await expect(page).toHaveURL(/\/tr\/tools\/crypto\/sha256-hash#input=abc$/);
  await expect(page.locator('textarea').first()).toHaveValue('abc');
  await page.goto('/#search=base64');
  await expect(page.getByRole('textbox', { name: /filter tools/i })).toHaveValue('base64');
});
