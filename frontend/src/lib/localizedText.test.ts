import { describe, expect, it } from 'vitest';
import {
  interpolateText,
  localizeUiText,
  textTranslationKey,
  translateCount,
} from './localizedText';

describe('localized display text', () => {
  it('localizes a known label while preserving unknown user input and protocol values', () => {
    const dictionary = { [textTranslationKey('Every Minute')]: 'Her Dakika' };
    const t = (key: string) => dictionary[key as keyof typeof dictionary] ?? '';
    expect(localizeUiText('Every Minute', t)).toBe('Her Dakika');
    expect(localizeUiText('GET', t)).toBe('GET');
    expect(localizeUiText('a user-provided label', t)).toBe('a user-provided label');
    expect(localizeUiText('Every Minute', (key) => key)).toBe('Every Minute');
  });

  it('translates a project diagnostic with its literal value without interpreting it', () => {
    const key = textTranslationKey('Invalid header line: {value1}');
    const t = (value: string) => (value === key ? 'Geçersiz başlık satırı: {value1}' : '');
    expect(localizeUiText('Invalid header line: X-Example: <script>{x}</script>', t)).toBe(
      'Geçersiz başlık satırı: X-Example: <script>{x}</script>',
    );
    expect(localizeUiText('Unexpected token } in JSON at position 7', t)).toBe(
      'Unexpected token } in JSON at position 7',
    );
  });

  it('preserves named values, missing placeholders, and literal dollar signs', () => {
    expect(interpolateText('{total}: {name} / {unknown}', { total: 2, name: '$&' })).toBe(
      '2: $& / {unknown}',
    );
  });

  it('uses Russian one, few and many categories without appending an English suffix', () => {
    const dictionary: Record<string, string> = {
      'count.one': '{count} инструмент',
      'count.few': '{count} инструмента',
      'count.many': '{count} инструментов',
      'count.other': '{count} инструмента',
    };
    const t = (key: string) => dictionary[key] ?? '';
    expect(translateCount(t, 'ru', 'count', 1)).toBe('1 инструмент');
    expect(translateCount(t, 'ru', 'count', 2)).toBe('2 инструмента');
    expect(translateCount(t, 'ru', 'count', 5)).toBe('5 инструментов');
    expect(translateCount(t, 'ru', 'count', 21)).toBe('21 инструмент');
  });
});
