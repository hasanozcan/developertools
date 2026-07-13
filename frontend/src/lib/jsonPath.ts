export class JsonPathError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'JsonPathError';
  }
}

export type JsonPathSelector =
  | { kind: 'name'; name: string }
  | { kind: 'index'; index: number }
  | { kind: 'wildcard' }
  | { kind: 'slice'; start: number | null; end: number | null; step: number | null };

export type JsonPathSegment = {
  kind: 'child' | 'descendant';
  selector: JsonPathSelector;
};

export type JsonPathMatch = {
  path: string;
  value: unknown;
};

type ParsedBracket = {
  selector: JsonPathSelector;
  nextIndex: number;
};

type ParsedName = {
  name: string;
  nextIndex: number;
};

const WILDCARD_SELECTOR: JsonPathSelector = { kind: 'wildcard' };

function isWhitespace(character: string | undefined): boolean {
  return character === ' ' || character === '\t' || character === '\n' || character === '\r';
}

function skipWhitespace(path: string, start: number): number {
  let index = start;
  while (isWhitespace(path[index])) index += 1;
  return index;
}

function isNameFirst(codePoint: number): boolean {
  return (
    codePoint === 0x5f ||
    (codePoint >= 0x41 && codePoint <= 0x5a) ||
    (codePoint >= 0x61 && codePoint <= 0x7a) ||
    codePoint >= 0x80
  );
}

function isNameCharacter(codePoint: number): boolean {
  return isNameFirst(codePoint) || (codePoint >= 0x30 && codePoint <= 0x39);
}

function parseShorthandName(path: string, start: number): ParsedName | null {
  const first = path.codePointAt(start);
  if (first === undefined || !isNameFirst(first)) return null;

  let index = start + String.fromCodePoint(first).length;
  while (index < path.length) {
    const codePoint = path.codePointAt(index);
    if (codePoint === undefined || !isNameCharacter(codePoint)) break;
    index += String.fromCodePoint(codePoint).length;
  }

  return { name: path.slice(start, index), nextIndex: index };
}

function invalidStringEscape(path: string, position: number): never {
  throw new JsonPathError(`Invalid string escape at position ${position}.`);
}

function parseQuotedName(path: string, start: number): ParsedName {
  const quote = path[start];
  let value = '';
  let index = start + 1;

  while (index < path.length) {
    const character = path[index];
    if (character === quote) {
      return { name: value, nextIndex: index + 1 };
    }

    if (character !== '\\') {
      if (character.charCodeAt(0) < 0x20) {
        throw new JsonPathError(`Unescaped control character at position ${index}.`);
      }
      value += character;
      index += 1;
      continue;
    }

    const escapePosition = index;
    index += 1;
    const escaped = path[index];
    if (escaped === undefined) invalidStringEscape(path, escapePosition);

    if (escaped === quote || escaped === '\\' || escaped === '/') {
      value += escaped;
      index += 1;
      continue;
    }

    const simpleEscapes: Record<string, string> = {
      b: '\b',
      f: '\f',
      n: '\n',
      r: '\r',
      t: '\t',
    };
    if (Object.prototype.hasOwnProperty.call(simpleEscapes, escaped)) {
      value += simpleEscapes[escaped];
      index += 1;
      continue;
    }

    if (escaped !== 'u') invalidStringEscape(path, escapePosition);

    const firstHex = path.slice(index + 1, index + 5);
    if (!/^[0-9A-Fa-f]{4}$/.test(firstHex)) invalidStringEscape(path, escapePosition);
    const firstUnit = Number.parseInt(firstHex, 16);

    if (firstUnit >= 0xd800 && firstUnit <= 0xdbff) {
      const secondMarker = path.slice(index + 5, index + 7);
      const secondHex = path.slice(index + 7, index + 11);
      if (secondMarker !== '\\u' || !/^[0-9A-Fa-f]{4}$/.test(secondHex)) {
        invalidStringEscape(path, escapePosition);
      }
      const secondUnit = Number.parseInt(secondHex, 16);
      if (secondUnit < 0xdc00 || secondUnit > 0xdfff) {
        invalidStringEscape(path, escapePosition);
      }
      value += String.fromCharCode(firstUnit, secondUnit);
      index += 11;
      continue;
    }

    if (firstUnit >= 0xdc00 && firstUnit <= 0xdfff) {
      invalidStringEscape(path, escapePosition);
    }
    value += String.fromCharCode(firstUnit);
    index += 5;
  }

  throw new JsonPathError(`Unterminated quoted member name at position ${start}.`);
}

function parseInteger(value: string, description: string): number {
  if (!/^(?:0|-?[1-9]\d*)$/.test(value)) {
    throw new JsonPathError(`${description} must be an integer without leading zeros.`);
  }

  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed)) {
    throw new JsonPathError(`${description} is outside the safe integer range.`);
  }
  return parsed;
}

function parseSlice(raw: string): JsonPathSelector {
  const parts = raw.split(':');
  if (parts.length < 2 || parts.length > 3) {
    throw new JsonPathError('A slice must use start:end or start:end:step syntax.');
  }

  const readPart = (part: string, description: string): number | null => {
    const value = part.trim();
    return value === '' ? null : parseInteger(value, description);
  };

  const start = readPart(parts[0], 'Slice start');
  const end = readPart(parts[1], 'Slice end');
  const step = parts.length === 3 ? readPart(parts[2], 'Slice step') : null;

  return { kind: 'slice', start, end, step };
}

function requireClosingBracket(path: string, index: number, openIndex: number): number {
  const next = skipWhitespace(path, index);
  if (path[next] === ',') {
    throw new JsonPathError('Union selectors are not supported.');
  }
  if (path[next] !== ']') {
    if (next >= path.length) {
      throw new JsonPathError(`Unterminated bracket segment at position ${openIndex}.`);
    }
    throw new JsonPathError(`Expected ] at position ${next}.`);
  }
  return next + 1;
}

function parseBracket(path: string, openIndex: number): ParsedBracket {
  let index = skipWhitespace(path, openIndex + 1);
  if (index >= path.length) {
    throw new JsonPathError(`Unterminated bracket segment at position ${openIndex}.`);
  }

  if (path[index] === '?') {
    throw new JsonPathError('Filter selectors are not supported.');
  }
  if (path[index] === '(' || path[index] === '@') {
    throw new JsonPathError('Script expressions are not supported.');
  }

  if (path[index] === "'" || path[index] === '"') {
    const parsed = parseQuotedName(path, index);
    return {
      selector: { kind: 'name', name: parsed.name },
      nextIndex: requireClosingBracket(path, parsed.nextIndex, openIndex),
    };
  }

  if (path[index] === '*') {
    index += 1;
    return {
      selector: WILDCARD_SELECTOR,
      nextIndex: requireClosingBracket(path, index, openIndex),
    };
  }

  const closeIndex = path.indexOf(']', index);
  if (closeIndex === -1) {
    throw new JsonPathError(`Unterminated bracket segment at position ${openIndex}.`);
  }

  const raw = path.slice(index, closeIndex).trim();
  if (raw.includes('?')) throw new JsonPathError('Filter selectors are not supported.');
  if (raw.includes(',')) throw new JsonPathError('Union selectors are not supported.');
  if (/[@()+*/%<>=!&|]/.test(raw)) {
    throw new JsonPathError('Script expressions are not supported.');
  }
  if (raw === '') throw new JsonPathError(`Empty selector at position ${openIndex}.`);

  return {
    selector: raw.includes(':')
      ? parseSlice(raw)
      : { kind: 'index', index: parseInteger(raw, 'Array index') },
    nextIndex: closeIndex + 1,
  };
}

export function parseJsonPath(path: string): JsonPathSegment[] {
  if (!path.startsWith('$')) {
    throw new JsonPathError('A JSONPath must start with the root identifier $.');
  }

  const segments: JsonPathSegment[] = [];
  let index = 1;

  while (index < path.length) {
    index = skipWhitespace(path, index);
    if (index >= path.length) break;

    if (path[index] === '[') {
      const parsed = parseBracket(path, index);
      segments.push({ kind: 'child', selector: parsed.selector });
      index = parsed.nextIndex;
      continue;
    }

    if (path[index] !== '.') {
      throw new JsonPathError(`Expected . or [ at position ${index}.`);
    }

    const segmentStart = index;
    const descendant = path[index + 1] === '.';
    index += descendant ? 2 : 1;

    if (descendant && path[index] === '[') {
      const parsed = parseBracket(path, index);
      segments.push({ kind: 'descendant', selector: parsed.selector });
      index = parsed.nextIndex;
      continue;
    }

    if (path[index] === '*') {
      segments.push({ kind: descendant ? 'descendant' : 'child', selector: WILDCARD_SELECTOR });
      index += 1;
      continue;
    }

    const parsedName = parseShorthandName(path, index);
    if (parsedName === null) {
      const kind = descendant ? 'descendant' : 'dot';
      throw new JsonPathError(
        `The ${kind} segment at position ${segmentStart} must be followed by a member name or *.`,
      );
    }
    segments.push({
      kind: descendant ? 'descendant' : 'child',
      selector: { kind: 'name', name: parsedName.name },
    });
    index = parsedName.nextIndex;
  }

  return segments;
}

function isContainer(value: unknown): value is object {
  return value !== null && typeof value === 'object';
}

function escapeNormalizedName(name: string): string {
  let escaped = '';
  for (let index = 0; index < name.length; index += 1) {
    const character = name[index];
    const codeUnit = name.charCodeAt(index);

    if (character === "'") escaped += "\\'";
    else if (character === '\\') escaped += '\\\\';
    else if (character === '\b') escaped += '\\b';
    else if (character === '\f') escaped += '\\f';
    else if (character === '\n') escaped += '\\n';
    else if (character === '\r') escaped += '\\r';
    else if (character === '\t') escaped += '\\t';
    else if (codeUnit < 0x20 || (codeUnit >= 0xd800 && codeUnit <= 0xdfff)) {
      if (
        codeUnit >= 0xd800 &&
        codeUnit <= 0xdbff &&
        index + 1 < name.length &&
        name.charCodeAt(index + 1) >= 0xdc00 &&
        name.charCodeAt(index + 1) <= 0xdfff
      ) {
        escaped += character + name[index + 1];
        index += 1;
      } else {
        escaped += `\\u${codeUnit.toString(16).padStart(4, '0')}`;
      }
    } else escaped += character;
  }
  return escaped;
}

function appendName(path: string, name: string): string {
  return `${path}['${escapeNormalizedName(name)}']`;
}

function appendIndex(path: string, index: number): string {
  return `${path}[${index}]`;
}

function sliceIndices(
  length: number,
  start: number | null,
  end: number | null,
  requestedStep: number | null,
): number[] {
  const step = requestedStep ?? 1;
  const indices: number[] = [];
  if (step === 0) return indices;

  if (step > 0) {
    const normalize = (bound: number): number =>
      bound < 0 ? Math.max(length + bound, 0) : Math.min(bound, length);
    const lower = start === null ? 0 : normalize(start);
    const upper = end === null ? length : normalize(end);
    for (let index = lower; index < upper; index += step) indices.push(index);
    return indices;
  }

  const normalize = (bound: number): number =>
    bound < 0 ? Math.max(length + bound, -1) : Math.min(bound, length - 1);
  const upper = start === null ? length - 1 : normalize(start);
  const lower = end === null ? -1 : normalize(end);
  for (let index = upper; index > lower; index += step) indices.push(index);
  return indices;
}

function selectChildren(node: JsonPathMatch, selector: JsonPathSelector): JsonPathMatch[] {
  const value = node.value;

  if (selector.kind === 'name') {
    if (
      !isContainer(value) ||
      Array.isArray(value) ||
      !Object.prototype.hasOwnProperty.call(value, selector.name)
    ) {
      return [];
    }
    const record = value as Record<string, unknown>;
    return [{ path: appendName(node.path, selector.name), value: record[selector.name] }];
  }

  if (selector.kind === 'index') {
    if (!Array.isArray(value)) return [];
    const index = selector.index < 0 ? value.length + selector.index : selector.index;
    if (index < 0 || index >= value.length) return [];
    return [{ path: appendIndex(node.path, index), value: value[index] }];
  }

  if (selector.kind === 'slice') {
    if (!Array.isArray(value)) return [];
    return sliceIndices(value.length, selector.start, selector.end, selector.step).map((index) => ({
      path: appendIndex(node.path, index),
      value: value[index],
    }));
  }

  if (Array.isArray(value)) {
    return value.map((child, index) => ({ path: appendIndex(node.path, index), value: child }));
  }
  if (!isContainer(value)) return [];
  const record = value as Record<string, unknown>;
  return Object.keys(record).map((name) => ({
    path: appendName(node.path, name),
    value: record[name],
  }));
}

function selectDescendants(node: JsonPathMatch, selector: JsonPathSelector): JsonPathMatch[] {
  const matches: JsonPathMatch[] = [];
  const stack = [node];
  const visited = new WeakSet<object>();

  while (stack.length > 0) {
    const current = stack.pop();
    if (current === undefined) break;

    if (isContainer(current.value)) {
      if (visited.has(current.value)) continue;
      visited.add(current.value);
    }

    matches.push(...selectChildren(current, selector));
    const children = selectChildren(current, WILDCARD_SELECTOR);
    for (let index = children.length - 1; index >= 0; index -= 1) stack.push(children[index]);
  }

  return matches;
}

export function evaluateJsonPath(document: unknown, path: string): JsonPathMatch[] {
  const segments = parseJsonPath(path);
  let matches: JsonPathMatch[] = [{ path: '$', value: document }];

  for (const segment of segments) {
    matches = matches.flatMap((match) =>
      segment.kind === 'child'
        ? selectChildren(match, segment.selector)
        : selectDescendants(match, segment.selector),
    );
  }

  return matches;
}
