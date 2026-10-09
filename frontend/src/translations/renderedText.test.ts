import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { translations, type Language } from './index';
import { toolPageContent } from '@/lib/toolPageContent';
import { textTranslationKey } from '@/lib/localizedText';
import { enUi } from './ui/en';
import { trUi } from './ui/tr';
import { deUi } from './ui/de';
import { esUi } from './ui/es';
import { frUi } from './ui/fr';
import { ruUi } from './ui/ru';
import { zhUi } from './ui/zh';

// These tests guard what the browser actually renders: `t()` returns dictionary values
// verbatim, so markup-level conveniences that JSX text allowed (HTML entities, whitespace
// next to inline elements) do not survive the move into a dictionary.

const clientDictionaries: Record<Language, Record<string, string>> = {
  en: enUi,
  tr: trUi,
  de: deUi,
  es: esUi,
  fr: frUi,
  ru: ruUi,
  zh: zhUi,
};
const locales = Object.keys(clientDictionaries) as Language[];
const sourceRoot = path.resolve(__dirname, '..');

function sources(dir: string, includeTranslations = false): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return entry.name === 'translations' && !includeTranslations ? [] : sources(file);
    }
    return /\.tsx?$/.test(file) && !/\.test\./.test(file) ? [file] : [];
  });
}

/** String-literal keys a `t(...)` argument can evaluate to (plain literals and ternary branches). */
function literalKeys(node: ts.Expression): string[] {
  if (ts.isStringLiteralLike(node)) return [node.text];
  if (ts.isParenthesizedExpression(node)) return literalKeys(node.expression);
  if (ts.isConditionalExpression(node)) {
    return [...literalKeys(node.whenTrue), ...literalKeys(node.whenFalse)];
  }
  return [];
}

describe('rendered translation text', () => {
  it('contains no HTML entities, which React would print literally', () => {
    const offenders = locales.flatMap((locale) => [
      ...Object.entries(clientDictionaries[locale])
        .filter(([, value]) => /&(?:[A-Za-z][A-Za-z0-9]*|#\d+|#x[0-9A-Fa-f]+);/.test(value))
        .map(([key, value]) => `${locale}:${key}=${value}`),
      ...Object.entries(translations[locale])
        .filter(([, value]) => /&(?:[A-Za-z][A-Za-z0-9]*|#\d+|#x[0-9A-Fa-f]+);/.test(value))
        .map(([key, value]) => `${locale}:${key}=${value}`),
    ]);
    expect([...new Set(offenders)]).toEqual([]);
  });

  it('resolves every literal t() key in the client dictionary of every locale', () => {
    const used = new Map<string, string>();
    for (const file of sources(sourceRoot)) {
      const source = ts.createSourceFile(
        file,
        readFileSync(file, 'utf8'),
        ts.ScriptTarget.Latest,
        true,
      );
      const visit = (node: ts.Node) => {
        if (
          ts.isCallExpression(node) &&
          node.expression.getText(source) === 't' &&
          node.arguments[0]
        ) {
          for (const key of literalKeys(node.arguments[0])) {
            used.set(key, path.relative(sourceRoot, file));
          }
        }
        ts.forEachChild(node, visit);
      };
      visit(source);
    }
    const missing = locales.flatMap((locale) =>
      [...used]
        // Tool names and descriptions are supplied per page, not by the client dictionary.
        .filter(([key]) => !/^tool(Name|Desc)\./.test(key))
        .filter(([key]) => !clientDictionaries[locale][key]?.trim())
        .map(([key, file]) => `${locale}:${key} (${file})`),
    );
    expect(missing).toEqual([]);
    expect(used.size).toBeGreaterThan(1_000);
  });

  it('keeps a space between a translated label and the value or element that follows it', () => {
    // Dictionary values are trimmed, so JSX such as `Quality: {quality}` must keep its space.
    // Reviewed adjacencies where no space is intended:
    const reviewed = new Set([
      'components/layout/Header.tsx:uiText.11e991fd', // "Devs" + <span>Tools</span> wordmark
      'components/seo/SearchConsoleOpportunityPanel.tsx:uiText.2c9b6318', // label text, then a hidden input
      'app/(default)/privacy/page.tsx:privacy.lastUpdated', // the next value starts with ": "
      'app/(default)/terms/page.tsx:terms.lastUpdated', // the next value starts with ": "
      // Label text sat on its own line above the control in the original markup (no space).
      'components/tools/CaseConverterTool.tsx:uiText.2f45eb41',
      'components/tools/EncodingWorkbench.tsx:common.format',
      'components/tools/EncodingWorkbench.tsx:common.input',
    ]);
    const violations: string[] = [];
    for (const file of sources(sourceRoot).filter((name) => name.endsWith('.tsx'))) {
      const relative = path.relative(sourceRoot, file).replace(/\\/g, '/');
      const text = readFileSync(file, 'utf8');
      for (const match of text.matchAll(/\{t\((["'])([^"']+)\1\)\}/g)) {
        const key = match[2];
        const value = enUi[key];
        if (value === undefined) continue;
        const after = text.slice(match.index + match[0].length);
        if (!/^(\{|<(?!\/))/.test(after)) continue;
        if (/^\{\s*(['"]) \1\s*[}+]/.test(after)) continue; // explicit {' '} separator
        if (!/[\p{L}\p{N}:;,.!?)\]%]$/u.test(value)) continue;
        if (reviewed.has(`${relative}:${key}`)) continue;
        const line = text.slice(0, match.index).split('\n').length;
        violations.push(`${relative}:${line} "${value}"`);
      }
    }
    expect(violations).toEqual([]);
  });

  it('gives every distinct page text its own translation key', () => {
    const texts = new Set<string>();
    for (const tools of Object.values(toolPageContent)) {
      for (const tool of Object.values(tools)) {
        for (const faq of tool.faqs) {
          texts.add(faq.question);
          texts.add(faq.answer);
        }
        for (const section of tool.answerSections ?? []) {
          texts.add(section.heading);
          for (const text of [...(section.paragraphs ?? []), ...(section.bullets ?? [])]) {
            texts.add(text);
          }
        }
      }
    }
    const keys = new Set([...texts].map((text) => textTranslationKey(text, 'pageText')));
    expect(keys.size).toBe(texts.size);
  });
});
