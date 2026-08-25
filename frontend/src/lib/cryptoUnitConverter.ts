export function convertCryptoUnits(amount: string, fromUnit: 'wei' | 'gwei' | 'ether' | 'satoshis' | 'btc') {
  const num = parseFloat(amount) || 0;
  let wei = BigInt(0);

  try {
    if (fromUnit === 'wei') wei = BigInt(Math.floor(num));
    else if (fromUnit === 'gwei') wei = BigInt(Math.floor(num * 1e9));
    else if (fromUnit === 'ether') wei = BigInt(Math.floor(num * 1e18));
    else if (fromUnit === 'satoshis') wei = BigInt(Math.floor(num * 1e10)); // approximate satoshis to wei
    else if (fromUnit === 'btc') wei = BigInt(Math.floor(num * 1e18));
  } catch {
    wei = BigInt(0);
  }

  const weiStr = wei.toString();
  const gwei = (Number(wei) / 1e9).toString();
  const ether = (Number(wei) / 1e18).toString();
  const satoshis = Math.floor(Number(wei) / 1e10).toString();

  return {
    wei: weiStr,
    gwei,
    ether,
    satoshis,
  };
}
