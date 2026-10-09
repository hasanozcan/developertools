import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

// Guards the client bundle: client components (and everything they import) must not pull in
// the full translation catalog or the server-only tool text helpers. Doing so would ship
// ~1 MB (232 KB gzipped) of locale data with every page again.

const SRC = path.resolve(__dirname, '..');
const FORBIDDEN = [
  'lib/i18nRouting',
  'lib/toolText',
  'lib/localizedToolPageCopy',
  'translations/index',
  'translations/enhancedTools',
  'translations/intentionalEnglish',
  ...['en', 'tr', 'de', 'es', 'fr', 'ru', 'zh'].map((locale) => `translations/${locale}`),
  ...['tr', 'de', 'es', 'fr', 'ru', 'zh'].map((locale) => `translations/pageCopy/${locale}`),
  // The full dictionaries hold every tool's strings; clients get ui/core plus their tool's own.
  'translations/toolDictionaryKeys',
  'lib/toolUiDictionary',
  ...['en', 'tr', 'de', 'es', 'fr', 'ru', 'zh'].flatMap((locale) => [
    `translations/ui/${locale}`,
    `translations/ui/completion/${locale}`,
  ]),
];

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (/\.(ts|tsx)$/.test(entry) && !/\.test\.(ts|tsx)$/.test(entry)) files.push(full);
  }
  return files;
}

function toModuleId(file: string): string {
  return path
    .relative(SRC, file)
    .replace(/\\/g, '/')
    .replace(/\.(ts|tsx)$/, '');
}

const resolvedImportCache = new Map<string, string | null>();

function resolveImport(from: string, specifier: string): string | null {
  let base: string;
  if (specifier.startsWith('@/')) base = path.join(SRC, specifier.slice(2));
  else if (specifier.startsWith('.')) base = path.resolve(path.dirname(from), specifier);
  else return null;
  if (resolvedImportCache.has(base)) return resolvedImportCache.get(base)!;
  for (const candidate of [
    `${base}.ts`,
    `${base}.tsx`,
    path.join(base, 'index.ts'),
    path.join(base, 'index.tsx'),
  ]) {
    if (existsSync(candidate)) {
      resolvedImportCache.set(base, candidate);
      return candidate;
    }
  }
  resolvedImportCache.set(base, null);
  return null;
}

const IMPORT_PATTERN =
  /(?:^|\n)\s*(?:import|export)\s+(type\s+)?(?:[^'";]*?\sfrom\s+)?['"]([^'"]+)['"]/g;
const DYNAMIC_IMPORT_PATTERN = /import\(\s*['"]([^'"]+)['"]\s*\)/g;
const runtimeImportCache = new Map<string, string[]>();

function runtimeImports(file: string): string[] {
  const cached = runtimeImportCache.get(file);
  if (cached) return cached;
  const source = readFileSync(file, 'utf8');
  const found: string[] = [];
  for (const match of source.matchAll(IMPORT_PATTERN)) {
    if (match[1]) continue; // `import type` is erased
    found.push(match[2]);
  }
  for (const match of source.matchAll(DYNAMIC_IMPORT_PATTERN)) found.push(match[1]);
  runtimeImportCache.set(file, found);
  return found;
}

describe('client bundle guard', () => {
  const files = walk(SRC);
  const clientFiles = files.filter((file) =>
    /^\s*(?:\/\/[^\n]*\n\s*)*['"]use client['"]/.test(readFileSync(file, 'utf8')),
  );

  it('finds client components', () => {
    expect(clientFiles.length).toBeGreaterThan(50);
  });

  it('never reaches the full translation catalog or server-only tool text from a client file', () => {
    const violations: string[] = [];

    for (const entry of clientFiles) {
      const seen = new Set<string>([entry]);
      const queue: { file: string; trail: string[] }[] = [{ file: entry, trail: [toModuleId(entry)] }];
      while (queue.length > 0) {
        const { file, trail } = queue.shift()!;
        for (const specifier of runtimeImports(file)) {
          const resolved = resolveImport(file, specifier);
          if (!resolved) continue;
          const id = toModuleId(resolved);
          if (FORBIDDEN.includes(id)) {
            violations.push([...trail, id].join(' -> '));
            continue;
          }
          if (seen.has(resolved)) continue;
          seen.add(resolved);
          queue.push({ file: resolved, trail: [...trail, id] });
        }
      }
    }

    expect(violations.slice(0, 10)).toEqual([]);
  });
});
