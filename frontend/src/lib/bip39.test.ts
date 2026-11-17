import { describe, it, expect } from 'vitest';
import {
  BIP39_WORDLIST,
  entropyToMnemonic,
  generateMnemonic,
  generateMnemonicSync,
  sha256Bytes,
  sha256Sync,
  validateMnemonic,
} from './bip39';

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

describe('bip39', () => {
  it('uses the canonical 2048-word BIP-39 English wordlist', () => {
    expect(BIP39_WORDLIST).toHaveLength(2048);
    expect(new Set(BIP39_WORDLIST).size).toBe(2048);
    expect(BIP39_WORDLIST[0]).toBe('abandon');
    expect(BIP39_WORDLIST[2047]).toBe('zoo');
    expect(BIP39_WORDLIST).toContain('tragic');
    expect(BIP39_WORDLIST).not.toContain('seduce');
    expect(BIP39_WORDLIST).not.toContain('see');

    const prefixes = new Set<string>();
    for (let i = 0; i < BIP39_WORDLIST.length; i++) {
      if (i > 0) {
        expect(BIP39_WORDLIST[i] > BIP39_WORDLIST[i - 1]).toBe(true);
      }
      const prefix = BIP39_WORDLIST[i].slice(0, 4);
      expect(prefixes.has(prefix)).toBe(false);
      prefixes.add(prefix);
    }
  });

  it('computes synchronous SHA-256 identically to WebCrypto SHA-256', async () => {
    for (const length of [0, 16, 20, 24, 28, 32, 55, 56, 64]) {
      const data = new Uint8Array(length);
      for (let i = 0; i < length; i++) data[i] = (i * 31 + 7) & 0xff;
      const syncDigest = sha256Sync(data);
      const asyncDigest = await sha256Bytes(data);
      expect(Array.from(syncDigest)).toEqual(Array.from(asyncDigest));
    }
  });

  it('generates valid checksummed BIP-39 mnemonics across supported word counts', async () => {
    for (const count of [12, 15, 18, 21, 24] as const) {
      const asyncResult = await generateMnemonic(count);
      expect(asyncResult.words).toHaveLength(count);
      expect(asyncResult.entropyBits).toBe((count / 3) * 32);
      const asyncValidation = validateMnemonic(asyncResult.mnemonic);
      expect(asyncValidation.isValid).toBe(true);
      expect(asyncValidation.checksumValid).toBe(true);
      expect(asyncValidation.invalidWords).toHaveLength(0);

      const syncResult = generateMnemonicSync(count);
      expect(syncResult.words).toHaveLength(count);
      const syncValidation = validateMnemonic(syncResult.mnemonic);
      expect(syncValidation.isValid).toBe(true);
      expect(syncValidation.checksumValid).toBe(true);
    }
  });

  it('matches official BIP-39 entropy and checksum test vectors', () => {
    const vectors: Array<[string, string]> = [
      [
        '00000000000000000000000000000000',
        'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about',
      ],
      [
        '7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f',
        'legal winner thank year wave sausage worth useful legal winner thank yellow',
      ],
      [
        '80808080808080808080808080808080',
        'letter advice cage absurd amount doctor acoustic avoid letter advice cage above',
      ],
      [
        'ffffffffffffffffffffffffffffffff',
        'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong',
      ],
      [
        'f585c11aec520db57dd353c69554b21a89b20fb0650966fa0a9d6f74fd989d8f',
        'void come effort suffer camp survey warrior heavy shoot primary clutch crush open amazing screen patrol group space point ten exist slush involve unfold',
      ],
      [
        '066dca1a2bb7e8a1db2832148ce9933eea0f3ac9548d793112d9a95c9407efad',
        'all hour make first leader extend hole alien behind guard gospel lava path output census museum junior mass reopen famous sing advance salt reform',
      ],
    ];

    for (const [entropyHex, expectedMnemonic] of vectors) {
      const { mnemonic } = entropyToMnemonic(hexToBytes(entropyHex));
      expect(mnemonic).toBe(expectedMnemonic);

      const validation = validateMnemonic(expectedMnemonic);
      expect(validation.isValid).toBe(true);
      expect(validation.checksumValid).toBe(true);
      expect(validation.invalidWords).toHaveLength(0);
    }
  });

  it('rejects mnemonics with invalid BIP-39 checksums even if all words exist', () => {
    const badChecksums = [
      'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon',
      'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo',
      'void come effort suffer camp survey warrior heavy shoot primary clutch crush open amazing screen patrol group space point ten exist slush involve undo',
    ];

    for (const mnemonic of badChecksums) {
      const validation = validateMnemonic(mnemonic);
      expect(validation.invalidWords).toHaveLength(0);
      expect(validation.checksumValid).toBe(false);
      expect(validation.isValid).toBe(false);
    }
  });

  it('detects invalid words and invalid lengths in mnemonic', () => {
    const invalidWordResult = validateMnemonic('abandon ability notarealwordabout apple');
    expect(invalidWordResult.isValid).toBe(false);
    expect(invalidWordResult.checksumValid).toBe(false);
    expect(invalidWordResult.invalidWords).toContain('notarealwordabout');

    const invalidLengthResult = validateMnemonic('abandon abandon abandon');
    expect(invalidLengthResult.isValid).toBe(false);
    expect(invalidLengthResult.checksumValid).toBe(false);
    expect(invalidLengthResult.invalidWords).toHaveLength(0);
  });
});
