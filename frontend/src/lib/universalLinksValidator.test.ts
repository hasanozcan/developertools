import { describe, it, expect } from 'vitest';
import { generateAppleAppSiteAssociation, generateAssetLinksJson } from './universalLinksValidator';

describe('universalLinksValidator', () => {
  it('generates Apple Universal Links and Android AssetLinks JSON', () => {
    const aasa = generateAppleAppSiteAssociation('ABC123XYZ.com.app', ['/app/*']);
    expect(aasa).toContain('applinks');

    const assetlinks = generateAssetLinksJson('com.app', ['AA:BB:CC']);
    expect(assetlinks).toContain('android_app');
  });
});
