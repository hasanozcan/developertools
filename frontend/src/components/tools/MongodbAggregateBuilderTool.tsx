'use client';
import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { generateMongoAggregatePipeline } from '@/lib/mongodbAggregateBuilder';

export default function MongodbAggregateBuilderTool() {
  const [matchField, setMatchField] = useState('status');
  const [matchVal, setMatchVal] = useState('active');
  const [groupField, setGroupField] = useState('category');
  const [copied, setCopied] = useState(false);

  const json = useMemo(() => generateMongoAggregatePipeline(matchField, matchVal, groupField), [matchField, matchVal, groupField]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs text-muted-foreground">$match Field</label>
          <input value={matchField} onChange={(e) => setMatchField(e.target.value)} className="w-full p-2.5 rounded-lg border border-border bg-card font-mono text-sm" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">$match Value</label>
          <input value={matchVal} onChange={(e) => setMatchVal(e.target.value)} className="w-full p-2.5 rounded-lg border border-border bg-card font-mono text-sm" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">$group By Field</label>
          <input value={groupField} onChange={(e) => setGroupField(e.target.value)} className="w-full p-2.5 rounded-lg border border-border bg-card font-mono text-sm" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">MongoDB Pipeline</label>
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
