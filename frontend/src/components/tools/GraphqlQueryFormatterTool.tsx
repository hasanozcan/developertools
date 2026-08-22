'use client';
import React, { useState, useMemo } from 'react';
import { formatGraphQLQuery } from '@/lib/graphqlQueryFormatter';

export default function GraphqlQueryFormatterTool() {
  const [q, setQ] = useState('query GetUser { user(id: 1) { id name email } }');
  const formatted = useMemo(() => formatGraphQLQuery(q), [q]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea rows={12} value={q} onChange={(e) => setQ(e.target.value)} className="rounded-xl border p-3 font-mono text-xs" />
        <textarea readOnly rows={12} value={formatted} className="rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
