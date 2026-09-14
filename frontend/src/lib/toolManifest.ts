import { toolCatalog, type Tool, type ToolSlug } from '@/lib/api';

export type ToolDataType =
  | 'text'
  | 'json'
  | 'json-schema'
  | 'curl'
  | 'har'
  | 'postman'
  | 'openapi'
  | 'k6'
  | 'zod'
  | 'typescript'
  | 'csharp'
  | 'url'
  | 'secret';

export interface ToolManifestEntry extends Tool {
  inputTypes: readonly ToolDataType[];
  outputTypes: readonly ToolDataType[];
  sensitive: boolean;
  shareable: boolean;
  workflowTargets: readonly ToolSlug[];
  searchAliases: readonly string[];
}

type ToolManifestOverride = Partial<
  Pick<
    ToolManifestEntry,
    'inputTypes' | 'outputTypes' | 'sensitive' | 'shareable' | 'workflowTargets' | 'searchAliases'
  >
>;

const overrides = {
  'json-formatter': {
    inputTypes: ['json'],
    outputTypes: ['json'],
    workflowTargets: [
      'json-to-typescript',
      'json-to-csharp',
      'json-to-json-schema',
      'json-schema-validator',
    ],
    searchAliases: ['format json', 'pretty json', 'beautify json', 'json düzelt', 'json biçimlendir'],
  },
  'json-to-typescript': {
    inputTypes: ['json'],
    outputTypes: ['typescript'],
    searchAliases: ['json interface', 'json ts type', 'json dan typescript'],
  },
  'json-to-csharp': {
    inputTypes: ['json'],
    outputTypes: ['csharp'],
    searchAliases: ['json c# class', 'json csharp model', 'json dan c# class'],
  },
  'json-to-json-schema': {
    inputTypes: ['json'],
    outputTypes: ['json-schema'],
    workflowTargets: ['json-schema-validator', 'json-schema-to-zod'],
    searchAliases: ['create json schema', 'infer json schema'],
  },
  'json-schema-to-zod': {
    inputTypes: ['json-schema'],
    outputTypes: ['zod'],
    workflowTargets: ['zod-to-typescript-type'],
    searchAliases: ['json schema zod', 'schema to zod'],
  },
  'zod-to-typescript-type': {
    inputTypes: ['zod'],
    outputTypes: ['typescript'],
    searchAliases: ['zod to typescript', 'zod infer type'],
  },
  'json-schema-validator': {
    inputTypes: ['json', 'json-schema'],
    outputTypes: ['text'],
    searchAliases: ['validate json schema', 'json schema error'],
  },
  'curl-to-postman': {
    inputTypes: ['curl'],
    outputTypes: ['postman'],
    workflowTargets: ['postman-to-openapi'],
    searchAliases: ['curl postman', 'import curl postman'],
  },
  'curl-to-har': {
    inputTypes: ['curl'],
    outputTypes: ['har'],
    workflowTargets: ['har-to-k6'],
    searchAliases: ['curl har', 'convert request har'],
  },
  'postman-to-openapi': {
    inputTypes: ['postman'],
    outputTypes: ['openapi'],
    searchAliases: ['postman openapi', 'postman collection to swagger'],
  },
  'har-to-k6': {
    inputTypes: ['har'],
    outputTypes: ['k6'],
    searchAliases: ['har k6', 'har load test'],
  },
  'openapi-to-postman': {
    inputTypes: ['openapi'],
    outputTypes: ['postman'],
    searchAliases: ['openapi postman', 'swagger postman collection'],
  },
  'swagger-to-typescript': {
    inputTypes: ['openapi'],
    outputTypes: ['typescript'],
    searchAliases: ['openapi typescript client', 'swagger typescript'],
  },
  'jwt-decoder': {
    inputTypes: ['secret'],
    outputTypes: ['json'],
    sensitive: true,
    shareable: false,
    searchAliases: ['inspect jwt', 'jwt invalid', 'decode token', 'jwt neden invalid'],
  },
  'password-generator': {
    outputTypes: ['secret'],
    sensitive: true,
    shareable: false,
  },
  'api-key-generator': {
    outputTypes: ['secret'],
    sensitive: true,
    shareable: false,
  },
  'bip39-generator': {
    outputTypes: ['secret'],
    sensitive: true,
    shareable: false,
  },
  'env-sanitizer': {
    inputTypes: ['secret'],
    outputTypes: ['text'],
    sensitive: true,
    shareable: false,
    searchAliases: ['remove secrets env', 'create env example'],
  },
} as const satisfies Partial<Record<ToolSlug, ToolManifestOverride>>;

function createManifestEntry(tool: Tool): ToolManifestEntry {
  const override = overrides[tool.slug as keyof typeof overrides] as ToolManifestOverride | undefined;

  return {
    ...tool,
    inputTypes: override?.inputTypes ?? ['text'],
    outputTypes: override?.outputTypes ?? ['text'],
    sensitive: override?.sensitive ?? false,
    shareable: override?.shareable ?? true,
    workflowTargets: override?.workflowTargets ?? [],
    searchAliases: override?.searchAliases ?? [],
  };
}

export const toolManifest = toolCatalog.map(createManifestEntry);

const manifestBySlug = new Map<string, ToolManifestEntry>(
  toolManifest.map((tool) => [tool.slug, tool]),
);

export function getToolManifest(slug: string): ToolManifestEntry | undefined {
  return manifestBySlug.get(slug);
}

export function getWorkflowTargets(slug: string): ToolManifestEntry[] {
  const tool = getToolManifest(slug);
  if (!tool) return [];

  return tool.workflowTargets
    .map((targetSlug) => manifestBySlug.get(targetSlug))
    .filter((target): target is ToolManifestEntry => Boolean(target));
}
