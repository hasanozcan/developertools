'use client';
import React, { useState, useMemo } from 'react';
import { simulateDnsLookup } from '@/lib/dnsLookupSimulator';

export default function DnsLookupSimulatorTool() {
  const [domain, setDomain] = useState('devstools.app');
  const records = useMemo(() => simulateDnsLookup(domain), [domain]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <div className="space-y-2">
          {records.map((r, idx) => (
            <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl flex justify-between font-mono text-xs">
              <span className="font-bold text-indigo-600">{r.type}</span>
              <span>{r.value}</span>
              <span className="text-slate-400">TTL {r.ttl}s</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
