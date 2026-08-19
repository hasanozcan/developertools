'use client';

import React, { useState } from 'react';
import { ShieldCheck, ArrowLeftRight, Copy, Check } from 'lucide-react';
import { base32Encode, base32Decode } from '@/lib/base32Encoder';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_TEXT = 'Hello World!';

export default function Base32EncoderTool() {
  const { t } = useLanguage();
  const [plainInput, setPlainInput] = useState(SAMPLE_TEXT);
  const [base32Input, setBase32Input] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEncode = () => {
    setError(null);
    try {
      setBase32Input(base32Encode(plainInput));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Encoding error');
    }
  };

  const handleDecode = () => {
    setError(null);
    try {
      setPlainInput(base32Decode(base32Input));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid Base32 string');
    }
  };

  React.useEffect(() => {
    handleEncode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopyBase32 = () => {
    navigator.clipboard.writeText(base32Input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Conversion Bar */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('tool.base32.title') || 'Base32 (RFC 4648) Encoder & Decoder'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleEncode}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition"
          >
            Encode to Base32
          </button>
          <button
            onClick={handleDecode}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 transition"
          >
            Decode to Plain Text
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Grid: Plain Text & Base32 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Plain Text Input</span>
            <button
              onClick={() => {
                setPlainInput(SAMPLE_TEXT);
                setBase32Input(base32Encode(SAMPLE_TEXT));
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              {t('common.loadSample') || 'Load Sample'}
            </button>
          </div>
          <textarea
            value={plainInput}
            onChange={(e) => setPlainInput(e.target.value)}
            rows={8}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
          />
        </div>

        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Base32 Encoded Output</span>
            {base32Input && (
              <button
                onClick={handleCopyBase32}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy Base32')}
              </button>
            )}
          </div>
          <textarea
            value={base32Input}
            onChange={(e) => setBase32Input(e.target.value)}
            rows={8}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-950 resize-y"
          />
        </div>
      </div>
    </div>
  );
}
