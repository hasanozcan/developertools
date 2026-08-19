import { describe, it, expect } from 'vitest';
import { convertJsonToEnv, convertEnvToJson } from './jsonToEnv';

describe('jsonToEnv', () => {
  it('should flatten nested JSON into uppercase env variables', () => {
    const json = JSON.stringify({
      database: {
        host: 'localhost',
        port: 5432,
      },
      api_key: 'secret123',
    });

    const env = convertJsonToEnv(json);
    expect(env).toContain('DATABASE_HOST=localhost');
    expect(env).toContain('DATABASE_PORT=5432');
    expect(env).toContain('API_KEY=secret123');
  });

  it('should parse .env file to structured JSON', () => {
    const env = `
      PORT=8080
      ENABLE_LOGS=true
      APP_NAME="My App"
    `;
    const json = convertEnvToJson(env);
    const parsed = JSON.parse(json);
    expect(parsed.PORT).toBe(8080);
    expect(parsed.ENABLE_LOGS).toBe(true);
    expect(parsed.APP_NAME).toBe('My App');
  });
});
