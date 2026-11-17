import {
  BCRYPT_MAX_PASSWORD_BYTES,
  generateBcryptHash,
  getBcryptPasswordByteLength,
} from './bcrypt';

export type HtpasswdAlgorithm = 'bcrypt' | 'sha1' | 'plaintext';

export interface HtpasswdEntry {
  user: string;
  hash: string;
  line: string;
}

function validateUsername(user: string): string {
  const cleanUser = user.trim() || 'user';
  if (/[:\r\n]/.test(cleanUser)) {
    throw new Error('Username cannot contain colons or line breaks.');
  }
  return cleanUser;
}

function validatePasswordPresent(pass: string): void {
  if (!pass) {
    throw new Error('Password is required.');
  }
  if (/[\r\n]/.test(pass)) {
    throw new Error('Password cannot contain line breaks.');
  }
}

export async function generateSha1Htpasswd(password: string): Promise<string> {
  validatePasswordPresent(password);
  const data = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const bytes = new Uint8Array(hashBuffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `{SHA}${btoa(binary)}`;
}

export async function generateHtpasswdLine(
  user: string,
  pass: string,
  algorithm: HtpasswdAlgorithm = 'bcrypt',
  cost: number = 10,
): Promise<HtpasswdEntry> {
  const cleanUser = validateUsername(user);
  validatePasswordPresent(pass);

  let hash = '';

  if (algorithm === 'sha1') {
    hash = await generateSha1Htpasswd(pass);
  } else if (algorithm === 'plaintext') {
    hash = pass;
  } else if (algorithm === 'bcrypt') {
    const byteLen = getBcryptPasswordByteLength(pass);
    if (byteLen > BCRYPT_MAX_PASSWORD_BYTES) {
      throw new Error(
        `Password is ${byteLen} UTF-8 bytes. Bcrypt only processes the first ${BCRYPT_MAX_PASSWORD_BYTES} bytes, so shorten it before hashing.`,
      );
    }
    const bcryptHash = await generateBcryptHash(pass, cost);
    // Apache htpasswd -B uses the $2y$ identifier (identical crypt-base64 encoding to $2b$)
    hash = bcryptHash.startsWith('$2b$') ? `$2y$${bcryptHash.slice(4)}` : bcryptHash;
  } else {
    throw new Error(`Unsupported htpasswd algorithm: ${String(algorithm)}`);
  }

  return {
    user: cleanUser,
    hash,
    line: `${cleanUser}:${hash}`,
  };
}
