// @vitest-environment node
import { File } from 'node:buffer';
import { webcrypto } from 'node:crypto';
import { TextEncoder } from 'node:util';
import { runInNewContext } from 'node:vm';
import { describe, expect, it } from 'vitest';
import { developerGuides } from './developerGuides';
import { sha256Examples, unicodeExamples, uuidExamples } from './guideExamples';
import { findCatalogTool } from './api';
import { getToolCollection } from './toolCollections';

async function runJavaScript(code: string): Promise<string[]> {
  const output: string[] = [];
  await runInNewContext(
    `(async () => {${code}\n})()`,
    {
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
});
