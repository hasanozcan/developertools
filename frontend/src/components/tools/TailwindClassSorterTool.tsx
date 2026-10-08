'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { sortTailwindClasses } from '@/lib/tailwindClassSorter';

export default function TailwindClassSorterTool() {
  const { t } = useLanguage();
  const [classes, setClasses] = useState('p-4 flex bg-blue-500 font-bold items-center rounded-xl text-white shadow-lg p-4');
  const [copied, setCopied] = useState(false);

  const sorted = useMemo(() => sortTailwindClasses(classes), [classes]);

  const handleCopy = () => {
    navigator.clipboard.writeText(sorted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{t("uiText.e21ae4f9")}</label>
        <textarea rows={4} value={classes} onChange={(e) => setClasses(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs text-slate-900 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100" />
        <div className="flex items-center justify-between pt-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{t("uiText.ec327bb8")}</label>
          <button onClick={handleCopy} className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? t("uiText.8dc21305") : t("common.copy")}
          </button>
        </div>
        <textarea readOnly rows={4} value={sorted} className="w-full rounded-xl border border-slate-200 bg-slate-900 p-3 font-mono text-xs text-emerald-400 dark:border-white/10 dark:bg-slate-950" />
      </div>
    </div>
  );
}
