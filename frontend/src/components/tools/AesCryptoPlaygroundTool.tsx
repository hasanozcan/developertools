'use client';
import React, { useState } from 'react';
import { formatAesKeyHex } from '@/lib/aesCryptoPlayground';

export default function AesCryptoPlaygroundTool() {
  const [key, setKey] = useState(formatAesKeyHex(256));

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <button onClick={() => setKey(formatAesKeyHex(256))} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold">Generate 256-bit AES Key</button>
        <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400">{key}</div>
      </div>
    </div>
  );
}
