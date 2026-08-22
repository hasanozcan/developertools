import { describe, it, expect } from 'vitest';
import { buildPostgresUri, parsePostgresUri } from './postgresConnectionBuilder';

describe('postgresConnectionBuilder', () => {
  it('builds and parses PostgreSQL connection strings', () => {
    const config = {
      user: 'admin',
      password: 'secretpassword',
      host: 'db.example.com',
      port: 5432,
      database: 'production_db',
      sslMode: 'require' as const,
    };

    const uri = buildPostgresUri(config);
    expect(uri).toBe('postgresql://admin:secretpassword@db.example.com:5432/production_db?sslmode=require');

    const parsed = parsePostgresUri(uri);
    expect(parsed.user).toBe('admin');
    expect(parsed.host).toBe('db.example.com');
    expect(parsed.sslMode).toBe('require');
  });
});
