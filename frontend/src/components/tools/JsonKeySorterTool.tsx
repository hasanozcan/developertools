'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useMemo, useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { sortJsonKeys, type JsonKeySortOrder } from '@/lib/jsonKeySorter';

const SAMPLE =
  '{\n  "z_last": true,\n  "b_middle": 2,\n  "a_first": 1,\n  "nested": {\n    "zebra": "z",\n    "alpha": "a"\n  }\n}';

export default function JsonKeySorterTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState(SAMPLE);
  const [order, setOrder] = useState<JsonKeySortOrder>('asc');

  const { output, error } = useMemo(() => {
    const trimmed = input.trim();
    if (!trimmed) {
      return { output: '', error: '' };
    }
    try {
      const parsed: unknown = JSON.parse(trimmed);
      const sorted = sortJsonKeys(parsed, order);
      return { output: JSON.stringify(sorted, null, 2), error: '' };
    } catch (e) {
      return {
        output: '',
        error: e instanceof Error ? e.message : 'Invalid JSON input.',
      };
    }
  }, [input, order]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => setOrder('asc')}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors ${
              order === 'asc'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
            }`}
          >
            Ascending (A → Z)
          </button>
          <button
            type="button"
            onClick={() => setOrder('desc')}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors ${
              order === 'desc'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
            }`}
          >
            Descending (Z → A)
          </button>
        </div>

        <button
          type="button"
          onClick={() => setInput(SAMPLE)}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          {t('common.loadSample')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="json-key-sorter-input"
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            {t('uiText.fcbd59a2')}
          </label>
          <textarea
            id="json-key-sorter-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            className="w-full rounded-2xl border border-slate-200 bg-white p-3 font-mono text-xs shadow-inner dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="json-key-sorter-output"
              className="text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              {t('uiText.1e90e8f1')}
            </label>
            <CopyButton text={output} />
          </div>
          {error ? (
            <div
              role="alert"
              className="rounded-2xl border border-red-200 bg-red-50 p-4 font-mono text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
            >
              {error}
            </div>
          ) : (
            <textarea
              id="json-key-sorter-output"
              value={output}
              readOnly
              rows={12}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs shadow-inner dark:border-slate-700 dark:bg-slate-900/70"
            />
          )}
        </div>
      </div>
    </div>
  );
}
