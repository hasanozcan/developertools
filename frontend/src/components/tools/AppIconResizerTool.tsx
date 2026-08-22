'use client';
import React from 'react';
import { getAppIconManifest } from '@/lib/appIconResizer';

export default function AppIconResizerTool() {
  const sizes = getAppIconManifest();

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <h4 className="font-bold text-sm">App Icon Specifications</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {sizes.map((s, i) => (
            <div key={i} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs">
              <p className="font-bold text-indigo-600">{s.platform}</p>
              <p>{s.size}x{s.size} px</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
