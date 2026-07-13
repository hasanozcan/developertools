import { describe, expect, it } from 'vitest';
import {
  compareSha256Checksums,
  isValidSha256Checksum,
  normalizeSha256Checksum,
} from './sha256Checksum';

const DIGEST = '0123456789abcdef'.repeat(4);
const OTHER_DIGEST = `${DIGEST.slice(0, -1)}0`;

describe('normalizeSha256Checksum', () => {
  it('returns an unprefixed lowercase digest unchanged', () => {
    expect(normalizeSha256Checksum(DIGEST)).toBe(DIGEST);
  });

  it('trims surrounding whitespace and canonicalizes letter casing', () => {
    expect(normalizeSha256Checksum(` \t${DIGEST.toUpperCase()}\r\n`)).toBe(DIGEST);
  });

  it.each(['sha256:', 'SHA256:', 'Sha256:\t'])('accepts the optional %s prefix', (prefix) => {
    expect(normalizeSha256Checksum(`${prefix} ${DIGEST.toUpperCase()}`)).toBe(DIGEST);
  });

  it.each([
    '',
    '   ',
    'sha256:',
    DIGEST.slice(1),
    `${DIGEST}0`,
    `${DIGEST.slice(0, -1)}g`,
    `${DIGEST.slice(0, 32)} ${DIGEST.slice(32)}`,
    `${DIGEST}\tartifact.zip`,
    `sha256:\n${DIGEST}`,
    `sha256 :${DIGEST}`,
  ])('rejects a missing or malformed digest: %j', (value) => {
    expect(normalizeSha256Checksum(value)).toBeNull();
    expect(isValidSha256Checksum(value)).toBe(false);
  });

  it('reports accepted normalized forms as valid', () => {
    expect(isValidSha256Checksum(`SHA256: ${DIGEST.toUpperCase()}`)).toBe(true);
  });
});

describe('compareSha256Checksums', () => {
  it('matches case-insensitively across prefixed and unprefixed values', () => {
    expect(compareSha256Checksums(DIGEST.toUpperCase(), `sha256: ${DIGEST}`)).toBe('match');
  });

  it('returns mismatch only when both values are valid and different', () => {
    expect(compareSha256Checksums(DIGEST, OTHER_DIGEST)).toBe('mismatch');
  });

  it.each([
    ['', DIGEST],
    ['   ', DIGEST],
    [DIGEST, ''],
    [DIGEST, '\t\r\n'],
  ])('returns empty when either value has no content', (actual, expected) => {
    expect(compareSha256Checksums(actual, expected)).toBe('empty');
  });

  it.each([
    ['sha256:', DIGEST],
    [DIGEST, 'sha256:'],
    [`${DIGEST} filename.zip`, DIGEST],
    [DIGEST, `${DIGEST.slice(0, 63)}x`],
  ])('returns invalid when a non-empty value is malformed', (actual, expected) => {
    expect(compareSha256Checksums(actual, expected)).toBe('invalid');
  });
});
