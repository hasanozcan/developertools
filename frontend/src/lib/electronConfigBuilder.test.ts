import { describe, it, expect } from 'vitest';
import { generateElectronMainJs } from './electronConfigBuilder';

describe('electronConfigBuilder', () => {
  it('generates standard Electron main.js starter template', () => {
    const js = generateElectronMainJs({ appName: 'MyTool', appId: 'com.tool.app' });
    expect(js).toContain('BrowserWindow');
    expect(js).toContain('MyTool');
  });
});
