'use client';

import React, { useState, useMemo } from 'react';
import { Palette, Copy, Check } from 'lucide-react';
import { generateTailwindPalette } from '@/lib/colorPalette';
import { useLanguage } from '@/context/LanguageContext';

export default function ColorPaletteTool() {
  const { t } = useLanguage();
  const [baseHex, setBaseHex] = useState('#6366f1');
  const [copiedShade, setCopiedShade] = useState<number | null>(null);

  const shades = useMemo(() => generateTailwindPalette(baseHex), [baseHex]);

  const handleCopy = (hex: string, shade: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedShade(shade);
    setTimeout(() => setCopiedShade(null), 1500);
  };

  const copyFullConfig = () => {
    const obj: Record<number, string> = {};
    for (const s of shades) {
      obj[s.shade] = s.hex;
    }
    navigator.clipboard.writeText(JSON.stringify(obj, null, 2));
    setCopiedShade(9999);
    setTimeout(() => setCopiedShade(null), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Base Color Picker Bar */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              {t('tool.palette.title') || 'Tailwind Color Palette Generator (50 to 950)'}
            </h3>
          </div>
          <button
            onClick={copyFullConfig}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100"
          >
            {copiedShade === 9999 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Copy Full JS Config</span>
          </button>
        </div>

        <div className="flex items-center gap-3 max-w-sm">
          <input
            type="color"
            value={baseHex}
            onChange={(e) => setBaseHex(e.target.value)}
            className="w-10 h-10 rounded-xl border-0 cursor-pointer shadow-sm"
          />
          <input
            type="text"
            value={baseHex}
            onChange={(e) => setBaseHex(e.target.value)}
            className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
            placeholder="#6366f1"
          />
        </div>
      </div>

      {/* Palette Shade Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {shades.map((s) => (
          <div
            key={s.shade}
            onClick={() => handleCopy(s.hex, s.shade)}
            className="surface-card rounded-2xl overflow-hidden cursor-pointer group hover:shadow-lg transition-all border border-slate-200 dark:border-white/10"
          >
            <div style={{ backgroundColor: s.hex }} className="h-20 w-full transition-transform group-hover:scale-105" />
            <div className="p-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-black block text-slate-800 dark:text-slate-100">{s.shade}</span>
                <span className="text-[11px] font-mono text-slate-400 uppercase">{s.hex}</span>
              </div>
              <div className="text-slate-400 group-hover:text-indigo-600">
                {copiedShade === s.shade ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
