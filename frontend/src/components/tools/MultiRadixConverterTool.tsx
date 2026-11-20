'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useMemo, useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { convertMultiRadix, type SupportedRadix } from '@/lib/multiRadixConverter';

export default function MultiRadixConverterTool() {
  const { t } = useLanguage();
  const [val, setVal] = useState('255');
  const [fromRadix, setFromRadix] = useState<SupportedRadix>(10);

  const res = useMemo(() => convertMultiRadix(val, fromRadix), [val, fromRadix]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div className="sm:col-span-2 space-y-1">
            <label
              htmlFor="radix-input-value"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              Input Number
            </label>
            <input
              id="radix-input-value"
              type="text"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-2 text-xs font-mono dark:border-slate-700 dark:bg-slate-900"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="radix-select"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              Input Radix (Base)
            </label>
            <select
              id="radix-select"
              value={fromRadix}
              onChange={(e) => setFromRadix(Number(e.target.value) as SupportedRadix)}
              className="w-full rounded-xl border border-slate-200 p-2 text-xs font-mono dark:border-slate-700 dark:bg-slate-900"
            >
              <option value={2}>Base 2 (Binary)</option>
              <option value={8}>Base 8 (Octal)</option>
              <option value={10}>Base 10 (Decimal)</option>
              <option value={16}>Base 16 (Hexadecimal)</option>
            </select>
          </div>
        </div>

        {!res.isValid && res.error ? (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
          >
            {res.error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400 flex items-center justify-between gap-2">
              <span className="break-all">
                {t('uiText.04447430')} {res.hex}
              </span>
              <CopyButton text={res.hex} className="px-2 py-1 text-xs shrink-0" />
            </div>
            <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400 flex items-center justify-between gap-2">
              <span className="break-all">
                {t('uiText.a594ca6b')} {res.decimal}
              </span>
              <CopyButton text={res.decimal} className="px-2 py-1 text-xs shrink-0" />
            </div>
            <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400 flex items-center justify-between gap-2">
              <span className="break-all">
                {t('uiText.7da88ba9')} {res.octal}
              </span>
              <CopyButton text={res.octal} className="px-2 py-1 text-xs shrink-0" />
            </div>
            <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400 flex items-center justify-between gap-2">
              <span className="break-all">
                {t('uiText.bd87eaec')} {res.binary}
              </span>
              <CopyButton text={res.binary} className="px-2 py-1 text-xs shrink-0" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
