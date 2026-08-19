'use client';

import React, { useState, useMemo } from 'react';
import { Database, Copy, Check } from 'lucide-react';
import { convertCsvToSqlInsert, type CsvToSqlOptions } from '@/lib/csvToSqlInsert';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_CSV = `id,name,email,age,is_active
1,John Doe,john@example.com,28,true
2,Jane Smith,jane@example.com,32,false
3,Bob Lee,bob@example.com,NULL,true`;

export default function CsvToSqlInsertTool() {
  const { t } = useLanguage();
  const [csvInput, setCsvInput] = useState(SAMPLE_CSV);
  const [tableName, setTableName] = useState('users');
  const [dialect, setDialect] = useState<CsvToSqlOptions['dialect']>('postgres');
  const [batchSize, setBatchSize] = useState(50);
  const [copied, setCopied] = useState(false);

  const sqlOutput = useMemo(() => {
    return convertCsvToSqlInsert(csvInput, {
      tableName,
      dialect,
      batchSize,
    });
  }, [csvInput, tableName, dialect, batchSize]);

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Config Bar */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t('tool.csvsql.title') || 'SQL Table & Dialect Settings'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Target Table Name</label>
            <input
              type="text"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
              placeholder="table_name"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">SQL Dialect</label>
            <select
              value={dialect}
              onChange={(e) => setDialect(e.target.value as typeof dialect)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
            >
              <option value="postgres">PostgreSQL (&quot;col&quot;)</option>
              <option value="mysql">MySQL (`col`)</option>
              <option value="generic">Standard SQL (col)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Batch Size (Rows per INSERT)</label>
            <input
              type="number"
              min="1"
              max="5000"
              value={batchSize}
              onChange={(e) => setBatchSize(parseInt(e.target.value, 10) || 50)}
              className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Editors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">CSV Data Input</span>
            <button
              onClick={() => setCsvInput(SAMPLE_CSV)}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              {t('common.loadSample') || 'Load Sample'}
            </button>
          </div>
          <textarea
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
            rows={12}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
            placeholder="id,name,email..."
          />
        </div>

        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Generated SQL INSERT Queries</span>
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
            value={sqlOutput}
            rows={12}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-950 resize-y"
          />
        </div>
      </div>
    </div>
  );
}
