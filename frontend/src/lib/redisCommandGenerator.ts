export function generateRedisCommand(
  cmdType: 'SET' | 'HSET' | 'ZADD' | 'EXPIRE' | 'LPUSH',
  key: string,
  args: Record<string, string | number>,
): string {
  const safeKey = key.trim() || 'my_key';

  switch (cmdType) {
    case 'SET':
      return `SET ${safeKey} "${args.value || 'sample_value'}"`;
    case 'HSET':
      return `HSET ${safeKey} "${args.field || 'field1'}" "${args.value || 'val1'}"`;
    case 'ZADD':
      return `ZADD ${safeKey} ${args.score || 1} "${args.member || 'member1'}"`;
    case 'EXPIRE':
      return `EXPIRE ${safeKey} ${args.seconds || 3600}`;
    case 'LPUSH':
      return `LPUSH ${safeKey} "${args.value || 'item'}"`;
  }
}
