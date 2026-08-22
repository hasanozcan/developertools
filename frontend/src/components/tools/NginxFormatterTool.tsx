'use client';
import React, { useState, useMemo } from 'react';
import { formatNginxConfig } from '@/lib/nginxFormatter';

export default function NginxFormatterTool() {
  const [raw, setRaw] = useState('server {\nlisten 80;\nlocation / {\nproxy_pass http://localhost:3000;\n}\n}');
  const formatted = useMemo(() => formatNginxConfig(raw), [raw]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea rows={12} value={raw} onChange={(e) => setRaw(e.target.value)} className="rounded-xl border p-3 font-mono text-xs" />
        <textarea readOnly rows={12} value={formatted} className="rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
