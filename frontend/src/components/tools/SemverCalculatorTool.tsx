'use client';

import React, { useState, useMemo } from 'react';
import { GitBranch, CheckCircle, XCircle } from 'lucide-react';
import { parseSemver, bumpSemver, satisfiesRange } from '@/lib/semverCalculator';
import { useLanguage } from '@/context/LanguageContext';

export default function SemverCalculatorTool() {
  const { t } = useLanguage();
  const [version, setVersion] = useState('1.2.3');
  const [testRange, setTestRange] = useState('^1.2.0');

  const parsed = useMemo(() => parseSemver(version), [version]);
  const isMatch = useMemo(() => satisfiesRange(version, testRange), [version, testRange]);

  const majorBump = useMemo(() => bumpSemver(version, 'major'), [version]);
  const minorBump = useMemo(() => bumpSemver(version, 'minor'), [version]);
  const patchBump = useMemo(() => bumpSemver(version, 'patch'), [version]);

  return (
    <div className="space-y-6">
      {/* Input Version Card */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t('tool.semver.title') || 'Semantic Versioning (SemVer) Calculator'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Current Version</label>
            <input
              type="text"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="1.2.3"
              className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Target Range to Test</label>
            <input
              type="text"
              value={testRange}
              onChange={(e) => setTestRange(e.target.value)}
              placeholder="^1.2.0 or ~1.2.0"
              className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
            />
          </div>
        </div>

        {/* Range Match Status Banner */}
        <div className={`p-4 rounded-xl border flex items-center justify-between ${
          isMatch
            ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300'
            : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/40 text-red-800 dark:text-red-300'
        }`}>
          <div className="flex items-center gap-2 text-xs font-bold">
            {isMatch ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
            <span>
              Version <code className="font-mono bg-white/60 dark:bg-black/30 px-1.5 py-0.5 rounded">{version}</code> {isMatch ? 'SATISFIES' : 'DOES NOT SATISFY'} range <code className="font-mono bg-white/60 dark:bg-black/30 px-1.5 py-0.5 rounded">{testRange}</code>
            </span>
          </div>
        </div>
      </div>

      {/* Version Anatomy & Next Releases */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Breakdown */}
        <div className="surface-card rounded-2xl p-6 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Semver Anatomy Breakdown</span>
          {parsed ? (
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-900">
                <span className="text-slate-400">Major:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{parsed.major} (Breaking Changes)</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-900">
                <span className="text-slate-400">Minor:</span>
                <span className="font-bold text-purple-600 dark:text-purple-400">{parsed.minor} (New Features)</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-900">
                <span className="text-slate-400">Patch:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{parsed.patch} (Bug Fixes)</span>
              </div>
            </div>
          ) : (
            <span className="text-xs text-red-500">Invalid SemVer string</span>
          )}
        </div>

        {/* Bump Calculator */}
        <div className="surface-card rounded-2xl p-6 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Next Release Bump Options</span>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-900 items-center">
              <span className="text-slate-500">Major Bump:</span>
              <span className="font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">{majorBump}</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-900 items-center">
              <span className="text-slate-500">Minor Bump:</span>
              <span className="font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">{minorBump}</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-900 items-center">
              <span className="text-slate-500">Patch Bump:</span>
              <span className="font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">{patchBump}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
