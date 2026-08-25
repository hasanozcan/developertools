'use client';
import React, { useState } from 'react';
import { jsonToKotlinClass } from '@/lib/jsonToKotlinClass';
import { Copy, Check } from 'lucide-react';

export default function JsonToKotlinClassTool() {
  const [json, setJson] = useState('{"user_id":55,"email":"test@example.com","score":100}');
  const [copied, setCopied] = useState(false);
  const kt = jsonToKotlinClass(json, 'UserDto');

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => { navigator.clipboard.writeText(kt); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md transition hover:bg-indigo-500"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? 'Copied' : 'Copy Kotlin Class'}</span>
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          rows={10}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 font-mono text-xs text-slate-800 focus:border-indigo-500 focus:outline-none dark:border-white/10 dark:bg-slate-950 dark:text-slate-200"
        />
        <pre className="h-[200px] overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-purple-400 dark:border-white/10">
          {kt}
        </pre>
      </div>
    </div>
  );
}
