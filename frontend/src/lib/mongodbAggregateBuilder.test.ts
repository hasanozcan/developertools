import { describe, it, expect } from 'vitest';
import { generateMongoAggregatePipeline } from './mongodbAggregateBuilder';

describe('generateMongoAggregatePipeline', () => {
  it('generates aggregation pipeline', () => {
    const res = generateMongoAggregatePipeline('status', 'active', 'category');
    const parsed = JSON.parse(res);
    expect(parsed[0].$match.status).toBe('active');
    expect(parsed[1].$group._id).toBe('$category');
  });
});