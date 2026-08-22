import { describe, it, expect } from 'vitest';
import { jsonToPydantic } from './jsonToPydantic';

describe('jsonToPydantic', () => {
  it('converts JSON object into Pydantic BaseModel class definitions', () => {
    const json = JSON.stringify({
      user_id: 123,
      username: 'johndoe',
      is_active: true,
      score: 98.5,
      tags: ['admin', 'developer'],
    });

    const pydanticCode = jsonToPydantic(json, 'User');
    expect(pydanticCode).toContain('from pydantic import BaseModel');
    expect(pydanticCode).toContain('class User(BaseModel):');
    expect(pydanticCode).toContain('user_id: int');
    expect(pydanticCode).toContain('username: str');
    expect(pydanticCode).toContain('is_active: bool');
    expect(pydanticCode).toContain('tags: List[str]');
  });
});
