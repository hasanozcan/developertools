import { load } from 'js-yaml';

export type OpenApiFormat = 'JSON' | 'YAML';
export type OpenApiMessageLevel = 'error' | 'warning';

export interface OpenApiMessage {
  level: OpenApiMessageLevel;
  code: string;
  path: string;
  message: string;
}

export interface OpenApiEndpoint {
  path: string;
  method: string;
  summary: string;
  operationId: string;
  tags: string[];
  deprecated: boolean;
  responseCodes: string[];
  security: 'secured' | 'public' | 'unspecified';
}

export interface OpenApiAnalysis {
  valid: boolean;
  format: OpenApiFormat;
  version: string;
  title: string;
  endpoints: OpenApiEndpoint[];
  messages: OpenApiMessage[];
  stats: {
    paths: number;
    operations: number;
    tags: number;
    deprecated: number;
    externalReferences: number;
  };
  normalizedJson: string;
}

export class OpenApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OpenApiError';
  }
}

const MAX_INPUT_LENGTH = 1_000_000;
const OPERATION_METHODS = [
  'get',
  'put',
  'post',
  'delete',
  'options',
  'head',
  'patch',
  'trace',
] as const;
const OPERATION_METHOD_SET = new Set<string>(OPERATION_METHODS);
const PATH_ITEM_FIELDS = new Set([
  '$ref',
  'summary',
  'description',
  'servers',
  'parameters',
  ...OPERATION_METHODS,
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function parseDocument(input: string): { document: unknown; format: OpenApiFormat } {
  const trimmed = input.trim();
  if (!trimmed) throw new OpenApiError('Paste an OpenAPI JSON or YAML document first.');
  if (input.length > MAX_INPUT_LENGTH) {
    throw new OpenApiError('OpenAPI input is limited to 1,000,000 characters.');
  }

  try {
    return { document: JSON.parse(trimmed), format: 'JSON' };
  } catch {
    try {
      return {
        document: load(trimmed, {
          maxAliases: 100,
          maxDepth: 100,
          maxTotalMergeKeys: 10_000,
        }),
        format: 'YAML',
      };
    } catch (error) {
      throw new OpenApiError(
        `The document is neither valid JSON nor valid YAML: ${error instanceof Error ? error.message : 'parse failed'}`,
      );
    }
  }
}

function pointerSegment(value: string): string {
  return value.replace(/~/g, '~0').replace(/\//g, '~1');
}

function resolveLocalReference(document: unknown, reference: string): unknown {
  if (reference === '#') return document;
  if (!reference.startsWith('#/')) return undefined;

  let current = document;
  for (const rawSegment of reference.slice(2).split('/')) {
    let segment: string;
    try {
      segment = decodeURIComponent(rawSegment).replace(/~1/g, '/').replace(/~0/g, '~');
    } catch {
      return undefined;
    }
    if (!isRecord(current) && !Array.isArray(current)) return undefined;
    if (!Object.prototype.hasOwnProperty.call(current, segment)) return undefined;
    current = (current as Record<string, unknown>)[segment];
  }
  return current;
}

function dereferenceLocal(document: unknown, value: unknown): unknown {
  if (!isRecord(value) || typeof value.$ref !== 'string') return value;
  return resolveLocalReference(document, value.$ref) ?? value;
}

function securityStatus(value: unknown): OpenApiEndpoint['security'] {
  if (!Array.isArray(value)) return 'unspecified';
  return value.length === 0 ? 'public' : 'secured';
}

function collectReferences(
  document: unknown,
  messages: OpenApiMessage[],
): { externalReferences: number; cyclic: boolean } {
  const visited = new WeakSet<object>();
  let externalReferences = 0;
  let cyclic = false;

  const walk = (value: unknown, path: string, ancestors: WeakSet<object>): void => {
    if (value === null || typeof value !== 'object') return;
    if (ancestors.has(value)) {
      cyclic = true;
      return;
    }
    if (visited.has(value)) return;
    visited.add(value);
    ancestors.add(value);

    if (isRecord(value) && typeof value.$ref === 'string') {
      if (value.$ref.startsWith('#')) {
        if (resolveLocalReference(document, value.$ref) === undefined) {
          messages.push({
            level: 'error',
            code: 'unresolved-local-reference',
            path: `${path}/$ref`,
            message: `Local reference cannot be resolved: ${value.$ref}`,
          });
        }
      } else {
        externalReferences += 1;
        messages.push({
          level: 'warning',
          code: 'external-reference-not-resolved',
          path: `${path}/$ref`,
          message: `External reference was not fetched or resolved: ${value.$ref}`,
        });
      }
    }

    if (Array.isArray(value)) {
      value.forEach((child, index) => walk(child, `${path}/${index}`, ancestors));
    } else {
      Object.entries(value).forEach(([key, child]) =>
        walk(child, `${path}/${pointerSegment(key)}`, ancestors),
      );
    }
    ancestors.delete(value);
  };

  walk(document, '', new WeakSet<object>());
  return { externalReferences, cyclic };
}

function parameterEntries(
  document: unknown,
  pathItem: Record<string, unknown>,
  operation: Record<string, unknown>,
): unknown[] {
  const pathParameters = Array.isArray(pathItem.parameters) ? pathItem.parameters : [];
  const operationParameters = Array.isArray(operation.parameters) ? operation.parameters : [];
  return [...pathParameters, ...operationParameters].map((parameter) =>
    dereferenceLocal(document, parameter),
  );
}

export function analyzeOpenApi(input: string): OpenApiAnalysis {
  const { document, format } = parseDocument(input);
  if (!isRecord(document)) throw new OpenApiError('The OpenAPI document root must be an object.');

  const messages: OpenApiMessage[] = [];
  const endpoints: OpenApiEndpoint[] = [];
  const operationIds = new Map<string, string>();
  const allTags = new Set<string>();

  const version = typeof document.openapi === 'string' ? document.openapi : '';
  if (!version) {
    messages.push({
      level: 'error',
      code: 'missing-openapi-version',
      path: '/openapi',
      message: 'The required openapi version field is missing.',
    });
  } else if (!/^3\.(?:0|1|2)\.\d+(?:[-+].+)?$/u.test(version)) {
    messages.push({
      level: 'error',
      code: 'unsupported-openapi-version',
      path: '/openapi',
      message: `Only OpenAPI 3.0, 3.1, and 3.2 documents are supported; received ${version}.`,
    });
  }

  const info = isRecord(document.info) ? document.info : null;
  const title = info && typeof info.title === 'string' ? info.title : '';
  if (!info) {
    messages.push({
      level: 'error',
      code: 'missing-info',
      path: '/info',
      message: 'The required info object is missing.',
    });
  } else {
    if (!title.trim()) {
      messages.push({
        level: 'error',
        code: 'missing-info-title',
        path: '/info/title',
        message: 'info.title must be a non-empty string.',
      });
    }
    if (typeof info.version !== 'string' || !info.version.trim()) {
      messages.push({
        level: 'error',
        code: 'missing-info-version',
        path: '/info/version',
        message: 'info.version must be a non-empty string.',
      });
    }
  }

  if (!Array.isArray(document.servers) || document.servers.length === 0) {
    messages.push({
      level: 'warning',
      code: 'missing-servers',
      path: '/servers',
      message: 'No root servers are declared; clients may fall back to the document location or /.',
    });
  }

  const paths = isRecord(document.paths) ? document.paths : null;
  if (!paths) {
    messages.push({
      level: 'error',
      code: 'missing-paths',
      path: '/paths',
      message: 'The required paths object is missing.',
    });
  } else {
    const globalSecurity = securityStatus(document.security);

    for (const [pathName, rawPathItem] of Object.entries(paths)) {
      if (pathName.startsWith('x-')) continue;
      const pathLocation = `/paths/${pointerSegment(pathName)}`;
      if (!pathName.startsWith('/')) {
        messages.push({
          level: 'error',
          code: 'invalid-path-key',
          path: pathLocation,
          message: `Path keys must start with /: ${pathName}`,
        });
      }
      const dereferencedPathItem = dereferenceLocal(document, rawPathItem);
      if (!isRecord(dereferencedPathItem)) {
        messages.push({
          level: 'error',
          code: 'invalid-path-item',
          path: pathLocation,
          message: 'Path item must be an object or resolvable local reference.',
        });
        continue;
      }

      Object.keys(dereferencedPathItem).forEach((field) => {
        if (!PATH_ITEM_FIELDS.has(field) && !field.startsWith('x-')) {
          messages.push({
            level: 'warning',
            code: 'unknown-path-item-field',
            path: `${pathLocation}/${pointerSegment(field)}`,
            message: `Unknown Path Item field: ${field}`,
          });
        }
      });

      for (const method of OPERATION_METHODS) {
        if (!Object.prototype.hasOwnProperty.call(dereferencedPathItem, method)) continue;
        const rawOperation = dereferencedPathItem[method];
        if (!isRecord(rawOperation)) {
          messages.push({
            level: 'error',
            code: 'invalid-operation',
            path: `${pathLocation}/${method}`,
            message: `${method.toUpperCase()} operation must be an object.`,
          });
          continue;
        }

        const operationLocation = `${pathLocation}/${method}`;
        const operationId =
          typeof rawOperation.operationId === 'string' ? rawOperation.operationId.trim() : '';
        if (!operationId) {
          messages.push({
            level: 'warning',
            code: 'missing-operation-id',
            path: `${operationLocation}/operationId`,
            message: `${method.toUpperCase()} ${pathName} has no operationId.`,
          });
        } else if (operationIds.has(operationId)) {
          messages.push({
            level: 'error',
            code: 'duplicate-operation-id',
            path: `${operationLocation}/operationId`,
            message: `operationId ${operationId} is also used at ${operationIds.get(operationId)}.`,
          });
        } else {
          operationIds.set(operationId, operationLocation);
        }

        const responses = isRecord(rawOperation.responses) ? rawOperation.responses : null;
        const responseCodes = responses ? Object.keys(responses) : [];
        if (!responses || responseCodes.length === 0) {
          messages.push({
            level: 'error',
            code: 'missing-responses',
            path: `${operationLocation}/responses`,
            message: `${method.toUpperCase()} ${pathName} must declare at least one response.`,
          });
        } else {
          responseCodes.forEach((code) => {
            if (code !== 'default' && !/^[1-5](?:\d{2}|XX)$/u.test(code)) {
              messages.push({
                level: 'warning',
                code: 'unusual-response-code',
                path: `${operationLocation}/responses/${pointerSegment(code)}`,
                message: `Response key ${code} is not a standard HTTP status code, range, or default.`,
              });
            }
          });
        }

        const placeholders = [...pathName.matchAll(/\{([^{}]+)\}/gu)].map((match) => match[1]);
        const parameters = parameterEntries(document, dereferencedPathItem, rawOperation);
        placeholders.forEach((placeholder) => {
          const parameter = parameters.find(
            (candidate) =>
              isRecord(candidate) && candidate.in === 'path' && candidate.name === placeholder,
          );
          if (!parameter) {
            messages.push({
              level: 'error',
              code: 'missing-path-parameter',
              path: `${operationLocation}/parameters`,
              message: `Path template {${placeholder}} has no matching in:path parameter.`,
            });
          } else if (isRecord(parameter) && parameter.required !== true) {
            messages.push({
              level: 'error',
              code: 'optional-path-parameter',
              path: `${operationLocation}/parameters`,
              message: `Path parameter ${placeholder} must set required: true.`,
            });
          }
        });

        const tags = Array.isArray(rawOperation.tags)
          ? rawOperation.tags.filter((tag): tag is string => typeof tag === 'string')
          : [];
        tags.forEach((tag) => allTags.add(tag));
        const ownSecurity = securityStatus(rawOperation.security);
        endpoints.push({
          path: pathName,
          method: method.toUpperCase(),
          summary: typeof rawOperation.summary === 'string' ? rawOperation.summary : '',
          operationId,
          tags,
          deprecated: rawOperation.deprecated === true,
          responseCodes,
          security: ownSecurity === 'unspecified' ? globalSecurity : ownSecurity,
        });
      }
    }
  }

  const referenceResult = collectReferences(document, messages);
  if (referenceResult.cyclic) {
    messages.push({
      level: 'error',
      code: 'cyclic-yaml-alias',
      path: '',
      message: 'Cyclic YAML aliases cannot be represented as JSON and are not supported.',
    });
  }

  let normalizedJson = '';
  try {
    normalizedJson = JSON.stringify(document, null, 2);
  } catch {
    normalizedJson = '';
  }

  return {
    valid: messages.every((message) => message.level !== 'error'),
    format,
    version,
    title,
    endpoints,
    messages,
    stats: {
      paths: paths ? Object.keys(paths).filter((path) => !path.startsWith('x-')).length : 0,
      operations: endpoints.length,
      tags: allTags.size,
      deprecated: endpoints.filter((endpoint) => endpoint.deprecated).length,
      externalReferences: referenceResult.externalReferences,
    },
    normalizedJson,
  };
}

export function isOpenApiOperationMethod(value: string): boolean {
  return OPERATION_METHOD_SET.has(value.toLowerCase());
}
