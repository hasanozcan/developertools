import { describe, it, expect } from 'vitest';
import { generateMockData } from './apiMockResponseGenerator';

describe('apiMockResponseGenerator', () => {
  it('generates users dataset with pagination metadata', () => {
    const res = generateMockData({ type: 'users', count: 5, page: 1, perPage: 5 });
    expect(res.status).toBe(200);
    expect(res.data).toHaveLength(5);
    expect(res.data[0]).toHaveProperty('email');
    expect(res.data[0]).toHaveProperty('role');
  });

  it('generates products dataset correctly', () => {
    const res = generateMockData({ type: 'products', count: 3, includePagination: false });
    expect(res.data).toHaveLength(3);
    expect(res.data[0]).toHaveProperty('price');
    expect(res.data[0]).toHaveProperty('currency', 'USD');
  });
});
