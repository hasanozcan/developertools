import { describe, expect, it } from 'vitest';
import { generateSha3Hash } from './sha3HashGenerator';

describe('sha3HashGenerator', () => {
  it('computes NIST FIPS 202 SHA-3 vectors for 224, 256, 384, and 512 bits', async () => {
    await expect(generateSha3Hash('', 'sha3-224')).resolves.toBe(
      '6b4e03423667dbb73b6e15454f0eb1abd4597f9a1b078e3f5b5a6bc7',
    );
    await expect(generateSha3Hash('', 'sha3-256')).resolves.toBe(
      'a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a',
    );
    await expect(generateSha3Hash('', 'sha3-384')).resolves.toBe(
      '0c63a75b845e4f7d01107d852e4c2485c51a50aaaa94fc61995e71bbee983a2ac3713831264adb47fb6bd1e058d5f004',
    );
    await expect(generateSha3Hash('', 'sha3-512')).resolves.toBe(
      'a69f73cca23a9ac5c8b567dc185a756e97c982164fe25859e0d1dcc1475c80a615b2123af1f5f94c11e3e9402c3ac558f500199d95b6d3e301758586281dcd26',
    );
  });

  it('computes real SHA3-256 and SHA3-512 digests for non-empty UTF-8 input', async () => {
    const h256 = await generateSha3Hash('hello', 'sha3-256');
    expect(h256).toBe('3338be694f50c5f338814986cdf0686453a888b84f424d792af4b9202398f392');

    const h512 = await generateSha3Hash('hello', 'sha3-512');
    expect(h512).toHaveLength(128);
    expect(h512).toBe(
      '75d527c368f2efe848ecf6b073a36767800805e9eef2b1857d5f984f036eb6df891d75f72d9b154518c1cd58835286d1da9a38deba3de98b5a53e5ed78a84976',
    );
  });
});
