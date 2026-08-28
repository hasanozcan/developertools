'use client';
import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { generateOpenSslCsrConfig } from '@/lib/x509SanCsrBuilder';

export default function X509SanCsrBuilderTool() {
  const [domain, setDomain] = useState('example.com');
  const [sans, setSans] = useState('example.com\napi.example.com\n*.example.com');
  const output = generateOpenSslCsrConfig(domain, sans.split('\n').filter(Boolean));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold">Primary Domain (CN)</label>
          <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} className="w-full rounded-xl border p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
        </div>
        <div>
          <label className="text-xs font-semibold">Subject Alternative Names (SANs)</label>
          <textarea value={sans} onChange={(e) => setSans(e.target.value)} rows={3} className="w-full rounded-xl border p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold">OpenSSL Configuration File (openssl.cnf)</label>
          <CopyButton text={output} />
        </div>
        <textarea value={output} readOnly rows={12} className="w-full rounded-2xl border bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
      </div>
    </div>
  );
}
