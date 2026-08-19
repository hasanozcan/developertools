'use client';

import React, { useState, useMemo } from 'react';
import { KeyRound, ShieldAlert, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';
import { analyzePasswordStrength } from '@/lib/passwordStrength';
import { useLanguage } from '@/context/LanguageContext';

export default function PasswordStrengthTool() {
  const { t } = useLanguage();
  const [password, setPassword] = useState('P@ssw0rd!2026');

  const analysis = useMemo(() => analyzePasswordStrength(password), [password]);

  const scoreColors = [
    'bg-red-500 text-white',
    'bg-orange-500 text-white',
    'bg-amber-500 text-white',
    'bg-emerald-500 text-white',
    'bg-indigo-600 text-white',
  ];

  return (
    <div className="space-y-6">
      {/* Password Input Card */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t('tool.pwdstrength.title') || 'Password Strength & Entropy Analyzer'}
          </h3>
        </div>

        <div className="relative">
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type a password to test security & entropy..."
            className="w-full px-4 py-3 text-sm font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
          />
        </div>

        {/* Strength Meter Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-500">Security Score:</span>
            <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold ${scoreColors[analysis.score]}`}>
              {analysis.label} ({analysis.score}/4)
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 h-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`rounded-full transition-all duration-300 ${
                  analysis.score >= step
                    ? analysis.score === 4
                      ? 'bg-indigo-600'
                      : analysis.score === 3
                      ? 'bg-emerald-500'
                      : analysis.score === 2
                      ? 'bg-amber-500'
                      : 'bg-red-500'
                    : 'bg-slate-200 dark:bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="surface-card rounded-2xl p-5 border border-slate-200 dark:border-white/5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Estimated Crack Time</span>
          <span className="text-xl font-black font-mono text-indigo-600 dark:text-indigo-400">
            {analysis.crackTimeEstimate}
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">Brute-force offline hashing resistance</span>
        </div>

        <div className="surface-card rounded-2xl p-5 border border-slate-200 dark:border-white/5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Information Entropy</span>
          <span className="text-xl font-black font-mono text-slate-900 dark:text-white">
            {analysis.entropy} <span className="text-xs font-normal text-slate-400">Bits</span>
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">Shannon entropy pool calculation</span>
        </div>

        <div className="surface-card rounded-2xl p-5 border border-slate-200 dark:border-white/5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Length</span>
          <span className="text-xl font-black font-mono text-slate-900 dark:text-white">
            {analysis.length} <span className="text-xs font-normal text-slate-400">Characters</span>
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">Recommended &ge; 12 characters</span>
        </div>
      </div>

      {/* Character Type Checklist */}
      <div className="surface-card rounded-2xl p-6 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Character Complexity Checklist</span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold">
          <div className="flex items-center gap-2">
            {analysis.hasLower ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-slate-300" />}
            <span className={analysis.hasLower ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'}>Lowercase (a-z)</span>
          </div>

          <div className="flex items-center gap-2">
            {analysis.hasUpper ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-slate-300" />}
            <span className={analysis.hasUpper ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'}>Uppercase (A-Z)</span>
          </div>

          <div className="flex items-center gap-2">
            {analysis.hasDigits ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-slate-300" />}
            <span className={analysis.hasDigits ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'}>Numbers (0-9)</span>
          </div>

          <div className="flex items-center gap-2">
            {analysis.hasSymbols ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-slate-300" />}
            <span className={analysis.hasSymbols ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'}>Symbols (!@#$)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
