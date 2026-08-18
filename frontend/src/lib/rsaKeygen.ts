export interface KeyPairResult {
  publicKeyPem: string;
  privateKeyPem: string;
  algorithm: string;
  keySizeOrCurve: string;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function formatAsPem(base64: string, type: 'PUBLIC KEY' | 'PRIVATE KEY'): string {
  const lines = base64.match(/.{1,64}/g) || [];
  return `-----BEGIN ${type}-----\n${lines.join('\n')}\n-----END ${type}-----`;
}

export async function generateRsaKeyPair(modulusLength: 2048 | 3072 | 4096 = 2048): Promise<KeyPairResult> {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['encrypt', 'decrypt'],
  );

  const spkiExport = await window.crypto.subtle.exportKey('spki', keyPair.publicKey);
  const pkcs8Export = await window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey);

  return {
    publicKeyPem: formatAsPem(arrayBufferToBase64(spkiExport), 'PUBLIC KEY'),
    privateKeyPem: formatAsPem(arrayBufferToBase64(pkcs8Export), 'PRIVATE KEY'),
    algorithm: 'RSA-OAEP',
    keySizeOrCurve: `${modulusLength}-bit`,
  };
}

export async function generateEcdsaKeyPair(namedCurve: 'P-256' | 'P-384' | 'P-521' = 'P-256'): Promise<KeyPairResult> {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: 'ECDSA',
      namedCurve,
    },
    true,
    ['sign', 'verify'],
  );

  const spkiExport = await window.crypto.subtle.exportKey('spki', keyPair.publicKey);
  const pkcs8Export = await window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey);

  return {
    publicKeyPem: formatAsPem(arrayBufferToBase64(spkiExport), 'PUBLIC KEY'),
    privateKeyPem: formatAsPem(arrayBufferToBase64(pkcs8Export), 'PRIVATE KEY'),
    algorithm: 'ECDSA',
    keySizeOrCurve: namedCurve,
  };
}
