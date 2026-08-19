'use client';

import React, { useState, useMemo } from 'react';
import { Network, Copy, Check } from 'lucide-react';
import { jsonToGraphqlSchema } from '@/lib/jsonToGraphql';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_JSON = `{
  "id": 101,
  "title": "Introduction to GraphQL",
  "published": true,
  "views": 15420,
  "rating": 4.85,
  "author": {
    "id": 5,
    "name": "Sarah Connor",
    "email": "sarah@example.com"
  },
  "tags": ["api", "web", "schema"]
}`;

export default function JsonToGraphqlTool() {
  const { t } = useLanguage();
  const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
  const [rootType, setRootType] = useState('Article');
  const [copied, setCopied] = useState(false);

  const { schema, error } = useMemo(() => {
    try {
      const res = jsonToGraphqlSchema(jsonInput, rootType);
      return { schema: res, error: null };
    } catch (err: unknown) {
      return { schema: '', error: err instanceof Error ? err.message : 'Invalid JSON input' };
    }
  }, [jsonInput, rootType]);

  const handleCopy = () => {
    if (!schema) return;
    navigator.clipboard.writeText(schema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Root Type Config Bar */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('tool.jsongraphql.title') || 'JSON to GraphQL Schema Generator'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-500">Root Type Name:</label>
          <input
            type="text"
            value={rootType}
            onChange={(e) => setRootType(e.target.value)}
            className="px-2.5 py-1 text-xs font-mono rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 w-36"
            placeholder="RootType"
          />
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Grid: JSON in -> GraphQL out */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">JSON Input Payload</span>
            <button
              onClick={() => setJsonInput(SAMPLE_JSON)}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              {t('common.loadSample') || 'Load Sample'}
            </button>
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={14}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
          />
        </div>

        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">GraphQL Type Definitions</span>
            {schema && (
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy Schema')}
              </button>
            )}
          </div>
          <textarea
            readOnly
            value={schema}
            rows={14}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-950 resize-y"
          />
        </div>
      </div>
    </div>
  );
}
