'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useMemo, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import CopyButton from '@/components/common/CopyButton';
import { evaluateSemverRange } from '@/lib/semverRangeEvaluator';

const PRESETS = [
  { label: '^1.2.0', range: '^1.2.0', target: '1.9.5' },
  { label: '^0.2.3 (0.x rule)', range: '^0.2.3', target: '0.2.9' },
  { label: '^0.0.3 (0.0.x rule)', range: '^0.0.3', target: '0.0.4' },
  { label: '~1.4.2', range: '~1.4.2', target: '1.4.9' },
  { label: 'Union (||)', range: '>=1.0.0 <2.0.0 || ^3.1.0', target: '3.4.0' },
];

export default function SemverRangeEvaluatorTool() {
  const { t } = useLanguage();
  const [rangeExpr, setRangeExpr] = useState('^1.2.0');
  const [target, setTarget] = useState('1.9.5');

  const evaluation = useMemo(() => evaluateSemverRange(target, rangeExpr), [target, rangeExpr]);

  const summary = useMemo(
    () =>
      evaluation.valid
        ? `Range "${evaluation.range}" ${evaluation.matches ? 'MATCHES' : 'DOES NOT MATCH'} ${evaluation.targetVersion} (${evaluation.normalizedClauses.join(' || ')})`
        : evaluation.error || 'Invalid SemVer input',
    [evaluation],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => {
              setRangeExpr(preset.range);
              setTarget(preset.target);
            }}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-mono hover:bg-indigo-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-indigo-950/40"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="semver-range-input" className="block text-xs font-semibold">
            Range Expression (^, ~, &gt;=, &lt;=, &gt;, &lt;, =, ||)
          </label>
          <input
            id="semver-range-input"
            type="text"
            value={rangeExpr}
            onChange={(e) => setRangeExpr(e.target.value)}
            placeholder="^1.2.0 || >=2.0.0 <3.0.0"
            className="w-full rounded-xl border border-slate-200 p-2.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="semver-target-input" className="block text-xs font-semibold">
            {t('uiText.c6a710b1')}
          </label>
          <input
            id="semver-target-input"
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="1.9.5"
            className="w-full rounded-xl border border-slate-200 p-2.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-800"
          />
        </div>
      </div>

      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-semibold">{t('uiText.6c20bdce')}</span>
          <CopyButton text={summary} />
        </div>

        {!evaluation.valid ? (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
          >
            {evaluation.error}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {evaluation.matches ? (
                <span
                  data-testid="semver-match-badge"
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Satisfies Range (Compatible)
                </span>
              ) : (
                <span
                  data-testid="semver-match-badge"
                  className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-800 dark:bg-red-950/60 dark:text-red-300"
                >
                  <XCircle className="h-4 w-4" />
                  Outside Range (Incompatible)
                </span>
              )}
            </div>

            <div className="rounded-xl bg-slate-50 p-3 text-xs dark:bg-slate-900">
              <p className="text-slate-500">Expanded Comparator Clauses:</p>
              <p className="mt-1 font-mono font-semibold text-slate-800 dark:text-slate-200">
                {evaluation.normalizedClauses.join(' || ')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
