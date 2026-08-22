import { describe, it, expect } from 'vitest';
import { multiplyMatrices, transposeMatrix } from './matrixCalculator';

describe('matrixCalculator', () => {
  it('performs 2x2 matrix multiplication and transposition', () => {
    const a = [[1, 2], [3, 4]];
    const b = [[2, 0], [1, 2]];
    const mult = multiplyMatrices(a, b);
    expect(mult).toEqual([[4, 4], [10, 8]]);

    const trans = transposeMatrix(a);
    expect(trans).toEqual([[1, 3], [2, 4]]);
  });
});
