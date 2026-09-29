import type { Language } from '@/lib/i18nRouting';

/**
 * Topic groups used to organise the /collections index (48 collections are too many for one
 * flat grid). Every collection slug must appear in exactly one group; the guard lives in
 * `collectionGroups.test.ts`. Slugs that are not listed fall into the trailing "more" group at
 * render time so a newly added collection is never dropped from the index.
 */
export interface CollectionGroup {
  id: string;
  title: Record<Language, string>;
  slugs: readonly string[];
}

export const collectionGroups: readonly CollectionGroup[] = [
  {
    id: 'api-web',
    title: {
      en: 'APIs, HTTP & Testing',
      tr: 'API, HTTP ve Test',
      de: 'APIs, HTTP und Tests',
      es: 'APIs, HTTP y pruebas',
      fr: 'API, HTTP et tests',
      ru: 'API, HTTP и тестирование',
      zh: 'API、HTTP 与测试',
    },
    slugs: [
      'api-debugging',
      'curl-converters',
      'api-schemas',
      'network-http',
      'dns-networking',
      'web-servers',
      'testing-debugging',
      'test-data',
    ],
  },
  {
    id: 'data-formats',
    title: {
      en: 'Data, JSON & Encoding',
      tr: 'Veri, JSON ve Kodlama',
      de: 'Daten, JSON und Kodierung',
      es: 'Datos, JSON y codificación',
      fr: 'Données, JSON et encodage',
      ru: 'Данные, JSON и кодирование',
      zh: '数据、JSON 与编码',
    },
    slugs: [
      'json-development',
      'json-query-transform',
      'json-to-code',
      'data-conversion',
      'typescript-modeling',
      'encoding-conversion',
      'number-bases',
      'unique-ids',
      'time-cron',
    ],
  },
  {
    id: 'databases',
    title: {
      en: 'Databases',
      tr: 'Veritabanları',
      de: 'Datenbanken',
      es: 'Bases de datos',
      fr: 'Bases de données',
      ru: 'Базы данных',
      zh: '数据库',
    },
    slugs: ['sql-database', 'orm-schema', 'nosql-databases'],
  },
  {
    id: 'frontend',
    title: {
      en: 'Frontend, CSS & Mobile',
      tr: 'Frontend, CSS ve Mobil',
      de: 'Frontend, CSS und Mobile',
      es: 'Frontend, CSS y móvil',
      fr: 'Frontend, CSS et mobile',
      ru: 'Фронтенд, CSS и мобильная разработка',
      zh: '前端、CSS 与移动开发',
    },
    slugs: [
      'frontend-css',
      'css-effects',
      'css-layout-animation',
      'tailwind-css',
      'color-accessibility',
      'svg-icons',
      'web-seo',
      'formatters-minifiers',
      'mobile-development',
    ],
  },
  {
    id: 'security',
    title: {
      en: 'Security & Cryptography',
      tr: 'Güvenlik ve Kriptografi',
      de: 'Sicherheit und Kryptografie',
      es: 'Seguridad y criptografía',
      fr: 'Sécurité et cryptographie',
      ru: 'Безопасность и криптография',
      zh: '安全与密码学',
    },
    slugs: [
      'jwt-authentication',
      'security-crypto',
      'hashing-checksums',
      'passwords-secrets',
      'certificates-keys',
      'web3-blockchain',
    ],
  },
  {
    id: 'devops',
    title: {
      en: 'DevOps & Infrastructure',
      tr: 'DevOps ve Altyapı',
      de: 'DevOps und Infrastruktur',
      es: 'DevOps e infraestructura',
      fr: 'DevOps et infrastructure',
      ru: 'DevOps и инфраструктура',
      zh: 'DevOps 与基础设施',
    },
    slugs: [
      'docker-kubernetes',
      'devops-infrastructure',
      'infrastructure-as-code',
      'git-ci',
      'project-config',
    ],
  },
  {
    id: 'ai',
    title: {
      en: 'AI & LLM Development',
      tr: 'AI ve LLM Geliştirme',
      de: 'KI- und LLM-Entwicklung',
      es: 'Desarrollo con IA y LLM',
      fr: 'Développement IA et LLM',
      ru: 'Разработка с ИИ и LLM',
      zh: 'AI 与 LLM 开发',
    },
    slugs: ['ai-llm', 'llm-tokens-costs', 'prompt-engineering', 'ai-agents-rag'],
  },
  {
    id: 'text-media',
    title: {
      en: 'Text, Docs & Media',
      tr: 'Metin, Dokümanlar ve Medya',
      de: 'Text, Doku und Medien',
      es: 'Texto, documentación y medios',
      fr: 'Texte, documentation et médias',
      ru: 'Текст, документация и медиа',
      zh: '文本、文档与媒体',
    },
    slugs: ['text-content', 'text-processing', 'markdown-docs', 'media-files'],
  },
];

export const otherCollectionsTitle: Record<Language, string> = {
  en: 'More collections',
  tr: 'Diğer koleksiyonlar',
  de: 'Weitere Sammlungen',
  es: 'Más colecciones',
  fr: 'Autres collections',
  ru: 'Другие коллекции',
  zh: '更多合集',
};

/** Splits collection slugs into ordered groups; unknown slugs land in a trailing "more" group. */
export function groupCollectionSlugs(
  allSlugs: readonly string[],
  locale: Language,
): { id: string; title: string; slugs: string[] }[] {
  const available = new Set(allSlugs);
  const used = new Set<string>();
  const groups = collectionGroups
    .map((group) => {
      const slugs = group.slugs.filter((slug) => available.has(slug));
      slugs.forEach((slug) => used.add(slug));
      return { id: group.id, title: group.title[locale], slugs };
    })
    .filter((group) => group.slugs.length > 0);
  const rest = allSlugs.filter((slug) => !used.has(slug));
  if (rest.length > 0) groups.push({ id: 'more', title: otherCollectionsTitle[locale], slugs: rest });
  return groups;
}
