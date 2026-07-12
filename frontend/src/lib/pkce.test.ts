import { describe, expect, it } from 'vitest';
import {
  deriveCodeChallenge,
  generateCodeVerifier,
  validateCodeVerifier,
  verifyCodeChallenge,
} from './pkce';

describe('PKCE helpers', () => {
  it('generates an RFC-compatible verifier with unbiased alphabet mapping', () => {
    let offset = 0;
    const verifier = generateCodeVerifier(66, (length) => {
      const bytes = Uint8Array.from({ length }, () => {
        const byte = offset % 198;
        offset += 1;
        return byte;
      });
      return bytes;
    });

    expect(verifier).toHaveLength(66);
    expect(verifier).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~');
    expect(() => validateCodeVerifier(verifier)).not.toThrow();
  });

  it.each([42, 129, 64.5])('rejects invalid verifier length %s', (length) => {
    expect(() => generateCodeVerifier(length, (size) => new Uint8Array(size))).toThrow(
      /between 43 and 128/,
    );
  });

  it('rejects malformed verifiers and invalid random providers', () => {
    expect(() => validateCodeVerifier('a'.repeat(42))).toThrow(/between 43 and 128/);
    expect(() => validateCodeVerifier(`${'a'.repeat(42)}!`)).toThrow(/unsupported characters/);
    expect(() => generateCodeVerifier(43, () => new Uint8Array(1))).toThrow(/must return exactly/);
    expect(() => generateCodeVerifier(43, (length) => new Uint8Array(length).fill(255))).toThrow(
      /enough usable bytes/,
    );
  });

  it('matches the RFC 7636 S256 example', async () => {
    const verifier = 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk';
    const challenge = 'E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM';

    await expect(deriveCodeChallenge(verifier)).resolves.toBe(challenge);
    await expect(verifyCodeChallenge(verifier, challenge)).resolves.toBe(true);
    await expect(verifyCodeChallenge(verifier, `${challenge.slice(0, -1)}A`)).resolves.toBe(false);
    await expect(verifyCodeChallenge(verifier, `${challenge}=`)).resolves.toBe(false);
  });
});
