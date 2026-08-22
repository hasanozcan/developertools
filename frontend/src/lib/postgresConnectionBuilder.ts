export interface PostgresConnectionConfig {
  user?: string;
  password?: string;
  host?: string;
  port?: number;
  database?: string;
  sslMode?: 'disable' | 'require' | 'verify-ca' | 'verify-full';
}

export function buildPostgresUri(config: PostgresConnectionConfig): string {
  const user = config.user ? encodeURIComponent(config.user) : 'postgres';
  const pass = config.password ? ':' + encodeURIComponent(config.password) : '';
  const host = config.host || 'localhost';
  const port = config.port || 5432;
  const db = config.database ? '/' + encodeURIComponent(config.database) : '/postgres';
  const ssl = config.sslMode ? `?sslmode=${config.sslMode}` : '';

  return `postgresql://${user}${pass}@${host}:${port}${db}${ssl}`;
}

export function parsePostgresUri(uri: string): PostgresConnectionConfig {
  try {
    const u = new URL(uri);
    return {
      user: u.username || undefined,
      password: u.password || undefined,
      host: u.hostname || undefined,
      port: u.port ? parseInt(u.port, 10) : 5432,
      database: u.pathname ? u.pathname.replace(/^\//, '') : undefined,
      sslMode: (u.searchParams.get('sslmode') as PostgresConnectionConfig['sslMode']) || undefined,
    };
  } catch {
    throw new Error('Invalid PostgreSQL URI format');
  }
}
