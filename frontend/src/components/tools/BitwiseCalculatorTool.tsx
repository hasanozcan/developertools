'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useMemo, useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { calculateBitwise } from '@/lib/bitwiseCalculator';

type BitwiseOp = 'AND' | 'OR' | 'XOR' | 'NOT' | 'SHL' | 'SHR';

const BITWISE_OPS: Array<{ op: BitwiseOp; label: string }> = [
  { op: 'AND', label: 'AND (&)' },
  { op: 'OR', label: 'OR (|)' },
  { op: 'XOR', label: 'XOR (^)' },
  { op: 'NOT', label: 'NOT (~A)' },
  { op: 'SHL', label: 'SHL (<<)' },
  { op: 'SHR', label: 'SHR (>>)' },
];

export default function BitwiseCalculatorTool() {
  const { t } = useLanguage();
  const [a, setA] = useState(12);
  const [b, setB] = useState(10);
  const [op, setOp] = useState<BitwiseOp>('AND');

  const safeA = Number.isFinite(a) ? Math.trunc(a) : 0;
  const safeB = Number.isFinite(b) ? Math.trunc(b) : 0;
  const res = useMemo(() => calculateBitwise(safeA, safeB, op), [safeA, safeB, op]);

  const groupedBinary = res.binaryResult.replace(/(.{4})(?=.)/g, '$1 ');

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div className="space-y-1">
            <label
              htmlFor="bitwise-a"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              Operand A (32-bit int)
            </label>
            <input
              id="bitwise-a"
              type="number"
              value={a}
              onChange={(e) => setA(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-200 p-2 text-xs font-mono dark:border-slate-700 dark:bg-slate-900"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="bitwise-op"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              Operation
            </label>
            <select
              id="bitwise-op"
              value={op}
              onChange={(e) => setOp(e.target.value as BitwiseOp)}
              className="w-full rounded-xl border border-slate-200 p-2 text-xs font-mono dark:border-slate-700 dark:bg-slate-900"
            >
              {BITWISE_OPS.map((item) => (
                <option key={item.op} value={item.op}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="bitwise-b"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              {op === 'SHL' || op === 'SHR' ? 'Shift Bits (B)' : 'Operand B (32-bit int)'}
            </label>
            <input
              id="bitwise-b"
              type="number"
              value={b}
              disabled={op === 'NOT'}
              onChange={(e) => setB(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-200 p-2 text-xs font-mono disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900"
            />
          </div>
        </div>

        <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p>
              {t('uiText.e3f8965a')} <span className="font-bold">{res.decimalResult}</span> (
              {res.hexResult})
            </p>
            <CopyButton text={String(res.decimalResult)} className="px-2 py-1 text-xs" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 pt-2">
            <p>
              <span className="text-slate-400">32-bit Binary:</span> {groupedBinary}
            </p>
            <CopyButton text={res.binaryResult} className="px-2 py-1 text-xs" />
          </div>
        </div>
      </div>
    </div>
  );
}
