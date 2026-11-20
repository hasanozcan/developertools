import { sanitizeSvg } from './svgToPng';

export interface DecodedImageInfo {
  dataUrl: string;
  mimeType: string;
  extension: string;
  approxSizeKb: number;
}

const BASE64_PAYLOAD_RE = /^[A-Za-z0-9+/]+={0,2}$/;

function decodeBase64Utf8(base64: string): string {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
}

function encodeUtf8Base64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function parseBase64Image(rawInput: string): DecodedImageInfo | null {
  const trimmed = rawInput.trim();
  if (!trimmed) return null;

  let mimeType = 'image/png';
  let cleanBase64 = trimmed;

  const dataUriMatch =
    /^data:(image\/[a-zA-Z0-9+.-]+)(?:;charset=[a-zA-Z0-9._-]+)?;base64,(.+)$/is.exec(trimmed);
  if (dataUriMatch) {
    mimeType = dataUriMatch[1].toLowerCase();
    cleanBase64 = dataUriMatch[2].replace(/\s/g, '');
  } else {
    cleanBase64 = trimmed.replace(/\s/g, '');
    // Determine mimeType if it starts with typical signatures or fallback
    if (cleanBase64.startsWith('/9j/')) {
      mimeType = 'image/jpeg';
    } else if (cleanBase64.startsWith('iVBORw0KGgo')) {
      mimeType = 'image/png';
    } else if (cleanBase64.startsWith('R0lGOD')) {
      mimeType = 'image/gif';
    } else if (cleanBase64.startsWith('UklGR')) {
      mimeType = 'image/webp';
    } else if (/^PHN2Z[w-z0-9+/]/.test(cleanBase64)) {
      mimeType = 'image/svg+xml';
    }
  }

  if (!cleanBase64 || !BASE64_PAYLOAD_RE.test(cleanBase64)) {
    return null;
  }
  if (cleanBase64.includes('=') && cleanBase64.length % 4 !== 0) {
    return null;
  }

  try {
    atob(cleanBase64);
  } catch {
    return null;
  }

  if (mimeType === 'image/svg+xml') {
    try {
      const decodedSvg = decodeBase64Utf8(cleanBase64);
      const safeSvg = sanitizeSvg(decodedSvg);
      if (!safeSvg.trim() || !/<svg\b/i.test(safeSvg)) {
        return null;
      }
      cleanBase64 = encodeUtf8Base64(safeSvg);
    } catch {
      return null;
    }
  }

  const extension = mimeType.replace('image/', '').replace('+xml', '');
  const dataUrl = `data:${mimeType};base64,${cleanBase64}`;
  const approxSizeKb = Number(((cleanBase64.length * 0.75) / 1024).toFixed(2));

  return {
    dataUrl,
    mimeType,
    extension,
    approxSizeKb,
  };
}
