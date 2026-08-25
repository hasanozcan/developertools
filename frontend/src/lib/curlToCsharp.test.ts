import { describe, expect, it } from 'vitest';
import { curlToCsharp } from './curlToCsharp';

describe('curlToCsharp', () => {
  it('generates C# HttpClient code', () => {
    const curl = 'curl https://api.dotnet.microsoft.com';
    const code = curlToCsharp(curl);
    expect(code).toContain('using System.Net.Http;');
  });
});
