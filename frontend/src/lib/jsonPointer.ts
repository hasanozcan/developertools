export class JsonPointerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'JsonPointerError';
  }
}

function decodeToken(token: string): string {
  if (/~(?:[^01]|$)/.test(token)) {
    throw new JsonPointerError(
      `Invalid escape sequence in token "${token}". Use ~0 for ~ and ~1 for /.`,
    );
  }

  return token.replace(/~1/g, '/').replace(/~0/g, '~');
}

export function parseJsonPointer(pointer: string): string[] {
  if (pointer === '') return [];
  if (!pointer.startsWith('/')) {
    throw new JsonPointerError('A JSON Pointer must be empty or start with /.');
  }

  return pointer.slice(1).split('/').map(decodeToken);
}

export function evaluateJsonPointer(document: unknown, pointer: string): unknown {
  const tokens = parseJsonPointer(pointer);
  let current = document;

  for (const token of tokens) {
    if (Array.isArray(current)) {
      if (token === '-' || !/^(0|[1-9]\d*)$/.test(token)) {
        throw new JsonPointerError(`Token "${token}" is not a valid array index.`);
      }
      const index = Number(token);
      if (!Number.isSafeInteger(index) || index >= current.length) {
        throw new JsonPointerError(`Array index ${token} does not exist.`);
      }
      current = current[index];
      continue;
    }

    if (current !== null && typeof current === 'object') {
      const record = current as Record<string, unknown>;
      if (!Object.prototype.hasOwnProperty.call(record, token)) {
        throw new JsonPointerError(`Object member "${token}" does not exist.`);
      }
      current = record[token];
      continue;
    }

    throw new JsonPointerError(`Cannot resolve token "${token}" through a primitive value.`);
  }

  return current;
}
