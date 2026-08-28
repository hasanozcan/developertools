'use client';

import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { generateGlassClayCss } from '@/lib/cssGlassClay';

export default function CssGlassmorphismClaymorphismTool() {
  const [type, setType] = useState<'glassmorphism' | 'claymorphism'>('glassmorphism');
  const [blur, setBlur] = useState(16);
  const [opacity, setOpacity] = useState(30);
  const [color, setColor] = useState('#6366f1');
  const [borderRadius, setBorderRadius] = useState(24);

  const cssOutput = generateGlassClayCss({
    type,
    blur,
    opacity,
    color,
    borderRadius,
    borderWidth: 1,
  });

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button onClick={() => setType('glassmorphism')} className={`px-4 py-2 rounded-xl text-xs font-semibold ${type === 'glassmorphism' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
          Glassmorphism
        </button>
        <button onClick={() => setType('claymorphism')} className={`px-4 py-2 rounded-xl text-xs font-semibold ${type === 'claymorphism' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
          Claymorphism 3D
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Base Color: {color}</label>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-8 w-16 rounded border" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Blur: {blur}px</label>
            <input type="range" min="0" max="40" value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="w-full accent-indigo-600" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Opacity: {opacity}%</label>
            <input type="range" min="5" max="100" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full accent-indigo-600" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Border Radius: {borderRadius}px</label>
            <input type="range" min="0" max="64" value={borderRadius} onChange={(e) => setBorderRadius(Number(e.target.value))} className="w-full accent-indigo-600" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Generated CSS</label>
            <CopyButton text={cssOutput} />
          </div>
          <pre className="h-48 overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-3 font-mono text-xs text-indigo-400 dark:border-slate-700">
            {cssOutput}
          </pre>
        </div>
      </div>
    </div>
  );
}
