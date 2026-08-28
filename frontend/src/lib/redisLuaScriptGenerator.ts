export function generateRedisRateLimiterLua(): string {
  return '-- Keys: [1] key, ARGV: [1] limit, [2] window_seconds\nlocal key = KEYS[1]\nlocal limit = tonumber(ARGV[1])\nlocal window = tonumber(ARGV[2])\n\nlocal current = redis.call("INCR", key)\nif current == 1 then\n    redis.call("EXPIRE", key, window)\nend\n\nif current > limit then\n    return 0\nelse\n    return 1\nend\n';
}
