import { describe, it, expect } from 'vitest';
import { generateModelsFromJson } from './jsonToModels';

describe('jsonToModels', () => {
  const sampleJson = JSON.stringify({
    id: 101,
    user_name: 'alex_dev',
    is_active: true,
    profile: {
      bio: 'Software engineer',
      skills: ['TypeScript', 'Go', 'Rust'],
    },
  });

  it('generates Go structs with json tags', () => {
    const code = generateModelsFromJson(sampleJson, { rootName: 'UserAccount', targetLanguage: 'go' });
    expect(code).toContain('type UserAccount struct');
    expect(code).toContain('UserName string `json:"user_name,omitempty"`');
    expect(code).toContain('type UserAccountProfile struct');
  });

  it('generates Python Pydantic models', () => {
    const code = generateModelsFromJson(sampleJson, { rootName: 'UserAccount', targetLanguage: 'python' });
    expect(code).toContain('class UserAccount(BaseModel):');
    expect(code).toContain('user_name: str');
  });

  it('generates Rust Serde structs', () => {
    const code = generateModelsFromJson(sampleJson, { rootName: 'UserAccount', targetLanguage: 'rust' });
    expect(code).toContain('#[derive(Debug, Clone, Serialize, Deserialize)]');
    expect(code).toContain('pub struct UserAccount');
    expect(code).toContain('#[serde(rename = "user_name")]');
  });

  it('generates C# record', () => {
    const code = generateModelsFromJson(sampleJson, { rootName: 'UserAccount', targetLanguage: 'csharp' });
    expect(code).toContain('public record UserAccount');
    expect(code).toContain('[JsonPropertyName("user_name")]');
  });
});
