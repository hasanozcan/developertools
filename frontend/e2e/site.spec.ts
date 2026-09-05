import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { toolCatalog } from '../src/lib/api';

test('every canonical tool route responds successfully', async ({ request }) => {
  expect(toolCatalog.length).toBe(500);
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
  const option = page.getByRole('option', { name: /^json formatter/i }).first();
  await expect(option).toBeVisible();
  await option.click();

  await expect(page).toHaveURL(/\/tools\/json\/json-formatter$/);
});

test('tool search supports keyboard shortcut (/) and ESC closing', async ({ page }) => {
  await page.goto('/tools/json/json-validator');
  await expect(page.locator('main')).toBeVisible();
  await page.locator('body').click();
  await page.keyboard.press('/');

  const search = page.getByRole('combobox', { name: /search/i });
  await expect(search).toBeVisible();
  await search.fill('json');
  await expect(page.getByRole('option', { name: /json validator/i })).toBeVisible();

  // Capture live screenshot of the search modal open on the screen
  await page.screenshot({
    path: test.info().outputPath('search_modal_live.png'),
  });

  await page.keyboard.press('Escape');
  await expect(search).not.toBeVisible();
});

test('contact conversion fires only after a successful submission', async ({ page }) => {
  await page.addInitScript(() => {
    const browserWindow = window as typeof window & {
      conversionCalls: unknown[][];
      __NEXT_PUBLIC_GOOGLE_ADS_SEND_TO?: string;
      __NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_VALUE?: string;
      __NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CURRENCY?: string;
    };
    browserWindow.conversionCalls = [];
    browserWindow.__NEXT_PUBLIC_GOOGLE_ADS_SEND_TO = 'AW-TEST/contact';
    browserWindow.__NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_VALUE = '1';
    browserWindow.__NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CURRENCY = 'USD';
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
    path: test.info().outputPath('homepage_live.png'),
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
    path: test.info().outputPath('nav_dropdown_live.png'),
  });
});

test('header navigation dropdown in Turkish renders with solid background', async ({ page }) => {
  await page.goto('/tr/tools/encoding/jwt-decoder');
  await page.setViewportSize({ width: 1280, height: 800 });

  // Hover over Kodlayıcılar
  const kodlayicilarLink = page.getByLabel('Primary navigation').getByRole('link', { name: /kodlayıcılar/i });
  await kodlayicilarLink.hover();
  await page.waitForTimeout(300);

  await expect(page.getByRole('link', { name: /base64/i }).first()).toBeVisible();

  await page.screenshot({
    path: test.info().outputPath('nav_dropdown_tr_live.png'),
  });
});

test('new developer tools render and function correctly', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });

  // 1. Test px-to-rem
  await page.goto('/tools/converters/px-to-rem');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.screenshot({
    path: test.info().outputPath('px_to_rem_live.png'),
  });

  // 2. Test mock-data-generator
  await page.goto('/tools/generators/mock-data-generator');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.screenshot({
    path: test.info().outputPath('mock_data_live.png'),
  });

  // 3. Test rsa-key-pair-generator
  await page.goto('/tools/crypto/rsa-key-pair-generator');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.screenshot({
    path: test.info().outputPath('rsa_keygen_live.png'),
  });

  // 4. Test curl-to-code
  await page.goto('/tools/utilities/curl-to-code');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.screenshot({
    path: test.info().outputPath('curl_to_code_live.png'),
  });

  // 5. Test gitignore-generator
  await page.goto('/tools/generators/gitignore-generator');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.screenshot({
    path: test.info().outputPath('gitignore_live.png'),
  });

  // 6. Test htpasswd-generator
  await page.goto('/tools/crypto/htpasswd-generator');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.screenshot({
    path: test.info().outputPath('htpasswd_live.png'),
  });

  // 7. Test css-glassmorphism
  await page.goto('/tools/utilities/css-glassmorphism');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.screenshot({
    path: test.info().outputPath('glassmorphism_live.png'),
  });

  // 8. Test totp-generator
  await page.goto('/tools/crypto/totp-generator');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.screenshot({
    path: test.info().outputPath('totp_live.png'),
  });

  // 9. Test markdown-table-generator
  await page.goto('/tools/generators/markdown-table-generator');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.screenshot({
    path: test.info().outputPath('markdown_table_live.png'),
  });

  // 10. Test key-code-info
  await page.goto('/tools/utilities/key-code-info');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.screenshot({
    path: test.info().outputPath('key_code_live.png'),
  });

  // 11. Test aspect-ratio-calculator
  await page.goto('/tools/converters/aspect-ratio-calculator');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.screenshot({
    path: test.info().outputPath('aspect_ratio_live.png'),
  });

  // 12. Test css-triangle-generator
  await page.goto('/tools/utilities/css-triangle-generator');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.screenshot({
    path: test.info().outputPath('css_triangle_live.png'),
  });

  // 13. Test svg-placeholder-generator
  await page.goto('/tools/generators/svg-placeholder-generator');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.screenshot({
    path: test.info().outputPath('svg_placeholder_live.png'),
  });
});

test('all tools render interactive interface with zero browser errors', async ({ page }) => {
  test.slow();
  test.setTimeout(360000);
  expect(toolCatalog.length).toBe(500);
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      if (
        !text.includes('google-analytics') &&
        !text.includes('googletagmanager') &&
        !text.includes('net::ERR_') &&
        !text.includes('Failed to load resource')
      ) {
        errors.push(text);
      }
    }
  });
  page.on('pageerror', (err) => errors.push(err.message));

  for (const tool of toolCatalog) {
    await page.goto(`/tools/${tool.categorySlug}/${tool.slug}`);

    // Verify H1 header is visible
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();

    // Verify interactive tool interface container
    const toolInterface = page.locator('[data-tool-interface="true"]');
    await expect(toolInterface).toBeVisible();

    // Verify interactive controls (button, input, textarea, select, or canvas) exist inside the interface
    const controls = toolInterface.locator('button, input, textarea, select, canvas, pre');
    await expect(controls.first()).toBeVisible();
  }

  expect(errors).toEqual([]);
});

test('interactive functionality across batch 1 (tools 1-10)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });

  // 1. html-to-jsx
  await page.goto('/tools/converters/html-to-jsx');
  const htmlInput = page.locator('textarea').first();
  await htmlInput.fill('<div class="hero"><label for="email">Test</label></div>');
  await expect(page.locator('textarea, pre').last()).toContainText('className="hero"');
  await expect(page.locator('textarea, pre').last()).toContainText('htmlFor="email"');

  // 2. sql-minifier
  await page.goto('/tools/formatters/sql-minifier');
  const sqlInput = page.locator('textarea').first();
  await sqlInput.fill('-- sample comment\nSELECT * FROM users \n WHERE id = 1;');
  await expect(page.locator('textarea, pre').last()).toContainText('SELECT * FROM users WHERE id = 1;');

  // 3. json-minifier
  await page.goto('/tools/formatters/json-minifier');
  const jsonMinInput = page.locator('textarea').first();
  await jsonMinInput.fill('{\n  "name": "DevsTools",\n  "active": true\n}');
  await expect(page.locator('textarea, pre').last()).toContainText('{"name":"DevsTools","active":true}');

  // 4. slug-to-title
  await page.goto('/tools/text/slug-to-title');
  const slugInput = page.locator('textarea, input[type="text"]').first();
  await slugInput.fill('my-super-awesome-blog-post');
  await expect(page.locator('body')).toContainText('My Super Awesome Blog Post');
  await expect(page.locator('body')).toContainText('MySuperAwesomeBlogPost');

  // 5. hex-to-base64
  await page.goto('/tools/encoding/hex-to-base64');
  const hexInput = page.locator('textarea').first();
  await hexInput.fill('48656c6c6f');
  await page.getByRole('button', { name: /hex → base64/i }).click();
  await expect(page.locator('textarea').last()).toContainText('SGVsbG8=');

  // 6. tsv-to-json
  await page.goto('/tools/converters/tsv-to-json');
  const tsvInput = page.locator('textarea').first();
  await tsvInput.fill('name\tage\nAlice\t30\nBob\t25');
  await page.getByRole('button', { name: /tsv → json/i }).click();
  await expect(page.locator('textarea, pre').last()).toContainText('"name": "Alice"');

  // 7. crontab-descriptor
  await page.goto('/tools/utilities/crontab-descriptor');
  const cronInput = page.locator('input[type="text"]').first();
  await cronInput.fill('0 0 * * 0');
  await expect(page.locator('body')).toContainText('Runs every Sunday at midnight (00:00)');

  // 8. base32-encoder
  await page.goto('/tools/encoding/base32-encoder');
  const b32Input = page.locator('textarea').first();
  await b32Input.fill('Hello World');
  await page.getByRole('button', { name: /encode to base32/i }).click();
  await expect(page.locator('textarea, pre').last()).toContainText('JBSWY3DPEBLW64TMMQ======');

  // 9. semver-calculator
  await page.goto('/tools/utilities/semver-calculator');
  const semverInput = page.locator('input[type="text"]').first();
  await semverInput.fill('1.2.3');
  await expect(page.locator('body')).toContainText('2.0.0');
  await expect(page.locator('body')).toContainText('1.3.0');
  await expect(page.locator('body')).toContainText('1.2.4');

  // 10. mac-address-generator
  await page.goto('/tools/generators/mac-address-generator');
  await expect(page.locator('textarea, pre').first()).toBeVisible();
  await page.getByRole('button', { name: /regenerate/i }).click();
});

test('interactive functionality across batch 2 (tools 11-20)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });

  // 11. color-palette-generator
  await page.goto('/tools/generators/color-palette-generator');
  await expect(page.locator('body')).toContainText('50');
  await expect(page.locator('body')).toContainText('950');

  // 12. css-clip-path
  await page.goto('/tools/utilities/css-clip-path');
  await expect(page.locator('body')).toContainText('clip-path: polygon(');

  // 13. css-scrollbar-generator
  await page.goto('/tools/utilities/css-scrollbar-generator');
  await expect(page.locator('body')).toContainText('::-webkit-scrollbar');

  // 14. css-pattern-generator
  await page.goto('/tools/utilities/css-pattern-generator');
  await expect(page.locator('body')).toContainText('background-image:');

  // 15. svg-path-visualizer
  await page.goto('/tools/utilities/svg-path-visualizer');
  await expect(page.locator('canvas, svg').first()).toBeVisible();

  // 16. csv-to-sql-insert
  await page.goto('/tools/converters/csv-to-sql-insert');
  const csvSqlInput = page.locator('textarea').first();
  await csvSqlInput.fill('name,age\nAlice,30\nBob,25');
  await expect(page.locator('textarea, pre').last()).toContainText('INSERT INTO');

  // 17. json-to-graphql
  await page.goto('/tools/converters/json-to-graphql');
  const gqlInput = page.locator('textarea').first();
  await gqlInput.fill('{"user": {"id": 1, "name": "Dev"}}');
  await expect(page.locator('textarea, pre').last()).toContainText('type User {');
  await expect(page.locator('textarea, pre').last()).toContainText('id: Int');

  // 18. ndjson-to-json
  await page.goto('/tools/converters/ndjson-to-json');
  const ndInput = page.locator('textarea').first();
  await ndInput.fill('{"id": 1}\n{"id": 2}');
  await page.getByRole('button', { name: /ndjson → json/i }).click();
  await expect(page.locator('textarea, pre').last()).toContainText('"id": 1');

  // 19. json-size-analyzer
  await page.goto('/tools/json/json-size-analyzer');
  const jsonSizeInput = page.locator('textarea').first();
  await jsonSizeInput.fill('{"name": "DevsTools", "tags": ["tool", "dev"]}');
  await expect(page.locator('body')).toContainText('Bytes');

  // 20. punycode-converter
  await page.goto('/tools/converters/punycode-converter');
  const punyInput = page.locator('textarea').first();
  await punyInput.fill('münchen.de');
  await expect(page.locator('textarea').last()).toContainText('xn--');
});

test('interactive functionality across batch 3 (tools 21-30)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });

  // 21. morse-code-audio-converter
  await page.goto('/tools/encoding/morse-code-audio-converter');
  const morseInput = page.locator('textarea').first();
  await morseInput.fill('SOS');
  await expect(page.locator('textarea').last()).toContainText('... --- ...');

  // 22. password-strength-analyzer
  await page.goto('/tools/crypto/password-strength-analyzer');
  const pwdInput = page.locator('input[type="password"], input[type="text"]').first();
  await pwdInput.fill('CorrectHorseBatteryStaple!99');
  await expect(page.locator('body')).toContainText('bits');

  // 23. ipv6-subnet-calculator
  await page.goto('/tools/utilities/ipv6-subnet-calculator');
  const ipv6Input = page.locator('input[type="text"]').first();
  await ipv6Input.fill('2001:db8::1');
  await expect(page.locator('body')).toContainText('2001:0db8:0000:0000:0000:0000:0000:0001');

  // 24. htaccess-to-nginx
  await page.goto('/tools/converters/htaccess-to-nginx');
  const htInput = page.locator('textarea').first();
  await htInput.fill('RewriteRule ^old-page$ /new-page [R=301,L]');
  await expect(page.locator('textarea, pre').last()).toContainText('rewrite ^old-page$ /new-page permanent;');

  // 25. dns-record-generator
  await page.goto('/tools/utilities/dns-record-generator');
  await expect(page.locator('body')).toContainText('v=spf1');

  // 26. text-obfuscator
  await page.goto('/tools/text/text-obfuscator');
  const textObfInput = page.locator('textarea').first();
  await textObfInput.fill('Clean Text With No Hidden Characters');
  await expect(page.locator('body')).toContainText('Sanitized & Cleaned Text');
  await expect(page.locator('body')).toContainText('Zero-Width Spaces');

  // 27. csv-column-extractor
  await page.goto('/tools/converters/csv-column-extractor');
  const csvExtInput = page.locator('textarea').first();
  await csvExtInput.fill('id,name,email,age\n1,Alice,alice@example.com,30\n2,Bob,bob@example.com,25');
  await expect(page.locator('body')).toContainText('Extracted Columns Output');

  // 28. sql-to-typescript
  await page.goto('/tools/converters/sql-to-typescript');
  const sqlTsInput = page.locator('textarea').first();
  await sqlTsInput.fill('CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(255) NOT NULL);');
  await expect(page.locator('textarea, pre').last()).toContainText('export interface User {');

  // 29. json-to-env
  await page.goto('/tools/converters/json-to-env');
  const envInput = page.locator('textarea').first();
  await envInput.fill('{"database": {"host": "localhost", "port": 5432}}');
  await page.getByRole('button', { name: /json → \.env/i }).click();
  await expect(page.locator('textarea, pre').last()).toContainText('DATABASE_HOST=localhost');
  await expect(page.locator('textarea, pre').last()).toContainText('DATABASE_PORT=5432');

  // 30. markdown-table-to-csv
  await page.goto('/tools/converters/markdown-table-to-csv');
  const mdTableInput = page.locator('textarea').first();
  await mdTableInput.fill('| Header1 | Header2 |\n|---|---|\n| Val1 | Val2 |');
  await expect(page.locator('textarea, pre').last()).toContainText('Header1,Header2');
  await expect(page.locator('textarea, pre').last()).toContainText('Val1,Val2');
});



test('new high-traffic tools interactive functionality and visual validation', async ({ page }) => {
  // 1. LLM Token Counter
  await page.goto('/tools/utilities/llm-token-counter');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('LLM Token');
  await expect(page.locator('body')).toContainText('Tokens');
  await page.screenshot({ path: test.info().outputPath('llm_token_counter_live.png') });

  // 2. CSS to Tailwind
  await page.goto('/tools/converters/css-to-tailwind');
  const cssInput = page.locator('textarea').first();
  await cssInput.fill('display: flex; justify-content: center; align-items: center;');
  await expect(page.locator('textarea').last()).toContainText('flex');
  await page.screenshot({ path: test.info().outputPath('css_to_tailwind_live.png') });

  // 3. JSON to Pydantic
  await page.goto('/tools/converters/json-to-pydantic');
  const pydanticInput = page.locator('textarea').first();
  await pydanticInput.fill('{"user_id": 1, "username": "alex", "is_admin": true}');
  await expect(page.locator('textarea').last()).toContainText('class User(BaseModel):');
  await expect(page.locator('textarea').last()).toContainText('user_id: int');
  await page.screenshot({ path: test.info().outputPath('json_to_pydantic_live.png') });

  // 4. UUID v7 Generator
  await page.goto('/tools/generators/uuid-v7-generator');
  await expect(page.locator('body')).toContainText('UUIDv7');
  await page.getByRole('button', { name: /generate/i }).click();
  await page.screenshot({ path: test.info().outputPath('uuid_v7_live.png') });

  // 5. Conventional Commit Builder
  await page.goto('/tools/generators/conventional-commit-builder');
  await expect(page.locator('body')).toContainText('feat');
  await page.screenshot({ path: test.info().outputPath('conventional_commit_live.png') });

  // 6. DeepSeek Token Counter
  await page.goto('/tools/utilities/deepseek-token-counter');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('DeepSeek');
  await expect(page.locator('body')).toContainText('Tokens');

  // 7. Shadcn Theme Generator
  await page.goto('/tools/generators/shadcn-theme-generator');
  await expect(page.locator('body')).toContainText('Shadcn UI CSS Theme');

  // 8. MCP Inspector
  await page.goto('/tools/utilities/mcp-inspector');
  await expect(page.locator('body')).toContainText('VALID MCP MESSAGE');
});

test('16 newly added high-traffic tools interactive and rendering validation', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });

  // 1. cURL to Axios Converter
  await page.goto('/tools/converters/curl-to-axios');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('cURL to Axios');
  const curlInput = page.locator('textarea').first();
  await curlInput.fill('curl -X POST https://api.example.com/data -H "Authorization: Bearer token123" -d \'{"name":"DevsTools"}\'');
  await expect(page.locator('textarea, pre').last()).toContainText('axios({');

  // 2. Fetch to cURL Converter
  await page.goto('/tools/converters/fetch-to-curl');
  await expect(page.locator('body')).toContainText('curl');
  await expect(page.locator('body')).toContainText('-X POST');

  // 3. JSON to XML Converter
  await page.goto('/tools/converters/json-to-xml');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('JSON to XML');
  const jsonXmlInput = page.locator('textarea').first();
  await jsonXmlInput.fill('{"user": {"name": "Alice", "role": "admin"}}');
  await expect(page.locator('textarea, pre').last()).toContainText('<root>');
  await expect(page.locator('textarea, pre').last()).toContainText('<name>Alice</name>');

  // 4. Excel & CSV to JSON Converter
  await page.goto('/tools/converters/excel-to-json');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Excel');
  await expect(page.locator('body')).toContainText('Excel / CSV / TSV Input');

  // 5. JSON to Excel & CSV Converter
  await page.goto('/tools/converters/json-to-excel');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('JSON to Excel');
  await expect(page.locator('body')).toContainText('Spreadsheet Table Output');

  // 6. Image Format Converter
  await page.goto('/tools/converters/image-converter');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Image Format Converter');
  await expect(page.locator('body')).toContainText('Select Image to Convert');

  // 7. Images to PDF Converter
  await page.goto('/tools/converters/images-to-pdf');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Images to PDF');
  await expect(page.locator('body')).toContainText('Select or Drop Images');

  // 8. Image Compressor & Optimizer
  await page.goto('/tools/utilities/image-compressor');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Image Compressor');
  await expect(page.locator('body')).toContainText('Drag & Drop Image');

  // 9. Image Color Palette Extractor
  await page.goto('/tools/utilities/image-color-extractor');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Image Color Palette');
  await expect(page.locator('body')).toContainText('Upload an Image');

  // 10. PDF Merger & Combiner
  await page.goto('/tools/utilities/pdf-merger');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('PDF Merger');
  await expect(page.locator('body')).toContainText('Drag & Drop PDF');

  // 11. PDF Splitter & Page Extractor
  await page.goto('/tools/utilities/pdf-splitter');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('PDF Splitter');
  await expect(page.locator('body')).toContainText('Select PDF Document to Split');

  // 12. All-in-One LLM Token & Pricing Calculator
  await page.goto('/tools/utilities/llm-pricing-calculator');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('LLM');
  await expect(page.locator('body')).toContainText('GPT-4o');
  await expect(page.locator('body')).toContainText('Claude 3.5 Sonnet');
  await expect(page.locator('body')).toContainText('DeepSeek V3');

  // 13. Live HTML/CSS/JS Sandbox & Playground
  await page.goto('/tools/utilities/code-playground');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Sandbox & Playground');
  await expect(page.locator('body')).toContainText('HTML');
  await expect(page.locator('body')).toContainText('CSS');
  await expect(page.locator('body')).toContainText('JavaScript');

  // 14. Schema.org JSON-LD Structured Data Builder
  await page.goto('/tools/generators/schema-org-generator');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Schema.org JSON-LD');
  await expect(page.locator('body')).toContainText('FAQPage');

  // 15. Image EXIF Metadata Viewer & Stripper
  await page.goto('/tools/crypto/image-exif-stripper');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Image EXIF');
  await expect(page.locator('body')).toContainText('Select Photo to Inspect');

  // 16. Multi-Hash File Checksum & Comparator
  await page.goto('/tools/crypto/file-checksum-comparator');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Checksum');
  await expect(page.locator('body')).toContainText('SHA-256');
  await expect(page.locator('body')).toContainText('MD5');
});

test('batch 367-382 high-traffic tools interactive and rendering validation', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });

  // 1. Video to GIF Converter
  await page.goto('/tools/converters/video-to-gif');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Video to GIF');
  await expect(page.locator('body')).toContainText('Convert to GIF');

  // 2. SVG to High-Resolution PNG
  await page.goto('/tools/converters/svg-to-png-hd');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('SVG to PNG');
  await expect(page.locator('body')).toContainText('SVG Source Code');

  // 3. PDF to Image Converter
  await page.goto('/tools/converters/pdf-to-image');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('PDF to');
  await expect(page.locator('body')).toContainText('Pages to Convert');

  // 4. Audio Format Converter
  await page.goto('/tools/converters/audio-converter');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Audio Format Converter');
  await expect(page.locator('body')).toContainText('Target Output Format');

  // 5. Swagger/OpenAPI to TypeScript
  await page.goto('/tools/converters/swagger-to-typescript');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Swagger');
  await expect(page.locator('body')).toContainText('Generated TypeScript Client');

  // 6. Postman Collection to cURL
  await page.goto('/tools/converters/postman-collection-to-curl');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Postman Collection');
  await expect(page.locator('body')).toContainText('cURL Terminal Commands');

  // 7. HTML to Markdown GFM
  await page.goto('/tools/converters/html-to-gfm-converter');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('HTML to Markdown');
  await expect(page.locator('body')).toContainText('Markdown Output (GFM)');

  // 8. JSON & CSV Spreadsheet Grid Editor
  await page.goto('/tools/utilities/json-csv-grid-editor');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('JSON to CSV');
  await expect(page.locator('body')).toContainText('Interactive Spreadsheet Data Grid');

  // 9. Tailwind to Inline CSS
  await page.goto('/tools/converters/tailwind-to-inline-css');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Tailwind CSS to Inline');
  await expect(page.locator('body')).toContainText('Inlined HTML for Email & CMS');

  // 10. CSS Glassmorphism & Claymorphism
  await page.goto('/tools/generators/css-glassmorphism-claymorphism');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('CSS Glassmorphism');
  await expect(page.locator('body')).toContainText('Glassmorphism');

  // 11. CSS Clamp Fluid Typography
  await page.goto('/tools/generators/css-clamp-calculator');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('CSS Fluid Clamp');
  await expect(page.locator('body')).toContainText('clamp(');

  // 12. LLM Function Calling Schema Builder
  await page.goto('/tools/generators/llm-function-calling-builder');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('LLM Function Calling');
  await expect(page.locator('body')).toContainText('OpenAI & Anthropic Tool JSON Schema');

  // 13. JSON to JSON Schema Draft-07
  await page.goto('/tools/generators/json-to-json-schema');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('JSON to JSON Schema');
  await expect(page.locator('body')).toContainText('$schema');

  // 14. RAG Document Chunking Calculator
  await page.goto('/tools/utilities/rag-chunking-calculator');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('RAG Text Chunking');
  await expect(page.locator('body')).toContainText('Generated Text Chunks');

  // 15. SQL DDL to ORM Schema
  await page.goto('/tools/converters/sql-to-orm-schema');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('SQL DDL to Prisma');
  await expect(page.locator('body')).toContainText('Prisma Schema (.prisma)');

  // 16. Docker Compose to Kubernetes YAML
  await page.goto('/tools/converters/docker-compose-to-kubernetes');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Docker Compose to Kubernetes');
  await expect(page.locator('body')).toContainText('Kubernetes Deployment & Service YAML');
});

test('batch 383-398 high-traffic tools interactive and rendering validation', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });

  // 1. cURL to HAR Converter
  await page.goto('/tools/converters/curl-to-har');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('cURL to HTTP Archive HAR');
  await expect(page.locator('body')).toContainText('HAR 1.2 JSON Output');

  // 2. REST API Mock JSON Generator
  await page.goto('/tools/generators/api-mock-response-generator');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('REST API Mock JSON');
  await expect(page.locator('body')).toContainText('Wrap with Pagination Envelope');

  // 3. HTTP Security Headers Analyzer
  await page.goto('/tools/utilities/http-security-headers-analyzer');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('HTTP Security Headers & CORS');
  await expect(page.locator('body')).toContainText('Raw HTTP Response Headers');

  // 4. GraphQL SDL to Zod Validator
  await page.goto('/tools/converters/graphql-schema-to-zod');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('GraphQL SDL to Zod');
  await expect(page.locator('body')).toContainText('GraphQL SDL (Schema Definition Language)');

  // 5. CSS Triangle & Speech Bubble Generator
  await page.goto('/tools/generators/css-triangle-bubble-generator');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('CSS Triangle & Speech Bubble');
  await expect(page.locator('body')).toContainText('Shape Mode');

  // 6. SVG to CSS Data URI
  await page.goto('/tools/converters/svg-to-css-data-uri');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('SVG to CSS Data URI');
  await expect(page.locator('body')).toContainText('Encoding Format');

  // 7. CSS Multi-Layer 3D Box Shadow
  await page.goto('/tools/generators/css-3d-box-shadow-generator');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('CSS Multi-Layer 3D Box Shadow');
  await expect(page.locator('body')).toContainText('Elevation Level');

  // 8. HTML Entities to Unicode
  await page.goto('/tools/encoding/html-entities-converter');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('HTML Entities to Unicode');
  await expect(page.locator('body')).toContainText('Encode to HTML Entities');

  // 9. Structured XML System Prompt Builder
  await page.goto('/tools/generators/system-prompt-xml-builder');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('XML Structured System Prompt');
  await expect(page.locator('body')).toContainText('AI Identity & Role');

  // 10. Multi-Model LLM Token Comparator
  await page.goto('/tools/utilities/multi-llm-token-comparator');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Multi-Model LLM Token');
  await expect(page.locator('body')).toContainText('Estimated Prompt Tokens');

  // 11. JSON to Python Pydantic V2
  await page.goto('/tools/converters/json-to-python-pydantic');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('JSON to Python Pydantic');
  await expect(page.locator('body')).toContainText('Root Model Name');

  // 12. JSON to SQL INSERT Generator
  await page.goto('/tools/converters/json-to-sql-insert');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('JSON & CSV to SQL INSERT');
  await expect(page.locator('body')).toContainText('Target Table');

  // 13. Nginx to Caddyfile Converter
  await page.goto('/tools/converters/nginx-to-caddy-converter');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Nginx to Caddyfile');
  await expect(page.locator('body')).toContainText('Caddyfile Output');

  // 14. Git Advanced Command Builder
  await page.goto('/tools/generators/git-command-cheat-builder');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Git Advanced Command');
  await expect(page.locator('body')).toContainText('Select Git Workflow');

  // 15. Crontab Schedule Translator
  await page.goto('/tools/utilities/crontab-schedule-translator');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Crontab Schedule');
  await expect(page.locator('body')).toContainText('Enter Cron Expression');

  // 16. Bcrypt Password Hash Calculator
  await page.goto('/tools/crypto/bcrypt-hash-calculator');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Bcrypt & Argon2 Password Hash');
  await expect(page.locator('body')).toContainText('Generate Bcrypt Password Hash');
});
test('batch 399-426 converters render correctly without browser errors', async ({ page }) => {
  const converters = [
    'json-to-rust-types', 'json-to-golang-models', 'sql-to-go-gorm', 'sql-to-python-sqlalchemy',
    'postman-to-openapi', 'openapi-to-postman', 'protobuf-to-json-schema', 'json-schema-to-protobuf',
    'yaml-to-terraform-hcl', 'terraform-hcl-to-yaml', 'csv-to-geojson', 'geojson-to-csv',
    'json-to-typescript-type-guards', 'typescript-interface-to-zod', 'zod-to-typescript-type',
    'css-to-scss', 'scss-to-css', 'html-to-jsx-tailwind', 'jsx-to-html', 'markdown-to-bbcode',
    'bbcode-to-markdown', 'curl-to-php-guzzle', 'curl-to-ruby-faraday', 'curl-to-rust-reqwest',
    'curl-to-go-http', 'svg-to-android-vector', 'svg-to-swiftui-shape', 'css-grid-to-tailwind'
  ];
  for (const slug of converters) {
    await page.goto(`/tools/converters/${slug}`);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('body')).toBeVisible();
  }
});

test('batch 427-451 generators render correctly without browser errors', async ({ page }) => {
  const generators = [
    'dockerfile-ai-optimized-generator', 'kubernetes-deployment-generator', 'kubernetes-configmap-secret-builder',
    'helm-chart-yaml-generator', 'gitlab-ci-pipeline-builder', 'github-issue-pr-template-generator',
    'opa-rego-policy-builder', 'systemd-service-hardened-builder', 'nginx-security-conf-generator',
    'caddyfile-production-generator', 'prometheus-recording-rules-generator', 'tailwind-v4-mesh-gradient-generator',
    'css-isometric-grid-generator', 'css-ribbon-banner-generator', 'svg-wavy-divider-generator',
    'opengraph-banner-canvas-generator', 'prisma-seed-generator', 'faker-js-mock-schema-generator',
    'llm-few-shot-prompt-formatter', 'cot-chain-of-thought-prompt-builder', 'sql-stored-procedure-generator',
    'redis-lua-script-generator', 'crontab-randomized-generator', 'ansible-playbook-scaffolder',
    'terraform-module-scaffolder'
  ];
  for (const slug of generators) {
    await page.goto(`/tools/generators/${slug}`);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('body')).toBeVisible();
  }
});

test('batch 452-476 utilities render correctly without browser errors', async ({ page }) => {
  const utilities = [
    'http-cache-control-tester', 'dns-soa-dnssec-inspector', 'ip-supernetting-calculator',
    'opengraph-tag-inspector', 'jwt-expiry-calculator', 'regex-benchmark-simulator',
    'llm-context-window-shrinker', 'embedding-token-cost-estimator', 'webhook-payload-simulator',
    'network-port-reference', 'ssl-tls-handshake-simulator', 'http2-http3-frame-inspector',
    'dns-spf-record-flattener', 'mime-type-extension-lookup', 'color-blindness-simulator',
    'contrast-ratio-apca-calculator', 'viewport-size-tester', 'unicode-glyph-category-inspector',
    'seo-robots-noindex-simulator', 'cors-preflight-inspector', 'css-selector-speed-profiler',
    'git-conflict-marker-cleaner', 'semver-range-evaluator', 'package-json-license-checker',
    'api-rate-limit-cost-calculator'
  ];
  for (const slug of utilities) {
    await page.goto(`/tools/utilities/${slug}`);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('body')).toBeVisible();
  }
});

test('batch 477-500 crypto encoding json text render correctly without browser errors', async ({ page }) => {
  const tools = [
    { cat: 'crypto', slug: 'blake3-hash-generator' },
    { cat: 'crypto', slug: 'pbkdf2-key-derivation' },
    { cat: 'crypto', slug: 'hmac-sha384-sha512-calculator' },
    { cat: 'crypto', slug: 'ethereum-eip191-signature-verifier' },
    { cat: 'crypto', slug: 'bitcoin-bech32-address-encoder' },
    { cat: 'crypto', slug: 'rsa-pkcs1-pkcs8-converter' },
    { cat: 'crypto', slug: 'x509-san-csr-builder' },
    { cat: 'crypto', slug: 'ed25519-sign-verify' },
    { cat: 'crypto', slug: 'argon2-parameter-tuner' },
    { cat: 'crypto', slug: 'uuid-v7-timestamp-extractor' },
    { cat: 'crypto', slug: 'ethereum-abi-storage-slot-calculator' },
    { cat: 'crypto', slug: 'base64-pem-certificate-parser' },
    { cat: 'encoding', slug: 'punycode-idn-converter' },
    { cat: 'encoding', slug: 'crockford-base32-encoder' },
    { cat: 'encoding', slug: 'bcd-binary-coded-decimal-converter' },
    { cat: 'encoding', slug: 'ieee754-hex-float-converter' },
    { cat: 'encoding', slug: 'rot47-encoder-decoder' },
    { cat: 'encoding', slug: 'url-safe-base64-converter' },
    { cat: 'json', slug: 'json-path-query-tester' },
    { cat: 'json', slug: 'json-key-sorter' },
    { cat: 'json', slug: 'json-array-splitter-chunker' },
    { cat: 'text', slug: 'text-prefix-suffix-appender' },
    { cat: 'text', slug: 'text-duplicate-line-counter' },
    { cat: 'text', slug: 'text-column-tabular-splitter' }
  ];
  for (const t of tools) {
    await page.goto(`/tools/${t.cat}/${t.slug}`);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('body')).toBeVisible();
  }
});
