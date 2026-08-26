export interface PdfFileItem {
  id: string;
  name: string;
  size: number;
  data: Uint8Array;
  pageCount?: number;
}

export function parsePdfPageCountFromBytes(bytes: Uint8Array): number {
  const text = new TextDecoder('latin1').decode(bytes);
  // Count /Type /Page (excluding /Type /Pages)
  const matches = text.match(/\/Type\s*\/Page(?!\s*s)/g);
  if (matches && matches.length > 0) {
    return matches.length;
  }

  // Fallback: look for /Count in /Pages dictionary
  const countMatch = text.match(/\/Type\s*\/Pages[\s\S]*?\/Count\s+(\d+)/);
  if (countMatch && countMatch[1]) {
    return parseInt(countMatch[1], 10);
  }

  return 1;
}

export function validatePdfHeader(bytes: Uint8Array): boolean {
  if (bytes.length < 5) return false;
  // %PDF-
  return (
    bytes[0] === 0x25 && // %
    bytes[1] === 0x50 && // P
    bytes[2] === 0x44 && // D
    bytes[3] === 0x46 && // F
    bytes[4] === 0x2d    // -
  );
}

export function reorderPdfList<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}
