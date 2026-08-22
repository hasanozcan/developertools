import { describe, it, expect } from 'vitest';
import { validateJsonlDataset } from './jsonlDatasetValidator';

describe('jsonlDatasetValidator', () => {
  it('validates OpenAI fine-tuning JSONL format correctly', () => {
    const validJsonl = '{"messages": [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "Hello"}]}';
    const res = validateJsonlDataset(validJsonl);
    expect(res.isValid).toBe(true);
    expect(res.validLines).toBe(1);
    expect(res.errors).toHaveLength(0);
  });

  it('detects missing messages array', () => {
    const invalidJsonl = '{"prompt": "hello", "completion": "world"}';
    const res = validateJsonlDataset(invalidJsonl);
    expect(res.isValid).toBe(false);
    expect(res.errors[0].error).toContain('Missing required "messages" array');
  });
});
