'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useEffect, useState } from 'react';
import { validateJwtSignature, type JwtValidationResult } from '@/lib/jwtSignatureValidator';

export default function JwtSignatureValidatorTool() {
  const { t } = useLanguage();
  const [jwt, setJwt] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  );
  const [secretOrKey, setSecretOrKey] = useState('your-256-bit-secret');
  const [res, setRes] = useState<JwtValidationResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    validateJwtSignature(jwt, secretOrKey)
      .then((validation) => {
        if (!active) return;
        setRes(validation);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setRes({
          isValidStructure: false,
          signatureValid: false,
          isValid: false,
          claimIssues: [],
          error: err instanceof Error ? err.message : 'Validation failed.',
        });
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [jwt, secretOrKey]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase">JWT Token</label>
          <textarea
            rows={4}
            value={jwt}
            onChange={(e) => setJwt(e.target.value)}
            className="w-full rounded-xl border border-slate-200 p-3 font-mono text-xs dark:border-white/10 dark:bg-slate-950"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase">
            Verification Secret (HS*) or Public Key (PEM / JWK for RS*, PS*, ES*)
          </label>
          <textarea
            rows={3}
            value={secretOrKey}
            onChange={(e) => setSecretOrKey(e.target.value)}
            placeholder="Enter HMAC secret or PEM/JWK public key"
            className="w-full rounded-xl border border-slate-200 p-3 font-mono text-xs dark:border-white/10 dark:bg-slate-950"
          />
        </div>

        <div
          className={`p-4 rounded-xl text-xs space-y-1.5 border ${
            res?.isValid
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
              : 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300'
          }`}
        >
          <p>
            <strong>{t('uiText.465027ad')}</strong>{' '}
            {loading && !res
              ? '...'
              : res?.signatureValid
                ? t('uiText.9355e4f0')
                : t('uiText.41e68bba')}
          </p>
          {res?.algorithm && (
            <p>
              <strong>Algorithm:</strong> {res.algorithm}
            </p>
          )}
          <p>
            <strong>Overall Status:</strong>{' '}
            {res?.isValid
              ? 'Signature verified & claims valid'
              : res?.error ||
                (res?.claimIssues.length
                  ? `Claim issues: ${res.claimIssues.map((i) => i.code).join(', ')}`
                  : 'Invalid')}
          </p>
        </div>

        {res?.isValidStructure && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase">Header</label>
              <pre className="mt-1 rounded-xl bg-slate-900 p-3 text-xs font-mono text-slate-200 overflow-x-auto">
                {JSON.stringify(res.header, null, 2)}
              </pre>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase">Payload</label>
              <pre className="mt-1 rounded-xl bg-slate-900 p-3 text-xs font-mono text-slate-200 overflow-x-auto">
                {JSON.stringify(res.payload, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
