'use client';
import React, { useState } from 'react';
import { generateNextjsMetadata } from '@/lib/nextjsMetadataGenerator';
import { Copy, Check } from 'lucide-react';

export default function NextjsMetadataGeneratorTool() {
  const [title, setTitle] = useState('My Awesome App');
  const [desc, setDesc] = useState('Build high-performance web applications with Next.js 16');
  const [url, setUrl] = useState('https://example.com');
  const [siteName, setSiteName] = useState('ExampleApp');
  const [copied, setCopied] = useState(false);

  const code = generateNextjsMetadata({ title, description: desc, url, siteName });

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md transition hover:bg-indigo-500"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? 'Copied' : 'Copy Metadata Code'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-500">Page Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">Description</label>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-slate-500">Canonical URL</label>
              <input value={url} onChange={(e) => setUrl(e.target.value)} className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">Site Name</label>
              <input value={siteName} onChange={(e) => setSiteName(e.target.value)} className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950" />
            </div>
          </div>
        </div>

        <pre className="h-[260px] overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 dark:border-white/10">
          {code}
        </pre>
      </div>
    </div>
  );
}
