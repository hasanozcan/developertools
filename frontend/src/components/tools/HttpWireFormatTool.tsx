'use client';
import React, { useState, useMemo } from 'react';
import { formatRawHttpWire } from '@/lib/httpWireFormat';

export default function HttpWireFormatTool() {
  const [method, setMethod] = useState('POST');
  const [path, setPath] = useState('/api/v1/auth');
  const [host, setHost] = useState('api.example.com');
  const [body, setBody] = useState('{"username":"admin"}');

  const wire = useMemo(() => formatRawHttpWire(method, path, host, { 'Content-Type': 'application/json' }, body), [method, path, host, body]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <input type="text" value={method} onChange={(e) => setMethod(e.target.value)} className="rounded-xl border p-2 text-xs font-mono" />
          <input type="text" value={path} onChange={(e) => setPath(e.target.value)} className="rounded-xl border p-2 text-xs font-mono" />
          <input type="text" value={host} onChange={(e) => setHost(e.target.value)} className="rounded-xl border p-2 text-xs font-mono" />
        </div>
        <textarea readOnly rows={8} value={wire} className="w-full rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
