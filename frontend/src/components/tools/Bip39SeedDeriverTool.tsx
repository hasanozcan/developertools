'use client';
import React, { useState, useMemo } from 'react';
import { deriveSeedHexSimple } from '@/lib/bip39SeedDeriver';

export default function Bip39SeedDeriverTool() {
  const [mnemonic, setMnemonic] = useState('abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about');
  const seed = useMemo(() => deriveSeedHexSimple(mnemonic), [mnemonic]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <textarea rows={4} value={mnemonic} onChange={(e) => setMnemonic(e.target.value)} className="w-full rounded-xl border p-3 font-mono text-xs" />
        <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400">{seed}</div>
      </div>
    </div>
  );
}
