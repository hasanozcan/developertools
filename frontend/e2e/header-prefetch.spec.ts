import { expect, test } from './fixtures';

test('hidden desktop tool links wait for navigation before loading their route', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const destination = '/tools/encoding/unicode-escape';
  const routeRequests: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('_rsc=')) routeRequests.push(request.url());
  });

  await page.goto('/about');
  await page.waitForLoadState('networkidle');
  expect(routeRequests.some((url) => new URL(url).pathname === destination)).toBe(false);

  await page.locator('header a[href="/tools/encoding"]').first().hover();
  await page.locator(`header a[href="${destination}"]`).click();
  await expect(page).toHaveURL(new RegExp(`${destination}$`));
  await expect(page.getByRole('main')).toBeVisible();
});
