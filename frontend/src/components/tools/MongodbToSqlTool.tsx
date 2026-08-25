'use client';
import React, { useState } from 'react';
import { mongodbToSql } from '@/lib/mongodbToSql';
import { Copy, Check } from 'lucide-react';

export default function MongodbToSqlTool() {
  const [query, setQuery] = useState('{"status":"active","age":{"$gte":18}}');
  const [collection, setCollection] = useState('users');
  const [copied, setCopied] = useState(false);

  const sql = mongodbToSql(query, collection);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-500">Collection:</label>
          <input value={collection} onChange={(e) => setCollection(e.target.value)} className="rounded-xl border border-slate-200 p-1.5 text-xs dark:border-white/10 dark:bg-slate-950" />
        </div>
        <button
          onClick={() => { navigator.clipboard.writeText(sql); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md transition hover:bg-indigo-500"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? 'Copied' : 'Copy SQL'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={8}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 font-mono text-xs text-slate-800 focus:border-indigo-500 focus:outline-none dark:border-white/10 dark:bg-slate-950 dark:text-slate-200"
        />
        <pre className="h-[170px] overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-teal-400 dark:border-white/10">
          {sql}
        </pre>
      </div>
    </div>
  );
}
