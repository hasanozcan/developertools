import { describe, it, expect } from 'vitest';
import { generateCapacitorConfig } from './capacitorConfigBuilder';

describe('capacitorConfigBuilder', () => {
  it('generates capacitor.config.json for hybrid mobile apps', () => {
    const jsonStr = generateCapacitorConfig({ appId: 'com.devstools.mobile', appName: 'DevsTools Mobile' });
    const parsed = JSON.parse(jsonStr);
    expect(parsed.appId).toBe('com.devstools.mobile');
    expect(parsed.webDir).toBe('out');
  });
});
