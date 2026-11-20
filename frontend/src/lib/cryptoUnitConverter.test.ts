import { describe, expect, it } from 'vitest';
import { convertBtcUnits, convertCryptoUnits, convertEthUnits } from './cryptoUnitConverter';

describe('cryptoUnitConverter', () => {
  it('converts Ether, Gwei, and Wei with exact BigInt decimal precision', () => {
    const res = convertCryptoUnits('1', 'ether');
    expect(res.wei).toBe('1000000000000000000');
    expect(res.gwei).toBe('1000000000');
    expect(res.ether).toBe('1');

    const dust = convertEthUnits('0.000000000000000001', 'ether');
    expect(dust.wei).toBe('1');
    expect(dust.gwei).toBe('0.000000001');

    const large = convertEthUnits('100000000', 'ether');
    expect(large.wei).toBe('100000000000000000000000000');
  });

  it('converts Bitcoin BTC, mBTC, and Satoshi cleanly without mixing ETH', () => {
    const btc = convertBtcUnits('1.5', 'btc');
    expect(btc.satoshi).toBe('150000000');
    expect(btc.mbtc).toBe('1500');
    expect(btc.btc).toBe('1.5');

    const sats = convertBtcUnits('1', 'satoshi');
    expect(sats.btc).toBe('0.00000001');
    expect(sats.mbtc).toBe('0.00001');
  });

  it('rejects fractional atomic units and invalid decimals', () => {
    expect(() => convertEthUnits('1.5', 'wei')).toThrow(/whole integer/i);
    expect(() => convertBtcUnits('0.5', 'satoshi')).toThrow(/whole integer/i);
    expect(() => convertEthUnits('-1', 'ether')).toThrow(/non-negative/i);
  });
});
