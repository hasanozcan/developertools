export function hexToBase64(hexStr: string): string {
  const cleanHex = hexStr.replace(/[^0-9a-fA-F]/g, '');
  if (cleanHex.length === 0) return '';
  if (cleanHex.length % 2 !== 0) {
    throw new Error('Hex string must have an even number of characters');
  }

  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < cleanHex.length; i += 2) {
    bytes[i / 2] = parseInt(cleanHex.substring(i, i + 2), 16);
  }

  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
}

export function base64ToHex(base64Str: string): string {
  const cleanB64 = base64Str.trim().replace(/\s+/g, '');
  if (!cleanB64) return '';

  const binary = atob(cleanB64);
  const hexArr: string[] = [];

  for (let i = 0; i < binary.length; i++) {
    const hex = binary.charCodeAt(i).toString(16).padStart(2, '0');
    hexArr.push(hex);
  }

  return hexArr.join('');
}
