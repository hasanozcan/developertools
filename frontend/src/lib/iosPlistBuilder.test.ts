import { describe, it, expect } from 'vitest';
import { buildIosInfoPlist } from './iosPlistBuilder';

describe('iosPlistBuilder', () => {
  it('generates valid iOS Info.plist XML with permission keys', () => {
    const plist = buildIosInfoPlist({
      bundleIdentifier: 'com.devstools.app',
      displayName: 'DevsTools',
      version: '1.2.0',
      permissions: [{ key: 'NSCameraUsageDescription', description: 'Requires camera access for QR scanning' }],
    });

    expect(plist).toContain('<key>CFBundleDisplayName</key>');
    expect(plist).toContain('<string>DevsTools</string>');
    expect(plist).toContain('<key>NSCameraUsageDescription</key>');
  });
});
