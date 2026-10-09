import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { renderSplitOutputs } from '../../scripts/uiDictionaryAnalysis.mjs';
import { toolDictionaryKeys } from './toolDictionaryKeys';
import { enUi } from './ui/en';
import { enUiCore } from './ui/core/en';
import { trUi } from './ui/tr';
import { trUiCore } from './ui/core/tr';
import { zhUi } from './ui/zh';
import { zhUiCore } from './ui/core/zh';

const frontendRoot = path.resolve(__dirname, '../..');
const normalize = (text: string) => text.replace(/\r\n/g, '\n');
const { outputs, analysis } = renderSplitOutputs(frontendRoot);

describe('split client UI dictionaries', () => {
  it('are up to date with the dictionaries and the tool components', () => {
    const stale = [...outputs]
      .filter(([relative, content]) => {
        try {
          return normalize(readFileSync(path.join(frontendRoot, relative), 'utf8')) !== content;
        } catch {
          return true;
        }
      })
      .map(([relative]) => relative);
    expect(stale, 'Out of date: run `npm run i18n:split` and commit the result').toEqual([]);
  });

  it('send every key of the full dictionary either to every page or to the tools that read it', () => {
    const sent = new Set<string>(Object.keys(enUiCore));
    for (const keys of Object.values(toolDictionaryKeys)) for (const key of keys) sent.add(key);
    expect([...Object.keys(enUi)].filter((key) => !sent.has(key))).toEqual([]);
    expect(Object.keys(enUiCore).filter((key) => !(key in enUi))).toEqual([]);
    for (const keys of Object.values(toolDictionaryKeys)) {
      expect(keys.filter((key) => key in enUiCore)).toEqual([]);
    }
  });

  it('keep the same keys and the same values as the full dictionary in every locale', () => {
    for (const [full, core] of [
      [enUi, enUiCore],
      [trUi, trUiCore],
      [zhUi, zhUiCore],
    ] as const) {
      expect(Object.keys(core)).toEqual(Object.keys(enUiCore));
      for (const [key, value] of Object.entries(core)) expect(full[key]).toBe(value);
    }
  });

  it('keep the shared dictionary small and each tool page addition modest', () => {
    // The shared dictionary is shipped with every page; it was 3,878 keys before the split.
    expect(Object.keys(enUiCore).length).toBeLessThan(1_200);
    expect(Math.max(...Object.values(toolDictionaryKeys).map((keys) => keys.length))).toBeLessThan(
      200,
    );
    expect(analysis.stats.toolsWithKeys).toBeGreaterThan(300);
  });
});
