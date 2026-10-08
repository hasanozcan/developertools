'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { convertTailwindToCss } from '@/lib/tailwindToCss';

export default function TailwindToCssTool() {
  const { t } = useLanguage();
  const [tailwind, setTailwind] = useState('flex items-center justify-between font-bold cursor-pointer');
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => convertTailwindToCss(tailwind), [tailwind]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="surface-card rounded-2xl p-5 space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">{t("uiText.479dccfd")}</h3>
          <textarea rows={10} value={tailwind} onChange={(e) => setTailwind(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs text-slate-900 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100" />
        </div>
        <div className="surface-card rounded-2xl p-5 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">{t("uiText.7dd79624")}</h3>
            <button onClick={handleCopy} className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? t("uiText.8dc21305") : t("uiText.9b2af91b")}
            </button>
          </div>
          <textarea readOnly rows={10} value={result.css} className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-900 p-3 font-mono text-xs text-emerald-400 dark:border-white/10 dark:bg-slate-950" />
        </div>
      </div>
    </div>
  );
}
