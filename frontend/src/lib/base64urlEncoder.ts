function utf8ToBinaryString(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return binary;
}

function binaryStringToUtf8(binary: string): string {
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

/** Converts a standard Base64 string (+, /, =) to Base64url (-, _) without padding. */
export function base64ToBase64Url(standardBase64: string): string {
  return standardBase64.trim().replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Converts a Base64url string (-, _) to standard Base64 (+, /) with `=` padding. */
export function base64UrlToBase64(base64Url: string): string {
  const cleaned = base64Url.trim().replace(/-/g, '+').replace(/_/g, '/').replace(/=+$/, '');
  if (!/^[A-Za-z0-9+/]*$/.test(cleaned) || cleaned.length % 4 === 1) {
    throw new Error('Input is not valid Base64url.');
  }
  return cleaned + '='.repeat((4 - (cleaned.length % 4)) % 4);
}

/** Encodes text as UTF-8 and returns unpadded Base64url. */
export function encodeBase64Url(text: string): string {
  return base64ToBase64Url(btoa(utf8ToBinaryString(text)));
}

/** Decodes Base64url (padded or unpadded) to UTF-8 text. */
export function decodeBase64Url(base64Url: string): string {
  return binaryStringToUtf8(atob(base64UrlToBase64(base64Url)));
}
