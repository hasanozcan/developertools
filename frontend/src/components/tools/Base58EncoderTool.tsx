'use client';
import React, { useState, useMemo } from 'react';
import { encodeBase58, decodeBase58 } from '@/lib/base58Encoder';

export default function Base58EncoderTool() {
  const [text, setText] = useState('Hello Bitcoin & Solana');
  const encoded = useMemo(() => encodeBase58(text), [text]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea rows={8} value={text} onChange={(e) => setText(e.target.value)} className="rounded-xl border p-3 font-mono text-xs" />
        <textarea readOnly rows={8} value={encoded} className="rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
