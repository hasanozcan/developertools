import { describe, expect, it } from 'vitest';
import { generateUuidV5 } from './uuidV5Generator';

describe('uuidV5Generator', () => {
  const DNS_NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';

  it('matches RFC 4122 / Python uuid5 reference vectors', async () => {
    await expect(generateUuidV5(DNS_NAMESPACE, 'python.org')).resolves.toBe(
      '886313e1-3b8a-5372-9b90-0c9aee199e5d',
    );
    await expect(generateUuidV5(DNS_NAMESPACE, 'example.com')).resolves.toBe(
      'cfbff0d1-9375-5685-968c-48ce8b15ae17',
    );
  });

  it('sets version 5 and RFC 4122 variant bits deterministically for UTF-8 names', async () => {
    const u1 = await generateUuidV5(DNS_NAMESPACE, 'istanbul-öçş');
    const u2 = await generateUuidV5(DNS_NAMESPACE.toUpperCase(), 'istanbul-öçş');
    expect(u1).toBe(u2);
    expect(u1).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  it('rejects invalid namespace UUIDs', async () => {
    await expect(generateUuidV5('not-a-uuid', 'example.com')).rejects.toThrow(/valid UUID/i);
  });
});
