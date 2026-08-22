export interface JsonPatchOperation {
  op: 'add' | 'remove' | 'replace';
  path: string;
  value?: any;
}

export function generateJsonPatch(objA: any, objB: any): JsonPatchOperation[] {
  const patches: JsonPatchOperation[] = [];
  const keysA = new Set(Object.keys(objA || {}));
  const keysB = new Set(Object.keys(objB || {}));

  for (const k of keysB) {
    if (!keysA.has(k)) {
      patches.push({ op: 'add', path: '/' + k, value: objB[k] });
    } else if (JSON.stringify(objA[k]) !== JSON.stringify(objB[k])) {
      patches.push({ op: 'replace', path: '/' + k, value: objB[k] });
    }
  }

  for (const k of keysA) {
    if (!keysB.has(k)) {
      patches.push({ op: 'remove', path: '/' + k });
    }
  }

  return patches;
}