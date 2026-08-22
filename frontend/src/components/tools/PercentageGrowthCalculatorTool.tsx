'use client';
import React, { useState, useMemo } from 'react';
import { calculateGrowth } from '@/lib/percentageGrowthCalculator';

export default function PercentageGrowthCalculatorTool() {
  const [a, setA] = useState(50);
  const [b, setB] = useState(75);
  const res = useMemo(() => calculateGrowth(a, b), [a, b]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} className="rounded-xl border p-2 text-xs" />
          <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} className="rounded-xl border p-2 text-xs" />
        </div>
        <div className="p-4 bg-indigo-500/10 rounded-xl text-center font-bold text-lg text-indigo-600">
          Growth: {res.formatted}
        </div>
      </div>
    </div>
  );
}
