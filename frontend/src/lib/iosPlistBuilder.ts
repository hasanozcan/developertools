export interface IosPlistConfig {
  bundleIdentifier: string;
  displayName: string;
  version: string;
  permissions: { key: string; description: string }[];
}

export function buildIosInfoPlist(config: IosPlistConfig): string {
  const { bundleIdentifier, displayName, version, permissions } = config;

  const permLines = permissions
    .map((p) => `    <key>${p.key}</key>\n    <string>${p.description}</string>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleIdentifier</key>
    <string>${bundleIdentifier || 'com.example.app'}</string>
    <key>CFBundleDisplayName</key>
    <string>${displayName || 'My App'}</string>
    <key>CFBundleShortVersionString</key>
    <string>${version || '1.0.0'}</string>
${permLines}
</dict>
</plist>`;
}
