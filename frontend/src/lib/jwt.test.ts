// @vitest-environment node

import { describe, expect, it } from 'vitest';
import { decodeJwt } from './jwt';

function encodeSegment(value: unknown): string {
  return Buffer.from(JSON.stringify(value), 'utf8').toString('base64url');
}

describe('JWT decoding', () => {
  it('decodes UTF-8 claim values without mojibake', () => {
    const token = `${encodeSegment({ alg: 'none', typ: 'JWT' })}.${encodeSegment({
      city: 'İstanbul',
      emoji: '👋',
    })}.sig`;

    expect(decodeJwt(token)?.payload).toEqual({ city: 'İstanbul', emoji: '👋' });
  });

  it('rejects malformed segments and non-object payloads', () => {
    expect(decodeJwt('abc.%.sig')).toBeNull();
    expect(
      decodeJwt(`${encodeSegment({ alg: 'none' })}.${encodeSegment(['not', 'claims'])}.sig`),
    ).toBeNull();
  });
});
