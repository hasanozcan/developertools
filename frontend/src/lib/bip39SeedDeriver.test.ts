import { describe, it, expect } from 'vitest';
import { deriveBip39SeedHex } from './bip39SeedDeriver';

describe('bip39SeedDeriver', () => {
  it('derives 512-bit (128-hex-char) seeds matching official BIP-39 PBKDF2-HMAC-SHA512 vectors', async () => {
    const abandonMnemonic =
      'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';

    expect(await deriveBip39SeedHex(abandonMnemonic)).toBe(
      '5eb00bbddcf069084889a8ab9155568165f5c453ccb85e70811aaed6f6da5fc19a5ac40b389cd370d086206dec8aa6c43daea6690f20ad3d8d48b2d2ce9e38e4',
    );

    expect(await deriveBip39SeedHex(abandonMnemonic, 'TREZOR')).toBe(
      'c55257c360c07c72029aebc1b53c05ed0362ada38ead3e3e9efa3708e53495531f09a6987599d18264c1e1c92f2cf141630c7a3c4ab7c81b2f001698e7463b04',
    );

    const voidMnemonic =
      'void come effort suffer camp survey warrior heavy shoot primary clutch crush open amazing screen patrol group space point ten exist slush involve unfold';
    expect(await deriveBip39SeedHex(voidMnemonic, 'TREZOR')).toBe(
      '01f5bced59dec48e362f2c45b5de68b9fd6c92c6634f44d6d40aab69056506f0e35524a518034ddc1192e1dacd32c1ed3eaa3c3b131c88ed8e7e54c49a5d0998',
    );

    const zooMnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong';
    expect(await deriveBip39SeedHex(zooMnemonic, 'TREZOR')).toBe(
      'ac27495480225222079d7be181583751e86f571027b0497b5b5d11218e0a8a13332572917f0f8e5a589620c6f15b11c61dee327651a14c34e18231052e48c069',
    );
  });

  it('normalizes mnemonic and passphrase using NFKD per BIP-39 specification', async () => {
    const mnemonic =
      'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
    const nfcPassphrase = 'caf\u00e9';
    const nfdPassphrase = 'cafe\u0301';

    const seedFromNfc = await deriveBip39SeedHex(mnemonic, nfcPassphrase);
    const seedFromNfd = await deriveBip39SeedHex(mnemonic, nfdPassphrase);
    expect(seedFromNfc).toHaveLength(128);
    expect(seedFromNfc).toBe(seedFromNfd);
  });
});
