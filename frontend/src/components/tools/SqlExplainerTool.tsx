'use client';
import React, { useState, useMemo } from 'react';
import { explainSqlQuery } from '@/lib/sqlExplainer';

export default function SqlExplainerTool() {
  const [sql, setSql] = useState("SELECT id, name FROM users WHERE active = true ORDER BY created_at DESC");
  const explanation = useMemo(() => explainSqlQuery(sql), [sql]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <textarea rows={4} value={sql} onChange={(e) => setSql(e.target.value)} className="w-full rounded-xl border p-3 font-mono text-xs" />
        <div className="p-4 bg-indigo-500/10 rounded-xl">
          <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{explanation.summary}</p>
        </div>
      </div>
    </div>
  );
}
