'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { analyzeColorContrast } from '@/lib/colorContrast';

interface PassBadgeProps {
  label: string;
  passed: boolean;
  passText: string;
  failText: string;
}

function PassBadge({ label, passed, passText, failText }: PassBadgeProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 p-3 dark:border-gray-700">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
      <span
        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
          passed
            ? 'bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300'
            : 'bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300'
        }`}
      >
        {passed ? passText : failText}
      </span>
    </div>
  );
}

export default function ColorContrastCheckerTool() {
  const { t } = useLanguage();
  const [foreground, setForeground] = useState('#1F2937');
  const [background, setBackground] = useState('#FFFFFF');

  const report = useMemo(() => {
    try {
      return analyzeColorContrast(foreground, background);
    } catch {
      return null;
    }
  }, [background, foreground]);

  const swap = () => {
    setForeground(background);
    setBackground(foreground);
  };

  const colorField = (
    id: string,
    label: string,
    value: string,
    onChange: (value: string) => void,
  ) => (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <div className="flex gap-3">
        <input
          type="color"
          value={/^#[\dA-Fa-f]{6}$/u.test(value) ? value : '#000000'}
          onChange={(event) => onChange(event.target.value.toUpperCase())}
          aria-label={`${label} picker`}
          className="h-11 w-14 cursor-pointer rounded-lg border border-gray-300 bg-white p-1 dark:border-gray-600 dark:bg-gray-800"
        />
        <input
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          maxLength={7}
          spellCheck={false}
          className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 font-mono text-sm uppercase text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid items-end gap-4 md:grid-cols-[1fr_auto_1fr]">
        {colorField(
          'contrast-foreground',
          t('tool.contrast.foreground'),
          foreground,
          setForeground,
        )}
        <button
          type="button"
          onClick={swap}
          className="h-11 rounded-lg border border-gray-300 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          {t('tool.contrast.swap')}
        </button>
        {colorField(
          'contrast-background',
          t('tool.contrast.background'),
          background,
          setBackground,
        )}
      </div>

      {!report ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300"
        >
          {t('tool.contrast.invalid')}
        </p>
      ) : (
        <>
          <section
            aria-labelledby="contrast-ratio-heading"
            className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-center dark:border-gray-700 dark:bg-gray-900"
          >
            <h2
              id="contrast-ratio-heading"
              className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
            >
              {t('tool.contrast.ratio')}
            </h2>
            <p className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
              {report.ratio.toFixed(2)}:1
            </p>
          </section>

          <div className="grid gap-5 lg:grid-cols-2">
            <section aria-labelledby="contrast-results-heading" className="space-y-3">
              <h2
                id="contrast-results-heading"
                className="text-lg font-semibold text-gray-900 dark:text-white"
              >
                {t('tool.contrast.results')}
              </h2>
              <PassBadge
                label={t('tool.contrast.normalAA')}
                passed={report.normalText.aa}
                passText={t('tool.contrast.pass')}
                failText={t('tool.contrast.fail')}
              />
              <PassBadge
                label={t('tool.contrast.normalAAA')}
                passed={report.normalText.aaa}
                passText={t('tool.contrast.pass')}
                failText={t('tool.contrast.fail')}
              />
              <PassBadge
                label={t('tool.contrast.largeAA')}
                passed={report.largeText.aa}
                passText={t('tool.contrast.pass')}
                failText={t('tool.contrast.fail')}
              />
              <PassBadge
                label={t('tool.contrast.largeAAA')}
                passed={report.largeText.aaa}
                passText={t('tool.contrast.pass')}
                failText={t('tool.contrast.fail')}
              />
              <PassBadge
                label={t('tool.contrast.nonText')}
                passed={report.nonText.aa}
                passText={t('tool.contrast.pass')}
                failText={t('tool.contrast.fail')}
              />
            </section>

            <section aria-labelledby="contrast-preview-heading" className="space-y-3">
              <h2
                id="contrast-preview-heading"
                className="text-lg font-semibold text-gray-900 dark:text-white"
              >
                {t('tool.contrast.preview')}
              </h2>
              <div
                className="space-y-4 rounded-xl border border-gray-300 p-6"
                style={{ backgroundColor: report.background, color: report.foreground }}
              >
                <p className="text-base">{t('tool.contrast.normalSample')}</p>
                <p className="text-2xl font-semibold">{t('tool.contrast.largeSample')}</p>
                <div className="inline-flex rounded-md border-2 border-current px-3 py-2 text-sm font-semibold">
                  {t('tool.contrast.uiSample')}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setForeground(report.suggestedTextColor)}
                className="w-full rounded-lg border border-primary-500 px-4 py-2.5 text-sm font-semibold text-primary-700 hover:bg-primary-50 dark:text-primary-300 dark:hover:bg-primary-950/30"
              >
                {t('tool.contrast.useSuggestion')} {report.suggestedTextColor} (
                {report.suggestedRatio.toFixed(2)}:1)
              </button>
            </section>
          </div>
        </>
      )}

      <p className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-950/30 dark:text-blue-200">
        {t('tool.contrast.note')}
      </p>
    </div>
  );
}
