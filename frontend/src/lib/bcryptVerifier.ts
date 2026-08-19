export interface BcryptParsedInfo {
  version: string;
  cost: number;
  salt: string;
  hash: string;
  isValidStructure: boolean;
}

export function parseBcryptHash(hashString: string): BcryptParsedInfo {
  const trimmed = hashString.trim();
  const bcryptRegex = /^\$2([aby])\$(\d\d)\$([./A-Za-z0-9]{22})([./A-Za-z0-9]{31})$/;
  const match = bcryptRegex.exec(trimmed);

  if (!match) {
    return {
      version: 'unknown',
      cost: 0,
      salt: '',
      hash: '',
      isValidStructure: false,
    };
  }

  return {
    version: `$2${match[1]}`,
    cost: parseInt(match[2], 10),
    salt: match[3],
    hash: match[4],
    isValidStructure: true,
  };
}

export async function verifyBcryptHash(plainPassword: string, hashString: string): Promise<boolean> {
  const parsed = parseBcryptHash(hashString);
  if (!parsed.isValidStructure) {
    throw new Error('Invalid Bcrypt hash format (expected $2a$, $2b$, or $2y$ followed by cost and 53 base64 characters).');
  }

  // Fast client-side verification check
  // In pure browser JS, we can dynamically import bcryptjs or check format
  try {
    const bcryptjs = await import('bcryptjs');
    return bcryptjs.compare(plainPassword, hashString);
  } catch {
    // Fallback comparison
    return false;
  }
}
