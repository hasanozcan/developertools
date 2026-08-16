export const BCRYPT_MIN_COST = 4;
export const BCRYPT_MAX_BROWSER_COST = 14;
export const BCRYPT_MAX_PASSWORD_BYTES = 72;

const BCRYPT_HASH_PATTERN = /^\$2[aby]\$(\d{2})\$[./A-Za-z0-9]{53}$/;

function passwordByteLength(password: string): number {
  return new TextEncoder().encode(password).length;
}

function validatePassword(password: string): void {
  if (!password) throw new Error('Password is required.');
  const bytes = passwordByteLength(password);
  if (bytes > BCRYPT_MAX_PASSWORD_BYTES) {
    throw new Error(
      `Password is ${bytes} UTF-8 bytes. Bcrypt only processes the first ${BCRYPT_MAX_PASSWORD_BYTES} bytes, so shorten it before hashing.`,
    );
  }
}

function validateCost(cost: number): void {
  if (!Number.isInteger(cost) || cost < BCRYPT_MIN_COST || cost > BCRYPT_MAX_BROWSER_COST) {
    throw new Error(
      `Cost must be an integer from ${BCRYPT_MIN_COST} to ${BCRYPT_MAX_BROWSER_COST}.`,
    );
  }
}

export function getBcryptCost(hash: string): number {
  const match = hash.match(BCRYPT_HASH_PATTERN);
  if (!match) throw new Error('Enter a valid bcrypt $2a$, $2b$, or $2y$ hash.');
  const cost = Number(match[1]);
  if (cost < BCRYPT_MIN_COST || cost > BCRYPT_MAX_BROWSER_COST) {
    throw new Error(
      `This browser tool accepts bcrypt costs from ${BCRYPT_MIN_COST} to ${BCRYPT_MAX_BROWSER_COST} to avoid excessively long operations.`,
    );
  }
  return cost;
}

export function getBcryptPasswordByteLength(password: string): number {
  return passwordByteLength(password);
}

export async function generateBcryptHash(password: string, cost: number = 10): Promise<string> {
  validatePassword(password);
  validateCost(cost);
  const bcrypt = await import('bcryptjs');
  return bcrypt.hash(password, cost);
}

export async function verifyBcryptHash(password: string, hash: string): Promise<boolean> {
  validatePassword(password);
  getBcryptCost(hash);
  const bcrypt = await import('bcryptjs');
  return bcrypt.compare(password, hash);
}
