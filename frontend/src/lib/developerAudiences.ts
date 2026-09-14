import { findCatalogTool, type Tool, type ToolSlug } from '@/lib/api';
import type { Language } from '@/lib/i18nRouting';
import { getToolCollection, type ToolCollection } from '@/lib/toolCollections';

export interface DeveloperAudience {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  intro: string;
  collectionSlugs: readonly string[];
  toolSlugs: readonly ToolSlug[];
}

export const developerAudiences = [
  {
    slug: 'api-developers',
    title: 'Free Tools for API Developers',
    shortTitle: 'API Developers',
    description: 'A focused toolbox for API requests, OpenAPI, Postman, authentication, WebSockets, HTTP debugging, and contract validation.',
    intro: 'Move from reproducing an API request to documenting, validating, testing, and securing it with connected browser-based tools.',
    collectionSlugs: ['api-debugging', 'network-http', 'jwt-authentication'],
    toolSlugs: ['curl-builder', 'curl-to-postman', 'postman-to-openapi', 'openapi-validator', 'websocket-tester', 'jwt-decoder'],
  },
  {
    slug: 'frontend-developers',
    title: 'Free Tools for Frontend Developers',
    shortTitle: 'Frontend Developers',
    description: 'CSS, Tailwind, HTML, responsive design, accessibility, metadata, SVG, and browser debugging utilities for frontend work.',
    intro: 'Build and inspect interface code, convert styles, validate visual accessibility, and prepare production-ready metadata and assets.',
    collectionSlugs: ['frontend-css', 'web-seo', 'testing-debugging'],
    toolSlugs: ['css-grid-generator', 'css-flexbox-generator', 'css-to-tailwind', 'color-contrast-checker', 'html-to-jsx', 'nextjs-metadata-generator'],
  },
  {
    slug: 'backend-developers',
    title: 'Free Tools for Backend Developers',
    shortTitle: 'Backend Developers',
    description: 'API, JSON, SQL, authentication, schema, hashing, and infrastructure helpers for backend application development.',
    intro: 'Use these tools to shape contracts, inspect requests, model data, troubleshoot authentication, and move between database and application code.',
    collectionSlugs: ['api-debugging', 'sql-database', 'security-crypto'],
    toolSlugs: ['json-formatter', 'openapi-validator', 'sql-formatter', 'json-to-sql', 'jwt-signature-validator', 'bcrypt-generator'],
  },
  {
    slug: 'devops-engineers',
    title: 'Free Tools for DevOps Engineers',
    shortTitle: 'DevOps Engineers',
    description: 'Docker, Kubernetes, Terraform, CI/CD, systemd, Nginx, IAM, networking, cron, and observability tools for operations workflows.',
    intro: 'Generate, inspect, convert, and validate infrastructure configuration without leaving the browser.',
    collectionSlugs: ['devops-infrastructure', 'docker-kubernetes', 'git-ci'],
    toolSlugs: ['dockerfile-generator', 'docker-compose-to-k8s', 'kubeconfig-validator', 'terraform-formatter', 'github-actions-matrix-builder', 'prometheus-alert-builder'],
  },
  {
    slug: 'security-engineers',
    title: 'Free Tools for Security Engineers',
    shortTitle: 'Security Engineers',
    description: 'JWT, TLS, certificates, CSP, hashing, signatures, security headers, keys, and authentication utilities for application security work.',
    intro: 'Inspect security-sensitive artifacts, verify configuration, and troubleshoot common web authentication and transport-security problems.',
    collectionSlugs: ['security-crypto', 'jwt-authentication', 'network-http'],
    toolSlugs: ['jwt-signature-validator', 'ssl-certificate-inspector', 'csp-evaluator', 'http-security-headers-analyzer', 'ssh-key-inspector', 'file-checksum-comparator'],
  },
  {
    slug: 'data-engineers',
    title: 'Free Tools for Data Engineers',
    shortTitle: 'Data Engineers',
    description: 'JSON, CSV, SQL, schema, Excel, XML, Parquet schema, and database conversion tools for data pipelines and integration work.',
    intro: 'Inspect and reshape structured data, prepare database loads, translate schemas, and verify payloads before they enter a pipeline.',
    collectionSlugs: ['data-conversion', 'sql-database', 'json-development'],
    toolSlugs: ['json-csv', 'csv-to-sql-insert', 'excel-to-json', 'json-schema-validator', 'sql-formatter', 'csv-to-parquet-schema'],
  },
  {
    slug: 'ai-engineers',
    title: 'Free Tools for AI & LLM Engineers',
    shortTitle: 'AI & LLM Engineers',
    description: 'Token, cost, prompt, structured output, RAG chunking, function calling, and dataset tools for production LLM workflows.',
    intro: 'Estimate model usage, structure prompts, prepare retrieval chunks, validate datasets, and build function-calling contracts.',
    collectionSlugs: ['ai-llm', 'json-development', 'api-debugging'],
    toolSlugs: ['llm-token-counter', 'llm-pricing-calculator', 'openai-function-schema', 'openai-structured-outputs', 'rag-chunking-calculator', 'jsonl-dataset-validator'],
  },
  {
    slug: 'mobile-developers',
    title: 'Free Tools for Mobile Developers',
    shortTitle: 'Mobile Developers',
    description: 'Android, iOS, Flutter, React Native, deep links, icons, manifests, mobile configuration, API, and certificate utilities.',
    intro: 'Prepare platform configuration, inspect app assets, validate links, and troubleshoot the API and security pieces around mobile apps.',
    collectionSlugs: ['mobile-development', 'api-debugging', 'security-crypto'],
    toolSlugs: ['android-manifest-builder', 'ios-plist-builder', 'app-icon-resizer', 'universal-links-validator', 'flutter-theme-generator', 'android-keystore-fingerprint'],
  },
  {
    slug: 'database-developers',
    title: 'Free Tools for Database Developers',
    shortTitle: 'Database Developers',
    description: 'SQL formatting, explain plans, indexes, schema conversion, ORM generation, connection strings, and structured-data import helpers.',
    intro: 'Move between SQL, application models, ORM schemas, and database diagnostics with a focused set of tools.',
    collectionSlugs: ['sql-database', 'data-conversion', 'typescript-modeling'],
    toolSlugs: ['sql-formatter', 'sql-index-advisor', 'postgres-explain-visualizer', 'postgres-connection-builder', 'sql-to-prisma', 'sql-to-python-sqlalchemy'],
  },
  {
    slug: 'qa-engineers',
    title: 'Free Tools for QA & Test Engineers',
    shortTitle: 'QA Engineers',
    description: 'API validation, request conversion, regex, diffs, mock responses, webhooks, HAR, and protocol inspection tools for testing workflows.',
    intro: 'Reproduce requests, compare outputs, validate contracts, simulate payloads, and inspect browser/network behavior during test execution.',
    collectionSlugs: ['testing-debugging', 'api-debugging', 'network-http'],
    toolSlugs: ['code-side-by-side-diff', 'regex-tester', 'openapi-validator', 'api-mock-response-generator', 'webhook-payload-simulator', 'har-viewer'],
  },
] as const satisfies readonly DeveloperAudience[];

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

export function getLocalizedAudience(audience: DeveloperAudience, locale: Language): DeveloperAudience {
  if (locale === 'en') return audience;
  const role = audienceLabels[locale][audience.slug] || audience.shortTitle;
  const template = audienceTemplates[locale];
  const fill = (value: string) => value.replaceAll('{role}', role);
  return { ...audience, title: fill(template.title), shortTitle: role, description: fill(template.description), intro: fill(template.intro) };
}
