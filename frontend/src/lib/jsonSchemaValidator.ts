import Ajv, { type AnySchema, type ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';

export type JsonSchemaValidationStatus = 'valid' | 'invalid' | 'error';
export type JsonSchemaValidationErrorSource = 'document' | 'schema' | 'compile';

export const JSON_SCHEMA_INPUT_LIMITS = {
  document: 1_000_000,
  schema: 250_000,
} as const;

export interface JsonSchemaValidationError {
  instancePath: string;
  schemaPath: string;
  keyword: string;
  message: string;
  params: Record<string, unknown>;
}

export interface JsonSchemaValidationIssue {
  source: JsonSchemaValidationErrorSource;
  message: string;
}

export interface JsonSchemaValidationResult {
  status: JsonSchemaValidationStatus;
  valid: boolean;
  errors: JsonSchemaValidationError[];
  warnings: string[];
  issue?: JsonSchemaValidationIssue;
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function parseJson(
  source: string,
  sourceName: 'document' | 'schema',
): { value: unknown } | { issue: JsonSchemaValidationIssue } {
  if (source.length > JSON_SCHEMA_INPUT_LIMITS[sourceName]) {
    return {
      issue: {
        source: sourceName,
        message: `JSON ${sourceName} exceeds the ${JSON_SCHEMA_INPUT_LIMITS[sourceName].toLocaleString('en-US')} character limit.`,
      },
    };
  }

  if (!source.trim()) {
    return {
      issue: {
        source: sourceName,
        message: `JSON ${sourceName} is required.`,
      },
    };
  }

  try {
    return { value: JSON.parse(source) as unknown };
  } catch (error) {
    return {
      issue: {
        source: sourceName,
        message: errorMessage(error),
      },
    };
  }
}

function issueResult(issue: JsonSchemaValidationIssue): JsonSchemaValidationResult {
  return {
    status: 'error',
    valid: false,
    errors: [],
    warnings: [],
    issue,
  };
}

function isAsyncSchema(value: unknown): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    (value as Record<string, unknown>).$async === true
  );
}

function normalizeValidationError(error: ErrorObject): JsonSchemaValidationError {
  return {
    instancePath: error.instancePath,
    schemaPath: error.schemaPath,
    keyword: error.keyword,
    message: error.message ?? 'The value does not satisfy this schema rule.',
    params: error.params,
  };
}

/**
 * Parses a JSON document and JSON Schema, compiles the schema with Ajv v8, and
 * validates the document. A new Ajv instance prevents schemas with the same
 * `$id` from conflicting across independent validations.
 */
export function validateJsonSchema(
  documentSource: string,
  schemaSource: string,
): JsonSchemaValidationResult {
  const parsedDocument = parseJson(documentSource, 'document');
  if ('issue' in parsedDocument) return issueResult(parsedDocument.issue);

  const parsedSchema = parseJson(schemaSource, 'schema');
  if ('issue' in parsedSchema) return issueResult(parsedSchema.issue);
  if (isAsyncSchema(parsedSchema.value)) {
    return issueResult({
      source: 'compile',
      message: 'Asynchronous JSON Schemas are not supported by this browser tool.',
    });
  }

  try {
    const warnings = new Set<string>();
    const ajv = new Ajv({
      allErrors: true,
      strictSchema: 'log',
      strictTypes: false,
      strictTuples: false,
      validateSchema: true,
      logger: {
        log: () => undefined,
        warn: (...args: unknown[]) => warnings.add(args.map(String).join(' ')),
        error: (...args: unknown[]) => warnings.add(args.map(String).join(' ')),
      },
    });
    addFormats(ajv);
    const validate = ajv.compile(parsedSchema.value as AnySchema);
    const valid = validate(parsedDocument.value);
    const errors = (validate.errors ?? []).map(normalizeValidationError);

    return {
      status: valid ? 'valid' : 'invalid',
      valid: Boolean(valid),
      errors,
      warnings: [...warnings],
    };
  } catch (error) {
    return issueResult({
      source: 'compile',
      message: errorMessage(error),
    });
  }
}
