import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import vm from 'node:vm';

// Splits the client UI dictionary into keys every page needs ("core") and keys that only
// one tool's component tree reads ("scoped"). A key is scoped only when it is provably
// referenced solely from tool-only source files. Anything unreferenced, referenced from
// shared code, or reachable through a dynamic key prefix stays in core, so a missed
// reference can never blank out text on a page that used to have it.

const requireFromFrontend = (root) => createRequire(path.join(root, 'package.json'));

function loadTsModule(ts, file, cache = new Map()) {
  if (cache.has(file)) return cache.get(file).exports;
  const source = readFileSync(file, 'utf8');
  const js = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const mod = { exports: {} };
  cache.set(file, mod);
  const resolver = (spec) => {
    if (!spec.startsWith('.')) throw new Error(`Unexpected import ${spec} in ${file}`);
    const base = path.resolve(path.dirname(file), spec);
    for (const candidate of [`${base}.ts`, `${base}.tsx`, path.join(base, 'index.ts')]) {
      if (existsSync(candidate)) return loadTsModule(ts, candidate, cache);
    }
    throw new Error(`Cannot resolve ${spec} from ${file}`);
  };
  vm.runInNewContext(js, { module: mod, exports: mod.exports, require: resolver });
  return mod.exports;
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

export function analyzeUiDictionaries(frontendRoot) {
  const ts = requireFromFrontend(frontendRoot)('typescript');
  const src = path.join(frontendRoot, 'src');
  const norm = (file) => path.relative(src, file).replace(/\\/g, '/');

  const cache = new Map();
  const enUi = loadTsModule(ts, path.join(src, 'translations/ui/en.ts'), cache).enUi;
  const textTranslationKey = loadTsModule(ts, path.join(src, 'lib/localizedText.ts'), cache).textTranslationKey;
  const universe = Object.keys(enUi);
  const universeSet = new Set(universe);

  const files = walk(src).filter(
    (file) =>
      /\.tsx?$/.test(file) &&
      !/\.d\.ts$/.test(file) &&
      !/\.test\.tsx?$/.test(file) &&
      !norm(file).startsWith('translations/') &&
      !norm(file).startsWith('test/'),
  );
  const fileSet = new Set(files);

  const resolveImport = (from, spec) => {
    let base;
    if (spec.startsWith('@/')) base = path.join(src, spec.slice(2));
    else if (spec.startsWith('.')) base = path.resolve(path.dirname(from), spec);
    else return null;
    for (const candidate of [base, `${base}.ts`, `${base}.tsx`, path.join(base, 'index.ts'), path.join(base, 'index.tsx')]) {
      if (fileSet.has(candidate)) return candidate;
    }
    return null;
  };

  const parsed = new Map();
  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    const sourceFile = ts.createSourceFile(
      file,
      text,
      ts.ScriptTarget.Latest,
      true,
      file.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    );
    const imports = new Set();
    const literals = new Set();
    const visit = (node) => {
      if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
        if (node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) imports.add(node.moduleSpecifier.text);
      } else if (
        ts.isCallExpression(node) &&
        node.expression.kind === ts.SyntaxKind.ImportKeyword &&
        node.arguments[0] &&
        ts.isStringLiteralLike(node.arguments[0])
      ) {
        imports.add(node.arguments[0].text);
      } else if (ts.isStringLiteralLike(node)) {
        literals.add(node.text);
      } else if (ts.isTemplateExpression(node)) {
        literals.add(node.head.text);
        for (const span of node.templateSpans) literals.add(span.literal.text);
      }
      ts.forEachChild(node, visit);
    };
    visit(sourceFile);
    parsed.set(file, { imports: [...imports], literals });
  }

  // Keys a file can reach: exact key literals, the hash key of a display-text literal
  // (localizeUiText), and key families named by a literal prefix or a plural stem.
  const keysCache = new Map();
  const keysOf = (file) => {
    if (keysCache.has(file)) return keysCache.get(file);
    const keys = new Set();
    for (const literal of parsed.get(file).literals) {
      if (!literal) continue;
      if (universeSet.has(literal)) keys.add(literal);
      const hashed = textTranslationKey(literal);
      if (universeSet.has(hashed)) keys.add(hashed);
      if (literal.includes('.') && literal.length >= 3) {
        const prefix = literal.endsWith('.') ? literal : `${literal}.`;
        for (const key of universe) if (key.startsWith(prefix)) keys.add(key);
      }
    }
    keysCache.set(file, keys);
    return keys;
  };

  // Tool slug -> component file, from the dynamic imports in ToolRenderer.
  const rendererFile = path.join(src, 'components/tools/ToolRenderer.tsx');
  const toolRoots = new Map();
  for (const match of readFileSync(rendererFile, 'utf8').matchAll(/'([a-z0-9-]+)':\s*dynamic\(\(\)\s*=>\s*import\('([^']+)'\)/g)) {
    const target = resolveImport(rendererFile, match[2]);
    if (!target) throw new Error(`ToolRenderer entry ${match[1]} does not resolve`);
    toolRoots.set(match[1], target);
  }
  const toolRootFiles = new Set(toolRoots.values());

  const edges = (file) =>
    parsed
      .get(file)
      .imports.map((spec) => resolveImport(file, spec))
      .filter((target) => target && !(file === rendererFile && toolRootFiles.has(target)));

  // Shared code: everything outside components/tools and lib (plus the page wrapper and
  // renderer), and whatever it imports.
  const isShellRoot = (file) => {
    const rel = norm(file);
    if (rel.startsWith('lib/')) return false;
    if (rel.startsWith('components/tools/')) {
      return file === rendererFile || rel === 'components/tools/ToolPageWrapper.tsx';
    }
    return true;
  };
  const shell = new Set();
  const queue = files.filter(isShellRoot);
  while (queue.length > 0) {
    const file = queue.pop();
    if (shell.has(file)) continue;
    shell.add(file);
    for (const target of edges(file)) if (!shell.has(target)) queue.push(target);
  }

  const referenced = new Set();
  for (const file of files) for (const key of keysOf(file)) referenced.add(key);

  const core = new Set(universe.filter((key) => !referenced.has(key)));
  for (const file of shell) for (const key of keysOf(file)) core.add(key);

  const tools = {};
  for (const [slug, root] of toolRoots) {
    const seen = new Set();
    const stack = [root];
    const keys = new Set();
    while (stack.length > 0) {
      const file = stack.pop();
      if (seen.has(file) || shell.has(file)) continue;
      seen.add(file);
      for (const key of keysOf(file)) if (!core.has(key)) keys.add(key);
      for (const target of edges(file)) stack.push(target);
    }
    if (keys.size > 0) tools[slug] = universe.filter((key) => keys.has(key));
  }

  return {
    universe,
    core: universe.filter((key) => core.has(key)),
    tools,
    stats: {
      universe: universe.length,
      core: core.size,
      scoped: universe.length - core.size,
      toolsWithKeys: Object.keys(tools).length,
      maxToolKeys: Math.max(0, ...Object.values(tools).map((keys) => keys.length)),
      unreferenced: universe.filter((key) => !referenced.has(key)).length,
      shellFiles: shell.size,
    },
  };
}

const LOCALES = ['en', 'tr', 'de', 'es', 'fr', 'ru', 'zh'];
const HEADER =
  '// @generated by scripts/split-ui-dictionaries.mjs. Do not edit by hand:\n' +
  '// run `npm run i18n:split` after changing a UI dictionary or a tool component.\n';

/** The generated files (path relative to the frontend root -> content). */
export function renderSplitOutputs(frontendRoot) {
  const ts = requireFromFrontend(frontendRoot)('typescript');
  const src = path.join(frontendRoot, 'src');
  const analysis = analyzeUiDictionaries(frontendRoot);
  const cache = new Map();
  const outputs = new Map();

  for (const locale of LOCALES) {
    const full = loadTsModule(ts, path.join(src, `translations/ui/${locale}.ts`), cache)[`${locale}Ui`];
    const entries = analysis.core.map((key) => {
      if (typeof full[key] !== 'string') throw new Error(`${locale} dictionary lacks core key ${key}`);
      return `  ${JSON.stringify(key)}: ${JSON.stringify(full[key])},\n`;
    });
    outputs.set(
      `src/translations/ui/core/${locale}.ts`,
      `${HEADER}// Strings every page needs. Strings that only one tool reads are sent by that tool's page.\n` +
        `export const ${locale}UiCore: Record<string, string> = {\n${entries.join('')}};\n`,
    );
  }

  const tools = Object.entries(analysis.tools).map(
    ([slug, keys]) => `  ${JSON.stringify(slug)}: ${JSON.stringify(keys)},\n`,
  );
  outputs.set(
    'src/translations/toolDictionaryKeys.ts',
    `${HEADER}// Server only: which UI dictionary keys each tool page adds to the shared client dictionary.\n` +
      `export const toolDictionaryKeys: Readonly<Record<string, readonly string[]>> = {\n${tools.join('')}};\n`,
  );
  return { outputs, analysis };
}
