'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useMemo, useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { calculateSupernetDetails } from '@/lib/ipSupernettingCalculator';

const SAMPLE = '192.168.0.0/24\n192.168.1.0/24';

export default function IpSupernettingCalculatorTool() {
  const { t } = useLanguage();
  const [text, setText] = useState(SAMPLE);

  const { details, error } = useMemo(() => {
    try {
      const lines = text
        .split(/\r?\n|,/)
        .map((s) => s.trim())
        .filter(Boolean);
      return { details: calculateSupernetDetails(lines), error: '' };
    } catch (e) {
      return {
        details: null,
        error: e instanceof Error ? e.message : 'Invalid CIDR input',
      };
    }
  }, [text]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="supernet-input" className="text-xs font-semibold">
            {t('uiText.3e9d4e80')}
          </label>
          <button
            type="button"
            onClick={() => setText(SAMPLE)}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            {t('common.loadSample')}
          </button>
        </div>
        <textarea
          id="supernet-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder="192.168.0.0/24&#10;192.168.1.0/24"
          className="w-full rounded-2xl border p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold">{t('uiText.419b49b2')}</span>
          <CopyButton text={details?.supernet ?? ''} />
        </div>

        {error ? (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
          >
            {error}
          </div>
        ) : details ? (
          <div className="surface-card rounded-2xl p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-lg font-bold text-indigo-600 dark:text-indigo-400">
                {details.supernet}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                  details.exactAggregation
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                }`}
              >
                {details.exactAggregation
                  ? 'Exact Contiguous Aggregation'
                  : 'Covering Supernet (includes gaps)'}
              </span>
            </div>

            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
                <dt className="text-slate-500">Network Address</dt>
                <dd className="mt-1 font-mono font-semibold">{details.networkAddress}</dd>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
                <dt className="text-slate-500">Broadcast Address</dt>
                <dd className="mt-1 font-mono font-semibold">{details.broadcastAddress}</dd>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
                <dt className="text-slate-500">Subnet Mask</dt>
                <dd className="mt-1 font-mono font-semibold">{details.netmask}</dd>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
                <dt className="text-slate-500">Total IPs</dt>
                <dd className="mt-1 font-mono font-semibold">
                  {details.totalAddresses.toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>
        ) : null}
      </div>
    </div>
  );
}
