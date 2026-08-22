'use client';
import React, { useState, useMemo } from 'react';
import { generateColorHarmonies, HarmonyType } from '@/lib/colorHarmonyGenerator';

export default function ColorHarmonyGeneratorTool() {
  const [hex, setHex] = useState('#3B82F6');
  const [harmony, setHarmony] = useState<HarmonyType>('triadic');
  const colors = useMemo(() => generateColorHarmonies(hex, harmony), [hex, harmony]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex gap-4 items-center">
          <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="w-10 h-10 rounded-xl cursor-pointer" />
          <select value={harmony} onChange={(e) => setHarmony(e.target.value as HarmonyType)} className="rounded-xl border p-2 text-xs font-semibold">
            <option value="complementary">Complementary</option>
            <option value="triadic">Triadic</option>
            <option value="analogous">Analogous</option>
            <option value="split-complementary">Split-Complementary</option>
            <option value="tetradic">Tetradic</option>
          </select>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((c, i) => (
            <div key={i} className="rounded-xl p-3 text-center text-white text-xs font-bold" style={{ backgroundColor: c.hex }}>
              <p>{c.name}</p>
              <p className="font-mono pt-1">{c.hex}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
