import { createHash } from 'node:crypto';
import { crc32 } from 'node:zlib';
import { expect, test, type Locator, type Page } from '@playwright/test';

const algorithms = ['SHA-256', 'MD5', 'CRC32', 'SHA-1', 'SHA-384', 'SHA-512'] as const;
type Algorithm = (typeof algorithms)[number];
type Digests = Record<Algorithm, string>;

const success = 'Perfect Match! Computed checksum matches the expected hash.';
const mismatch = 'No matching hash algorithm found yet for this input.';

// Independent native oracles: no application checksum code is imported.
function digests(data: Buffer): Digests {
  return {
    MD5: createHash('md5').update(data).digest('hex'),
    CRC32: crc32(data).toString(16).padStart(8, '0'),
    'SHA-1': createHash('sha1').update(data).digest('hex'),
    'SHA-256': createHash('sha256').update(data).digest('hex'),
    'SHA-384': createHash('sha384').update(data).digest('hex'),
    'SHA-512': createHash('sha512').update(data).digest('hex'),
  };
}

function hashRow(tool: Locator, algorithm: Algorithm): Locator {
  return tool.getByText(algorithm, { exact: true }).locator('..').locator('..');
}

async function expectComparison(
  tool: Locator,
  hashes: Digests,
  match: Algorithm | 'mismatch' | null,
) {
  await expect(tool.locator('input[readonly]')).toHaveCount(6);
  for (const algorithm of algorithms) {
    const row = hashRow(tool, algorithm);
    await expect(row.locator('input[readonly]')).toHaveValue(hashes[algorithm]);
    await expect(row.getByText('MATCH', { exact: true })).toHaveCount(algorithm === match ? 1 : 0);
    await expect(row.getByText('Mismatch', { exact: true })).toHaveCount(
      match !== null && algorithm !== match ? 1 : 0,
    );
  }
  await expect(tool.getByText(success, { exact: true })).toHaveCount(
    match !== null && match !== 'mismatch' ? 1 : 0,
  );
  await expect(tool.getByText(mismatch, { exact: true })).toHaveCount(match === 'mismatch' ? 1 : 0);
  await expect(
    tool.getByText('Perfect Match! File checksum is authentic.', { exact: true }),
  ).toHaveCount(0);
}

async function openTool(page: Page): Promise<Locator> {
  await page.goto('/tools/crypto/file-checksum-comparator');
  const tool = page.locator('[data-tool-slot]');
  // Initial computed rows confirm the client controls have hydrated.
  await expect(tool.locator('input[readonly]')).toHaveCount(6);
  return tool;
}

test.beforeEach(async ({ context, baseURL }) => {
  expect(baseURL, 'Run this regression against the dedicated local test server').toBeTruthy();
  const local = new URL(baseURL!);
  expect(local.protocol).toBe('http:');
  expect(['127.0.0.1', 'localhost', '[::1]']).toContain(local.hostname);
  await context.route('**/*', (route) =>
    new URL(route.request().url()).origin === local.origin ? route.continue() : route.abort(),
  );
});

test('uploaded file hashes stay unchanged as expected checksums match, change and clear', async ({
  page,
}) => {
  const tool = await openTool(page);
  const file = { name: 'checksum-sample.txt', mimeType: 'text/plain', buffer: Buffer.from('abc') };
  const hashes = digests(file.buffer);
  const expected = tool.getByPlaceholder('e.g. 5eb63bbbe01eeed093cb22bb8f5acdc3...');

  await tool.locator('input[type="file"]').setInputFiles(file);
  await expectComparison(tool, hashes, null);

  for (const algorithm of algorithms) {
    await expected.fill(`  ${hashes[algorithm].toUpperCase()} \t`);
    await expectComparison(tool, hashes, algorithm);
  }

  await expected.fill('0'.repeat(64));
  await expectComparison(tool, hashes, 'mismatch');
  await expected.clear();
  await expectComparison(tool, hashes, null);
  await expect(tool).toContainText(file.name);
});

test('binary file can switch to text, be reselected, and clear back to the saved text', async ({
  page,
}) => {
  const tool = await openTool(page);
  const fileInput = tool.locator('input[type="file"]');
  const textInput = tool.getByPlaceholder('Type or paste text to hash in real-time...');
  const expected = tool.getByPlaceholder('e.g. 5eb63bbbe01eeed093cb22bb8f5acdc3...');
  const file = {
    name: 'checksum-binary.bin',
    mimeType: 'application/octet-stream',
    buffer: Buffer.from(Array.from({ length: 257 }, (_, index) => index & 0xff)),
  };
  const fileHashes = digests(file.buffer);
  const text = 'Text replaces the uploaded binary: 😀\nabc';
  const textHashes = digests(Buffer.from(text, 'utf8'));

  await fileInput.setInputFiles(file);
  await expectComparison(tool, fileHashes, null);
  await expected.fill(fileHashes['SHA-256']);
  await expectComparison(tool, fileHashes, 'SHA-256');

  await textInput.fill(text);
  await expectComparison(tool, textHashes, 'mismatch');
  await expect(tool).not.toContainText(file.name);
  await expect(fileInput).toHaveValue('');

  await fileInput.setInputFiles(file);
  await expectComparison(tool, fileHashes, 'SHA-256');
  await expect(tool).toContainText(file.name);

  await fileInput.setInputFiles([]);
  await expectComparison(tool, textHashes, 'mismatch');
  await expect(tool).not.toContainText(file.name);
  await expect(textInput).toHaveValue(text);
  await expected.fill(textHashes['SHA-512']);
  await expectComparison(tool, textHashes, 'SHA-512');
});
