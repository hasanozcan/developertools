'use client';
import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { jsonToRustSerde } from '@/lib/jsonToRustSerde';

export default function JsonToRustSerdeTool() {
  const [json, setJson] = useState('{\n  "id": 1,\n  "name": "Alice",\n  "active": true\n}');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    try {
      return jsonToRustSerde(json, 'User');
    } catch (err: unknown) {
      return '// ' + (err instanceof Error ? err.message : String(err));
    }
  }, [json]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="surface-card rounded-2xl p-5 space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">JSON Input</h3>
          <textarea rows={12} value={json} onChange={(e) => setJson(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs dark:border-white/10 dark:bg-slate-950 dark:text-slate-100" />
        </div>
        <div className="surface-card rounded-2xl p-5 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Rust Serde Struct</h3>
            <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="inline-flex items-center gap-1.5 text-xs text-indigo-600 font-semibold">{copied ? 'Copied' : 'Copy'}</button>
          </div>
          <textarea readOnly rows={12} value={output} className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-900 p-3 font-mono text-xs text-emerald-400 dark:border-white/10 dark:bg-slate-950" />
        </div>
      </div>
    </div>
  );
}
