// @vitest-environment node

import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { md5 } from './Md5HashTool';

describe('MD5 hashing', () => {
  it.each([
    ['', 'd41d8cd98f00b204e9800998ecf8427e'],
    ['abc', '900150983cd24fb0d6963f7d28e17f72'],
    ['message digest', 'f96b697d7cb7938d525a2f31aaf161d0'],
  ])('matches the RFC vector for %j', (input, expected) => {
    expect(md5(input)).toBe(expected);
  });

  it('hashes Unicode text as UTF-8', () => {
    const input = 'Hello 👋';
    expect(md5(input)).toBe(createHash('md5').update(input, 'utf8').digest('hex'));
  });

  it('preserves bytes above 0x7f when hashing binary files', () => {
    const bytes = new Uint8Array([0x00, 0x7f, 0x80, 0xff]);
    expect(md5(bytes)).toBe(createHash('md5').update(bytes).digest('hex'));
  });
});
