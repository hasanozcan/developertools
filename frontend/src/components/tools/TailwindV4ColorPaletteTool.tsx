'use client';
import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { generateTailwindV4OklchPalette } from '@/lib/tailwindV4ColorPalette';

export default function TailwindV4ColorPaletteTool() {
  const [hue, setHue] = useState(260);
  const [copied, setCopied] = useState(false);

  const palette = useMemo(() => generateTailwindV4OklchPalette(hue), [hue]);
  const css = useMemo(() => JSON.stringify(palette, null, 2), [palette]);

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs text-muted-foreground">Base OKLCH Hue Angle: {hue}°</label>
        <input type="range" min="0" max="360" value={hue} onChange={(e) => setHue(Number(e.target.value))} className="w-full" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
        {Object.entries(palette).map(([shade, oklch]) => (
          <div key={shade} className="p-3 rounded-lg border border-border bg-card text-center text-xs font-mono">
            <div className="w-full h-8 rounded mb-2 border border-border/50" style={{ backgroundColor: oklch }} />
            <div className="font-bold text-foreground">{shade}</div>
            <div className="text-[10px] text-muted-foreground truncate">{oklch}</div>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">JSON Color Map</label>
          <button onClick={() => { navigator.clipboard.writeText(css); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-secondary">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <textarea readOnly value={css} rows={6} className="w-full rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm" />
      </div>
    </div>
  );
}
