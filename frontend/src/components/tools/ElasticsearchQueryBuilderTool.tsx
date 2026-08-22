'use client';
import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { buildElasticsearchQuery } from '@/lib/elasticsearchQueryBuilder';

export default function ElasticsearchQueryBuilderTool() {
  const [index, setIndex] = useState('products');
  const [searchTerm, setSearchTerm] = useState('wireless headphones');
  const [field, setField] = useState('title');
  const [statusFilter, setStatusFilter] = useState('active');
  const [copied, setCopied] = useState(false);

  const query = useMemo(() => buildElasticsearchQuery({ index, searchTerm, field, statusFilter }), [index, searchTerm, field, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="text-xs text-muted-foreground">Index</label>
          <input value={index} onChange={(e) => setIndex(e.target.value)} className="w-full p-2 rounded-lg border border-border bg-card text-sm" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Search Field</label>
          <input value={field} onChange={(e) => setField(e.target.value)} className="w-full p-2 rounded-lg border border-border bg-card text-sm" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Query Text</label>
          <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-2 rounded-lg border border-border bg-card text-sm" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Status Filter</label>
          <input value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full p-2 rounded-lg border border-border bg-card text-sm" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">Elasticsearch Query DSL</label>
          <button onClick={() => { navigator.clipboard.writeText(query); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-secondary">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <textarea readOnly value={query} rows={8} className="w-full rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm" />
      </div>
    </div>
  );
}
