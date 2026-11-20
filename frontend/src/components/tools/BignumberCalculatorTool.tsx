'use client';

import React, { useMemo, useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { calculateBigInt, type BigIntOperator } from '@/lib/bignumberCalculator';

const OPERATORS: Array<{ op: BigIntOperator; label: string }> = [
  { op: '+', label: '+ (Add)' },
  { op: '-', label: '- (Subtract)' },
  { op: '*', label: '* (Multiply)' },
  { op: '/', label: '/ (Integer Divide)' },
  { op: '%', label: '% (Modulo)' },
  { op: '**', label: '** (Power)' },
];

export default function BignumberCalculatorTool() {
  const [a, setA] = useState('999999999999999999999999999999');
  const [b, setB] = useState('1');
  const [op, setOp] = useState<BigIntOperator>('+');

  const { res, error } = useMemo(() => {
    try {
      const value = calculateBigInt(a, b, op);
      if (value.startsWith('Error:')) {
        return { res: '', error: value };
      }
      return { res: value, error: '' };
    } catch (e) {
      return {
        res: '',
        error: e instanceof Error ? e.message : 'Invalid BigInt operand',
      };
    }
  }, [a, b, op]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-5 space-y-1">
            <label
              htmlFor="bigint-a"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              Operand A
            </label>
            <input
              id="bigint-a"
              type="text"
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-mono dark:border-slate-700 dark:bg-slate-900"
            />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label
              htmlFor="bigint-op"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              Operator
            </label>
            <select
              id="bigint-op"
              value={op}
              onChange={(e) => setOp(e.target.value as BigIntOperator)}
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-mono dark:border-slate-700 dark:bg-slate-900"
            >
              {OPERATORS.map((item) => (
                <option key={item.op} value={item.op}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-5 space-y-1">
            <label
              htmlFor="bigint-b"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              Operand B
            </label>
            <input
              id="bigint-b"
              type="text"
              value={b}
              onChange={(e) => setB(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-mono dark:border-slate-700 dark:bg-slate-900"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Exact Result
            </span>
            <CopyButton text={res} />
          </div>

          {error ? (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 font-mono text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
            >
              {error}
            </div>
          ) : (
            <div
              data-testid="bigint-result"
              className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400 break-all"
            >
              {res}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
