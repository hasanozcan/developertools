import { describe, it, expect } from 'vitest';
import { sqlTableToTypeScript } from './sqlToTypescript';

describe('sqlToTypescript', () => {
  it('should parse CREATE TABLE SQL and generate TypeScript interface', () => {
    const sql = `
      CREATE TABLE users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        is_admin BOOLEAN NOT NULL DEFAULT false,
        bio TEXT,
        created_at TIMESTAMP
      );
    `;

    const ts = sqlTableToTypeScript(sql);
    expect(ts).toContain('export interface User {');
    expect(ts).toContain('id: number;');
    expect(ts).toContain('name: string;');
    expect(ts).toContain('is_admin: boolean;');
    expect(ts).toContain('bio?: string;');
  });
});
