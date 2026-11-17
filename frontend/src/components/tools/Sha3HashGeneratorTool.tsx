'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useEffect, useState } from 'react';
import { generateSha3Hash, type Sha3Variant } from '@/lib/sha3HashGenerator';
import { Copy, Check } from 'lucide-react';

export default function Sha3HashGeneratorTool() {
  const { t } = useLanguage();
  const [text, setText] = useState('Hello World');
  const [variant, setVariant] = useState<Sha3Variant>('sha3-256');
  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    generateSha3Hash(text, variant)
      .then((digest) => {
        if (!active) return;
        setHash(digest);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setHash('');
        setError(err instanceof Error ? err.message : 'Failed to compute SHA-3 hash.');
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [text, variant]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          <button
            onClick={() => setVariant('sha3-224')}
            className={`rounded-lg px-3 py-1 text-xs font-semibold ${variant === 'sha3-224' ? 'bg-indigo-600 text-white' : ''}`}
          >
            SHA3-224
          </button>
          <button
            onClick={() => setVariant('sha3-256')}
            className={`rounded-lg px-3 py-1 text-xs font-semibold ${variant === 'sha3-256' ? 'bg-indigo-600 text-white' : ''}`}
          >
            {t('uiText.d4e74a72')}
          </button>
          <button
            onClick={() => setVariant('sha3-384')}
            className={`rounded-lg px-3 py-1 text-xs font-semibold ${variant === 'sha3-384' ? 'bg-indigo-600 text-white' : ''}`}
          >
            SHA3-384
          </button>
          <button
            onClick={() => setVariant('sha3-512')}
            className={`rounded-lg px-3 py-1 text-xs font-semibold ${variant === 'sha3-512' ? 'bg-indigo-600 text-white' : ''}`}
          >
            {t('uiText.58a7cc63')}
          </button>
        </div>
        <button
          disabled={!hash || loading}
          onClick={() => {
            if (!hash) return;
            navigator.clipboard.writeText(hash);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-indigo-500 disabled:opacity-50"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {t('uiText.78551acc')}
        </button>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 font-mono text-xs dark:border-white/10 dark:bg-slate-950"
      />

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      ) : (
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase">
            {variant.toUpperCase()} {' ' + t('common.output')}
          </label>
          <p className="p-4 rounded-2xl bg-slate-900 text-pink-400 font-mono text-xs break-all">
            {loading && !hash ? '...' : hash}
          </p>
        </div>
      )}
    </div>
  );
}
