'use client';
import React, { useState } from 'react';
import { buildUtmUrl } from '@/lib/urlUtmBuilder';
import { Copy, Check } from 'lucide-react';

export default function UrlUtmBuilderTool() {
  const [base, setBase] = useState('https://devstools.app');
  const [source, setSource] = useState('newsletter');
  const [medium, setMedium] = useState('email');
  const [campaign, setCampaign] = useState('august_release');
  const [copied, setCopied] = useState(false);

  const fullUrl = buildUtmUrl(base, { source, medium, campaign });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2"><label className="text-xs font-semibold text-slate-500">Website URL</label><input value={base} onChange={(e) => setBase(e.target.value)} className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950" /></div>
        <div><label className="text-xs font-semibold text-slate-500">Campaign Source (utm_source)</label><input value={source} onChange={(e) => setSource(e.target.value)} className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950" /></div>
        <div><label className="text-xs font-semibold text-slate-500">Campaign Medium (utm_medium)</label><input value={medium} onChange={(e) => setMedium(e.target.value)} className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950" /></div>
        <div className="sm:col-span-2"><label className="text-xs font-semibold text-slate-500">Campaign Name (utm_campaign)</label><input value={campaign} onChange={(e) => setCampaign(e.target.value)} className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950" /></div>
      </div>

      <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-6 dark:border-indigo-900/30 dark:bg-indigo-950/20 flex justify-between items-center">
        <p className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 break-all">{fullUrl}</p>
        <button onClick={() => { navigator.clipboard.writeText(fullUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-indigo-500">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy URL
        </button>
      </div>
    </div>
  );
}
