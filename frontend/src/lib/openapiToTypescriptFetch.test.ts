import { describe, it, expect } from 'vitest';
import { generateFetchClientFromOpenApi } from './openapiToTypescriptFetch';

describe('generateFetchClientFromOpenApi', () => {
  it('generates fetch wrapper', () => {
    const res = generateFetchClientFromOpenApi('openapi: 3.0.0');
    expect(res).toContain('export async function apiRequest<T>');
  });
});