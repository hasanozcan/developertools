'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useEffect, useState } from 'react';
import { inspectPemCertificate, type CertificateDetails } from '@/lib/sslCertificateInspector';

const SAMPLE_PEM_CERTIFICATE = `-----BEGIN CERTIFICATE-----
MIIBkzCCATigAwIBAgIBATAKBggqhkjOPQQDAjA3MRowGAYDVQQDExFkZXZzdG9v
bHMuZXhhbXBsZTEZMBcGA1UEChMQRGV2c1Rvb2xzIFNhbXBsZTAeFw0yNTAxMDEw
MDAwMDBaFw0zNTAxMDEwMDAwMDBaMDcxGjAYBgNVBAMTEWRldnN0b29scy5leGFt
cGxlMRkwFwYDVQQKExBEZXZzVG9vbHMgU2FtcGxlMFkwEwYHKoZIzj0CAQYIKoZI
zj0DAQcDQgAEJ24KRITKiRClmS6Ne2i8IAyKU9cKDSGbcvXhOnYj0VpuPawXlCxX
a3AmP3MHTNdTQVp6vuUZJxSc+JHecCCiHaM1MDMwMQYDVR0RBCowKIIRZGV2c3Rv
b2xzLmV4YW1wbGWCEyouZGV2c3Rvb2xzLmV4YW1wbGUwCgYIKoZIzj0EAwIDSQAw
RgIhAJqR1GDxDSzAFOY6Z8g1jVOZRN3RWC0rPaFJCR/vpHVqAiEA1rbj9sbuK6ZG
RjUWMJb+e7oXKMjIBwO4nYdnYGMdawY=
-----END CERTIFICATE-----`;

export default function SslCertificateInspectorTool() {
  const { t } = useLanguage();
  const [cert, setCert] = useState(SAMPLE_PEM_CERTIFICATE);
  const [details, setDetails] = useState<CertificateDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    inspectPemCertificate(cert)
      .then((res) => {
        if (!active) return;
        setDetails(res);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setDetails({
          isValidPem: false,
          error: err instanceof Error ? err.message : 'Failed to parse certificate.',
        });
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [cert]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <textarea
          rows={10}
          value={cert}
          onChange={(e) => setCert(e.target.value)}
          className="w-full rounded-xl border border-slate-200 p-3 font-mono text-xs dark:border-white/10 dark:bg-slate-950"
        />

        {details && !details.isValidPem ? (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-xs space-y-1 text-red-700 dark:text-red-300">
            <p>
              <strong>{t('uiText.7112c863')}</strong> {t('uiText.41e68bba')}
            </p>
            {details.error && <p>{details.error}</p>}
          </div>
        ) : (
          <div className="p-4 bg-indigo-500/10 rounded-xl text-xs space-y-1.5 font-mono">
            <p>
              <strong>{t('uiText.7112c863')}</strong>{' '}
              {loading && !details
                ? '...'
                : details?.isValidPem
                  ? t('uiText.9355e4f0')
                  : t('uiText.41e68bba')}
            </p>
            <p>
              <strong>{t('uiText.c91c1837')}</strong> {details?.commonName || '-'}
            </p>
            <p className="break-all">
              <strong>Subject:</strong> {details?.subject || '-'}
            </p>
            <p className="break-all">
              <strong>{t('tool.jwtDecoder.issuer')}</strong> {details?.issuer || '-'}
            </p>
            <p>
              <strong>Serial:</strong> {details?.serialNumber || '-'}
            </p>
            <p>
              <strong>Valid From:</strong> {details?.notBefore || '-'}
            </p>
            <p>
              <strong>Valid To:</strong> {details?.notAfter || '-'}
            </p>
            <p>
              <strong>Days Remaining:</strong>{' '}
              {details?.daysRemaining !== undefined ? `${details.daysRemaining} (${details.validity})` : '-'}
            </p>
            <p className="break-all">
              <strong>SANs:</strong> {details?.sans?.length ? details.sans.join(', ') : '-'}
            </p>
            <p className="break-all">
              <strong>SHA-256 Fingerprint:</strong> {details?.sha256Fingerprint || '-'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
