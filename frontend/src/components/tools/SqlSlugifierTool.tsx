'use client';
import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { slugifyToSqlIdentifier } from '@/lib/sqlSlugifier';

export default function SqlSlugifierTool() {
  const [input, setInput] = useState("User Invoices & Billing 2026");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    try {
      return typeof slugifyToSqlIdentifier === 'function' ? String(slugifyToSqlIdentifier(input)) : '';
    } catch (e: any) {
      return 'Error: ' + e.message;
    }
  }, [input]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Input</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          className="w-full rounded-xl border border-border bg-card p-4 font-mono text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">Output</label>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <textarea
          readOnly
          value={result}
          rows={8}
          className="w-full rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm text-foreground shadow-sm"
        />
      </div>
    </div>
  );
}
