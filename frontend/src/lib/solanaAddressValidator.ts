export function validateSolanaAddress(address: string): { isValid: boolean; length: number; error?: string } {
  const clean = (address || '').trim();
  if (!clean) return { isValid: false, length: 0, error: 'Empty address' };
  
  // Base58 regex check & length 32-44 characters
  const isBase58 = /^[1-9A-HJ-NP-Za-km-z]+$/.test(clean);
  if (!isBase58) {
    return { isValid: false, length: clean.length, error: 'Invalid Base58 characters (0, O, I, l are forbidden)' };
  }

  if (clean.length < 32 || clean.length > 44) {
    return { isValid: false, length: clean.length, error: 'Solana addresses must be between 32 and 44 characters' };
  }

  return { isValid: true, length: clean.length };
}