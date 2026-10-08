'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { convertMultiRadix } from '@/lib/multiRadixConverter';

export default function MultiRadixConverterTool() {
  const { t } = useLanguage();
  const [val, setVal] = useState('255');
  const res = useMemo(() => convertMultiRadix(val, 10), [val]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="text" value={val} onChange={(e) => setVal(e.target.value)} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400">{t("uiText.04447430") + ' '}{res.hex}</div>
          <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400">{t("uiText.a594ca6b") + ' '}{res.decimal}</div>
          <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400">{t("uiText.7da88ba9") + ' '}{res.octal}</div>
          <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400">{t("uiText.bd87eaec") + ' '}{res.binary}</div>
        </div>
      </div>
    </div>
  );
}
