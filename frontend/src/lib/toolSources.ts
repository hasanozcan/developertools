export interface ToolSource {
  name: string;
  url: string;
}

export const toolSources: Record<string, ToolSource[]> = {
  'quoted-printable-encoder': [
    { name: 'RFC 2045 Section 6.7 Quoted-Printable', url: 'https://www.rfc-editor.org/rfc/rfc2045.html#section-6.7' },
    { name: 'RFC 2047 MIME Message Header Extensions', url: 'https://www.rfc-editor.org/rfc/rfc2047.html' },
    { name: 'Python quopri module', url: 'https://docs.python.org/3/library/quopri.html' },
  ],
  'json-patch-generator': [
    { name: 'RFC 6902 JSON Patch', url: 'https://www.rfc-editor.org/rfc/rfc6902.html' },
    { name: 'RFC 6901 JSON Pointer', url: 'https://www.rfc-editor.org/rfc/rfc6901.html' },
    { name: 'RFC 8259 JSON Data Interchange', url: 'https://www.rfc-editor.org/rfc/rfc8259.html' },
  ],
  'json-flatten-unflatten': [
    { name: 'RFC 8259 JSON Specification', url: 'https://www.rfc-editor.org/rfc/rfc8259.html' },
    { name: 'MDN Object.entries', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries' },
    { name: 'MDN JSON Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON' },
  ],
  'base64url-encoder': [
    { name: 'RFC 4648 Section 5 Base64URL', url: 'https://www.rfc-editor.org/rfc/rfc4648.html#section-5' },
    { name: 'RFC 7515 JSON Web Signature (JWS)', url: 'https://www.rfc-editor.org/rfc/rfc7515.html' },
    { name: 'MDN Base64 Encoding', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Base64' },
  ],
  'subtitle-srt-vtt-converter': [
    { name: 'W3C WebVTT Specification', url: 'https://www.w3.org/TR/webvtt1/' },
    { name: 'MDN WebVTT API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API' },
    { name: 'MDN HTML track Element', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track' },
  ],
  'sql-slugifier': [
    { name: 'PostgreSQL Lexical Identifiers', url: 'https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-IDENTIFIERS' },
    { name: 'MySQL Schema Object Names', url: 'https://dev.mysql.com/doc/refman/8.4/en/identifiers.html' },
  ],
  'ai-agent-prompt-optimizer': [
    { name: 'Anthropic Prompt Engineering Guide', url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview' },
    { name: 'OpenAI Prompt Engineering Guide', url: 'https://platform.openai.com/docs/guides/prompt-engineering' },
  ],
  'apache-conf-formatter': [
    { name: 'Apache HTTP Server Configuration', url: 'https://httpd.apache.org/docs/current/configuring.html' },
    { name: 'Apache VirtualHost Documentation', url: 'https://httpd.apache.org/docs/current/vhosts/' },
    { name: 'Apache Core Directives', url: 'https://httpd.apache.org/docs/current/mod/core.html' },
  ],
  'docker-compose-formatter': [
    { name: 'Docker Compose File Reference', url: 'https://docs.docker.com/reference/compose-file/' },
    { name: 'YAML 1.2.2 Specification', url: 'https://yaml.org/spec/1.2.2/' },
  ],
  'toml-formatter': [
    { name: 'TOML v1.0.0 Specification', url: 'https://toml.io/en/v1.0.0' },
    { name: 'Python tomllib Documentation', url: 'https://docs.python.org/3/library/tomllib.html' },
  ],
  'protobuf-formatter': [
    { name: 'Protocol Buffers Language Guide (proto3)', url: 'https://protobuf.dev/programming-guides/proto3/' },
    { name: 'Protocol Buffers Style Guide', url: 'https://protobuf.dev/programming-guides/style/' },
  ],
  'ed25519-key-generator': [
    { name: 'RFC 8032 EdDSA (Ed25519)', url: 'https://www.rfc-editor.org/rfc/rfc8032.html' },
    { name: 'MDN SubtleCrypto.generateKey', url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey' },
    { name: 'Node.js crypto.generateKeyPair', url: 'https://nodejs.org/api/crypto.html#cryptogeneratekeypairtype-options-callback' },
  ],
  'x509-csr-decoder': [
    { name: 'RFC 2986 PKCS #10 CSR Syntax', url: 'https://www.rfc-editor.org/rfc/rfc2986.html' },
    { name: 'RFC 7468 PEM Textual Encodings', url: 'https://www.rfc-editor.org/rfc/rfc7468.html' },
    { name: 'OpenSSL req Manual', url: 'https://docs.openssl.org/master/man1/openssl-req/' },
  ],
  'abi-encoder-decoder': [
    { name: 'Solidity Contract ABI Specification', url: 'https://docs.soliditylang.org/en/latest/abi-spec.html' },
    { name: 'Ethereum JSON-RPC Specification', url: 'https://ethereum.org/en/developers/docs/apis/json-rpc/' },
  ],
  'ethereum-keccak256-hasher': [
    { name: 'Solidity ABI Function Selectors', url: 'https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector' },
    { name: 'NIST FIPS 202 SHA-3 Standard', url: 'https://csrc.nist.gov/pubs/fips/202/final' },
    { name: 'Ethereum Smart Contract ABI', url: 'https://ethereum.org/en/developers/docs/smart-contracts/compiling/' },
  ],
  'solana-address-validator': [
    { name: 'Solana Accounts Model', url: 'https://solana.com/docs/core/accounts' },
    { name: 'IETF Base58 Encoding Specification', url: 'https://datatracker.ietf.org/doc/html/draft-msporny-base58-03' },
  ],
  'mongodb-aggregate-builder': [
    { name: 'MongoDB Aggregation Pipeline', url: 'https://www.mongodb.com/docs/manual/core/aggregation-pipeline/' },
    { name: 'MongoDB Aggregation Pipeline Stages', url: 'https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/' },
  ],
  'clickhouse-ddl-generator': [
    { name: 'ClickHouse MergeTree Table Engine', url: 'https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/mergetree' },
    { name: 'ClickHouse CREATE TABLE Reference', url: 'https://clickhouse.com/docs/en/sql-reference/statements/create/table' },
  ],
  'elasticsearch-query-builder': [
    { name: 'Elasticsearch Query DSL', url: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html' },
    { name: 'Elasticsearch Boolean Query', url: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html' },
  ],
  'react-hook-form-generator': [
    { name: 'React Hook Form Get Started', url: 'https://react-hook-form.com/get-started' },
    { name: 'React Hook Form useForm API', url: 'https://react-hook-form.com/docs/useform' },
    { name: 'React input Reference', url: 'https://react.dev/reference/react-dom/components/input' },
  ],
  'gitlab-ci-generator': [
    { name: 'GitLab CI/CD YAML Syntax Reference', url: 'https://docs.gitlab.com/ee/ci/yaml/' },
    { name: 'GitLab CI/CD Pipelines Guide', url: 'https://docs.gitlab.com/ee/ci/pipelines/' },
  ],
  'kubernetes-ingress-generator': [
    { name: 'Kubernetes Ingress Concepts', url: 'https://kubernetes.io/docs/concepts/services-networking/ingress/' },
    { name: 'cert-manager Ingress Annotations', url: 'https://cert-manager.io/docs/usage/ingress/' },
  ],
  'ollama-modelfile-generator': [
    { name: 'Ollama Modelfile Reference', url: 'https://github.com/ollama/ollama/blob/main/docs/modelfile.md' },
    { name: 'Ollama REST API Documentation', url: 'https://github.com/ollama/ollama/blob/main/docs/api.md' },
  ],
  'cloudflare-wrangler-builder': [
    { name: 'Cloudflare Wrangler Configuration', url: 'https://developers.cloudflare.com/workers/wrangler/configuration/' },
    { name: 'Cloudflare Workers KV Docs', url: 'https://developers.cloudflare.com/kv/' },
    { name: 'Cloudflare D1 Database Docs', url: 'https://developers.cloudflare.com/d1/' },
  ],
  'github-actions-matrix-builder': [
    { name: 'GitHub Actions Matrix Strategy', url: 'https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs' },
    { name: 'GitHub Actions Workflow Syntax', url: 'https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions' },
  ],
  'tailwind-v4-color-palette': [
    { name: 'Tailwind CSS Colors Reference', url: 'https://tailwindcss.com/docs/colors' },
    { name: 'Tailwind CSS Theme Variables', url: 'https://tailwindcss.com/docs/theme' },
    { name: 'W3C CSS Color Level 4 (OKLCH)', url: 'https://www.w3.org/TR/css-color-4/#oklab-oklch-color' },
  ],
  'shadcn-theme-generator': [
    { name: 'shadcn/ui Theming Documentation', url: 'https://ui.shadcn.com/docs/theming' },
    { name: 'Radix UI Colors System', url: 'https://www.radix-ui.com/colors' },
    { name: 'MDN CSS Custom Properties', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties' },
  ],
  'svg-to-webp': [
    { name: 'W3C SVG 2 Specification', url: 'https://www.w3.org/TR/SVG2/' },
    { name: 'WebP Container Specification', url: 'https://developers.google.com/speed/webp/docs/riff_container' },
    { name: 'MDN HTMLCanvasElement.toDataURL', url: 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL' },
  ],
  'har-to-k6': [
    { name: 'Grafana k6 Documentation', url: 'https://grafana.com/docs/k6/latest/' },
    { name: 'W3C HAR 1.2 Specification', url: 'https://w3c.github.io/web-performance/specs/HAR/Overview.html' },
    { name: 'k6 HTTP Requests Guide', url: 'https://grafana.com/docs/k6/latest/using-k6/http-requests/' },
  ],
  'json-to-graphql-query': [
    { name: 'GraphQL Specification', url: 'https://spec.graphql.org/October2021/' },
    { name: 'GraphQL Queries & Mutations', url: 'https://graphql.org/learn/queries/' },
  ],
  'avro-to-json-schema': [
    { name: 'Apache Avro Specification', url: 'https://avro.apache.org/docs/current/specification/' },
    { name: 'JSON Schema 2020-12 Core', url: 'https://json-schema.org/draft/2020-12/json-schema-core' },
  ],
  'openapi-to-typescript-fetch': [
    { name: 'OpenAPI Specification v3.1.0', url: 'https://spec.openapis.org/oas/v3.1.0' },
    { name: 'MDN Fetch API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API' },
    { name: 'TypeScript Everyday Types', url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html' },
  ],
  'svg-to-react-native': [
    { name: 'SVGR Documentation', url: 'https://react-svgr.com/docs/getting-started/' },
    { name: 'react-native-svg Repository', url: 'https://github.com/software-mansion/react-native-svg' },
    { name: 'W3C SVG 2 Specification', url: 'https://www.w3.org/TR/SVG2/' },
  ],
  'json-schema-to-zod': [
    { name: 'Zod Documentation', url: 'https://zod.dev/' },
    { name: 'JSON Schema Specification', url: 'https://json-schema.org/specification' },
  ],
  'zod-to-json-schema': [
    { name: 'Zod Documentation', url: 'https://zod.dev/' },
    { name: 'JSON Schema Draft-07', url: 'https://json-schema.org/draft-07/schema' },
  ],
  'aspect-ratio-resizer': [
    { name: 'MDN CSS aspect-ratio', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio' },
    { name: 'MDN Responsive Images', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images' },
  ],
  'subresource-integrity-generator': [
    { name: 'W3C Subresource Integrity', url: 'https://www.w3.org/TR/SRI/' },
    { name: 'MDN Subresource Integrity', url: 'https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity' },
    { name: 'MDN SubtleCrypto.digest', url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest' },
  ],
  'csp-evaluator': [
    { name: 'W3C Content Security Policy Level 3', url: 'https://www.w3.org/TR/CSP3/' },
    { name: 'MDN Content Security Policy (CSP)', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP' },
    { name: 'OWASP CSP Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html' },
  ],
  'nginx-rate-limit-calculator': [
    { name: 'Nginx ngx_http_limit_req_module', url: 'https://nginx.org/en/docs/http/ngx_http_limit_req_module.html' },
    { name: 'Nginx Core Documentation', url: 'https://nginx.org/en/docs/' },
  ],
  'rag-chunking-visualizer': [
    { name: 'OpenAI Embeddings Guide', url: 'https://platform.openai.com/docs/guides/embeddings' },
    { name: 'LangChain Text Splitters', url: 'https://python.langchain.com/docs/concepts/text_splitters/' },
  ],
  'mcp-inspector': [
    { name: 'Model Context Protocol Specification', url: 'https://modelcontextprotocol.io/specification/2025-03-26' },
    { name: 'JSON-RPC 2.0 Specification', url: 'https://www.jsonrpc.org/specification' },
  ],
  'tiktoken-visualizer': [
    { name: 'OpenAI tiktoken BPE Tokenizer', url: 'https://github.com/openai/tiktoken' },
    { name: 'OpenAI Models Reference', url: 'https://platform.openai.com/docs/models' },
  ],
  'claude-token-counter': [
    { name: 'Anthropic token counting guide', url: 'https://platform.claude.com/docs/en/build-with-claude/token-counting' },
    { name: 'Claude API pricing', url: 'https://platform.claude.com/docs/en/about-claude/pricing' },
  ],
  'deepseek-token-counter': [
    { name: 'DeepSeek Models & Pricing', url: 'https://api-docs.deepseek.com/quick_start/pricing' },
    { name: 'DeepSeek Token Usage Guide', url: 'https://api-docs.deepseek.com/quick_start/token_usage' },
  ],
  'json-formatter': [
    { name: 'RFC 8259 JSON Specification', url: 'https://www.rfc-editor.org/rfc/rfc8259.html' },
    { name: 'MDN JSON.stringify', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify' },
  ],
  'json-validator': [
    { name: 'RFC 8259 JSON Specification', url: 'https://www.rfc-editor.org/rfc/rfc8259.html' },
    { name: 'ECMA-404 JSON Standard', url: 'https://ecma-international.org/publications-and-standards/standards/ecma-404/' },
    { name: 'MDN JSON.parse', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse' },
  ],
  'json-csv': [
    { name: 'RFC 4180 CSV Format', url: 'https://www.rfc-editor.org/rfc/rfc4180.html' },
    { name: 'RFC 8259 JSON Specification', url: 'https://www.rfc-editor.org/rfc/rfc8259.html' },
    { name: 'Python csv Module', url: 'https://docs.python.org/3/library/csv.html' },
  ],
  'json-to-typescript': [
    { name: 'TypeScript Object Types', url: 'https://www.typescriptlang.org/docs/handbook/2/objects.html' },
    { name: 'TypeScript Interfaces', url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces' },
    { name: 'RFC 8259 JSON Specification', url: 'https://www.rfc-editor.org/rfc/rfc8259.html' },
  ],
  'base64': [
    { name: 'RFC 4648 Base64 Encoding', url: 'https://www.rfc-editor.org/rfc/rfc4648.html' },
    { name: 'MDN Base64 Glossary', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Base64' },
    { name: 'MDN Window.btoa', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/btoa' },
  ],
  'url-encoder': [
    { name: 'RFC 3986 Percent-Encoding', url: 'https://www.rfc-editor.org/rfc/rfc3986.html#section-2.1' },
    { name: 'WHATWG URL Standard', url: 'https://url.spec.whatwg.org/' },
    { name: 'MDN encodeURIComponent', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent' },
  ],
  'jwt-decoder': [
    { name: 'RFC 7519 JSON Web Token (JWT)', url: 'https://www.rfc-editor.org/rfc/rfc7519.html' },
    { name: 'RFC 7515 JSON Web Signature (JWS)', url: 'https://www.rfc-editor.org/rfc/rfc7515.html' },
    { name: 'OWASP JWT Security Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html' },
  ],
  'html-entity': [
    { name: 'WHATWG HTML Named Character References', url: 'https://html.spec.whatwg.org/multipage/named-characters.html' },
    { name: 'MDN Character Reference', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Character_reference' },
  ],
  'uuid-generator': [
    { name: 'RFC 9562 UUID versions', url: 'https://www.rfc-editor.org/rfc/rfc9562.html' },
    { name: 'MDN crypto.randomUUID', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID' },
    { name: 'Python uuid', url: 'https://docs.python.org/3/library/uuid.html' },
  ],
  'password-generator': [
    { name: 'NIST SP 800-63B Digital Identity', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
    { name: 'MDN Crypto.getRandomValues', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues' },
    { name: 'OWASP Authentication Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html' },
  ],
  'qr-code': [
    { name: 'ISO/IEC 18004 QR Code Standard', url: 'https://www.iso.org/standard/62021.html' },
    { name: 'Denso Wave QR Code Overview', url: 'https://www.qrcode.com/en/about/' },
  ],
  'slug-generator': [
    { name: 'RFC 3986 URI Path Syntax', url: 'https://www.rfc-editor.org/rfc/rfc3986.html#section-3.3' },
    { name: 'Unicode Normalization Forms (UAX #15)', url: 'https://unicode.org/reports/tr15/' },
  ],
  'css-gradient': [
    { name: 'W3C CSS Images Module Level 3', url: 'https://www.w3.org/TR/css-images-3/' },
    { name: 'MDN Using CSS Gradients', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_images/Using_CSS_gradients' },
  ],
  'meta-tags': [
    { name: 'MDN HTML meta Element', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta' },
    { name: 'The Open Graph Protocol', url: 'https://ogp.me/' },
    { name: 'Google Search Special Meta Tags', url: 'https://developers.google.com/search/docs/crawling-indexing/special-tags' },
  ],
  'md5-hash': [
    { name: 'RFC 1321 MD5 Message-Digest Algorithm', url: 'https://www.rfc-editor.org/rfc/rfc1321.html' },
    { name: 'Python hashlib Module', url: 'https://docs.python.org/3/library/hashlib.html' },
  ],
  'sha256-hash': [
    { name: 'MDN Web Crypto digest', url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest' },
    { name: 'Python hashlib', url: 'https://docs.python.org/3/library/hashlib.html' },
  ],
  'regex-tester': [
    { name: 'MDN Regular Expressions Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions' },
    { name: 'ECMA-262 RegExp Specification', url: 'https://tc39.es/ecma262/multipage/text-processing.html#sec-regexp-regular-expression-objects' },
  ],
  'text-diff': [
    { name: 'GNU Diffutils Manual', url: 'https://www.gnu.org/software/diffutils/manual/diffutils.html' },
    { name: 'Python difflib Module', url: 'https://docs.python.org/3/library/difflib.html' },
  ],
  'markdown-preview': [
    { name: 'CommonMark Specification', url: 'https://spec.commonmark.org/' },
    { name: 'GitHub Flavored Markdown Spec', url: 'https://github.github.com/gfm/' },
  ],
  'lorem-ipsum': [
    { name: 'MDN CSS Text Specification', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_text' },
    { name: 'Unicode Text Segmentation (UAX #29)', url: 'https://unicode.org/reports/tr29/' },
  ],
  'timestamp-converter': [
    { name: 'RFC 3339 Date and Time on the Internet', url: 'https://www.rfc-editor.org/rfc/rfc3339.html' },
    { name: 'ISO 8601 Date & Time Format', url: 'https://www.iso.org/iso-8601-date-and-time-format.html' },
    { name: 'MDN JavaScript Date', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date' },
  ],
  'color-converter': [
    { name: 'W3C CSS Color Module Level 4', url: 'https://www.w3.org/TR/css-color-4/' },
    { name: 'MDN CSS color Value', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color_value' },
  ],
  'image-to-base64': [
    { name: 'RFC 2397 data URL Scheme', url: 'https://www.rfc-editor.org/rfc/rfc2397.html' },
    { name: 'MDN Data URLs Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs' },
    { name: 'MDN FileReader.readAsDataURL', url: 'https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL' },
  ],
  'yaml-json': [
    { name: 'YAML 1.2.2 Specification', url: 'https://yaml.org/spec/1.2.2/' },
    { name: 'RFC 8259 JSON Specification', url: 'https://www.rfc-editor.org/rfc/rfc8259.html' },
  ],
  'sql-formatter': [
    { name: 'PostgreSQL SQL Syntax Reference', url: 'https://www.postgresql.org/docs/current/sql-syntax.html' },
    { name: 'SQLite SQL Language Reference', url: 'https://www.sqlite.org/lang.html' },
  ],
  'css-minifier': [
    { name: 'W3C CSS Syntax Module Level 3', url: 'https://www.w3.org/TR/css-syntax-3/' },
    { name: 'MDN CSS Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference' },
  ],
  'js-minifier': [
    { name: 'ECMA-262 ECMAScript Specification', url: 'https://tc39.es/ecma262/' },
    { name: 'MDN JavaScript Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference' },
  ],
  'cron-parser': [
    { name: 'POSIX crontab Specification', url: 'https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html' },
    { name: 'Linux crontab(5) Manual', url: 'https://man7.org/linux/man-pages/man5/crontab.5.html' },
  ],
  'case-converter': [
    { name: 'Unicode Case Mapping Specification', url: 'https://www.unicode.org/versions/latest/core-spec/chapter-3/' },
    { name: 'MDN String.prototype.toUpperCase', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase' },
  ],
  'word-counter': [
    { name: 'Unicode Text Segmentation (UAX #29)', url: 'https://unicode.org/reports/tr29/' },
    { name: 'MDN Intl.Segmenter', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter' },
  ],
  'remove-duplicates': [
    { name: 'MDN JavaScript Set Object', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set' },
    { name: 'GNU Coreutils uniq Manual', url: 'https://www.gnu.org/software/coreutils/manual/html_node/uniq-invocation.html' },
  ],
  'sort-lines': [
    { name: 'MDN Intl.Collator', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator' },
    { name: 'GNU Coreutils sort Manual', url: 'https://www.gnu.org/software/coreutils/manual/html_node/sort-invocation.html' },
  ],
  'hex-encoder': [
    { name: 'RFC 4648 Section 8 Base16 (Hex)', url: 'https://www.rfc-editor.org/rfc/rfc4648.html#section-8' },
    { name: 'MDN TextEncoder', url: 'https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder' },
  ],
  'binary-encoder': [
    { name: 'MDN TextEncoder', url: 'https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder' },
    { name: 'MDN Number.prototype.toString', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString' },
    { name: 'Unicode Standard', url: 'https://www.unicode.org/versions/latest/' },
  ],
  'html-formatter': [
    { name: 'WHATWG HTML Living Standard', url: 'https://html.spec.whatwg.org/' },
    { name: 'MDN HTML Elements Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element' },
  ],
  'html-minifier': [
    { name: 'WHATWG HTML Parsing Specification', url: 'https://html.spec.whatwg.org/multipage/parsing.html' },
    { name: 'MDN DOM Whitespace Handling', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace' },
  ],
  'xml-formatter': [
    { name: 'W3C XML 1.0 Specification', url: 'https://www.w3.org/TR/xml/' },
    { name: 'MDN XML Introduction', url: 'https://developer.mozilla.org/en-US/docs/Web/XML/XML_introduction' },
  ],
  'sha512-hash': [
    { name: 'NIST FIPS 180-4 Secure Hash Standard', url: 'https://csrc.nist.gov/pubs/fips/180-4/upd1/final' },
    { name: 'RFC 6234 US Secure Hash Algorithms', url: 'https://www.rfc-editor.org/rfc/rfc6234.html' },
    { name: 'MDN SubtleCrypto.digest', url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest' },
  ],
  'roman-numeral-converter': [
    { name: 'Unicode Number Forms Code Chart', url: 'https://www.unicode.org/charts/PDF/U2150.pdf' },
    { name: 'MDN JavaScript Number', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number' },
  ],
  'number-base-converter': [
    { name: 'MDN Number.prototype.toString', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString' },
    { name: 'MDN parseInt', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt' },
  ],
  'unicode-escape': [
    { name: 'RFC 8259 JSON strings', url: 'https://www.rfc-editor.org/rfc/rfc8259.html#section-7' },
    { name: 'MDN JSON.parse', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse' },
  ],
  'json-string-escape': [
    { name: 'RFC 8259 Section 7 Strings', url: 'https://www.rfc-editor.org/rfc/rfc8259.html#section-7' },
    { name: 'MDN JSON.stringify', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify' },
  ],
  'regex-escape': [
    { name: 'MDN RegExp.escape', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/escape' },
    { name: 'MDN Regular Expressions Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions' },
  ],
  'url-parser': [
    { name: 'WHATWG URL Standard', url: 'https://url.spec.whatwg.org/' },
    { name: 'RFC 3986 URI Generic Syntax', url: 'https://www.rfc-editor.org/rfc/rfc3986.html' },
    { name: 'MDN URL API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/URL' },
  ],
  'query-string-parser': [
    { name: 'WHATWG URLSearchParams', url: 'https://url.spec.whatwg.org/#interface-urlsearchparams' },
    { name: 'MDN URLSearchParams', url: 'https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams' },
  ],
  'http-headers-parser': [
    { name: 'RFC 9110 HTTP Semantics', url: 'https://www.rfc-editor.org/rfc/rfc9110.html' },
    { name: 'MDN HTTP Headers Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers' },
  ],
  'http-status-codes': [
    { name: 'RFC 9110 Section 15 Status Codes', url: 'https://www.rfc-editor.org/rfc/rfc9110.html#section-15' },
    { name: 'MDN HTTP Status Codes', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status' },
    { name: 'IANA HTTP Status Code Registry', url: 'https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml' },
  ],
  'user-agent-parser': [
    { name: 'RFC 9110 Section 10.1.5 User-Agent', url: 'https://www.rfc-editor.org/rfc/rfc9110.html#section-10.1.5' },
    { name: 'MDN User-Agent Header', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent' },
    { name: 'WICG User-Agent Client Hints', url: 'https://wicg.github.io/ua-client-hints/' },
  ],
  'json-schema-validator': [
    { name: 'JSON Schema 2020-12 Core', url: 'https://json-schema.org/draft/2020-12/json-schema-core' },
    { name: 'JSON Schema 2020-12 Validation', url: 'https://json-schema.org/draft/2020-12/json-schema-validation' },
  ],
  'hmac-generator': [
    { name: 'RFC 2104 HMAC Specification', url: 'https://www.rfc-editor.org/rfc/rfc2104.html' },
    { name: 'MDN SubtleCrypto.sign', url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign' },
    { name: 'Python hmac Module', url: 'https://docs.python.org/3/library/hmac.html' },
  ],
  'pkce-generator': [
    { name: 'RFC 7636 OAuth 2.0 PKCE', url: 'https://www.rfc-editor.org/rfc/rfc7636.html' },
    { name: 'OAuth.net PKCE Reference', url: 'https://oauth.net/2/pkce/' },
  ],
  'cidr-calculator': [
    { name: 'RFC 4632 IPv4 CIDR Addressing', url: 'https://www.rfc-editor.org/rfc/rfc4632.html' },
    { name: 'RFC 1918 Private Address Allocation', url: 'https://www.rfc-editor.org/rfc/rfc1918.html' },
  ],
  'json-pointer': [
    { name: 'RFC 6901 JSON Pointer', url: 'https://www.rfc-editor.org/rfc/rfc6901.html' },
    { name: 'RFC 8259 JSON Specification', url: 'https://www.rfc-editor.org/rfc/rfc8259.html' },
  ],
  'chmod-calculator': [
    { name: 'POSIX chmod Specification', url: 'https://pubs.opengroup.org/onlinepubs/9699919799/utilities/chmod.html' },
    { name: 'Linux chmod(1) Manual', url: 'https://man7.org/linux/man-pages/man1/chmod.1.html' },
  ],
  'cache-control': [
    { name: 'RFC 9111 HTTP Caching', url: 'https://www.rfc-editor.org/rfc/rfc9111.html' },
    { name: 'MDN Cache-Control Header', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control' },
  ],
  'jsonpath-tester': [
    { name: 'RFC 9535 JSONPath Specification', url: 'https://www.rfc-editor.org/rfc/rfc9535.html' },
    { name: 'RFC 8259 JSON Specification', url: 'https://www.rfc-editor.org/rfc/rfc8259.html' },
  ],
  'csp-builder': [
    { name: 'W3C Content Security Policy Level 3', url: 'https://www.w3.org/TR/CSP3/' },
    { name: 'MDN Content-Security-Policy Header', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy' },
  ],
  'curl-to-fetch': [
    { name: 'curl Manual Page', url: 'https://curl.se/docs/manpage.html' },
    { name: 'MDN Fetch API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch' },
    { name: 'WHATWG Fetch Standard', url: 'https://fetch.spec.whatwg.org/' },
  ],
  'env-to-json': [
    { name: 'The Twelve-Factor App: Config', url: 'https://12factor.net/config' },
    { name: 'RFC 8259 JSON Specification', url: 'https://www.rfc-editor.org/rfc/rfc8259.html' },
  ],
  'json-to-zod': [
    { name: 'Zod Schema Documentation', url: 'https://zod.dev/' },
    { name: 'TypeScript Inference Docs', url: 'https://www.typescriptlang.org/docs/handbook/2/types-from-types.html' },
  ],
  'bcrypt-generator': [
    { name: 'OpenBSD crypt(3) Blowfish / Bcrypt', url: 'https://man.openbsd.org/crypt.3' },
    { name: 'OWASP Password Storage Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html' },
  ],
  'json-diff-patch': [
    { name: 'RFC 6902 JSON Patch', url: 'https://www.rfc-editor.org/rfc/rfc6902.html' },
    { name: 'RFC 7396 JSON Merge Patch', url: 'https://www.rfc-editor.org/rfc/rfc7396.html' },
  ],
  'color-contrast-checker': [
    { name: 'W3C WCAG 2.1 Contrast Guidelines', url: 'https://www.w3.org/TR/WCAG21/#contrast-minimum' },
    { name: 'MDN WCAG Color Contrast', url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast' },
  ],
  'certificate-decoder': [
    { name: 'RFC 5280 X.509 PKI Certificate', url: 'https://www.rfc-editor.org/rfc/rfc5280.html' },
    { name: 'RFC 7468 PEM Encodings', url: 'https://www.rfc-editor.org/rfc/rfc7468.html' },
    { name: 'OpenSSL x509 Manual', url: 'https://docs.openssl.org/master/man1/openssl-x509/' },
  ],
  'openapi-validator': [
    { name: 'OpenAPI Specification v3.1.0', url: 'https://spec.openapis.org/oas/v3.1.0' },
    { name: 'OpenAPI Specification v3.0.3', url: 'https://spec.openapis.org/oas/v3.0.3' },
  ],
  'svg-to-jsx': [
    { name: 'W3C SVG 2 Specification', url: 'https://www.w3.org/TR/SVG2/' },
    { name: 'React JSX Markup Rules', url: 'https://react.dev/learn/writing-markup-with-jsx' },
    { name: 'SVGR Documentation', url: 'https://react-svgr.com/docs/getting-started/' },
  ],
  'svg-minifier': [
    { name: 'W3C SVG 2 Specification', url: 'https://www.w3.org/TR/SVG2/' },
    { name: 'SVGO Documentation', url: 'https://svgo.dev/docs/introduction/' },
  ],
  'css-clamp': [
    { name: 'MDN CSS clamp() Function', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/clamp' },
    { name: 'W3C CSS Values and Units Level 4', url: 'https://www.w3.org/TR/css-values-4/#comp-func' },
  ],
  'css-box-shadow': [
    { name: 'MDN CSS box-shadow', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow' },
    { name: 'W3C CSS Backgrounds and Borders Level 3', url: 'https://www.w3.org/TR/css-backgrounds-3/#box-shadow' },
  ],
  'docker-run-to-compose': [
    { name: 'Docker run Reference', url: 'https://docs.docker.com/reference/cli/docker/container/run/' },
    { name: 'Docker Compose File Reference', url: 'https://docs.docker.com/reference/compose-file/' },
  ],
  'cron-generator': [
    { name: 'POSIX crontab Specification', url: 'https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html' },
    { name: 'Linux crontab(5) Manual', url: 'https://man7.org/linux/man-pages/man5/crontab.5.html' },
  ],
  'json-to-sql': [
    { name: 'PostgreSQL CREATE TABLE', url: 'https://www.postgresql.org/docs/current/sql-createtable.html' },
    { name: 'PostgreSQL INSERT Reference', url: 'https://www.postgresql.org/docs/current/sql-insert.html' },
    { name: 'RFC 8259 JSON Specification', url: 'https://www.rfc-editor.org/rfc/rfc8259.html' },
  ],
  'bip39-generator': [
    { name: 'Bitcoin BIP-0039 Mnemonic Specification', url: 'https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki' },
    { name: 'NIST SP 800-132 PBKDF2', url: 'https://csrc.nist.gov/pubs/sp/800/132/final' },
  ],
  'dmarc-generator': [
    { name: 'RFC 7489 DMARC Specification', url: 'https://www.rfc-editor.org/rfc/rfc7489.html' },
    { name: 'RFC 7208 Sender Policy Framework (SPF)', url: 'https://www.rfc-editor.org/rfc/rfc7208.html' },
    { name: 'RFC 6376 DKIM Signatures', url: 'https://www.rfc-editor.org/rfc/rfc6376.html' },
  ],
  'json-to-models': [
    { name: 'Go encoding/json Package', url: 'https://pkg.go.dev/encoding/json' },
    { name: 'Pydantic Models Documentation', url: 'https://docs.pydantic.dev/latest/concepts/models/' },
    { name: 'Rust Serde Documentation', url: 'https://serde.rs/' },
  ],
  'px-to-rem': [
    { name: 'MDN CSS Values and Units', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units' },
    { name: 'W3C CSS Values and Units Level 4', url: 'https://www.w3.org/TR/css-values-4/#font-relative-lengths' },
  ],
  'mock-data-generator': [
    { name: 'RFC 8259 JSON Specification', url: 'https://www.rfc-editor.org/rfc/rfc8259.html' },
    { name: 'Faker.js API Reference', url: 'https://fakerjs.dev/api/' },
  ],
  'csv-to-markdown': [
    { name: 'GitHub Flavored Markdown Tables', url: 'https://github.github.com/gfm/#tables-extension-' },
    { name: 'RFC 4180 CSV Format', url: 'https://www.rfc-editor.org/rfc/rfc4180.html' },
  ],
  'curl-to-code': [
    { name: 'curl Manual Page', url: 'https://curl.se/docs/manpage.html' },
    { name: 'MDN Fetch API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API' },
    { name: 'Go net/http Package', url: 'https://pkg.go.dev/net/http' },
  ],
  'rsa-key-pair-generator': [
    { name: 'RFC 8017 PKCS #1 RSA Cryptography', url: 'https://www.rfc-editor.org/rfc/rfc8017.html' },
    { name: 'FIPS 186-5 Digital Signature Standard', url: 'https://csrc.nist.gov/pubs/fips/186-5/final' },
    { name: 'MDN SubtleCrypto.generateKey', url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey' },
  ],
  'svg-optimizer': [
    { name: 'W3C SVG 2 Specification', url: 'https://www.w3.org/TR/SVG2/' },
    { name: 'SVGO Documentation', url: 'https://svgo.dev/docs/introduction/' },
  ],
  'html-table-to-json': [
    { name: 'MDN HTML table Element', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table' },
    { name: 'WHATWG HTML Tabular Data', url: 'https://html.spec.whatwg.org/multipage/tables.html' },
    { name: 'RFC 8259 JSON Specification', url: 'https://www.rfc-editor.org/rfc/rfc8259.html' },
  ],
  'favicon-generator': [
    { name: 'MDN Web App Manifest', url: 'https://developer.mozilla.org/en-US/docs/Web/Manifest' },
    { name: 'HTML Standard Link Types (icon)', url: 'https://html.spec.whatwg.org/multipage/links.html#rel-icon' },
    { name: 'Apple Safari Web Content Icons', url: 'https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html' },
  ],
  'gitignore-generator': [
    { name: 'Git gitignore Documentation', url: 'https://git-scm.com/docs/gitignore' },
    { name: 'GitHub gitignore Templates', url: 'https://github.com/github/gitignore' },
  ],
  'htpasswd-generator': [
    { name: 'Apache htpasswd Utility Docs', url: 'https://httpd.apache.org/docs/current/programs/htpasswd.html' },
    { name: 'RFC 7617 HTTP Basic Authentication', url: 'https://www.rfc-editor.org/rfc/rfc7617.html' },
  ],
  'dockerfile-generator': [
    { name: 'Dockerfile Reference', url: 'https://docs.docker.com/reference/dockerfile/' },
    { name: 'Docker Multi-Stage Builds', url: 'https://docs.docker.com/build/building/multi-stage/' },
  ],
  'css-glassmorphism': [
    { name: 'MDN CSS backdrop-filter', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter' },
    { name: 'W3C Filter Effects Module Level 2', url: 'https://drafts.fxtf.org/filter-effects-2/' },
  ],
  'css-grid-generator': [
    { name: 'W3C CSS Grid Layout Level 1', url: 'https://www.w3.org/TR/css-grid-1/' },
    { name: 'MDN CSS Grid Layout', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout' },
  ],
  'css-blob-generator': [
    { name: 'MDN CSS border-radius', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius' },
    { name: 'MDN SVG path Element', url: 'https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path' },
  ],
  'robots-txt-generator': [
    { name: 'RFC 9309 Robots Exclusion Protocol', url: 'https://www.rfc-editor.org/rfc/rfc9309.html' },
    { name: 'Google Search robots.txt Guide', url: 'https://developers.google.com/search/docs/crawling-indexing/robots/intro' },
  ],
  'sitemap-generator': [
    { name: 'Sitemaps XML Protocol Specification', url: 'https://www.sitemaps.org/protocol.html' },
    { name: 'Google Search Sitemaps Overview', url: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview' },
  ],
  'sql-to-json': [
    { name: 'PostgreSQL INSERT Syntax', url: 'https://www.postgresql.org/docs/current/sql-insert.html' },
    { name: 'RFC 8259 JSON Specification', url: 'https://www.rfc-editor.org/rfc/rfc8259.html' },
  ],
  'totp-generator': [
    { name: 'RFC 6238 TOTP Specification', url: 'https://www.rfc-editor.org/rfc/rfc6238.html' },
    { name: 'RFC 4226 HOTP Specification', url: 'https://www.rfc-editor.org/rfc/rfc4226.html' },
    { name: 'Key Uri Format (otpauth)', url: 'https://github.com/google/google-authenticator/wiki/Key-Uri-Format' },
  ],
  'markdown-table-generator': [
    { name: 'GitHub Flavored Markdown Tables', url: 'https://github.github.com/gfm/#tables-extension-' },
    { name: 'CommonMark Specification', url: 'https://spec.commonmark.org/' },
  ],
  'key-code-info': [
    { name: 'W3C UI Events KeyboardEvent', url: 'https://www.w3.org/TR/uievents/#interface-keyboardevent' },
    { name: 'MDN KeyboardEvent', url: 'https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent' },
    { name: 'MDN KeyboardEvent.code Values', url: 'https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_code_values' },
  ],
  'aspect-ratio-calculator': [
    { name: 'MDN CSS aspect-ratio', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio' },
    { name: 'SMPTE / ITU-R BT.709 Aspect Ratios', url: 'https://www.itu.int/rec/R-REC-BT.709' },
  ],
  'base64-to-image': [
    { name: 'RFC 2397 data URL Scheme', url: 'https://www.rfc-editor.org/rfc/rfc2397.html' },
    { name: 'RFC 4648 Base64 Encoding', url: 'https://www.rfc-editor.org/rfc/rfc4648.html' },
    { name: 'MDN Data URLs Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs' },
  ],
  'html-to-markdown': [
    { name: 'CommonMark Specification', url: 'https://spec.commonmark.org/' },
    { name: 'GitHub Flavored Markdown Spec', url: 'https://github.github.com/gfm/' },
    { name: 'WHATWG HTML Living Standard', url: 'https://html.spec.whatwg.org/' },
  ],
  'css-triangle-generator': [
    { name: 'MDN CSS border Property', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/border' },
    { name: 'MDN CSS clip-path', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path' },
  ],
  'svg-placeholder-generator': [
    { name: 'W3C SVG 2 Specification', url: 'https://www.w3.org/TR/SVG2/' },
    { name: 'RFC 2397 data URL Scheme', url: 'https://www.rfc-editor.org/rfc/rfc2397.html' },
  ],
  'css-flexbox-generator': [
    { name: 'W3C CSS Flexible Box Layout Level 1', url: 'https://www.w3.org/TR/css-flexbox-1/' },
    { name: 'MDN CSS Flexible Box Layout', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout' },
  ],
  'open-graph-previewer': [
    { name: 'The Open Graph Protocol', url: 'https://ogp.me/' },
    { name: 'X (Twitter) Cards Markup Reference', url: 'https://developer.x.com/en/docs/twitter-for-websites/cards/overview/markup' },
    { name: 'MDN HTML meta Element', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta' },
  ],
  'ascii-art-generator': [
    { name: 'RFC 20 ASCII Format for Network Interchange', url: 'https://www.rfc-editor.org/rfc/rfc20.html' },
    { name: 'Unicode Basic Latin (ASCII) Code Chart', url: 'https://www.unicode.org/charts/PDF/U0000.pdf' },
  ],
  'css-animation-generator': [
    { name: 'W3C CSS Animations Level 1', url: 'https://www.w3.org/TR/css-animations-1/' },
    { name: 'MDN Using CSS Animations', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations' },
    { name: 'MDN @keyframes', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes' },
  ],
  'markdown-to-html': [
    { name: 'CommonMark Specification', url: 'https://spec.commonmark.org/' },
    { name: 'GitHub Flavored Markdown Spec', url: 'https://github.github.com/gfm/' },
    { name: 'WHATWG HTML Living Standard', url: 'https://html.spec.whatwg.org/' },
  ],
  'css-text-shadow': [
    { name: 'W3C CSS Text Decoration Level 3', url: 'https://www.w3.org/TR/css-text-decor-3/#text-shadow-property' },
    { name: 'MDN CSS text-shadow', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow' },
  ],
  'time-duration-calculator': [
    { name: 'ISO 8601 Date & Time Format', url: 'https://www.iso.org/iso-8601-date-and-time-format.html' },
    { name: 'RFC 3339 Date and Time', url: 'https://www.rfc-editor.org/rfc/rfc3339.html' },
    { name: 'MDN Temporal API', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal' },
  ],
  'xml-to-json': [
    { name: 'W3C XML 1.0 Specification', url: 'https://www.w3.org/TR/xml/' },
    { name: 'RFC 8259 JSON Specification', url: 'https://www.rfc-editor.org/rfc/rfc8259.html' },
  ],
  'list-to-sql-in': [
    { name: 'PostgreSQL Value Expressions & IN', url: 'https://www.postgresql.org/docs/current/functions-comparisons.html' },
    { name: 'SQLite Expression Syntax', url: 'https://www.sqlite.org/lang_expr.html' },
  ],
  'svg-to-png': [
    { name: 'W3C SVG 2 Specification', url: 'https://www.w3.org/TR/SVG2/' },
    { name: 'W3C PNG Specification (3rd Ed.)', url: 'https://www.w3.org/TR/png-3/' },
    { name: 'MDN Canvas API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API' },
  ],
  'ip-subnet-calculator': [
    { name: 'RFC 4632 Classless Inter-domain Routing', url: 'https://www.rfc-editor.org/rfc/rfc4632.html' },
    { name: 'RFC 1918 Address Allocation for Private Internets', url: 'https://www.rfc-editor.org/rfc/rfc1918.html' },
  ],
  'css-filter-generator': [
    { name: 'W3C Filter Effects Module Level 1', url: 'https://www.w3.org/TR/filter-effects-1/' },
    { name: 'MDN CSS filter Property', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/filter' },
  ],
  'bcrypt-verifier': [
    { name: 'OpenBSD crypt(3) Blowfish / Bcrypt', url: 'https://man.openbsd.org/crypt.3' },
    { name: 'OWASP Password Storage Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html' },
  ],
  'css-border-radius': [
    { name: 'W3C CSS Backgrounds and Borders Level 3', url: 'https://www.w3.org/TR/css-backgrounds-3/#the-border-radius' },
    { name: 'MDN CSS border-radius', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius' },
  ],
  'jwt-generator': [
    { name: 'RFC 7519 JSON Web Token (JWT)', url: 'https://www.rfc-editor.org/rfc/rfc7519.html' },
    { name: 'RFC 7515 JSON Web Signature (JWS)', url: 'https://www.rfc-editor.org/rfc/rfc7515.html' },
    { name: 'RFC 7518 JSON Web Algorithms (JWA)', url: 'https://www.rfc-editor.org/rfc/rfc7518.html' },
  ],
  'ulid-generator': [
    { name: 'ULID Specification', url: 'https://github.com/ulid/spec' },
    { name: 'RFC 9562 UUIDv7 Specification', url: 'https://www.rfc-editor.org/rfc/rfc9562.html' },
  ],
  'curl-builder': [
    { name: 'curl Manual Page', url: 'https://curl.se/docs/manpage.html' },
    { name: 'RFC 9110 HTTP Semantics', url: 'https://www.rfc-editor.org/rfc/rfc9110.html' },
  ],
  'base64-to-pdf': [
    { name: 'RFC 4648 Base64 Encoding', url: 'https://www.rfc-editor.org/rfc/rfc4648.html' },
    { name: 'RFC 2397 data URL Scheme', url: 'https://www.rfc-editor.org/rfc/rfc2397.html' },
    { name: 'PDF 2.0 Specification (ISO 32000-2)', url: 'https://pdfa.org/resource/iso-32000-2/' },
  ],
  'css-neumorphism': [
    { name: 'MDN CSS box-shadow', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow' },
    { name: 'W3C CSS Backgrounds and Borders Level 3', url: 'https://www.w3.org/TR/css-backgrounds-3/#box-shadow' },
  ],
  'string-byte-counter': [
    { name: 'MDN TextEncoder', url: 'https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder' },
    { name: 'RFC 3629 UTF-8 Encoding', url: 'https://www.rfc-editor.org/rfc/rfc3629.html' },
    { name: 'PostgreSQL Character Types', url: 'https://www.postgresql.org/docs/current/datatype-character.html' },
  ],
  'css-mesh-gradient': [
    { name: 'MDN CSS radial-gradient()', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient' },
    { name: 'W3C CSS Images Module Level 3', url: 'https://www.w3.org/TR/css-images-3/#gradients' },
  ],
  'html-to-jsx': [
    { name: 'React Writing Markup with JSX', url: 'https://react.dev/learn/writing-markup-with-jsx' },
    { name: 'WHATWG HTML Living Standard', url: 'https://html.spec.whatwg.org/' },
  ],
  'css-clip-path': [
    { name: 'W3C CSS Masking Module Level 1', url: 'https://www.w3.org/TR/css-masking-1/#the-clip-path' },
    { name: 'MDN CSS clip-path', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path' },
  ],
  'css-scrollbar-generator': [
    { name: 'W3C CSS Scrollbars Styling Level 1', url: 'https://www.w3.org/TR/css-scrollbars-1/' },
    { name: 'MDN CSS Scrollbars Styling', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scrollbars_styling' },
  ],
  'css-pattern-generator': [
    { name: 'MDN CSS repeating-linear-gradient()', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/repeating-linear-gradient' },
    { name: 'MDN CSS background-size', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/background-size' },
  ],
  'svg-path-visualizer': [
    { name: 'W3C SVG 2 Paths Specification', url: 'https://www.w3.org/TR/SVG2/paths.html' },
    { name: 'MDN SVG Paths Tutorial', url: 'https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths' },
    { name: 'MDN SVG d Attribute', url: 'https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d' },
  ],
  'color-palette-generator': [
    { name: 'Tailwind CSS Colors Reference', url: 'https://tailwindcss.com/docs/colors' },
    { name: 'W3C CSS Color Module Level 4', url: 'https://www.w3.org/TR/css-color-4/' },
  ],
  'csv-to-sql-insert': [
    { name: 'RFC 4180 CSV Format', url: 'https://www.rfc-editor.org/rfc/rfc4180.html' },
    { name: 'PostgreSQL INSERT Reference', url: 'https://www.postgresql.org/docs/current/sql-insert.html' },
    { name: 'MySQL INSERT Syntax', url: 'https://dev.mysql.com/doc/refman/8.4/en/insert.html' },
  ],
  'sql-minifier': [
    { name: 'PostgreSQL SQL Lexical Structure', url: 'https://www.postgresql.org/docs/current/sql-syntax-lexical.html' },
    { name: 'SQLite SQL Language Reference', url: 'https://www.sqlite.org/lang.html' },
  ],
  'json-to-graphql': [
    { name: 'GraphQL Specification', url: 'https://spec.graphql.org/October2021/' },
    { name: 'GraphQL Schemas and Types', url: 'https://graphql.org/learn/schema/' },
  ],
  'tsv-to-json': [
    { name: 'IANA Tab-Separated Values (TSV)', url: 'https://www.iana.org/assignments/media-types/text/tab-separated-values' },
    { name: 'RFC 8259 JSON Specification', url: 'https://www.rfc-editor.org/rfc/rfc8259.html' },
  ],
  'ndjson-to-json': [
    { name: 'NDJSON Specification', url: 'https://github.com/ndjson/ndjson-spec' },
    { name: 'RFC 7464 JSON Text Sequences', url: 'https://www.rfc-editor.org/rfc/rfc7464.html' },
    { name: 'RFC 8259 JSON Specification', url: 'https://www.rfc-editor.org/rfc/rfc8259.html' },
  ],
  'json-size-analyzer': [
    { name: 'RFC 8259 JSON Specification', url: 'https://www.rfc-editor.org/rfc/rfc8259.html' },
    { name: 'MDN TextEncoder', url: 'https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder' },
  ],
  'hex-to-base64': [
    { name: 'RFC 4648 Base16 & Base64 Encodings', url: 'https://www.rfc-editor.org/rfc/rfc4648.html' },
    { name: 'MDN Uint8Array', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array' },
  ],
  'punycode-converter': [
    { name: 'RFC 3492 Punycode Specification', url: 'https://www.rfc-editor.org/rfc/rfc3492.html' },
    { name: 'RFC 5891 IDNA Protocol', url: 'https://www.rfc-editor.org/rfc/rfc5891.html' },
  ],
  'morse-code-converter': [
    { name: 'ITU-R M.1677-1 International Morse Code', url: 'https://www.itu.int/rec/R-REC-M.1677-1-200910-I/en' },
    { name: 'MDN Web Audio API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API' },
  ],
  'base32-encoder': [
    { name: 'RFC 4648 Section 6 Base32 Encoding', url: 'https://www.rfc-editor.org/rfc/rfc4648.html#section-6' },
    { name: 'RFC 6238 TOTP Key Provisioning', url: 'https://www.rfc-editor.org/rfc/rfc6238.html' },
  ],
  'password-strength-analyzer': [
    { name: 'NIST SP 800-63B Memorized Secrets', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
    { name: 'OWASP Password Strength Controls', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html' },
  ],
  'semver-calculator': [
    { name: 'Semantic Versioning 2.0.0', url: 'https://semver.org/' },
    { name: 'npm semver Documentation', url: 'https://docs.npmjs.com/cli/v10/configuring-npm/package-json#dependencies' },
  ],
  'ipv6-subnet-calculator': [
    { name: 'RFC 4291 IPv6 Addressing Architecture', url: 'https://www.rfc-editor.org/rfc/rfc4291.html' },
    { name: 'RFC 5952 IPv6 Address Representation', url: 'https://www.rfc-editor.org/rfc/rfc5952.html' },
  ],
  'mac-address-generator': [
    { name: 'IEEE 802 Standards (EUI-48)', url: 'https://standards.ieee.org/wp-content/uploads/import/documents/tutorials/eui.pdf' },
    { name: 'RFC 7042 IANA Considerations for IEEE 802', url: 'https://www.rfc-editor.org/rfc/rfc7042.html' },
  ],
  'crontab-descriptor': [
    { name: 'POSIX crontab Specification', url: 'https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html' },
    { name: 'Linux crontab(5) Manual', url: 'https://man7.org/linux/man-pages/man5/crontab.5.html' },
  ],
  'htaccess-to-nginx': [
    { name: 'Apache HTTP Server .htaccess Guide', url: 'https://httpd.apache.org/docs/current/howto/htaccess.html' },
    { name: 'Apache mod_rewrite Documentation', url: 'https://httpd.apache.org/docs/current/mod/mod_rewrite.html' },
    { name: 'Nginx ngx_http_rewrite_module', url: 'https://nginx.org/en/docs/http/ngx_http_rewrite_module.html' },
  ],
  'dns-record-generator': [
    { name: 'RFC 7208 Sender Policy Framework (SPF)', url: 'https://www.rfc-editor.org/rfc/rfc7208.html' },
    { name: 'RFC 6376 DomainKeys Identified Mail (DKIM)', url: 'https://www.rfc-editor.org/rfc/rfc6376.html' },
    { name: 'RFC 7489 DMARC Specification', url: 'https://www.rfc-editor.org/rfc/rfc7489.html' },
  ],
  'slug-to-title': [
    { name: 'RFC 3986 URI Path Segments', url: 'https://www.rfc-editor.org/rfc/rfc3986.html#section-3.3' },
    { name: 'MDN String.prototype.replace', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace' },
  ],
  'text-obfuscator': [
    { name: 'Unicode Bidirectional & Format Characters', url: 'https://unicode.org/reports/tr9/' },
    { name: 'Unicode Security Considerations (UTR #36)', url: 'https://unicode.org/reports/tr36/' },
  ],
  'csv-column-extractor': [
    { name: 'RFC 4180 CSV Format', url: 'https://www.rfc-editor.org/rfc/rfc4180.html' },
    { name: 'Python csv Module', url: 'https://docs.python.org/3/library/csv.html' },
  ],
  'sql-to-typescript': [
    { name: 'PostgreSQL Data Types', url: 'https://www.postgresql.org/docs/current/datatype.html' },
    { name: 'TypeScript Handbook: Everyday Types', url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html' },
  ],
  'json-to-env': [
    { name: 'The Twelve-Factor App: Config', url: 'https://12factor.net/config' },
    { name: 'RFC 8259 JSON Specification', url: 'https://www.rfc-editor.org/rfc/rfc8259.html' },
  ],
  'json-minifier': [
    { name: 'RFC 8259 JSON Specification', url: 'https://www.rfc-editor.org/rfc/rfc8259.html' },
    { name: 'MDN JSON.stringify', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify' },
  ],
  'markdown-table-to-csv': [
    { name: 'GitHub Flavored Markdown Tables', url: 'https://github.github.com/gfm/#tables-extension-' },
    { name: 'RFC 4180 CSV Format', url: 'https://www.rfc-editor.org/rfc/rfc4180.html' },
  ],
  'llm-token-counter': [
    { name: 'OpenAI tiktoken Tokenizer', url: 'https://github.com/openai/tiktoken' },
    { name: 'Anthropic Token Counting Guide', url: 'https://platform.claude.com/docs/en/build-with-claude/token-counting' },
    { name: 'Gemini API Tokens Guide', url: 'https://ai.google.dev/gemini-api/docs/tokens' },
  ],
  'openai-function-schema': [
    { name: 'OpenAI Function Calling Guide', url: 'https://platform.openai.com/docs/guides/function-calling' },
    { name: 'JSON Schema 2020-12 Specification', url: 'https://json-schema.org/draft/2020-12/json-schema-core' },
  ],
  'prompt-template-formatter': [
    { name: 'Jinja2 Template Designer Documentation', url: 'https://jinja.palletsprojects.com/en/stable/templates/' },
    { name: 'Mustache(5) Manual', url: 'https://mustache.github.io/mustache.5.html' },
  ],
  'embedding-similarity': [
    { name: 'OpenAI Embeddings Guide', url: 'https://platform.openai.com/docs/guides/embeddings' },
    { name: 'scikit-learn Cosine Similarity', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise.cosine_similarity.html' },
  ],
  'text-chunk-splitter': [
    { name: 'LangChain Text Splitters Concepts', url: 'https://python.langchain.com/docs/concepts/text_splitters/' },
    { name: 'OpenAI Embeddings Best Practices', url: 'https://platform.openai.com/docs/guides/embeddings' },
  ],
  'jsonl-dataset-validator': [
    { name: 'OpenAI Fine-Tuning Data Preparation', url: 'https://platform.openai.com/docs/guides/fine-tuning' },
    { name: 'JSON Lines (JSONL) Format', url: 'https://jsonlines.org/' },
  ],
  'prompt-format-converter': [
    { name: 'Hugging Face Chat Templates', url: 'https://huggingface.co/docs/transformers/main/en/chat_templating' },
    { name: 'Anthropic Messages API', url: 'https://platform.claude.com/docs/en/api/messages' },
  ],
  'sampling-curve-visualizer': [
    { name: 'OpenAI API Temperature & Top-P', url: 'https://platform.openai.com/docs/api-reference/chat/create' },
    { name: 'Hugging Face Generation Strategies', url: 'https://huggingface.co/docs/transformers/generation_strategies' },
  ],
  'system-prompt-formatter': [
    { name: 'Anthropic System Prompts Guide', url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/system-prompts' },
    { name: 'OpenAI Prompt Engineering', url: 'https://platform.openai.com/docs/guides/prompt-engineering' },
  ],
  'prompt-diff': [
    { name: 'GNU Diffutils Manual', url: 'https://www.gnu.org/software/diffutils/manual/diffutils.html' },
    { name: 'Python difflib Module', url: 'https://docs.python.org/3/library/difflib.html' },
  ],
  'css-to-tailwind': [
    { name: 'Tailwind CSS Utility-First Fundamentals', url: 'https://tailwindcss.com/docs/styling-with-utility-classes' },
    { name: 'MDN CSS Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference' },
  ],
  'tailwind-to-css': [
    { name: 'Tailwind CSS Utility-First Fundamentals', url: 'https://tailwindcss.com/docs/styling-with-utility-classes' },
    { name: 'W3C CSS Cascading and Inheritance', url: 'https://www.w3.org/TR/css-cascade-4/' },
  ],
  'css-specificity-calculator': [
    { name: 'W3C Selectors Level 4 Specificity', url: 'https://www.w3.org/TR/selectors-4/#specificity-rules' },
    { name: 'MDN CSS Specificity', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity' },
  ],
  'css-keyframes-generator': [
    { name: 'W3C CSS Animations Level 1', url: 'https://www.w3.org/TR/css-animations-1/' },
    { name: 'MDN @keyframes Rule', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes' },
  ],
  'tailwind-class-sorter': [
    { name: 'Prettier Plugin Tailwind CSS', url: 'https://github.com/tailwindlabs/prettier-plugin-tailwindcss' },
    { name: 'Tailwind CSS Editor Setup', url: 'https://tailwindcss.com/docs/editor-setup' },
  ],
  'fluid-typography': [
    { name: 'MDN CSS clamp() Function', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/clamp' },
    { name: 'W3C CSS Values and Units Level 4', url: 'https://www.w3.org/TR/css-values-4/#viewport-relative-lengths' },
  ],
  'css-media-query-builder': [
    { name: 'W3C Media Queries Level 4', url: 'https://www.w3.org/TR/mediaqueries-4/' },
    { name: 'MDN Using Media Queries', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries' },
    { name: 'MDN prefers-reduced-motion', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion' },
  ],
  'css-grid-area-builder': [
    { name: 'W3C CSS Grid Layout Level 1', url: 'https://www.w3.org/TR/css-grid-1/#grid-template-areas-property' },
    { name: 'MDN CSS grid-template-areas', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas' },
  ],
  'css-cubic-bezier': [
    { name: 'W3C CSS Easing Functions Level 1', url: 'https://www.w3.org/TR/css-easing-1/' },
    { name: 'MDN CSS easing-function', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function' },
  ],
  'color-harmony-generator': [
    { name: 'W3C CSS Color Module Level 4', url: 'https://www.w3.org/TR/css-color-4/' },
    { name: 'MDN CSS hsl() Function', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl' },
  ],
  'json-to-pydantic': [
    { name: 'Pydantic V2 Models Documentation', url: 'https://docs.pydantic.dev/latest/concepts/models/' },
    { name: 'Python typing Module', url: 'https://docs.python.org/3/library/typing.html' },
  ],
  'json-to-rust-serde': [
    { name: 'Rust Serde Documentation', url: 'https://serde.rs/' },
    { name: 'serde_json Crate Documentation', url: 'https://docs.rs/serde_json/latest/serde_json/' },
  ],
  'json-to-swift': [
    { name: 'Apple Swift Codable Protocol', url: 'https://developer.apple.com/documentation/swift/codable' },
    { name: 'Swift Encoding & Decoding', url: 'https://developer.apple.com/documentation/foundation/archives_and_serialization/encoding_and_decoding_custom_types' },
  ],
  'json-to-kotlin': [
    { name: 'Kotlin Serialization Guide', url: 'https://kotlinlang.org/docs/serialization.html' },
    { name: 'Kotlin Data Classes', url: 'https://kotlinlang.org/docs/data-classes.html' },
  ],
  'json-to-csharp': [
    { name: '.NET System.Text.Json Overview', url: 'https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/overview' },
    { name: 'C# Records & Classes', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/classes' },
  ],
  'json-to-java-pojo': [
    { name: 'Jackson Databind Documentation', url: 'https://github.com/FasterXML/jackson-databind' },
    { name: 'Project Lombok @Data', url: 'https://projectlombok.org/features/Data' },
  ],
  'typescript-to-json-schema': [
    { name: 'TypeScript Handbook: Object Types', url: 'https://www.typescriptlang.org/docs/handbook/2/objects.html' },
    { name: 'JSON Schema 2020-12 Core', url: 'https://json-schema.org/draft/2020-12/json-schema-core' },
  ],
  'yaml-to-typescript': [
    { name: 'YAML 1.2.2 Specification', url: 'https://yaml.org/spec/1.2.2/' },
    { name: 'TypeScript Interfaces', url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces' },
  ],
  'graphql-to-typescript': [
    { name: 'GraphQL Type System Specification', url: 'https://spec.graphql.org/October2021/#sec-Type-System' },
    { name: 'TypeScript Everyday Types', url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html' },
  ],
  'protobuf-to-json': [
    { name: 'Protocol Buffers Proto3 JSON Mapping', url: 'https://protobuf.dev/programming-guides/proto3/#json' },
    { name: 'JSON Schema Draft-07', url: 'https://json-schema.org/draft-07/schema' },
  ],
  'sql-to-mongodb': [
    { name: 'MongoDB SQL to Aggregation Mapping', url: 'https://www.mongodb.com/docs/manual/reference/sql-aggregation-comparison/' },
    { name: 'MongoDB Query Documents', url: 'https://www.mongodb.com/docs/manual/tutorial/query-documents/' },
  ],
  'json-to-sql-ddl': [
    { name: 'PostgreSQL CREATE TABLE', url: 'https://www.postgresql.org/docs/current/sql-createtable.html' },
    { name: 'PostgreSQL Data Types', url: 'https://www.postgresql.org/docs/current/datatype.html' },
  ],
  'sql-explainer': [
    { name: 'PostgreSQL SELECT Reference', url: 'https://www.postgresql.org/docs/current/sql-select.html' },
    { name: 'PostgreSQL Queries Overview', url: 'https://www.postgresql.org/docs/current/queries.html' },
  ],
  'postgres-connection-builder': [
    { name: 'PostgreSQL libpq Connection Strings', url: 'https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING' },
    { name: 'RFC 3986 URI Syntax', url: 'https://www.rfc-editor.org/rfc/rfc3986.html' },
  ],
  'redis-command-generator': [
    { name: 'Redis Commands Reference', url: 'https://redis.io/docs/latest/commands/' },
    { name: 'Redis Data Types Overview', url: 'https://redis.io/docs/latest/develop/data-types/' },
  ],
  'csv-to-parquet-schema': [
    { name: 'Apache Parquet Logical Types', url: 'https://parquet.apache.org/docs/file-format/types/' },
    { name: 'PyArrow Schema API', url: 'https://arrow.apache.org/docs/python/generated/pyarrow.schema.html' },
  ],
  'mongodb-objectid-parser': [
    { name: 'MongoDB ObjectId Specification', url: 'https://www.mongodb.com/docs/manual/reference/method/ObjectId/' },
    { name: 'BSON Specification', url: 'https://bsonspec.org/spec.html' },
  ],
  'sql-index-advisor': [
    { name: 'PostgreSQL Indexes & B-Tree', url: 'https://www.postgresql.org/docs/current/indexes-types.html' },
    { name: 'PostgreSQL Multicolumn Indexes', url: 'https://www.postgresql.org/docs/current/indexes-multicolumn.html' },
  ],
  'postgres-to-mysql': [
    { name: 'PostgreSQL Data Types', url: 'https://www.postgresql.org/docs/current/datatype.html' },
    { name: 'MySQL 8.4 Data Types', url: 'https://dev.mysql.com/doc/refman/8.4/en/data-types.html' },
  ],
  'prisma-to-sql': [
    { name: 'Prisma Schema Reference', url: 'https://www.prisma.io/docs/orm/prisma-schema/overview' },
    { name: 'PostgreSQL CREATE TABLE', url: 'https://www.postgresql.org/docs/current/sql-createtable.html' },
  ],
  'docker-compose-to-k8s': [
    { name: 'Docker Compose Specification', url: 'https://docs.docker.com/reference/compose-file/' },
    { name: 'Kubernetes Deployments', url: 'https://kubernetes.io/docs/concepts/workloads/controllers/deployment/' },
    { name: 'Kubernetes Services', url: 'https://kubernetes.io/docs/concepts/services-networking/service/' },
  ],
  'nginx-formatter': [
    { name: 'Nginx Core Functionality', url: 'https://nginx.org/en/docs/ngx_core_module.html' },
    { name: 'Nginx HTTP Core Module', url: 'https://nginx.org/en/docs/http/ngx_http_core_module.html' },
  ],
  'terraform-formatter': [
    { name: 'Terraform fmt Command', url: 'https://developer.hashicorp.com/terraform/cli/commands/fmt' },
    { name: 'Terraform HCL Language Syntax', url: 'https://developer.hashicorp.com/terraform/language/syntax/configuration' },
  ],
  'kubeconfig-validator': [
    { name: 'Kubernetes kubeconfig Organization', url: 'https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/' },
    { name: 'Kubernetes Client Authentication', url: 'https://kubernetes.io/docs/reference/access-authn-authz/authentication/' },
  ],
  'helm-values-evaluator': [
    { name: 'Helm Values Files Guide', url: 'https://helm.sh/docs/chart_template_guide/values_files/' },
    { name: 'Helm Chart Template Guide', url: 'https://helm.sh/docs/chart_template_guide/getting_started/' },
  ],
  'dockerfile-linter': [
    { name: 'Docker Building Best Practices', url: 'https://docs.docker.com/build/building/best-practices/' },
    { name: 'Dockerfile Reference', url: 'https://docs.docker.com/reference/dockerfile/' },
    { name: 'OWASP Docker Security Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html' },
  ],
  'systemd-unit-generator': [
    { name: 'systemd.service(5) Manual', url: 'https://www.freedesktop.org/software/systemd/man/systemd.service.html' },
    { name: 'systemd.unit(5) Manual', url: 'https://www.freedesktop.org/software/systemd/man/systemd.unit.html' },
  ],
  'caddy-to-nginx': [
    { name: 'Caddyfile Concepts', url: 'https://caddyserver.com/docs/caddyfile/concepts' },
    { name: 'Nginx Reverse Proxy Guide', url: 'https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/' },
  ],
  'aws-iam-policy-builder': [
    { name: 'AWS IAM JSON Policy Elements', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html' },
    { name: 'AWS IAM Access Policies', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html' },
  ],
  'prometheus-alert-builder': [
    { name: 'Prometheus Alerting Rules', url: 'https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/' },
    { name: 'PromQL Querying Basics', url: 'https://prometheus.io/docs/prometheus/latest/querying/basics/' },
  ],
  'websocket-tester': [
    { name: 'RFC 6455 The WebSocket Protocol', url: 'https://www.rfc-editor.org/rfc/rfc6455.html' },
    { name: 'MDN WebSocket API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSocket' },
  ],
  'curl-to-postman': [
    { name: 'curl Manual Page', url: 'https://curl.se/docs/manpage.html' },
    { name: 'Postman Collection Format v2.1', url: 'https://learning.postman.com/docs/collections/collections-overview/' },
  ],
  'ssl-certificate-inspector': [
    { name: 'RFC 5280 X.509 Certificates', url: 'https://www.rfc-editor.org/rfc/rfc5280.html' },
    { name: 'RFC 7468 PEM Textual Encodings', url: 'https://www.rfc-editor.org/rfc/rfc7468.html' },
    { name: 'OpenSSL x509 Manual', url: 'https://docs.openssl.org/master/man1/openssl-x509/' },
  ],
  'csr-generator': [
    { name: 'RFC 2986 PKCS #10 CSR Syntax', url: 'https://www.rfc-editor.org/rfc/rfc2986.html' },
    { name: 'OpenSSL req Command', url: 'https://docs.openssl.org/master/man1/openssl-req/' },
  ],
  'sse-stream-tester': [
    { name: 'WHATWG Server-Sent Events Standard', url: 'https://html.spec.whatwg.org/multipage/server-sent-events.html' },
    { name: 'MDN EventSource API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/EventSource' },
  ],
  'graphql-query-formatter': [
    { name: 'GraphQL Language Specification', url: 'https://spec.graphql.org/October2021/#sec-Language' },
    { name: 'GraphQL Queries & Mutations', url: 'https://graphql.org/learn/queries/' },
  ],
  'har-viewer': [
    { name: 'W3C HAR 1.2 Specification', url: 'https://w3c.github.io/web-performance/specs/HAR/Overview.html' },
    { name: 'MDN Network Monitor', url: 'https://firefox-source-docs.mozilla.org/devtools-user/network_monitor/' },
  ],
  'dns-lookup-simulator': [
    { name: 'RFC 1035 Domain Names Specification', url: 'https://www.rfc-editor.org/rfc/rfc1035.html' },
    { name: 'IANA DNS Parameters Registry', url: 'https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml' },
  ],
  'http-wire-format': [
    { name: 'RFC 9112 HTTP/1.1 Message Syntax', url: 'https://www.rfc-editor.org/rfc/rfc9112.html' },
    { name: 'MDN HTTP Messages', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages' },
  ],
  'webhook-signature-verifier': [
    { name: 'RFC 2104 HMAC Specification', url: 'https://www.rfc-editor.org/rfc/rfc2104.html' },
    { name: 'Stripe Webhook Signatures', url: 'https://docs.stripe.com/webhooks/signature' },
    { name: 'GitHub Validating Webhook Deliveries', url: 'https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries' },
  ],
  'uuid-v7-generator': [
    { name: 'RFC 9562 Section 5.7 UUIDv7', url: 'https://www.rfc-editor.org/rfc/rfc9562.html#section-5.7' },
    { name: 'MDN Crypto.getRandomValues', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues' },
  ],
  'nanoid-generator': [
    { name: 'NanoID Specification & Repository', url: 'https://github.com/ai/nanoid' },
    { name: 'MDN Crypto.getRandomValues', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues' },
  ],
  'base58-encoder': [
    { name: 'IETF Base58 Encoding Scheme', url: 'https://datatracker.ietf.org/doc/html/draft-msporny-base58-03' },
    { name: 'Bitcoin Base58Check Wiki', url: 'https://en.bitcoin.it/wiki/Base58Check_encoding' },
  ],
  'ssh-key-inspector': [
    { name: 'RFC 4716 SSH Public Key File Format', url: 'https://www.rfc-editor.org/rfc/rfc4716.html' },
    { name: 'RFC 4253 SSH Transport Layer Protocol', url: 'https://www.rfc-editor.org/rfc/rfc4253.html' },
    { name: 'OpenSSH ssh-keygen Manual', url: 'https://man.openbsd.org/ssh-keygen.1' },
  ],
  'pgp-key-inspector': [
    { name: 'RFC 4880 OpenPGP Message Format', url: 'https://www.rfc-editor.org/rfc/rfc4880.html' },
    { name: 'RFC 9580 OpenPGP Update', url: 'https://www.rfc-editor.org/rfc/rfc9580.html' },
    { name: 'GnuPG User Guides', url: 'https://gnupg.org/documentation/guides.html' },
  ],
  'api-key-generator': [
    { name: 'MDN Crypto.getRandomValues', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues' },
    { name: 'OWASP Secrets Management Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html' },
  ],
  'jwt-signature-validator': [
    { name: 'RFC 7519 JSON Web Token (JWT)', url: 'https://www.rfc-editor.org/rfc/rfc7519.html' },
    { name: 'RFC 7515 JSON Web Signature (JWS)', url: 'https://www.rfc-editor.org/rfc/rfc7515.html' },
    { name: 'MDN SubtleCrypto.verify', url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/verify' },
  ],
  'aes-crypto-playground': [
    { name: 'NIST FIPS 197 AES Standard', url: 'https://csrc.nist.gov/pubs/fips/197/final' },
    { name: 'NIST SP 800-38D AES-GCM', url: 'https://csrc.nist.gov/pubs/sp/800/38/d/final' },
    { name: 'MDN SubtleCrypto.encrypt', url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt' },
  ],
  'bip39-seed-deriver': [
    { name: 'Bitcoin BIP-0039 Mnemonic Code', url: 'https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki' },
    { name: 'RFC 8018 PKCS #5 PBKDF2', url: 'https://www.rfc-editor.org/rfc/rfc8018.html' },
  ],
  'argon2-hash-generator': [
    { name: 'RFC 9106 Argon2 Memory-Hard Function', url: 'https://www.rfc-editor.org/rfc/rfc9106.html' },
    { name: 'OWASP Password Storage Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html' },
  ],
  'android-manifest-builder': [
    { name: 'Android App Manifest Overview', url: 'https://developer.android.com/guide/topics/manifest/manifest-intro' },
    { name: 'Android Permissions Overview', url: 'https://developer.android.com/guide/topics/permissions/overview' },
  ],
  'ios-plist-builder': [
    { name: 'Apple Information Property List Reference', url: 'https://developer.apple.com/documentation/bundleresources/information_property_list' },
    { name: 'Apple Protected Resources Keys', url: 'https://developer.apple.com/documentation/bundleresources/information_property_list/protected_resources' },
  ],
  'app-icon-resizer': [
    { name: 'Apple Human Interface Guidelines: App Icons', url: 'https://developer.apple.com/design/human-interface-guidelines/app-icons' },
    { name: 'Android Adaptive Icons Guide', url: 'https://developer.android.com/develop/ui/views/launch/icon_design_adaptive' },
  ],
  'universal-links-validator': [
    { name: 'Apple Supporting Associated Domains', url: 'https://developer.apple.com/documentation/xcode/supporting-associated-domains' },
    { name: 'Android Verify App Links', url: 'https://developer.android.com/training/app-links/verify-android-applinks' },
  ],
  'flutter-theme-generator': [
    { name: 'Flutter Material 3 Themes Cookbook', url: 'https://docs.flutter.dev/cookbook/design/themes' },
    { name: 'Flutter ColorScheme API', url: 'https://api.flutter.dev/flutter/material/ColorScheme-class.html' },
  ],
  'xcode-asset-catalog': [
    { name: 'Apple Asset Catalog Format Reference', url: 'https://developer.apple.com/library/archive/documentation/Xcode/Reference/xcode_ref-Asset_Catalog_Format/' },
    { name: 'Apple Xcode Images Asset Docs', url: 'https://developer.apple.com/documentation/xcode/managing-assets-with-asset-catalogs' },
  ],
  'android-keystore-fingerprint': [
    { name: 'Android App Signing Documentation', url: 'https://developer.android.com/studio/publish/app-signing' },
    { name: 'Google Play Services Client Auth', url: 'https://developers.google.com/android/guides/client-auth' },
  ],
  'electron-config-builder': [
    { name: 'Electron BrowserWindow API', url: 'https://www.electronjs.org/docs/latest/api/browser-window' },
    { name: 'Electron Security Guidelines', url: 'https://www.electronjs.org/docs/latest/tutorial/security' },
  ],
  'react-native-icon-finder': [
    { name: 'React Native Vector Icons', url: 'https://github.com/oblador/react-native-vector-icons' },
    { name: 'Expo Vector Icons Directory', url: 'https://docs.expo.dev/guides/icons/' },
  ],
  'capacitor-config-builder': [
    { name: 'Capacitor Configuration Schema', url: 'https://capacitorjs.com/docs/config' },
    { name: 'Capacitor CLI Documentation', url: 'https://capacitorjs.com/docs/cli' },
  ],
  'code-side-by-side-diff': [
    { name: 'GNU Diffutils Manual', url: 'https://www.gnu.org/software/diffutils/manual/diffutils.html' },
    { name: 'Git git-diff Documentation', url: 'https://git-scm.com/docs/git-diff' },
  ],
  'conventional-commit-builder': [
    { name: 'Conventional Commits v1.0.0', url: 'https://www.conventionalcommits.org/en/v1.0.0/' },
    { name: 'Semantic Versioning 2.0.0', url: 'https://semver.org/' },
  ],
  'git-command-builder': [
    { name: 'Git Reference Manual', url: 'https://git-scm.com/docs' },
    { name: 'Git Rebase Documentation', url: 'https://git-scm.com/docs/git-rebase' },
    { name: 'Git Cherry-Pick Documentation', url: 'https://git-scm.com/docs/git-cherry-pick' },
  ],
  'env-sanitizer': [
    { name: 'The Twelve-Factor App: Config', url: 'https://12factor.net/config' },
    { name: 'OWASP Secrets Management Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html' },
  ],
  'license-generator': [
    { name: 'SPDX License List', url: 'https://spdx.org/licenses/' },
    { name: 'Open Source Initiative Licenses', url: 'https://opensource.org/licenses' },
  ],
  'eslint-prettier-config': [
    { name: 'Prettier Configuration File Docs', url: 'https://prettier.io/docs/en/configuration.html' },
    { name: 'ESLint Configuration Files', url: 'https://eslint.org/docs/latest/use/configure/configuration-files' },
  ],
  'markdown-to-slides': [
    { name: 'CommonMark Specification', url: 'https://spec.commonmark.org/' },
    { name: 'reveal.js Markdown Slides', url: 'https://revealjs.com/markdown/' },
  ],
  'package-json-formatter': [
    { name: 'npm package.json Specification', url: 'https://docs.npmjs.com/cli/v10/configuring-npm/package-json' },
    { name: 'RFC 8259 JSON Specification', url: 'https://www.rfc-editor.org/rfc/rfc8259.html' },
  ],
  'changelog-generator': [
    { name: 'Keep a Changelog v1.1.0', url: 'https://keepachangelog.com/en/1.1.0/' },
    { name: 'Semantic Versioning 2.0.0', url: 'https://semver.org/' },
  ],
  'editorconfig-generator': [
    { name: 'EditorConfig Specification', url: 'https://spec.editorconfig.org/' },
    { name: 'EditorConfig Documentation', url: 'https://editorconfig.org/' },
  ],
  'ieee754-visualizer': [
    { name: 'IEEE 754-2019 Floating-Point Standard', url: 'https://ieeexplore.ieee.org/document/8766229' },
    { name: 'MDN DataView.prototype.getFloat32', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getFloat32' },
  ],
  'bitwise-calculator': [
    { name: 'MDN Bitwise Operators', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_AND' },
    { name: 'ECMA-262 Binary Bitwise Operators', url: 'https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-binary-bitwise-operators' },
  ],
  'hex-dump-viewer': [
    { name: 'Linux hexdump(1) Manual', url: 'https://man7.org/linux/man-pages/man1/hexdump.1.html' },
    { name: 'RFC 4648 Base16 Hex Encoding', url: 'https://www.rfc-editor.org/rfc/rfc4648.html#section-8' },
  ],
  'bignumber-calculator': [
    { name: 'MDN JavaScript BigInt', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt' },
    { name: 'ECMA-262 BigInt Objects', url: 'https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-bigint-objects' },
  ],
  'multi-radix-converter': [
    { name: 'MDN Number.prototype.toString', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString' },
    { name: 'MDN parseInt', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt' },
  ],
  'timezone-meeting-planner': [
    { name: 'IANA Time Zone Database', url: 'https://www.iana.org/time-zones' },
    { name: 'MDN Intl.DateTimeFormat', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat' },
  ],
  'bandwidth-calculator': [
    { name: 'IEC 80000-13 Binary Prefixes', url: 'https://physics.nist.gov/cuu/Units/binary.html' },
    { name: 'RFC 6349 Network Throughput Methodology', url: 'https://www.rfc-editor.org/rfc/rfc6349.html' },
  ],
  'percentage-growth-calculator': [
    { name: 'MDN JavaScript Math Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math' },
    { name: 'MDN Intl.NumberFormat', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat' },
  ],
  'cron-timezone-converter': [
    { name: 'POSIX crontab Specification', url: 'https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html' },
    { name: 'IANA Time Zone Database', url: 'https://www.iana.org/time-zones' },
  ],
  'matrix-calculator': [
    { name: 'NumPy Linear Algebra (linalg)', url: 'https://numpy.org/doc/stable/reference/routines.linalg.html' },
    { name: 'BLAS Technical Forum Standard', url: 'https://www.netlib.org/blas/' },
  ],
  'curl-to-python': [
    { name: 'curl Manual Page', url: 'https://curl.se/docs/manpage.html' },
    { name: 'Python Requests Documentation', url: 'https://requests.readthedocs.io/en/latest/' },
    { name: 'Python HTTPX Documentation', url: 'https://www.python-httpx.org/' },
  ],
  'curl-to-javascript': [
    { name: 'curl Manual Page', url: 'https://curl.se/docs/manpage.html' },
    { name: 'MDN Using the Fetch API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch' },
    { name: 'Axios Documentation', url: 'https://axios-http.com/docs/intro' },
  ],
  'curl-to-go': [
    { name: 'curl Manual Page', url: 'https://curl.se/docs/manpage.html' },
    { name: 'Go net/http Package', url: 'https://pkg.go.dev/net/http' },
  ],
  'curl-to-rust': [
    { name: 'curl Manual Page', url: 'https://curl.se/docs/manpage.html' },
    { name: 'Rust reqwest Crate Docs', url: 'https://docs.rs/reqwest/latest/reqwest/' },
  ],
  'curl-to-php': [
    { name: 'curl Manual Page', url: 'https://curl.se/docs/manpage.html' },
    { name: 'PHP cURL Extension Manual', url: 'https://www.php.net/manual/en/book.curl.php' },
    { name: 'Guzzle HTTP Client Docs', url: 'https://docs.guzzlephp.org/en/stable/' },
  ],
  'curl-to-csharp': [
    { name: 'curl Manual Page', url: 'https://curl.se/docs/manpage.html' },
    { name: '.NET HttpClient Class', url: 'https://learn.microsoft.com/en-us/dotnet/api/system.net.http.httpclient' },
  ],
  'curl-to-java': [
    { name: 'curl Manual Page', url: 'https://curl.se/docs/manpage.html' },
    { name: 'Java HttpClient API Docs', url: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.net.http/java/net/http/HttpClient.html' },
  ],
  'curl-to-ai-sdk': [
    { name: 'OpenAI API Reference', url: 'https://platform.openai.com/docs/api-reference' },
    { name: 'Anthropic Messages API', url: 'https://platform.claude.com/docs/en/api/messages' },
  ],
  'openai-structured-outputs': [
    { name: 'OpenAI Structured Outputs Guide', url: 'https://platform.openai.com/docs/guides/structured-outputs' },
    { name: 'JSON Schema 2020-12 Core', url: 'https://json-schema.org/draft/2020-12/json-schema-core' },
  ],
  'vercel-ai-core-message-converter': [
    { name: 'Vercel AI SDK Prompts & Messages', url: 'https://sdk.vercel.ai/docs/ai-sdk-core/prompts' },
    { name: 'Vercel AI SDK Core Overview', url: 'https://sdk.vercel.ai/docs/ai-sdk-core/overview' },
  ],
  'langgraph-state-generator': [
    { name: 'LangGraph Low-Level State Concepts', url: 'https://langchain-ai.github.io/langgraph/concepts/low_level/' },
    { name: 'Python typing.TypedDict', url: 'https://docs.python.org/3/library/typing.html#typing.TypedDict' },
  ],
  'embedding-cost-calculator': [
    { name: 'OpenAI Embeddings Guide', url: 'https://platform.openai.com/docs/guides/embeddings' },
    { name: 'OpenAI API Pricing', url: 'https://openai.com/api/pricing/' },
  ],
  'anthropic-tool-builder': [
    { name: 'Anthropic Tool Use Overview', url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview' },
    { name: 'JSON Schema Specification', url: 'https://json-schema.org/specification' },
  ],
  'tailwind-v3-to-v4-migrator': [
    { name: 'Tailwind CSS v4 Upgrade Guide', url: 'https://tailwindcss.com/docs/upgrade-guide' },
    { name: 'Tailwind CSS Theme Variables', url: 'https://tailwindcss.com/docs/theme' },
  ],
  'css-box-shadow-to-tailwind': [
    { name: 'Tailwind CSS Box Shadow', url: 'https://tailwindcss.com/docs/box-shadow' },
    { name: 'MDN CSS box-shadow', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow' },
  ],
  'nextjs-metadata-generator': [
    { name: 'Next.js Metadata & OG Images', url: 'https://nextjs.org/docs/app/building-your-application/optimizing/metadata' },
    { name: 'Next.js generateMetadata API', url: 'https://nextjs.org/docs/app/api-reference/functions/generate-metadata' },
    { name: 'The Open Graph Protocol', url: 'https://ogp.me/' },
  ],
  'svg-to-css': [
    { name: 'RFC 2397 data URL Scheme', url: 'https://www.rfc-editor.org/rfc/rfc2397.html' },
    { name: 'MDN CSS background-image', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/background-image' },
    { name: 'MDN CSS mask-image', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image' },
  ],
  'html-table-converter': [
    { name: 'MDN HTML table Element', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table' },
    { name: 'GitHub Flavored Markdown Tables', url: 'https://github.github.com/gfm/#tables-extension-' },
    { name: 'RFC 4180 CSV Format', url: 'https://www.rfc-editor.org/rfc/rfc4180.html' },
  ],
  'natural-language-to-cron': [
    { name: 'POSIX crontab Specification', url: 'https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html' },
    { name: 'Linux crontab(5) Manual', url: 'https://man7.org/linux/man-pages/man5/crontab.5.html' },
  ],
  'gitignore-tester': [
    { name: 'Git gitignore Pattern Format', url: 'https://git-scm.com/docs/gitignore#_pattern_format' },
    { name: 'Docker .dockerignore File', url: 'https://docs.docker.com/build/building/context/#dockerignore-files' },
  ],
  'k8s-resource-calculator': [
    { name: 'Kubernetes Resource Management for Pods', url: 'https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/' },
    { name: 'Kubernetes Pod Quality of Service Classes', url: 'https://kubernetes.io/docs/concepts/workloads/pods/pod-qos/' },
  ],
  'terraform-hcl-to-json': [
    { name: 'Terraform JSON Configuration Syntax', url: 'https://developer.hashicorp.com/terraform/language/syntax/json' },
    { name: 'Terraform HCL Syntax', url: 'https://developer.hashicorp.com/terraform/language/syntax/configuration' },
  ],
  'systemd-timer-generator': [
    { name: 'systemd.timer(5) Manual', url: 'https://www.freedesktop.org/software/systemd/man/systemd.timer.html' },
    { name: 'systemd.service(5) Manual', url: 'https://www.freedesktop.org/software/systemd/man/systemd.service.html' },
  ],
  'sql-to-prisma': [
    { name: 'Prisma Schema Reference', url: 'https://www.prisma.io/docs/orm/prisma-schema/overview' },
    { name: 'PostgreSQL CREATE TABLE', url: 'https://www.postgresql.org/docs/current/sql-createtable.html' },
  ],
  'sql-to-drizzle': [
    { name: 'Drizzle ORM Schema Declaration', url: 'https://orm.drizzle.team/docs/sql-schema-declaration' },
    { name: 'PostgreSQL CREATE TABLE', url: 'https://www.postgresql.org/docs/current/sql-createtable.html' },
  ],
  'postgres-explain-visualizer': [
    { name: 'PostgreSQL Using EXPLAIN', url: 'https://www.postgresql.org/docs/current/using-explain.html' },
    { name: 'PostgreSQL EXPLAIN Command', url: 'https://www.postgresql.org/docs/current/sql-explain.html' },
  ],
  'mongodb-to-sql': [
    { name: 'MongoDB SQL to Aggregation Comparison', url: 'https://www.mongodb.com/docs/manual/reference/sql-aggregation-comparison/' },
    { name: 'PostgreSQL SELECT Reference', url: 'https://www.postgresql.org/docs/current/sql-select.html' },
  ],
  'sql-to-django': [
    { name: 'Django Models Documentation', url: 'https://docs.djangoproject.com/en/stable/topics/db/models/' },
    { name: 'Django Model Field Reference', url: 'https://docs.djangoproject.com/en/stable/ref/models/fields/' },
  ],
  'sql-keyword-uppercaser': [
    { name: 'PostgreSQL SQL Key Words', url: 'https://www.postgresql.org/docs/current/sql-keywords-appendix.html' },
    { name: 'SQLite Keywords Reference', url: 'https://www.sqlite.org/lang_keywords.html' },
  ],
  'subnet-calculator': [
    { name: 'RFC 4632 Classless Inter-domain Routing', url: 'https://www.rfc-editor.org/rfc/rfc4632.html' },
    { name: 'RFC 1918 Address Allocation for Private Internets', url: 'https://www.rfc-editor.org/rfc/rfc1918.html' },
  ],
  'uuid-v5-generator': [
    { name: 'RFC 9562 Section 5.5 UUIDv5', url: 'https://www.rfc-editor.org/rfc/rfc9562.html#section-5.5' },
    { name: 'RFC 4122 Legacy UUID Specification', url: 'https://www.rfc-editor.org/rfc/rfc4122.html' },
    { name: 'Python uuid.uuid5', url: 'https://docs.python.org/3/library/uuid.html#uuid.uuid5' },
  ],
  'eip712-hasher': [
    { name: 'Ethereum EIP-712 Typed Structured Data Hashing', url: 'https://eips.ethereum.org/EIPS/eip-712' },
    { name: 'Ethereum JSON-RPC eth_signTypedData_v4', url: 'https://ethereum.org/en/developers/docs/apis/json-rpc/' },
  ],
  'crypto-unit-converter': [
    { name: 'Ethereum Gas and Ether Denominations', url: 'https://ethereum.org/en/developers/docs/gas/' },
    { name: 'Bitcoin Units & Satoshi Specification', url: 'https://developer.bitcoin.org/devguide/block_chain.html' },
  ],
  'json-to-python-dataclass': [
    { name: 'Python dataclasses Module', url: 'https://docs.python.org/3/library/dataclasses.html' },
    { name: 'Python json Module', url: 'https://docs.python.org/3/library/json.html' },
  ],
  'json-to-go-struct': [
    { name: 'Go encoding/json Package', url: 'https://pkg.go.dev/encoding/json' },
    { name: 'Effective Go: Structs', url: 'https://go.dev/doc/effective_go' },
  ],
  'proto-to-typescript': [
    { name: 'Protocol Buffers Language Guide (proto3)', url: 'https://protobuf.dev/programming-guides/proto3/' },
    { name: 'TypeScript Handbook: Everyday Types', url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html' },
  ],
  'http-headers-to-json': [
    { name: 'RFC 9110 HTTP Semantics: Fields', url: 'https://www.rfc-editor.org/rfc/rfc9110.html#section-5' },
    { name: 'MDN HTTP Headers Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers' },
  ],
  'passphrase-wordlist-generator': [
    { name: 'EFF Long Wordlist for Passphrases', url: 'https://www.eff.org/dice' },
    { name: 'NIST SP 800-63B Memorized Secrets', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
    { name: 'MDN Crypto.getRandomValues', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues' },
  ],
  'nanoid-custom-alphabet': [
    { name: 'NanoID Specification & Custom Alphabets', url: 'https://github.com/ai/nanoid' },
    { name: 'MDN Crypto.getRandomValues', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues' },
  ],
  'mock-credit-card-generator': [
    { name: 'ISO/IEC 7812 Identification Cards (Luhn)', url: 'https://www.iso.org/standard/70484.html' },
    { name: 'Stripe Test Card Numbers', url: 'https://docs.stripe.com/testing' },
  ],
  'tailwind-spacing-generator': [
    { name: 'Tailwind CSS Spacing Scale', url: 'https://tailwindcss.com/docs/customizing-spacing' },
    { name: 'Tailwind CSS Margin & Padding', url: 'https://tailwindcss.com/docs/padding' },
  ],
  'docker-compose-env-generator': [
    { name: 'Docker Compose Environment Variables', url: 'https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/' },
    { name: 'The Twelve-Factor App: Config', url: 'https://12factor.net/config' },
  ],
  'dns-propagation-checker': [
    { name: 'RFC 1035 Domain Names & Caching (TTL)', url: 'https://www.rfc-editor.org/rfc/rfc1035.html' },
    { name: 'DNS over HTTPS (RFC 8484)', url: 'https://www.rfc-editor.org/rfc/rfc8484.html' },
  ],
  'url-utm-builder': [
    { name: 'Google Analytics Campaign URL Parameters', url: 'https://support.google.com/analytics/answer/10917952' },
    { name: 'WHATWG URLSearchParams', url: 'https://url.spec.whatwg.org/#interface-urlsearchparams' },
  ],
  'sha3-hash-generator': [
    { name: 'NIST FIPS 202 SHA-3 Standard', url: 'https://csrc.nist.gov/pubs/fips/202/final' },
    { name: 'Python hashlib SHA-3', url: 'https://docs.python.org/3/library/hashlib.html' },
  ],
  'curl-to-axios': [
    { name: 'curl Manual Page', url: 'https://curl.se/docs/manpage.html' },
    { name: 'Axios Request Config', url: 'https://axios-http.com/docs/req_config' },
  ],
  'fetch-to-curl': [
    { name: 'MDN Fetch API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch' },
    { name: 'curl Manual Page', url: 'https://curl.se/docs/manpage.html' },
  ],
  'json-to-xml': [
    { name: 'W3C XML 1.0 Specification', url: 'https://www.w3.org/TR/xml/' },
    { name: 'RFC 8259 JSON Specification', url: 'https://www.rfc-editor.org/rfc/rfc8259.html' },
  ],
  'excel-to-json': [
    { name: 'ECMA-376 Office Open XML (.xlsx)', url: 'https://ecma-international.org/publications-and-standards/standards/ecma-376/' },
    { name: 'RFC 4180 CSV Format', url: 'https://www.rfc-editor.org/rfc/rfc4180.html' },
  ],
  'json-to-excel': [
    { name: 'ECMA-376 Office Open XML (.xlsx)', url: 'https://ecma-international.org/publications-and-standards/standards/ecma-376/' },
    { name: 'RFC 4180 CSV Format', url: 'https://www.rfc-editor.org/rfc/rfc4180.html' },
  ],
  'image-converter': [
    { name: 'MDN Image File Type and Format Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types' },
    { name: 'MDN HTMLCanvasElement.toBlob', url: 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob' },
  ],
  'images-to-pdf': [
    { name: 'PDF 2.0 Specification (ISO 32000-2)', url: 'https://pdfa.org/resource/iso-32000-2/' },
    { name: 'MDN Canvas API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API' },
  ],
  'image-compressor': [
    { name: 'MDN Image Formats Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types' },
    { name: 'WebP Compression Study', url: 'https://developers.google.com/speed/webp/docs/compression' },
    { name: 'MDN HTMLCanvasElement.toBlob', url: 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob' },
  ],
  'image-color-extractor': [
    { name: 'MDN CanvasRenderingContext2D.getImageData', url: 'https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData' },
    { name: 'W3C CSS Color Module Level 4', url: 'https://www.w3.org/TR/css-color-4/' },
  ],
  'pdf-merger': [
    { name: 'PDF 2.0 Specification (ISO 32000-2)', url: 'https://pdfa.org/resource/iso-32000-2/' },
    { name: 'MDN File API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/File_API' },
  ],
  'pdf-splitter': [
    { name: 'PDF 2.0 Specification (ISO 32000-2)', url: 'https://pdfa.org/resource/iso-32000-2/' },
    { name: 'MDN File API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/File_API' },
  ],
  'llm-pricing-calculator': [
    { name: 'OpenAI API Pricing', url: 'https://openai.com/api/pricing/' },
    { name: 'Anthropic Claude API Pricing', url: 'https://platform.claude.com/docs/en/about-claude/pricing' },
    { name: 'Google Gemini API Pricing', url: 'https://ai.google.dev/gemini-api/docs/pricing' },
  ],
  'code-playground': [
    { name: 'WHATWG HTML Living Standard', url: 'https://html.spec.whatwg.org/' },
    { name: 'MDN HTML iframe Sandbox', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#sandbox' },
  ],
  'schema-org-generator': [
    { name: 'Schema.org Schemas Reference', url: 'https://schema.org/docs/schemas.html' },
    { name: 'W3C JSON-LD 1.1 Specification', url: 'https://www.w3.org/TR/json-ld11/' },
    { name: 'Google Search Structured Data Intro', url: 'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data' },
  ],
  'image-exif-stripper': [
    { name: 'ExifTool EXIF Tag Names', url: 'https://exiftool.org/TagNames/EXIF.html' },
    { name: 'CIPA DC-008 Exif Specification', url: 'https://www.cipa.jp/std/documents/e/DC-008-Translation-2023-E.pdf' },
  ],
  'file-checksum-comparator': [
    { name: 'NIST FIPS 180-4 Secure Hash Standard', url: 'https://csrc.nist.gov/pubs/fips/180-4/upd1/final' },
    { name: 'RFC 1321 MD5 Specification', url: 'https://www.rfc-editor.org/rfc/rfc1321.html' },
    { name: 'MDN SubtleCrypto.digest', url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest' },
  ],
  'video-to-gif': [
    { name: 'W3C GIF89a Specification', url: 'https://www.w3.org/Graphics/GIF/spec-gif89a.txt' },
    { name: 'MDN Media Formats for HTML Audio and Video', url: 'https://developer.mozilla.org/en-US/docs/Web/Media/Formats' },
    { name: 'MDN HTMLVideoElement', url: 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement' },
  ],
  'pdf-to-image': [
    { name: 'PDF 2.0 Specification (ISO 32000-2)', url: 'https://pdfa.org/resource/iso-32000-2/' },
    { name: 'MDN HTMLCanvasElement.toDataURL', url: 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL' },
  ],
  'audio-converter': [
    { name: 'MDN Web Audio API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API' },
    { name: 'MDN Audio Formats Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs' },
  ],
  'swagger-to-typescript': [
    { name: 'OpenAPI Specification v3.1.0', url: 'https://spec.openapis.org/oas/v3.1.0' },
    { name: 'OpenAPI Specification v2.0 (Swagger)', url: 'https://swagger.io/specification/v2/' },
    { name: 'TypeScript Everyday Types', url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html' },
  ],
  'postman-collection-to-curl': [
    { name: 'Postman Collection Overview', url: 'https://learning.postman.com/docs/collections/collections-overview/' },
    { name: 'curl Manual Page', url: 'https://curl.se/docs/manpage.html' },
  ],
  'html-to-gfm-converter': [
    { name: 'GitHub Flavored Markdown Spec', url: 'https://github.github.com/gfm/' },
    { name: 'CommonMark Specification', url: 'https://spec.commonmark.org/' },
    { name: 'WHATWG HTML Living Standard', url: 'https://html.spec.whatwg.org/' },
  ],
  'json-csv-grid-editor': [
    { name: 'RFC 4180 CSV Format', url: 'https://www.rfc-editor.org/rfc/rfc4180.html' },
    { name: 'RFC 8259 JSON Specification', url: 'https://www.rfc-editor.org/rfc/rfc8259.html' },
  ],
  'tailwind-to-inline-css': [
    { name: 'Tailwind CSS Utility-First Fundamentals', url: 'https://tailwindcss.com/docs/styling-with-utility-classes' },
    { name: 'MDN HTML style Attribute', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/style' },
  ],
  'css-glassmorphism-claymorphism': [
    { name: 'MDN CSS backdrop-filter', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter' },
    { name: 'MDN CSS box-shadow', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow' },
  ],
  'css-clamp-calculator': [
    { name: 'MDN CSS clamp() Function', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/clamp' },
    { name: 'W3C CSS Values and Units Level 4', url: 'https://www.w3.org/TR/css-values-4/#comp-func' },
  ],
  'llm-function-calling-builder': [
    { name: 'OpenAI Function Calling Guide', url: 'https://platform.openai.com/docs/guides/function-calling' },
    { name: 'Anthropic Tool Use Overview', url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview' },
    { name: 'Gemini Function Calling', url: 'https://ai.google.dev/gemini-api/docs/function-calling' },
  ],
  'json-to-json-schema': [
    { name: 'JSON Schema 2020-12 Core', url: 'https://json-schema.org/draft/2020-12/json-schema-core' },
    { name: 'JSON Schema Draft-07', url: 'https://json-schema.org/draft-07/schema' },
  ],
  'rag-chunking-calculator': [
    { name: 'LangChain Text Splitters Concepts', url: 'https://python.langchain.com/docs/concepts/text_splitters/' },
    { name: 'OpenAI Embeddings Guide', url: 'https://platform.openai.com/docs/guides/embeddings' },
  ],
  'sql-to-orm-schema': [
    { name: 'Prisma Schema Reference', url: 'https://www.prisma.io/docs/orm/prisma-schema/overview' },
    { name: 'Drizzle ORM Schema Declaration', url: 'https://orm.drizzle.team/docs/sql-schema-declaration' },
  ],
  'curl-to-har': [
    { name: 'curl Manual Page', url: 'https://curl.se/docs/manpage.html' },
    { name: 'W3C HAR 1.2 Specification', url: 'https://w3c.github.io/web-performance/specs/HAR/Overview.html' },
  ],
  'api-mock-response-generator': [
    { name: 'RFC 8259 JSON Specification', url: 'https://www.rfc-editor.org/rfc/rfc8259.html' },
    { name: 'JSON:API Pagination Conventions', url: 'https://jsonapi.org/format/#fetching-pagination' },
  ],
  'http-security-headers-analyzer': [
    { name: 'OWASP HTTP Headers Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html' },
    { name: 'RFC 6797 HTTP Strict Transport Security (HSTS)', url: 'https://www.rfc-editor.org/rfc/rfc6797.html' },
    { name: 'MDN Content-Security-Policy', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy' },
  ],
  'graphql-schema-to-zod': [
    { name: 'GraphQL Type System Specification', url: 'https://spec.graphql.org/October2021/#sec-Type-System' },
    { name: 'Zod Documentation', url: 'https://zod.dev/' },
  ],
  'css-triangle-bubble-generator': [
    { name: 'MDN CSS border Property', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/border' },
    { name: 'MDN CSS ::after Pseudo-element', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/::after' },
  ],
  'svg-to-css-data-uri': [
    { name: 'RFC 2397 data URL Scheme', url: 'https://www.rfc-editor.org/rfc/rfc2397.html' },
    { name: 'MDN CSS background-image', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/background-image' },
    { name: 'MDN CSS mask-image', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image' },
  ],
  'css-3d-box-shadow-generator': [
    { name: 'MDN CSS box-shadow', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow' },
    { name: 'W3C CSS Backgrounds and Borders Level 3', url: 'https://www.w3.org/TR/css-backgrounds-3/#box-shadow' },
  ],
  'system-prompt-xml-builder': [
    { name: 'Anthropic Use XML Tags Guide', url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/use-xml-tags' },
    { name: 'Anthropic System Prompts', url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/system-prompts' },
  ],
  'multi-llm-token-comparator': [
    { name: 'OpenAI API Pricing', url: 'https://openai.com/api/pricing/' },
    { name: 'Anthropic Claude API Pricing', url: 'https://platform.claude.com/docs/en/about-claude/pricing' },
    { name: 'DeepSeek API Pricing', url: 'https://api-docs.deepseek.com/quick_start/pricing' },
  ],
  'json-to-sql-insert': [
    { name: 'PostgreSQL INSERT Statement', url: 'https://www.postgresql.org/docs/current/sql-insert.html' },
    { name: 'MySQL UPDATE Statement', url: 'https://dev.mysql.com/doc/refman/8.4/en/update.html' },
    { name: 'RFC 4180 CSV Format', url: 'https://www.rfc-editor.org/rfc/rfc4180.html' },
  ],
  'nginx-to-caddy-converter': [
    { name: 'Caddyfile Concepts & Directives', url: 'https://caddyserver.com/docs/caddyfile' },
    { name: 'Nginx HTTP Server Documentation', url: 'https://nginx.org/en/docs/' },
    { name: 'Apache VirtualHost Documentation', url: 'https://httpd.apache.org/docs/current/vhosts/' },
  ],
  'git-command-cheat-builder': [
    { name: 'Git Rebase Documentation', url: 'https://git-scm.com/docs/git-rebase' },
    { name: 'Git Bisect Documentation', url: 'https://git-scm.com/docs/git-bisect' },
    { name: 'Git Reset Documentation', url: 'https://git-scm.com/docs/git-reset' },
  ],
  'sql-to-go-gorm': [
    { name: 'GORM Models Declaring Documentation', url: 'https://gorm.io/docs/models.html' },
    { name: 'PostgreSQL CREATE TABLE', url: 'https://www.postgresql.org/docs/current/sql-createtable.html' },
  ],
  'sql-to-python-sqlalchemy': [
    { name: 'SQLAlchemy 2.0 Declarative Tables', url: 'https://docs.sqlalchemy.org/en/20/orm/declarative_tables.html' },
    { name: 'SQLAlchemy 2.0 ORM Quickstart', url: 'https://docs.sqlalchemy.org/en/20/orm/quickstart.html' },
  ],
  'postman-to-openapi': [
    { name: 'OpenAPI Specification v3.1.0', url: 'https://spec.openapis.org/oas/v3.1.0' },
    { name: 'Postman Collection Format', url: 'https://learning.postman.com/docs/collections/collections-overview/' },
  ],
  'openapi-to-postman': [
    { name: 'OpenAPI Specification v3.0.3', url: 'https://spec.openapis.org/oas/v3.0.3' },
    { name: 'Postman Collection Format', url: 'https://learning.postman.com/docs/collections/collections-overview/' },
  ],
  'protobuf-to-json-schema': [
    { name: 'Protocol Buffers Proto3 JSON Mapping', url: 'https://protobuf.dev/programming-guides/proto3/#json' },
    { name: 'JSON Schema Draft-07', url: 'https://json-schema.org/draft-07/schema' },
  ],
  'json-schema-to-protobuf': [
    { name: 'JSON Schema Specification', url: 'https://json-schema.org/specification' },
    { name: 'Protocol Buffers Language Guide (proto3)', url: 'https://protobuf.dev/programming-guides/proto3/' },
  ],
  'yaml-to-terraform-hcl': [
    { name: 'Terraform HCL Language Syntax', url: 'https://developer.hashicorp.com/terraform/language/syntax/configuration' },
    { name: 'YAML 1.2.2 Specification', url: 'https://yaml.org/spec/1.2.2/' },
  ],
  'terraform-hcl-to-yaml': [
    { name: 'Terraform Input Variables & Locals', url: 'https://developer.hashicorp.com/terraform/language/values/locals' },
    { name: 'YAML 1.2.2 Specification', url: 'https://yaml.org/spec/1.2.2/' },
  ],
  'csv-to-geojson': [
    { name: 'RFC 7946 The GeoJSON Format', url: 'https://www.rfc-editor.org/rfc/rfc7946.html' },
    { name: 'RFC 4180 CSV Format', url: 'https://www.rfc-editor.org/rfc/rfc4180.html' },
  ],
  'geojson-to-csv': [
    { name: 'RFC 7946 The GeoJSON Format', url: 'https://www.rfc-editor.org/rfc/rfc7946.html' },
    { name: 'RFC 4180 CSV Format', url: 'https://www.rfc-editor.org/rfc/rfc4180.html' },
  ],
  'json-to-typescript-type-guards': [
    { name: 'TypeScript Narrowing & Type Predicates', url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates' },
    { name: 'RFC 8259 JSON Specification', url: 'https://www.rfc-editor.org/rfc/rfc8259.html' },
  ],
  'typescript-interface-to-zod': [
    { name: 'TypeScript Interfaces', url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces' },
    { name: 'Zod Documentation', url: 'https://zod.dev/' },
  ],
  'zod-to-typescript-type': [
    { name: 'Zod Type Inference', url: 'https://zod.dev/?id=type-inference' },
    { name: 'TypeScript Creating Types from Types', url: 'https://www.typescriptlang.org/docs/handbook/2/types-from-types.html' },
  ],
  'css-to-scss': [
    { name: 'Sass/SCSS Documentation', url: 'https://sass-lang.com/documentation/' },
    { name: 'Sass Style Rules & Nesting', url: 'https://sass-lang.com/documentation/style-rules/' },
  ],
  'scss-to-css': [
    { name: 'Sass/SCSS Documentation', url: 'https://sass-lang.com/documentation/' },
    { name: 'W3C CSS Syntax Module Level 3', url: 'https://www.w3.org/TR/css-syntax-3/' },
  ],
  'html-to-jsx-tailwind': [
    { name: 'React Writing Markup with JSX', url: 'https://react.dev/learn/writing-markup-with-jsx' },
    { name: 'Tailwind CSS Utility-First Fundamentals', url: 'https://tailwindcss.com/docs/styling-with-utility-classes' },
  ],
  'jsx-to-html': [
    { name: 'React Writing Markup with JSX', url: 'https://react.dev/learn/writing-markup-with-jsx' },
    { name: 'WHATWG HTML Living Standard', url: 'https://html.spec.whatwg.org/' },
  ],
  'markdown-to-bbcode': [
    { name: 'CommonMark Specification', url: 'https://spec.commonmark.org/' },
    { name: 'phpBB BBCode User Guide', url: 'https://www.phpbb.com/community/help/bbcode' },
  ],
  'bbcode-to-markdown': [
    { name: 'GitHub Flavored Markdown Spec', url: 'https://github.github.com/gfm/' },
    { name: 'phpBB BBCode User Guide', url: 'https://www.phpbb.com/community/help/bbcode' },
  ],
  'curl-to-ruby-faraday': [
    { name: 'curl Manual Page', url: 'https://curl.se/docs/manpage.html' },
    { name: 'Faraday Ruby HTTP Client', url: 'https://lostisland.github.io/faraday/' },
    { name: 'Ruby Net::HTTP Documentation', url: 'https://docs.ruby-lang.org/en/master/Net/HTTP.html' },
  ],
  'svg-to-android-vector': [
    { name: 'Android Vector Drawables Overview', url: 'https://developer.android.com/develop/ui/views/graphics/vector-drawable-resources' },
    { name: 'W3C SVG 2 Paths', url: 'https://www.w3.org/TR/SVG2/paths.html' },
  ],
  'svg-to-swiftui-shape': [
    { name: 'Apple SwiftUI Shape Protocol', url: 'https://developer.apple.com/documentation/swiftui/shape' },
    { name: 'Apple SwiftUI Path Struct', url: 'https://developer.apple.com/documentation/swiftui/path' },
    { name: 'W3C SVG 2 Paths', url: 'https://www.w3.org/TR/SVG2/paths.html' },
  ],
  'css-grid-to-tailwind': [
    { name: 'Tailwind CSS Grid Template Columns', url: 'https://tailwindcss.com/docs/grid-template-columns' },
    { name: 'MDN CSS Grid Layout', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout' },
  ],
  'dockerfile-ai-optimized-generator': [
    { name: 'Dockerfile Reference', url: 'https://docs.docker.com/reference/dockerfile/' },
    { name: 'Docker Multi-Stage Builds', url: 'https://docs.docker.com/build/building/multi-stage/' },
    { name: 'Docker Security Best Practices', url: 'https://docs.docker.com/build/building/best-practices/' },
  ],
  'kubernetes-deployment-generator': [
    { name: 'Kubernetes Deployments', url: 'https://kubernetes.io/docs/concepts/workloads/controllers/deployment/' },
    { name: 'Kubernetes Services', url: 'https://kubernetes.io/docs/concepts/services-networking/service/' },
  ],
  'kubernetes-configmap-secret-builder': [
    { name: 'Kubernetes ConfigMaps', url: 'https://kubernetes.io/docs/concepts/configuration/configmap/' },
    { name: 'Kubernetes Secrets', url: 'https://kubernetes.io/docs/concepts/configuration/secret/' },
  ],
  'helm-chart-yaml-generator': [
    { name: 'Helm Charts Documentation', url: 'https://helm.sh/docs/topics/charts/' },
    { name: 'Helm Values Files', url: 'https://helm.sh/docs/chart_template_guide/values_files/' },
  ],
  'gitlab-ci-pipeline-builder': [
    { name: 'GitLab CI/CD YAML Syntax', url: 'https://docs.gitlab.com/ee/ci/yaml/' },
    { name: 'GitLab CI/CD Caching', url: 'https://docs.gitlab.com/ee/ci/caching/' },
  ],
  'github-issue-pr-template-generator': [
    { name: 'GitHub Issue and Pull Request Templates', url: 'https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/about-issue-and-pull-request-templates' },
    { name: 'GitHub Issue Forms Syntax', url: 'https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-githubs-form-schema' },
  ],
  'opa-rego-policy-builder': [
    { name: 'Open Policy Agent Rego Policy Language', url: 'https://www.openpolicyagent.org/docs/latest/policy-language/' },
    { name: 'OPA Policy Reference', url: 'https://www.openpolicyagent.org/docs/latest/policy-reference/' },
  ],
  'systemd-service-hardened-builder': [
    { name: 'systemd.service(5) Manual', url: 'https://www.freedesktop.org/software/systemd/man/systemd.service.html' },
    { name: 'systemd.exec(5) Sandboxing Directives', url: 'https://www.freedesktop.org/software/systemd/man/systemd.exec.html' },
  ],
  'nginx-security-conf-generator': [
    { name: 'Nginx ngx_http_ssl_module', url: 'https://nginx.org/en/docs/http/ngx_http_ssl_module.html' },
    { name: 'Nginx ngx_http_limit_req_module', url: 'https://nginx.org/en/docs/http/ngx_http_limit_req_module.html' },
    { name: 'Mozilla SSL Configuration Generator Guidelines', url: 'https://ssl-config.mozilla.org/' },
  ],
  'caddyfile-production-generator': [
    { name: 'Caddyfile Documentation', url: 'https://caddyserver.com/docs/caddyfile' },
    { name: 'Caddy Automatic HTTPS', url: 'https://caddyserver.com/docs/automatic-https' },
  ],
  'prometheus-recording-rules-generator': [
    { name: 'Prometheus Recording Rules', url: 'https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/' },
    { name: 'Prometheus Alerting Rules', url: 'https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/' },
  ],
  'tailwind-v4-mesh-gradient-generator': [
    { name: 'Tailwind CSS Background Image', url: 'https://tailwindcss.com/docs/background-image' },
    { name: 'MDN CSS radial-gradient()', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient' },
  ],
  'css-isometric-grid-generator': [
    { name: 'MDN CSS transform Property', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/transform' },
    { name: 'W3C CSS Transforms Module Level 2', url: 'https://www.w3.org/TR/css-transforms-2/' },
  ],
  'css-ribbon-banner-generator': [
    { name: 'MDN CSS position Property', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/position' },
    { name: 'MDN CSS transform: rotate()', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate' },
  ],
  'svg-wavy-divider-generator': [
    { name: 'W3C SVG 2 Paths (Cubic Bézier)', url: 'https://www.w3.org/TR/SVG2/paths.html#PathDataCubicBezierCommands' },
    { name: 'MDN SVG path Element', url: 'https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path' },
  ],
  'opengraph-banner-canvas-generator': [
    { name: 'The Open Graph Protocol', url: 'https://ogp.me/' },
    { name: 'X (Twitter) Cards Markup', url: 'https://developer.x.com/en/docs/twitter-for-websites/cards/overview/markup' },
    { name: 'MDN Canvas API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API' },
  ],
  'prisma-seed-generator': [
    { name: 'Prisma Seeding Your Database', url: 'https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding' },
    { name: 'Prisma Client API Reference', url: 'https://www.prisma.io/docs/orm/reference/prisma-client-reference' },
  ],
  'faker-js-mock-schema-generator': [
    { name: 'Faker.js Getting Started', url: 'https://fakerjs.dev/guide/' },
    { name: 'Faker.js API Reference', url: 'https://fakerjs.dev/api/' },
  ],
  'llm-few-shot-prompt-formatter': [
    { name: 'Anthropic Multishot Prompting', url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/multishot-prompting' },
    { name: 'OpenAI Prompt Engineering Guide', url: 'https://platform.openai.com/docs/guides/prompt-engineering' },
  ],
  'cot-chain-of-thought-prompt-builder': [
    { name: 'Anthropic Chain of Thought Prompting', url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/chain-of-thought' },
    { name: 'OpenAI Reasoning Best Practices', url: 'https://platform.openai.com/docs/guides/reasoning-best-practices' },
  ],
  'sql-stored-procedure-generator': [
    { name: 'PostgreSQL CREATE PROCEDURE', url: 'https://www.postgresql.org/docs/current/sql-createprocedure.html' },
    { name: 'PostgreSQL CREATE TRIGGER', url: 'https://www.postgresql.org/docs/current/sql-createtrigger.html' },
    { name: 'MySQL Stored Programs & Triggers', url: 'https://dev.mysql.com/doc/refman/8.4/en/stored-programs-views.html' },
  ],
  'redis-lua-script-generator': [
    { name: 'Redis Lua Programmability', url: 'https://redis.io/docs/latest/develop/interact/programmability/eval-intro/' },
    { name: 'Redis EVAL Command Reference', url: 'https://redis.io/docs/latest/commands/eval/' },
  ],
  'crontab-randomized-generator': [
    { name: 'POSIX crontab Specification', url: 'https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html' },
    { name: 'Linux sleep(1) & shuf(1) / Cron Jitter', url: 'https://man7.org/linux/man-pages/man5/crontab.5.html' },
  ],
  'ansible-playbook-scaffolder': [
    { name: 'Ansible Playbooks Intro', url: 'https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_intro.html' },
    { name: 'Ansible YAML Syntax', url: 'https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html' },
  ],
  'terraform-module-scaffolder': [
    { name: 'Terraform Creating Modules', url: 'https://developer.hashicorp.com/terraform/language/modules/develop' },
    { name: 'Terraform Standard Module Structure', url: 'https://developer.hashicorp.com/terraform/language/modules/develop/structure' },
  ],
  'http-cache-control-tester': [
    { name: 'RFC 9111 HTTP Caching', url: 'https://www.rfc-editor.org/rfc/rfc9111.html' },
    { name: 'MDN Cache-Control Header', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control' },
  ],
  'dns-soa-dnssec-inspector': [
    { name: 'RFC 1912 DNS SOA Serial Format', url: 'https://www.rfc-editor.org/rfc/rfc1912.html' },
    { name: 'RFC 4033 DNS Security Introduction (DNSSEC)', url: 'https://www.rfc-editor.org/rfc/rfc4033.html' },
  ],
  'ip-supernetting-calculator': [
    { name: 'RFC 4632 CIDR Route Aggregation', url: 'https://www.rfc-editor.org/rfc/rfc4632.html' },
    { name: 'RFC 1519 Classless Inter-Domain Routing', url: 'https://www.rfc-editor.org/rfc/rfc1519.html' },
  ],
  'opengraph-tag-inspector': [
    { name: 'The Open Graph Protocol', url: 'https://ogp.me/' },
    { name: 'X (Twitter) Cards Markup Reference', url: 'https://developer.x.com/en/docs/twitter-for-websites/cards/overview/markup' },
  ],
  'jwt-expiry-calculator': [
    { name: 'RFC 7519 Section 4.1.4 exp Claim', url: 'https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.4' },
    { name: 'MDN JavaScript Date', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date' },
  ],
  'regex-benchmark-simulator': [
    { name: 'OWASP Regular Expression Denial of Service (ReDoS)', url: 'https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS' },
    { name: 'MDN Regular Expressions Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions' },
  ],
  'llm-context-window-shrinker': [
    { name: 'Anthropic Token Counting & Context Windows', url: 'https://platform.claude.com/docs/en/build-with-claude/token-counting' },
    { name: 'OpenAI Context Window & Models', url: 'https://platform.openai.com/docs/models' },
  ],
  'embedding-token-cost-estimator': [
    { name: 'OpenAI Embeddings Pricing & Models', url: 'https://platform.openai.com/docs/guides/embeddings' },
    { name: 'Voyage AI Embeddings Documentation', url: 'https://docs.voyageai.com/docs/embeddings' },
  ],
  'webhook-payload-simulator': [
    { name: 'Stripe Webhook Events', url: 'https://docs.stripe.com/webhooks' },
    { name: 'GitHub Webhook Events & Payloads', url: 'https://docs.github.com/en/webhooks/webhook-events-and-payloads' },
    { name: 'Slack Incoming Webhooks', url: 'https://api.slack.com/messaging/webhooks' },
  ],
  'network-port-reference': [
    { name: 'IANA Service Name and Port Number Registry', url: 'https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml' },
    { name: 'RFC 6335 IANA Port Assignment Procedures', url: 'https://www.rfc-editor.org/rfc/rfc6335.html' },
  ],
  'ssl-tls-handshake-simulator': [
    { name: 'RFC 8446 The Transport Layer Security (TLS) 1.3', url: 'https://www.rfc-editor.org/rfc/rfc8446.html' },
    { name: 'RFC 5246 TLS Protocol Version 1.2', url: 'https://www.rfc-editor.org/rfc/rfc5246.html' },
  ],
  'http2-http3-frame-inspector': [
    { name: 'RFC 9113 HTTP/2 Specification', url: 'https://www.rfc-editor.org/rfc/rfc9113.html' },
    { name: 'RFC 9114 HTTP/3 Specification', url: 'https://www.rfc-editor.org/rfc/rfc9114.html' },
    { name: 'RFC 9000 QUIC Transport Protocol', url: 'https://www.rfc-editor.org/rfc/rfc9000.html' },
  ],
  'dns-spf-record-flattener': [
    { name: 'RFC 7208 Sender Policy Framework (SPF)', url: 'https://www.rfc-editor.org/rfc/rfc7208.html' },
    { name: 'RFC 7208 Section 4.6.4 DNS Lookup Limit', url: 'https://www.rfc-editor.org/rfc/rfc7208.html#section-4.6.4' },
  ],
  'mime-type-extension-lookup': [
    { name: 'IANA Media Types Registry', url: 'https://www.iana.org/assignments/media-types/media-types.xhtml' },
    { name: 'RFC 6838 Media Type Specifications', url: 'https://www.rfc-editor.org/rfc/rfc6838.html' },
    { name: 'MDN MIME Types Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/MIME_types/Common_types' },
  ],
  'color-blindness-simulator': [
    { name: 'W3C WCAG 2.1 Use of Color', url: 'https://www.w3.org/TR/WCAG21/#use-of-color' },
    { name: 'MDN Color Contrast & Vision Accessibility', url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast' },
  ],
  'contrast-ratio-apca-calculator': [
    { name: 'W3C WCAG 2.1 Contrast (Enhanced AAA)', url: 'https://www.w3.org/TR/WCAG21/#contrast-enhanced' },
    { name: 'W3C WCAG 3.0 Visual Contrast (APCA Draft)', url: 'https://www.w3.org/TR/wcag-3.0/' },
    { name: 'MDN WCAG Color Contrast', url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast' },
  ],
  'viewport-size-tester': [
    { name: 'Tailwind CSS Responsive Design Breakpoints', url: 'https://tailwindcss.com/docs/responsive-design' },
    { name: 'MDN Viewport Meta Tag', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag' },
  ],
  'unicode-glyph-category-inspector': [
    { name: 'Unicode Standard General Category Values', url: 'https://www.unicode.org/reports/tr44/#General_Category_Values' },
    { name: 'MDN String.prototype.codePointAt', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt' },
  ],
  'seo-robots-noindex-simulator': [
    { name: 'RFC 9309 Robots Exclusion Protocol', url: 'https://www.rfc-editor.org/rfc/rfc9309.html' },
    { name: 'Google Search Robots Meta Tag & X-Robots-Tag', url: 'https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag' },
  ],
  'cors-preflight-inspector': [
    { name: 'WHATWG Fetch Standard: CORS Protocol', url: 'https://fetch.spec.whatwg.org/#http-cors-protocol' },
    { name: 'MDN Cross-Origin Resource Sharing (CORS)', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS' },
  ],
  'css-selector-speed-profiler': [
    { name: 'W3C Selectors Level 4 Specification', url: 'https://www.w3.org/TR/selectors-4/' },
    { name: 'MDN CSS Specificity', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity' },
  ],
  'git-conflict-marker-cleaner': [
    { name: 'Git git-merge Conflict Presentation', url: 'https://git-scm.com/docs/git-merge#_how_conflicts_are_presented' },
    { name: 'Git Tools: Advanced Merging', url: 'https://git-scm.com/book/en/v2/Git-Tools-Advanced-Merging' },
  ],
  'semver-range-evaluator': [
    { name: 'Semantic Versioning 2.0.0', url: 'https://semver.org/' },
    { name: 'npm SemVer Calculator & Ranges', url: 'https://github.com/npm/node-semver#ranges' },
  ],
  'package-json-license-checker': [
    { name: 'SPDX License List', url: 'https://spdx.org/licenses/' },
    { name: 'npm package.json license Field', url: 'https://docs.npmjs.com/cli/v10/configuring-npm/package-json#license' },
  ],
  'api-rate-limit-cost-calculator': [
    { name: 'IETF RateLimit Header Fields for HTTP', url: 'https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/' },
    { name: 'RFC 6585 Additional HTTP Status Codes (429)', url: 'https://www.rfc-editor.org/rfc/rfc6585.html' },
  ],
  'blake3-hash-generator': [
    { name: 'BLAKE3 Cryptographic Hash Specification', url: 'https://github.com/BLAKE3-team/BLAKE3-specs/blob/master/blake3.pdf' },
    { name: 'BLAKE3 Official Repository', url: 'https://github.com/BLAKE3-team/BLAKE3' },
  ],
  'pbkdf2-key-derivation': [
    { name: 'RFC 8018 PKCS #5 PBKDF2', url: 'https://www.rfc-editor.org/rfc/rfc8018.html' },
    { name: 'NIST SP 800-132 Password-Based Key Derivation', url: 'https://csrc.nist.gov/pubs/sp/800/132/final' },
    { name: 'MDN SubtleCrypto.deriveBits', url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveBits' },
  ],
  'hmac-sha384-sha512-calculator': [
    { name: 'RFC 4231 HMAC-SHA-224/256/384/512', url: 'https://www.rfc-editor.org/rfc/rfc4231.html' },
    { name: 'RFC 2104 HMAC Specification', url: 'https://www.rfc-editor.org/rfc/rfc2104.html' },
    { name: 'MDN SubtleCrypto.sign', url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign' },
  ],
  'ethereum-eip191-signature-verifier': [
    { name: 'Ethereum EIP-191 Signed Data Standard', url: 'https://eips.ethereum.org/EIPS/eip-191' },
    { name: 'Ethereum JSON-RPC personal_sign', url: 'https://ethereum.org/en/developers/docs/apis/json-rpc/' },
  ],
  'bitcoin-bech32-address-encoder': [
    { name: 'Bitcoin BIP-0173 Bech32 Specification', url: 'https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki' },
    { name: 'Bitcoin BIP-0350 Bech32m Specification', url: 'https://github.com/bitcoin/bips/blob/master/bip-0350.mediawiki' },
  ],
  'rsa-pkcs1-pkcs8-converter': [
    { name: 'RFC 8017 PKCS #1 RSA Cryptography', url: 'https://www.rfc-editor.org/rfc/rfc8017.html' },
    { name: 'RFC 5958 Asymmetric Key Packages (PKCS #8)', url: 'https://www.rfc-editor.org/rfc/rfc5958.html' },
    { name: 'RFC 7468 PEM Textual Encodings', url: 'https://www.rfc-editor.org/rfc/rfc7468.html' },
  ],
  'x509-san-csr-builder': [
    { name: 'RFC 2986 PKCS #10 CSR Syntax', url: 'https://www.rfc-editor.org/rfc/rfc2986.html' },
    { name: 'RFC 5280 Subject Alternative Name Extension', url: 'https://www.rfc-editor.org/rfc/rfc5280.html#section-4.2.1.6' },
    { name: 'OpenSSL req Manual', url: 'https://docs.openssl.org/master/man1/openssl-req/' },
  ],
  'ed25519-sign-verify': [
    { name: 'RFC 8032 EdDSA (Ed25519)', url: 'https://www.rfc-editor.org/rfc/rfc8032.html' },
    { name: 'MDN SubtleCrypto.verify', url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/verify' },
  ],
  'argon2-parameter-tuner': [
    { name: 'RFC 9106 Argon2 Memory-Hard Function', url: 'https://www.rfc-editor.org/rfc/rfc9106.html' },
    { name: 'OWASP Password Storage Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html' },
  ],
  'uuid-v7-timestamp-extractor': [
    { name: 'RFC 9562 Section 5.7 UUIDv7 Layout', url: 'https://www.rfc-editor.org/rfc/rfc9562.html#section-5.7' },
    { name: 'MDN JavaScript Date', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date' },
  ],
  'ethereum-abi-storage-slot-calculator': [
    { name: 'Solidity Layout of State Variables in Storage', url: 'https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html' },
    { name: 'Ethereum EVM Opcodes (SLOAD / SSTORE)', url: 'https://ethereum.org/en/developers/docs/evm/opcodes/' },
  ],
  'base64-pem-certificate-parser': [
    { name: 'RFC 5280 X.509 PKI Certificate', url: 'https://www.rfc-editor.org/rfc/rfc5280.html' },
    { name: 'RFC 7468 PEM Textual Encodings', url: 'https://www.rfc-editor.org/rfc/rfc7468.html' },
  ],
  'crockford-base32-encoder': [
    { name: 'Crockford Base32 Encoding Specification', url: 'https://www.crockford.com/base32.html' },
    { name: 'RFC 4648 Base32 Encoding', url: 'https://www.rfc-editor.org/rfc/rfc4648.html#section-6' },
  ],
  'bcd-binary-coded-decimal-converter': [
    { name: 'IEEE 754 Decimal Floating-Point / BCD', url: 'https://ieeexplore.ieee.org/document/8766229' },
    { name: 'MDN Bitwise Operators', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_AND' },
  ],
  'ieee754-hex-float-converter': [
    { name: 'IEEE 754-2019 Floating-Point Standard', url: 'https://ieeexplore.ieee.org/document/8766229' },
    { name: 'MDN DataView.prototype.getFloat32', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getFloat32' },
  ],
  'rot47-encoder-decoder': [
    { name: 'RFC 20 ASCII Printable Characters', url: 'https://www.rfc-editor.org/rfc/rfc20.html' },
    { name: 'MDN String.prototype.charCodeAt', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt' },
  ],
  'json-key-sorter': [
    { name: 'RFC 8785 JSON Canonicalization Scheme (JCS)', url: 'https://www.rfc-editor.org/rfc/rfc8785.html' },
    { name: 'RFC 8259 JSON Specification', url: 'https://www.rfc-editor.org/rfc/rfc8259.html' },
  ],
  'json-array-splitter-chunker': [
    { name: 'RFC 8259 Section 5 Arrays', url: 'https://www.rfc-editor.org/rfc/rfc8259.html#section-5' },
    { name: 'MDN Array.prototype.slice', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice' },
  ],
  'text-prefix-suffix-appender': [
    { name: 'MDN String.prototype.split', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split' },
    { name: 'GNU Coreutils sed Manual', url: 'https://www.gnu.org/software/sed/manual/sed.html' },
  ],
  'text-duplicate-line-counter': [
    { name: 'GNU Coreutils uniq Manual', url: 'https://www.gnu.org/software/coreutils/manual/html_node/uniq-invocation.html' },
    { name: 'MDN JavaScript Map Object', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map' },
  ],
  'text-column-tabular-splitter': [
    { name: 'RFC 4180 CSV Format', url: 'https://www.rfc-editor.org/rfc/rfc4180.html' },
    { name: 'GNU Coreutils cut Manual', url: 'https://www.gnu.org/software/coreutils/manual/html_node/cut-invocation.html' },
  ],
};

export function getToolSources(slug: string): ToolSource[] {
  return toolSources[slug] || [];
}
