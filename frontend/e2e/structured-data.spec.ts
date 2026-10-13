import { translations, type Language } from '../src/translations';
import { expect, test, type Page } from './fixtures';

async function structuredData(page: Page) {
  return page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((scripts) => scripts.map((script) => JSON.parse(script.textContent || '{}')));
}

test('blocks Vercel measurement requests before any page navigation', async ({ page }) => {
  await page.goto('/');
  for (const path of ['/_vercel/insights/script.js', '/_vercel/speed-insights/script.js']) {
    const result = await page.evaluate(async (url) => {
      try {
        await fetch(url);
        return 'sent';
      } catch {
        return 'blocked';
      }
    }, path);
    expect(result).toBe('blocked');
  }
});

for (const [device, viewport] of [
  ['desktop', { width: 1440, height: 900 }],
  ['mobile', { width: 390, height: 844 }],
] as const) {
  test.describe(`${device} structured data`, () => {
    test.use({ viewport });

    test('matches visible homepage copy and preserves tool/category image semantics', async ({
      page,
    }) => {
      for (const locale of ['en', 'tr', 'de'] as Language[]) {
        const prefix = locale === 'en' ? '' : `/${locale}`;
        await page.goto(prefix || '/');
        const homepage = (await structuredData(page)).find(
          (node) => node['@type'] === 'CollectionPage',
        );
        expect(homepage).toMatchObject({
          name: translations[locale]['home.title'],
          description: translations[locale]['home.subtitle'],
          inLanguage: locale,
        });
        await expect(page.locator('h1').first()).toHaveText(homepage.name);

        await page.goto(`${prefix}/tools/encoding`);
        const encoding = await structuredData(page);
        for (const type of ['CollectionPage', 'WebApplication']) {
          expect(encoding.find((node) => node['@type'] === type)).not.toHaveProperty(
            'dateModified',
          );
        }

        await page.goto(`${prefix}/tools/json/json-formatter`);
        const app = (await structuredData(page)).find((node) => node['@type'] === 'WebApplication');
        expect(app.image).toBe('https://devstools.app/tools/json/json-formatter/opengraph-image');
        expect(app).not.toHaveProperty('screenshot');
      }
    });
  });
}
