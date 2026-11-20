import { describe, expect, it } from 'vitest';
import {
  addMatrices,
  multiplyMatrices,
  subtractMatrices,
  transposeMatrix,
} from './matrixCalculator';

describe('matrixCalculator', () => {
  it('performs matrix multiplication, addition, subtraction, and transposition', () => {
    const a = [
      [1, 2],
      [3, 4],
    ];
    const b = [
      [2, 0],
      [1, 2],
    ];

    expect(multiplyMatrices(a, b)).toEqual([
      [4, 4],
      [10, 8],
    ]);
    expect(addMatrices(a, b)).toEqual([
      [3, 2],
      [4, 6],
    ]);
    expect(subtractMatrices(a, b)).toEqual([
      [-1, 2],
      [2, 2],
    ]);
    expect(transposeMatrix(a)).toEqual([
      [1, 3],
      [2, 4],
    ]);
  });

  it('throws clear errors on dimension mismatches', () => {
    expect(() => multiplyMatrices([[1, 2]], [[1, 2]])).toThrow(/Incompatible matrix dimensions/);
    expect(() => addMatrices([[1, 2]], [[1], [2]])).toThrow(/Incompatible dimensions/);
  });
});
