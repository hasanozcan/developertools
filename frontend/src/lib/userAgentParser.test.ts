import { describe, expect, it } from 'vitest';
import { parseUserAgent } from './userAgentParser';

describe('parseUserAgent', () => {
  it('parses Edge on Windows with maintained UA data', () => {
    const result = parseUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0',
    );

    expect(result?.browser.name).toBe('Edge');
    expect(result?.browser.version).toBe('140.0.0.0');
    expect(result?.os.name).toBe('Windows');
    expect(result?.os.version).toBe('10');
    expect(result?.cpu.architecture).toBe('amd64');
    expect(result?.device.type).toBe('Desktop');
  });

  it('parses iPhone Safari device and OS fields', () => {
    const result = parseUserAgent(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
    );

    expect(result?.browser.name).toBe('Mobile Safari');
    expect(result?.os).toEqual({ name: 'iOS', version: '18.0' });
    expect(result?.device).toEqual({ vendor: 'Apple', model: 'iPhone', type: 'mobile' });
  });

  it.each([
    ['Googlebot', 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'],
    [
      'OAI-SearchBot',
      'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot',
    ],
    [
      'PerplexityBot',
      'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot',
    ],
  ])('identifies %s', (name, userAgent) => {
    const result = parseUserAgent(userAgent);
    expect(result?.bot).toEqual({ isBot: true, name });
    expect(result?.device.type).toBe('Bot');
  });

  it('returns null for empty input', () => {
    expect(parseUserAgent('   ')).toBeNull();
  });
});
