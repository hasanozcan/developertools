'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import CopyButton from '@/components/common/CopyButton';
import { calculateJwtLifetime } from '@/lib/jwtExpiryCalculator';

const SAMPLE =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5OTk5OTk5OTl9.4S8y4';

function formatDuration(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0 || days > 0) parts.push(`${hours}h`);
  if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}m`);
  parts.push(`${secs}s`);
  return parts.join(' ');
}

export default function JwtExpiryCalculatorTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState(SAMPLE);

  const lifetime = useMemo(() => calculateJwtLifetime(input), [input]);
  const jsonOutput = useMemo(
    () =>
      JSON.stringify(
        {
          valid: lifetime.valid,
          hasExpiration: lifetime.hasExpiration,
          isExpired: lifetime.isExpired,
          secondsRemaining: lifetime.secondsRemaining,
          issuedAt: lifetime.issuedAt?.toISOString() ?? null,
          notBefore: lifetime.notBefore?.toISOString() ?? null,
          expiresAt: lifetime.expiresAt?.toISOString() ?? null,
          ...(lifetime.payload ? { payload: lifetime.payload } : {}),
          ...(lifetime.error ? { error: lifetime.error } : {}),
        },
        null,
        2,
      ),
    [lifetime],
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="jwt-expiry-input"
              className="text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              {t('uiText.d4d6791a')}
            </label>
            <button
              type="button"
              onClick={() => setInput(SAMPLE)}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {t('common.loadSample')}
            </button>
          </div>
          <textarea
            id="jwt-expiry-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            className="w-full rounded-2xl border border-slate-200 bg-white p-3 font-mono text-xs shadow-inner dark:border-slate-700 dark:bg-slate-900"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {t('uiText.c209e3ed')}
            </span>
            <CopyButton text={jsonOutput} />
          </div>

          {!lifetime.valid ? (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{lifetime.error}</span>
            </div>
          ) : (
            <div className="surface-card rounded-2xl p-4 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {!lifetime.hasExpiration ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                    <Clock className="h-3.5 w-3.5" />
                    No exp Claim (Does Not Expire)
                  </span>
                ) : lifetime.isExpired ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-800 dark:bg-red-950/60 dark:text-red-300">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Expired
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Active ({formatDuration(lifetime.secondsRemaining ?? 0)} remaining)
                  </span>
                )}
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
                  <dt className="text-slate-500">Expires At (exp)</dt>
                  <dd className="mt-1 font-mono font-semibold text-slate-900 dark:text-slate-100">
                    {lifetime.expiresAt ? lifetime.expiresAt.toISOString() : 'No exp claim'}
                  </dd>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
                  <dt className="text-slate-500">Issued At (iat)</dt>
                  <dd className="mt-1 font-mono font-semibold text-slate-900 dark:text-slate-100">
                    {lifetime.issuedAt ? lifetime.issuedAt.toISOString() : 'Not present'}
                  </dd>
                </div>
              </dl>

              <textarea
                value={jsonOutput}
                readOnly
                rows={7}
                aria-label="JWT lifetime JSON details"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900/70"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
