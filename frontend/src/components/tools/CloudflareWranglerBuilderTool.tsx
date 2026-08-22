'use client';
import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { generateWranglerConfig } from '@/lib/cloudflareWranglerBuilder';

export default function CloudflareWranglerBuilderTool() {
  const [name, setName] = useState('my-cloudflare-worker');
  const [main, setMain] = useState('src/index.ts');
  const [enableKv, setEnableKv] = useState(true);
  const [enableD1, setEnableD1] = useState(true);
  const [copied, setCopied] = useState(false);

  const json = useMemo(() => generateWranglerConfig({ name, main, compatibilityDate: '2026-01-01', enableKv, enableD1 }), [name, main, enableKv, enableD1]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted-foreground">Worker Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2.5 rounded-lg border border-border bg-card text-sm" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Entry Point</label>
          <input value={main} onChange={(e) => setMain(e.target.value)} className="w-full p-2.5 rounded-lg border border-border bg-card text-sm" />
        </div>
      </div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={enableKv} onChange={(e) => setEnableKv(e.target.checked)} />
          Enable KV Namespaces
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={enableD1} onChange={(e) => setEnableD1(e.target.checked)} />
          Enable D1 SQL Database
        </label>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">wrangler.json</label>
          <button onClick={() => { navigator.clipboard.writeText(json); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-secondary">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <textarea readOnly value={json} rows={8} className="w-full rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm" />
      </div>
    </div>
  );
}
