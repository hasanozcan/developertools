import { webcrypto } from 'node:crypto';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { constantTimeEqual, generateHmac, verifyHmac, type HmacAlgorithm } from './hmac';

beforeAll(() => {
  vi.stubGlobal('crypto', webcrypto);
});

afterAll(() => {
  vi.unstubAllGlobals();
});

describe('HMAC generation', () => {
  const secret = '\u000b'.repeat(20);

  it.each([
    ['SHA-256', 'b0344c61d8db38535ca8afceaf0bf12b881dc200c9833da726e9376c2e32cff7'],
    [
      'SHA-384',
      'afd03944d84895626b0825f4ab46907f15f9dadbe4101ec682aa034c7cebc59cfaea9ea9076ede7f4af152e8b2fa9cb6',
    ],
    [
      'SHA-512',
      '87aa7cdea5ef619d4ff0b4241a1d6cb02379f4e2ce4ec2787ad0b30545e17cdedaa833b7d6b8a702038b274eaea3f4e4be9d914eeb61f1702e696c203a126854',
    ],
  ] as const)('generates the RFC 4231 %s vector', async (algorithm, expected) => {
    await expect(generateHmac('Hi There', secret, algorithm)).resolves.toBe(expected);
  });

  it('outputs standard Base64 and handles UTF-8 input', async () => {
    await expect(
      generateHmac('The quick brown fox jumps over the lazy dog', 'key', 'SHA-256', 'base64'),
    ).resolves.toBe('97yD9DBThCSxMpjmqm+xQ+9NWaFJRhdZl0edvC0aPNg=');

    const signature = await generateHmac('Merhaba 🌍', 'gizli 🔑', 'SHA-384', 'base64');
    await expect(
      verifyHmac('Merhaba 🌍', 'gizli 🔑', signature, 'SHA-384', 'base64'),
    ).resolves.toBe(true);
  });

  it('supports an empty message and rejects invalid key or algorithm input', async () => {
    await expect(generateHmac('', 'secret')).resolves.toBe(
      'f9e66e179b6747ae54108f82f8ade8b3c25d76fd30afde6c395822c530196169',
    );
    await expect(generateHmac('message', '')).rejects.toThrow('Secret is required');
    await expect(generateHmac('message', 'secret', 'SHA-1' as HmacAlgorithm)).rejects.toThrow(
      'Unsupported HMAC algorithm',
    );
  });
});

describe('HMAC verification', () => {
  it('accepts matching signatures and uppercase hexadecimal input', async () => {
    const signature = await generateHmac('message', 'secret');
    await expect(verifyHmac('message', 'secret', signature.toUpperCase())).resolves.toBe(true);
  });

  it('verifies a signature for an empty message', async () => {
    const signature = await generateHmac('', 'secret');
    await expect(verifyHmac('', 'secret', signature)).resolves.toBe(true);
  });

  it('returns false for mismatched values and lengths', async () => {
    const signature = await generateHmac('message', 'secret');
    await expect(verifyHmac('changed', 'secret', signature)).resolves.toBe(false);
    await expect(verifyHmac('message', 'secret', '00')).resolves.toBe(false);
  });

  it('rejects empty and malformed signatures', async () => {
    await expect(verifyHmac('message', 'secret', '')).rejects.toThrow('Signature is required');
    await expect(verifyHmac('message', 'secret', 'xyz')).rejects.toThrow(
      'Signature is not valid hexadecimal',
    );
    await expect(
      verifyHmac('message', 'secret', 'not base64', 'SHA-256', 'base64'),
    ).rejects.toThrow('Signature is not valid Base64');
  });

  it('compares all bytes and accounts for different lengths', () => {
    expect(constantTimeEqual(Uint8Array.of(1, 2, 3), Uint8Array.of(1, 2, 3))).toBe(true);
    expect(constantTimeEqual(Uint8Array.of(1, 2, 3), Uint8Array.of(1, 9, 3))).toBe(false);
    expect(constantTimeEqual(Uint8Array.of(1), Uint8Array.of(1, 0))).toBe(false);
    expect(constantTimeEqual(new Uint8Array(), new Uint8Array())).toBe(true);
  });
});
