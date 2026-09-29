import { describe, expect, it } from 'vitest';
import { toolCatalog } from '@/lib/api';
import { getLocalizedToolMeta, NON_DEFAULT_LOCALES, type Language } from '@/lib/i18nRouting';
import { toolPageContent } from '@/lib/toolPageContent';
import { translations } from '@/translations';
import {
  MAX_TITLE_LENGTH,
  TITLE_SUFFIX,
  buildLocalizedToolTitle,
  resolveTitle,
  resolveToolTitle,
  shortenTitle,
  stripTitleBoilerplate,
  titleLength,
} from './toolTitle';

const allTools = Object.entries(toolPageContent).flatMap(([category, tools]) =>
  Object.entries(tools).map(([slug, tool]) => ({ category, slug, tool })),
);

const STOP_WORDS = new Set([
  'a',
  'and',
  'the',
  'to',
  'of',
  'for',
  'in',
  'online',
  'free',
  'tool',
  'tools',
  'with',
  'vs',
]);
const squash = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');

describe('stripTitleBoilerplate', () => {
  it.each([
    ['Base64URL Encoder & Decoder Online Free', 'Base64URL Encoder & Decoder'],
    ['JSON Key Sorter Online Free – Instant & Private', 'JSON Key Sorter'],
    ['CSS Grid Builder – Free Online Developer Tool', 'CSS Grid Builder'],
    ['Word Counter - Free Online Tool', 'Word Counter'],
    ['JSON Formatter & Validator Online', 'JSON Formatter & Validator Online'],
  ])('%s -> %s', (input, expected) => {
    expect(stripTitleBoilerplate(input)).toBe(expected);
  });
});

describe('shortenTitle', () => {
  it('leaves short titles untouched', () => {
    expect(shortenTitle('JSON Formatter', 60)).toBe('JSON Formatter');
  });

  it('drops a trailing tagline before cutting words', () => {
    expect(
      shortenTitle('Regex Tester Online – Matches, Groups, Flags and Replacement Preview', 40),
    ).toBe('Regex Tester Online');
  });

  it('cuts at a word boundary without a dangling connective', () => {
    const shortened = shortenTitle(
      'Kubernetes Ingress Controller Configuration Builder and Validator',
      52,
    );
    expect(titleLength(shortened)).toBeLessThanOrEqual(52);
    expect(shortened).toBe('Kubernetes Ingress Controller Configuration Builder');
    const dangling = shortenTitle(
      'Kubernetes Ingress Controller Configuration Builder and Validator',
      55,
    );
    expect(dangling).not.toMatch(/\b(and|&)$/);
  });

  it('never cuts in the middle of a word', () => {
    const input = 'Supercalifragilistic Extraordinarily Long Localized Tool Name Example';
    const shortened = shortenTitle(input, 30);
    expect(input.startsWith(shortened)).toBe(true);
    expect(input.charAt(shortened.length)).toBe(' ');
  });

  it('hard-cuts space-less (CJK) titles', () => {
    const shortened = shortenTitle('测'.repeat(80), 60);
    expect(titleLength(shortened)).toBe(60);
  });
});

describe('resolveTitle', () => {
  it('keeps the site suffix when the body is <= 48 chars', () => {
    const resolved = resolveTitle('JSON Formatter & Validator Online');
    expect(resolved.title).toBe('JSON Formatter & Validator Online');
    expect(resolved.finalTitle).toBe('JSON Formatter & Validator Online | DevsTools');
  });

  it('drops the suffix (absolute title) when the body is 49-60 chars', () => {
    const body = 'Nginx to Caddyfile & Apache Reverse Proxy Converter';
    expect(titleLength(body)).toBeGreaterThan(48);
    const resolved = resolveTitle(body);
    expect(resolved.title).toEqual({ absolute: body });
    expect(resolved.finalTitle).toBe(body);
    expect(resolved.finalTitle.endsWith(TITLE_SUFFIX)).toBe(false);
  });

  it('shortens bodies longer than 60 chars', () => {
    const resolved = resolveTitle(
      'Extremely Verbose Developer Utility Name For Converting Things Between Formats Online',
    );
    expect(titleLength(resolved.finalTitle)).toBeLessThanOrEqual(MAX_TITLE_LENGTH);
  });

  it('can skip boilerplate stripping (category titles)', () => {
    expect(
      resolveTitle('Code Formatters - Free Online Developer Tools', { stripBoilerplate: false })
        .finalTitle,
    ).toBe('Code Formatters - Free Online Developer Tools | DevsTools');
  });
});

describe('resolveToolTitle', () => {
  it('falls back to "<name> Online" without metadataTitle', () => {
    expect(resolveToolTitle({ name: 'Word Counter' }).finalTitle).toBe(
      'Word Counter Online | DevsTools',
    );
  });
});

describe('English tool titles', () => {
  const resolved = allTools.map(({ category, slug, tool }) => ({
    category,
    slug,
    tool,
    ...resolveToolTitle(tool),
  }));

  it('covers every tool in the catalog', () => {
    expect(resolved.length).toBe(toolCatalog.length);
  });

  it('every final title is non-empty and <= 60 characters', () => {
    const tooLong = resolved.filter(
      (item) =>
        item.finalTitle.trim().length === 0 || titleLength(item.finalTitle) > MAX_TITLE_LENGTH,
    );
    expect(tooLong.map((item) => `${item.slug}: ${item.finalTitle}`)).toEqual([]);
  });

  it('every final title is unique', () => {
    const seen = new Map<string, string>();
    const duplicates: string[] = [];
    for (const item of resolved) {
      const key = item.finalTitle.toLowerCase();
      const previous = seen.get(key);
      if (previous) duplicates.push(`${previous} / ${item.slug}: ${item.finalTitle}`);
      seen.set(key, item.slug);
    }
    expect(duplicates).toEqual([]);
  });

  it('no title carries the old boilerplate', () => {
    const boilerplate = resolved.filter((item) =>
      /online free|instant & private|free online (developer )?tool/i.test(item.finalTitle),
    );
    expect(boilerplate.map((item) => item.finalTitle)).toEqual([]);
  });

  it('every title keeps at least half of the tool name keywords', () => {
    const weak: string[] = [];
    for (const item of resolved) {
      const words = item.tool.name
        .toLowerCase()
        .split(/[^a-z0-9.#+]+/)
        .filter((word) => word && !STOP_WORDS.has(word));
      if (!words.length) continue;
      const title = squash(item.socialTitle);
      const hits = words.filter((word) => title.includes(squash(word).slice(0, 4))).length;
      if (hits / words.length < 0.5)
        weak.push(`${item.slug}: ${item.tool.name} => ${item.socialTitle}`);
    }
    expect(weak).toEqual([]);
  });

  it('shows the site suffix only when it fits', () => {
    for (const item of resolved) {
      if (item.finalTitle.endsWith(TITLE_SUFFIX)) {
        expect(typeof item.title).toBe('string');
      } else {
        expect(item.title).toEqual({ absolute: item.finalTitle });
      }
    }
  });
});

describe('localized tool titles', () => {
  it.each(NON_DEFAULT_LOCALES)('%s titles are <= 60 characters', (locale) => {
    const tagline = translations[locale as Language]['meta.freeOnlineTool'] || 'Free Online Tool';
    const tooLong: string[] = [];
    let unique = 0;
    const seen = new Set<string>();
    for (const entry of toolCatalog) {
      const catalogTool: { slug: string; name: string; shortDescription?: string } = entry;
      const localized = getLocalizedToolMeta(
        catalogTool.slug,
        locale as Language,
        catalogTool.name,
        catalogTool.shortDescription || catalogTool.name,
      );
      const title = buildLocalizedToolTitle(localized.name, tagline);
      expect(title.trim().length).toBeGreaterThan(0);
      if (titleLength(title) > MAX_TITLE_LENGTH) tooLong.push(`${catalogTool.slug}: ${title}`);
      if (!seen.has(title)) {
        seen.add(title);
        unique += 1;
      }
    }
    expect(tooLong).toEqual([]);
    expect(unique).toBeGreaterThan(toolCatalog.length * 0.9);
  });

  it('prefers "<name> – <tagline>", then "<name> | DevsTools", then the bare name', () => {
    expect(buildLocalizedToolTitle('Generador JSON', 'Herramienta Online Gratuita')).toBe(
      'Generador JSON – Herramienta Online Gratuita',
    );
    const mid = 'Conversor de JSON a Tipos TypeScript Avanzado'; // 45 chars
    expect(buildLocalizedToolTitle(mid, 'Herramienta Online Gratuita')).toBe(
      `${mid} | DevsTools`.length <= 60 ? `${mid} | DevsTools` : mid,
    );
    const long = 'Generador de modelos Pydantic V2 y TypedDict de Python desde JSON completo';
    const result = buildLocalizedToolTitle(long, 'Herramienta Online Gratuita');
    expect(titleLength(result)).toBeLessThanOrEqual(MAX_TITLE_LENGTH);
    expect(long.startsWith(result)).toBe(true);
    expect(result).not.toMatch(/\s(y|de|desde|con|para)$/i);
  });
});
