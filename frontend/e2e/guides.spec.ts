import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { developerGuides } from '../src/lib/developerGuides';

test('guides are discoverable, server-rendered, and connected to their tools', async ({
  page,
  request,
}) => {
  const sitemap = await (await request.get('/sitemap.xml')).text();
  await page.goto('/');
  await expect(page.locator('[data-guide-cards="true"]')).toBeVisible();
  await page.getByRole('link', { name: 'All guides', exact: false }).click();
  await expect(page).toHaveURL(/\/guides$/);

  for (const guide of developerGuides) {
    const path = `/guides/${guide.slug}`;
    expect(sitemap).toContain(`https://devstools.app${path}`);
    const response = await request.get(path);
    expect(response.ok()).toBeTruthy();
    const html = await response.text();
    expect(html).toContain(guide.title);
    expect(html).toContain('application/ld+json');

    await page.locator(`a[href="${path}"]`).first().click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(guide.title);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://devstools.app${path}`,
    );
    await expect(page.locator('link[rel="alternate"][hreflang="tr"]')).toHaveCount(0);
    await expect(page.locator('[data-code-example="true"]').first()).toBeVisible();
    await page.screenshot({ path: test.info().outputPath(`${guide.slug}.png`), fullPage: true });

    await page.getByRole('link', { name: `Open ${guide.toolName}`, exact: false }).click();
    await expect(page).toHaveURL(new RegExp(`${guide.toolHref}$`));
    await expect(page.locator('[data-code-example="true"]')).toHaveCount(2);
    await expect(page.locator('[data-related-guides="true"] a')).toHaveAttribute('href', path);
    await page.locator('[data-related-guides="true"] a').click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await page.getByRole('link', { name: 'Developer guides', exact: true }).click();
  }
  expect((await request.get('/guides/not-a-guide')).status()).toBe(404);
  expect((await request.get('/tr/guides')).status()).toBe(404);
});

test('guide code can be copied and pages fit mobile screens without serious accessibility issues', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.setViewportSize({ width: 390, height: 844 });
  for (const guide of developerGuides) {
    await page.goto(`/guides/${guide.slug}`);
    const example = page.locator('[data-code-example="true"]').first();
    const expectedCode = await example.locator('code').innerText();
    await example.getByRole('button', { name: 'Copy', exact: true }).click();
    await expect(example.getByRole('button', { name: 'Copied!', exact: false })).toBeVisible();
    const copiedCode = await page.evaluate(() => navigator.clipboard.readText());
    expect(copiedCode.replace(/\r\n/g, '\n')).toBe(expectedCode.replace(/\r\n/g, '\n'));
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(
      results.violations
        .filter((violation) => violation.impact === 'critical' || violation.impact === 'serious')
        .map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) })),
    ).toEqual([]);
    await page.screenshot({
      path: test.info().outputPath(`${guide.slug}-mobile.png`),
      fullPage: true,
    });
  }
});
