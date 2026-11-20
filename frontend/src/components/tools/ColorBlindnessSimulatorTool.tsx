'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useMemo, useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { normalizeHexColor, simulateAllColorBlindness } from '@/lib/colorBlindnessSimulator';

const SAMPLE = '#ef4444';

const CVD_MODES = [
  { key: 'protanopia', label: 'Protanopia (No L / Red-blind)', note: 'Missing red cones' },
  { key: 'deuteranopia', label: 'Deuteranopia (No M / Green-blind)', note: 'Missing green cones' },
  { key: 'tritanopia', label: 'Tritanopia (No S / Blue-blind)', note: 'Missing blue cones' },
  { key: 'achromatopsia', label: 'Achromatopsia (Monochromacy)', note: 'Luminance only' },
] as const;

export default function ColorBlindnessSimulatorTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState(SAMPLE);

  const { simulation, error } = useMemo(() => {
    try {
      return { simulation: simulateAllColorBlindness(input), error: '' };
    } catch (e) {
      return {
        simulation: null,
        error: e instanceof Error ? e.message : 'Invalid hex color',
      };
    }
  }, [input]);

  let pickerColor = SAMPLE;
  try {
    pickerColor = normalizeHexColor(input);
  } catch {
    pickerColor = SAMPLE;
  }

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label
            htmlFor="cvd-hex-input"
            className="text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            {t('uiText.a9b52770')}
          </label>
          <button
            type="button"
            onClick={() => setInput(SAMPLE)}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            {t('common.loadSample')}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="color"
            aria-label="Pick color"
            value={pickerColor}
            onChange={(e) => setInput(e.target.value)}
            className="h-11 w-16 cursor-pointer rounded-xl border border-slate-200 bg-transparent p-1 dark:border-slate-700"
          />
          <input
            id="cvd-hex-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="#ef4444"
            className="flex-1 min-w-[160px] rounded-xl border border-slate-200 bg-white px-3 py-2.5 font-mono text-sm dark:border-slate-700 dark:bg-slate-900"
          />
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
          >
            {error}
          </div>
        )}
      </div>

      {simulation && (
        <div className="surface-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              {t('uiText.bf6579c3')}
            </h3>
            <CopyButton text={JSON.stringify(simulation, null, 2)} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3 space-y-2 dark:border-slate-800 dark:bg-slate-900/70">
              <div
                className="h-20 w-full rounded-xl border border-black/10 shadow-inner"
                style={{ backgroundColor: simulation.original }}
              />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  Original (Trichromacy)
                </p>
                <p className="text-[11px] text-slate-500">Reference sRGB input</p>
              </div>
              <div className="flex items-center justify-between gap-2 pt-1">
                <code className="font-mono text-xs font-semibold uppercase">
                  {simulation.original}
                </code>
                <CopyButton text={simulation.original} className="px-2 py-1 text-xs" />
              </div>
            </div>

            {CVD_MODES.map((mode) => {
              const simulatedHex = simulation[mode.key];
              return (
                <div
                  key={mode.key}
                  className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3 space-y-2 dark:border-slate-800 dark:bg-slate-900/70"
                >
                  <div
                    data-testid={`swatch-${mode.key}`}
                    className="h-20 w-full rounded-xl border border-black/10 shadow-inner"
                    style={{ backgroundColor: simulatedHex }}
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {mode.label}
                    </p>
                    <p className="text-[11px] text-slate-500">{mode.note}</p>
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <code className="font-mono text-xs font-semibold uppercase">
                      {simulatedHex}
                    </code>
                    <CopyButton text={simulatedHex} className="px-2 py-1 text-xs" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
