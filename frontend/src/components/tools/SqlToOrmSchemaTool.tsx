'use client';

import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { convertSqlToOrm } from '@/lib/sqlToOrmSchema';

const SAMPLE_SQL = `CREATE TABLE users (
  id INT PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(100),
  is_verified BOOLEAN,
  created_at TIMESTAMP
);`;

export default function SqlToOrmSchemaTool() {
  const [sql, setSql] = useState(SAMPLE_SQL);
  const [targetOrm, setTargetOrm] = useState<'prisma' | 'drizzle'>('prisma');

  const output = convertSqlToOrm(sql, targetOrm);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button onClick={() => setTargetOrm('prisma')} className={`px-4 py-2 rounded-xl text-xs font-semibold ${targetOrm === 'prisma' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
          Prisma Schema (.prisma)
        </button>
        <button onClick={() => setTargetOrm('drizzle')} className={`px-4 py-2 rounded-xl text-xs font-semibold ${targetOrm === 'drizzle' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
          Drizzle ORM (TypeScript)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">SQL CREATE TABLE Statement</label>
          <textarea
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            rows={12}
            className="w-full rounded-2xl border border-slate-200 bg-white p-3 font-mono text-xs shadow-inner dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Generated ORM Code</label>
            <CopyButton text={output} />
          </div>
          <pre className="h-64 overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-3 font-mono text-xs text-teal-400 dark:border-slate-700">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
}
