export interface CertificateAlternativeName {
  type: string;
  value: string;
}

export interface CertificateInfo {
  index: number;
  subject: string;
  issuer: string;
  serialNumber: string;
  notBefore: string;
  notAfter: string;
  validity: 'valid' | 'expired' | 'not-yet-valid';
  daysRemaining: number;
  signatureAlgorithm: string;
  publicKeyAlgorithm: string;
  publicKeyDetails: string[];
  sha256Fingerprint: string;
  subjectAlternativeNames: CertificateAlternativeName[];
  selfIssued: boolean;
  selfSigned: boolean | null;
  extensions: Array<{ oid: string; critical: boolean }>;
  rawBytes: number;
}

export class CertificateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CertificateError';
  }
}

const MAX_INPUT_LENGTH = 250_000;
const MAX_CERTIFICATES = 10;
const CERTIFICATE_BLOCK = /-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/gu;
const BASE64_CERTIFICATE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/u;

function algorithmText(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value === null || typeof value !== 'object') return 'Unknown';
  const algorithm = value as Record<string, unknown>;
  const name = typeof algorithm.name === 'string' ? algorithm.name : 'Unknown';
  const hash = algorithm.hash;
  const hashName =
    typeof hash === 'string'
      ? hash
      : hash !== null &&
          typeof hash === 'object' &&
          typeof (hash as Record<string, unknown>).name === 'string'
        ? String((hash as Record<string, unknown>).name)
        : '';
  return hashName ? `${name} / ${hashName}` : name;
}

function publicKeyDetails(value: unknown): string[] {
  if (value === null || typeof value !== 'object') return [];
  const algorithm = value as Record<string, unknown>;
  const details: string[] = [];
  if (typeof algorithm.modulusLength === 'number')
    details.push(`${algorithm.modulusLength}-bit modulus`);
  if (typeof algorithm.namedCurve === 'string') details.push(`Curve ${algorithm.namedCurve}`);
  return details;
}

function formatFingerprint(bytes: Uint8Array): string {
  return [...bytes].map((byte) => byte.toString(16).padStart(2, '0').toUpperCase()).join(':');
}

function extractCertificates(input: string): string[] {
  const blocks = input.match(CERTIFICATE_BLOCK) ?? [];
  if (blocks.length > 0) return blocks;

  const compact = input.replace(/\s+/gu, '');
  if (compact && BASE64_CERTIFICATE.test(compact)) return [compact];
  throw new CertificateError(
    'No PEM CERTIFICATE block or Base64-encoded DER certificate was found. Private keys and CSRs are not accepted.',
  );
}

export async function parseX509Certificates(
  input: string,
  now = new Date(),
  cryptoApi: Crypto = crypto,
): Promise<CertificateInfo[]> {
  if (!input.trim()) throw new CertificateError('Paste a PEM or Base64 certificate first.');
  if (input.length > MAX_INPUT_LENGTH) {
    throw new CertificateError('Certificate input is limited to 250,000 characters.');
  }
  if (Number.isNaN(now.getTime())) throw new CertificateError('The comparison date is invalid.');

  const blocks = extractCertificates(input);
  if (blocks.length > MAX_CERTIFICATES) {
    throw new CertificateError(`At most ${MAX_CERTIFICATES} certificates can be decoded at once.`);
  }

  await import('reflect-metadata');
  const { SubjectAlternativeNameExtension, X509Certificate } = await import('@peculiar/x509');

  return Promise.all(
    blocks.map(async (block, index) => {
      try {
        const certificate = new X509Certificate(block);
        const fingerprintBuffer = await cryptoApi.subtle.digest('SHA-256', certificate.rawData);
        const san = certificate.getExtension(SubjectAlternativeNameExtension);
        const publicAlgorithm = certificate.publicKey.algorithm as unknown;
        const nowTime = now.getTime();
        const notBefore = certificate.notBefore.getTime();
        const notAfter = certificate.notAfter.getTime();
        const validity =
          nowTime < notBefore ? 'not-yet-valid' : nowTime > notAfter ? 'expired' : 'valid';
        let selfSigned: boolean | null = null;
        try {
          selfSigned = await certificate.isSelfSigned(cryptoApi);
        } catch {
          selfSigned = null;
        }

        return {
          index: index + 1,
          subject: certificate.subject,
          issuer: certificate.issuer,
          serialNumber: certificate.serialNumber,
          notBefore: certificate.notBefore.toISOString(),
          notAfter: certificate.notAfter.toISOString(),
          validity,
          daysRemaining: Math.ceil((notAfter - nowTime) / 86_400_000),
          signatureAlgorithm: algorithmText(certificate.signatureAlgorithm),
          publicKeyAlgorithm: algorithmText(publicAlgorithm),
          publicKeyDetails: publicKeyDetails(publicAlgorithm),
          sha256Fingerprint: formatFingerprint(new Uint8Array(fingerprintBuffer)),
          subjectAlternativeNames:
            san?.names.items.map((name) => ({ type: name.type, value: name.value })) ?? [],
          selfIssued: certificate.subject === certificate.issuer,
          selfSigned,
          extensions: certificate.extensions.map((extension) => ({
            oid: extension.type,
            critical: extension.critical,
          })),
          rawBytes: certificate.rawData.byteLength,
        } satisfies CertificateInfo;
      } catch (error) {
        if (error instanceof CertificateError) throw error;
        throw new CertificateError(
          `Certificate ${index + 1} could not be decoded: ${error instanceof Error ? error.message : 'invalid X.509 data'}`,
        );
      }
    }),
  );
}
