'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { floatToHex } from '@/lib/ieee754HexFloatConverter';

export default function Ieee754HexFloatConverterTool() {
  const { t } = useLanguage();
  const [val, setVal] = useState('3.14159');
  const output = floatToHex(Number(val) || 0);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-semibold">{t("uiText.3be76246")}</label>
        <input type="number" step="any" value={val} onChange={(e) => setVal(e.target.value)} className="w-full rounded-xl border p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold">{t("uiText.85de832c")}</label>
          <CopyButton text={output} />
        </div>
        <textarea value={output} readOnly rows={4} className="w-full rounded-2xl border bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
      </div>
    </div>
  );
}
