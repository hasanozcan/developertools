export type MacFormat = 'colon' | 'hyphen' | 'cisco' | 'none';

export interface MacOptions {
  format: MacFormat;
  caseType: 'upper' | 'lower';
  isUnicast: boolean;
  prefix?: string; // e.g. 00:1A:2B
}

export function generateMacAddress(options: MacOptions = { format: 'colon', caseType: 'upper', isUnicast: true }): string {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);

  if (options.isUnicast) {
    // ensure least significant bit of first byte is 0 (unicast)
    bytes[0] = bytes[0] & 0xfe;
  }

  // If custom prefix provided
  if (options.prefix) {
    const cleanPrefix = options.prefix.replace(/[^0-9a-fA-F]/g, '');
    for (let i = 0; i < Math.min(3, Math.floor(cleanPrefix.length / 2)); i++) {
      bytes[i] = parseInt(cleanPrefix.substring(i * 2, i * 2 + 2), 16);
    }
  }

  const hexBytes = Array.from(bytes).map((b) => {
    const h = b.toString(16).padStart(2, '0');
    return options.caseType === 'upper' ? h.toUpperCase() : h.toLowerCase();
  });

  if (options.format === 'colon') {
    return hexBytes.join(':');
  } else if (options.format === 'hyphen') {
    return hexBytes.join('-');
  } else if (options.format === 'cisco') {
    return `${hexBytes[0]}${hexBytes[1]}.${hexBytes[2]}${hexBytes[3]}.${hexBytes[4]}${hexBytes[5]}`;
  } else {
    return hexBytes.join('');
  }
}
