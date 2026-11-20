'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useMemo, useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import {
  addMatrices,
  multiplyMatrices,
  subtractMatrices,
  transposeMatrix,
} from '@/lib/matrixCalculator';

type MatrixOp = 'multiply' | 'add' | 'subtract' | 'transposeA' | 'transposeB';

function resizeMatrix(matrix: number[][], rows: number, cols: number): number[][] {
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => matrix[r]?.[c] ?? 0),
  );
}

export default function MatrixCalculatorTool() {
  const { t } = useLanguage();
  const [matrixA, setMatrixA] = useState<number[][]>([
    [1, 2],
    [3, 4],
  ]);
  const [matrixB, setMatrixB] = useState<number[][]>([
    [2, 0],
    [1, 2],
  ]);
  const [op, setOp] = useState<MatrixOp>('multiply');

  const { result, error } = useMemo(() => {
    try {
      let computed: number[][];
      switch (op) {
        case 'multiply':
          computed = multiplyMatrices(matrixA, matrixB);
          break;
        case 'add':
          computed = addMatrices(matrixA, matrixB);
          break;
        case 'subtract':
          computed = subtractMatrices(matrixA, matrixB);
          break;
        case 'transposeA':
          computed = transposeMatrix(matrixA);
          break;
        case 'transposeB':
          computed = transposeMatrix(matrixB);
          break;
      }
      return { result: computed, error: '' };
    } catch (e) {
      return {
        result: null,
        error: e instanceof Error ? e.message : 'Matrix calculation failed.',
      };
    }
  }, [matrixA, matrixB, op]);

  const updateCell = (
    setter: React.Dispatch<React.SetStateAction<number[][]>>,
    rIdx: number,
    cIdx: number,
    val: number,
  ) => {
    const safeVal = Number.isFinite(val) ? val : 0;
    setter((prev) =>
      prev.map((row, r) =>
        r === rIdx ? row.map((cell, c) => (c === cIdx ? safeVal : cell)) : row,
      ),
    );
  };

  const resultJson = result ? JSON.stringify(result) : '';

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="matrix-op" className="text-xs font-semibold">
              Operation:
            </label>
            <select
              id="matrix-op"
              value={op}
              onChange={(e) => setOp(e.target.value as MatrixOp)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="multiply">Multiply (A × B)</option>
              <option value="add">Add (A + B)</option>
              <option value="subtract">Subtract (A − B)</option>
              <option value="transposeA">Transpose A (Aᵀ)</option>
              <option value="transposeB">Transpose B (Bᵀ)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3 rounded-xl border border-slate-200/80 p-4 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold">Matrix A</span>
              <div className="flex items-center gap-2 text-xs">
                <label className="flex items-center gap-1">
                  Rows:
                  <select
                    aria-label="Matrix A rows"
                    value={matrixA.length}
                    onChange={(e) =>
                      setMatrixA((prev) =>
                        resizeMatrix(prev, Number(e.target.value), prev[0].length),
                      )
                    }
                    className="rounded border border-slate-200 px-1.5 py-0.5 dark:border-slate-700 dark:bg-slate-900"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex items-center gap-1">
                  Cols:
                  <select
                    aria-label="Matrix A columns"
                    value={matrixA[0].length}
                    onChange={(e) =>
                      setMatrixA((prev) => resizeMatrix(prev, prev.length, Number(e.target.value)))
                    }
                    className="rounded border border-slate-200 px-1.5 py-0.5 dark:border-slate-700 dark:bg-slate-900"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            <div className="space-y-2 overflow-x-auto">
              {matrixA.map((row, rIdx) => (
                <div key={rIdx} className="flex gap-2">
                  {row.map((val, cIdx) => (
                    <input
                      key={cIdx}
                      type="number"
                      aria-label={`A[${rIdx}][${cIdx}]`}
                      value={val}
                      onChange={(e) => updateCell(setMatrixA, rIdx, cIdx, Number(e.target.value))}
                      className="w-16 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-center font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 rounded-xl border border-slate-200/80 p-4 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold">Matrix B</span>
              <div className="flex items-center gap-2 text-xs">
                <label className="flex items-center gap-1">
                  Rows:
                  <select
                    aria-label="Matrix B rows"
                    value={matrixB.length}
                    onChange={(e) =>
                      setMatrixB((prev) =>
                        resizeMatrix(prev, Number(e.target.value), prev[0].length),
                      )
                    }
                    className="rounded border border-slate-200 px-1.5 py-0.5 dark:border-slate-700 dark:bg-slate-900"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex items-center gap-1">
                  Cols:
                  <select
                    aria-label="Matrix B columns"
                    value={matrixB[0].length}
                    onChange={(e) =>
                      setMatrixB((prev) => resizeMatrix(prev, prev.length, Number(e.target.value)))
                    }
                    className="rounded border border-slate-200 px-1.5 py-0.5 dark:border-slate-700 dark:bg-slate-900"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            <div className="space-y-2 overflow-x-auto">
              {matrixB.map((row, rIdx) => (
                <div key={rIdx} className="flex gap-2">
                  {row.map((val, cIdx) => (
                    <input
                      key={cIdx}
                      type="number"
                      aria-label={`B[${rIdx}][${cIdx}]`}
                      value={val}
                      onChange={(e) => updateCell(setMatrixB, rIdx, cIdx, Number(e.target.value))}
                      className="w-16 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-center font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="surface-card rounded-2xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold">{t('uiText.62cca55d')}</span>
          <CopyButton text={resultJson} />
        </div>

        {error ? (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
          >
            {error}
          </div>
        ) : result ? (
          <div className="space-y-3">
            <div className="inline-block rounded-xl bg-slate-900 p-4 font-mono text-xs text-emerald-400">
              {result.map((row, rIdx) => (
                <div key={rIdx} className="flex gap-4 py-0.5">
                  {row.map((cell, cIdx) => (
                    <span key={cIdx} className="min-w-[3rem] text-right">
                      {Number.isInteger(cell) ? cell : Number(cell.toFixed(4))}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <pre className="rounded-xl bg-slate-100 p-3 font-mono text-xs text-slate-700 dark:bg-slate-900 dark:text-slate-300">
              {resultJson}
            </pre>
          </div>
        ) : null}
      </div>
    </div>
  );
}
