import { describe, expect, it } from 'vitest';
import { convertJsonToYaml, convertYamlToJson } from './yamlJson';

describe('YAML and JSON conversion', () => {
  it('resolves anchors and YAML 1.1 merge keys with typed scalars', () => {
    const result = JSON.parse(
      convertYamlToJson(`
defaults: &defaults
  timeout: 30
  enabled: true
service:
  <<: *defaults
  name: api
`),
    );

    expect(result.service).toEqual({ timeout: 30, enabled: true, name: 'api' });
  });

  it('supports explicit scalar tags', () => {
    expect(JSON.parse(convertYamlToJson('count: !!int "42"\nlabel: !!str 7'))).toEqual({
      count: 42,
      label: '7',
    });
  });

  it('converts JSON to readable YAML without aliases', () => {
    expect(convertJsonToYaml('{"enabled":true,"items":[1,2]}')).toBe(
      'enabled: true\nitems:\n  - 1\n  - 2\n',
    );
  });

  it('rejects malformed input in either direction', () => {
    expect(() => convertYamlToJson('broken: [')).toThrow();
    expect(() => convertJsonToYaml('{"broken":}')).toThrow();
  });
});
