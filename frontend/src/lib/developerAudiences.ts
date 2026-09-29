import { findCatalogTool, type Tool, type ToolSlug } from '@/lib/api';
import { audienceCopy } from '@/lib/collectionCopy';
import type { Language } from '@/lib/i18nRouting';
import { getToolCollection, type ToolCollection } from '@/lib/toolCollections';

export interface DeveloperAudience {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  /** Short one-sentence lead (EN) or the 60–100 word localized intro. */
  intro: string;
  /**
   * Long-form English introduction (150–250 words split into paragraphs). Only present on the
   * English audience; `getLocalizedAudience` removes it for other locales, which use `intro`.
   */
  introParagraphs?: readonly string[];
  collectionSlugs: readonly string[];
  toolSlugs: readonly ToolSlug[];
}

export const developerAudiences = [
  {
    slug: 'api-developers',
    title: 'Free Tools for API Developers',
    shortTitle: 'API Developers',
    description:
      'Tools for API developers: build and convert cURL and Postman requests, validate OpenAPI, generate typed clients, test WebSockets, decode JWTs, and mock responses.',
    intro: 'Move from reproducing an API request to documenting, validating, testing, and securing it with connected browser-based tools.',
    introParagraphs: [
      'API development moves through a predictable cycle: design the contract, implement it, reproduce requests while debugging, and keep clients and documentation in sync. The tools on this page support each stage without a local install. Start from a working request in the cURL builder, share it as a Postman collection, and generate an OpenAPI draft from that collection. The OpenAPI validator catches structural problems before clients are generated, and the TypeScript client generator produces typed request functions from the finished specification.',
      'While debugging, convert cURL into code for the language you are testing in, decode JWTs to check claims and expiry, and exercise WebSocket connections interactively. The mock response generator lets front-end teams work against realistic paginated data before an endpoint is ready. The related collections go deeper: request conversion and HAR analysis, cURL to code in many languages, OpenAPI, GraphQL, and Protobuf schemas, HTTP headers and CORS, authentication, and test data. Everything runs in your browser, but you should still replace production secrets with test values.',
    ],
    collectionSlugs: ['api-debugging', 'curl-converters', 'api-schemas', 'network-http', 'jwt-authentication', 'test-data'],
    toolSlugs: [
      'curl-builder',
      'curl-to-postman',
      'postman-to-openapi',
      'openapi-validator',
      'swagger-to-typescript',
      'curl-to-code',
      'websocket-tester',
      'jwt-decoder',
      'api-mock-response-generator',
    ],
  },
  {
    slug: 'frontend-developers',
    title: 'Free Tools for Frontend Developers',
    shortTitle: 'Frontend Developers',
    description:
      'Tools for frontend developers: CSS Grid, flexbox, Tailwind, fluid type, HTML to JSX, SVG components, color contrast, and Next.js metadata for production interfaces.',
    intro: 'Build and inspect interface code, convert styles, validate visual accessibility, and prepare production-ready metadata and assets.',
    introParagraphs: [
      "Frontend developers work where design, browser behavior, and application code meet, so a typical day involves translating between formats: a mockup's spacing into CSS, a snippet of HTML into a React component, an SVG export into an icon component, and a color palette into tokens. The featured tools here cover the most frequent of those translations. Generate Grid and Flexbox layouts, calculate fluid clamp() typography, convert CSS to Tailwind utilities and keep class lists sorted, and turn HTML and SVG into JSX.",
      'Quality checks belong in the same workflow. The contrast checker verifies text colors against WCAG thresholds while a palette is still easy to change, and the Next.js metadata generator produces titles, descriptions, and Open Graph fields for App Router pages. The related collections expand each area: HTML, CSS, and React conversions; Tailwind CSS migration and palettes; responsive layout and animation; color and accessibility; SVG optimization and icons; and SEO metadata. Each tool outputs standard code you can paste into your project and review like any other change.',
    ],
    collectionSlugs: ['frontend-css', 'tailwind-css', 'css-layout-animation', 'color-accessibility', 'svg-icons', 'web-seo'],
    toolSlugs: [
      'css-grid-generator',
      'css-flexbox-generator',
      'fluid-typography',
      'css-to-tailwind',
      'tailwind-class-sorter',
      'html-to-jsx',
      'svg-to-jsx',
      'color-contrast-checker',
      'nextjs-metadata-generator',
    ],
  },
  {
    slug: 'backend-developers',
    title: 'Free Tools for Backend Developers',
    shortTitle: 'Backend Developers',
    description:
      'Tools for backend developers: format JSON and SQL, validate OpenAPI, generate ORM models, verify JWTs and webhooks, hash passwords, and build Redis commands.',
    intro: 'Use these tools to shape contracts, inspect requests, model data, troubleshoot authentication, and move between database and application code.',
    introParagraphs: [
      'Backend work revolves around contracts and data: request and response shapes, database schemas, authentication, and the integrations that call your service. The tools on this page cover the recurring tasks in that work. Format JSON payloads and SQL queries so they can be reviewed, validate an OpenAPI document before it becomes the source for clients, and turn JSON samples into SQL when data needs to be loaded or compared. The SQL to Prisma converter bridges an existing schema and an ORM, and the Redis command builder helps with caching and queues.',
      'Security-sensitive code benefits from checking values directly. Verify JWT signatures when a token is unexpectedly rejected, hash passwords with bcrypt to compare against stored values, and validate HMAC signatures on incoming webhooks exactly as your handler should. The related collections go further into API debugging, SQL and query performance, ORM schema generation, JSON modeling, passwords and secrets, and NoSQL databases such as MongoDB, Redis, and Elasticsearch. Use test data and test keys; production secrets should stay in your secret manager.',
    ],
    collectionSlugs: ['api-debugging', 'sql-database', 'orm-schema', 'json-development', 'passwords-secrets', 'nosql-databases'],
    toolSlugs: [
      'json-formatter',
      'openapi-validator',
      'sql-formatter',
      'json-to-sql',
      'sql-to-prisma',
      'redis-command-generator',
      'jwt-signature-validator',
      'bcrypt-generator',
      'webhook-signature-verifier',
    ],
  },
  {
    slug: 'devops-engineers',
    title: 'Free Tools for DevOps Engineers',
    shortTitle: 'DevOps Engineers',
    description:
      'Tools for DevOps engineers: Dockerfiles, Compose to Kubernetes, Terraform, CI matrices, hardened Nginx and systemd configs, Prometheus alerts, and subnet planning.',
    intro: 'Generate, inspect, convert, and validate infrastructure configuration without leaving the browser.',
    introParagraphs: [
      'DevOps engineers maintain the path from a commit to a running, observable service, and that path is described in many configuration languages: Dockerfiles, Compose and Kubernetes YAML, Terraform HCL, CI pipeline definitions, systemd units, Nginx configuration, and Prometheus rules. The featured tools generate or check one file in each of those layers. Create a Dockerfile, convert Compose services to Kubernetes manifests, validate a kubeconfig, keep Terraform formatted, and define a GitHub Actions test matrix.',
      'At the host and network level, generate hardened systemd services and Nginx server blocks with TLS and security headers, plan IPv4 subnets for new environments, and write Prometheus alerts on the symptoms users notice. The related collections cover containers and Kubernetes, infrastructure configuration, Terraform and policy as code, web servers, Git and CI/CD, and DNS and networking in more depth. Treat generated configuration as a draft: run each tool\'s native validator and review changes in a pull request before applying them.',
    ],
    collectionSlugs: ['docker-kubernetes', 'devops-infrastructure', 'infrastructure-as-code', 'web-servers', 'git-ci', 'dns-networking'],
    toolSlugs: [
      'dockerfile-generator',
      'docker-compose-to-k8s',
      'kubeconfig-validator',
      'terraform-formatter',
      'github-actions-matrix-builder',
      'systemd-service-hardened-builder',
      'nginx-security-conf-generator',
      'ip-subnet-calculator',
      'prometheus-alert-builder',
    ],
  },
  {
    slug: 'security-engineers',
    title: 'Free Tools for Security Engineers',
    shortTitle: 'Security Engineers',
    description:
      'Tools for security engineers: verify JWTs, inspect certificates and SSH keys, evaluate CSP and security headers, compare checksums, tune Argon2, and detect ReDoS.',
    intro: 'Inspect security-sensitive artifacts, verify configuration, and troubleshoot common web authentication and transport-security problems.',
    introParagraphs: [
      'Application security work is largely verification: confirming that a token is signed by the expected key, a certificate covers the right hostnames, a policy blocks what it claims to block, and a stored password hash is slow enough to resist offline attacks. The featured tools let you check those facts directly from the artifacts involved. Validate JWT signatures, inspect TLS certificates and SSH key fingerprints, compare file checksums across algorithms, and tune Argon2id parameters for password storage.',
      'Browser-facing defenses can be reviewed the same way: evaluate a Content Security Policy for missing directives and unsafe sources, analyze response headers such as HSTS and X-Frame-Options, and generate Subresource Integrity hashes for third-party scripts. The ReDoS analyzer flags regular expressions whose backtracking could be exploited with crafted input. The related collections cover certificates and keys, hashing, passwords and 2FA, JWT authentication, and web server hardening. These tools support review and testing; they do not replace threat modeling, dependency scanning, or a penetration test.',
    ],
    collectionSlugs: ['security-crypto', 'certificates-keys', 'hashing-checksums', 'passwords-secrets', 'jwt-authentication', 'web-servers'],
    toolSlugs: [
      'jwt-signature-validator',
      'ssl-certificate-inspector',
      'ssh-key-inspector',
      'file-checksum-comparator',
      'argon2-parameter-tuner',
      'csp-evaluator',
      'http-security-headers-analyzer',
      'subresource-integrity-generator',
      'regex-benchmark-simulator',
    ],
  },
  {
    slug: 'data-engineers',
    title: 'Free Tools for Data Engineers',
    shortTitle: 'Data Engineers',
    description:
      'Tools for data engineers: convert CSV, JSON, NDJSON, and Excel, infer Parquet and Avro schemas, validate JSON Schema, flatten nested records, and prepare SQL loads.',
    intro: 'Inspect and reshape structured data, prepare database loads, translate schemas, and verify payloads before they enter a pipeline.',
    introParagraphs: [
      'Data pipelines break at the boundaries: a CSV with an unexpected delimiter, a JSON field that is sometimes an array, a schema change nobody announced, or a load statement that fails halfway through. The tools on this page help you inspect and reshape data at those boundaries before it enters a pipeline. Convert between CSV, JSON, NDJSON, and Excel, flatten nested records into columns, and generate SQL INSERT statements for staging loads.',
      'Schemas are the contract between producers and consumers. Validate sample documents against JSON Schema, derive a PyArrow Parquet schema from CSV headers, and convert Avro record schemas into JSON Schema so systems that use different formats agree on field names and types. Format SQL for review before it runs against a warehouse. The related collections cover data format conversion, JSON querying and diffing, SQL, NoSQL and analytics databases, JSON modeling, and API schema languages such as Protobuf. Validate conversions with real samples, since type inference from a few rows can be misleading.',
    ],
    collectionSlugs: ['data-conversion', 'json-query-transform', 'sql-database', 'nosql-databases', 'json-development', 'api-schemas'],
    toolSlugs: [
      'json-csv',
      'excel-to-json',
      'ndjson-to-json',
      'json-flatten-unflatten',
      'csv-to-sql-insert',
      'csv-to-parquet-schema',
      'avro-to-json-schema',
      'json-schema-validator',
      'sql-formatter',
    ],
  },
  {
    slug: 'ai-engineers',
    title: 'Free Tools for AI & LLM Engineers',
    shortTitle: 'AI & LLM Engineers',
    description:
      'Tools for AI and LLM engineers: count tokens, compare model costs, build prompts, function-calling and structured-output schemas, inspect MCP, and tune RAG chunking.',
    intro: 'Estimate model usage, structure prompts, prepare retrieval chunks, validate datasets, and build function-calling contracts.',
    introParagraphs: [
      'Engineering an LLM feature involves far more than choosing a model. Prompts need structure and version control, tool calls need precise schemas, responses need validation, retrieval needs well-sized chunks, and every request has a token cost. The featured tools cover each of those concerns. Count tokens and project monthly cost across providers, structure system prompts with XML sections, define function-calling schemas and strict structured outputs, and inspect Model Context Protocol messages when a tool server does not behave as expected.',
      'For retrieval-augmented generation, visualize how chunk size and overlap split your documents and compare embedding vectors with cosine similarity to understand retrieval results. The JSONL validator checks fine-tuning datasets before upload. The related collections go further into AI and LLM basics, token counting and costs, prompt engineering, agents and RAG, JSON modeling for structured output, and API debugging for the HTTP calls underneath. Model prices and limits change frequently, so confirm current values with your provider.',
    ],
    collectionSlugs: ['ai-llm', 'llm-tokens-costs', 'prompt-engineering', 'ai-agents-rag', 'json-development', 'api-debugging'],
    toolSlugs: [
      'llm-token-counter',
      'llm-pricing-calculator',
      'system-prompt-xml-builder',
      'openai-function-schema',
      'openai-structured-outputs',
      'mcp-inspector',
      'rag-chunking-calculator',
      'embedding-similarity',
      'jsonl-dataset-validator',
    ],
  },
  {
    slug: 'mobile-developers',
    title: 'Free Tools for Mobile Developers',
    shortTitle: 'Mobile Developers',
    description:
      'Tools for mobile developers: Android manifests, iOS plists, app icons, deep link files, Flutter themes, keystore fingerprints, and Swift and Kotlin models.',
    intro: 'Prepare platform configuration, inspect app assets, validate links, and troubleshoot the API and security pieces around mobile apps.',
    introParagraphs: [
      'Mobile development combines application code with a large amount of platform configuration: manifests, property lists, icon sets, signing fingerprints, and deep link files that must match what is hosted on your website. Mistakes in these files often only show up after a full build or a store review. The featured tools generate them ahead of time. Build AndroidManifest.xml entries and iOS Info.plist keys, resize one source image into every required icon size, generate Flutter themes, and create the association files for Universal Links and Android App Links.',
      'Signing and assets need similar care. Format SHA-1 and SHA-256 keystore fingerprints for Firebase and Google sign-in, and convert SVG artwork into Android Vector Drawable XML so icons scale without multiple bitmaps. API models can be generated as Swift Codable structs or Kotlin data classes from sample JSON. The related collections cover mobile configuration, SVG and icons, JSON to code generators, API debugging, certificates and keys, and image and media preparation. Test generated configuration on physical devices and the operating system versions you support.',
    ],
    collectionSlugs: ['mobile-development', 'svg-icons', 'json-to-code', 'api-debugging', 'certificates-keys', 'media-files'],
    toolSlugs: [
      'android-manifest-builder',
      'ios-plist-builder',
      'app-icon-resizer',
      'universal-links-validator',
      'flutter-theme-generator',
      'android-keystore-fingerprint',
      'svg-to-android-vector',
      'json-to-swift',
      'json-to-kotlin',
    ],
  },
  {
    slug: 'database-developers',
    title: 'Free Tools for Database Developers',
    shortTitle: 'Database Developers',
    description:
      'Tools for database developers: format SQL, analyze PostgreSQL plans and indexes, generate Prisma and SQLAlchemy models, and build MongoDB pipelines.',
    intro: 'Move between SQL, application models, ORM schemas, and database diagnostics with a focused set of tools.',
    introParagraphs: [
      'Database developers spend much of their time reading queries, reasoning about plans, and keeping schemas consistent with the application code that depends on them. The featured tools support that work directly. Format SQL captured from logs, analyze PostgreSQL EXPLAIN output to find sequential scans and expensive joins, and evaluate index candidates for the columns a query filters and joins on. The connection builder assembles correctly escaped PostgreSQL connection strings, and the dialect converter helps when a schema moves from PostgreSQL to MySQL.',
      'Schema changes ripple into application models, so generate Prisma or SQLAlchemy models from DDL, and build MongoDB aggregation pipelines when data lives in a document store. Primary key choice matters too: time-ordered UUID v7 values sort by creation time and keep index inserts localized. The related collections cover SQL tools, ORM schema generators, NoSQL databases, data format conversion, unique identifiers, and test data for seeding. Run generated statements and migrations against a staging database, and measure plans again after every index change.',
    ],
    collectionSlugs: ['sql-database', 'orm-schema', 'nosql-databases', 'data-conversion', 'unique-ids', 'test-data'],
    toolSlugs: [
      'sql-formatter',
      'postgres-explain-visualizer',
      'sql-index-advisor',
      'postgres-connection-builder',
      'postgres-to-mysql',
      'sql-to-prisma',
      'sql-to-python-sqlalchemy',
      'mongodb-aggregate-builder',
      'uuid-v7-generator',
    ],
  },
  {
    slug: 'qa-engineers',
    title: 'Free Tools for QA & Test Engineers',
    shortTitle: 'QA Engineers',
    description:
      'Tools for QA and test engineers: diff outputs, test regex, validate OpenAPI, mock APIs and webhooks, generate test data, compare JSON, and inspect HAR traffic.',
    intro: 'Reproduce requests, compare outputs, validate contracts, simulate payloads, and inspect browser/network behavior during test execution.',
    introParagraphs: [
      'Testing depends on controlling inputs and comparing outputs precisely. When a test fails, the questions are always similar: what was sent, what came back, and how does it differ from the expected result. The featured tools answer those questions without writing a harness first. Inspect recorded browser traffic in the HAR viewer, validate API behavior against its OpenAPI contract, diff expected and actual output side by side, and compare JSON responses structurally so key order does not create false failures.',
      'Good tests also need realistic but safe inputs. Generate mock datasets and paginated API responses, simulate webhook events from common providers, and parse user-agent strings to reproduce browser- and device-specific bugs. The regex tester helps validate the patterns used in assertions and input validation. The related collections cover testing and debugging, mock and test data, API request debugging, HTTP protocol behavior, JSON diffs and queries, and text cleanup for fixtures. Keep fixtures in version control so failures can be reproduced by anyone on the team.',
    ],
    collectionSlugs: ['testing-debugging', 'test-data', 'api-debugging', 'network-http', 'json-query-transform', 'text-processing'],
    toolSlugs: [
      'har-viewer',
      'openapi-validator',
      'code-side-by-side-diff',
      'json-diff-patch',
      'regex-tester',
      'mock-data-generator',
      'api-mock-response-generator',
      'webhook-payload-simulator',
      'user-agent-parser',
    ],
  },
] as const satisfies readonly DeveloperAudience[];

// Fallback-only labels and templates. Real per-locale copy lives in `collectionCopy.ts`; these are
// used only if an audience has no entry there for the requested locale.
const audienceLabels: Record<Exclude<Language, 'en'>, Record<string, string>> = {
  tr: { 'api-developers': 'API Geliştiricileri', 'frontend-developers': 'Frontend Geliştiricileri', 'backend-developers': 'Backend Geliştiricileri', 'devops-engineers': 'DevOps Mühendisleri', 'security-engineers': 'Güvenlik Mühendisleri', 'data-engineers': 'Veri Mühendisleri', 'ai-engineers': 'AI ve LLM Mühendisleri', 'mobile-developers': 'Mobil Geliştiriciler', 'database-developers': 'Veritabanı Geliştiricileri', 'qa-engineers': 'QA ve Test Mühendisleri' },
  de: { 'api-developers': 'API-Entwickler', 'frontend-developers': 'Frontend-Entwickler', 'backend-developers': 'Backend-Entwickler', 'devops-engineers': 'DevOps-Ingenieure', 'security-engineers': 'Security-Ingenieure', 'data-engineers': 'Data Engineers', 'ai-engineers': 'KI- und LLM-Ingenieure', 'mobile-developers': 'Mobile-Entwickler', 'database-developers': 'Datenbankentwickler', 'qa-engineers': 'QA- und Test-Ingenieure' },
  es: { 'api-developers': 'Desarrolladores de API', 'frontend-developers': 'Desarrolladores frontend', 'backend-developers': 'Desarrolladores backend', 'devops-engineers': 'Ingenieros DevOps', 'security-engineers': 'Ingenieros de seguridad', 'data-engineers': 'Ingenieros de datos', 'ai-engineers': 'Ingenieros de IA y LLM', 'mobile-developers': 'Desarrolladores móviles', 'database-developers': 'Desarrolladores de bases de datos', 'qa-engineers': 'Ingenieros de QA y pruebas' },
  fr: { 'api-developers': 'Développeurs API', 'frontend-developers': 'Développeurs frontend', 'backend-developers': 'Développeurs backend', 'devops-engineers': 'Ingénieurs DevOps', 'security-engineers': 'Ingénieurs sécurité', 'data-engineers': 'Data engineers', 'ai-engineers': 'Ingénieurs IA et LLM', 'mobile-developers': 'Développeurs mobile', 'database-developers': 'Développeurs base de données', 'qa-engineers': 'Ingénieurs QA et test' },
  ru: { 'api-developers': 'API-разработчики', 'frontend-developers': 'Frontend-разработчики', 'backend-developers': 'Backend-разработчики', 'devops-engineers': 'DevOps-инженеры', 'security-engineers': 'Инженеры безопасности', 'data-engineers': 'Data Engineers', 'ai-engineers': 'AI и LLM инженеры', 'mobile-developers': 'Мобильные разработчики', 'database-developers': 'Разработчики баз данных', 'qa-engineers': 'QA и тест-инженеры' },
  zh: { 'api-developers': 'API 开发者', 'frontend-developers': '前端开发者', 'backend-developers': '后端开发者', 'devops-engineers': 'DevOps 工程师', 'security-engineers': '安全工程师', 'data-engineers': '数据工程师', 'ai-engineers': 'AI 与 LLM 工程师', 'mobile-developers': '移动开发者', 'database-developers': '数据库开发者', 'qa-engineers': 'QA 与测试工程师' },
};

const audienceTemplates: Record<Exclude<Language, 'en'>, { title: string; description: string; intro: string }> = {
  tr: { title: '{role} için Ücretsiz Geliştirici Araçları', description: '{role} için seçilmiş, tarayıcıda çalışan ücretsiz geliştirici araçları ve iş akışları.', intro: '{role} için sık kullanılan görevleri tek yerde tamamlayın; ilgili araçlar ve konu koleksiyonları arasında hızlıca ilerleyin.' },
  de: { title: 'Kostenlose Entwickler-Tools für {role}', description: 'Kuratierte, kostenlose Browser-Tools und Workflows für {role}.', intro: 'Erledigen Sie typische Aufgaben für {role} an einem Ort und wechseln Sie zwischen passenden Tools und Themen-Sammlungen.' },
  es: { title: 'Herramientas gratuitas para {role}', description: 'Herramientas y flujos de trabajo gratuitos en el navegador para {role}.', intro: 'Completa tareas habituales de {role} y avanza entre herramientas y colecciones relacionadas.' },
  fr: { title: 'Outils gratuits pour {role}', description: 'Outils et workflows gratuits dans le navigateur pour {role}.', intro: 'Réalisez les tâches courantes de {role} et enchaînez les outils et collections associés.' },
  ru: { title: 'Бесплатные инструменты для {role}', description: 'Подборка бесплатных браузерных инструментов и рабочих процессов для {role}.', intro: 'Решайте типовые задачи для {role} и переходите между связанными инструментами и коллекциями.' },
  zh: { title: '面向{role}的免费开发者工具', description: '为{role}精选的免费浏览器工具与工作流。', intro: '在一个页面完成{role}的常见任务，并在相关工具和主题合集中快速切换。' },
};

export function getDeveloperAudience(slug: string): DeveloperAudience | undefined {
  return developerAudiences.find((audience) => audience.slug === slug);
}

export function getAudienceTools(audience: DeveloperAudience): Tool[] {
  return audience.toolSlugs.map((slug) => findCatalogTool(slug)).filter((tool): tool is Tool => Boolean(tool));
}

export function getAudienceCollections(audience: DeveloperAudience): ToolCollection[] {
  return audience.collectionSlugs.map((slug) => getToolCollection(slug)).filter((collection): collection is ToolCollection => Boolean(collection));
}

/**
 * Returns the audience with locale-specific title, shortTitle, description, and intro. For
 * non-English locales the English-only `introParagraphs` are removed.
 */
export function getLocalizedAudience(audience: DeveloperAudience, locale: Language): DeveloperAudience {
  if (locale === 'en') return audience;
  const copy = audienceCopy[locale]?.[audience.slug];
  if (copy) {
    return {
      ...audience,
      title: copy.title,
      shortTitle: copy.shortTitle,
      description: copy.description,
      intro: copy.intro,
      introParagraphs: undefined,
    };
  }
  const role = audienceLabels[locale][audience.slug] || audience.shortTitle;
  const template = audienceTemplates[locale];
  const fill = (value: string) => value.replaceAll('{role}', role);
  return {
    ...audience,
    title: fill(template.title),
    shortTitle: role,
    description: fill(template.description),
    intro: fill(template.intro),
    introParagraphs: undefined,
  };
}
