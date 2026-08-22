import { describe, it, expect } from 'vitest';
import { formatApacheConf } from './apacheConfFormatter';

describe('formatApacheConf', () => {
  it('formats VirtualHost blocks in Apache conf', () => {
    const conf = '<VirtualHost *:80>\nServerName example.com\nDocumentRoot /var/www\n</VirtualHost>';
    const res = formatApacheConf(conf);
    expect(res).toContain('  ServerName example.com');
  });
});