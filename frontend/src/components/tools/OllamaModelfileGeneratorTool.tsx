'use client';
import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { generateOllamaModelfile } from '@/lib/ollamaModelfileGenerator';

export default function OllamaModelfileGeneratorTool() {
  const [baseModel, setBaseModel] = useState('llama3:8b');
  const [temperature, setTemperature] = useState(0.7);
  const [systemPrompt, setSystemPrompt] = useState('You are an expert full-stack TypeScript engineer.');
  const [copied, setCopied] = useState(false);

  const modelfile = useMemo(() => generateOllamaModelfile({ baseModel, temperature, systemPrompt }), [baseModel, temperature, systemPrompt]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted-foreground">Base Model</label>
          <input value={baseModel} onChange={(e) => setBaseModel(e.target.value)} className="w-full p-2.5 rounded-lg border border-border bg-card text-sm" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Temperature ({temperature})</label>
          <input type="range" min="0" max="1" step="0.05" value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} className="w-full" />
        </div>
      </div>
      <div>
        <label className="text-xs text-muted-foreground">System Prompt</label>
        <textarea value={systemPrompt} onChange={(e) => setSystemPrompt(e.target.value)} rows={3} className="w-full p-2.5 rounded-lg border border-border bg-card text-sm" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">Modelfile</label>
          <button onClick={() => { navigator.clipboard.writeText(modelfile); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-secondary">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <textarea readOnly value={modelfile} rows={8} className="w-full rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm" />
      </div>
    </div>
  );
}
