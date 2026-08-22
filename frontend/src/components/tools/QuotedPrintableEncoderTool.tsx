'use client';
import React, { useState, useMemo } from 'react';
import { Copy, Check, ArrowDownUp } from 'lucide-react';
import { encodeQuotedPrintable, decodeQuotedPrintable } from '@/lib/quotedPrintableEncoder';

export default function QuotedPrintableEncoderTool() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('Hello World! Café & Résumé = Great');
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    try {
      return mode === 'encode' ? encodeQuotedPrintable(input) : decodeQuotedPrintable(input);
    } catch (e: any) {
      return 'Error: ' + e.message;
    }
  }, [input, mode]);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          onClick={() => setMode(mode === 'encode' ? 'decode' : 'encode')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium"
        >
          <ArrowDownUp className="w-4 h-4" />
          Mode: {mode === 'encode' ? 'Encode to Quoted-Printable' : 'Decode to Plain Text'}
        </button>
      </div>
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground font-medium">Input ({mode === 'encode' ? 'Plain Text' : 'Quoted-Printable'})</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={5} className="w-full p-3 rounded-lg border border-border bg-card font-mono text-sm" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">Output Result</label>
          <button onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-secondary">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <textarea readOnly value={result} rows={5} className="w-full rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm" />
      </div>
    </div>
  );
}
