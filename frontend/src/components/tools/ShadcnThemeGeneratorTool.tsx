'use client';
import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { generateShadcnCssVariables } from '@/lib/shadcnThemeGenerator';

export default function ShadcnThemeGeneratorTool() {
  const [primary, setPrimary] = useState('221.2 83.2% 53.3%');
  const [background, setBackground] = useState('0 0% 100%');
  const [radius, setRadius] = useState('0.5rem');
  const [copied, setCopied] = useState(false);

  const css = useMemo(() => {
    return generateShadcnCssVariables({
      primary,
      background,
      foreground: '222.2 84% 4.9%',
      muted: '210 40% 96.1%',
      border: '214.3 31.8% 91.4%',
      radius,
    });
  }, [primary, background, radius]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs text-muted-foreground">Primary HSL</label>
          <input value={primary} onChange={(e) => setPrimary(e.target.value)} className="w-full p-2.5 rounded-lg border border-border bg-card font-mono text-sm" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Background HSL</label>
          <input value={background} onChange={(e) => setBackground(e.target.value)} className="w-full p-2.5 rounded-lg border border-border bg-card font-mono text-sm" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Border Radius</label>
          <input value={radius} onChange={(e) => setRadius(e.target.value)} className="w-full p-2.5 rounded-lg border border-border bg-card text-sm" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">Shadcn UI CSS Theme</label>
          <button onClick={() => { navigator.clipboard.writeText(css); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-secondary">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <textarea readOnly value={css} rows={10} className="w-full rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm" />
      </div>
    </div>
  );
}
