import { describe, it, expect } from 'vitest';
import { convertOpenapiToPostman } from './openapiToPostman';

describe('openapiToPostman', () => {
  it('converts OpenAPI to Postman', () => {
    const spec = JSON.stringify({ openapi: "3.0.0", info: { title: "Pet API" }, paths: { "/pets": { get: { summary: "List" } } } });
    expect(convertOpenapiToPostman(spec)).toContain('collection.json');
  });
});
