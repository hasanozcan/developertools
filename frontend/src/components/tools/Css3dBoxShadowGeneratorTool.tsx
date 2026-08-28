'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Box } from 'lucide-react';
import { generateElevationShadows } from '@/lib/css3dBoxShadowGenerator';

export default function Css3dBoxShadowGeneratorTool() {
  const [elevation, setElevation] = useState<number>(6);
  const [colorRgb, setColorRgb] = useState<string>('15, 23, 42');
  const [opacity, setOpacity] = useState<number>(0.15);
  const [copied, setCopied] = useState(false);

  const shadowCss = useMemo(() => {
    return generateElevationShadows(elevation, colorRgb, opacity);
  }, [elevation, colorRgb, opacity]);

  const handleCopy = () => {
    navigator.clipboard.writeText(shadowCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-4 rounded-xl border border-border bg-card space-y-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Elevation Level: {elevation} / 24
            </label>
            <input
              type="range"
              min="1"
              max="24"
              value={elevation}
              onChange={(e) => setElevation(parseInt(e.target.value, 10))}
              className="range range-primary range-sm w-full"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Shadow Opacity: {(opacity * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0.05"
              max="0.50"
              step="0.01"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="range range-primary range-sm w-full"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Shadow RGB Tint (R, G, B)
            </label>
            <input
              type="text"
              value={colorRgb}
              onChange={(e) => setColorRgb(e.target.value)}
              className="input input-bordered input-sm w-full font-mono text-xs"
              placeholder="0, 0, 0"
            />
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="p-12 rounded-xl border border-border bg-muted/20 flex items-center justify-center min-h-[220px]">
            <div
              className="w-56 h-32 rounded-2xl bg-card border border-border/40 flex items-center justify-center font-semibold text-foreground"
              style={{
                boxShadow: shadowCss.replace('box-shadow: ', '').replace(';', ''),
              }}
            >
              Elevation {elevation} Card
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-muted-foreground">CSS Box-Shadow Output:</label>
              <button onClick={handleCopy} className="btn btn-primary btn-xs gap-1">
                {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy CSS'}
              </button>
            </div>
            <textarea
              readOnly
              value={shadowCss}
              className="textarea textarea-bordered w-full h-28 font-mono text-xs bg-muted/30"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
