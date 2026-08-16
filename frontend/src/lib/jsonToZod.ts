export interface JsonToZodOptions {
  schemaName?: string;
  inferStringFormats?: boolean;
  strictObjects?: boolean;
  includeInferredType?: boolean;
}

type StringFormat = 'datetime' | 'email' | 'url' | 'uuid';

type SchemaNode =
  | { kind: 'string'; format?: StringFormat }
  | { kind: 'number' }
  | { kind: 'integer' }
  | { kind: 'boolean' }
  | { kind: 'null' }
  | { kind: 'unknown' }
  | { kind: 'array'; item: SchemaNode }
  | { kind: 'object'; properties: Map<string, { node: SchemaNode; optional: boolean }> }
  | { kind: 'union'; options: SchemaNode[] };

const MAX_DEPTH = 30;
const IDENTIFIER_PATTERN = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ISO_DATETIME_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function detectStringFormat(value: string): StringFormat | undefined {
  if (UUID_PATTERN.test(value)) return 'uuid';
  if (ISO_DATETIME_PATTERN.test(value) && !Number.isNaN(Date.parse(value))) return 'datetime';
  if (EMAIL_PATTERN.test(value)) return 'email';

  try {
    const url = new URL(value);
    if (url.protocol === 'http:' || url.protocol === 'https:') return 'url';
  } catch {
    // Plain strings are expected to fail URL parsing.
  }

  return undefined;
}

function nodeKey(node: SchemaNode): string {
  if (node.kind === 'string') return `string:${node.format ?? ''}`;
  if (node.kind === 'array') return `array:${nodeKey(node.item)}`;
  if (node.kind === 'union') return `union:${node.options.map(nodeKey).join('|')}`;
  if (node.kind === 'object') {
    return `object:${[...node.properties.entries()]
      .map(([key, property]) => `${key}:${property.optional}:${nodeKey(property.node)}`)
      .join('|')}`;
  }
  return node.kind;
}

function mergeObjectNodes(nodes: Extract<SchemaNode, { kind: 'object' }>[]): SchemaNode {
  const keys: string[] = [];
  const knownKeys = new Set<string>();

  for (const node of nodes) {
    for (const key of node.properties.keys()) {
      if (!knownKeys.has(key)) {
        knownKeys.add(key);
        keys.push(key);
      }
    }
  }

  const properties = new Map<string, { node: SchemaNode; optional: boolean }>();
  for (const key of keys) {
    const matching = nodes
      .map((node) => node.properties.get(key))
      .filter((property): property is { node: SchemaNode; optional: boolean } => Boolean(property));
    properties.set(key, {
      node: mergeNodes(matching.map((property) => property.node)),
      optional: matching.length !== nodes.length || matching.some((property) => property.optional),
    });
  }

  return { kind: 'object', properties };
}

function mergeNodes(nodes: SchemaNode[]): SchemaNode {
  const flattened = nodes.flatMap((node) => (node.kind === 'union' ? node.options : [node]));
  const hasNumber = flattened.some((node) => node.kind === 'number');
  const normalized = hasNumber
    ? flattened.map((node): SchemaNode => (node.kind === 'integer' ? { kind: 'number' } : node))
    : flattened;
  const objects = normalized.filter(
    (node): node is Extract<SchemaNode, { kind: 'object' }> => node.kind === 'object',
  );

  if (objects.length === normalized.length && objects.length > 0) {
    return mergeObjectNodes(objects);
  }

  const unique = new Map<string, SchemaNode>();
  for (const node of normalized) unique.set(nodeKey(node), node);
  const options = [...unique.values()];
  if (options.length === 0) return { kind: 'unknown' };
  if (options.length === 1) return options[0];
  return { kind: 'union', options };
}

function inferNode(value: unknown, inferFormats: boolean, depth: number): SchemaNode {
  if (depth > MAX_DEPTH) {
    throw new Error(`JSON nesting exceeds the supported depth of ${MAX_DEPTH}.`);
  }
  if (value === null) return { kind: 'null' };
  if (typeof value === 'string') {
    return { kind: 'string', format: inferFormats ? detectStringFormat(value) : undefined };
  }
  if (typeof value === 'number') return { kind: Number.isInteger(value) ? 'integer' : 'number' };
  if (typeof value === 'boolean') return { kind: 'boolean' };
  if (Array.isArray(value)) {
    return {
      kind: 'array',
      item:
        value.length === 0
          ? { kind: 'unknown' }
          : mergeNodes(value.map((item) => inferNode(item, inferFormats, depth + 1))),
    };
  }
  if (typeof value === 'object') {
    const properties = new Map<string, { node: SchemaNode; optional: boolean }>();
    for (const [key, propertyValue] of Object.entries(value)) {
      properties.set(key, {
        node: inferNode(propertyValue, inferFormats, depth + 1),
        optional: false,
      });
    }
    return { kind: 'object', properties };
  }
  return { kind: 'unknown' };
}

function indentMultiline(value: string, spaces: number): string {
  const indentation = ' '.repeat(spaces);
  return value
    .split('\n')
    .map((line) => `${indentation}${line}`)
    .join('\n');
}

function renderNode(node: SchemaNode, level: number, strictObjects: boolean): string {
  if (node.kind === 'string') {
    return `z.string()${node.format ? `.${node.format}()` : ''}`;
  }
  if (node.kind === 'integer') return 'z.number().int()';
  if (node.kind === 'number') return 'z.number()';
  if (node.kind === 'boolean') return 'z.boolean()';
  if (node.kind === 'null') return 'z.null()';
  if (node.kind === 'unknown') return 'z.unknown()';
  if (node.kind === 'array') {
    return `z.array(${renderNode(node.item, level, strictObjects)})`;
  }
  if (node.kind === 'union') {
    const rendered = node.options.map((option) => renderNode(option, level + 1, strictObjects));
    if (rendered.every((option) => !option.includes('\n'))) {
      return `z.union([${rendered.join(', ')}])`;
    }
    return `z.union([\n${rendered
      .map((option) => `${indentMultiline(option, (level + 1) * 2)},`)
      .join('\n')}\n${'  '.repeat(level)}])`;
  }

  if (node.properties.size === 0) return `z.object({})${strictObjects ? '.strict()' : ''}`;
  const indentation = '  '.repeat(level);
  const properties = [...node.properties.entries()]
    .map(([key, property]) => {
      const propertyName = IDENTIFIER_PATTERN.test(key) ? key : JSON.stringify(key);
      const rendered = renderNode(property.node, level + 1, strictObjects);
      const optional = property.optional ? '.optional()' : '';
      return `${'  '.repeat(level + 1)}${propertyName}: ${rendered}${optional},`;
    })
    .join('\n');
  return `z.object({\n${properties}\n${indentation}})${strictObjects ? '.strict()' : ''}`;
}

function normalizeTypeName(input: string): string {
  const words = input
    .trim()
    .split(/[^A-Za-z0-9_$]+/)
    .filter(Boolean);
  let name = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('');
  if (!name) name = 'Root';
  if (!/^[A-Za-z_$]/.test(name)) name = `Root${name}`;
  return name.endsWith('Schema') ? name.slice(0, -6) || 'Root' : name;
}

export function generateZodSchema(input: string, options: JsonToZodOptions = {}): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(input);
  } catch (error) {
    throw new Error(error instanceof Error ? `Invalid JSON: ${error.message}` : 'Invalid JSON');
  }

  const typeName = normalizeTypeName(options.schemaName ?? 'Root');
  const schemaName = `${typeName}Schema`;
  const node = inferNode(parsed, options.inferStringFormats ?? true, 0);
  const schema = renderNode(node, 0, options.strictObjects ?? true);
  const lines = [`import { z } from 'zod';`, '', `export const ${schemaName} = ${schema};`];

  if (options.includeInferredType ?? true) {
    lines.push('', `export type ${typeName} = z.infer<typeof ${schemaName}>;`);
  }

  return lines.join('\n');
}
