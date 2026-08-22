# DevsTools – 251 Free, Privacy-First Developer Tools

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Tests-818%20Passing-success?logo=vitest)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E%20Verified-45ba4b?logo=playwright)](https://playwright.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**DevsTools** (`https://devstools.app`) is an open-source, ultra-fast suite of **251 online developer tools** running **100% client-side** in your browser. No signups, no paywalls, zero server tracking.

---

## 🌟 Key Features

- 🔒 **100% Client-Side Privacy:** Your tokens, API keys, JSON payloads, and source code never leave your browser.
- ⚡ **Instant Execution:** Built with Next.js 16 Static Site Generation (SSG) with zero backend round-trip latency.
- 🔍 **Keyboard-First Navigation:** Press `/` anywhere to open the command palette fuzzy search.
- 🌙 **Dark & Light Modes:** Sleek, accessible UI designed with Tailwind CSS and WCAG 2.1 AA compliance.
- 🌍 **7 Languages Supported:** English, Türkçe, Deutsch, Español, Français, Русский, 简体中文.
- 🧪 **Rock-Solid Reliability:** 818 Unit Tests and full Playwright E2E test suites with 100% passing coverage.

---

## 🛠️ Tool Catalog by Category (251 Tools)

### 1. AI & LLM Engineering (10 Tools)
- **LLM Token & Cost Calculator** (`/tools/utilities/llm-token-counter`): Estimate tokens and costs for GPT-4o, Claude 3.5, Gemini 1.5, Llama 3.
- **OpenAI Function Calling Schema Generator** (`/tools/converters/openai-function-schema`): Turn JSON into OpenAI tool schemas.
- **Prompt Template Compiler** (`/tools/utilities/prompt-template-formatter`): Jinja2/Mustache template variable interpolation.
- **Embedding Vector Similarity** (`/tools/utilities/embedding-similarity`): Cosine similarity, Euclidean distance, Dot product.
- **RAG Text Chunk Splitter** (`/tools/utilities/text-chunk-splitter`): Semantic window splitting for vector search pipelines.
- **OpenAI JSONL Validator** (`/tools/utilities/jsonl-dataset-validator`): Validate dataset lines for fine-tuning.
- **Prompt Format Converter** (`/tools/converters/prompt-format-converter`): ChatML ↔ Anthropic ↔ Llama 3 format converter.
- **LLM Sampling Curve Visualizer** (`/tools/generators/sampling-curve-visualizer`): Temperature & Top-P token probability curves.
- **AI System Prompt Builder** (`/tools/text/system-prompt-formatter`): Structured system prompt markdown builder.
- **Prompt Diff Comparator** (`/tools/text/prompt-diff`): Word-level and line-level prompt revision comparison.

### 2. Converters (63 Tools)
- JSON ↔ CSV, YAML ↔ JSON, XML ↔ JSON, TOML ↔ JSON, TSV ↔ JSON, NDJSON ↔ JSON
- JSON to TypeScript, Zod, Pydantic (Python), Rust Serde, Swift Codable, Kotlin Data Classes, C#, Java Lombok POJO
- TypeScript to JSON Schema, YAML to TypeScript, GraphQL to TypeScript, Protobuf to JSON
- SQL to MongoDB, JSON to SQL DDL, PostgreSQL to MySQL, Prisma to SQL, CSV to Parquet Schema
- Docker Compose to Kubernetes (K8s), Caddy to Nginx, Markdown to HTML Slides, .env to .env.example

### 3. Developer Utilities (66 Tools)
- CSS Specificity Calculator, Fluid Typography Clamp, Media Query Range Builder, Aspect Ratio Calculator
- Postgres Connection URI Builder, Redis Command Generator, SQL Explainer, SQL Index Advisor
- Kubernetes Kubeconfig Validator, Helm Values Evaluator, Dockerfile Linter, Systemd Unit Generator
- WebSocket Client Tester, Server-Sent Events (SSE) Stream Tester, HAR File Viewer, DNS Records Simulator
- BigNumber Arbitrary Precision Calculator, Multi-Radix Base Converter, Bandwidth Download Calculator

### 4. Generators (42 Tools)
- UUID v4 / UUID v7 (Time-Ordered), NanoID, ULID, API Key Generator, Password Generator, QR Code Generator
- CSS Keyframe Animations, CSS Cubic-Bezier Curves, CSS Glassmorphism, CSS Neumorphism, CSS Mesh Gradients
- Conventional Git Commit Builder, CHANGELOG.md Builder, .editorconfig Builder, Open Source License Generator
- Android Manifest XML Builder, iOS Info.plist Builder, Flutter Material 3 Theme Generator, Electron Config Builder

### 5. Cryptography & Security (25 Tools)
- JWT Decoder, Signer & Signature Validator, Certificate PEM / X.509 Inspector, CSR Generator
- AES-256 Crypto Playground, BIP-39 Mnemonic Seed Deriver, Argon2 Password Hash Formatter
- SSH Key Fingerprint Inspector, PGP/GPG Key Inspector, HMAC Webhook Verifier, Bcrypt Hash Generator & Verifier

### 6. Code Formatters (15 Tools)
- JSON Formatter & Minifier, SQL Formatter & Minifier, Nginx Formatter, Terraform HCL Formatter
- GraphQL Query Formatter, Tailwind Class Sorter (Prettier order), Package.json Dependency Sorter

### 7. Text Tools (14 Tools)
- Regex Tester & Escape, Text Diff & Side-by-Side Diff, Case Converter, String Byte Counter, Text Obfuscator

### 8. Encoders & Decoders (14 Tools)
- Base64, Base58 (Bitcoin/Solana/IPFS), Base32, Hex, URL, Binary, HTML Entities, Unicode Escape, Hex Dump Viewer

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/hasanozcan/developertools.git
cd developertools/frontend

# Install dependencies
npm install

# Start local development server
npm run dev

# Run unit tests (818 tests)
npm test

# Run Playwright E2E browser tests
npm run test:e2e

# Build production bundle
npm run build
```

---

## 📄 License

Distributed under the MIT License.
