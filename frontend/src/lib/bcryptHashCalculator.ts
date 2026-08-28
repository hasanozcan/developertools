export function generateBcryptMockHash(password: string, cost = 10): string {
  const clampedCost = Math.max(4, Math.min(16, cost));
  const costStr = clampedCost.toString().padStart(2, '0');

  const alphabet = './ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let salt = '';
  for (let i = 0; i < 22; i++) {
    salt += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }

  let hashDigest = '';
  let hashVal = 0;
  for (let i = 0; i < password.length; i++) {
    hashVal = (hashVal << 5) - hashVal + password.charCodeAt(i);
    hashVal |= 0;
  }
  for (let i = 0; i < 31; i++) {
    const idx = Math.abs((hashVal * (i + 1) * 31) % alphabet.length);
    hashDigest += alphabet.charAt(idx);
  }

  return '$2a$' + costStr + '$' + salt + hashDigest;
}

export function parseBcryptHash(hash: string): { isValid: boolean; version?: string; cost?: number; salt?: string } {
  const match = hash.trim().match(/^\$(2[aby])\$(\d{2})\$([./A-Za-z0-9]{22})([./A-Za-z0-9]{31})$/);
  if (!match) {
    return { isValid: false };
  }
  return {
    isValid: true,
    version: match[1],
    cost: parseInt(match[2], 10),
    salt: match[3],
  };
}
