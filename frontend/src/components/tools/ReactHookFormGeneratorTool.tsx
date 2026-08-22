'use client';
import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { generateReactHookFormCode } from '@/lib/reactHookFormGenerator';

const defaultFields = [
  { name: 'fullName', type: 'text' },
  { name: 'email', type: 'email' },
  { name: 'password', type: 'password' },
];

export default function ReactHookFormGeneratorTool() {
  const [copied, setCopied] = useState(false);
  const code = useMemo(() => generateReactHookFormCode(defaultFields), []);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">Generated React Component</label>
          <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-secondary">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <textarea readOnly value={code} rows={12} className="w-full rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm" />
      </div>
    </div>
  );
}
