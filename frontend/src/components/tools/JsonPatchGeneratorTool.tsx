'use client';
import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { generateJsonPatch } from '@/lib/jsonPatchGenerator';

export default function JsonPatchGeneratorTool() {
  const [docA, setDocA] = useState(JSON.stringify({ name: 'Alice', role: 'developer' }, null, 2));
  const [docB, setDocB] = useState(JSON.stringify({ name: 'Alice', role: 'lead', location: 'London' }, null, 2));
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    try {
      const parsedA = JSON.parse(docA);
      const parsedB = JSON.parse(docB);
      return JSON.stringify(generateJsonPatch(parsedA, parsedB), null, 2);
    } catch (e: any) {
      return '// Error: ' + e.message;
    }
  }, [docA, docB]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted-foreground">Original JSON (Doc A)</label>
          <textarea value={docA} onChange={(e) => setDocA(e.target.value)} rows={6} className="w-full p-3 rounded-lg border border-border bg-card font-mono text-sm" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Modified JSON (Doc B)</label>
          <textarea value={docB} onChange={(e) => setDocB(e.target.value)} rows={6} className="w-full p-3 rounded-lg border border-border bg-card font-mono text-sm" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">RFC 6902 JSON Patch</label>
          <button onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-secondary">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <textarea readOnly value={result} rows={8} className="w-full rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm" />
      </div>
    </div>
  );
}
