import UAParser from 'ua-parser-js';

export interface ParsedUserAgent {
  raw: string;
  browser: { name: string; version: string; major: string };
  engine: { name: string; version: string };
  os: { name: string; version: string };
  device: { vendor: string; model: string; type: string };
  cpu: { architecture: string };
  bot: { isBot: boolean; name: string | null };
}

const botRules = [
  { name: 'Googlebot', pattern: /Googlebot/i },
  { name: 'Bingbot', pattern: /bingbot/i },
  { name: 'OAI-SearchBot', pattern: /OAI-SearchBot/i },
  { name: 'ChatGPT-User', pattern: /ChatGPT-User/i },
  { name: 'GPTBot', pattern: /GPTBot/i },
  { name: 'PerplexityBot', pattern: /PerplexityBot/i },
  { name: 'Perplexity-User', pattern: /Perplexity-User/i },
  { name: 'ClaudeBot', pattern: /ClaudeBot/i },
  { name: 'Applebot', pattern: /Applebot/i },
  { name: 'DuckDuckBot', pattern: /DuckDuckBot/i },
  { name: 'YandexBot', pattern: /YandexBot/i },
  { name: 'Baiduspider', pattern: /Baiduspider/i },
];

function known(value: string | undefined): string {
  return value || 'Unknown';
}

export function parseUserAgent(input: string): ParsedUserAgent | null {
  const raw = input.trim();
  if (!raw) return null;

  const result = new UAParser(raw).getResult();
  const botName =
    botRules.find((rule) => rule.pattern.test(raw))?.name ||
    (/bot|crawler|spider|slurp|bingpreview/i.test(raw) ? 'Other bot or crawler' : null);
  const deviceType =
    result.device.type ||
    (botName ? 'Bot' : /Mobi|Android|iPhone|iPod/i.test(raw) ? 'Mobile' : 'Desktop');
  const browserVersion = known(result.browser.version);

  return {
    raw,
    browser: {
      name: known(result.browser.name),
      version: browserVersion,
      major: browserVersion === 'Unknown' ? 'Unknown' : browserVersion.split('.')[0],
    },
    engine: {
      name: known(result.engine.name),
      version: known(result.engine.version),
    },
    os: {
      name: known(result.os.name),
      version: known(result.os.version),
    },
    device: {
      vendor: known(result.device.vendor),
      model: known(result.device.model),
      type: deviceType,
    },
    cpu: {
      architecture: known(result.cpu.architecture),
    },
    bot: {
      isBot: Boolean(botName),
      name: botName,
    },
  };
}
