export type EthUnit = 'wei' | 'gwei' | 'ether';
export type BtcUnit = 'satoshi' | 'mbtc' | 'btc';

export interface EthUnitResult {
  wei: string;
  gwei: string;
  ether: string;
}

export interface BtcUnitResult {
  satoshi: string;
  mbtc: string;
  btc: string;
}

const ETH_DECIMALS: Record<EthUnit, number> = {
  wei: 0,
  gwei: 9,
  ether: 18,
};

const BTC_DECIMALS: Record<BtcUnit, number> = {
  satoshi: 0,
  mbtc: 5,
  btc: 8,
};

function parseDecimalToSmallestUnit(amount: string, scaleDecimals: number): bigint {
  const trimmed = (amount || '').trim();
  if (!trimmed) return BigInt(0);

  if (!/^\d+(?:\.\d+)?$/.test(trimmed)) {
    throw new Error('Enter a non-negative decimal number (digits and optional decimal point).');
  }

  const [wholePart, fracPart = ''] = trimmed.split('.');
  if (fracPart.length > scaleDecimals) {
    if (scaleDecimals === 0) {
      throw new Error('Smallest atomic unit (Wei / Satoshi) must be a whole integer.');
    }
    throw new Error(`Too many decimal places (maximum ${scaleDecimals} for this unit).`);
  }

  const paddedFrac = fracPart.padEnd(scaleDecimals, '0');
  const combined = `${wholePart}${paddedFrac}`.replace(/^0+(?=\d)/, '');
  return BigInt(combined || '0');
}

function formatScaledBigInt(value: bigint, decimals: number): string {
  const str = value.toString();
  if (decimals === 0) return str;

  if (str.length <= decimals) {
    const padded = str.padStart(decimals + 1, '0');
    const intPart = padded.slice(0, padded.length - decimals);
    const fracPart = padded.slice(padded.length - decimals).replace(/0+$/, '');
    return fracPart ? `${intPart}.${fracPart}` : intPart;
  }

  const splitAt = str.length - decimals;
  const intPart = str.slice(0, splitAt);
  const fracPart = str.slice(splitAt).replace(/0+$/, '');
  return fracPart ? `${intPart}.${fracPart}` : intPart;
}

export function convertEthUnits(amount: string, fromUnit: EthUnit): EthUnitResult {
  const wei = parseDecimalToSmallestUnit(amount, ETH_DECIMALS[fromUnit]);
  return {
    wei: wei.toString(),
    gwei: formatScaledBigInt(wei, ETH_DECIMALS.gwei),
    ether: formatScaledBigInt(wei, ETH_DECIMALS.ether),
  };
}

export function convertBtcUnits(amount: string, fromUnit: BtcUnit): BtcUnitResult {
  const satoshi = parseDecimalToSmallestUnit(amount, BTC_DECIMALS[fromUnit]);
  return {
    satoshi: satoshi.toString(),
    mbtc: formatScaledBigInt(satoshi, BTC_DECIMALS.mbtc),
    btc: formatScaledBigInt(satoshi, BTC_DECIMALS.btc),
  };
}

export function convertCryptoUnits(amount: string, fromUnit: EthUnit): EthUnitResult {
  return convertEthUnits(amount, fromUnit);
}
