'use client';
import React, { useState, useMemo } from 'react';
import { sqlToMongodb } from '@/lib/sqlToMongodb';

export default function SqlToMongodbTool() {
  const [sql, setSql] = useState("SELECT name, email FROM users WHERE active = true LIMIT 10");
  const output = useMemo(() => sqlToMongodb(sql), [sql]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea rows={12} value={sql} onChange={(e) => setSql(e.target.value)} className="rounded-xl border p-3 font-mono text-xs" />
        <textarea readOnly rows={12} value={output} className="rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
