# DevsTools – 300 Free, Privacy-First Developer Tools

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Tests-867%20Passing-success?logo=vitest)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E%20Verified-45ba4b?logo=playwright)](https://playwright.dev/)
[![Privacy: 100% Client-Side](https://img.shields.io/badge/Privacy-100%25%20Client--Side-brightgreen)](https://devstools.app)

**DevsTools** (`https://devstools.app`) is an ultra-fast suite of **300 online developer tools** running **100% client-side** in your browser. No paywalls, no mandatory signups, zero server tracking.

---

## 🌟 Key Features

- 🔒 **100% Client-Side Privacy:** Your tokens, API keys, JSON payloads, and source code never leave your browser.
- ⚡ **Instant Execution:** Built with Next.js 16 Static Site Generation (SSG) with zero backend round-trip latency.
- 🔍 **Keyboard-First Navigation:** Press `/` anywhere to open the command palette fuzzy search.
- 🌙 **Dark & Light Modes:** Sleek, accessible UI designed with Tailwind CSS and WCAG 2.1 AA compliance.
- 🌍 **7 Languages Supported:** English, Türkçe, Deutsch, Español, Français, Русский, 简体中文.
- 🧪 **Rock-Solid Reliability:** 867 Unit Tests across 299 test suites and full Playwright E2E test suites with 100% passing coverage.

---

## 🛠️ Tool Catalog by Category (300 Tools)

### 1. Developer Utilities (77 Tools)
- **DeepSeek & Claude Token Counters**: Exact BPE token counts and API inference pricing calculators.
- **Tiktoken BPE Visualizer**: Visual token breakdown and colorized segmentation for OpenAI and Llama models.
- **Model Context Protocol (MCP) Inspector**: Validate and inspect MCP JSON-RPC 2.0 requests and tools.
- **RAG Semantic Chunking Visualizer**: Document text chunking with sliding token windows.
- **Cron Next 20 Runs Calculator**: Calculate and preview exact next 20 execution timestamps.
- **Nginx Rate Limit Builder**: Generate optimized `limit_req_zone` rate limiting directives.
- **CSP Evaluator**: Analyze Content Security Policy headers for missing directives and XSS flaws.
- **Subresource Integrity (SRI) Builder**: Generate secure sha384 and sha512 integrity hashes for CDN tags.
- **Aspect Ratio & Resolution Calculator**: Calculate standard aspect ratios (16:9, 4:3, 21:9) and resize dimensions.
- Plus 67 additional developer utilities (SemVer, IPv6 Subnet, DNS Simulator, WebSocket Tester, etc.).

### 2. Converters (72 Tools)
- **Zod ↔ JSON Schema**: Bidirectional converter between Zod schemas and JSON Schema Draft-07.
- **SVG to React Native (SVGR)**: Transform SVG vector graphics into `react-native-svg` JSX components.
- **Postman to cURL**: Convert Postman Collection JSON requests into executable terminal cURL commands.
- **OpenAPI to TypeScript Fetch**: Generate typed fetch API client functions from Swagger specs.
- **Apache Avro to JSON Schema**: Convert Apache Avro schema definitions to JSON Schema.
- **JSON to GraphQL Query**: Generate structured GraphQL query strings and selection fields.
- **HAR to k6 Load Test**: Convert HTTP Archive browser logs into k6 performance test scripts.
- **Docker Run to Docker Compose**: Convert single `docker run` commands into `docker-compose.yml`.
- **SVG to WebP Data URI**: Encode SVG vector graphics into high-performance base64 data URIs.
- Plus 63 additional converters (JSON to Pydantic, Rust Serde, Swift, Kotlin, C#, SQL to MongoDB, etc.).

### 3. Generators (54 Tools)
- **Shadcn UI Theme Generator**: Create custom color palettes and CSS variables for Shadcn UI / Radix.
- **Tailwind CSS v4 OKLCH Palette**: Generate modern OKLCH color scales from 50 to 950.
- **GitHub Actions Matrix CI Generator**: Build multi-OS and multi-version matrix build workflows.
- **Cloudflare Wrangler Config Generator**: Generate `wrangler.json` files for Workers, KV, and D1.
- **Ollama Modelfile Builder**: Create custom Modelfile configurations with system prompts and parameters.
- **Kubernetes Ingress & Cert-Manager Generator**: Generate Ingress manifests with TLS termination.
- **GitLab CI/CD Pipeline Generator**: Build multi-stage `.gitlab-ci.yml` pipeline configuration files.
- **React Hook Form Generator**: Generate ready-to-use React Hook Form components with validation rules.
- **Elasticsearch Query DSL Generator**: Generate structured JSON boolean search queries with filters.
- **ClickHouse MergeTree DDL Generator**: Generate optimized CREATE TABLE DDL with MergeTree engines.
- **MongoDB Aggregation Pipeline Generator**: Build multi-stage aggregation pipelines (`$match`, `$group`, `$sort`).
- Plus 43 additional generators (UUID v7, NanoID, ULID, App Icon Resizer, Conventional Commits, etc.).

### 4. Cryptography & Security (30 Tools)
- **Solana Base58 Address Validator**: Validate Solana public key addresses and Base58 character encoding.
- **Ethereum Keccak-256 Hasher**: Compute Keccak-256 hashes and 4-byte smart contract function selectors.
- **Solidity ABI Encoder**: Encode function parameters into 32-byte hexadecimal Solidity ABI payloads.
- **X.509 Certificate Signing Request (CSR) Decoder**: Decode and inspect PEM-encoded CSRs.
- **Ed25519 Keypair Generator**: Generate Ed25519 cryptographic public/private keypairs.
- **RFC 6238 TOTP Authenticator Simulator**: Generate 6-digit Time-Based One-Time Passwords with live countdown.
- Plus 24 security tools (Argon2, Bcrypt, RSA Keypair, PGP Inspector, SSH Key Inspector, Webhook Signature Verifier, etc.).

### 5. Code Formatters (19 Tools)
- **Protobuf Formatter**: Format and indent Protobuf proto3 service and message definitions.
- **TOML Formatter**: Format and organize TOML configuration keys and table headers.
- **Docker Compose Formatter**: Format and clean tab indentations in `docker-compose.yml` files.
- **Apache Config Formatter**: Format and indent Apache VirtualHost and Directory directives.
- Plus 15 additional formatters (SQL, Nginx, Terraform, Package.json, GraphQL, HTML, CSS, JS, etc.).

### 6. Text Tools (17 Tools)
- **AI Agent Prompt Optimizer**: Structure autonomous AI agent persona, constraints, and goal instructions.
- **SQL Identifier Slugifier**: Convert text into valid snake_case SQL table and column identifiers.
- **SRT to WebVTT Subtitle Converter**: Convert SubRip (.srt) subtitles to HTML5 WebVTT (.vtt) format.
- Plus 14 text tools (Word Counter, Text Diff, Sort Lines, Remove Duplicates, Text Obfuscator, etc.).

### 7. Encoders & Decoders (17 Tools)
- **Base64URL Encoder**: Encode and decode URL-safe Base64 without padding characters.
- **Morse Code Audio Player**: Convert alphanumeric text into Morse code with Web Audio playback.
- **Quoted-Printable MIME Encoder**: Encode and decode RFC 2045 email transport text strings.
- Plus 14 encoding tools (Base64, Base32, Base58, Hex, Binary, URL, Unicode Escape, HTML Entities, etc.).

### 8. JSON Tools (14 Tools)
- **JSON Deep Flattener**: Flatten deeply nested JSON objects into single-level dot notation keys.
- **RFC 6902 JSON Patch Builder**: Generate standard JSON patch differential operations between two objects.
- Plus 12 JSON tools (JSON Formatter, Validator, JSON to CSV, Diff & Patch, JSON Pointer, Size Analyzer, etc.).

---

## 🚀 Quick Start

```bash
# 1. Clone repository
git clone https://github.com/hasanozcan/developertools.git
cd developertools/frontend

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 🧪 Verification & Testing

```bash
# Run unit tests across 299 suites
npm test

# Run TypeScript type verification
npm run type-check

# Run ESLint
npm run lint

# Build production bundle (320 SSG pages)
npm run build

# Run Playwright E2E browser tests
npm run test:e2e
```

---

## 📄 License

MIT License © 2026 DevsTools. Built for developers worldwide.
