import { CertificateError, parseX509Certificates } from './certificate';

export interface CertificateDetails {
  isValidPem: boolean;
  subject?: string;
  commonName?: string;
  issuer?: string;
  serialNumber?: string;
  notBefore?: string;
  notAfter?: string;
  validity?: 'valid' | 'expired' | 'not-yet-valid';
  sans?: string[];
  daysRemaining?: number;
  sha256Fingerprint?: string;
  signatureAlgorithm?: string;
  publicKeyAlgorithm?: string;
  error?: string;
}

function extractCommonName(distinguishedName: string): string | undefined {
  const match = /(?:^|,\s*)CN=((?:\\,|[^,])+)/i.exec(distinguishedName);
  return match ? match[1].replace(/\\(.)/g, '$1').trim() : undefined;
}

/**
 * Parses a PEM X.509 certificate using @peculiar/x509 (via certificate.ts)
 * and returns decoded subject, issuer, serial, validity, SANs, and SHA-256 fingerprint.
 */
export async function inspectPemCertificate(
  pemText: string,
  now: Date = new Date(),
  cryptoApi: Crypto = crypto,
): Promise<CertificateDetails> {
  const clean = pemText.trim();
  const hasPemEnvelope =
    clean.includes('-----BEGIN CERTIFICATE-----') && clean.includes('-----END CERTIFICATE-----');

  if (!hasPemEnvelope) {
    return {
      isValidPem: false,
      error: 'Expected a PEM-encoded X.509 certificate (-----BEGIN CERTIFICATE----- ... -----END CERTIFICATE-----).',
    };
  }

  try {
    await import('reflect-metadata');
    const { cryptoProvider } = await import('@peculiar/x509');
    cryptoProvider.set(cryptoApi);

    const [cert] = await parseX509Certificates(clean, now, cryptoApi);
    if (!cert) {
      return { isValidPem: false, error: 'No X.509 certificate found in PEM input.' };
    }

    return {
      isValidPem: true,
      subject: cert.subject,
      commonName: extractCommonName(cert.subject),
      issuer: cert.issuer,
      serialNumber: cert.serialNumber,
      notBefore: cert.notBefore,
      notAfter: cert.notAfter,
      validity: cert.validity,
      sans: cert.subjectAlternativeNames.map((san) => san.value),
      daysRemaining: cert.daysRemaining,
      sha256Fingerprint: cert.sha256Fingerprint,
      signatureAlgorithm: cert.signatureAlgorithm,
      publicKeyAlgorithm: cert.publicKeyAlgorithm,
    };
  } catch (err: unknown) {
    return {
      isValidPem: false,
      error:
        err instanceof CertificateError || err instanceof Error
          ? err.message
          : 'Failed to decode PEM X.509 certificate.',
    };
  }
}
