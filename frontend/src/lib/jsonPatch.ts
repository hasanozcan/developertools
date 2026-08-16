export type JsonPrimitive = null | boolean | number | string;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

export type JsonPatchOperation =
  | { op: 'add' | 'replace' | 'test'; path: string; value: JsonValue }
  | { op: 'remove'; path: string }
  | { op: 'copy' | 'move'; from: string; path: string };

export class JsonPatchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'JsonPatchError';
  }
}

const ARRAY_INDEX = /^(?:0|[1-9]\d*)$/u;

function isObject(value: JsonValue): value is { [key: string]: JsonValue } {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isUnknownRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function defineJsonProperty(
  target: { [key: string]: JsonValue },
  key: string,
  value: JsonValue,
): void {
  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: true,
    writable: true,
    value,
  });
}

export function cloneJsonValue(value: JsonValue): JsonValue {
  if (Array.isArray(value)) return value.map(cloneJsonValue);
  if (!isObject(value)) return value;

  const clone: { [key: string]: JsonValue } = {};
  for (const [key, child] of Object.entries(value)) {
    defineJsonProperty(clone, key, cloneJsonValue(child));
  }
  return clone;
}

function jsonEquals(left: JsonValue, right: JsonValue): boolean {
  if (Object.is(left, right)) return true;
  if (Array.isArray(left) || Array.isArray(right)) {
    return (
      Array.isArray(left) &&
      Array.isArray(right) &&
      left.length === right.length &&
      left.every((value, index) => jsonEquals(value, right[index]))
    );
  }
  if (isObject(left) && isObject(right)) {
    const leftKeys = Object.keys(left);
    const rightKeys = Object.keys(right);
    return (
      leftKeys.length === rightKeys.length &&
      leftKeys.every(
        (key) =>
          Object.prototype.hasOwnProperty.call(right, key) && jsonEquals(left[key], right[key]),
      )
    );
  }
  return false;
}

export function encodeJsonPointerSegment(segment: string): string {
  return segment.replace(/~/g, '~0').replace(/\//g, '~1');
}

export function parseJsonPointer(pointer: string): string[] {
  if (pointer === '') return [];
  if (!pointer.startsWith('/'))
    throw new JsonPatchError('JSON Pointer paths must be empty or start with /.');

  return pointer
    .slice(1)
    .split('/')
    .map((segment) => {
      if (/(?:~[^01]|~$)/u.test(segment)) {
        throw new JsonPatchError(`Invalid JSON Pointer escape in path ${pointer}.`);
      }
      return segment.replace(/~1/g, '/').replace(/~0/g, '~');
    });
}

function arrayIndex(segment: string, length: number, allowEnd: boolean): number {
  if (!ARRAY_INDEX.test(segment)) throw new JsonPatchError(`Invalid array index: ${segment}.`);
  const index = Number(segment);
  if (!Number.isSafeInteger(index) || index > length || (!allowEnd && index === length)) {
    throw new JsonPatchError(`Array index ${segment} is out of bounds.`);
  }
  return index;
}

function getValue(document: JsonValue, pointer: string): JsonValue {
  let current = document;
  for (const segment of parseJsonPointer(pointer)) {
    if (Array.isArray(current)) {
      if (segment === '-')
        throw new JsonPatchError('The - array token is valid only for add destinations.');
      current = current[arrayIndex(segment, current.length, false)];
    } else if (isObject(current)) {
      if (!Object.prototype.hasOwnProperty.call(current, segment)) {
        throw new JsonPatchError(`Path does not exist: ${pointer}.`);
      }
      current = current[segment];
    } else {
      throw new JsonPatchError(`Cannot traverse through a primitive at ${pointer}.`);
    }
  }
  return current;
}

function getParent(
  document: JsonValue,
  pointer: string,
): { parent: JsonValue[] | { [key: string]: JsonValue }; key: string } {
  const segments = parseJsonPointer(pointer);
  if (segments.length === 0) throw new JsonPatchError('The document root has no parent.');
  const key = segments.pop() as string;
  const parentPointer = segments.map((segment) => `/${encodeJsonPointerSegment(segment)}`).join('');
  const parent = getValue(document, parentPointer);
  if (!Array.isArray(parent) && !isObject(parent)) {
    throw new JsonPatchError(`The parent of ${pointer} is not an array or object.`);
  }
  return { parent, key };
}

function addValue(document: JsonValue, pointer: string, value: JsonValue): JsonValue {
  if (pointer === '') return cloneJsonValue(value);
  const { parent, key } = getParent(document, pointer);
  if (Array.isArray(parent)) {
    const index = key === '-' ? parent.length : arrayIndex(key, parent.length, true);
    parent.splice(index, 0, cloneJsonValue(value));
  } else {
    defineJsonProperty(parent, key, cloneJsonValue(value));
  }
  return document;
}

function removeValue(
  document: JsonValue,
  pointer: string,
): { document: JsonValue; removed: JsonValue } {
  if (pointer === '') {
    throw new JsonPatchError('Removing the document root would leave no JSON document.');
  }
  const { parent, key } = getParent(document, pointer);
  if (Array.isArray(parent)) {
    const index = arrayIndex(key, parent.length, false);
    return { document, removed: parent.splice(index, 1)[0] };
  }
  if (!Object.prototype.hasOwnProperty.call(parent, key)) {
    throw new JsonPatchError(`Path does not exist: ${pointer}.`);
  }
  const removed = parent[key];
  delete parent[key];
  return { document, removed };
}

function replaceValue(document: JsonValue, pointer: string, value: JsonValue): JsonValue {
  if (pointer === '') return cloneJsonValue(value);
  const { parent, key } = getParent(document, pointer);
  if (Array.isArray(parent)) {
    parent[arrayIndex(key, parent.length, false)] = cloneJsonValue(value);
  } else {
    if (!Object.prototype.hasOwnProperty.call(parent, key)) {
      throw new JsonPatchError(`Path does not exist: ${pointer}.`);
    }
    defineJsonProperty(parent, key, cloneJsonValue(value));
  }
  return document;
}

export function applyJsonPatch(
  document: JsonValue,
  operations: readonly JsonPatchOperation[],
): JsonValue {
  let result = cloneJsonValue(document);

  operations.forEach((operation, index) => {
    try {
      if (operation.op === 'add') {
        result = addValue(result, operation.path, operation.value);
      } else if (operation.op === 'remove') {
        result = removeValue(result, operation.path).document;
      } else if (operation.op === 'replace') {
        result = replaceValue(result, operation.path, operation.value);
      } else if (operation.op === 'copy') {
        result = addValue(result, operation.path, getValue(result, operation.from));
      } else if (operation.op === 'move') {
        if (operation.path === operation.from) return;
        if (operation.path.startsWith(`${operation.from}/`)) {
          throw new JsonPatchError('A value cannot be moved into one of its own children.');
        }
        const removal = removeValue(result, operation.from);
        result = addValue(removal.document, operation.path, removal.removed);
      } else if (
        operation.op === 'test' &&
        !jsonEquals(getValue(result, operation.path), operation.value)
      ) {
        throw new JsonPatchError(`Test operation failed at ${operation.path || '(root)'}.`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown JSON Patch error.';
      throw new JsonPatchError(`Operation ${index + 1} (${operation.op}) failed: ${message}`);
    }
  });

  return result;
}

function diffValues(source: JsonValue, target: JsonValue, path: string): JsonPatchOperation[] {
  if (jsonEquals(source, target)) return [];

  if (isObject(source) && isObject(target)) {
    const operations: JsonPatchOperation[] = [];
    const sourceKeys = Object.keys(source).sort();
    const targetKeys = Object.keys(target).sort();

    for (const key of sourceKeys) {
      if (!Object.prototype.hasOwnProperty.call(target, key)) {
        operations.push({ op: 'remove', path: `${path}/${encodeJsonPointerSegment(key)}` });
      }
    }
    for (const key of targetKeys) {
      const childPath = `${path}/${encodeJsonPointerSegment(key)}`;
      if (!Object.prototype.hasOwnProperty.call(source, key)) {
        operations.push({ op: 'add', path: childPath, value: cloneJsonValue(target[key]) });
      } else {
        operations.push(...diffValues(source[key], target[key], childPath));
      }
    }
    return operations;
  }

  return [{ op: 'replace', path, value: cloneJsonValue(target) }];
}

export function generateJsonPatch(source: JsonValue, target: JsonValue): JsonPatchOperation[] {
  return diffValues(source, target, '');
}

function assertJsonValue(value: unknown, path: string): asserts value is JsonValue {
  if (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'boolean' ||
    (typeof value === 'number' && Number.isFinite(value))
  ) {
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((child, index) => assertJsonValue(child, `${path}/${index}`));
    return;
  }
  if (isUnknownRecord(value)) {
    Object.entries(value).forEach(([key, child]) =>
      assertJsonValue(child, `${path}/${encodeJsonPointerSegment(key)}`),
    );
    return;
  }
  throw new JsonPatchError(`Non-JSON value found at ${path || '(root)'}.`);
}

export function parseJsonDocument(input: string, label = 'JSON document'): JsonValue {
  if (!input.trim()) throw new JsonPatchError(`${label} is empty.`);
  let parsed: unknown;
  try {
    parsed = JSON.parse(input);
  } catch (error) {
    throw new JsonPatchError(
      `${label} is invalid: ${error instanceof Error ? error.message : 'JSON parse failed.'}`,
    );
  }
  assertJsonValue(parsed, '');
  return parsed;
}

export function parseJsonPatch(input: string): JsonPatchOperation[] {
  const parsed = parseJsonDocument(input, 'JSON Patch');
  if (!Array.isArray(parsed))
    throw new JsonPatchError('JSON Patch must be an array of operations.');

  return parsed.map((operation, index) => {
    if (
      !isUnknownRecord(operation) ||
      typeof operation.op !== 'string' ||
      typeof operation.path !== 'string'
    ) {
      throw new JsonPatchError(`Operation ${index + 1} must contain string op and path fields.`);
    }
    parseJsonPointer(operation.path);

    if (operation.op === 'add' || operation.op === 'replace' || operation.op === 'test') {
      if (!Object.prototype.hasOwnProperty.call(operation, 'value')) {
        throw new JsonPatchError(`Operation ${index + 1} (${operation.op}) requires a value.`);
      }
      assertJsonValue(operation.value, `/operations/${index}/value`);
      return { op: operation.op, path: operation.path, value: operation.value };
    }
    if (operation.op === 'remove') return { op: 'remove', path: operation.path };
    if (operation.op === 'copy' || operation.op === 'move') {
      if (typeof operation.from !== 'string') {
        throw new JsonPatchError(`Operation ${index + 1} (${operation.op}) requires a from path.`);
      }
      parseJsonPointer(operation.from);
      return { op: operation.op, from: operation.from, path: operation.path };
    }
    throw new JsonPatchError(`Operation ${index + 1} uses unsupported op ${operation.op}.`);
  });
}
