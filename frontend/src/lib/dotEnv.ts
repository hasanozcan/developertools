export interface DotEnvConversionResult {
  output: string;
  warnings: string[];
}

export interface DotEnvToJsonOptions {
  inferTypes?: boolean;
  spaces?: 2 | 4;
}

const KEY_PATTERN = /^[A-Za-z_][A-Za-z0-9_.-]*$/;
const NUMBER_PATTERN = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/;

function inferPrimitive(value: string): string | number | boolean | null {
  const normalized = value.toLowerCase();
  if (normalized === 'true') return true;
  if (normalized === 'false') return false;
  if (normalized === 'null') return null;

  if (NUMBER_PATTERN.test(value)) {
    const number = Number(value);
    if (Number.isFinite(number)) return number;
  }

  return value;
}

function decodeDoubleQuotedEscape(character: string): string {
  if (character === 'n') return '\n';
  if (character === 'r') return '\r';
  if (character === 't') return '\t';
  if (character === '"') return '"';
  if (character === '\\') return '\\';
  return `\\${character}`;
}

function readQuotedValue(
  lines: string[],
  startLineIndex: number,
  rawValue: string,
): { value: string; endLineIndex: number } {
  const quote = rawValue[0];
  let lineIndex = startLineIndex;
  let segment = rawValue.slice(1);
  let value = '';

  while (true) {
    for (let index = 0; index < segment.length; index += 1) {
      const character = segment[index];

      if (quote === '"' && character === '\\') {
        const next = segment[index + 1];
        if (next === undefined) {
          value += '\\';
        } else {
          value += decodeDoubleQuotedEscape(next);
          index += 1;
        }
        continue;
      }

      if (character === quote) {
        const trailing = segment.slice(index + 1).trim();
        if (trailing && !trailing.startsWith('#')) {
          throw new Error(`Line ${lineIndex + 1}: unexpected text after the closing quote`);
        }
        return { value, endLineIndex: lineIndex };
      }

      value += character;
    }

    lineIndex += 1;
    if (lineIndex >= lines.length) {
      throw new Error(`Line ${startLineIndex + 1}: unterminated quoted value`);
    }
    value += '\n';
    segment = lines[lineIndex];
  }
}

export function parseDotEnv(
  input: string,
  options: Pick<DotEnvToJsonOptions, 'inferTypes'> = {},
): { value: Record<string, string | number | boolean | null>; warnings: string[] } {
  const lines = input
    .replace(/^\uFEFF/, '')
    .replace(/\r\n?/g, '\n')
    .split('\n');
  const value = Object.create(null) as Record<string, string | number | boolean | null>;
  const firstDefinitionLine = new Map<string, number>();
  const warnings: string[] = [];

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex];
    const assignmentLine = lineIndex + 1;
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_.-]*)\s*=\s*(.*)$/);
    if (!match) {
      throw new Error(`Line ${lineIndex + 1}: expected KEY=VALUE`);
    }

    const key = match[1];
    const rawValue = match[2];
    let parsedValue: string;

    if (rawValue.startsWith('"') || rawValue.startsWith("'") || rawValue.startsWith('`')) {
      const quoted = readQuotedValue(lines, lineIndex, rawValue);
      parsedValue = quoted.value;
      lineIndex = quoted.endLineIndex;
    } else {
      const commentIndex = rawValue.indexOf('#');
      parsedValue = (commentIndex === -1 ? rawValue : rawValue.slice(0, commentIndex)).trim();
    }

    const previousLine = firstDefinitionLine.get(key);
    if (previousLine !== undefined) {
      warnings.push(
        `${key} is defined more than once (lines ${previousLine} and ${assignmentLine}); the last value is used.`,
      );
    } else {
      firstDefinitionLine.set(key, assignmentLine);
    }

    Object.defineProperty(value, key, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: options.inferTypes ? inferPrimitive(parsedValue) : parsedValue,
    });
  }

  return { value, warnings };
}

export function convertDotEnvToJson(
  input: string,
  options: DotEnvToJsonOptions = {},
): DotEnvConversionResult {
  const { value, warnings } = parseDotEnv(input, options);
  return {
    output: JSON.stringify(value, null, options.spaces ?? 2),
    warnings,
  };
}

function quoteDotEnvValue(value: string): string {
  return JSON.stringify(value)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

export function convertJsonToDotEnv(input: string): DotEnvConversionResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(input);
  } catch (error) {
    throw new Error(error instanceof Error ? `Invalid JSON: ${error.message}` : 'Invalid JSON');
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('JSON input must be an object with environment variable names as keys.');
  }

  const warnings: string[] = [];
  const output = Object.entries(parsed)
    .map(([key, rawValue]) => {
      if (!KEY_PATTERN.test(key)) {
        throw new Error(
          `Invalid environment variable name "${key}". Use letters, digits, underscores, dots, or hyphens, and do not start with a digit.`,
        );
      }

      if (rawValue === null) {
        warnings.push(`${key} is null and was written as an empty string.`);
        return `${key}=""`;
      }
      if (typeof rawValue === 'string') return `${key}=${quoteDotEnvValue(rawValue)}`;
      if (typeof rawValue === 'number' || typeof rawValue === 'boolean') {
        return `${key}=${String(rawValue)}`;
      }

      warnings.push(`${key} contains structured JSON and was written as a JSON string.`);
      return `${key}=${quoteDotEnvValue(JSON.stringify(rawValue))}`;
    })
    .join('\n');

  return { output, warnings };
}
