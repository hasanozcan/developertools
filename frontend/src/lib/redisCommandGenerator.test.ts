import { describe, it, expect } from 'vitest';
import { generateRedisCommand } from './redisCommandGenerator';

describe('redisCommandGenerator', () => {
  it('generates standard Redis commands', () => {
    const cmd = generateRedisCommand('HSET', 'user:100', { field: 'name', value: 'Alice' });
    expect(cmd).toBe('HSET user:100 "name" "Alice"');
  });
});
