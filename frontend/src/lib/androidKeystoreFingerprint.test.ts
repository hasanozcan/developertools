import { describe, it, expect } from 'vitest';
import { formatKeystoreFingerprint } from './androidKeystoreFingerprint';

describe('androidKeystoreFingerprint', () => {
  it('formats fingerprint hex strings into colon-separated SHA-1/SHA-256', () => {
    const res = formatKeystoreFingerprint('A1B2C3D4E5F6A1B2C3D4E5F6A1B2C3D4E5F6A1B2');
    expect(res.sha1).toContain('A1:B2:C3');
  });
});
