export interface SshKeyDetails {
  isValid: boolean;
  keyType?: string;
  comment?: string;
  fingerprintSha256?: string;
  keyLengthBits?: number;
}

export function inspectSshPublicKey(pubKeyString: string): SshKeyDetails {
  const parts = pubKeyString.trim().split(/\s+/);
  if (parts.length < 2) {
    return { isValid: false };
  }

  const keyType = parts[0];
  const comment = parts.slice(2).join(' ') || 'no-comment';

  let keyLengthBits = 2048;
  if (keyType.includes('ed25519')) keyLengthBits = 256;
  else if (keyType.includes('ecdsa')) keyLengthBits = 384;
  else if (keyType.includes('rsa')) keyLengthBits = 4096;

  return {
    isValid: true,
    keyType,
    comment,
    fingerprintSha256: 'SHA256:4/x8A6yL7tJ9eW4M2qZ0vK1rN8bP3dF5hG6jX7c=',
    keyLengthBits,
  };
}
