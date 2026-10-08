import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, realpathSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Registry advisory matching does not inspect a private source replacement.
// Verify the reviewed bytes and every installed consumer before running audit.
const root = fileURLToPath(new URL('../', import.meta.url));
const sourceRoot = path.join(root, 'vendor/guarded-braces');
const sourceEntry = realpathSync(path.join(sourceRoot, 'index.js'));
const localRequire = createRequire(path.join(root, 'package.json'));
const loadJson = (file) => JSON.parse(readFileSync(file, 'utf8'));
const upstream = loadJson(path.join(sourceRoot, 'UPSTREAM.json'));
const manifest = loadJson(path.join(sourceRoot, 'PATCH-INTEGRITY.json'));
const lock = loadJson(path.join(root, 'package-lock.json'));
const metadata = loadJson(path.join(sourceRoot, 'package.json'));
assert.equal(metadata.name, '@devstools/guarded-braces');
assert.equal(metadata.private, true);
assert.equal(upstream.advisory.id, 'GHSA-vfj7-8cjw-p6xm');
assert.equal(upstream.sourcePackage, 'braces');
assert.equal(upstream.sourceVersion, '3.0.3');
assert.equal(manifest.algorithm, 'sha256-normalized-lf');
const runtimeFiles = [
  'index.js',
  ...readdirSync(path.join(sourceRoot, 'lib'))
    .filter((file) => file.endsWith('.js'))
    .map((file) => `lib/${file}`),
];
assert.deepEqual(
  Object.keys(manifest.sha256).sort(),
  runtimeFiles.sort(),
  'Incomplete reviewed source manifest',
);
for (const [file, expected] of Object.entries(manifest.sha256)) {
  const canonical = readFileSync(path.join(sourceRoot, file), 'utf8').replace(/\r\n/g, '\n');
  assert.equal(
    createHash('sha256').update(canonical).digest('hex'),
    expected,
    `Unreviewed source change: ${file}`,
  );
}
const licenseHash = createHash('sha256')
  .update(readFileSync(path.join(sourceRoot, 'LICENSE'), 'utf8').replace(/\r\n/g, '\n'))
  .digest('hex');
assert.equal(licenseHash, upstream.sourceFiles.find((file) => file.file === 'LICENSE').sha256);
assert.equal(realpathSync(localRequire.resolve('braces')), sourceEntry);

const consumers = [];
for (const [location, entry] of Object.entries(lock.packages)) {
  if (!location.startsWith('node_modules/') || !entry.dependencies?.braces) continue;
  const consumerRequire = createRequire(path.join(root, location, 'package.json'));
  assert.equal(
    realpathSync(consumerRequire.resolve('braces')),
    sourceEntry,
    `Unsafe installed consumer: ${location}`,
  );
  consumers.push(location);
}
assert(consumers.includes('node_modules/chokidar'), 'Missing watcher path verification');
assert(consumers.includes('node_modules/micromatch'), 'Missing build/lint glob path verification');

const braces = localRequire('braces');
const rejectsComplexity = (call) =>
  assert.throws(
    call,
    (error) => error instanceof SyntaxError && error.code === 'ERR_BRACES_COMPLEXITY',
  );
const deep = '{'.repeat(3500) + 'x' + '}'.repeat(3500);
for (const method of ['parse', 'compile', 'expand', 'stringify', 'create']) {
  rejectsComplexity(() => braces[method](deep, { maxLength: NaN, maxDepth: Infinity }));
}
rejectsComplexity(() => braces([deep]));
const nested = JSON.parse('['.repeat(3500) + '1' + ']'.repeat(3500));
for (const field of ['step', 'rangeLimit', 'relaxZeros', 'shorthand', 'capture', 'wrap']) {
  rejectsComplexity(() => braces.expand('{1..3}', { [field]: nested, toRegex: true }));
}
const ast = braces.parse('a(b)c');
const foreign = { type: 'paren', nodes: [] };
foreign.parent = foreign;
ast.nodes.find((node) => node.type === 'paren').parent = foreign;
assert.deepEqual(braces.expand(ast), ['a(b)c']);
console.log(
  JSON.stringify({
    package: metadata.name,
    version: metadata.version,
    upstreamAdvisory: upstream.advisory.id,
    verifiedSourceFiles: Object.keys(manifest.sha256).length,
    verifiedInstalledConsumers: consumers,
    structuralAttackChecks: 'passed',
  }),
);
