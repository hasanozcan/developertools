export type EncodingWorkbenchFormat = 'base64' | 'url' | 'hex' | 'binary' | 'json-string';
export type EncodingWorkbenchMode = 'encode' | 'decode';

const textEncoder = new TextEncoder();

function decodeUtf8(bytes: Uint8Array, formatName: string): string {
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    throw new Error(`${formatName} input does not contain valid UTF-8 text.`);
  }
}

function encodeBase64(input: string): string {
  const bytes = textEncoder.encode(input);
  let binary = '';

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary);
}

function decodeBase64(input: string): string {
  const normalized = input.replace(/\s+/g, '');
  const binary = atob(normalized);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return decodeUtf8(bytes, 'Base64');
}

function encodeHex(input: string): string {
  return Array.from(textEncoder.encode(input), (byte) => byte.toString(16).padStart(2, '0')).join(
    '',
  );
}

function decodeHex(input: string): string {
  const normalized = input.trim().replace(/^0x/i, '').replace(/\s+/g, '');

  if (!normalized || normalized.length % 2 !== 0 || !/^[0-9a-f]+$/i.test(normalized)) {
    throw new Error('Hex input must contain an even number of hexadecimal digits.');
  }

  const bytes = new Uint8Array(normalized.length / 2);
  for (let index = 0; index < normalized.length; index += 2) {
    bytes[index / 2] = Number.parseInt(normalized.slice(index, index + 2), 16);
  }

  return decodeUtf8(bytes, 'Hex');
}

function encodeBinary(input: string): string {
  return Array.from(textEncoder.encode(input), (byte) => byte.toString(2).padStart(8, '0')).join(
    ' ',
  );
}

function decodeBinary(input: string): string {
  const normalized = input.replace(/\s+/g, '');

  if (!normalized || normalized.length % 8 !== 0 || !/^[01]+$/.test(normalized)) {
    throw new Error('Binary input must contain complete 8-bit byte groups.');
  }

  const bytes = new Uint8Array(normalized.length / 8);
  for (let index = 0; index < normalized.length; index += 8) {
    bytes[index / 8] = Number.parseInt(normalized.slice(index, index + 8), 2);
  }

  return decodeUtf8(bytes, 'Binary');
}

function encodeJsonString(input: string): string {
  return JSON.stringify(input).slice(1, -1);
}

function decodeJsonString(input: string): string {
  try {
    return JSON.parse(`"${input}"`) as string;
  } catch {
    throw new Error('JSON string input contains an invalid escape sequence.');
  }
}

export function convertEncoding(
  input: string,
  format: EncodingWorkbenchFormat,
  mode: EncodingWorkbenchMode,
): string {
  if (!input) return '';

  if (mode === 'encode') {
    switch (format) {
      case 'base64':
        return encodeBase64(input);
      case 'url':
        return encodeURIComponent(input);
      case 'hex':
        return encodeHex(input);
      case 'binary':
        return encodeBinary(input);
      case 'json-string':
        return encodeJsonString(input);
    }
  }

  switch (format) {
    case 'base64':
      return decodeBase64(input);
    case 'url':
      try {
        return decodeURIComponent(input);
      } catch {
        throw new Error('URL input contains an invalid percent-encoded sequence.');
      }
    case 'hex':
      return decodeHex(input);
    case 'binary':
      return decodeBinary(input);
    case 'json-string':
      return decodeJsonString(input);
  }
}
