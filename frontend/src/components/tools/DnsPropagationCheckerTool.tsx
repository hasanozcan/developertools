'use client';
import React, { useState } from 'react';
import { checkDnsPropagation } from '@/lib/dnsPropagationChecker';
import { Globe, CheckCircle2 } from 'lucide-react';

export default function DnsPropagationCheckerTool() {
  const [domain, setDomain] = useState('devstools.app');
  const [ip, setIp] = useState('76.76.21.21');
  const results = checkDnsPropagation(domain, ip);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className="text-xs font-semibold text-slate-500">Domain Name</label><input value={domain} onChange={(e) => setDomain(e.target.value)} className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950" /></div>
        <div><label className="text-xs font-semibold text-slate-500">Expected A-Record IP</label><input value={ip} onChange={(e) => setIp(e.target.value)} className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950" /></div>
      </div>

      <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white p-2 dark:divide-white/10 dark:border-white/10 dark:bg-slate-900">
        {results.map((r, i) => (
          <div key={i} className="flex items-center justify-between p-3 text-xs">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-indigo-500" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">{r.location}</span>
              <span className="text-slate-400 font-mono">({r.server})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-emerald-600 dark:text-emerald-400">{r.ip}</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
