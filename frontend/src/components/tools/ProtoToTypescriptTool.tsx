'use client';
import React, { useState } from 'react';
import { protoToTypescript } from '@/lib/protoToTypescript';
import { Copy, Check } from 'lucide-react';

export default function ProtoToTypescriptTool() {
  const [proto, setProto] = useState(`message UserProfile {
  string id = 1;
  string email = 2;
  int32 age = 3;
  repeated string tags = 4;
}`);
  const [copied, setCopied] = useState(false);
  const ts = protoToTypescript(proto);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => { navigator.clipboard.writeText(ts); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md transition hover:bg-indigo-500"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? 'Copied' : 'Copy TypeScript'}</span>
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <textarea
          value={proto}
          onChange={(e) => setProto(e.target.value)}
          rows={10}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 font-mono text-xs text-slate-800 focus:border-indigo-500 focus:outline-none dark:border-white/10 dark:bg-slate-950 dark:text-slate-200"
        />
        <pre className="h-[200px] overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 dark:border-white/10">
          {ts}
        </pre>
      </div>
    </div>
  );
}
