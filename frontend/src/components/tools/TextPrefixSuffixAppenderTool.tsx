'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useMemo, useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { appendPrefixSuffix } from '@/lib/textPrefixSuffixAppender';

const SAMPLE = 'apple\n\nbanana\ncherry';

export default function TextPrefixSuffixAppenderTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState(SAMPLE);
  const [prefix, setPrefix] = useState('"');
  const [suffix, setSuffix] = useState('",');
  const [skipEmptyLines, setSkipEmptyLines] = useState(true);

  const output = useMemo(
    () => appendPrefixSuffix(input, prefix, suffix, { skipEmptyLines }),
    [input, prefix, suffix, skipEmptyLines],
  );

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div className="space-y-1">
          <label
            htmlFor="prefix-input"
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            Prefix
          </label>
          <input
            id="prefix-input"
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            placeholder="e.g. - or '"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="suffix-input"
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            Suffix
          </label>
          <input
            id="suffix-input"
            type="text"
            value={suffix}
            onChange={(e) => setSuffix(e.target.value)}
            placeholder="e.g. , or ;"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        <label className="inline-flex items-center gap-2 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={skipEmptyLines}
            onChange={(e) => setSkipEmptyLines(e.target.checked)}
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          Skip empty lines
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="prefix-suffix-input"
              className="text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              {t('uiText.f9fb3b76')}
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
            id="prefix-suffix-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            className="w-full rounded-2xl border border-slate-200 bg-white p-3 font-mono text-xs shadow-inner dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="prefix-suffix-output"
              className="text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              {t('uiText.d364cb7c')}
            </label>
            <CopyButton text={output} />
          </div>
          <textarea
            id="prefix-suffix-output"
            value={output}
            readOnly
            rows={12}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs shadow-inner dark:border-slate-700 dark:bg-slate-900/70"
          />
        </div>
      </div>
    </div>
  );
}
