'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';
import { validateJsonlDataset } from '@/lib/jsonlDatasetValidator';

export default function JsonlDatasetValidatorTool() {
  const { t } = useLanguage();
  const [jsonl, setJsonl] = useState('{"messages": [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "Hello"}]}\n{"messages": [{"role": "user", "content": "What is Next.js?"}, {"role": "assistant", "content": "Next.js is a React framework."}]}');
  const result = useMemo(() => validateJsonlDataset(jsonl), [jsonl]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <textarea
          rows={8}
          value={jsonl}
          onChange={(e) => setJsonl(e.target.value)}
          placeholder={t("uiText.e741c205")}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-900 shadow-inner dark:border-white/10 dark:bg-slate-950 dark:text-slate-100"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className={`rounded-xl p-3 text-center ${result.isValid ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>
            <span className="text-xs font-medium">{t("uiText.d37c1570")}</span>
            <p className="text-lg font-bold">{result.isValid ? t("uiText.3d80e3e7") : t("uiText.61a58c50")}</p>
          </div>
          <div className="rounded-xl bg-slate-100 dark:bg-slate-800 p-3 text-center">
            <span className="text-xs text-slate-500 font-medium">{t("uiText.9087918e")}</span>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{result.validLines} / {result.totalLines}</p>
          </div>
          <div className="rounded-xl bg-indigo-500/10 p-3 text-center">
            <span className="text-xs text-indigo-600 font-medium">{t("uiText.300521cf")}</span>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{result.estimatedTokens}</p>
          </div>
          <div className="rounded-xl bg-slate-100 dark:bg-slate-800 p-3 text-center">
            <span className="text-xs text-slate-500 font-medium">{t("tool.openapi.errors")}</span>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{result.invalidLines}</p>
          </div>
        </div>
        {result.errors.length > 0 && (
          <div className="p-3 bg-rose-500/10 rounded-xl space-y-1">
            {result.errors.map((e, idx) => (
              <p key={idx} className="text-xs text-rose-600 dark:text-rose-400 font-mono">{t("uiText.9808f547") + ' '}{e.line}: {e.error}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
