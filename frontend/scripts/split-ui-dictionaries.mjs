import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderSplitOutputs } from './uiDictionaryAnalysis.mjs';

// Regenerates the shared ("core") client UI dictionaries and the per-tool key manifest.
const root = fileURLToPath(new URL('../', import.meta.url));
const { outputs, analysis } = renderSplitOutputs(root);
for (const [relative, content] of outputs) {
  const file = path.join(root, relative);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, content);
}
console.log(JSON.stringify(analysis.stats));
