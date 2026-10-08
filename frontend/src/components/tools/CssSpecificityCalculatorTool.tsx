'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { calculateSpecificity, compareSpecificity } from '@/lib/cssSpecificityCalculator';

export default function CssSpecificityCalculatorTool() {
  const { t } = useLanguage();
  const [selectorA, setSelectorA] = useState('#navbar .menu-item > a:hover');
  const [selectorB, setSelectorB] = useState('nav.menu div.item a');

  const comparison = useMemo(() => compareSpecificity(selectorA, selectorB), [selectorA, selectorB]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{t("uiText.7b012f6f")}</label>
            <input type="text" value={selectorA} onChange={(e) => setSelectorA(e.target.value)} className="w-full mt-1 rounded-xl border border-slate-200 bg-white p-2.5 font-mono text-xs dark:border-white/10 dark:bg-slate-900 dark:text-slate-100" />
            <p className="mt-2 text-xs font-mono text-indigo-600 dark:text-indigo-400">{t("uiText.d5f43d9d") + ' '}{comparison.scoreA.formatted}</p>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{t("uiText.7c013102")}</label>
            <input type="text" value={selectorB} onChange={(e) => setSelectorB(e.target.value)} className="w-full mt-1 rounded-xl border border-slate-200 bg-white p-2.5 font-mono text-xs dark:border-white/10 dark:bg-slate-900 dark:text-slate-100" />
            <p className="mt-2 text-xs font-mono text-indigo-600 dark:text-indigo-400">{t("uiText.d5f43d9d") + ' '}{comparison.scoreB.formatted}</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-indigo-500/10 text-center">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{t("uiText.06a843c0")}</span>
          <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">{comparison.explanation}</p>
        </div>
      </div>
    </div>
  );
}
