'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, FileKey2, ShieldAlert } from 'lucide-react';
import CopyButton from '@/components/common/CopyButton';
import { parseCsr, parseCsrAsync, type CsrInfo } from '@/lib/x509CsrDecoder';

const SAMPLE_CSR = `-----BEGIN CERTIFICATE REQUEST-----
MIIBHzCBxgIBADAqMRQwEgYDVQQDEwtleGFtcGxlLmNvbTESMBAGA1UEChMJRGV2
c1Rvb2xzMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEZKX2cX3t7lIzHM5uC9c+
CZXr7u/9RhgpB1TWRcxZ3fqjN63K6eMtM+9yPUiARbBulZIvJ2xCLaJeWxORpcPL
E6A6MDgGCSqGSIb3DQEJDjErMCkwJwYDVR0RBCAwHoILZXhhbXBsZS5jb22CD3d3
dy5leGFtcGxlLmNvbTAKBggqhkjOPQQDAgNIADBFAiEA58X5VqE1jX0gNGREGYFf
vjhj9AKxq2TqKPEDZa76Fp4CIBoO424jXZBkzrQolb9PGVjLk4R2JazV5XmR8Qua
N1W9
-----END CERTIFICATE REQUEST-----`;

export default function X509CsrDecoderTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState(SAMPLE_CSR);
  const [asyncDetails, setAsyncDetails] = useState<{
    sha256Fingerprint?: string;
    signatureValid?: boolean | null;
  }>({});

  const parsed: CsrInfo = useMemo(() => parseCsr(input), [input]);

  useEffect(() => {
    let cancelled = false;
    setAsyncDetails({});
    if (!parsed.isCsr || parsed.error) {
      return;
    }

    parseCsrAsync(input)
      .then((res) => {
        if (!cancelled) {
          setAsyncDetails({
            sha256Fingerprint: res.sha256Fingerprint,
            signatureValid: res.signatureValid,
          });
        }
      })
      .catch(() => {
        // Keep synchronous decode fields if WebCrypto is unavailable.
      });

    return () => {
      cancelled = true;
    };
  }, [input, parsed.isCsr, parsed.error]);

  const combined = useMemo(
    () => ({
      ...parsed,
      ...asyncDetails,
    }),
    [parsed, asyncDetails],
  );

  const jsonOutput = useMemo(() => JSON.stringify(combined, null, 2), [combined]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="csr-pem-input" className="text-sm font-medium text-muted-foreground">
            {t('common.input')}
          </label>
          <button
            type="button"
            onClick={() => setInput(SAMPLE_CSR)}
            className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            {t('common.loadSample')}
          </button>
        </div>
        <textarea
          id="csr-pem-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={9}
          placeholder="-----BEGIN CERTIFICATE REQUEST-----"
          className="w-full rounded-xl border border-border bg-card p-4 font-mono text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {combined.error ? (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
        >
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{combined.error}</span>
        </div>
      ) : (
        <div className="surface-card rounded-2xl p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <FileKey2 className="h-4 w-4 text-indigo-500" />
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Decoded PKCS#10 CSR
              </span>
              {combined.signatureValid === true && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Signature Valid
                </span>
              )}
              {combined.signatureValid === false && (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-[11px] font-bold text-red-800 dark:bg-red-950/60 dark:text-red-300">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  Signature Invalid
                </span>
              )}
            </div>
            <CopyButton text={jsonOutput} />
          </div>

          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
              <dt className="font-semibold text-slate-500">Subject</dt>
              <dd className="mt-1 font-mono text-slate-900 dark:text-slate-100 break-all">
                {combined.subject || '—'}
              </dd>
            </div>

            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
              <dt className="font-semibold text-slate-500">Common Name (CN)</dt>
              <dd className="mt-1 font-mono text-slate-900 dark:text-slate-100">
                {combined.commonName || '—'}
              </dd>
            </div>

            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
              <dt className="font-semibold text-slate-500">Public Key Algorithm</dt>
              <dd className="mt-1 font-mono text-slate-900 dark:text-slate-100">
                {combined.publicKeyAlgorithm || 'Unknown'}
                {combined.publicKeyDetails && combined.publicKeyDetails.length > 0
                  ? ` (${combined.publicKeyDetails.join(', ')})`
                  : ''}
              </dd>
            </div>

            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
              <dt className="font-semibold text-slate-500">Signature Algorithm</dt>
              <dd className="mt-1 font-mono text-slate-900 dark:text-slate-100">
                {combined.signatureAlgorithm || 'Unknown'}
              </dd>
            </div>

            <div className="md:col-span-2 rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
              <dt className="font-semibold text-slate-500">Subject Alternative Names (SANs)</dt>
              <dd className="mt-1.5 flex flex-wrap gap-1.5">
                {combined.sans.length > 0 ? (
                  combined.sans.map((san, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg bg-indigo-50 px-2.5 py-1 font-mono text-[11px] font-medium text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                    >
                      {san}
                    </span>
                  ))
                ) : (
                  <span className="font-mono text-slate-400">None</span>
                )}
              </dd>
            </div>

            {combined.sha256Fingerprint && (
              <div className="md:col-span-2 rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
                <dt className="font-semibold text-slate-500">SHA-256 Fingerprint (DER)</dt>
                <dd className="mt-1 font-mono text-[11px] text-slate-900 dark:text-slate-100 break-all">
                  {combined.sha256Fingerprint}
                </dd>
              </div>
            )}

            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
              <dt className="font-semibold text-slate-500">
                Extensions ({combined.extensions?.length ?? 0})
              </dt>
              <dd className="mt-1 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                {combined.extensions && combined.extensions.length > 0
                  ? combined.extensions
                      .map((ext) => `${ext.oid}${ext.critical ? ' (critical)' : ''}`)
                      .join(', ')
                  : 'None'}
              </dd>
            </div>

            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
              <dt className="font-semibold text-slate-500">DER Size</dt>
              <dd className="mt-1 font-mono text-slate-900 dark:text-slate-100">
                {combined.rawLength} bytes
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}
