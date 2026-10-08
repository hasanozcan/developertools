import 'server-only';
import type { Language } from './localeRouting';
import type { ToolPageContent } from './toolPageContent';
import { textTranslationKey } from './localizedText';

type PageCopy = Readonly<Record<string, string>>;
type LocalizedContent = Pick<ToolPageContent, 'faqs' | 'answerSections'>;

// Long-form copy stays on the server; only the requested locale is loaded.
const loaders = {
  tr: async () => (await import('@/translations/pageCopy/tr')).trPageCopy,
  de: async () => (await import('@/translations/pageCopy/de')).dePageCopy,
  es: async () => (await import('@/translations/pageCopy/es')).esPageCopy,
  fr: async () => (await import('@/translations/pageCopy/fr')).frPageCopy,
  ru: async () => (await import('@/translations/pageCopy/ru')).ruPageCopy,
  zh: async () => (await import('@/translations/pageCopy/zh')).zhPageCopy,
};
const cache = new Map<Language, Promise<PageCopy>>();

export async function getToolPageCopyDictionary(locale: Language): Promise<PageCopy> {
  if (locale === 'en') return {};
  let pending = cache.get(locale);
  if (!pending) {
    pending = loaders[locale]();
    cache.set(locale, pending);
  }
  return pending;
}

export async function localizeToolPageCopy(
  content: LocalizedContent,
  locale: Language,
): Promise<LocalizedContent> {
  if (locale === 'en') return content;
  const dictionary = await getToolPageCopyDictionary(locale);
  const translate = (text: string) => dictionary[textTranslationKey(text, 'pageText')] || text;
  return {
    faqs: content.faqs.map(({ question, answer }) => ({
      question: translate(question),
      answer: translate(answer),
    })),
    answerSections: content.answerSections?.map((section) => ({
      ...section,
      heading: translate(section.heading),
      paragraphs: section.paragraphs?.map(translate),
      bullets: section.bullets?.map(translate),
    })),
  };
}
