import { diagnosticTemplates } from './diagnosticTemplates';

type Translate = (key: string) => string;

/** Stable key for audited source text; no dictionary or other locale is imported. */
export function textTranslationKey(text: string, prefix = 'uiText'): string {
  const normalized = prefix === 'uiText' ? text.replace(/\s+/g, ' ').trim() : text;
  let hash = 2166136261;
  for (let index = 0; index < normalized.length; index++) {
    hash = Math.imul(hash ^ normalized.charCodeAt(index), 16777619) >>> 0;
  }
  return `${prefix}.${hash.toString(16).padStart(8, '0')}`;
}

/** Translate reviewed display labels or local diagnostics, leaving unknown values intact. */
export function localizeUiText(text: string, t: Translate): string {
  if (!text) return text;
  const key = textTranslationKey(text);
  const translated = t(key);
  if (translated && translated !== key) return translated;
  for (const template of diagnosticTemplates) {
    if (!text.startsWith(template.parts[0])) continue;
    const values: Record<string, string> = {};
    let offset = template.parts[0].length;
    let matches = true;
    for (let index = 1; index < template.parts.length; index++) {
      const part = template.parts[index];
      const last = index === template.parts.length - 1;
      const end = last ? text.length - part.length : text.indexOf(part, offset);
      if (end < offset || (last && !text.endsWith(part))) {
        matches = false;
        break;
      }
      values[`value${index}`] = text.slice(offset, end);
      offset = end + part.length;
    }
    if (!matches || offset !== text.length) continue;
    const message = t(template.key);
    if (message && message !== template.key) return interpolateText(message, values);
  }
  return text;
}

/** Named replacement avoids locale-dependent word order in counters and messages. */
export function interpolateText(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (match, name: string) =>
    Object.hasOwn(values, name) ? String(values[name]) : match,
  );
}

export function translateCount(t: Translate, locale: string, key: string, count: number): string {
  const plural = new Intl.PluralRules(locale).select(count);
  return interpolateText(t(`${key}.${plural}`) || t(`${key}.other`), { count });
}
