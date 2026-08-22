import { describe, it, expect } from 'vitest';
import { formatGraphQLQuery } from './graphqlQueryFormatter';

describe('graphqlQueryFormatter', () => {
  it('formats and minifies GraphQL query strings', () => {
    const q = 'query GetUser{user(id:1){id name email}}';
    const formatted = formatGraphQLQuery(q);
    expect(formatted).toContain('query GetUser{');

    const minified = formatGraphQLQuery(q, true);
    expect(minified).toBe('query GetUser{user(id:1){id name email}}');
  });
});
