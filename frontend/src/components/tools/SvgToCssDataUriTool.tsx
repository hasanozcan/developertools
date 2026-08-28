'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, FileCode } from 'lucide-react';
import { convertSvgToCssDataUri, SvgCssOptions } from '@/lib/svgToCssDataUri';

export default function SvgToCssDataUriTool() {
  const [svgInput, setSvgInput] = useState(
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>'
  );
  const [format, setFormat] = useState<'utf8-encoded' | 'base64'>('utf8-encoded');
  const [mode, setMode] = useState<'background-image' | 'mask-image' | 'data-uri-only'>('background-image');
  const [copied, setCopied] = useState(false);

  const cssOutput = useMemo(() => {
    if (!svgInput.trim()) return '';
    try {
      return convertSvgToCssDataUri(svgInput, { format, mode });
    } catch (err: any) {
      return '// Error encoding SVG: ' + err.message;
    }
  }, [svgInput, format, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cssOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Encoding Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as any)}
              className="select select-bordered select-sm"
            >
              <option value="utf8-encoded">UTF-8 URL-Encoded (Lightest)</option>
              <option value="base64">Base64</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-muted-foreground block mb-1">CSS Output Format</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as any)}
              className="select select-bordered select-sm"
            >
              <option value="background-image">background-image: url(...)</option>
              <option value="mask-image">mask-image: url(...)</option>
              <option value="data-uri-only">Data URI Only</option>
            </select>
          </div>
        </div>

        <button onClick={handleCopy} className="btn btn-primary btn-sm gap-2">
          {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy CSS Rule'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            Paste SVG Code:
          </label>
          <textarea
            value={svgInput}
            onChange={(e) => setSvgInput(e.target.value)}
            placeholder="<svg ...>...</svg>"
            className="textarea textarea-bordered w-full h-80 font-mono text-xs leading-relaxed"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            Generated CSS Data URI:
          </label>
          <textarea
            readOnly
            value={cssOutput}
            className="textarea textarea-bordered w-full h-80 font-mono text-xs leading-relaxed bg-muted/40 text-foreground"
          />
        </div>
      </div>
    </div>
  );
}
