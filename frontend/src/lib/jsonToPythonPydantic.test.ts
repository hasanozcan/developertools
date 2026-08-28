import { describe, it, expect } from 'vitest';
import { convertJsonToPydantic } from './jsonToPythonPydantic';

describe('jsonToPythonPydantic', () => {
  it('converts nested JSON object into Pydantic V2 BaseModel classes', () => {
    const json = JSON.stringify({
      id: 101,
      username: 'johndoe',
      isActive: true,
      profile: {
        bio: 'Software engineer',
        followers: 1250,
      },
      tags: ['python', 'ai'],
    });

    const pyCode = convertJsonToPydantic(json, 'User');
    expect(pyCode).toContain('class Profile(BaseModel):');
    expect(pyCode).toContain('class User(BaseModel):');
    expect(pyCode).toContain('id: int');
    expect(pyCode).toContain('username: str');
    expect(pyCode).toContain('tags: List[str]');
  });
});
