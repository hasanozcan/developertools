import { describe, expect, it } from 'vitest';
import { computeEip712Hash } from './eip712Hasher';

describe('eip712Hasher', () => {
  it('matches the canonical EIP-712 Mail example specification vector', async () => {
    // Canonical EIP-712 spec example (Ether Mail)
    const domain = {
      name: 'Ether Mail',
      version: '1',
      chainId: 1,
      verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
    };
    const types = {
      Person: [
        { name: 'name', type: 'string' },
        { name: 'wallet', type: 'address' },
      ],
      Mail: [
        { name: 'from', type: 'Person' },
        { name: 'to', type: 'Person' },
        { name: 'contents', type: 'string' },
      ],
    };
    const message = {
      from: {
        name: 'Cow',
        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
      },
      to: {
        name: 'Bob',
        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
      },
      contents: 'Hello, Bob!',
    };

    const res = await computeEip712Hash(domain, 'Mail', message, types);
    expect(res.domainSeparator).toBe(
      '0xf2cee375fa42b42143804025fc449deafd50cc031ca257e0b194a650a912090f',
    );
    expect(res.structHash).toBe(
      '0xc52c0ee5d84264471806290a3f2c4cecfc5490626bf912d01f240d7a274b371e',
    );
    expect(res.eip712Digest).toBe(
      '0xbe609aee343fb3c4b28e1df9e632fca64fcfaede20f02e86244efddf30957bd2',
    );
  });

  it('infers field types cleanly when explicit types are omitted and rejects invalid addresses', async () => {
    const res = await computeEip712Hash(
      { name: 'MyApp', version: '1', chainId: 1, verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC' },
      'Mail',
      {
        from: '0x1111111111111111111111111111111111111111',
        to: '0x2222222222222222222222222222222222222222',
        contents: 'Hello!',
      },
    );
    expect(res.domainSeparator).toMatch(/^0x[0-9a-f]{64}$/);
    expect(res.structHash).toMatch(/^0x[0-9a-f]{64}$/);
    expect(res.eip712Digest).toMatch(/^0x[0-9a-f]{64}$/);

    await expect(
      computeEip712Hash(
        { name: 'MyApp', version: '1', chainId: 1, verifyingContract: 'not-an-address' },
        'Mail',
        { contents: 'Hello' },
      ),
    ).rejects.toThrow(/Invalid Ethereum address/);
  });
});
