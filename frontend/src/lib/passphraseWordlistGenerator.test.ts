import { describe, expect, it } from 'vitest';
import { generateDicewarePassphrase } from './passphraseWordlistGenerator';

describe('passphraseWordlistGenerator', () => {
  it('generates passphrase with custom separator', () => {
    const p = generateDicewarePassphrase(6, '.');
    expect(p.split('.')).toHaveLength(6);
  });
});
