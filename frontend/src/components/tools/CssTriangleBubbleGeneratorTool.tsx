'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Shapes } from 'lucide-react';
import { generateCssTriangle, TriangleDirection } from '@/lib/cssTriangleBubbleGenerator';

export default function CssTriangleBubbleGeneratorTool() {
  const [type, setType] = useState<'triangle' | 'bubble'>('triangle');
  const [direction, setDirection] = useState<TriangleDirection>('top');
  const [size, setSize] = useState<number>(16);
  const [color, setColor] = useState<string>('#3b82f6');
  const [bubbleWidth, setBubbleWidth] = useState<number>(240);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    return generateCssTriangle({
      direction,
      size,
      color,
      type,
      bubbleWidth,
    });
  }, [direction, size, color, type, bubbleWidth]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-4 rounded-xl border border-border bg-card space-y-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-2">Shape Mode</label>
            <div className="btn-group w-full grid grid-cols-2">
              <button
                className={`btn btn-sm ${type === 'triangle' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setType('triangle')}
              >
                CSS Triangle
              </button>
              <button
                className={`btn btn-sm ${type === 'bubble' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setType('bubble')}
              >
                Speech Bubble
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-2">Arrow Direction</label>
            <div className="grid grid-cols-4 gap-1">
              {(['top', 'right', 'bottom', 'left'] as TriangleDirection[]).map((dir) => (
                <button
                  key={dir}
                  onClick={() => setDirection(dir)}
                  className={`btn btn-xs uppercase ${direction === dir ? 'btn-primary' : 'btn-outline'}`}
                >
                  {dir}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Arrow Size ({size}px)
            </label>
            <input
              type="range"
              min="6"
              max="40"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value, 10))}
              className="range range-primary range-sm w-full"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border-0"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="input input-bordered input-sm flex-1 font-mono"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="p-8 rounded-xl border border-border bg-muted/20 flex items-center justify-center min-h-[220px]">
            <style dangerouslySetInnerHTML={{ __html: result.css }} />
            <div dangerouslySetInnerHTML={{ __html: result.html }} />
          </div>

          <div className="relative space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-muted-foreground">Generated CSS Code:</label>
              <button onClick={handleCopy} className="btn btn-primary btn-xs gap-1">
                {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy CSS'}
              </button>
            </div>
            <textarea
              readOnly
              value={result.css}
              className="textarea textarea-bordered w-full h-36 font-mono text-xs bg-muted/30"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
