'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { buildMediaQuery } from '@/lib/cssMediaQueryBuilder';

export default function CssMediaQueryBuilderTool() {
  const { t } = useLanguage();
  const [minWidth, setMinWidth] = useState(768);
  const [maxWidth, setMaxWidth] = useState(1024);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => buildMediaQuery({ minWidth, maxWidth, prefersColorScheme: 'dark' }), [minWidth, maxWidth]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.cssBlock);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold">{t("uiText.b73a32d2")}</label>
            <input type="number" value={minWidth} onChange={(e) => setMinWidth(Number(e.target.value))} className="w-full mt-1 rounded-xl border p-2 text-xs" />
          </div>
          <div>
            <label className="text-xs font-bold">{t("uiText.3a82529c")}</label>
            <input type="number" value={maxWidth} onChange={(e) => setMaxWidth(Number(e.target.value))} className="w-full mt-1 rounded-xl border p-2 text-xs" />
          </div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 font-mono text-emerald-400 text-xs flex justify-between items-center">
          <pre className="whitespace-pre">{result.cssBlock}</pre>
          <button onClick={handleCopy} className="text-indigo-400 font-semibold">{copied ? t("uiText.8dc21305") : t("common.copy")}</button>
        </div>
      </div>
    </div>
  );
}
