import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiPath = path.join(__dirname, '../src/lib/api.ts');
const apiContent = fs.readFileSync(apiPath, 'utf8');

// Read the same self-contained catalogue as the site, including future additions.
const { outputText } = ts.transpileModule(apiContent, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
});
const { toolCatalog } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`
);
const tools = toolCatalog.map(
  ({ id, slug, name, shortDescription = '', categorySlug, categoryName }) => ({
    id,
    slug,
    name,
    shortDescription,
    categorySlug,
    categoryName,
  }),
);
if (!tools.length || new Set(tools.map((tool) => tool.slug)).size !== tools.length) {
  throw new Error('Extension catalogue must contain unique tools.');
}

console.log(`Extracted ${tools.length} tools for extension catalog.`);

const outDir = path.join(__dirname, '../../extension');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outputPath = path.join(outDir, 'catalog.json');
fs.writeFileSync(outputPath, JSON.stringify(tools, null, 2), 'utf8');
console.log(`Extension catalog successfully saved to ${outputPath}`);

const manifestPath = path.join(outDir, 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
manifest.name = `DevsTools – ${tools.length} Privacy-First Developer Tools`;
manifest.description = `${tools.length} developer tools. Offline JSON, Base64, UUID, hashes and timestamps; searchable web tools and text selection shortcuts.`;
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

const readmePath = path.join(outDir, 'README.md');
const readme = fs
  .readFileSync(readmePath, 'utf8')
  .replace(
    /\d+ free, privacy-first developer tools/g,
    `${tools.length} free, privacy-first developer tools`,
  )
  .replace(/search \d+ tools/g, `search ${tools.length} tools`);
fs.writeFileSync(readmePath, readme);
