'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { calculateAspectRatioDimensions } from '@/lib/aspectRatioResizer';

export default function AspectRatioResizerTool() {
  const { t } = useLanguage();
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [targetWidth, setTargetWidth] = useState(1280);

  const res = useMemo(() => calculateAspectRatioDimensions(width, height, targetWidth), [width, height, targetWidth]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs text-muted-foreground">{t("uiText.841424e2")}</label>
          <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full p-2.5 rounded-lg border border-border bg-card" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">{t("uiText.a6855efd")}</label>
          <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full p-2.5 rounded-lg border border-border bg-card" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">{t("uiText.0dd2b7fe")}</label>
          <input type="number" value={targetWidth} onChange={(e) => setTargetWidth(Number(e.target.value))} className="w-full p-2.5 rounded-lg border border-border bg-card" />
        </div>
      </div>
      <div className="p-6 rounded-xl bg-card border border-border grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <div className="text-xs text-muted-foreground">{t("uiText.027dbe46")}</div>
          <div className="text-2xl font-bold text-primary">{res.ratioString}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">{t("uiText.e320226f")}</div>
          <div className="text-2xl font-bold">{res.ratioDecimal}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">{t("uiText.689f2595")}</div>
          <div className="text-2xl font-bold text-emerald-500">{res.width}px</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">{t("uiText.ddf75a2c")}</div>
          <div className="text-2xl font-bold text-emerald-500">{res.height}px</div>
        </div>
      </div>
    </div>
  );
}
