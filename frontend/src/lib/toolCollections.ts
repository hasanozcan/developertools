import { findCatalogTool, type Tool, type ToolSlug } from '@/lib/api';

export interface ToolCollection {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  intro: string;
  searchIntents: readonly string[];
  toolSlugs: readonly ToolSlug[];
}

export const toolCollections = [
  {
    slug: 'api-debugging',
    title: 'API Debugging & Request Conversion Tools',
    shortTitle: 'API Debugging',
    description:
      'Debug requests, convert cURL and Postman collections, inspect HAR files, test WebSockets, and move API traffic between common developer formats.',
    intro:
      'Use this collection when you are reproducing an API call, moving a request between tools, preparing a load test, or checking a real-time endpoint.',
    searchIntents: ['curl to postman', 'api debugging tools', 'har to k6', 'postman to openapi'],
    toolSlugs: [
      'curl-builder',
      'curl-to-postman',
      'curl-to-har',
      'har-to-k6',
      'postman-to-openapi',
      'openapi-to-postman',
      'websocket-tester',
    ],
  },
  {
    slug: 'jwt-authentication',
    title: 'JWT & Authentication Developer Tools',
    shortTitle: 'JWT & Auth',
    description:
      'Inspect JWTs, verify signatures, generate PKCE values, and troubleshoot token and authentication flows locally in your browser.',
    intro:
      'Use these tools while debugging OAuth, OIDC, bearer tokens, PKCE, JWT expiry, claims, or signature validation problems.',
    searchIntents: ['jwt decoder online', 'jwt signature validator', 'pkce generator', 'jwt invalid'],
    toolSlugs: ['jwt-decoder', 'jwt-signature-validator', 'pkce-generator'],
  },
  {
    slug: 'json-development',
    title: 'JSON Development & Schema Tools',
    shortTitle: 'JSON Development',
    description:
      'Format, validate, model, convert, and generate schemas from JSON with connected workflows for TypeScript, C#, Zod, and SQL.',
    intro:
      'Start with raw JSON, clean or validate it, then pass the same data into model, schema, database, or type-generation tools without rebuilding the input.',
    searchIntents: ['json formatter online', 'json to typescript', 'json to c#', 'json schema to zod'],
    toolSlugs: [
      'json-formatter',
      'json-validator',
      'json-to-typescript',
      'json-to-csharp',
      'json-to-json-schema',
      'json-schema-to-zod',
      'zod-to-typescript-type',
      'json-to-sql',
    ],
  },
  {
    slug: 'docker-kubernetes',
    title: 'Docker & Kubernetes Developer Tools',
    shortTitle: 'Docker & Kubernetes',
    description:
      'Generate and inspect Dockerfiles, convert Compose services to Kubernetes, validate kubeconfig files, and scaffold Kubernetes and Helm resources.',
    intro:
      'Use this collection while containerizing an application, migrating Compose workloads, preparing Kubernetes manifests, or starting a Helm chart.',
    searchIntents: ['dockerfile generator', 'docker compose to kubernetes', 'kubernetes yaml generator', 'helm chart generator'],
    toolSlugs: [
      'dockerfile-generator',
      'dockerfile-linter',
      'docker-compose-to-k8s',
      'docker-compose-to-kubernetes',
      'kubeconfig-validator',
      'kubernetes-deployment-generator',
      'helm-chart-yaml-generator',
    ],
  },
  {
    slug: 'ai-llm',
    title: 'AI & LLM Developer Tools',
    shortTitle: 'AI & LLM',
    description:
      'Estimate token and embedding costs, build function schemas, format prompt templates, and prepare text chunks for RAG and LLM workflows.',
    intro:
      'Use these utilities while building prompt pipelines, function calling, retrieval systems, token budgets, and model-cost estimates.',
    searchIntents: ['llm token counter', 'embedding cost calculator', 'openai function schema', 'rag chunking tool'],
    toolSlugs: [
      'llm-token-counter',
      'embedding-cost-calculator',
      'openai-function-schema',
      'prompt-template-formatter',
      'text-chunk-splitter',
    ],
  },
  {
    slug: 'sql-database',
    title: 'SQL & Database Developer Tools',
    shortTitle: 'SQL & Database',
    description:
      'Format SQL, generate database code, inspect index opportunities, build connection strings, and convert structured data into database-ready output.',
    intro:
      'Use this set when cleaning SQL, generating application models, preparing inserts, reviewing indexing, or configuring PostgreSQL connections.',
    searchIntents: ['sql formatter online', 'sql index advisor', 'json to sql', 'postgres connection string builder'],
    toolSlugs: [
      'sql-formatter',
      'sql-index-advisor',
      'json-to-sql',
      'sql-to-typescript',
      'postgres-connection-builder',
    ],
  },
] as const satisfies readonly ToolCollection[];

export function getToolCollection(slug: string): ToolCollection | undefined {
  return toolCollections.find((collection) => collection.slug === slug);
}

export function getCollectionTools(collection: ToolCollection): Tool[] {
  return collection.toolSlugs
    .map((slug) => findCatalogTool(slug))
    .filter((tool): tool is Tool => Boolean(tool));
}
