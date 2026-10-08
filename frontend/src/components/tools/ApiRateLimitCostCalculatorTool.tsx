'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { calculateTokenBucket } from '@/lib/apiRateLimitCostCalculator';

export default function ApiRateLimitCostCalculatorTool() {
  const { t } = useLanguage();
  const [rpm, setRpm] = useState('1200');
  const res = calculateTokenBucket(Number(rpm) || 600);
  const output = JSON.stringify(res, null, 2);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t("uiText.da0d05b4")}</label>
        <input type="number" value={rpm} onChange={(e) => setRpm(e.target.value)} className="w-full rounded-xl border p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t("uiText.78d89dea")}</label>
          <CopyButton text={output} />
        </div>
        <textarea value={output} readOnly rows={8} className="w-full rounded-2xl border bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
      </div>
    </div>
  );
}
