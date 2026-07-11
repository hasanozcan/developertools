import { dump, load, YAML11_SCHEMA } from 'js-yaml';

export function convertYamlToJson(source: string, indent: number = 2): string {
  const parsed = load(source, { schema: YAML11_SCHEMA });
  return JSON.stringify(parsed, null, indent);
}

export function convertJsonToYaml(source: string, indent: number = 2): string {
  const parsed = JSON.parse(source) as unknown;
  return dump(parsed, {
    indent,
    lineWidth: -1,
    noRefs: true,
    sortKeys: false,
  });
}
