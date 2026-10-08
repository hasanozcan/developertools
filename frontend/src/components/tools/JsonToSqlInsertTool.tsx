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
      <div className="flex flex-wrap gap-4 items-center justify-between p-4 rounded-xl bg-card border border-border">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="text-xs text-muted-foreground block mb-1">{t("uiText.460ce07c")}</label>
            <input
              type="text"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              className="input input-bordered input-sm font-medium w-36"
            />
          </div>

          <div>
            <label className="text-xs text-muted-foreground block mb-1">{t("tool.sqlFormatter.dialect")}</label>
            <select
              value={dialect}
              onChange={(e) => setDialect(e.target.value as any)}
              className="select select-bordered select-sm"
            >
              <option value="postgres">PostgreSQL</option>
              <option value="mysql">MySQL</option>
              <option value="sqlite">SQLite</option>
              <option value="sqlserver">{t("uiText.b3bb312a")}</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-muted-foreground block mb-1">{t("uiText.43e4ac16")}</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as any)}
              className="select select-bordered select-sm"
            >
              <option value="INSERT">{t("uiText.6e3ef9e2")}</option>
              <option value="UPDATE">{t("uiText.19140f69")}</option>
            </select>
          </div>
        </div>

        <button onClick={handleCopy} className="btn btn-primary btn-sm gap-2">
          {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
          {copied ? t("uiText.8dc21305") : t("uiText.1ba6f622")}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            {t("uiText.503f13b8")}</label>
          <textarea
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            className="textarea textarea-bordered w-full h-80 font-mono text-xs leading-relaxed"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            {t("uiText.b1a069c0")}</label>
          <textarea
            readOnly
            value={sqlOutput}
            className="textarea textarea-bordered w-full h-80 font-mono text-xs leading-relaxed bg-muted/40 text-foreground"
          />
        </div>
      </div>
    </div>
  );
}
