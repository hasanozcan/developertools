'use client';
import React, { useState } from 'react';
import { generateUuidV5 } from '@/lib/uuidV5Generator';
import { Copy, Check } from 'lucide-react';

export default function UuidV5GeneratorTool() {
  const [namespace, setNamespace] = useState('6ba7b810-9dad-11d1-80b4-00c04fd430c8');
  const [name, setName] = useState('devstools.app');
  const [copied, setCopied] = useState(false);

  const uuid = generateUuidV5(namespace, name);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-500">Namespace UUID</label>
          <input value={namespace} onChange={(e) => setNamespace(e.target.value)} className="w-full rounded-xl border border-slate-200 p-2 font-mono text-xs dark:border-white/10 dark:bg-slate-950" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500">Name String</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950" />
        </div>
      </div>

      <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-6 dark:border-indigo-900/30 dark:bg-indigo-950/20 flex justify-between items-center">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase">Deterministic UUID v5</span>
          <p className="font-mono text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{uuid}</p>
        </div>
        <button
          onClick={() => { navigator.clipboard.writeText(uuid); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-indigo-500"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? 'Copied' : 'Copy UUID'}</span>
        </button>
      </div>
    </div>
  );
}
