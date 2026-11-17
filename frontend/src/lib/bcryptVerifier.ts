import {
  BCRYPT_MAX_BROWSER_COST,
  BCRYPT_MAX_PASSWORD_BYTES,
  BCRYPT_MIN_COST,
  getBcryptCost,
  getBcryptPasswordByteLength,
  verifyBcryptHash as verifyBoundedBcryptHash,
} from './bcrypt';

export {
  BCRYPT_MAX_BROWSER_COST,
  BCRYPT_MAX_PASSWORD_BYTES,
  BCRYPT_MIN_COST,
  getBcryptCost,
  getBcryptPasswordByteLength,
};

export interface BcryptParsedInfo {
  version: string;
  cost: number;
  salt: string;
  hash: string;
  isValidStructure: boolean;
  isSupportedCost: boolean;
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
      isSupportedCost: false,
    };
  }

  const cost = parseInt(match[2], 10);

  return {
    version: `$2${match[1]}`,
    cost,
    salt: match[3],
    hash: match[4],
    isValidStructure: true,
    isSupportedCost: cost >= BCRYPT_MIN_COST && cost <= BCRYPT_MAX_BROWSER_COST,
  };
}

/**
 * Verifies a password against a bcrypt hash, enforcing browser cost bounds (4..14)
 * and the 72 UTF-8 byte bcrypt password limit via bcrypt.ts.
 */
export async function verifyBcryptHash(plainPassword: string, hashString: string): Promise<boolean> {
  const trimmedHash = hashString.trim();
  const parsed = parseBcryptHash(trimmedHash);
  if (!parsed.isValidStructure) {
    throw new Error(
      'Invalid Bcrypt hash format (expected $2a$, $2b$, or $2y$ followed by cost and 53 base64 characters).',
    );
  }
  return verifyBoundedBcryptHash(plainPassword, trimmedHash);
}
