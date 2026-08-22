'use client';
import React, { useState, useMemo } from 'react';
import { formatCubicBezier, CUBIC_BEZIER_PRESETS } from '@/lib/cssCubicBezier';

export default function CssCubicBezierTool() {
  const [preset, setPreset] = useState('bounce');
  const result = useMemo(() => formatCubicBezier(CUBIC_BEZIER_PRESETS[preset] || CUBIC_BEZIER_PRESETS.ease), [preset]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <select value={preset} onChange={(e) => setPreset(e.target.value)} className="rounded-xl border p-2 text-xs font-semibold">
          {Object.keys(CUBIC_BEZIER_PRESETS).map((k) => <option key={k} value={k}>{k}</option>)}
        </select>
        <div className="p-4 rounded-xl bg-slate-900 font-mono text-emerald-400 text-xs">
          <p>{result.transitionCss}</p>
        </div>
      </div>
    </div>
  );
}
