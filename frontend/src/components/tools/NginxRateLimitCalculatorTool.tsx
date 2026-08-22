'use client';
import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { generateNginxRateLimitDirectives } from '@/lib/nginxRateLimitCalculator';

export default function NginxRateLimitCalculatorTool() {
  const [zoneName, setZoneName] = useState('api_limit');
  const [ratePerSec, setRatePerSec] = useState(10);
  const [burst, setBurst] = useState(20);
  const [nodelay, setNodelay] = useState(true);
  const [copied, setCopied] = useState(false);

  const conf = useMemo(() => generateNginxRateLimitDirectives({ zoneName, ratePerSec, burst, nodelay }), [zoneName, ratePerSec, burst, nodelay]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs text-muted-foreground">Zone Name</label>
          <input value={zoneName} onChange={(e) => setZoneName(e.target.value)} className="w-full p-2.5 rounded-lg border border-border bg-card text-sm" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Rate (requests / sec)</label>
          <input type="number" value={ratePerSec} onChange={(e) => setRatePerSec(Number(e.target.value))} className="w-full p-2.5 rounded-lg border border-border bg-card text-sm" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Burst Allowance</label>
          <input type="number" value={burst} onChange={(e) => setBurst(Number(e.target.value))} className="w-full p-2.5 rounded-lg border border-border bg-card text-sm" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">Nginx Directives</label>
          <button onClick={() => { navigator.clipboard.writeText(conf); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-secondary">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <textarea readOnly value={conf} rows={6} className="w-full rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm" />
      </div>
    </div>
  );
}
