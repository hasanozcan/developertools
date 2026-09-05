import path from 'node:path';
import { chromium, expect, test } from '@playwright/test';

test('Chromium loads the extension and its offline tools work', async () => {
  const extensionPath = path.resolve('../extension/dist/chromium');
  const context = await chromium.launchPersistentContext(test.info().outputPath('profile'), {
    channel: 'chromium',
    headless: true,
    args: [`--disable-extensions-except=${extensionPath}`, `--load-extension=${extensionPath}`],
  });
  try {
    const worker = context.serviceWorkers()[0] || (await context.waitForEvent('serviceworker'));
    const extensionId = new URL(worker.url()).hostname;
    const page = await context.newPage();
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`chrome-extension://${extensionId}/popup.html`);
    await expect(page.locator('#tool-count')).toHaveText('500 Tools');
    await page.locator('#tool-search-input').fill('sha256');
    await expect(page.locator('.tool-item[href$="/crypto/sha256-hash"]')).toBeVisible();
    await page.getByRole('tab', { name: /Offline Tools/ }).click();
    await expect(page.getByRole('tab', { name: /Offline Tools/ })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await page.locator('#json-input').fill('{"ok":true}');
    await page.locator('#btn-json-prettify').click();
    await expect(page.locator('#json-input')).toHaveValue('{\n  "ok": true\n}');
    await page.locator('.quick-nav-btn[data-tool="hash"]').click();
    await page.locator('#hash-input').fill('abc');
    await expect(page.locator('#hash-sha256')).toHaveValue(
      'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
    );
    await expect(page.locator('#hash-md5')).toHaveValue('900150983cd24fb0d6963f7d28e17f72');
    expect(errors).toEqual([]);
  } finally {
    await context.close();
  }
});
