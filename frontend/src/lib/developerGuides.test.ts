// @vitest-environment node
import { File } from 'node:buffer';
import { webcrypto } from 'node:crypto';
import { TextEncoder } from 'node:util';
import { runInNewContext } from 'node:vm';
import { describe, expect, it } from 'vitest';
import { developerGuides, getDeveloperGuidesForTool, getLocalizedGuide } from './developerGuides';
import { guideLinkCopy } from './guideLinkCopy';
import {
  bcryptArgon2Examples,
  jsonSchemaExamples,
  jwtExamples,
  sha256Examples,
  unicodeExamples,
  uuidExamples,
} from './guideExamples';
import { SUPPORTED_LOCALES } from './i18nRouting';
import { findCatalogTool } from './api';
import { getToolCollection } from './toolCollections';

async function runJavaScript(code: string): Promise<string[]> {
  const output: string[] = [];
  await runInNewContext(
    `(async () => {${code}\n})()`,
    {
      atob,
      btoa,
      crypto: webcrypto,
      File,
      TextEncoder,
      console: { log: (value: unknown) => output.push(String(value)) },
    },
    { timeout: 1_000 },
  );
  return output;
}

describe('developer guides', () => {
  it('reuses guides across canonical tool pairs', () => {
    expect(getDeveloperGuidesForTool('uuid-v7-generator')).toEqual(getDeveloperGuidesForTool('uuid-generator'));
    expect(getDeveloperGuidesForTool('uuid-v7-generator')).toHaveLength(1);
    expect(getDeveloperGuidesForTool('jwt-generator')).toEqual(getDeveloperGuidesForTool('jwt-decoder'));
    expect(getDeveloperGuidesForTool('argon2-hash-generator')).toEqual(getDeveloperGuidesForTool('bcrypt-generator'));
    expect(getDeveloperGuidesForTool('json-formatter')).toEqual(getDeveloperGuidesForTool('json-schema-validator'));
    expect(getDeveloperGuidesForTool('not-a-tool')).toEqual([]);
  });

  it('localizes all 6 guides across all 7 languages', () => {
    expect(developerGuides).toHaveLength(6);
    for (const guide of developerGuides) {
      for (const locale of SUPPORTED_LOCALES) {
        const localized = getLocalizedGuide(guide, locale);
        expect(localized.title.trim()).toBeTruthy();
        expect(localized.description.trim()).toBeTruthy();
        expect(localized.sections.length).toBe(guide.sections.length);
        if (locale !== 'en') {
          expect(localized.title).not.toBe(guide.title);
        }
      }
    }
  });

  it('has localized link labels for every published guide without inventing routes', () => {
    const hrefs = developerGuides.map((guide) => `/guides/${guide.slug}`).sort();
    for (const copy of Object.values(guideLinkCopy)) {
      expect(Object.keys(copy.labels).sort()).toEqual(hrefs);
      expect([copy.heading, copy.english, copy.extractTimestamp, ...Object.values(copy.labels)].every((label) => label.trim())).toBe(true);
    }
  });

  it('links each guide to a canonical tool and an existing collection', () => {
    for (const guide of developerGuides) {
      const tool = findCatalogTool(guide.toolSlug);
      expect(guide.toolHref).toBe(`/tools/${tool?.categorySlug}/${tool?.slug}`);
      expect(getToolCollection(guide.collectionHref.split('/').pop()!)).toBeDefined();
    }
  });

  it('runs the published SHA-256 text and file example against a known digest', async () => {
    expect(await runJavaScript(sha256Examples[0].code)).toEqual([
      'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
      'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
    ]);
  });

  it('runs the published Unicode example with a surrogate pair', async () => {
    expect(await runJavaScript(unicodeExamples[0].code)).toEqual(['Aé😀', '😀']);
  });

  it('runs the published UUID example and generates six distinct v4 identifiers', async () => {
    const [single, batch] = await runJavaScript(uuidExamples[0].code);
    const ids = [single, ...batch.split('\n')];
    expect(ids).toHaveLength(6);
    expect(new Set(ids).size).toBe(6);
    for (const id of ids)
      expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  it('runs the published JWT Web Crypto verification example', async () => {
    expect(await runJavaScript(jwtExamples[0].code)).toEqual(['true']);
  });

  it('runs the published Bcrypt vs Argon2id PHC parser example', async () => {
    expect(await runJavaScript(bcryptArgon2Examples[0].code)).toEqual([
      'bcrypt-cost=12',
      'argon2id-m=65536,t=3,p=4',
    ]);
  });

  it('runs the published JSON Schema validation example', async () => {
    expect(await runJavaScript(jsonSchemaExamples[0].code)).toEqual([
      '[]',
      '["Invalid id","Invalid role"]',
    ]);
  });
});
