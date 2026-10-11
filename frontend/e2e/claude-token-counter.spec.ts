import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const route = '/tools/utilities/claude-token-counter';
test.beforeEach(async ({ context, baseURL }) => {
  const local = new URL(baseURL!);
  expect(['localhost', '127.0.0.1', '[::1]']).toContain(local.hostname);
  // Block every external request before navigation, including live ad scripts and pixels.
  await context.route('**/*', (request) =>
    new URL(request.request().url()).origin === local.origin ? request.continue() : request.abort(),
  );
});

for (const width of [1365, 390, 320]) {
  test(`Claude calculator copy, accessibility and layout at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto(route);
    await expect(
      page.getByRole('heading', { level: 1, name: 'Claude Token & Cost Estimator' }),
    ).toBeVisible();
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /Estimate Claude input tokens locally/,
    );
    const tool = page.locator('[data-tool-interface]');
    await expect(tool.getByLabel('Input text')).toBeVisible();
    await expect(tool).toContainText('Local approximation only');
    await expect(tool).toContainText('2026-10-11');
    await expect(page.locator('body')).toContainText('not a measured token count');
    const howTo = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((nodes) =>
        nodes
          .map((node) => JSON.parse(node.textContent || '{}'))
          .find((value) => value['@type'] === 'HowTo'),
      );
    expect(howTo.step.map((step: { text: string }) => step.text).join(' ')).not.toMatch(/copy/i);
    await tool.getByRole('button', { name: 'Load 1,000-token estimate example' }).click();
    await expect(tool.getByTestId('total-cost')).toHaveText('$0.007000');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    const audit = await new AxeBuilder({ page })
      .include('[data-tool-interface]')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(
      audit.violations.map(({ id, nodes }) => ({ id, targets: nodes.map(({ target }) => target) })),
    ).toEqual([]);
    await tool.screenshot({ path: test.info().outputPath(`claude-${width}.png`) });
    expect(errors).toEqual([]);
  });
}

test('model, invalid budgets, Unicode, Haiku tier and repeated reset flows', async ({ page }) => {
  await page.goto(route);
  const tool = page.locator('[data-tool-interface]');
  const input = tool.getByLabel('Input text');
  const output = tool.getByLabel('Expected output tokens');
  const model = tool.getByRole('combobox', { name: 'Model / version', exact: true });
  await input.fill('😀汉e\u0301');
  await expect(tool.getByTestId('input-tokens')).toHaveText('2');
  for (const bad of ['', '-1', '1.5', '1e3', '128001']) {
    await output.fill(bad);
    await expect(tool.getByRole('alert')).toBeVisible();
    await expect(output).toHaveAttribute('aria-invalid', 'true');
    await expect(tool.getByTestId('total-cost')).toHaveCount(0);
  }
  await output.fill('500');
  await model.selectOption('claude-haiku-5-5');
  await input.fill('x'.repeat(380_000));
  await expect(tool.getByTestId('total-cost')).toHaveText('$0.010250');
  await input.fill('x'.repeat(380_001));
  await expect(tool.getByTestId('input-tokens')).toHaveText('100001');
  await expect(tool.getByTestId('output-cost')).toHaveText('$0.001250');
  for (let i = 0; i < 2; i++) {
    await tool.getByRole('button', { name: 'Reset', exact: true }).click();
    await expect(model).toHaveValue('claude-sonnet-5-5');
    await expect(input).toHaveValue('');
    await expect(output).toHaveValue('0');
    await tool.getByRole('button', { name: 'Load 1,000-token estimate example' }).focus();
    await page.keyboard.press('Enter');
    await expect(tool.getByTestId('total-cost')).toHaveText('$0.007000');
    await model.selectOption('claude-opus-5-5');
    await expect(tool.getByTestId('total-cost')).toHaveText('$0.014000');
  }
});

test('all seven localized pages retain the working calculator and honest how-to', async ({
  page,
}) => {
  for (const locale of ['en', 'tr', 'de', 'es', 'fr', 'ru', 'zh']) {
    await page.goto(locale === 'en' ? route : `/${locale}${route}`);
    const tool = page.locator('[data-tool-interface]');
    await expect(tool.locator('textarea')).toBeVisible();
    await expect(tool).toContainText('UTF-16');
    await expect(tool).not.toContainText('claude.approximation');
    await tool
      .locator('button')
      .filter({ hasText: /1[., ]?000/ })
      .click();
    await expect(tool.getByTestId('total-cost')).toHaveText('$0.007000');
    const howTo = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((nodes) =>
        nodes
          .map((node) => JSON.parse(node.textContent || '{}'))
          .find((value) => value['@type'] === 'HowTo'),
      );
    expect(howTo.step).toHaveLength(3);
    expect(howTo.step[0].text).not.toMatch(/copy|export/i);
  }
});
