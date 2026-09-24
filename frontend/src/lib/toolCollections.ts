import { findCatalogTool, type Tool, type ToolSlug } from '@/lib/api';
import type { Language } from '@/lib/i18nRouting';

export interface ToolCollection {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  intro: string;
  searchIntents: readonly string[];
  toolSlugs: readonly ToolSlug[];
  workflowSteps?: readonly { toolSlug: ToolSlug; title: string; description: string }[];
}

export const toolCollections = [
  {
    slug: 'api-debugging',
    title: 'API Debugging & Request Conversion Tools',
    shortTitle: 'API Debugging',
    description:
      'Debug requests, convert cURL and Postman collections, inspect HAR files, test WebSockets, and move API traffic between common developer formats.',
    intro:
      'Use this collection when you are reproducing an API call, moving a request between tools, preparing a load test, or checking a real-time endpoint.',
    searchIntents: ['curl to postman', 'api debugging tools', 'har to k6', 'postman to openapi'],
    toolSlugs: [
      'curl-builder',
      'curl-to-postman',
      'curl-to-har',
      'har-to-k6',
      'postman-to-openapi',
      'openapi-to-postman',
      'websocket-tester',
    ],
  },
  {
    slug: 'jwt-authentication',
    title: 'JWT & Authentication Developer Tools',
    shortTitle: 'JWT & Auth',
    description:
      'Inspect JWTs, verify signatures, generate PKCE values, and troubleshoot token and authentication flows locally in your browser.',
    intro:
      'Use these tools while debugging OAuth, OIDC, bearer tokens, PKCE, JWT expiry, claims, or signature validation problems.',
    searchIntents: ['jwt decoder online', 'jwt signature validator', 'pkce generator', 'jwt invalid'],
    toolSlugs: ['jwt-decoder', 'jwt-signature-validator', 'pkce-generator'],
  },
  {
    slug: 'json-development',
    title: 'JSON Development & Schema Tools',
    shortTitle: 'JSON Development',
    description:
      'Format, validate, model, convert, and generate schemas from JSON with connected workflows for TypeScript, C#, Zod, and SQL.',
    intro:
      'Start with raw JSON, clean or validate it, then pass the same data into model, schema, database, or type-generation tools without rebuilding the input.',
    searchIntents: ['json formatter online', 'json to typescript', 'json to c#', 'json schema to zod'],
    toolSlugs: [
      'json-formatter',
      'json-validator',
      'json-to-typescript',
      'json-to-csharp',
      'json-to-json-schema',
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
    ],
  },
  {
    slug: 'docker-kubernetes',
    title: 'Docker & Kubernetes Developer Tools',
    shortTitle: 'Docker & Kubernetes',
    description:
      'Generate and inspect Dockerfiles, convert Compose services to Kubernetes, validate kubeconfig files, and scaffold Kubernetes and Helm resources.',
    intro:
      'Use this collection while containerizing an application, migrating Compose workloads, preparing Kubernetes manifests, or starting a Helm chart.',
    searchIntents: ['dockerfile generator', 'docker compose to kubernetes', 'kubernetes yaml generator', 'helm chart generator'],
    toolSlugs: [
      'dockerfile-generator',
      'dockerfile-linter',
      'docker-compose-to-k8s',
      'docker-compose-to-kubernetes',
      'kubeconfig-validator',
      'kubernetes-deployment-generator',
      'helm-chart-yaml-generator',
    ],
  },
  {
    slug: 'ai-llm',
    title: 'AI & LLM Developer Tools',
    shortTitle: 'AI & LLM',
    description:
      'Estimate token and embedding costs, build function schemas, format prompt templates, and prepare text chunks for RAG and LLM workflows.',
    intro:
      'Use these utilities while building prompt pipelines, function calling, retrieval systems, token budgets, and model-cost estimates.',
    searchIntents: ['llm token counter', 'embedding cost calculator', 'openai function schema', 'rag chunking tool'],
    toolSlugs: [
      'llm-token-counter',
      'embedding-cost-calculator',
      'openai-function-schema',
      'prompt-template-formatter',
      'text-chunk-splitter',
    ],
  },
  {
    slug: 'sql-database',
    title: 'SQL & Database Developer Tools',
    shortTitle: 'SQL & Database',
    description:
      'Format SQL, generate database code, inspect index opportunities, build connection strings, and convert structured data into database-ready output.',
    intro:
      'Use this set when cleaning SQL, generating application models, preparing inserts, reviewing indexing, or configuring PostgreSQL connections.',
    searchIntents: ['sql formatter online', 'sql index advisor', 'json to sql', 'postgres connection string builder'],
    toolSlugs: [
      'sql-formatter',
      'sql-index-advisor',
      'json-to-sql',
      'sql-to-typescript',
      'postgres-connection-builder',
    ],
  },
  {
    slug: 'frontend-css',
    title: 'Frontend, CSS & Tailwind Developer Tools',
    shortTitle: 'Frontend & CSS',
    description:
      'Build, convert, inspect, and optimize CSS, Tailwind, HTML, responsive layouts, and accessible color systems.',
    intro:
      'Use this collection while styling interfaces, migrating CSS and Tailwind, building responsive layouts, or checking visual accessibility.',
    searchIntents: ['css developer tools', 'tailwind converter', 'css grid generator', 'color contrast checker'],
    toolSlugs: [
      'css-gradient',
      'css-grid-generator',
      'css-flexbox-generator',
      'css-clamp',
      'css-to-tailwind',
      'tailwind-to-css',
      'color-contrast-checker',
      'html-to-jsx',
    ],
  },
  {
    slug: 'encoding-conversion',
    title: 'Encoding & Data Representation Tools',
    shortTitle: 'Encoding',
    description:
      'Encode and decode Base64, URLs, hexadecimal, binary, Unicode, Punycode, and URL-safe data representations.',
    intro:
      'Use these tools when moving data between transport-safe encodings, debugging escaped content, or inspecting encoded values.',
    searchIntents: ['base64 encoder decoder', 'url encoder online', 'hex encoder', 'unicode escape tool'],
    toolSlugs: [
      'base64',
      'url-encoder',
      'base64url-encoder',
      'hex-encoder',
      'binary-encoder',
      'unicode-escape',
      'json-string-escape',
      'punycode-converter',
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
    ],
  },
  {
    slug: 'security-crypto',
    title: 'Security, Crypto & Certificate Developer Tools',
    shortTitle: 'Security & Crypto',
    description:
      'Inspect certificates, generate and verify hashes, evaluate browser security headers, and work with keys and signatures.',
    intro:
      'Use this collection for application-security checks, certificate troubleshooting, password hashing, signature verification, and CSP work.',
    searchIntents: ['sha256 file checksum', 'md5 checksum', 'certificate inspector', 'hmac generator'],
    toolSlugs: [
      'sha256-hash',
      'md5-hash',
      'password-strength-analyzer',
      'bcrypt-generator',
      'hmac-generator',
      'rsa-key-pair-generator',
      'certificate-decoder',
      'ssl-certificate-inspector',
      'csp-builder',
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
    ],
  },
  {
    slug: 'web-seo',
    title: 'Web SEO, Metadata & Structured Data Tools',
    shortTitle: 'Web SEO',
    description:
      'Generate metadata, robots rules, sitemaps, Open Graph previews, schema.org markup, and inspect indexing directives.',
    intro:
      'Use this collection while preparing pages for search engines and social previews or diagnosing metadata and indexing problems.',
    searchIntents: ['seo developer tools', 'meta tag generator', 'schema org generator', 'robots txt generator'],
    toolSlugs: [
      'meta-tags',
      'robots-txt-generator',
      'sitemap-generator',
      'open-graph-previewer',
      'nextjs-metadata-generator',
      'schema-org-generator',
      'opengraph-tag-inspector',
      'seo-robots-noindex-simulator',
    ],
  },
  {
    slug: 'text-content',
    title: 'Text, Markdown & Content Developer Tools',
    shortTitle: 'Text & Content',
    description:
      'Compare, count, normalize, sort, deduplicate, preview, and convert text and Markdown without uploading content.',
    intro:
      'Use these utilities for documentation, content cleanup, diff review, Markdown conversion, and everyday text manipulation.',
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
    ],
  },
  {
    slug: 'data-conversion',
    title: 'Data Format Conversion Tools',
    shortTitle: 'Data Conversion',
    description:
      'Convert JSON, CSV, XML, YAML, Excel, Markdown, and SQL-friendly data between common developer formats.',
    intro:
      'Use this collection when importing, exporting, reshaping, or moving structured data between applications and storage formats.',
    searchIntents: ['data converter online', 'json csv converter', 'xml json converter', 'excel json converter'],
    toolSlugs: [
      'json-csv',
      'csv-to-markdown',
      'csv-to-sql-insert',
      'xml-to-json',
      'json-to-xml',
      'yaml-json',
      'excel-to-json',
      'json-to-excel',
    ],
  },
  {
    slug: 'typescript-modeling',
    title: 'TypeScript, Schema & Model Generation Tools',
    shortTitle: 'Types & Models',
    description:
      'Turn JSON and schemas into TypeScript, Zod, Pydantic, Go, C#, Java, and other strongly typed application models.',
    intro:
      'Use these converters when bootstrapping typed clients, API models, validation schemas, or cross-language data contracts.',
    searchIntents: ['json to typescript', 'schema to zod', 'json to pydantic', 'model generator online'],
    toolSlugs: [
      'json-to-typescript',
      'json-to-pydantic',
      'json-to-go-struct',
      'json-to-csharp',
      'json-to-java-pojo',
      'typescript-to-json-schema',
      'typescript-interface-to-zod',
      'zod-to-typescript-type',
    ],
  },
  {
    slug: 'devops-infrastructure',
    title: 'DevOps & Infrastructure Configuration Tools',
    shortTitle: 'DevOps & Infra',
    description:
      'Format and generate Terraform, Ansible, systemd, Nginx, Caddy, IAM, and Prometheus configuration for infrastructure workflows.',
    intro:
      'Use this collection while provisioning infrastructure, configuring services, hardening web servers, or building observability rules.',
    searchIntents: ['devops tools online', 'terraform formatter', 'nginx formatter', 'iam policy builder'],
    toolSlugs: [
      'terraform-formatter',
      'terraform-module-scaffolder',
      'ansible-playbook-scaffolder',
      'systemd-unit-generator',
      'nginx-formatter',
      'caddy-to-nginx',
      'aws-iam-policy-builder',
      'prometheus-alert-builder',
    ],
  },
  {
    slug: 'network-http',
    title: 'HTTP, Network & DNS Developer Tools',
    shortTitle: 'HTTP & Network',
    description:
      'Inspect HTTP headers and status codes, test CORS and WebSockets, build DNS records, and calculate IP networks.',
    intro:
      'Use these tools while debugging browser requests, network configuration, caching, webhooks, DNS, or IP addressing.',
    searchIntents: ['http debugging tools', 'cors inspector', 'dns record generator', 'cidr calculator'],
    toolSlugs: [
      'http-headers-parser',
      'http-status-codes',
      'cache-control',
      'cors-preflight-inspector',
      'websocket-tester',
      'webhook-payload-simulator',
      'dns-record-generator',
      'cidr-calculator',
    ],
  },
  {
    slug: 'git-ci',
    title: 'Git, CI/CD & Repository Developer Tools',
    shortTitle: 'Git & CI/CD',
    description:
      'Build Git commands, conventional commits, ignore rules, CI matrices, pipelines, changelogs, and repository configuration.',
    intro:
      'Use this collection for everyday source-control tasks, repository automation, release notes, and continuous integration setup.',
    searchIntents: ['git tools online', 'conventional commit builder', 'gitignore generator', 'ci pipeline generator'],
    toolSlugs: [
      'git-command-builder',
      'conventional-commit-builder',
      'gitignore-generator',
      'gitignore-tester',
      'github-actions-matrix-builder',
      'gitlab-ci-generator',
      'gitlab-ci-pipeline-builder',
      'changelog-generator',
    ],
  },
  {
    slug: 'mobile-development',
    title: 'Mobile App Developer Tools',
    shortTitle: 'Mobile Development',
    description:
      'Generate and inspect Android, iOS, Flutter, React Native, Capacitor, icons, manifests, links, and app configuration.',
    intro:
      'Use this collection while configuring mobile apps, preparing assets, validating deep links, or generating platform-specific project files.',
    searchIntents: ['mobile developer tools', 'android manifest builder', 'ios plist builder', 'flutter theme generator'],
    toolSlugs: [
      'android-manifest-builder',
      'ios-plist-builder',
      'app-icon-resizer',
      'universal-links-validator',
      'flutter-theme-generator',
      'xcode-asset-catalog',
      'react-native-icon-finder',
      'capacitor-config-builder',
    ],
  },
  {
    slug: 'media-files',
    title: 'Image, PDF & Media Developer Tools',
    shortTitle: 'Media & Files',
    description:
      'Convert, compress, inspect, sanitize, merge, split, and transform images, PDFs, and media files in the browser.',
    intro:
      'Use this collection for quick asset preparation, image optimization, metadata cleanup, PDF manipulation, and media conversion.',
    searchIntents: ['image converter online', 'image compressor', 'pdf merger', 'remove exif data'],
    toolSlugs: [
      'image-converter',
      'image-compressor',
      'image-color-extractor',
      'image-exif-stripper',
      'images-to-pdf',
      'pdf-merger',
      'pdf-splitter',
      'video-to-gif',
    ],
  },
  {
    slug: 'testing-debugging',
    title: 'Testing, Validation & Debugging Tools',
    shortTitle: 'Testing & Debugging',
    description:
      'Compare code, test regular expressions, validate APIs, inspect HAR traffic, evaluate CSP, TLS, HTTP frames, and checksums.',
    intro:
      'Use these utilities to reproduce failures, validate artifacts, compare outputs, and inspect protocol-level behavior during debugging.',
    searchIntents: ['developer debugging tools', 'openapi validator', 'har viewer', 'regex tester online'],
    toolSlugs: [
      'code-side-by-side-diff',
      'regex-tester',
      'openapi-validator',
      'har-viewer',
      'csp-evaluator',
      'ssl-tls-handshake-simulator',
      'http2-http3-frame-inspector',
      'file-checksum-comparator',
    ],
  },
  {
    slug: 'time-cron',
    title: 'Date, Time & Cron Developer Tools',
    shortTitle: 'Time & Cron',
    description:
      'Convert timestamps, parse and generate cron expressions, translate schedules, calculate durations, and plan across time zones.',
    intro:
      'Use this collection when debugging scheduled jobs, converting timestamps, describing cron rules, or coordinating across time zones.',
    searchIntents: ['cron tools online', 'timestamp converter', 'cron generator', 'timezone meeting planner'],
    toolSlugs: [
      'timestamp-converter',
      'cron-parser',
      'cron-generator',
      'natural-language-to-cron',
      'crontab-descriptor',
      'cron-timezone-converter',
      'time-duration-calculator',
      'timezone-meeting-planner',
    ],
  },
] as const satisfies readonly ToolCollection[];

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

export function getLocalizedCollection(collection: ToolCollection, locale: Language): ToolCollection {
  if (locale === 'en') return collection;

  const topic = collectionLabels[locale][collection.slug] || collection.shortTitle;
  const template = localizedTemplates[locale];
  const fill = (value: string) => value.replaceAll('{topic}', topic);

  return {
    ...collection,
    title: fill(template.title),
    shortTitle: topic,
    description: fill(template.description),
    intro: fill(template.intro),
  };
}
