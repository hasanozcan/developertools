export interface DecodedImageInfo {
  dataUrl: string;
  mimeType: string;
  extension: string;
  approxSizeKb: number;
}

export function parseBase64Image(rawInput: string): DecodedImageInfo | null {
  const trimmed = rawInput.trim();
  if (!trimmed) return null;

  let mimeType = 'image/png';
  let cleanBase64 = trimmed;

  const dataUriMatch = /^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/s.exec(trimmed);
  if (dataUriMatch) {
    mimeType = dataUriMatch[1];
    cleanBase64 = dataUriMatch[2].replace(/\s/g, '');
  } else {
    // Determine mimeType if it starts with typical signatures or fallback
    if (trimmed.startsWith('/9j/')) {
      mimeType = 'image/jpeg';
    } else if (trimmed.startsWith('iVBORw0KGgo')) {
      mimeType = 'image/png';
    } else if (trimmed.startsWith('R0lGOD')) {
      mimeType = 'image/gif';
    } else if (trimmed.startsWith('UklGR')) {
      mimeType = 'image/webp';
    } else if (trimmed.startsWith('PHN2Zy')) {
      mimeType = 'image/svg+xml';
    }
    cleanBase64 = trimmed.replace(/\s/g, '');
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
