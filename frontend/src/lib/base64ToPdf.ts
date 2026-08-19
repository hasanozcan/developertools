export function cleanBase64PdfString(rawInput: string): string {
  let cleaned = rawInput.trim();
  if (cleaned.startsWith('data:application/pdf;base64,')) {
    cleaned = cleaned.replace('data:application/pdf;base64,', '');
  } else if (cleaned.startsWith('data:')) {
    const commaIdx = cleaned.indexOf(',');
    if (commaIdx !== -1) {
      cleaned = cleaned.slice(commaIdx + 1);
    }
  }
  return cleaned.replace(/\s+/g, '');
}

export function base64ToPdfBlob(base64String: string): Blob {
  const cleaned = cleanBase64PdfString(base64String);
  const binary = atob(cleaned);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new Blob([bytes], { type: 'application/pdf' });
}

export function isValidBase64Pdf(rawInput: string): boolean {
  try {
    const cleaned = cleanBase64PdfString(rawInput);
    if (!cleaned || cleaned.length % 4 !== 0) return false;
    const binary = atob(cleaned.slice(0, 100)); // check first few bytes
    return binary.startsWith('%PDF-');
  } catch {
    return false;
  }
}
