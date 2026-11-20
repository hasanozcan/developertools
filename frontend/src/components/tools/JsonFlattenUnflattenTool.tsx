'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useMemo, useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { flattenJson, unflattenJson } from '@/lib/jsonFlattenUnflatten';

const SAMPLE_NESTED = JSON.stringify(
  {
    user: {
      profile: {
        name: 'Alice',
        age: 30,
      },
      roles: ['admin', 'editor'],
    },
    active: true,
  },
  null,
  2,
);

const SAMPLE_FLAT = JSON.stringify(
  {
    'user.profile.name': 'Alice',
    'user.profile.age': 30,
    'user.roles': ['admin', 'editor'],
    active: true,
  },
  null,
  2,
);

export default function JsonFlattenUnflattenTool() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<'flatten' | 'unflatten'>('flatten');
  const [delimiter, setDelimiter] = useState('.');
  const [input, setInput] = useState(SAMPLE_NESTED);

  const { output, error } = useMemo(() => {
    const trimmed = input.trim();
    if (!trimmed) {
      return { output: '', error: '' };
    }
    try {
      const parsed: unknown = JSON.parse(trimmed);
      if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
        return {
          output: '',
          error: 'Input must be a JSON object (e.g. {"a": {"b": 1}}).',
        };
      }
      const sep = delimiter || '.';
      const transformed =
        mode === 'flatten' ? flattenJson(parsed, '', sep) : unflattenJson(parsed, sep);
      return { output: JSON.stringify(transformed, null, 2), error: '' };
    } catch (e) {
      return {
        output: '',
        error: e instanceof Error ? e.message : 'Invalid JSON input.',
      };
    }
  }, [input, mode, delimiter]);

  const handleModeChange = (nextMode: 'flatten' | 'unflatten') => {
    if (nextMode === mode) return;
    if (!error && output) {
      setInput(output);
    } else {
      setInput(nextMode === 'flatten' ? SAMPLE_NESTED : SAMPLE_FLAT);
    }
    setMode(nextMode);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => handleModeChange('flatten')}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors ${
              mode === 'flatten'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
            }`}
          >
            Flatten JSON
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('unflatten')}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors ${
              mode === 'unflatten'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
            }`}
          >
            Unflatten JSON
          </button>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
            Delimiter:
            <input
              type="text"
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              aria-label="Key delimiter"
              className="w-16 rounded-lg border border-slate-200 bg-white px-2.5 py-1 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
            />
          </label>
          <button
            type="button"
            onClick={() => setInput(mode === 'flatten' ? SAMPLE_NESTED : SAMPLE_FLAT)}
            className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            {t('common.loadSample')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="json-flatten-input" className="text-sm font-medium text-muted-foreground">
            {t('common.input')}
          </label>
          <textarea
            id="json-flatten-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            className="w-full rounded-xl border border-border bg-card p-4 font-mono text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="json-flatten-output"
              className="text-sm font-medium text-muted-foreground"
            >
              {t('common.output')}
            </label>
            <CopyButton text={output} />
          </div>
          {error ? (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 font-mono text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
            >
              {error}
            </div>
          ) : (
            <textarea
              id="json-flatten-output"
              readOnly
              value={output}
              rows={12}
              className="w-full rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm text-foreground shadow-sm"
            />
          )}
        </div>
      </div>
    </div>
  );
}
