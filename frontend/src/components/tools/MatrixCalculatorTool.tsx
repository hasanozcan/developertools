'use client';
import React, { useMemo } from 'react';
import { multiplyMatrices } from '@/lib/matrixCalculator';

const matrixA = [[1, 2], [3, 4]];
const matrixB = [[2, 0], [1, 2]];

export default function MatrixCalculatorTool() {
  const result = useMemo(() => multiplyMatrices(matrixA, matrixB), []);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400">
          <p>Result Matrix:</p>
          <pre>{JSON.stringify(result)}</pre>
        </div>
      </div>
    </div>
  );
}
