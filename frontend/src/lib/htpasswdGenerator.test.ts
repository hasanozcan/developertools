import { describe, it, expect } from 'vitest';
import { generateSha1Htpasswd, generateHtpasswdLine } from './htpasswdGenerator';

describe('htpasswdGenerator', () => {
  it('should generate valid SHA-1 htpasswd string', async () => {
    const hash = await generateSha1Htpasswd('secret');
    expect(hash.startsWith('{SHA}')).toBe(true);
    expect(hash.length).toBeGreaterThan(10);
  });

  it('should generate formatted line for htpasswd file', async () => {
    const sha1Entry = await generateHtpasswdLine('admin', 'secret123', 'sha1');
    expect(sha1Entry.user).toBe('admin');
    expect(sha1Entry.line.startsWith('admin:{SHA}')).toBe(true);

    const plaintextEntry = await generateHtpasswdLine('testuser', 'pass', 'plaintext');
    expect(plaintextEntry.line).toBe('testuser:pass');

    const bcryptEntry = await generateHtpasswdLine('admin', 'secret123', 'bcrypt');
    expect(bcryptEntry.line.startsWith('admin:$2y$10$')).toBe(true);
  });
});
