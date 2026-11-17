'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { Copy, Check, Database } from 'lucide-react';
import { convertJsonToSqlInsert, SqlInsertOptions } from '@/lib/jsonToSqlInsert';

export default function JsonToSqlInsertTool() {
  const { t } = useLanguage();
  const [inputData, setInputData] = useState(
    JSON.stringify(
      [
        { id: 1, name: "Alice O'Connor", role: 'ADMIN', active: true, balance: 450.0 },
        { id: 2, name: 'Bob Smith', role: 'USER', active: true, balance: 12.5 },
      ],
      null,
      2
    )
  );
  const [tableName, setTableName] = useState('users');
  const [dialect, setDialect] = useState<SqlInsertOptions['dialect']>('postgres');
  const [mode, setMode] = useState<SqlInsertOptions['mode']>('INSERT');
  const [copied, setCopied] = useState(false);

  const sqlOutput = useMemo(() => {
    if (!inputData.trim()) return '';
    try {
      return convertJsonToSqlInsert(inputData, {
        tableName,
        dialect,
        mode,
        primaryKey: 'id',
      });
    } catch (err: any) {
      return '-- Error generating SQL: ' + err.message;
    }
  }, [inputData, tableName, dialect, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">{t("uiText.460ce07c")}</label>
            <input
              type="text"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              className="w-36 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">{t("tool.sqlFormatter.dialect")}</label>
            <select
              value={dialect}
              onChange={(e) => setDialect(e.target.value as any)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="postgres">PostgreSQL</option>
              <option value="mysql">MySQL</option>
              <option value="sqlite">SQLite</option>
              <option value="sqlserver">{t("uiText.b3bb312a")}</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">{t("uiText.43e4ac16")}</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as any)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="INSERT">{t("uiText.6e3ef9e2")}</option>
              <option value="UPDATE">{t("uiText.19140f69")}</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        >
          {copied ? <Check className="w-4 h-4 text-green-200" /> : <Copy className="w-4 h-4" />}
          {copied ? t("uiText.8dc21305") : t("uiText.1ba6f622")}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("uiText.503f13b8")}</label>
          <textarea
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            className="w-full h-80 rounded-lg border border-gray-300 bg-white px-3 py-2.5 font-mono text-xs leading-relaxed text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("uiText.b1a069c0")}</label>
          <textarea
            readOnly
            value={sqlOutput}
            className="w-full h-80 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 font-mono text-xs leading-relaxed text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
}
