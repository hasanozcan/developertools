import { expect, test } from '@playwright/test';
import { translations, type Language } from '../src/translations';
import { enUi } from '../src/translations/ui/en';
import { trUi } from '../src/translations/ui/tr';
import { deUi } from '../src/translations/ui/de';
import { esUi } from '../src/translations/ui/es';
import { frUi } from '../src/translations/ui/fr';
import { ruUi } from '../src/translations/ui/ru';
import { zhUi } from '../src/translations/ui/zh';
import { trPageCopy } from '../src/translations/pageCopy/tr';
import { dePageCopy } from '../src/translations/pageCopy/de';
import { esPageCopy } from '../src/translations/pageCopy/es';
import { frPageCopy } from '../src/translations/pageCopy/fr';
import { ruPageCopy } from '../src/translations/pageCopy/ru';
import { zhPageCopy } from '../src/translations/pageCopy/zh';
import { interpolateText, textTranslationKey } from '../src/lib/localizedText';
import { toolPageContent } from '../src/lib/toolPageContent';
import { removeTemplatedDefinitionFaq } from '../src/lib/toolSeoContent';
import { languageNames } from '../src/context/LanguageContext';

const dictionaries = { en: enUi, tr: trUi, de: deUi, es: esUi, fr: frUi, ru: ruUi, zh: zhUi };
const pages = {
  en: {},
  tr: trPageCopy,
  de: dePageCopy,
  es: esPageCopy,
  fr: frPageCopy,
  ru: ruPageCopy,
  zh: zhPageCopy,
};
const locales = Object.keys(dictionaries) as Language[];
const abcSha256 = 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad';
const curlContent = toolPageContent.utilities['curl-to-fetch'];
const curlQuestion = removeTemplatedDefinitionFaq(curlContent.faqs, curlContent.name, [
  curlContent.description,
  curlContent.longDescription,
])[0].question;
const routes = [
  ['utilities', 'curl-to-fetch'],
  ['crypto', 'sha256-hash'],
  ['crypto', 'file-checksum-comparator'],
] as const;
const localPath = (locale: Language, path: string) =>
  `${locale === 'en' ? '' : `/${locale}`}${path}`;

test.beforeEach(async ({ context, baseURL }) => {
  const origin = new URL(baseURL!).origin;
  expect(['127.0.0.1', 'localhost']).toContain(new URL(origin).hostname);
  await context.route('**/*', (route) =>
    new URL(route.request().url()).origin === origin ? route.continue() : route.abort(),
  );
});

test('mobile menu changes language by keyboard and preserves the current tool', async ({
  page,
}) => {
  for (const viewport of [
    { width: 320, height: 568 },
    { width: 390, height: 640 },
  ]) {
    await page.setViewportSize(viewport);
    for (const locale of locales) {
      const start = locale === 'en' ? 'tr' : 'en';
      const path = '/tools/utilities/curl-to-fetch';
      await page.goto(localPath(start, path));
      const menuButton = page.locator('button[aria-controls="mobile-navigation"]');
      await menuButton.focus();
      await page.keyboard.press('Enter');
      const navigation = page.locator('#mobile-navigation');
      await expect(navigation).toBeVisible();
      const languageButton = navigation.locator('button[aria-haspopup="listbox"]');
      await expect(languageButton).toBeVisible();
      await languageButton.focus();
      await page.keyboard.press('Enter');
      await expect(navigation.getByRole('listbox')).toBeVisible();
      await expect(navigation.getByRole('option').last()).toBeInViewport({ ratio: 1 });
      await page.keyboard.press('Tab');
      await expect(navigation.getByRole('option').first()).toBeFocused();
      await page.keyboard.press('Escape');
      await expect(navigation.getByRole('listbox')).toHaveCount(0);
      await expect(languageButton).toBeFocused();
      await page.keyboard.press('Enter');
      for (let i = 0; i <= locales.indexOf(locale); i++) await page.keyboard.press('Tab');
      await expect(
        navigation.getByRole('option').filter({ hasText: languageNames[locale] }),
      ).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(localPath(locale, path));
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(
        translations[locale]['toolName.curl-to-fetch'],
      );
      await page.locator('button[aria-controls="mobile-navigation"]').focus();
      await page.keyboard.press('Enter');
      await expect(
        page.locator('#mobile-navigation button[aria-haspopup="listbox"]'),
      ).toHaveAttribute(
        'aria-label',
        interpolateText(dictionaries[locale]['common.currentLanguage'], {
          selection: dictionaries[locale]['common.selectLanguage'],
          language: languageNames[locale],
        }),
      );
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
    }
  }
});

for (const locale of locales) {
  const ui = dictionaries[locale];
  const metadata = translations[locale];
  test(`${locale}: translated controls, keyboard conversion, FAQs, search, checksums and 404 links`, async ({
    page,
  }) => {
    const errors: string[] = [];
    const targetRequests: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('request', (request) => {
      if (/example\.(com|test)$/.test(new URL(request.url()).hostname))
        targetRequests.push(request.url());
    });
    await page.goto(localPath(locale, '/tools/utilities/curl-to-fetch'));
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      metadata['toolName.curl-to-fetch'],
    );
    const converter = page.locator('[aria-labelledby="curl-converter-heading"]');
    const input = converter.getByRole('textbox', {
      name: ui['tool.curl.pastePlaceholder'],
      exact: true,
    });
    const output = converter.getByRole('textbox', {
      name: ui['tool.curl.convertedFetch'],
      exact: true,
    });
    await converter
      .getByRole('button', { name: `${ui['common.loadSample']}: JSON POST`, exact: true })
      .focus();
    await page.keyboard.press('Enter');
    await expect(input).toHaveValue(/curl.*--request POST/s);
    await input.focus();
    await page.keyboard.press('Control+Enter');
    await expect(output).toHaveValue(/method: "POST"/);
    await expect(output).toHaveValue(/\[REDACTED\]/);
    await input.fill('curl --form file=@payload.json https://example.com');
    await expect(output).toHaveValue('');
    await converter.getByRole('button', { name: ui['tool.curl.convert'], exact: true }).click();
    await expect(converter.getByRole('alert')).toHaveText(ui['tool.curl.converterError']);
    await expect(output).toHaveValue('');

    const question =
      locale === 'en'
        ? curlQuestion
        : (pages[locale] as Record<string, string>)[textTranslationKey(curlQuestion, 'pageText')];
    expect(question).toBeTruthy();
    await expect(page.getByText(question, { exact: true })).toBeVisible();
    const faqQuestions = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) => {
        const questions: string[] = [];
        function visit(value: unknown) {
          if (Array.isArray(value)) return value.forEach(visit);
          if (!value || typeof value !== 'object') return;
          const entry = value as Record<string, unknown>;
          if (entry['@type'] === 'FAQPage' && Array.isArray(entry.mainEntity)) {
            questions.push(...entry.mainEntity.map((item) => (item as { name: string }).name));
          }
          if (entry['@graph']) visit(entry['@graph']);
        }
        scripts.forEach((script) => visit(JSON.parse(script.textContent || '{}')));
        return questions;
      });
    expect(faqQuestions).toContain(question);
    expect(targetRequests).toEqual([]);

    await page.locator('button[aria-controls="tool-search-results"]').click();
    const search = page.locator('input[role="combobox"][aria-controls="tool-search-results"]');
    await search.fill('json formatter');
    const option = page
      .getByRole('option')
      .filter({ hasText: metadata['toolName.json-formatter'] })
      .first();
    await expect(option).toBeVisible();
    await search.press('ArrowUp');
    await search.press('ArrowDown');
    await expect(option).toHaveAttribute('aria-selected', 'true');
    await search.press('Enter');
    await expect(page).toHaveURL(localPath(locale, '/tools/json/json-formatter'));

    await page.goto(localPath(locale, '/tools/crypto/file-checksum-comparator'));
    const checksum = page.locator('[data-tool-slot]');
    await checksum.locator('textarea').first().fill('abc');
    const sha256 = checksum.getByRole('textbox', {
      name: interpolateText(ui['tool.fileChecksum.algorithmLabel'], { algorithm: 'SHA-256' }),
      exact: true,
    });
    await expect(sha256).toBeVisible();
    await expect(sha256).toHaveValue(abcSha256);
    await expect(
      checksum.getByRole('textbox', {
        name: interpolateText(ui['tool.fileChecksum.algorithmLabel'], { algorithm: 'SHA-384' }),
        exact: true,
      }),
    ).toHaveValue(/^[a-f0-9]{96}$/);
    const expectedHash = checksum.locator('#checksum-expected');
    await expectedHash.fill(abcSha256);
    await expect(checksum.getByRole('status')).toContainText(ui['uiText.35aba754']);
    await expectedHash.fill('0'.repeat(64));
    await expect(checksum.getByRole('status')).toContainText(ui['uiText.d53946be']);
    await expect(sha256).toHaveValue(abcSha256);

    await page.goto(localPath(locale, '/tools/crypto/translation-test-missing-tool'));
    const notFound = page.getByRole('main');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(ui['notFound.title']);
    await expect(
      notFound.getByRole('link', { name: ui['notFound.home'], exact: true }),
    ).toHaveAttribute('href', locale === 'en' ? '/' : `/${locale}`);
    await expect(
      notFound.getByRole('link', { name: ui['notFound.collections'], exact: true }),
    ).toHaveAttribute('href', localPath(locale, '/collections'));
    expect(await page.locator('main').innerText()).not.toMatch(/(?:uiText|pageText)\.[0-9a-f]{8}/);
    expect(errors).toEqual([]);
  });

  test(`${locale}: all three approved pages retain translated copy and fit mobile widths`, async ({
    page,
  }) => {
    for (const width of [320, 390]) {
      await page.setViewportSize({ width, height: 900 });
      for (const [category, slug] of routes) {
        await page.goto(localPath(locale, `/tools/${category}/${slug}`));
        await expect(page.locator('html')).toHaveAttribute('lang', locale);
        await expect(page.getByRole('heading', { level: 1 })).toHaveText(
          metadata[`toolName.${slug}`],
        );
        await expect(page.locator('[data-tool-slot] textarea').first()).toBeVisible();
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        ).toBe(true);
        expect(await page.locator('main').innerText()).not.toMatch(
          /(?:uiText|pageText)\.[0-9a-f]{8}/,
        );
      }
    }
    await page
      .locator('[data-tool-interface]')
      .screenshot({ path: test.info().outputPath(`${locale}-checksum-mobile.png`) });
  });
}
