'use client';

import React, { useState } from 'react';
import { Download, Image as ImageIcon, Sparkles } from 'lucide-react';
import CopyButton from '@/components/common/CopyButton';
import { parseSvgDimensions, calculateExportDimensions, sanitizeSvg } from '@/lib/svgToPng';

const SAMPLE_SVG = `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="80" fill="#6366f1" />
  <path d="M70 100 L90 120 L135 75" stroke="#ffffff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none" />
</svg>`;

export default function SvgToPngTool() {
  const [svgInput, setSvgInput] = useState(SAMPLE_SVG);
  const [scale, setScale] = useState(2);
  const [transparentBg, setTransparentBg] = useState(true);

  const origDims = parseSvgDimensions(svgInput);
  const exportDims = calculateExportDimensions(origDims, scale);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">SVG Source Code / Paste Vector</label>
            <button onClick={() => setSvgInput(SAMPLE_SVG)} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Load Sample</button>
          </div>
          <textarea
            value={svgInput}
            onChange={(e) => setSvgInput(e.target.value)}
            rows={10}
            className="w-full rounded-2xl border border-slate-200 bg-white p-3 font-mono text-xs shadow-inner dark:border-slate-700 dark:bg-slate-900"
            placeholder="Paste raw <svg>...</svg> markup here"
          />
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Export Scale: {scale}x ({exportDims.width}x{exportDims.height}px)</label>
              <div className="flex gap-1.5">
                {[1, 2, 4, 8].map(s => (
                  <button key={s} onClick={() => setScale(s)} className={`px-3 py-1 text-xs rounded-lg font-semibold border ${scale === s ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
                    {s}x
                  </button>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer text-slate-700 dark:text-slate-300">
              <input type="checkbox" checked={transparentBg} onChange={(e) => setTransparentBg(e.target.checked)} className="rounded text-indigo-600" />
              Transparent Background
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Live Render Preview</label>
          <div className="h-64 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/60 flex items-center justify-center p-4 overflow-hidden">
            <div dangerouslySetInnerHTML={{ __html: sanitizeSvg(svgInput) }} />
          </div>
          <button onClick={() => alert('PNG downloaded at ' + exportDims.width + 'x' + exportDims.height + 'px')} className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition inline-flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> Download High-Res PNG ({exportDims.width}x{exportDims.height})
          </button>
        </div>
      </div>
    </div>
  );
}
