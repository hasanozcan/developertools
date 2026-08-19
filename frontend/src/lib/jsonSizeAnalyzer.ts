export interface JsonSizeMetrics {
  rawBytes: number;
  minifiedBytes: number;
  totalKeys: number;
  totalArrays: number;
  totalObjects: number;
  maxDepth: number;
  stringBytes: number;
  numberBytes: number;
  booleanBytes: number;
  nullCount: number;
}

export function analyzeJsonSize(jsonStr: string): JsonSizeMetrics {
  const rawBytes = new TextEncoder().encode(jsonStr).length;
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    throw new Error('Invalid JSON string');
  }

  const minifiedBytes = new TextEncoder().encode(JSON.stringify(parsed)).length;

  let totalKeys = 0;
  let totalArrays = 0;
  let totalObjects = 0;
  let maxDepth = 0;
  let stringBytes = 0;
  let numberBytes = 0;
  let booleanBytes = 0;
  let nullCount = 0;

  const traverse = (node: unknown, currentDepth: number) => {
    if (currentDepth > maxDepth) maxDepth = currentDepth;

    if (node === null) {
      nullCount++;
    } else if (typeof node === 'string') {
      stringBytes += new TextEncoder().encode(node).length;
    } else if (typeof node === 'number') {
      numberBytes += 8; // approx 64-bit float representation
    } else if (typeof node === 'boolean') {
      booleanBytes += 4;
    } else if (Array.isArray(node)) {
      totalArrays++;
      for (const item of node) {
        traverse(item, currentDepth + 1);
      }
    } else if (typeof node === 'object') {
      totalObjects++;
      const entries = Object.entries(node as Record<string, unknown>);
      totalKeys += entries.length;
      for (const [k, v] of entries) {
        stringBytes += new TextEncoder().encode(k).length;
        traverse(v, currentDepth + 1);
      }
    }
  };

  traverse(parsed, 1);

  return {
    rawBytes,
    minifiedBytes,
    totalKeys,
    totalArrays,
    totalObjects,
    maxDepth,
    stringBytes,
    numberBytes,
    booleanBytes,
    nullCount,
  };
}
