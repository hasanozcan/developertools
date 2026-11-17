'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { Copy, Check, Box } from 'lucide-react';
import { generateElevationShadows } from '@/lib/css3dBoxShadowGenerator';

export default function Css3dBoxShadowGeneratorTool() {
  const { t } = useLanguage();
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
        <div className="p-4 rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
              {t("uiText.44f943f8")} {elevation} / 24
            </label>
            <input
              type="range"
              min="1"
              max="24"
              value={elevation}
              onChange={(e) => setElevation(parseInt(e.target.value, 10))}
              className="w-full h-2 cursor-pointer appearance-none rounded-lg bg-gray-200 accent-primary-600 dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
              {t("uiText.27ee3016")} {(opacity * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0.05"
              max="0.50"
              step="0.01"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="w-full h-2 cursor-pointer appearance-none rounded-lg bg-gray-200 accent-primary-600 dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
              {t("uiText.3a99f58d")}</label>
            <input
              type="text"
              value={colorRgb}
              onChange={(e) => setColorRgb(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 font-mono text-xs text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              placeholder="0, 0, 0"
            />
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="p-12 rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50 flex items-center justify-center min-h-[220px]">
            <div
              className="w-56 h-32 rounded-2xl bg-white border border-gray-200/80 dark:bg-gray-800 dark:border-gray-700/80 flex items-center justify-center font-semibold text-gray-900 dark:text-white"
              style={{
                boxShadow: shadowCss.replace('box-shadow: ', '').replace(';', ''),
              }}
            >
              {t("uiText.1059d6e4")} {elevation} {t("uiText.0855387f")}</div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{t("uiText.5c9c1c5d")}</label>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-200" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? t("uiText.8dc21305") : t("uiText.9b2af91b")}
              </button>
            </div>
            <textarea
              readOnly
              value={shadowCss}
              className="w-full h-28 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 font-mono text-xs text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
