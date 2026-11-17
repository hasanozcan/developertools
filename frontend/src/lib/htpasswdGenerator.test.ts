import { describe, it, expect } from 'vitest';
import { compare } from 'bcryptjs';
import { generateSha1Htpasswd, generateHtpasswdLine } from './htpasswdGenerator';

describe('htpasswdGenerator', () => {
  it('generates RFC-compliant SHA-1 {SHA} htpasswd hash', async () => {
    // echo -n "secret" | openssl sha1 -binary | base64 -> 5en6G6MezRroT3XKqkdPOmY/BfQ=
    const hash = await generateSha1Htpasswd('secret');
    expect(hash).toBe('{SHA}5en6G6MezRroT3XKqkdPOmY/BfQ=');
  });

  it('defaults to real bcrypt verified by bcryptjs and enforces 72-byte limit', async () => {
    const bcryptEntry = await generateHtpasswdLine('admin', 'secret123');
    expect(bcryptEntry.user).toBe('admin');
    expect(bcryptEntry.hash).toMatch(/^\$2y\$10\$[./A-Za-z0-9]{53}$/);
    expect(bcryptEntry.line).toBe(`admin:${bcryptEntry.hash}`);
    await expect(compare('secret123', bcryptEntry.hash)).resolves.toBe(true);
    await expect(compare('wrong', bcryptEntry.hash)).resolves.toBe(false);

    await expect(generateHtpasswdLine('admin', 'a'.repeat(73), 'bcrypt')).rejects.toThrow(
      /72/,
    );
    await expect(generateHtpasswdLine('bad:user', 'secret123')).rejects.toThrow(/colons/i);
  });

  it('generates sha1 and plaintext htpasswd lines safely', async () => {
    const sha1Entry = await generateHtpasswdLine('admin', 'secret123', 'sha1');
    expect(sha1Entry.line.startsWith('admin:{SHA}')).toBe(true);

    const plaintextEntry = await generateHtpasswdLine('testuser', 'pass', 'plaintext');
    expect(plaintextEntry.line).toBe('testuser:pass');
  });
});
