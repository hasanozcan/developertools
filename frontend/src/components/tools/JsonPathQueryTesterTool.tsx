'use client';
import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { queryJsonPath } from '@/lib/jsonPathQueryTester';

const SAMPLE = JSON.stringify({ store: { name: "DevsTools", location: "Global" } }, null, 2);

export default function JsonPathQueryTesterTool() {
  const [json, setJson] = useState(SAMPLE);
  const [query, setQuery] = useState('$.store');
  let output = '';
  try {
    const res = queryJsonPath(JSON.parse(json), query);
    output = JSON.stringify(res, null, 2);
  } catch (e: any) {
    output = e.message;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-semibold">JSONPath Expression</label>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded-xl border p-2 text-xs font-mono dark:border-slate-700 dark:bg-slate-800" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <textarea value={json} onChange={(e) => setJson(e.target.value)} rows={12} className="w-full rounded-2xl border p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
        <textarea value={output} readOnly rows={12} className="w-full rounded-2xl border bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
      </div>
    </div>
  );
}
