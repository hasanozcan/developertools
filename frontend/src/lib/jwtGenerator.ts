export function base64UrlEncode(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function base64UrlEncodeBuffer(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export interface JwtTokenOptions {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  secret: string;
  algorithm: 'HS256' | 'HS384' | 'HS512';
}

export async function generateJwtToken(options: JwtTokenOptions): Promise<{ token: string; headerB64: string; payloadB64: string; signatureB64: string }> {
  const { header, payload, secret, algorithm } = options;

  const headerB64 = base64UrlEncode(JSON.stringify(header));
  const payloadB64 = base64UrlEncode(JSON.stringify(payload));
  const dataToSign = `${headerB64}.${payloadB64}`;

  if (!secret) {
    return {
      token: `${dataToSign}.`,
      headerB64,
      payloadB64,
      signatureB64: '',
    };
  }

  const hashAlg = algorithm === 'HS384' ? 'SHA-384' : algorithm === 'HS512' ? 'SHA-512' : 'SHA-256';

  const keyData = new TextEncoder().encode(secret);
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: { name: hashAlg } },
    false,
    ['sign']
  );

  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    new TextEncoder().encode(dataToSign)
  );

  const signatureB64 = base64UrlEncodeBuffer(signatureBuffer);
  const token = `${dataToSign}.${signatureB64}`;

  return {
    token,
    headerB64,
    payloadB64,
    signatureB64,
  };
}
