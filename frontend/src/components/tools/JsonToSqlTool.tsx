'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Database, RefreshCw } from 'lucide-react';
import { convertJsonToSql, type SqlDialect } from '@/lib/jsonToSql';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_JSON = JSON.stringify(
  [
    {
      id: 1,
      username: 'johndoe',
      email: 'john@example.com',
      is_active: true,
      score: 95.5,
      created_at: '2026-03-01T12:00:00Z',
    },
    {
      id: 2,
      username: 'janedoe',
      email: 'jane@example.com',
      is_active: false,
      score: 88.0,
      created_at: '2026-03-02T15:30:00Z',
    },
  ],
  null,
  2,
);

export default function JsonToSqlTool() {
  const { t } = useLanguage();
  const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
  const [tableName, setTableName] = useState('users');
  const [dialect, setDialect] = useState<SqlDialect>('postgresql');
  const [generateCreateTable, setGenerateCreateTable] = useState(true);
  const [generateInsert, setGenerateInsert] = useState(true);
  const [batchInsert, setBatchInsert] = useState(true);
  const [quoteIdentifiers, setQuoteIdentifiers] = useState(true);
  const [copied, setCopied] = useState(false);

  const { sqlOutput, error } = useMemo(() => {
    if (!jsonInput.trim()) {
      return { sqlOutput: '', error: null };
    }
    try {
      const res = convertJsonToSql(jsonInput, {
        tableName,
        dialect,
        generateCreateTable,
        generateInsert,
        batchInsert,
        quoteIdentifiers,
      });
      return { sqlOutput: res, error: null };
    } catch (err: any) {
      return { sqlOutput: '', error: err.message || 'Error converting JSON to SQL' };
    }
  }, [jsonInput, tableName, dialect, generateCreateTable, generateInsert, batchInsert, quoteIdentifiers]);

  const handleCopy = () => {
    if (!sqlOutput) return;
    navigator.clipboard.writeText(sqlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Options Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Table Name
          </label>
          <input
            type="text"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            SQL Dialect
          </label>
          <select
            value={dialect}
            onChange={(e) => setDialect(e.target.value as SqlDialect)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="postgresql">PostgreSQL</option>
            <option value="mysql">MySQL</option>
            <option value="sqlite">SQLite</option>
            <option value="sqlserver">Microsoft SQL Server</option>
          </select>
        </div>

        <div className="flex flex-col justify-center space-y-1 text-xs">
          <label className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={generateCreateTable}
              onChange={(e) => setGenerateCreateTable(e.target.checked)}
              className="rounded text-indigo-600"
            />
            CREATE TABLE
          </label>
          <label className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={generateInsert}
              onChange={(e) => setGenerateInsert(e.target.checked)}
              className="rounded text-indigo-600"
            />
            INSERT statements
          </label>
        </div>

        <div className="flex flex-col justify-center space-y-1 text-xs">
          <label className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={batchInsert}
              onChange={(e) => setBatchInsert(e.target.checked)}
              className="rounded text-indigo-600"
            />
            Batch Inserts
          </label>
          <label className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={quoteIdentifiers}
              onChange={(e) => setQuoteIdentifiers(e.target.checked)}
              className="rounded text-indigo-600"
            />
            Quote Column Names
          </label>
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              JSON Input (Object or Array)
            </span>
            <button
              onClick={() => setJsonInput(SAMPLE_JSON)}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" /> Load Sample
            </button>
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={14}
            className="w-full rounded-2xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Database className="h-3.5 w-3.5 text-indigo-500" /> Generated SQL Queries
            </span>
            {sqlOutput && (
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy SQL'}
              </button>
            )}
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-600 dark:border-red-800/40 dark:bg-red-900/20 dark:text-red-300">
              {error}
            </div>
          ) : (
            <textarea
              readOnly
              value={sqlOutput}
              placeholder="SQL statements will appear here..."
              rows={14}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-sm focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200 resize-y"
            />
          )}
        </div>
      </div>
    </div>
  );
}
