import { describe, it, expect } from 'vitest';
import { convertSqlToGoGorm } from './sqlToGoGorm';

describe('sqlToGoGorm', () => {
  it('converts create table to GORM', () => {
    const sql = "CREATE TABLE users ( id INT PRIMARY KEY, email VARCHAR(255) );";
    expect(convertSqlToGoGorm(sql)).toContain('type Users struct');
  });
});
