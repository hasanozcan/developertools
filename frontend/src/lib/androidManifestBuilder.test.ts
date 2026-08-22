import { describe, it, expect } from 'vitest';
import { buildAndroidManifestXml } from './androidManifestBuilder';

describe('androidManifestBuilder', () => {
  it('generates valid AndroidManifest.xml with permissions', () => {
    const xml = buildAndroidManifestXml({
      packageName: 'com.devstools.app',
      appName: 'DevsTools',
      permissions: ['INTERNET', 'CAMERA'],
    });

    expect(xml).toContain('package="com.devstools.app"');
    expect(xml).toContain('<uses-permission android:name="android.permission.INTERNET" />');
    expect(xml).toContain('<uses-permission android:name="android.permission.CAMERA" />');
  });
});
