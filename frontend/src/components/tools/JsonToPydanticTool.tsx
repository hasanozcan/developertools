'use client';
import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { jsonToPydantic } from '@/lib/jsonToPydantic';

export default function JsonToPydanticTool() {
  const [json, setJson] = useState('{\n  "user_id": 123,\n  "username": "johndoe",\n  "is_active": true,\n  "score": 98.5,\n  "tags": ["admin", "developer"]\n}');
  const [rootModel, setRootModel] = useState('User');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    try {
      return jsonToPydantic(json, rootModel.trim() || 'User');
    } catch (err: unknown) {
      return '# ' + (err instanceof Error ? err.message : String(err));
    }
  }, [json, rootModel]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <label htmlFor="pydantic-root-model" className="text-xs font-medium text-slate-600 dark:text-slate-300">Root model name</label>
        <input
          id="pydantic-root-model"
          type="text"
          value={rootModel}
          onChange={(e) => setRootModel(e.target.value)}
          className="w-40 rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm font-medium dark:border-white/10 dark:bg-slate-950 dark:text-slate-100"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="surface-card rounded-2xl p-5 space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">JSON Input</h3>
          <textarea rows={12} value={json} onChange={(e) => setJson(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs dark:border-white/10 dark:bg-slate-950 dark:text-slate-100" />
        </div>
        <div className="surface-card rounded-2xl p-5 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Python Pydantic V2 Model</h3>
            <button onClick={handleCopy} className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}{copied ? 'Copied' : 'Copy'}</button>
          </div>
          <textarea readOnly rows={12} value={output} className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-900 p-3 font-mono text-xs text-emerald-400 dark:border-white/10 dark:bg-slate-950" />
        </div>
      </div>
    </div>
  );
}
