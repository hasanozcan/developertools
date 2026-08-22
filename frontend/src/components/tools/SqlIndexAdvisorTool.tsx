'use client';
import React, { useState, useMemo } from 'react';
import { recommendSqlIndexes } from '@/lib/sqlIndexAdvisor';

export default function SqlIndexAdvisorTool() {
  const [sql, setSql] = useState("SELECT * FROM orders WHERE customer_id = 42 AND status = 'shipped'");
  const res = useMemo(() => recommendSqlIndexes(sql), [sql]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <textarea rows={4} value={sql} onChange={(e) => setSql(e.target.value)} className="w-full rounded-xl border p-3 font-mono text-xs" />
        <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400">
          <p>{res.createIndexSql}</p>
        </div>
      </div>
    </div>
  );
}
