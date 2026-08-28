'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Database } from 'lucide-react';
import { convertJsonToSqlInsert, SqlInsertOptions } from '@/lib/jsonToSqlInsert';

export default function JsonToSqlInsertTool() {
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
            <label className="text-xs text-muted-foreground block mb-1">Target Table</label>
            <input
              type="text"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              className="input input-bordered input-sm font-medium w-36"
            />
          </div>

          <div>
            <label className="text-xs text-muted-foreground block mb-1">SQL Dialect</label>
            <select
              value={dialect}
              onChange={(e) => setDialect(e.target.value as any)}
              className="select select-bordered select-sm"
            >
              <option value="postgres">PostgreSQL</option>
              <option value="mysql">MySQL</option>
              <option value="sqlite">SQLite</option>
              <option value="sqlserver">SQL Server (T-SQL)</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-muted-foreground block mb-1">Query Mode</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as any)}
              className="select select-bordered select-sm"
            >
              <option value="INSERT">INSERT INTO</option>
              <option value="UPDATE">UPDATE ... WHERE id =</option>
            </select>
          </div>
        </div>

        <button onClick={handleCopy} className="btn btn-primary btn-sm gap-2">
          {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy SQL Statements'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            JSON Array or CSV Text:
          </label>
          <textarea
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            className="textarea textarea-bordered w-full h-80 font-mono text-xs leading-relaxed"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            Generated SQL Queries:
          </label>
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
