import { readFile } from 'node:fs/promises';
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const V7 = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const guideCases = [
  ['tools/crypto/sha256-hash', 'verify-sha256-file-checksum'],
  ['tools/crypto/file-checksum-comparator', 'verify-sha256-file-checksum'],
  ['tools/encoding/unicode-escape', 'decode-unicode-escapes'],
  ['tools/generators/uuid-generator', 'uuid-v4-vs-v7'],
  ['tools/generators/uuid-v7-generator', 'uuid-v4-vs-v7'],
  ['collections/hashing-checksums', 'verify-sha256-file-checksum'],
  ['collections/encoding-conversion', 'decode-unicode-escapes'],
  ['collections/unique-ids', 'uuid-v4-vs-v7'],
] as const;

test('Unicode starts in Decode mode and preserves literal escapes and whitespace', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/tools/encoding/unicode-escape');
  const tool = page.locator('[data-tool-slot]');
  const input = tool.locator('textarea').first();
  const output = tool.locator('textarea').last();
  await expect(tool.getByRole('button', { name: 'Decode', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await input.fill(String.raw`\u0041\uD83D\uDE00`);
  await tool.getByRole('button', { name: 'Convert', exact: true }).click();
  await expect(output).toHaveValue('A😀');

  await input.fill(' \t\n');
  await tool.getByRole('button', { name: 'Convert', exact: true }).click();
  await expect(output).toHaveValue(' \t\n');

  const literal = String.raw`\x41 \u0041 \u{1F680} 🚀`;
  await tool.getByRole('button', { name: 'Encode', exact: true }).click();
  await tool.getByRole('checkbox', { name: 'Encode ASCII characters too' }).check();
  await input.fill(literal);
  await tool.getByRole('button', { name: 'Convert', exact: true }).click();
  const encoded = await output.inputValue();
  expect(encoded).toContain(String.raw`\u005C`);
  await tool.getByRole('button', { name: 'Decode', exact: true }).click();
  await input.fill(encoded);
  await tool.getByRole('button', { name: 'Convert', exact: true }).click();
  await expect(output).toHaveValue(literal);
  expect(errors).toEqual([]);
});

test('UUID v7 exports a formatted batch and connects to the existing timestamp extractor', async ({
  page,
  context,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/tools/generators/uuid-v7-generator');
  await expect(page).toHaveURL(/\/tools\/generators\/uuid-v7-generator$/);
  const tool = page.locator('[data-tool-slot]');
  const output = tool.getByRole('textbox', { name: 'Generated UUIDs' });
  await expect(output).toHaveValue(V7);
  await expect(tool.getByRole('combobox')).toHaveCount(0);
  await tool.getByLabel('Quantity:').fill('3');
  await tool.getByRole('button', { name: 'Generate', exact: true }).click();
  const canonical = (await output.inputValue()).split('\n');
  expect(canonical).toHaveLength(3);
  expect(new Set(canonical).size).toBe(3);
  for (const id of canonical) expect(id).toMatch(V7);

  await tool.getByRole('checkbox', { name: 'Uppercase', exact: true }).check();
  await tool.getByRole('checkbox', { name: 'Wrap in braces' }).check();
  await tool.getByRole('checkbox', { name: 'Include hyphens' }).uncheck();
  const formatted = canonical.map((id) => `{${id.replaceAll('-', '').toUpperCase()}}`).join('\n');
  await expect(output).toHaveValue(formatted);
  // Windows shares the clipboard with other apps. Observe the successful native write
  // so an unrelated clipboard change cannot make this export check flaky.
  await page.evaluate(() => {
    const nativeWrite = navigator.clipboard.writeText.bind(navigator.clipboard);
    navigator.clipboard.writeText = async (text) => {
      await nativeWrite(text);
      (window as Window & { copiedUuidBatch?: string }).copiedUuidBatch = text;
    };
  });
  await tool.getByRole('button', { name: 'Copy', exact: true }).click();
  await expect(tool.getByRole('button', { name: 'Copied!', exact: true })).toBeVisible();
  expect(
    await page.evaluate(() => (window as Window & { copiedUuidBatch?: string }).copiedUuidBatch),
  ).toBe(formatted);

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    tool.getByRole('button', { name: 'Download', exact: true }).click(),
  ]);
  expect(download.suggestedFilename()).toBe('uuid-v7-batch.txt');
  expect(await readFile((await download.path())!, 'utf8')).toBe(`${formatted}\n`);
  await tool.getByRole('link', { name: 'Inspect a UUID v7 timestamp' }).click();
  await expect(page).toHaveURL(/\/tools\/crypto\/uuid-v7-timestamp-extractor$/);
  await page.locator('[data-tool-interface] textarea').first().fill(canonical[0]);
  const epoch = Number.parseInt(canonical[0].replaceAll('-', '').slice(0, 12), 16);
  await expect(page.locator('[data-tool-interface] textarea').last()).toHaveValue(
    JSON.stringify(new Date(epoch)),
  );
  expect(errors).toEqual([]);
});

test('tools and matching collections expose localized links to the existing English guides', async ({
  page,
}) => {
  for (const prefix of ['', '/tr']) {
    for (const [route, guide] of guideCases) {
      await page.goto(`${prefix}/${route}`);
      const nav = page.locator('[data-related-guides]');
      await expect(nav).toBeVisible();
      await expect(nav.locator('a')).toHaveAttribute('href', `/guides/${guide}`);
      await expect(nav.locator('a')).toHaveAttribute('hreflang', 'en');
      if (prefix) await expect(nav).toContainText('İngilizce');
      if (route.startsWith('tools/')) {
        await expect(page.locator('[data-tool-interface] [data-related-guides]')).toBeVisible();
      }
      await nav.locator('a').click();
      await expect(page).toHaveURL(new RegExp(`/guides/${guide}$`));
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    }
  }
});

test('SHA-256 explains irreversibility first and compares a trusted file checksum', async ({
  page,
}) => {
  await page.goto('/tools/crypto/sha256-hash');
  const explanation = page
    .getByRole('heading', { name: 'What does this SHA-256 generator do?' })
    .locator('..');
  await expect(explanation).toContainText(
    'a hash cannot be decoded into the original text or file',
  );
  await expect(explanation).toContainText('trusted expected checksum');
  const tool = page.locator('[data-tool-slot]');
  await tool
    .getByRole('region', { name: 'Check a local file checksum' })
    .locator('input[type="file"]')
    .first()
    .setInputFiles({
      name: 'checksum-sample.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('abc'),
    });
  const digest = 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad';
  await expect(tool.getByRole('region', { name: 'Check a local file checksum' }).locator('code')).toHaveText(digest);
  await tool.getByLabel('Expected SHA-256 checksum').fill(digest.toUpperCase());
  await expect(tool).toContainText('Checksum matches this file.');
  await tool.getByLabel('Expected SHA-256 checksum').fill('0'.repeat(64));
  await expect(tool).toContainText('Checksum does not match this file.');
});

test('contextual guides and UUID controls fit mobile and have no serious accessibility violations', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [route] of guideCases) {
    await page.goto(`/${route}`);
    await expect(page.locator('[data-related-guides]')).toBeVisible();
    if (route.startsWith('tools/')) {
      await expect(page.locator('[data-tool-interface] textarea').first()).toBeVisible();
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
    const target = route.includes('uuid-') ? '[data-tool-interface]' : '[data-related-guides]';
    const result = await new AxeBuilder({ page })
      .include(target)
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(
      result.violations
        .filter(({ impact }) => impact === 'critical' || impact === 'serious')
        .map(({ id, nodes }) => ({ id, targets: nodes.map(({ target }) => target) })),
    ).toEqual([]);
    await page
      .locator(route.startsWith('tools/') ? '[data-tool-interface]' : '[data-related-guides]')
      .screenshot({
        path: test.info().outputPath(`${route.split('/').pop()}-mobile.png`),
      });
  }
});
