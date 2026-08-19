'use client';

import React, { useState } from 'react';
import { ArrowLeftRight, Copy, Check } from 'lucide-react';
import { hexToBase64, base64ToHex } from '@/lib/hexToBase64';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_HEX = '48656c6c6f20576f726c642120446576656c6f706572546f6f6c73';

export default function HexToBase64Tool() {
  const { t } = useLanguage();
  const [hexInput, setHexInput] = useState(SAMPLE_HEX);
  const [base64Input, setBase64Input] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleHexToBase64 = () => {
    setError(null);
    try {
      setBase64Input(hexToBase64(hexInput));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid Hex input');
    }
  };

  const handleBase64ToHex = () => {
    setError(null);
    try {
      setHexInput(base64ToHex(base64Input));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid Base64 input');
    }
  };

  React.useEffect(() => {
    handleHexToBase64();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopyBase64 = () => {
    navigator.clipboard.writeText(base64Input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Conversion Bar */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('tool.hexb64.title') || 'Hex (Hexadecimal) ↔ Base64 Byte Converter'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleHexToBase64}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition"
          >
            Hex → Base64
          </button>
          <button
            onClick={handleBase64ToHex}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 transition"
          >
            Base64 → Hex
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Grid: Hex & Base64 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Hexadecimal Byte String</span>
            <button
              onClick={() => {
                setHexInput(SAMPLE_HEX);
                setBase64Input(hexToBase64(SAMPLE_HEX));
                setError(null);
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              {t('common.loadSample') || 'Load Sample'}
            </button>
          </div>
          <textarea
            value={hexInput}
            onChange={(e) => setHexInput(e.target.value)}
            rows={10}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
            placeholder="Paste hex bytes (e.g. 48656c6c6f...)"
          />
        </div>

        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Base64 Encoded Output</span>
            {base64Input && (
              <button
                onClick={handleCopyBase64}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy Base64')}
              </button>
            )}
          </div>
          <textarea
            value={base64Input}
            onChange={(e) => setBase64Input(e.target.value)}
            rows={10}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-950 resize-y"
          />
        </div>
      </div>
    </div>
  );
}
