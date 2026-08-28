import { describe, it, expect } from 'vitest';
import { generateRedisRateLimiterLua } from './redisLuaScriptGenerator';

describe('redisLuaScriptGenerator', () => {
  it('generates atomic rate limiter Lua script', () => {
    expect(generateRedisRateLimiterLua()).toContain('redis.call("INCR", key)');
  });
});
