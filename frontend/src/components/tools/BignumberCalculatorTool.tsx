'use client';
import React, { useState, useMemo } from 'react';
import { calculateBigInt } from '@/lib/bignumberCalculator';

export default function BignumberCalculatorTool() {
  const [a, setA] = useState('999999999999999999999999999999');
  const [b, setB] = useState('1');
  const res = useMemo(() => calculateBigInt(a, b, '+'), [a, b]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="text" value={a} onChange={(e) => setA(e.target.value)} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <input type="text" value={b} onChange={(e) => setB(e.target.value)} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400">{res}</div>
      </div>
    </div>
  );
}
