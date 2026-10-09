import { describe, expect, it } from 'vitest';
import { getToolUiDictionary } from './toolUiDictionary';
import { toolDictionaryKeys } from '@/translations/toolDictionaryKeys';
import { enUi } from '@/translations/ui/en';
import { trUi } from '@/translations/ui/tr';

describe('getToolUiDictionary', () => {
  const [slug, keys] = Object.entries(toolDictionaryKeys)[0];

  it('returns exactly the tool keys, in the requested locale', async () => {
    const english = await getToolUiDictionary('en', slug);
    const turkish = await getToolUiDictionary('tr', slug);
    expect(Object.keys(english).sort()).toEqual([...keys].sort());
    expect(Object.keys(turkish).sort()).toEqual([...keys].sort());
    for (const key of keys) {
      expect(english[key]).toBe(enUi[key]);
      expect(turkish[key]).toBe(trUi[key]);
    }
  });

  it('returns nothing for a tool without scoped strings', async () => {
    expect(await getToolUiDictionary('en', 'no-such-tool')).toEqual({});
  });
});
