import { describe, it, expect } from 'vitest';
import { generateXcodeContentsJson } from './xcodeAssetCatalog';

describe('xcodeAssetCatalog', () => {
  it('generates Xcode Contents.json asset catalog manifest', () => {
    const jsonStr = generateXcodeContentsJson('logo');
    const parsed = JSON.parse(jsonStr);
    expect(parsed.images).toHaveLength(3);
    expect(parsed.images[1].filename).toBe('logo@2x.png');
  });
});
