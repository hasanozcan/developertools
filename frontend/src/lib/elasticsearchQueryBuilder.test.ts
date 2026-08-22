import { describe, it, expect } from 'vitest';
import { buildElasticsearchQuery } from './elasticsearchQueryBuilder';

describe('buildElasticsearchQuery', () => {
  it('generates elasticsearch bool query DSL', () => {
    const res = buildElasticsearchQuery({
      index: 'products',
      searchTerm: 'wireless headphones',
      field: 'title',
      statusFilter: 'active',
    });
    const parsed = JSON.parse(res);
    expect(parsed.query.bool.must[0].match.title).toBe('wireless headphones');
    expect(parsed.query.bool.filter[0].term.status).toBe('active');
  });
});