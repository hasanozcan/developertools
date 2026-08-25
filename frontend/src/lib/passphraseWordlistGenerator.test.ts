import { describe, expect, it } from 'vitest';
import { generateDicewarePassphrase } from './passphraseWordlistGenerator';

describe('passphraseWordlistGenerator', () => {
  it('generates passphrase with custom separator', () => {
    const p = generateDicewarePassphrase(4, '.');
    expect(p.split('.')).toHaveLength(4);
  });
});
