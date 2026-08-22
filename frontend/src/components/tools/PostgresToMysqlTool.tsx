'use client';
import React, { useState, useMemo } from 'react';
import { convertPostgresToMysql } from '@/lib/postgresToMysql';

export default function PostgresToMysqlTool() {
  const [pg, setPg] = useState('CREATE TABLE "users" (id SERIAL PRIMARY KEY, is_active BOOLEAN, data JSONB);');
  const mysql = useMemo(() => convertPostgresToMysql(pg), [pg]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea rows={12} value={pg} onChange={(e) => setPg(e.target.value)} className="rounded-xl border p-3 font-mono text-xs" />
        <textarea readOnly rows={12} value={mysql} className="rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
