export function validateBech32Address(address: string): { isValid: boolean; network: 'mainnet' | 'testnet' | 'invalid' } {
  if (/^bc1[a-z0-9]{38,59}$/i.test(address)) return { isValid: true, network: 'mainnet' };
  if (/^tb1[a-z0-9]{38,59}$/i.test(address)) return { isValid: true, network: 'testnet' };
  return { isValid: false, network: 'invalid' };
}
