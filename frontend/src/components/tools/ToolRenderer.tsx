'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import { isToolSlug, type ToolSlug } from '@/lib/api';

const Loading = () => (
  <div className="flex items-center justify-center py-10 text-sm text-gray-500 dark:text-gray-400">
    Loading tool...
  </div>
);

const toolComponents = {
  'json-formatter': dynamic(() => import('./JsonFormatterTool'), { loading: Loading, ssr: false }),
  'json-validator': dynamic(() => import('./JsonValidatorTool'), { loading: Loading, ssr: false }),
  'json-schema-validator': dynamic(() => import('./JsonSchemaValidatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-csv': dynamic(() => import('./JsonCsvConverterTool'), { loading: Loading, ssr: false }),
  'json-to-typescript': dynamic(() => import('./JsonToTypescriptTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-zod': dynamic(() => import('./JsonToZodTool'), { loading: Loading, ssr: false }),
  'json-diff-patch': dynamic(() => import('./JsonDiffPatchTool'), { loading: Loading, ssr: false }),
  'yaml-json': dynamic(() => import('./YamlJsonConverterTool'), { loading: Loading, ssr: false }),
  base64: dynamic(() => import('./Base64Tool'), { loading: Loading, ssr: false }),
  'url-encoder': dynamic(() => import('./UrlEncoderTool'), { loading: Loading, ssr: false }),
  'hex-encoder': dynamic(() => import('./HexEncoderTool'), { loading: Loading, ssr: false }),
  'binary-encoder': dynamic(() => import('./BinaryEncoderTool'), { loading: Loading, ssr: false }),
  'jwt-decoder': dynamic(() => import('./JwtDecoderTool'), { loading: Loading, ssr: false }),
  'html-entity': dynamic(() => import('./HtmlEntityTool'), { loading: Loading, ssr: false }),
  'unicode-escape': dynamic(() => import('./UnicodeEscapeTool'), { loading: Loading, ssr: false }),
  'json-string-escape': dynamic(() => import('./JsonStringEscapeTool'), {
    loading: Loading,
    ssr: false,
  }),
  'image-to-base64': dynamic(() => import('./ImageToBase64Tool'), { loading: Loading, ssr: false }),
  'uuid-generator': dynamic(() => import('./UuidGeneratorTool'), { loading: Loading, ssr: false }),
  'password-generator': dynamic(() => import('./PasswordGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'lorem-ipsum': dynamic(() => import('./LoremIpsumTool'), { loading: Loading, ssr: false }),
  'qr-code': dynamic(() => import('./QrCodeGeneratorTool'), { loading: Loading, ssr: false }),
  'slug-generator': dynamic(() => import('./SlugGeneratorTool'), { loading: Loading, ssr: false }),
  'css-gradient': dynamic(() => import('./CssGradientGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'meta-tags': dynamic(() => import('./MetaTagsGeneratorTool'), { loading: Loading, ssr: false }),
  'md5-hash': dynamic(() => import('./Md5HashTool'), { loading: Loading, ssr: false }),
  'sha256-hash': dynamic(() => import('./Sha256HashTool'), { loading: Loading, ssr: false }),
  'sha512-hash': dynamic(() => import('./Sha512HashTool'), { loading: Loading, ssr: false }),
  'hmac-generator': dynamic(() => import('./HmacGeneratorTool'), { loading: Loading, ssr: false }),
  'bcrypt-generator': dynamic(() => import('./BcryptGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'certificate-decoder': dynamic(() => import('./CertificateDecoderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'pkce-generator': dynamic(() => import('./PkceGeneratorTool'), { loading: Loading, ssr: false }),
  'regex-tester': dynamic(() => import('./RegexTesterTool'), { loading: Loading, ssr: false }),
  'text-diff': dynamic(() => import('./TextDiffTool'), { loading: Loading, ssr: false }),
  'case-converter': dynamic(() => import('./CaseConverterTool'), { loading: Loading, ssr: false }),
  'word-counter': dynamic(() => import('./WordCounterTool'), { loading: Loading, ssr: false }),
  'remove-duplicates': dynamic(() => import('./RemoveDuplicatesTool'), {
    loading: Loading,
    ssr: false,
  }),
  'sort-lines': dynamic(() => import('./SortLinesTool'), { loading: Loading, ssr: false }),
  'markdown-preview': dynamic(() => import('./MarkdownPreviewTool'), {
    loading: Loading,
    ssr: false,
  }),
  'timestamp-converter': dynamic(() => import('./TimestampConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'color-converter': dynamic(() => import('./ColorConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'color-contrast-checker': dynamic(() => import('./ColorContrastCheckerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'roman-numeral-converter': dynamic(() => import('./RomanNumeralConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'number-base-converter': dynamic(() => import('./NumberBaseConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'url-parser': dynamic(() => import('./UrlParserTool'), { loading: Loading, ssr: false }),
  'query-string-parser': dynamic(() => import('./QueryStringParserTool'), {
    loading: Loading,
    ssr: false,
  }),
  'env-to-json': dynamic(() => import('./EnvJsonConverterTool'), { loading: Loading, ssr: false }),
  'sql-formatter': dynamic(() => import('./SqlFormatterTool'), { loading: Loading, ssr: false }),
  'css-minifier': dynamic(() => import('./CssMinifierTool'), { loading: Loading, ssr: false }),
  'js-minifier': dynamic(() => import('./JsMinifierTool'), { loading: Loading, ssr: false }),
  'html-formatter': dynamic(() => import('./HtmlFormatterTool'), { loading: Loading, ssr: false }),
  'html-minifier': dynamic(() => import('./HtmlMinifierTool'), { loading: Loading, ssr: false }),
  'xml-formatter': dynamic(() => import('./XmlFormatterTool'), { loading: Loading, ssr: false }),
  'regex-escape': dynamic(() => import('./RegexEscapeTool'), { loading: Loading, ssr: false }),
  'cron-parser': dynamic(() => import('./CronParserTool'), { loading: Loading, ssr: false }),
  'http-headers-parser': dynamic(() => import('./HttpHeadersParserTool'), {
    loading: Loading,
    ssr: false,
  }),
  'http-status-codes': dynamic(() => import('./HttpStatusCodesTool'), {
    loading: Loading,
    ssr: false,
  }),
  'user-agent-parser': dynamic(() => import('./UserAgentParserTool'), {
    loading: Loading,
    ssr: false,
  }),
  'cidr-calculator': dynamic(() => import('./CidrCalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-pointer': dynamic(() => import('./JsonPointerTool'), { loading: Loading, ssr: false }),
  'chmod-calculator': dynamic(() => import('./ChmodCalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'cache-control': dynamic(() => import('./CacheControlTool'), { loading: Loading, ssr: false }),
  'jsonpath-tester': dynamic(() => import('./JsonPathTool'), { loading: Loading, ssr: false }),
  'csp-builder': dynamic(() => import('./CspBuilderTool'), { loading: Loading, ssr: false }),
  'curl-to-fetch': dynamic(() => import('./CurlRequestTool'), { loading: Loading, ssr: false }),
  'openapi-validator': dynamic(() => import('./OpenApiValidatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'svg-to-jsx': dynamic(() => import('./SvgToJsxTool'), { loading: Loading, ssr: false }),
  'svg-minifier': dynamic(() => import('./SvgMinifierTool'), { loading: Loading, ssr: false }),
  'css-clamp': dynamic(() => import('./CssClampTool'), { loading: Loading, ssr: false }),
  'css-box-shadow': dynamic(() => import('./CssBoxShadowTool'), { loading: Loading, ssr: false }),
  'docker-run-to-compose': dynamic(() => import('./DockerRunToComposeTool'), {
    loading: Loading,
    ssr: false,
  }),
  'cron-generator': dynamic(() => import('./CronGeneratorTool'), { loading: Loading, ssr: false }),
  'json-to-sql': dynamic(() => import('./JsonToSqlTool'), { loading: Loading, ssr: false }),
  'bip39-generator': dynamic(() => import('./Bip39GeneratorTool'), { loading: Loading, ssr: false }),
  'dmarc-generator': dynamic(() => import('./DmarcGeneratorTool'), { loading: Loading, ssr: false }),
  'json-to-models': dynamic(() => import('./JsonToModelsTool'), { loading: Loading, ssr: false }),
} as const satisfies Record<ToolSlug, ComponentType>;

export const toolComponentSlugs = Object.keys(toolComponents) as ToolSlug[];

export default function ToolRenderer({ toolSlug }: { toolSlug: string }) {
  if (!isToolSlug(toolSlug)) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">
        Tool component not found.
      </div>
    );
  }

  const Component = toolComponents[toolSlug];
  return <Component />;
}
