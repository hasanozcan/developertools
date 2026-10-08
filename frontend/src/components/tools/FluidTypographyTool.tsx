'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { calculateFluidTypography } from '@/lib/fluidTypography';

export default function FluidTypographyTool() {
  const { t } = useLanguage();
  const [minFont, setMinFont] = useState(16);
  const [maxFont, setMaxFont] = useState(24);
  const [minVw, setMinVw] = useState(320);
  const [maxVw, setMaxVw] = useState(1200);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    try {
      return calculateFluidTypography({ minFontSizePx: minFont, maxFontSizePx: maxFont, minViewportPx: minVw, maxViewportPx: maxVw });
    } catch {
      return { clampCss: '', formula: '' };
    }
  }, [minFont, maxFont, minVw, maxVw]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.clampCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-bold">{t("uiText.3cd7cc28")}</label>
            <input type="number" value={minFont} onChange={(e) => setMinFont(Number(e.target.value))} className="w-full mt-1 rounded-xl border p-2 text-xs" />
          </div>
          <div>
            <label className="text-xs font-bold">{t("uiText.d8f7864a")}</label>
            <input type="number" value={maxFont} onChange={(e) => setMaxFont(Number(e.target.value))} className="w-full mt-1 rounded-xl border p-2 text-xs" />
          </div>
          <div>
            <label className="text-xs font-bold">{t("uiText.52c024ee")}</label>
            <input type="number" value={minVw} onChange={(e) => setMinVw(Number(e.target.value))} className="w-full mt-1 rounded-xl border p-2 text-xs" />
          </div>
          <div>
            <label className="text-xs font-bold">{t("uiText.a1e52240")}</label>
            <input type="number" value={maxVw} onChange={(e) => setMaxVw(Number(e.target.value))} className="w-full mt-1 rounded-xl border p-2 text-xs" />
          </div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 font-mono text-emerald-400 text-xs flex justify-between items-center">
          <span>{result.clampCss}</span>
          <button onClick={handleCopy} className="text-indigo-400 font-semibold">{copied ? t("uiText.8dc21305") : t("common.copy")}</button>
        </div>
      </div>
    </div>
  );
}
