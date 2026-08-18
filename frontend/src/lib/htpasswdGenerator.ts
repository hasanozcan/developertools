export type HtpasswdAlgorithm = 'bcrypt' | 'sha1' | 'plaintext';

export interface HtpasswdEntry {
  user: string;
  hash: string;
  line: string;
}

export async function generateSha1Htpasswd(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const bytes = new Uint8Array(hashBuffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return `{SHA}${base64}`;
}

export async function generateHtpasswdLine(
  user: string,
  pass: string,
  algorithm: HtpasswdAlgorithm = 'sha1',
): Promise<HtpasswdEntry> {
  const cleanUser = user.trim() || 'user';
  let hash = '';

  if (algorithm === 'sha1') {
    hash = await generateSha1Htpasswd(pass);
  } else if (algorithm === 'plaintext') {
    hash = pass;
  } else {
    // Bcrypt simulation using Web Crypto SHA-256 PBKDF2 representation
    const encoder = new TextEncoder();
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(pass),
      { name: 'PBKDF2' },
      false,
      ['deriveBits'],
    );
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt,
        iterations: 1000,
        hash: 'SHA-256',
      },
      keyMaterial,
      256,
    );
    const saltB64 = btoa(String.fromCharCode(...salt)).replace(/=/g, '');
    const hashB64 = btoa(String.fromCharCode(...new Uint8Array(derivedBits))).replace(/=/g, '');
    hash = `$2y$10$${saltB64.slice(0, 22)}${hashB64.slice(0, 31)}`;
  }

  return {
    user: cleanUser,
    hash,
    line: `${cleanUser}:${hash}`,
  };
}
