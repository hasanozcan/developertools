'use client';

import { useState, type FormEvent } from 'react';
import { AlertTriangle, CheckCircle2, FileJson2, Play, Trash2, XCircle } from 'lucide-react';
import {
  JSON_SCHEMA_INPUT_LIMITS,
  validateJsonSchema,
  type JsonSchemaValidationErrorSource,
  type JsonSchemaValidationResult,
} from '@/lib/jsonSchemaValidator';

const sampleDocument = `{
  "name": "Ada Lovelace",
  "age": 16,
  "role": "admin"
}`;

const sampleSchema = `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "additionalProperties": false,
  "required": ["name", "age"],
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1
    },
    "age": {
      "type": "integer",
      "minimum": 18
    }
  }
}`;

const issueHeadings: Record<JsonSchemaValidationErrorSource, string> = {
  document: 'Invalid JSON document',
  schema: 'Invalid JSON schema',
  compile: 'Schema compile error',
};

export default function JsonSchemaValidatorTool() {
  const [documentSource, setDocumentSource] = useState('');
  const [schemaSource, setSchemaSource] = useState('');
  const [result, setResult] = useState<JsonSchemaValidationResult | null>(null);

  const updateDocument = (value: string) => {
    setDocumentSource(value);
    setResult(null);
  };

  const updateSchema = (value: string) => {
    setSchemaSource(value);
    setResult(null);
  };

  const runValidation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(validateJsonSchema(documentSource, schemaSource));
  };

  const loadSample = () => {
    setDocumentSource(sampleDocument);
    setSchemaSource(sampleSchema);
    setResult(null);
  };

  const clear = () => {
    setDocumentSource('');
    setSchemaSource('');
    setResult(null);
  };

  return (
    <section
      aria-labelledby="json-schema-validator-heading"
      className="mb-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
      data-tool-interface="true"
    >
      <div className="mb-5">
        <h2
          id="json-schema-validator-heading"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          JSON Schema Validator
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Validate a JSON document against a JSON Schema in your browser. Validation uses Ajv v8 and
          reports every matching schema error.
        </p>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Numbers use JavaScript precision; integers outside the safe range can be rounded while
          parsing.
        </p>
      </div>

      <form onSubmit={runValidation} noValidate>
        <div className="mb-5 flex flex-wrap gap-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            <Play aria-hidden="true" className="h-4 w-4" />
            Validate
          </button>
          <button
            type="button"
            onClick={loadSample}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <FileJson2 aria-hidden="true" className="h-4 w-4" />
            Load failing sample
          </button>
          <button
            type="button"
            onClick={clear}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <Trash2 aria-hidden="true" className="h-4 w-4" />
            Clear
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <label
              htmlFor="json-schema-document"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              JSON document
            </label>
            <p
              id="json-schema-document-help"
              className="mt-1 text-xs text-gray-500 dark:text-gray-400"
            >
              The JSON value to validate (up to 1,000,000 characters).
            </p>
            <textarea
              id="json-schema-document"
              value={documentSource}
              onChange={(event) => updateDocument(event.target.value)}
              aria-describedby="json-schema-document-help"
              spellCheck={false}
              maxLength={JSON_SCHEMA_INPUT_LIMITS.document}
              placeholder={'{\n  "name": "Ada"\n}'}
              className="mt-2 min-h-80 w-full resize-y rounded-lg border border-gray-300 bg-white p-3 font-mono text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:ring-primary-800"
            />
          </div>

          <div>
            <label
              htmlFor="json-schema-schema"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              JSON Schema
            </label>
            <p
              id="json-schema-schema-help"
              className="mt-1 text-xs text-gray-500 dark:text-gray-400"
            >
              The schema used to validate the document (up to 250,000 characters).
            </p>
            <textarea
              id="json-schema-schema"
              value={schemaSource}
              onChange={(event) => updateSchema(event.target.value)}
              aria-describedby="json-schema-schema-help"
              spellCheck={false}
              maxLength={JSON_SCHEMA_INPUT_LIMITS.schema}
              placeholder={'{\n  "type": "object"\n}'}
              className="mt-2 min-h-80 w-full resize-y rounded-lg border border-gray-300 bg-white p-3 font-mono text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:ring-primary-800"
            />
          </div>
        </div>
      </form>

      {result?.status === 'valid' && (
        <div
          role="status"
          aria-live="polite"
          className="mt-5 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-200"
        >
          <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <h3 className="font-semibold">Document is valid</h3>
            <p className="mt-1 text-sm">
              The JSON document satisfies every recognized rule in the schema.
            </p>
          </div>
        </div>
      )}

      {result && result.warnings.length > 0 && (
        <div
          role="status"
          aria-live="polite"
          className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200"
        >
          <h3 className="font-semibold">Schema warnings</h3>
          <p className="mt-1 text-sm">
            Ajv ignored extension keywords it does not recognize. Review them for misspellings.
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 font-mono text-xs">
            {result.warnings.map((warning) => (
              <li key={warning} className="break-words">
                {warning}
              </li>
            ))}
          </ul>
        </div>
      )}

      {result?.status === 'error' && result.issue && (
        <div
          role="alert"
          className="mt-5 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200"
        >
          <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
          <div className="min-w-0">
            <h3 className="font-semibold">{issueHeadings[result.issue.source]}</h3>
            <p className="mt-1 break-words font-mono text-sm">{result.issue.message}</p>
          </div>
        </div>
      )}

      {result?.status === 'invalid' && (
        <div
          role="alert"
          className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20"
        >
          <div className="flex items-start gap-3 text-red-800 dark:text-red-200">
            <XCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <h3 className="font-semibold">Document is invalid</h3>
              <p className="mt-1 text-sm">
                Found {result.errors.length} schema{' '}
                {result.errors.length === 1 ? 'error' : 'errors'}.
              </p>
            </div>
          </div>

          <ol aria-label="Schema validation errors" className="mt-4 space-y-3">
            {result.errors.map((error, index) => (
              <li
                key={`${error.instancePath}-${error.schemaPath}-${error.keyword}-${index}`}
                className="rounded-lg border border-red-200 bg-white p-4 dark:border-red-800 dark:bg-gray-900"
              >
                <p className="font-medium text-red-800 dark:text-red-200">
                  {index + 1}. {error.message}
                </p>
                <dl className="mt-3 grid gap-2 text-xs sm:grid-cols-[7rem_1fr]">
                  <dt className="font-semibold text-gray-600 dark:text-gray-400">Instance path</dt>
                  <dd className="min-w-0 break-all font-mono text-gray-900 dark:text-gray-100">
                    {error.instancePath || '(root)'}
                  </dd>
                  <dt className="font-semibold text-gray-600 dark:text-gray-400">Schema path</dt>
                  <dd className="min-w-0 break-all font-mono text-gray-900 dark:text-gray-100">
                    {error.schemaPath}
                  </dd>
                  <dt className="font-semibold text-gray-600 dark:text-gray-400">Keyword</dt>
                  <dd className="min-w-0 break-all font-mono text-gray-900 dark:text-gray-100">
                    {error.keyword}
                  </dd>
                  <dt className="font-semibold text-gray-600 dark:text-gray-400">Message</dt>
                  <dd className="min-w-0 break-words text-gray-900 dark:text-gray-100">
                    {error.message}
                  </dd>
                  {Object.keys(error.params).length > 0 && (
                    <>
                      <dt className="font-semibold text-gray-600 dark:text-gray-400">Details</dt>
                      <dd className="min-w-0 break-all font-mono text-gray-900 dark:text-gray-100">
                        {JSON.stringify(error.params)}
                      </dd>
                    </>
                  )}
                </dl>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
