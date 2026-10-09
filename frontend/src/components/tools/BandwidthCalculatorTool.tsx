'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { calculateTransferTime } from '@/lib/bandwidthCalculator';

export default function BandwidthCalculatorTool() {
  const { t } = useLanguage();
  const [mb, setMb] = useState(100);
  const [speed, setSpeed] = useState(100);
  const res = useMemo(() => calculateTransferTime(mb * 1024 * 1024, speed), [mb, speed]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input type="number" placeholder={t("uiText.101f4942")} value={mb} onChange={(e) => setMb(Number(e.target.value))} className="rounded-xl border p-2 text-xs" />
          <input type="number" placeholder={t("uiText.03472a71")} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="rounded-xl border p-2 text-xs" />
        </div>
        <div className="p-4 bg-emerald-500/10 rounded-xl text-center font-bold text-lg text-emerald-600">
          {t("uiText.686fa199")} {res.formattedTime}
        </div>
      </div>
    </div>
  );
}
