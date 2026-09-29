import { findCatalogTool, type Tool, type ToolSlug } from '@/lib/api';
import { collectionCopy } from '@/lib/collectionCopy';
import type { Language } from '@/lib/i18nRouting';

export interface ToolCollectionWorkflowStep {
  toolSlug: ToolSlug;
  title: string;
  description: string;
}

export interface ToolCollection {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  /** Short one-sentence lead shown in the page hero (EN) or the 60–100 word localized intro. */
  intro: string;
  /**
   * Long-form English introduction (150–250 words split into paragraphs). Only present on the
   * English collection; `getLocalizedCollection` removes it for other locales, which use `intro`.
   */
  introParagraphs?: readonly string[];
  searchIntents: readonly string[];
  toolSlugs: readonly ToolSlug[];
  /** English, ordered workflow. Removed by `getLocalizedCollection` for non-English locales. */
  workflowSteps?: readonly ToolCollectionWorkflowStep[];
}

export const toolCollections = [
  {
    slug: 'api-debugging',
    title: 'API Debugging & Request Conversion Tools',
    shortTitle: 'API Debugging',
    description:
      'Debug API requests, convert cURL and Postman collections, inspect HAR files, validate OpenAPI specs, and test WebSocket and SSE endpoints in your browser.',
    intro:
      'Use this collection when you are reproducing an API call, moving a request between tools, preparing a load test, or checking a real-time endpoint.',
    introParagraphs: [
      'Most API bugs are reported as a single failing request: a cURL command pasted into a ticket, a HAR export from a browser session, or a Postman collection shared by another team. This collection keeps those formats interchangeable, so you can reproduce the call once and then move it wherever the investigation needs to go. Build or clean up the request with the cURL builder, turn it into a Postman collection or a HAR 1.2 file, and export Postman requests back to cURL when you need a terminal-friendly reproduction.',
      'When the problem is the contract rather than a single call, convert a Postman collection to OpenAPI or an OpenAPI document to Postman, then run the OpenAPI validator before sharing the spec. The HAR viewer shows timings, headers, and payloads from recorded browser traffic, and the HAR to k6 converter turns that same recording into a starting load-test script. For real-time endpoints, the WebSocket and Server-Sent Events testers let you watch messages as they arrive, while the mock response generator and raw HTTP wire-format converter help you isolate whether the client or the server is at fault.',
    ],
    searchIntents: ['curl to postman', 'api debugging tools', 'har to k6', 'postman to openapi'],
    toolSlugs: [
      'curl-builder',
      'curl-to-postman',
      'curl-to-har',
      'har-viewer',
      'har-to-k6',
      'postman-to-openapi',
      'openapi-to-postman',
      'openapi-validator',
      'postman-to-curl',
      'postman-collection-to-curl',
      'websocket-tester',
      'sse-stream-tester',
      'api-mock-response-generator',
      'http-wire-format',
    ],
    workflowSteps: [
      {
        toolSlug: 'curl-builder',
        title: 'Reproduce the failing request',
        description: 'Rebuild the call with its method, headers, and body so you have one clean, shareable reproduction. Remove real tokens before sharing it.',
      },
      {
        toolSlug: 'curl-to-postman',
        title: 'Move it into a shared collection',
        description: 'Convert the cURL command into a Postman v2.1 collection so teammates can run the same request with their own environment variables.',
      },
      {
        toolSlug: 'postman-to-openapi',
        title: 'Draft the contract',
        description: 'Generate an OpenAPI document from the collection, then add schemas, error responses, and descriptions that example requests cannot reveal.',
      },
      {
        toolSlug: 'openapi-validator',
        title: 'Validate the specification',
        description: 'Check the OpenAPI file for structural errors before publishing it or generating clients from it.',
      },
      {
        toolSlug: 'har-to-k6',
        title: 'Turn traffic into a load test',
        description: 'Convert a recorded HAR session into a k6 script and review think times, dynamic IDs, and authentication before running it against any environment.',
      },
    ],
  },
  {
    slug: 'jwt-authentication',
    title: 'JWT & Authentication Developer Tools',
    shortTitle: 'JWT & Auth',
    description:
      'Decode and verify JWTs, check token expiry, build test tokens, generate PKCE values and TOTP codes, and troubleshoot OAuth and OIDC flows locally in your browser.',
    intro:
      'Use these tools while debugging OAuth, OIDC, bearer tokens, PKCE, JWT expiry, claims, or signature validation problems.',
    introParagraphs: [
      'Authentication failures are hard to debug because the evidence is encoded: a bearer token is three Base64URL segments, a PKCE challenge is a hashed verifier, and a one-time code depends on a shared secret and the current time. The tools in this collection decode those values locally in your browser, so you can inspect a token from a failing request without pasting it into a third-party service. Start with the JWT decoder to read the header and claims, then use the expiry calculator to see whether exp, iat, and nbf explain a rejected request.',
      'If the claims look right, the signature validator checks whether the token was signed with the key or secret you expect, a common failure after key rotation or when environments share a misconfigured issuer. The JWT generator and payload builder create test tokens with specific claims and lifetimes for local development. For OAuth 2.0 and OpenID Connect flows, the PKCE generator produces a code verifier and S256 challenge pair, the Base64URL encoder helps inspect individual segments, and the TOTP generator reproduces RFC 6238 codes when testing two-factor login. Treat decoded tokens as sensitive and never share production credentials.',
    ],
    searchIntents: ['jwt decoder online', 'jwt signature validator', 'pkce generator', 'jwt invalid'],
    toolSlugs: [
      'jwt-decoder',
      'jwt-signature-validator',
      'jwt-expiry-calculator',
      'jwt-generator',
      'jwt-builder',
      'pkce-generator',
      'base64url-encoder',
      'totp-generator',
    ],
    workflowSteps: [
      {
        toolSlug: 'jwt-decoder',
        title: 'Decode the token',
        description: 'Paste the token from the failing request and read the header algorithm, issuer, audience, and custom claims.',
      },
      {
        toolSlug: 'jwt-expiry-calculator',
        title: 'Check the token lifetime',
        description: 'Compare exp, iat, and nbf with the current time to rule out expiry and clock-skew problems.',
      },
      {
        toolSlug: 'jwt-signature-validator',
        title: 'Verify the signature',
        description: 'Validate the signature with the expected secret or public key; a mismatch usually points to the wrong key, algorithm, or issuer.',
      },
      {
        toolSlug: 'pkce-generator',
        title: 'Retest the authorization flow',
        description: 'Generate a fresh code verifier and S256 challenge to step through an OAuth 2.0 authorization-code flow with PKCE.',
      },
    ],
  },
  {
    slug: 'json-development',
    title: 'JSON Development & Schema Tools',
    shortTitle: 'JSON Development',
    description:
      'Format and validate JSON, infer JSON Schema, check documents against schemas, and generate TypeScript, C#, Zod, and SQL from the same sample payload.',
    intro:
      'Start with raw JSON, clean or validate it, then pass the same data into model, schema, database, or type-generation tools without rebuilding the input.',
    introParagraphs: [
      'JSON is usually the first artifact you receive from an API, a webhook, or an export job, and most downstream work, from types to validation to database inserts, starts from a single sample. This collection is built around that sample. Paste a response into the JSON formatter or validator to catch syntax errors, trailing commas, and encoding problems before anything else reads it. Once the payload is valid, the same input can move into the other tools without being retyped.',
      'From a clean sample you can generate TypeScript interfaces or C# classes for application code, infer a JSON Schema draft, or create a Zod schema that validates the data at runtime. The JSON Schema validator checks real documents against a schema, which is the step that catches what a single sample cannot show: optional properties, enums, and null values. If your contract already exists as JSON Schema, the schema-to-Zod converter produces matching runtime validators, and the Zod-to-TypeScript tool derives static types from them. The JSON to SQL converter turns an array of objects into rows for seeding or analysis. Always review generated output against the real API contract.',
    ],
    searchIntents: ['json formatter online', 'json to typescript', 'json to c#', 'json schema to zod'],
    toolSlugs: [
      'json-formatter',
      'json-validator',
      'json-schema-validator',
      'json-to-typescript',
      'json-to-csharp',
      'json-to-json-schema',
      'json-to-zod',
      'json-schema-to-zod',
      'zod-to-typescript-type',
      'json-to-sql',
    ],
    workflowSteps: [
      {
        toolSlug: 'json-formatter',
        title: 'Validate the source payload',
        description: 'Paste a representative JSON response and fix syntax errors before generating types. Keep the original payload so you can compare later output.',
      },
      {
        toolSlug: 'json-to-typescript',
        title: 'Generate a starting TypeScript type',
        description: 'Convert the valid sample into an interface, then review optional fields and value ranges against the real API contract.',
      },
      {
        toolSlug: 'json-to-json-schema',
        title: 'Create a validation draft',
        description: 'Derive a JSON Schema from the sample and add business rules manually; one example cannot reveal every valid input.',
      },
      {
        toolSlug: 'json-schema-validator',
        title: 'Test real documents against the schema',
        description: 'Validate several real responses, including error and empty cases, before relying on the schema in CI or runtime validation.',
      },
    ],
  },
  {
    slug: 'docker-kubernetes',
    title: 'Docker, Compose & Kubernetes Developer Tools',
    shortTitle: 'Docker & Kubernetes',
    description:
      'Generate and lint Dockerfiles, convert docker run commands to Compose, migrate Compose services to Kubernetes, and build Ingress, ConfigMap, and Helm resources.',
    intro:
      'Use this collection while containerizing an application, migrating Compose workloads, preparing Kubernetes manifests, or starting a Helm chart.',
    introParagraphs: [
      'Containerizing an application usually happens in stages: a Dockerfile for the image, a Compose file for local development, and Kubernetes manifests or a Helm chart for shared environments. Each stage uses a different format, and small mistakes carry forward. This collection covers the whole path. Generate a multi-stage Dockerfile, then run the Dockerfile linter to spot layer bloat, cache-busting instruction order, and security issues such as running as root. If a service still lives in a long docker run command, convert it to a Compose service, format the YAML, and extract its environment variables into a .env template.',
      'When the workload moves to Kubernetes, convert Compose services into Deployment and Service manifests, then add what Compose does not describe: an Ingress with TLS annotations, ConfigMaps and Secrets for configuration, and CPU and memory requests and limits sized with the pod resource calculator. The kubeconfig validator helps when cluster access itself is the problem. For teams packaging releases, the Helm chart generator scaffolds Chart.yaml and the values evaluator previews how template variables resolve. Generated manifests are a starting point; review probes, security contexts, and resource settings before applying them.',
    ],
    searchIntents: ['dockerfile generator', 'docker compose to kubernetes', 'kubernetes yaml generator', 'helm chart generator'],
    toolSlugs: [
      'dockerfile-generator',
      'dockerfile-ai-optimized-generator',
      'dockerfile-linter',
      'docker-run-to-compose',
      'docker-to-compose',
      'docker-compose-formatter',
      'docker-compose-env-generator',
      'docker-compose-to-k8s',
      'kubeconfig-validator',
      'kubernetes-deployment-generator',
      'kubernetes-configmap-secret-builder',
      'kubernetes-ingress-generator',
      'k8s-resource-calculator',
      'helm-chart-yaml-generator',
      'helm-values-evaluator',
    ],
    workflowSteps: [
      {
        toolSlug: 'dockerfile-ai-optimized-generator',
        title: 'Start with a multi-stage image',
        description: 'Generate a Dockerfile for your runtime that separates build dependencies from the final image.',
      },
      {
        toolSlug: 'dockerfile-linter',
        title: 'Lint the Dockerfile',
        description: 'Check instruction order, cache usage, pinned base images, and non-root users before building in CI.',
      },
      {
        toolSlug: 'docker-run-to-compose',
        title: 'Capture local services in Compose',
        description: 'Turn ad-hoc docker run commands into a docker-compose.yml service so ports, volumes, and environment variables are versioned.',
      },
      {
        toolSlug: 'docker-compose-to-k8s',
        title: 'Translate Compose to Kubernetes',
        description: 'Convert the Compose services into Deployment, Service, and ConfigMap manifests as a draft for the cluster.',
      },
      {
        toolSlug: 'k8s-resource-calculator',
        title: 'Set requests and limits',
        description: 'Size CPU and memory requests and limits and check which QoS class the pod will receive.',
      },
    ],
  },
  {
    slug: 'ai-llm',
    title: 'AI & LLM Developer Tools',
    shortTitle: 'AI & LLM',
    description:
      'Count tokens, estimate LLM and embedding costs, build function-calling and structured-output schemas, format prompts, and chunk documents for RAG pipelines.',
    intro:
      'Use these utilities while building prompt pipelines, function calling, retrieval systems, token budgets, and model-cost estimates.',
    introParagraphs: [
      'Building on large language models involves a handful of recurring engineering tasks that have little to do with the model itself: keeping prompts consistent, estimating how many tokens a request will use, defining the JSON shapes a model is allowed to return, and splitting documents into pieces that fit a retrieval pipeline. This collection gathers a starting tool for each of those tasks. The prompt template formatter keeps variables and instructions structured, while the token counter and pricing calculator show how prompt length translates into context usage and cost before you send traffic to an API.',
      'For applications that call functions or require machine-readable answers, the function schema builder and strict structured-outputs builder produce JSON Schema definitions the model must follow. Retrieval-augmented generation depends on chunking: the chunk splitter and RAG chunking calculator show how chunk size and overlap change the number of pieces, their boundaries, and the resulting embedding cost, which the embedding cost calculator estimates across models. If you fine-tune, the JSONL dataset validator checks message structure before upload. Prices and model limits change often, so confirm current figures with your provider.',
    ],
    searchIntents: ['llm token counter', 'embedding cost calculator', 'openai function schema', 'rag chunking tool'],
    toolSlugs: [
      'llm-token-counter',
      'llm-pricing-calculator',
      'embedding-cost-calculator',
      'openai-function-schema',
      'openai-structured-outputs',
      'prompt-template-formatter',
      'text-chunk-splitter',
      'rag-chunking-calculator',
      'jsonl-dataset-validator',
    ],
    workflowSteps: [
      {
        toolSlug: 'prompt-template-formatter',
        title: 'Structure the prompt',
        description: 'Separate fixed instructions from variables so the same template can be tested and versioned.',
      },
      {
        toolSlug: 'llm-token-counter',
        title: 'Measure token usage',
        description: 'Count tokens for a realistic prompt and response to check context limits before estimating cost.',
      },
      {
        toolSlug: 'openai-structured-outputs',
        title: 'Define the response shape',
        description: 'Write a strict JSON Schema for the output your code parses instead of relying on free-form text.',
      },
      {
        toolSlug: 'text-chunk-splitter',
        title: 'Prepare retrieval chunks',
        description: 'Split source documents with an overlap that keeps related sentences together, then review the chunk boundaries.',
      },
    ],
  },
  {
    slug: 'sql-database',
    title: 'SQL & Database Developer Tools',
    shortTitle: 'SQL & Database',
    description:
      'Format, minify, and explain SQL, analyze PostgreSQL plans and indexes, convert dialects, build connection strings, and generate DDL and INSERT statements from data.',
    intro:
      'Use this set when cleaning SQL, generating application models, preparing inserts, reviewing indexing, or configuring PostgreSQL connections.',
    introParagraphs: [
      'SQL work tends to alternate between reading queries someone else wrote and producing new statements from data you already have. This collection supports both directions. When a query arrives as one long line from an ORM log or a monitoring tool, the SQL formatter and keyword uppercaser make its joins and filters readable, and the SQL explainer describes each step of a SELECT in plain language. For PostgreSQL performance problems, paste EXPLAIN JSON output into the plan analyzer to find the expensive nodes, then use the index advisor to reason about which columns a new index should cover.',
      'Going the other way, you can turn JSON or CSV into CREATE TABLE and INSERT statements, convert a pasted list of IDs into an IN clause, generate stored procedure and trigger templates, or draft ClickHouse MergeTree tables. The PostgreSQL to MySQL converter handles common dialect and type differences during migrations, the connection builder assembles correctly escaped PostgreSQL URLs, and the byte counter checks whether UTF-8 strings fit VARCHAR limits. SQL to JSON and SQL to TypeScript close the loop back into application code. Run generated statements against a non-production database first.',
    ],
    searchIntents: ['sql formatter online', 'sql index advisor', 'json to sql', 'postgres connection string builder'],
    toolSlugs: [
      'sql-formatter',
      'sql-minifier',
      'sql-keyword-uppercaser',
      'sql-explainer',
      'postgres-explain-visualizer',
      'sql-index-advisor',
      'postgres-connection-builder',
      'postgres-to-mysql',
      'list-to-sql-in',
      'sql-stored-procedure-generator',
      'json-to-sql',
      'json-to-sql-ddl',
      'json-to-sql-insert',
      'csv-to-sql-insert',
      'sql-to-json',
      'clickhouse-ddl-generator',
      'sql-to-typescript',
      'string-byte-counter',
    ],
    workflowSteps: [
      {
        toolSlug: 'sql-formatter',
        title: 'Make the query readable',
        description: 'Format the captured SQL so joins, subqueries, and filters are easy to review.',
      },
      {
        toolSlug: 'sql-explainer',
        title: 'Understand what it does',
        description: 'Read the plain-language breakdown to confirm the query matches the intended logic before tuning it.',
      },
      {
        toolSlug: 'postgres-explain-visualizer',
        title: 'Find the expensive plan nodes',
        description: 'Run EXPLAIN (FORMAT JSON) on a safe environment and inspect sequential scans, row estimates, and costly joins.',
      },
      {
        toolSlug: 'sql-index-advisor',
        title: 'Evaluate index candidates',
        description: 'Consider indexes for the filtered and joined columns, then measure the plan again; every index also slows writes.',
      },
    ],
  },
  {
    slug: 'frontend-css',
    title: 'Frontend, HTML, CSS & React Developer Tools',
    shortTitle: 'Frontend & CSS',
    description:
      'Prototype HTML, CSS, and JavaScript, convert between HTML and JSX, compile SCSS, debug CSS specificity, and minify stylesheets for production frontend work.',
    intro:
      'Use this collection while styling interfaces, moving markup into React, debugging the cascade, or checking visual accessibility.',
    introParagraphs: [
      "Frontend work constantly moves code between contexts: a snippet from documentation into a React component, a design tool's CSS into a stylesheet, or a legacy SCSS file into plain CSS. This collection focuses on those handoffs. Use the live playground to try HTML, CSS, and JavaScript in isolation before touching your project, and the HTML formatter to make copied markup readable. The HTML to JSX converter renames attributes such as class and for, closes void elements, and converts inline styles, while JSX to HTML reverses the process for static pages or emails. SVG markup can become a React component in one step.",
      'For styling, the grid, flexbox, gradient, and clamp generators produce standard CSS you can paste directly, and the SCSS converters move stylesheets between nested and flat syntax. When a rule does not apply, the specificity calculator and selector profiler explain which selector wins the cascade and why. The CSS and Tailwind converters help during framework migrations, the contrast checker verifies text legibility against WCAG thresholds, the keycode inspector shows the event.key and event.code values your handlers receive, and the React Hook Form generator scaffolds validated forms. Minify CSS as the final step before shipping.',
    ],
    searchIntents: ['css developer tools', 'html to jsx', 'css specificity calculator', 'scss to css'],
    toolSlugs: [
      'code-playground',
      'html-formatter',
      'html-to-jsx',
      'jsx-to-html',
      'svg-to-jsx',
      'react-hook-form-generator',
      'key-code-info',
      'css-gradient',
      'css-grid-generator',
      'css-flexbox-generator',
      'css-clamp',
      'css-to-scss',
      'scss-to-css',
      'css-specificity-calculator',
      'css-selector-speed-profiler',
      'css-minifier',
      'css-to-tailwind',
      'tailwind-to-css',
      'color-contrast-checker',
    ],
    workflowSteps: [
      {
        toolSlug: 'code-playground',
        title: 'Prototype in isolation',
        description: 'Reproduce the markup and styles in the live sandbox to confirm the behavior without your build tooling.',
      },
      {
        toolSlug: 'css-specificity-calculator',
        title: 'Debug the cascade',
        description: 'Compare selector specificity to see why one rule overrides another before reaching for !important.',
      },
      {
        toolSlug: 'html-to-jsx',
        title: 'Move markup into React',
        description: 'Convert the working HTML into JSX with className, self-closing tags, and style objects.',
      },
      {
        toolSlug: 'css-minifier',
        title: 'Minify for production',
        description: 'Minify the final stylesheet and compare byte size; keep the readable source under version control.',
      },
    ],
  },
  {
    slug: 'encoding-conversion',
    title: 'Encoding & Data Representation Tools',
    shortTitle: 'Encoding',
    description:
      'Encode and decode Base64, Base64URL, Base32, Base58, hex, URLs, HTML entities, Unicode escapes, Punycode, Quoted-Printable, and image data URIs in the browser.',
    intro:
      'Use these tools when moving data between transport-safe encodings, debugging escaped content, or inspecting encoded values.',
    introParagraphs: [
      'Encoding problems show up as garbled text, broken URLs, or tokens that fail to parse, and the cause is usually a value that was encoded for one transport and decoded for another. This collection groups the common representations side by side so you can check exactly what a value contains. Base64 and URL-safe Base64URL differ in alphabet and padding, which matters for JWT segments and signed URLs. Base32 appears in TOTP secrets, Crockford Base32 in human-readable identifiers, Base58 in Bitcoin and Solana addresses, and hex in digests and binary dumps; the hex to Base64 converter moves bytes between the last two.',
      'Text-oriented encodings have their own traps. URL encoding differs between query strings and paths, HTML entities protect markup, Unicode escape sequences appear in logs and source code, and JSON string escaping also covers quotes, newlines, and backslashes. Punycode converts internationalized domain names to their xn-- form, and Quoted-Printable is still used in MIME email bodies. You can also turn images into Base64 data URIs and back, and experiment with ROT47 and Morse code. Remember that encoding is not encryption: anyone can reverse these transformations.',
    ],
    searchIntents: ['base64 encoder decoder', 'url encoder online', 'hex encoder', 'unicode escape tool'],
    toolSlugs: [
      'base64',
      'base64url-encoder',
      'url-encoder',
      'base32-encoder',
      'crockford-base32-encoder',
      'base58-encoder',
      'hex-encoder',
      'hex-to-base64',
      'binary-encoder',
      'unicode-escape',
      'json-string-escape',
      'html-entity',
      'punycode-converter',
      'punycode-idn-converter',
      'quoted-printable-encoder',
      'image-to-base64',
      'base64-to-image',
      'rot47-encoder-decoder',
      'morse-code-audio-converter',
      'morse-code-converter',
    ],
    workflowSteps: [
      {
        toolSlug: 'base64url-encoder',
        title: 'Identify the transport encoding',
        description: 'Use Base64URL for URL-safe values such as token segments; ordinary Base64 and Base64URL have different alphabets and padding conventions.',
      },
      {
        toolSlug: 'unicode-escape',
        title: 'Inspect hexadecimal escapes',
        description: 'Decode values such as \\u0041 or \\u{1F600} to inspect characters in logs or source text.',
      },
      {
        toolSlug: 'json-string-escape',
        title: 'Handle complete JSON string fragments',
        description: 'Use the JSON-specific tool when the input also contains escaped quotes, newlines, or backslashes; Unicode replacement alone is not a JSON parser.',
      },
      {
        toolSlug: 'html-entity',
        title: 'Check markup escaping',
        description: 'Encode or decode named and numeric HTML entities when text is displayed inside HTML and characters appear double-escaped.',
      },
    ],
  },
  {
    slug: 'security-crypto',
    title: 'Security, Crypto & Certificate Developer Tools',
    shortTitle: 'Security & Crypto',
    description:
      'Inspect certificates, generate hashes and HMACs, hash passwords with bcrypt, test AES-GCM, and evaluate CSP and security headers for web application security work.',
    intro:
      'Use this collection for application-security checks, certificate troubleshooting, password hashing, signature verification, and CSP work.',
    introParagraphs: [
      'Application security reviews often come down to a handful of concrete checks: is this file what it claims to be, is this password stored correctly, is this certificate valid for the domain, and does the browser actually enforce the policies we think we configured. This collection gives you a starting tool for each question. SHA-256 and MD5 hashing verify file integrity, with the important caveat that MD5 only detects accidental changes, while the HMAC generator adds a shared secret so the receiver can also authenticate the sender. Subresource Integrity hashes pin the exact CDN scripts a page may load.',
      'For credentials, the password strength analyzer estimates how guessable a password is, and the bcrypt generator produces slow, salted hashes suitable for storage. The AES playground lets you experiment with AES-GCM keys and parameters, and the RSA key pair generator creates keys for testing. Certificate problems can be inspected with the certificate decoder and SSL certificate inspector, which show subjects, SANs, issuers, and validity dates. On the browser side, build a Content Security Policy, evaluate it for gaps, and analyze response headers such as HSTS and X-Content-Type-Options. Use generated keys for testing, not production.',
    ],
    searchIntents: ['sha256 file checksum', 'md5 checksum', 'certificate inspector', 'hmac generator'],
    toolSlugs: [
      'sha256-hash',
      'md5-hash',
      'hmac-generator',
      'subresource-integrity-generator',
      'password-strength-analyzer',
      'bcrypt-generator',
      'aes-crypto-playground',
      'rsa-key-pair-generator',
      'certificate-decoder',
      'ssl-certificate-inspector',
      'csp-builder',
      'csp-evaluator',
      'http-security-headers-analyzer',
    ],
    workflowSteps: [
      {
        toolSlug: 'sha256-hash',
        title: 'Verify a downloaded file',
        description: 'Hash the exact file bytes and compare the SHA-256 digest with a checksum obtained from a trusted, independent source.',
      },
      {
        toolSlug: 'md5-hash',
        title: 'Check a legacy MD5 value',
        description: 'Use MD5 only for accidental-error checks in older workflows. A matching MD5 digest does not prove a file was not deliberately replaced.',
      },
      {
        toolSlug: 'hmac-generator',
        title: 'Authenticate a message when needed',
        description: 'When the sender and message must be authenticated, use a keyed HMAC with a securely shared secret instead of an unkeyed checksum.',
      },
      {
        toolSlug: 'csp-evaluator',
        title: 'Review browser-side policy',
        description: 'Evaluate the Content Security Policy for unsafe sources and missing directives before relying on it to limit script injection.',
      },
    ],
  },
  {
    slug: 'web-seo',
    title: 'Web SEO, Metadata & Structured Data Tools',
    shortTitle: 'Web SEO',
    description:
      'Generate meta tags, Open Graph cards, schema.org JSON-LD, robots.txt, sitemaps, favicons, clean slugs, and UTM links, and simulate indexing directives before launch.',
    intro:
      'Use this collection while preparing pages for search engines and social previews or diagnosing metadata and indexing problems.',
    introParagraphs: [
      'Search and social platforms read a page through a small set of machine-readable signals: the title and meta description, canonical and robots directives, Open Graph and Twitter card tags, structured data, and the sitemap that lists what should be crawled. This collection helps you produce and check each of them. Generate standard meta tags or Next.js metadata objects, create Open Graph tags and preview how a shared link will render, and inspect the tags an existing page already exposes. The schema.org generator outputs JSON-LD for common types such as articles, products, and FAQs.',
      'Crawl control is where small mistakes have the largest impact. Build robots.txt rules and XML sitemaps, then use the indexing simulator to see how robots.txt, meta robots, and X-Robots-Tag directives combine; for example, a page blocked in robots.txt cannot be crawled, so a noindex tag on it will not be seen. The slug generator produces clean, readable URL paths, the favicon generator outputs icon sizes and link tags, and the UTM builder tags campaign links consistently. None of these tools guarantees rankings; they help ensure search engines receive the signals you intended.',
    ],
    searchIntents: ['seo developer tools', 'meta tag generator', 'schema org generator', 'robots txt generator'],
    toolSlugs: [
      'meta-tags',
      'nextjs-metadata-generator',
      'open-graph-previewer',
      'opengraph-banner-canvas-generator',
      'opengraph-tag-inspector',
      'schema-org-generator',
      'robots-txt-generator',
      'sitemap-generator',
      'seo-robots-noindex-simulator',
      'slug-generator',
      'favicon-generator',
      'url-utm-builder',
    ],
    workflowSteps: [
      {
        toolSlug: 'meta-tags',
        title: 'Write titles and descriptions',
        description: 'Generate the title, meta description, and canonical tag for each important page.',
      },
      {
        toolSlug: 'schema-org-generator',
        title: 'Add structured data',
        description: 'Create JSON-LD that describes what is actually visible on the page, such as an article or product.',
      },
      {
        toolSlug: 'robots-txt-generator',
        title: 'Define crawl rules',
        description: 'Allow or disallow paths and reference your sitemap location.',
      },
      {
        toolSlug: 'sitemap-generator',
        title: 'List indexable URLs',
        description: 'Generate an XML sitemap that contains only canonical, indexable pages.',
      },
      {
        toolSlug: 'seo-robots-noindex-simulator',
        title: 'Check directive conflicts',
        description: 'Simulate how robots.txt, meta robots, and X-Robots-Tag rules interact for a URL before deploying.',
      },
    ],
  },
  {
    slug: 'text-content',
    title: 'Text, Markdown & Content Developer Tools',
    shortTitle: 'Text & Content',
    description:
      'Compare text, count words, change case, sort and deduplicate lines, generate placeholder copy, and preview or convert Markdown and HTML without uploading content.',
    intro:
      'Use these utilities for documentation, content cleanup, diff review, Markdown conversion, and everyday text manipulation.',
    introParagraphs: [
      'A surprising amount of development time goes to plain text: comparing two versions of a config file, cleaning a list of IDs before a query, renaming identifiers, or checking that release notes render correctly. This collection covers those everyday jobs with tools that run in your browser, so internal documents and logs are not uploaded anywhere. The text diff highlights added, removed, and changed lines between two inputs, which is useful for reviewing generated output or configuration drift. The word counter reports words, characters, and lines for copy with length limits.',
      'For list cleanup, sort lines alphabetically or numerically and remove duplicates, and use the case converter to switch between camelCase, snake_case, kebab-case, and title case when renaming variables or columns. Documentation work is covered by the Markdown preview, the Markdown to HTML converter for publishing, and the HTML to Markdown converter for moving existing pages into a docs repository. Lorem ipsum text fills layouts before real copy is ready. Each tool does one step, so you can chain them: deduplicate a list, sort it, then compare it with the previous version.',
    ],
    searchIntents: ['text developer tools', 'text diff online', 'markdown preview', 'remove duplicate lines'],
    toolSlugs: [
      'text-diff',
      'word-counter',
      'case-converter',
      'remove-duplicates',
      'sort-lines',
      'markdown-preview',
      'markdown-to-html',
      'html-to-markdown',
      'lorem-ipsum',
    ],
    workflowSteps: [
      {
        toolSlug: 'text-diff',
        title: 'Compare the two versions',
        description: 'Paste the old and new text to see exactly which lines changed.',
      },
      {
        toolSlug: 'remove-duplicates',
        title: 'Clean the list',
        description: 'Remove repeated entries from exported IDs, emails, or log lines.',
      },
      {
        toolSlug: 'sort-lines',
        title: 'Order the result',
        description: 'Sort the cleaned list so later comparisons and reviews are deterministic.',
      },
      {
        toolSlug: 'case-converter',
        title: 'Normalize naming',
        description: 'Convert identifiers to the casing convention used by your codebase or database.',
      },
    ],
  },
  {
    slug: 'data-conversion',
    title: 'Data Format Conversion Tools',
    shortTitle: 'Data Conversion',
    description:
      'Convert JSON, CSV, TSV, NDJSON, XML, YAML, Excel, GeoJSON, and HTML tables between formats, edit tabular data in a grid, and prepare files for import or analysis.',
    intro:
      'Use this collection when importing, exporting, reshaping, or moving structured data between applications and storage formats.',
    introParagraphs: [
      'Data rarely arrives in the format the next system expects. A product manager sends an Excel sheet, an API returns nested JSON, a log pipeline emits newline-delimited JSON, and a mapping library wants GeoJSON. This collection converts between those formats in the browser so you can reshape a file without writing a throwaway script. Excel to JSON and JSON to Excel handle spreadsheets, the CSV and JSON converters handle flat exports, and the interactive grid editor lets you fix individual cells while keeping JSON and CSV in sync.',
      'For narrower jobs, extract or reorder specific CSV columns, convert TSV or NDJSON streams into JSON arrays, pull JSON out of HTML tables, or move between XML, YAML, JSON, and .env configuration. Location data can go from CSV latitude and longitude columns to a GeoJSON FeatureCollection and back. When the destination is a database or a data lake, generate SQL INSERT statements from CSV or infer a Parquet schema from CSV headers, and SQL dumps can be turned back into JSON. Check types after every conversion: CSV has no native numbers, dates, or nulls.',
    ],
    searchIntents: ['data converter online', 'json csv converter', 'xml json converter', 'excel json converter'],
    toolSlugs: [
      'json-csv',
      'json-csv-grid-editor',
      'csv-column-extractor',
      'csv-to-markdown',
      'csv-to-sql-insert',
      'csv-to-parquet-schema',
      'tsv-to-json',
      'ndjson-to-json',
      'xml-to-json',
      'json-to-xml',
      'yaml-json',
      'excel-to-json',
      'json-to-excel',
      'html-table-to-json',
      'csv-to-geojson',
      'geojson-to-csv',
      'sql-to-json',
      'env-to-json',
    ],
    workflowSteps: [
      {
        toolSlug: 'excel-to-json',
        title: 'Export the source sheet',
        description: 'Convert the spreadsheet into JSON so each row becomes an object with named fields.',
      },
      {
        toolSlug: 'json-csv-grid-editor',
        title: 'Fix values in a grid',
        description: 'Correct individual cells, remove bad rows, and keep the JSON and CSV views synchronized.',
      },
      {
        toolSlug: 'csv-column-extractor',
        title: 'Keep only the needed columns',
        description: 'Select and reorder the columns the target system expects.',
      },
      {
        toolSlug: 'csv-to-sql-insert',
        title: 'Generate the import',
        description: 'Turn the cleaned CSV into INSERT statements and run them against a staging database first.',
      },
    ],
  },
  {
    slug: 'typescript-modeling',
    title: 'TypeScript, Zod & Schema Type Generation Tools',
    shortTitle: 'TypeScript & Zod',
    description:
      'Generate TypeScript types, type guards, and Zod schemas from JSON, YAML, GraphQL, Protobuf, and OpenAPI, and convert between Zod, TypeScript, and JSON Schema.',
    intro:
      'Use these converters when bootstrapping typed clients, API models, validation schemas, or cross-language data contracts.',
    introParagraphs: [
      'TypeScript types only exist at compile time, so most typed codebases need two things for every external contract: a static type for the compiler and a runtime check for data that crosses a network boundary. This collection generates both from the sources you already have. Start from a JSON sample to get an interface, from a YAML config to get a typed configuration object, or from a GraphQL SDL, Protobuf definition, or OpenAPI and Swagger document to get types and typed fetch clients that match the contract.',
      'For runtime validation, generate Zod schemas directly from JSON, convert existing TypeScript interfaces into Zod, or turn a JSON Schema into Zod. Going the other direction, derive TypeScript types from Zod, or export Zod and TypeScript definitions as JSON Schema for tools that consume the standard format. The type-guard generator produces plain isType functions when you prefer not to add a validation library. Generated types reflect only the input you provide, so review optional fields, unions, and nullable values before committing them.',
    ],
    searchIntents: ['json to typescript', 'typescript to zod', 'zod to json schema', 'openapi to typescript'],
    toolSlugs: [
      'json-to-typescript',
      'json-to-typescript-type-guards',
      'json-to-zod',
      'typescript-interface-to-zod',
      'typescript-to-json-schema',
      'zod-to-typescript-type',
      'zod-to-json-schema',
      'json-schema-to-zod',
      'yaml-to-typescript',
      'graphql-to-typescript',
      'proto-to-typescript',
      'openapi-to-typescript-fetch',
      'swagger-to-typescript',
    ],
    workflowSteps: [
      {
        toolSlug: 'json-to-typescript',
        title: 'Generate the static type',
        description: 'Create an interface from a representative payload and mark fields that are optional in the real contract.',
      },
      {
        toolSlug: 'typescript-interface-to-zod',
        title: 'Add runtime validation',
        description: 'Convert the interface to a Zod schema so untrusted data is checked where it enters your application.',
      },
      {
        toolSlug: 'zod-to-json-schema',
        title: 'Share the contract',
        description: 'Export the Zod schema as JSON Schema for documentation, other languages, or API gateways.',
      },
      {
        toolSlug: 'json-to-typescript-type-guards',
        title: 'Use lightweight guards where needed',
        description: 'Generate isType functions for small modules that should not depend on a validation library.',
      },
    ],
  },
  {
    slug: 'devops-infrastructure',
    title: 'DevOps & Infrastructure Configuration Tools',
    shortTitle: 'DevOps & Infra',
    description:
      'Scaffold Terraform and Ansible, generate hardened systemd services and timers, build IAM policies and Prometheus rules, and format Nginx config for operations work.',
    intro:
      'Use this collection while provisioning infrastructure, configuring services, hardening web servers, or building observability rules.',
    introParagraphs: [
      'Operations work spans many small configuration languages, and each has its own syntax and failure modes. This collection brings together generators and formatters for the layers most teams touch: provisioning, host configuration, services, access control, and monitoring. Scaffold a Terraform module with variables and outputs, keep it consistently formatted, and start an Ansible playbook for configuring the hosts it creates. On Linux servers, generate systemd unit files, including hardened services with sandboxing options such as NoNewPrivileges and paired .timer units that can replace cron jobs, and use the chmod calculator to translate between octal and symbolic permissions.',
      'Access and edge configuration are covered by the AWS IAM policy builder, which helps you write least-privilege statements, and by the Nginx formatter, the Caddy to Nginx converter, and the Cloudflare Wrangler configuration generator for Workers deployments. Observability closes the loop: the Prometheus alert and recording rule builders produce YAML for latency, error-rate, and SLO rules. Validate generated configuration with the native tools, such as terraform validate, nginx -t, systemd-analyze verify, and promtool, before rolling it out.',
    ],
    searchIntents: ['devops tools online', 'terraform formatter', 'systemd service generator', 'iam policy builder'],
    toolSlugs: [
      'terraform-formatter',
      'terraform-module-scaffolder',
      'ansible-playbook-scaffolder',
      'systemd-unit-generator',
      'systemd-service-hardened-builder',
      'systemd-timer-generator',
      'chmod-calculator',
      'aws-iam-policy-builder',
      'nginx-formatter',
      'caddy-to-nginx',
      'cloudflare-wrangler-builder',
      'prometheus-alert-builder',
      'prometheus-recording-rules-generator',
    ],
    workflowSteps: [
      {
        toolSlug: 'terraform-module-scaffolder',
        title: 'Provision with a module',
        description: 'Scaffold a Terraform module with variables, outputs, and a clear file layout.',
      },
      {
        toolSlug: 'ansible-playbook-scaffolder',
        title: 'Configure the hosts',
        description: 'Start an Ansible playbook for packages, files, and services on the provisioned machines.',
      },
      {
        toolSlug: 'systemd-service-hardened-builder',
        title: 'Run the service safely',
        description: 'Generate a systemd unit with a restart policy and sandboxing options, then verify it with systemd-analyze.',
      },
      {
        toolSlug: 'prometheus-alert-builder',
        title: 'Alert on symptoms',
        description: 'Write alert rules for error rate and latency so failures are noticed before users report them.',
      },
    ],
  },
  {
    slug: 'network-http',
    title: 'HTTP, Headers & Web Protocol Developer Tools',
    shortTitle: 'HTTP & Network',
    description:
      'Parse URLs, headers, and user agents, test CORS, caching, WebSockets, and SSE, look up status codes and MIME types, and inspect HTTP/2 and HTTP/3 frames.',
    intro:
      'Use these tools while debugging browser requests, network configuration, caching, webhooks, DNS, or IP addressing.',
    introParagraphs: [
      'Many web bugs are protocol bugs: a missing CORS header, a Cache-Control directive that keeps stale content alive, a wrong Content-Type, or a query parameter that was encoded twice. This collection helps you inspect the individual pieces of an HTTP exchange. Break a URL into scheme, host, path, and parameters, parse or build query strings, and convert raw header blocks to JSON for comparison. The status code reference explains what each response code means, and the MIME lookup gives the correct Content-Type for a file extension.',
      'For browser-specific behavior, the CORS preflight inspector checks origins, methods, and credential rules, and the Cache-Control parser and tester explain how max-age, no-cache, immutable, and revalidation directives affect browsers and CDNs. The user-agent parser identifies browsers, devices, and bots in logs. Real-time and event-driven endpoints can be exercised with the WebSocket and Server-Sent Events testers and the webhook payload simulator, while the wire-format converter and HTTP/2 and HTTP/3 frame inspector show what travels over the connection. DNS record and CIDR tools cover the network layer underneath.',
    ],
    searchIntents: ['http debugging tools', 'cors inspector', 'cache control tester', 'user agent parser'],
    toolSlugs: [
      'url-parser',
      'query-string-parser',
      'http-headers-parser',
      'http-headers-to-json',
      'http-status-codes',
      'cache-control',
      'http-cache-control-tester',
      'cors-preflight-inspector',
      'user-agent-parser',
      'mime-type-extension-lookup',
      'http-wire-format',
      'websocket-tester',
      'sse-stream-tester',
      'webhook-payload-simulator',
      'http2-http3-frame-inspector',
      'dns-record-generator',
      'cidr-calculator',
    ],
    workflowSteps: [
      {
        toolSlug: 'url-parser',
        title: 'Break down the URL',
        description: 'Confirm the host, path, and query parameters and spot double-encoded values.',
      },
      {
        toolSlug: 'http-headers-parser',
        title: 'Inspect the headers',
        description: 'Convert request and response headers to JSON to compare a working call with a failing one.',
      },
      {
        toolSlug: 'cors-preflight-inspector',
        title: 'Check cross-origin rules',
        description: 'Verify the allowed origin, methods, headers, and credentials for the preflight response.',
      },
      {
        toolSlug: 'cache-control',
        title: 'Review caching',
        description: 'Parse Cache-Control directives to confirm browsers and CDNs will store or revalidate the response as intended.',
      },
      {
        toolSlug: 'http-status-codes',
        title: 'Interpret the response',
        description: 'Look up the status code semantics to decide whether the client or the server should change.',
      },
    ],
  },
  {
    slug: 'git-ci',
    title: 'Git, CI/CD & Repository Developer Tools',
    shortTitle: 'Git & CI/CD',
    description:
      'Build Git commands, clean merge conflict markers, write conventional commits, and generate .gitignore, PR templates, CI matrices, GitLab pipelines, and changelogs.',
    intro:
      'Use this collection for everyday source-control tasks, repository automation, release notes, and continuous integration setup.',
    introParagraphs: [
      'Source control and continuous integration are where individual changes become shared history, so small mistakes such as a committed secret, a broken merge, or an ambiguous commit message tend to be expensive later. This collection covers the repository side of the workflow. Generate a .gitignore for your stack and test patterns against real file paths before relying on them. When you need a less common operation such as an interactive rebase, cherry-pick, or bisect, the command builders assemble the exact Git syntax, and the conflict marker cleaner strips leftover <<<<<<<, =======, and >>>>>>> lines from files.',
      'Consistent history makes automation possible. The conventional commit builder produces messages that release tools can parse, the SemVer calculator checks how a change should bump the version, and the changelog generator turns commits into release notes. For review, generate GitHub issue and pull request templates. On the CI side, build GitHub Actions matrix strategies to test across versions and operating systems, and generate multi-stage .gitlab-ci.yml pipelines with caching. Review generated pipelines for secrets handling and branch rules before merging them.',
    ],
    searchIntents: ['git tools online', 'conventional commit builder', 'gitignore generator', 'ci pipeline generator'],
    toolSlugs: [
      'git-command-builder',
      'git-command-cheat-builder',
      'git-conflict-marker-cleaner',
      'conventional-commit-builder',
      'gitignore-generator',
      'gitignore-tester',
      'github-actions-matrix-builder',
      'github-issue-pr-template-generator',
      'gitlab-ci-generator',
      'gitlab-ci-pipeline-builder',
      'changelog-generator',
      'semver-calculator',
    ],
    workflowSteps: [
      {
        toolSlug: 'gitignore-generator',
        title: 'Ignore the right files',
        description: 'Generate a .gitignore for your languages and tools before the first commit so build output and secrets stay out of history.',
      },
      {
        toolSlug: 'conventional-commit-builder',
        title: 'Write structured commits',
        description: 'Compose type(scope): subject messages so changes can be grouped and versioned automatically.',
      },
      {
        toolSlug: 'git-conflict-marker-cleaner',
        title: 'Clean up merges',
        description: 'Find and remove leftover conflict markers after resolving a merge, then run the tests again.',
      },
      {
        toolSlug: 'github-actions-matrix-builder',
        title: 'Test across environments',
        description: 'Define a matrix of runtime versions and operating systems for your CI workflow.',
      },
      {
        toolSlug: 'changelog-generator',
        title: 'Publish release notes',
        description: 'Generate a changelog from conventional commits for the new version.',
      },
    ],
  },
  {
    slug: 'mobile-development',
    title: 'Mobile App Developer Tools',
    shortTitle: 'Mobile Development',
    description:
      'Generate Android manifests, iOS plists, app icons, asset catalogs, deep link files, Flutter themes, Capacitor configs, and native vector assets for mobile apps.',
    intro:
      'Use this collection while configuring mobile apps, preparing assets, validating deep links, or generating platform-specific project files.',
    introParagraphs: [
      'Mobile projects carry a lot of platform configuration that is easy to get wrong and slow to test, because each mistake usually means another build and install cycle. This collection generates and checks those files before you open Xcode or Android Studio. Build AndroidManifest.xml entries and iOS Info.plist keys for permissions and capabilities, resize a single source image into the icon sizes both stores require, and generate Contents.json manifests for Xcode asset catalogs. Cross-platform teams can generate Flutter themes, capacitor.config.json files, and react-native-vector-icons imports.',
      'Deep linking needs matching configuration in the app and on the website: generate apple-app-site-association and assetlinks.json files, and format SHA-1 and SHA-256 keystore fingerprints for Firebase, Google sign-in, and App Links verification. Vector artwork can be converted from SVG into Android Vector Drawable XML, SwiftUI shapes, or react-native-svg components, and API responses can become Swift Codable structs or Kotlin data classes. Test generated configuration on real devices, since store and operating system validation rules change between releases.',
    ],
    searchIntents: ['mobile developer tools', 'android manifest builder', 'ios plist builder', 'flutter theme generator'],
    toolSlugs: [
      'android-manifest-builder',
      'ios-plist-builder',
      'app-icon-resizer',
      'xcode-asset-catalog',
      'universal-links-validator',
      'android-keystore-fingerprint',
      'flutter-theme-generator',
      'capacitor-config-builder',
      'react-native-icon-finder',
      'svg-to-android-vector',
      'svg-to-swiftui-shape',
      'svg-to-react-native',
      'json-to-swift',
      'json-to-kotlin',
    ],
    workflowSteps: [
      {
        toolSlug: 'app-icon-resizer',
        title: 'Produce icon sizes',
        description: 'Resize one high-resolution source image into the icon sizes required for iOS and Android.',
      },
      {
        toolSlug: 'xcode-asset-catalog',
        title: 'Build the asset catalog',
        description: 'Generate Contents.json so Xcode maps each image to the correct scale and idiom.',
      },
      {
        toolSlug: 'android-manifest-builder',
        title: 'Declare Android permissions',
        description: 'Add only the permissions and components the app actually uses to AndroidManifest.xml.',
      },
      {
        toolSlug: 'android-keystore-fingerprint',
        title: 'Register signing fingerprints',
        description: 'Format the SHA-1 and SHA-256 fingerprints required by Firebase and Google OAuth for each signing key.',
      },
      {
        toolSlug: 'universal-links-validator',
        title: 'Connect deep links',
        description: 'Generate apple-app-site-association and assetlinks.json and host them on your domain.',
      },
    ],
  },
  {
    slug: 'media-files',
    title: 'Image, PDF & Media Developer Tools',
    shortTitle: 'Media & Files',
    description:
      'Convert and compress images, strip EXIF metadata, merge, split, and render PDFs, convert audio, video, and subtitles, calculate aspect ratios, and create QR codes.',
    intro:
      'Use this collection for quick asset preparation, image optimization, metadata cleanup, PDF manipulation, and media conversion.',
    introParagraphs: [
      'Asset preparation is a common interruption in development work: a screenshot needs compressing, a photo must lose its GPS metadata before publishing, a set of scans has to become one PDF, or a demo video should be a GIF for a README. This collection handles those tasks in the browser, which keeps files on your machine. Convert images between formats, compress them for the web, extract their dominant colors, and strip EXIF metadata such as camera details and location.',
      "PDF work is covered from several directions: combine images into a PDF, merge or split documents, render pages to PNG or JPEG, and decode Base64 PDF payloads from APIs into a viewable file. Video can be turned into GIFs, audio converted between WAV, MP3, and OGG with trimming, and SRT subtitles converted to WebVTT for HTML5 video. The aspect ratio calculators keep dimensions proportional when resizing, SVG files can be rasterized to PNG, and the QR code generator encodes URLs or text. Very large files are limited by your device's memory.",
    ],
    searchIntents: ['image converter online', 'image compressor', 'pdf merger', 'remove exif data'],
    toolSlugs: [
      'image-converter',
      'image-compressor',
      'image-color-extractor',
      'image-exif-stripper',
      'images-to-pdf',
      'pdf-merger',
      'pdf-splitter',
      'pdf-to-image',
      'base64-to-pdf',
      'video-to-gif',
      'audio-converter',
      'subtitle-srt-vtt-converter',
      'aspect-ratio-calculator',
      'aspect-ratio-resizer',
      'svg-to-png',
      'qr-code',
    ],
    workflowSteps: [
      {
        toolSlug: 'image-exif-stripper',
        title: 'Remove private metadata',
        description: 'Strip EXIF data such as GPS coordinates and camera details before publishing photos.',
      },
      {
        toolSlug: 'image-converter',
        title: 'Choose a web format',
        description: 'Convert the image to a format such as WebP or PNG that suits the content.',
      },
      {
        toolSlug: 'image-compressor',
        title: 'Reduce file size',
        description: 'Compress the image and compare quality against size at the dimensions you will actually display.',
      },
      {
        toolSlug: 'images-to-pdf',
        title: 'Bundle for sharing',
        description: 'Combine the prepared images into a single PDF when they need to travel as one document.',
      },
    ],
  },
  {
    slug: 'testing-debugging',
    title: 'Testing, Validation & Debugging Tools',
    shortTitle: 'Testing & Debugging',
    description:
      'Diff code, test regular expressions and ReDoS risk, validate OpenAPI, inspect HAR, CSP, TLS, and HTTP/2 frames, verify checksums, and prototype fixes in a sandbox.',
    intro:
      'Use these utilities to reproduce failures, validate artifacts, compare outputs, and inspect protocol-level behavior during debugging.',
    introParagraphs: [
      'Debugging is mostly about narrowing down where behavior diverges from expectation, and that requires comparing outputs, isolating inputs, and inspecting what actually happened on the wire. This collection gathers tools for those steps. The side-by-side diff shows exactly how two code snippets or outputs differ, the checksum comparator confirms whether two files are byte-identical, and the live sandbox lets you reproduce a front-end issue without the rest of your application. The user-agent parser and SSE stream tester help reproduce client-specific and streaming issues.',
      'Regular expressions deserve their own workflow: escape literal text, test the pattern against real samples, and check it for catastrophic backtracking, which can turn a single crafted input into a denial of service. For network and security behavior, inspect recorded HAR traffic, validate an OpenAPI document before comparing it with the implementation, evaluate a Content Security Policy for missing directives, and step through TLS handshakes and HTTP/2 or HTTP/3 frames to understand protocol-level failures. Capture a failing case as a small, reproducible input before changing code.',
    ],
    searchIntents: ['developer debugging tools', 'openapi validator', 'har viewer', 'regex tester online'],
    toolSlugs: [
      'code-side-by-side-diff',
      'regex-escape',
      'regex-tester',
      'regex-benchmark-simulator',
      'code-playground',
      'openapi-validator',
      'har-viewer',
      'user-agent-parser',
      'sse-stream-tester',
      'csp-evaluator',
      'ssl-tls-handshake-simulator',
      'http2-http3-frame-inspector',
      'file-checksum-comparator',
    ],
    workflowSteps: [
      {
        toolSlug: 'regex-escape',
        title: 'Escape literal input',
        description: 'Escape user-supplied or literal text before embedding it in a pattern.',
      },
      {
        toolSlug: 'regex-tester',
        title: 'Test against real samples',
        description: 'Run the pattern on matching and non-matching examples, including edge cases.',
      },
      {
        toolSlug: 'regex-benchmark-simulator',
        title: 'Check for ReDoS',
        description: 'Analyze nested quantifiers and backtracking risk before the pattern handles untrusted input.',
      },
      {
        toolSlug: 'code-side-by-side-diff',
        title: 'Compare before and after',
        description: 'Diff the original and fixed code or output to confirm the change is limited to the intended lines.',
      },
    ],
  },
  {
    slug: 'time-cron',
    title: 'Date, Time & Cron Developer Tools',
    shortTitle: 'Time & Cron',
    description:
      'Convert Unix timestamps, write and explain cron expressions, preview next runs, add jitter, convert schedules across time zones, and read timestamps from UUIDv7 IDs.',
    intro:
      'Use this collection when debugging scheduled jobs, converting timestamps, describing cron rules, or coordinating across time zones.',
    introParagraphs: [
      'Time-related bugs are notoriously hard to reproduce: a job runs twice after a daylight saving change, a timestamp is interpreted as seconds instead of milliseconds, or every server fires the same cron job at the same second. This collection helps you reason about schedules and timestamps explicitly. Convert Unix timestamps to readable dates and back, calculate durations, and plan meetings across time zones. Many identifiers also embed time: UUIDv7 values and MongoDB ObjectIds both contain creation timestamps you can extract when debugging ordering or data age.',
      'For scheduled jobs, describe the schedule in plain language and generate a cron expression, or paste an existing expression to have it explained. The next-runs calculator lists upcoming executions so you can verify edge cases such as month ends, and the time zone converter shows how a schedule behaves when the server runs in UTC. To avoid many hosts running at once, add randomized offsets with the jitter generator, and on Linux consider systemd timers as an alternative to crontab. Cron syntax differs slightly between implementations, so confirm which fields your scheduler supports.',
    ],
    searchIntents: ['cron tools online', 'timestamp converter', 'cron generator', 'timezone meeting planner'],
    toolSlugs: [
      'timestamp-converter',
      'time-duration-calculator',
      'timezone-meeting-planner',
      'natural-language-to-cron',
      'cron-generator',
      'cron-parser',
      'crontab-descriptor',
      'crontab-schedule-translator',
      'cron-next-runs-visualizer',
      'cron-timezone-converter',
      'crontab-randomized-generator',
      'systemd-timer-generator',
      'uuid-v7-timestamp-extractor',
      'mongodb-objectid-parser',
    ],
    workflowSteps: [
      {
        toolSlug: 'natural-language-to-cron',
        title: 'Describe the schedule',
        description: 'Write the intended schedule in plain language and generate a first cron expression.',
      },
      {
        toolSlug: 'cron-parser',
        title: 'Confirm the meaning',
        description: 'Parse the expression field by field to make sure minutes, hours, and weekdays match your intent.',
      },
      {
        toolSlug: 'cron-next-runs-visualizer',
        title: 'Preview upcoming runs',
        description: 'List the next executions and check month ends, weekends, and other edge cases.',
      },
      {
        toolSlug: 'cron-timezone-converter',
        title: 'Account for time zones',
        description: 'Convert the schedule to the server time zone, usually UTC, and review daylight saving transitions.',
      },
      {
        toolSlug: 'crontab-randomized-generator',
        title: 'Spread the load',
        description: 'Add a randomized delay when many hosts run the same job so they do not all start at once.',
      },
    ],
  },
  {
    slug: 'hashing-checksums',
    title: 'Hashing, Checksum & HMAC Tools',
    shortTitle: 'Hashing & Checksums',
    description:
      'Generate SHA-256, SHA-512, SHA-3, BLAKE3, and MD5 hashes, compare file checksums, compute HMAC signatures, verify webhooks, and build Subresource Integrity hashes.',
    intro:
      'Use these tools to verify downloads, compare files, authenticate messages with HMAC, and pin CDN assets with integrity hashes.',
    introParagraphs: [
      'A hash function turns any input into a fixed-length digest, and the same input always produces the same digest. That simple property supports several different jobs, and choosing the right tool depends on which job you are doing. To check that a download or build artifact was not corrupted, compute its SHA-256 or SHA-512 checksum, or use the file checksum comparator to calculate several algorithms at once and compare them with a published value. SHA-3 and BLAKE3 are modern alternatives, and MD5 remains useful only for detecting accidental changes in legacy systems.',
      'A plain checksum cannot tell you who produced a message, because anyone can recompute it. When authenticity matters, use an HMAC: the HMAC generators combine a secret key with SHA-256, SHA-384, or SHA-512, and the webhook signature verifier applies the same idea to payloads from providers such as Stripe, GitHub, and Shopify. For front-end security, Subresource Integrity hashes let the browser refuse a CDN script or stylesheet that has changed, and the hex to Base64 converter helps when one system prints digests in hex and another expects Base64. Never use fast hashes like these to store passwords.',
    ],
    searchIntents: ['sha256 checksum', 'hmac sha256 generator', 'verify webhook signature', 'sri hash generator'],
    toolSlugs: [
      'sha256-hash',
      'sha512-hash',
      'sha3-hash-generator',
      'blake3-hash-generator',
      'md5-hash',
      'file-checksum-comparator',
      'hmac-generator',
      'hmac-sha384-sha512-calculator',
      'webhook-signature-verifier',
      'subresource-integrity-generator',
      'hex-to-base64',
    ],
    workflowSteps: [
      {
        toolSlug: 'file-checksum-comparator',
        title: 'Verify the artifact',
        description: 'Calculate the checksum of the downloaded file and compare it with a value from a trusted source.',
      },
      {
        toolSlug: 'sha256-hash',
        title: 'Hash text inputs',
        description: 'Compute SHA-256 for strings such as canonical request bodies when debugging signature mismatches.',
      },
      {
        toolSlug: 'hmac-generator',
        title: 'Add a shared secret',
        description: 'Generate an HMAC when the receiver must confirm the message came from someone who holds the key.',
      },
      {
        toolSlug: 'webhook-signature-verifier',
        title: 'Verify incoming webhooks',
        description: 'Recompute the provider signature over the raw request body and compare it with the signature header.',
      },
      {
        toolSlug: 'subresource-integrity-generator',
        title: 'Pin third-party assets',
        description: 'Generate integrity attributes for CDN scripts and stylesheets so modified files are blocked.',
      },
    ],
  },
  {
    slug: 'passwords-secrets',
    title: 'Password, Secret & 2FA Security Tools',
    shortTitle: 'Passwords & Secrets',
    description:
      'Generate passwords, passphrases, and API keys, tune Argon2id, bcrypt, and PBKDF2 hashing, create htpasswd entries, test TOTP 2FA codes, and sanitize .env secrets.',
    intro:
      'Use this collection to create strong secrets, choose password hashing parameters, and test two-factor authentication flows.',
    introParagraphs: [
      'Secrets fail in two main ways: they are too easy to guess, or they are stored and shared carelessly. This collection addresses both. Generate random passwords, memorable Diceware passphrases, and prefixed API keys from a cryptographically secure source, and use the strength analyzer to see why a candidate password is weak. When the secret is a user password you must store, never keep it in plain text or behind a fast hash; use a deliberately slow, salted algorithm instead.',
      'The Argon2id parameter tuner helps you choose memory, iteration, and parallelism settings based on RFC 9106 guidance, and the Argon2, bcrypt, and PBKDF2 tools let you generate and verify hashes while you test login code or migrate between algorithms. The htpasswd generator creates entries for HTTP Basic Auth in Apache and Nginx. For two-factor authentication, the TOTP tools produce RFC 6238 codes and otpauth URIs from Base32 secrets, which makes it easier to test enrollment and clock drift. The AES-GCM playground demonstrates symmetric encryption parameters, and the .env sanitizer creates a shareable .env.example without real values.',
    ],
    searchIntents: ['password generator', 'argon2 parameters', 'bcrypt verify', 'totp generator'],
    toolSlugs: [
      'password-generator',
      'passphrase-wordlist-generator',
      'password-strength-analyzer',
      'api-key-generator',
      'argon2-parameter-tuner',
      'argon2-hash-generator',
      'bcrypt-generator',
      'bcrypt-hash-calculator',
      'bcrypt-verifier',
      'pbkdf2-key-derivation',
      'htpasswd-generator',
      'totp-generator',
      'totp-authenticator-simulator',
      'base32-encoder',
      'aes-crypto-playground',
      'env-sanitizer',
    ],
    workflowSteps: [
      {
        toolSlug: 'password-generator',
        title: 'Generate a strong secret',
        description: 'Create a random password or passphrase with enough length for its purpose.',
      },
      {
        toolSlug: 'password-strength-analyzer',
        title: 'Check guessability',
        description: 'Test candidate passwords and user-facing password rules against common weaknesses.',
      },
      {
        toolSlug: 'argon2-parameter-tuner',
        title: 'Choose hashing costs',
        description: 'Pick Argon2id memory and iteration settings that your login servers can sustain under load.',
      },
      {
        toolSlug: 'bcrypt-verifier',
        title: 'Test stored hashes',
        description: 'Verify that existing bcrypt hashes match known test passwords during migrations.',
      },
      {
        toolSlug: 'totp-generator',
        title: 'Test two-factor login',
        description: 'Generate TOTP codes from a test secret to check enrollment and code validation.',
      },
    ],
  },
  {
    slug: 'certificates-keys',
    title: 'Certificate, TLS & Key Management Tools',
    shortTitle: 'Certificates & Keys',
    description:
      'Decode X.509 certificates and CSRs, build SAN CSRs, generate RSA and Ed25519 keys, convert PKCS formats, and inspect SSH, PGP, and keystore fingerprints.',
    intro:
      'Use these tools to request, decode, and troubleshoot certificates and to inspect the keys behind TLS, SSH, PGP, and app signing.',
    introParagraphs: [
      "Public-key infrastructure shows up across a developer's work: TLS certificates for web servers, SSH keys for servers and Git hosting, PGP keys for signed releases, and signing keys for mobile apps. Each uses its own file formats, and most problems come down to reading those files correctly. This collection helps you create and inspect them without guessing at OpenSSL flags. Generate RSA or Ed25519 key pairs for testing, convert RSA keys between PKCS#1 and PKCS#8 PEM formats, and inspect Ed25519 keys and signatures.",
      'To obtain a certificate, build a Certificate Signing Request with the correct Common Name and Subject Alternative Names, then decode the CSR to confirm what the certificate authority will see; modern browsers validate hostnames against SANs rather than the Common Name. Once issued, the certificate decoders show the issuer, SAN list, key type, and validity period, and the TLS handshake simulator explains how TLS 1.2 and 1.3 negotiate. SSH, PGP, and Android keystore fingerprints can be inspected and formatted for comparison. Keys generated in a browser are suitable for testing; generate production keys in your secure infrastructure.',
    ],
    searchIntents: ['decode x509 certificate', 'csr generator with san', 'pkcs1 to pkcs8', 'ssh key fingerprint'],
    toolSlugs: [
      'rsa-key-pair-generator',
      'rsa-pkcs1-pkcs8-converter',
      'ed25519-key-generator',
      'ed25519-sign-verify',
      'csr-generator',
      'x509-san-csr-builder',
      'x509-csr-decoder',
      'certificate-decoder',
      'base64-pem-certificate-parser',
      'ssl-certificate-inspector',
      'ssl-tls-handshake-simulator',
      'ssh-key-inspector',
      'pgp-key-inspector',
      'android-keystore-fingerprint',
    ],
    workflowSteps: [
      {
        toolSlug: 'rsa-key-pair-generator',
        title: 'Create a test key pair',
        description: 'Generate a key pair for a staging certificate or local testing.',
      },
      {
        toolSlug: 'x509-san-csr-builder',
        title: 'Build the signing request',
        description: 'Create a CSR configuration that lists every hostname as a Subject Alternative Name.',
      },
      {
        toolSlug: 'x509-csr-decoder',
        title: 'Check the CSR',
        description: 'Decode the CSR and confirm the subject, SANs, and key size before submitting it.',
      },
      {
        toolSlug: 'certificate-decoder',
        title: 'Inspect the issued certificate',
        description: 'Decode the certificate to confirm the SANs, issuer, and validity dates.',
      },
      {
        toolSlug: 'ssl-certificate-inspector',
        title: 'Troubleshoot deployment',
        description: 'Inspect the deployed certificate details when clients report hostname or expiry errors.',
      },
    ],
  },
  {
    slug: 'web3-blockchain',
    title: 'Web3, Ethereum & Blockchain Developer Tools',
    shortTitle: 'Web3 & Ethereum',
    description:
      'Compute Keccak-256 selectors, encode Solidity ABI data, hash EIP-712 typed data, verify EIP-191 messages, convert Wei and Gwei, and check wallet addresses.',
    intro:
      'Use this collection while debugging smart contract calls, signatures, unit conversions, and wallet address formats.',
    introParagraphs: [
      "Smart contract development involves low-level encodings that ordinary web tooling does not show: 4-byte function selectors, 32-byte ABI words, storage slot positions, and signatures over structured data. When a transaction reverts or a signature does not recover the expected address, you need to see those bytes. This collection starts with the Keccak-256 hasher for selectors and event topics. Ethereum's Keccak-256 differs from the standardized SHA3-256 in its padding, which the SHA-3 generator lets you compare. The ABI encoder builds calldata from function parameters, and the storage slot calculator shows where Solidity places state variables.",
      'For signing flows, hash EIP-712 typed data to check the domain separator and struct hash a wallet will sign, and validate EIP-191 personal_sign messages. Token amounts are integers in the smallest unit, so the unit converter and arbitrary-precision calculator avoid the floating-point errors that JavaScript numbers introduce. Beyond Ethereum, generate and derive BIP-39 mnemonics for test wallets, validate Bitcoin Bech32 and Solana Base58 addresses, and encode Base58 data. Never enter a mnemonic or private key that controls real funds into any web tool.',
    ],
    searchIntents: ['keccak256 function selector', 'abi encoder online', 'wei to ether converter', 'bip39 mnemonic generator'],
    toolSlugs: [
      'ethereum-keccak256-hasher',
      'sha3-hash-generator',
      'abi-encoder-decoder',
      'ethereum-abi-storage-slot-calculator',
      'eip712-hasher',
      'ethereum-eip191-signature-verifier',
      'crypto-unit-converter',
      'bignumber-calculator',
      'bip39-generator',
      'bip39-seed-phrase-generator',
      'bip39-seed-deriver',
      'bitcoin-bech32-address-encoder',
      'base58-encoder',
      'solana-address-validator',
    ],
    workflowSteps: [
      {
        toolSlug: 'ethereum-keccak256-hasher',
        title: 'Compute the function selector',
        description: 'Hash the canonical function signature and take the first four bytes to confirm the selector your call uses.',
      },
      {
        toolSlug: 'abi-encoder-decoder',
        title: 'Encode the calldata',
        description: 'Encode the parameters into 32-byte ABI words and compare them with the failing transaction input.',
      },
      {
        toolSlug: 'crypto-unit-converter',
        title: 'Check the amounts',
        description: 'Convert between Wei, Gwei, and Ether to confirm values are expressed in the smallest unit.',
      },
      {
        toolSlug: 'eip712-hasher',
        title: 'Verify typed-data signing',
        description: 'Recompute the EIP-712 domain separator and struct hash to find mismatched fields or chain IDs.',
      },
    ],
  },
  {
    slug: 'curl-converters',
    title: 'cURL to Code & HTTP Client Converters',
    shortTitle: 'cURL to Code',
    description:
      'Convert cURL to Fetch, Axios, Python, Go, Java, C#, PHP, Ruby, and Rust client code, turn Fetch and Postman requests back into cURL, and export raw HTTP requests.',
    intro:
      'Use these converters to move a working request from the terminal into application code in the language your project uses.',
    introParagraphs: [
      'API documentation, browser developer tools, and support tickets all tend to share requests as cURL commands, because cURL is the closest thing to a universal format for HTTP calls. Turning that command into application code by hand is tedious and error-prone: headers get dropped, JSON bodies are re-escaped incorrectly, and authentication flags are forgotten. This collection converts a working cURL command into client code for the language you actually use, including JavaScript Fetch or Axios, Python requests or httpx, Go net/http, Java HttpClient, C# HttpClient, PHP Guzzle, Ruby Faraday, and Rust reqwest, plus official OpenAI and Anthropic SDK calls for AI APIs.',
      'The conversion also works in reverse. Copy a fetch() call from your code and convert it back to cURL to reproduce it in a terminal, or export Postman collections as cURL scripts. The cURL builder assembles a command from its parts when you do not have one yet, the HAR converter produces an HTTP Archive for tools that import traffic recordings, and the wire-format converter shows the raw HTTP/1.1 text that is actually sent. Before sharing any command, replace real tokens, cookies, and API keys with placeholders.',
    ],
    searchIntents: ['curl to python', 'curl to fetch', 'curl to go', 'postman to curl'],
    toolSlugs: [
      'curl-builder',
      'curl-to-code',
      'curl-to-fetch',
      'curl-to-javascript',
      'curl-to-axios',
      'curl-to-python',
      'curl-to-go',
      'curl-to-go-http',
      'curl-to-java',
      'curl-to-csharp',
      'curl-to-php',
      'curl-to-php-guzzle',
      'curl-to-ruby-faraday',
      'curl-to-rust',
      'curl-to-rust-reqwest',
      'curl-to-ai-sdk',
      'fetch-to-curl',
      'postman-to-curl',
      'postman-collection-to-curl',
      'curl-to-har',
      'http-wire-format',
    ],
    workflowSteps: [
      {
        toolSlug: 'curl-builder',
        title: 'Build or clean the command',
        description: 'Assemble the request with method, headers, and body, and remove flags your client code does not need.',
      },
      {
        toolSlug: 'curl-to-code',
        title: 'Generate client code',
        description: 'Convert the command into your target language and review timeouts, error handling, and how secrets are loaded.',
      },
      {
        toolSlug: 'fetch-to-curl',
        title: 'Reproduce from the application',
        description: 'Turn a fetch() call from your application back into cURL to test it outside the app.',
      },
      {
        toolSlug: 'curl-to-har',
        title: 'Share as a HAR file',
        description: 'Export the request as HAR 1.2 for tools that import recorded HTTP traffic.',
      },
    ],
  },
  {
    slug: 'dns-networking',
    title: 'DNS, IP Subnet & Networking Tools',
    shortTitle: 'DNS & Networking',
    description:
      'Generate DNS, SPF, DMARC, and DKIM records, inspect SOA and DNSSEC data, calculate IPv4 and IPv6 subnets and supernets, and look up ports and transfer times.',
    intro:
      'Use these tools when planning address ranges, configuring DNS and email authentication, or reasoning about network capacity.',
    introParagraphs: [
      'Network configuration sits underneath every deployed application, and errors there tend to surface as vague symptoms: an intermittent timeout, a certificate that will not issue, or email that lands in spam. This collection helps you plan and check the pieces directly. For addressing, calculate IPv4 subnets with their network, broadcast, and usable host ranges, work with IPv6 prefixes, and aggregate several CIDR blocks into a supernet when writing firewall or routing rules. The port reference lists standard TCP and UDP service ports, the MAC address generator creates test hardware addresses, and the bandwidth calculator estimates transfer times.',
      'On the DNS side, generate A, AAAA, CNAME, MX, and TXT records, simulate lookups and propagation to understand how TTLs delay changes, and inspect SOA serial numbers and DNSSEC records. Email deliverability depends on DNS too: build SPF, DKIM, and DMARC records, and count SPF DNS lookups, because SPF evaluation fails with a permanent error when it needs more than ten lookups. Internationalized domain names must be converted to Punycode before they appear in DNS. The DNS tools here simulate results; confirm live records with dig or your DNS provider.',
    ],
    searchIntents: ['subnet calculator', 'spf record lookup limit', 'dmarc record generator', 'ipv6 subnet calculator'],
    toolSlugs: [
      'ip-subnet-calculator',
      'subnet-calculator',
      'cidr-calculator',
      'ipv6-subnet-calculator',
      'ip-supernetting-calculator',
      'network-port-reference',
      'mac-address-generator',
      'bandwidth-calculator',
      'dns-record-generator',
      'dns-lookup-simulator',
      'dns-propagation-checker',
      'dns-soa-dnssec-inspector',
      'dmarc-generator',
      'dns-spf-record-flattener',
      'punycode-idn-converter',
    ],
    workflowSteps: [
      {
        toolSlug: 'ip-subnet-calculator',
        title: 'Plan the address range',
        description: 'Calculate network, broadcast, and usable host ranges for each subnet.',
      },
      {
        toolSlug: 'ip-supernetting-calculator',
        title: 'Summarize routes',
        description: 'Aggregate adjacent CIDR blocks into fewer prefixes for firewall and routing rules.',
      },
      {
        toolSlug: 'dns-record-generator',
        title: 'Create DNS records',
        description: 'Generate the A, AAAA, CNAME, and MX records for the new service.',
      },
      {
        toolSlug: 'dmarc-generator',
        title: 'Authenticate email',
        description: 'Build SPF, DKIM, and DMARC TXT records before sending mail from the domain.',
      },
      {
        toolSlug: 'dns-spf-record-flattener',
        title: 'Stay under the SPF lookup limit',
        description: 'Count DNS lookups in the SPF record and flatten includes if evaluation needs more than ten.',
      },
    ],
  },
  {
    slug: 'json-query-transform',
    title: 'JSON Query, Diff & Transformation Tools',
    shortTitle: 'JSON Query & Diff',
    description:
      'Query JSON with JSONPath and JSON Pointer, diff documents and generate RFC 6902 patches, sort keys, flatten objects, split large arrays, and convert NDJSON streams.',
    intro:
      'Use these tools when you need to find, compare, reshape, or shrink JSON rather than just format it.',
    introParagraphs: [
      'Formatting makes JSON readable, but many tasks need more than that: finding one value in a deeply nested response, proving that two payloads differ only in field order, or producing a patch that updates a resource without resending it. This collection covers those operations. Query documents with JSONPath expressions, including wildcards, filters, and recursive descent, or resolve an exact location with an RFC 6901 JSON Pointer. Sorting keys recursively gives deterministic output, which makes diffs of API responses or configuration files meaningful.',
      'To compare two documents, the diff and patch tools generate RFC 6902 operations such as add, remove, replace, and move that can be applied to the original to produce the new version; this is the format used by HTTP PATCH with application/json-patch+json. Flatten nested objects into dot-notation keys for spreadsheets or environment variables and unflatten them back. For large data, measure size and nesting depth, minify payloads, split big arrays into batches that respect API limits, and convert newline-delimited JSON logs into arrays. The string escaper handles JSON embedded inside other strings.',
    ],
    searchIntents: ['jsonpath tester', 'json diff online', 'json patch generator', 'flatten json'],
    toolSlugs: [
      'json-formatter',
      'json-minifier',
      'json-key-sorter',
      'json-size-analyzer',
      'jsonpath-tester',
      'json-pointer',
      'json-diff-patch',
      'json-patch-generator',
      'json-flatten-unflatten',
      'json-array-splitter-chunker',
      'ndjson-to-json',
      'json-string-escape',
    ],
    workflowSteps: [
      {
        toolSlug: 'json-key-sorter',
        title: 'Normalize both documents',
        description: 'Sort keys recursively so ordering differences do not appear as changes.',
      },
      {
        toolSlug: 'json-diff-patch',
        title: 'Compare and patch',
        description: 'Generate RFC 6902 operations between the old and new document and apply them to confirm the result.',
      },
      {
        toolSlug: 'jsonpath-tester',
        title: 'Extract what matters',
        description: 'Write JSONPath expressions for the fields your code or tests depend on.',
      },
      {
        toolSlug: 'json-array-splitter-chunker',
        title: 'Batch large payloads',
        description: 'Split large arrays into chunks that fit API request limits.',
      },
    ],
  },
  {
    slug: 'json-to-code',
    title: 'JSON to Code: Model & Struct Generators',
    shortTitle: 'JSON to Code',
    description:
      'Generate Go structs, Python Pydantic models and dataclasses, C# records, Java POJOs, Kotlin, Swift, Rust Serde, TypeScript, Zod, and GraphQL types from sample JSON.',
    intro:
      'Use these generators to turn a sample API response into typed models for the language your service or app is written in.',
    introParagraphs: [
      'Writing model classes by hand for a large API response is slow and invites typos in field names. Because JSON carries both names and value types, a representative sample is enough to generate a first draft of the model in almost any language. This collection groups generators by target so you can pick the idiom your codebase uses: Go structs with json tags, Python Pydantic v2 models or standard dataclasses, C# classes or records with JsonPropertyName attributes, Java POJOs, Kotlin data classes with kotlinx.serialization annotations, Swift Codable structs, and Rust structs with Serde derives.',
      'The multi-language model generator is useful when several services in different languages consume the same payload and you want their models to stay aligned. For front-end and API layers, generate TypeScript interfaces, Zod schemas for runtime validation, or a GraphQL schema inferred from the sample. All of these tools infer types from the example you give them, so a field that happens to be null, an empty array, or a number that is sometimes a string will be typed incorrectly. Use several real responses, then review optional fields, enums, and date formats manually.',
    ],
    searchIntents: ['json to go struct', 'json to pydantic', 'json to kotlin data class', 'json to rust serde'],
    toolSlugs: [
      'json-to-models',
      'json-to-typescript',
      'json-to-zod',
      'json-to-go-struct',
      'json-to-pydantic',
      'json-to-python-dataclass',
      'json-to-csharp',
      'json-to-java-pojo',
      'json-to-kotlin',
      'json-to-swift',
      'json-to-rust-serde',
      'json-to-graphql',
    ],
    workflowSteps: [
      {
        toolSlug: 'json-to-models',
        title: 'Compare target languages',
        description: 'Generate models for several languages at once to keep services that share a payload aligned.',
      },
      {
        toolSlug: 'json-to-go-struct',
        title: 'Generate the backend model',
        description: 'Create Go structs, or the equivalent for your language, and adjust field tags, names, and pointer types.',
      },
      {
        toolSlug: 'json-to-pydantic',
        title: 'Validate where data enters',
        description: 'Use a validating model such as Pydantic for inputs that come from external systems.',
      },
      {
        toolSlug: 'json-to-zod',
        title: 'Validate on the client',
        description: 'Generate a Zod schema so the front end checks responses at runtime as well.',
      },
    ],
  },
  {
    slug: 'api-schemas',
    title: 'OpenAPI, GraphQL, Protobuf & Avro Schema Tools',
    shortTitle: 'API Schemas',
    description:
      'Validate OpenAPI, generate typed clients, format GraphQL and Protobuf, convert Protobuf and Avro to JSON Schema, and derive TypeScript and Zod types.',
    intro:
      'Use this collection when the API contract is defined in a schema language and you need to validate it, convert it, or generate code from it.',
    introParagraphs: [
      'Schema-first APIs describe their contract in a dedicated language, such as OpenAPI for REST, SDL for GraphQL, proto3 for gRPC, and Avro for many event streams, and generate code from it. The benefit is a single source of truth; the cost is that teams must move between formats when systems meet. This collection helps at those boundaries. Validate an OpenAPI document, then generate TypeScript interfaces and typed fetch or Axios clients from OpenAPI 3 or Swagger 2 specs. Format GraphQL queries and Protobuf files so reviews focus on content rather than whitespace.',
      "For conversion, turn GraphQL SDL into TypeScript types or Zod validators, infer GraphQL types and queries from JSON samples, and convert Protobuf messages to TypeScript or JSON Schema. Avro records and Zod schemas can also be expressed as JSON Schema, and JSON Schema can become proto3 messages, which is useful when a REST contract moves to gRPC. The JSON Schema validator then checks real payloads against the converted result. Type systems do not map one-to-one: Protobuf's int64, GraphQL nullability, and Avro unions need manual review.",
    ],
    searchIntents: ['openapi to typescript', 'graphql to typescript', 'protobuf to json schema', 'avro to json schema'],
    toolSlugs: [
      'openapi-validator',
      'openapi-to-typescript-fetch',
      'swagger-to-typescript',
      'graphql-query-formatter',
      'graphql-to-typescript',
      'graphql-schema-to-zod',
      'json-to-graphql',
      'json-to-graphql-query',
      'protobuf-formatter',
      'proto-to-typescript',
      'protobuf-to-json',
      'protobuf-to-json-schema',
      'json-schema-to-protobuf',
      'avro-to-json-schema',
      'zod-to-json-schema',
      'json-schema-validator',
    ],
    workflowSteps: [
      {
        toolSlug: 'openapi-validator',
        title: 'Validate the contract',
        description: 'Check the OpenAPI document for structural errors before generating anything from it.',
      },
      {
        toolSlug: 'swagger-to-typescript',
        title: 'Generate a typed client',
        description: 'Create TypeScript interfaces and request functions from the specification.',
      },
      {
        toolSlug: 'graphql-to-typescript',
        title: 'Type the GraphQL layer',
        description: 'Convert GraphQL SDL types into TypeScript interfaces for resolvers or clients.',
      },
      {
        toolSlug: 'protobuf-to-json-schema',
        title: 'Bridge gRPC and JSON',
        description: 'Convert proto3 messages to JSON Schema for systems that exchange JSON.',
      },
      {
        toolSlug: 'json-schema-validator',
        title: 'Test real payloads',
        description: 'Validate real messages against the converted schema to catch mapping differences.',
      },
    ],
  },
  {
    slug: 'orm-schema',
    title: 'ORM Schema & Model Generators: Prisma, Drizzle, SQLAlchemy',
    shortTitle: 'ORM Schemas',
    description:
      'Convert SQL DDL into Prisma, Drizzle, SQLAlchemy, Django, GORM, and TypeScript models, turn Prisma schemas back into SQL, and generate seed scripts and table DDL.',
    intro:
      'Use these converters when an existing database schema needs to become ORM models, or when ORM models need to become SQL.',
    introParagraphs: [
      'Most applications describe their database twice: once as SQL tables and once as models in an ORM. Keeping those descriptions consistent is tedious when you adopt an ORM on an existing database, move between frameworks, or review a migration an ORM generated for you. This collection converts CREATE TABLE statements into models for the ORM your stack uses, including Prisma and Drizzle for TypeScript, SQLAlchemy 2.0 and Django for Python, and GORM for Go, as well as plain TypeScript types for query results.',
      'The conversion also runs the other way. Prisma schemas can be turned into SQL DDL so you can review exactly which tables, constraints, and indexes a model implies, and JSON samples can be converted into CREATE TABLE statements when a new table starts from API data. The seed script generator creates prisma/seed.ts files for repeatable development data, and the identifier slugifier converts labels into valid snake_case table and column names. Generated models cannot know every relation name, default, or database-specific type, so compare them with your migration history before committing.',
    ],
    searchIntents: ['sql to prisma', 'sql to drizzle', 'sql to sqlalchemy', 'prisma to sql'],
    toolSlugs: [
      'json-to-sql-ddl',
      'sql-to-prisma',
      'sql-to-drizzle',
      'sql-to-orm-schema',
      'sql-to-python-sqlalchemy',
      'sql-to-django',
      'sql-to-go-gorm',
      'sql-to-typescript',
      'prisma-to-sql',
      'prisma-seed-generator',
      'sql-slugifier',
    ],
    workflowSteps: [
      {
        toolSlug: 'json-to-sql-ddl',
        title: 'Draft the table',
        description: 'Infer column types from sample data and adjust keys, constraints, and nullability.',
      },
      {
        toolSlug: 'sql-to-prisma',
        title: 'Generate ORM models',
        description: 'Convert the DDL into Prisma models, or use the Drizzle, SQLAlchemy, Django, or GORM converter for your stack.',
      },
      {
        toolSlug: 'prisma-to-sql',
        title: 'Review the resulting SQL',
        description: 'Turn the model back into DDL to confirm the tables, indexes, and constraints are what you expect.',
      },
      {
        toolSlug: 'prisma-seed-generator',
        title: 'Seed development data',
        description: 'Generate a seed script so every developer starts from the same test records.',
      },
    ],
  },
  {
    slug: 'nosql-databases',
    title: 'MongoDB, Redis, Elasticsearch & NoSQL Tools',
    shortTitle: 'NoSQL Databases',
    description:
      'Build MongoDB aggregation pipelines, convert SQL and MongoDB queries, parse ObjectIds, generate Redis commands and Lua scripts, and write Elasticsearch queries.',
    intro:
      'Use these tools when working with document stores, key-value caches, search engines, and analytical databases.',
    introParagraphs: [
      "Non-relational databases trade SQL's single query language for specialized APIs, and developers who know SQL well often need a bridge. This collection provides one. Convert SQL SELECT statements into MongoDB find() filters, or MongoDB filters back into SQL, to check that two implementations select the same records. Build multi-stage aggregation pipelines with $match, $group, and $sort, and parse ObjectIds to read the creation timestamp embedded in every default MongoDB identifier.",
      'For Redis, generate CLI commands for hashes, sets, sorted sets, lists, and expirations, and create Lua scripts for operations that must be atomic, such as token-bucket rate limiters and locks. The Elasticsearch builder produces boolean Query DSL with filters, and the ClickHouse generator creates MergeTree table definitions for analytical workloads. Data often moves between these systems as newline-delimited JSON or nested documents, so the NDJSON converter and JSON flattener help reshape exports. Query semantics differ between engines, especially around missing fields and nulls, so test converted queries against real data.',
    ],
    searchIntents: ['mongodb aggregation builder', 'sql to mongodb', 'redis lua script', 'elasticsearch query builder'],
    toolSlugs: [
      'sql-to-mongodb',
      'mongodb-to-sql',
      'mongodb-aggregate-builder',
      'mongodb-objectid-parser',
      'redis-command-generator',
      'redis-lua-script-generator',
      'elasticsearch-query-builder',
      'clickhouse-ddl-generator',
      'ndjson-to-json',
      'json-flatten-unflatten',
    ],
    workflowSteps: [
      {
        toolSlug: 'sql-to-mongodb',
        title: 'Translate a known query',
        description: 'Convert a familiar SQL SELECT into a MongoDB filter to get a correct starting point.',
      },
      {
        toolSlug: 'mongodb-aggregate-builder',
        title: 'Build the aggregation',
        description: 'Add $match, $group, and $sort stages and keep $match early so it can use indexes.',
      },
      {
        toolSlug: 'mongodb-objectid-parser',
        title: 'Check document age',
        description: 'Read the timestamp inside ObjectIds when debugging ordering or data retention.',
      },
      {
        toolSlug: 'redis-lua-script-generator',
        title: 'Make cache updates atomic',
        description: 'Generate a Lua script for operations such as rate limiting that must not interleave.',
      },
    ],
  },
  {
    slug: 'css-effects',
    title: 'CSS Effects, Shadows & Shape Generators',
    shortTitle: 'CSS Effects',
    description:
      'Generate CSS box and text shadows, glassmorphism and neumorphism cards, gradients, mesh backgrounds, clip-path shapes, blobs, triangles, ribbons, and patterns.',
    intro:
      'Use these visual generators to design decorative CSS effects and copy production-ready declarations.',
    introParagraphs: [
      'Decorative CSS is easier to tune visually than by editing numbers in a stylesheet. Shadows need several layers to look natural, gradients depend on color stops and angles, and shapes built with clip-path or border-radius involve coordinates that are hard to picture. This collection provides a live preview for each of those effects and outputs plain CSS you can paste into a component. Build layered box shadows and 3D elevation, text shadows and glow effects, and filters such as blur, contrast, and grayscale.',
      'Surface styles are covered by the glassmorphism, claymorphism, and neumorphism generators, which combine backdrop filters, transparency, and shadows. Backgrounds can use linear and radial gradients, multi-point mesh gradients, and repeating patterns, and SVG wave dividers separate page sections. For shapes, design clip-path polygons, eight-point border radius and blobs, CSS triangles, speech bubbles, ribbons, and isometric grids. Custom scrollbars round out the set. Check every effect for contrast and performance: large blurred backdrops and many layered shadows can be expensive on low-end devices.',
    ],
    searchIntents: ['css box shadow generator', 'glassmorphism css', 'clip path generator', 'css gradient generator'],
    toolSlugs: [
      'css-gradient',
      'css-mesh-gradient',
      'css-pattern-generator',
      'css-box-shadow',
      'css-3d-box-shadow-generator',
      'css-text-shadow',
      'css-filter-generator',
      'css-glassmorphism',
      'css-glassmorphism-claymorphism',
      'css-neumorphism',
      'css-clip-path',
      'css-border-radius',
      'css-blob-generator',
      'css-triangle-generator',
      'css-triangle-bubble-generator',
      'css-ribbon-banner-generator',
      'css-isometric-grid-generator',
      'css-scrollbar-generator',
      'svg-wavy-divider-generator',
    ],
    workflowSteps: [
      {
        toolSlug: 'css-gradient',
        title: 'Set the background',
        description: 'Choose gradient stops and an angle for the surface behind the component.',
      },
      {
        toolSlug: 'css-box-shadow',
        title: 'Add depth',
        description: 'Layer soft shadows to separate the element from the background.',
      },
      {
        toolSlug: 'css-glassmorphism',
        title: 'Style the surface',
        description: 'Tune blur and transparency for a frosted-glass card and check text contrast on top of it.',
      },
      {
        toolSlug: 'css-clip-path',
        title: 'Shape the edges',
        description: 'Use a clip-path polygon for angled or custom-shaped sections.',
      },
    ],
  },
  {
    slug: 'css-layout-animation',
    title: 'CSS Layout, Responsive Design & Animation Tools',
    shortTitle: 'CSS Layout & Motion',
    description:
      'Build CSS Grid areas and flexbox layouts, write media queries, calculate fluid clamp() type, convert px to rem, check breakpoints, and design keyframes and easing.',
    intro:
      'Use these tools to plan responsive layouts, fluid sizing, and motion with standard CSS.',
    introParagraphs: [
      'Responsive layout in modern CSS rests on a few mechanisms: Grid and Flexbox for arranging content, media queries for changing that arrangement at breakpoints, and relative units with clamp() for sizes that scale smoothly between them. This collection helps with each one. Generate grid templates visually or name regions with grid-template-areas, and build flexbox alignment rules without memorizing every property combination. The media query builder produces range syntax and preference queries such as prefers-color-scheme and prefers-reduced-motion, and the viewport inspector shows common screen sizes and breakpoints.',
      'For sizing, convert pixel values to rem and em so text respects user font settings, and calculate clamp() expressions for fluid typography and spacing across a viewport range; the aspect ratio calculator keeps media proportional. Motion is the final layer: generate preset animations, build multi-step @keyframes timelines, and design cubic-bezier easing curves with a live preview. Respect prefers-reduced-motion for users who disable animation, and test layouts with real content lengths rather than placeholder text.',
    ],
    searchIntents: ['css grid template areas', 'fluid typography clamp', 'px to rem', 'cubic bezier generator'],
    toolSlugs: [
      'css-grid-generator',
      'css-grid-area-builder',
      'css-flexbox-generator',
      'css-media-query-builder',
      'viewport-size-tester',
      'px-to-rem',
      'css-clamp',
      'css-clamp-calculator',
      'fluid-typography',
      'aspect-ratio-calculator',
      'css-animation-generator',
      'css-keyframes-generator',
      'css-cubic-bezier',
    ],
    workflowSteps: [
      {
        toolSlug: 'css-grid-area-builder',
        title: 'Lay out the page regions',
        description: 'Name the header, sidebar, main, and footer areas in a grid template.',
      },
      {
        toolSlug: 'css-media-query-builder',
        title: 'Adapt at breakpoints',
        description: 'Write range-syntax media queries that rearrange the grid for narrower screens.',
      },
      {
        toolSlug: 'fluid-typography',
        title: 'Scale type smoothly',
        description: 'Calculate clamp() values so headings grow between a minimum and maximum size.',
      },
      {
        toolSlug: 'css-keyframes-generator',
        title: 'Add motion',
        description: 'Build keyframe animations for transitions that support the content.',
      },
      {
        toolSlug: 'css-cubic-bezier',
        title: 'Tune the easing',
        description: 'Adjust the timing curve so the motion feels natural, and disable it under prefers-reduced-motion.',
      },
    ],
  },
  {
    slug: 'tailwind-css',
    title: 'Tailwind CSS Converters, Palettes & Migration Tools',
    shortTitle: 'Tailwind CSS',
    description:
      'Convert CSS to Tailwind and back, migrate v3 configs to v4, sort classes, generate OKLCH palettes, spacing scales, and shadcn/ui themes, and inline styles for email.',
    intro:
      'Use this collection while adopting Tailwind CSS, migrating between versions, or building a design token system around it.',
    introParagraphs: [
      'Tailwind CSS moves styling into utility classes, which changes the everyday tasks: converting existing CSS into class lists, keeping long class attributes readable, and defining the design tokens those classes use. This collection covers those tasks. Convert CSS declarations into Tailwind utilities, including box shadows and grid templates that need arbitrary values, and convert utilities back into plain CSS when you need to see exactly what a class produces. The class sorter orders and deduplicates class lists following the official Prettier plugin order, and HTML can be converted into JSX with className and Tailwind classes in one step.',
      "Tailwind CSS v4 moves configuration from tailwind.config.js into CSS with @theme, and the v3 to v4 migrator helps translate an existing configuration. Build design tokens with the OKLCH palette generator for v4, 50 to 950 color scales, custom spacing scales, mesh gradient backgrounds, and CSS variables for shadcn/ui themes. The viewport inspector shows Tailwind's default breakpoints. For HTML email, where many clients ignore stylesheets, the inline converter turns utility classes into style attributes. Review generated arbitrary values, which bypass your design scale.",
    ],
    searchIntents: ['css to tailwind', 'tailwind v4 migration', 'tailwind class sorter', 'tailwind color palette generator'],
    toolSlugs: [
      'css-to-tailwind',
      'tailwind-to-css',
      'css-box-shadow-to-tailwind',
      'css-grid-to-tailwind',
      'tailwind-class-sorter',
      'html-to-jsx-tailwind',
      'tailwind-v3-to-v4-migrator',
      'tailwind-v4-color-palette',
      'color-palette-generator',
      'tailwind-spacing-generator',
      'tailwind-v4-mesh-gradient-generator',
      'shadcn-theme-generator',
      'viewport-size-tester',
      'tailwind-to-inline-css',
    ],
    workflowSteps: [
      {
        toolSlug: 'tailwind-v3-to-v4-migrator',
        title: 'Migrate the configuration',
        description: 'Translate theme settings from tailwind.config.js into v4 @theme CSS variables.',
      },
      {
        toolSlug: 'css-to-tailwind',
        title: 'Convert existing styles',
        description: 'Turn legacy CSS rules into utility classes and replace arbitrary values with scale tokens where possible.',
      },
      {
        toolSlug: 'tailwind-class-sorter',
        title: 'Keep class lists readable',
        description: 'Sort and deduplicate classes so diffs stay small and consistent.',
      },
      {
        toolSlug: 'tailwind-to-inline-css',
        title: 'Export for email',
        description: 'Inline utility classes as style attributes for HTML email templates.',
      },
    ],
  },
  {
    slug: 'color-accessibility',
    title: 'Color Palette, Contrast & Accessibility Tools',
    shortTitle: 'Color & Accessibility',
    description:
      'Convert HEX, RGB, and HSL colors, generate harmonies, Tailwind and OKLCH scales, and shadcn/ui themes, check WCAG and APCA contrast, and simulate color blindness.',
    intro:
      'Use these tools to build a color system and verify that text and interface colors stay readable for everyone.',
    introParagraphs: [
      'A color system has to satisfy two different goals: it should look coherent, and it must stay readable for people with low vision or color vision deficiencies. This collection supports both. Extract dominant colors from a logo or screenshot, convert values between HEX, RGB, and HSL, and generate complementary, analogous, or triadic harmonies from a base color. From there, build full 50 to 950 shade scales, OKLCH palettes for Tailwind CSS v4, or CSS variables for shadcn/ui themes so the same tokens drive every component.',
      'Accessibility checks should happen while the palette is still easy to change. The contrast checker measures text and background pairs against WCAG 2 thresholds, which at level AA are 4.5:1 for normal text and 3:1 for large text, and the WCAG and APCA calculator adds the newer APCA perceptual contrast model for comparison. The color blindness simulator shows how an interface appears with protanopia, deuteranopia, or tritanopia, which helps you avoid conveying meaning through color alone. Test final combinations in the real interface, including hover, disabled, and dark-mode states.',
    ],
    searchIntents: ['color contrast checker', 'color palette generator', 'hex to rgb', 'color blindness simulator'],
    toolSlugs: [
      'image-color-extractor',
      'color-converter',
      'color-harmony-generator',
      'color-palette-generator',
      'tailwind-v4-color-palette',
      'shadcn-theme-generator',
      'color-contrast-checker',
      'contrast-ratio-apca-calculator',
      'color-blindness-simulator',
    ],
    workflowSteps: [
      {
        toolSlug: 'image-color-extractor',
        title: 'Start from brand colors',
        description: 'Extract the dominant colors from a logo or reference image.',
      },
      {
        toolSlug: 'color-harmony-generator',
        title: 'Build supporting colors',
        description: 'Generate harmonies around the base color for accents and states.',
      },
      {
        toolSlug: 'color-contrast-checker',
        title: 'Check text contrast',
        description: 'Verify every text and background pair meets the WCAG level you target.',
      },
      {
        toolSlug: 'color-blindness-simulator',
        title: 'Simulate color vision deficiencies',
        description: 'Confirm that status colors and charts remain distinguishable without relying on hue alone.',
      },
    ],
  },
  {
    slug: 'formatters-minifiers',
    title: 'Code Formatters, Beautifiers & Minifiers',
    shortTitle: 'Formatters & Minifiers',
    description:
      'Format and minify JSON, HTML, CSS, JavaScript, SQL, XML, and SVG, and beautify TOML, GraphQL, Protobuf, Docker Compose, Nginx, Apache, Terraform, and package.json.',
    intro:
      'Use these tools to make code readable for review or compact for production, one file at a time.',
    introParagraphs: [
      'Formatting and minification are opposite operations with the same goal: making code fit its audience. People need consistent indentation and line breaks to review changes, while browsers and APIs benefit from smaller payloads without comments and whitespace. This collection gathers a formatter or minifier for most file types a web developer touches. Beautify JSON, HTML, XML, and SQL copied from logs or network panels, and minify JSON, HTML, CSS, JavaScript, SQL, and SVG when you need a compact version for an embed, a payload, or a quick size comparison.',
      'Configuration files have their own formatters here: TOML, Docker Compose YAML, Nginx and Apache virtual hosts, Terraform HCL, GraphQL documents, Protobuf definitions, and package.json files with sorted dependencies. Consistent formatting makes diffs smaller and code review faster, and it often exposes structural mistakes such as a misplaced brace or an indentation error. For whole projects, prefer the formatter integrated into your editor and CI, such as Prettier, gofmt, or terraform fmt, and use these tools for one-off files and snippets. Keep readable sources in version control; minified output is a build artifact.',
    ],
    searchIntents: ['code beautifier online', 'html minifier', 'xml formatter', 'js minifier'],
    toolSlugs: [
      'json-formatter',
      'json-minifier',
      'html-formatter',
      'html-minifier',
      'css-minifier',
      'js-minifier',
      'sql-formatter',
      'sql-minifier',
      'xml-formatter',
      'svg-minifier',
      'toml-formatter',
      'graphql-query-formatter',
      'protobuf-formatter',
      'docker-compose-formatter',
      'nginx-formatter',
      'apache-conf-formatter',
      'terraform-formatter',
      'package-json-formatter',
    ],
    workflowSteps: [
      {
        toolSlug: 'html-formatter',
        title: 'Make the markup readable',
        description: 'Beautify the HTML to review structure and spot unclosed or misplaced elements.',
      },
      {
        toolSlug: 'css-minifier',
        title: 'Minify styles',
        description: 'Remove whitespace and comments from the final CSS and compare the byte savings.',
      },
      {
        toolSlug: 'js-minifier',
        title: 'Minify scripts',
        description: 'Compress inline or standalone JavaScript for embeds where no build step exists.',
      },
      {
        toolSlug: 'html-minifier',
        title: 'Minify the page',
        description: 'Minify the finished HTML and test the result, since whitespace matters in some inline content.',
      },
    ],
  },
  {
    slug: 'svg-icons',
    title: 'SVG Optimization, Conversion & Icon Tools',
    shortTitle: 'SVG & Icons',
    description:
      'Optimize SVG, inspect path data, convert SVG to React, React Native, SwiftUI, Android vector drawables, CSS data URIs, PNG, and WebP, and generate favicons.',
    intro:
      'Use these tools to clean SVG exports and deliver the same vector artwork to web, mobile, and CSS.',
    introParagraphs: [
      'SVG files exported from design tools usually contain editor metadata, redundant groups, and overly precise coordinates that add bytes without changing the image. This collection starts by cleaning that up: the SVG optimizers remove metadata, simplify paths, and report the size saved, and the path visualizer shows how each command in a d attribute draws the shape, which helps when an icon renders incorrectly. From an optimized file, the same artwork can be delivered to every platform your product targets.',
      'For React, convert SVG markup into JSX components, or into react-native-svg components for mobile. Native apps can use Android Vector Drawable XML or SwiftUI Path and Shape code. In CSS, inline icons as URL-encoded or Base64 data URIs for background-image and mask-image rules. When a raster format is required, render SVG to high-resolution PNG, JPEG, or WebP, and generate favicon sizes, Apple touch icons, and manifest link tags. Placeholder images, blob shapes, and wave dividers are generated as SVG too. Test converted icons at small sizes, where stroke widths and alignment issues become visible.',
    ],
    searchIntents: ['svg optimizer', 'svg to jsx', 'svg to png', 'svg to android vector drawable'],
    toolSlugs: [
      'svg-optimizer',
      'svg-minifier',
      'svg-path-visualizer',
      'svg-to-jsx',
      'svg-to-react-native',
      'svg-to-android-vector',
      'svg-to-swiftui-shape',
      'svg-to-css',
      'svg-to-css-data-uri',
      'svg-to-webp',
      'svg-to-png',
      'svg-to-png-hd',
      'favicon-generator',
      'svg-placeholder-generator',
      'css-blob-generator',
      'svg-wavy-divider-generator',
    ],
    workflowSteps: [
      {
        toolSlug: 'svg-optimizer',
        title: 'Clean the export',
        description: 'Remove editor metadata and simplify paths, then compare the rendered result.',
      },
      {
        toolSlug: 'svg-path-visualizer',
        title: 'Inspect problem paths',
        description: 'Step through path commands to fix shapes that render incorrectly.',
      },
      {
        toolSlug: 'svg-to-jsx',
        title: 'Use it in React',
        description: 'Convert the SVG into a component with props for size and color.',
      },
      {
        toolSlug: 'svg-to-css-data-uri',
        title: 'Inline it in CSS',
        description: 'Encode small icons as data URIs for backgrounds and masks.',
      },
      {
        toolSlug: 'favicon-generator',
        title: 'Generate site icons',
        description: 'Create favicon sizes, touch icons, and link tags from the final artwork.',
      },
    ],
  },
  {
    slug: 'number-bases',
    title: 'Number Base, Binary & Developer Math Tools',
    shortTitle: 'Number Bases & Math',
    description:
      'Convert binary, octal, decimal, and hex, run bitwise operations, inspect IEEE 754 floats, view hex dumps, and calculate big integers, chmod modes, and percentages.',
    intro:
      'Use these calculators when debugging bit flags, binary data, floating-point precision, or numeric edge cases.',
    introParagraphs: [
      "Low-level bugs often come down to how a number is represented rather than its value: a flag stored in the wrong bit, a byte order reversed, a float that cannot represent 0.1 exactly, or an integer that silently exceeds JavaScript's safe range. This collection makes those representations visible. Convert values between binary, octal, decimal, and hexadecimal, view text as a classic hex dump with offsets, and encode text as binary or hex. The bitwise calculator performs AND, OR, XOR, NOT, and shifts on 32-bit values and shows the binary result, which is useful for permission masks and protocol flags.",
      'The IEEE 754 tools break a 32-bit float into sign, exponent, and mantissa bits and convert floats to their hex representation, which explains many rounding surprises. Arbitrary-precision arithmetic avoids overflow when working with large IDs or token amounts. Binary Coded Decimal appears in hardware and legacy formats, and the chmod calculator translates Unix permissions between octal and symbolic notation. Roman numerals, matrix operations, and percentage change calculations cover everyday math that shows up in interface labels, graphics code, and dashboards.',
    ],
    searchIntents: ['number base converter', 'bitwise calculator', 'ieee 754 converter', 'chmod calculator'],
    toolSlugs: [
      'number-base-converter',
      'multi-radix-converter',
      'binary-encoder',
      'hex-encoder',
      'hex-dump-viewer',
      'bitwise-calculator',
      'ieee754-visualizer',
      'ieee754-hex-float-converter',
      'bcd-binary-coded-decimal-converter',
      'bignumber-calculator',
      'chmod-calculator',
      'roman-numeral-converter',
      'matrix-calculator',
      'percentage-growth-calculator',
    ],
    workflowSteps: [
      {
        toolSlug: 'number-base-converter',
        title: 'Read the raw value',
        description: 'Convert the value from logs or a debugger into binary and hexadecimal.',
      },
      {
        toolSlug: 'bitwise-calculator',
        title: 'Test the flags',
        description: 'Apply masks and shifts to confirm which bits are set.',
      },
      {
        toolSlug: 'ieee754-visualizer',
        title: 'Explain float precision',
        description: 'Inspect sign, exponent, and mantissa when a decimal value is stored inexactly.',
      },
      {
        toolSlug: 'hex-dump-viewer',
        title: 'Inspect byte layout',
        description: 'View the data as a hex dump to check offsets, encodings, and byte order.',
      },
    ],
  },
  {
    slug: 'llm-tokens-costs',
    title: 'LLM Token Counters & AI Cost Calculators',
    shortTitle: 'LLM Tokens & Costs',
    description:
      'Count tokens for OpenAI, Claude, and DeepSeek models, visualize BPE tokenization, compare model costs, estimate embedding spend, and shrink prompts to fit context.',
    intro:
      'Use these tools to estimate context usage and API spend before a prompt or pipeline reaches production.',
    introParagraphs: [
      "Language models are billed and limited by tokens, not characters or words, and different models tokenize the same text differently. A prompt that fits comfortably in one model's context can overflow another's, and a small change to a system prompt that is sent on every request multiplies across all traffic. This collection makes those numbers visible before they appear on an invoice. Visualize how a BPE tokenizer splits your text, count tokens for OpenAI, Claude, and DeepSeek models, and compare counts and prices across several providers side by side.",
      'The pricing calculator turns expected request volume into a monthly estimate, and the embedding calculators do the same for vector indexing, including dimensions and storage. When a prompt is too long, the context window optimizer strips comments, docstrings, and extra whitespace from pasted code and text. The sampling visualizer explains how temperature, top-p, and top-k reshape the token probability distribution, which affects output variability rather than cost. Token counts from these tools are estimates, and prices change frequently, so confirm current rates with each provider.',
    ],
    searchIntents: ['llm token counter', 'claude token counter', 'tiktoken visualizer', 'llm cost comparison'],
    toolSlugs: [
      'tiktoken-visualizer',
      'llm-token-counter',
      'claude-token-counter',
      'deepseek-token-counter',
      'multi-llm-token-comparator',
      'llm-pricing-calculator',
      'embedding-cost-calculator',
      'embedding-token-cost-estimator',
      'llm-context-window-shrinker',
      'sampling-curve-visualizer',
    ],
    workflowSteps: [
      {
        toolSlug: 'tiktoken-visualizer',
        title: 'See how text tokenizes',
        description: 'Inspect token boundaries for your real prompt, including code and non-English text.',
      },
      {
        toolSlug: 'multi-llm-token-comparator',
        title: 'Compare models',
        description: 'Count tokens and estimated cost for the same prompt across several providers.',
      },
      {
        toolSlug: 'llm-context-window-shrinker',
        title: 'Trim the prompt',
        description: 'Remove comments and whitespace that consume tokens without adding information.',
      },
      {
        toolSlug: 'llm-pricing-calculator',
        title: 'Project the monthly cost',
        description: 'Multiply per-request tokens by expected traffic to estimate spend.',
      },
    ],
  },
  {
    slug: 'prompt-engineering',
    title: 'Prompt Engineering & System Prompt Tools',
    shortTitle: 'Prompt Engineering',
    description:
      'Build XML-structured system prompts and few-shot and chain-of-thought templates, convert ChatML, Anthropic, and Llama 3 formats, and diff prompt versions.',
    intro:
      'Use this collection to structure, version, and compare prompts as carefully as the code that sends them.',
    introParagraphs: [
      'Prompts behave like code: small wording changes alter output, and without structure and version control it becomes hard to explain why a model started responding differently. This collection treats prompts as artifacts you design, test, and review. Build system prompts with clear sections for role, rules, and output format, or with XML tags that separate instructions from context, a structure that both Claude and OpenAI models handle well. Template formatters keep variables explicit so the same prompt can be reused with different inputs.',
      'Few-shot builders format demonstration pairs with consistent delimiters, and the chain-of-thought builder scaffolds step-by-step reasoning for complex tasks. For agents, the prompt optimizer organizes persona, goals, constraints, and tool-use rules. When switching providers or self-hosting, the format converter translates chat messages between ChatML, Anthropic, and Llama 3 templates. The prompt diff compares two revisions, including token deltas, so reviews focus on what changed, and the context optimizer and sampling visualizer help with length and output variability. Evaluate prompt changes against a fixed set of test inputs before shipping them.',
    ],
    searchIntents: ['system prompt builder', 'few shot prompt template', 'chatml converter', 'prompt diff'],
    toolSlugs: [
      'system-prompt-xml-builder',
      'system-prompt-formatter',
      'prompt-template-formatter',
      'llm-few-shot-prompt-formatter',
      'cot-chain-of-thought-prompt-builder',
      'ai-agent-prompt-optimizer',
      'prompt-format-converter',
      'prompt-diff',
      'llm-context-window-shrinker',
      'sampling-curve-visualizer',
    ],
    workflowSteps: [
      {
        toolSlug: 'system-prompt-xml-builder',
        title: 'Structure the system prompt',
        description: 'Separate role, instructions, context, and output format into clearly labeled sections.',
      },
      {
        toolSlug: 'llm-few-shot-prompt-formatter',
        title: 'Add examples',
        description: 'Include a few input and output pairs that demonstrate the expected format and edge cases.',
      },
      {
        toolSlug: 'prompt-diff',
        title: 'Review each revision',
        description: 'Diff the new prompt against the previous version and note token changes.',
      },
      {
        toolSlug: 'prompt-format-converter',
        title: 'Port to another model',
        description: 'Convert the conversation into the chat template the target model expects.',
      },
    ],
  },
  {
    slug: 'ai-agents-rag',
    title: 'AI Agents, Function Calling, MCP & RAG Tools',
    shortTitle: 'AI Agents & RAG',
    description:
      'Build OpenAI, Claude, and Gemini tool schemas and structured outputs, inspect MCP messages, scaffold LangGraph state, chunk RAG documents, and compare embeddings.',
    intro:
      'Use these tools while wiring models to tools, protocols, and retrieval systems.',
    introParagraphs: [
      'Agents and retrieval-augmented applications connect a model to the rest of your system, and most integration bugs live in the contracts between them: a tool schema the model misreads, a structured output that does not validate, a protocol message with the wrong shape, or retrieval chunks that split the relevant sentence in half. This collection focuses on those contracts. Build function and tool definitions for OpenAI, Claude, and Gemini, generate strict structured-output schemas, and create Anthropic input_schema objects without hand-writing nested JSON Schema.',
      'For protocols and frameworks, inspect Model Context Protocol JSON-RPC requests and responses, generate LangGraph state definitions, convert chat logs into Vercel AI SDK messages, turn cURL calls into official SDK code, and write Ollama Modelfiles for local models. Retrieval quality depends on chunking and similarity: split documents with configurable overlap, visualize chunk boundaries and costs, and compute cosine similarity, Euclidean distance, and dot product between embedding vectors. The JSONL validator checks fine-tuning datasets. Evaluate every change against real queries, since retrieval and tool selection are hard to predict.',
    ],
    searchIntents: ['function calling schema builder', 'mcp inspector', 'rag chunking visualizer', 'cosine similarity calculator'],
    toolSlugs: [
      'llm-function-calling-builder',
      'openai-function-schema',
      'openai-structured-outputs',
      'anthropic-tool-builder',
      'mcp-inspector',
      'langgraph-state-generator',
      'vercel-ai-core-message-converter',
      'curl-to-ai-sdk',
      'ollama-modelfile-generator',
      'text-chunk-splitter',
      'rag-chunking-calculator',
      'rag-chunking-visualizer',
      'embedding-similarity',
      'jsonl-dataset-validator',
    ],
    workflowSteps: [
      {
        toolSlug: 'llm-function-calling-builder',
        title: 'Define the tools',
        description: 'Describe each tool with a precise name, description, and parameter schema.',
      },
      {
        toolSlug: 'openai-structured-outputs',
        title: 'Constrain the output',
        description: 'Require a strict JSON Schema for responses your code parses.',
      },
      {
        toolSlug: 'mcp-inspector',
        title: 'Check protocol messages',
        description: 'Validate MCP JSON-RPC requests and responses when a tool server misbehaves.',
      },
      {
        toolSlug: 'rag-chunking-visualizer',
        title: 'Tune chunking',
        description: 'Adjust chunk size and overlap until relevant passages stay intact.',
      },
      {
        toolSlug: 'embedding-similarity',
        title: 'Test retrieval similarity',
        description: 'Compare query and chunk embeddings to understand why a passage was or was not retrieved.',
      },
    ],
  },
  {
    slug: 'web-servers',
    title: 'Nginx, Apache & Caddy Web Server Configuration Tools',
    shortTitle: 'Web Servers',
    description:
      'Generate hardened Nginx and Caddy configs, convert .htaccess and Nginx rules, plan rate limits, create htpasswd files, and check security, CSP, and cache headers.',
    intro:
      'Use this collection when configuring, migrating, or hardening the web server or reverse proxy in front of your application.',
    introParagraphs: [
      'The web server or reverse proxy in front of an application handles TLS, redirects, compression, caching, rate limiting, and security headers, so its configuration decides much of how the application behaves in production. This collection helps you write that configuration and move it between servers. Generate a hardened Nginx server block with TLS 1.3 and HSTS, or a production Caddyfile with automatic HTTPS and reverse proxying. Migration tools convert Apache .htaccess rewrite rules to Nginx, Nginx locations to Caddy and Apache, and Caddy configuration to Nginx, while the formatters tidy existing Nginx and Apache files.',
      'Rate limiting protects upstream services: the token-bucket calculator helps you reason about burst size and refill rate, and the Nginx builder turns those numbers into limit_req_zone directives. Create .htpasswd entries for HTTP Basic Auth on staging sites. Security and caching headers are configured at this layer too, so build a Content Security Policy, check Cache-Control directives, and analyze the resulting response headers. Always validate with nginx -t, apachectl configtest, or caddy validate, and reload gracefully rather than restarting under load.',
    ],
    searchIntents: ['htaccess to nginx', 'nginx security config', 'nginx rate limit', 'caddyfile generator'],
    toolSlugs: [
      'nginx-security-conf-generator',
      'nginx-formatter',
      'caddyfile-production-generator',
      'htaccess-to-nginx',
      'nginx-to-caddy-converter',
      'caddy-to-nginx',
      'apache-conf-formatter',
      'api-rate-limit-cost-calculator',
      'nginx-rate-limit-calculator',
      'htpasswd-generator',
      'csp-builder',
      'cache-control',
      'http-security-headers-analyzer',
    ],
    workflowSteps: [
      {
        toolSlug: 'htaccess-to-nginx',
        title: 'Migrate existing rules',
        description: 'Convert Apache rewrite rules and redirects into Nginx location blocks and review each result.',
      },
      {
        toolSlug: 'nginx-security-conf-generator',
        title: 'Harden the server block',
        description: 'Generate TLS, HSTS, and header settings for the site.',
      },
      {
        toolSlug: 'api-rate-limit-cost-calculator',
        title: 'Plan rate limits',
        description: 'Choose burst and refill values that match the capacity of your upstream service.',
      },
      {
        toolSlug: 'nginx-rate-limit-calculator',
        title: 'Apply the limits',
        description: 'Generate limit_req_zone and limit_req directives from those values.',
      },
      {
        toolSlug: 'http-security-headers-analyzer',
        title: 'Check the response headers',
        description: 'Analyze the final headers after deployment to confirm nothing was overridden.',
      },
    ],
  },
  {
    slug: 'infrastructure-as-code',
    title: 'Terraform, Policy & Infrastructure as Code Tools',
    shortTitle: 'Infrastructure as Code',
    description:
      'Scaffold and format Terraform modules, convert HCL to JSON and YAML, build AWS IAM and OPA Rego policies, and generate Cloudflare Wrangler and Ansible files.',
    intro:
      'Use these tools to write, convert, and review infrastructure and access policies as code.',
    introParagraphs: [
      'Infrastructure as code makes environments reviewable and repeatable, but it also means reading and writing several declarative languages. Terraform uses HCL, many tools expect JSON or YAML, and authorization policies have their own formats. This collection helps you move between them. Scaffold a Terraform module with a conventional file layout, keep it formatted, and convert HCL to terraform.tf.json syntax when another program needs to generate or read the configuration. HCL can also be converted to YAML, and YAML maps can become HCL locals and variables.',
      "Access control deserves the same review as the resources themselves. The AWS IAM policy builder helps you write least-privilege JSON statements with explicit actions and resources, and the OPA Rego builder generates role-based and attribute-based authorization policies for APIs and platforms. For edge deployments, generate wrangler.json files for Cloudflare Workers with KV and D1 bindings, and use the Ansible scaffolder when servers still need configuration after provisioning. Run terraform plan, policy tests, and your provider's validation before applying changes.",
    ],
    searchIntents: ['terraform hcl to json', 'yaml to hcl', 'opa rego policy', 'aws iam policy generator'],
    toolSlugs: [
      'terraform-module-scaffolder',
      'terraform-formatter',
      'terraform-hcl-to-json',
      'terraform-hcl-to-yaml',
      'yaml-to-terraform-hcl',
      'aws-iam-policy-builder',
      'opa-rego-policy-builder',
      'cloudflare-wrangler-builder',
      'ansible-playbook-scaffolder',
    ],
    workflowSteps: [
      {
        toolSlug: 'terraform-module-scaffolder',
        title: 'Structure the module',
        description: 'Create main, variables, and outputs files for a reusable module.',
      },
      {
        toolSlug: 'terraform-formatter',
        title: 'Format consistently',
        description: 'Normalize HCL formatting so reviews show only meaningful changes.',
      },
      {
        toolSlug: 'terraform-hcl-to-json',
        title: 'Integrate with other tooling',
        description: 'Convert HCL to JSON syntax when a script or pipeline needs to read or generate it.',
      },
      {
        toolSlug: 'aws-iam-policy-builder',
        title: 'Grant least privilege',
        description: 'Write IAM statements that allow only the actions and resources the workload needs.',
      },
      {
        toolSlug: 'opa-rego-policy-builder',
        title: 'Enforce policy as code',
        description: 'Express authorization rules in Rego and test them alongside the infrastructure.',
      },
    ],
  },
  {
    slug: 'project-config',
    title: 'Project Setup, Config Files & Dependency Tools',
    shortTitle: 'Project Setup',
    description:
      'Generate .editorconfig, Prettier, .gitignore, and license files, convert .env and JSON, sanitize secrets, sort package.json, and check SemVer ranges and licenses.',
    intro:
      'Use these generators when starting a repository or tidying the configuration files that every project accumulates.',
    introParagraphs: [
      'Every repository needs a set of small files that nobody wants to write from scratch: editor settings, formatter configuration, ignore rules, a license, and templates for issues and pull requests. Getting them right early prevents noisy diffs and accidental commits later. This collection generates those files. Create an .editorconfig for consistent indentation and line endings across editors, a Prettier configuration, a .gitignore for your stack, and MIT, Apache 2.0, or GPL license text with the correct copyright line, plus GitHub issue and pull request templates.',
      'Configuration and dependencies need ongoing care. Convert .env files to JSON and back, extract Compose environment variables into a template, and produce a .env.example with secrets stripped so onboarding does not require sharing real credentials. Sort and format package.json, check dependency licenses for compatibility, and evaluate SemVer ranges such as caret and tilde to understand which versions a manifest allows. The TOML formatter tidies configuration files, the Electron builder generates a starter main.js with secure window defaults, and the ASCII art generator creates README and CLI banners.',
    ],
    searchIntents: ['editorconfig generator', 'env to json', 'semver range checker', 'open source license generator'],
    toolSlugs: [
      'editorconfig-generator',
      'eslint-prettier-config',
      'gitignore-generator',
      'license-generator',
      'github-issue-pr-template-generator',
      'package-json-formatter',
      'package-json-license-checker',
      'semver-calculator',
      'semver-range-evaluator',
      'env-to-json',
      'json-to-env',
      'env-sanitizer',
      'docker-compose-env-generator',
      'toml-formatter',
      'electron-config-builder',
      'ascii-art-generator',
    ],
    workflowSteps: [
      {
        toolSlug: 'editorconfig-generator',
        title: 'Set editor conventions',
        description: 'Define indentation, charset, and line endings before the first commit.',
      },
      {
        toolSlug: 'eslint-prettier-config',
        title: 'Configure formatting',
        description: 'Generate a Prettier configuration so formatting is automatic rather than debated.',
      },
      {
        toolSlug: 'license-generator',
        title: 'Choose a license',
        description: 'Add the license text with the correct year and copyright holder.',
      },
      {
        toolSlug: 'package-json-license-checker',
        title: 'Review dependency licenses',
        description: 'Check that dependency licenses are compatible with how you distribute the project.',
      },
      {
        toolSlug: 'env-sanitizer',
        title: 'Share configuration safely',
        description: 'Create a .env.example with placeholder values instead of committing real secrets.',
      },
    ],
  },
  {
    slug: 'unique-ids',
    title: 'UUID, ULID, NanoID & Unique ID Generators',
    shortTitle: 'Unique IDs',
    description:
      'Generate UUID v4, v5, and v7, ULIDs, and NanoIDs, extract timestamps from UUIDv7 and ObjectIds, and create API keys, URL slugs, Crockford Base32, and MAC addresses.',
    intro:
      'Use these generators to choose an identifier format that fits your database, URLs, and ordering needs.',
    introParagraphs: [
      'Identifier choice affects database performance, URL design, and privacy more than it first appears. Random UUID v4 values are simple and collision-resistant but scatter inserts across a B-tree index. Time-ordered UUID v7 values and ULIDs keep new rows close together and sort by creation time, at the cost of revealing when a record was created. This collection lets you generate each format and compare them. The UUIDv7 extractor and ObjectId parser read the embedded timestamps, which is useful when debugging ordering or confirming what an ID discloses.',
      'Deterministic UUID v5 values are derived from a namespace and a name, so the same input always yields the same ID, which is handy for idempotent imports. NanoIDs are shorter and URL-friendly, and the custom alphabet generator lets you exclude ambiguous characters; Crockford Base32 serves a similar purpose for human-readable codes. For other identifiers, generate prefixed API keys, clean URL slugs, and test MAC addresses. Treat IDs as public: never rely on an identifier being unguessable unless it was generated with enough cryptographic randomness for that purpose.',
    ],
    searchIntents: ['uuid v7 generator', 'ulid generator', 'nanoid generator', 'uuid v5 generator'],
    toolSlugs: [
      'uuid-generator',
      'uuid-v7-generator',
      'uuid-v7-timestamp-extractor',
      'uuid-v5-generator',
      'ulid-generator',
      'nanoid-generator',
      'nanoid-custom-alphabet',
      'crockford-base32-encoder',
      'mongodb-objectid-parser',
      'api-key-generator',
      'slug-generator',
      'mac-address-generator',
    ],
    workflowSteps: [
      {
        toolSlug: 'uuid-v7-generator',
        title: 'Pick a time-ordered key',
        description: 'Generate UUID v7 values for primary keys that should sort by creation time.',
      },
      {
        toolSlug: 'uuid-v7-timestamp-extractor',
        title: 'Check what it reveals',
        description: 'Extract the timestamp from an ID to understand the information it exposes.',
      },
      {
        toolSlug: 'uuid-v5-generator',
        title: 'Use deterministic IDs for imports',
        description: 'Derive stable IDs from a namespace and natural key so re-running an import does not create duplicates.',
      },
      {
        toolSlug: 'nanoid-custom-alphabet',
        title: 'Create short public IDs',
        description: 'Generate compact IDs for URLs with an alphabet that avoids confusing characters.',
      },
    ],
  },
  {
    slug: 'test-data',
    title: 'Mock Data & Test Fixture Generators',
    shortTitle: 'Mock & Test Data',
    description:
      'Generate mock JSON datasets, Faker.js schemas, paginated API responses, webhook events, Luhn-valid test cards, SQL inserts, seed scripts, and placeholders.',
    intro:
      'Use these generators to build realistic fixtures for development, demos, and automated tests without copying production data.',
    introParagraphs: [
      'Good tests and demos need data that looks real without being real. Copying production records into development environments exposes personal information and couples tests to data that changes. This collection generates synthetic fixtures instead. Define a Faker.js schema for names, emails, dates, and avatars, or generate ready-made JSON datasets of users, products, and orders. The API mock generator wraps records in paginated response envelopes so a front end can be built before the backend exists, and the webhook simulator produces event payloads shaped like those from Stripe, GitHub, Slack, and Shopify.',
      'Some fields need specific formats to pass validation. Generate Luhn-valid card numbers intended only for payment provider test modes, JWTs with chosen claims, and UUIDs for primary keys. To load fixtures into a database, convert JSON or CSV into INSERT statements or generate a Prisma seed script so every developer starts with the same records. Lorem ipsum text and SVG placeholder images fill layouts before final content exists. Keep fixture generation in version control so tests stay reproducible.',
    ],
    searchIntents: ['mock data generator', 'fake json api response', 'test credit card numbers', 'faker js schema'],
    toolSlugs: [
      'faker-js-mock-schema-generator',
      'mock-data-generator',
      'api-mock-response-generator',
      'webhook-payload-simulator',
      'mock-credit-card-generator',
      'jwt-builder',
      'uuid-generator',
      'json-to-sql-insert',
      'prisma-seed-generator',
      'lorem-ipsum',
      'svg-placeholder-generator',
    ],
    workflowSteps: [
      {
        toolSlug: 'faker-js-mock-schema-generator',
        title: 'Describe the data',
        description: 'Define fields and types for the records your feature needs.',
      },
      {
        toolSlug: 'mock-data-generator',
        title: 'Generate a dataset',
        description: 'Produce a JSON dataset large enough to exercise pagination and edge cases.',
      },
      {
        toolSlug: 'api-mock-response-generator',
        title: 'Mock the API',
        description: 'Wrap records in the response envelope your front end expects, including pagination metadata.',
      },
      {
        toolSlug: 'json-to-sql-insert',
        title: 'Load the fixtures',
        description: 'Convert the dataset into INSERT statements for a local or test database.',
      },
    ],
  },
  {
    slug: 'text-processing',
    title: 'Text Processing, Cleanup & Unicode Tools',
    shortTitle: 'Text Processing',
    description:
      'Sort, deduplicate, and count lines, add prefixes and suffixes, split columns, convert case and slugs, escape regex, count UTF-8 bytes, and find hidden characters.',
    intro:
      'Use these utilities to clean and reshape lists, identifiers, and text before they reach code, queries, or databases.',
    introParagraphs: [
      'Text copied from spreadsheets, chat messages, and web pages often carries problems you cannot see: trailing spaces, duplicate lines, inconsistent casing, and invisible Unicode characters such as zero-width spaces that break string comparisons and identifiers. This collection helps you find and fix them. Detect and remove hidden characters, inspect code points and Unicode categories, and count UTF-8 bytes to check whether a string fits a VARCHAR or protocol limit; a single emoji can use four bytes.',
      'For list processing, sort lines, remove duplicates, or count how often each line appears to find the most frequent values in a log. Add prefixes, suffixes, quotes, or line numbers to every line when building SQL lists or configuration arrays, and split delimited text into columns. Identifiers can be converted between cases, turned from slugs into titles, or slugified into snake_case SQL names, and the regex escaper makes literal text safe to embed in a pattern. The word counter and text diff help check the final result.',
    ],
    searchIntents: ['remove duplicate lines', 'zero width character detector', 'utf-8 byte counter', 'add prefix to each line'],
    toolSlugs: [
      'text-obfuscator',
      'unicode-glyph-category-inspector',
      'string-byte-counter',
      'sort-lines',
      'remove-duplicates',
      'text-duplicate-line-counter',
      'text-prefix-suffix-appender',
      'text-column-tabular-splitter',
      'case-converter',
      'slug-to-title',
      'sql-slugifier',
      'regex-escape',
      'word-counter',
      'text-diff',
    ],
    workflowSteps: [
      {
        toolSlug: 'text-obfuscator',
        title: 'Remove hidden characters',
        description: 'Detect zero-width spaces and other invisible characters in pasted text.',
      },
      {
        toolSlug: 'sort-lines',
        title: 'Order the list',
        description: 'Sort lines so duplicates and gaps become easy to see.',
      },
      {
        toolSlug: 'text-duplicate-line-counter',
        title: 'Count repeated values',
        description: 'Rank lines by frequency to spot the most common entries.',
      },
      {
        toolSlug: 'text-prefix-suffix-appender',
        title: 'Format for the destination',
        description: 'Wrap each line in quotes and add commas to build an array or SQL list.',
      },
    ],
  },
  {
    slug: 'markdown-docs',
    title: 'Markdown, Documentation & Table Tools',
    shortTitle: 'Markdown & Docs',
    description:
      'Preview Markdown, convert between HTML and GitHub Flavored Markdown, build and convert tables, turn Markdown into slides, convert BBCode, and create README banners.',
    intro:
      'Use this collection for READMEs, docs sites, changelogs, forum posts, and any content written in Markdown.',
    introParagraphs: [
      'Markdown is the default format for developer documentation: READMEs, docs sites, changelogs, issue templates, and pull request descriptions all use it. Content, however, often starts somewhere else, such as an HTML page, a spreadsheet, or a forum post. This collection converts it into Markdown and back. Convert HTML to GitHub Flavored Markdown when moving pages into a docs repository, and Markdown to HTML when publishing somewhere that does not render Markdown. The live preview shows how headings, lists, code blocks, and tables will render before you commit.',
      'Tables are the most tedious part of Markdown to write by hand, so the table generator provides a spreadsheet-style editor, CSV can be converted to a Markdown table, Markdown tables can be exported to CSV, and HTML tables can become Markdown, CSV, or JSON. Beyond docs, turn a Markdown file into an HTML slide deck, convert between Markdown and forum BBCode, generate GitHub issue and pull request templates, and create ASCII art banners for README headers. GitHub Flavored Markdown extensions such as task lists and tables are not supported by every renderer.',
    ],
    searchIntents: ['markdown table generator', 'html to markdown', 'markdown to slides', 'markdown preview'],
    toolSlugs: [
      'markdown-preview',
      'markdown-to-html',
      'html-to-markdown',
      'html-to-gfm-converter',
      'markdown-table-generator',
      'csv-to-markdown',
      'markdown-table-to-csv',
      'html-table-converter',
      'markdown-to-slides',
      'markdown-to-bbcode',
      'bbcode-to-markdown',
      'github-issue-pr-template-generator',
      'ascii-art-generator',
    ],
    workflowSteps: [
      {
        toolSlug: 'html-to-gfm-converter',
        title: 'Import existing content',
        description: 'Convert HTML pages into GitHub Flavored Markdown and clean up the result.',
      },
      {
        toolSlug: 'markdown-table-generator',
        title: 'Build tables',
        description: 'Edit tabular content in a grid and export aligned Markdown.',
      },
      {
        toolSlug: 'markdown-preview',
        title: 'Preview the rendering',
        description: 'Check headings, code blocks, and links before committing.',
      },
      {
        toolSlug: 'markdown-to-slides',
        title: 'Reuse it as slides',
        description: 'Turn the document into an HTML slide deck for a demo or review.',
      },
    ],
  },
] as const satisfies readonly ToolCollection[];

// Fallback-only labels and templates. Real per-locale copy lives in `collectionCopy.ts`; these are
// used only if a collection has no entry there for the requested locale.
const collectionLabels: Record<Exclude<Language, 'en'>, Record<string, string>> = {
  tr: {
    'api-debugging': 'API Hata Ayıklama', 'jwt-authentication': 'JWT ve Kimlik Doğrulama', 'json-development': 'JSON Geliştirme',
    'docker-kubernetes': 'Docker ve Kubernetes', 'ai-llm': 'Yapay Zeka ve LLM', 'sql-database': 'SQL ve Veritabanı',
    'frontend-css': 'Frontend ve CSS', 'encoding-conversion': 'Kodlama ve Dönüştürme', 'security-crypto': 'Güvenlik ve Kriptografi',
    'web-seo': 'Web SEO', 'text-content': 'Metin ve İçerik', 'data-conversion': 'Veri Dönüştürme',
    'typescript-modeling': 'Tipler ve Modeller', 'devops-infrastructure': 'DevOps ve Altyapı', 'network-http': 'HTTP ve Ağ',
    'git-ci': 'Git ve CI/CD', 'mobile-development': 'Mobil Geliştirme', 'media-files': 'Medya ve Dosyalar',
    'testing-debugging': 'Test ve Hata Ayıklama', 'time-cron': 'Zaman ve Cron',
  },
  de: {
    'api-debugging': 'API-Debugging', 'jwt-authentication': 'JWT und Authentifizierung', 'json-development': 'JSON-Entwicklung',
    'docker-kubernetes': 'Docker und Kubernetes', 'ai-llm': 'KI und LLM', 'sql-database': 'SQL und Datenbanken',
    'frontend-css': 'Frontend und CSS', 'encoding-conversion': 'Kodierung und Konvertierung', 'security-crypto': 'Sicherheit und Kryptografie',
    'web-seo': 'Web-SEO', 'text-content': 'Text und Inhalte', 'data-conversion': 'Datenkonvertierung',
    'typescript-modeling': 'Typen und Modelle', 'devops-infrastructure': 'DevOps und Infrastruktur', 'network-http': 'HTTP und Netzwerk',
    'git-ci': 'Git und CI/CD', 'mobile-development': 'Mobile Entwicklung', 'media-files': 'Medien und Dateien',
    'testing-debugging': 'Tests und Debugging', 'time-cron': 'Zeit und Cron',
  },
  es: {
    'api-debugging': 'Depuración de API', 'jwt-authentication': 'JWT y autenticación', 'json-development': 'Desarrollo JSON',
    'docker-kubernetes': 'Docker y Kubernetes', 'ai-llm': 'IA y LLM', 'sql-database': 'SQL y bases de datos',
    'frontend-css': 'Frontend y CSS', 'encoding-conversion': 'Codificación y conversión', 'security-crypto': 'Seguridad y criptografía',
    'web-seo': 'SEO web', 'text-content': 'Texto y contenido', 'data-conversion': 'Conversión de datos',
    'typescript-modeling': 'Tipos y modelos', 'devops-infrastructure': 'DevOps e infraestructura', 'network-http': 'HTTP y red',
    'git-ci': 'Git y CI/CD', 'mobile-development': 'Desarrollo móvil', 'media-files': 'Medios y archivos',
    'testing-debugging': 'Pruebas y depuración', 'time-cron': 'Tiempo y Cron',
  },
  fr: {
    'api-debugging': 'Débogage API', 'jwt-authentication': 'JWT et authentification', 'json-development': 'Développement JSON',
    'docker-kubernetes': 'Docker et Kubernetes', 'ai-llm': 'IA et LLM', 'sql-database': 'SQL et bases de données',
    'frontend-css': 'Frontend et CSS', 'encoding-conversion': 'Encodage et conversion', 'security-crypto': 'Sécurité et cryptographie',
    'web-seo': 'SEO web', 'text-content': 'Texte et contenu', 'data-conversion': 'Conversion de données',
    'typescript-modeling': 'Types et modèles', 'devops-infrastructure': 'DevOps et infrastructure', 'network-http': 'HTTP et réseau',
    'git-ci': 'Git et CI/CD', 'mobile-development': 'Développement mobile', 'media-files': 'Médias et fichiers',
    'testing-debugging': 'Tests et débogage', 'time-cron': 'Temps et Cron',
  },
  ru: {
    'api-debugging': 'Отладка API', 'jwt-authentication': 'JWT и аутентификация', 'json-development': 'Разработка JSON',
    'docker-kubernetes': 'Docker и Kubernetes', 'ai-llm': 'ИИ и LLM', 'sql-database': 'SQL и базы данных',
    'frontend-css': 'Frontend и CSS', 'encoding-conversion': 'Кодирование и конвертация', 'security-crypto': 'Безопасность и криптография',
    'web-seo': 'Веб-SEO', 'text-content': 'Текст и контент', 'data-conversion': 'Конвертация данных',
    'typescript-modeling': 'Типы и модели', 'devops-infrastructure': 'DevOps и инфраструктура', 'network-http': 'HTTP и сети',
    'git-ci': 'Git и CI/CD', 'mobile-development': 'Мобильная разработка', 'media-files': 'Медиа и файлы',
    'testing-debugging': 'Тестирование и отладка', 'time-cron': 'Время и Cron',
  },
  zh: {
    'api-debugging': 'API 调试', 'jwt-authentication': 'JWT 与身份验证', 'json-development': 'JSON 开发',
    'docker-kubernetes': 'Docker 与 Kubernetes', 'ai-llm': 'AI 与 LLM', 'sql-database': 'SQL 与数据库',
    'frontend-css': '前端与 CSS', 'encoding-conversion': '编码与转换', 'security-crypto': '安全与密码学',
    'web-seo': 'Web SEO', 'text-content': '文本与内容', 'data-conversion': '数据转换',
    'typescript-modeling': '类型与模型', 'devops-infrastructure': 'DevOps 与基础设施', 'network-http': 'HTTP 与网络',
    'git-ci': 'Git 与 CI/CD', 'mobile-development': '移动开发', 'media-files': '媒体与文件',
    'testing-debugging': '测试与调试', 'time-cron': '时间与 Cron',
  },
};

const localizedTemplates: Record<Exclude<Language, 'en'>, { title: string; description: string; intro: string }> = {
  tr: { title: '{topic} Geliştirici Araçları', description: '{topic} iş akışları için tarayıcıda çalışan ücretsiz geliştirici araçları.', intro: '{topic} ile ilgili bir işi hızlıca tamamlamak, çıktıyı kontrol etmek ve sonraki araca geçmek için bu koleksiyonu kullanın.' },
  de: { title: '{topic} Entwickler-Tools', description: 'Kostenlose browserbasierte Entwickler-Tools für {topic}-Workflows.', intro: 'Nutzen Sie diese Sammlung, um Aufgaben rund um {topic} schnell zu erledigen, Ergebnisse zu prüfen und zum nächsten Tool weiterzugehen.' },
  es: { title: 'Herramientas de desarrollo para {topic}', description: 'Herramientas gratuitas en el navegador para flujos de trabajo de {topic}.', intro: 'Usa esta colección para completar tareas de {topic}, revisar resultados y continuar con la siguiente herramienta.' },
  fr: { title: 'Outils de développement {topic}', description: 'Outils gratuits dans le navigateur pour les flux de travail {topic}.', intro: 'Utilisez cette collection pour terminer rapidement les tâches liées à {topic}, vérifier les résultats et poursuivre le workflow.' },
  ru: { title: 'Инструменты разработчика: {topic}', description: 'Бесплатные браузерные инструменты для рабочих процессов {topic}.', intro: 'Используйте эту коллекцию для задач {topic}, проверки результата и перехода к следующему инструменту.' },
  zh: { title: '{topic}开发者工具', description: '面向{topic}工作流的免费浏览器开发者工具。', intro: '使用此合集快速完成{topic}相关任务、检查结果并继续下一步工作流。' },
};

export function getToolCollection(slug: string): ToolCollection | undefined {
  return toolCollections.find((collection) => collection.slug === slug);
}

export function getCollectionTools(collection: ToolCollection): Tool[] {
  return collection.toolSlugs
    .map((slug) => findCatalogTool(slug))
    .filter((tool): tool is Tool => Boolean(tool));
}

export function getCollectionsForTool(toolSlug: string): ToolCollection[] {
  return toolCollections.filter((collection) =>
    (collection.toolSlugs as readonly ToolSlug[]).includes(toolSlug as ToolSlug),
  );
}

/**
 * Returns the collection with locale-specific title, shortTitle, description, and intro.
 * For non-English locales the English-only `introParagraphs` and `workflowSteps` are removed so
 * localized pages never render untranslated long-form copy. Slugs, tools, and search intents are
 * unchanged.
 */
export function getLocalizedCollection(collection: ToolCollection, locale: Language): ToolCollection {
  if (locale === 'en') return collection;

  const copy = collectionCopy[locale]?.[collection.slug];
  if (copy) {
    return {
      ...collection,
      title: copy.title,
      shortTitle: copy.shortTitle,
      description: copy.description,
      intro: copy.intro,
      introParagraphs: undefined,
      workflowSteps: undefined,
    };
  }

  const topic = collectionLabels[locale][collection.slug] || collection.shortTitle;
  const template = localizedTemplates[locale];
  const fill = (value: string) => value.replaceAll('{topic}', topic);

  return {
    ...collection,
    title: fill(template.title),
    shortTitle: topic,
    description: fill(template.description),
    intro: fill(template.intro),
    introParagraphs: undefined,
    workflowSteps: undefined,
  };
}
