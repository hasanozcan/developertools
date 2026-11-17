export interface SshKeyDetails {
  isValid: boolean;
  keyType?: string;
  curve?: string;
  comment?: string;
  fingerprintSha256?: string;
  keyLengthBits?: number;
  error?: string;
}

const BASE64_PATTERN = /^[A-Za-z0-9+/]+={0,2}$/u;

function decodeBase64(b64: string): Uint8Array {
  if (!b64 || b64.length % 4 !== 0 || !BASE64_PATTERN.test(b64)) {
    throw new Error('Invalid Base64 key blob.');
  }
  const binary = atob(b64);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

function readSshString(blob: Uint8Array, offset: number): { data: Uint8Array; nextOffset: number } {
  if (offset + 4 > blob.length) {
    throw new Error('Truncated SSH wire-format length prefix.');
  }
  const view = new DataView(blob.buffer, blob.byteOffset, blob.byteLength);
  const length = view.getUint32(offset, false);
  const start = offset + 4;
  const end = start + length;
  if (end > blob.length) {
    throw new Error('Truncated SSH wire-format field.');
  }
  return { data: blob.subarray(start, end), nextOffset: end };
}

function mpintBitLength(bytes: Uint8Array): number {
  let start = 0;
  while (start < bytes.length && bytes[start] === 0) {
    start++;
  }
  if (start >= bytes.length) return 0;
  const remaining = bytes.length - start;
  return (remaining - 1) * 8 + (32 - Math.clz32(bytes[start]));
}

function bytesToBase64NoPad(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/=+$/u, '');
}

/**
 * Parses an OpenSSH public key line, decodes its binary wire format, extracts key type,
 * bit length / curve, comment, and computes the real SHA-256 fingerprint.
 */
export async function inspectSshPublicKey(pubKeyString: string): Promise<SshKeyDetails> {
  const trimmed = pubKeyString.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Paste an OpenSSH public key.' };
  }

  const parts = trimmed.split(/\s+/u);
  if (parts.length < 2) {
    return { isValid: false, error: 'Expected "<key-type> <base64-blob> [comment]".' };
  }

  const [declaredType, base64Blob, ...commentParts] = parts;
  const comment = commentParts.join(' ') || undefined;

  let blob: Uint8Array;
  try {
    blob = decodeBase64(base64Blob);
  } catch (err: unknown) {
    return {
      isValid: false,
      error: err instanceof Error ? err.message : 'Invalid Base64 key data.',
    };
  }

  try {
    const typeField = readSshString(blob, 0);
    const wireKeyType = new TextDecoder('utf-8', { fatal: true }).decode(typeField.data);
    if (wireKeyType !== declaredType) {
      return {
        isValid: false,
        error: `Declared key type "${declaredType}" does not match wire-format type "${wireKeyType}".`,
      };
    }

    let offset = typeField.nextOffset;
    let keyLengthBits: number | undefined;
    let curve: string | undefined;

    if (wireKeyType === 'ssh-rsa') {
      const e = readSshString(blob, offset);
      const n = readSshString(blob, e.nextOffset);
      offset = n.nextOffset;
      keyLengthBits = mpintBitLength(n.data);
      if (keyLengthBits === 0) {
        return { isValid: false, error: 'RSA modulus cannot be zero.' };
      }
    } else if (wireKeyType === 'ssh-ed25519') {
      const pk = readSshString(blob, offset);
      offset = pk.nextOffset;
      if (pk.data.length !== 32) {
        return { isValid: false, error: `Invalid Ed25519 public key length (${pk.data.length} bytes).` };
      }
      keyLengthBits = 256;
      curve = 'Ed25519';
    } else if (wireKeyType === 'sk-ssh-ed25519@openssh.com') {
      const pk = readSshString(blob, offset);
      const app = readSshString(blob, pk.nextOffset);
      offset = app.nextOffset;
      if (pk.data.length !== 32) {
        return { isValid: false, error: `Invalid SK-Ed25519 public key length (${pk.data.length} bytes).` };
      }
      keyLengthBits = 256;
      curve = 'Ed25519';
    } else if (wireKeyType === 'ssh-dss') {
      const p = readSshString(blob, offset);
      const q = readSshString(blob, p.nextOffset);
      const g = readSshString(blob, q.nextOffset);
      const y = readSshString(blob, g.nextOffset);
      offset = y.nextOffset;
      keyLengthBits = mpintBitLength(p.data);
    } else if (
      wireKeyType === 'ecdsa-sha2-nistp256' ||
      wireKeyType === 'ecdsa-sha2-nistp384' ||
      wireKeyType === 'ecdsa-sha2-nistp521'
    ) {
      const curveField = readSshString(blob, offset);
      const pointField = readSshString(blob, curveField.nextOffset);
      offset = pointField.nextOffset;
      curve = new TextDecoder('utf-8', { fatal: true }).decode(curveField.data);
      const expectedCurve = wireKeyType.replace('ecdsa-sha2-', '');
      if (curve !== expectedCurve) {
        return { isValid: false, error: `ECDSA curve mismatch: expected ${expectedCurve}, got ${curve}.` };
      }
      keyLengthBits = curve === 'nistp256' ? 256 : curve === 'nistp384' ? 384 : 521;
    } else if (wireKeyType === 'sk-ecdsa-sha2-nistp256@openssh.com') {
      const curveField = readSshString(blob, offset);
      const pointField = readSshString(blob, curveField.nextOffset);
      const app = readSshString(blob, pointField.nextOffset);
      offset = app.nextOffset;
      curve = new TextDecoder('utf-8', { fatal: true }).decode(curveField.data);
      keyLengthBits = 256;
    } else {
      return {
        isValid: false,
        error: `Unsupported SSH public key type: ${wireKeyType}`,
      };
    }

    if (offset !== blob.length) {
      return { isValid: false, error: 'Unexpected trailing bytes in SSH public key blob.' };
    }

    const hashBuffer = await crypto.subtle.digest(
      'SHA-256',
      blob as unknown as BufferSource,
    );
    const fingerprintSha256 = `SHA256:${bytesToBase64NoPad(new Uint8Array(hashBuffer))}`;

    return {
      isValid: true,
      keyType: wireKeyType,
      curve,
      comment,
      fingerprintSha256,
      keyLengthBits,
    };
  } catch (err: unknown) {
    return {
      isValid: false,
      error: err instanceof Error ? err.message : 'Invalid SSH public key wire format.',
    };
  }
}
