'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, Info, ShieldAlert } from 'lucide-react';
import CopyButton from '@/components/common/CopyButton';
import { evaluateCspHeader, type CspFinding } from '@/lib/cspEvaluator';

const SAMPLE_CSP = "default-src 'self'; script-src 'self' 'unsafe-inline'";

function severityStyles(severity: CspFinding['severity']) {
  switch (severity) {
    case 'high':
      return {
        badge: 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300',
        border: 'border-red-200 dark:border-red-900/50',
        Icon: ShieldAlert,
      };
    case 'medium':
      return {
        badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
        border: 'border-amber-200 dark:border-amber-900/50',
        Icon: AlertTriangle,
      };
    default:
      return {
        badge: 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300',
        border: 'border-sky-200 dark:border-sky-900/50',
        Icon: Info,
      };
  }
}

function scoreStyles(score: number) {
  if (score >= 80) {
    return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-900/50';
  }
  if (score >= 50) {
    return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-900/50';
  }
  return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-900/50';
}

export default function CspEvaluatorTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState(SAMPLE_CSP);

  const report = useMemo(() => evaluateCspHeader(input), [input]);
  const serializedReport = useMemo(() => JSON.stringify(report, null, 2), [report]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="csp-input" className="text-sm font-medium text-muted-foreground">
            {t('common.input')}
          </label>
          <button
            type="button"
            onClick={() => setInput(SAMPLE_CSP)}
            className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            {t('common.loadSample')}
          </button>
        </div>
        <textarea
          id="csp-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          placeholder="default-src 'self'; script-src 'self'; object-src 'none'"
          className="w-full rounded-xl border border-border bg-card p-4 font-mono text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {t('common.output')}
            </span>
            <span
              data-testid="csp-score-badge"
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${scoreStyles(report.score)}`}
            >
              Security Score: {report.score} / 100
            </span>
          </div>
          <CopyButton text={serializedReport} />
        </div>

        {report.findings.length === 0 ? (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-medium text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>No high or medium security issues detected in this CSP header.</span>
          </div>
        ) : (
          <ul className="space-y-3" aria-label="CSP evaluation findings">
            {report.findings.map((finding, idx) => {
              const style = severityStyles(finding.severity);
              const SeverityIcon = style.Icon;
              return (
                <li
                  key={`${finding.directive}-${idx}`}
                  className={`rounded-xl border bg-slate-50/70 p-4 text-xs dark:bg-slate-900/70 ${style.border}`}
                >
                  <div className="mb-1.5 flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${style.badge}`}
                    >
                      <SeverityIcon className="h-3 w-3" />
                      {finding.severity}
                    </span>
                    <span className="rounded bg-slate-200 px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                      {finding.directive}
                    </span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">{finding.message}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
