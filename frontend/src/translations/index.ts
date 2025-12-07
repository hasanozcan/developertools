import { en } from './en';
import { tr } from './tr';
import { de } from './de';
import { es } from './es';
import { fr } from './fr';
import { ru } from './ru';
import { zh } from './zh';

export type Language = 'en' | 'tr' | 'de' | 'es' | 'fr' | 'ru' | 'zh';
export type TranslationMap = Record<string, string>;

export const translations: Record<Language, TranslationMap> = {
  en,
  tr,
  de,
  es,
  fr,
  ru,
  zh
};
