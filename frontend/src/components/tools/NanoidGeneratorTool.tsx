'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState } from 'react';
import { generateNanoId } from '@/lib/nanoidGenerator';

export default function NanoidGeneratorTool() {
  const { t } = useLanguage();
  const [id, setId] = useState(generateNanoId(21));

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <button onClick={() => setId(generateNanoId(21))} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold">{t("uiText.5bc5562d")}</button>
        <div className="p-4 bg-slate-900 rounded-xl font-mono text-sm text-emerald-400">{id}</div>
      </div>
    </div>
  );
}
