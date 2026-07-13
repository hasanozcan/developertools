const SHA256_DIGEST_PATTERN = /^[0-9a-f]{64}$/;
const SHA256_PREFIX_PATTERN = /^sha256:[ \t]*/i;

export type Sha256ChecksumComparison = 'empty' | 'invalid' | 'match' | 'mismatch';

/**
 * Returns a canonical lowercase SHA-256 digest, or null when the input is not
 * exactly one digest. Surrounding whitespace and a case-insensitive `sha256:`
 * prefix are accepted; whitespace inside the digest and trailing tokens are
 * deliberately rejected.
 */
export function normalizeSha256Checksum(value: string): string | null {
  const trimmed = value.trim();
  const candidate = trimmed.replace(SHA256_PREFIX_PATTERN, '');

  if (!SHA256_DIGEST_PATTERN.test(candidate.toLowerCase())) {
    return null;
  }

  return candidate.toLowerCase();
}

export function isValidSha256Checksum(value: string): boolean {
  return normalizeSha256Checksum(value) !== null;
}

export function compareSha256Checksums(actual: string, expected: string): Sha256ChecksumComparison {
  if (actual.trim() === '' || expected.trim() === '') {
    return 'empty';
  }

  const normalizedActual = normalizeSha256Checksum(actual);
  const normalizedExpected = normalizeSha256Checksum(expected);

  if (normalizedActual === null || normalizedExpected === null) {
    return 'invalid';
  }

  return normalizedActual === normalizedExpected ? 'match' : 'mismatch';
}
