import { describe, it, expect } from 'vitest';
import { yamlToTypescript } from './yamlToTypescript';

describe('yamlToTypescript', () => {
  it('converts YAML key-value configurations to TypeScript interface', () => {
    const yaml = `
server_port: 8080
enable_ssl: true
app_name: MyAwesomeApp
`;
    const ts = yamlToTypescript(yaml, 'AppConfig');
    expect(ts).toContain('export interface AppConfig {');
    expect(ts).toContain('server_port: number;');
    expect(ts).toContain('enable_ssl: boolean;');
    expect(ts).toContain('app_name: string;');
  });
});
