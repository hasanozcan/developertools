'use client';
import React, { useState, useMemo } from 'react';
import { generateOpenSslCsrCommand } from '@/lib/csrGenerator';

export default function CsrGeneratorTool() {
  const [cn, setCn] = useState('api.devstools.app');
  const res = useMemo(() => generateOpenSslCsrCommand({ commonName: cn }), [cn]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="text" value={cn} onChange={(e) => setCn(e.target.value)} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <textarea readOnly rows={4} value={res.openSslCommand} className="w-full rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
