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
  'px-to-rem': dynamic(() => import('./PxToRemTool'), { loading: Loading, ssr: false }),
  'mock-data-generator': dynamic(() => import('./MockDataGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'csv-to-markdown': dynamic(() => import('./CsvToMarkdownTool'), { loading: Loading, ssr: false }),
  'curl-to-code': dynamic(() => import('./CurlToCodeTool'), { loading: Loading, ssr: false }),
  'rsa-key-pair-generator': dynamic(() => import('./RsaKeyPairGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'svg-optimizer': dynamic(() => import('./SvgOptimizerTool'), { loading: Loading, ssr: false }),
  'html-table-to-json': dynamic(() => import('./HtmlTableToJsonTool'), {
    loading: Loading,
    ssr: false,
  }),
  'favicon-generator': dynamic(() => import('./FaviconGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'gitignore-generator': dynamic(() => import('./GitignoreGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'htpasswd-generator': dynamic(() => import('./HtpasswdGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'dockerfile-generator': dynamic(() => import('./DockerfileGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-glassmorphism': dynamic(() => import('./CssGlassmorphismTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-grid-generator': dynamic(() => import('./CssGridGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-blob-generator': dynamic(() => import('./CssBlobGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'robots-txt-generator': dynamic(() => import('./RobotsTxtGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'sitemap-generator': dynamic(() => import('./SitemapGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'sql-to-json': dynamic(() => import('./SqlToJsonTool'), {
    loading: Loading,
    ssr: false,
  }),
  'totp-generator': dynamic(() => import('./TotpGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'markdown-table-generator': dynamic(() => import('./MarkdownTableGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'key-code-info': dynamic(() => import('./KeyCodeInfoTool'), {
    loading: Loading,
    ssr: false,
  }),
  'aspect-ratio-calculator': dynamic(() => import('./AspectRatioCalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'base64-to-image': dynamic(() => import('./Base64ToImageTool'), {
    loading: Loading,
    ssr: false,
  }),
  'html-to-markdown': dynamic(() => import('./HtmlToMarkdownTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-triangle-generator': dynamic(() => import('./CssTriangleGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'svg-placeholder-generator': dynamic(() => import('./SvgPlaceholderGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-flexbox-generator': dynamic(() => import('./CssFlexboxGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'open-graph-previewer': dynamic(() => import('./OpenGraphPreviewerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'ascii-art-generator': dynamic(() => import('./AsciiArtGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-animation-generator': dynamic(() => import('./CssAnimationGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'markdown-to-html': dynamic(() => import('./MarkdownToHtmlTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-text-shadow': dynamic(() => import('./CssTextShadowTool'), {
    loading: Loading,
    ssr: false,
  }),
  'time-duration-calculator': dynamic(() => import('./TimeDurationCalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'xml-to-json': dynamic(() => import('./XmlToJsonConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'list-to-sql-in': dynamic(() => import('./ListToSqlInTool'), {
    loading: Loading,
    ssr: false,
  }),
  'svg-to-png': dynamic(() => import('./SvgToPngConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'ip-subnet-calculator': dynamic(() => import('./IpSubnetCalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-filter-generator': dynamic(() => import('./CssFilterGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'bcrypt-verifier': dynamic(() => import('./BcryptVerifierTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-border-radius': dynamic(() => import('./CssBorderRadiusTool'), {
    loading: Loading,
    ssr: false,
  }),
  'jwt-generator': dynamic(() => import('./JwtGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'ulid-generator': dynamic(() => import('./UlidGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'curl-builder': dynamic(() => import('./CurlBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'base64-to-pdf': dynamic(() => import('./Base64ToPdfTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-neumorphism': dynamic(() => import('./CssNeumorphismTool'), {
    loading: Loading,
    ssr: false,
  }),
  'string-byte-counter': dynamic(() => import('./StringByteCounterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-mesh-gradient': dynamic(() => import('./CssMeshGradientTool'), {
    loading: Loading,
    ssr: false,
  }),
  'html-to-jsx': dynamic(() => import('./HtmlToJsxTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-clip-path': dynamic(() => import('./CssClipPathTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-scrollbar-generator': dynamic(() => import('./CssScrollbarTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-pattern-generator': dynamic(() => import('./CssPatternTool'), {
    loading: Loading,
    ssr: false,
  }),
  'svg-path-visualizer': dynamic(() => import('./SvgPathVisualizerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'color-palette-generator': dynamic(() => import('./ColorPaletteTool'), {
    loading: Loading,
    ssr: false,
  }),
  'csv-to-sql-insert': dynamic(() => import('./CsvToSqlInsertTool'), {
    loading: Loading,
    ssr: false,
  }),
  'sql-minifier': dynamic(() => import('./SqlMinifierTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-graphql': dynamic(() => import('./JsonToGraphqlTool'), {
    loading: Loading,
    ssr: false,
  }),
  'tsv-to-json': dynamic(() => import('./TsvToJsonTool'), {
    loading: Loading,
    ssr: false,
  }),
  'ndjson-to-json': dynamic(() => import('./NdjsonToJsonTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-size-analyzer': dynamic(() => import('./JsonSizeAnalyzerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'hex-to-base64': dynamic(() => import('./HexToBase64Tool'), {
    loading: Loading,
    ssr: false,
  }),
  'punycode-converter': dynamic(() => import('./PunycodeConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'morse-code-converter': dynamic(() => import('./MorseCodeTool'), {
    loading: Loading,
    ssr: false,
  }),
  'base32-encoder': dynamic(() => import('./Base32EncoderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'password-strength-analyzer': dynamic(() => import('./PasswordStrengthTool'), {
    loading: Loading,
    ssr: false,
  }),
  'semver-calculator': dynamic(() => import('./SemverCalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'ipv6-subnet-calculator': dynamic(() => import('./Ipv6SubnetTool'), {
    loading: Loading,
    ssr: false,
  }),
  'mac-address-generator': dynamic(() => import('./MacAddressTool'), {
    loading: Loading,
    ssr: false,
  }),
  'crontab-descriptor': dynamic(() => import('./CrontabDescriptorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'htaccess-to-nginx': dynamic(() => import('./HtaccessToNginxTool'), {
    loading: Loading,
    ssr: false,
  }),
  'dns-record-generator': dynamic(() => import('./DnsRecordTool'), {
    loading: Loading,
    ssr: false,
  }),
  'slug-to-title': dynamic(() => import('./SlugToTitleTool'), {
    loading: Loading,
    ssr: false,
  }),
  'text-obfuscator': dynamic(() => import('./TextObfuscatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'csv-column-extractor': dynamic(() => import('./CsvColumnExtractorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'sql-to-typescript': dynamic(() => import('./SqlToTypescriptTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-env': dynamic(() => import('./JsonToEnvTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-minifier': dynamic(() => import('./JsonMinifierTool'), {
    loading: Loading,
    ssr: false,
  }),
  'markdown-table-to-csv': dynamic(() => import('./MarkdownTableToCsvTool'), {
    loading: Loading,
    ssr: false,
  }),
  'llm-token-counter': dynamic(() => import('./LlmTokenCounterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'openai-function-schema': dynamic(() => import('./OpenaiFunctionSchemaTool'), {
    loading: Loading,
    ssr: false,
  }),
  'prompt-template-formatter': dynamic(() => import('./PromptTemplateFormatterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'embedding-similarity': dynamic(() => import('./EmbeddingSimilarityTool'), {
    loading: Loading,
    ssr: false,
  }),
  'text-chunk-splitter': dynamic(() => import('./TextChunkSplitterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'jsonl-dataset-validator': dynamic(() => import('./JsonlDatasetValidatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'prompt-format-converter': dynamic(() => import('./PromptFormatConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'sampling-curve-visualizer': dynamic(() => import('./SamplingCurveVisualizerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'system-prompt-formatter': dynamic(() => import('./SystemPromptFormatterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'prompt-diff': dynamic(() => import('./PromptDiffTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-to-tailwind': dynamic(() => import('./CssToTailwindTool'), {
    loading: Loading,
    ssr: false,
  }),
  'tailwind-to-css': dynamic(() => import('./TailwindToCssTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-specificity-calculator': dynamic(() => import('./CssSpecificityCalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-keyframes-generator': dynamic(() => import('./CssKeyframesGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'tailwind-class-sorter': dynamic(() => import('./TailwindClassSorterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'fluid-typography': dynamic(() => import('./FluidTypographyTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-media-query-builder': dynamic(() => import('./CssMediaQueryBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-grid-area-builder': dynamic(() => import('./CssGridAreaBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-cubic-bezier': dynamic(() => import('./CssCubicBezierTool'), {
    loading: Loading,
    ssr: false,
  }),
  'color-harmony-generator': dynamic(() => import('./ColorHarmonyGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-pydantic': dynamic(() => import('./JsonToPydanticTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-rust-serde': dynamic(() => import('./JsonToRustSerdeTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-swift': dynamic(() => import('./JsonToSwiftTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-kotlin': dynamic(() => import('./JsonToKotlinTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-csharp': dynamic(() => import('./JsonToCsharpTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-java-pojo': dynamic(() => import('./JsonToJavaPojoTool'), {
    loading: Loading,
    ssr: false,
  }),
  'typescript-to-json-schema': dynamic(() => import('./TypescriptToJsonSchemaTool'), {
    loading: Loading,
    ssr: false,
  }),
  'yaml-to-typescript': dynamic(() => import('./YamlToTypescriptTool'), {
    loading: Loading,
    ssr: false,
  }),
  'graphql-to-typescript': dynamic(() => import('./GraphqlToTypescriptTool'), {
    loading: Loading,
    ssr: false,
  }),
  'protobuf-to-json': dynamic(() => import('./ProtobufToJsonTool'), {
    loading: Loading,
    ssr: false,
  }),
  'sql-to-mongodb': dynamic(() => import('./SqlToMongodbTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-sql-ddl': dynamic(() => import('./JsonToSqlDdlTool'), {
    loading: Loading,
    ssr: false,
  }),
  'sql-explainer': dynamic(() => import('./SqlExplainerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'postgres-connection-builder': dynamic(() => import('./PostgresConnectionBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'redis-command-generator': dynamic(() => import('./RedisCommandGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'csv-to-parquet-schema': dynamic(() => import('./CsvToParquetSchemaTool'), {
    loading: Loading,
    ssr: false,
  }),
  'mongodb-objectid-parser': dynamic(() => import('./MongodbObjectIdParserTool'), {
    loading: Loading,
    ssr: false,
  }),
  'sql-index-advisor': dynamic(() => import('./SqlIndexAdvisorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'postgres-to-mysql': dynamic(() => import('./PostgresToMysqlTool'), {
    loading: Loading,
    ssr: false,
  }),
  'prisma-to-sql': dynamic(() => import('./PrismaToSqlTool'), {
    loading: Loading,
    ssr: false,
  }),
  'docker-compose-to-k8s': dynamic(() => import('./DockerComposeToK8sTool'), {
    loading: Loading,
    ssr: false,
  }),
  'nginx-formatter': dynamic(() => import('./NginxFormatterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'terraform-formatter': dynamic(() => import('./TerraformFormatterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'kubeconfig-validator': dynamic(() => import('./KubeconfigValidatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'helm-values-evaluator': dynamic(() => import('./HelmValuesEvaluatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'dockerfile-linter': dynamic(() => import('./DockerfileLinterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'systemd-unit-generator': dynamic(() => import('./SystemdUnitGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'caddy-to-nginx': dynamic(() => import('./CaddyToNginxTool'), {
    loading: Loading,
    ssr: false,
  }),
  'aws-iam-policy-builder': dynamic(() => import('./AwsIamPolicyBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'prometheus-alert-builder': dynamic(() => import('./PrometheusAlertBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'websocket-tester': dynamic(() => import('./WebsocketTesterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'curl-to-postman': dynamic(() => import('./CurlToPostmanTool'), {
    loading: Loading,
    ssr: false,
  }),
  'ssl-certificate-inspector': dynamic(() => import('./SslCertificateInspectorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'csr-generator': dynamic(() => import('./CsrGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'sse-stream-tester': dynamic(() => import('./SseStreamTesterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'graphql-query-formatter': dynamic(() => import('./GraphqlQueryFormatterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'har-viewer': dynamic(() => import('./HarViewerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'dns-lookup-simulator': dynamic(() => import('./DnsLookupSimulatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'http-wire-format': dynamic(() => import('./HttpWireFormatTool'), {
    loading: Loading,
    ssr: false,
  }),
  'webhook-signature-verifier': dynamic(() => import('./WebhookSignatureVerifierTool'), {
    loading: Loading,
    ssr: false,
  }),
  'uuid-v7-generator': dynamic(() => import('./UuidV7GeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'nanoid-generator': dynamic(() => import('./NanoidGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'base58-encoder': dynamic(() => import('./Base58EncoderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'ssh-key-inspector': dynamic(() => import('./SshKeyInspectorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'pgp-key-inspector': dynamic(() => import('./PgpKeyInspectorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'api-key-generator': dynamic(() => import('./ApiKeyGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'jwt-signature-validator': dynamic(() => import('./JwtSignatureValidatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'aes-crypto-playground': dynamic(() => import('./AesCryptoPlaygroundTool'), {
    loading: Loading,
    ssr: false,
  }),
  'bip39-seed-deriver': dynamic(() => import('./Bip39SeedDeriverTool'), {
    loading: Loading,
    ssr: false,
  }),
  'argon2-hash-generator': dynamic(() => import('./Argon2HashGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'android-manifest-builder': dynamic(() => import('./AndroidManifestBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'ios-plist-builder': dynamic(() => import('./IosPlistBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'app-icon-resizer': dynamic(() => import('./AppIconResizerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'universal-links-validator': dynamic(() => import('./UniversalLinksValidatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'flutter-theme-generator': dynamic(() => import('./FlutterThemeGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'xcode-asset-catalog': dynamic(() => import('./XcodeAssetCatalogTool'), {
    loading: Loading,
    ssr: false,
  }),
  'android-keystore-fingerprint': dynamic(() => import('./AndroidKeystoreFingerprintTool'), {
    loading: Loading,
    ssr: false,
  }),
  'electron-config-builder': dynamic(() => import('./ElectronConfigBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'react-native-icon-finder': dynamic(() => import('./ReactNativeIconFinderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'capacitor-config-builder': dynamic(() => import('./CapacitorConfigBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'code-side-by-side-diff': dynamic(() => import('./CodeSideBySideDiffTool'), {
    loading: Loading,
    ssr: false,
  }),
  'conventional-commit-builder': dynamic(() => import('./ConventionalCommitBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'git-command-builder': dynamic(() => import('./GitCommandBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'env-sanitizer': dynamic(() => import('./EnvSanitizerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'license-generator': dynamic(() => import('./LicenseGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'eslint-prettier-config': dynamic(() => import('./EslintPrettierConfigTool'), {
    loading: Loading,
    ssr: false,
  }),
  'markdown-to-slides': dynamic(() => import('./MarkdownToSlidesTool'), {
    loading: Loading,
    ssr: false,
  }),
  'package-json-formatter': dynamic(() => import('./PackageJsonFormatterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'changelog-generator': dynamic(() => import('./ChangelogGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'editorconfig-generator': dynamic(() => import('./EditorconfigGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'ieee754-visualizer': dynamic(() => import('./Ieee754VisualizerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'bitwise-calculator': dynamic(() => import('./BitwiseCalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'hex-dump-viewer': dynamic(() => import('./HexDumpViewerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'bignumber-calculator': dynamic(() => import('./BignumberCalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'multi-radix-converter': dynamic(() => import('./MultiRadixConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'timezone-meeting-planner': dynamic(() => import('./TimezoneMeetingPlannerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'bandwidth-calculator': dynamic(() => import('./BandwidthCalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'percentage-growth-calculator': dynamic(() => import('./PercentageGrowthCalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'cron-timezone-converter': dynamic(() => import('./CronTimezoneConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'matrix-calculator': dynamic(() => import('./MatrixCalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
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
