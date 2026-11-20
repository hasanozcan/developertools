export function multiplyMatrices(a: number[][], b: number[][]): number[][] {
  if (a.length === 0 || b.length === 0 || a[0].length === 0 || b[0].length === 0) {
    throw new Error('Matrices cannot be empty.');
  }
  const rowsA = a.length;
  const colsA = a[0].length;
  const rowsB = b.length;
  const colsB = b[0].length;

  if (colsA !== rowsB) {
    throw new Error(
      `Incompatible matrix dimensions for multiplication: (${rowsA}x${colsA}) * (${rowsB}x${colsB}). Columns of A (${colsA}) must equal rows of B (${rowsB}).`,
    );
  }

  const result: number[][] = Array.from({ length: rowsA }, () => Array(colsB).fill(0));

  for (let i = 0; i < rowsA; i++) {
    for (let j = 0; j < colsB; j++) {
      for (let k = 0; k < colsA; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }

  return result;
}

export function addMatrices(a: number[][], b: number[][]): number[][] {
  if (a.length === 0 || b.length === 0) {
    throw new Error('Matrices cannot be empty.');
  }
  if (a.length !== b.length || a[0].length !== b[0].length) {
    throw new Error(
      `Incompatible dimensions for addition: (${a.length}x${a[0].length}) vs (${b.length}x${b[0].length}).`,
    );
  }
  return a.map((row, r) => row.map((val, c) => val + b[r][c]));
}

export function subtractMatrices(a: number[][], b: number[][]): number[][] {
  if (a.length === 0 || b.length === 0) {
    throw new Error('Matrices cannot be empty.');
  }
  if (a.length !== b.length || a[0].length !== b[0].length) {
    throw new Error(
      `Incompatible dimensions for subtraction: (${a.length}x${a[0].length}) vs (${b.length}x${b[0].length}).`,
    );
  }
  return a.map((row, r) => row.map((val, c) => val - b[r][c]));
}

export function transposeMatrix(m: number[][]): number[][] {
  if (m.length === 0 || m[0].length === 0) {
    throw new Error('Matrix cannot be empty.');
  }
  return m[0].map((_, c) => m.map((r) => r[c]));
}
