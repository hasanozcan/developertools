'use client';
import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { simulateHandshake } from '@/lib/sslTlsHandshakeSimulator';

export default function SslTlsHandshakeSimulatorTool() {
  const [version, setVersion] = useState<'1.2' | '1.3'>('1.3');
  const steps = simulateHandshake(version);
  const output = steps.join('\n\n');

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button onClick={() => setVersion('1.3')} className={`px-4 py-2 rounded-xl text-xs font-semibold ${version === '1.3' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>TLS 1.3 (1-RTT)</button>
        <button onClick={() => setVersion('1.2')} className={`px-4 py-2 rounded-xl text-xs font-semibold ${version === '1.2' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>TLS 1.2 (2-RTT)</button>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold">Cryptographic Handshake Flow</label>
          <CopyButton text={output} />
        </div>
        <textarea value={output} readOnly rows={10} className="w-full rounded-2xl border bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
      </div>
    </div>
  );
}
