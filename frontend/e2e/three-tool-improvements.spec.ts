import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const abcSha256 = 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad';
const mismatch = 'Checksum mismatch: none of the computed hashes matches the expected checksum.';
const pages = [
  {
    route: '/tools/utilities/curl-to-fetch',
    heading: 'cURL to Fetch Converter & Request Builder',
    introduction: 'without sending a request',
    description:
      'Convert supported cURL commands to JavaScript Fetch, or build quoted cURL and Fetch requests from method, URL, headers, query, and body input. Nothing is executed.',
  },
  {
    route: '/tools/crypto/sha256-hash',
    heading: 'SHA-256 Hash Generator & File Checksum Checker',
    introduction: 'trusted 64-character expected checksum',
    description:
      'Generate SHA-256 hashes from text or files and verify a trusted checksum locally in your browser. Includes working JavaScript and Python examples.',
  },
  {
    route: '/tools/crypto/file-checksum-comparator',
    heading: 'File Checksum Calculator & Comparator',
    introduction: 'SHA-384',
    description:
      'Calculate MD5, CRC32, SHA-1, SHA-256, SHA-384 and SHA-512 checksums for text or a local file. Compare a complete expected hash from a trusted source.',
  },
] as const;

test.beforeEach(async ({ context, baseURL }) => {
  expect(baseURL, 'Use the dedicated local verification server').toBeTruthy();
  const local = new URL(baseURL!);
  expect(['127.0.0.1', 'localhost', '[::1]']).toContain(local.hostname);
  await context.route('**/*', (route) =>
    new URL(route.request().url()).origin === local.origin ? route.continue() : route.abort(),
  );
});

for (const width of [1365, 390, 320]) {
  test(`three tool pages render their final copy and fit a ${width}px viewport`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    for (const { route, heading, introduction, description } of pages) {
      await page.goto(route);
      const h1 = page.getByRole('heading', { level: 1, name: heading, exact: true });
      await expect(h1).toBeVisible();
      await expect(h1.locator('..')).toContainText(introduction);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        'content',
        description,
      );
      const tool = page.locator('[data-tool-slot]');
      await expect(tool.locator('textarea').first()).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);
      const violations = await new AxeBuilder({ page })
        .include('[data-tool-interface]')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(
        violations.violations
          .filter(({ impact }) => impact === 'serious' || impact === 'critical')
          .map(({ id, nodes }) => ({ id, targets: nodes.map(({ target }) => target) })),
      ).toEqual([]);
      if (width !== 320) {
        await page.locator('[data-tool-interface]').screenshot({
          path: test.info().outputPath(`${route.split('/').pop()}-${width}.png`),
        });
      }
    }
    expect(errors).toEqual([]);
  });
}

test('cURL examples and keyboard conversion retain builder, redaction and rejection behavior without target requests', async ({
  page,
}) => {
  const targetRequests: string[] = [];
  page.on('request', (request) => {
    if (/example\.com|example\.test/.test(new URL(request.url()).hostname))
      targetRequests.push(request.url());
  });
  await page.goto(pages[0].route);
  const tool = page.locator('[data-tool-slot]');
  const converter = tool.getByRole('region', { name: /Paste cURL/ });
  const builder = tool.getByRole('region', { name: 'Request builder' });
  await expect(converter).toBeVisible();
  expect(
    await converter.evaluate(
      (element) =>
        !!(
          element.compareDocumentPosition(
            document.querySelector('[aria-labelledby="curl-builder-heading"]')!,
          ) & Node.DOCUMENT_POSITION_FOLLOWING
        ),
    ),
  ).toBe(true);
  await converter.getByRole('button', { name: 'Load Sample: GET', exact: true }).focus();
  await page.keyboard.press('Enter');
  const input = converter.getByRole('textbox', { name: 'Paste a cURL command...' });
  const output = converter.getByRole('textbox', { name: 'Converted Fetch' });
  await input.focus();
  await page.keyboard.press('Control+Enter');
  await expect(output).toHaveValue(/method: "GET"/);
  await converter.getByRole('button', { name: 'Load Sample: JSON POST', exact: true }).click();
  await expect(output).toHaveValue('');
  await converter.getByRole('button', { name: 'Convert to Fetch' }).click();
  await expect(output).toHaveValue(/method: "POST"/);
  await expect(output).toHaveValue(/application\/json/);
  await expect(output).toHaveValue(/\[REDACTED\]/);
  await expect(output).not.toHaveValue(/example-secret/);
  await tool.getByRole('checkbox', { name: /Redact sensitive headers/ }).uncheck();
  await expect(output).toHaveValue(/example-secret/);
  await expect(builder.getByLabel('Method')).toHaveValue('POST');
  await builder.getByLabel('HTTP(S) URL').fill('https://builder.example.test/items');
  await builder.getByRole('button', { name: '+ Add parameter' }).click();
  await builder.getByRole('textbox', { name: 'Query parameter 2 name' }).fill('page');
  await builder.getByRole('textbox', { name: 'Query parameter 2 value' }).fill('2');
  await expect(builder.locator('textarea[readonly]').first()).toHaveValue(/page=2/);
  for (const command of [
    'curl --form file=@payload.json https://example.com',
    'curl https://example.com/$TOKEN',
    'curl https://one.example.com https://two.example.com',
  ]) {
    await input.fill(command);
    await expect(output).toHaveValue('');
    await converter.getByRole('button', { name: 'Convert to Fetch' }).click();
    await expect(converter.getByRole('alert')).toContainText('Cannot convert this command.');
    await expect(converter.getByRole('alert')).toContainText('--form');
    await expect(output).toHaveValue('');
  }
  await converter.getByRole('button', { name: 'Load Sample: GET', exact: true }).click();
  await expect(converter.getByRole('alert')).toHaveCount(0);
  expect(targetRequests).toEqual([]);
});

test('SHA-256 abc sample and file selection work from the keyboard with separate task results', async ({
  page,
}) => {
  await page.goto(pages[1].route);
  const tool = page.locator('[data-tool-slot]');
  const textTask = tool.getByRole('region', { name: 'Hash UTF-8 text' });
  const fileTask = tool.getByRole('region', { name: 'Check a local file checksum' });
  await textTask.getByRole('button', { name: 'Load Sample', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(textTask.getByRole('textbox', { name: 'Input' })).toHaveValue('abc');
  await expect(textTask.locator('code')).toHaveText(abcSha256);
  await expect(fileTask).toContainText('Files are read into browser memory.');
  await expect(fileTask).toContainText('large downloads');
  const chooser = page.waitForEvent('filechooser');
  await fileTask.getByRole('button', { name: 'Select or drop a local file' }).focus();
  await page.keyboard.press('Enter');
  await (
    await chooser
  ).setFiles({ name: 'abc.txt', mimeType: 'text/plain', buffer: Buffer.from('abc') });
  await expect(fileTask.locator('code')).toHaveText(abcSha256);
  const expected = fileTask.getByLabel('Expected SHA-256 checksum');
  await expected.fill(abcSha256.toUpperCase());
  await expect(fileTask).toContainText('Checksum matches this file.');
  await expected.fill('0'.repeat(64));
  await expect(fileTask).toContainText('Checksum does not match this file.');
  await expected.fill('invalid');
  await expect(fileTask).toContainText('Enter exactly 64 hexadecimal characters');
  await textTask.getByRole('checkbox', { name: 'Uppercase', exact: true }).focus();
  await page.keyboard.press('Space');
  await expect(textTask.locator('code')).toHaveText(abcSha256.toUpperCase());
  await expect(fileTask.locator('code')).toHaveText(abcSha256.toUpperCase());
  await expect(page.locator('[data-related-guides] a')).toHaveCount(1);
});

test('checksum comparison waits for file hashing, then reports match and mismatch without replacing the file results', async ({
  page,
}) => {
  await page.goto(pages[2].route);
  const tool = page.locator('[data-tool-slot]');
  await expect(tool.locator('input[readonly]')).toHaveCount(6);
  await page.evaluate(() => {
    const NativeFileReader = window.FileReader;
    type TestWindow = Window & { releaseChecksumRead?: () => void };
    window.FileReader = class extends NativeFileReader {
      readAsArrayBuffer(file: Blob) {
        (window as TestWindow).releaseChecksumRead = () => super.readAsArrayBuffer(file);
      }
    };
  });
  await tool
    .getByLabel('Select a local file')
    .setInputFiles({ name: 'pending-abc.txt', mimeType: 'text/plain', buffer: Buffer.from('abc') });
  const expected = tool.getByLabel('Expected Checksum Comparator');
  await expect
    .poll(() =>
      page.evaluate(
        () => typeof (window as Window & { releaseChecksumRead?: () => void }).releaseChecksumRead,
      ),
    )
    .toBe('function');
  await expected.fill('0'.repeat(64));
  await expect(tool.getByRole('status')).toContainText('Reading and hashing the selected file...');
  await expect(tool.getByRole('status')).toContainText(
    'Comparison will appear when hashing finishes.',
  );
  await expect(tool.getByText(mismatch, { exact: true })).toHaveCount(0);
  await expect(tool.getByText('Mismatch', { exact: true })).toHaveCount(0);
  await expected.fill(abcSha256.toUpperCase());
  await page.evaluate(() =>
    (window as Window & { releaseChecksumRead?: () => void }).releaseChecksumRead?.(),
  );
  await expect(tool.getByRole('status')).toContainText('Perfect Match!');
  await expect(tool.getByRole('textbox', { name: 'SHA-256 checksum', exact: true })).toHaveValue(
    abcSha256,
  );
  const originalHashes = await tool
    .locator('input[readonly]')
    .evaluateAll((inputs) => inputs.map((input) => (input as HTMLInputElement).value));
  await expected.fill('0'.repeat(64));
  await expect(tool.getByRole('status')).toHaveText(mismatch);
  expect(
    await tool
      .locator('input[readonly]')
      .evaluateAll((inputs) => inputs.map((input) => (input as HTMLInputElement).value)),
  ).toEqual(originalHashes);
  await expected.clear();
  await expect(tool.getByRole('status')).toHaveCount(0);
  await expect(tool).toContainText('pending-abc.txt');
  await expect(tool).toContainText('does not establish');
  await expect(page.locator('[data-related-guides] a')).toHaveCount(1);
  await tool.getByRole('button', { name: 'Load abc example' }).focus();
  await page.keyboard.press('Enter');
  await expect(tool.getByLabel('Input Mode (Text or File)')).toHaveValue('abc');
  await expect(tool.getByRole('textbox', { name: 'SHA-256 checksum', exact: true })).toHaveValue(
    abcSha256,
  );
  await expect(tool).not.toContainText('pending-abc.txt');
});
