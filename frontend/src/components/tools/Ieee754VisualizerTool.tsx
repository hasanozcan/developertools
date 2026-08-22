'use client';
import React, { useState, useMemo } from 'react';
import { inspectIeee754Float32 } from '@/lib/ieee754Visualizer';

export default function Ieee754VisualizerTool() {
  const [val, setVal] = useState(1.0);
  const res = useMemo(() => inspectIeee754Float32(val), [val]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="number" step="0.1" value={val} onChange={(e) => setVal(Number(e.target.value))} className="w-full rounded-xl border p-2 text-xs" />
        <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400 space-y-1">
          <p><strong>Sign (1 bit):</strong> {res.signBit}</p>
          <p><strong>Exponent (8 bits):</strong> {res.exponentBits}</p>
          <p><strong>Mantissa (23 bits):</strong> {res.mantissaBits}</p>
        </div>
      </div>
    </div>
  );
}
