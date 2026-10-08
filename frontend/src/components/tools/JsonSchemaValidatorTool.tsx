'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState, type FormEvent } from 'react';
import { AlertTriangle, CheckCircle2, FileJson2, Play, Trash2, XCircle } from 'lucide-react';
import {
  JSON_SCHEMA_INPUT_LIMITS,
  validateJsonSchema,
  type JsonSchemaValidationErrorSource,
  type JsonSchemaValidationResult,
} from '@/lib/jsonSchemaValidator';
import { readTransferredInput } from '@/lib/toolWorkflow';

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
  const { t } = useLanguage();
  const [documentSource, setDocumentSource] = useState('');
  const [schemaSource, setSchemaSource] = useState('');
  const [result, setResult] = useState<JsonSchemaValidationResult | null>(null);

  useEffect(() => {
    const transferred = readTransferredInput(window.location.hash);
    if (!transferred) return;

    if (transferred.dataType === 'json-schema') {
      setSchemaSource(transferred.value);
    } else {
      setDocumentSource(transferred.value);
    }
  }, []);

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
          {t("toolName.json-schema-validator")}</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {t("uiText.063fba9b")}</p>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {t("uiText.66933d20")}</p>
      </div>

      <form onSubmit={runValidation} noValidate>
        <div className="mb-5 flex flex-wrap gap-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            <Play aria-hidden="true" className="h-4 w-4" />
            {t("common.validate")}</button>
          <button
            type="button"
            onClick={loadSample}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <FileJson2 aria-hidden="true" className="h-4 w-4" />
            {t("uiText.c8e1acb9")}</button>
          <button
            type="button"
            onClick={clear}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <Trash2 aria-hidden="true" className="h-4 w-4" />
            {t("common.clear")}</button>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <label
              htmlFor="json-schema-document"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("tool.jsonpath.documentLabel")}</label>
            <p
              id="json-schema-document-help"
              className="mt-1 text-xs text-gray-500 dark:text-gray-400"
            >
              {t("uiText.e9adf71e")}</p>
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
              {t("uiText.b3b1a59a")}</label>
            <p
              id="json-schema-schema-help"
              className="mt-1 text-xs text-gray-500 dark:text-gray-400"
            >
              {t("uiText.08d798ef")}</p>
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
            <h3 className="font-semibold">{t("uiText.e7ea043e")}</h3>
            <p className="mt-1 text-sm">
              {t("uiText.0ad4148a")}</p>
          </div>
        </div>
      )}

      {result && result.warnings.length > 0 && (
        <div
          role="status"
          aria-live="polite"
          className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200"
        >
          <h3 className="font-semibold">{t("uiText.c26c5ee7")}</h3>
          <p className="mt-1 text-sm">
            {t("uiText.8f33ef21")}</p>
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
              <h3 className="font-semibold">{t("uiText.a6f7bbcf")}</h3>
              <p className="mt-1 text-sm">
                {t("uiText.0abaed3f")}{result.errors.length} {' ' + t("uiText.527d0336")}{' '}
                {result.errors.length === 1 ? t("uiText.21918751") : t("uiText.fa17ba86")}.
              </p>
            </div>
          </div>

          <ol aria-label={t("uiText.f7574688")} className="mt-4 space-y-3">
            {result.errors.map((error, index) => (
              <li
                key={`${error.instancePath}-${error.schemaPath}-${error.keyword}-${index}`}
                className="rounded-lg border border-red-200 bg-white p-4 dark:border-red-800 dark:bg-gray-900"
              >
                <p className="font-medium text-red-800 dark:text-red-200">
                  {index + 1}. {error.message}
                </p>
                <dl className="mt-3 grid gap-2 text-xs sm:grid-cols-[7rem_1fr]">
                  <dt className="font-semibold text-gray-600 dark:text-gray-400">{t("uiText.c3d29dbd")}</dt>
                  <dd className="min-w-0 break-all font-mono text-gray-900 dark:text-gray-100">
                    {error.instancePath || t("uiText.1d151a16")}
                  </dd>
                  <dt className="font-semibold text-gray-600 dark:text-gray-400">{t("uiText.acafa2a1")}</dt>
                  <dd className="min-w-0 break-all font-mono text-gray-900 dark:text-gray-100">
                    {error.schemaPath}
                  </dd>
                  <dt className="font-semibold text-gray-600 dark:text-gray-400">{t("uiText.cde1c7a4")}</dt>
                  <dd className="min-w-0 break-all font-mono text-gray-900 dark:text-gray-100">
                    {error.keyword}
                  </dd>
                  <dt className="font-semibold text-gray-600 dark:text-gray-400">{t("contact.message")}</dt>
                  <dd className="min-w-0 break-words text-gray-900 dark:text-gray-100">
                    {error.message}
                  </dd>
                  {Object.keys(error.params).length > 0 && (
                    <>
                      <dt className="font-semibold text-gray-600 dark:text-gray-400">{t("uiText.0ec24245")}</dt>
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
