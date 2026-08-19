import { describe, it, expect } from 'vitest';
import { jsonToGraphqlSchema } from './jsonToGraphql';

describe('jsonToGraphql', () => {
  it('should infer GraphQL types and nested objects from JSON', () => {
    const json = JSON.stringify({
      id: 1,
      name: 'Alice',
      price: 19.99,
      tags: ['dev', 'tech'],
      author: {
        username: 'alice99',
        verified: true,
      },
    });

    const schema = jsonToGraphqlSchema(json, 'Product');
    expect(schema).toContain('type Product {');
    expect(schema).toContain('id: Int');
    expect(schema).toContain('name: String');
    expect(schema).toContain('price: Float');
    expect(schema).toContain('tags: [String]');
    expect(schema).toContain('author: Author');
    expect(schema).toContain('type Author {');
    expect(schema).toContain('verified: Boolean');
  });
});
