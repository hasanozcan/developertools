'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { calculateStorageSlot } from '@/lib/ethereumAbiStorageSlotCalculator';

export default function EthereumAbiStorageSlotCalculatorTool() {
  const { t } = useLanguage();
  const [index, setIndex] = useState('0');
  const output = calculateStorageSlot(Number(index) || 0);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-semibold">{t("uiText.9e1d305d")}</label>
        <input type="number" value={index} onChange={(e) => setIndex(e.target.value)} className="w-full rounded-xl border p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold">{t("uiText.ca9e8dc3")}</label>
          <CopyButton text={output} />
        </div>
        <textarea value={output} readOnly rows={4} className="w-full rounded-2xl border bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
      </div>
    </div>
  );
}
