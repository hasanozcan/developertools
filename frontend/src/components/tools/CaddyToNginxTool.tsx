'use client';
import React, { useState, useMemo } from 'react';
import { convertCaddyToNginx } from '@/lib/caddyToNginx';

export default function CaddyToNginxTool() {
  const [caddy, setCaddy] = useState('api.example.com {\n  reverse_proxy localhost:8080\n}');
  const nginx = useMemo(() => convertCaddyToNginx(caddy), [caddy]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea rows={12} value={caddy} onChange={(e) => setCaddy(e.target.value)} className="rounded-xl border p-3 font-mono text-xs" />
        <textarea readOnly rows={12} value={nginx} className="rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
