'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useEffect, useState } from 'react';
import { buildSignedJwt, HMAC_JWT_ALGORITHMS, type HmacJwtAlgorithm } from '@/lib/jwtBuilder';
import { Copy, Check } from 'lucide-react';

export default function JwtBuilderTool() {
  const { t } = useLanguage();
  const [algorithm, setAlgorithm] = useState<HmacJwtAlgorithm>('HS256');
  const [secret, setSecret] = useState('your-256-bit-secret');
  const [header, setHeader] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
  const [payload, setPayload] = useState(
    '{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}',
  );
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAlgorithmChange = (nextAlg: HmacJwtAlgorithm) => {
    setAlgorithm(nextAlg);
    try {
      const parsed: unknown = JSON.parse(header);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        setHeader(JSON.stringify({ ...(parsed as Record<string, unknown>), alg: nextAlg }, null, 2));
      }
    } catch {
      // Leave invalid user JSON untouched so the error banner surfaces it.
    }
  };

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    let parsedHeader: Record<string, unknown>;
    let parsedPayload: Record<string, unknown>;
    try {
      parsedHeader = JSON.parse(header) as Record<string, unknown>;
      parsedPayload = JSON.parse(payload) as Record<string, unknown>;
    } catch {
      setToken('');
      setError('Error: Invalid JSON in header or payload');
      setLoading(false);
      return () => {
        active = false;
      };
    }

    buildSignedJwt(parsedHeader, parsedPayload, secret, algorithm)
      .then((signed) => {
        if (!active) return;
        setToken(signed);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setToken('');
        setError(err instanceof Error ? err.message : 'Failed to sign JWT.');
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [header, payload, secret, algorithm]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap items-end gap-3 flex-1">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
              Algorithm
            </label>
            <select
              value={algorithm}
              onChange={(e) => handleAlgorithmChange(e.target.value as HmacJwtAlgorithm)}
              className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold dark:border-white/10 dark:bg-slate-950"
            >
              {HMAC_JWT_ALGORITHMS.map((alg) => (
                <option key={alg} value={alg}>
                  {alg}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[220px]">
            <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
              HMAC Secret
            </label>
            <input
              type="text"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Enter HMAC signing secret"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-xs dark:border-white/10 dark:bg-slate-950"
            />
          </div>
        </div>
        <button
          disabled={!token || loading}
          onClick={() => {
            if (!token) return;
            navigator.clipboard.writeText(token);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-indigo-500 disabled:opacity-50"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? t('uiText.8dc21305') : t('uiText.fd2793a0')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase">
            {t('tool.jwtDecoder.headerJson')}
          </label>
          <textarea
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            rows={5}
            className="w-full rounded-xl border border-slate-200 p-3 font-mono text-xs dark:border-white/10 dark:bg-slate-950"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase">
            {t('uiText.3f91022c')}
          </label>
          <textarea
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            rows={5}
            className="w-full rounded-xl border border-slate-200 p-3 font-mono text-xs dark:border-white/10 dark:bg-slate-950"
          />
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      ) : (
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase">
            {t('uiText.c9c76e87')}
          </label>
          <p className="font-mono text-xs bg-slate-900 text-pink-400 p-4 rounded-2xl break-all">
            {loading && !token ? '...' : token}
          </p>
        </div>
      )}
    </div>
  );
}
