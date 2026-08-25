import { describe, expect, it } from 'vitest';
import { sqlToDjango } from './sqlToDjango';

describe('sqlToDjango', () => {
  it('converts SQL table to Django models.Model', () => {
    const sql = `CREATE TABLE articles (
      id INT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT,
      published BOOLEAN
    );`;
    const dj = sqlToDjango(sql);
    expect(dj).toContain('class Articles(models.Model):');
    expect(dj).toContain('title = models.CharField(max_length=255)');
  });
});
