import { describe, it, expect } from 'vitest';
import { convertSqlToSqlalchemy } from './sqlToPythonSqlalchemy';

describe('sqlToPythonSqlalchemy', () => {
  it('converts create table to SQLAlchemy model', () => {
    const sql = "CREATE TABLE accounts ( id INT PRIMARY KEY, username VARCHAR(50) );";
    expect(convertSqlToSqlalchemy(sql)).toContain('class Accounts(Base):');
  });
});
