import { dump, load, YAML11_SCHEMA } from 'js-yaml';

export const MAX_YAML_JSON_INPUT_LENGTH = 1_000_000;

export function convertYamlToJson(source: string, indent: number = 2): string {
  if (source.length > MAX_YAML_JSON_INPUT_LENGTH) {
    throw new Error('YAML input is limited to 1,000,000 characters.');
  }

  const parsed = load(source, {
    schema: YAML11_SCHEMA,
    maxAliases: 100,
    maxDepth: 100,
    maxTotalMergeKeys: 10_000,
  });
  return JSON.stringify(parsed, null, indent);
}

export function convertJsonToYaml(source: string, indent: number = 2): string {
  if (source.length > MAX_YAML_JSON_INPUT_LENGTH) {
    throw new Error('JSON input is limited to 1,000,000 characters.');
  }

  const parsed = JSON.parse(source) as unknown;
  return dump(parsed, {
    indent,
    lineWidth: -1,
    noRefs: true,
    sortKeys: false,
  });
}
