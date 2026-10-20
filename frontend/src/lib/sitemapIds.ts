import { NON_DEFAULT_LOCALES } from '@/lib/localeRouting';

// One child sitemap per locale, served at /sitemap/<id>.xml and listed by the
// sitemap index at /sitemap.xml.
export const SITEMAP_IDS = ['en', ...NON_DEFAULT_LOCALES] as const;
