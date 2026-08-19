'use client';

import React, { useState } from 'react';
import { Globe, ArrowLeftRight, Copy, Check } from 'lucide-react';
import { convertDomainToPunycode, convertPunycodeToDomain } from '@/lib/punycodeConverter';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_UNICODE = 'münchen.de';

export default function PunycodeConverterTool() {
  const { t } = useLanguage();
  const [unicodeInput, setUnicodeInput] = useState(SAMPLE_UNICODE);
  const [punycodeOutput, setPunycodeOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleToPunycode = () => {
    setPunycodeOutput(convertDomainToPunycode(unicodeInput));
  };

  const handleToUnicode = () => {
    setUnicodeInput(convertPunycodeToDomain(punycodeOutput));
  };

  React.useEffect(() => {
    handleToPunycode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(punycodeOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Conversion Bar */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('tool.punycode.title') || 'Punycode & IDN International Domain Converter'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToPunycode}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition"
          >
            Unicode → Punycode (xn--)
          </button>
          <button
            onClick={handleToUnicode}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 transition"
          >
            Punycode → Unicode Domain
          </button>
        </div>
      </div>

      {/* Grid: Unicode & Punycode */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">International Domain (Unicode)</span>
            <button
              onClick={() => {
                setUnicodeInput(SAMPLE_UNICODE);
                setPunycodeOutput(convertDomainToPunycode(SAMPLE_UNICODE));
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              {t('common.loadSample') || 'Load Sample'}
            </button>
          </div>
          <textarea
            value={unicodeInput}
            onChange={(e) => setUnicodeInput(e.target.value)}
            rows={6}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
            placeholder="e.g. münchen.de or türkçe-alan-adı.com"
          />
        </div>

        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Punycode Domain (ASCII xn--)</span>
            {punycodeOutput && (
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy Punycode')}
              </button>
            )}
          </div>
          <textarea
            value={punycodeOutput}
            onChange={(e) => setPunycodeOutput(e.target.value)}
            rows={6}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-950 resize-y"
          />
        </div>
      </div>
    </div>
  );
}
