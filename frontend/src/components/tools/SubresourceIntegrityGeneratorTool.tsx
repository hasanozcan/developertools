'use client';
import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { generateSriScriptTag } from '@/lib/subresourceIntegrityGenerator';

export default function SubresourceIntegrityGeneratorTool() {
  const [scriptUrl, setScriptUrl] = useState('https://cdn.example.com/bundle.min.js');
  const [hash, setHash] = useState('oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC');
  const [algo, setAlgo] = useState<'sha256' | 'sha384' | 'sha512'>('sha384');
  const [copied, setCopied] = useState(false);

  const tag = useMemo(() => generateSriScriptTag(scriptUrl, hash, algo), [scriptUrl, hash, algo]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label className="text-xs text-muted-foreground">Script URL</label>
          <input value={scriptUrl} onChange={(e) => setScriptUrl(e.target.value)} className="w-full p-2.5 rounded-lg border border-border bg-card font-mono text-sm" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Hash Algorithm</label>
          <select value={algo} onChange={(e: any) => setAlgo(e.target.value)} className="w-full p-2.5 rounded-lg border border-border bg-card text-sm">
            <option value="sha256">SHA-256</option>
            <option value="sha384">SHA-384 (Recommended)</option>
            <option value="sha512">SHA-512</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-xs text-muted-foreground">Base64 Digest Hash</label>
        <input value={hash} onChange={(e) => setHash(e.target.value)} className="w-full p-2.5 rounded-lg border border-border bg-card font-mono text-sm" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">HTML Script Tag with SRI</label>
          <button onClick={() => { navigator.clipboard.writeText(tag); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-secondary">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <textarea readOnly value={tag} rows={4} className="w-full rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm" />
      </div>
    </div>
  );
}
