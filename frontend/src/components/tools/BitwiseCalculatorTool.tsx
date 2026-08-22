'use client';
import React, { useState, useMemo } from 'react';
import { calculateBitwise } from '@/lib/bitwiseCalculator';

export default function BitwiseCalculatorTool() {
  const [a, setA] = useState(12);
  const [b, setB] = useState(10);
  const res = useMemo(() => calculateBitwise(a, b, 'AND'), [a, b]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} className="rounded-xl border p-2 text-xs" />
          <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} className="rounded-xl border p-2 text-xs" />
        </div>
        <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400">
          <p>Result: {res.decimalResult} ({res.hexResult})</p>
        </div>
      </div>
    </div>
  );
}
