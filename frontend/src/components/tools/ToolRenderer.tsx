'use client';

import dynamic from 'next/dynamic';

const Loading = () => (
  <div className="flex items-center justify-center py-10 text-sm text-gray-500 dark:text-gray-400">
    Loading tool...
  </div>
);

const toolComponents = {
  'json-formatter': dynamic(() => import('./JsonFormatterTool'), { loading: Loading, ssr: false }),
  'json-validator': dynamic(() => import('./JsonValidatorTool'), { loading: Loading, ssr: false }),
  'json-csv': dynamic(() => import('./JsonCsvConverterTool'), { loading: Loading, ssr: false }),
  'json-to-typescript': dynamic(() => import('./JsonToTypescriptTool'), { loading: Loading, ssr: false }),
  'yaml-json': dynamic(() => import('./YamlJsonConverterTool'), { loading: Loading, ssr: false }),
  'base64': dynamic(() => import('./Base64Tool'), { loading: Loading, ssr: false }),
  'url-encoder': dynamic(() => import('./UrlEncoderTool'), { loading: Loading, ssr: false }),
  'jwt-decoder': dynamic(() => import('./JwtDecoderTool'), { loading: Loading, ssr: false }),
  'html-entity': dynamic(() => import('./HtmlEntityTool'), { loading: Loading, ssr: false }),
  'image-to-base64': dynamic(() => import('./ImageToBase64Tool'), { loading: Loading, ssr: false }),
  'uuid-generator': dynamic(() => import('./UuidGeneratorTool'), { loading: Loading, ssr: false }),
  'password-generator': dynamic(() => import('./PasswordGeneratorTool'), { loading: Loading, ssr: false }),
  'lorem-ipsum': dynamic(() => import('./LoremIpsumTool'), { loading: Loading, ssr: false }),
  'qr-code': dynamic(() => import('./QrCodeGeneratorTool'), { loading: Loading, ssr: false }),
  'slug-generator': dynamic(() => import('./SlugGeneratorTool'), { loading: Loading, ssr: false }),
  'css-gradient': dynamic(() => import('./CssGradientGeneratorTool'), { loading: Loading, ssr: false }),
  'meta-tags': dynamic(() => import('./MetaTagsGeneratorTool'), { loading: Loading, ssr: false }),
  'md5-hash': dynamic(() => import('./Md5HashTool'), { loading: Loading, ssr: false }),
  'sha256-hash': dynamic(() => import('./Sha256HashTool'), { loading: Loading, ssr: false }),
  'regex-tester': dynamic(() => import('./RegexTesterTool'), { loading: Loading, ssr: false }),
  'text-diff': dynamic(() => import('./TextDiffTool'), { loading: Loading, ssr: false }),
  'markdown-preview': dynamic(() => import('./MarkdownPreviewTool'), { loading: Loading, ssr: false }),
  'timestamp-converter': dynamic(() => import('./TimestampConverterTool'), { loading: Loading, ssr: false }),
  'color-converter': dynamic(() => import('./ColorConverterTool'), { loading: Loading, ssr: false }),
  'sql-formatter': dynamic(() => import('./SqlFormatterTool'), { loading: Loading, ssr: false }),
  'css-minifier': dynamic(() => import('./CssMinifierTool'), { loading: Loading, ssr: false }),
  'js-minifier': dynamic(() => import('./JsMinifierTool'), { loading: Loading, ssr: false }),
  'cron-parser': dynamic(() => import('./CronParserTool'), { loading: Loading, ssr: false }),
} as const;

type ToolSlug = keyof typeof toolComponents;

export default function ToolRenderer({ toolSlug }: { toolSlug: string }) {
  const Component = toolComponents[toolSlug as ToolSlug];

  if (!Component) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">
        Tool component not found.
      </div>
    );
  }

  return <Component />;
}
