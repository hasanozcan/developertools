'use client';
import React, { useState } from 'react';
import { convertCryptoUnits } from '@/lib/cryptoUnitConverter';

export default function CryptoUnitConverterTool() {
  const [val, setVal] = useState('1');
  const [unit, setUnit] = useState<'wei' | 'gwei' | 'ether' | 'satoshis' | 'btc'>('ether');

  const res = convertCryptoUnits(val, unit);

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <input value={val} onChange={(e) => setVal(e.target.value)} className="flex-1 rounded-2xl border border-slate-200 p-3 text-sm font-semibold dark:border-white/10 dark:bg-slate-950" />
        <select value={unit} onChange={(e) => setUnit(e.target.value as any)} className="rounded-2xl border border-slate-200 p-3 text-xs dark:border-white/10 dark:bg-slate-950">
          <option value="ether">Ether (ETH)</option>
          <option value="gwei">Gwei</option>
          <option value="wei">Wei</option>
          <option value="satoshis">Satoshis (Sats)</option>
          <option value="btc">Bitcoin (BTC)</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 dark:border-white/10 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500">Ether</span>
          <p className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-1">{res.ether}</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 dark:border-white/10 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500">Gwei</span>
          <p className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-1">{res.gwei}</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 dark:border-white/10 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500">Satoshis</span>
          <p className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-1">{res.satoshis}</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 dark:border-white/10 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500">Wei</span>
          <p className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-1 break-all">{res.wei}</p>
        </div>
      </div>
    </div>
  );
}
