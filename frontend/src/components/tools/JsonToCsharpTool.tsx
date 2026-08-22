'use client';
import React, { useState, useMemo } from 'react';
import { jsonToCsharp } from '@/lib/jsonToCsharp';

export default function JsonToCsharpTool() {
  const [json, setJson] = useState('{\n  "userId": 1,\n  "title": "Task 1",\n  "isComplete": false\n}');
  const output = useMemo(() => {
    try { return jsonToCsharp(json, 'TodoItem'); } catch (e: any) { return '// ' + e.message; }
  }, [json]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea rows={12} value={json} onChange={(e) => setJson(e.target.value)} className="rounded-xl border p-3 font-mono text-xs" />
        <textarea readOnly rows={12} value={output} className="rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
