import 'server-only';
import type { Language } from './localeRouting';
import { toolDictionaryKeys } from '@/translations/toolDictionaryKeys';

// Strings only one tool reads are not part of the shared client dictionary. The tool page
// looks them up here and hands them to <ToolDictionaryProvider>, so they travel with that
// page instead of with every page. Only the requested locale is loaded.
type UiDictionary = Readonly<Record<string, string>>;

const loaders: Record<Language, () => Promise<UiDictionary>> = {
  en: async () => (await import('@/translations/ui/en')).enUi,
  tr: async () => (await import('@/translations/ui/tr')).trUi,
  de: async () => (await import('@/translations/ui/de')).deUi,
  es: async () => (await import('@/translations/ui/es')).esUi,
  fr: async () => (await import('@/translations/ui/fr')).frUi,
  ru: async () => (await import('@/translations/ui/ru')).ruUi,
  zh: async () => (await import('@/translations/ui/zh')).zhUi,
};

export async function getToolUiDictionary(
  locale: Language,
  toolSlug: string,
): Promise<Record<string, string>> {
  const keys = toolDictionaryKeys[toolSlug];
  if (!keys) return {};
  const dictionary = await loaders[locale]();
  const result: Record<string, string> = {};
  for (const key of keys) {
    const value = dictionary[key];
    if (value) result[key] = value;
  }
  return result;
}
