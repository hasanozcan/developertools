'use client';
import React, { useState } from 'react';
import { buildTestJwt } from '@/lib/jwtBuilder';
import { Copy, Check } from 'lucide-react';

export default function JwtBuilderTool() {
  const [header, setHeader] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
  const [payload, setPayload] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}');
  const [copied, setCopied] = useState(false);

  let token = '';
  try {
    token = buildTestJwt(JSON.parse(header), JSON.parse(payload));
  } catch {
    token = 'Error: Invalid JSON in header or payload';
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => { navigator.clipboard.writeText(token); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md transition hover:bg-indigo-500"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? 'Copied' : 'Copy JWT Token'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase">Header JSON</label>
          <textarea value={header} onChange={(e) => setHeader(e.target.value)} rows={5} className="w-full rounded-xl border border-slate-200 p-3 font-mono text-xs dark:border-white/10 dark:bg-slate-950" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase">Payload Claims JSON</label>
          <textarea value={payload} onChange={(e) => setPayload(e.target.value)} rows={5} className="w-full rounded-xl border border-slate-200 p-3 font-mono text-xs dark:border-white/10 dark:bg-slate-950" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-500 uppercase">Generated JWT</label>
        <p className="font-mono text-xs bg-slate-900 text-pink-400 p-4 rounded-2xl break-all">{token}</p>
      </div>
    </div>
  );
}
