'use client';

import React, { useState, useMemo } from 'react';
import { Minimize2, Copy, Check } from 'lucide-react';
import { minifySqlQuery } from '@/lib/sqlMinifier';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_SQL = `/* Query all active paid accounts */
SELECT
  users.id,
  users.full_name,
  subscriptions.plan_id,
  subscriptions.status
FROM users
INNER JOIN subscriptions ON subscriptions.user_id = users.id
WHERE users.is_active = TRUE
  AND subscriptions.status = 'active'
ORDER BY users.created_at DESC;`;

export default function SqlMinifierTool() {
  const { t } = useLanguage();
  const [sqlInput, setSqlInput] = useState(SAMPLE_SQL);
  const [copied, setCopied] = useState(false);

  const minifiedSql = useMemo(() => minifySqlQuery(sqlInput), [sqlInput]);

  const handleCopy = () => {
    navigator.clipboard.writeText(minifiedSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const compressionRate = sqlInput.length > 0 ? Math.round((1 - minifiedSql.length / sqlInput.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Minimize2 className="w-5 h-5 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('tool.sqlmin.title') || 'SQL Query Minifier & Comment Stripper'}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-slate-400">Original: {sqlInput.length} B</span>
          <span className="text-emerald-500 font-bold">Minified: {minifiedSql.length} B</span>
          <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold">
            {compressionRate}% smaller
          </span>
        </div>
      </div>

      {/* Grid: SQL in -> Minified out */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Raw SQL Query</span>
            <button
              onClick={() => setSqlInput(SAMPLE_SQL)}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              {t('common.loadSample') || 'Load Sample'}
            </button>
          </div>
          <textarea
            value={sqlInput}
            onChange={(e) => setSqlInput(e.target.value)}
            rows={12}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
            placeholder="SELECT * FROM table..."
          />
        </div>

        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Minified Single-Line SQL</span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy SQL')}
            </button>
          </div>
          <textarea
            readOnly
            value={minifiedSql}
            rows={12}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-950 resize-y"
          />
        </div>
      </div>
    </div>
  );
}
