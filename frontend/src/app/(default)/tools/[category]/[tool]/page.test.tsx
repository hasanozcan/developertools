import type { ReactElement, ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/components/tools/ToolPageWrapper', () => ({ default: () => null }));
vi.mock('@/components/tools/ToolRenderer', () => ({ default: () => null }));

import ToolPage from './page';
import { enhancedTools } from '@/translations/enhancedTools';
import type { ToolSeoSection } from '@/lib/toolSeoContent';

type Props = {
  children?: ReactNode;
  dangerouslySetInnerHTML?: { __html: string };
  [key: string]: unknown;
};

async function renderToolPage(locale: 'en' | 'tr', tool = 'json-formatter', category = 'json') {
  const element = (await ToolPage({
    params: Promise.resolve({ category, tool }),
    locale,
  })) as ReactElement<Props>;
  const children = (
    Array.isArray(element.props.children) ? element.props.children : [element.props.children]
  ) as ReactElement<Props>[];
  const rawJsonLd = children
    .filter((child) => child?.type === 'script')
    .map((child) => child.props.dangerouslySetInnerHTML!.__html);
  const jsonLd = rawJsonLd.map((html) => JSON.parse(html));
  const wrapper = children.find((child) => child && child.type !== 'script')!;
  const byType = (type: string) => jsonLd.find((node) => node['@type'] === type);
  return { rawJsonLd, jsonLd, byType, wrapperProps: wrapper.props };
}

describe('ToolPage structured data', () => {
  it('leads SHA-256 with the irreversible-hash explanation and keeps a single existing decode FAQ', async () => {
    const { byType, wrapperProps } = await renderToolPage('en', 'sha256-hash', 'crypto');
    const firstAnswer = (wrapperProps.answerSections as ToolSeoSection[])[0].paragraphs!.join(' ');
    expect(firstAnswer).toContain('a hash cannot be decoded into the original text or file');
    expect(firstAnswer).toMatch(/generate a digest.*trusted expected checksum/);
    expect(byType('FAQPage').mainEntity.filter((faq: { name: string }) => /decoded back/.test(faq.name))).toHaveLength(1);
  });

  it.each([
    ['sha256-hash', 'crypto', 'verify-sha256-file-checksum'],
    ['unicode-escape', 'encoding', 'decode-unicode-escapes'],
    ['uuid-generator', 'generators', 'uuid-v4-vs-v7'],
    ['uuid-v7-generator', 'generators', 'uuid-v4-vs-v7'],
  ])('passes the existing guide to %s on English and Turkish pages', async (tool, category, guide) => {
    for (const locale of ['en', 'tr'] as const) {
      const { wrapperProps } = await renderToolPage(locale, tool, category);
      expect(wrapperProps.relatedGuides).toEqual([expect.objectContaining({ href: `/guides/${guide}` })]);
    }
  });

  it('keeps English URLs and names on the default locale', async () => {
    const { byType, wrapperProps } = await renderToolPage('en');
    const breadcrumb = byType('BreadcrumbList');
    expect(breadcrumb.itemListElement[0]).toMatchObject({
      name: 'Home',
      item: 'https://devstools.app',
    });
    expect(breadcrumb.itemListElement[1].item).toBe('https://devstools.app/tools/json');
    expect(byType('WebApplication').inLanguage).toBe('en');
    expect(byType('HowTo').name).toBe('How to use JSON Formatter');
    for (const item of byType('ItemList').itemListElement) {
      expect(item.url).toMatch(/^https:\/\/devstools\.app\/tools\//);
    }
    expect(wrapperProps.howToUseSteps).not.toEqual([]);
  });

  it('localizes names and prefixes every URL on non-English locales', async () => {
    const { jsonLd, byType, wrapperProps } = await renderToolPage('tr');
    const breadcrumb = byType('BreadcrumbList');
    expect(breadcrumb.itemListElement[0]).toMatchObject({
      name: 'Ana Sayfa',
      item: 'https://devstools.app/tr',
    });
    expect(breadcrumb.itemListElement[1]).toMatchObject({
      name: 'JSON Araçları',
      item: 'https://devstools.app/tr/tools/json',
    });

    const app = byType('WebApplication');
    expect(app.inLanguage).toBe('tr');
    expect(app.url).toBe('https://devstools.app/tr/tools/json/json-formatter');
    // The OG image route only exists under the unprefixed path.
    expect(app.image).toBe('https://devstools.app/tools/json/json-formatter/opengraph-image');

    const related = byType('ItemList');
    expect(related.itemListElement.length).toBeGreaterThan(0);
    for (const item of related.itemListElement) {
      expect(item.url).toMatch(/^https:\/\/devstools\.app\/tr\/tools\//);
    }

    const howTo = byType('HowTo');
    expect(howTo.inLanguage).toBe('tr');
    expect(howTo.step[0].name).toBe('Adım 1');
    expect(howTo.step[0].text).toBe('Yukarıdaki metin alanına girdinizi girin veya yapıştırın');
    expect(wrapperProps.howToUseSteps).toEqual(
      howTo.step.map((step: { text: string }) => step.text),
    );

    const faqQuestions = byType('FAQPage').mainEntity.map((q: { name: string }) => q.name);
    expect(faqQuestions.join(' ')).not.toMatch(
      /Do I need to install|What should I do with the result/,
    );
    expect(JSON.stringify(jsonLd)).not.toContain('"name":"Home"');
  });

  it('serializes JSON-LD safely for inline script elements', async () => {
    const { rawJsonLd, byType } = await renderToolPage('en', 'schema-org-generator', 'generators');
    expect(JSON.stringify(byType('FAQPage'))).toContain('<script');
    expect(rawJsonLd).toHaveLength(5);
    for (const html of rawJsonLd) expect(html).not.toMatch(/[<>&]/);
  });

  it('drops the templated "What is {tool}?" FAQ that repeats the description', async () => {
    const { byType } = await renderToolPage('en', 'json-flatten-unflatten');
    const questions = byType('FAQPage').mainEntity.map((q: { name: string }) => q.name);
    expect(questions).not.toContain('What is JSON Deep Object Flattener?');
    expect(questions).toContain('Is my data private?');
  });

  it('keeps hand-written definition FAQs', async () => {
    const { byType } = await renderToolPage('en');
    const questions = byType('FAQPage').mainEntity.map((q: { name: string }) => q.name);
    expect(questions).toContain('What is JSON?');
  });

  it('passes the enhancedTools translation to the wrapper so the H1 matches the title', async () => {
    // The tr translation dict only carries an English placeholder for this tool.
    const turkishName = enhancedTools['openapi-to-postman'].name.tr;
    expect(turkishName).toBeTruthy();
    expect(turkishName).not.toBe(enhancedTools['openapi-to-postman'].name.en);

    const { byType, wrapperProps } = await renderToolPage('tr', 'openapi-to-postman', 'converters');
    expect(wrapperProps.localizedName).toBe(turkishName);
    expect(wrapperProps.localizedDescription).toBe(
      enhancedTools['openapi-to-postman'].description.tr,
    );
    expect(byType('WebApplication').name).toBe(turkishName);
    expect(byType('BreadcrumbList').itemListElement[2].name).toBe(turkishName);
    expect(byType('HowTo').name).toContain(turkishName);
  });

  it('does not pass localized overrides on the default locale', async () => {
    const { wrapperProps } = await renderToolPage('en', 'openapi-to-postman', 'converters');
    expect(wrapperProps.localizedName).toBeUndefined();
    expect(wrapperProps.localizedDescription).toBeUndefined();
  });
});
