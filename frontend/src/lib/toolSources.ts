export interface ToolSource {
  name: string;
  url: string;
}

export const toolSources: Record<string, ToolSource[]> = {
  'quoted-printable-encoder': [
    { name: 'Quoted-Printable MIME Encoder & Decoder Reference', url: 'https://devstools.app/tools/encoding/quoted-printable-encoder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-patch-generator': [
    { name: 'RFC 6902 JSON Patch Generator Reference', url: 'https://devstools.app/tools/json/json-patch-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-flatten-unflatten': [
    { name: 'JSON Deep Object Flattener Reference', url: 'https://devstools.app/tools/json/json-flatten-unflatten' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'morse-code-audio-converter': [
    { name: 'Morse Code Text Encoder Reference', url: 'https://devstools.app/tools/encoding/morse-code-audio-converter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'base64url-encoder': [
    { name: 'Base64URL Encoder & Decoder Reference', url: 'https://devstools.app/tools/encoding/base64url-encoder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'subtitle-srt-vtt-converter': [
    { name: 'SRT to WebVTT Subtitle Converter Reference', url: 'https://devstools.app/tools/text/subtitle-srt-vtt-converter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'sql-slugifier': [
    { name: 'SQL Database Identifier Slugifier Reference', url: 'https://devstools.app/tools/text/sql-slugifier' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'ai-agent-prompt-optimizer': [
    { name: 'AI Agent Prompt Optimizer Reference', url: 'https://devstools.app/tools/text/ai-agent-prompt-optimizer' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'apache-conf-formatter': [
    { name: 'Apache VirtualHost Config Formatter Reference', url: 'https://devstools.app/tools/formatters/apache-conf-formatter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'docker-compose-formatter': [
    { name: 'Docker Compose YAML Formatter Reference', url: 'https://devstools.app/tools/formatters/docker-compose-formatter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'toml-formatter': [
    { name: 'TOML Configuration File Formatter Reference', url: 'https://devstools.app/tools/formatters/toml-formatter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'protobuf-formatter': [
    { name: 'Protocol Buffers (.proto) Formatter Reference', url: 'https://devstools.app/tools/formatters/protobuf-formatter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'totp-authenticator-simulator': [
    { name: 'RFC 6238 TOTP Authenticator Simulator Reference', url: 'https://devstools.app/tools/crypto/totp-authenticator-simulator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'ed25519-key-generator': [
    { name: 'Ed25519 Keypair Generator Reference', url: 'https://devstools.app/tools/crypto/ed25519-key-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'x509-csr-decoder': [
    { name: 'X.509 Certificate Signing Request (CSR) Decoder Reference', url: 'https://devstools.app/tools/crypto/x509-csr-decoder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'abi-encoder-decoder': [
    { name: 'Solidity ABI Parameter Encoder Reference', url: 'https://devstools.app/tools/crypto/abi-encoder-decoder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'ethereum-keccak256-hasher': [
    { name: 'Ethereum Keccak-256 & Selector Hasher Reference', url: 'https://devstools.app/tools/crypto/ethereum-keccak256-hasher' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'solana-address-validator': [
    { name: 'Solana Base58 Address Validator Reference', url: 'https://devstools.app/tools/crypto/solana-address-validator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'mongodb-aggregate-builder': [
    { name: 'MongoDB Aggregation Pipeline Generator Reference', url: 'https://devstools.app/tools/generators/mongodb-aggregate-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'clickhouse-ddl-generator': [
    { name: 'ClickHouse MergeTree DDL Generator Reference', url: 'https://devstools.app/tools/generators/clickhouse-ddl-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'elasticsearch-query-builder': [
    { name: 'Elasticsearch Query DSL Generator Reference', url: 'https://devstools.app/tools/generators/elasticsearch-query-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'react-hook-form-generator': [
    { name: 'React Hook Form Component Generator Reference', url: 'https://devstools.app/tools/generators/react-hook-form-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'gitlab-ci-generator': [
    { name: 'GitLab CI/CD Pipeline Generator Reference', url: 'https://devstools.app/tools/generators/gitlab-ci-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'kubernetes-ingress-generator': [
    { name: 'Kubernetes Ingress & Cert-Manager Generator Reference', url: 'https://devstools.app/tools/generators/kubernetes-ingress-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'ollama-modelfile-generator': [
    { name: 'Ollama Modelfile Builder Reference', url: 'https://devstools.app/tools/generators/ollama-modelfile-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'cloudflare-wrangler-builder': [
    { name: 'Cloudflare Wrangler Config Generator Reference', url: 'https://devstools.app/tools/generators/cloudflare-wrangler-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'github-actions-matrix-builder': [
    { name: 'GitHub Actions Matrix CI Workflow Generator Reference', url: 'https://devstools.app/tools/generators/github-actions-matrix-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'tailwind-v4-color-palette': [
    { name: 'Tailwind CSS v4 OKLCH Color Palette Generator Reference', url: 'https://devstools.app/tools/generators/tailwind-v4-color-palette' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'shadcn-theme-generator': [
    { name: 'Shadcn UI Theme & CSS Variables Generator Reference', url: 'https://devstools.app/tools/generators/shadcn-theme-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'svg-to-webp': [
    { name: 'SVG to WebP Data URI Converter Reference', url: 'https://devstools.app/tools/converters/svg-to-webp' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'docker-to-compose': [
    { name: 'Docker Run to Docker Compose Converter Reference', url: 'https://devstools.app/tools/converters/docker-to-compose' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'har-to-k6': [
    { name: 'HAR to k6 Load Test Script Converter Reference', url: 'https://devstools.app/tools/converters/har-to-k6' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-graphql-query': [
    { name: 'JSON to GraphQL Query Generator Reference', url: 'https://devstools.app/tools/converters/json-to-graphql-query' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'avro-to-json-schema': [
    { name: 'Apache Avro to JSON Schema Converter Reference', url: 'https://devstools.app/tools/converters/avro-to-json-schema' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'openapi-to-typescript-fetch': [
    { name: 'OpenAPI to TypeScript Fetch Client Reference', url: 'https://devstools.app/tools/converters/openapi-to-typescript-fetch' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'postman-to-curl': [
    { name: 'Postman Collection to cURL Script Reference', url: 'https://devstools.app/tools/converters/postman-to-curl' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'svg-to-react-native': [
    { name: 'SVG to React Native (SVGR) Converter Reference', url: 'https://devstools.app/tools/converters/svg-to-react-native' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-schema-to-zod': [
    { name: 'JSON Schema to Zod Converter Reference', url: 'https://devstools.app/tools/converters/json-schema-to-zod' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'zod-to-json-schema': [
    { name: 'Zod to JSON Schema Converter Reference', url: 'https://devstools.app/tools/converters/zod-to-json-schema' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'aspect-ratio-resizer': [
    { name: 'Aspect Ratio & Resolution Calculator Reference', url: 'https://devstools.app/tools/utilities/aspect-ratio-resizer' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'subresource-integrity-generator': [
    { name: 'Subresource Integrity (SRI) Hash Builder Reference', url: 'https://devstools.app/tools/utilities/subresource-integrity-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'csp-evaluator': [
    { name: 'CSP (Content Security Policy) Evaluator Reference', url: 'https://devstools.app/tools/utilities/csp-evaluator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'nginx-rate-limit-calculator': [
    { name: 'Nginx Rate Limit Directives Builder Reference', url: 'https://devstools.app/tools/utilities/nginx-rate-limit-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'cron-next-runs-visualizer': [
    { name: 'Cron Next 20 Runs Calculator Reference', url: 'https://devstools.app/tools/utilities/cron-next-runs-visualizer' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'rag-chunking-visualizer': [
    { name: 'RAG Semantic Chunking Visualizer Reference', url: 'https://devstools.app/tools/utilities/rag-chunking-visualizer' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'mcp-inspector': [
    { name: 'Model Context Protocol (MCP) Inspector Reference', url: 'https://devstools.app/tools/utilities/mcp-inspector' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'tiktoken-visualizer': [
    { name: 'Tiktoken BPE Tokenizer Visualizer Reference', url: 'https://devstools.app/tools/utilities/tiktoken-visualizer' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'claude-token-counter': [
    { name: 'Claude Token & Cost Calculator Reference', url: 'https://devstools.app/tools/utilities/claude-token-counter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'deepseek-token-counter': [
    { name: 'DeepSeek Token & Cost Calculator Reference', url: 'https://devstools.app/tools/utilities/deepseek-token-counter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-formatter': [
    { name: 'JSON Formatter Reference', url: 'https://devstools.app/tools/json/json-formatter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-validator': [
    { name: 'JSON Validator Reference', url: 'https://devstools.app/tools/json/json-validator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-csv': [
    { name: 'JSON to CSV Reference', url: 'https://devstools.app/tools/json/json-csv' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-typescript': [
    { name: 'JSON to TypeScript Reference', url: 'https://devstools.app/tools/json/json-to-typescript' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'base64': [
    { name: 'Base64 Encoder/Decoder Reference', url: 'https://devstools.app/tools/encoding/base64' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'url-encoder': [
    { name: 'URL Encoder/Decoder Reference', url: 'https://devstools.app/tools/encoding/url-encoder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'jwt-decoder': [
    { name: 'JWT Decoder, Signer & Verifier Reference', url: 'https://devstools.app/tools/encoding/jwt-decoder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'html-entity': [
    { name: 'HTML Entity Encoder/Decoder Reference', url: 'https://devstools.app/tools/encoding/html-entity' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'uuid-generator': [
    { name: 'UUID v4 & v7 Generator Reference', url: 'https://devstools.app/tools/generators/uuid-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'password-generator': [
    { name: 'Password Generator Reference', url: 'https://devstools.app/tools/generators/password-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'qr-code': [
    { name: 'QR Code Generator Reference', url: 'https://devstools.app/tools/generators/qr-code' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'slug-generator': [
    { name: 'Slug Generator Reference', url: 'https://devstools.app/tools/generators/slug-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-gradient': [
    { name: 'CSS Gradient Reference', url: 'https://devstools.app/tools/generators/css-gradient' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'meta-tags': [
    { name: 'Meta Tags Generator Reference', url: 'https://devstools.app/tools/generators/meta-tags' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'md5-hash': [
    { name: 'MD5 Hash Reference', url: 'https://devstools.app/tools/crypto/md5-hash' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'sha256-hash': [
    { name: 'SHA256 Hash Reference', url: 'https://devstools.app/tools/crypto/sha256-hash' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'regex-tester': [
    { name: 'Regex Tester Reference', url: 'https://devstools.app/tools/text/regex-tester' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'text-diff': [
    { name: 'Text Diff Reference', url: 'https://devstools.app/tools/text/text-diff' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'markdown-preview': [
    { name: 'Markdown Preview Reference', url: 'https://devstools.app/tools/text/markdown-preview' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'lorem-ipsum': [
    { name: 'Lorem Ipsum Reference', url: 'https://devstools.app/tools/generators/lorem-ipsum' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'timestamp-converter': [
    { name: 'Timestamp Converter Reference', url: 'https://devstools.app/tools/converters/timestamp-converter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'color-converter': [
    { name: 'Color Converter Reference', url: 'https://devstools.app/tools/converters/color-converter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'image-to-base64': [
    { name: 'Image to Base64 Reference', url: 'https://devstools.app/tools/encoding/image-to-base64' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'yaml-json': [
    { name: 'YAML to JSON Reference', url: 'https://devstools.app/tools/json/yaml-json' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'sql-formatter': [
    { name: 'SQL Formatter Reference', url: 'https://devstools.app/tools/formatters/sql-formatter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-minifier': [
    { name: 'CSS Minifier Reference', url: 'https://devstools.app/tools/formatters/css-minifier' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'js-minifier': [
    { name: 'JS Minifier Reference', url: 'https://devstools.app/tools/formatters/js-minifier' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'cron-parser': [
    { name: 'Cron Parser Reference', url: 'https://devstools.app/tools/utilities/cron-parser' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'case-converter': [
    { name: 'Case Converter Reference', url: 'https://devstools.app/tools/text/case-converter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'word-counter': [
    { name: 'Word Counter Reference', url: 'https://devstools.app/tools/text/word-counter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'remove-duplicates': [
    { name: 'Remove Duplicate Lines Reference', url: 'https://devstools.app/tools/text/remove-duplicates' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'sort-lines': [
    { name: 'Sort Lines Reference', url: 'https://devstools.app/tools/text/sort-lines' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'hex-encoder': [
    { name: 'HEX Encoder/Decoder Reference', url: 'https://devstools.app/tools/encoding/hex-encoder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'binary-encoder': [
    { name: 'Binary Encoder/Decoder Reference', url: 'https://devstools.app/tools/encoding/binary-encoder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'html-formatter': [
    { name: 'HTML Formatter Reference', url: 'https://devstools.app/tools/formatters/html-formatter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'html-minifier': [
    { name: 'HTML Minifier Reference', url: 'https://devstools.app/tools/formatters/html-minifier' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'xml-formatter': [
    { name: 'XML Formatter Reference', url: 'https://devstools.app/tools/formatters/xml-formatter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'sha512-hash': [
    { name: 'SHA512 Hash Generator Reference', url: 'https://devstools.app/tools/crypto/sha512-hash' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'roman-numeral-converter': [
    { name: 'Roman Numeral Converter Reference', url: 'https://devstools.app/tools/converters/roman-numeral-converter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'number-base-converter': [
    { name: 'Number Base Converter Reference', url: 'https://devstools.app/tools/converters/number-base-converter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'unicode-escape': [
    { name: 'Unicode Escape Encoder/Decoder Reference', url: 'https://devstools.app/tools/encoding/unicode-escape' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-string-escape': [
    { name: 'JSON String Escape Reference', url: 'https://devstools.app/tools/encoding/json-string-escape' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'regex-escape': [
    { name: 'Regex Escape Reference', url: 'https://devstools.app/tools/text/regex-escape' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'url-parser': [
    { name: 'URL Parser Reference', url: 'https://devstools.app/tools/converters/url-parser' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'query-string-parser': [
    { name: 'Query String Parser Reference', url: 'https://devstools.app/tools/converters/query-string-parser' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'http-headers-parser': [
    { name: 'HTTP Headers Parser Reference', url: 'https://devstools.app/tools/utilities/http-headers-parser' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'http-status-codes': [
    { name: 'HTTP Status Codes Reference', url: 'https://devstools.app/tools/utilities/http-status-codes' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'user-agent-parser': [
    { name: 'User Agent Parser Online Reference', url: 'https://devstools.app/tools/utilities/user-agent-parser' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-schema-validator': [
    { name: 'JSON Schema Validator Reference', url: 'https://devstools.app/tools/json/json-schema-validator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'hmac-generator': [
    { name: 'HMAC Generator & Verifier Reference', url: 'https://devstools.app/tools/crypto/hmac-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'pkce-generator': [
    { name: 'PKCE Generator & Verifier Reference', url: 'https://devstools.app/tools/crypto/pkce-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'cidr-calculator': [
    { name: 'IPv4 CIDR Calculator Reference', url: 'https://devstools.app/tools/utilities/cidr-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-pointer': [
    { name: 'JSON Pointer Evaluator Reference', url: 'https://devstools.app/tools/json/json-pointer' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'chmod-calculator': [
    { name: 'Chmod Calculator Reference', url: 'https://devstools.app/tools/utilities/chmod-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'cache-control': [
    { name: 'Cache-Control Parser & Builder Reference', url: 'https://devstools.app/tools/utilities/cache-control' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'jsonpath-tester': [
    { name: 'JSONPath Tester Reference', url: 'https://devstools.app/tools/json/jsonpath-tester' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'csp-builder': [
    { name: 'CSP Header Builder & Analyzer Reference', url: 'https://devstools.app/tools/utilities/csp-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'curl-to-fetch': [
    { name: 'cURL Builder & Fetch Converter Reference', url: 'https://devstools.app/tools/utilities/curl-to-fetch' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'env-to-json': [
    { name: '.env to JSON Converter Reference', url: 'https://devstools.app/tools/converters/env-to-json' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-zod': [
    { name: 'JSON to Zod Schema Reference', url: 'https://devstools.app/tools/json/json-to-zod' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'bcrypt-generator': [
    { name: 'Bcrypt Generator & Verifier Reference', url: 'https://devstools.app/tools/crypto/bcrypt-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-diff-patch': [
    { name: 'JSON Diff & Patch Generator Reference', url: 'https://devstools.app/tools/json/json-diff-patch' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'color-contrast-checker': [
    { name: 'Color Contrast Checker Reference', url: 'https://devstools.app/tools/utilities/color-contrast-checker' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'certificate-decoder': [
    { name: 'PEM / X.509 Certificate Decoder Reference', url: 'https://devstools.app/tools/crypto/certificate-decoder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'openapi-validator': [
    { name: 'OpenAPI Validator & Endpoint Explorer Reference', url: 'https://devstools.app/tools/utilities/openapi-validator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'svg-to-jsx': [
    { name: 'SVG to JSX / React Converter Reference', url: 'https://devstools.app/tools/converters/svg-to-jsx' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'svg-minifier': [
    { name: 'SVG Optimizer & Minifier Reference', url: 'https://devstools.app/tools/formatters/svg-minifier' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-clamp': [
    { name: 'CSS clamp() Fluid Calculator Reference', url: 'https://devstools.app/tools/converters/css-clamp' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-box-shadow': [
    { name: 'CSS Box Shadow Generator Reference', url: 'https://devstools.app/tools/generators/css-box-shadow' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'docker-run-to-compose': [
    { name: 'Docker Run to Compose Converter Reference', url: 'https://devstools.app/tools/converters/docker-run-to-compose' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'cron-generator': [
    { name: 'Visual Cron Expression Builder Reference', url: 'https://devstools.app/tools/generators/cron-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-sql': [
    { name: 'JSON to SQL Converter Reference', url: 'https://devstools.app/tools/converters/json-to-sql' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'bip39-generator': [
    { name: 'BIP-39 Mnemonic Generator Reference', url: 'https://devstools.app/tools/crypto/bip39-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'dmarc-generator': [
    { name: 'DMARC & SPF Record Generator Reference', url: 'https://devstools.app/tools/utilities/dmarc-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-models': [
    { name: 'JSON to Multi-Language Models Reference', url: 'https://devstools.app/tools/json/json-to-models' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'px-to-rem': [
    { name: 'PX to REM & EM Converter Reference', url: 'https://devstools.app/tools/converters/px-to-rem' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'mock-data-generator': [
    { name: 'Mock Data JSON Generator Reference', url: 'https://devstools.app/tools/generators/mock-data-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'csv-to-markdown': [
    { name: 'CSV to Markdown Table Converter Reference', url: 'https://devstools.app/tools/converters/csv-to-markdown' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'curl-to-code': [
    { name: 'cURL to Multi-Language Code Reference', url: 'https://devstools.app/tools/utilities/curl-to-code' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'rsa-key-pair-generator': [
    { name: 'RSA & ECDSA Key Pair Generator Reference', url: 'https://devstools.app/tools/crypto/rsa-key-pair-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'svg-optimizer': [
    { name: 'SVG Optimizer & Cleaner Reference', url: 'https://devstools.app/tools/formatters/svg-optimizer' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'html-table-to-json': [
    { name: 'HTML Table to JSON Converter Reference', url: 'https://devstools.app/tools/converters/html-table-to-json' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'favicon-generator': [
    { name: 'Favicon & App Icon Generator Reference', url: 'https://devstools.app/tools/generators/favicon-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'gitignore-generator': [
    { name: '.gitignore Generator Reference', url: 'https://devstools.app/tools/generators/gitignore-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'htpasswd-generator': [
    { name: '.htpasswd Generator Reference', url: 'https://devstools.app/tools/crypto/htpasswd-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'dockerfile-generator': [
    { name: 'Dockerfile Generator Reference', url: 'https://devstools.app/tools/utilities/dockerfile-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-glassmorphism': [
    { name: 'CSS Glassmorphism Generator Reference', url: 'https://devstools.app/tools/utilities/css-glassmorphism' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-grid-generator': [
    { name: 'CSS Grid Layout Generator Reference', url: 'https://devstools.app/tools/utilities/css-grid-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-blob-generator': [
    { name: 'CSS & SVG Blob Generator Reference', url: 'https://devstools.app/tools/generators/css-blob-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'robots-txt-generator': [
    { name: 'robots.txt Generator & Tester Reference', url: 'https://devstools.app/tools/utilities/robots-txt-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'sitemap-generator': [
    { name: 'XML Sitemap Generator Reference', url: 'https://devstools.app/tools/utilities/sitemap-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'sql-to-json': [
    { name: 'SQL to JSON Converter Reference', url: 'https://devstools.app/tools/converters/sql-to-json' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'totp-generator': [
    { name: '2FA / TOTP Authenticator Generator Reference', url: 'https://devstools.app/tools/crypto/totp-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'markdown-table-generator': [
    { name: 'Markdown Table Generator Reference', url: 'https://devstools.app/tools/generators/markdown-table-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'key-code-info': [
    { name: 'JavaScript Keycode Info Reference', url: 'https://devstools.app/tools/utilities/key-code-info' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'aspect-ratio-calculator': [
    { name: 'Aspect Ratio Calculator Reference', url: 'https://devstools.app/tools/converters/aspect-ratio-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'base64-to-image': [
    { name: 'Base64 to Image Decoder Reference', url: 'https://devstools.app/tools/encoding/base64-to-image' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'html-to-markdown': [
    { name: 'HTML to Markdown Converter Reference', url: 'https://devstools.app/tools/converters/html-to-markdown' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-triangle-generator': [
    { name: 'CSS Triangle Generator Reference', url: 'https://devstools.app/tools/utilities/css-triangle-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'svg-placeholder-generator': [
    { name: 'SVG Placeholder Generator Reference', url: 'https://devstools.app/tools/generators/svg-placeholder-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-flexbox-generator': [
    { name: 'CSS Flexbox Generator Reference', url: 'https://devstools.app/tools/utilities/css-flexbox-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'open-graph-previewer': [
    { name: 'Open Graph & Social Previewer Reference', url: 'https://devstools.app/tools/utilities/open-graph-previewer' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'ascii-art-generator': [
    { name: 'ASCII Art & Banner Generator Reference', url: 'https://devstools.app/tools/generators/ascii-art-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-animation-generator': [
    { name: 'CSS Animation Generator Reference', url: 'https://devstools.app/tools/utilities/css-animation-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'markdown-to-html': [
    { name: 'Markdown to HTML Converter Reference', url: 'https://devstools.app/tools/converters/markdown-to-html' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-text-shadow': [
    { name: 'CSS Text Shadow Generator Reference', url: 'https://devstools.app/tools/utilities/css-text-shadow' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'time-duration-calculator': [
    { name: 'Time Duration & Date Diff Reference', url: 'https://devstools.app/tools/converters/time-duration-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'xml-to-json': [
    { name: 'XML to JSON & JSON to XML Reference', url: 'https://devstools.app/tools/converters/xml-to-json' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'list-to-sql-in': [
    { name: 'List to SQL IN Clause Reference', url: 'https://devstools.app/tools/converters/list-to-sql-in' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'svg-to-png': [
    { name: 'SVG to PNG / JPG / WebP Converter Reference', url: 'https://devstools.app/tools/converters/svg-to-png' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'ip-subnet-calculator': [
    { name: 'IPv4 Subnet Calculator Reference', url: 'https://devstools.app/tools/utilities/ip-subnet-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-filter-generator': [
    { name: 'CSS Filter Generator Reference', url: 'https://devstools.app/tools/utilities/css-filter-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'bcrypt-verifier': [
    { name: 'Bcrypt Hash Verifier Reference', url: 'https://devstools.app/tools/crypto/bcrypt-verifier' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-border-radius': [
    { name: 'CSS 8-Point Border Radius Reference', url: 'https://devstools.app/tools/utilities/css-border-radius' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'jwt-generator': [
    { name: 'JWT Token Generator Reference', url: 'https://devstools.app/tools/crypto/jwt-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'ulid-generator': [
    { name: 'ULID & UUID v7 Generator Reference', url: 'https://devstools.app/tools/generators/ulid-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'curl-builder': [
    { name: 'cURL Command Builder Reference', url: 'https://devstools.app/tools/utilities/curl-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'base64-to-pdf': [
    { name: 'Base64 to PDF Converter Reference', url: 'https://devstools.app/tools/converters/base64-to-pdf' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-neumorphism': [
    { name: 'CSS Neumorphism Generator Reference', url: 'https://devstools.app/tools/utilities/css-neumorphism' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'string-byte-counter': [
    { name: 'String Byte & UTF-8 Counter Reference', url: 'https://devstools.app/tools/text/string-byte-counter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-mesh-gradient': [
    { name: 'CSS Mesh Gradient Generator Reference', url: 'https://devstools.app/tools/utilities/css-mesh-gradient' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'html-to-jsx': [
    { name: 'HTML to JSX / React Converter Reference', url: 'https://devstools.app/tools/converters/html-to-jsx' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-clip-path': [
    { name: 'CSS Clip-Path & Polygon Generator Reference', url: 'https://devstools.app/tools/utilities/css-clip-path' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-scrollbar-generator': [
    { name: 'Custom CSS Scrollbar Generator Reference', url: 'https://devstools.app/tools/utilities/css-scrollbar-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-pattern-generator': [
    { name: 'CSS Background Pattern Generator Reference', url: 'https://devstools.app/tools/utilities/css-pattern-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'svg-path-visualizer': [
    { name: 'SVG Path Visualizer & Inspector Reference', url: 'https://devstools.app/tools/utilities/svg-path-visualizer' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'color-palette-generator': [
    { name: 'Tailwind Color Palette Generator Reference', url: 'https://devstools.app/tools/generators/color-palette-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'csv-to-sql-insert': [
    { name: 'CSV to SQL INSERT Generator Reference', url: 'https://devstools.app/tools/converters/csv-to-sql-insert' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'sql-minifier': [
    { name: 'SQL Query Minifier Reference', url: 'https://devstools.app/tools/formatters/sql-minifier' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-graphql': [
    { name: 'JSON to GraphQL Schema Generator Reference', url: 'https://devstools.app/tools/converters/json-to-graphql' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'tsv-to-json': [
    { name: 'TSV to JSON Converter Reference', url: 'https://devstools.app/tools/converters/tsv-to-json' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'ndjson-to-json': [
    { name: 'NDJSON / JSONL to JSON Converter Reference', url: 'https://devstools.app/tools/converters/ndjson-to-json' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-size-analyzer': [
    { name: 'JSON Size & Memory Analyzer Reference', url: 'https://devstools.app/tools/json/json-size-analyzer' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'hex-to-base64': [
    { name: 'Hex to Base64 Converter Reference', url: 'https://devstools.app/tools/encoding/hex-to-base64' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'punycode-converter': [
    { name: 'Punycode & IDN Domain Converter Reference', url: 'https://devstools.app/tools/converters/punycode-converter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'morse-code-converter': [
    { name: 'Morse Code Audio & Text Translator Reference', url: 'https://devstools.app/tools/converters/morse-code-converter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'base32-encoder': [
    { name: 'Base32 Encoder & Decoder Reference', url: 'https://devstools.app/tools/encoding/base32-encoder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'password-strength-analyzer': [
    { name: 'Password Strength & Entropy Analyzer Reference', url: 'https://devstools.app/tools/crypto/password-strength-analyzer' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'semver-calculator': [
    { name: 'Semver Range & Version Calculator Reference', url: 'https://devstools.app/tools/utilities/semver-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'ipv6-subnet-calculator': [
    { name: 'IPv6 Subnet & Prefix Calculator Reference', url: 'https://devstools.app/tools/utilities/ipv6-subnet-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'mac-address-generator': [
    { name: 'MAC Address Generator & Formatter Reference', url: 'https://devstools.app/tools/generators/mac-address-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'crontab-descriptor': [
    { name: 'Crontab Expression Explainer Reference', url: 'https://devstools.app/tools/utilities/crontab-descriptor' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'htaccess-to-nginx': [
    { name: 'Apache .htaccess to Nginx Converter Reference', url: 'https://devstools.app/tools/converters/htaccess-to-nginx' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'dns-record-generator': [
    { name: 'DNS Email Security Record Builder Reference', url: 'https://devstools.app/tools/utilities/dns-record-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'slug-to-title': [
    { name: 'Slug to Title & Case Converter Reference', url: 'https://devstools.app/tools/text/slug-to-title' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'text-obfuscator': [
    { name: 'Invisible Character & Zero-Width Detector Reference', url: 'https://devstools.app/tools/text/text-obfuscator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'csv-column-extractor': [
    { name: 'CSV Column Extractor & Filter Reference', url: 'https://devstools.app/tools/converters/csv-column-extractor' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'sql-to-typescript': [
    { name: 'SQL Table to TypeScript Interface Reference', url: 'https://devstools.app/tools/converters/sql-to-typescript' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-env': [
    { name: 'JSON to .env Converter Reference', url: 'https://devstools.app/tools/converters/json-to-env' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-minifier': [
    { name: 'JSON Minifier & Stringifier Reference', url: 'https://devstools.app/tools/formatters/json-minifier' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'markdown-table-to-csv': [
    { name: 'Markdown Table to CSV Converter Reference', url: 'https://devstools.app/tools/converters/markdown-table-to-csv' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'llm-token-counter': [
    { name: 'LLM Token & Cost Calculator Reference', url: 'https://devstools.app/tools/utilities/llm-token-counter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'openai-function-schema': [
    { name: 'OpenAI Function Calling Schema Generator Reference', url: 'https://devstools.app/tools/converters/openai-function-schema' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'prompt-template-formatter': [
    { name: 'Prompt Template Compiler & Interpolator Reference', url: 'https://devstools.app/tools/utilities/prompt-template-formatter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'embedding-similarity': [
    { name: 'Embedding Vector Similarity Calculator Reference', url: 'https://devstools.app/tools/utilities/embedding-similarity' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'text-chunk-splitter': [
    { name: 'RAG Text Chunk Splitter & Token Window Simulator Reference', url: 'https://devstools.app/tools/utilities/text-chunk-splitter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'jsonl-dataset-validator': [
    { name: 'OpenAI JSONL Fine-Tuning Validator Reference', url: 'https://devstools.app/tools/utilities/jsonl-dataset-validator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'prompt-format-converter': [
    { name: 'ChatML, Anthropic & Llama 3 Prompt Converter Reference', url: 'https://devstools.app/tools/converters/prompt-format-converter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'sampling-curve-visualizer': [
    { name: 'LLM Temperature & Top-P Sampling Curve Visualizer Reference', url: 'https://devstools.app/tools/generators/sampling-curve-visualizer' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'system-prompt-formatter': [
    { name: 'AI System Prompt Builder & Markdown Formatter Reference', url: 'https://devstools.app/tools/text/system-prompt-formatter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'prompt-diff': [
    { name: 'AI Prompt Version & Semantic Diff Comparator Reference', url: 'https://devstools.app/tools/text/prompt-diff' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-to-tailwind': [
    { name: 'CSS to Tailwind CSS Converter Reference', url: 'https://devstools.app/tools/converters/css-to-tailwind' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'tailwind-to-css': [
    { name: 'Tailwind to Vanilla CSS Converter Reference', url: 'https://devstools.app/tools/converters/tailwind-to-css' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-specificity-calculator': [
    { name: 'CSS Specificity Calculator & Inspector Reference', url: 'https://devstools.app/tools/utilities/css-specificity-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-keyframes-generator': [
    { name: 'CSS Keyframe Animation Timeline Generator Reference', url: 'https://devstools.app/tools/generators/css-keyframes-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'tailwind-class-sorter': [
    { name: 'Tailwind Class Sorter & Formatter Reference', url: 'https://devstools.app/tools/formatters/tailwind-class-sorter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'fluid-typography': [
    { name: 'CSS Fluid Typography & Clamp Calculator Reference', url: 'https://devstools.app/tools/utilities/fluid-typography' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-media-query-builder': [
    { name: 'CSS Media Query Range Builder Reference', url: 'https://devstools.app/tools/utilities/css-media-query-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-grid-area-builder': [
    { name: 'CSS Grid Template Areas Builder Reference', url: 'https://devstools.app/tools/generators/css-grid-area-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-cubic-bezier': [
    { name: 'CSS Cubic-Bezier Curve Designer Reference', url: 'https://devstools.app/tools/generators/css-cubic-bezier' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'color-harmony-generator': [
    { name: 'Color Harmony & Palette Generator Reference', url: 'https://devstools.app/tools/generators/color-harmony-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-pydantic': [
    { name: 'JSON to Python Pydantic V2 Model Reference', url: 'https://devstools.app/tools/converters/json-to-pydantic' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-rust-serde': [
    { name: 'JSON to Rust Serde Struct Converter Reference', url: 'https://devstools.app/tools/converters/json-to-rust-serde' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-swift': [
    { name: 'JSON to Swift Codable Struct Converter Reference', url: 'https://devstools.app/tools/converters/json-to-swift' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-kotlin': [
    { name: 'JSON to Kotlin Data Class Converter Reference', url: 'https://devstools.app/tools/converters/json-to-kotlin' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-csharp': [
    { name: 'JSON to C# Class Converter Reference', url: 'https://devstools.app/tools/converters/json-to-csharp' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-java-pojo': [
    { name: 'JSON to Java Lombok POJO Converter Reference', url: 'https://devstools.app/tools/converters/json-to-java-pojo' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'typescript-to-json-schema': [
    { name: 'TypeScript to JSON Schema Converter Reference', url: 'https://devstools.app/tools/converters/typescript-to-json-schema' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'yaml-to-typescript': [
    { name: 'YAML to TypeScript Interface Converter Reference', url: 'https://devstools.app/tools/converters/yaml-to-typescript' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'graphql-to-typescript': [
    { name: 'GraphQL SDL to TypeScript Types Converter Reference', url: 'https://devstools.app/tools/converters/graphql-to-typescript' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'protobuf-to-json': [
    { name: 'Protobuf (proto3) to JSON Schema Converter Reference', url: 'https://devstools.app/tools/converters/protobuf-to-json' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'sql-to-mongodb': [
    { name: 'SQL to MongoDB Query Converter Reference', url: 'https://devstools.app/tools/converters/sql-to-mongodb' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-sql-ddl': [
    { name: 'JSON to SQL CREATE TABLE DDL Generator Reference', url: 'https://devstools.app/tools/converters/json-to-sql-ddl' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'sql-explainer': [
    { name: 'SQL Query Visual Explainer Reference', url: 'https://devstools.app/tools/utilities/sql-explainer' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'postgres-connection-builder': [
    { name: 'PostgreSQL Connection URI Builder & Parser Reference', url: 'https://devstools.app/tools/utilities/postgres-connection-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'redis-command-generator': [
    { name: 'Redis Command Builder & Key Helper Reference', url: 'https://devstools.app/tools/generators/redis-command-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'csv-to-parquet-schema': [
    { name: 'CSV to Apache Parquet Schema Converter Reference', url: 'https://devstools.app/tools/converters/csv-to-parquet-schema' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'mongodb-objectid-parser': [
    { name: 'MongoDB ObjectId Timestamp & Metadata Parser Reference', url: 'https://devstools.app/tools/utilities/mongodb-objectid-parser' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'sql-index-advisor': [
    { name: 'SQL B-Tree Composite Index Advisor Reference', url: 'https://devstools.app/tools/utilities/sql-index-advisor' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'postgres-to-mysql': [
    { name: 'PostgreSQL to MySQL Dialect Converter Reference', url: 'https://devstools.app/tools/converters/postgres-to-mysql' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'prisma-to-sql': [
    { name: 'Prisma Schema to SQL DDL Generator Reference', url: 'https://devstools.app/tools/converters/prisma-to-sql' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'docker-compose-to-k8s': [
    { name: 'Docker Compose to Kubernetes YAML Converter Reference', url: 'https://devstools.app/tools/converters/docker-compose-to-k8s' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'nginx-formatter': [
    { name: 'Nginx Config Formatter & Validator Reference', url: 'https://devstools.app/tools/formatters/nginx-formatter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'terraform-formatter': [
    { name: 'Terraform HCL Formatter & Linter Reference', url: 'https://devstools.app/tools/formatters/terraform-formatter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'kubeconfig-validator': [
    { name: 'Kubernetes Kubeconfig Validator Reference', url: 'https://devstools.app/tools/utilities/kubeconfig-validator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'helm-values-evaluator': [
    { name: 'Helm Template & Values.yaml Evaluator Reference', url: 'https://devstools.app/tools/utilities/helm-values-evaluator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'dockerfile-linter': [
    { name: 'Dockerfile Linter & Best-Practice Checker Reference', url: 'https://devstools.app/tools/utilities/dockerfile-linter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'systemd-unit-generator': [
    { name: 'Linux Systemd Service Unit Generator Reference', url: 'https://devstools.app/tools/generators/systemd-unit-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'caddy-to-nginx': [
    { name: 'Caddyfile to Nginx Reverse Proxy Converter Reference', url: 'https://devstools.app/tools/converters/caddy-to-nginx' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'aws-iam-policy-builder': [
    { name: 'AWS IAM Policy JSON Builder & Validator Reference', url: 'https://devstools.app/tools/generators/aws-iam-policy-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'prometheus-alert-builder': [
    { name: 'Prometheus Alert Rule & PromQL Builder Reference', url: 'https://devstools.app/tools/generators/prometheus-alert-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'websocket-tester': [
    { name: 'WebSocket Client & Latency Tester Reference', url: 'https://devstools.app/tools/utilities/websocket-tester' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'curl-to-postman': [
    { name: 'cURL to Postman Collection Converter Reference', url: 'https://devstools.app/tools/converters/curl-to-postman' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'ssl-certificate-inspector': [
    { name: 'SSL Certificate PEM & SANs Inspector Reference', url: 'https://devstools.app/tools/crypto/ssl-certificate-inspector' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'csr-generator': [
    { name: 'CSR (Certificate Signing Request) Builder Reference', url: 'https://devstools.app/tools/crypto/csr-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'sse-stream-tester': [
    { name: 'Server-Sent Events (SSE) Stream Tester Reference', url: 'https://devstools.app/tools/utilities/sse-stream-tester' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'graphql-query-formatter': [
    { name: 'GraphQL Query Formatter & Minifier Reference', url: 'https://devstools.app/tools/formatters/graphql-query-formatter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'har-viewer': [
    { name: 'HAR (HTTP Archive) File Viewer & Analyzer Reference', url: 'https://devstools.app/tools/utilities/har-viewer' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'dns-lookup-simulator': [
    { name: 'DNS Records & Propagation Simulator Reference', url: 'https://devstools.app/tools/utilities/dns-lookup-simulator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'http-wire-format': [
    { name: 'HTTP Request to Raw Wire Format Converter Reference', url: 'https://devstools.app/tools/converters/http-wire-format' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'webhook-signature-verifier': [
    { name: 'HMAC Webhook Signature Verifier Reference', url: 'https://devstools.app/tools/crypto/webhook-signature-verifier' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'uuid-v7-generator': [
    { name: 'UUID v7 Generator (Time-Ordered) Reference', url: 'https://devstools.app/tools/generators/uuid-v7-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'nanoid-generator': [
    { name: 'NanoID Generator & Custom Alphabet Builder Reference', url: 'https://devstools.app/tools/generators/nanoid-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'base58-encoder': [
    { name: 'Base58 Encoder & Decoder (Bitcoin / Solana / IPFS) Reference', url: 'https://devstools.app/tools/encoding/base58-encoder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'ssh-key-inspector': [
    { name: 'SSH Public Key Fingerprint Inspector Reference', url: 'https://devstools.app/tools/crypto/ssh-key-inspector' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'pgp-key-inspector': [
    { name: 'PGP & GPG Key Block Inspector Reference', url: 'https://devstools.app/tools/crypto/pgp-key-inspector' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'api-key-generator': [
    { name: 'API Key & Token Generator (Prefix-Ready) Reference', url: 'https://devstools.app/tools/generators/api-key-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'jwt-signature-validator': [
    { name: 'JWT Signature & Expiry Validator Reference', url: 'https://devstools.app/tools/crypto/jwt-signature-validator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'aes-crypto-playground': [
    { name: 'AES-256 Encryption & Decryption Playground Reference', url: 'https://devstools.app/tools/crypto/aes-crypto-playground' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'bip39-seed-deriver': [
    { name: 'BIP-39 Mnemonic to Seed Deriver Reference', url: 'https://devstools.app/tools/crypto/bip39-seed-deriver' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'argon2-hash-generator': [
    { name: 'Argon2 Password Hash Formatter Reference', url: 'https://devstools.app/tools/crypto/argon2-hash-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'android-manifest-builder': [
    { name: 'Android Manifest XML & Permissions Builder Reference', url: 'https://devstools.app/tools/generators/android-manifest-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'ios-plist-builder': [
    { name: 'iOS Info.plist Permission Key Builder Reference', url: 'https://devstools.app/tools/generators/ios-plist-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'app-icon-resizer': [
    { name: 'App Icon Resolution Package Reference Reference', url: 'https://devstools.app/tools/generators/app-icon-resizer' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'universal-links-validator': [
    { name: 'Apple Universal Links & Android App Links Generator Reference', url: 'https://devstools.app/tools/utilities/universal-links-validator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'flutter-theme-generator': [
    { name: 'Flutter Material 3 ColorScheme Generator Reference', url: 'https://devstools.app/tools/generators/flutter-theme-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'xcode-asset-catalog': [
    { name: 'Xcode Asset Catalog Contents.json Builder Reference', url: 'https://devstools.app/tools/generators/xcode-asset-catalog' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'android-keystore-fingerprint': [
    { name: 'Android Keystore Fingerprint (SHA1/SHA256) Formatter Reference', url: 'https://devstools.app/tools/crypto/android-keystore-fingerprint' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'electron-config-builder': [
    { name: 'Electron main.js & App Window Builder Reference', url: 'https://devstools.app/tools/generators/electron-config-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'react-native-icon-finder': [
    { name: 'React Native Vector Icons Finder & Code Generator Reference', url: 'https://devstools.app/tools/utilities/react-native-icon-finder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'capacitor-config-builder': [
    { name: 'Capacitor capacitor.config.json Builder Reference', url: 'https://devstools.app/tools/generators/capacitor-config-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'code-side-by-side-diff': [
    { name: 'Code Side-by-Side Diff Visualizer Reference', url: 'https://devstools.app/tools/text/code-side-by-side-diff' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'conventional-commit-builder': [
    { name: 'Conventional Git Commit Message Builder Reference', url: 'https://devstools.app/tools/generators/conventional-commit-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'git-command-builder': [
    { name: 'Git Interactive Command Generator Reference', url: 'https://devstools.app/tools/utilities/git-command-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'env-sanitizer': [
    { name: '.env to .env.example Secret Sanitizer Reference', url: 'https://devstools.app/tools/converters/env-sanitizer' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'license-generator': [
    { name: 'Open Source License & SPDX Generator Reference', url: 'https://devstools.app/tools/generators/license-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'eslint-prettier-config': [
    { name: 'Prettier & ESLint Configuration Builder Reference', url: 'https://devstools.app/tools/generators/eslint-prettier-config' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'markdown-to-slides': [
    { name: 'Markdown to HTML Slide Deck Converter Reference', url: 'https://devstools.app/tools/converters/markdown-to-slides' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'package-json-formatter': [
    { name: 'Package.json Dependency Sorter & Prettifier Reference', url: 'https://devstools.app/tools/formatters/package-json-formatter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'changelog-generator': [
    { name: 'CHANGELOG.md Builder (Keep a Changelog) Reference', url: 'https://devstools.app/tools/generators/changelog-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'editorconfig-generator': [
    { name: '.editorconfig File Generator Reference', url: 'https://devstools.app/tools/generators/editorconfig-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'ieee754-visualizer': [
    { name: 'IEEE 754 Floating Point 32-bit Visualizer Reference', url: 'https://devstools.app/tools/utilities/ieee754-visualizer' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'bitwise-calculator': [
    { name: 'Bitwise Logic Calculator (AND, OR, XOR, Shift) Reference', url: 'https://devstools.app/tools/utilities/bitwise-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'hex-dump-viewer': [
    { name: 'Hex Dump Viewer & Binary Offset Inspector Reference', url: 'https://devstools.app/tools/encoding/hex-dump-viewer' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'bignumber-calculator': [
    { name: 'Arbitrary Precision BigNumber Calculator Reference', url: 'https://devstools.app/tools/utilities/bignumber-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'multi-radix-converter': [
    { name: 'Multi-Radix Base Converter (Bin, Oct, Dec, Hex) Reference', url: 'https://devstools.app/tools/converters/multi-radix-converter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'timezone-meeting-planner': [
    { name: 'Timezone Meeting Planner & Overlap Matrix Reference', url: 'https://devstools.app/tools/utilities/timezone-meeting-planner' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'bandwidth-calculator': [
    { name: 'Bandwidth & File Download Time Calculator Reference', url: 'https://devstools.app/tools/utilities/bandwidth-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'percentage-growth-calculator': [
    { name: 'Percentage Growth & Change Calculator Reference', url: 'https://devstools.app/tools/utilities/percentage-growth-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'cron-timezone-converter': [
    { name: 'Cron Expression Timezone Converter (Local ↔ UTC) Reference', url: 'https://devstools.app/tools/converters/cron-timezone-converter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'matrix-calculator': [
    { name: 'Matrix Arithmetic & Transpose Calculator Reference', url: 'https://devstools.app/tools/utilities/matrix-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'curl-to-python': [
    { name: 'cURL to Python Converter Reference', url: 'https://devstools.app/tools/converters/curl-to-python' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'curl-to-javascript': [
    { name: 'cURL to JavaScript Fetch Converter Reference', url: 'https://devstools.app/tools/converters/curl-to-javascript' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'curl-to-go': [
    { name: 'cURL to Go Converter Reference', url: 'https://devstools.app/tools/converters/curl-to-go' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'curl-to-rust': [
    { name: 'cURL to Rust Converter Reference', url: 'https://devstools.app/tools/converters/curl-to-rust' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'curl-to-php': [
    { name: 'cURL to PHP Converter Reference', url: 'https://devstools.app/tools/converters/curl-to-php' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'curl-to-csharp': [
    { name: 'cURL to C# Converter Reference', url: 'https://devstools.app/tools/converters/curl-to-csharp' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'curl-to-java': [
    { name: 'cURL to Java Converter Reference', url: 'https://devstools.app/tools/converters/curl-to-java' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'curl-to-ai-sdk': [
    { name: 'cURL to OpenAI & Claude SDK Converter Reference', url: 'https://devstools.app/tools/converters/curl-to-ai-sdk' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'openai-structured-outputs': [
    { name: 'OpenAI Strict Structured Outputs Builder Reference', url: 'https://devstools.app/tools/generators/openai-structured-outputs' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'vercel-ai-core-message-converter': [
    { name: 'Vercel AI SDK Message Converter Reference', url: 'https://devstools.app/tools/converters/vercel-ai-core-message-converter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'langgraph-state-generator': [
    { name: 'LangGraph State Schema Generator Reference', url: 'https://devstools.app/tools/generators/langgraph-state-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'embedding-cost-calculator': [
    { name: 'Vector Embedding Cost Calculator Reference', url: 'https://devstools.app/tools/utilities/embedding-cost-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'anthropic-tool-builder': [
    { name: 'Anthropic Claude Tool Builder Reference', url: 'https://devstools.app/tools/generators/anthropic-tool-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'tailwind-v3-to-v4-migrator': [
    { name: 'Tailwind CSS v3 to v4 Migrator Reference', url: 'https://devstools.app/tools/converters/tailwind-v3-to-v4-migrator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-box-shadow-to-tailwind': [
    { name: 'CSS Box-Shadow to Tailwind Converter Reference', url: 'https://devstools.app/tools/converters/css-box-shadow-to-tailwind' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'nextjs-metadata-generator': [
    { name: 'Next.js App Router Metadata Generator Reference', url: 'https://devstools.app/tools/generators/nextjs-metadata-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'svg-to-css': [
    { name: 'SVG to CSS Background Data URI Reference', url: 'https://devstools.app/tools/generators/svg-to-css' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'html-table-converter': [
    { name: 'HTML Table to Markdown & CSV Converter Reference', url: 'https://devstools.app/tools/converters/html-table-converter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'natural-language-to-cron': [
    { name: 'Natural Language to Cron Converter Reference', url: 'https://devstools.app/tools/converters/natural-language-to-cron' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'gitignore-tester': [
    { name: '.gitignore Pattern Matcher & Tester Reference', url: 'https://devstools.app/tools/utilities/gitignore-tester' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'k8s-resource-calculator': [
    { name: 'Kubernetes Pod Resource & QoS Calculator Reference', url: 'https://devstools.app/tools/utilities/k8s-resource-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'terraform-hcl-to-json': [
    { name: 'Terraform HCL to JSON Converter Reference', url: 'https://devstools.app/tools/converters/terraform-hcl-to-json' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'systemd-timer-generator': [
    { name: 'Systemd Service & Timer Generator Reference', url: 'https://devstools.app/tools/generators/systemd-timer-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'sql-to-prisma': [
    { name: 'SQL DDL to Prisma Schema Converter Reference', url: 'https://devstools.app/tools/converters/sql-to-prisma' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'sql-to-drizzle': [
    { name: 'SQL DDL to Drizzle ORM Schema Converter Reference', url: 'https://devstools.app/tools/converters/sql-to-drizzle' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'postgres-explain-visualizer': [
    { name: 'PostgreSQL EXPLAIN Plan Analyzer Reference', url: 'https://devstools.app/tools/utilities/postgres-explain-visualizer' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'mongodb-to-sql': [
    { name: 'MongoDB Query to SQL Converter Reference', url: 'https://devstools.app/tools/converters/mongodb-to-sql' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'sql-to-django': [
    { name: 'SQL DDL to Django Model Converter Reference', url: 'https://devstools.app/tools/converters/sql-to-django' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'sql-keyword-uppercaser': [
    { name: 'SQL Keyword Uppercaser & Formatter Reference', url: 'https://devstools.app/tools/formatters/sql-keyword-uppercaser' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'subnet-calculator': [
    { name: 'IPv4 Subnet Mask & CIDR Calculator Reference', url: 'https://devstools.app/tools/utilities/subnet-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'uuid-v5-generator': [
    { name: 'UUID v5 (SHA-1 Namespace) Generator Reference', url: 'https://devstools.app/tools/crypto/uuid-v5-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'bip39-seed-phrase-generator': [
    { name: 'BIP-39 Mnemonic Seed Phrase Generator Reference', url: 'https://devstools.app/tools/crypto/bip39-seed-phrase-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'eip712-hasher': [
    { name: 'Ethereum EIP-712 Typed Data Hasher Reference', url: 'https://devstools.app/tools/crypto/eip712-hasher' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'crypto-unit-converter': [
    { name: 'Crypto Multi-Unit Converter Reference', url: 'https://devstools.app/tools/converters/crypto-unit-converter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-python-dataclass': [
    { name: 'JSON to Python Dataclass Converter Reference', url: 'https://devstools.app/tools/converters/json-to-python-dataclass' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-go-struct': [
    { name: 'JSON to Go Struct Converter Reference', url: 'https://devstools.app/tools/converters/json-to-go-struct' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-kotlin-class': [
    { name: 'JSON to Kotlin Data Class Converter Reference', url: 'https://devstools.app/tools/converters/json-to-kotlin-class' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-swift-struct': [
    { name: 'JSON to Swift Struct (Codable) Converter Reference', url: 'https://devstools.app/tools/converters/json-to-swift-struct' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-csharp-class': [
    { name: 'JSON to C# Record & Class Converter Reference', url: 'https://devstools.app/tools/converters/json-to-csharp-class' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'proto-to-typescript': [
    { name: 'Protobuf to TypeScript Interface Converter Reference', url: 'https://devstools.app/tools/converters/proto-to-typescript' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'http-headers-to-json': [
    { name: 'HTTP Headers to JSON Converter Reference', url: 'https://devstools.app/tools/converters/http-headers-to-json' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'jwt-builder': [
    { name: 'JWT Payload Builder & Simulator Reference', url: 'https://devstools.app/tools/generators/jwt-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'passphrase-wordlist-generator': [
    { name: 'Diceware Passphrase Generator Reference', url: 'https://devstools.app/tools/crypto/passphrase-wordlist-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'nanoid-custom-alphabet': [
    { name: 'NanoID Custom Alphabet Generator Reference', url: 'https://devstools.app/tools/generators/nanoid-custom-alphabet' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'mock-credit-card-generator': [
    { name: 'Test Credit Card Generator (Luhn Valid) Reference', url: 'https://devstools.app/tools/generators/mock-credit-card-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'tailwind-spacing-generator': [
    { name: 'Tailwind Spacing Scale Generator Reference', url: 'https://devstools.app/tools/generators/tailwind-spacing-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'docker-compose-env-generator': [
    { name: 'Docker Compose .env Template Generator Reference', url: 'https://devstools.app/tools/generators/docker-compose-env-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'dns-propagation-checker': [
    { name: 'DNS Record Propagation Checker Reference', url: 'https://devstools.app/tools/utilities/dns-propagation-checker' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'url-utm-builder': [
    { name: 'Google Analytics UTM Campaign URL Builder Reference', url: 'https://devstools.app/tools/utilities/url-utm-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'sha3-hash-generator': [
    { name: 'SHA-3 (Keccak) Hash Generator Reference', url: 'https://devstools.app/tools/crypto/sha3-hash-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'curl-to-axios': [
    { name: 'cURL to Axios Converter Reference', url: 'https://devstools.app/tools/converters/curl-to-axios' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'fetch-to-curl': [
    { name: 'Fetch to cURL Converter Reference', url: 'https://devstools.app/tools/converters/fetch-to-curl' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-xml': [
    { name: 'JSON to XML Converter Reference', url: 'https://devstools.app/tools/converters/json-to-xml' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'excel-to-json': [
    { name: 'Excel & CSV to JSON Converter Reference', url: 'https://devstools.app/tools/converters/excel-to-json' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-excel': [
    { name: 'JSON to Excel & CSV Converter Reference', url: 'https://devstools.app/tools/converters/json-to-excel' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'image-converter': [
    { name: 'Image Format Converter Reference', url: 'https://devstools.app/tools/converters/image-converter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'images-to-pdf': [
    { name: 'Images to PDF Converter Reference', url: 'https://devstools.app/tools/converters/images-to-pdf' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'image-compressor': [
    { name: 'Image Compressor & Optimizer Reference', url: 'https://devstools.app/tools/utilities/image-compressor' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'image-color-extractor': [
    { name: 'Image Color Palette Extractor Reference', url: 'https://devstools.app/tools/utilities/image-color-extractor' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'pdf-merger': [
    { name: 'PDF Merger & Combiner Reference', url: 'https://devstools.app/tools/utilities/pdf-merger' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'pdf-splitter': [
    { name: 'PDF Splitter & Page Extractor Reference', url: 'https://devstools.app/tools/utilities/pdf-splitter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'llm-pricing-calculator': [
    { name: 'All-in-One LLM Token & Pricing Calculator Reference', url: 'https://devstools.app/tools/utilities/llm-pricing-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'code-playground': [
    { name: 'Live HTML/CSS/JS Sandbox & Playground Reference', url: 'https://devstools.app/tools/utilities/code-playground' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'schema-org-generator': [
    { name: 'Schema.org JSON-LD Generator Reference', url: 'https://devstools.app/tools/generators/schema-org-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'image-exif-stripper': [
    { name: 'Image EXIF Metadata Viewer & Stripper Reference', url: 'https://devstools.app/tools/crypto/image-exif-stripper' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'file-checksum-comparator': [
    { name: 'Multi-Hash File Checksum & Comparator Reference', url: 'https://devstools.app/tools/crypto/file-checksum-comparator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'video-to-gif': [
    { name: 'Video to GIF Maker & Converter Reference', url: 'https://devstools.app/tools/converters/video-to-gif' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'svg-to-png-hd': [
    { name: 'SVG to PNG & JPG High-Res Converter Reference', url: 'https://devstools.app/tools/converters/svg-to-png-hd' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'pdf-to-image': [
    { name: 'PDF to PNG & JPG Image Converter Reference', url: 'https://devstools.app/tools/converters/pdf-to-image' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'audio-converter': [
    { name: 'Audio Format Converter & Trimmer Reference', url: 'https://devstools.app/tools/converters/audio-converter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'swagger-to-typescript': [
    { name: 'Swagger & OpenAPI to TypeScript Client Generator Reference', url: 'https://devstools.app/tools/converters/swagger-to-typescript' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'postman-collection-to-curl': [
    { name: 'Postman Collection to cURL & Fetch Converter Reference', url: 'https://devstools.app/tools/converters/postman-collection-to-curl' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'html-to-gfm-converter': [
    { name: 'HTML to Markdown & Markdown to HTML Converter Reference', url: 'https://devstools.app/tools/converters/html-to-gfm-converter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-csv-grid-editor': [
    { name: 'JSON to CSV & CSV to JSON Interactive Grid Editor Reference', url: 'https://devstools.app/tools/utilities/json-csv-grid-editor' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'tailwind-to-inline-css': [
    { name: 'Tailwind CSS to Inline Style Converter Reference', url: 'https://devstools.app/tools/converters/tailwind-to-inline-css' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-glassmorphism-claymorphism': [
    { name: 'CSS Glassmorphism & Claymorphism 3D Generator Reference', url: 'https://devstools.app/tools/generators/css-glassmorphism-claymorphism' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-clamp-calculator': [
    { name: 'CSS Fluid Clamp & Responsive Typography Calculator Reference', url: 'https://devstools.app/tools/generators/css-clamp-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'llm-function-calling-builder': [
    { name: 'LLM Function Calling & Tool Definition Builder Reference', url: 'https://devstools.app/tools/generators/llm-function-calling-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-json-schema': [
    { name: 'JSON to JSON Schema (Draft-07 & 2020-12) Generator Reference', url: 'https://devstools.app/tools/generators/json-to-json-schema' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'rag-chunking-calculator': [
    { name: 'RAG Text Chunking Visualizer & Cost Estimator Reference', url: 'https://devstools.app/tools/utilities/rag-chunking-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'sql-to-orm-schema': [
    { name: 'SQL DDL to Prisma & Drizzle ORM Schema Converter Reference', url: 'https://devstools.app/tools/converters/sql-to-orm-schema' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'docker-compose-to-kubernetes': [
    { name: 'Docker Compose to Kubernetes YAML Converter Reference', url: 'https://devstools.app/tools/converters/docker-compose-to-kubernetes' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'curl-to-har': [
    { name: 'cURL to HTTP Archive HAR 1.2 Converter Reference', url: 'https://devstools.app/tools/converters/curl-to-har' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'api-mock-response-generator': [
    { name: 'REST API Mock JSON & Fake Data Generator Reference', url: 'https://devstools.app/tools/generators/api-mock-response-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'http-security-headers-analyzer': [
    { name: 'HTTP Security Headers & CORS Analyzer Reference', url: 'https://devstools.app/tools/utilities/http-security-headers-analyzer' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'graphql-schema-to-zod': [
    { name: 'GraphQL SDL to Zod Schema Validator Generator Reference', url: 'https://devstools.app/tools/converters/graphql-schema-to-zod' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-triangle-bubble-generator': [
    { name: 'CSS Triangle & Speech Bubble Polygon Generator Reference', url: 'https://devstools.app/tools/generators/css-triangle-bubble-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'svg-to-css-data-uri': [
    { name: 'SVG to CSS Data URI & Background Mask Inliner Reference', url: 'https://devstools.app/tools/converters/svg-to-css-data-uri' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-3d-box-shadow-generator': [
    { name: 'CSS Multi-Layer 3D Box Shadow Generator Reference', url: 'https://devstools.app/tools/generators/css-3d-box-shadow-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'html-entities-converter': [
    { name: 'HTML Entities to Unicode & Character Encoder Reference', url: 'https://devstools.app/tools/encoding/html-entities-converter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'system-prompt-xml-builder': [
    { name: 'Claude & OpenAI XML Structured System Prompt Builder Reference', url: 'https://devstools.app/tools/generators/system-prompt-xml-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'multi-llm-token-comparator': [
    { name: 'Multi-Model LLM Token Counter & Cost Comparator Reference', url: 'https://devstools.app/tools/utilities/multi-llm-token-comparator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-python-pydantic': [
    { name: 'JSON to Python Pydantic V2 & TypedDict Generator Reference', url: 'https://devstools.app/tools/converters/json-to-python-pydantic' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-sql-insert': [
    { name: 'JSON & CSV to SQL INSERT & UPDATE Generator Reference', url: 'https://devstools.app/tools/converters/json-to-sql-insert' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'nginx-to-caddy-converter': [
    { name: 'Nginx to Caddyfile & Apache Reverse Proxy Converter Reference', url: 'https://devstools.app/tools/converters/nginx-to-caddy-converter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'git-command-cheat-builder': [
    { name: 'Git Advanced Command & Workflow Builder Reference', url: 'https://devstools.app/tools/generators/git-command-cheat-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'crontab-schedule-translator': [
    { name: 'Crontab Schedule & Human Language Translator Reference', url: 'https://devstools.app/tools/utilities/crontab-schedule-translator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'bcrypt-hash-calculator': [
    { name: 'Bcrypt & Argon2 Password Hash Generator & Verifier Reference', url: 'https://devstools.app/tools/crypto/bcrypt-hash-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-rust-types': [
    { name: 'JSON to Rust Serde Structs Reference', url: 'https://devstools.app/tools/converters/json-to-rust-types' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-golang-models': [
    { name: 'JSON to Golang Struct Generator Reference', url: 'https://devstools.app/tools/converters/json-to-golang-models' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'sql-to-go-gorm': [
    { name: 'SQL DDL to Go GORM Models Reference', url: 'https://devstools.app/tools/converters/sql-to-go-gorm' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'sql-to-python-sqlalchemy': [
    { name: 'SQL DDL to SQLAlchemy 2.0 Models Reference', url: 'https://devstools.app/tools/converters/sql-to-python-sqlalchemy' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'postman-to-openapi': [
    { name: 'Postman Collection to OpenAPI 3.1 Converter Reference', url: 'https://devstools.app/tools/converters/postman-to-openapi' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'openapi-to-postman': [
    { name: 'OpenAPI to Postman Collection Generator Reference', url: 'https://devstools.app/tools/converters/openapi-to-postman' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'protobuf-to-json-schema': [
    { name: 'Protobuf 3 to JSON Schema Converter Reference', url: 'https://devstools.app/tools/converters/protobuf-to-json-schema' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-schema-to-protobuf': [
    { name: 'JSON Schema to Protobuf 3 Generator Reference', url: 'https://devstools.app/tools/converters/json-schema-to-protobuf' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'yaml-to-terraform-hcl': [
    { name: 'YAML to Terraform HCL Converter Reference', url: 'https://devstools.app/tools/converters/yaml-to-terraform-hcl' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'terraform-hcl-to-yaml': [
    { name: 'Terraform HCL to YAML Converter Reference', url: 'https://devstools.app/tools/converters/terraform-hcl-to-yaml' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'csv-to-geojson': [
    { name: 'CSV to GeoJSON Point Converter Reference', url: 'https://devstools.app/tools/converters/csv-to-geojson' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'geojson-to-csv': [
    { name: 'GeoJSON to CSV Coordinate Converter Reference', url: 'https://devstools.app/tools/converters/geojson-to-csv' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-to-typescript-type-guards': [
    { name: 'JSON to TypeScript Type Guards Generator Reference', url: 'https://devstools.app/tools/converters/json-to-typescript-type-guards' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'typescript-interface-to-zod': [
    { name: 'TypeScript Interface to Zod Schema Reference', url: 'https://devstools.app/tools/converters/typescript-interface-to-zod' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'zod-to-typescript-type': [
    { name: 'Zod Schema to TypeScript Type Inferer Reference', url: 'https://devstools.app/tools/converters/zod-to-typescript-type' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-to-scss': [
    { name: 'CSS to Nested SCSS & SASS Converter Reference', url: 'https://devstools.app/tools/converters/css-to-scss' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'scss-to-css': [
    { name: 'SCSS & SASS to Vanilla CSS Converter Reference', url: 'https://devstools.app/tools/converters/scss-to-css' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'html-to-jsx-tailwind': [
    { name: 'HTML to JSX & Tailwind CSS Converter Reference', url: 'https://devstools.app/tools/converters/html-to-jsx-tailwind' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'jsx-to-html': [
    { name: 'React JSX to Standard HTML Converter Reference', url: 'https://devstools.app/tools/converters/jsx-to-html' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'markdown-to-bbcode': [
    { name: 'Markdown to Forum BBCode Converter Reference', url: 'https://devstools.app/tools/converters/markdown-to-bbcode' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'bbcode-to-markdown': [
    { name: 'BBCode to GitHub Markdown Converter Reference', url: 'https://devstools.app/tools/converters/bbcode-to-markdown' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'curl-to-php-guzzle': [
    { name: 'cURL to PHP Guzzle Client Converter Reference', url: 'https://devstools.app/tools/converters/curl-to-php-guzzle' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'curl-to-ruby-faraday': [
    { name: 'cURL to Ruby Faraday Client Converter Reference', url: 'https://devstools.app/tools/converters/curl-to-ruby-faraday' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'curl-to-rust-reqwest': [
    { name: 'cURL to Rust reqwest Async Client Reference', url: 'https://devstools.app/tools/converters/curl-to-rust-reqwest' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'curl-to-go-http': [
    { name: 'cURL to Go net/http Client Converter Reference', url: 'https://devstools.app/tools/converters/curl-to-go-http' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'svg-to-android-vector': [
    { name: 'SVG to Android Vector Drawable XML Reference', url: 'https://devstools.app/tools/converters/svg-to-android-vector' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'svg-to-swiftui-shape': [
    { name: 'SVG to SwiftUI Shape & Path Generator Reference', url: 'https://devstools.app/tools/converters/svg-to-swiftui-shape' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-grid-to-tailwind': [
    { name: 'CSS Grid to Tailwind CSS Classes Reference', url: 'https://devstools.app/tools/converters/css-grid-to-tailwind' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'dockerfile-ai-optimized-generator': [
    { name: 'Multi-Stage Dockerfile Generator Reference', url: 'https://devstools.app/tools/generators/dockerfile-ai-optimized-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'kubernetes-deployment-generator': [
    { name: 'Kubernetes Deployment YAML Generator Reference', url: 'https://devstools.app/tools/generators/kubernetes-deployment-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'kubernetes-configmap-secret-builder': [
    { name: 'K8s ConfigMap & Secret Manifest Builder Reference', url: 'https://devstools.app/tools/generators/kubernetes-configmap-secret-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'helm-chart-yaml-generator': [
    { name: 'Helm Chart & Values Scaffold Generator Reference', url: 'https://devstools.app/tools/generators/helm-chart-yaml-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'gitlab-ci-pipeline-builder': [
    { name: 'GitLab CI/CD Pipeline YAML Builder Reference', url: 'https://devstools.app/tools/generators/gitlab-ci-pipeline-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'github-issue-pr-template-generator': [
    { name: 'GitHub Issue & PR Template Builder Reference', url: 'https://devstools.app/tools/generators/github-issue-pr-template-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'opa-rego-policy-builder': [
    { name: 'Open Policy Agent (OPA) Rego Builder Reference', url: 'https://devstools.app/tools/generators/opa-rego-policy-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'systemd-service-hardened-builder': [
    { name: 'Linux systemd Hardened Service Builder Reference', url: 'https://devstools.app/tools/generators/systemd-service-hardened-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'nginx-security-conf-generator': [
    { name: 'Hardened Nginx Server Configuration Builder Reference', url: 'https://devstools.app/tools/generators/nginx-security-conf-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'caddyfile-production-generator': [
    { name: 'Production Caddyfile Configuration Builder Reference', url: 'https://devstools.app/tools/generators/caddyfile-production-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'prometheus-recording-rules-generator': [
    { name: 'Prometheus Alerting & Recording Rules Builder Reference', url: 'https://devstools.app/tools/generators/prometheus-recording-rules-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'tailwind-v4-mesh-gradient-generator': [
    { name: 'Tailwind CSS Mesh Radial Gradient Generator Reference', url: 'https://devstools.app/tools/generators/tailwind-v4-mesh-gradient-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-isometric-grid-generator': [
    { name: 'CSS Isometric 3D Grid & Transform Generator Reference', url: 'https://devstools.app/tools/generators/css-isometric-grid-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-ribbon-banner-generator': [
    { name: 'CSS Corner Ribbon & Badge Generator Reference', url: 'https://devstools.app/tools/generators/css-ribbon-banner-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'svg-wavy-divider-generator': [
    { name: 'SVG Wavy Page Section Divider Generator Reference', url: 'https://devstools.app/tools/generators/svg-wavy-divider-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'opengraph-banner-canvas-generator': [
    { name: 'OpenGraph & Twitter Card Meta Tags Builder Reference', url: 'https://devstools.app/tools/generators/opengraph-banner-canvas-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'prisma-seed-generator': [
    { name: 'Prisma Client Seeding Script Generator Reference', url: 'https://devstools.app/tools/generators/prisma-seed-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'faker-js-mock-schema-generator': [
    { name: 'Faker.js Synthetic Dataset Generator Reference', url: 'https://devstools.app/tools/generators/faker-js-mock-schema-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'llm-few-shot-prompt-formatter': [
    { name: 'LLM Few-Shot Structured Prompt Builder Reference', url: 'https://devstools.app/tools/generators/llm-few-shot-prompt-formatter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'cot-chain-of-thought-prompt-builder': [
    { name: 'Chain-of-Thought (CoT) Prompt Builder Reference', url: 'https://devstools.app/tools/generators/cot-chain-of-thought-prompt-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'sql-stored-procedure-generator': [
    { name: 'SQL Stored Procedure & Trigger Generator Reference', url: 'https://devstools.app/tools/generators/sql-stored-procedure-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'redis-lua-script-generator': [
    { name: 'Atomic Redis Lua Script Generator Reference', url: 'https://devstools.app/tools/generators/redis-lua-script-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'crontab-randomized-generator': [
    { name: 'Crontab Jitter & Randomized Offset Generator Reference', url: 'https://devstools.app/tools/generators/crontab-randomized-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'ansible-playbook-scaffolder': [
    { name: 'Ansible Automation Playbook Scaffolder Reference', url: 'https://devstools.app/tools/generators/ansible-playbook-scaffolder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'terraform-module-scaffolder': [
    { name: 'Modular Terraform Module Scaffolder Reference', url: 'https://devstools.app/tools/generators/terraform-module-scaffolder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'http-cache-control-tester': [
    { name: 'HTTP Cache-Control Header Tester Reference', url: 'https://devstools.app/tools/utilities/http-cache-control-tester' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'dns-soa-dnssec-inspector': [
    { name: 'DNS SOA Serial & DNSSEC Record Inspector Reference', url: 'https://devstools.app/tools/utilities/dns-soa-dnssec-inspector' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'ip-supernetting-calculator': [
    { name: 'IP Supernetting & CIDR Aggregator Reference', url: 'https://devstools.app/tools/utilities/ip-supernetting-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'opengraph-tag-inspector': [
    { name: 'OpenGraph & Social Meta Tag Inspector Reference', url: 'https://devstools.app/tools/utilities/opengraph-tag-inspector' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'jwt-expiry-calculator': [
    { name: 'JWT Token Expiry & Lifetime Calculator Reference', url: 'https://devstools.app/tools/utilities/jwt-expiry-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'regex-benchmark-simulator': [
    { name: 'Regex ReDoS & Backtracking Risk Analyzer Reference', url: 'https://devstools.app/tools/utilities/regex-benchmark-simulator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'llm-context-window-shrinker': [
    { name: 'LLM Prompt Context Window Optimizer Reference', url: 'https://devstools.app/tools/utilities/llm-context-window-shrinker' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'embedding-token-cost-estimator': [
    { name: 'Text Embedding Token & API Cost Estimator Reference', url: 'https://devstools.app/tools/utilities/embedding-token-cost-estimator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'webhook-payload-simulator': [
    { name: 'Webhook Mock Event Payload Simulator Reference', url: 'https://devstools.app/tools/utilities/webhook-payload-simulator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'network-port-reference': [
    { name: 'TCP/UDP Port Number Reference & Directory Reference', url: 'https://devstools.app/tools/utilities/network-port-reference' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'ssl-tls-handshake-simulator': [
    { name: 'TLS 1.2 & TLS 1.3 Cryptographic Handshake Simulator Reference', url: 'https://devstools.app/tools/utilities/ssl-tls-handshake-simulator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'http2-http3-frame-inspector': [
    { name: 'HTTP/2 & HTTP/3 QUIC Frame Inspector Reference', url: 'https://devstools.app/tools/utilities/http2-http3-frame-inspector' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'dns-spf-record-flattener': [
    { name: 'DNS SPF Lookup Counter & Record Flattener Reference', url: 'https://devstools.app/tools/utilities/dns-spf-record-flattener' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'mime-type-extension-lookup': [
    { name: 'File Extension to MIME Content-Type Lookup Reference', url: 'https://devstools.app/tools/utilities/mime-type-extension-lookup' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'color-blindness-simulator': [
    { name: 'Color Blindness Accessibility Simulator Reference', url: 'https://devstools.app/tools/utilities/color-blindness-simulator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'contrast-ratio-apca-calculator': [
    { name: 'WCAG & APCA Text Contrast Ratio Calculator Reference', url: 'https://devstools.app/tools/utilities/contrast-ratio-apca-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'viewport-size-tester': [
    { name: 'Responsive Viewport & Breakpoint Inspector Reference', url: 'https://devstools.app/tools/utilities/viewport-size-tester' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'unicode-glyph-category-inspector': [
    { name: 'Unicode Glyph & Code Point Inspector Reference', url: 'https://devstools.app/tools/utilities/unicode-glyph-category-inspector' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'seo-robots-noindex-simulator': [
    { name: 'Robots.txt & X-Robots-Tag Indexing Simulator Reference', url: 'https://devstools.app/tools/utilities/seo-robots-noindex-simulator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'cors-preflight-inspector': [
    { name: 'CORS Preflight OPTIONS Request Inspector Reference', url: 'https://devstools.app/tools/utilities/cors-preflight-inspector' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'css-selector-speed-profiler': [
    { name: 'CSS Selector Specificity & Speed Profiler Reference', url: 'https://devstools.app/tools/utilities/css-selector-speed-profiler' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'git-conflict-marker-cleaner': [
    { name: 'Git Merge Conflict Marker Stripper Reference', url: 'https://devstools.app/tools/utilities/git-conflict-marker-cleaner' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'semver-range-evaluator': [
    { name: 'Semantic Versioning (SemVer) Range Evaluator Reference', url: 'https://devstools.app/tools/utilities/semver-range-evaluator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'package-json-license-checker': [
    { name: 'package.json Open Source License Checker Reference', url: 'https://devstools.app/tools/utilities/package-json-license-checker' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'api-rate-limit-cost-calculator': [
    { name: 'Token Bucket API Rate Limit Calculator Reference', url: 'https://devstools.app/tools/utilities/api-rate-limit-cost-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'blake3-hash-generator': [
    { name: 'BLAKE3 Cryptographic Hash Generator Reference', url: 'https://devstools.app/tools/crypto/blake3-hash-generator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'pbkdf2-key-derivation': [
    { name: 'PBKDF2 Key Derivation Function Calculator Reference', url: 'https://devstools.app/tools/crypto/pbkdf2-key-derivation' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'hmac-sha384-sha512-calculator': [
    { name: 'HMAC-SHA384 & HMAC-SHA512 Signature Generator Reference', url: 'https://devstools.app/tools/crypto/hmac-sha384-sha512-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'ethereum-eip191-signature-verifier': [
    { name: 'Ethereum EIP-191 Personal Sign Validator Reference', url: 'https://devstools.app/tools/crypto/ethereum-eip191-signature-verifier' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'bitcoin-bech32-address-encoder': [
    { name: 'Bitcoin Bech32 & SegWit Address Validator Reference', url: 'https://devstools.app/tools/crypto/bitcoin-bech32-address-encoder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'rsa-pkcs1-pkcs8-converter': [
    { name: 'RSA PKCS#1 to PKCS#8 Key Format Inspector Reference', url: 'https://devstools.app/tools/crypto/rsa-pkcs1-pkcs8-converter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'x509-san-csr-builder': [
    { name: 'X.509 CSR with Subject Alternative Name (SAN) Builder Reference', url: 'https://devstools.app/tools/crypto/x509-san-csr-builder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'ed25519-sign-verify': [
    { name: 'Ed25519 Signature & Key Pair Inspector Reference', url: 'https://devstools.app/tools/crypto/ed25519-sign-verify' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'argon2-parameter-tuner': [
    { name: 'Argon2id Memory & Cost Parameter Tuner Reference', url: 'https://devstools.app/tools/crypto/argon2-parameter-tuner' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'uuid-v7-timestamp-extractor': [
    { name: 'UUIDv7 Timestamp & Date Extractor Reference', url: 'https://devstools.app/tools/crypto/uuid-v7-timestamp-extractor' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'ethereum-abi-storage-slot-calculator': [
    { name: 'Solidity EVM State Variable Storage Slot Calculator Reference', url: 'https://devstools.app/tools/crypto/ethereum-abi-storage-slot-calculator' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'base64-pem-certificate-parser': [
    { name: 'X.509 TLS/SSL Certificate SAN & Info Parser Reference', url: 'https://devstools.app/tools/crypto/base64-pem-certificate-parser' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'punycode-idn-converter': [
    { name: 'Punycode IDN Domain Converter Reference', url: 'https://devstools.app/tools/encoding/punycode-idn-converter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'crockford-base32-encoder': [
    { name: 'Crockford Base32 Encoder & Decoder Reference', url: 'https://devstools.app/tools/encoding/crockford-base32-encoder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'bcd-binary-coded-decimal-converter': [
    { name: 'Binary Coded Decimal (BCD 8421) Converter Reference', url: 'https://devstools.app/tools/encoding/bcd-binary-coded-decimal-converter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'ieee754-hex-float-converter': [
    { name: 'IEEE-754 Floating Point to Hex Converter Reference', url: 'https://devstools.app/tools/encoding/ieee754-hex-float-converter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'rot47-encoder-decoder': [
    { name: 'ROT47 Cipher Text Encoder & Decoder Reference', url: 'https://devstools.app/tools/encoding/rot47-encoder-decoder' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'url-safe-base64-converter': [
    { name: 'URL-Safe Base64 (Base64url) Converter Reference', url: 'https://devstools.app/tools/encoding/url-safe-base64-converter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-path-query-tester': [
    { name: 'JSONPath Query Evaluator & Filter Reference', url: 'https://devstools.app/tools/json/json-path-query-tester' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-key-sorter': [
    { name: 'JSON Alphabetical Key Sorter Reference', url: 'https://devstools.app/tools/json/json-key-sorter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'json-array-splitter-chunker': [
    { name: 'JSON Large Array Batch Splitter Reference', url: 'https://devstools.app/tools/json/json-array-splitter-chunker' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'text-prefix-suffix-appender': [
    { name: 'Multi-Line Text Prefix & Suffix Appender Reference', url: 'https://devstools.app/tools/text/text-prefix-suffix-appender' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'text-duplicate-line-counter': [
    { name: 'Duplicate Line Frequency Counter Reference', url: 'https://devstools.app/tools/text/text-duplicate-line-counter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
  'text-column-tabular-splitter': [
    { name: 'Text Delimited Column Tabular Splitter Reference', url: 'https://devstools.app/tools/text/text-column-tabular-splitter' },
    { name: 'Developer Documentation', url: 'https://developer.mozilla.org' },
  ],
};

export function getToolSources(slug: string): ToolSource[] {
  return toolSources[slug] || [];
}
