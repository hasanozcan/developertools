import 'reflect-metadata';
import { Pkcs10CertificateRequest, SubjectAlternativeNameExtension } from '@peculiar/x509';

export interface CsrSanEntry {
  type: string;
  value: string;
}

export interface CsrInfo {
  isCsr: boolean;
  subject?: string;
  commonName?: string;
  sans: string[];
  sanEntries?: CsrSanEntry[];
  signatureAlgorithm?: string;
  publicKeyAlgorithm?: string;
  publicKeyDetails?: string[];
  extensions?: Array<{ oid: string; critical: boolean }>;
  attributes?: string[];
  sha256Fingerprint?: string;
  signatureValid?: boolean | null;
  rawLength: number;
  error?: string;
}

const CSR_PEM_BLOCK =
  /-----BEGIN (?:NEW )?CERTIFICATE REQUEST-----[\s\S]*?-----END (?:NEW )?CERTIFICATE REQUEST-----/u;

function formatAlgorithm(value: unknown): string {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return 'Unknown';
  const rec = value as Record<string, unknown>;
  const name = typeof rec.name === 'string' ? rec.name : 'Unknown';
  const hash = rec.hash;
  const hashName =
    typeof hash === 'string'
      ? hash
      : hash &&
          typeof hash === 'object' &&
          typeof (hash as Record<string, unknown>).name === 'string'
        ? String((hash as Record<string, unknown>).name)
        : '';
  return hashName ? `${name} / ${hashName}` : name;
}

function getPublicKeyDetails(value: unknown): string[] {
  if (!value || typeof value !== 'object') return [];
  const rec = value as Record<string, unknown>;
  const details: string[] = [];
  if (typeof rec.modulusLength === 'number') {
    details.push(`${rec.modulusLength}-bit modulus`);
  }
  if (typeof rec.namedCurve === 'string') {
    details.push(`Curve ${rec.namedCurve}`);
  }
  return details;
}

function formatFingerprint(bytes: Uint8Array): string {
  return [...bytes].map((b) => b.toString(16).padStart(2, '0').toUpperCase()).join(':');
}

function normalizePemInput(raw: string): string {
  return (raw || '')
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .trim();
}

export function parseCsr(csrPem: string): CsrInfo {
  const clean = normalizePemInput(csrPem);
  const blockMatch = clean.match(CSR_PEM_BLOCK);
  const hasCsrBlock = Boolean(blockMatch);

  if (!clean) {
    return {
      isCsr: false,
      sans: [],
      rawLength: 0,
      error: 'Paste a PEM-encoded PKCS#10 Certificate Signing Request.',
    };
  }

  if (!hasCsrBlock) {
    return {
      isCsr: false,
      sans: [],
      rawLength: clean.length,
      error: 'No -----BEGIN CERTIFICATE REQUEST----- PEM block found.',
    };
  }

  try {
    const csr = new Pkcs10CertificateRequest(blockMatch![0]);
    const cnValues = csr.subjectName.getField('CN');
    const sanExtRaw = csr.getExtension('2.5.29.17');
    let sanEntries: CsrSanEntry[] = [];
    if (sanExtRaw) {
      const sanExt = new SubjectAlternativeNameExtension(sanExtRaw.rawData);
      sanEntries = sanExt.names.items.map((item) => ({
        type: item.type,
        value: item.value,
      }));
    }

    const publicAlg = csr.publicKey.algorithm as unknown;

    return {
      isCsr: true,
      subject: csr.subject || '(Empty Subject)',
      commonName: cnValues[0],
      sans: sanEntries.map((item) => `${item.type}: ${item.value}`),
      sanEntries,
      signatureAlgorithm: formatAlgorithm(csr.signatureAlgorithm),
      publicKeyAlgorithm: formatAlgorithm(publicAlg),
      publicKeyDetails: getPublicKeyDetails(publicAlg),
      extensions: csr.extensions.map((ext) => ({
        oid: ext.type,
        critical: ext.critical,
      })),
      attributes: csr.attributes.map((attr) => attr.type),
      rawLength: csr.rawData.byteLength,
    };
  } catch (err) {
    const cnFallback = clean.match(/CN\s*=\s*([^\n,]+)/i);
    return {
      isCsr: hasCsrBlock,
      commonName: cnFallback ? cnFallback[1].trim() : undefined,
      sans: [],
      rawLength: clean.length,
      error:
        err instanceof Error
          ? `Unable to decode CSR ASN.1 structure: ${err.message}`
          : 'Unable to decode CSR ASN.1 structure.',
    };
  }
}

export async function parseCsrAsync(
  csrPem: string,
  cryptoApi: Crypto = globalThis.crypto,
): Promise<CsrInfo> {
  const base = parseCsr(csrPem);
  if (!base.isCsr || base.error) {
    return base;
  }

  const clean = normalizePemInput(csrPem);
  const blockMatch = clean.match(CSR_PEM_BLOCK);
  if (!blockMatch) return base;

  try {
    const csr = new Pkcs10CertificateRequest(blockMatch[0]);
    let sha256Fingerprint: string | undefined;
    let signatureValid: boolean | null = null;

    if (cryptoApi?.subtle) {
      const digest = await cryptoApi.subtle.digest('SHA-256', csr.rawData);
      sha256Fingerprint = formatFingerprint(new Uint8Array(digest));
      try {
        signatureValid = await csr.verify(cryptoApi);
      } catch {
        signatureValid = null;
      }
    }

    return {
      ...base,
      sha256Fingerprint,
      signatureValid,
    };
  } catch (err) {
    return {
      ...base,
      error: err instanceof Error ? err.message : 'CSR verification error.',
    };
  }
}
