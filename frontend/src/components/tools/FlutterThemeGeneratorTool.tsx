'use client';
import React, { useState, useMemo } from 'react';
import { generateFlutterColorScheme } from '@/lib/flutterThemeGenerator';

export default function FlutterThemeGeneratorTool() {
  const [hex, setHex] = useState('#3B82F6');
  const code = useMemo(() => generateFlutterColorScheme(hex, false), [hex]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="w-10 h-10 rounded-xl cursor-pointer" />
        <textarea readOnly rows={10} value={code} className="w-full rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
