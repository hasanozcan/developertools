export interface CsrInfo {
  isCsr: boolean;
  commonName?: string;
  sans: string[];
  rawLength: number;
}

export function parseCsr(csrPem: string): CsrInfo {
  const clean = csrPem || '';
  const isCsr = clean.includes('-----BEGIN CERTIFICATE REQUEST-----') || clean.includes('-----BEGIN NEW CERTIFICATE REQUEST-----');
  const sans: string[] = [];
  const cnMatch = clean.match(/CN\s*=\s*([^\n,]+)/i);

  return {
    isCsr,
    commonName: cnMatch ? cnMatch[1].trim() : undefined,
    sans,
    rawLength: clean.length,
  };
}