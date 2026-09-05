import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// frontend/scripts -> frontend -> developertools/extension
const extensionDir = path.resolve(__dirname, '../../extension');
const distDir = path.join(extensionDir, 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const manifestPath = path.join(extensionDir, 'manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.error('Could not find manifest.json at', manifestPath);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const version = manifest.version || '1.0.0';
if (!/^\d+(\.\d+){0,3}$/.test(version)) throw new Error('Invalid extension version.');

console.log(`Packaging DevsTools Extension v${version} from ${extensionDir}...`);

const filesToInclude = [
  'manifest.json',
  'background.js',
  'popup.html',
  'popup.css',
  'popup.js',
  'catalog.json',
  'icons',
];

for (const browser of ['chromium', 'firefox']) {
  const outputDir = path.join(distDir, browser);
  fs.mkdirSync(outputDir, { recursive: true });
  for (const file of filesToInclude) {
    fs.cpSync(path.join(extensionDir, file), path.join(outputDir, file), { recursive: true });
  }

  if (browser === 'firefox') {
    const firefoxManifest = {
      ...manifest,
      background: { scripts: ['background.js'] },
      browser_specific_settings: {
        gecko: {
          id: 'devstools@devstools.app',
          strict_min_version: '142.0',
          data_collection_permissions: { required: ['none'] },
        },
      },
    };
    fs.writeFileSync(
      path.join(outputDir, 'manifest.json'),
      `${JSON.stringify(firefoxManifest, null, 2)}\n`,
    );
  }

  const zipPath = path.join(distDir, `devstools-extension-v${version}-${browser}.zip`);
  fs.rmSync(zipPath, { force: true });
  if (process.platform === 'win32') {
    execFileSync('tar.exe', ['-a', '-cf', zipPath, ...filesToInclude], {
      cwd: outputDir,
      stdio: 'inherit',
    });
  } else {
    execFileSync('zip', ['-qr', zipPath, ...filesToInclude], { cwd: outputDir, stdio: 'inherit' });
  }
  console.log(`${browser}: ${zipPath} (${(fs.statSync(zipPath).size / 1024).toFixed(1)} KB)`);
}
