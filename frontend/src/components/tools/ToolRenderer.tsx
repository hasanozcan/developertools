'use client';
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import { isToolSlug, type ToolSlug } from '@/lib/api';

const Loading = () => (
  <div className="flex items-center justify-center p-8">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
  </div>
);

const toolComponents: Record<ToolSlug, ComponentType> = {
  'json-formatter': dynamic(() => import('./JsonFormatterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-validator': dynamic(() => import('./JsonValidatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-schema-validator': dynamic(() => import('./JsonSchemaValidatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-csv': dynamic(() => import('./JsonCsvConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-typescript': dynamic(() => import('./JsonToTypescriptTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-zod': dynamic(() => import('./JsonToZodTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-diff-patch': dynamic(() => import('./JsonDiffPatchTool'), {
    loading: Loading,
    ssr: false,
  }),
  'yaml-json': dynamic(() => import('./YamlJsonConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'url-encoder': dynamic(() => import('./UrlEncoderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'hex-encoder': dynamic(() => import('./HexEncoderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'binary-encoder': dynamic(() => import('./BinaryEncoderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'jwt-decoder': dynamic(() => import('./JwtDecoderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'html-entity': dynamic(() => import('./HtmlEntityTool'), {
    loading: Loading,
    ssr: false,
  }),
  'unicode-escape': dynamic(() => import('./UnicodeEscapeTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-string-escape': dynamic(() => import('./JsonStringEscapeTool'), {
    loading: Loading,
    ssr: false,
  }),
  'image-to-base64': dynamic(() => import('./ImageToBase64Tool'), {
    loading: Loading,
    ssr: false,
  }),
  'uuid-generator': dynamic(() => import('./UuidGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'password-generator': dynamic(() => import('./PasswordGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'lorem-ipsum': dynamic(() => import('./LoremIpsumTool'), {
    loading: Loading,
    ssr: false,
  }),
  'qr-code': dynamic(() => import('./QrCodeGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'slug-generator': dynamic(() => import('./SlugGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-gradient': dynamic(() => import('./CssGradientGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'meta-tags': dynamic(() => import('./MetaTagsGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'md5-hash': dynamic(() => import('./Md5HashTool'), {
    loading: Loading,
    ssr: false,
  }),
  'sha256-hash': dynamic(() => import('./Sha256HashTool'), {
    loading: Loading,
    ssr: false,
  }),
  'sha512-hash': dynamic(() => import('./Sha512HashTool'), {
    loading: Loading,
    ssr: false,
  }),
  'hmac-generator': dynamic(() => import('./HmacGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'bcrypt-generator': dynamic(() => import('./BcryptGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'certificate-decoder': dynamic(() => import('./CertificateDecoderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'pkce-generator': dynamic(() => import('./PkceGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'regex-tester': dynamic(() => import('./RegexTesterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'text-diff': dynamic(() => import('./TextDiffTool'), {
    loading: Loading,
    ssr: false,
  }),
  'case-converter': dynamic(() => import('./CaseConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'word-counter': dynamic(() => import('./WordCounterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'remove-duplicates': dynamic(() => import('./RemoveDuplicatesTool'), {
    loading: Loading,
    ssr: false,
  }),
  'sort-lines': dynamic(() => import('./SortLinesTool'), {
    loading: Loading,
    ssr: false,
  }),
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
  'url-parser': dynamic(() => import('./UrlParserTool'), {
    loading: Loading,
    ssr: false,
  }),
  'query-string-parser': dynamic(() => import('./QueryStringParserTool'), {
    loading: Loading,
    ssr: false,
  }),
  'env-to-json': dynamic(() => import('./EnvJsonConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'sql-formatter': dynamic(() => import('./SqlFormatterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-minifier': dynamic(() => import('./CssMinifierTool'), {
    loading: Loading,
    ssr: false,
  }),
  'js-minifier': dynamic(() => import('./JsMinifierTool'), {
    loading: Loading,
    ssr: false,
  }),
  'html-formatter': dynamic(() => import('./HtmlFormatterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'html-minifier': dynamic(() => import('./HtmlMinifierTool'), {
    loading: Loading,
    ssr: false,
  }),
  'xml-formatter': dynamic(() => import('./XmlFormatterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'regex-escape': dynamic(() => import('./RegexEscapeTool'), {
    loading: Loading,
    ssr: false,
  }),
  'cron-parser': dynamic(() => import('./CronParserTool'), {
    loading: Loading,
    ssr: false,
  }),
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
  'json-pointer': dynamic(() => import('./JsonPointerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'chmod-calculator': dynamic(() => import('./ChmodCalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'cache-control': dynamic(() => import('./CacheControlTool'), {
    loading: Loading,
    ssr: false,
  }),
  'jsonpath-tester': dynamic(() => import('./JsonPathTool'), {
    loading: Loading,
    ssr: false,
  }),
  'csp-builder': dynamic(() => import('./CspBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'curl-to-fetch': dynamic(() => import('./CurlRequestTool'), {
    loading: Loading,
    ssr: false,
  }),
  'openapi-validator': dynamic(() => import('./OpenApiValidatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'svg-to-jsx': dynamic(() => import('./SvgToJsxTool'), {
    loading: Loading,
    ssr: false,
  }),
  'svg-minifier': dynamic(() => import('./SvgMinifierTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-clamp': dynamic(() => import('./CssClampTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-box-shadow': dynamic(() => import('./CssBoxShadowTool'), {
    loading: Loading,
    ssr: false,
  }),
  'docker-run-to-compose': dynamic(() => import('./DockerRunToComposeTool'), {
    loading: Loading,
    ssr: false,
  }),
  'cron-generator': dynamic(() => import('./CronGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-sql': dynamic(() => import('./JsonToSqlTool'), {
    loading: Loading,
    ssr: false,
  }),
  'bip39-generator': dynamic(() => import('./Bip39GeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'dmarc-generator': dynamic(() => import('./DmarcGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-models': dynamic(() => import('./JsonToModelsTool'), {
    loading: Loading,
    ssr: false,
  }),
  'px-to-rem': dynamic(() => import('./PxToRemTool'), {
    loading: Loading,
    ssr: false,
  }),
  'mock-data-generator': dynamic(() => import('./MockDataGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'csv-to-markdown': dynamic(() => import('./CsvToMarkdownTool'), {
    loading: Loading,
    ssr: false,
  }),
  'curl-to-code': dynamic(() => import('./CurlToCodeTool'), {
    loading: Loading,
    ssr: false,
  }),
  'rsa-key-pair-generator': dynamic(() => import('./RsaKeyPairGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'svg-optimizer': dynamic(() => import('./SvgOptimizerTool'), {
    loading: Loading,
    ssr: false,
  }),
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
  'json-to-rust-types': dynamic(() => import('./JsonToRustSerdeTool'), {
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
  'deepseek-token-counter': dynamic(() => import('./DeepseekTokenCounterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'claude-token-counter': dynamic(() => import('./ClaudeTokenCounterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'tiktoken-visualizer': dynamic(() => import('./TiktokenVisualizerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'mcp-inspector': dynamic(() => import('./McpInspectorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'rag-chunking-visualizer': dynamic(() => import('./RagChunkingVisualizerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'cron-next-runs-visualizer': dynamic(() => import('./CronNextRunsVisualizerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'nginx-rate-limit-calculator': dynamic(() => import('./NginxRateLimitCalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'csp-evaluator': dynamic(() => import('./CspEvaluatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'subresource-integrity-generator': dynamic(() => import('./SubresourceIntegrityGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'aspect-ratio-resizer': dynamic(() => import('./AspectRatioResizerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'zod-to-json-schema': dynamic(() => import('./ZodToJsonSchemaTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-schema-to-zod': dynamic(() => import('./JsonSchemaToZodTool'), {
    loading: Loading,
    ssr: false,
  }),
  'svg-to-react-native': dynamic(() => import('./SvgToReactNativeTool'), {
    loading: Loading,
    ssr: false,
  }),
  'postman-to-curl': dynamic(() => import('./PostmanToCurlTool'), {
    loading: Loading,
    ssr: false,
  }),
  'openapi-to-typescript-fetch': dynamic(() => import('./OpenapiToTypescriptFetchTool'), {
    loading: Loading,
    ssr: false,
  }),
  'avro-to-json-schema': dynamic(() => import('./AvroToJsonSchemaTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-graphql-query': dynamic(() => import('./JsonToGraphqlQueryTool'), {
    loading: Loading,
    ssr: false,
  }),
  'har-to-k6': dynamic(() => import('./HarToK6Tool'), {
    loading: Loading,
    ssr: false,
  }),
  'docker-to-compose': dynamic(() => import('./DockerToComposeTool'), {
    loading: Loading,
    ssr: false,
  }),
  'svg-to-webp': dynamic(() => import('./SvgToWebpTool'), {
    loading: Loading,
    ssr: false,
  }),
  'shadcn-theme-generator': dynamic(() => import('./ShadcnThemeGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'tailwind-v4-color-palette': dynamic(() => import('./TailwindV4ColorPaletteTool'), {
    loading: Loading,
    ssr: false,
  }),
  'github-actions-matrix-builder': dynamic(() => import('./GithubActionsMatrixBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'cloudflare-wrangler-builder': dynamic(() => import('./CloudflareWranglerBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'ollama-modelfile-generator': dynamic(() => import('./OllamaModelfileGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'kubernetes-ingress-generator': dynamic(() => import('./KubernetesIngressGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'gitlab-ci-generator': dynamic(() => import('./GitlabCiGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'react-hook-form-generator': dynamic(() => import('./ReactHookFormGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'elasticsearch-query-builder': dynamic(() => import('./ElasticsearchQueryBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'clickhouse-ddl-generator': dynamic(() => import('./ClickhouseDdlGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'mongodb-aggregate-builder': dynamic(() => import('./MongodbAggregateBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'solana-address-validator': dynamic(() => import('./SolanaAddressValidatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'ethereum-keccak256-hasher': dynamic(() => import('./EthereumKeccak256HasherTool'), {
    loading: Loading,
    ssr: false,
  }),
  'abi-encoder-decoder': dynamic(() => import('./AbiEncoderDecoderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'x509-csr-decoder': dynamic(() => import('./X509CsrDecoderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'ed25519-key-generator': dynamic(() => import('./Ed25519KeyGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'totp-authenticator-simulator': dynamic(() => import('./TotpAuthenticatorSimulatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'protobuf-formatter': dynamic(() => import('./ProtobufFormatterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'toml-formatter': dynamic(() => import('./TomlFormatterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'docker-compose-formatter': dynamic(() => import('./DockerComposeFormatterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'apache-conf-formatter': dynamic(() => import('./ApacheConfFormatterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'ai-agent-prompt-optimizer': dynamic(() => import('./AiAgentPromptOptimizerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'sql-slugifier': dynamic(() => import('./SqlSlugifierTool'), {
    loading: Loading,
    ssr: false,
  }),
  'subtitle-srt-vtt-converter': dynamic(() => import('./SubtitleSrtVttConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'base64url-encoder': dynamic(() => import('./Base64urlEncoderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'morse-code-audio-converter': dynamic(() => import('./MorseCodeAudioConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'quoted-printable-encoder': dynamic(() => import('./QuotedPrintableEncoderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-flatten-unflatten': dynamic(() => import('./JsonFlattenUnflattenTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-patch-generator': dynamic(() => import('./JsonPatchGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'base64': dynamic(() => import('./Base64Tool'), {
    loading: Loading,
    ssr: false,
  }),
  'curl-to-python': dynamic(() => import('./CurlToPythonTool'), {
    loading: Loading,
    ssr: false,
  }),
  'curl-to-javascript': dynamic(() => import('./CurlToJavascriptTool'), {
    loading: Loading,
    ssr: false,
  }),
  'curl-to-go': dynamic(() => import('./CurlToGoTool'), {
    loading: Loading,
    ssr: false,
  }),
  'curl-to-rust': dynamic(() => import('./CurlToRustTool'), {
    loading: Loading,
    ssr: false,
  }),
  'curl-to-php': dynamic(() => import('./CurlToPhpTool'), {
    loading: Loading,
    ssr: false,
  }),
  'curl-to-csharp': dynamic(() => import('./CurlToCsharpTool'), {
    loading: Loading,
    ssr: false,
  }),
  'curl-to-java': dynamic(() => import('./CurlToJavaTool'), {
    loading: Loading,
    ssr: false,
  }),
  'curl-to-ai-sdk': dynamic(() => import('./CurlToAiSdkTool'), {
    loading: Loading,
    ssr: false,
  }),
  'openai-structured-outputs': dynamic(() => import('./OpenaiStructuredOutputsTool'), {
    loading: Loading,
    ssr: false,
  }),
  'vercel-ai-core-message-converter': dynamic(() => import('./VercelAiCoreMessageConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'langgraph-state-generator': dynamic(() => import('./LanggraphStateGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'embedding-cost-calculator': dynamic(() => import('./EmbeddingCostCalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'anthropic-tool-builder': dynamic(() => import('./AnthropicToolBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'tailwind-v3-to-v4-migrator': dynamic(() => import('./TailwindV3ToV4MigratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-box-shadow-to-tailwind': dynamic(() => import('./CssBoxShadowToTailwindTool'), {
    loading: Loading,
    ssr: false,
  }),
  'nextjs-metadata-generator': dynamic(() => import('./NextjsMetadataGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'svg-to-css': dynamic(() => import('./SvgToCssTool'), {
    loading: Loading,
    ssr: false,
  }),
  'html-table-converter': dynamic(() => import('./HtmlTableConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'natural-language-to-cron': dynamic(() => import('./NaturalLanguageToCronTool'), {
    loading: Loading,
    ssr: false,
  }),
  'gitignore-tester': dynamic(() => import('./GitignoreTesterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'k8s-resource-calculator': dynamic(() => import('./K8sResourceCalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'terraform-hcl-to-json': dynamic(() => import('./TerraformHclToJsonTool'), {
    loading: Loading,
    ssr: false,
  }),
  'systemd-timer-generator': dynamic(() => import('./SystemdTimerGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'sql-to-prisma': dynamic(() => import('./SqlToPrismaTool'), {
    loading: Loading,
    ssr: false,
  }),
  'sql-to-drizzle': dynamic(() => import('./SqlToDrizzleTool'), {
    loading: Loading,
    ssr: false,
  }),
  'postgres-explain-visualizer': dynamic(() => import('./PostgresExplainVisualizerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'mongodb-to-sql': dynamic(() => import('./MongodbToSqlTool'), {
    loading: Loading,
    ssr: false,
  }),
  'sql-to-django': dynamic(() => import('./SqlToDjangoTool'), {
    loading: Loading,
    ssr: false,
  }),
  'sql-keyword-uppercaser': dynamic(() => import('./SqlKeywordUppercaserTool'), {
    loading: Loading,
    ssr: false,
  }),
  'subnet-calculator': dynamic(() => import('./SubnetCalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'uuid-v5-generator': dynamic(() => import('./UuidV5GeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'bip39-seed-phrase-generator': dynamic(() => import('./Bip39SeedPhraseGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'eip712-hasher': dynamic(() => import('./Eip712HasherTool'), {
    loading: Loading,
    ssr: false,
  }),
  'crypto-unit-converter': dynamic(() => import('./CryptoUnitConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-python-dataclass': dynamic(() => import('./JsonToPythonDataclassTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-golang-models': dynamic(() => import('./JsonToGoStructTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-kotlin-class': dynamic(() => import('./JsonToKotlinClassTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-swift-struct': dynamic(() => import('./JsonToSwiftStructTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-csharp-class': dynamic(() => import('./JsonToCsharpClassTool'), {
    loading: Loading,
    ssr: false,
  }),
  'proto-to-typescript': dynamic(() => import('./ProtoToTypescriptTool'), {
    loading: Loading,
    ssr: false,
  }),
  'http-headers-to-json': dynamic(() => import('./HttpHeadersToJsonTool'), {
    loading: Loading,
    ssr: false,
  }),
  'jwt-builder': dynamic(() => import('./JwtBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'passphrase-wordlist-generator': dynamic(() => import('./PassphraseWordlistGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'nanoid-custom-alphabet': dynamic(() => import('./NanoidCustomAlphabetTool'), {
    loading: Loading,
    ssr: false,
  }),
  'mock-credit-card-generator': dynamic(() => import('./MockCreditCardGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'tailwind-spacing-generator': dynamic(() => import('./TailwindSpacingGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'docker-compose-env-generator': dynamic(() => import('./DockerComposeEnvGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'dns-propagation-checker': dynamic(() => import('./DnsPropagationCheckerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'url-utm-builder': dynamic(() => import('./UrlUtmBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'sha3-hash-generator': dynamic(() => import('./Sha3HashGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'curl-to-axios': dynamic(() => import('./CurlToAxiosTool'), {
    loading: Loading,
    ssr: false,
  }),
  'fetch-to-curl': dynamic(() => import('./FetchToCurlTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-xml': dynamic(() => import('./JsonToXmlTool'), {
    loading: Loading,
    ssr: false,
  }),
  'excel-to-json': dynamic(() => import('./ExcelToJsonTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-excel': dynamic(() => import('./JsonToExcelTool'), {
    loading: Loading,
    ssr: false,
  }),
  'image-converter': dynamic(() => import('./ImageConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'images-to-pdf': dynamic(() => import('./ImagesToPdfTool'), {
    loading: Loading,
    ssr: false,
  }),
  'image-compressor': dynamic(() => import('./ImageCompressorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'image-color-extractor': dynamic(() => import('./ImageColorExtractorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'pdf-merger': dynamic(() => import('./PdfMergerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'pdf-splitter': dynamic(() => import('./PdfSplitterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'llm-pricing-calculator': dynamic(() => import('./LlmPricingCalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'code-playground': dynamic(() => import('./CodePlaygroundTool'), {
    loading: Loading,
    ssr: false,
  }),
  'schema-org-generator': dynamic(() => import('./SchemaOrgGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'image-exif-stripper': dynamic(() => import('./ImageExifStripperTool'), {
    loading: Loading,
    ssr: false,
  }),
  'file-checksum-comparator': dynamic(() => import('./FileChecksumComparatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'video-to-gif': dynamic(() => import('./VideoToGifTool'), {
    loading: Loading,
    ssr: false,
  }),
  'svg-to-png-hd': dynamic(() => import('./SvgToPngTool'), {
    loading: Loading,
    ssr: false,
  }),
  'pdf-to-image': dynamic(() => import('./PdfToImageTool'), {
    loading: Loading,
    ssr: false,
  }),
  'audio-converter': dynamic(() => import('./AudioConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'swagger-to-typescript': dynamic(() => import('./SwaggerToTypescriptTool'), {
    loading: Loading,
    ssr: false,
  }),
  'postman-collection-to-curl': dynamic(() => import('./PostmanToCurlTool'), {
    loading: Loading,
    ssr: false,
  }),
  'html-to-gfm-converter': dynamic(() => import('./HtmlToMarkdownTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-csv-grid-editor': dynamic(() => import('./JsonCsvGridEditorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'tailwind-to-inline-css': dynamic(() => import('./TailwindToInlineCssTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-glassmorphism-claymorphism': dynamic(() => import('./CssGlassmorphismClaymorphismTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-clamp-calculator': dynamic(() => import('./CssClampCalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'llm-function-calling-builder': dynamic(() => import('./LlmFunctionCallingBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-json-schema': dynamic(() => import('./JsonToJsonSchemaTool'), {
    loading: Loading,
    ssr: false,
  }),
  'rag-chunking-calculator': dynamic(() => import('./RagChunkingCalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'sql-to-orm-schema': dynamic(() => import('./SqlToOrmSchemaTool'), {
    loading: Loading,
    ssr: false,
  }),
  'docker-compose-to-kubernetes': dynamic(() => import('./DockerComposeToK8sTool'), {
    loading: Loading,
    ssr: false,
  }),
  'curl-to-har': dynamic(() => import('./CurlToHarTool'), {
    loading: Loading,
    ssr: false,
  }),
  'api-mock-response-generator': dynamic(() => import('./ApiMockResponseGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'http-security-headers-analyzer': dynamic(() => import('./HttpSecurityHeadersAnalyzerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'graphql-schema-to-zod': dynamic(() => import('./GraphqlSchemaToZodTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-triangle-bubble-generator': dynamic(() => import('./CssTriangleBubbleGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'svg-to-css-data-uri': dynamic(() => import('./SvgToCssDataUriTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-3d-box-shadow-generator': dynamic(() => import('./Css3dBoxShadowGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'html-entities-converter': dynamic(() => import('./HtmlEntitiesConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'system-prompt-xml-builder': dynamic(() => import('./SystemPromptXmlBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'multi-llm-token-comparator': dynamic(() => import('./MultiLlmTokenComparatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-python-pydantic': dynamic(() => import('./JsonToPythonPydanticTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-sql-insert': dynamic(() => import('./JsonToSqlInsertTool'), {
    loading: Loading,
    ssr: false,
  }),
  'nginx-to-caddy-converter': dynamic(() => import('./NginxToCaddyConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'git-command-cheat-builder': dynamic(() => import('./GitCommandCheatBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'crontab-schedule-translator': dynamic(() => import('./CrontabScheduleTranslatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'bcrypt-hash-calculator': dynamic(() => import('./BcryptHashCalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-rust-serde': dynamic(() => import('./JsonToRustSerdeTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-go-struct': dynamic(() => import('./JsonToGoStructTool'), {
    loading: Loading,
    ssr: false,
  }),
  'sql-to-go-gorm': dynamic(() => import('./SqlToGoGormTool'), {
    loading: Loading,
    ssr: false,
  }),
  'sql-to-python-sqlalchemy': dynamic(() => import('./SqlToPythonSqlalchemyTool'), {
    loading: Loading,
    ssr: false,
  }),
  'postman-to-openapi': dynamic(() => import('./PostmanToOpenapiTool'), {
    loading: Loading,
    ssr: false,
  }),
  'openapi-to-postman': dynamic(() => import('./OpenapiToPostmanTool'), {
    loading: Loading,
    ssr: false,
  }),
  'protobuf-to-json-schema': dynamic(() => import('./ProtobufToJsonSchemaTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-schema-to-protobuf': dynamic(() => import('./JsonSchemaToProtobufTool'), {
    loading: Loading,
    ssr: false,
  }),
  'yaml-to-terraform-hcl': dynamic(() => import('./YamlToTerraformHclTool'), {
    loading: Loading,
    ssr: false,
  }),
  'terraform-hcl-to-yaml': dynamic(() => import('./TerraformHclToYamlTool'), {
    loading: Loading,
    ssr: false,
  }),
  'csv-to-geojson': dynamic(() => import('./CsvToGeojsonTool'), {
    loading: Loading,
    ssr: false,
  }),
  'geojson-to-csv': dynamic(() => import('./GeojsonToCsvTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-to-typescript-type-guards': dynamic(() => import('./JsonToTypescriptTypeGuardsTool'), {
    loading: Loading,
    ssr: false,
  }),
  'typescript-interface-to-zod': dynamic(() => import('./TypescriptInterfaceToZodTool'), {
    loading: Loading,
    ssr: false,
  }),
  'zod-to-typescript-type': dynamic(() => import('./ZodToTypescriptTypeTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-to-scss': dynamic(() => import('./CssToScssTool'), {
    loading: Loading,
    ssr: false,
  }),
  'scss-to-css': dynamic(() => import('./ScssToCssTool'), {
    loading: Loading,
    ssr: false,
  }),
  'html-to-jsx-tailwind': dynamic(() => import('./HtmlToJsxTailwindTool'), {
    loading: Loading,
    ssr: false,
  }),
  'jsx-to-html': dynamic(() => import('./JsxToHtmlTool'), {
    loading: Loading,
    ssr: false,
  }),
  'markdown-to-bbcode': dynamic(() => import('./MarkdownToBbcodeTool'), {
    loading: Loading,
    ssr: false,
  }),
  'bbcode-to-markdown': dynamic(() => import('./BbcodeToMarkdownTool'), {
    loading: Loading,
    ssr: false,
  }),
  'curl-to-php-guzzle': dynamic(() => import('./CurlToPhpGuzzleTool'), {
    loading: Loading,
    ssr: false,
  }),
  'curl-to-ruby-faraday': dynamic(() => import('./CurlToRubyFaradayTool'), {
    loading: Loading,
    ssr: false,
  }),
  'curl-to-rust-reqwest': dynamic(() => import('./CurlToRustReqwestTool'), {
    loading: Loading,
    ssr: false,
  }),
  'curl-to-go-http': dynamic(() => import('./CurlToGoHttpTool'), {
    loading: Loading,
    ssr: false,
  }),
  'svg-to-android-vector': dynamic(() => import('./SvgToAndroidVectorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'svg-to-swiftui-shape': dynamic(() => import('./SvgToSwiftuiShapeTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-grid-to-tailwind': dynamic(() => import('./CssGridToTailwindTool'), {
    loading: Loading,
    ssr: false,
  }),
  'dockerfile-ai-optimized-generator': dynamic(() => import('./DockerfileAiGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'kubernetes-deployment-generator': dynamic(() => import('./KubernetesDeploymentGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'kubernetes-configmap-secret-builder': dynamic(() => import('./KubernetesConfigmapSecretBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'helm-chart-yaml-generator': dynamic(() => import('./HelmChartYamlGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'gitlab-ci-pipeline-builder': dynamic(() => import('./GitlabCiPipelineBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'github-issue-pr-template-generator': dynamic(() => import('./GithubIssuePrTemplateGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'opa-rego-policy-builder': dynamic(() => import('./OpaRegoPolicyBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'systemd-service-hardened-builder': dynamic(() => import('./SystemdServiceHardenedBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'nginx-security-conf-generator': dynamic(() => import('./NginxSecurityConfGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'caddyfile-production-generator': dynamic(() => import('./CaddyfileProductionGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'prometheus-recording-rules-generator': dynamic(() => import('./PrometheusRecordingRulesGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'tailwind-v4-mesh-gradient-generator': dynamic(() => import('./TailwindV4MeshGradientGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-isometric-grid-generator': dynamic(() => import('./CssIsometricGridGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-ribbon-banner-generator': dynamic(() => import('./CssRibbonBannerGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'svg-wavy-divider-generator': dynamic(() => import('./SvgWavyDividerGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'opengraph-banner-canvas-generator': dynamic(() => import('./OpengraphBannerCanvasGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'prisma-seed-generator': dynamic(() => import('./PrismaSeedGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'faker-js-mock-schema-generator': dynamic(() => import('./FakerJsMockSchemaGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'llm-few-shot-prompt-formatter': dynamic(() => import('./LlmFewShotPromptFormatterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'cot-chain-of-thought-prompt-builder': dynamic(() => import('./CotChainOfThoughtPromptBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'sql-stored-procedure-generator': dynamic(() => import('./SqlStoredProcedureGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'redis-lua-script-generator': dynamic(() => import('./RedisLuaScriptGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'crontab-randomized-generator': dynamic(() => import('./CrontabRandomizedGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'ansible-playbook-scaffolder': dynamic(() => import('./AnsiblePlaybookScaffolderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'terraform-module-scaffolder': dynamic(() => import('./TerraformModuleScaffolderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'http-cache-control-tester': dynamic(() => import('./HttpCacheControlTesterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'dns-soa-dnssec-inspector': dynamic(() => import('./DnsSoaDnssecInspectorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'ip-supernetting-calculator': dynamic(() => import('./IpSupernettingCalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'opengraph-tag-inspector': dynamic(() => import('./OpengraphTagInspectorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'jwt-expiry-calculator': dynamic(() => import('./JwtExpiryCalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'regex-benchmark-simulator': dynamic(() => import('./RegexBenchmarkSimulatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'llm-context-window-shrinker': dynamic(() => import('./LlmContextWindowShrinkerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'embedding-token-cost-estimator': dynamic(() => import('./EmbeddingTokenCostEstimatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'webhook-payload-simulator': dynamic(() => import('./WebhookPayloadSimulatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'network-port-reference': dynamic(() => import('./NetworkPortReferenceTool'), {
    loading: Loading,
    ssr: false,
  }),
  'ssl-tls-handshake-simulator': dynamic(() => import('./SslTlsHandshakeSimulatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'http2-http3-frame-inspector': dynamic(() => import('./Http2Http3FrameInspectorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'dns-spf-record-flattener': dynamic(() => import('./DnsSpfRecordFlattenerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'mime-type-extension-lookup': dynamic(() => import('./MimeTypeExtensionLookupTool'), {
    loading: Loading,
    ssr: false,
  }),
  'color-blindness-simulator': dynamic(() => import('./ColorBlindnessSimulatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'contrast-ratio-apca-calculator': dynamic(() => import('./ContrastRatioApcaCalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'viewport-size-tester': dynamic(() => import('./ViewportSizeTesterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'unicode-glyph-category-inspector': dynamic(() => import('./UnicodeGlyphCategoryInspectorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'seo-robots-noindex-simulator': dynamic(() => import('./SeoRobotsNoindexSimulatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'cors-preflight-inspector': dynamic(() => import('./CorsPreflightInspectorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'css-selector-speed-profiler': dynamic(() => import('./CssSelectorSpeedProfilerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'git-conflict-marker-cleaner': dynamic(() => import('./GitConflictMarkerCleanerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'semver-range-evaluator': dynamic(() => import('./SemverRangeEvaluatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'package-json-license-checker': dynamic(() => import('./PackageJsonLicenseCheckerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'api-rate-limit-cost-calculator': dynamic(() => import('./ApiRateLimitCostCalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'blake3-hash-generator': dynamic(() => import('./Blake3HashGeneratorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'pbkdf2-key-derivation': dynamic(() => import('./Pbkdf2KeyDerivationTool'), {
    loading: Loading,
    ssr: false,
  }),
  'hmac-sha384-sha512-calculator': dynamic(() => import('./HmacSha384Sha512CalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'ethereum-eip191-signature-verifier': dynamic(() => import('./EthereumEip191SignatureVerifierTool'), {
    loading: Loading,
    ssr: false,
  }),
  'bitcoin-bech32-address-encoder': dynamic(() => import('./BitcoinBech32AddressEncoderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'rsa-pkcs1-pkcs8-converter': dynamic(() => import('./RsaPkcs1Pkcs8ConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'x509-san-csr-builder': dynamic(() => import('./X509SanCsrBuilderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'ed25519-sign-verify': dynamic(() => import('./Ed25519SignVerifyTool'), {
    loading: Loading,
    ssr: false,
  }),
  'argon2-parameter-tuner': dynamic(() => import('./Argon2ParameterTunerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'uuid-v7-timestamp-extractor': dynamic(() => import('./UuidV7TimestampExtractorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'ethereum-abi-storage-slot-calculator': dynamic(() => import('./EthereumAbiStorageSlotCalculatorTool'), {
    loading: Loading,
    ssr: false,
  }),
  'base64-pem-certificate-parser': dynamic(() => import('./Base64PemCertificateParserTool'), {
    loading: Loading,
    ssr: false,
  }),
  'punycode-idn-converter': dynamic(() => import('./PunycodeIdnConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'crockford-base32-encoder': dynamic(() => import('./CrockfordBase32EncoderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'bcd-binary-coded-decimal-converter': dynamic(() => import('./BcdBinaryCodedDecimalConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'ieee754-hex-float-converter': dynamic(() => import('./Ieee754HexFloatConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'rot47-encoder-decoder': dynamic(() => import('./Rot47EncoderDecoderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'url-safe-base64-converter': dynamic(() => import('./UrlSafeBase64ConverterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-path-query-tester': dynamic(() => import('./JsonPathQueryTesterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-key-sorter': dynamic(() => import('./JsonKeySorterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'json-array-splitter-chunker': dynamic(() => import('./JsonArraySplitterChunkerTool'), {
    loading: Loading,
    ssr: false,
  }),
  'text-prefix-suffix-appender': dynamic(() => import('./TextPrefixSuffixAppenderTool'), {
    loading: Loading,
    ssr: false,
  }),
  'text-duplicate-line-counter': dynamic(() => import('./TextDuplicateLineCounterTool'), {
    loading: Loading,
    ssr: false,
  }),
  'text-column-tabular-splitter': dynamic(() => import('./TextColumnTabularSplitterTool'), {
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
