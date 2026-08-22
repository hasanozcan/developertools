import { describe, it, expect } from 'vitest';
import { convertJsonToGraphqlQuery } from './jsonToGraphqlQuery';

describe('convertJsonToGraphqlQuery', () => {
  it('generates graphql query string from json', () => {
    const json = JSON.stringify({ user: { id: 1, name: 'Alice' } });
    const query = convertJsonToGraphqlQuery(json, 'GetUser');
    expect(query).toContain('query GetUser {');
    expect(query).toContain('user {');
    expect(query).toContain('id');
  });
});