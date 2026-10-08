'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { matchesCaret } from '@/lib/semverRangeEvaluator';

export default function SemverRangeEvaluatorTool() {
  const { t } = useLanguage();
  const [base, setBase] = useState('1.2.0');
  const [target, setTarget] = useState('1.9.5');
  const matched = matchesCaret(base, target);
  const output = `Caret (^${base}) matches ${target}: ${matched ? 'YES (Compatible)' : 'NO (Breaking)'}`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold">{t("uiText.2b070a14")}</label>
          <input type="text" value={base} onChange={(e) => setBase(e.target.value)} className="w-full rounded-xl border p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
        </div>
        <div>
          <label className="text-xs font-semibold">{t("uiText.c6a710b1")}</label>
          <input type="text" value={target} onChange={(e) => setTarget(e.target.value)} className="w-full rounded-xl border p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold">{t("uiText.6c20bdce")}</label>
          <CopyButton text={output} />
        </div>
        <textarea value={output} readOnly rows={4} className="w-full rounded-2xl border bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
      </div>
    </div>
  );
}
