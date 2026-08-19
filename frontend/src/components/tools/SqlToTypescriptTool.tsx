'use client';

import React, { useState, useMemo } from 'react';
import { FileCode, Copy, Check } from 'lucide-react';
import { sqlTableToTypeScript } from '@/lib/sqlToTypescript';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_SQL = `CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  bio TEXT,
  rating DECIMAL(3,2),
  created_at TIMESTAMP NOT NULL
);`;

export default function SqlToTypescriptTool() {
  const { t } = useLanguage();
  const [sqlInput, setSqlInput] = useState(SAMPLE_SQL);
  const [interfaceName, setInterfaceName] = useState('');
  const [copied, setCopied] = useState(false);

  const { tsCode, error } = useMemo(() => {
    try {
      const res = sqlTableToTypeScript(sqlInput, interfaceName);
      return { tsCode: res, error: null };
    } catch (err: unknown) {
      return { tsCode: '', error: err instanceof Error ? err.message : 'Invalid SQL CREATE TABLE statement' };
    }
  }, [sqlInput, interfaceName]);

  const handleCopy = () => {
    if (!tsCode) return;
    navigator.clipboard.writeText(tsCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <FileCode className="w-5 h-5 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('tool.sqlts.title') || 'SQL CREATE TABLE to TypeScript Interface'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-500">Interface Override:</label>
          <input
            type="text"
            value={interfaceName}
            onChange={(e) => setInterfaceName(e.target.value)}
            placeholder="CustomInterfaceName"
            className="px-2.5 py-1 text-xs font-mono rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 w-44"
          />
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Grid: SQL in -> TypeScript out */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">SQL Schema (CREATE TABLE)</span>
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
          />
        </div>

        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">TypeScript Interface</span>
            {tsCode && (
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy TypeScript')}
              </button>
            )}
          </div>
          <textarea
            readOnly
            value={tsCode}
            rows={12}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-950 resize-y"
          />
        </div>
      </div>
    </div>
  );
}
