'use client';

import React, { useState } from 'react';
import { convertCurlToPostman } from '@/lib/curlToPostman';
import { Copy, Check, Download, ArrowRightLeft } from 'lucide-react';

const DEFAULT_CURL = `curl -X POST "https://api.example.com/v1/auth/login" \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@example.com", "password": "secretpassword"}'`;

export default function CurlToPostmanTool() {
  const [curlInput, setCurlInput] = useState(DEFAULT_CURL);
  const [collectionName, setCollectionName] = useState('Imported cURL Collection');
  const [postmanJson, setPostmanJson] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    try {
      setError(null);
      const res = convertCurlToPostman(curlInput, collectionName);
      setPostmanJson(JSON.stringify(res, null, 2));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid cURL input');
    }
  };

  const handleCopy = () => {
    if (!postmanJson) return;
    navigator.clipboard.writeText(postmanJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!postmanJson) return;
    const blob = new Blob([postmanJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${collectionName.toLowerCase().replace(/\s+/g, '-')}.postman_collection.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground">Collection Name</label>
            <input
              type="text"
              value={collectionName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCollectionName(e.target.value)}
              placeholder="My Postman Collection"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-foreground">cURL Command(s)</label>
            <button
              onClick={handleConvert}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <ArrowRightLeft className="h-3.5 w-3.5" /> Convert to Collection
            </button>
          </div>
          <textarea
            value={curlInput}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCurlInput(e.target.value)}
            placeholder="Paste one or more curl commands here..."
            rows={13}
            className="w-full rounded-lg border border-input bg-background p-3 font-mono text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {error && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive">
              {error}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-foreground">Postman Collection v2.1 JSON</label>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                disabled={!postmanJson}
                className="inline-flex items-center gap-1.5 rounded-lg border border-input bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent disabled:opacity-50 transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button
                onClick={handleDownload}
                disabled={!postmanJson}
                className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 transition-colors"
              >
                <Download className="h-3.5 w-3.5" /> Download JSON
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={postmanJson}
            placeholder="Click Convert to see Postman Collection v2.1 JSON..."
            rows={16}
            className="w-full rounded-lg border border-input bg-muted/30 p-3 font-mono text-xs text-foreground focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
