export function encodeQuotedPrintable(text: string): string {
  if (!text) return '';
  const utf8Bytes = new TextEncoder().encode(text);
  let result = '';
  let lineLen = 0;

  for (let i = 0; i < utf8Bytes.length; i++) {
    const byte = utf8Bytes[i];

    if ((byte >= 33 && byte <= 60) || (byte >= 62 && byte <= 126)) {
      if (lineLen >= 75) {
        result += '=\r\n';
        lineLen = 0;
      }
      result += String.fromCharCode(byte);
      lineLen += 1;
    } else if (byte === 32 || byte === 9) {
      if (lineLen >= 75) {
        result += '=\r\n';
        lineLen = 0;
      }
      result += String.fromCharCode(byte);
      lineLen += 1;
    } else if (byte === 13 && utf8Bytes[i + 1] === 10) {
      result += '\r\n';
      lineLen = 0;
      i++;
    } else if (byte === 10) {
      result += '\r\n';
      lineLen = 0;
    } else {
      if (lineLen >= 73) {
        result += '=\r\n';
        lineLen = 0;
      }
      const hex = byte.toString(16).toUpperCase().padStart(2, '0');
      result += `=${hex}`;
      lineLen += 3;
    }
  }

  return result;
}

export function decodeQuotedPrintable(qp: string): string {
  if (!qp) return '';
  const cleaned = qp.replace(/=\r?\n/g, '');

  const bytes: number[] = [];
  for (let i = 0; i < cleaned.length; i++) {
    if (cleaned[i] === '=' && i + 2 < cleaned.length) {
      const hex = cleaned.slice(i + 1, i + 3);
      if (/^[0-9A-Fa-f]{2}$/.test(hex)) {
        bytes.push(parseInt(hex, 16));
        i += 2;
        continue;
      }
    }
    bytes.push(cleaned.charCodeAt(i));
  }

  return new TextDecoder().decode(new Uint8Array(bytes));
}
