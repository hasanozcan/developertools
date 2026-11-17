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

  it('rejects YAML alias bombs exceeding 100 aliases and oversized input', () => {
    const aliasRefs = Array.from({ length: 101 }, () => '*base').join(', ');
    const aliasBomb = `base: &base [1, 2]\nitems: [${aliasRefs}]`;
    expect(() => convertYamlToJson(aliasBomb)).toThrow();

    const safeAliasRefs = Array.from({ length: 10 }, () => '*base').join(', ');
    const safeYaml = `base: &base [1]\nitems: [${safeAliasRefs}]`;
    expect(JSON.parse(convertYamlToJson(safeYaml)).items).toHaveLength(10);

    expect(() => convertYamlToJson('a: 1\n'.repeat(250_000))).toThrow(/1,000,000/);
    expect(() => convertJsonToYaml('x'.repeat(1_000_001))).toThrow(/1,000,000/);
  });
});
